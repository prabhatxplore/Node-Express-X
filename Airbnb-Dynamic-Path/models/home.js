const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Favourite = require("./favourite");

const filePath = path.join(rootDir, "data", "homeData.json");

module.exports = class Home {
  constructor({ id = crypto.randomUUID(), houseName, price, location, imageLink }) {
    this.id = id;
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.imageLink = imageLink;
    this.fav = false;
  }

  save(isEdit) {
    console.log(isEdit)
    Home.fetchData((registeredHomes) => {
      if (isEdit) {
        registeredHomes = registeredHomes.map(home => {
          if (home.id === this.id) {
            return this;
          } else {
            return home;
          }
        })
      } else {
        registeredHomes.push(this);
      }

      fs.writeFile(filePath, JSON.stringify(registeredHomes), (error) => {
        console.log('is thhis', error);
      });
    });
  }

  static fetchData(cb) {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (!err && data.trim() != 0) {
        cb(JSON.parse(data));
      } else {
        cb([]);
      }
    });
  }
  static deleteById(homeId, cb) {
    this.findById(homeId, (home) => {
      if (!home) {
        console.log("cannot find id / didnot exist on data");
        cb();
      } else {
        this.fetchData((registeredHomes) => {
          const updatedHomes = registeredHomes.filter(
            (home) => home.id !== homeId,
          );
          fs.writeFile(filePath, JSON.stringify(updatedHomes), (err) => {
            Favourite.deleteById(homeId, cb);
          });
        });
      }
    });
  }
  static findById(homeId, cb) {
    this.fetchData((registeredHomes) => {
      registeredHomes.forEach((home) => {
        if (home.id === homeId) {
          console.log("hello");
          return cb(home);
        }
      });
    });
  }

};
