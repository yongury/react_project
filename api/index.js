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
// const cityList = [{
//     name: "Red",
//     hex: "#F21B1B"
//   }, {
//     name: "Blue",
//     hex: "#1B66F2"
//   }, {
//     name: "Green",
//     hex: "#07BA16"
//   }];

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
//return filtered properties
router.get('/searchedProperties/:query', (req, res) => {
  let properties ={};
  let query = req.params.query.split(',');
//set if min, max was not defined
  if(query[1]==null){
    query[1]=0;
    query[2]=10000000;
  }
//all properties with ranged price
  if(query[0]=="All"){
    mdb.collection('properties').find().sort({price:1})
       .each((err, property)=> {
         assert.equal(null, err);

         if(!property) {
           res.send({properties});
           return;
         }
         if(property.price >= query[1] && property.price <= query[2])
            properties[property._id] = property;
       });
  }
  //city and ranged properties
  else{
    mdb.collection('properties').find({City:query[0]}).sort({price:1})
       .each((err, property)=> {
         assert.equal(null, err);

         if(!property) {
           res.send({properties});
           return;
         }
         if(property.price >= query[1] && property.price <= query[2])
            properties[property._id] = property;
       });
  }

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
