import {socket} from '../../scripts/socket.js';
import Guion from '../../models/Guion.js';
import Video from '../../models/Video.js';
import Audio from '../../models/Audio.js';
import Imagen from '../../models/Imagen.js';
import Interaccion from '../../models/Interaccion.js';
import { contenido } from '../../scripts/contenido.js';
import { GuionService } from '../../services/GuionService.js';
import { EscenaService } from '../../services/EscenaService.js';

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

// document.getElementById('btn-adicionar').addEventListener('click', (event) => {
//     const texto = document.getElementById('entrada-guion').value;
//     escenas = mEscenas.addEscena(escenas, texto);

//     contenido.adicionarEscena(escenas[escenas.length - 1]);
    
// });

// document.getElementById('btn-generar').addEventListener('click', async (event) => {
//     try {
//         escenas = await mEscenas.generarContenido(escenas);
//         console.log(escenas);
//         for(let escena of escenas) contenido.adicionarArchivo(escena.archivo);    
//     } catch (error) {
//         contenido.mostrarNotificacion(error.message);
//     }
// });

// document.getElementById('btn-guardar').addEventListener('click', async (event) => {
//     guion.escenas = escenas;
//     const id = await mGuion.guardar(guion);
//     if(id) guion.id = id;
    
//     guion = await mGuion.cargar(guion);
//     contenido.cargarDatosVista(guion);
// });



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

//boton generar video
// const btnGenerarVideo = document.getElementById('btn-generar-video');
// btnGenerarVideo.addEventListener('click', (event) => {
//     const container = document.getElementById('container-form-video');
//     container.style.display = 'flex'
// });

// Formulario manejar adicion de video
const formularioVideo = document.getElementById('form-video');
formularioVideo.addEventListener('submit', (event) => {
    event.preventDefault();
    const container = document.getElementById('container-form-video');
    const id = null;
    const guion_id = mGuion.id;
    //const indice = mGuion.escenas.length + 1;
    const indice = getIndice();
    const contexto = document.querySelector(`#form-video textarea[name='video-contexto']`).value;
    const titulo = document.querySelector(`#form-video input[name='video-titulo']`).value;
    const autor = document.querySelector(`#form-video input[name='video-autor']`).value;
    const formData = event.currentTarget;
    const mVideo = new Video(id, indice, contexto, titulo, autor, guion_id);
    mVideo.formulario = formData;
    mGuion.addEscena(mVideo);
    // VideoService.create(mVideo);
    contenido.adicionarEscena(mVideo);
    container.style.display = 'none';
})
//boton cancelar video
const formBtnVideoCancelar = document.getElementById('form-btn-video-cancelar');
formBtnVideoCancelar.addEventListener('click', (event) => {
    const container = document.getElementById('container-form-video');
    container.style.display = 'none'
})

// //boton generar audio
// const btnGenerarAudio = document.getElementById('btn-generar-audio');
// btnGenerarAudio.addEventListener('click', (event) => {
//     const container = document.getElementById('container-form-audio');
//     container.style.display = 'flex'
// });
// Formulario manejar adicion de video
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

// //boton generar imagen
// const btnGenerarImagen = document.getElementById('btn-generar-imagen');
// btnGenerarImagen.addEventListener('click', (event) => {
//     const container = document.getElementById('container-form-imagen');
//     container.style.display = 'flex'
// });
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
    const formData = event.currentTarget;
    const mImagen = new Imagen(id, indice, contexto, descripcion , guion_id);
    mImagen.formulario = formData;
    mGuion.addEscena(mImagen);
    // ImagenService.create(mImagen);
    contenido.adicionarEscena(mImagen);
    container.style.display = 'none';
})
//boton cancelar imagen
const formBtnImagenCancelar = document.getElementById('form-btn-imagen-cancelar');
formBtnImagenCancelar.addEventListener('click', (event) => {
    const container = document.getElementById('container-form-imagen');
    container.style.display = 'none'
})

// // boton generar interaccion
// const btnGenerarInteraccion = document.getElementById('btn-generar-interaccion');
// btnGenerarInteraccion.addEventListener('click', (event) => {
//     const container = document.getElementById('container-form-interaccion');
//     container.style.display = 'flex'
// });
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
    await eliminarEscenasServidor();
    await Guion.generarContenidoFromList(mGuion.escenas);
    await cargarData();
});

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
    console.log(mGuion);
}

function getIndice(){
    let may = mGuion.escenas.length;
    mGuion.escenas.forEach( (escena) => {
        if(may < escena.indice) may = escena.indice;
    });
    return may+1;
}
export {mGuion,eliminarEscena}

const refreshFilesButton = document.getElementById('refresh-files-button');
refreshFilesButton.addEventListener('click', (event) => {
    location.reload();
});

// boton volver
// let btnVolverClickState = false;
// const btnVolver = document.getElementById('btn-volver');
// btnVolver.addEventListener('click', async (event) => {
//     if(btnVolverClickState){
//         event.preventDefault();
//         return;
//     }
//     btnVolverClickState = true;
//     let programacion = await GuionService.getProgramacion(idGuion);
//     window.location.href = `http://localhost:3035/pages/programaciones/programaciones.html?idPrograma=${programacion.programa_id}`;
// });

// const videoRep = document.getElementById('my-video');
// const autoRepButton = document.getElementById('auto-rep');
// //videoRep.style.display = 'none';

// autoRepButton.addEventListener('click', () => {
//     //videoRep.autoplay = true;
//     videojs('my-video', {autoplay: true});
//     autoRepButton.disabled = true;
//     console.log("se preciono");
// })
// function addMessageToChat(message){
//     mostrarNotificacion("Nuevo mensaje recibido")
//     const chat = document.getElementById('messages-container');
//     const messageItem = document.createElement('div');
//     messageItem.className = 'message';
//     messageItem.innerHTML = `<b>+${message.from}(${message.profileName}) : </b> ${message.message}`;
//     chat.appendChild(messageItem);
// }

// function loadVideo(video){
//     const presenterImage = document.getElementById('presenter-image');
//     const videoContainer = document.getElementById('video-container');
//     videoRep.src = video.videoUrl;

//     videoRep.oncanplay = (event) => {
//         videoRep.style.display = 'block';
//         presenterImage.style.display = 'none';
//     }
    
//     videoRep.onended = () => {
//         presenterImage.style.display = 'block';
//         videoRep.style.display = 'none';
//     };
//     videoContainer.addEventListener('click', () => {
//         loadVideo(video);
//     });
// }



// async function onMusic(data){
//     try {
//         var myPlayer = videojs('my-video');

        

//         console.log("solicitando guardado de cancion");
//         const respuesta = await saveFileFromURL(data.url);
//         const filename = respuesta.filename;
//         const filetype = respuesta.filetype;
//         //console.log(`${filename}.${filetype}`);    
//         const path = `./storage/${filename}.${filetype}`;

//         myPlayer.src({type: 'audio/mpeg', src: `${path}`});

//         myPlayer.ready(function() {
//             myPlayer.play();
//             mostrarNotificacion(`Reproduciendo: ${data.title}`);
//         });

//         // videoRep.innerHTML = `<source src="${path}" type="audio/mpeg"/>`;
//         // console.log(videoRep);
//     } catch (error) {
//         console.log(error);
//         mostrarNotificacion(error.message);
//     }
    
// }
  

// function simularPeticion(musicName){
//     const url = 'http://127.0.0.1:3000/test';
//     const body = {music: 'in the end'};
//     axios.post(url, body);
// }
