const form = document.getElementById('loginFormulario');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});


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

    if (document.querySelectorAll('.form-group.success').length === 2) {
        form.submit(); // Envía el formulario si la validación es exitosa
    } else {
        console.log('Por favor, complete correctamente todos los campos.');
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




