import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  return auth && auth.token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
