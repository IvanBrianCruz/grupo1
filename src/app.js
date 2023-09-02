const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /publ
app.use(express.urlencoded({extended:false}));//carga de producto y interprete 
app.use(express.json());// se ve en formato de objeto 
// Configuraciones y middlewares;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



    // Importamos los distintos enrutadores
    const mainRouter = require("./routers/mainRouter.js")

    const productsController = require("./routers/productsRouter.js")

    const usuariosController = require("./routers/usuariosRouter.js")
   

    // Usando recursos estáticos.
    app.use(express.static("public"));

// Usando los enrutadores importados
app.use("/", mainRouter);

app.use("/", productsController);

app.use("/", usuariosController);



// Ponemos a escuchar el servidor
app.listen(3060, () => {
    console.log("Servidor corriendo en http://localhost:3060")
});







