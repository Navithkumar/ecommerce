import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import Navbar from '../../Navbar/Navbar';

function CreateProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        product_name: '',
        product_prize: '',
        product_size: 'M',
        product_colour: '',
        product_fit: '',
        quantity: '',
        product_image: null,
        brand_name: '',
        brand_logo: null,
        category: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        document.title = 'Product';
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(
                'http://127.0.0.1:8000/api/v1/products/list',
            );
            setProducts(res.data.data);
        } catch (error) {
            toast.error('Error fetching products.');
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get(
                'http://127.0.0.1:8000/api/v1/category/view',
            );
            setCategories(res.data.data);
        } catch (error) {
            toast.error('Error fetching categories.');
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access');
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== '') {
                form.append(key, formData[key]);
            }
        });
        try {
            if (isEditing) {
                await axios.patch(
                    `http://127.0.0.1:8000/api/v1/product/update/${editingId}`,
                    form,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                toast.success('Product updated successfully');
            } else {
                await axios.post(
                    'http://127.0.0.1:8000/api/v1/products/create',
                    form,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                toast.success('Product created successfully');
            }

            fetchProducts();
            setFormData({
                product_name: '',
                product_prize: '',
                product_size: 'M',
                product_colour: '',
                product_fit: '',
                quantity: '',
                product_image: null,
                brand_name: '',
                brand_logo: null,
                category: '',
            });
            setIsEditing(false);
            setEditingId(null);
            setShowForm(false);
        } catch (error) {
            toast.error('Error saving product');
        }
    };

    const handleEdit = (product) => {
        setFormData({
            product_name: product.product_name,
            product_prize: product.product_prize,
            product_size: product.product_size,
            product_colour: product.product_colour,
            product_fit: product.product_fit,
            quantity: product.quantity,
            product_image: null,
            brand_name: product.brand_name,
            brand_logo: null,
            category: product.category,
        });
        setEditingId(product.id);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/v1/product/delete/${id}`,
            );
            toast.success('Product deleted');
            fetchProducts();
        } catch (error) {
            toast.error('Error deleting product');
        }
    };

    return (
        <>
            <Navbar />
            <Helmet>
                <title>Product</title>
            </Helmet>
            <div className="container my-5">
                <ToastContainer />
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="text-primary mb-0">
                        <i className="bi bi-bag-check me-2"></i>Product List
                    </h4>
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                            setShowForm(!showForm);
                            if (!showForm) {
                                setIsEditing(false);
                                setFormData({
                                    product_name: '',
                                    product_prize: '',
                                    product_size: 'M',
                                    product_colour: '',
                                    product_fit: '',
                                    quantity: '',
                                    product_image: null,
                                    brand_name: '',
                                    brand_logo: null,
                                    category: '',
                                });
                            }
                        }}
                    >
                        <i className="bi bi-plus-circle me-1"></i>
                        {showForm ? 'Cancel' : 'Add Product'}
                    </button>
                </div>

                {showForm && (
                    <div className="col-md-8 mx-auto mb-5">
                        <div className="card shadow p-4 rounded-4">
                            <h4 className="mb-4 text-primary text-center">
                                <i className="bi bi-bag-plus-fill me-2"></i>
                                {isEditing
                                    ? 'Update Product'
                                    : 'Create Product'}
                            </h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        name="product_name"
                                        value={formData.product_name}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Price (₹)
                                    </label>
                                    <input
                                        type="number"
                                        name="product_prize"
                                        value={formData.product_prize}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Size
                                        </label>
                                        <select
                                            name="product_size"
                                            value={formData.product_size}
                                            onChange={handleChange}
                                            className="form-select"
                                        >
                                            <option value="XS">XS</option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Color
                                        </label>
                                        <input
                                            type="text"
                                            name="product_colour"
                                            value={formData.product_colour}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Fit</label>
                                    <input
                                        type="text"
                                        name="product_fit"
                                        value={formData.product_fit}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Brand Name
                                    </label>
                                    <input
                                        type="text"
                                        name="brand_name"
                                        value={formData.brand_name}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Brand Logo
                                    </label>
                                    <input
                                        type="file"
                                        name="brand_logo"
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input
                                        type="file"
                                        name="product_image"
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >
                                    {isEditing
                                        ? 'Update Product'
                                        : 'Create Product'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="row mt-4">
                    {products.map((product) => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card h-100 shadow-sm">
                                {product.product_image && (
                                    <img
                                        src={`http://127.0.0.1:8000/${product.product_image}`}
                                        alt={product.product_name}
                                        className="card-img-top"
                                        style={{
                                            height: '200px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {product.product_name}
                                    </h5>
                                    <p className="card-text">
                                        ₹{product.product_prize}
                                    </p>
                                    <p className="card-text">
                                        Size: {product.product_size}, Color:{' '}
                                        {product.product_colour}
                                    </p>
                                    <p className="card-text">
                                        Fit: {product.product_fit}, Quantity:{' '}
                                        {product.quantity}
                                    </p>
                                    <p className="card-text">
                                        Brand: {product.brand_name}
                                    </p>
                                    <p className="card-text">
                                        Category:{' '}
                                        {categories.find(
                                            (cat) =>
                                                cat.id === product.category,
                                        )?.category_name || 'N/A'}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CreateProduct;
