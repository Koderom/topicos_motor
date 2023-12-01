import { ConfiguracionPresentadorService } from "../../services/ConfiguracionPresentadorService.js";
import { PresentadorService } from "../../services/PresentadorService.js";
import { VocesService } from "../../services/VocesService.js";
import { routes } from '../../global/routes.js'

let presentadores = [];
let voces = [];
let opcionesGenero = new Set();
let opcionesLenguaje = new Set();

window.addEventListener('load', async (event) => {
    presentadores = await PresentadorService.getAll();
    voces = await VocesService.getAll();
    //cargarPresentadoresAlFormulario();
    cargarOpcionesLenguaje();
    cargarGeneros();
    cargarOpcionesDeVozAlFormulario();
    cargarPreviewPresentador(null);
    cargarListaPresentadores(presentadores);
    //inicializarUrlPresentador();
})

function cargarListaPresentadores(presentadoresList){
    const presentadorContainer = document.getElementById('presentador_list_container');
    presentadoresList.forEach( (presentador) => {
        const container = document.createElement('a');
        container.className = 'presentador_container';
        container.addEventListener('click', onPresentadorSelected);
        container.setAttribute('data-presentador-id', presentador.id);
        container.appendChild(getPrestadorComponent(presentador));
        presentadorContainer.appendChild(container);
    });
}

function onPresentadorSelected(event){
    const presentadorContainer = event.currentTarget;
    console.log(presentadorContainer)
    const presentador_id = presentadorContainer.getAttribute('data-presentador-id');
    const state_formCrearPrograma = JSON.parse(localStorage.getItem('state_formCrearPrograma'));
    state_formCrearPrograma.presentador_id = presentador_id;
    localStorage.setItem('state_formCrearPrograma', JSON.stringify(state_formCrearPrograma));
    routes.goToRoute(routes.PROGRAMAS, null);
}

function getPrestadorComponent(presentador){
    const contenido = `
    <div class="presentador_image">
        <img  src="${presentador.presentador_url}" alt="">
    </div>
    <div class="presentador_data_container">
        <div>
            <span class="card_presentador_campo">Nombre:</span> <span class="card_presentador_valor">${presentador.nombre}</span>
        </div>
        <div>
            <span class="card_presentador_campo">Idioma:</span> <span class="card_presentador_valor">${presentador.lenguaje}</span>
        </div>
        <div>
            <span class="card_presentador_campo">Genero:</span> <span class="card_presentador_valor">${presentador.genero}</span>
        </div>
    </div>`;
    const card = document.createElement('div');
    card.className = "card_presentador";
    card.innerHTML = contenido;
    return card;
}
//cargar generos
function cargarGeneros(){
    opcionesGenero.add('female');
    opcionesGenero.add('male');
}
//cargar presentadores DID
// function cargarPresentadoresAlFormulario(){
//     const selectorPresentador = document.getElementById('presentador_id');
//     selectorPresentador.innerHTML = '';
//     presentadores.forEach((presentador, index) => {
//         if(index == 0) cargarPreviewPresentador(presentador.image_url);
//         const presentadorOpcion = document.createElement('option');
//         presentadorOpcion.value = presentador.id;
//         presentadorOpcion.innerHTML = presentador.presenter_id;

//         selectorPresentador.appendChild(presentadorOpcion);
//     });

//     selectorPresentador.addEventListener('change', (event) => {
//         const presentadorId = selectorPresentador.value;
//         presentadores.forEach(element => {
//             if(element.id == presentadorId) cargarPreviewPresentador(element.image_url);
//         });
//     })
// }
function cargarPreviewPresentador(url){
    if(!url) url = document.getElementById('presentador_url').value;
    const imgPreviewPresentador = document.getElementById('img-preview-presentador');
    const urlPresetador = document.getElementById('presentador_url').value;
    if(urlPresetador.length != 0) imgPreviewPresentador.src = url;
    else imgPreviewPresentador.src = urlPresetador;
}

const inputUrlPresentador = document.getElementById('presentador_url');
inputUrlPresentador.addEventListener('input', event => {
    cargarPreviewPresentador(inputUrlPresentador.value);
});



// function inicializarUrlPresentador(){
//     const selectorPresetadorId = document.getElementById('presentador_id');
//     const url = inputUrlPresentador.value;
//     if(url.length == 0) selectorPresetadorId.disabled = false;
//     else selectorPresetadorId.disabled = true;
// }

//cargar voces disponibles
function cargarOpcionesLenguaje(){
    voces.forEach(voz => {
        opcionesLenguaje.add(voz.language);
    });
    console.log(opcionesLenguaje);
}
function cargarOpcionesDeVozAlFormulario(){
    const lenguajeSelector = document.getElementById('lenguajeSelector');
    const generoSelector = document.getElementById('generoSelector');
    

    opcionesLenguaje.forEach(opcion => {
        const opcionItem = document.createElement('option');
        opcionItem.value = opcion;
        opcionItem.innerHTML = opcion;
        lenguajeSelector.appendChild(opcionItem);
    });

    opcionesGenero.forEach( genero => {
        const generoItem = document.createElement('option');
        generoItem.value = genero;
        generoItem.innerHTML = genero;
        generoSelector.appendChild(generoItem);
    })
    lenguajeSelector.addEventListener('change', event =>{
        cargarOpcionesDeVocez();    
    })
    generoSelector.addEventListener('change', event =>{
        cargarOpcionesDeVocez();    
    })
    cargarOpcionesDeVocez();
}
function cargarOpcionesDeVocez(){
    const lenguaje = document.getElementById('lenguajeSelector').value;
    const genero = document.getElementById('generoSelector').value;
    const vozSelector = document.getElementById('vozSelector');

    vozSelector.innerHTML = '';
    let vocesFiltradas = voces.filter( voz => {
        return (voz.language == lenguaje && voz.gender == genero)
    });
    console.log(vocesFiltradas);
    vocesFiltradas.forEach( voz => {
        const vozItem = document.createElement('option');
        vozItem.value = voz.id;
        vozItem.innerHTML = voz.name;
        vozSelector.appendChild(vozItem);
    })
}
// mostrar y cerrar formulario
const btnCrearConfiguracion = document.getElementById('btn-crear-configuracion');
btnCrearConfiguracion.addEventListener( 'click', (event) => {
    const formContainerCrearConfiguracion = document.getElementById('form-container-crear-configuracion');
    formContainerCrearConfiguracion.style.display = 'flex';
});
const btnFormCerrar = document.getElementById('form-btn-crear-configuracion-cancelar');
btnFormCerrar.addEventListener('click', (event) => {
    const formContainerCrearConfiguracion = document.getElementById('form-container-crear-configuracion');
    formContainerCrearConfiguracion.style.display = 'none';
});

// crear configuracion
const formCrearPrograma = document.getElementById('form_create_presentador');
formCrearPrograma.addEventListener('submit', async (event)=>{
    event.preventDefault();
    console.log("intentando subir el formulario");
    const response = await ConfiguracionPresentadorService.create(event.currentTarget);
    if(response) routes.goToRoute(routes.PRESENTADORES, null);
})