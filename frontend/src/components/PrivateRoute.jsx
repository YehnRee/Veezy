import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return userInfo ? <Outlet /> : <Navigate to="/welcome" />;
};

export default PrivateRoute;
