import {socket} from '../../scripts/socket.js';
import Guion from '../../models/Guion.js';
import Video from '../../models/Video.js';
import Audio from '../../models/Audio.js';
import Imagen from '../../models/Imagen.js';
import Interaccion from '../../models/Interaccion.js';
import { contenido } from '../../scripts/contenido.js';
import { GuionService } from '../../services/GuionService.js';
import { EscenaService } from '../../services/EscenaService.js';
import { routes } from '../../global/routes.js';

const urlParams = new URLSearchParams(window.location.search);
const idGuion = urlParams.get('idGuion');
let idProgramacion = urlParams.get('idProgramacion');

let mGuion = new Guion();
//const mGuion = new Guion(1, 'Guion de prueba');

const ws = new WebSocket('ws://localhost:3035');
ws.addEventListener('open', socket.open);
ws.addEventListener('message', socket.message);
ws.addEventListener('close', socket.close);
ws.addEventListener('error', socket.error); 

window.addEventListener('load', async () => {
    await cargarData();
});

const escenasContainer  = document.getElementById('messages-container');
Sortable.create(escenasContainer, {
    onEnd: (evt => modificarOrdenEscena( evt.oldIndex, evt.newIndex)),
    
});

function modificarOrdenEscena( oldIndex, newIndex){
    try {
        console.log(`old: ${oldIndex} , new : ${newIndex}`);
        const movedEscena = mGuion.escenas.splice(oldIndex, 1);
        mGuion.escenas.splice(newIndex, 0, movedEscena[0]);
        actualizarIndices();
        actualizarInterfaz();
        console.log(mGuion.escenas)
    } catch (error) {
        throw error;
    }
}
function actualizarIndices(){
    let indice = 1;
    const escenas = mGuion.escenas;
    console.log(escenas)
    for(let item of escenas){
        if(item.indice == indice){
            indice++;
            continue;
        } 
        if(item.borrar) continue;
        item.indice = indice;
        if(item.estado != 'C') item.estado = 'U';
        indice++;
    }
    // for(let i = 0; i < mGuion.escenas.length; i++){
    //     let escena = mGuion.escenas[i];
    //     if(escena.indice == i + 1) continue;
    //     escena.indice = i + 1;
    //     if(escena.estado != 'C') escena.estado = 'U'; 
    // }
}
function actualizarInterfaz(){
    contenido.limpiar();
    const escenas = mGuion.escenas;
    escenas.forEach( escena => {
        if(!escena.borrar){
            contenido.adicionarEscena(escena);
            contenido.adicionarArchivo(escena);
        }
    });
}

async function cargarData(){
    contenido.limpiar();
    contenido.mostrarNotificacion("Cargando datos ...");
    mGuion = await GuionService.getData(idGuion);
    console.log(mGuion);
    const escenas = mGuion.escenas;
    escenas.forEach( escena => {
        contenido.adicionarEscena(escena);
        contenido.adicionarArchivo(escena);
    });
    mGuion.escenas = escenas;
    contenido.mostrarNotificacion("Datos cargados");
}

const btnAgregarEscena = document.getElementById('btn_agregar_escena');
btnAgregarEscena.addEventListener( 'click' , (event) => {
    const tipoEsenaIndex = document.getElementById('tipo_escena_selector').value;
    mostrarFormulario(tipoEsenaIndex);
})

function mostrarFormulario(tipoEsenaIndex){
    tipoEsenaIndex = Number(tipoEsenaIndex);
    let conteinerForm = null;
    switch (tipoEsenaIndex) {
        case 1: conteinerForm = document.getElementById('container-form-interaccion'); break;
        case 2: conteinerForm = document.getElementById('container-form-audio'); break;
        case 3: conteinerForm = document.getElementById('container-form-video'); break;
        case 4: conteinerForm = document.getElementById('container-form-imagen'); break;
    }
    if(conteinerForm != null) conteinerForm.style.display = 'flex';
}

// Formulario manejar adicion de video
const formularioVideo = document.getElementById('form-video');
formularioVideo.addEventListener('submit', (event) => {
    event.preventDefault();
    const indice = getIndice();
    const contexto = document.querySelector(`#form-video textarea[name='video-contexto']`).value;
    const titulo = document.querySelector(`#form-video input[name='video-titulo']`).value;
    const autor = document.querySelector(`#form-video input[name='video-autor']`).value;
    const formData = event.currentTarget;
    
    const mVideo = new Video(null, indice, contexto, titulo, autor, mGuion.id);
    mVideo.formulario = formData;
    mGuion.addEscena(mVideo);
    contenido.adicionarEscena(mVideo);
    console.log(mGuion);
    const container = document.getElementById('container-form-video');
    container.style.display = 'none';
})
//boton cancelar video
const formBtnVideoCancelar = document.getElementById('form-btn-video-cancelar');
formBtnVideoCancelar.addEventListener('click', (event) => {
    const container = document.getElementById('container-form-video');
    container.style.display = 'none'
})

// Formulario manejar adicion de audio
const formularioAudio = document.getElementById('form-audio');
formularioAudio.addEventListener('submit', (event) => {
    event.preventDefault();
    const container = document.getElementById('container-form-audio');
    const id = null;
    const guion_id = mGuion.id;
    //const indice = mGuion.escenas.length + 1;
    const indice = getIndice();
    const contexto = document.querySelector(`#form-audio textarea[name='audio-contexto']`).value;
    const titulo = document.querySelector(`#form-audio input[name='audio-titulo']`).value;
    const autor = document.querySelector(`#form-audio input[name='audio-autor']`).value;
    const genero = document.querySelector(`#form-audio input[name='audio-genero']`).value;
    const formData = event.currentTarget;
    const mAudio = new Audio(id, indice, titulo, contexto, autor, genero, guion_id);
    mAudio.formulario = formData;
    console.log(mGuion)
    mGuion.addEscena(mAudio);
    // AudioService.create(mAudio);
    contenido.adicionarEscena(mAudio);
    container.style.display = 'none';
})
//boton cancelar video
const formBtnAudioCancelar = document.getElementById('form-btn-audio-cancelar');
formBtnAudioCancelar.addEventListener('click', (event) => {
    const container = document.getElementById('container-form-audio');
    container.style.display = 'none'
})

// Formulario manejar adicion de imagen
const formularioImagen = document.getElementById('form-imagen');
formularioImagen.addEventListener('submit', (event) => {
    event.preventDefault();
    const container = document.getElementById('container-form-imagen');
    const id = null;
    const guion_id = mGuion.id;
    //const indice = mGuion.escenas.length + 1;
    const indice = getIndice();
    const contexto = document.querySelector(`#form-imagen textarea[name='imagen-contexto']`).value;
    const descripcion = document.querySelector(`#form-imagen textarea[name='imagen-descripcion']`).value;
    const duracion = document.querySelector(`#form-imagen input[name='imagen-duracion']`).value;
    const formData = event.currentTarget;
    const mImagen = new Imagen(id, indice, contexto, descripcion, duracion , guion_id);
    mImagen.formulario = formData;
    mGuion.addEscena(mImagen);
    console.log(mGuion.escenas);
    contenido.adicionarEscena(mImagen);
    container.style.display = 'none';
})
//boton cancelar imagen
const formBtnImagenCancelar = document.getElementById('form-btn-imagen-cancelar');
formBtnImagenCancelar.addEventListener('click', (event) => {
    const container = document.getElementById('container-form-imagen');
    container.style.display = 'none'
})

// Formulario manejar adicion de interaccion
const formularioInteraccion = document.getElementById('form-interaccion');
formularioInteraccion.addEventListener('submit', (event) => {
    event.preventDefault();
    const container = document.getElementById('container-form-interaccion');
    const id = null;
    const guion_id = mGuion.id;
    //const indice = mGuion.escenas.length + 1;
    const indice = getIndice();
    const contexto = document.querySelector(`#form-interaccion textarea[name='interaccion-contexto']`).value;
    const texto = document.querySelector(`#form-interaccion textarea[name='interaccion-texto']`).value;
    const idioma = document.querySelector(`#form-interaccion input[name='interaccion-idioma']`).value;
    const formData = event.currentTarget;
    const mInteraccion = new Interaccion(id, indice, contexto, idioma , texto, guion_id, null);
    mInteraccion.formulario = formData;
    mGuion.addEscena(mInteraccion);
    //InteraccionService.create(mInteraccion);
    contenido.adicionarEscena(mInteraccion);
    container.style.display = 'none';
})
//boton cancelar interaccion
const formBtnInteraccionCancelar = document.getElementById('form-btn-interaccion-cancelar');
formBtnInteraccionCancelar.addEventListener('click', (event) => {
    const container = document.getElementById('container-form-interaccion');
    container.style.display = 'none'
})

// boton generar
const btnGenerar = document.getElementById('btn-generar');
btnGenerar.addEventListener('click', async (event) => {
    console.log(mGuion.escenas)
    await eliminarEscenasServidor();
    await actualizarEscenas();
    await Guion.generarContenidoFromList(mGuion.escenas);
    await cargarData();
});

async function actualizarEscenas(){
    const escenas = mGuion.escenas.filter( item => item.estado == 'U');
    await Promise.all(
        escenas.map( async escena => {
            await EscenaService.update(escena);
        })
    );
}
async function eliminarEscenasServidor(){
    try {
        await Promise.all(
            mGuion.escenas.forEach( async (escena) => {
                    if(escena.borrar) await EscenaService.delete(escena.id);
                })
            );  
    } catch (error) {
        
    }
    
}
function eliminarEscena(escena_indice) {
    let index = null;
    mGuion.escenas.forEach( (escena, i) => {
        if(escena.indice == escena_indice) index = i;
    })
    if(mGuion.escenas[index].id){
        contenido.borrarEscenaItem(escena_indice);
        console.log(mGuion);
        mGuion.escenas[index].borrar = true;
    }else{
        mGuion.escenas.splice(index,1);
        contenido.borrarEscenaItem(escena_indice);
    }
    actualizarIndices();
    actualizarInterfaz();
    console.log(mGuion);
}

function getIndice(){
    let may = mGuion.escenas.length;
    mGuion.escenas.forEach( (escena) => {
        if(may < escena.indice) may = escena.indice;
    });
    return may+1;
}
const refreshFilesButton = document.getElementById('refresh-files-button');
refreshFilesButton.addEventListener('click', (event) => {
    location.reload();
});

document.getElementById('btn_salir').addEventListener('click', onPressedBtnSalir);
function onPressedBtnSalir(env){
    const idPrograma = localStorage.getItem("state_programa");
    if(idPrograma){
        routes.goToRoute(routes.PROGRAMACIONES, {idPrograma});
    }else{
        routes.goToRoute(routes.PROGRAMAS, null);
    }
}

export {mGuion,eliminarEscena}