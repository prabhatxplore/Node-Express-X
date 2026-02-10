const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");
const Favourite = require("./favourite");


module.exports = class Home {
  constructor({
    house_name,
    price,
    location,
    image_url, _id
  }) {
    this.house_name = house_name;
    this.price = price;
    this.location = location;
    this.image_url = image_url;
    this.description = null;
    if (_id) {
      this._id = _id
    }
  }

  save() {
    const db = getDB();
    if (this._id) {
      const _id = this._id
      delete this._id
      console.log('thisis edit')
      return db.collection("homes").updateOne({ _id: new ObjectId(String(_id)) }, { $set: this })

    } else {
      console.log('thisis edit')
      return db.collection('homes').insertOne(this);
    }
  }

  static fetchHome() {
    const db = getDB();
    return db.collection("homes").find().toArray()
  }
  static deleteById(homeId) {
    const db = getDB();
    return db.collection('homes').deleteOne({ _id: new ObjectId(homeId) }).then(() => {
      Favourite.deleteById(homeId)
    })
  }
  static findById(homeId) {
    const db = getDB();
    return db.collection("homes").find({ _id: new ObjectId(homeId) }).next();
  }
};
