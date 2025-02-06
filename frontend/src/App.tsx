import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightList from "./pages/FlightList"
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div className="app">
            <Toaster />
            <Router>
                <Routes>
                    <Route path="/" element={<FlightList/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;