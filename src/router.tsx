import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Return from "./pages/Return";
import App from "./App";
import Cancellation from "./pages/Cancellation";
import Authorization from "./pages/Authorization";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/authorization",
    element: <Authorization />,
  },
  {
    path: "/",
    element: <ProtectedRoute />, // 👈 защита
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <Navigate to="/home" replace />,
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "returns-page",
            element: <Return />,
          },
          {
            path: "cancellations-page",
            element: <Cancellation />,
          },
        ],
      },
    ],
  },
]);

export default router;
