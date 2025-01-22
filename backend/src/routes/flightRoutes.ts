import { Router } from 'express';
import {
  getFlights,
  createFlight,
  updateFlight,
  deleteFlight
} from '../controllers/flightController';

const router = Router();

router.get('/api/flight', getFlights);
router.post('/api/flight', createFlight);
router.put('/api/flight/:id', updateFlight);
router.delete('/api/flight/:id', deleteFlight);

export default router;