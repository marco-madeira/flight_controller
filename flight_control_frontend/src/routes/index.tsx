import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../screens/HomeScreen";
import { AirplaneMap } from "../components/Map/Airplane";
import { AirportMap } from "../components/Map/AirportMap";

export function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/flightMap" element={<AirplaneMap/>}/>
                <Route path="/airportMap" element={<AirportMap/>}/>
            </Routes>
        </Router>
    )
}