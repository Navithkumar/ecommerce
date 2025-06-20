import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login/Login';

const Router = createBrowserRouter([{ path: '/login', element: <Login /> }]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={Router} />,
);
