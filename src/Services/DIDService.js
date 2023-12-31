const sdk = require('api')('@d-id/v4.2.0#g9xv4c21lnk6rt31');
const {FileManager} = require('../utils/fileManager');
const Archivo = require('../models/Archivo');
const Interaccion = require('../models/Interaccion');
const dotenv = require('dotenv').config();
const axios = require('axios');

const TIME_OUT = 30;
const DIDService = {};
const NGROK_PUBLIC_URL = process.env.NGROK_PUBLIC_URL;
const credentials = `Basic ${process.env.API_KEY_D_ID}`;
sdk.auth(credentials);

DIDService.clipGenerate = async (text) => {
    try {
        let resp = await sdk.createClip({
            driver_id: 'Vcq0R4a8F0',
            script: {
                type: 'text',
                provider: {
                    type: 'microsoft', voice_id: 'es-AR-ElenaNeural'
                },
                ssml: 'false',
                input: `${text}`,
            },
            config: {result_format: 'mp4'},
            presenter_id: 'amy-Aq6OmGZnMt',
            background: {color: '#74c0c0'},
            //webhook: 'https://5e47-2800-cd0-5212-1000-9088-4eb6-cda1-a8bb.ngrok-free.app/wh/d-id'
            webhook: `${NGROK_PUBLIC_URL}/wh/d-id`
        });
        return resp.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

DIDService.talkGenerate = async (text, presentador) => {
    try {
        const apiUrl = 'https://api.d-id.com/talks';
        const authToken = credentials;
        const requestData = {
        script: {
            type: 'text',
            subtitles: 'false',
            provider: {
            type: 'microsoft',
            voice_id: presentador.voz_provider_id,
            },
            ssml: 'false',
            input: text,
        },
        config: {
            fluent: 'false',
            pad_audio: '0.0',
            align_driver: false,
            auto_match: true,
            stitch: true,
        },
        source_url: presentador.presentador_url,
        webhook: `${NGROK_PUBLIC_URL}/wh/d-id`
        };
        const response = await axios.post(apiUrl, requestData, {
            headers: {
              'Accept': 'application/json',
              'Authorization': authToken,
              'Content-Type': 'application/json',
            },
          });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

DIDService.talkGenerateWithWebHook = async (text, presentador, webhookUrl) => {
    try {
        const apiUrl = 'https://api.d-id.com/talks';
        const authToken = credentials;
        const requestData = {
        script: {
            type: 'text',
            subtitles: 'false',
            provider: {
            type: 'microsoft',
            voice_id: presentador.voz_provider_id,
            },
            ssml: 'false',
            input: text,
        },
        config: {
            fluent: 'false',
            pad_audio: '0.0',
            align_driver: false,
            auto_match: true,
            stitch: true,
        },
        source_url: presentador.presentador_url,
        webhook: `${NGROK_PUBLIC_URL}${webhookUrl}`
        };
        const response = await axios.post(apiUrl, requestData, {
            headers: {
              'Accept': 'application/json',
              'Authorization': authToken,
              'Content-Type': 'application/json',
            },
          });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
DIDService.storeVideoDID = async (data) => {
    try {
        const dResponse = {};
        dResponse.nombre = data.id;
        dResponse.tipo = "mp4";
        dResponse.duracion = `${data.duration}`;
        dResponse.url_portada = "https://clips-presenters.d-id.com/amy/jcwCkr1grs/uM00QMwJ9x/image.png";
        const url = data.result_url;
        const fileInfo = await FileManager.storeFileFromURL(url, dResponse.nombre);
        let archivo = new Archivo(null, `${fileInfo.filename}.${fileInfo.filetype}`, "mp4", null, fileInfo.filepath, null);
        const archivoId = await Archivo.create(archivo);        
        await Interaccion.updateWhitClip(data.id, archivoId);
        dResponse.path = fileInfo.filepath;
        archivo = await Archivo.getArchivo(archivoId);
        return archivo;
    } catch (error) {
        console.log(error);
        return error;
    }
}

DIDService.storeTempVideoDID = async (data) => {
    try {
        const dResponse = {};
        dResponse.nombre = data.id;
        dResponse.tipo = "mp4";
        dResponse.duracion = `${data.duration}`;
        dResponse.url_portada = "https://clips-presenters.d-id.com/amy/jcwCkr1grs/uM00QMwJ9x/image.png";
        const url = data.result_url;
        const fileInfo = await FileManager.storeFileFromURL(url, dResponse.nombre);
        let archivo = new Archivo(null, `${fileInfo.filename}.${fileInfo.filetype}`, "mp4", null, fileInfo.filepath, null);
        console.log(archivo);
        return archivo;
    } catch (error) {
        console.log(error);
        return error;
    }
}

DIDService.getPresentadores = async () => {
    try {
        const response = await axios.get(
            'https://api.d-id.com/clips/presenters?limit=100', {
                headers : {
                    'accept' : 'application/json',
                    'authorization' : `${credentials}`
                }
            }
        );
        return response.data.presenters;
    } catch (error) {
        
    }
}
DIDService.getVoicesAvailable = async () => {
    try {
        const response = await axios.get(
            'https://api.d-id.com/tts/voices?provider=microsoft', {
                headers : {
                    'accept' : 'application/json',
                    'authorization' : `${credentials}`
                }
            }
        );
        return response.data;
    } catch (error) {
        
    }
}
async function getPresenterImageUrlByID(presenterID){
    try {
        let resp = sdk.getPresenterById({id: 'amy-jcwCkr1grs'});
        return resp.data.image_url;
    } catch (error) {
        return error;
    }
}

async function getClipUrlByID(videoID){
    try {
        let timeOutInSeconds = TIME_OUT;
        let resp = await sdk.getClip({id: `${videoID}`});    
        do {
            resp = await sdk.getClip({id: `${videoID}`});    
            await new Promise(resolve => setTimeout(resolve, 1000));
            timeOutInSeconds--;
            console.log(timeOutInSeconds)
            console.log(resp.data)
        } while (resp.data.status != 'done' || timeOutInSeconds === 0);        
        if(resp.data.status === 'done')return resp.data.result_url;
        else throw new Error('timeout error');
    } catch (error) {
        console.log(error)
        return error;
    }
}

// DID.test = (req, res) => {
//     try {
//         const mensaje = req.body;
//         res.status(200).send("OK");
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// DID.createVideo = async (req, res) => {
//     try {
//         const message = req.body.Body;
//         const profileName = req.body.ProfileName;
//         const from = req.body.WaId;
//         sendObjetcToSocket(req.socketChat, {type: 'message', message, profileName, from});
//         const videoID = await clipGenerate(message);
//         sendObjetcToSocket(req.socketChat, {type: 'generating-video'});
//         const videoUrl = await getClipUrlByID(videoID);
//         sendObjetcToSocket(req.socketChat, {type: 'video-generated'});
//         sendObjetcToSocket(req.socketChat, {type: 'videoUrl', videoUrl});
//         res.status(200).send("OK");  
//     } catch (error) {
//         sendObjetcToSocket(req.socketChat, {type: 'error', error: error.message});
//         res.status(400).send(error.message);
//     }
// }

function sendObjetcToSocket(socket, object){
    socket.send( JSON.stringify(object));
}
module.exports = {DIDService};