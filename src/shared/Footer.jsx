import logoDark from "../assets/logo-grop-dark.svg";
import logoLight from "../assets/logo-groupname.png";
import cart from "../assets/cart-image.png"
export default function Footer() {
	const data = [
		{
			category: "Company",
			items: [
				"About Us",
				"Advertising",
				"Careers",
				"Terms of Use",
				"Privacy Policy",
			],
		},
		{
			category: "UAE",
			items: [
				"Dubai",
				"Abu Dhabi",
				"Ras Al Khaimah",
				"Sharjah",
				"Fujairah",
				"Ajman",
				"Umm Al Quwain",
				"Al Ain",
			],
		},
		{
			category: "Other Countries",
			items: [
				"Egypt",
				"Bahrain",
				"Saudi Arabia",
				"Lebanon",
				"Kuwait",
				"Oman",
				"Qatar",
				"Pakistan",
			],
		},
		{
			category: "Get Social",
			items: ["Facebook", "Twitter", "Youtube", "Instagram"],
		},
		{
			category: "Support",
			items: ["Help", "Contact Us", "Call Us"],
		},
		{
			category: "Languages",
			items: ["العربية"],
		},
	];

	return (
		<footer className="bg-[#f6f7f8] dark:bg-black/10 py-14 px-2 lg:px-0 hidden lg:block">
			<div className="container">
				<div className="grid lg:grid-cols-6 gap-5 pb-6">
					{data?.map((footerItem, index) => (
						<div key={index + 3}>
							<h3 className="text-base font-semibold mb-4 dark:text-gray-100">
								{footerItem?.category}
							</h3>
							<ul className="space-y-1">
								{footerItem.items.map((item, itemIndex) => (
									<li key={itemIndex + 4}>
										<a
											className="text-sm text-blue-600 hover:text-[#69bcfb] hover:underline dark:text-gray-400"
											href="#"
										>
											{item}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="flex justify-between pr-6">
					<div>
						<img className="w-32 dark:block hidden" src={logoDark} alt="" />
						<img className="w-32 dark:hidden block" src={logoLight} alt="" />
						<small className="text-gray-500">&copy; dubizzle.com {new Date().getFullYear()}, All Rights Reserved.</small>
					</div>
					<img className="w-36" src={cart} alt="cart-image" />
				</div>
			</div>
		</footer>
	);
}
