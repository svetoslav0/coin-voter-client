import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { AppRoute } from './components/AppRoute';
import { Nav } from './components/layout/Nav';
import { GuestHeader } from './components/layout/GuestHeader';
import { UserHeader } from './components/layout/UserHeader';
import { AdminHeader } from './components/layout/AdminHeader';
import { Footer } from './components/layout/Footer';

import { CONFIG } from './common/config';

import { getUnapprovedCoinsCount } from './services/coins';
import { getItemFromLocalStorage, removeItemFromLocalStorage } from './services/helpers/utils';

const App = () => {
    const childRef = useRef();
    const [unapprovedCoinsCount, setUnapprovedCoinsCount] = useState(0);
    const token = getItemFromLocalStorage('token');

    const guestHeaderComponent = <GuestHeader />;
    const userHeaderComponent = <UserHeader logout={logout} />;
    const adminHeaderComponent = <AdminHeader logout={logout} unapprovedCoinsCount={unapprovedCoinsCount} />

    const [header, setHeader] = useState(!token ? guestHeaderComponent : userHeaderComponent);

    useEffect(() => {
        updateHeader();
    }, [unapprovedCoinsCount]);

    const setUnapprovedCoins = async () => {
        const count = await getUnapprovedCoinsCount();
        setUnapprovedCoinsCount(count);
    }

    function logout() {
        removeItemFromLocalStorage('token');
        setHeader(guestHeaderComponent);
        childRef?.current?.getCoins();
    }

    async function updateHeader() {
        const token = getItemFromLocalStorage('token');
        if (!token) {
            return setHeader(guestHeaderComponent);
        }

        const decodedToken = jwt_decode(token);
        switch (decodedToken.role_id) {
            case CONFIG.COMMON.USER_ROLE_ID:
                setHeader(userHeaderComponent);
                break;

            case CONFIG.COMMON.ADMIN_ROLE_ID:
                await setUnapprovedCoins();
                setHeader(adminHeaderComponent);
                break;

            default:
                setHeader(guestHeaderComponent);
                break;
        }
    }

    return (
        <Router>
            <div>
                <Nav header={header} />

                <div className="container">
                    <AppRoute updateHeader={updateHeader} childRef={childRef} />
                </div>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
