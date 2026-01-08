// PremiumRoute.jsx
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import PremiumModal from "../components/PremiumModal";
import { useModal } from "../contexts/ModalContext";
import { useRef } from "react";

export default function PremiumRoute({ children }) {
  const { user, refreshUser } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const { openModal } = useModal();
  const [checking, setChecking] = useState(true);
  const [hasPremium, setHasPremium] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || checked) return; 
    async function check() {
      if (!user) {
        setHasPremium(false);
        setChecking(false);
        return;
      }

      // força atualizar o status
      await refreshUser();
      console.log(user?.statusAssinatura)
      setHasPremium(user?.statusAssinatura);
      setChecking(false);
      setChecked(true);
    }

    check();
  }, [user, checked]);

  if (checking) return null; // ou loading spinner

  if (!hasPremium) {
    openModal(<PremiumModal />);
    return <Navigate to="/compre-premium" />;
  }

  return children;
}

