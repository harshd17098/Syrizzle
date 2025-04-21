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

const data = [
	{
		categoryImage: motors,
		categoryName: "Motors",

		subcategories: [
			"Cars",
			"Motorcycles",
			"Auto Accessories & Parts",
			"Heavy Vehicles",
		],
	},
	{
		categoryImage: rentProperty,
		categoryName: "Property for Rent",
		subcategories: [
			"Residential Units for Rent",
			"Commercial for Rent",
			"Rooms for rent (flatmates)",
			"Short Term (Monthly)",
		],
	},
	{
		categoryImage: saleProperty,
		categoryName: "Property for Sale",
		subcategories: [
			"Residential for Sale",
			"Commercial for Sale",
			"Land for Sale",
			"Multiple Units for Sale",
		],
	},
	{
		categoryImage: classiFields,
		categoryName: "Classifieds",
		subcategories: [
			"Electronics",
			"Computers & Networking",
			"Clothing & Accessories",
			"Jewelry & Watches",
		],
	},
	{
		categoryImage: jobs,
		categoryName: "Jobs",
		subcategories: [
			"Accounting / Finance",
			"Engineering",
			"Sales / Business Development",
			"Secretarial / Front Office",
		],
	},
	{
		categoryImage: community,
		categoryName: "Community",
		subcategories: [
			"Freelancers",
			"Home Maintenance",
			"Other Services",
			"Tutors & Classes",
		],
	},
	{
		categoryImage: industry,
		categoryName: "Business & Industrial",
		subcategories: [
			"Businesses for Sale",
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
			"Mobile Phones",
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
