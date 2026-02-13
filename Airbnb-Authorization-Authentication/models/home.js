const mongoose = require('mongoose');



const homeSchema = mongoose.Schema({
  house_name: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image_url: { type: String, required: true },
  description: String,
  isFav: { type: Boolean, default: false }
});

homeSchema.pre('findOneAndDelete', async function () {
  const id = this.getQuery()._id
  // console.log('This is the homeSchema pre', id)
  const Favourite = mongoose.model('Favourite');
  await Favourite.deleteOne({ homeId: id });
})
module.exports = mongoose.model('Home', homeSchema);