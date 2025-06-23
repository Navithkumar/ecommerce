import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    'http://127.0.0.1:8000/api/v1/products/list',
                    {
                        headers: {
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

    const productDetails = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <>
            <div className="container mt-5">
                {products.length > 0 ? (
                    <div className="row">
                        {products.map((product) => (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div
                                    className="card h-auto"
                                    onClick={() => productDetails(product.id)}
                                    style={{ cursor: 'pointer' }}
                                >
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
                                            <strong>
                                                Price: ₹{product.product_prize}
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading products.......</p>
                )}
            </div>
        </>
    );
}

export default Products;
