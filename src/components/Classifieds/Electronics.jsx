import React from "react";
import FiltersElectronis from "../Filters/Classifieds/Electronics";
const Electronics = () => {
    return(
        <>
           
            <div className="sticky top-1 " style={{zIndex:"9999"}}>
                    {/* <FiltersElectronics /> */}
                    {/* <FiltersElectronics/> */}
                    <FiltersElectronis/>

                    
            </div>
        </>
    )
}

export default Electronics;
