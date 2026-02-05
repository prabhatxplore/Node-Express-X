const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const filePathFav = path.join(rootDir, "data", "favData.json");

module.exports = class Favourite {
  static addToFavourite(homeId, cb) {
    this.fetchFav((fav) => {
      if (fav.includes(homeId)) {
        cb("already exist on fav list");
      } else {
        fav.push(homeId);
        fs.writeFile(filePathFav, JSON.stringify(fav), cb);
      }
    });
  }

  static fetchFav(cb) {
    fs.readFile(filePathFav, "utf-8", (err, data) => {
      if (!err && data.trim() != 0) {
        cb(JSON.parse(data));
      } else {
        cb([]);
      }
    });
  }
};
