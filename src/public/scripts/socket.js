import { contenido } from "./contenido.js";
import {escenas} from './escenas.js';
const socket = {};

socket.open = (event) => {
    //contenido.mostrarNotificacion("Conectado al socket");
}
socket.message = (event) => {
    console.log("Socket cliente: mensaje entrante");
    const resp = JSON.parse(event.data);
    console.log(resp);
    switch (resp.type) {
        case 'wh-did-respuesta': 
                contenido.showRefreshNotifycation();
                console.log(resp.body);
            break;
        default:
            break;
    }
}
socket.error = (event) => {
    
}
socket.close = (event) => {
    
}

export {socket};