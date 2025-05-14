import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import HomePage from "./pages/HomePage";
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
import FreelancersPage from "./pages/Community/FreelancersPage";
import NetworkingPage from "./pages/Classified/NetworkingPage";
import AccessoriesPages from "./pages/Classified/AccessoriesPage";
import WatchesPage from "./pages/Classified/WatchesPage";
import BusinessesPage from "./pages/Industrial/Businesses";
import Profile from "./components/Menu/Profile";
import MyAddresses from "./components/Menu/MyAddresses";
import PhoneNumber from "./components/Menu/PhoneNumber";
import SecuritySettings from "./components/Menu/SecuritySettings";
import HelpPage from "./components/Menu/CustomerSupport/HelpPage";
import ChangePassword from "./components/Menu/ChangePassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import AdPostCity from "./components/PlaceYourAd/City/AdPostCity";
import ListingPage from "./components/PlaceYourAd/listing/ListingPage";
import MotorListingPage from "./components/PlaceYourAd/MotorListing/MotorListingPage";
import CarCategorys from "./components/PlaceYourAd/CarCategory/CarCategorys";
import CarEdit from "./components/PlaceYourAd/CarCategory/CarEdit";
import CategoryMotorCycles from "./components/PlaceYourAd/Motorcycles/categoryMotorcycles/CategoryMotorcycles";
import SportBike from "./components/PlaceYourAd/Motorcycles/SportBike/SportBike";
import HyperSportsForm from "./components/PlaceYourAd/Motorcycles/SportBike/HyperSports/HyperSportsForm";

export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* Render Navbar and Footer for all routes except AdPostCity */}
        <Routes>
          {/* Routes that render Navbar and Footer */}
          <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
          <Route path="/motors/used-cars/" element={<><Navbar /><MotorsPage /><Footer /></>} />
          <Route path="/motors/rental-cars/" element={<><Navbar /><RentalCarsPages /><Footer /></>} />
          <Route path="en/property-for-rent/residential/" element={<><Navbar /><Residentialpage /><Footer /></>} />
          <Route path="/motors/" element={<><Navbar /><FeaturedMotors /><Footer /></>} />
          <Route path="/motors/export-cars/" element={<><Navbar /><ExportsCarsPages /><Footer /></>} />
          <Route path="/motors/new-cars/" element={<><Navbar /><NewCarsPages /><Footer /></>} />
          <Route path="/motors/used-cars/" element={<><Navbar /><MotorsPage /><Footer /></>} />
          <Route path="/fullgallery" element={<><Navbar /><FullGallery /><Footer /></>} />
          <Route path="/gallery" element={<><Navbar /><AllImagesGallery /><Footer /></>} />
          <Route path="/en/property-for-rent/commercial/" element={<><Navbar /><CommercialPages /><Footer /></>} />
          <Route path="/en/property-for-rent/short-term/" element={<><Navbar /><MonthlyPages /><Footer /></>} />
          <Route path="/en/property-for-rent/" element={<><Navbar /><PropertyForRentPage /><Footer /></>} />
          <Route path="/en/property-for-rent/rooms-for-rent-flatmates/" element={<><Navbar /><RoomsforRentPage /><Footer /></>} />
          <Route path="/new-projects/residential/" element={<><Navbar /><LandForSalePage /><Footer /></>} />
          <Route path="/en/property-for-sale/off-plan/residential/" element={<><Navbar /><OffPlanePage /><Footer /></>} />
          <Route path="/jobs/accounting-finance/" element={<><Navbar /><AccountingPage /><Footer /></>} />
          <Route path="/jobs/engineering/" element={<><Navbar /><EngineeringPage /><Footer /></>} />
          <Route path="/jobs/sales-business-development/" element={<><Navbar /><BusinessDevelopmentPage /><Footer /></>} />
          <Route path="/jobs/secretarial-front-office/" element={<><Navbar /><FrontOfficePage /><Footer /></>} />
          <Route path="/classified/jewelry-watches/" element={<><Navbar /><WatchesPage /><Footer /></>} />
          <Route path="/classified/computers-networking/" element={<><Navbar /><NetworkingPage /><Footer /></>} />
          <Route path="/classified/clothing-accessories/" element={<><Navbar /><AccessoriesPages /><Footer /></>} />
          <Route path="/classified/electronics/" element={<><Navbar /><ElectronicsPage /><Footer /></>} />
          <Route path="/community/freelancers/" element={<><Navbar /><FreelancersPage /><Footer /></>} />
          <Route path="/classified/business-industrial/businesses-for-sale/" element={<><Navbar /><BusinessesPage /><Footer /></>} />
          <Route path="/settings/profile" element={<><Navbar /><Profile /><Footer /></>} />
          <Route path="/settings/profile/my-address" element={<><Navbar /><MyAddresses /><Footer /></>} />
          <Route path="/settings/account" element={<><Navbar /><PhoneNumber /><Footer /></>} />
          <Route path="/settings/security" element={<><Navbar /><SecuritySettings /><Footer /></>} />
          <Route path="/hc/en-us/requests/new" element={<><Navbar /><HelpPage /><Footer /></>} />
          <Route path="/settings/security/password_edit/reset-password/:token" element={<><Navbar /><ChangePassword /><Footer /></>} />
          <Route path="/settings/security/password_edit/en/user/auth/reset/:token" element={<><Navbar /><ForgotPassword /><Footer /></>} />

          {/* Route for AdPostCity that excludes Navbar and Footer */}
          <Route path="/place-an-ad/pick-a-city/" element={<AdPostCity />} />
          <Route path="/place-an-ad/pick-a-category/" element={<ListingPage />} />
          <Route path="/place-an-ad/taxonomy/motors/" element={<MotorListingPage />} />
          <Route path="/place-an-ad/motors/used-cars/new/" element={<CarCategorys />} />
          <Route path="/place-an-ad/motors/used-cars/new/edit/" element={<CarEdit />} />

          {/* MotorCycles */}
          <Route path="/place-an-ad/taxonomy/motors/motorcycles/" element={<CategoryMotorCycles />} />
          <Route path="/place-an-ad/taxonomy/motors/motorcycles/sport-bike/:categoryId" element={<SportBike />} />
          <Route path="/place-an-ad/motors/motorcycles/sport-bike/hyper-sports/new/:subCategoryId" element={<HyperSportsForm/>}/>


        </Routes>
      </BrowserRouter>
    </>
  );
}
