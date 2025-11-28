import { Request, Response, NextFunction } from 'express';
import { RoomService } from '../services/roomService';

const roomService = new RoomService();

export const getAllRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};