import React from "react";

function NutrientInfo({nutrientInfo}){
    console.log(nutrientInfo)

    function capitalize(sentence) {
        return sentence.replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        });
    }

    return(
        <div id="nutritionResultsCont">
            <h2>{capitalize(nutrientInfo.name)}</h2>
            <div><p>Serving Size: </p><span>{nutrientInfo.serving_size_g}g</span></div>
            <div><p>Calories: </p><span>{nutrientInfo.calories}</span></div>
            <div><p>Total Fat: </p><span>{nutrientInfo.fat_total_g}g</span></div>
            <div><p>Saturated Fat: </p><span>{nutrientInfo.fat_saturated_g}g</span></div>
            <div><p>Cholesterol: </p><span>{nutrientInfo.cholesterol_mg}mg</span></div>
            <div><p>Sodium: </p><span>{nutrientInfo.sodium_mg}mg</span></div>
            <div><p>Total Carbohydrate: </p><span>{nutrientInfo.carbohydrates_total_g}g</span></div>
            <div><p>Fiber: </p><span>{nutrientInfo.fiber_g}g</span></div>
            <div><p>Sugar: </p><span>{nutrientInfo.sugar_g}g</span></div>
            <div><p>Protein: </p><span>{nutrientInfo.protein_g}g</span></div>
            <div><p>Potassium: </p><span>{nutrientInfo.potassium_mg}mg</span></div>
    

        </div>
    )
}

export default NutrientInfo