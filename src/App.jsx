import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Ficha from "./pages/Ficha";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ficha" element={<Ficha />} />
    </Routes>
  );
}