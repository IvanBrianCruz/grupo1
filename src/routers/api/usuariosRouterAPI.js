const express = require('express');
const router = express.Router();
const usuariosControllerAPI = require("../../controllers/api/usuariosControllerAPI");



// Rutas para la API de juegos
router.get('/api/users', usuariosControllerAPI.getAllUsers);
router.get('/api/users/:id', usuariosControllerAPI.getUserById);
// Otras rutas de la API según sea necesario

module.exports = router;
