const GuionService = {};
const authToken = localStorage.getItem('authToken');

GuionService.getData = async (guion_id) => {
    try {
        let response = await fetch(`http://localhost:3035/api/guion?guion_id=${guion_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        let data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}
GuionService.getProgramacion = async (guion_id) => {
    try {
        
        let response = await fetch(`http://localhost:3035/api/guion/programacion?idGuion=${guion_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        let data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export {GuionService}