import mongoose, { Schema } from 'mongoose'
import { flightDocument } from '../interfaces/flightDocument'

const flightSchema: Schema = new Schema({
  flightNumber: { type: String, required: true },
  takeoffAirport: { type: String, required: true },
  landingAirport: { type: String, required: true },
  status: { type: String, enum: ['hangar', 'airborne', 'malfunction'], required: true },
  takeoffTime: { type: String, required: true },
  landingTime: { type: String, required: true },
}, {versionKey: false})

export const Flight = mongoose.model<flightDocument>('Flight', flightSchema, 'flight');
