import axios from "axios";
import { Flight } from "../types/Flight";

const BASE_URL = "http://localhost:3000/api/flight";

export const FlightService = {
  async fetchFlights(): Promise<Flight[]> {
    const res = await axios.get<Flight[]>(BASE_URL);
    console.log(res.data)
    return res.data;
  },

  async updateFlight(id: string, flight: Partial<Flight>): Promise<Flight> {
    const res = await axios.put<Flight>(`${BASE_URL}/${id}`, flight);
    return res.data;
  },

};