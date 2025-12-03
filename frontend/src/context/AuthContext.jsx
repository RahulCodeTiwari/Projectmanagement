import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("pm_user");
    const savedToken = localStorage.getItem("pm_token");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("pm_user", JSON.stringify(user));
    else localStorage.removeItem("pm_user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("pm_token", token);
    else localStorage.removeItem("pm_token");
  }, [token]);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const authFetch = (url, opts = {}) => {
    const headers = opts.headers ? { ...opts.headers } : {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return fetch(url, { ...opts, headers });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}
