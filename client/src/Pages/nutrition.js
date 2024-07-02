import React, { useState } from "react";
import NutrientInfo from "../components/nutrientInfo";
import { useOutletContext } from "react-router-dom";

function Nutrition() {
    const [searchInput, setSearchInput] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [setSearchMaxReached, searchMaxReached] = useOutletContext()

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

 function giveSearchResults(){
    fetch('https://api.api-ninjas.com/v1/nutrition?query=' + searchInput, {
            method: 'GET',
            headers: { 'X-Api-Key': 'bMxQSkd43Sy3FQYD50efrg==XxNceF4LNlS0s0LS' },
            contentType: 'application/json'
        }).then(res => res.json())
            .then(data => {
                setSearchResults(data)})
 }
        
   

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
            
            {resultsListed.length > 0 ? resultsListed : <h1 id="noSearchResultsText">Found Food Items Will Appear here</h1>}
        </div>
    )
}

export default Nutrition




