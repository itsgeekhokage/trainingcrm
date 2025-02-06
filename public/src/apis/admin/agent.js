let host_link = import.meta.env.VITE_HOST_API;

export const uploadAgentData = async (data, endpoint) => {
    console.log("data", data, endpoint);
    const response = await fetch(`${host_link}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}