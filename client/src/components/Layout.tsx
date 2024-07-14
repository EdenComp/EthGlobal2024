import type { ReactElement, ReactNode } from "react";
import Footer from "./Layout/Footer";
import Navbar from "./Layout/Navbar";

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
	return (
		<div className="">
			<Navbar />
			<div className="min-h-screen flex flex-col">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
