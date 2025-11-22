import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { HomePage } from "@/pages/home";
import { TestPage } from "@/pages/test";
import App from "@/app/App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/test",
        element: <TestPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
