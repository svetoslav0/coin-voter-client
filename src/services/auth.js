import { sendPostRequest } from './helpers/request';
import { setItemInLocalStorage } from './helpers/utils';

export const login = async (username, password) => {
    const params = { username, password };
    const result = await sendPostRequest('/users/login', params);

    setItemInLocalStorage('token', result.token);
};
