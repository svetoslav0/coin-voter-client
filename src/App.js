import './App.css';
import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from "./components/user/Login";
import Home from "./components/Home";
import jwt_decode from "jwt-decode";

const USER_ROLE_ID = 1;
const ADMIN_ROLE_ID = 2;

function App() {
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
                <Link to={'/user/10'} className={'nav-link'}>
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

    const adminLinks = (
        <ul className="navbar-nav ml-auto" >
            <li className="nav-item">
                <Link to={'/user/10'} className={'nav-link'}>
                    Coin Requests
                </Link>
            </li>

            <li className="nav-item">
                <Link to={'/user/10'} className={'nav-link'}>
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

    function logout() {
        localStorage.removeItem('token');
        setHeader(guestLinks);
    }

    function updateHeader() {
        const token = JSON.parse(localStorage.getItem('token'))?.token;
        if (!token) {
            return setHeader(guestLinks);
        }

        const decodedToken = jwt_decode(token);
        switch (decodedToken.role_id) {
            case USER_ROLE_ID:
                setHeader(userLinks);
                break;
            case ADMIN_ROLE_ID:
                setHeader(adminLinks);
                break;
        }
    }

    function Users() {
        return <h2>Users</h2>;
    }

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="container">
                        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to={'/home'} className={'nav-link'}>
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
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
