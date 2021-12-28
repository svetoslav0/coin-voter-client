import {
    buildQueryParams,
    buildBodyParams,
    handleResponse,
    getItemFromLocalStorage
} from './utils';

const domain = 'http://localhost:8090';

/**
 * @param {string} url
 * @param {Object} queryParams
 * @param {boolean} includeToken
 * @returns {Promise<*>}
 */
export const sendGetRequest = async (url, queryParams, includeToken = false) => {
    queryParams = Object.assign({}, queryParams);

    if (includeToken) {
        const token = getItemFromLocalStorage('token');
        if (token) {
            queryParams.token = token;
        }
    }

    const params = buildQueryParams(queryParams);
    if (params) {
        url += `?${params}`;
    }

    const response = await fetch(domain + url);
    return await handleResponse(response)
}

/**
 * @param {string} url
 * @param {Object} bodyParams
 * @param {boolean} includeToken
 * @returns {Promise<*>}
 */
export const sendPostRequest = async (url, bodyParams, includeToken = false) => {
    const body = buildBodyParams(bodyParams);

    if (includeToken) {
        const token = getItemFromLocalStorage('token');
        if (token) {
            url += `?token=${token}`;
        }
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body
    }
    const response = await fetch(domain + url, options);
    return await handleResponse(response);
};
