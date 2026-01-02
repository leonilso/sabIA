import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
