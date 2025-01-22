import { makeAutoObservable, runInAction } from "mobx";
import { Flight } from "types/Flight";
import { FlightService } from "../services/FlightService";

class FlightStore {
    flights: Flight[] = [];
  
    constructor() {
      makeAutoObservable(this);
    }
  
    fetchFlights = async () => {
      try {
        const data = await FlightService.fetchFlights();
        runInAction(() => {
          this.flights = data;
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
      } catch (error) {
        console.error("Error updating flight:", error);
      }
    };
  }
  
  export default new FlightStore();