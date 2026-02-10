const mongo = require('mongodb')

const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://aribnb_db_user:HcDY5m7xlpyAoD8y@airbnb.kvcoexg.mongodb.net/?appName=Airbnb"

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL).then(client => {
    // console.log(client);
    callback();
    _db = client.db('airbnb')
  }).catch(err => {
    console.log(err);
  })

}

const getDB = () => {
  if (!_db) {
    throw new Error('Mongo not connected');
  }
  return _db;
}
module.exports.getDB = getDB
module.exports.mongoConnect = mongoConnect