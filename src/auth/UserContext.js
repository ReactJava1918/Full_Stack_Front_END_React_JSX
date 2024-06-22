import React, { createContext, useState } from "react";
import { login } from '../api/apiRequest';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  // Function to set user data
  const loginUser =async (userData) => {
    try {
        await login(userData);
        setUser(true);
      } catch (error) {
        console.error("Login failed:", error);
      }
  };

  // Function to clear user data
  const logoutUser = () => {
    setUser(false);
    sessionStorage.removeItem("regUserData"); // Clear user data from session storage
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
