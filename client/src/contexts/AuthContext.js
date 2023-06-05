import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../shared/services/api";

// Cria o contexto
const AuthContext = createContext();

// Provedor do contexto
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer" + token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return;
    }
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, [token, user]);

  const contextValue = useMemo(
    () => ({ token, setToken, user, setUser }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
