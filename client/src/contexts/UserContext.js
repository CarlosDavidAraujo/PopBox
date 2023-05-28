import React, { createContext, useState } from "react";

// Cria o contexto
const UserContext = createContext();

// Provedor do contexto
const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
