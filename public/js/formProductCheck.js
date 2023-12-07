

    const form = document.getElementById('gameForm');
    const name = document.getElementById('nombre');
    //const price = document.getElementById('gamePrice');
    //const category = document.getElementById('gameCategory');
    const description = document.getElementById('descripcion');
    const image = document.getElementById('product-image');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        checkInputs();
    });

    function checkInputs() {
        const nameValue = name.value.trim();
        // const priceValue = price.value.trim();
        // const categoryValue = category.value.trim();
        const descriptionValue = description.value.trim();
        const imageValue = image.value.trim();

        if (nameValue === '') {
            setErrorFor(name, 'Nombre es requerido');
        } else if (nameValue.length < 5) {
            setErrorFor(name, 'El nombre debe tener al menos 5 caracteres');
        } else {
            setSuccessFor(name);
        }

        /*if (priceValue === '') {
            setErrorFor(price, 'Precio es requerido');
        } else {
            setSuccessFor(price);
        }

        if (categoryValue === '') {
            setErrorFor(category, 'Seleccione una categoría');
        } else {
            setSuccessFor(category);
        }*/

        if (descriptionValue === '') {
            setErrorFor(description, 'Descripción es requerida');
        } else if (descriptionValue.length < 20) {
            setErrorFor(description, 'La descripción debe tener al menos 20 caracteres');
        } else {
            setSuccessFor(description);
        }

        // Validación de la imagen (formato)
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (imageValue === '') {
            // Si el campo de imagen está vacío, se considera válido (no hay ninguna imagen cargada)
            setSuccessFor(image);
        } else if (!allowedExtensions.exec(imageValue)) {
            setErrorFor(image, 'Formato de imagen no válido');
        } else {
            setSuccessFor(image);
        }

        if (document.querySelectorAll('.form-group.success').length === 3) {
            form.submit(); // Envía el formulario si la validación es exitosa
        } else {
            console.log('Por favor, complete correctamente todos los campos.');
        }
    }

    function setErrorFor(input, message) {
        // Función para mostrar mensaje de error
        const formGroup = input.parentElement;
        const small = formGroup.querySelector('small');
        small.innerText = message; // Coloca el mensaje de error en el <small>
        formGroup.classList.add('error'); // Agrega la clase 'error' al formGroup
        formGroup.classList.remove('success'); // Elimina la clase 'success' si estaba presente
    }

    function setSuccessFor(input) {
        // Función para marcar campo como válido
        const formGroup = input.parentElement;
        formGroup.classList.remove('error'); // Remueve la clase 'error' del formGroup
        formGroup.classList.add('success'); // Agrega la clase 'success' al formGroup
    }
