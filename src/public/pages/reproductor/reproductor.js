import { ProgramacionService } from "../../services/ProgramacionService.js";
import { GuionService } from '../../services/GuionService.js';
import CargarContenidoTask from './scripts/CargarContenidoTask.js'
import ReproducirContenidoTask from "./scripts/ReproducirContenidoTask.js";
import { routes } from "../../global/routes.js";

window.addEventListener('load', init);
let autoReproduccion = false;
let contenidoToLoad = [];

const urlParams = new URLSearchParams(window.location.search);
let idProgramacion = urlParams.get('idProgramacion');

let ws = new WebSocket('ws://localhost:3035/pages/reproductor');
let cargarContenidoTask;
let reproducirContenidoTask;

const peticionMusica = {};

function iniciarSocket(){
    ws.addEventListener('open', open);
    ws.addEventListener('message', message);
    ws.addEventListener('close', close);
    ws.addEventListener('error', error);
}

async function init(event) {
    iniciarSocket();

    autoReproduccion = confirm("activar autoreproduccion");
    await cargarDatos();
    cargarContenidoTask = new CargarContenidoTask(contenidoToLoad);
    reproducirContenidoTask = new ReproducirContenidoTask();

    const listener = {};
    listener.actualizar = (event, data) => {
        switch (event) {
            case 'onReproduccionEnded': onReproduccionEnded(data)
                break;
        }
    }

    cargarContenidoTask.agregarObservador(reproducirContenidoTask);
    reproducirContenidoTask.agregarObservador(listener);

    Promise.all([
        cargarContenidoTask.start(),
        reproducirContenidoTask.start()
    ])
}
async function cargarDatos() {
    const programacion = await ProgramacionService.getProgramacion(idProgramacion);
    const guion = await GuionService.getGuion(programacion.id);
    contenidoToLoad = guion.escenas;
    console.log(contenidoToLoad);
}

function onReproduccionEnded(mensaje) {
    alert(mensaje)
    const idPrograma = localStorage.getItem("state_programa");
    if (idPrograma) {
        routes.goToRoute(routes.PROGRAMACIONES, { idPrograma });
    } else {
        routes.goToRoute(routes.PROGRAMAS, null);
    }
}



function open(event){
    console.log("Conectado");
}
function message(event){
    const resp = JSON.parse(event.data);
    console.log("Socket cliente: mensaje entrante");
    console.log(resp);

    switch (resp.type) {
        case 'wh-did-generar-saludo': 
                if(cargarContenidoTask) cargarContenidoTask.addSaludoTelevidente(resp.body);
        case 'wh-did-generar-peticion-audio':
                setPeticionMusica(resp.body.escena)
            break;
        case 'wh-did-generar-peticion-presentacion':
                setPeticionPresentacion(resp.body.escena)
            break;
        default:
            break;
    }
}
function error(event){
    
}
function close(event){
    ws = new WebSocket('ws://localhost:3035/pages/reproductor');
    iniciarSocket();
}

function setPeticionPresentacion(escena){
    peticionMusica.presentacion = escena;
    if(peticionMusica.musica && peticionMusica.presentacion) cargarPeticion();
}
function setPeticionMusica(escena){
    peticionMusica.musica = escena;
    if(peticionMusica.musica && peticionMusica.presentacion) cargarPeticion();
}
function cargarPeticion(){
    cargarContenidoTask.cargarPeticionMusica(peticionMusica)
}