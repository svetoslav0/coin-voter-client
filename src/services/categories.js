import { sendDeleteRequest, sendGetRequest, sendPatchRequest, sendPostRequest } from './helpers/request';

export const getAllCategories = async () => {
    const url = '/categories';

    return await sendGetRequest(url, null);
};

export const addCategory = async (category) => {
    const url = `/categories`;

    return await sendPostRequest(url, { name: category.name }, true);
}

export const editCategory = async (category) => {
    const url = `/categories/${category.id}`;

    return await sendPatchRequest(url, { name: category.name }, true);
};

export const deleteCategory = async (id) => {
    const url = `/categories/${id}`;

    return await sendDeleteRequest(url, null, true);
}
