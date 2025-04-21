import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Card/Card";

export default function SportsEquipment() {
	const listings = [
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/e2e9a24150d64a06a6611b7d074c0a4b-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/a29edfc2114e4c3489b6057c7e3082c2-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/07/03/3b5b504e621b4ae29b4cbc6a15643c11-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/f01c8cd007664f9f912622704e000235-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/43b0d847c1b645c684bccb7f0f576d94-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
	];

	return (
		<section className="py-2 px-2 lg:px-0 mb-10 lg:mb-0">
			<div className="container">
				<h1 className="text-2xl font-semibold mb-5 dark:text-gray-100">
					Popular in Sports Equipment
				</h1>
				<Swiper
					spaceBetween={10}
					autoplay={{ delay: 5000 }}
					pagination={{ clickable: true }}
					breakpoints={{
						// when window width is <= 640px
						400: {
							slidesPerView: 2, // Show 2 slides on mobile
						},
						// when window width is <= 768px
						768: {
							slidesPerView: 3,
						},
						// when window width is <= 1024px
						1024: {
							slidesPerView: 5,
						},
					}}
				>
					{listings?.map((item, index) => (
						<SwiperSlide className="mb-10" key={index + 5}>
							<Card item={item} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
