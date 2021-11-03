import { handleResponse } from './auth';

export const getApprovedCoins = async () => {
    const token = JSON.parse(localStorage.getItem('token')).token;

    let url = 'http://localhost:8090/coins/approved?order=votes';
    if (token) {
        url += `&token=${token}`;
    }
    console.log(url);

    const response = await fetch(url);
    const data = await handleResponse(response);
    console.log(data);
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
