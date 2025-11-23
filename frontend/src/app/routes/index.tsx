import App from "@/app/App";
import { ItemPage } from "@/pages/item";
import { ListPage } from "@/pages/list";
import { StatsPage } from "@/pages/stats";

import { Navigate, createBrowserRouter } from "react-router-dom";

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
