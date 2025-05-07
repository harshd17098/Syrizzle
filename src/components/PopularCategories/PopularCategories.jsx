import motors from "../../assets/icons/motor.svg";
import rentProperty from "../../assets/icons/rent-property.svg";
import saleProperty from "../../assets/icons/sale-property.svg";
import classiFields from "../../assets/icons/classifields.svg";
import jobs from "../../assets/icons/jobs.svg";
import community from "../../assets/icons/community.svg";
import furniture from "../../assets/icons/furniture.svg";
import mobile from "../../assets/icons/mobile.svg";
import industry from "../../assets/icons/industri.svg";
import homeApplience from "../../assets/icons/home-applience.svg";
import SingleCategory from "./SingleCategory";
import { Link } from "react-router-dom";
import MotorsPage from "../../pages/cars/MotorsPage";

const data = [
	{
		categoryImage: motors,
		categoryName: <Link to={"/motors/"}>Motors</Link>,

		subcategories: [
			<Link to={"/motors/used-cars/"}>Cars</Link>,
			<Link to={"motors/rental-cars/"}>Rental Cars</Link>,
			<Link to={"/motors/new-cars/"}>New Cars</Link>,
			<Link to={"/motors/export-cars/"}>Export Cars</Link>
		],
	},
	{
		categoryImage: rentProperty,
		categoryName: <Link to={"/en/property-for-rent/"}>Property for Rent</Link>,
		subcategories: [
			<Link to={"/en/property-for-rent/residential/"}>Residential</Link>,
			<Link to={"/en/property-for-rent/commercial/"}>Commercial</Link>,
			<Link to={"/en/property-for-rent/rooms-for-rent-flatmates/"}>Rooms For Rent</Link>,
			<Link to={"/en/property-for-rent/short-term/"}>Monthly Short Term</Link>
		],
	},
	{
		categoryImage: saleProperty,
		categoryName: "Property for Sale",
		subcategories: [
			"Residential for Sale",
			"Commercial for Sale",
			<Link to={"/new-projects/residential/"}>New Projects</Link>,
		    <Link to={"/en/property-for-sale/off-plan/residential/"}>Off-Plan</Link>,
		],
	},
	{
		categoryImage: classiFields,
		categoryName: "Classifieds",
		subcategories: [
			<Link to={"/classified/electronics/"}> Electronics </Link>,
			<Link to={"/classified/computers-networking/"}> Computers & Networking </Link>,
			<Link to={"/classified/clothing-accessories/"}> Clothing & Accessories </Link>,
			<Link to={"/classified/jewelry-watches/"}> Jewelry & Watches </Link>,
		],
	},
	{
		categoryImage: jobs,
		categoryName: "Jobs",
		subcategories: [
			<Link to={"/jobs/accounting-finance/"}>Accounting / Finance</Link>,
			<Link to={"/jobs/engineering/"}>Engineering</Link>,
			<Link to={"/jobs/sales-business-development/"}>Sales / Business Development</Link>,
			<Link to={"/jobs/secretarial-front-office/"}>Secretarial / Front Office</Link>,
		],
	},
	{
		categoryImage: community,
		categoryName: "Community",
		subcategories: [
			<Link to={"/community/freelancers/"}>Freelancers</Link>,
			"Home Maintenance",
			"Other Services",
			"Tutors & Classes",
		],
	},
	{
		categoryImage: industry,
		categoryName: "Business & Industrial",
		subcategories: [
			<Link to={"/classified/business-industrial/businesses-for-sale/"}>Businesses for Sale</Link>,
			"Construction",
			"Food & Beverage",
			"Industrial Supplies",
		],
	},
	{
		categoryImage: homeApplience,
		categoryName: "Home Appliances",
		subcategories: [
			"Large Appliances / White Goods",
			"Small Kitchen Appliances",
			"Outdoor Appliances",
			"Small Bathroom Appliances",
		],
	},
	{
		categoryImage: furniture,
		categoryName: "Furniture, Home & Garden",
		subcategories: [
			"Furniture",
			"Home Accessories",
			"Garden & Outdoor",
			"Lighting & Fans",
		],
	},
	{
		categoryImage: mobile,
		categoryName: "Mobile Phones & Tablets",
		subcategories: [
			<a>"Mobile Phones"</a>,
			"Mobile Phone & Tablet Accessories",
			"Tablets",
			"Other Mobile Phones & Tablets",
		],
	},
];

export default function PopularCategories() {
	return (
		<section className="my-5 hidden lg:block">
			<div className="container">
				<h1 className="text-2xl font-semibold mb-4 dark:text-gray-100">Popular Catogories</h1>
				<div className=" lg:grid lg:grid-cols-5 gap-y-4 gap-x-3">
					{data?.map((category, index) => (
						<SingleCategory key={index + 1} category={category} />
					))}
				</div>
			</div>
		</section>
	);
}
