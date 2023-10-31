const jwt = require('jsonwebtoken');
const middleware = {};
const dotenv = require('dotenv').config();

middleware.ensureToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.status(403).send('Inicio de session requerido');
    }
}

middleware.auth = (req, res, next) => {
    middleware.ensureToken(req, res, () => {
        jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
            if(err) res.status(403).send('token invalido');
            else{
                req.body.usuario = {
                    name: data.usuario.name,
                };
                next();
            }
        });
    })
}

module.exports = middleware;