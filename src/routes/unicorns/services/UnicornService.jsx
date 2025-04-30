import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/unicorns';

export const getAllUnicorn = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener la lista de unicornios');
    }
};

export const getUnicornByIdService = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener el unicornio por ID');
    }
};

export const createUnicorn = async (unicorn) => {
    try {
        console.log(unicorn);
        const response = await axios.post(API_URL, unicorn, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al crear el unicornio');
    }
};

export const updateUnicorn = async (id, unicorn) => {
    try {
        console.log(unicorn);
        const response = await axios.put(`${API_URL}/${id}`, unicorn, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar el unicornio');
    }
};

export const deleteUnicorn = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        throw new Error('Error al eliminar el unicornio');
    }
};
