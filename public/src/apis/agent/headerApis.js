import { toast } from "react-toastify";

let host_link = import.meta.env.VITE_HOST_API;

export const updateHeaderVideoConfirmation = async ({header_code, mobile_number}) => {
    console.log(header_code)
    const response = await fetch(`${host_link}/headers/video-confirmation/${mobile_number}/${header_code}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const message = await response.json().message;
        if (message) {
            toast.error(message);
        } else {
            toast.error("Server Error");
        }
        throw new Error('Network response was not ok');
    }
    else
    return response.json();
}

export const updatePdfConfirmation = async ({header_code, mobile_number}) => {
    const response = await fetch(`${host_link}/headers/pdf-confirmation/${mobile_number}/${header_code}`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
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
}


export const inactivateHeader = async ({header_code}) => {
    const response = await fetch(`${host_link}/headers/inactivate/${header_code}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
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
}