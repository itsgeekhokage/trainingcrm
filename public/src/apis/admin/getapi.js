let host_link = import.meta.env.VITE_HOST_API;

export const getApi = async (endpoint) => {
    const response = await fetch(`${host_link}/${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}