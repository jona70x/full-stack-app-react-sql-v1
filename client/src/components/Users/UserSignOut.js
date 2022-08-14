import { Navigate } from "react-router-dom";
import AuthContext from "../../storage/auth-context";
import { useContext, useEffect } from "react";

const UserSignOut = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    authCtx.actions.signOut();
  });
  return <Navigate to="/" />;
};

export default UserSignOut;
