const AudioService = {};
const authToken = localStorage.getItem('authToken');

AudioService.create = async (audio) => {
    try {
        const formulario = new FormData(audio.formulario);
        formulario.append('audio-indice', audio.indice);
        formulario.append('audio-guion-id', audio.guion_id);
        const url = 'http://127.0.0.1:3035/api/audio/create';
        const options = {
            method: 'POST', body: formulario,
            headers: {
                "Authorization" : `Bearer ${authToken}`
            }
        };
        const response = await fetch(url, options);
        if(!response.ok) throw new Error("WARN", response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export {AudioService}