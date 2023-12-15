import { contenido } from "./contenido.js";

const socket = {};

socket.open = (event) => {
    console.log("Conectado");
}
socket.message = (event) => {
    const resp = JSON.parse(event.data);

    console.log("Socket cliente: mensaje entrante");
    console.log(resp);

    switch (resp.type) {
        case 'wh-did-generar-saludo': 
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