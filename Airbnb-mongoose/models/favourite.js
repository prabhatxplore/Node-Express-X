const mongoose = require('mongoose')


const favouriteSchema = mongoose.Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
    required: true
  }
})

favouriteSchema.pre('findOneAndDelete', async function () {
  const homeId = this.getQuery().homeId
  const Home = mongoose.model('Home');
  await Home.findOne({ _id: homeId }).then((d) => {
    d.isFav = !d.isFav;
    d.save();
  })
})
module.exports = mongoose.model('Favourite', favouriteSchema);