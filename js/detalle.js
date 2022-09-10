//obtener el parámetro de la url
console.log(window.location.search);


const parametroCodigo = new URLSearchParams(window.location.search);

console.log(parametroCodigo.get('codigo'))
//buscar en el arreglo de partituras cuál tiene el mismo código de mi parametro

let listaPartituras = JSON.parse(localStorage.getItem('Libros')) || [];
let partiBuscada = listaPartituras.find((partitura) =>{return partitura.codigo === parametroCodigo.get('codigo')});

console.log(partiBuscada)


let detalle = document.querySelector('#seccionDetalle');
detalle.innerHTML = `
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${partiBuscada.imagen}" class="img-fluid rounded-start" alt="Thor: Love and Thunder">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${partiBuscada.titulo}</h5>
                <p class="card-text">${partiBuscada.descripcion}</p>
                <p class="card-text">${partiBuscada.categoria} <span class="badge rounded-pill bg-info">$${partiBuscada.precio}</span></p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
          </div>
      
      `

//dibujar la card