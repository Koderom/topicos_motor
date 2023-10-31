const Usuario = require("../models/Usuario");
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');


const UsuarioController = {};

UsuarioController.login = async (req, res) =>{
    try {
        console.log(req.body)
        const credenciales = {name: req.body.name, password: req.body.password};
        const usuario = await Usuario.validarUsuario(credenciales);
        if(usuario){
            const token = jwt.sign({usuario}, process.env.SECRET_KEY);
            res.json({token});
        }else{
            res.sendStatus(403);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

module.exports = {UsuarioController};