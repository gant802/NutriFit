import React, { useState } from "react";
import LoginForm from "../components/loginForm";
import CreateProfile from "../components/createProfile";

function LoginOrCreate() {
    const [switchPage, setSwitchPage] = useState(false)

    return (
        <div>
            {switchPage ?
                <CreateProfile switchPage={switchPage} setSwitchPage={setSwitchPage} /> :
                <LoginForm switchPage={switchPage} setSwitchPage={setSwitchPage} />}
            {!switchPage ? <p id="newUserText">New User?</p> : ""}

            <p id="toggleLoginCreateButton" onClick={() => setSwitchPage(!switchPage)}>{!switchPage ? "Create an Account" : "Go back to Login"}</p>
        </div>
    )
}

export default LoginOrCreate