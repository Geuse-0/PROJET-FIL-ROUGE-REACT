import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth || {});
  const token = auth.token;

  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
