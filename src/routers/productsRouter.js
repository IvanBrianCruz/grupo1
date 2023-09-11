// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
// Router con R mayuscula
const router = express.Router();
const multer = require('multer');
const path = require('path')

//********** MULTER CONFIGURACION */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/imagenes-productos")
    },
    filename: function (req, file, cb) {
        cb(null, "product-" + Date.now() + path.extname(file.originalname))
        //        product-542563573.jpg
    },
});

const upload = multer({storage:storage});

// Importamos el controlador de las rutas por defecto
const productsController = require("../controllers/productsController.js")

// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos

// Procesa el pedido get con ruta /
router.get("/producto/:id", productsController.productoDetalle);

//crar pruducto:

router.get("/cargaDeProducto", productsController.productocarga);

router.post("/cargaDeProducto",upload.single("product-image"),productsController.procesoDeCarga);


//editar un producto:

router.get("/producto/edicionDeProducto/:id", productsController.productoedicion); 

router.put("/producto/edicionDeProducto/:id",upload.single("product-image"), productsController.procesoDeEdicion); 

router.delete('/producto/eliminar/:id', productsController.eliminarProducto);

// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = router;