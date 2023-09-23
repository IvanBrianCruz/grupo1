function esconderregistro(req, res, next) {
    res.locals.islogget = false;

    if (req.session && req.session.userlogiado) {
        res.locals.islogget = true;
        res.locals.userlogged = req.session.userlogiado;
    }

    next();
}

module.exports = esconderregistro;
