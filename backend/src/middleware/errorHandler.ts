import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err.message);
  
  // Validation errors
  if (err.message.includes('not found') || err.message.includes('Not found')) {
    return res.status(404).json({ error: err.message });
  }
  
  if (
    err.message.includes('must be') ||
    err.message.includes('cannot') ||
    err.message.includes('already') ||
    err.message.includes('invalid') ||
    err.message.includes('Invalid')
  ) {
    return res.status(400).json({ error: err.message });
  }
  
  // Default error
  res.status(500).json({ error: 'Internal server error' });
};