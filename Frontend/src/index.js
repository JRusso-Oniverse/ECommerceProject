import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import Home from './components/Home/Home';
import PLP from './components/PLP/PLP';
import Cart from './components/Cart/Cart';
import Admin from './components/Admin/Admin';

import "./index.css";

let router = createBrowserRouter([
	{
		path: "/",
		Component: Home
	},
	{
		path: "/products",
		Component: PLP
	},
	{
		path: "/cart",
		Component: Cart
	},
	{
		path: "/admin",
		Component: Admin
	}
]);

createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);
