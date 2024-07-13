import NotFound from "@/pages/404.tsx";
import Home from "@/pages/Home.tsx";
import Playground from "@/pages/PlayGround.tsx";
import { Route, Routes } from "react-router-dom";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/playground" element={<Playground />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
