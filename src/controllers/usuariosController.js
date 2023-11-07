const bcryptjs = require('bcryptjs');

const db = require('../data/models');
const User = db.User; // Asumiendo que has definido el modelo User correctamente

const usuariosController = {
  registro: (req, res) => {
    res.render('../views/register');
  },
  prossregistro: async (req, res) => {
    try {
      const data = req.body;
      const newUser = {
        first_name: data.name,
        last_name: data.apell,
        email: data.email,
        password: bcryptjs.hashSync(data.password, 10),
        image: req.file ? req.file.filename : 'default-imagen.png',
        category: data.categoria,
      };
      const createdUser = await User.create(newUser);
      res.redirect('/');
      console.log(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear un nuevo usuario');
    }
  },
    inicioDeSesion: (req, res) => {
        // console.log(req.session);
        // comunicarse con el modelo, conseguir informacións
        res.render("../views/iniciarSesion")
    },
    loginpross: async (req, res) => {
        try {
          const { email, password } = req.body;
          // Buscar al usuario por su correo electrónico en la base de datos
          const userToLogin = await User.findOne({ where: { email } });
    
          if (userToLogin) {
            // Verificar la contraseña utilizando bcrypt
            const isPasswordValid = bcryptjs.compareSync(password, userToLogin.password);
    
            if (isPasswordValid) {
              // Redireccionar al usuario a la página de inicio
              delete userToLogin.password;
              req.session.userlogiado = userToLogin;
              console.log(req.session);
              return res.render('../views/bibloteca');
            } else {
              // Contraseña incorrecta
              return res.render('../views/iniciarSesion', {
                errors: {
                  password: {
                    msg: 'La contraseña es incorrecta',
                  },
                },
              });
            }
          } else {
            // El correo no se encuentra en la base de datos
            return res.render('../views/iniciarSesion', {
              errors: {
                email: {
                  msg: 'El correo no se encuentra en la base de datos',
                },
              },
            });
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Error en el inicio de sesión');
        }
      },

    cerrarSession: (req, res) => {
        req.session.destroy();
        return res.redirect("/");
    },
    editUsser: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("../views/edicionDeUsuario")
    },
   // En tu controlador

prosseditUsser: async (req, res) => {
    const data = req.body;
    const id = req.params.id; // Obtén el ID del parámetro de la URL

    try {
      // Buscar el usuario original en la base de datos
      const oldUsuario = await User.findByPk(id);

      if (oldUsuario) {
        // Actualizar los datos del usuario con los datos ingresados por el usuario
        oldUsuario.first_name = data.first_name;
        oldUsuario.last_name = data.last_name;
        oldUsuario.email = data.email;
        oldUsuario.password = data.password ? bcryptjs.hashSync(data.password, 10) : oldUsuario.password;
        oldUsuario.image = req.file ? req.file.filename : oldUsuario.image;
        oldUsuario.category = data.category;

        // Guardar los cambios en la base de datos
        await oldUsuario.save();

        // Redirigir al usuario a alguna vista
        return res.redirect('/');
      } else {
        return res.status(404).send('Usuario no encontrado');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al editar el usuario');
    }
  },
    


}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = usuariosController;