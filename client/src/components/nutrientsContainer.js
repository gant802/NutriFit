import React from "react";
import NutrientInfo from "./nutrientInfo";

function NutrientsContainer({searchResults}){

    const resultsListed = searchResults.map((nutrientInfo, index) => {
        return <NutrientInfo key={index} nutrientInfo={nutrientInfo} />
    })

    return(
        <div>
            {resultsListed}
        </div>
    )
}

export default NutrientsContainer