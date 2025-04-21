import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../Card/Card';

export default function RoomsForRent() {
	const listings = [
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/05/0f8e19434e3c403bb7f88ba6ac8d913c-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/06/13/f6f753036a7547cab243baf6c549eb0b-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/09/29/2dcc2fa34943457aba0439dfa846b995-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/d3e8b117405b4e3e91ba55ca6006c240-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/09/29/ae06c0d0669c4c968dbbeddf9a44fc5d-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
	];

	return (
		<section className="py-2 px-2 lg:px-0">
			<div className="container">
				<h1 className="text-2xl font-semibold mb-5 dark:text-gray-100">
                Popular in Rooms for Rent
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
