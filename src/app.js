const express = require('express');
const session = require('express-session');

const methodOverride = require('method-override');
const path = require('path');
//const routes = require('./routes');
const esconderregistro = require("../middlewares/esconderregistro");
//express
const app = express();
const cors = require('cors'); // Importa cors

//middlewares
// Usa el middleware loginconfig en todas las rutas

app.use(session({
    secret:'esto es muy secreto no mires ',
    resave: false,
    saveUninitialized: false,

}));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization'
  }));

app.use(esconderregistro);  
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /publ
app.use(express.urlencoded({ extended: false }));//carga de producto y interprete 
app.use(express.json());// se ve en formato de objeto 
app.use(methodOverride('_method'));


// ******** template engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Importamos los distintos enrutadores
const mainRouter = require("./routers/mainRouter.js")

const productsController = require("./routers/productsRouter.js")

const usuariosController = require("./routers/usuariosRouter.js");

const productsControllerAPI = require("./routers/api/productosRuterAPI.js")

const usuariosControllerAPI = require("./routers/api/usuariosRouterAPI.js")

const { Session } = require('inspector');


// Usando recursos estáticos.
//app.use(express.static("public"));
// Usa el middleware esconderregistro antes de cargar las rutas

// Usando los enrutadores importados
app.use("/", mainRouter);

app.use("/", productsController);

app.use("/", usuariosController);

app.use("/", productsControllerAPI);

app.use("/", usuariosControllerAPI)


// Ponemos a escuchar el servidor
app.listen(3060, () => {
    console.log("Servidor corriendo en http://localhost:3060")
});







 