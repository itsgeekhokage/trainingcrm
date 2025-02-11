let host_link = import.meta.env.VITE_HOST_API;
import { toast } from "react-toastify";

export const uploadAgentData = async (data, endpoint) => {
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
            console.log(message)
            toast.error(message);
        } else {
            toast.error("Server Error");
        }
        throw new Error('Network response was not ok');
    }
    return response.json();
}