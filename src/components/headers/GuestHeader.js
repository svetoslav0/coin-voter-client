import {
    Link
} from "react-router-dom";
import {useState} from "react";

function GuestHeader() {
    const guestLinks = (
        <ul className="navbar-nav ml-auto" id="guest">
            <li className="nav-item">
                <Link to={'/login'} className={'nav-link'} activeClassName={'active'}>
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link to={'/register'} className={'nav-link'} activeClassName={'active'}>
                    Register
                </Link>
            </li>
        </ul>
    );

    const userLinks = (
        <ul className="navbar-nav ml-auto" id="user">
            <li className="nav-item">
                <Link to={'/user/10'} className={'nav-link'} activeClassName={'active'}>
                    Add coin
                </Link>
            </li>
            <li className="nav-item">
                <Link to={'/user/10'} className={'nav-link'} activeClassName={'active'}>
                    Logout
                </Link>
            </li>
        </ul>
    );

    const adminLinks = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link to={'/user/10'} className={'nav-link'} activeClassName={'active'}>
                    Coin Requests
                </Link>
            </li>

            <li className="nav-item">
                <Link to={'/user/10'} className={'nav-link'} activeClassName={'active'}>
                    Add coin
                </Link>
            </li>

            <li className="nav-item">
                <Link to={'/user/10'} className={'nav-link'} activeClassName={'active'}>
                    Logout
                </Link>
            </li>
        </ul>
    );

    // const [role, setRole] = useState('guest');

    let header = guestLinks;
    // switch (role) {
    //     case 'user':
    //         header = userLinks;
    //         break;
    // }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={'/home'} className={'nav-link'} activeClassName={'active'}>
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
    );

    // activeStyle={{color: 'red'}} activeClassName={'nav-link'}
}

export default GuestHeader;
