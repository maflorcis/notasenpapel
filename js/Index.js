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
        <button class="btn btn-primary" onclick="detalleLibro('${LibroAgregado.codigo}')">ver detalle</button>
        <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${LibroAgregado.codigo}">Agregar Al Carrito</a>
        
      </div>
    </div>
  </aside>
  `;
}

function detalleLibro(codigo) {
  console.log(codigo);
  console.log(window.location.origin + "/Administrador.html?codigo=" + codigo);
  window.location.href =
    window.location.origin + "/Administrador.html?codigo=" + codigo;
  //hay que ajustar y crear la web de detalle
}

function detalleLibro2(codigo) {
  console.log(codigo);
}

//ACÁ VEMOS SI PODEMOS HACER EL CARRITO DE COMPRAS

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

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

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//Eliminar un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
  }
}

function leerDatosCurso(curso) {
  console.log(curso);

  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h5").textContent,
    precio: curso.querySelector("h6").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si un elemento ya existe en el carrito

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //Actualizamos la cantidad

    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna objeto actualizado
      } else {
        return curso; // retorna objetos no duplicados
      }
    });

    articulosCarrito = [...cursos];
  } else {
    //Agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  
  //Agrega elementos al arreglo de carrito
  console.log(infoCurso);

  //console.log(articulosCarrito);

  carritoHTML();
}

//Muestra el carrito de compras en el html

function carritoHTML() {
  //Limpiar el HTML

  limpiarHTML();

  //Recorre el carrito y genera el HTML

  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    //console.log(curso);
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">  </td>

        <td> ${titulo} </td>

        <td> ${precio} </td>

        <td>${cantidad}</td>

        <td> <a href="#" class="borrar-curso" data-id=${id}> X </a> </td>
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