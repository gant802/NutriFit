import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

export const SignedInContext = React.createContext()

function App() {
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    fetch('/check_session')
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => setSignedIn(data))
        }
      })
  }, [])

  return (
    <SignedInContext.Provider value={[signedIn, setSignedIn]}>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </SignedInContext.Provider>
  )
}

export default App;
