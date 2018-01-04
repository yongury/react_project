import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  let propertyCount = 0;
  db.collection('properties').find({}).each((err, property) => {
    assert.equal(null, err);
    if (!property) { return; }

    propertyCount++;
    db.collection('notes')
      .find({ id: { $in: property.noteIds }})
      .project({ _id: 1 })
      .toArray()
      .then(_ids => {
        const newIds = _ids.map(o => o._id);
        db.collection('properties').updateOne(
          { id: property.id },
          { $set: { noteIds: newIds } }
        ).then(() => {
          console.info('Updated', property._id);
          propertyCount--;
          if (propertyCount === 0) { db.close(); }
        });
      })
      .catch(console.error);
  });

});
