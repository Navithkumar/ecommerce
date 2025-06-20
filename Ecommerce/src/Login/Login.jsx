import React, { useEffect, useState } from 'react';
import './login.css';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://127.0.0.1:8000/api/v1/login',
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (res.data.status) {
                localStorage.setItem('access', res.data.access);
                alert(res.data.message || 'Logged in successfully');
                navigate('/');
            } else {
                alert('Login failed');
            }
        } catch (err) {
            alert('Login failed. Please try again.');
            console.error(err.response?.data || err.message);
        }
    };

    useEffect(() => {
        document.title = 'Login';
    }, []);

    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="container-fluid p-3 my-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-10">
                        <div className="card shadow-lg border-0 rounded-4">
                            <div className="row g-0">
                                {/* Left Image */}
                                <div className="col-md-6 d-none d-md-block">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                        className="img-fluid rounded-start h-100"
                                        alt="Login Illustration"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>

                                {/* Right Form */}
                                <div className="col-md-6">
                                    <form
                                        onSubmit={handleLogin}
                                        className="card-body p-5 login-form"
                                    >
                                        <h3 className="mb-4 text-center">
                                            Login
                                        </h3>

                                        <div className="mb-4">
                                            <label className="form-label">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Enter username"
                                                value={credentials.username}
                                                onChange={(e) =>
                                                    setCredentials({
                                                        ...credentials,
                                                        username:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control form-control-lg"
                                                placeholder="Password"
                                                value={credentials.password}
                                                onChange={(e) =>
                                                    setCredentials({
                                                        ...credentials,
                                                        password:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="rememberMe"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="rememberMe"
                                                >
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg w-100 mb-4"
                                        >
                                            Login
                                        </button>

                                        <div className="divider d-flex align-items-center my-4">
                                            <hr className="flex-grow-1" />
                                            <p className="text-center fw-bold mx-3 mb-0">
                                                OR
                                            </p>
                                            <hr className="flex-grow-1" />
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-lg w-100"
                                            onClick={() =>
                                                navigate('/register')
                                            }
                                        >
                                            Register
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
