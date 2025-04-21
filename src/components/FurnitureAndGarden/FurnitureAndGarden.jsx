
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../Card/Card';

export default function FurnitureAndGarden() {
  const listings = [
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/76ebfb196fcb4a49899f2a3a6f13ef0c-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/80556180ce3d4f3e8f135e86dec01f5a-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/c3c0b5b4de3a4134839658aa4fd44602-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/88fbd5e8983343e1821bed75f3f87f1c-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/08/b7a87d56c0d4409f9701bd2cae282655-.jpeg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
	];

	return (
		<section className="py-2 px-2 lg:px-0">
			<div className="container">
				<h1 className="text-2xl font-semibold mb-5 dark:text-gray-100">
        Popular in Furniture & Garden
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
