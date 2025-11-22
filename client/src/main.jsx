import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { router } from "./router/router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
