// ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuth =
    localStorage.getItem("login") === "Spp-manager" &&
    localStorage.getItem("password") === "123456";
  return isAuth ? <Outlet /> : <Navigate to="/authorization" replace />;
};

export default ProtectedRoute;
