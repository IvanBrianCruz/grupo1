// Requerimos path para poder enviar los archivos HTML
const fs = require('fs');
const path = require("path");
//vinculamos con el ejs.
const productsFilePath = path.join(__dirname, '../data/productsdatabase.json');


// Creamos el objeto literal con los métodos a exportar
const mainController = {

    // Manejo del pedido get con ruta
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // comunicarse con el modelo, conseguir información
        res.render('../views/inicio',{ products:products})
    },
    bibloteca: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/bibloteca")
    },
    listaDeDeseos: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("../views/listaDeDeseos")
    },
    carrito: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/carrito")
    },
    

   
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = mainController;