
function saveData()
{
let name,email,psw;
name=document.getElementById("username").value;
email=document.getElementById("email").value;

psw=document.getElementById("psw").value;

let user_records=new Array();
user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
if(user_records.some((v)=>{return v.email==email}))
{
    Swal.fire("El usuario ya existe en nuestra base de datos");
}
else
{
  user_records.push({
  "username":username,
  "email":email,
  "psw":psw,

  
})
console.log(user_records);
localStorage.setItem("users",JSON.stringify(user_records));
Swal.fire("El usuario se creó con éxito");
location.replace("../pages/loginVisitante.html")
}

}


//EVENTO DE VALIDACIONES

username.addEventListener('blur',()=>{validarusername(username)});




//validaciones 


function validarusername(input){
    if( input.value.trim().length >= 3 && input.value.trim().length <=50 ){
        console.log('dato valido');
        input.className = 'form-control is-valid';
        return true;
    }else{
        console.log('dato invalido');
        input.className = 'form-control is-invalid';
        return false;
    }
}
