import React, { useState } from "react";
import FlightStore from "../stores/FlightStore";
import { Flight } from "../types/Flight";
import { formatDateToInput } from "../services/util.service";
import toast from "react-hot-toast";

function FlightForm(props: { flight?: Flight; onClose?: () => void }) {
  const { flight, onClose } = props;

  const [formData, setFormData] = useState(
    flight || {
      flightNumber: "",
      takeoffAirport: "",
      landingAirport: "",
      status: "hangar",
      takeoffTime: "",
      landingTime: "",
    }
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const takeoffDate = new Date(formData.takeoffTime);
    const landingDate = new Date(formData.landingTime);
    if (takeoffDate > landingDate) return toast.error("Invalid dates")
    try{
        if (flight) {
            await FlightStore.updateFlight(flight._id, formData as Partial<Flight>);
            toast.success("Flight updated")
        } else {
            await FlightStore.createFlight(formData as Flight);
            toast.success("Flight created")
        }
        if (onClose) {
            onClose();
        }
    } catch (err) {
        console.log("Err sumbmitting flight", err)
    }
  }


  return (
    <form className="flight-form" onSubmit={handleSubmit}>
      <h2>{flight ? "Edit Flight" : "Create Flight"}</h2>

      <div>
        <label>Flight Number:</label>
        <input
          type="text"
          name="flightNumber"
          value={formData.flightNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Takeoff Airport:</label>
        <input
          type="text"
          name="takeoffAirport"
          value={formData.takeoffAirport}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Landing Airport:</label>
        <input
          type="text"
          name="landingAirport"
          value={formData.landingAirport}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="hangar">Hangar</option>
          <option value="airborne">Airborne</option>
          <option value="malfunction">Malfunction</option>
        </select>
      </div>

      <div>
        <label>Takeoff Time:</label>
        <input
          type="datetime-local"
          name="takeoffTime"
          value={flight ? formatDateToInput(formData.takeoffTime) : formData.takeoffTime}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Landing Time:</label>
        <input
          type="datetime-local"
          name="landingTime"
          value={flight ? formatDateToInput(formData.landingTime) : formData.landingTime}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">{flight ? "Update Flight" : "Create Flight"}</button>
      {onClose && <button type="button" onClick={onClose}>Cancel</button>}
    </form>
  );
}

export default FlightForm;