import React from "react";
import FiltersWatches from "../Filters/Classified/FiltersWatches";
const Watches = () => {
    return(
        <>
            <h1> Watches Page </h1>
            <div className="sticky top-1 " style={{zIndex:"9999"}}>
                <FiltersWatches />        
            </div>
        </>
    )
}

export default Watches;
