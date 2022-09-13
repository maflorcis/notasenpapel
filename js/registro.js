
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
          let expReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(expReg.test(input.value)){
            input.className = 'form-control is-valid';
            return true;
        }else{
            input.className = 'form-control is-invalid';
            return false;
        }
    }

    //To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter