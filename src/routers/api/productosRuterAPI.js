const express = require('express');
const router = express.Router();
const productsControllerAPI = require("../../controllers/api/productsControllerAPI");



// Rutas para la API de juegos
router.get('/api/games', productsControllerAPI.getAllGames);
router.get('/api/games/:id', productsControllerAPI.getGameById);
router.get('/api/gamescategory', productsControllerAPI.getAllCategoriesWithGames);
// Otras rutas de la API según sea necesario

module.exports = router;
