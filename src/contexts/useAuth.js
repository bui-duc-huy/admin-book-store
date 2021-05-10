import React, { useContext, createContext, useState } from "react";

const AuthContext = createContext();

function AuthValue() {
  // const { onPost: loginUser }
  // const [isAuth, setIsAuth] = useState(!!localStorage.getItem(TOKEN_NAME));
  const [isAuth, setIsAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const login = async (auth) => {
    setIsAuth(true);
    setCurrentUser(auth.user);
  };

  return {
    isAuth,
    login,
    currentUser,
  };
}

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={AuthValue()}>{children}</AuthContext.Provider>
  );
}
