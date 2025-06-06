import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Edit from "./Edit.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },

  {
    path: "/todo/:id",
    element: <Edit></Edit>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
