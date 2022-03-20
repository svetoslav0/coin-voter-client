import {
    buildQueryParams,
    buildBodyParams,
    handleResponse,
    getItemFromLocalStorage
} from './utils';
import { CONFIG } from '../../common/config';

/**
 * @param {string} url
 * @param {Object} queryParams
 * @param {boolean} tryToIncludeToken
 * @returns {Promise<*>}
 */
export const sendGetRequest = async (url, queryParams, tryToIncludeToken = false) => {
    queryParams = Object.assign({}, queryParams);

    if (tryToIncludeToken) {
        const token = getItemFromLocalStorage('token');
        if (token) {
            queryParams.token = token;
        }
    }

    const params = buildQueryParams(queryParams);
    if (params) {
        url += `?${params}`;
    }

    const response = await fetch(CONFIG.LOCAL.SERVER_URL + url);
    return await handleResponse(response)
}

/**
 * @param {string} url
 * @param {Object} bodyParams
 * @param {boolean} tryToIncludeToken
 * @returns {Promise<*>}
 */
export const sendPostRequest = async (url, bodyParams, tryToIncludeToken = false) => {
    const body = buildBodyParams(bodyParams);

    if (tryToIncludeToken) {
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
    const response = await fetch(CONFIG.LOCAL.SERVER_URL + url, options);
    return await handleResponse(response);
};

/**
 * @param {string} url
 * @param {Object} bodyParams
 * @param {boolean} tryToIncludeToken
 * @returns {Promise<*>}
 */
export const sendDeleteRequest = async (url, bodyParams, tryToIncludeToken = false) => {
    const body = buildBodyParams(bodyParams);

    if (tryToIncludeToken) {
        const token = getItemFromLocalStorage('token');
        if (token) {
            url += `?token=${token}`;
        }
    }

    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body
    }
    const response = await fetch(CONFIG.LOCAL.SERVER_URL + url, options);
    return await handleResponse(response);
};


/**
 * @param {string} url
 * @param {Object} bodyParams
 * @param {boolean} tryToIncludeToken
 * @returns {Promise<*>}
 */
export const sendPatchRequest = async (url, bodyParams, tryToIncludeToken = false) => {
    const body = buildBodyParams(bodyParams);

    if (tryToIncludeToken) {
        const token = getItemFromLocalStorage('token');
        if (token) {
            url += `?token=${token}`;
        }
    }

    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body
    }
    const response = await fetch(CONFIG.LOCAL.SERVER_URL + url, options);
    return await handleResponse(response);
};
