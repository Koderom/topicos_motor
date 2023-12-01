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

async function init(event) {
    autoReproduccion = confirm("activar autoreproduccion");
    await cargarDatos();
    const cargarContenidoTask = new CargarContenidoTask(contenidoToLoad);
    const reproducirContenidoTask = new ReproducirContenidoTask();

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