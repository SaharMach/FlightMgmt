import { Flight } from "../models/flightModel";

export const fetchAllFlights = async () => {
  return await Flight.find();
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