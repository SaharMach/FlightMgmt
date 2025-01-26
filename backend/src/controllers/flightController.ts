import { Request, Response } from "express";
import {
  fetchAllFlights,
  createNewFlight,
  updateFlightById,
  deleteFlightById,
} from "../services/FlightService";

export const getFlights = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const flights = await fetchAllFlights(query as string);
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const createFlight = async (req: Request, res: Response) => {
  try {
    const savedFlight = await createNewFlight(req.body);
    res.status(201).json(savedFlight);
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const updateFlight = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedFlight = await updateFlightById(id, updates);
    if (!updatedFlight) {
      res.status(404).json({ message: "Flight not found" });
      return;
    }
    res.status(200).json(updatedFlight);
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const deleteFlight = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedFlight = await deleteFlightById(id);
    if (!deletedFlight) {
      res.status(404).json({ message: "Flight not found" });
      return;
    }
    res.status(200).json(deletedFlight);
  } catch (err) {
    res.status(400).json({ err });
  }
};