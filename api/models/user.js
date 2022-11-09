const mongoose = require("mongoose");

// const {MongoClient} = require('mongodb');

// const bucket = new mongodb.GridFSBucket(db);

// fs.createReadStream('./myFile').
//      pipe(bucket.openUploadStream('myFile', {
//          chunkSizeBytes: 1048576,
//          metadata: { field: 'myField', value: 'myValue' }
//      }));

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  img: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;


