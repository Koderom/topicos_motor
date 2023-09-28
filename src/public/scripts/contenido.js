const contenido = {}

contenido.adicionarEscena = (escena) => {
    const guion = document.getElementById('messages-container');
    const messageItem = document.createElement('div');
    let tipo = '';
    if(escena.tipo == 'A') tipo = '#Musica:';
    else if(escena.tipo == 'I') tipo = '#Avatar';
    messageItem.className = 'message';
    messageItem.innerHTML = `<b>${tipo}</b> ${escena.descripcion}`;
    guion.appendChild(messageItem);

    if(escena.archivo) contenido.adicionarArchivo(escena.archivo);
};

contenido.adicionarArchivo = (archivo) => {
    const escena_container = document.getElementById('escenas-container');
    const escenaItem = document.createElement('div');
    escenaItem.className = 'escena';
    escenaItem.innerHTML = `
        <img src="${archivo.url_portada}" class="escena-image"/>
    `;
    escenaItem.addEventListener('click', (event) => {
        console.log(`${archivo.nombre}.${archivo.tipo}`);
    });
    escena_container.appendChild(escenaItem);
}

contenido.mostrarNotificacion = (textoNoticacion) => {
    const contenedor = document.getElementById('notificacion-container');
    const contenerdor_message = document.getElementById('notificacion-text-container');
    const message = document.getElementById('notificacion');

    message.innerHTML = textoNoticacion;
    contenedor.style.display = 'flex';

    contenerdor_message.addEventListener('click',(event)=>{
        contenedor.style.display = 'none';
    });
}

contenido.cargarDatosVista = (mGuion) => {
    const escena_container = document.getElementById('escenas-container');
    const guion = document.getElementById('messages-container');
    escena_container.innerHTML = "";
    guion.innerHTML = "";
    const escenas = mGuion.escenas;
    for(let escena of escenas) contenido.adicionarEscena(escena);
};
export {contenido};