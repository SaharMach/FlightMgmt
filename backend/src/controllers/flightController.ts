import { Request, Response } from 'express';
import { Flight } from '../models/flightModel';

export const getFlights = async (req: Request, res: Response) => {
  try {
    const flights = await Flight.find();
    console.log(flights)
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ err });
  }
}

export const createFlight = async (req: Request, res: Response) => {
  try {
    const flight = new Flight(req.body);
    const savedFlight = await flight.save();
    res.status(201).json(savedFlight);
  } catch (err) {
    res.status(400).json({ err });
  }
};