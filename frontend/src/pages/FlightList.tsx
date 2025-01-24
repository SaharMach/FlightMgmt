import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import FlightStore from "../stores/FlightStore"
import { Flight } from "types/Flight";
import io from "socket.io-client";
import FlightSearch from "../cmps/FlightSearch";
import FlightForm from "../cmps/FlightForm";

const FlightList = observer(() => {
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    FlightStore.fetchFlights();

    const socket = io("http://localhost:3000", { 
      transports: ['websocket'], 
    })

    socket.on("flightUpdate", (updatedFlight: Flight) => {
      FlightStore.updateFlight(updatedFlight._id, updatedFlight);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEdit = (flight: Flight) => {
    setEditingFlight(flight);
    setIsCreating(false);
  };

  const handleClose = () => {
    setEditingFlight(null);
    setIsCreating(false);
  };

  return (
    <div className="flight-list">
      <FlightSearch />
      <button onClick={() => setIsCreating(true)}>Create</button>
      {FlightStore.flights.map((flight) => (
        <div
          key={flight._id}
          className={`flight-con ${flight.status === "malfunction" ? "malfunction" : ""}`}
        >
          <p>Flight Number: {flight.flightNumber}</p>
          <p>Status: {flight.status}</p>
          <p>Takeoff Airport: {flight.takeoffAirport}</p>
          <p>Landing Airport: {flight.landingAirport}</p>
          <p>Takeoff Time: {new Date(flight.takeoffTime).toLocaleString()}</p>
          <p>Landing Time: {new Date(flight.landingTime).toLocaleString()}</p>
          <button onClick={() => handleEdit(flight)}>Edit</button>
          <button className="delete-btn" onClick={() => FlightStore.deleteFlight(flight._id)}>X</button>
        </div>
      ))}
      {isCreating && <FlightForm onClose={handleClose}/>}
      {editingFlight && <FlightForm flight={editingFlight} onClose={handleClose}/>}
    </div>
  );
})

export default FlightList;