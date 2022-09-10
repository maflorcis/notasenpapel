//Evento para crear un nuevo libro
document.getElementById("formulario").addEventListener("submit", crear);

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
    codigo
  };

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
                              <input class= "form-control" type="text"  id="newtitulo" placeholder="${libros[i].titulo}">
                          </div>

                          <div class="form-group">
                              <label for="descripcion">Descripción</label>
                              <input class= "form-control" type="text"  id="newdescripcion" placeholder="${libros[i].descripcion}">
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
                              <input class= "form-control" type="text"  id="newimagen" placeholder="${libros[i].imagen}">
                          </div>

                          <div class="form-group">
                              <label for="stock">Stock</label>
                              <input class= "form-control" type="number"  id="newstock" placeholder="${libros[i].stock}">
                          </div>

                          <div class="form-group">
                              <label for="codigo">Código</label>
                              <input class= "form-control" type="text"  id="newcodigo" placeholder="${libros[i].codigo}">
                          </div>
                                </form> 
                                <button class="btn btn-success" onclick = "actualizar('${i}')">Actualizar</button>
                                <button type="submit" class="btn btn-primary" onclick = "vistaPrincipal()">Cancelar</button>   
                    </div>`;
    }
  }
}

//Función actualizar

function actualizar(i){
    let libros = JSON.parse(localStorage.getItem("Libros"));
    libros[i].titulo = document.getElementById("newtitulo").value;
    libros[i].descripcion = document.getElementById("newdescripcion").value;
    libros[i].precio = document.getElementById("newprecio").value;

    libros[i].imagen = document.getElementById("newimagen").value;
    libros[i].categoria = document.getElementById("newcategoria").value;
    libros[i].stock = document.getElementById("newstock").value;
    libros[i].codigo = document.getElementById("newcodigo").value;




    if(libros[i].titulo == ""){
        alert("No ha ingresado el titulo")
    }else{
        if(libros[i].descripcion ==""){
            alert("No ha ingresado ninguna descripción")
        }else{
            if(libros[i].precio ==""){
                alert("No ha ingresado el precio")
        
            }else{
                if(libros[i].categoria ==""){
                    alert("No ha ingresado la categoria")
            
                }else{
                    if(libros[i].imagen ==""){
                        alert("No ha ingresado el url")
                
                    }else{
                        if(libros[i].stock ==""){
                            alert("No ha ingresado el stock disponible")

                        }else{
                            if(libros[i].codigo ==""){
                                alert("No ha ingresado el código")
            
            
            
            
            
            
            }else{
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
function eliminar(titulo){
    let libros = JSON.parse(localStorage.getItem("Libros"));
    for(let i=0; i<libros.length; i++) {
        if(libros[i].titulo === titulo){
            libros.splice(i, 1);
        }
    }
 localStorage.setItem("Libros", JSON.stringify(libros));
 leer();
}

//función para mostrar la interfaz principal

function vistaPrincipal(){
    document.getElementById("body").innerHTML = `<div class="row">
    <div class="col-12">
        <div class="card"> </div>
            <div class="card-header">
                <h2>Agregar nuevo libro</h2> </div>
            <div class="card-body">
                <form id="formulario">
                        <div class="form-group">
                            <label for="titulo">Título</label>
                            <input class= "form-control" type="text"  id="titulo" placeholder="Ingresar Titulo">
                        </div>

                        <div class="form-group">
                            <label for="descripcion">Descripción</label>
                            <input class= "form-control" type="text"  id="descripcion" placeholder="Ingresar Descripcion">
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
                            <input class= "form-control" type="text"  id="imagen" placeholder="Ingresar URL">
                        </div>

                        <div class="form-group">
                            <label for="stock">Stock</label>
                            <input class= "form-control" type="number"  id="stock" placeholder="Ingresar Unidades en stock">
                        </div>

                        <div class="form-group">
                            <label for="codigo">Código</label>
                            <input class= "form-control" type="text"  id="codigo" placeholder="Ingresar codigo">
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

</div> `
leer();

}


leer();


//Datos de Prueba

//EJ 1
// Queen Really Easy Piano - 20 Queen Classics - Contemporaneo - $2500 Codigo: 123
// https://halleonard-coverimages.s3.amazonaws.com/wl/00291022-wl.jpg

//EJ 2
// Best of Piano Classics - 50 Famous Pieces - Contemporaneo - $1800 Codigo: 456
//https://images-na.ssl-images-amazon.com/images/W/WEBP_402378-T2/images/I/41kbIYSBTyL._SX379_BO1,204,203,200_.jpg

//EJ 3
// Rock Classics - Partituras para aficionados - Contemporaneo - $1300 Codigo: 789

//https://imagessl5.casadellibro.com/a/l/t5/65/9788418703065.jpg

//EJ 4
// Jazz Piano Collection - 66 páginas de arreglos de Jazz - Contemporaneo - $2200 Codigo: 101112
//https://d29ci68ykuu27r.cloudfront.net/items/18401948/cover_images/cover-medium_large_file.png

//EJ 5
// First 50 Songs by the Beatles - Grandes éxitos facilitados - Contemporaneo - $2150 Codigo: 131415
// https://d29ci68ykuu27r.cloudfront.net/items/20287826/cover_images/cover-medium_large_file.png