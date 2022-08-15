import { Navigate } from "react-router-dom";
import AuthContext from "../../storage/auth-context";
import { useContext, useEffect } from "react";

// Calls SignOut function from context and redirects user to main page
const UserSignOut = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    authCtx.actions.signOut();
  });
  return <Navigate to="/" />;
};

export default UserSignOut;
