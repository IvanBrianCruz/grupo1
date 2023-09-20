// Requerimos path para poder enviar los archivos HTM



const { log } = require('console');
const fs = require('fs');
const path = require("path");
//vinculamos con el ejs.



/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta date como Json (un array de objetos literales) */
const usuariosFilePath = path.join(__dirname, '../data/usuariosdatabase.json');
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
    prossregistro: (req, res) => {
        const data = req.body;
        //leer el archivo json y dejarlo en una variable (array)
        const usuario = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));
        //crear un nuevo objeto literal con los datos ingresados por el usuario
        const nuevousuario = {
            id: usuario[usuario.length - 1].id + 1,
            name: data.name,
            apell: data.apell,
           correo: data.correo,
           password: data.password,
            imagen: req.file ? req.file.filename : "default-imagen.png",
            categoria: data.categoria
        }
        //agregar ese objeto al array
       usuario.push(nuevousuario);
        //volver a escribir sobre el archivo json 
        fs.writeFileSync(usuariosFilePath, JSON.stringify(usuario, null, " "))
        //devolverle alguna vista al usuario
        res.redirect("/")
        console.log(nuevousuario)
    },
  
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = usuariosController;