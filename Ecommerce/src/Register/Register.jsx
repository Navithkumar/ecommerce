import React, { useState, useEffect } from 'react';
import '../Login/login.css';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone_number: '',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Register';
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                phone_number: formData.phone_number,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    postal_code: formData.postal_code,
                    country: formData.country,
                },
            };
            await axios.post('http://127.0.0.1:8000/api/v1/register', payload);
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            alert('Registration failed!');
            console.error(error);
        }
    };
    return (
        <div>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className="container-fluid py-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-10">
                        <div className="card shadow-lg border-0 rounded-4 p-4 my-5">
                            <div className="row g-0">
                                <div className="col-md-6 d-none d-md-block">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                        className="img-fluid rounded-start h-100"
                                        alt="Illustration"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="card-body p-5"
                                    >
                                        <h3 className="mb-4">
                                            Register Account
                                        </h3>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                className="form-control"
                                                placeholder="Customer_1"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Customer_1@gmail.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="*********"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone_number"
                                                className="form-control"
                                                placeholder="9003494501"
                                                value={formData.phone_number}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <h5 className="mt-4 mb-3">Address</h5>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Street
                                            </label>
                                            <input
                                                type="text"
                                                name="street"
                                                className="form-control"
                                                placeholder="124 Church Street"
                                                value={formData.street}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    className="form-control"
                                                    placeholder="Bangalore"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    State
                                                </label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    className="form-control"
                                                    placeholder="Karnataka"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Postal Code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="postal_code"
                                                    className="form-control"
                                                    placeholder="560001"
                                                    value={formData.postal_code}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    className="form-control"
                                                    placeholder="India"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg w-100 mt-3"
                                        >
                                            Register
                                        </button>
                                    </form>

                                    <div className="divider d-flex align-items-center my-4">
                                        <hr className="flex-grow-1" />
                                        <p className="text-center fw-bold mx-3 mb-0">
                                            OR
                                        </p>
                                        <hr className="flex-grow-1" />
                                    </div>

                                    <button
                                        className="btn btn-danger btn-lg w-100 mx-3"
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
