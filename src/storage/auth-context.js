import React from "react";

// Creating context
// By having this in a separate file I can avoid components deeply nested
// Also, will get autocompletion from IDE

const AuthContext = React.createContext({
  isLoggedIn: false,
  credentials: undefined,
  actions: {
    signIn: () => {},
    signOut: () => {},
  },
});

export default AuthContext;
