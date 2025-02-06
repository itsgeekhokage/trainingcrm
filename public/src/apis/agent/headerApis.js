let host_link = import.meta.env.VITE_HOST_API;

export const updateHeaderVideoConfirmation = async ({header_code}) => {
    console.log(header_code)
    const response = await fetch(`${host_link}/headers/video-confirmation/${header_code}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

export const updatePdfConfirmation = async ({header_code}) => {
    const response = await fetch(`${host_link}/headers/pdf-confirmation/${header_code}`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}


export const inactivateHeader = async ({header_code}) => {
    const response = await fetch(`${host_link}/headers/inactivate/${header_code}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}