import { Route, Routes } from "react-router-dom";
import SignTest from "./pages/signtest.tsx";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<SignTest />} />
		</Routes>
	);
}
