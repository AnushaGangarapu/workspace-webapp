import { Router } from 'express';
import { getAllRooms } from '../controllers/roomController';

const router = Router();

router.get('/', getAllRooms);

export default router;
