import { createCards, filterProducts, writeSponsors, createCarru, createShopping, fillHeart } from "./module/functions.js";

const container = document.getElementById("card-container")
const searchBar = document.getElementById("search-bar")
const shopping = document.getElementById("cart")
const carrito = document.getElementById("btn-car")
const modalCarrito = document.getElementById("modal-content")
const btnHeart = document.getElementsByClassName("btn-heart")
const form = document.getElementById("form")

let products = JSON.parse(localStorage.getItem("products")) || [] // trae del local storage los productos que fueron agregados al carrito
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []

localStorage.setItem("products", JSON.stringify(products))

let precioTotal = 0
createShopping(products,shopping,precioTotal,true)

let toys = JSON.parse(localStorage.getItem("toys")) || [] // toma el value de la key "toys" en el localStorage y lo guarda en la variable toys
let pharmacyProducts = JSON.parse(localStorage.getItem("pharmacyProducts")) || []
let cartProducts = toys.concat(pharmacyProducts)

createCards(pharmacyProducts, container, "")

fillHeart(pharmacyProducts,favoritos,btnHeart)

searchBar.addEventListener("keyup", (e) => {
    let filteredpharmacyProducts = filterProducts(pharmacyProducts, e.target.value.toLowerCase())
    createCards(filteredpharmacyProducts, container, e.target.value.toLowerCase())
})

container.addEventListener("click", (e) => {
    if (e.target.localName === "button") {
        let pressPharmacyProduct = pharmacyProducts.find(pharmacyProduct => pharmacyProduct._id == e.target.id)
        if (pressPharmacyProduct.disponibles > 0) {
            for (let pharmacyProduct of pharmacyProducts) {
               if (pharmacyProduct == pressPharmacyProduct) {
                   let i = pharmacyProducts.indexOf(pharmacyProduct)
                   pressPharmacyProduct.disponibles--

                   pharmacyProducts[i] = pressPharmacyProduct
                   localStorage.setItem("pharmacyProducts", JSON.stringify(pharmacyProducts)) // se actualiza la propiedad del localStorage, para que cuando recargues la pag no se vuelva a la info antigua
                   let unidades = document.getElementById(`unidades-${pressPharmacyProduct._id}`)
                   unidades.textContent = `${pressPharmacyProduct.disponibles} unidades` // toma el id de <p> y le cambia el textContent
               }
            }
            
            products.push(pressPharmacyProduct)
            localStorage.setItem("products", JSON.stringify(products)) // actualiza el valor de la key "products" en el localStorage
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ya no hay stock disponible',
            })
        }
    }
    else if (e.target.offsetParent && e.target.offsetParent.className == "card producto") { //si existe un parent y ese parent tiene className card y producto
        let modal = e.target.offsetParent.nextElementSibling // el elemento que le sigue al parent, en este caso el modal
        modal.addEventListener("click", (e) => {
            if (e.target.className.includes("modal-container")) {
                createCards(pharmacyProducts, container, "") //cuando se clickee afuera del modal se actualizan las cards
                
                fillHeart(pharmacyProducts,favoritos,btnHeart)

            }
        })
    }
    else if(e.target.localName == "path"){
        if(favoritos.some( fav => fav.producto == e.target.id) ){
            favoritos = favoritos.filter( fav => fav.producto != e.target.id )
            e.target.classList.replace("redPath", "black")
            localStorage.setItem( 'favoritos', JSON.stringify( favoritos ) )
        }else{
            favoritos.push(pharmacyProducts.find( producto => producto.producto == e.target.id ))
            e.target.classList.replace("black", "redPath")
            localStorage.setItem( 'favoritos', JSON.stringify( favoritos ) )
        }
    }
})

carrito.addEventListener("click", (e) => {
    precioTotal = 0
    products.forEach(product => precioTotal += product.precio)
    createShopping(products,shopping,precioTotal,true) // actualiza el modal del carrito

    modalCarrito.addEventListener("click", (e) => {
        if (e.target.className.includes("garbage")) {
            let id = e.target.id
            cartProducts.forEach(cartProduct => {
                if (cartProduct._id == id) {         
                    let finalProduct = products.find( product => product._id == cartProduct._id)           
                    let position = products.findIndex( product => product == finalProduct )         
                    products.splice(position,1)
                    localStorage.setItem("products", JSON.stringify(products))

                    cartProduct.disponibles++
                }
            })
            localStorage.setItem("toys", JSON.stringify(cartProducts.filter(product => product.categoria == "jugueteria")))
            localStorage.setItem("pharmacyProducts", JSON.stringify(cartProducts.filter(product => product.categoria == "farmacia")))

            precioTotal = 0
            products.forEach(product => precioTotal += product.precio)
            createShopping(products,shopping,precioTotal,true) 

        }else if(e.target.id == "eliminar"){
            cartProducts.forEach(cartProduct => {
                products.forEach(product => {
                    if(product._id == cartProduct._id){
                        cartProduct.disponibles++
                    }
                })
            })
            localStorage.setItem("toys", JSON.stringify(cartProducts.filter(product => product.categoria == "jugueteria")))
            localStorage.setItem("pharmacyProducts", JSON.stringify(cartProducts.filter(product => product.categoria == "farmacia")))
            products = []
            localStorage.setItem("products", JSON.stringify(products))
            precioTotal = 0
            createShopping(products,shopping,precioTotal,true)

        }else if(e.target.id == "comprar"){
            products = []
            localStorage.setItem("products", JSON.stringify(products))
            precioTotal = 0
            createShopping(products,shopping,precioTotal,true)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Compra realizada con exito',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
    
    let modal = document.getElementById("staticBackdrop") // el elemento que le sigue al parent, en este caso el modal
    modal.addEventListener("click", (e) => {
        if (e.target.className.includes("modal-container")) {
            createCards(pharmacyProducts, container, "") //cuando se clickee afuera del modal se actualizan las cards
            fillHeart(pharmacyProducts,favoritos,btnHeart)
        }
        
    })
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
})

let slideTrack = document.getElementById("slide-track")

let array = ["dog-chow.png", "dog-selection.png", "dogui.png", "kongo.jpg", "pedigree.png", "proplan.png", "royal-canin.png", "sabrocitos.png", "whiscas.png", "dog-chow.png", "dog-selection.png", "dogui.png", "kongo.jpg", "pedigree.png", "proplan.png", "royal-canin.png", "sabrocitos.png", "whiscas.png"]

writeSponsors(array, slideTrack)

let slide = document.getElementById("slide")

let array2 = ["dog.jpg", "pexels-adam-kontor-333083.jpg", "pexels-kat-smith-551628.jpg", "dog-ball.jpg", "carpincho.jpg"]

createCarru(array2, slide)



// PARA BORRAR ITEMS DEL CARRITO
// if( products.some( product => product._id == e.target.id) ){
//     products = products.filter( (product) => product._id != e.target.id)
//     localStorage.setItem("products", JSON.stringify(products))
// }