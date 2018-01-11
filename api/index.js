import express from 'express';
import {MongoClient,ObjectID} from 'mongodb';
import assert from 'assert';
import config from '../config';


let mdb;

MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  mdb = db;
})

const router = express.Router();

router.get('/properties', (req, res) => {
  let properties ={};
  //find all properties
  mdb.collection('properties').find({})
  /*   .project({
       id:1,
       Address:1,
       City:1,
       price:1,
       images:1
     })
    */ .each((err, property)=> {
       assert.equal(null, err);

       if(!property) {
         res.send({properties});
         return;
       }
       properties[property._id] = property;
     });
});
router.get('/searchedProperties/:City', (req, res) => {
  let properties ={};
  //find all properties only City
  mdb.collection('properties').find({City:req.params.City})
     .each((err, property)=> {
       assert.equal(null, err);

       if(!property) {
         res.send({properties});
         return;
       }
       properties[property._id] = property;
     });
});
router.get('/notes/:noteIds', (req,res)=>{
  const noteIds = req.params.noteIds.split(',').map(ObjectID);
  let notes = {};
  //find notes by noteIds
  mdb.collection('notes').find({_id: {$in:noteIds}})
     .each((err,note)=> {
       assert.equal(null,err);

       if(!note){
         res.send({notes});
         return;
       }

       notes[note._id] = note;
     });
});
//find one property by porpertyId
router.get('/properties/:propertyId', (req, res) => {
  mdb.collection('properties')
     .findOne({_id:ObjectID(req.params.propertyId)})
     .then(property =>res.send(property))
     .catch(console.error);
});
//update note
router.post('/notes',(req,res)=>{
  //console.log(req.body);
  //res.send(req.body);
  const propertyId = ObjectID(req.body.propertyId);
  const note = req.body.newNote;

  mdb.collection('notes').insertOne({note}).then(result =>
    mdb.collection('properties').findAndModify(
      { _id: propertyId},
      [],
      {$push: {noteIds: result.insertedId}},
      {new: true}
    ).then(doc =>
      res.send({
        updatedProperty: doc.value,
        newNote: { _id : result.insertedId, note}
      })
      )
  ).catch(error=>{
    console.error(error);
    res.status(404).send('Bad Request');
  });
})
//update property
router.post('/property',(req,res)=>{
  //console.log(req.body);
  //res.send(req.body);
  const propertyId = ObjectID(req.body.propertyId);
  const price = req.body.newPrice;
  const room = req.body.newRoom;
  const Address = req.body.newAddress;
  const City =  req.body.newCity;
  const province = req.body.newprovince;
  const postalCode = req.body.newpostalCode;

  //mdb.collection('notes').insertOne({note}).then(result =>
    mdb.collection('properties').findAndModify(
      { _id: propertyId},
      [],
      {$set: {price: price,
              Room : room,
              Address:Address,
              City : City,
              province: province,
              postalCode:postalCode
                          }},
      {new: true}
    ).then(doc =>
      res.send({
        updatedProperty: doc.value,
        //newNote: { _id : result.insertedId, note}
      })
      )
  .catch(error=>{
    console.error(error);
    res.status(404).send('Bad Request');
  });
})

export default router;
/*
router.get('/properties',(req,res)=> {
  res.send({//array to object
    properties: properties
  });
});

router.get('/properties/:propertyId',(req,res)=>{
  let property = properties[req.params.propertyId];
  property.description = 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'

  res.send(property);
});

export default router;
*/
