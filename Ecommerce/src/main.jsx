import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Register from './Register/Register';

const Router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/', element: <Home /> },
    { path: '/register', element: <Register /> },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={Router} />,
);
