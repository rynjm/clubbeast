import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get("https://clubbeast.onrender.com/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser({ ...data, token });
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post("https://clubbeast.onrender.com/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data);
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post("https://clubbeast.onrender.com/api/auth/register", { name, email, password });
    localStorage.setItem("token", data.token);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
