import { sendPostRequest } from './helpers/request';
import { setItemInLocalStorage } from './helpers/utils';

export const login = async (username, password) => {
    const params = { username, password };
    const result = await sendPostRequest('/users/login', params);

    setItemInLocalStorage('token', result.token);
};

export const googleLogin = async googleToken => {
    const params = {
        token: googleToken,
    };

    const result = await sendPostRequest('/users/googleLogin', params);

    setItemInLocalStorage('token', result.token);
};
