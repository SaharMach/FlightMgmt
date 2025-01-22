import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightList from "./pages/FlightList"

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<FlightList/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;