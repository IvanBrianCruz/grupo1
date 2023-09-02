// Requerimos path para poder enviar los archivos HTML
const fs = require('fs');
const path = require("path");

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsdatabase.json');

// Creamos el objeto literal con los métodos a exportar
const productsController = {
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // comunicarse con el modelo, conseguir información
        res.render('../views/inicio',{ products:products})
    },

    // Manejo del pedido get con ruta
    productoDetalle: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render('../views/producto')
    },
    productocarga: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render('../views/cargaDeProducto')
    },
    procesoDeCarga:(req, res) => {
        const data= req.body;
        //leer el archivo json y dejarlo en una variable (array)
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //crear un nuevo objeto literal con los datos ingresados por el usuario
        const nuevojuego = {
            id:products[products.length - 1].id + 1,
            name:data.name,
            price:parseInt(data.price),
            categoria:data.categoria,
            descripcion:data.descripcion,
            image:"default-image.png"
        }
        //agregar ese objeto al array
        products.push(nuevojuego);
        //volver a escribir sobre el archivo json 
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
        //devolverle alguna vista al usuario
        res.redirect("/")
    },
    
    productoedicion: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.sendFile(path.resolve(__dirname, "../views/edicionDeProducto.html"))
    },

}


// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = productsController;