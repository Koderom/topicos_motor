const SocketManager = require("../utils/SocketManager");
const { ChatGPT } = require('../Services/ChatGPTService');
const { DIDService } = require('../Services/DIDService');
const Guion = require('../models/Guion');
const Presentador = require('../models/Presentador');
const Programacion = require('../models/programacion');
const Archivo = require("../models/Archivo");
const Escena = require("../models/Escena");
const { AudiusService } = require("../Services/AudiusService");
const Audio = require("../models/Audio");


const dotenv = require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

const TwilioController = {}
TwilioController.messageReceived = async (req, res) => {
    try{
        const message = req.body.Body;
        const sender = getSender(req.body.From);
        console.log(`${sender} : ${message}`);
        const mensajeAnalizado = await ChatGPT.analizarMensaje(message);
        mensajeAnalizado.mensaje = message;
        if(mensajeAnalizado.remitente == null) mensajeAnalizado.remitente = req.body.ProfileName;
        switch(mensajeAnalizado.tipo){
            case 'S': await generarSaludo(mensajeAnalizado); break;  
            //case 'P': await generarMusica(mensajeAnalizado.musica); break
            //case 'C': await mostrarComentario(mensajeAnalizado); break;
        }
        res.status(200).send('mensaje recibido');
    }catch(error){
        console.log(error.message);
        res.status(403).send(error.message);
    }
}

async function generarSaludo(mensaje){
    try {
        //SocketManager.sendObjectAll({type: "wh-did-generar-saludo", body: mensaje});
        const dialogos = await ChatGPT.generarSaludo(mensaje);
        const programacion = await Programacion.getProgramacionReproduciendo();
        if(!programacion) throw new Error('no existe programacion reproduciendo')

        const guion = await Guion.getGuionFromProgramacion(programacion.id);
        const presentador = await Presentador.getPresentadorFromGuionId(guion.id);
        const webhookUrl = '/wh/d-id/generar-saludo';
        DIDService.talkGenerateWithWebHook(dialogos, presentador, webhookUrl);    
    } catch (error) {
        console.log(error.message);
        throw error;
    }
    
}
async function generarMusica(musica){
    try {
        const randomId = Math.floor(Math.random() * (999 - 1 + 1)) + 1;

        const dialogoPresentacion = await ChatGPT.generarMusicaPresentacion(musica);
        const programacion = await Programacion.getProgramacionReproduciendo();
        if (!programacion) throw new Error('No existe programacion reproduciendo');
        //generar video did
        const guion = await Guion.getGuionFromProgramacion(programacion.id);
        const presentador = await Presentador.getPresentadorFromGuionId(guion.id);
        const webhookUrl = '/wh/d-id/generar-peticion';
        const didResponse = await DIDService.talkGenerateWithWebHook(dialogoPresentacion, presentador, webhookUrl);
        const archivoTempDialogo = new Archivo(null, didResponse.id, null, null, null);
        await Archivo.create(archivoTempDialogo);
        //generar musica audius
        const archivo = await AudiusService.searchMusicByName(musica.titulo);
        let escenaMusica = new Audio(null, null, musica.titulo, "musica pedida por un televidente", musica.autor, musica.genero, guion.id, archivo.id);
        const escenaMusicaId = await Audio.create(escenaMusica);
        escenaMusica = await Audio.getAudio(escenaMusicaId);
        escenaMusica.archivo = archivo;
        SocketManager.sendObjectAll({type: "wh-did-generar-peticion-audio", body: {
            id: didResponse.id,
            escena: escenaMusica
        }});
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}
async function mostrarComentario(mensaje){

}

function respond(response, sender) {
    client.messages.create({
        from: `whatsapp:${twilioPhoneNumber}`,
        body: `${response}`,
        to: `whatsapp:${sender}`
    }).then(message => console.log(message.sid));
}

function getSender(originNumber){
    return originNumber.slice(9);
}


module.exports = {TwilioController};