// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
// Router con R mayuscula
const router = express.Router();

// Importamos el controlador de las rutas por defecto
const mainController = require("../controllers/mainController.js")

// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos


/*  res.sendFile(path.resolve(__dirname, "../views/index.html")) */
router.get("/bibloteca", mainController.bibloteca);

router.get("/listaDeDeseos", mainController.listaDeDeseos);

router.get("/carrito", mainController.carrito);




router.get("/equipo", mainController.equipo);

router.get("/sucursal", mainController.sucursal);

router.get("/testimonios", mainController.testimonios);

router.get("/eventos", mainController.eventos);

router.get("/terminosYCondiciones", mainController.condiciones);

router.get("/politicasDePrivaciodad", mainController.privacidad);

router.get("/sprints", mainController.sprints);

router.get("/Presentacion", mainController.presentacion);

// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = router;
