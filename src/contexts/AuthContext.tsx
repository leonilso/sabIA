import { createContext, useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({}); // opcional: buscar /me depois
    }
    setLoading(false);
  }, []);

  async function login(cpf, senha) {
    const { data } = await api.post('/auth/login', { cpf: cpf, senha: senha });
    localStorage.setItem('token', data.token);
    setUser(data.usuario);
    navigate("/turmas");
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
