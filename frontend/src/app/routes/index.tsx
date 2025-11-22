import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/app/App";
import { ListPage } from "@/pages/list";
import { ItemPage } from "@/pages/item";
import { StatsPage } from "@/pages/stats";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/list" replace />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
      {
        path: "/item/:id",
        element: <ItemPage />,
      },
      {
        path: "/stats",
        element: <StatsPage />,
      },
      {
        path: "*",
        element: <Navigate to="/list" replace />,
      },
    ],
  },
]);
