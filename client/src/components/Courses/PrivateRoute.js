import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../storage/auth-context";

const PrivateRoute = ({ component: Component }) => {
  const authCtx = useContext(AuthContext);

  return authCtx.isLoggedIn ? <Component /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
