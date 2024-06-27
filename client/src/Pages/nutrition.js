import React, { useState } from "react";
import NutrientsContainer from "../components/nutrientsContainer";

function Nutrition() {
    const [searchInput, setSearchInput] = useState("")
    const [searchResults, setSearchResults] = useState([])

    function searchNutrients() {
        console.log(searchInput)
        fetch('https://api.api-ninjas.com/v1/nutrition?query=' + searchInput, {
            method: 'GET',
            headers: { 'X-Api-Key': 'bMxQSkd43Sy3FQYD50efrg==XxNceF4LNlS0s0LS' },
            contentType: 'application/json'
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setSearchResults(data)})
    }

    return (
        <div>
            <h1>Nutrition Search🍎</h1>
            <input
                type="text"
                placeholder="1lb brisket"
                value={searchInput}
                onChange={(e) => {
                    setSearchInput(e.target.value)
                }}
            />
            <button onClick={searchNutrients}>Search</button>
            <NutrientsContainer searchResults={searchResults} />
        </div>
    )
}

export default Nutrition




