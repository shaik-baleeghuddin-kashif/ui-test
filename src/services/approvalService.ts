import { useFetch } from '../hooks/useFetch';
import { FetchOptions } from '../types/Types';



export const getApprovals = async (options?: FetchOptions) => {
    const response =  useFetch("approvals", options);

    if ((await response).data.code === 200) {
        return (await response).data.data;
    } else {
        throw new Error((await response).data.message);
    }
}
