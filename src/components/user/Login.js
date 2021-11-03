import React, { useEffect, useState } from "react";
import { login } from '../../services/auth';
import { useHistory } from 'react-router-dom';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('Something went wrong . . .');
    const [showError, setShowError] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')) {
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
    }

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

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
                                <div className="form-group">
                                    <input type="submit" name="submit" className="btn btn-info btn-md" value="submit" onClick={handleLogin} />
                                </div>
                                <div id="register-link" className="text-right">
                                    <a href="#" className="text-info">Register here</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
