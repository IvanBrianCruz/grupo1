// Requerimos path para poder enviar los archivos HTM



const { log } = require('console');
const fs = require('fs');
const path = require("path");
const bcryptjs = require("bcryptjs");
//vinculamos con el ejs.



/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta date como Json (un array de objetos literales) */
const usuariosFilePath = path.join(__dirname, '../data/usuariosdatabase.json');
// Creamos el objeto literal con los métodos a exportar
const usuariosController = {

    // Manejo del pedido get con ruta
    inicioDeSesion: (req, res) => {
        // comunicarse con el modelo, conseguir informacións
        res.render("../views/iniciarSesion")
    },
    registro: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("../views/register")
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
            password: bcryptjs.hashSync(data.password, 10),
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
    loginpross: (req, res) => {
        //leer el archivo json y dejarlo en una variable (array)
        const usuario = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

        let userToLogin = usuario.findByField("email", req.body.email);
        if (userToLogin) {
            // ... Lógica para el inicio de sesión exitoso si es necesario ...
            return res.send(userToLogin)
        } else {
            return res.render("../views/iniciarSesion", {
                errors: {
                    email: {
                        msg: "No se encuentra en la base de datos"
                    }
                }
            });
        }
    },

}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = usuariosController;