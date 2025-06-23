import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('access');
            try {
                const res = await axios.get(
                    'http://127.0.0.1:8000/api/v1/products/list',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    },
                );
                setProducts(res.data.data);
            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mt-5">
            {products.length > 0 ? (
                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card h-auto">
                                <img
                                    src={`http://127.0.0.1:8000${product.product_image}`}
                                    alt={product.product_name}
                                    className="card-img-top"
                                    style={{
                                        height: '250px',
                                        objectFit: 'cover',
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {product.product_name}
                                    </h5>
                                    <p className="card-text">
                                        Size: {product.product_size + '-'}
                                        {product.product_fit}
                                        <br />
                                        Price: ₹{product.product_prize}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
}

export default Products;
