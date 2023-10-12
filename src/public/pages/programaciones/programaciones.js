import { ProgramacionService } from "../../services/ProgramacionService.js";

const urlParams = new URLSearchParams(window.location.search);
const idPrograma = urlParams.get('idPrograma');

let programaciones = [];
const baseroute = 'http://localhost:3035';

console.log("programa id: "+idPrograma);

window.addEventListener('load', async (event) => {
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
    let programa_id_input = document.querySelector(`#form-crear-programacion[name='programa_id']`);
    if(programa_id_input == null){
        programa_id_input = document.createElement('input');
        programa_id_input.type = 'hidden'; // Campo oculto
        programa_id_input.name = 'programa_id';
        programa_id_input.value = idPrograma;
        formCrearProgramacion.appendChild(programa_id_input);
    }
    formCrearProgramacion.submit();
})

async function cargarProgramaciones(){
    try {
        programaciones =  await ProgramacionService.getData(idPrograma);
        if(programaciones.length == 0) return;
        const programcionesListContainer = document.getElementById('programaciones-list-container');
        programaciones.forEach( (programacion) => {
            const programaItem = document.createElement('a');
            programaItem.href = `${baseroute}/pages/guiones/index.html?idProgramacion=${programacion.id}&idGuion=${programacion.guion_id}`;
            programaItem.innerHTML = `${programacion.titulo}`;
            programcionesListContainer.appendChild(programaItem);
        });
    } catch (error) {
        
    }
}

