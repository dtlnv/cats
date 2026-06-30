import "./index.css";
import { Routes, Route } from "react-router-dom";
import { CatPage } from "@/pages/cat-page";
import { HomePage } from "@/pages/home-page";


export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cats/:id" element={<CatPage />} />
    </Routes>
  );
}

export default App;
