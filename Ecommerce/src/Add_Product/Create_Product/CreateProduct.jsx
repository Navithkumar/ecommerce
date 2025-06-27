import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './Form';
import { Navigate, useNavigate } from 'react-router-dom';
function CreateProductPage() {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(
                'http://127.0.0.1:8000/api/v1/products/list',
            );
            setProducts(res.data.data);
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    };

    return (
        <>
            <div className="container my-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-primary mb-0">
                        <i className="bi bi-bag-plus-fill me-2"></i>Product
                        Management
                    </h3>
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setShowForm(true)}
                    >
                        <i className="bi bi-plus-circle me-1"></i>Add Product
                    </button>
                </div>

                {showForm && (
                    <Form
                        onClose={() => setShowForm(false)}
                        onSubmitSuccess={() => {
                            fetchProducts();
                            setShowForm(false);
                        }}
                    />
                )}

                <hr className="my-4" />
                <h5 className="mb-3">Product List</h5>

                {products.length > 0 ? (
                    <div className="row g-4">
                        {products.map((prod) => (
                            <div className="col-md-4" key={prod.id}>
                                <div className="card shadow-sm p-3">
                                    <img
                                        src={`http://127.0.0.1:8000${prod.product_image}`}
                                        alt={prod.product_name}
                                        className="img-fluid rounded-3 mb-3"
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '12px',
                                            display: 'block',
                                        }}
                                    />
                                    <h6 className="fw-bold">
                                        {prod.product_name}
                                    </h6>
                                    <p className="mb-1 text-muted">
                                        ₹{prod.product_prize}
                                    </p>
                                    <p className="mb-0 text-muted">
                                        Size: {prod.product_size}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">No products found.</p>
                )}
            </div>
            <div className="container mt-5">
                <button
                    className="btn btn-outline-secondary btn-sm mb-3"
                    onClick={() => navigate(-1)}
                >
                    <i className="bi bi-arrow-left me-1"></i> Back
                </button>
            </div>
        </>
    );
}

export default CreateProductPage;
