import React from 'react'
import { BrowserRouter } from "react-router-dom";
import './index.css';
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
const App = () => {
    return (
        <>
            <Navbar />
            <Hero />
        </>
    )
}
export default App
