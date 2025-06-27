import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './createcategory.css';
import { Helmet } from 'react-helmet';
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateCategory() {
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        category_name: '',
        category_image: null,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Category';
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(
                'http://127.0.0.1:8000/api/v1/category/view',
            );
            setCategories(res.data.data);
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                console.error('Error fetching categories:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'category_image') {
            setFormData({ ...formData, category_image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access');
        const form = new FormData();
        form.append('category_name', formData.category_name);
        if (formData.category_image) {
            form.append('category_image', formData.category_image);
        }

        try {
            if (isEditing && editingId) {
                await axios.patch(
                    `http://127.0.0.1:8000/api/v1/category/update/${editingId}`,
                    form,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                toast.success('Category updated successfully!');
            } else {
                await axios.post(
                    'http://127.0.0.1:8000/api/v1/category/create',
                    form,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                toast.success('Category created successfully!');
            }

            setShowForm(false);
            setFormData({ category_name: '', category_image: null });
            setIsEditing(false);
            setEditingId(null);
            fetchCategories();
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                console.error('Error creating/updating category:', error);
                toast.error('Failed to create or update category.');
            }
        }
    };

    const handleEdit = (category) => {
        setFormData({
            category_name: category.category_name,
            category_image: null,
        });
        setEditingId(category.id);
        setIsEditing(true);
        setShowForm(true);
    };

    return (
        <>
            <Helmet>
                <title>Category</title>
            </Helmet>
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="container my-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="text-primary mb-0">
                        <i className="bi bi-folder2-open me-2"></i>Categories
                    </h4>
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                            setShowForm(!showForm);
                            setIsEditing(false);
                            setFormData({
                                category_name: '',
                                category_image: null,
                            });
                        }}
                    >
                        <i className="bi bi-plus-circle me-1"></i>
                        {showForm ? 'Cancel' : 'Add Category'}
                    </button>
                </div>

                {showForm && (
                    <div className="col-md-6 mx-auto mb-4">
                        <div className="card shadow p-4 rounded-4">
                            <h5 className="mb-3 text-center text-primary">
                                <i className="bi bi-folder-plus me-2"></i>
                                {isEditing
                                    ? 'Update Category'
                                    : 'Create Category'}
                            </h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="category_name"
                                        value={formData.category_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Category Image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="category_image"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    {isEditing ? 'Update Category' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="row g-4">
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <div className="col-md-4" key={cat.id}>
                                <div className="card shadow-sm h-100 p-3 rounded-4 border-0 hover-shadow">
                                    {cat.category_image && (
                                        <img
                                            src={`http://127.0.0.1:8000${cat.category_image}`}
                                            alt={cat.category_name}
                                            className="img-fluid rounded-3 mb-3"
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '12px',
                                                display: 'block',
                                            }}
                                        />
                                    )}
                                    <h5 className="fw-semibold text-dark">
                                        <i className="bi bi-folder-fill me-2 text-primary"></i>
                                        {cat.category_name}
                                    </h5>
                                    <div className="d-flex justify-content-between mt-auto">
                                        <button
                                            className="btn btn-sm btn-outline-primary w-50 me-2"
                                            onClick={() => handleEdit(cat)}
                                        >
                                            <i className="bi bi-pencil-square me-1"></i>
                                            Update
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger w-50">
                                            <i className="bi bi-trash me-1"></i>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No categories available.</p>
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
            </div>
        </>
    );
}

export default CreateCategory;
