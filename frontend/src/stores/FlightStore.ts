import { makeAutoObservable, runInAction } from "mobx";
import { Flight } from "types/Flight";
import { FlightService } from "../services/FlightService";

class FlightStore {
    flights: Flight[] = [];
    // filteredFlights: Flight[] = [];

    constructor() {
      makeAutoObservable(this);
    }
  
    fetchFlights = async (query?: string)=> {
      try {
        const data = await FlightService.fetchFlights(query || "");
        runInAction(() => {
          this.flights = data;
          // this.filteredFlights = data
        })
      } catch (err) {
        console.error("Error fetching flights:", err);
      }
    };

    updateFlight = async (id: string, flight: Partial<Flight>) => {
      try {
        const updatedFlight = await FlightService.updateFlight(id, flight);
        runInAction(() => {
          this.flights = this.flights.map((f) => (f._id === id ? updatedFlight : f));
        })
      } catch (err) {
        console.error("Error updating flight:", err);
      }
    };

    deleteFlight = async (id: string) => {
      try {
        await FlightService.deleteFlight(id);
        runInAction(() => {
          this.flights = this.flights.filter((f) => f._id !== id)
        })
      } catch (err) {
          console.log("Error deleting flight", err);
      }
    }

    createFlight = async (flight: Partial<Flight>) => {
      try {
        const newFlight = await FlightService.createFlight(flight);
        runInAction(() => {
          this.flights.push(newFlight);
        })
      } catch (err) {
        console.error("Error creating flight:", err);
      }
    };
  }
  
  export default new FlightStore();