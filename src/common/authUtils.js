import jwt_decode from 'jwt-decode';

import { CONFIG } from './config';
import { getItemFromLocalStorage } from '../services/helpers/utils';

export const isCurrentUserAdmin = () => {
    const token = getItemFromLocalStorage('token');
    if (!token) {
        return false;
    }

    const role = +(jwt_decode(token).role_id);

    return role === CONFIG.COMMON.ADMIN_ROLE_ID;
}
