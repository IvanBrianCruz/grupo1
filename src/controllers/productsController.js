
// Requerimos path para poder enviar los archivos HTML
const fs = require('fs');
const path = require("path");
//vinculamos con el ejs.



/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsdatabase.json');

// Creamos el objeto literal con los métodos a exportar
const productsController = {
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // comunicarse con el modelo, conseguir información
        res.render('../views/inicio', { products: products })
    },

    // Manejo del pedido get con ruta
    productoDetalle: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const product = products.find(product => {
            return product.id == req.params.id
        });

        // comunicarse con el modelo, conseguir información
        res.render('../views/producto', { product })
    },
    productocarga: (req, res) => {
        // comunicarse con el modelo, conseguir información

        res.render("../views/cargaDeProducto");


    },

    procesoDeCarga: (req, res) => {
        const data = req.body;
        //leer el archivo json y dejarlo en una variable (array)
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //crear un nuevo objeto literal con los datos ingresados por el usuario
        const nuevojuego = {
            id: products[products.length - 1].id + 1,
            name: data.name,
            price: parseInt(data.price),
            categoria: data.categoria,
            caracteristic: data.descripcion,
            image: req.file ? req.file.filename : "default-image.png",
        }
        //agregar ese objeto al array
        products.push(nuevojuego);
        //volver a escribir sobre el archivo json 
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
        //devolverle alguna vista al usuario
        res.redirect("/")
    },

    productoedicion: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const product = products.find(product => {
            return product.id == req.params.id
        });
        // comunicarse con el modelo, conseguir información
        res.render("../views/edicionDeProducto", {productTiEdit: product});
    },
    procesoDeEdicion: (req, res) =>{
        const data = req.body;
        //leer el archivo json y dejarlo en una variable (array)
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // buscar el producto original para tomar su id
        const oldProduct = products.find(product => {
            return product.id == req.params.id
            });
        //crear un nuevo objeto literal con los datos ingresados por el usuario
        const editadoJuego = {
            id: oldProduct.id,
            name: data.name,
            price: parseInt(data.price),
            categoria: data.categoria,
            caracteristic: data.descripcion,
            image: req.file ? req.file.filename : oldProduct.image,// if ternario si hay nuevo img usa eso / sino hay usa la vieja imagen 
        }
        //identificar el index 
const index = products.findIndex(product =>{
    return product.id == req.params.id
})

        //modificar el objeto en la posicion que coresponda 
        products[index] = editadoJuego
        //volver a escribir sobre el archivo json 
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
        //devolverle alguna vista al usuario
        res.redirect("/")
    },

}


// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = productsController;