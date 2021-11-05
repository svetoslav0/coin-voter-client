import { handleResponse } from './auth';

export const getApprovedCoins = async () => {
    const tokenObject = JSON.parse(localStorage.getItem('token'));
    let token = null;
    if (tokenObject) {
        token = tokenObject.token;
    }

    let url = 'http://localhost:8090/coins/approved?order=votes';
    if (token) {
        url += `&token=${token}`;
    }

    const response = await fetch(url);
    const data = await handleResponse(response);
    return data.coins;
};

export const vote = async id => {
    const token = JSON.parse(localStorage.getItem('token')).token;

    const url = `http://localhost:8090/coins/vote/${id}?token=${token}`;
    const options = {
        method: 'POST'
    };

    return fetch(url, options)
        .then(handleResponse);
};

export const getUnapprovedCoinsCount = async () => {
    const tokenObject = JSON.parse(localStorage.getItem('token'));
    let token = null;
    if (tokenObject) {
        token = tokenObject.token;
    }

    let url = `http://localhost:8090/coins/unapprovedCount?token=${token}`;

    const response = await fetch(url);
    const data = await handleResponse(response);
    return data.count;
};
