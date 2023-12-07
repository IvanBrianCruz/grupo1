const form = document.getElementById('registrationForm');
const name = document.getElementById('name');
const apell = document.getElementById('apell');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const imagen = document.getElementById('imagen');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

// ... (código previo)

function checkInputs() {
    const nameValue = name.value.trim();
    const apellValue = apell.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const imagenValue = imagen.value.trim(); // Comprobar el valor del archivo de imagen (no se puede validar directamente con JavaScript)

    // Validaciones de cada campo del formulario
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

    // Resto de validaciones para los demás campos
    if (emailValue === '') {
        setErrorFor(email, 'El correo electrónico es requerido');
    } else if (!isEmailValid(emailValue)) {
        setErrorFor(email, 'El correo electrónico no es válido');
    } else {
        setSuccessFor(email);
    }

    // Validar otros campos según sea necesario
    if (passwordValue === '') {
        setErrorFor(password, 'Contraseña no debe estar en blanco.');
    } else if (passwordValue.length < 8) {
        setErrorFor(password, 'La contraseña debe tener al menos 8 caracteres');
    } else {
        setSuccessFor(password);
    }

    if (password2Value === '') {
        setErrorFor(password2, 'Contraseña no debe estar en blanco');
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Las contraseñas no coinciden');
    } else {
        setSuccessFor(password2);
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

    // Submitear el formulario si no hay errores
    // form.submit(); // Descomenta esta línea para enviar el formulario realmente
    // ... (resto del código)
if (document.querySelectorAll('.form-group.success').length === 6) {
    form.submit(); // Envía el formulario si la validación es exitosa
} else {
    console.log('Por favor, completa correctamente todos los campos.');
}
}

function setErrorFor(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('small');
    small.innerText = message; // Coloca el mensaje de error en el <small>
    formGroup.classList.add('error'); // Agrega la clase 'error' al formGroup
    formGroup.classList.remove('success'); // Elimina la clase 'success' si estaba presente
}

function setSuccessFor(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error'); // Remueve la clase 'error' del formGroup
    formGroup.classList.add('success'); // Agrega la clase 'success' al formGroup
}
function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

