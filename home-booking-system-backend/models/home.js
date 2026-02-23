const mongoose = require('mongoose');



const homeSchema = mongoose.Schema({
  house_name: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  photo: { type: String, required: true },
  description: { type: String, default: "No description" },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model('Home', homeSchema);