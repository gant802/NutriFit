import React, { useState } from "react";
import LoginForm from "../components/Profile+Login/loginForm";
import CreateProfile from "../components/Profile+Login/createProfile";

function LoginOrCreate() {
    const [switchPage, setSwitchPage] = useState(false)

    return (
        <div id="loginCreateCont">

            {switchPage 
            ? <CreateProfile switchPage={switchPage} setSwitchPage={setSwitchPage} /> 
            : <LoginForm switchPage={switchPage} setSwitchPage={setSwitchPage} />}
            
        </div>
    )
}

export default LoginOrCreate