const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const filePath = path.join(rootDir, "data", "homeData.json");

module.exports = class Home {
  constructor(houseName, price, location, imageLink) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.imageLink = imageLink;
  }

  save() {
    Home.fetchData((registeredHomes) => {
      registeredHomes.push(this);
      fs.writeFile(filePath, JSON.stringify(registeredHomes), (error) => {
        console.log(error);
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
};
