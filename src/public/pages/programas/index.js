import { PresentadorService } from '../../services/PresentadorService.js';
import { ProgramaService } from '../../services/ProgramaService.js';
import { routes } from '../../global/routes.js'
import {config} from '../global/config.js';

const SERVER_API_URL = config.SERVER_API_URL;
let programas = [];
let presentadores = [];

const baseroute = 'http://localhost:3035';
window.addEventListener('load', async (event) => {
    await Promise.all( [
        await cargarProgramas(),
        await cargarPresentadores()
    ])
});
//crear programa
const formCrearPrograma = document.getElementById('form-crear-programa');
formCrearPrograma.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const response = await ProgramaService.create(event.currentTarget);
    console.log(response)
    if(response) routes.goToRoute(routes.PROGRAMAS, null);
    
})

// crear programacion
const btnCrearPrograma = document.getElementById('btn-crear-programa');
btnCrearPrograma.addEventListener('click', (event)=>{
    const formContainerCrearPrograma = document.getElementById('form-container-crear-programa');
    formContainerCrearPrograma.style.display = 'flex';
});

const formBtnCrearProgramaCancelar = document.getElementById('form-btn-crear-programa-cancelar');
formBtnCrearProgramaCancelar.addEventListener('click', (event) => {
    const formContainerCrearPrograma = document.getElementById('form-container-crear-programa');
    formContainerCrearPrograma.style.display = 'none';
})

async function cargarProgramas(){
    try {
        programas = await ProgramaService.getData();
        cargarListaProgramas();
    } catch (error) {
        console.log(error);
    }
}

async function cargarPresentadores(){
    try {
        presentadores = await PresentadorService.getAll();
        cargarPresentadoresAlFormulario()
    } catch (error) {
        console.log(error);
    }
}

function cargarListaProgramas(){
    if(programas.length == 0) return;
    const programasListContainer = document.getElementById('programas-list-container');
    programas.forEach( (programa) => {
        const programaItem = document.createElement('a');
        programaItem.href = `${SERVER_API_URL}/pages/programaciones/programaciones.html?idPrograma=${programa.id}`;
        const container = `
            <div class="card">
                <h3 class="card-title">${programa.titulo}</h3>
                <div><span class="card-prop">Descripcion: </span><span class="card-value">${programa.descripcion}</span><div>
                <div><span class="card-prop">Fecha de inicio: </span><span class="card-value">${programa.fecha_inicio}</span><div>
                <div><span class="card-prop">Horario de emision: </span><span class="card-value">${programa.horario_emision}</span><div>
                <div><span class="card-prop">Duracion: </span><span class="card-value">${programa.duracion} min</span><div>
                <div><span class="card-prop">Estado: </span><span class="card-value">${programa.estado}</span><div>
            </div>
        `;
        programaItem.innerHTML = container;

        programasListContainer.appendChild(programaItem);
    });
}

function cargarPresentadoresAlFormulario(){
    const presentadorSelector = document.getElementById('presentador_selector');
    presentadores.forEach((presentador)=>{
        const presentadorOption = document.createElement('option');
        presentadorOption.value = presentador.id;
        presentadorOption.text = `${presentador.nombre} - ${presentador.lenguaje}`
        presentadorSelector.appendChild(presentadorOption)
    });
}