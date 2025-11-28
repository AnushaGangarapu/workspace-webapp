import { Router } from 'express';
import { 
  createBooking, 
  cancelBooking, 
  getAllBookings 
} from '../controllers/bookingController';
import { validateBookingRequest } from '../middleware/validator';

const router = Router();

router.post('/', validateBookingRequest, createBooking);
router.post('/:id/cancel', cancelBooking);
router.get('/', getAllBookings);

export default router;