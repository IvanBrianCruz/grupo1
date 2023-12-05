const db = require('../../data/models');
const User = db.User;

// Función para obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Obtener todos los usuarios desde la base de datos
        
        // Construcción del objeto literal a devolver
        const usersResponse = {
            count: users.length,
            users: users.map(user => ({
                id: user.id,
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                detail: `/api/users/${user.id}` // URL para obtener el detalle
            }))
        };

        res.json(usersResponse); // Devolver los usuarios como respuesta en formato JSON
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Función para obtener detalles de un usuario por ID
const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId); // Obtener un usuario por su ID desde la base de datos

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Construir el objeto literal con los detalles del usuario
        const userDetails = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            image: user.image,
            imageUrl: `http://localhost:3060/img/imagenes-usuario/${user.image}` // URL para la imagen de perfil del usuario
            // No incluir información sensible como la contraseña
        };

        res.json(userDetails); // Devolver detalles del usuario en formato JSON
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

module.exports = {
    getAllUsers,
    getUserById
};
