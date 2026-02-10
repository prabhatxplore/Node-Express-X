const { getDB } = require("../utils/databaseUtil");


class Favourite {
  static toggleFavourite(homeId) {
    const db = getDB()
    return db.collection('favourites').findOne({ home_id: homeId }).then(fav => {
      if (!fav) {
        return db.collection('favourites').insertOne({ home_id: homeId })
      } else {
        return db.collection('favourites').deleteOne({ home_id: homeId })
      }
    })

  }

  static fetchFav() {
    const db = getDB();
    return db.collection('favourites').find().toArray()
  }

  static deleteById(homeId) {
    return db.collection('favourites').deleteOne({ home_id: homeId })
  }
}

module.exports = Favourite;
