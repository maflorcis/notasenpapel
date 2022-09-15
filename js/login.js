let objPeople = [
	{
		username: 'floralonso',
		password: 'contador'
	},
	{
		username: 'mateo',
		password: 'niño'
	},
	{
		username: 'pablo',
		password: 'abogado'
	}
]


function login() {
	
	let username = document.getElementById('username').value
	let password = document.getElementById('password').value

for(let i = 0; i < objPeople.length; i++) {
		
		if(username == objPeople[i].username && password == objPeople[i].password) {
			Swal.fire(username + ' inició sesión exitosamente')
            location.replace("./administrador.html")
			
			break
		} else {
			// error if username and password no son iguales
			Swal.fire('usuario o contraseña incorrecta')
		}
	}
}