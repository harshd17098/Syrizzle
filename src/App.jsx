import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import router from "./routes/router";
import HomePage from "./pages/HomePage";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import MotorsPage from "./pages/MotorsPage";
import Residential from "./pages/ResidentialPage";
import RentalCarsPages from "./pages/RentalCarsPages";

export default function App() {
	return (
		<>
			{/* <RouterProvider router={router} /> */}
			<BrowserRouter>
			<Navbar/>
			<Routes>
				<Route path="/" element={<HomePage/>}></Route>
				<Route path='/motors/used-cars/' element={<MotorsPage/>}></Route>
				<Route path='/motors/rental-cars/' element={<RentalCarsPages/>}></Route>
				<Route path="en/property-for-rent/residential/"element={<Residential/>}></Route>
			</Routes>
			<Footer/>
			</BrowserRouter>
		</>
	);
}
