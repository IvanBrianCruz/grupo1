const form = document.getElementById('loginFormulario');
const email = document.getElementById('email');
const password = document.getElementById('password');

function checkInputs() {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (emailValue === '') {
        setErrorFor(email, 'Email es requerido');
    } else if (!isEmailValid(emailValue)) {
        setErrorFor(email, 'Ingrese un email válido');
    } else {
        setSuccessFor(email);
    }



    if(passwordValue === '') {
		setErrorFor(password, 'Contraseña no debe estar en blanco.');
	} else {
		setSuccessFor(password);
	}
}

function setErrorFor(input, message) {
    const formgroup = input.parentElement;
    const small = formgroup.querySelector('small');
    small.innerText = message; // Coloca el mensaje de error en el <small>
    formgroup.classList.add('error'); // Agrega la clase 'error' al formGroup
}

function setSuccessFor(input) {
    const formgroup = input.parentElement;
    formgroup.classList.remove('error'); // Remueve la clase 'error' del formGroup
    formgroup.classList.add('success')
}

function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}






/*form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
    // Obtén los valores de los campos
    
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
   

    // Verifica que todos los campos estén marcados como éxito
    if (document.querySelectorAll('.form-group.success').length === 2) { // Ajusta el número si se cambian o agregan campos
        // Si todos los campos son válidos, envía los datos al servidor
        const formData = new FormData();
        
        formData.append('email', emailValue);
        formData.append('password', passwordValue);
       

        fetch('/inicioDeSesion', {
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
                console.error('Error en el inicio de sesion');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    } else {
        // Si hay campos inválidos, no envíes los datos y muestra un mensaje de error si es necesario
        console.log('Por favor, completa correctamente todos los campos.');
    }
});*/