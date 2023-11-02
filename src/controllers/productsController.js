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
          const nuevoJuego = await Game.create({
            name: data.name,
            price: parseInt(data.price),
            category: data.categoria,
            features: data.descripcion,
            image: req.file ? req.file.filename : 'default-image.png',
          });
          res.redirect('/');
        } catch (error) {
          console.error(error);
          res.status(500).send('Error al agregar el producto a la base de datos');
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
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al editar el producto en la base de datos');
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