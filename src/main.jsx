import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "@/application/contexts/AuthContext";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  //</StrictMode>
);
