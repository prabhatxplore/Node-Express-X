const { fetchFav } = require("./favourite")
const { fetchHome } = require("./home")

exports.fetchFavHomeList = (callback) => {
    fetchHome().then(allHomes => {
        fetchFav().then(fav => {
            console.log('im in fetch fav', fav)
            const favHomes = [];
            fav.map(home => {
                favHomes.push(home.home_id)
            })

            const registeredHomes = allHomes.map(home => {
                return { ...home, isFav: favHomes.includes(home._id.toString()) }
            });
            console.log(registeredHomes)
            callback(registeredHomes);
        })

    })

}   