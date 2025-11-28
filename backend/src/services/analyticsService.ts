import Booking from '../models/Booking';
import Room from '../models/Room';
import { AnalyticsData } from '../types';
import { parseToUTC } from '../utils/timeUtils';

export class AnalyticsService {
  async getAnalytics(from: string, to: string): Promise<AnalyticsData[]> {
    const fromDate = parseToUTC(from);
    const toDate = parseToUTC(to);
    
    // Set toDate to end of day
    toDate.setHours(23, 59, 59, 999);
    
    // Get all confirmed bookings in the date range
    const bookings = await Booking.find({
      status: 'CONFIRMED',
      startTime: { $gte: fromDate, $lte: toDate }
    });
    
    // Group by roomId
    const roomMap = new Map<string, { totalHours: number; totalRevenue: number }>();
    
    for (const booking of bookings) {
      const hours = (booking.endTime.getTime() - booking.startTime.getTime()) / (1000 * 60 * 60);
      
      if (!roomMap.has(booking.roomId)) {
        roomMap.set(booking.roomId, { totalHours: 0, totalRevenue: 0 });
      }
      
      const data = roomMap.get(booking.roomId)!;
      data.totalHours += hours;
      data.totalRevenue += booking.totalPrice;
    }
    
    // Get room names
    const roomIds = Array.from(roomMap.keys());
    const rooms = await Room.find({ roomId: { $in: roomIds } });
    const roomNameMap = new Map(rooms.map(r => [r.roomId, r.name]));
    
    // Format result
    const result: AnalyticsData[] = [];
    for (const [roomId, data] of roomMap.entries()) {
      result.push({
        roomId,
        roomName: roomNameMap.get(roomId) || 'Unknown',
        totalHours: Math.round(data.totalHours * 10) / 10, // Round to 1 decimal
        totalRevenue: data.totalRevenue
      });
    }
    
    return result.sort((a, b) => a.roomId.localeCompare(b.roomId));
  }
}