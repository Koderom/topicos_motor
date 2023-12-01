import { PresentadorService } from '../../services/PresentadorService.js';
import { ProgramaService } from '../../services/ProgramaService.js';
import { routes } from '../../global/routes.js'
import {config} from '../../global/config.js';

const SERVER_API_URL = config.SERVER_API_URL;
let programas = [];
let presentadores = [];

window.addEventListener('load', async (event) => {
    await Promise.all( [
        await cargarProgramas(),
        await cargarPresentadores()
    ])
    let state_formCrearPrograma = localStorage.getItem("state_formCrearPrograma");
    if(state_formCrearPrograma){
        state_formCrearPrograma = JSON.parse(state_formCrearPrograma);
        cargarFormulacionWithOldValues(state_formCrearPrograma);
    }
});
//crear programa
const formCrearPrograma = document.getElementById('form-crear-programa');
formCrearPrograma.addEventListener('submit', async (event)=>{
    event.preventDefault();
    localStorage.removeItem('state_formCrearPrograma')
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
    localStorage.removeItem("state_formCrearPrograma");
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
            <div class="card_image"><img src="./../../storage/${programa.portada}" alt=""></div>
            <div class="card_content">
                <h3 class="card-title">${programa.titulo}</h3>
                <div><span class="card-prop">Fecha de inicio: </span><span class="card-value">${programa.fecha_inicio}</span><div>
                <div><span class="card-prop">Horario de emision: </span><span class="card-value">${programa.horario_emision}</span><div>
                <div><span class="card-prop">Duracion: </span><span class="card-value">${programa.duracion} min</span><div>
            </div>
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

document.getElementById('btn_add_presentador').addEventListener('click', (ev) => {
    const state_formCrearPrograma = {};
    const formCrearPrograma = document.getElementById('form-crear-programa');
    state_formCrearPrograma.titulo = formCrearPrograma.elements['titulo'].value;
    state_formCrearPrograma.descripcion = formCrearPrograma.elements['descripcion'].value;
    state_formCrearPrograma.genero = formCrearPrograma.elements['genero'].value;
    state_formCrearPrograma.clasificacion = formCrearPrograma.elements['clasificacion'].value;
    state_formCrearPrograma.horario_emision = formCrearPrograma.elements['horario_emision'].value;
    state_formCrearPrograma.fecha_inicio = formCrearPrograma.elements['fecha_inicio'].value;
    state_formCrearPrograma.estado = formCrearPrograma.elements['estado'].value;
    state_formCrearPrograma.duracion = formCrearPrograma.elements['duracion'].value;
    state_formCrearPrograma.presentador_id = 2;
    console.log(state_formCrearPrograma);
    localStorage.setItem("state_formCrearPrograma", JSON.stringify(state_formCrearPrograma));

    routes.goToRoute(routes.PRESENTADORES, null);
})

function cargarFormulacionWithOldValues(oldValues){

    console.log(oldValues)
    const formCrearPrograma = document.getElementById('form-crear-programa');
    const formContainer = document.getElementById('form-container-crear-programa');

    formCrearPrograma.elements['titulo'].value = oldValues.titulo;
    formCrearPrograma.elements['descripcion'].value = oldValues.descripcion;
    formCrearPrograma.elements['genero'].value = oldValues.genero;
    formCrearPrograma.elements['clasificacion'].value = oldValues.clasificacion;
    formCrearPrograma.elements['horario_emision'].value = oldValues.horario_emision;
    formCrearPrograma.elements['fecha_inicio'].value = oldValues.fecha_inicio;
    const estadoOpciones = {
        'pendiente' : 0,
        'emision' : 1,
        'cancelado' : 2
    }
    formCrearPrograma.elements['estado'].children[estadoOpciones[oldValues.estado]].selected = true;
    formCrearPrograma.elements['duracion'].value = oldValues.duracion;
    if(oldValues.presentador_id){
        const presentadores = formCrearPrograma.elements['presentador_id'].children;
        for (const presentador of presentadores) {
            if(presentador.value == oldValues.presentador_id) presentador.selected = true;
        }
    }
    formContainer.style.display = 'flex';
    
}