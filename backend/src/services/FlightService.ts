import { Flight } from "../models/FlightModel";

export const fetchAllFlights = async (query: string | undefined) => {
  const filter: any = {};
  if (query) {
    filter.$or = [
      {flightNumber: new RegExp(query, "i")},
      {takeoffAirport: new RegExp(query, "i")},
      {landingAirport: new RegExp(query, "i")}
    ]
  }
  return await Flight.find(filter);
};

export const createNewFlight = async (flightData: any) => {
  const flight = new Flight(flightData);
  return await flight.save();
};

export const updateFlightById = async (id: string, updates: any) => {
  return await Flight.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteFlightById = async (id: string) => {
  return await Flight.findByIdAndDelete(id);
};