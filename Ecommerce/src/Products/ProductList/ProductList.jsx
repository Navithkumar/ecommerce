import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Navbar from '../../Navbar/Navbar';
import './productList.css';
function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `http://127.0.0.1:8000/api/v1/products/edit/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );
                setProduct(res.data.data);
                document.title = `Buy ${product_name}"-"${product_size}"-"${product_colour}`;
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };

        fetchProduct();
    }, [id]);
    useEffect(() => {
        if (product) {
            document.title = `Buy ${product.product_name} - ${product.product_size} - ${product.product_colour}`;
        }
    }, [product]);
    if (!product) return <div>Loading...</div>;

    return (
        <>
            {' '}
            <Helmet>
                <title>
                    {`Buy ${product.product_name} - ${product.product_size} - ${product.product_colour}`}{' '}
                </title>
            </Helmet>
            <div>
                <Navbar />
            </div>
            <div className="product-detail-container mt-5">
                <div className="product-images">
                    <img
                        src={`http://127.0.0.1:8000${product.product_image}`}
                        alt={product.product_name}
                        className="main-image"
                    />
                </div>

                <div className="product-info">
                    <h2 className="product-title">{product.product_name}</h2>
                    <p className="product-meta">
                        {product.product_size} | {product.product_fit}
                    </p>

                    <div className="rating">
                        <span className="rating-star">★ 3.8</span>
                        <span className="rating-count">248 Ratings</span>
                    </div>

                    <div className="product-price">
                        ₹{product.product_prize}
                        <div className="tax-note">inclusive of all taxes</div>
                    </div>

                    <div className="size-section">
                        <span>Select Size:</span>
                        <div className="sizes">
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <button
                                    key={size}
                                    className={`size-btn ${
                                        selectedSize === size ? 'active' : ''
                                    }`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <p className="size-chart-link">SIZE CHART &gt;</p>
                    </div>

                    <div className="action-buttons">
                        <button className="add-to-bag">ADD TO BAG</button>
                        <button className="wishlist">WISHLIST</button>
                    </div>

                    <div className="delivery">
                        <h5>Delivery Options</h5>
                        <p>
                            Enter pincode to check availability and delivery
                            time
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
