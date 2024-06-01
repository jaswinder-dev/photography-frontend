import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../config/env.js';
import { LogIn } from "../../classes/Login.js";
import { Context } from '../../main.jsx';

const Login = () => {

    const obj = new LogIn();

    const navigate = useNavigate();

    //if already logged in?
    useEffect(() => {
        if (obj.isLoggedIn()) {
            navigate(`/admin/${ROUTE}/posts`);
        }
    }, []);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {
        loading, setLoading,
        error,
        isError,
        showAlert
    } = useContext(Context);

    //handeling login request
    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        const data = await obj.login(email, username, password);
        setLoading(false);
        if (data.success) {
            navigate(`/admin/${ROUTE}`);
        } else {
            showAlert(data.message);
        }
    };

    //disableing the email field if user clicks in usrename field
    const disableEmail = (e) => {
        e.target.classList.remove('disabled');
        const emailField = document.querySelector("#email");
        emailField.classList.add('disabled');
        emailField.type = 'disabled';
        setEmail("");
    };

    //disableing the username field if user clicks in email field
    const disableUsername = (e) => {
        e.target.classList.remove('disabled');
        const usernameField = document.querySelector("#username");
        usernameField.classList.add('disabled');
        usernameField.type = 'disabled';
        setUsername("");
    };

    return (
        <article className='mt-5 px-5 py-4 rounded' id='login'>
            <div className="heading mb-4">
                <h2>Login</h2>
            </div>
            {
                isError
                    ?
                    <div className="errorMsg p-3 rounded bg-danger text-center mb-3">
                        <p className="text-light m-0 p-0">{error}!</p>
                    </div>
                    :
                    null
            }
            <div className="loginForm">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input type="text" className="form-control" id='username' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} onFocus={disableEmail} />
                    </div>
                    <span className="text-center text-danger d-block">or</span>
                    <div className="form-group mb-3">
                        <input type="email" className="form-control disabled" id='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} onFocus={disableUsername} />
                    </div>
                    <div className="form-group mb-3">
                        <input type="password" className="form-control" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <button type='submit' className='text-light rounded adminBtn'>
                            {
                                loading
                                    ?
                                    <div className="spinner-border spinner-border-sm"></div>
                                    :
                                    <>Login</>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </article>
    );
}

export default Login;