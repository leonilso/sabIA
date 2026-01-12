import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/index"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ModalProvider } from './contexts/ModalContext'
import { ConfirmProvider } from './contexts/ConfirmContext'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider clientId="130730820982-mecjjdad8glppkpq4ch2o9iqidvb11kh.apps.googleusercontent.com">
          <TooltipProvider>
            <ModalProvider>
              <ConfirmProvider>
                <Toaster />
                <Sonner />
                <AppRoutes />
              </ConfirmProvider>
            </ModalProvider>
          </TooltipProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>

);

export default App;
