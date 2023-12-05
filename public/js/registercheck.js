const form = document.getElementById('registrationForm');
const name = document.getElementById('name');
const apell = document.getElementById('apell');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const imagen = document.getElementById('imagen');
//const categoria = document.getElementById('categoria');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const nameValue = name.value.trim();
    const apellValue = apell.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const imagenValue = imagen.value.trim(); // Comprobar el valor del archivo de imagen (no se puede validar directamente con JavaScript)
    //const categoriaValue = categoria.value.trim();

   
    if (nameValue === '') {
        setErrorFor(name, 'Es requerido un nombre');
    } else if (nameValue.length < 2) {
        setErrorFor(name, 'El nombre debe tener al menos 2 caracteres');
    } else {
        setSuccessFor(name);
    }
    // Realizar validaciones similares para los demás campos (apellido, email, contraseña, etc.)
    if (apellValue === '') {
        setErrorFor(apell, 'Es requerido un apellido');
    } else if (apellValue.length < 2) {
        setErrorFor(apell, 'El apellido debe tener al menos 2 caracteres');
    } else {
        setSuccessFor(apell);
    }

    
    if (emailValue === '') {
        setErrorFor(email, 'Email es requerido');
    } else if (!isEmailValid(emailValue)) {
        setErrorFor(email, 'Ingrese un email válido');
    } else {
        setSuccessFor(email);
    }
  
    // Validación de la imagen (formato)
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (imagenValue.trim() === '') {
        // Si el campo de imagen está vacío, se considera válido (no hay ninguna imagen cargada)
        setSuccessFor(imagen);
    } else if (!allowedExtensions.exec(imagenValue)) {
        setErrorFor(imagen, 'Formato de imagen no válido');
    } else {
        setSuccessFor(imagen);
    }

    // Validar otros campos según sea necesario
    if(passwordValue === '') {
		setErrorFor(password, 'Contraseña no debe estar en blanco.');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Contraseña no debe estar en blanco');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Los Contraseña no coinciden');
	} else{
		setSuccessFor(password2);
	}

    // Submitear el formulario si no hay errores
    // form.submit(); // Descomenta esta línea para enviar el formulario realmente
}

function setErrorFor(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('small');
    small.innerText = message; // Coloca el mensaje de error en el <small>
    formGroup.classList.add('error'); // Agrega la clase 'error' al formGroup
}

function setSuccessFor(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error'); // Remueve la clase 'error' del formGroup
    formGroup.classList.add('success')
}

function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
    // Obtén los valores de los campos
    const nameValue = name.value.trim();
    const apellValue = apell.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const imagenValue = imagen.value.trim(); // Comprobar el valor del archivo de imagen (no se puede validar directamente con JavaScript)
    //const categoriaValue = categoria.value.trim();

    // Verifica que todos los campos estén marcados como éxito
    if (document.querySelectorAll('.form-group.success').length === 6) { // Ajusta el número si se cambian o agregan campos
        // Si todos los campos son válidos, envía los datos al servidor
        const formData = new FormData();
        formData.append('name', nameValue);
        formData.append('apell', apellValue);
        formData.append('email', emailValue);
        formData.append('password', passwordValue);
        formData.append('password2', password2Value);
        formData.append('imagen', imagen.files[0]);
        //formData.append('categoria', categoriaValue);

        fetch('/registro', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // Maneja la respuesta del servidor
            if (response.ok) {
                // Redirige al usuario a la página de inicio
                window.location.href = "http://localhost:3060/";
            } else {
                // Maneja los errores
                console.error('Error en el registro');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    } else {
        // Si hay campos inválidos, no envíes los datos y muestra un mensaje de error si es necesario
        console.log('Por favor, completa correctamente todos los campos.');
    }
});
