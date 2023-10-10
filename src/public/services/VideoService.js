const VideoService = {};

VideoService.create = async (video) => {
    try {
        const formulario = new FormData(video.formulario);
        formulario.append('video-indice', video.indice);
        formulario.append('video-guion-id', video.guion_id);
        const url = 'http://127.0.0.1:3035/api/video/create';
        const options = {method: 'POST', body: formulario};
        const response = await fetch(url, options);
        if(!response.ok) throw new Error("WARN", response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export {VideoService}