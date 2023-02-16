import { getData, createCards, filterProducts,writeSponsors,createCarru,createShopping} from "./module/functions.js";

const container = document.getElementById("card-container")
const searchBar = document.getElementById("search-bar")
const shopping = document.getElementById("cart")

let data = getData()
data.then( (response) => {
    let pharmacyProducts = response.filter( (product) => product.categoria === "farmacia")
    createCards(pharmacyProducts,container,"")

    searchBar.addEventListener( "keyup", (e) => {
        let filteredPharmacyProducts = filterProducts(pharmacyProducts, e.target.value.toLowerCase())
        createCards(filteredPharmacyProducts,container,e.target.value.toLowerCase())
    })
})

let slideTrack = document.getElementById("slide-track")

let array = ["dog-chow.png","dog-selection.png","dogui.png","kongo.jpg","pedigree.png","proplan.png","royal-canin.png","sabrocitos.png","whiscas.png","dog-chow.png","dog-selection.png","dogui.png","kongo.jpg","pedigree.png","proplan.png","royal-canin.png","sabrocitos.png","whiscas.png"]

writeSponsors(array, slideTrack)

let slide = document.getElementById("slide")

let array2 = ["dog.jpg","pexels-adam-kontor-333083.jpg","pexels-kat-smith-551628.jpg","dog-ball.jpg","carpincho.jpg"]

createCarru(array2,slide)

createShopping(shopping)