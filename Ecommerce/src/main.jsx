import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Register from './Register/Register';
import ProductList from './Products/ProductList/ProductList';

const Router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/', element: <Home /> },
    { path: '/register', element: <Register /> },
    { path: '/product/:id', element: <ProductList /> },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={Router} />,
);
