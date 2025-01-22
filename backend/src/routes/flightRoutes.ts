import { Router } from 'express';
import {
  getFlights,
  createFlight
} from '../controllers/flightController'

const router = Router();

router.get('/api/flight', getFlights);
router.post('/api/flight', createFlight)

export default router;