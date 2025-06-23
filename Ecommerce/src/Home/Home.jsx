import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import favicon from '../assets/favicon/favicon.png';
import './home.css';
import Products from '../Products/Products';
import Navbar from '../Navbar/Navbar';

function Home() {
    return (
        <>
            {' '}
            <div>
                <Helmet>
                    <title>Home</title>
                    <link rel="icon" type="image/svg+xml" href={favicon} />
                </Helmet>
                <div>
                    <Navbar />
                </div>
                <div>
                    <Products />
                </div>
            </div>
        </>
    );
}

export default Home;
