import { sendGetRequest, sendPostRequest } from './helpers/request';

export const getCoinById = async id => {
    const url = `/coins/${id}`;
    return await sendGetRequest(url, null, true);
};

export const getCoins = async approved => {
    const url = '/coins';
    const params = {
        order: 'votes',
        approved
    };

    const result = await sendGetRequest(url, params, true);
    return result.coins;
};

export const getUnapprovedCoinsCount = async () => {
    const url = `/coins/unapprovedCount`;

    const response = await sendGetRequest(url, null, true);
    return response.count;
};

export const vote = async id => {
    const url = `/coins/vote/${id}`;

    return await sendPostRequest(url, null, true);
};

export const addCoin = async coin => {
    const url = '/coins';
    const params = { ...coin };

    await sendPostRequest(url, params, true);
};
