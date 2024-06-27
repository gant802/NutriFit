import React from "react";

function NutrientInfo({nutrientInfo}){
    console.log(nutrientInfo)

    function capitalize(sentence) {
        return sentence.replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        });
    }

    return(
        <div>
            <h2>{capitalize(nutrientInfo.name)}</h2>
            <p>Serving Size: {nutrientInfo.serving_size_g}g</p>
            <p>Calories: {nutrientInfo.calories}</p>
            <p>Total Fat: {nutrientInfo.fat_total_g}g</p>
            <p>Saturated Fat: {nutrientInfo.fat_saturated_g}g</p>
            <p>Cholesterol: {nutrientInfo.cholesterol_mg}mg</p>
            <p>Sodium: {nutrientInfo.sodium_mg}mg</p>
            <p>Total Carbohydrate: {nutrientInfo.carbohydrates_total_g}g</p>
            <p>Fiber: {nutrientInfo.fiber_g}g</p>
            <p>Sugar: {nutrientInfo.sugar_g}g</p>
            <p>Protein: {nutrientInfo.protein_g}g</p>
            <p>Potassium: {nutrientInfo.potassium_mg}mg</p>

        </div>
    )
}

export default NutrientInfo