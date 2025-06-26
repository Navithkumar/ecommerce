import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Register from './Register/Register';
import ProductList from './Products/ProductList/ProductList';
import Addcart from './AddCart/Addcart';
import CartDetails from './AddCart/CartDetails/CartDetails';
import Addproduct from './Add_Product/Addproduct';
import CreateProduct from './Add_Product/Create_Product/CreateProduct';
import CreateCategory from './Add_Product/Create_category/CreateCategory';

const Router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/', element: <Home /> },
    { path: '/register', element: <Register /> },
    { path: '/product/:id', element: <ProductList /> },
    { path: '/addcart/:id', element: <Addcart /> },
    { path: '/cartdetails', element: <CartDetails /> },
    { path: '/add-product', element: <Addproduct /> },
    { path: '/create-product', element: <CreateProduct /> },
    { path: '/create-category', element: <CreateCategory /> },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={Router} />,
);
