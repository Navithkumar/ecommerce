import React from 'react';
import "./createcategory.css"
function CreateCategory() {
    return (
        <div className="container my-5">
            <div className="col-md-6 mx-auto">
                <div className="card shadow p-4 rounded-4">
                    <h4 className="mb-4 text-primary text-center">
                        <i className="bi bi-folder-plus me-2"></i>Create
                        Category
                    </h4>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Category Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. Shirts, Jeans"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Optional..."
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Create Category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateCategory;
