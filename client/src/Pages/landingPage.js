import React, { useContext } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";
import { SignedInContext } from "../components/App";

function LandingPage() {
    const [signedIn] = useContext(SignedInContext);

    return (
        <div id="carouselCont">
            <div id="welcomeText">
                <h1>{signedIn ? "Welcome back!" : "Welcome!"}</h1>
                {signedIn ? "" : <Link id="linkToLogin" to="/loginOrCreate">Login or Signup</Link>}

            </div>

            <Carousel fade={true} interval={5000}>
                <Carousel.Item>
                    <img className="carouselImages" src={process.env.PUBLIC_URL + '/workout-Image3.jpg'} alt="workout image" />
                    <Carousel.Caption>
                        <h3>Save Workouts To Your Calendar!</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="carouselImages" src={process.env.PUBLIC_URL + '/workout-Image2.jpg'} alt="workout image" />
                    <Carousel.Caption>
                        <h3>Look up Nutrition Info!</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="carouselImages" src={process.env.PUBLIC_URL + '/workout-Image1.jpg'} alt="workout image" />
                    <Carousel.Caption>
                        <h3>Post About Your Workout!</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default LandingPage

