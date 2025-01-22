import axios from "axios";
import { Flight } from "../types/Flight";

const BASE_URL = "http://localhost:3000/api/flight";

export const FlightService = {
  async fetchFlights(): Promise<Flight[]> {
    const res = await axios.get<Flight[]>(BASE_URL);
    console.log(res.data)
    return res.data;
  },
};