import axios from 'axios';

export const apiFunctions = () => {


    const apiGet = async (url, authToken) => {
        // setLoading(true);
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            // setLoading(false);
        }
    };

    const apiPost = async (url, payload, authToken) => {
        // setLoading(true);
        try {
            const response = await axios.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            // setLoading(false);
        }
    };

    const apiDelete = async (url, authToken) => {
        // setLoading(true);
        try {
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            // setLoading(false);
        }
    };

    

    return { apiGet, apiPost, apiDelete};
};