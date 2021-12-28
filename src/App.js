import './App.css';
import React, { useEffect, useRef, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import jwt_decode from "jwt-decode";

import { GuestHeader } from './components/layout/GuestHeader';
import { UserHeader } from './components/layout/UserHeader';
import { AdminHeader } from './components/layout/AdminHeader';
import { Login } from "./components/user/Login";
import { Home } from "./components/Home";
import { Footer } from "./components/layout/Footer";
import { AddCoin } from "./components/AddCoin";
import { Requests } from "./components/Requests";
import { Details } from "./components/Details";

import { getUnapprovedCoinsCount } from "./services/coins";

const USER_ROLE_ID = 1;
const ADMIN_ROLE_ID = 2;

function App() {
    const childRef = useRef();
    const [unapprovedCoinsCount, setUnapprovedCoinsCount] = useState(0);
    const token = localStorage.getItem('token');

    const guestHeaderComponent = <GuestHeader />;
    const userHeaderComponent = <UserHeader logout={logout} />;
    const adminHeaderComponent = <AdminHeader logout={logout} unapprovedCoinsCount={unapprovedCoinsCount} />

    const [header, setHeader] = useState(!token ? guestHeaderComponent : userHeaderComponent);

    useEffect(() => {
        updateHeader();
    }, [unapprovedCoinsCount]);

    async function setUnapprovedCoins() {
        const count = await getUnapprovedCoinsCount();
        setUnapprovedCoinsCount(count);
    }

    function logout() {
        localStorage.removeItem('token');
        setHeader(guestHeaderComponent);
        childRef?.current?.getCoins();
    }

    async function updateHeader() {
        const token = localStorage.getItem('token');
        if (!token) {
            return setHeader(guestHeaderComponent);
        }

        const decodedToken = jwt_decode(token);
        switch (decodedToken.role_id) {
            case USER_ROLE_ID:
                setHeader(userHeaderComponent);
                break;
            case ADMIN_ROLE_ID:
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
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="container">
                        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to={'/'} className={'nav-link'}>
                                        Home
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                            {header}
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <Switch>
                        <Route path="/login">
                            <Login updateHeader={updateHeader} />
                        </Route>
                        <Route path="/addCoin">
                            {
                                token
                                    ? <AddCoin />
                                    : <Redirect to="/" />
                            }
                        </Route>
                        <Route path="/requests">
                            {
                                token
                                    ? +(jwt_decode(token).role_id) === ADMIN_ROLE_ID
                                        ? <Requests />
                                        : <Redirect to="/" />
                                    : <Redirect to="/" />
                            }
                        </Route>
                        <Route path="/coin/:id">
                            <Details />
                        </Route>
                        <Route path="/">
                            <Home ref={childRef} />
                        </Route>
                    </Switch>
                </div>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
