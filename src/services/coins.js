import { handleResponse } from './auth';

export const getApprovedCoins = async () => {
    const tokenObject = JSON.parse(localStorage.getItem('token'));
    let token = null;
    if (tokenObject) {
        token = tokenObject.token;
    }

    let url = 'http://localhost:8090/coins?order=votes&approved=true';
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

export const addCoin = async coin => {
    const formBody = [];

    for (const property in coin) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(coin[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    const body = formBody.join("&");

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body
    };

    const tokenObject = JSON.parse(localStorage.getItem('token'));
    let token = null;
    if (tokenObject) {
        token = tokenObject.token;
    }

    return fetch(`http://localhost:8090/coins?token=${token}`, options)
        .then(r => r.text())
        .then(result => {
            const data = result && JSON.parse(result);
            if (!result.ok) {
                return Promise.reject(data);
            }

            return data;
        });
}

