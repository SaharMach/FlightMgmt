import axios from "axios";
import { Flight } from "../types/Flight";

const BASE_URL = "https://flightmgmt-back.onrender.com/api/flight";
// DEVELOPMENT ONLY - "http://localhost:3000/api/flight";

export const FlightService = {
  async fetchFlights(query: string = ""): Promise<Flight[]> {
    const res = await axios.get<Flight[]>(`${BASE_URL}?query=${query}`);
    console.log(res.data)
    return res.data;
  },

  async updateFlight(id: string, flight: Partial<Flight>): Promise<Flight> {
    const res = await axios.put<Flight>(`${BASE_URL}/${id}`, flight);
    return res.data;
  },

  async deleteFlight(id: string): Promise<void>{
    await axios.delete(`${BASE_URL}/${id}`)
  },

  async createFlight(flight: Partial<Flight>): Promise<Flight> {
    const res = await axios.post<Flight>(BASE_URL, flight);
    return res.data;
  },
};