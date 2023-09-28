import {socket} from './scripts/socket.js';
import {escenas as mEscenas} from './scripts/escenas.js';
import { contenido } from './scripts/contenido.js';
import { guion as mGuion} from './scripts/guion.js';

let escenas = [];
let guion = {id: 2};

// const ws = new WebSocket('ws://localhost:3035');
// ws.addEventListener('open', socket.open);
// ws.addEventListener('message', socket.message);
// ws.addEventListener('close', socket.close);
// ws.addEventListener('error', socket.error); 


// document.getElementById('btn-adicionar').addEventListener('click', (event) => {
//     const texto = document.getElementById('entrada-guion').value;
//     escenas = mEscenas.addEscena(escenas, texto);

//     contenido.adicionarEscena(escenas[escenas.length - 1]);
    
// });

document.getElementById('btn-generar').addEventListener('click', async (event) => {
    try {
        escenas = await mEscenas.generarContenido(escenas);
        console.log(escenas);
        for(let escena of escenas) contenido.adicionarArchivo(escena.archivo);    
    } catch (error) {
        contenido.mostrarNotificacion(error.message);
    }
});

document.getElementById('btn-guardar').addEventListener('click', async (event) => {
    guion.escenas = escenas;
    const id = await mGuion.guardar(guion);
    if(id) guion.id = id;
    
    guion = await mGuion.cargar(guion);
    contenido.cargarDatosVista(guion);
});

window.addEventListener('load', async () => {
    if(guion.id){
        guion = await mGuion.cargar(guion);
        contenido.cargarDatosVista(guion);
        contenido.mostrarNotificacion("Datos cargados exitosamente")
    }
});


/*Ventana modal */
const openModalBtn = document.getElementById('btn-avatar');
const modal = document.getElementById('myModal');
const closeModal = document.querySelector('.close');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(myForm);
    
    modal.style.display = 'none';
});













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
