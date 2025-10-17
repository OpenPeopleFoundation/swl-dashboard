import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import InvestorDashboard from "./pages/InvestorDashboard.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/investor" element={<InvestorDashboard />} />
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(<App />)


