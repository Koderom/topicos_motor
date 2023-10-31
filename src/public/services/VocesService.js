const VocesService = {};
const authToken = localStorage.getItem('authToken');

VocesService.getAll = async () => {
    try {
        let response = await fetch(`http://localhost:3035/api/voces/getAll`, {
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

export {VocesService}