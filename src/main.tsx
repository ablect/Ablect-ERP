import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/theme.css";
import { AuthProvider } from "./auth/AuthContext";
import SystemGate from "./SystemGate";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SystemGate />
    </AuthProvider>
  </StrictMode>,
);
