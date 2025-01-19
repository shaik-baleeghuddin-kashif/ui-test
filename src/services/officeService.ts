import { useFetch } from '../hooks/useFetch';
import { FetchOptions } from '../types/Types';



export const getOffices = async (options?: FetchOptions) => {
    const response =  useFetch("offices", options);

    if ((await response).data.code === 200) {
        return (await response).data.data;
    } else {
        throw new Error((await response).data.message);
    }
}
