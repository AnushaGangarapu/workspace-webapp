export interface IRoom {
  roomId: string;
  name: string;
  baseHourlyRate: number;
  capacity: number;
}

export interface IBooking {
  bookingId: string;
  roomId: string;
  userName: string;
  startTime: Date;
  endTime: Date;
  totalPrice: number;
  status: 'CONFIRMED' | 'CANCELLED';
}

export interface CreateBookingRequest {
  roomId: string;
  userName: string;
  startTime: string;
  endTime: string;
}

export interface AnalyticsData {
  roomId: string;
  roomName: string;
  totalHours: number;
  totalRevenue: number;
}