import { Request, Response, NextFunction } from 'express';

export const validateBookingRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { roomId, userName, startTime, endTime } = req.body;
  
  if (!roomId || typeof roomId !== 'string') {
    return res.status(400).json({ error: 'roomId is required and must be a string' });
  }
  
  if (!userName || typeof userName !== 'string') {
    return res.status(400).json({ error: 'userName is required and must be a string' });
  }
  
  if (!startTime || !endTime) {
    return res.status(400).json({ error: 'startTime and endTime are required' });
  }
  
  // Validate date format
  if (isNaN(Date.parse(startTime)) || isNaN(Date.parse(endTime))) {
    return res.status(400).json({ error: 'Invalid date format. Use ISO 8601 format' });
  }
  
  next();
};