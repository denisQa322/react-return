import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Return from "./pages/Return";
import App from "./App";
import Cancellation from "./pages/Cancellation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/returns-page",
        element: <Return />,
      },
      {
        path: "/cancellations-page",
        element: <Cancellation />,
      },
    ],
  },
]);

export default router;
