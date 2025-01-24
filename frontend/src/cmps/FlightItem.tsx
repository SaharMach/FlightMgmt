import React from "react";
import { Flight } from "types/Flight";
import FlightStore from "../stores/FlightStore";

const FlightItem = ({ flight, onEdit }: { flight: Flight; onEdit: (flight: Flight) => void }) => {
    
    return (
        <div
          key={flight._id}
          className={`flight-item ${flight.status === "malfunction" ? "malfunction" : ""}`}
        >
          <p>Flight Number: {flight.flightNumber}</p>
          <p>Status: {flight.status}</p>
          <p>Takeoff Airport: {flight.takeoffAirport}</p>
          <p>Landing Airport: {flight.landingAirport}</p>
          <p>Takeoff Time: {new Date(flight.takeoffTime).toLocaleString()}</p>
          <p>Landing Time: {new Date(flight.landingTime).toLocaleString()}</p>
          <button onClick={() => onEdit(flight)}>Edit</button>
          <button className="delete-btn" onClick={() => FlightStore.deleteFlight(flight._id)}>X</button>
        </div>
    )
}

export default FlightItem