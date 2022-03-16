import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { isCurrentUserAdmin } from '../common/authUtils';
import { getItemFromLocalStorage } from '../services/helpers/utils';

import { Login } from './user/Login';
import { Home } from './coin/Home';
import { AddCoin } from './coin/AddCoin';
import { Requests } from './coin/Requests';
import { Details } from './coin/Details';
import { Dashboard } from './dashboard/Dashboard';
import { Categories } from './categories/Categories';

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
            if(isCurrentUserAdmin()) {
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

            <Route path='/categories/:id'>
                <Categories />
            </Route>

            <Route path='/dashboard'>
                {
                    tryToAuthorizeAdminAndRedirect(<Dashboard />)
                }
            </Route>

            <Route path='/'>
                <Home ref={props.childRef} />
            </Route>
        </Switch>
    );
};
