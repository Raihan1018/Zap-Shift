import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        loader: () => fetch("../warehouses.json").then((res) => res.json()),
        Component: Coverage,
      },
    ],
  },
]);
