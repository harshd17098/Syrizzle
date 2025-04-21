import motors from "../../assets/icons/motor.svg";
import rentProperty from "../../assets/icons/rent-property.svg";
import saleProperty from "../../assets/icons/sale-property.svg";
import classiFields from "../../assets/icons/classifields.svg";
import jobs from "../../assets/icons/jobs.svg";
import community from "../../assets/icons/community.svg";
import rentRoom from "../../assets/icons/rent-room.svg";
import furniture from "../../assets/icons/furniture.svg";
import mobile from "../../assets/icons/mobile.svg";
import inputSearch from "../../assets/icons/input-search.svg";

export default function Banner() {
	return (
		<section>
			<div className="container bg-none lg:bg-banner bg-cover bg-center bg-no-repeat lg:my-2 lg:pb-10 lg:pt-5 rounded-md ">
				<h1 className="text-2xl text-center font-semibold lg:text-white lg:mb-8 hidden lg:block">
					The best place to buy your house, sell your car or find a job in Dubai
				</h1>
				<div className="lg:bg-black lg:bg-opacity-50 rounded-md lg:p-4 lg:w-[88%] mx-auto">
					<div className="hidden lg:flex items-center space-x-14 mb-4">
						<span className="text-base font-semibold lg:text-white hidden lg:block">
							Searching in
						</span>
						<ul className="hidden lg:flex items-center space-x-2 text-sm">
							<li>
								<a
									className="hover:bg-primary-500 duration-200 text-white px-5 py-2 font-semibold rounded-full"
									href="#"
								>
									All
								</a>
							</li>
							<li>
								<a
									className="hover:bg-primary-500 duration-200 text-white px-5 py-2 font-semibold rounded-full"
									href="#"
								>
									Motors
								</a>
							</li>
							<li>
								<a
									className="hover:bg-primary-500 duration-200 text-white px-5 py-2 font-semibold rounded-full"
									href="#"
								>
									Classifields
								</a>
							</li>
							<li>
								<a
									className="hover:bg-primary-500 duration-200 text-white px-5 py-2 font-semibold rounded-full"
									href="#"
								>
									Property for Sale
								</a>
							</li>
							<li>
								<a
									className="hover:bg-primary-500 duration-200 text-white px-5 py-2 font-semibold rounded-full"
									href="#"
								>
									Property for Rent
								</a>
							</li>
							<li>
								<a
									className="hover:bg-primary-500 duration-200 text-white px-5 py-2 font-semibold rounded-full"
									href="#"
								>
									Jobs
								</a>
							</li>
							<li>
								<a
									className="hover:bg-primary-500 duration-200 text-white px-5 py-2 font-semibold rounded-full"
									href="#"
								>
									Community
								</a>
							</li>
						</ul>
					</div>
					<div className="lg:flex lg:space-x-3 px-2 lg:px-0 py-4 lg:py-0 relative">
						<input
							className="w-full p-4 lg:rounded-md rounded-full border border-gray-300/50 dark:border-gray-400/20 dark:bg-slate-800/40 dark:text-gray-300"
							placeholder="Search for anything"
							type="text"
							name="search"
							id="search"
						/>
						<img
							src={inputSearch}
							alt="input-search"
							className="hidden lg:inline-block absolute right-[190px] top-5 w-5 opacity-60 bg-white dark:bg-transparent dark:opacity-100" 
						/>
						<button>
							<img
								src={inputSearch}
								alt="input-search"
								className="absolute bottom-8 right-8 w-5 lg:hidden opacity-60"
							/>
							<input
								type="submit"
								value="Submit"
								className="btn px-12 hidden lg:inline-block py-4"
							/>
						</button>
					</div>
				</div>
			</div>

			<div className="container lg:hidden grid grid-cols-3 gap-2 px-2 py-3 text-center text-xs">
				<a
					className="flex flex-col space-y-1 items-center px-3 py-6 hover:underline rounded decoration-primary-500 border border-gray-300/40 dark:border-gray-400/30 shadow-sm"
					href="#"
				>
					<img className="w-5" src={motors} alt="motors-image" />
					<span className="dark:text-gray-100">Motors</span>
				</a>
				<a
					className="flex flex-col space-y-1 items-center px-3 py-6 hover:underline rounded decoration-primary-500 border border-gray-300/40 dark:border-gray-400/30 shadow-sm"
					href="#"
				>
					<img className="w-5" src={rentProperty} alt="rent-property-icon" />
					<span className="dark:text-gray-100">Property for Rent</span>
				</a>
				<a
					className="flex flex-col space-y-1 items-center px-3 py-6 hover:underline rounded decoration-primary-500 border border-gray-300/40 dark:border-gray-400/30 shadow-sm"
					href="#"
				>
					<img className="w-5" src={saleProperty} alt="propperty-sale-icon" />
					<span className="dark:text-gray-100">Property for Sale</span>
				</a>
				<a
					className="flex flex-col space-y-1 items-center px-3 py-6 hover:underline rounded decoration-primary-500 border border-gray-300/40 dark:border-gray-400/30 shadow-sm"
					href="#"
				>
					<img className="w-5" src={classiFields} alt="classifieds-icon" />
					<span className="dark:text-gray-100">Classifieds</span>
				</a>
				<a
					className="flex flex-col space-y-1 items-center px-3 py-6 hover:underline rounded decoration-primary-500 border border-gray-300/40 dark:border-gray-400/30 shadow-sm"
					href="#"
				>
					<img className="w-5" src={jobs} alt="jobs-icon" />
					<span className="dark:text-gray-100">Jobs</span>
				</a>
				<a
					className="flex flex-col space-y-1 items-center px-3 py-6 hover:underline rounded decoration-primary-500 border border-gray-300/40 dark:border-gray-400/30 shadow-sm"
					href="#"
				>
					<img className="w-5" src={community} alt="community-icon" />
					<span className="dark:text-gray-100">Community</span>
				</a>
				<a
					className="flex flex-col space-y-1 items-center px-3 py-6 hover:underline rounded decoration-primary-500 border border-gray-300/40 dark:border-gray-400/30 shadow-sm"
					href="#"
				>
					<img className="w-5" src={rentRoom} alt="rent-room-icon" />
					<span className="dark:text-gray-100">Rooms for rent (Flatemates)</span>
				</a>
				<a
					className="flex flex-col space-y-1 items-center px-3 py-6 hover:underline rounded decoration-primary-500 border border-gray-300/40 dark:border-gray-400/30 shadow-sm"
					href="#"
				>
					<img className="w-5" src={furniture} alt="furniture-icon" />
					<span className="dark:text-gray-100">Furniture, Home & Garden</span>
				</a>
				<a
					className="flex flex-col space-y-1 items-center px-3 py-6 hover:underline rounded decoration-primary-500 border border-gray-300/40 dark:border-gray-400/30 shadow-sm"
					href="#"
				>
					<img className="w-4" src={mobile} alt="mobile-icon" />
					<span className="dark:text-gray-100">Mobile Phone & Tablets</span>
				</a>
			</div>
		</section>
	);
}
