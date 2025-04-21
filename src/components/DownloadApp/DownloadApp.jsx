import mobileScreen from "../../assets/mobile-screen.png";
import playStore from "../../assets/google-play.png";
import appStore from "../../assets/app-store.png";
import appGalley from "../../assets/appgallery.svg";

const DownloadApp = () => {
	return (
		<section className="mt-5 px-2 lg:px-0 hidden lg:block">
			<div className="container">
				<div className="flex flex-col lg:flex-row justify-between ">
					<div className="mb-4 lg:mb-0">
						<h2 className="text-xl font-semibold dark:text-gray-100">
							Find amazing deals on the go.
						</h2>
						<h2 className="text-xl font-semibold text-primary-500">
							Download the app now!
						</h2>
					</div>
					<div className="bg-[#f6f7f8] dark:bg-black/10 flex flex-col lg:flex-row px-3 mb-24 lg:mb-0 py-5 lg:py-0 rounded-md">
						<img className="hidden lg:inline-block" src={mobileScreen} alt="mobile-screen" />
						<div className="flex flex-col lg:flex-row items-center lg:space-x-3 space-y-5 lg:space-y-0">
							<a href="#">
								<img className="w-44 lg:w-36" src={appStore} alt="" />
							</a>
							<a href="#">
								<img className="w-44 lg:w-36" src={playStore} alt="" />
							</a>
							<a href="#">
								<img className="w-44 lg:w-36" src={appGalley} alt="" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DownloadApp;
