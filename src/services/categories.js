import { sendGetRequest } from './helpers/request';

export const getAllCategories = async () => {
    const url = '/categories';

    return await sendGetRequest(url, null);
};
