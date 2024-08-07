import React from "react";

function SearchRoutines({setSearchInput, searchInput}){



    return (
        <div>
            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="Search Routines..."/>
            <button>Search</button>
        </div>
    )
}

export default SearchRoutines