
// Requerimos path para poder enviar los archivos HTML
const fs = require('fs');
const path = require("path");
//vinculamos con el ejs.
const productsFilePath = path.join(__dirname, '../data/productsdatabase.json');


// Creamos el objeto literal con los métodos a exportar
const productsController = {

    // Manejo del pedido get con ruta
    productoDetalle: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	
		const product = products.find(product => {
			return product.id == req.params.id
		});
		
        // comunicarse con el modelo, conseguir información
        res.render('../views/producto', {product})
    },
    productocarga: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/cargaDeProducto")
    },
    productoedicion: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/edicionDeProducto")
    },

}


// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = productsController;