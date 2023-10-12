import { ProgramaService } from './services/ProgramaService.js';
let programas = [];
const baseroute = 'http://localhost:3035';
window.addEventListener('load', async (event) => {
    await cargarProgramas();
    
});

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
function cargarListaProgramas(){
    if(programas.length == 0) return;
    const programasListContainer = document.getElementById('programas-list-container');
    programas.forEach( (programa) => {
        const programaItem = document.createElement('a');
        programaItem.href = `${baseroute}/pages/programaciones/programaciones.html?idPrograma=${programa.id}`;
        programaItem.innerHTML = `${programa.titulo}`;
        programasListContainer.appendChild(programaItem);
    });
}