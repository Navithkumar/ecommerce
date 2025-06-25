import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CartDetails() {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'SHOPPING BAG';
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        const token = localStorage.getItem('access');
        try {
            const res = await axios.get(
                'http://127.0.0.1:8000/api/v1/cart/list',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            setCartItems(res.data.data);
            setTotalAmount(res.data.total_amount);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('access');
                navigate('/login');
            } else {
                console.error('Error removing item from cart:', error);
            }
        }
    };
    const handleRemove = async (cartId) => {
        const token = localStorage.getItem('access');
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/v1/cart/delete/${cartId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            fetchCartItems();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('access');
                navigate('/login');
            } else {
                console.error('Error removing item from cart:', error);
            }
        }
    };

    const getTotalMRP = () => {
        return cartItems.reduce(
            (acc, item) => acc + item.product.product_prize * item.quantity,
            0,
        );
    };

    const getTotalDiscount = () => {
        return getTotalMRP() - totalAmount;
    };

    return (
        <>
            <Helmet>
                <title>SHOPPING BAG</title>
            </Helmet>

            <Navbar />

            <div className="container my-4">
                <div className="row g-4">
                    <div className="col-md-8">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>
                                {cartItems.length}/{cartItems.length} ITEMS
                                SELECTED
                            </h5>
                        </div>

                        {cartItems.map((item, index) => (
                            <div
                                className="card card-shadow p-3 mb-3"
                                key={item.id}
                            >
                                <div className="row g-3">
                                    <div className="col-3">
                                        <img
                                            src={`http://127.0.0.1:8000${item.product.product_image}`}
                                            className="img-fluid rounded"
                                            alt={item.product.product_name}
                                        />
                                    </div>
                                    <div className="col-9">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="mb-1">
                                                {item.product.product_name}
                                            </h6>
                                            <button
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                                className="btn btn-sm btn-outline-danger"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <p className="mb-1 text-muted small">
                                            Fit: {item.product.product_fit},
                                            Color: {item.product.product_colour}
                                        </p>
                                        <p className="mb-1 text-muted small">
                                            Brand:{' '}
                                            {item.product.brand.brand_name}
                                        </p>
                                        <div className="d-flex gap-3 my-2">
                                            <div>
                                                <label className="form-label small mb-1">
                                                    Size
                                                </label>
                                                <select
                                                    className="form-select form-select-sm w-auto"
                                                    disabled
                                                >
                                                    <option>
                                                        {
                                                            item.product
                                                                .product_size
                                                        }
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="form-label small mb-1">
                                                    Qty
                                                </label>
                                                <select
                                                    className="form-select form-select-sm w-auto"
                                                    disabled
                                                >
                                                    <option>
                                                        {item.quantity}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fw-bold">
                                                ₹{item.total_amount}
                                            </span>
                                        </div>
                                        <p className="text-muted small mt-1">
                                            7 days return available
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="card mt-3 p-3 text-center">
                            <span className="text-muted">
                                Add More From Wishlist
                            </span>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card card-shadow p-3">
                            <h6 className="section-title mb-3">
                                PRICE DETAILS ({cartItems.length}{' '}
                                {cartItems.length > 1 ? 'Items' : 'Item'})
                            </h6>
                            <div className="mb-2 d-flex justify-content-between">
                                <span>Total MRP</span>
                                <span>₹{getTotalMRP()}</span>
                            </div>
                            <div className="mb-2 d-flex justify-content-between">
                                <span>Discount on MRP</span>
                                <span className="text-success">
                                    -₹{getTotalDiscount()}
                                </span>
                            </div>
                            <div className="mb-2 d-flex justify-content-between">
                                <span>Coupon Discount</span>
                                <span className="coupon-text">
                                    Apply Coupon
                                </span>
                            </div>
                            <div className="mb-2 d-flex justify-content-between">
                                <span>Platform Fee</span>
                                <span className="text-success">FREE</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold fs-6">
                                <span>Total Amount</span>
                                <span>₹{totalAmount}</span>
                            </div>
                            <button className="btn btn-danger w-100 mt-3 fw-bold">
                                PLACE ORDER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartDetails;
