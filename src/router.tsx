import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Return from "./pages/Return";
import App from "./App";
import Reject from "./pages/Reject";

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
        path: "/rejects-page",
        element: <Reject />,
      },
    ],
  },
]);

export default router;
