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
    const exists = FlightStore.flights.some(existingFlight => existingFlight.flightNumber === formData.flightNumber);
    if (exists) {
      toast.error(`A flight named "${formData.flightNumber}" already exists!`);
      return;
    }
    try{
        if (flight) {
          
          await FlightStore.updateFlight(flight._id, formData as Partial<Flight>);
          toast.success("Flight updated")
        } else {
            await FlightStore.createFlight(formData as Flight);
        }
        if (onClose) {
            onClose();
        }
    } catch (err) {
        console.log("Err sumbmitting flight", err)
    }
  }


  return (
    <div className="flight-form-overlay">
      <div className="flight-form-container">
        <form className="flight-form" onSubmit={handleSubmit}>
          <h2>{flight ? "Edit Flight" : "Create Flight"}</h2>

          <div className="form-group">
            <label htmlFor="flightNumber">Flight Number:</label>
            <input
              type="text"
              id="flightNumber"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="takeoffAirport">Takeoff Airport:</label>
            <input
              type="text"
              id="takeoffAirport"
              name="takeoffAirport"
              value={formData.takeoffAirport}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="landingAirport">Landing Airport:</label>
            <input
              type="text"
              id="landingAirport"
              name="landingAirport"
              value={formData.landingAirport}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="hangar">Hangar</option>
              <option value="airborne">Airborne</option>
              <option value="malfunction">Malfunction</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="takeoffTime">Takeoff Time:</label>
            <input
              type="datetime-local"
              id="takeoffTime"
              name="takeoffTime"
              value={flight ? formatDateToInput(formData.takeoffTime) : formData.takeoffTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="landingTime">Landing Time:</label>
            <input
              type="datetime-local"
              id="landingTime"
              name="landingTime"
              value={flight ? formatDateToInput(formData.landingTime) : formData.landingTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn">
              {flight ? "Update Flight" : "Create Flight"}
            </button>
            {onClose && (
              <button type="button" className="btn" onClick={onClose}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default FlightForm;