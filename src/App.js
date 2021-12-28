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
    const [showSearchResults, setShowSearchResults] = useState(false);
    const token = localStorage.getItem('token');

    const guestLinks = (
        <ul className="navbar-nav ml-auto" id="guest">
            <li className="nav-item">
                <Link to={'/login'} className={'nav-link'}>
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link to={'/register'} className={'nav-link'}>
                    Register
                </Link>
            </li>
        </ul>
    );

    const userLinks = (
        <ul className="navbar-nav ml-auto" id="user">
            <li className="nav-item">
                <Link to={'/addCoin'} className={'nav-link'}>
                    Add coin
                </Link>
            </li>
            <li className="nav-item">
                <button className={'btn btn-link'} onClick={logout}>
                    Logout
                </button>
            </li>
        </ul>
    );

    let adminLinks = (
        <ul className="navbar-nav ml-auto" >
            <li className="nav-item">
                <Link to={'/requests'} className={'nav-link position-relative'}>
                    Coin Requests

                    {unapprovedCoinsCount > 0
                        ?
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {unapprovedCoinsCount}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        : ''
                    }
                </Link>
            </li>

            <li className="nav-item">
                <Link to={'/addCoin'} className={'nav-link'}>
                    Add coin
                </Link>
            </li>

            <li className="nav-item">
                <button className={'btn btn-link'} onClick={logout}>
                    Logout
                </button>
            </li>
        </ul>
    );

    const [header, setHeader] = useState(!localStorage.getItem('token') ? guestLinks : userLinks);

    useEffect(() => {
        updateHeader();
    }, []);

    // TODO: Not working properly, to be fixed
    async function setUnapprovedCoins() {
        const count = await getUnapprovedCoinsCount();
        setUnapprovedCoinsCount(count);
    }

    function logout() {
        localStorage.removeItem('token');
        setHeader(guestLinks);
        childRef?.current?.getCoins();
    }

    function updateHeader() {
        const token = localStorage.getItem('token');
        if (!token) {
            return setHeader(guestLinks);
        }

        const decodedToken = jwt_decode(token);
        switch (decodedToken.role_id) {
            case USER_ROLE_ID:
                setHeader(userLinks);
                break;
            case ADMIN_ROLE_ID:
                setUnapprovedCoins()
                    .then(_ => {
                        setHeader(adminLinks);
                    });
                break;
            default:
                setHeader(guestLinks);
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

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
                                    ? jwt_decode(token).role_id == ADMIN_ROLE_ID
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
