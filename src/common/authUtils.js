import jwt_decode from 'jwt-decode';

import { CONFIG } from './config';
import { getItemFromLocalStorage, removeItemFromLocalStorage } from '../services/helpers/utils';

export const isCurrentUserAdmin = () => {
    const token = getItemFromLocalStorage('token');
    if (!token) {
        return false;
    }

    let role = null;
    try {
        role = +(jwt_decode(token).role_id);
    } catch (e) {
        removeItemFromLocalStorage('token');
    }

    return role == CONFIG.COMMON.ADMIN_ROLE_ID;
}
