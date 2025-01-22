import { makeAutoObservable } from "mobx";
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
        this.flights = data;
      } catch (err) {
        console.error("Error fetching flights:", err);
      }
    };
  
  }
  
  export default new FlightStore();