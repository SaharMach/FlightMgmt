import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import FlightStore from "../stores/FlightStore"

function FlightList() {
  useEffect(() => {
    FlightStore.fetchFlights();
  }, []);

  return (
    <div className="flight-list">
      {FlightStore.flights.map((flight) => (
        <div
          key={flight.id}
          className={`flight-con`}
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