import { getData, createCards, filterProducts, writeSponsors, createCarru,createShopping } from "./module/functions.js";

const container = document.getElementById("card-container")
const searchBar = document.getElementById("search-bar")
const shopping = document.getElementById("cart")


let products = JSON.parse(localStorage.getItem("products")) || [] // trae del local storage los productos que fueron agregados al carrito

let data = getData()
data.then((response) => {
    if (!JSON.parse(localStorage.getItem("toys"))) {
        let items = response.filter((product) => product.categoria === "jugueteria") // guarda en items los productos con categoria "jugueteria" traidos del fetch
        localStorage.setItem("toys", JSON.stringify(items)) // crea una propiedad en localStorage donde la key es "toys" y el value son todos los items
    }

    let toys = JSON.parse(localStorage.getItem("toys")) || [] // toma el value de la key "toys" en el localStorage y lo guarda en la variable toys
    createCards(toys, container, "")

    searchBar.addEventListener("keyup", (e) => {
        let filteredToys = filterProducts(toys, e.target.value.toLowerCase())
        createCards(filteredToys, container, e.target.value.toLowerCase())
    })

    container.addEventListener("click", (e) => {
        if (e.target.localName === "button") {
            let pressToy = toys.find(toy => toy._id == e.target.id)
            if (pressToy.disponibles > 0) {
                products.push(pressToy)
                localStorage.setItem("products", JSON.stringify(products))
                for (let toy of toys) {
                    if (toy == pressToy) {
                        let i = toys.indexOf(toy)
                        pressToy.disponibles--
                        toys[i] = pressToy
                        localStorage.setItem("toys", JSON.stringify(toys))
                        let unidades = document.getElementById(`unidades-${pressToy._id}`)
                        unidades.textContent = `${pressToy.disponibles} unidades`
                    }
                }
            }
        }
        else if (e.target.offsetParent && e.target.offsetParent.className == "card producto") { //si existe un parent y ese parent tiene className card y producto
            let modal = e.target.offsetParent.nextElementSibling // el elemento que le sigue al parent, en este caso el modal
            modal.addEventListener("click", (e) => {
                if (e.target.className.includes("modal-container")) {
                    createCards(toys, container, "") //cuando se clickee afuera del modal se actualizan las cards
                }
            })
        }
    })


})



let slideTrack = document.getElementById("slide-track")

let array = ["dog-chow.png", "dog-selection.png", "dogui.png", "kongo.jpg", "pedigree.png", "proplan.png", "royal-canin.png", "sabrocitos.png", "whiscas.png", "dog-chow.png", "dog-selection.png", "dogui.png", "kongo.jpg", "pedigree.png", "proplan.png", "royal-canin.png", "sabrocitos.png", "whiscas.png"]

writeSponsors(array, slideTrack)

let slide = document.getElementById("slide")

let array2 = ["dog.jpg", "pexels-adam-kontor-333083.jpg", "pexels-kat-smith-551628.jpg", "dog-ball.jpg", "carpincho.jpg"]

createCarru(array2, slide)

createShopping(shopping)

// PARA BORRAR ITEMS DEL CARRITO
// if( products.some( product => product._id == e.target.id) ){
//     products = products.filter( (product) => product._id != e.target.id)
//     localStorage.setItem("products", JSON.stringify(products))
// }