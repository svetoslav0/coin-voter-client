import { Link } from 'react-router';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={'/home'} className={'nav-link'} activeClassName={'active'}>
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={'/user/10'} className={'nav-link'} activeClassName={'active'}>
                            User
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );

    // activeStyle={{color: 'red'}} activeClassName={'nav-link'}
}

export default Header;
