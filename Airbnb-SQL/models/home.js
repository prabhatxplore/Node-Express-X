const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Favourite = require("./favourite");
const db = require("../utils/databaseUtil");

const filePath = path.join(rootDir, "data", "homeData.json");

module.exports = class Home {
  constructor({
    id = crypto.randomUUID(),
    house_name,
    price,
    location,
    image_url,
  }) {
    this.id = id;
    this.house_name = house_name;
    this.price = price;
    this.location = location;
    this.image_url = image_url;
    this.description = null;
  }

  save(isEdit) {
    if (isEdit) {
      return db.execute(
        "UPDATE houses SET house_name=?,price=?,location=?,image_url=? WHERE id=?",
        [
          this.house_name,
          this.price,
          this.location,
          // this.description,
          this.image_url,
          this.id,
        ],
      );
    } else {
      return db.execute(
        "INSERT INTO houses (id ,house_name, price, location, description,image_url) VALUES (?, ?, ?, ?, ?, ?)",
        [
          this.id,
          this.house_name,
          this.price,
          this.location,
          this.description,
          this.image_url,
        ],
      );
    }
  }

  static fetchData() {
    return db.execute("SELECT * FROM houses");
  }
  static deleteById(homeId) {
    return db.execute("DELETE FROM houses WHERE id=?", [homeId]);
  }
  static findById(homeId) {
    return db.execute("SELECT * FROM houses WHERE id=?", [homeId]);
  }
};
