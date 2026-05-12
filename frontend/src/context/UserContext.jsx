import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

//custom hook for UserContext
export const getUser = () => useContext(UserContext);
