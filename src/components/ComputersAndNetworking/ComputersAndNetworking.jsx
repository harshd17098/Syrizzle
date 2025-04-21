import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../Card/Card';

export default function ComputersAndNetworking() {
	const listings = [
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/95e4314badb3487eb042793562f76df3-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/5c9549ec00fd40219d0b086dfa8f94d4-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/1853a4ce185d417994b06e44d0bd5316-.png?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/3542d0cb6fcb4e5981e8a49b6f2d2012-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/f707fd9c9c584810a441be7d0b467b9e-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
	];

	return (
		<section className="py-2 px-2 lg:px-0">
			<div className="container">
				<h1 className="text-2xl font-semibold mb-5 dark:text-gray-100">
                Popular in Computers & Networking
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
