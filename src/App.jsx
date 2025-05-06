import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import router from "./routes/router";
import HomePage from "./pages/HomePage";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import MotorsPage from "./pages/cars/MotorsPage";
import RentalCarsPages from "./pages/cars/RentalCarsPages";
import FeaturedMotors from "./pages/cars/FeaturedMotors";
import NewCarsPages from "./pages/cars/NewCarsPages";
import AllImagesGallery from "./components/CarsFilter/AllImagesGallery";
import FullGallery from "./components/CarsFilter/FullGallery";
import ExportsCarsPages from "./pages/cars/ExportsCarsPages";
import Residentialpage from "./pages/rent/ResidentialPage";
import CommercialPages from "./pages/rent/CommercialPage";
import MonthlyPages from "./pages/rent/MonthlyPage";
import PropertyForRentPage from "./pages/rent/PropertyForRentPage";
import RoomsforRentPage from "./pages/rent/RoomsforRentPage";
import LandForSalePage from "./pages/Sale/NewProjects";
import OffPlanePage from "./pages/Sale/OffPlanePage";
import AccountingPage from "./pages/Jobs/AccountingPage";
import EngineeringPage from "./pages/Jobs/EngineeringPage";
import BusinessDevelopmentPage from "./pages/Jobs/BusinessDevelopmentPage";
import FrontOfficePage from "./pages/Jobs/FrontOfficePage";
import ElectronicsPage from "./pages/Classified/ElectronicsPage";

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
				<Route path="en/property-for-rent/residential/"element={<Residentialpage/>}></Route>
				<Route path="/motors/" element={<FeaturedMotors/>}></Route>
				<Route path="/motors/export-cars/"element={<ExportsCarsPages/>}></Route>
				<Route path="/motors/new-cars/" element={<NewCarsPages/>}></Route>
				<Route path="/motors/used-cars/" element={<MotorsPage />} />
				<Route path="/fullgallery" element={<FullGallery />} />
				<Route path="/gallery" element={<AllImagesGallery />} />
				<Route path="/en/property-for-rent/commercial/" element={<CommercialPages/>}></Route>
				<Route path="/en/property-for-rent/short-term/" element={<MonthlyPages/>}></Route>
				<Route path="/en/property-for-rent/"element={<PropertyForRentPage/>}></Route>
				<Route path="/en/property-for-rent/rooms-for-rent-flatmates/"element={<RoomsforRentPage/>}></Route>
				<Route path="/new-projects/residential/"element={<LandForSalePage/>}></Route>
				<Route path="/en/property-for-sale/off-plan/residential/"element={<OffPlanePage/>}></Route>

				<Route path="/jobs/accounting-finance/" element={<AccountingPage/>}></Route>
				<Route path="/jobs/engineering/" element={<EngineeringPage/>}></Route>
				<Route path="/jobs/sales-business-development/" element={<BusinessDevelopmentPage/>}></Route>
				<Route path="/jobs/secretarial-front-office/" element={<FrontOfficePage/>}></Route>


				<Route path="/classified/electronics/" element={<ElectronicsPage/>}></Route>

			</Routes>
			<Footer/>
			</BrowserRouter>
		</>
	);
}
