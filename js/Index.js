let libros = JSON.parse(localStorage.getItem("Libros")) || [];

//dibujar columnas
libros.map((LibroAgregado) => {
  crearColumna(LibroAgregado);
});

function crearColumna(LibroAgregado) {
  let grilla = document.querySelector("#grilla");
  grilla.innerHTML += `
    <aside class="col-12 col-md-4 col-lg-3 mb-3">
    <div class="card" >
      <img src="${LibroAgregado.imagen}" class="card-img-top" alt="${LibroAgregado.titulo}">
      <div class="card-body">
        <h5 class="card-title">${LibroAgregado.titulo}</h5>
        <h6 class="card-title">${LibroAgregado.precio}</h6>
       <button class="btn btn-primary mb-2" onclick="detalleLibro('${LibroAgregado.codigo}')">ver detalle</button>
       <br> 
        <a href="#" class="botonC u-full-width button-primary button input agregar-carrito" data-id="${LibroAgregado.codigo}">Agregar Al Carrito</a>
        
      </div>
    </div>
  </aside>
  `;
}

function detalleLibro(codigo) {
  console.log(codigo);
  console.log(window.location.origin + "/pages/detalle.html?codigo=" + codigo);
  window.location.href =
    window.location.origin + "/pages/detalle.html?codigo=" + codigo;
  //hay que ajustar y crear la web de detalle
}

function detalleLibro2(codigo) {
  console.log(codigo);
}

//ACÁ VEMOS SI PODEMOS HACER EL CARRITO DE COMPRAS

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaPartis = document.querySelector("#lista-partis");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  listaPartis.addEventListener("click", agregarPartitura);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarPartitura);

  //Muestra los cursos de local storage

  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  });

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];

    limpiarHTML(); // ELiminamos todo el html
  });
}

function agregarPartitura (e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const partituraSeleccionado = e.target.parentElement.parentElement;
    leerDatosPartis(partituraSeleccionado);
  }
}

//Eliminar un curso del carrito
function eliminarPartitura(e) {
  if (e.target.classList.contains("borrar-parti")) {
    const partiId = e.target.getAttribute("data-id");

    //Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((parti) => parti.id !== partiId);
    carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
  }
}

function leerDatosPartis(parti) {
  console.log(parti);

  const infoParti = {
    imagen: parti.querySelector("img").src,
    titulo: parti.querySelector("h5").textContent,
    precio: parti.querySelector("h6").textContent,
    id: parti.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si un elemento ya existe en el carrito

  const existe = articulosCarrito.some((parti) => parti.id === infoParti.id);
  if (existe) {
    //Actualizamos la cantidad

    const partis = articulosCarrito.map((parti) => {
      if (parti.id === infoParti.id) {
        parti.cantidad++;
        return parti; // retorna objeto actualizado
      } else {
        return parti; // retorna objetos no duplicados
      }
    });

    articulosCarrito = [...partis];
  } else {
    //Agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoParti];
  }

  
  //Agrega elementos al arreglo de carrito
  console.log(infoParti);

  //console.log(articulosCarrito);

  carritoHTML();
}

//Muestra el carrito de compras en el html

function carritoHTML() {
  //Limpiar el HTML

  limpiarHTML();

  //Recorre el carrito y genera el HTML

  articulosCarrito.forEach((parti) => {
    const { imagen, titulo, precio, cantidad, id } = parti;
    //console.log(parti);
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">  </td>

        <td> ${titulo} </td>

        <td> ${precio} </td>

        <td>${cantidad}</td>

        <td> <a href="#" class="borrar-parti" data-id=${id}> X </a> </td>
        `;

    //Agrega el HTML del carrito en el tbody

    contenedorCarrito.appendChild(row);
  });

  //Agregamos el carrito de compras al storage
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}
//Elimina los cursos del tbody

function limpiarHTML() {
  //forma lenta
  //contenedorCarrito.innerHTML = '';

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}



//BUSCADOR
let productos = JSON.parse(localStorage.getItem('Libros')) || [];

//const productos = [
 // {nombre: 'Platanos', valor: 500},
 // {nombre: 'Peras', valor: 1500},
 // {nombre: 'Manzanas', valor: 700}]

const formularioBuscador = document.querySelector('#formularioBuscador');
const boton = document.querySelector('#boton');
const resultado = document.querySelector('#resultado');


const filtrar = () => {
  //console.log(formularioBuscador.value);
  resultado.innerHTML = '';
  const texto = formularioBuscador.value.toLowerCase();
  for (let producto of productos){
    let titulo = producto.titulo.toLowerCase();
     if(titulo.indexOf(texto) !== -1) {
      resultado.innerHTML += `
      <li> ${producto.titulo}  - valor: ${producto.precio} </li>      
      `
     }
     if(resultado.innerHTML === ''){
      resultado.innerHTML += `
      <li> Producto no encontrado </li>      
      `
     }
  }

}

boton.addEventListener('click', filtrar);
formularioBuscador.addEventListener('keyup', filtrar);

filtrar();
