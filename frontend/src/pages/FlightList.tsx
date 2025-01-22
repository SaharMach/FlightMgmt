import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import FlightStore from "../stores/FlightStore"
import { Flight } from "types/Flight";
import io from "socket.io-client";

function FlightList() {
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

  return (
    <div className="flight-list">
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
        </div>
      ))}
    </div>
  );
}

export default observer(FlightList);