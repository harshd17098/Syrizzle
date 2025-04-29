




const FeaturedMotors = () => {
    const subcategories = [
        { name: "Cars", count: "37,246", href: "/motors/used-cars/" },
        { name: "Number Plates", count: "4,522", href: "/motors/number-plates/" },
        { name: "Rental Cars", count: "1,128", href: "/motors/rental-cars/" },
        { name: "Motorcycles", count: "710", href: "/motors/motorcycles/" },
        { name: "Auto Accessories & Parts", count: "679", href: "/motors/auto-accessories-parts/" },
        { name: "Boats", count: "242", href: "/motors/boats/" },
        { name: "Heavy Vehicles", count: "226", href: "/motors/heavy-vehicles/" },
    ];
    const featuredListings = [
        {
            href: "/motors/used-cars/toyota/land-cruiser-79-series/2025/4/29/toyota-lc79-sc-at-40l-full-2025ym-2-088---24b9818e9de44f67b79e2192466934a5/",
            image: "https://dbz-images.dubizzle.com/images/2025/04/29/5964a2ec3c834d7c98f4f1d3b3490921-.jpeg?impolicy=carousel",
            price: "AED 195,000",
            title: "TOYOTA LC79 SC AT 4.0L FULL 2025YM تويوتا بيك اب غمارة ونش دفلوك رفارف بنزين فل",
            yearKm: "Year: 2025 • KM: 0",
            location: "Ras Al Khor Industrial 3",
            time: "13 minutes ago",
        },
        {
            href: "/motors/used-cars/mercedes-benz/g-class/2024/5/22/mercedes-g63-amg-2022-gmanufaktur-japanese-2-413---8552871cbf65474384f2b740d16544dd/",
            image: "https://dbz-images.dubizzle.com/images/2024/05/22/b6bc457908b64d42b4137c14c2a1e890-.heic?impolicy=carousel",
            price: "AED 650,000",
            title: "Mercedes G63 AMG 2022 Gmanufaktur Japanese Specs",
            yearKm: "Year: 2022 • KM: 14,000",
            location: "Ras Al Khor",
            time: "22 minutes ago",
        },
        {
            href: "/motors/used-cars/mercedes-benz/s-class/2025/4/16/mercedes-s-550-2015-japanese-specs-2-611---c0dcfa91b2dc4b5aa89d63bf075a4eb0/",
            image: "https://dbz-images.dubizzle.com/images/2025/04/16/aad05207b2794247a1c0190891c10505-.jpeg?impolicy=carousel",
            price: "AED 165,000",
            title: "Mercedes S 550 2015 Japanese Specs",
            yearKm: "Year: 2015 • KM: 45,000",
            location: "Ras Al Khor",
            time: "24 minutes ago",
        },
        {
            href: "/motors/used-cars/toyota/fortuner/2025/4/29/toyouta-fortuner-2015-exr-v4-gcc-first-own-12-178---125da6755cfa436f84fc231e3447805d/",
            image: "https://dbz-images.dubizzle.com/images/2025/04/29/ceb5c48749bb4e0ca7a0362204191582-.jpeg?impolicy=carousel",
            price: "AED 49,000",
            title: "Toyouta Fortuner-2015-EXR-V4-GCC-First Owner-Very Good condition",
            yearKm: "Year: 2015 • KM: 170",
            location: "Souq Al Haraj / Tasjeel Village",
            time: "31 minutes ago",
        },
        {
            href: "/motors/used-cars/mercedes-benz/s-class/2025/4/29/mercedes-benz-s-class-s500-4-matic-2022-mo-12-208---dae8b35fe05f4c36b3a6c26d0e784855/",
            image: "https://dbz-images.dubizzle.com/images/2025/04/29/dc908207af6948dc9325a79e884ab207-.jpeg?impolicy=carousel",
            price: "AED 335,000",
            title: "Mercedes-Benz S-Class S500 4 MATIC -2022 Model - GCC Specifications - Under warranty",
            yearKm: "Year: 2022 • KM: 28,000",
            location: "Souq Al Haraj / Tasjeel Village",
            time: "35 minutes ago",
        },
    ];
    const testimonials = [
        {
            text: "I've been using dubizzle now for 10 years, I've literally lost count of the number cars I've bought and sold from it. Its become so addictive, I tend to log-on most days - planning the next car is both fast & fun.",
            name: "Sean Cain",
            image: "https://static.dubizzle.com/frontend-web/static-resources/assets/vertical-homepage/Sean.png",
        },
        {
            text: 'CarReport recently saved me a trip to Oman for a car I was seriously looking at where the friendly seller claimed "no accidents". However for 99 dirhams and 2 minutes online, CarReport revealed 4 accidents on the car’s history.',
            name: "Ed Surgeon",
            image: "https://static.dubizzle.com/frontend-web/static-resources/assets/vertical-homepage/EdSurgeon.png",
        },
        {
            text: "Put my Hyundai Coupe up for sale on @dubizzle. Got a call within an hour and sold within the same day",
            name: "Hitesh Uchil",
            image: "https://static.dubizzle.com/frontend-web/static-resources/assets/vertical-homepage/Hitesh.png",
        },
    ];
    return (
        <>
            <section className="FeaturedMotors">
                <div className="container" style={{ padding: "0px 8px" }}>



                    <div className="w-full">
                        {/* Background with centered content */}
                        <div
                            className="relative w-full h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-white px-4"
                            style={{
                                backgroundImage:
                                    "url('https://static.dubizzle.com/frontend-web/static-resources/assets/vertical-homepage/motors-bg.png')",
                                marginTop: "20px",
                                borderRadius: "8px",
                                marginBottom: "20px"
                            }}
                        >
                            {/* Heading */}
                            <h1 className="text-3xl font-semibold text-center mb-6 drop-shadow-lg">
                                Everyone is on dubizzle! Are you?
                            </h1>

                            {/* Search Form */}
                            <form className="w-full max-w-xl">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search for motors"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                    >
                                        <img
                                            src="https://static.dubizzle.com/frontend-web/static-resources/assets/hero-search-box/search.svg"
                                            alt="Search"
                                            width="18px"
                                            height="18px"
                                        />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <section className="flex p-4">
                        {subcategories.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="no-underline flex-1"
                                style={{ marginRight: '10px' }}
                            >
                                <div
                                    className="rounded-lg bg-white p-4 hover:shadow-lg transition-shadow duration-200 inline-block"
                                    style={{
                                        minWidth: "152px",
                                        width: "auto",
                                        boxShadow:
                                            "rgba(0, 0, 0, 0.1) 0px 3px 5px -1px, rgba(0, 0, 0, 0.07) 0px 5px 8px, rgba(0, 0, 0, 0.06) 0px 1px 14px",
                                    }}
                                >
                                    <div>
                                        <p
                                            className="text-gray-800 font-semibold mb-5"
                                            style={{
                                                fontSize: "12px",
                                                textAlign: "center",
                                                color: "rgb(107, 109, 112)",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {item.name}
                                        </p>
                                        <p
                                            className="text-gray-600"
                                            style={{ fontSize: "24px", textAlign: "center" }}
                                        >
                                            {item.count}
                                        </p>
                                    </div>
                                </div>
                            </a>


                        ))}
                    </section>
                    <div
                        id="dfp-leaderboard"
                        className="bg-none"
                        data-ad-batch="1"
                        style={{ backgroundImage: 'none' }}
                    >
                        <div
                            id="google_ads_iframe_1000931/dubizzle_desktop/motors_homepage_0__container__"
                            className="border-0"
                        >
                            <iframe
                                id="google_ads_iframe_1000931/dubizzle_desktop/motors_homepage_0"
                                name="google_ads_iframe_1000931/dubizzle_desktop/motors_homepage_0"
                                title="3rd party ad content"
                                width="970"
                                height="250"
                                scrolling="no"
                                marginWidth="0"
                                marginHeight="0"
                                frameBorder="0"
                                aria-label="Advertisement"
                                tabIndex="0"
                                allow="private-state-token-redemption;attribution-reporting"
                                data-load-complete="true"
                                data-google-container-id="1"
                                className="border-0 align-bottom"
                            ></iframe>
                        </div>
                    </div>

                    <section className=" py-6">
                        <p className=" font-semibold " style={{ fontSize: "24px" }}>Featured Listings</p>
                        <div className="flex flex-row justify-evenly gap-4 py-6">
                            {featuredListings.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="bg-white rounded-lg transition duration-200 hover:shadow-[0_6px_24px_0_rgba(0,0,0,0.12)] no-underline"
                                    style={{ width: "212px", minWidth: "228px", padding: "10px" }}
                                >
                                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="object-cover w-full h-full"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="">
                                        <p className="text-red-600 font-bold mb-2" style={{ marginTop: "10px" }}>{item.price}</p>
                                        <div className="mb-2">
                                            <p className="text-sm font-medium truncate" style={{ fontWeight: "600" }}>{item.title}</p>
                                            <p className=" text-gray-600" style={{ fontSize: "14px" }}>{item.yearKm}</p>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>{item.location}</span>
                                            <span>{item.time}</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>


                    </section>
                    <div className="flex flex-row items-center justify-between gap-40 border border-[#ebeced] rounded-lg bg-gradient-to-r from-[#ffedea] to-white p-2.5  overflow-hidden relative" style={{ height: "116px" }}>
                        {/* Decorative empty divs if needed */}
                        <div className="hidden md:block rounded-full w-[131px] h-[131px] bg-[rgb(240,128,128)] absolute z-0 left-[-46px] top-[-65px] opacity-20" />
                        <div className="absolute w-22.5 h-22.5 bg-[#ea5656] rounded-full left-[-26px] top-[-44px] opacity-20 z-0 hidden md:block"></div>

                        {/* Main content */}
                        <div className="flex items-center gap-6">
                            <img
                                src="https://static.dubizzle.com/frontend-web/static-resources/assets/value-added-service/car-inspection-checklist.svg"
                                alt="Car Inspection"
                                width="75"
                                height="150"
                                className="object-contain"
                            />
                            <div className="max-w-md">
                                <div className="flex flex-wrap text-lg font-semibold text-gray-800 mb-1">
                                    <p className="mr-1" style={{ color: "red", fontSize: "20px" }}>Car Inspection,</p>
                                    <p style={{ fontSize: "20px" }}>Hassle Free!</p>
                                </div>
                                <p className="text-sm text-black-600" style={{ width: "636px" }}>
                                    Buy with confidence and avoid costly surprises with dubizzle's car inspections,
                                    helping you negotiate better deals every time.
                                </p>
                            </div>
                        </div>

                        {/* Button */}
                        <div>
                            <button
                                type="button"
                                className="bg-red-600 hover:bg-red-800 text-white px-5 py-2 rounded-md text-sm font-medium transition duration-200"
                                style={{ width: "374px" }}      >
                                Book Inspection
                            </button>
                        </div>
                    </div>



                    <section className="px-4 py-12 bg-gray-50">
                        <h2 className="text-2xl font-semibold mb-8 ">Testimonials</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {testimonials.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
                                >
                                    <p className="text-gray-700 mb-4">
                                        <span
                                            style={{
                                                color: 'rgb(204, 204, 204)',
                                                fontSize: '58px',
                                                lineHeight: 0,
                                                verticalAlign: '-24px',
                                                marginRight: '4px',
                                            }}
                                        >
                                            “
                                        </span>
                                        {item.text}
                                        <span
                                            style={{
                                                color: 'rgb(204, 204, 204)',
                                                fontSize: '58px',
                                                lineHeight: 0,
                                                verticalAlign: '-24px',
                                                marginLeft: '4px',
                                            }}
                                        >
                                            ”
                                        </span>
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <span className="font-medium" style={{ color: "rgb(66, 148, 255)" }}>{item.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="w-full px-4  bg-gray-50" style={{ paddingTop: "25px" }}>
                        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 ">
                            {/* Text Content */}
                            <div className="w-max">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2 whitespace-nowrap">
                                    Find amazing deals on the go.
                                </h3>

                                <h4
                                    className="text-xl text-red-700"
                                    style={{ fontWeight: "700", fontSize: "25px" }}
                                >
                                    Download the app now!
                                </h4>
                            </div>

                            {/* App Image + Store Buttons */}
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                {/* App Preview Image */}
                                <img
                                    src="https://static.dubizzle.com/frontend-web/listings/assets/homepage/app_download_preview.png"
                                    alt="App Preview"
                                    width="150"
                                    height="100"
                                    loading="lazy"
                                    className="object-contain"
                                />

                                {/* Store Links */}
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <a
                                        href="https://apps.apple.com/ae/app/dubizzle/id892172848?utm_source=web_banner"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="App Store"
                                    >
                                        <img
                                            src="https://static.dubizzle.com/frontend-web/listings/assets/homepage/apple-store.png"
                                            alt="App Store"
                                            width="186"
                                            height="45"
                                            loading="lazy"
                                            className="object-contain"
                                        />
                                    </a>
                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.dubizzle.horizontal&utm_source=web_banner"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Play Store"
                                    >
                                        <img
                                            src="https://static.dubizzle.com/frontend-web/listings/assets/homepage/google-play-store.png"
                                            alt="Play Store"
                                            width="186"
                                            height="45"
                                            loading="lazy"
                                            className="object-contain"
                                        />
                                    </a>
                                    <a
                                        href="https://appgallery.huawei.com/app/C100111087?utm_source=web_banner"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="App Gallery"
                                    >
                                        <img
                                            src="https://static.dubizzle.com/frontend-web/listings/assets/homepage/huawei-app-gallery.svg"
                                            alt="App Gallery"
                                            width="186"
                                            height="45"
                                            loading="lazy"
                                            className="object-contain"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            </section>
        </>
    )
}
export default FeaturedMotors;