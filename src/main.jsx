import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

// pages
import Home from './pages/home';
import DetallesPelicula from './pages/detalles';
import PaginaError from './pages/error'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PaginaError />,
  },
  {
    path: "/movie/:id", 
    element: <DetallesPelicula />,
    errorElement: <PaginaError />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router}>
    <Home />
  </RouterProvider>
);
