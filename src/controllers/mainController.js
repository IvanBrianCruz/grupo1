// Requerimos path para poder enviar los archivos HTML



// Creamos el objeto literal con los métodos a exportar
const mainController = {

    // Manejo del pedido get con ruta
    
    bibloteca: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/bibloteca")
    },
    listaDeDeseos: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render("../views/listaDeDeseos")
    },
    carrito: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/carrito")
    },


    // Manejo del pedido get con ruta del footer

    equipo: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/viewsFooter/equipo")
    },
    sucursal: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/viewsFooter/sucursal")
    },
    testimonios: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/viewsFooter/testimonios")
    },
    eventos: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/viewsFooter/evento")
    },
    condiciones: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/viewsFooter/terminoYCondiciones")
    },
    privacidad: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/viewsFooter/privacidad")
    },
    sprints: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/viewsFooter/sprints")
    },
    presentacion: (req, res) => {
        // comunicarse con el modelo, conseguir información
        res.render( "../views/viewsFooter/presentacion")
    },


    

   
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = mainController;
