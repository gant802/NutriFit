import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

export const SignedInContext = React.createContext()

function App() {

  //Creating signed in context to be used throughout app
  const [signedIn, setSignedIn] = useState(false)
  const [searchMaxReached, setSearchMaxReached] = useState(false)

  //Checks if a user is signed in and authorization for max number of nutrition searches
  useEffect(() => {
    fetch('/check_session')
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => setSignedIn(data))
        }
      })

    fetch('search_results_max')
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => "")
        } else {
          setSearchMaxReached(true)
        }
      })
  }, [])

  return (
    <SignedInContext.Provider value={[signedIn, setSignedIn]}>
      <div id="appCont">
        <Navbar />
        <Outlet context={[setSearchMaxReached, searchMaxReached]} />
      </div>
    </SignedInContext.Provider>
  )
}

export default App;
