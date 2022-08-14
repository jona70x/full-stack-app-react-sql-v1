import { useState, useEffect } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  // Keeping user credentials and logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({});

  useEffect(() => {
    // Checking if user is already in
    if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
      const item = JSON.parse(localStorage.getItem("isLoggedIn"));
      setIsLoggedIn(true);
      setCredentials(item);
    }
  }, []);

  // Method that keeps user signed in
  const signIn = (emailAddress, password, userId, firstName, lastName) => {
    // Set credentials to local storage
    localStorage.setItem(
      "isLoggedIn",
      JSON.stringify({ emailAddress, password, userId, firstName, lastName })
    );
    setIsLoggedIn(true);
    setCredentials({ emailAddress, password, userId, firstName, lastName });
  };
  // Method to sign out
  const signOut = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setCredentials({});
    alert("See you soon!");
  };

  const authContext = {
    isLoggedIn,
    credentials,
    actions: {
      signIn,
      signOut,
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
