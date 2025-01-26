import { Date, Document } from 'mongoose'

export interface FlightDocument extends Document {
  flightNumber: string
  takeoffAirport: string
  landingAirport: string
  status: 'hangar' | 'airborne' | 'malfunction'
  takeoffTime: string
  landingTime: string
}