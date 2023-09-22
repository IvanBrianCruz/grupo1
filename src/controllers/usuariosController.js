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
    inicioDeSesion: (req, res) => {
        // comunicarse con el modelo, conseguir informacións
        res.render("../views/iniciarSesion")
    },
    loginpross: (req, res) => {
        console.log('Controlador loginpross llamado');
console.log('Email:', req.body.email);
console.log('Contraseña:', req.body.password);

        // Leer el archivo JSON y dejarlo en una variable (array)
        const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));
    
        // Buscar al usuario por su correo en el array
        const userToLogin = usuarios.find(user => user.email === req.body.email);
    
        if (userToLogin) {
            // Verificar la contraseña utilizando bcrypt
            const isPasswordValid = bcryptjs.compareSync(req.body.password, userToLogin.password);
    
            if (isPasswordValid) {
                // Redireccionar al usuario a la página de inicio
                return res.render('../views/bibloteca');
            } else {
                // Contraseña incorrecta
                return res.render('../views/iniciarSesion', {
                    errors: {
                        password: {
                            msg: 'La contraseña es incorrecta'
                        }
                    }
                });
            }
        } else {
            // El correo no se encuentra en la base de datos
            return res.render('../views/iniciarSesion', {
                errors: {
                    email: {
                        msg: 'El correo no se encuentra en la base de datos'
                    }
                }
            });
        }
    },
    




}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = usuariosController;