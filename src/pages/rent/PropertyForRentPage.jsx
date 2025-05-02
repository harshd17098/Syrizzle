import { useState, useEffect } from "react";
import PropertyRent from "../../components/Residential/PropertyRent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const propertyCategories = [
  {
    title: "Apartment for Rent",
    href: "/en/property-for-rent/residential/apartmentflat/",
    img: "https://static.dubizzle.com/property/desktop/latest/images/home/categories/apartment.jpg",
  },
  {
    title: "Villa for Rent",
    href: "/en/property-for-rent/residential/villahouse/",
    img: "https://static.dubizzle.com/property/desktop/latest/images/home/categories/villa.jpg",
  },
  {
    title: "Rooms for Rent",
    href: "/en/property-for-rent/rooms-for-rent-flatmates/",
    img: "https://static.dubizzle.com/property/desktop/latest/images/home/categories/rooms.jpg",
  },
  {
    title: "Monthly Short Term for Rent",
    href: "/en/property-for-rent/short-term/",
    img: "https://static.dubizzle.com/property/desktop/latest/images/home/categories/monthly-short.jpg",
  },
  {
    title: "Commercial for Rent",
    href: "/en/property-for-rent/commercial/",
    img: "https://static.dubizzle.com/property/desktop/latest/images/home/categories/commercial.jpg",
  },
  {
    title: "Daily Short Term for Rent",
    href: "/en/property-for-rent/short-term-daily/",
    img: "https://static.dubizzle.com/property/desktop/latest/images/home/categories/daily-short.jpg",
  },
];

const PropertyForRentPage = () => {
  const [activeTab, setActiveTab] = useState("Sale");

  useEffect(() => {
    // Wait for Swiper to init, useful for client-only navigation targeting
  }, []);

  const tabs = ["Sale", "Rent", "Off-Plan", "New Projects"];

  return (
    <section className="Re">
      <div className="container px-2">
        {/* Banner and Tabs */}
        <div className="relative flex justify-center mt-5 mb-5">
          <div
            className="w-[1152px] h-[342px] bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url(https://static.dubizzle.com/property/desktop/latest/images/home/new-homepage-banner.png)",
            }}
          >
            <h1 className="absolute top-[20%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold text-center">
              Everyone is on dubizzle
            </h1>

            <div className="flex items-center justify-center absolute mx-auto mb-6 h-10 rounded-full bg-[#2B2D2E] gap-4 flex-wrap top-[32%]"style={{left:"30%"}}>
              {tabs.map((tab) => (
                <a
                  key={tab}
                  href="#"
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-1.5 rounded-full font-medium transition-all ${
                    activeTab === tab
                      ? "bg-white text-red-600"
                      : "text-white"
                  }`}
                >
                  {tab}
                </a>
              ))}
            </div>

            <div className="absolute top-[45%] "style={{left:"16%"}}>
              <PropertyRent />
            </div>
          </div>
        </div>

        {/* Popular Categories Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 text-[27px]">
            Popular Categories
          </h3>
        </div>

        {/* Swiper with Custom Arrows */}
        <div className="relative">
          {/* Custom Arrows */}
          <div
            className="custom-prev"
            style={{
              position: "absolute",
              top: "50%",
              left: "-20px",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "40px",
              height: "40px",
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "20px", color: "#000" }}>&#10094;</span>
          </div>

          <div
            className="custom-next"
            style={{
              position: "absolute",
              top: "50%",
              right: "-20px",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "40px",
              height: "40px",
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "20px", color: "#000" }}>&#10095;</span>
          </div>

          {/* Swiper */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={5}
            loop={true}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-6"
          >
            {propertyCategories.map((category, index) => (
              <SwiperSlide key={index}>
                <a
                  href={category.href}
                  title={category.title}
                  className="block group relative overflow-hidden rounded-md shadow hover:shadow-lg transition"
                >
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white text-center py-2">
                    <h2 className="text-sm font-medium">{category.title}</h2>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PropertyForRentPage;
