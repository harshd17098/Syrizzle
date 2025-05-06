import React from "react";
import FiltersAccessories from "../Filters/Classified/FiltersAccessories";

const Accessories = () => {
    return(
        <>
            <h1> Accessories Page </h1>
            <div className="sticky top-1 " style={{zIndex:"9999"}}>
                    <FiltersAccessories />
            </div>
        </>
    )
}

export default Accessories;
