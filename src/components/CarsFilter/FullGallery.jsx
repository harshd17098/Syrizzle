import { ChevronLeft, ImageIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CarDetailsSection from "./CarDetailsSection";

const images = [
    'https://dbz-images.dubizzle.com/images/2025/04/10/b969c1504814481aacc9f52ef8ac88fe-.jpeg?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/0354b09d03074935a90ecf124335c09b-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/31ec614e55014ce3b8ef7502bf63d8f4-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/3c8eda3d0f614a42a9a972867b7a615f-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/cb6796f5c31c4e20a07b287808703437-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/ce4f8fb5fddf41f6aaf9fe4a9e3d2f84-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/a24052b180f14b68b93d3534a6a7dd7b-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/44f723cc065941b3a25f99f86c8d196c-.jpeg?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/ab90304bca4d451e9bf5a1005020376f-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/aa9edae1e950414a9645981722a27882-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/e34f3907d7444bdca00ec6c1030cba8b-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/e40badef5aa64597a479da496cf3c8a2-.webp?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/073d292cac9b492d86f255169d735ac5-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/0755c4536c5b4ac890eca36c7787f6bc-.webp?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/63b02bf87cb94662a24bc2f8e6217b88-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/93360ebc48c64b098b2d8ec722396f3b-.avif?impolicy=dpv',
    "https://dbz-images.dubizzle.com/images/2025/01/27/ceeec48d513a4cae946ae7646b3efd46-.webp?impolicy=dpv",
    'https://dbz-images.dubizzle.com/images/2025/01/27/479af7aa85b34791bfe1afef8d279f1e-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/333ec05bc90f45d8845ade3c850eb93c-.avif?impolicy=dpv',
    'https://dbz-images.dubizzle.com/images/2025/01/27/a5897837ca22457eb7490e0c1a050a23-.avif?impolicy=dpv'
];

const FullGallery = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="container m-auto">
                {/* Advertisement Banner */}
                <div className="align-bottom w-11/12 m-auto  justify-center bg-[#f1f1f1] rounded-lg overflow-hidden relative flex  items-center">
                    <img
                        src="https://static.dubizzle.com/frontend-web/listings/assets/ads/web_leaderboard_970x250.jpg"
                        alt="Advertisement"
                        className="w-full h-[250px]"
                    />
                    {/* <span className="absolute top-2 right-3 text-gray-500 text-sm">Advertisement</span>  */}
                </div>
                {/* Breadcrumb Header */}
                <div className="flex w-85% align-bottom justify-start pl-20  m-4">
                    <div className="bg-white w-85% gap-4 mt-4 space-y-4 ">
                        <div className="flex items-center flex-wrap gap-2 text-sm text-gray-700">
                            <ChevronLeft size={16} className="mr-1 text-[#4294FF]" />
                            <Link to="/motors/used-cars" className="flex items-center text-[#4294FF] font-semibold hover:text-white hover:bg-blue-500 hover:rounded-[20px] transition duration-200 px-2 py-1">
                                Back To Search
                            </Link>
                            <a href="/" className="text-black hover:underline cursor-pointer">UAE</a>
                            <a href="#" className="text-gray-400 cursor-pointer">›</a>
                            <a href="/motors" className="text-black hover:underline cursor-pointer">Motors</a>
                            <a href="#" className="text-gray-400 cursor-pointer">›</a>
                            <a href="/motors/used-cars" className="text-black hover:underline cursor-pointer">Cars</a>
                            <a href="#" className="text-gray-400 cursor-pointer">›</a>
                            <a href="/motors/used-cars" className="text-black hover:underline cursor-pointer">Volvo</a>
                            <a href="#" className="text-gray-400 cursor-pointer">›</a>
                            <a href="/motors/used-cars" className="text-black hover:underline font-medium cursor-pointer">S90</a>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex justify-center gap-4 mt-4">
                    <div className="w-[85%] space-y-4">
                        {/* Image Gallery */}
                        <div className="rounded-xl overflow-hidden">
                            <div className="grid grid-cols-3 rounded-[16px]">
                                <div
                                    className="col-span-2 relative flex items-center justify-center rounded-l-xl cursor-pointer"
                                    onClick={() => navigate("/gallery")}
                                >
                                    <img
                                        src={images[0]}
                                        alt="Main"
                                        className="h-full w-full object-contain p-1 rounded-xl"
                                    />
                                </div>
                                <div className="flex flex-col gap-0">
                                    <div
                                        className="h-1/2 flex items-center justify-center rounded-tr-xl cursor-pointer"
                                        onClick={() => navigate("/gallery")}
                                    >
                                        <img
                                            src={images[1]}
                                            alt="Rear"
                                            className="h-full w-full object-contain p-1 rounded-xl"
                                        />
                                    </div>
                                    <div
                                        className="relative h-1/2 flex items-center justify-center rounded-br-xl cursor-pointer"
                                        onClick={() => navigate("/gallery")}
                                    >
                                        <img
                                            src={images[2]}
                                            alt="Front"
                                            className="h-full w-full object-contain p-1 rounded-xl"
                                        />
                                        <div className="absolute bottom-5 right-5 bg-black/60 text-white text-sm px-3 py-1 rounded-md flex items-center gap-1">
                                            <ImageIcon size={10} /> {images.length}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Car Details Section */}
                        <CarDetailsSection />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FullGallery;
