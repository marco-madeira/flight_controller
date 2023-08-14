import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../screens/HomeScreen";

export function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
        </Router>
    )
}