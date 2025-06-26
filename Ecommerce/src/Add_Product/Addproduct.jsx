import React, { useEffect } from 'react';
import './addProduct.css';
import Navbar from '../Navbar/Navbar';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function Addproduct() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Create Products';
    }, []);

    return (
        <div>
            <Helmet>
                <title>Create Products</title>
            </Helmet>

            <Navbar />

            <div className="container my-5">
                <div className="row g-4">
                    <div className="col-md-6">
                        <div
                            className="card shadow p-4 text-center hover-card"
                            role="button"
                            onClick={() => navigate('/create-product')}
                        >
                            <h5 className="text-primary">
                                <i className="bi bi-bag-plus-fill me-2"></i>
                                Create Product
                            </h5>
                            <p className="text-muted">
                                Add new product details
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div
                            className="card shadow p-4 text-center hover-card"
                            role="button"
                            onClick={() => navigate('/create-category')}
                        >
                            <h5 className="text-primary">
                                <i className="bi bi-folder-plus me-2"></i>
                                Create Category
                            </h5>
                            <p className="text-muted">
                                Add new product category
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addproduct;
