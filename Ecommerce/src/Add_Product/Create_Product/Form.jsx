import React from 'react';

function CreateProduct() {
    return (
        <div className="container my-5">
            <div className="col-md-8 mx-auto">
                <div className="card shadow p-4 rounded-4">
                    <h4 className="mb-4 text-primary text-center">
                        <i className="bi bi-bag-plus-fill me-2"></i>Create
                        Product
                    </h4>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. Slim Fit Shirt"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price (₹)</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="e.g. 999"
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Size</label>
                                <select className="form-select">
                                    <option>XS</option>
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Color</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Red"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input type="file" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-success w-100">
                            Create Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;
