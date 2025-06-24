import React, { useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import { Helmet } from 'react-helmet';

function CartDetails() {
    useEffect(() => {
        document.title = 'SHOPPING BAG';
    }, []);

    return (
        <>
            <Helmet>
                <title>SHOPPING BAG</title>
            </Helmet>
            <div>
                <Navbar />
            </div>
            <div className="container my-4">
                <div className="row g-4">
                    <div className="col-md-8">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>✔️ 1/1 ITEMS SELECTED</h5>
                            <div>
                                <a
                                    href="#"
                                    className="me-3 text-decoration-none"
                                >
                                    REMOVE
                                </a>
                                <a href="#" className="text-decoration-none">
                                    MOVE TO WISHLIST
                                </a>
                            </div>
                        </div>

                        <div className="card card-shadow p-3">
                            <div className="row g-3">
                                <div className="col-3">
                                    <img
                                        src="https://via.placeholder.com/100x130"
                                        className="img-fluid rounded"
                                        alt="Product"
                                    />
                                </div>

                                <div className="col-9">
                                    <h6 className="mb-1">Tokyo Talkies</h6>
                                    <p className="mb-1 text-muted small">
                                        Puff Sleeves Fit & Flare Dress
                                    </p>
                                    <p className="mb-1 text-muted small">
                                        Sold by: Vision Star
                                    </p>

                                    <div className="d-flex gap-3 my-2">
                                        <div>
                                            <label
                                                htmlFor="size"
                                                className="form-label small mb-1"
                                            >
                                                Size
                                            </label>
                                            <select
                                                className="form-select form-select-sm w-auto"
                                                id="size"
                                            >
                                                <option defaultValue>XS</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="qty"
                                                className="form-label small mb-1"
                                            >
                                                Qty
                                            </label>
                                            <select
                                                className="form-select form-select-sm w-auto"
                                                id="qty"
                                            >
                                                <option defaultValue>1</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="fw-bold">₹354</span>
                                        <span className="price-line">
                                            ₹3,549
                                        </span>
                                        <span className="discount-text">
                                            90% OFF
                                        </span>
                                    </div>
                                    <p className="text-muted small mt-1">
                                        7 days return available
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-3 p-3 text-center">
                            <span className="text-muted">
                                🔖 Add More From Wishlist
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-shadow p-3">
                            <h6 className="section-title mb-3">
                                PRICE DETAILS (1 Item)
                            </h6>
                            <div className="mb-2 d-flex justify-content-between">
                                <span>Total MRP</span>
                                <span>₹3,549</span>
                            </div>
                            <div className="mb-2 d-flex justify-content-between">
                                <span>Discount on MRP</span>
                                <span className="text-success">-₹3,195</span>
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
                                <span>₹354</span>
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
