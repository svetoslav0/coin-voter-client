import jwt_decode from 'jwt-decode';

import { CONFIG } from './config';
import { getItemFromLocalStorage } from '../services/helpers/utils';

export const isCurrentUserAdmin = () => {
    const token = getItemFromLocalStorage('token');
    const role = +(jwt_decode(token).role_id);

    return role === CONFIG.COMMON.ADMIN_ROLE_ID;
}
