import React, { useEffect, useState } from 'react';
import { login, googleLogin } from '../../services/auth';
import { useHistory, Link } from 'react-router-dom';

import { getItemFromLocalStorage } from '../../services/helpers/utils';
import GoogleLogin from "react-google-login";
import TwitterLogin from "react-twitter-login";

export const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('Something went wrong . . .');
    const [showError, setShowError] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (getItemFromLocalStorage('token')) {
            history.push('/');
        }
    });

    const handleLogin = event => {
        event.preventDefault();

        login(username, password)
            .then(result => {
                // redirect and change header
                props.updateHeader();
                history.push('/');
            })
            .catch(err => {
                if (err.error) {
                    setErrorMessage(err.error);
                }

                setShowError(true);
            });
    };

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleGoogleSuccessfulLogin = async (googleData) => {
        await googleLogin(googleData.tokenId);

        props.updateHeader();
        history.push('/');
    };

    const handleGoogleFailedLogin = (result) => {

    };

    return (
        <div id="login">
            <h3 className="text-center text-white pt-5">Login form</h3>
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" action="" method="post">
                                <h3 className="text-center text-info">Login</h3>
                                {showError
                                    ?
                                        <div className="form-group alert alert-danger">
                                            {errorMessage}
                                        </div>
                                    : ''}

                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">Username:</label><br />
                                    <input type="text" name="username" id="username" className="form-control" onChange={handleUsernameChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Password:</label><br />
                                    <input type="password" name="password" id="password" className="form-control" onChange={handlePasswordChange} />
                                </div>
                                <div className="form-group center-content">
                                    <input type="submit" name="submit" className="btn btn-info btn-md" value="Login" onClick={handleLogin} />
                                </div>

                                <div className="center-content">
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccessfulLogin}
                                        onFailure={handleGoogleFailedLogin}
                                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                        cookiePolicy={'single_host_origin'}
                                        theme="light" />
                                </div>

                                <div className="center-content twitter-login-button">
                                    <TwitterLogin authCallback="" consumerKey="" consumerSecret="" buttonTheme="dark_short" />
                                </div>

                                <div id="register-link" className="text-right">
                                    <Link to={'/register'} className="text-info">
                                        Register here
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
