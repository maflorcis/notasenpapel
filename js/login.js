let objPeople = [
	{
		username: 'floralonso',
		password: 'contador'
	},
	{
		username: 'matt',
		password: 'password88'
	},
	{
		username: 'chris',
		password: 'password3'
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
			// error if username and password don't match
			Swal.fire('usuario o contraseña incorrecta')
		}
	}
}