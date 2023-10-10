const EscenaService = {};

EscenaService.delete = async (escena_id) => {
    try {
        const url = `http://127.0.0.1:3035/api/escena/delete?escena_id=${escena_id}`;
        const options = {method: 'GET',headers: {"Content-Type": "application/json"}};
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