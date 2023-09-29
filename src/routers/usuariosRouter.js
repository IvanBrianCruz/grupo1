// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
// Router con R mayuscula
const router = express.Router();
const multer = require('multer');
const path = require('path')

// Importamos el controlador de las rutas por defecto
const usuariosController = require("../controllers/usuariosController.js");
const loginconfig = require("../../middlewares/loginconfig.js");
 // Asegúrate de que el nombre sea correcto




// const loginconfing = require('../middlewares/loginconfing.js')

// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos
//********** MULTER CONFIGURACION */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/imagenes-usuario")
    },
    filename: function (req, file, cb) {
        cb(null, "usuario-" + Date.now() + path.extname(file.originalname))
        //        product-542563573.jpg
    },
});
const upload = multer({storage:storage});
// Procesa el pedido get con ruta /

// ruta y proceso de inicio de sesion
// render de vista
router.get("/inicioDeSesion", loginconfig,    usuariosController.inicioDeSesion);
// proceso de validacion 
router.post("/inicioDeSesion", usuariosController.loginpross);

// ruta y proceso de registo de sesion
router.get("/registro", loginconfig, usuariosController.registro);  
router.post("/registro", upload.single("imagen"), usuariosController.prossregistro);

//cerrar sesion 
router.get("/cerrarSession", usuariosController.cerrarSession);
//edicion de usuario
router.get('/edicionUsuario' ,usuariosController.editUsser);

//router.post('/edicionUsuario' ,usuariosController.prosseditUsser);
router.post("/edicionUsuario/:id", upload.single("product-image"), usuariosController.prosseditUsser);




// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = router;