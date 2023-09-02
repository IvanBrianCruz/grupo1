// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
// Router con R mayuscula
const router = express.Router();

// Importamos el controlador de las rutas por defecto
const productsController = require("../controllers/productsController.js")

// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos

// Procesa el pedido get con ruta /
router.get("/producto/:id", productsController.productoDetalle);

//crar pruducto:

router.get("/cargaDeProducto", productsController.productocarga);

router.post("/cargaDeProducto",productsController.procesoDeCarga);


//editar un producto:

router.get("/producto/edicionDeProducto/:id", productsController.productoedicion); 

router.post("/producto/edicionDeProducto/:id", productsController.procesoDeEdicion); 

// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = router;