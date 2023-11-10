const EscenaComponent = {}

EscenaComponent.create = (object) => {
    const component = document.createElement('div');
    const escenaHeader = document.createElement('div');
    const escenaIndice = document.createElement('span');
    escenaIndice.innerHTML = `Escena # ${object.indice}`
    const escenaTipo = document.createElement('span');
    escenaTipo.innerHTML = object.tipo_escena;
    const escenaBody = document.createElement('div');
    const escenaContexto = document.createElement('p');
    escenaContexto.innerHTML = object.contexto;
    return component;
}

export default EscenaComponent;