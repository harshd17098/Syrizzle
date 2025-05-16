import { createContext, useContext, useEffect, useState } from "react";
import { apiFunctions } from "../api/apiFunctions";
import API from "../api/apis";

const OptionsContext = createContext();

export const OptionsProvider = ({ children }) => {

    const { apiGet } = apiFunctions();
    const { dropdown } = API;

    const cities = [
        "All Cities",
        "Dubai",
        "Abu Dhabi",
        "Ras Al Khaimah",
        "Sharjah",
        "Fujairah",
        "Ajman",
        "Umm Al Quwain",
        "Al Ain",
    ];

    const [models, setModels] = useState([])

    useEffect(() => {
        const getModels = async () => {
            const response = await apiGet(dropdown.model);
            if (response.success) {
                setModels(response.data.result.map(list => ({
                    id: list._id,
                    name: list.name
                })))
            }
        }
        getModels();
    }, [])



    return (
        <OptionsContext.Provider value={{ cities, models, setModels }}>
            {children}
        </OptionsContext.Provider>
    );
}

export const Options = () => {
    return useContext(OptionsContext);
};