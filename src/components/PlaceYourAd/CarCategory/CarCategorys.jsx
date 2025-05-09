import React from 'react';
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CarCategorys = () => {
    return (
        <div className="min-h-screen bg-white flex justify-center items-center p-4">
            <div className="w-full max-w-md space-y-4">

                {/* Centered Logo */}
                <div className="flex justify-center text-3xl font-bold mb-8">
                    <span className="text-black">dub</span>
                    <span className="text-red-600 relative">
                        izzle
                        <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-red-600 text-xs">▲</span>
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-semibold text-center">Tell us about your car</h2>

                <div className="flex items-center text-sm space-x-1 mb-6">
                    <Link to={"/place-an-ad/taxonomy/motors/"} className="text-blue-600 hover:text-red-700 font-medium">
                        Motors
                    </Link>
                    <FaAngleRight className="text-gray-500 text-xs" />
                    <span className="text-gray-800 font-medium">Cars</span>
                </div>

                <div className="bg-gray-100 p-3 text-sm text-gray-700 rounded">
                    <strong>Selling more than one car?</strong>
                    <div>
                        Save with our business packages!{' '}
                        <a href="#" className="text-blue-500 underline">
                            Learn More
                        </a>
                    </div>
                </div>

                <form className="space-y-3">
                    <select className="w-full border p-2 rounded" required>
                        <option value="">Emirate*</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                        <option value="Ras ai Khaimah">Ras ai Khaimah</option>
                        <option value="Sharjah">Sharjah</option>
                        <option value="Fujairah">Fujairah</option>
                        <option value="Ajman">Ajman</option>
                        <option value="Umm ai Quwain">Umm ai Quwain</option>
                        <option value="Ai Ain">Ai Ain</option>

                    </select>

                    <select className="w-full border p-2 rounded" placeholder="Make & Model*" required>
                        <option value=""> Abarth 595</option>
                        <option value="Abarth 1999">Abarth 1999</option>
                        <option value="Abarth 124">Abarth 124</option>
                        <option value="Abarth 500e">Abarth 500e</option>
                        <option value="Abarth F595">Abarth F595</option>
                    </select>

                    <select className="w-full border p-2 rounded" placeholder="Trim*" required>
                        <option value=""> Scorpioneoro</option>
                        <option value="Scorpioneoro">Scorpioneoro</option>

                    </select>





                    <select className="w-full border p-2 rounded" required>
                        <option value="Regional Specs">Regional Specs</option>
                        <option value="American Specs">American Specs</option>
                        <option value="Canadian Specs">Canadian Specs</option>
                        <option value="European Specs">European Specs</option>
                        <option value="Korean Specs">Korean Specs</option>
                    </select>

                    <div className="max-w-md mx-auto  bg-white rounded-lg shadow overflow-visible">

                        <select
                            id="year"
                            name="year"
                            required
                            className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Year</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                            <option value="2003">2003</option>
                            <option value="2004">2004</option>
                            <option value="2005">2005</option>
                            <option value="2006">2006</option>
                            <option value="2007">2007</option>
                            <option value="2008">2008</option>
                            <option value="2009">2009</option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                            <option value="2012">2012</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>

                    <input type="number" placeholder="Kilometers*" className="w-full border p-2 rounded" required />

                    <select className="w-full border p-2 rounded">
                        <option value="Sedan">Body Type* - Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Crossover">Crossover</option>
                        <option value="Van">Van</option>
                        <option value="Wagon">Wagon</option>
                        <option value="Other">Other</option>


                    </select>

                    <select className="w-full border p-2 rounded" placeholder="Is your car insured in UAE?*" required>
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                    </select>

                    <div className="relative">
                        <input type="number" placeholder="Price*" className="w-full border p-2 pr-12 rounded" required />
                        <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">AED</span>
                    </div>

                    <input type="tel" placeholder="Phone number*" className="w-full border p-2 rounded" required />

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                    >
                        Next
                    </button>
                </form>

                <div className="text-center text-xs text-gray-600">
                    Questions? Call{' '}
                    <a href="tel:800Dubizzle" className="text-blue-500">
                        800 Dubizzle
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CarCategorys;
