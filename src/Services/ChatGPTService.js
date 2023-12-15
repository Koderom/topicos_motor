const dotenv = require('dotenv').config();
const {OpenAI} = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



const ChatGPT = {};

ChatGPT.analizarMensaje = async (mensaje) => {
    try {
        const prompt = "Se le proporcionara un texto, es un mensaje enviado a un programa de tv, su tarea consiste en analizarlo y devolver un json con los datos del texto. Debe corregir la ortografia y la gramatica del texto. El objeto json debe tener la siguiente estructura:  <tipo> valores [S, P, C, null], dependiendo si el texto es un saludo, peticion de cancion, comentario u otro, respectivamente, <remitente> una cadena con el nombre del que envio el mensaje o null si no se especifica, objeto <musica> null si no es una peticion de musica, propiedades <titulo> <autor> <genero> (el genero de la cancion) estos datos se deben extraer del texto, se debe completar los que no se especifiquen y corregir si estan mal escritos";

        const respuestaAsJson = await ChatGPT.query(prompt, mensaje);
        console.log(respuestaAsJson);
        return JSON.parse(respuestaAsJson);
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

ChatGPT.generarSaludo = async (comentario) => {
    try {
        const prompt = "Con la siguiente descripcion, asumiendo el rol de un presentador de televicion, genera una respuesta para un mensaje o comentario corto, enviado por un televidente, si el nombre del televidente no es claro ignora el nombre";
        const texto = `nombre del televidente:${comentario.remitente} , mensaje: ${comentario.mensaje}`;
        const respuesta = await ChatGPT.query(prompt, texto);

        console.log(respuesta);
        return respuesta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

ChatGPT.generarMusicaPresentacion = async (cancion, comentario) => {
    try {
        const prompt = "Con la siguiente descripcion, asumiendo el rol de un presentador de televicion, genera una respuesta para un a peticion de una cancion realizada por un televidente, si la cancion existe se debe realizar una introduccion a la cancion, la respuesta debe tener menos de 70 palabras";

        const texto = `nombre del televidente: ${comentario.remitente}, mensaje: ${comentario.mensaje}. Cancion: ${cancion.titulo}, autor: ${cancion.titulo}, genero: ${cancion.genero}`;
        const respuesta = await ChatGPT.query(prompt, texto);

        console.log(respuesta);
        return respuesta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

ChatGPT.query = async (prompt, texto) => {
    try{
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    "role": "system",
                    "content": prompt
                },
                {
                    "role": "user",
                    "content": texto
                }
            ],
            temperature: 0.7,
            max_tokens: 128,
            top_p: 1,
        });
        return chatCompletion.choices[0].message.content;
    }catch(error){
        return error.message;
    }
}

module.exports = {ChatGPT};