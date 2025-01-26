import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import FlightStore from "../stores/FlightStore"
import { Flight } from "types/Flight";
import io from "socket.io-client";
import FlightSearch from "../cmps/FlightSearch";
import FlightForm from "../cmps/FlightForm";
import FlightItem from "../cmps/FlightItem";
import { BASE_URL } from "../services/FlightService";

const FlightList = observer(() => {
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    FlightStore.fetchFlights();

    const socket = io(BASE_URL, { 
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
      <section className="flight-list-header">
        <FlightSearch />
        <button className="create btn" onClick={() => setIsCreating(true)}>Create</button>

      </section>
      <table className="flights-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Status</th>
            <th>Takeoff Airport</th>
            <th>Landing Airport</th>
            <th>Takeoff Time</th>
            <th>Landing Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {FlightStore.flights.map((flight) => (
            <FlightItem key={flight._id} flight={flight} onEdit={handleEdit} />
          ))}
        </tbody>
      </table>
      {isCreating && <FlightForm onClose={handleClose}/>}
      {editingFlight && <FlightForm flight={editingFlight} onClose={handleClose}/>}

    </div>
  );
})

export default FlightList;