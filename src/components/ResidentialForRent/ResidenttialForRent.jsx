import Card from "../Card/Card";
import { SwiperSlide, Swiper } from "swiper/react";

export default function ResidenttialForRent() {
	const listings = [
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/09/28/e74c18fd-da75-4ece-9830-60b9dfa20f20/c67629ab4a9845798bf158d1794c1fec-.jpg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/09/28/3650755c-4410-4646-a106-84bf863a56e1/852079508915447cba515ace77f60e71-.jpg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/09/05/819aa803-d12f-401b-b475-d07158a7036b/8354dd5a400e42f6a56006af61bb919d-.jpg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/08/16/ddda890f-9491-4aca-b1eb-1a140d6f194c/e109a5b670f44c1185bcfb474f919c22-.jpg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
		{
			image:
				"https://dbz-images.dubizzle.com/images/2023/08/16/97a98927-1236-4a1b-8f8e-9547b0f722f9/8019993d491c460cb4c470ad35ee2335-.jpg?impolicy=legacy&imwidth=480",
			title: "4 Beds • 3 Baths",
			price: "AED 219,999",
			extension: "Elan, Tilal Al Ghaf",
		},
	];

	return (
		<section className="py-2 px-2 lg:px-0">
			<div className="container">
				<h1 className="text-2xl font-semibold mb-5 dark:text-gray-100">
					Popular in Residential for Rent
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
