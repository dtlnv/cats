import "./index.css";
import { Route, Routes } from "react-router-dom";
import { CatPage } from "@/pages/cat-page";
import { HomePage } from "@/pages/home-page";
import { FavsPage } from "./pages/favs-page";
import { RandomPage } from "./pages/random-page";

export function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/cat/:id" element={<CatPage />} />
			<Route path="/favs" element={<FavsPage />} />
			<Route path="/random" element={<RandomPage />} />
		</Routes>
	);
}

export default App;
