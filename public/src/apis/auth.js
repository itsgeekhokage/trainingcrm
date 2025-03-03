import { toast } from "react-toastify";

let host_link = import.meta.env.VITE_HOST_API;

export const authApi = async (endpoint, data) => {
    const response = await fetch(`${host_link}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log("message")
    if (!response.ok) {
        console.log("message")
        const resp = await response.json();
        if (resp?.message) {
            toast?.error(resp.message);
        } else {
            toast.error("Server Error");
        }
        throw new Error('Network response was not ok');
    }
    return response.json();
}
