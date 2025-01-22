import { Date, Document } from 'mongoose'

export interface flightDocument extends Document {
  flightNumber: string
  takeoffAirport: string
  landingAirport: string
  status: 'hangar' | 'airborne' | 'malfunction'
  takeoffTime: String
  landingTime: String
}