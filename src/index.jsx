import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import { App } from "./todo/app";
import "todomvc-app-css/index.css";

const root = document.getElementById("root");

createRoot(root).render(
  <HashRouter>
    <Routes>
      <Route path="*" element={<App />} />
    </Routes>
  </HashRouter>
);
