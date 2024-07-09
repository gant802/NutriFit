import React from "react";

function NutrientInfo({ nutrientInfo }) {

    //? Capitalizes the first letter in each word for a sentence
    function capitalize(sentence) {
        return sentence.replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });
    }

    return (
        <div id="nutritionResultsCont">

            <h2>{capitalize(nutrientInfo.name)}</h2>
            <div><p className="bold">Serving Size: </p><span className="bold">{nutrientInfo.serving_size_g}g</span></div>
            <div><p>Calories: </p><span>{nutrientInfo.calories}</span></div>
            <div><p className="bold">Total Fat: </p><span className="bold">{nutrientInfo.fat_total_g}g</span></div>
            <div><p>Saturated Fat: </p><span>{nutrientInfo.fat_saturated_g}g</span></div>
            <div><p className="bold">Cholesterol: </p><span className="bold">{nutrientInfo.cholesterol_mg}mg</span></div>
            <div><p className="bold">Sodium: </p><span className="bold">{nutrientInfo.sodium_mg}mg</span></div>
            <div><p className="bold">Total Carbohydrate: </p><span className="bold">{nutrientInfo.carbohydrates_total_g}g</span></div>
            <div><p>Fiber: </p><span>{nutrientInfo.fiber_g}g</span></div>
            <div><p>Sugar: </p><span>{nutrientInfo.sugar_g}g</span></div>
            <div><p className="bold">Protein: </p><span className="bold">{nutrientInfo.protein_g}g</span></div>
            <div><p>Potassium: </p><span>{nutrientInfo.potassium_mg}mg</span></div>

        </div>
    )
}

export default NutrientInfo