import { useFetch } from '../hooks/useFetch';
import { FetchOptions } from '../types/Types';

export const getOffices = async (options?: FetchOptions) => {
    try {
        const response = await useFetch("offices", options); // Await once here

        // Check if the response is successful and return the data accordingly
        if (response.data.code === 200) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Failed to fetch data");
        }
    } catch (error) {
        console.error("Error fetching offices:", error);
        throw new Error("Failed to fetch offices");
    }
};
