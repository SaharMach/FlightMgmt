import { Server } from 'socket.io';
import { Flight } from '../models/FlightModel';

const CODES: string[] = ["JFK", "LAX", "LHR", "CDG", "DXB","HND", "ORD","FRA", "SIN", "ICN", "AMS","TLV"];

export const FlightRandomUpdate = (io: Server) => {
  setInterval(async () => {
    const flights = await Flight.find();
    if (flights.length > 0) {
      
      const randomFlight = flights[Math.floor(Math.random() * flights.length)];
      const updateType = Math.floor(Math.random() * 3);
      
      switch (updateType) {
        case 0:
          randomFlight.status = ['hangar', 'airborne', 'malfunction'][Math.floor(Math.random() * 3)] as 'hangar' | 'airborne' | 'malfunction';
          break;
        case 1:
          const delayMinutes = Math.floor(Math.random() * 120) + 1;
          const delayMilliseconds = delayMinutes * 60 * 1000;

          const takeoffDate = new Date(randomFlight.takeoffTime);
          const landingDate = new Date(randomFlight.landingTime);

          if (isNaN(takeoffDate.getTime()) || isNaN(landingDate.getTime())) {
            console.error(`Invalid date format for flight ${randomFlight.flightNumber}. Skipping update.`);
            break;
          }

          const newTakeoffDate = new Date(takeoffDate.getTime() + delayMilliseconds);
          const newLandingDate = new Date(landingDate.getTime() + delayMilliseconds);

          randomFlight.takeoffTime = newTakeoffDate.toISOString();
          randomFlight.landingTime = newLandingDate.toISOString();
          break;
        case 2:
          const randomCode = CODES[Math.floor(Math.random() * CODES.length)];
          if(randomCode !== randomFlight.takeoffAirport){
            randomFlight.landingAirport = randomCode;
          } else {
            console.log("same airport, cant update.");
          }
          break;
      }

      await randomFlight.save();
      io.emit('flightUpdate', randomFlight);
    }
  }, 2000);
};