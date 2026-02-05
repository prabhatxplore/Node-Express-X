const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const filePathFav = path.join(rootDir, "data", "favData.json");

class Favourite {
  static toggleFavourite(favId, cb) {
    // console.log(typeof favId);
    let updatedFav;
    this.fetchFav((fav) => {
      console.log(typeof fav);
      console.log(fav);
      // if home id exists remove from the list
      if (fav.includes(favId)) {
        updatedFav = fav.filter((id) => id !== favId);
      } //if it doesnont exist
      else {
        fav.push(favId);
        updatedFav = fav;
      }
      fs.writeFile(filePathFav, JSON.stringify(updatedFav), (err) => {
        if (err) {
          console.log(err.message);
        }
        cb();
      });
    });
  }

  static fetchFav(cb) {
    fs.readFile(filePathFav, "utf-8", (err, data) => {
      if (err) {
        console.log("whats the error", err.message);
        console.log(data);
      }

      if (!err && data.trim() !== "") {
        cb(JSON.parse(data));
      } else {
        cb([]);
      }
    });
  }
}

module.exports = Favourite;
