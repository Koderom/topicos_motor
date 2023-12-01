const EscenaService = {};
const authToken = localStorage.getItem('authToken');

EscenaService.delete = async (escena_id) => {
    try {
        const url = `http://127.0.0.1:3035/api/escena/delete?escena_id=${escena_id}`;
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        };
        const response = await fetch(url, options);
        if(!response.ok) throw new Error("WARN", response.status);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
}

EscenaService.update = async (escena) => {
    try {
        const url = `http://127.0.0.1:3035/api/escena/update`;
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${authToken}`
            },
            body: JSON.stringify(escena)
        };
        const response = await fetch(url, options);
        if(!response.ok) throw new Error("WARN", response.status);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
}

export {EscenaService}