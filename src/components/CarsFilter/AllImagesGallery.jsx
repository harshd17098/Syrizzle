import { Button } from "flowbite-react";
import { ArrowLeft, Heart, Phone, Share2 } from "lucide-react";
import React from "react";

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

const AllImagesGallery = ({ onBack }) => {
    const renderBlocks = () => {
        const blocks = [];
        let i = 0;

        while (i < images.length) {
            // Full-width image
            if (i < images.length) {
                blocks.push(
                    <img
                        key={`full-${i}`}
                        src={images[i]}
                        className="w-full rounded-xl mb-4"
                        alt={`Image ${i}`}
                    />
                );
                i++;
            }

            // Grid of next 4 images
            if (i < images.length) {
                const gridItems = images.slice(i, i + 4);
                blocks.push(
                    <div key={`grid-${i}`} className="grid grid-cols-2 gap-4 mb-4">
                        {gridItems.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`Image ${i + idx}`}
                                className="rounded-xl"
                            />
                        ))}
                    </div>
                );
                i += 4;
            }
        }

        return blocks;
    };

    return (
        <>
            <div className="container m-auto">
                <div className="flex justify-between items-center px-4 py-3 shadow-md border-b bg-white sticky top-0 z-50">
                    <button onClick={onBack} className="flex items-center gap-1">
                        <a href="/fullgallery"><ArrowLeft className="w-5 h-5" /></a>
                    </button>

                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-1 text-sm font-medium">
                            <Heart className="w-5 h-5" />
                            <span>Favorite</span>
                        </button>
                        <button className="flex items-center gap-1 text-sm font-medium">
                            <Share2 className="w-5 h-5" />
                            <span>Share</span>
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <div className="px-[20%] py-6">{renderBlocks()}</div>

                    {/* Fixed Dealer Info Card */}
                    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white px-4 py-2 rounded-2xl shadow-md flex items-center gap-4 max-w-[90%]">
                        {/* Logo */}
                        <img
                            src="https://dbz-images.dubizzle.com/profiles/auto_agency/2024/07/31/7ddf8adb9a8a44cfb4857c30ab813a36-.jpg?impolicy=agency"
                            alt="Dealer Logo"
                            className="w-20 h-20 rounded-xl object-contain"
                        />

                        {/* Dealer Name */}
                        <span className="text-lg font-medium">Park Lane Motors</span>

                        {/* Spacer */}
                        <div className="flex-grow" />

                        {/* Call Button */}
                        <Button variant="outline" className="flex-1 flex gap-2 items-center hover:bg-red-200 bg-red-100 text-red-600 border-red-300">
                            <Phone size={16} /> Call
                        </Button>
                        <Button variant="outline" className="flex-1 flex gap-2 items-center bg-green-100 hover:bg-green-200 text-green-600 border-green-600">
                            <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/whatsapp2.svg" alt="WhatsApp" className="w-40 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllImagesGallery;
