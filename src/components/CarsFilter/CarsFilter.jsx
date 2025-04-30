
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaGlobe, FaCalendarAlt } from "react-icons/fa";
import { PiSteeringWheelBold } from "react-icons/pi";
import { LuGaugeCircle } from "react-icons/lu"
import { Heart } from "lucide-react";
import LoginModal from "../LoginModal/LoginModal";
import { RiShareForwardLine } from "react-icons/ri";
import { useState } from "react";


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

const CarsFilter = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);

    const hiddenCount = images.length - 4;

    const goToFullGallery = () => {
        navigate("/fullgallery");
    };

    return (
        <div className="container m-auto">
            <div className="flex gap-4 p-4 mx-auto justify-start">

                {/* Left Side - Images Clickable */}
                <div className="w-[282px] cursor-pointer" onClick={goToFullGallery}>
                    <div className="relative w-[282px] h-[210px] rounded-xl overflow-hidden shadow-md">
                        <img src={images[0]} alt="Main Car" className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3 flex space-x-2">
                            <button className="p-2 rounded-full shadow">
                                <RiShareForwardLine className="w-5 h-5 text-white" />
                            </button>
                            <button
                                type="button"
                                className="p-2 rounded-full shadow"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowForm(true);
                                }}
                            >
                                <Heart className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-1 mt-1">
                        {images.slice(1, 4).map((img, index) => (
                            <div key={index} className="relative w-[90px] h-[62px] rounded-md overflow-hidden">
                                <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-cover" />
                                {index === 2 && (
                                    <div className="absolute inset-0  text-black font-bold text-sm flex items-center justify-center">
                                        +{hiddenCount}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Info (also clickable) */}
                <div className="flex flex-col justify-between flex-grow cursor-pointer" onClick={goToFullGallery}>
                    <div>
                        <h2 className="text-2xl font-bold text-black mb-5">AED 114,990</h2>
                        <p className="text-sm text-black mb-5">Volvo • S90 • Momentum</p>
                        <p className="text-sm font-medium mb-5 text-black mt-1">
                            SPRING SPECIALS | 0% DP | AGENCY WARRANTY
                        </p>

                        <div className="flex flex-wrap gap-5 text-sm text-black mt-5">
                            <div className="flex items-center gap-1"><FaCalendarAlt /> 2023</div>
                            <div className="flex items-center gap-1"><LuGaugeCircle /> 35,806 km</div>
                            <div className="flex items-center gap-1"><PiSteeringWheelBold /> Left Hand</div>
                            <div className="flex items-center gap-1"><FaGlobe /> GCC Specs</div>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-black mt-5">
                            <FaMapMarkerAlt /> Green Community, Dubai
                        </div>
                    </div>

                    <div className="mt-5">
                        <p className="text-xs text-black">Listed by</p>
                        <p className="font-semibold text-black">Park Lane Motors</p>
                    </div>
                </div>
                {showForm && (
                    <LoginModal show={showForm} onClose={() => setShowForm(false)} />
                )}
            </div>
        </div>
    );
};

export default CarsFilter;