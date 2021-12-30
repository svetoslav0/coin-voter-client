import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { CONFIG } from '../common/config';
import { getItemFromLocalStorage } from '../services/helpers/utils';

import { Login } from './user/Login';
import { Home } from './Home';
import { AddCoin } from './coin/AddCoin';
import { Requests } from './coin/Requests';
import { Details } from './coin/Details';

export const AppRoute = props => {
    const token = getItemFromLocalStorage('token');

    const tryToAuthenticateAndRedirect = (component, redirectLocation = '/') => {
        if (token) {
            return component;
        }

        return <Redirect to={redirectLocation} />
    };

    const tryToAuthorizeAdminAndRedirect = (
        component,
        redirectLocationIfUnauthorized = '/',
        redirectLocationIfNotAdmin = '/') =>
    {
        if (token) {
            const role = +(jwt_decode(token).role_id);
            if (role === CONFIG.COMMON.ADMIN_ROLE_ID) {
                return component;
            }

            return <Redirect to={redirectLocationIfUnauthorized} />
        }

        return <Redirect to={redirectLocationIfNotAdmin} />
    };

    return (
        <Switch>
            <Route path='/login'>
                <Login updateHeader={props.updateHeader} />
            </Route>

            <Route path='/addCoin'>
                {
                    tryToAuthenticateAndRedirect(<AddCoin />)
                }
            </Route>

            <Route path='/requests'>
                {
                    tryToAuthorizeAdminAndRedirect(<Requests />)
                }
            </Route>

            <Route path='/coin/:id'>
                <Details />
            </Route>

            <Route path='/'>
                <Home ref={props.childRef} />
            </Route>
        </Switch>
    );
};
