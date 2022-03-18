import { sendGetRequest, sendPostRequest, sendDeleteRequest } from './helpers/request';

export const getCoinById = async id => {
    const url = `/coins/${id}`;
    return await sendGetRequest(url, null, true);
};

export const searchCoins = async (is_approved, dateAdded = null, category = null, offset = 0, limit = null) => {
    const url = '/coins';
    const params = {
        order: 'total_votes',
        is_approved
    };

    if (dateAdded) {
        params.date_added = dateAdded;
    }

    if (category) {
        params.category = category;
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
    const url = '/coins';

    const params = {
        offset,
        is_promoted: true,
        is_approved: true,
        order: 'date_promoted:desc'
    };

    if (limit) {
        params.limit = limit;
    }

    return await sendGetRequest(url, params, true);
};

export const getUnapprovedCoinsCount = async () => {
    // TODO: This method is deprecated. Migrate to GET /coin method
    const url = `/coins/unapprovedCount`;

    const response = await sendGetRequest(url, null, true);
    return response.count;
};

export const vote = async id => {
    const url = `/votes/${id}`;

    return await sendPostRequest(url, null, true);
};

export const removeVote = async id => {
    const url = `/votes/${id}`;

    return await sendDeleteRequest(url, null, true);
}

export const addCoin = async coin => {
    const url = '/coins';
    const params = { ...coin };

    await sendPostRequest(url, params, true);
};

export const keywordSearch = async keyword => {
    const url = '/coins/keywordSearch';
    const params = { keyword };

    return await sendGetRequest(url, params);
};
