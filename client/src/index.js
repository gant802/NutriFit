import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import App from "./components/App"
import Home from "./Pages/home";
import LoginOrCreate from "./Pages/loginCreate";
import CreateProfile from "./components/createProfile";
import CalendarPage from "./Pages/calendar";
import Nutrition from "./Pages/nutrition";
import UserProfile from "./Pages/userProfile";
import WorkoutsPage from "./Pages/workoutsPage";
import LandingPage from "./Pages/landingPage";

const routes = [
{
path: "/",
element: <App />,
children: [
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/loginOrCreate',
        element: <LoginOrCreate />
    },
    {
        path: '/createProfile',
        element: <CreateProfile />
    },
    {
        path: '/calendar/:id',
        element: <CalendarPage />
    },
    {
        path: '/nutrition',
        element: <Nutrition />
    },
    {
        path: '/userProfile/:id',
        element: <UserProfile/>
    },
    {
        path: '/workoutsPage',
        element: <WorkoutsPage />
    },
    {
        path: '/home',
        element: <Home />
    }
]
}
]

// Create a router using the 'createBrowserRouter' function and pass the 'routes' configuration
const router = createBrowserRouter(routes);

// Render the application by providing the router to the RouterProvider component
ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={router} />
)