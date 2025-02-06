let host_link = import.meta.env.VITE_HOST_API

export const getData = async ({endpoint}) => {
    try {
        const reponse = await fetch(`${host_link}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return reponse.json();
    } catch (error) {
        console.log(error)
    }
}

export const getDataByCodes = async ({endpoint, data}) => {
    console.log(data)
    try {
        const response = await fetch(`${host_link}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response.json();
    } catch (error) {
        console.log(error)
    }
}