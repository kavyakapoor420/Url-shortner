import { createContext, useEffect, useState } from "react";
import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  signupUser,
} from "../api/authApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const response = await fetchCurrentUser();
        setUser(response.user);
      } catch {
        setUser(null);
      } finally {
        setIsBootstrapping(false);
      }
    };

    bootstrapAuth();
  }, []);

  const signup = async (formData) => {
    const response = await signupUser(formData);
    setUser(response.user);
    return response;
  };

  const login = async (formData) => {
    const response = await loginUser(formData);
    setUser(response.user);
    return response;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isBootstrapping,
    signup,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
