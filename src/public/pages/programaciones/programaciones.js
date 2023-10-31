import { ProgramacionService } from "../../services/ProgramacionService.js";
import { config } from './../../global/config.js'
import { routes } from './../../global/routes.js';

const urlParams = new URLSearchParams(window.location.search);
let idPrograma = urlParams.get('idPrograma');
let idProgramacion = urlParams.get('idProgramacion');

let programaciones = [];
const SERVER_API_URL = config.SERVER_API_URL;

window.addEventListener('load', async (event) => {
    if(idProgramacion) await cargarProgamaId();
    await cargarProgramaciones();
});

const btnCrearProgramacion = document.getElementById('btn-crear-programacion');
btnCrearProgramacion.addEventListener('click', (event) => {
    const formContainerCrearProgramacion = document.getElementById('form-container-crear-programacion');
    formContainerCrearProgramacion.style.display = 'flex';
})

const formBtnProgramacionCancelar = document.getElementById('form-btn-programacion-cancelar');
formBtnProgramacionCancelar.addEventListener('click', (event)=>{
    const formContainerCrearProgramacion = document.getElementById('form-container-crear-programacion');
    formContainerCrearProgramacion.style.display = 'none';
})

const formCrearProgramacion = document.getElementById('form-crear-programacion');
formCrearProgramacion.addEventListener('submit', (event) => {
    event.preventDefault();
    const formulario = new FormData(event.currentTarget);
    formulario.append('programa_id', `${idPrograma}`);
    ProgramacionService.create(formulario);
})

async function cargarProgramaciones(){
    try {
        programaciones =  await ProgramacionService.getData(idPrograma);
        if(programaciones.length == 0) return;
        const programcionesListContainer = document.getElementById('programaciones-list-container');
        programaciones.forEach( (programacion) => {
            const programaItem = document.createElement('a');
            programaItem.href = `${SERVER_API_URL}/pages/guiones/index.html?idProgramacion=${programacion.id}&idGuion=${programacion.guion_id}`;
            //programaItem.innerHTML = `${programacion.titulo}`;
            const container = `
                <div class="card">
                    <h3 class="card-title">${programacion.titulo}</h3>
                    <div><span class="card-prop">Nro episodio: </span><span class="card-value">${programacion.nro_episodio}</span><div>
                    <div><span class="card-prop">Descripcion: </span><span class="card-value">${programacion.descripcion}</span><div>
                    <div><span class="card-prop">Fecha de emision: </span><span class="card-value">${programacion.fecha_emision}</span><div>
                </div>`;
            programaItem.innerHTML = container;
            programcionesListContainer.appendChild(programaItem);
        });
    } catch (error) {
        
    }
}

async function cargarProgamaId(){
    try {
        const programa = await ProgramacionService.getPrograma(idProgramacion);
        if(programa) idPrograma = programa.id;
    } catch (error) {
        console.log(error);
    }

}

// btn volver
const btnVolver = document.getElementById('btn-volver');
btnVolver.addEventListener('click', (event) => {
    routes.goToRoute(routes.PROGRAMAS, null);
});
