
function saveData()
{
let email,psw;
email=document.getElementById("email").value;

psw=document.getElementById("psw").value;

let user_records=new Array();
user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
if(user_records.some((v)=>{return v.email==email && v.psw==psw}))
{
  Swal.fire("Acceso Exitoso");
let current_user=user_records.filter((v)=>{return v.email==email && v.psw==psw})[0]
localStorage.setItem('name',current_user.name);
localStorage.setItem('email',current_user.email);
location.replace("/index.html")
}
else
{
  Swal.fire('Algún dato es incorrecto');
}

}

