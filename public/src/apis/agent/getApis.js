let host_link = import.meta.env.VITE_HOST_API
import { toast } from "react-toastify";

export const getData = async ({endpoint}) => {
    try {
        const reponse = await fetch(`${host_link}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!reponse.ok) {
                const message = await reponse.json().message;
                if (message) {
                    toast.error(message);
                } else {
                    toast.error("Server Error");
                }
                throw new Error('Network response was not ok');
            }
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
        if (!response.ok) {
                const message = await response.json().message;
                if (message) {
                    toast.error(message);
                } else {
                    toast.error("Server Error");
                }
                throw new Error('Network response was not ok');
            }
        return response.json();
    } catch (error) {
        console.log(error)
    }
}