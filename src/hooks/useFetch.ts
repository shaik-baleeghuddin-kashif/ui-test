import axios from 'axios';
import { BASE_URL } from '../services/api';
import { FetchOptions } from '../types/Types';


export const useFetch = async (endpoint: string, options?: FetchOptions) => {
    try {
        const { filter, orderBy, pageSize, offset } = options || {};

        // Construct the filter query
        const filterQuery = filter
            ? 'filter=' +
              Object.entries(filter)
                  .map(([key, value]) => `${key}==${value}`)
                  .join('&&')
            : '';

        // Construct the orderBy query (combine with commas)
        const orderByQuery = orderBy
            ? 'orderBy=' + orderBy.map(item => encodeURIComponent(item)).join(',')
            : '';

        // Construct the additional parameters
        const additionalParams = [
            pageSize ? `pagesize=${pageSize}` : '',
            offset ? `offset=${offset}` : '',
        ]
            .filter(param => param)
            .join('&&');

        // Combine all parameters
        const queryParams = [filterQuery, orderByQuery, additionalParams]
            .filter(param => param)
            .join('&&');

        let query = `${BASE_URL}/${endpoint}`;
        if (queryParams) {
            query += `?${queryParams}`;
        }
        console.log(query);

        const response = await axios.get(query);
        return response
    } catch (error) {
        console.log(`Error fetching ${endpoint}`, error);
        throw new Error(`Failed to fetch ${endpoint}`);
    }
};
