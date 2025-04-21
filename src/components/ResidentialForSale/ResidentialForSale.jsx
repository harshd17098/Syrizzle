
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../Card/Card';

export default function ResidentialForSale() {
  const listings = [
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/10/04/e7c8591c-df5a-4c07-89c3-17e78f895974/d9af2b9d645c4cabae0c5db68382d72f-.jpg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/09/21/39d6c910-09e3-4bb9-97ed-4a2f6ef83644/664aa98b312c424f93e2694b79c70c6f-.jpg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/09/06/ab0dac27-f33d-4940-8e4a-18d0bbbaa840/bc4d89c60e77411bb2aaf91929b0845f-.jpg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/09/06/d7a4e1e4-f9c3-470d-a7b7-3d4be56d9647/c520e136159447d3a506c892db974118-.jpg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/09/06/95c6d4e8-7590-447f-8a65-d42c819c4047/d7d5c009cc444004a816956b6bc9b7b7-.jpg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
	];

	return (
		<section className="py-2 px-2 lg:px-0">
			<div className="container">
				<h1 className="text-2xl font-semibold mb-5 dark:text-gray-100">
        Popular in Residential for Sale
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
