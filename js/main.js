//Evento para crear un nuevo libro
document.getElementById("formulario").addEventListener("submit", crear);

//EVENTOS PARA VALIDACIONES
titulo.addEventListener("blur", () => {
  cantidadCaracteresTitulo(titulo);
});
codigo.addEventListener("blur", () => {
  cantidadCaracteresCodigo(codigo);
});
descripcion.addEventListener("blur", () => {
  cantidadCaracteresDescripcion(descripcion);
});
imagen.addEventListener("blur", () => {
  validarImagen(imagen);
});

//Función crear

function crear(e) {
  titulo = document.getElementById("titulo").value;
  descripcion = document.getElementById("descripcion").value;
  precio = document.getElementById("precio").value;

  categoria = document.getElementById("categoria").value;
  imagen = document.getElementById("imagen").value;
  stock = document.getElementById("stock").value;
  codigo = document.getElementById("codigo").value;

  let libro = {
    titulo,
    descripcion,
    precio,

    categoria,
    imagen,
    stock,
    codigo,
  };

  //

  if (localStorage.getItem("Libros") === null) {
    let libros = [];
    libros.push(libro);
    localStorage.setItem("Libros", JSON.stringify(libros));
  } else {
    let libros = JSON.parse(localStorage.getItem("Libros"));
    libros.push(libro);
    localStorage.setItem("Libros", JSON.stringify(libros));
  }
  leer();
  document.getElementById("formulario").reset();
  console.log("Libro guardado correctamente");
  e.preventDefault();
}

//Función leer

function leer() {
  let libros = JSON.parse(localStorage.getItem("Libros"));
  document.getElementById("tbody").innerHTML = "";
  for (let i = 0; i < libros.length; i++) {
    let titulo = libros[i].titulo;
    let descripcion = libros[i].descripcion;
    let precio = libros[i].precio;

    let categoria = libros[i].categoria;
    let imagen = libros[i].imagen;
    let stock = libros[i].stock;
    let codigo = libros[i].codigo;

    document.getElementById("tbody").innerHTML += `<tr>
        <td>${titulo}</td>
        <td>${descripcion}</td>
        <td>${precio}</td>
        
        <td>${categoria}</td>
        <td>${imagen}</td>
        <td>${stock}</td>
        <td>${codigo}</td>


        <td> <button onclick="eliminar('${titulo}')" class= "btn btn-danger">Eliminar</button></td>
        <td> <button onclick="editar('${titulo}')" class= "btn btn-success">Editar</button></td>
        
      </tr>`;
  }
}

//Función update

function editar(titulo) {
  let libros = JSON.parse(localStorage.getItem("Libros"));
  for (let i = 0; i < libros.length; i++) {
    if (libros[i].titulo === titulo) {
      document.getElementById("body").innerHTML = `<div class="row">
      <div class="col-12">
          <div class="card"> </div>
              <div class="card-header">
                  <h2>Agregar nuevo libro</h2> </div>
              <div class="card-body">
                  <form id="formulario">
                          <div class="form-group">
                              <label for="titulo">Título</label>
                              <input class= "form-control" type="text"  id="newtitulo" placeholder="${libros[i].titulo}" required
                              minlength="3" maxlength="40"> 
                              <div class="valid-feedback">Correcto</div>
                              <div class="invalid-feedback">Incorrecto</div>
                          </div>

                          <div class="form-group">
                              <label for="descripcion">Descripción</label>
                              <textarea name="" rows="4"  required  minlength="3"  maxlenght="300" class= "form-control" type="text"  id="newdescripcion" placeholder="${libros[i].descripcion}"></textarea>
                              <div class="valid-feedback">Correcto</div>
                              <div class="invalid-feedback">Incorrecto</div>
                              </div>

                          
                          <div class="form-group">
                              <label for="precio">Precio</label>
                              <input class= "form-control" type="number"  id="newprecio" placeholder="${libros[i].precio}">
                          </div>

                          <div class="form-group">
                              <label for="categoria">Categoría</label>
                              <select id="newcategoria" class="form-control">
                                  <option value="${libros[i].categoria}">Selecione una categoría</option>
                                  <option value="clásico">Clásico</option>
                                  <option value="contemporáneo">Contemporáneo</option>
                                  <option value="estudio">Estudio</option>
                              </select>
                             
                          </div>

                          <div class="form-group">
                              <label for="imagen">Imagen</label>
                              <input class= "form-control" type="text"  id="newimagen" placeholder="${libros[i].imagen}"maxlength="250"
                              minlength="3" class="form-control" required>
                              <div class="valid-feedback">Correcto</div>
                              <div class="invalid-feedback">Incorrecto</div>
                          </div>

                              <div class="form-group">
                              <label for="stock">Stock</label>
                              <input class= "form-control" type="number"  id="newstock" placeholder="${libros[i].stock}">
                          </div>

                          <div class="form-group">
                              <label for="codigo">Código</label>
                              <input class= "form-control" type="number"  id="newcodigo" placeholder="${libros[i].codigo}"maxlength="50"
                              minlength="1" class="form-control" required>
                              <div class="valid-feedback">Correcto</div>
                              <div class="invalid-feedback">Incorrecto</div>
                          </div>
                                </form> 
                                <button class="btn btn-success" onclick = "actualizar('${i}')">Actualizar</button>
                                <button type="submit" class="btn btn-primary" onclick = "vistaPrincipal()">Cancelar</button>   
                    </div>`;
    }
  }
}

//Función actualizar

function actualizar(i) {
  let libros = JSON.parse(localStorage.getItem("Libros"));
  libros[i].titulo = document.getElementById("newtitulo").value;
  libros[i].descripcion = document.getElementById("newdescripcion").value;
  libros[i].precio = document.getElementById("newprecio").value;

  libros[i].imagen = document.getElementById("newimagen").value;
  libros[i].categoria = document.getElementById("newcategoria").value;
  libros[i].stock = document.getElementById("newstock").value;
  libros[i].codigo = document.getElementById("newcodigo").value;

  if (libros[i].titulo == "") {
    Swal.fire("No ha ingresado el titulo");
  } else {
    if (libros[i].descripcion == "") {
      Swal.fire("No ha ingresado ninguna descripción");
    } else {
      if (libros[i].precio == "") {
        Swal.fire("No ha ingresado el precio");
      } else {
        if (libros[i].categoria == "") {
          Swal.fire("No ha ingresado la categoria");
        } else {
          if (libros[i].imagen == "") {
            Swal.fire("No ha ingresado el url");
          } else {
            if (libros[i].stock == "") {
              Swal.fire("No ha ingresado el stock disponible");
            } else {
              if (libros[i].codigo == "") {
                Swal.fire("No ha ingresado el código");
              } else {
                localStorage.setItem("Libros", JSON.stringify(libros));
                vistaPrincipal();
              }
            }
          }
        }
      }
    }
  }
}

//funcion eliminar
function eliminar(titulo) {
  let libros = JSON.parse(localStorage.getItem("Libros"));
  for (let i = 0; i < libros.length; i++) {
    if (libros[i].titulo === titulo) {
      libros.splice(i, 1);
    }
  }
  localStorage.setItem("Libros", JSON.stringify(libros));
  leer();
}

//función para mostrar la interfaz principal

function vistaPrincipal() {
  document.getElementById("body").innerHTML = `<div class="row">
    <div class="col-12">
        <div class="card"> </div>
            <div class="card-header">
                <h2>Agregar nuevo libro</h2> </div>
            <div class="card-body">
                <form id="formulario">
                        <div class="form-group">
                            <label for="titulo">Título</label>
                            <input class= "form-control" type="text"  id="titulo" placeholder="Ingresar Titulo" required
                            minlength="3" maxlength="40"> 
                            <div class="valid-feedback">Correcto</div>
                            <div class="invalid-feedback">Incorrecto</div>
                        </div>

                        <div class="form-group">
                            <label for="descripcion">Descripción</label>
                            <textarea name="" rows="4"  required  minlength="3"  maxlenght="300" class= "form-control" type="text"  id="descripcion" placeholder="Ingresar Descripcion"></textarea>
                            <div class="valid-feedback">Correcto</div>
                            <div class="invalid-feedback">Incorrecto</div>
                            </div>

                     
                        <div class="form-group">
                            <label for="precio">Precio</label>
                            <input class= "form-control" type="number"  id="precio" placeholder="Ingresar Precio">
                        </div>

                        <div class="form-group">
                            <label for="categoria">Categoría</label>
                            <select id="categoria" class="form-control">
                                <option value="">Selecione una categoría</option>
                                <option value="clásico">Clásico</option>
                                <option value="contemporáneo">Contemporáneo</option>
                                <option value="estudio">Estudio</option>
                            </select>
                           
                        </div>

                        <div class="form-group">
                            <label for="imagen">Imagen</label>
                            <input class= "form-control" type="text"  id="imagen" placeholder="Ingresar URL"maxlength="250"
                            minlength="3" class="form-control" required>
                            <div class="valid-feedback">Correcto</div>
                            <div class="invalid-feedback">Incorrecto</div>
                        </div>

                        
                        <div class="form-group">
                            <label for="stock">Stock</label>
                            <input class= "form-control" type="number"  id="stock" placeholder="Ingresar Unidades en stock">
                        </div>

                        <div class="form-group">
                            <label for="codigo">Código</label>
                            <input class= "form-control" type="number"  id="codigo" placeholder="Ingresar codigo"maxlength="50"
                            minlength="1" class="form-control" required>
                            <div class="valid-feedback">Correcto</div>
                            <div class="invalid-feedback">Incorrecto</div>
                        </div>



                        <button type="submit" class="btn btn-primary">Agregar</button>
                </form>    
            </div>

    </div>

    <div class="col-12">
        <h1>Detalle de Libros</h1>
        <section class="table-responsive">
        <table class="table align-middle">
        
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>

                <th scope="col">Categoría</th>
                <th scope="col">Imagen</th>
                <th scope="col">Stock</th>
                <th scope="col">Código</th>
                
              </tr>
            </thead>
            <tbody id="tbody">
              <tr>
                <td>La bella y la Bestia</td>
                <td>Libro de Fantasía</td>
                <td>100</td>
                
                <td>Clásico</td>
                <td>https://http2.mlstatic.com/D_NQ_NP_969316-MLA43666452343_102020-O.webp</td>
                <td>5</td>
                <td>123</td>
              </tr>
              
            </tbody>
          </table>
          </section>
    </div>

</div> `;
  leer();
}

leer();

//VALIDACIONES

function cantidadCaracteresTitulo(input) {
  if (input.value.trim().length >= 3 && input.value.trim().length <= 40) {
    console.log("dato valido");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("dato invalido");
    input.className = "form-control is-invalid";
    return false;
  }
}

function cantidadCaracteresCodigo(input) {
  if (input.value.trim().length >= 1 && input.value.trim().length <= 50) {
    console.log("dato valido");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("dato invalido");
    input.className = "form-control is-invalid";
    return false;
  }
}

function cantidadCaracteresDescripcion(input) {
  if (input.value.trim().length >= 3 && input.value.trim().length <= 300) {
    console.log("dato valido");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("dato valido");
    input.className = "form-control is-invalid";
    return false;
  }
}

function validarImagen(input) {
  let expReg =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  if (expReg.test(input.value)) {
    console.log("dato valido");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("dato valido");
    input.className = "form-control is-invalid";
    return false;
  }
}
