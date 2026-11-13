import React from "react";
import { createRoot } from "react-dom/client";
import Aplicacao from "./Aplicacao.jsx";
import "./estilos.css";
createRoot(document.getElementById("raiz")).render(
  <React.StrictMode>
    <Aplicacao />
  </React.StrictMode>,
);
