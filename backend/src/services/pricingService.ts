import { PEAK_MULTIPLIER } from '../config/constants';
import { isPeakHour } from '../utils/timeUtils';

export class PricingService {
  calculatePrice(startTime: Date, endTime: Date, baseRate: number): number {
    let totalPrice = 0;
    let currentTime = new Date(startTime);
    
    while (currentTime < endTime) {
      const isPeak = isPeakHour(currentTime);
      const rate = isPeak ? baseRate * PEAK_MULTIPLIER : baseRate;
      
      // Calculate next hour boundary
      const nextHour = new Date(currentTime);
      nextHour.setHours(currentTime.getHours() + 1, 0, 0, 0);
      
      // End of this slot is either next hour or booking end
      const endOfSlot = nextHour < endTime ? nextHour : endTime;
      
      // Calculate fraction of hour in this slot
      const hoursInSlot = (endOfSlot.getTime() - currentTime.getTime()) / (1000 * 60 * 60);
      
      totalPrice += rate * hoursInSlot;
      currentTime = endOfSlot;
    }
    
    return Math.round(totalPrice);
  }
}