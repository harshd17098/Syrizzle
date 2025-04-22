import Banner from "../components/Banner/Banner";
import Cars from "../components/Cars/Cars";
import ComputersAndNetworking from "../components/ComputersAndNetworking/ComputersAndNetworking";
import DownloadApp from "../components/DownloadApp/DownloadApp";
import FurnitureAndGarden from "../components/FurnitureAndGarden/FurnitureAndGarden";
import MobileAndTablets from "../components/MobileAndTablets/MobileAndTablets";
import PopularCategories from "../components/PopularCategories/PopularCategories";
import ResidenttialForRent from "../components/ResidentialForRent/ResidenttialForRent";
import ResidentialForSale from "../components/ResidentialForSale/ResidentialForSale";
import RoomsForRent from "../components/RoomsForRent/RoomsForRent";
import SportsEquipment from "../components/SportsEquipment/SportsEquipment";
import VerifiedUser from "../components/VerifiedUser/VerifiedUser";

export default function HomePage() {
	return (
		<>
			<Banner />
			<PopularCategories />
			<VerifiedUser />
			<ResidenttialForRent />
			<Cars />
			<FurnitureAndGarden />
			<ResidentialForSale />
			<ComputersAndNetworking />
			<MobileAndTablets />
			<RoomsForRent />
			<SportsEquipment />
			<DownloadApp />
		</>
	);
}
