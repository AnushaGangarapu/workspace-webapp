import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from '../services/analyticsService';

const analyticsService = new AnalyticsService();

export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to } = req.query;
    
    if (!from || !to) {
      return res.status(400).json({ 
        error: 'from and to query parameters are required (format: YYYY-MM-DD)' 
      });
    }
    
    const analytics = await analyticsService.getAnalytics(
      from as string,
      to as string
    );
    
    res.json(analytics);
  } catch (error) {
    next(error);
  }
};