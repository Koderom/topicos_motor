import { routes } from "../../../global/routes.js";

class ReproducirContenidoTask {
    constructor() {
        this.observadores = [];

        this.contenidoLoaded = [];
        this.reproductorContainer = null;
        this.actualReproduciendo = -1;
    }
    /*---------------------------------- */
    async start(){
        this.reproductorContainer = document.getElementById('contenido_reproductor_container');
        document.getElementById('control_siguiente_btn').addEventListener('click', (event) => { this.#reproducirSiguiente() })
        document.getElementById('control_anterior_btn').addEventListener('click', (event) => { this.#reproducirAnterior() })
        this.#reproducirSiguiente();
    }

    #reproducirSiguiente() {
        this.actualReproduciendo++;
        console.log("repSig : " + this.actualReproduciendo);
        this.#reproducirContenido(this.actualReproduciendo);
    }
    #reproducirAnterior() {
        this.actualReproduciendo--;
        this.#reproducirContenido(this.actualReproduciendo);
    }

    #reproducirContenido(index) {
        if (this.contenidoLoaded.length != 0 && index >= 0 && index < this.contenidoLoaded.length) {
            this.actualReproduciendo = index;
            const contenido = this.contenidoLoaded[index];
            this.#reproducirComponente(contenido);
        } else {
            this.notificar('onReproduccionEnded', "Finalizo la reproduccion");
            // console.log("verificando lista de reproduccion")
            // setTimeout(reproducirContenido, 200);
        }
    }

    #reproducirComponente(contenido) {
        console.log("reproduciendo escena :" + this.actualReproduciendo)
        console.log(contenido)
        switch (contenido.tipo) {
            case 'V': contenido = this.#reproducirEscenaVideo(contenido.reproductor); break;
            case 'A': contenido = this.#reproducirEscenaAudio(contenido.reproductor); break;
            case 'I': contenido = this.#reproducirEscenaImagen(contenido.reproductor, contenido.duracion); break;
        }
    }

    #reproducirEscenaVideo(contenido) {
        let siguiente = this.actualReproduciendo + 1;
        if (this.reproductorContainer) {
            this.reproductorContainer.innerHTML = '';
            contenido.currentTime = 0;
            contenido.play();
            contenido.addEventListener('ended', (event) => { this.#reproducirContenido(siguiente) });
            this.reproductorContainer.appendChild(contenido);
        }

    }

    #reproducirEscenaAudio(contenido) {
        let siguiente = this.actualReproduciendo + 1;
        if (this.reproductorContainer) {
            this.reproductorContainer.innerHTML = '';
            contenido.currentTime = 0;
            contenido.play();
            contenido.addEventListener('ended', (event) => { this.#reproducirContenido(siguiente) });
            this.reproductorContainer.appendChild(contenido);
        }

    }

    #reproducirEscenaImagen(contenido, duracion) {
        let siguiente = this.actualReproduciendo + 1;
        if (this.reproductorContainer) {
            let isPaused = false;
            this.reproductorContainer.innerHTML = '';

            let tiempoFaltante = duracion;
            let timerId = setInterval(() => {
                if (tiempoFaltante == 0) {
                    clearInterval(timerId);
                    this.#reproducirContenido(siguiente);
                } else if (!isPaused) {
                    console.log(tiempoFaltante)
                    tiempoFaltante--;
                }
            }, 1000);
            contenido.addEventListener('click', () => { isPaused = !isPaused })
            this.reproductorContainer.appendChild(contenido);
        }
    }

    #onContenidoCargado(data){
        console.log('contenido cargado');
        this.contenidoLoaded.push(data);
    }

    #onSaludoAdded(data){
        console.log('saludo añadido');
        this.contenidoLoaded.splice(this.actualReproduciendo + 1, 0, data);
    }
    #onPeticionAdded(data){
        console.log('peticion añadida');
        this.contenidoLoaded.splice(this.actualReproduciendo + 1, 0, data.presentacion);
        this.contenidoLoaded.splice(this.actualReproduciendo + 2, 0, data.musica);
    }
    /*---------------------------------- */
    agregarObservador(observador) {
        this.observadores.push(observador);
    }
    eliminarObservador(observador) {
        this.observadores = this.observadores.filter(obs => obs !== observador);
    }
    notificar(evento, datos) {
        this.observadores.forEach(observador => observador.actualizar(evento, datos));
    }
    /*------------------------------------- */
    actualizar(event, data) {
        switch(event){
            case 'onContenidoCargado': this.#onContenidoCargado(data); break;
            case 'onSaludoAdded': this.#onSaludoAdded(data); break;
        }
    }
}

export default ReproducirContenidoTask;