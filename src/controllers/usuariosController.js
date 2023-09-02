// Requerimos path para poder enviar los archivos HTML
const path = require("path");

// Creamos el objeto literal con los métodos a exportar
const usuariosController = {

    // Manejo del pedido get con ruta
    inicioDeSesion: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/iniciarSesion")
    },
    registro: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/register")
    },
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = usuariosController;