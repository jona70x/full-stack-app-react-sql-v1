import React from "react";

// Creating context

const AuthContext = React.createContext({
  isLoggedIn: false,
  credentials: undefined,
  actions: {
    signIn: () => {},
    signOut: () => {},
  },
});

export default AuthContext;
