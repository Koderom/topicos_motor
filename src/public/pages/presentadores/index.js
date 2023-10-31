import { ConfiguracionPresentadorService } from "../../services/ConfiguracionPresentadorService.js";
import { PresentadorService } from "../../services/PresentadorService.js";
import { VocesService } from "../../services/VocesService.js";

let presentadores = [];
let voces = [];
let opcionesGenero = new Set();
let opcionesLenguaje = new Set();

window.addEventListener('load', async (event) => {
    presentadores = await PresentadorService.getAll();
    voces = await VocesService.getAll();
    cargarPresentadoresAlFormulario();
    cargarOpcionesLenguaje();
    cargarGeneros();
    cargarOpcionesDeVozAlFormulario();
    inicializarUrlPresentador();
})
//cargar generos
function cargarGeneros(){
    opcionesGenero.add('female');
    opcionesGenero.add('male');
}
//cargar presentadores DID
function cargarPresentadoresAlFormulario(){
    const selectorPresentador = document.getElementById('presentador_id');
    selectorPresentador.innerHTML = '';
    presentadores.forEach((presentador, index) => {
        if(index == 0) cargarPreviewPresentador(presentador.image_url);
        const presentadorOpcion = document.createElement('option');
        presentadorOpcion.value = presentador.id;
        presentadorOpcion.innerHTML = presentador.presenter_id;

        selectorPresentador.appendChild(presentadorOpcion);
    });

    selectorPresentador.addEventListener('change', (event) => {
        const presentadorId = selectorPresentador.value;
        presentadores.forEach(element => {
            if(element.id == presentadorId) cargarPreviewPresentador(element.image_url);
        });
    })
}
function cargarPreviewPresentador(url){
    const imgPreviewPresentador = document.getElementById('img-preview-presentador');
    const urlPresetador = document.getElementById('presentador_url').value;
    if(urlPresetador.length == 0) imgPreviewPresentador.src = url;
    else imgPreviewPresentador.src = urlPresetador;
}

const inputUrlPresentador = document.getElementById('presentador_url');
inputUrlPresentador.addEventListener('input', event => {
    inicializarUrlPresentador();
    cargarPreviewPresentador(inputUrlPresentador.value);
});

function inicializarUrlPresentador(){
    const selectorPresetadorId = document.getElementById('presentador_id');
    const url = inputUrlPresentador.value;
    if(url.length == 0) selectorPresetadorId.disabled = false;
    else selectorPresetadorId.disabled = true;
}

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
const formCrearPrograma = document.getElementById('form-crear-configuracion');
formCrearPrograma.addEventListener('submit', (event)=>{
    event.preventDefault();
    console.log("intentando subir el formulario");
    ConfiguracionPresentadorService.create(event.currentTarget);
})