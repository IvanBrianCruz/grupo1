const fs = require('fs');

const db = require('../data/models');
const Game = db.Game;

const productsController = {
  index: function (req, res) {
    Game.findAll()
      .then(function (products) {  // Cambié 'productos' a 'products' aquí
        res.render('inicio', { products: products });  // Cambié 'productos' a 'products' aquí
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos desde la base de datos');
      });
  },
  // Manejo del pedido get con ruta
  productoDetalle: async (req, res) => {
    try {
      const product = await Game.findByPk(req.params.id);
      if (product) {
        res.render('../views/producto', { product });
      } else {
        res.status(404).send('Producto no encontrado');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el producto desde la base de datos');
    }
  },
  productocarga: (req, res) => {
    res.render('../views/cargaDeProducto');
  },
  procesoDeCarga: async (req, res) => {
    const data = req.body;
    try {
      switch (true) {
        case data.name.length < 5:
          return res.status(400).send('El nombre debe tener al menos 5 caracteres');
        case data.descripcion.length < 20:
          return res.status(400).send('La descripción debe tener al menos 20 caracteres');
        case req.file && !isImageValid(req.file):
          return res.status(400).send('Formato de imagen no válido');
        default:
          const nuevoJuego = await Game.create({
            name: data.name,
            price: parseInt(data.price),
            category: data.categoria,
            features: data.descripcion,
            image: req.file ? req.file.filename : 'default-image.png',
          });
          res.redirect('/');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al agregar el producto a la base de datos');
    }
    function isImageValid(file) {
      // Verificar si el archivo es una imagen válida (JPG, JPEG, PNG, GIF)
      const allowedExtensions = /\.(jpg|jpeg|png|gif)$/i;
      return allowedExtensions.test(file?.originalname);
    }
  },

  //******************anda asta aqui */
  productoedicion: async (req, res) => {
    try {
      const product = await Game.findByPk(req.params.id);
      if (product) {
        res.render('../views/edicionDeProducto', { productToEdit: product });
      } else {
        res.status(404).send('Producto no encontrado');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el producto desde la base de datos');
    }
  },

  procesoDeEdicion: async (req, res) => {
    const data = req.body;
    try {
      switch (true) {
        case data.name.length < 5:
          return res.status(400).send('El nombre debe tener al menos 5 caracteres');
        case data.descripcion.length < 20:
          return res.status(400).send('La descripción debe tener al menos 20 caracteres');
        case req.file && !isImageValid(req.file):
          return res.status(400).send('Formato de imagen no válido');
        default:
          const oldProduct = await Game.findByPk(req.params.id);
          if (oldProduct) {
            const editadoJuego = {
              name: data.name,
              price: parseInt(data.price),
              category: data.categoria,
              features: data.descripcion,
              image: req.file ? req.file.filename : oldProduct.image,
            };

            await Game.update(editadoJuego, {
              where: { id: req.params.id },
            });

            res.redirect('/');
          } else {
            res.status(404).send('Producto no encontrado');
          }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al editar el producto en la base de datos');
    }

    function isImageValid(file) {
      // Verificar si el archivo es una imagen válida (JPG, JPEG, PNG, GIF)
      const allowedExtensions = /\.(jpg|jpeg|png|gif)$/i;
      return file && allowedExtensions.test(file.originalname);
    }

  },


  eliminarProducto: async (req, res) => {
    try {
      const product = await Game.findByPk(req.params.id);
      if (product) {
        await Game.destroy({
          where: { id: req.params.id },
        });
        res.redirect('/');
      } else {
        res.status(404).send('Producto no encontrado');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el producto de la base de datos');
    }
  },

}


// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = productsController;