import verifiedBadge from "../../assets/icons/verified-badge.svg";

export default function VerifiedUser() {
	return (
		<section className="px-2 lg:px-0 my-8">
			<div className="container flex items-center lg:justify-between space-x-3 rounded-xl overflow-hidden bg-[#e8f1fd] dark:bg-[#e8f1fd]/40 pr-4">
				<div className="bg-[#d9e8fc]/80 dark:bg-[#e8f1fd]/40 py-12 lg:py-6 px-6">
					<img className="w-10" src={verifiedBadge} alt="verified-badge" />
				</div>
				<div className=" flex-shrink-0 flex-grow-1 pr-3 lg:basis-[80%]">
					<div className="">
						<h2 className="text-lg font-semibold dark:text-gray-100">Become a verified user</h2>
						<p className="text-gray-500 text-sm flex flex-col lg:flex-row lg:space-x-2 dark:text-gray-200">
							<span>Get more visibility</span>
							<span>Enhance your credibility</span>
						</p>
						<a className="text-blue-600 text-sm lg:hidden" href="#">
							Learn More
						</a>
					</div>
				</div>
				<button className="hidden lg:inline-block bg-white hover:bg-white text-black btn px-3 py-1 border-2 border-gray-300 rounded">
					Get Started
				</button>
			</div>
		</section>
	);
}
