import React, { useState } from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

export const SignedInContext = React.createContext()

function App() {
  const [signedIn, setSignedIn] = useState(false)

  return (
    <SignedInContext.Provider value={[ signedIn, setSignedIn ]}>
    <div>
      <Navbar />
      <Outlet />
    </div>
    </SignedInContext.Provider>
  )
}

export default App;
