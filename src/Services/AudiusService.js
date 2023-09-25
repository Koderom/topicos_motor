const fetch = require('node-fetch');
const {FileManager} = require('../utils/fileManager');
const AudiusService = {}

AudiusService.searchMusicByName = async (name) => {
    try {
        const audiusResponse = {};
        const response = await fetch(
            `https://audius-discovery-18.cultur3stake.com/v1/tracks/search?query=${name}&app_name=EXAMPLEAPP`,
            {
                method: 'GET',
                headers: {'Accept':'application/json'}
            }
        )
        const data = await response.json();
        const musica = data.data[0];
        const urlDownload = getUrlFromId(musica.id);
        const fileInfo = await FileManager.storeFileFromURL(urlDownload, musica.title);
        audiusResponse.nombre = fileInfo.filename;
        audiusResponse.local_path = fileInfo.filepath;
        audiusResponse.tipo = fileInfo.filetype;
        audiusResponse.url_portada = musica.artwork["1000x1000"];
        audiusResponse.duracion = musica.duration;

        return audiusResponse;
    } catch (error) {
        return error;
    }
}

// Audius.test = async (req, res) => {
//     try {
//         const message = req.body.Body;
//         const profileName = req.body.ProfileName;
//         const from = req.body.WaId;
//         sendObjetcToSocket(req.socketChat, {type: 'message', message, profileName, from});
//         const music = await searchMusicByName(message);
//         const musicID = music[0].id;
//         const musicTitle = music[0].title;
//         const url = `https://audius-discovery-18.cultur3stake.com/v1/tracks/${musicID}/stream?app_name=EXAMPLEAPP`;
//         sendObjetcToSocket(req.socketChat, {type: "music", url: url, title: musicTitle});
//         res.status(200).send("OK");
//     } catch (error) {
//         sendObjetcToSocket(req.socketChat, {type: "error", error: error.message});
//         res.status(400).send(error.message);
//     }
// }
function getUrlFromId(id){
    const url = `https://audius-discovery-18.cultur3stake.com/v1/tracks/${id}/stream?app_name=EXAMPLEAPP`;
    return url;
}
function sendObjetcToSocket(socket, object){
    socket.send( JSON.stringify(object));
}
module.exports = {AudiusService}