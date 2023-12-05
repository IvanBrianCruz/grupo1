const db = require('../../data/models');
const Game = db.Game;

// Función para obtener todos los juegos
const getAllGames = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1; // http://localhost:3060/api/games?page=2 ejemplo de cambio de pagina 
        const pageSize = 5; // Cantidad de juegos por página
        
        const offset = (page - 1) * pageSize; // Cálculo del offset para la paginación

        const { count, rows: games } = await Game.findAndCountAll({
            offset,
            limit: pageSize,
            attributes: ['id', 'name', 'features'], // Definir los atributos que deseas mostrar en la respuesta
        });

        // Construcción del objeto literal a devolver con información paginada
        const gamesResponse = {
            totalGames: count, // Total de juegos en la base de datos
            totalPages: Math.ceil(count / pageSize), // Total de páginas basado en la cantidad de juegos y el tamaño de la página
            currentPage: page, // Página actual
            games: games.map(game => ({
                id: game.id,
                name: game.name,
                detail: `/api/games/${game.id}`, // URL para obtener el detalle
                description: game.features, 
            }))
        };

        res.json(gamesResponse); // Devolver los juegos paginados como respuesta en formato JSON
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los juegos paginados' });
    }
};

// Función para obtener detalles de un juego por ID
const getGameById = async (req, res) => {
    const gameId = req.params.id;

    try {
        const game = await Game.findByPk(gameId); // Obtener un juego por su ID desde la base de datos

        if (!game) {
            return res.status(404).json({ error: 'Juego no encontrado' });
        }

        // Construir el objeto literal con los detalles del juego
        const gameDetail = {
            id: game.id,
            name: game.name,
            price: game.price,
            category: game.category,
            image: game.image,
            imageUrl: `http://localhost:3060/img/imagenes-productos/${game.image}`, // URL para la imagen del juego
            description: game.features, 
        };

        res.json(gameDetail); // Devolver detalles del juego en formato JSON
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el juego' });
    }
};
// Función para obtener todas las categorías y juegos por categoría
const getAllCategoriesWithGames = async (req, res) => {
    try {
        const uniqueCategories = await Game.aggregate('category', 'DISTINCT', { plain: false });
        const uniqueCategoriesCount = uniqueCategories.length;

        const categoriesWithGames = await Promise.all(
            uniqueCategories.map(async (categoryObj) => {
                const category = categoryObj.DISTINCT;
                const games = await Game.findAll({ where: { category } });

                return {
                    category,
                    games: games.map((game) => ({
                        id: game.id,
                        name: game.name,
                        detail: `/api/games/${game.id}`,
                        
                    })),
                };
            })
        );

        res.json({ uniqueCategoriesCount,categoriesWithGames });
    } catch (error) {
        console.error('Error al obtener las categorías con juegos:', error);
        res.status(500).json({ error: 'Error al obtener las categorías con juegos' });
    }
};


module.exports = {
    getAllGames,
    getGameById,
    getAllCategoriesWithGames,
};
