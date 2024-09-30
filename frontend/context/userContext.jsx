import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    if (!user) {
      axios.get("http://localhost:5000/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
