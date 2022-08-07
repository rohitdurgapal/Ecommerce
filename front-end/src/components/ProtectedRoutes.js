// In ProtectedRoutes.js
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
    const auth = localStorage.getItem("user");
    return auth ? <Outlet /> : <Navigate to="/login" replace/>
}
export default ProtectedRoutes;