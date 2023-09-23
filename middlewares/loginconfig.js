function loginconfig(req, res, next) {
    if (req.session.userlogiado) {
        return res.redirect('/'); // Cambia la ruta según la ruta real de la biblioteca
    }
    next();
}

module.exports = loginconfig;
