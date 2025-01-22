export interface Flight {
    id: string;
    flightNumber: string
    takeoffAirport: string
    landingAirport: string
    status: 'hangar' | 'airborne' | 'malfunction'
    takeoffTime: string
    landingTime: string
}