import { createContext, useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: any | null;
  login: (email: string, senha: string) => Promise<void>;
  loginWitthGoogle: (response: any) => Promise<void>;
  logout: () => void;
  criarConta: (data: any) => Promise<void>;
  refreshUser: () => Promise<void>;
  loading: boolean;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  login: async () => {},
  loginWitthGoogle: async () => {},
  logout: () => {},
  criarConta: async () => {},
  refreshUser: async () => {},
  loading: true,
};


export const AuthContext =
  createContext<AuthContextType>(defaultAuthContext);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded); // opcional: buscar /me depois
    }
    setLoading(false);
  }, [localStorage]);

  async function login(email, senha) {
    const { data } = await api.post('/auth/login', { email: email, senha: senha });
    localStorage.setItem('token', data.token);
    setUser(jwtDecode(data.token));
    navigate("/turmas");
  }

  async function loginWitthGoogle(response) {
    const { data } = await api.post('/auth/google', { token: response.credential });
    localStorage.setItem('token', data.token);
    setUser(jwtDecode(data.token));
    navigate("/turmas");
  }

  async function criarConta(data) {
    await api.post("/usuarios", data);
  }

  async function refreshUser() {
    const { data } = await api.get("/auth/me");
    localStorage.setItem('token', data.token);
    setUser(jwtDecode(data.token));
  }

  


  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWitthGoogle, logout, criarConta, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
