import mongoose, { Schema } from 'mongoose'
import { FlightDocument } from '../interfaces/FlightDocument'

const flightSchema: Schema = new Schema({
  flightNumber: { type: String, required: true },
  takeoffAirport: { type: String, required: true },
  landingAirport: { type: String, required: true },
  status: { type: String, enum: ['hangar', 'airborne', 'malfunction'], required: true },
  takeoffTime: { type: String, required: true },
  landingTime: { type: String, required: true },
}, {versionKey: false})

export const Flight = mongoose.model<FlightDocument>('Flight', flightSchema, 'flight');
