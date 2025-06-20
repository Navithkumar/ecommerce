import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import favicon from '../assets/favicon/favicon.png';
function Home() {
    useEffect(() => {
        document.title = 'Home';
    }, []);
    return (
        <div>
            <Helmet>
                <title>Home</title>
                <link rel="icon" type="image/svg+xml" href={favicon} />
            </Helmet>


            
            <div>Home</div>
        </div>
    );
}

export default Home;
