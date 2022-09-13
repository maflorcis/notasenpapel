
//EVENTOS PARA VALIDACIONES
regUsuario.addEventListener('blur', ()=>{cantidadCaracteresUsuario(regUsuario)});
contrasena.addEventListener('blur', ()=>{validarconstrasena(contrasena)});


//VALIDACIONES

function cantidadCaracteresUsuario(input){
    if( input.value.trim().length >= 3 && input.value.trim().length <=40 ){
        console.log('dato valido');
        input.className = 'form-control is-valid';
        return true;
    }else{
        console.log('dato invalido');
        input.className = 'form-control is-invalid';
        return false;
    }
}

function validarconstrasena(input){
          let expReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        if(expReg.test(input.value)){
            input.className = 'form-control is-valid';
            return true;
        }else{
            input.className = 'form-control is-invalid';
            return false;
        }
    }

    //To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter


    var objPeople = [
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
    
       
    function registerUser() {
        // store new users username
        var registerUsername = document.getElementById('regUsuario').value
        // store new users password
        var registerPassword = document.getElementById('contrasena').value
        // store new user data in an object
        var newUser = {
            username: registerUsername,
            password: registerPassword
        }
        // loop throught people array to see if the username is taken, or password to short
        for(var i = 0; i < objPeople.length; i++) {
            // check if new username is equal to any already created usernames
            if(registerUser == objPeople[i].username) {
                // alert user that the username is take
                alert('That username is alreat in user, please choose another')
                // stop the statement if result is found true
                break
            // check if new password is 8 characters or more
            } else if (registerPassword.length < 8) {
                // alert user that the password is to short
                alert('That is to short, include 8 or more characters')
                // stop the statement if result is found true
                break
            }
        }
        // push new object to the people array
        objPeople.push(newUser)
        // console the updated people array
        console.log(objPeople)
    }
    


    
