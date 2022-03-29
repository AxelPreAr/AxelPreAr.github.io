//array de objetos
let carrito = [];
let productos = [];
//variables globales
let formMenu = document.getElementById("formMenu");
let containerProducto = document.getElementById("containerProducto");
let divCarrito = document.getElementById("divCarrito");
let changeBtn = document.getElementById("change-btn")
let todoId;
let dolar;


//creacion del localStorage
if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
} else {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
if (localStorage.getItem('dolar')) {
    dolar = localStorage.getItem('dolar');
} else {
    localStorage.setItem('dolar', "no")

}

//funcion que obtiene los datos del dolar
async function datosDolar() {
    const response = await fetch('https://mindicador.cl/api');
    return await response.json();
}

//clases
class Cafe {
    constructor(id, nombre, precio, tipo, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.tipo = tipo;
        this.foto = foto;
    }
}
class ElementoCarrito {
    constructor(id, cantidad, subtotal) {
        this.id = id;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }
}

//creacion de objetos por defecto
const cafe1 = new Cafe(1, "Cortado", 1600, "menu", "images/menu-1.png");
const cafe2 = new Cafe(2, "Mokaccino", 2000, "menu", "images/menu-2.png");
const cafe3 = new Cafe(3, "Capuccino", 1800, "menu", "images/menu-3.png");
const cafe4 = new Cafe(4, "Caramel Macchiato", 2200, "menu", "images/menu-4.png");
const cafe5 = new Cafe(5, "Latte", 1700, "menu", "images/menu-5.png");
const cafe6 = new Cafe(6, "Milo", 1200, "menu", "images/menu-6.png");
const producto1 = new Cafe(7, "Cafe Nicaragüense", 6500, "producto", "images/product-1.png");
const producto2 = new Cafe(8, "Cafe Colombiano", 4990, "producto", "images/product-2.png");
const producto3 = new Cafe(9, "Cafe Peruano", 1000, "producto", "images/product-3.png");


//ingreso de los objetos dentro del array de productos
productos = [cafe1, cafe2, cafe3, cafe4, cafe5, cafe6, producto1, producto2, producto3];


//llenado del apartado de productos dentro del html
function llenadoPagina() {

    //si dentro del local storage, el cambio del dolar es yes, se aplica el cambio en el precio
    if (dolar == "yes") {
        datosDolar().then(dolar => {




            productos.forEach((prod) => {
                let { id, nombre, precio, tipo, foto } = prod;

                precio = Math.floor(precio / dolar.dolar.valor);
                precioPrevio = precio + (500 / dolar.dolar.valor)

                if (tipo === "menu") {
                    formMenu.innerHTML += `
        
        
                        <div class="box" data-id="${id}">
                            <img src="${foto}" alt="">
                            <h3 class="a">${nombre}</h3>
                            <div class="price">$${precio} <span>$${precioPrevio.toFixed(2)}</span></div>
                            <a class="btn comprar">a&ntilde;adir</a>
                        </div> 
        
        
                    `

                }
                else {
                    containerProducto.innerHTML += `
                    <div class="box" data-id="${id}">
                        <div class="icons">
                            <a class="fas fa-shopping-cart"></a>
                        </div>
                        <div class="image">
                            <img src="${foto}" alt="">
                        </div>
                        <div class="content">
                            <h3>${nombre}</h3>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="price">$${precio} <span>$${precioPrevio.toFixed(2)}</span></div>
                        </div>
                   </div>    
                    `
                }


            })

        })
        //sino, se deja el precio en pesos
    } else {
        //llenado de los apartados de cafe-menu y cafe-producto
        productos.forEach(producto => {
            let { id, nombre, precio, tipo, foto } = producto;



            if (tipo === "menu") {
                formMenu.innerHTML += `


                <div class="box" data-id="${id}">
                    <img src="${foto}" alt="">
                    <h3 class="a">${nombre}</h3>
                    <div class="price">$${precio} <span>$${precio + 500}</span></div>
                    <a class="btn comprar">a&ntilde;adir</a>
                </div> 


            `

            }
            else {
                containerProducto.innerHTML += `
            <div class="box" data-id="${id}">
                <div class="icons">
                    <a class="fas fa-shopping-cart"></a>
                </div>
                <div class="image">
                    <img src="${foto}" alt="">
                </div>
                <div class="content">
                    <h3>${nombre}</h3>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <div class="price">$${precio} <span>$${precio + 1000}</span></div>
                </div>
           </div>    
            `
            }


        });
    }



}

function totalApagar() {
    return carrito.reduce((total, producto) => total + producto.subtotal, 0);
}
//llenado del apartado de carrito de compras
function llenadoCarrito() {
    //llenamos el array del carrito con los datos del local storage
    carrito = JSON.parse(localStorage.getItem('carrito'));

    /* Este while se ejecutará en caso que el div, que contiene los elementos del carrito de compras, tenga elementos dentro
       En caso de ser asi los elimara, para luego llenarlos nuevamente, esto se hace para evitar que cada vez que se agregue
       un producto al carrito, se repitan los mismos productos*/
    while (divCarrito.firstChild) {
        divCarrito.removeChild(divCarrito.firstChild);
    }

    // se recorre el array del carrito
    carrito.forEach(producto => {
        let { id: idCarrito, cantidad, subtotal } = producto;
        {
            if (dolar == "yes") {
                datosDolar().then(dolar => {

                    productos.forEach(stock => {
                        let { id: idProducto, nombre, foto } = stock;

                        /*si coinciden los id tanto de los elementos dentro del carrito, como los elementos del array de los productos
                        se llenara el apartado del html que corresponde al carrito*/
                        if (idCarrito === idProducto) {
                            divCarrito.innerHTML += `
                                <div class="cart-item" data-id ="${idProducto}">
                                    <span class="fas fa-times"></span>
                                    <img src="${foto}" alt="">
                                    <div class="content">
                                        <h3>${nombre}</h3>
                                        <div class="price"> $${Math.trunc(subtotal / dolar.dolar.valor)}</div>
                                        <div class="price">Unidades: ${cantidad}</div>
                                    </div>
                                </div>
                            `
                        }

                    });


                })
            }
            else {
                //se recorre el array de los productos
                productos.forEach(stock => {
                    let { id: idProducto, nombre, foto } = stock;

                    /* si coinciden los id tanto de los elementos dentro del carrito, como los elementos del array de los productos
                       se llenara el apartado del html que corresponde al carrito */
                    if (idCarrito === idProducto) {
                        divCarrito.innerHTML += `
                    <div class="cart-item" data-id ="${idProducto}">
                        <span class="fas fa-times"></span>
                        <img src="${foto}" alt="">
                        <div class="content">
                            <h3>${nombre}</h3>
                            <div class="price"> $${subtotal}</div>
                            <div class="price">Unidades: ${cantidad}</div>
                        </div>
                    </div>
                `
                    }

                });
            }
        }


    });
    //si el largo del arreglo es mayor a 0 entonces se agregara el boton pagar, sino no aparecera
    if (carrito.length > 0) {
        divCarrito.innerHTML += `
        <h3 class="as">total a pagar: $${totalApagar()}</h3>
        <a href="#" class="btn">Pagar</a>`
    }


}

//funcion que crea los eventos
function eventosListeners() {

    //evento que agrega los cafe de menu al carrito de compra
    formMenu.addEventListener("click", (e) => {

        //obtenemos el nombre de la etiqueta seleccionada
        const nombreElemento = e.target.localName;
        //obtenemos el elemento padre de la etiqueta seleccionada
        const todoElemento = e.target.parentElement;
        //obtenenos el id del producto, esta se encuentra dentro del elemento padre
        todoId = todoElemento.getAttribute('data-id');

        //si el elemento seleccionado es a (un hipervinculo), entonces se agrega el producto seleccionado al carrito
        if (nombreElemento.includes('a')) {

            //se obtiene el producto seleccionado gracias al id que se encontro dentro del contenedor
            let productoSelecconado = productos.find(encontrarProducto)
            let { id: idSeleccionado, precio: precioSeleccionado, nombre: nombreSeleccionado } = productoSelecconado;

            //se declara una variable que indicará si el producto seleccionado existe dentro del carrito
            let existe = carrito.some((producto) => producto.id === idSeleccionado);

            //si el producto existe:
            if (existe) {
                //se modifica la cantidad del producto, asi como tambien el subtotal
                carrito.map((producto) => {
                    if (producto.id === idSeleccionado) {
                        producto.cantidad++;
                        producto.subtotal = producto.cantidad * productoSelecconado.precio;
                    }

                })
                //se guarda el carrito en el local storage
                localStorage.setItem('carrito', JSON.stringify(carrito));
            } else {
                //sino, se agrega el nuevo producto al carrito
                const elementoCarrito = new ElementoCarrito(idSeleccionado, 1, precioSeleccionado)
                carrito.push(elementoCarrito);

                ////se guarda el carrito en el local storage
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }
            //se llena el apartado del carrito de compras
            llenadoCarrito();
            toasty(nombreSeleccionado);
        }


    });

    //evento que añade los cafe para preparar al carrito de compras
    containerProducto.addEventListener("click", (e) => {

        //obtenemos el nombre de la etiqueta seleccionada
        const nombreElemento = e.target.localName;
        //obtenemos el elemento padre de la etiqueta seleccionada
        const todoElemento = e.target.parentElement.parentElement;
        //obtenenos el id del producto, esta se encuentra dentro del elemento padre
        todoId = todoElemento.getAttribute('data-id');

        //si el elemento seleccionado es a (un hipervinculo), entonces se agrega el producto seleccionado al carrito
        if (nombreElemento.includes('a')) {

            //se obtiene el producto seleccionado gracias al id que se encontro dentro del contenedor
            let productoSelecconado = productos.find(encontrarProducto)
            let { id: idSeleccionado, precio: precioSeleccionado, nombre: nombreSeleccionado } = productoSelecconado;

            //se declara una variable que indicará si el producto seleccionado existe dentro del carrito
            let existe = carrito.some((producto) => producto.id === idSeleccionado);

            //si el producto existe:
            if (existe) {
                //se modifica la cantidad del producto, asi como tambien el subtotal
                carrito.map((producto) => {
                    if (producto.id === idSeleccionado) {
                        producto.cantidad++;
                        producto.subtotal = producto.cantidad * productoSelecconado.precio;
                    }

                })
                //se guarda el carrito en el local storage
                localStorage.setItem('carrito', JSON.stringify(carrito));
            } else {
                //sino, se agrega el nuevo producto al carrito
                const elementoCarrito = new ElementoCarrito(idSeleccionado, 1, precioSeleccionado)
                carrito.push(elementoCarrito);

                ////se guarda el carrito en el local storage
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }

            //se llena el apartado del carrito de compras
            llenadoCarrito();
            toasty(nombreSeleccionado)

        }

    });

    //evento que elimina un producto dentro del carrito de compras
    divCarrito.addEventListener("click", (e) => {
        //obtenemos el nombre de la etiqueta seleccionada
        const nombreElemento = e.target.localName;
        //obtenemos el elemento padre de la etiqueta seleccionada
        const todoElemento = e.target.parentElement;
        //obtenenos el id del producto, esta se encuentra dentro del elemento padre
        todoId = todoElemento.getAttribute('data-id');

        if (nombreElemento.includes('span')) {
            popUpEliminar();
        }



    });

    //evento que cambia el precio de los productos de pesos a dolares
    changeBtn.addEventListener("click", (e) => {
        if (dolar !== "yes") {
            localStorage.setItem("dolar", "yes");
        } else {
            localStorage.setItem("dolar", "no");
        }

        recargarPagina();
    })
}

//funcion que dentro del metodo find, encuentra y retorna el producto buscado
function encontrarProducto(producto, index) {

    if (producto.id == todoId) {
        return producto;
    }
    return null;
}

//funcion que realiza el pop up de advertencia al eliminar
function popUpEliminar(e) {
    let { nombre } = productos.find(encontrarProducto);

    Swal.fire({
        title: "🛒",
        text: `¿Desea Eliminar el ${nombre} del carrito?`,
        icon: "warning",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        confirmButtonColor: "#d3ad7f",
        confirmButtonText: 'Si',
        showCancelButton: true,
        cancelButtonText: 'No',
        cancelButtonColor: '#FF5733'
    }).then((result) => {

        if (result.isConfirmed) {

            //se elimina el producto del carrito
            eliminarDelCarrito(e);

        }
        else {
            Swal.fire({
                title: "🛒",
                text: `${nombre} No Eliminado`,
                icon: "info",
                confirmButtonColor: "#d3ad7f"
            })
        }

    });
}

//funcion que elimina el producto seleccionado
function eliminarDelCarrito() {


    //obtenemos el carrito de compras que esta en el localStorage
    carrito = JSON.parse(localStorage.getItem('carrito'));
    //buscamos el producto dentro del carrito de compras, gracias al id del contendor
    let elementoSeleccionado = carrito.find(encontrarProducto);

    //eliminamos el producto del carrito de compras
    carrito = carrito.filter((producto) => producto.id !== elementoSeleccionado.id);

    //ingresamos nuevamente el carrito de compras, sin el producto seleccionado, al local storage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    //llenamos nuevamente el html del carrito de compras
    llenadoCarrito();

}

//funcion que muestra la notificacion toast

function toasty(nombreProducto) {
    Toastify({
        text: `${nombreProducto} agregado al carrito`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        avatar: "../images/favpng_coffee-cafe-logo.png",
        style: {
            background: "linear-gradient(90deg, rgba(213,184,137,1) 0%, rgba(211,173,112,1) 45%, rgba(201,136,31,1) 100%)",
            height: "50px",
            color: "white",
            fontSize: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid white"

        }
    }).showToast();
}


//funcion que recarga la pagina
function recargarPagina() {
    location.reload()
}

//ejecucion de los metodos
llenadoPagina();

eventosListeners();
llenadoCarrito();
