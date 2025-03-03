import { toast } from "react-toastify";

let host_link = import.meta.env.VITE_HOST_API;

export const testPostApi = async (endpoint, data) => {
    const response = await fetch(`${host_link}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

export const testGetApi = async (endpoint, mobile_number) => {
    const response = await fetch(`${host_link}/${endpoint}/${mobile_number}`);
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

export const getTestByMobileNumberAndHeaderCode = async (endpoint, mobile_number, header_code) => {
    const response = await fetch(`${host_link}/${endpoint}/${mobile_number}/${header_code}`);
    if (!response.ok) {
        const message = await response.json().message;
        if (message) {
            toast.error(message);
        } else {
            toast.error("Server Error");
        }
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.result;
}