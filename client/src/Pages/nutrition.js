import React, { useState } from "react";
import NutrientInfo from "../components/nutrientInfo";
import { useOutletContext } from "react-router-dom";

function Nutrition() {
    const [searchInput, setSearchInput] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [setSearchMaxReached] = useOutletContext()

    //? Logic to handle if a user has searched nutrients over 6 times without signing in
    function searchNutrients() {
        fetch('/search_results_max')
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        giveSearchResults()
                    })
                } else {
                    setSearchMaxReached(true)
                    return alert("Please Login or Sign up to view more nutrition info")
                }
            })
    }

    //? Logic to retreive the search results to the user
    function giveSearchResults() {
        fetch('https://api.api-ninjas.com/v1/nutrition?query=' + searchInput, {
            method: 'GET',
            headers: { 'X-Api-Key': 'bMxQSkd43Sy3FQYD50efrg==XxNceF4LNlS0s0LS' },
            contentType: 'application/json'
        }).then(res => res.json())
            .then(data => {
                setSearchResults(data)
            })
    }


    // Logic to map out if there is more than one result
    const resultsListed = searchResults.map((nutrientInfo, index) => {
        return <NutrientInfo key={index} nutrientInfo={nutrientInfo} />
    })

    return (
        <div id="nutritionCont">

            <div id="searchCont">
                <h1>Nutrition Search🍎</h1>
                <input
                    id="searchNutritionInput"
                    type="text"
                    placeholder="1lb brisket"
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}
                />
                <button id="searchNutritionButton" onClick={searchNutrients}>Search</button>
            </div>

            {resultsListed.length > 0 ? resultsListed : <h1 id="noSearchResultsText">Search by weight followed by the food!</h1>}
            
        </div>
    )
}

export default Nutrition




