import { Link } from 'react-router';

function UserHeader() {
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
                    <ul className="navbar-nav ml-auto">
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
                </div>
            </div>
        </nav>
    );

    // activeStyle={{color: 'red'}} activeClassName={'nav-link'}
}

export default UserHeader;
