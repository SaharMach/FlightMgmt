import React from "react";
import { Flight } from "types/Flight";
import FlightStore from "../stores/FlightStore";

const FlightItem = ({ flight, onEdit }: { flight: Flight; onEdit: (flight: Flight) => void }) => {
    
    return (
      <tr className={`flight-item ${flight.status === "malfunction" ? "malfunction" : ""}`}>
        <td>{flight.flightNumber}</td>
        <td>{flight.status}</td>
        <td>{flight.takeoffAirport}</td>
        <td>{flight.landingAirport}</td>
        <td>{new Date(flight.takeoffTime).toLocaleString()}</td>
        <td>{new Date(flight.landingTime).toLocaleString()}</td>
        <td className="actions">
          <button className="btn" onClick={() => onEdit(flight)}>Edit</button>
          <button className="delete btn" onClick={() => FlightStore.deleteFlight(flight._id)}>Delete</button>
        </td>
      </tr>
    )
}

export default FlightItem