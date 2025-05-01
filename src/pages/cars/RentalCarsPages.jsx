
import RentalCars from "../../components/Motors/cars/RentalCars";

import "../css/CarInspectionBanner.css"


const RentalCarsPages = () => {
    return (
        <>
            <section className="RentalCars">
                <div className="container" style={{ padding: "0px 8px" }}>
                    <div style={{ display: "flex", justifyContent: "center" ,marginBottom:"30px"}}>
                        <div
                            className="flex flex-col md:flex-row items-center justify-between text-white shadow-lg rounded-2xl"
                            style={{
                                background: 'linear-gradient(116.93deg, #3f4954 1%, #26292d 80%)',
                                padding: '0px 22.5px',
                                width: '925px',
                                height: '225px',
                                boxShadow: '0 6px 4px -2px rgba(0, 0, 0, 0.24)',
                            }}
                        >                            <div class="flex flex-col gap-9 w-full md:w-2/3" style={{ boxSizing: "border-box", flexDirection: "column", justifyContent: "space-evenly", flexGrow: "1", alignContent: "space-between" }}>
                                <a href="https://www.digikey.in/en/resources/iot-resource-center/software-and-services"
                                    target="_blank" rel="noopener noreferrer"
                                    class="font-bold text-red-600" style={{ fontSize: "36px" }}>
                                    Unlock your dashboard
                                </a>
                                <p class="text-sm md:text-base">
                                    Make data-driven decisions and optimize your operations with intelligent IoT solutions.
                                </p>
                            </div>

                            <div class="mt-4 md:mt-0" style={{ position: "relative" }}>
                                <a href="https://www.digikey.in/en/resources/iot-resource-center/software-and-services" style={{ position: "absolute", top: "20px", right: "0px", width: '50px', height: "50px" }}
                                    target="_blank" rel="noopener noreferrer"
                                    class="w-12 h-12 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 transition duration-300">
                                    <svg class="w-8 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 100 100" stroke-width="6" style={{ height: "150px", width: "150px" }}>
                                        <polyline points="42,32 60,50 42,68" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <RentalCars />
                    </div>
                </div>

            </section>
        </>
    )
}
export default RentalCarsPages;