import { sendGetRequest, sendPostRequest } from './helpers/request';

export const getCoinById = async id => {
    const url = `/coins/${id}`;
    return await sendGetRequest(url, null, true);
};

export const searchCoins = async (approved, dateAdded = null, offset = 0, limit = null) => {
    const url = '/coins';
    const params = {
        order: 'votes',
        approved
    };

    if (dateAdded) {
        params.date_added = dateAdded;
    }

    if (offset) {
        params.offset = offset;
    }

    if (limit) {
        params.limit = limit;
    }

    return await sendGetRequest(url, params, true);
};

export const getPromotedCoins = async (offset = 0, limit = null) => {
    const url = '/coins/promoted';

    const params = {
        offset
    };

    if (limit) {
        params.limit = limit;
    }

    return await sendGetRequest(url, params, true);
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
