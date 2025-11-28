import Booking, { IBookingDocument } from '../models/Booking';
import { CreateBookingRequest } from '../types';
import { RoomService } from './roomService';
import { PricingService } from './pricingService';
import { parseToUTC, getHoursDifference, toIST } from '../utils/timeUtils';
import { hasConflict } from '../utils/conflictChecker';
import { MAX_BOOKING_HOURS, MIN_CANCELLATION_HOURS } from '../config/constants';
import crypto from 'crypto';

const bookingId = crypto.randomUUID().substring(0, 8);


export class BookingService {
  private roomService: RoomService;
  private pricingService: PricingService;
  
  constructor() {
    this.roomService = new RoomService();
    this.pricingService = new PricingService();
  }
  
  async createBooking(data: CreateBookingRequest): Promise<IBookingDocument> {
    // Parse times to UTC
    const startTime = parseToUTC(data.startTime);
    const endTime = parseToUTC(data.endTime);
    const now = new Date();
    
    // Validation
    if (startTime >= endTime) {
      throw new Error('Start time must be before end time');
    }
    
    if (startTime < now) {
      throw new Error('Cannot book in the past');
    }
    
    const duration = getHoursDifference(startTime, endTime);
    if (duration > MAX_BOOKING_HOURS) {
      throw new Error(`Booking duration cannot exceed ${MAX_BOOKING_HOURS} hours`);
    }
    
    // Check if room exists
    const room = await this.roomService.getRoomByRoomId(data.roomId);
    if (!room) {
      throw new Error(`Room ${data.roomId} not found`);
    }
    
    // Check for conflicts
    const existingBookings = await Booking.find({
      roomId: data.roomId,
      status: 'CONFIRMED',
      endTime: { $gt: startTime },
      startTime: { $lt: endTime }
    });
    
    const conflictCheck = hasConflict(startTime, endTime, existingBookings);
    if (conflictCheck.conflict && conflictCheck.conflictingBooking) {
      const cb = conflictCheck.conflictingBooking;
      const cbStart = toIST(cb.startTime);
      const cbEnd = toIST(cb.endTime);
      throw new Error(
        `Room already booked from ${cbStart.toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })} to ${cbEnd.toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}`
      );
    }
    
    // Calculate price
    const totalPrice = this.pricingService.calculatePrice(
      startTime,
      endTime,
      room.baseHourlyRate
    );
    
    // Create booking
    const booking = new Booking({
      bookingId : bookingId,
      roomId: data.roomId,
      userName: data.userName,
      startTime,
      endTime,
      totalPrice,
      status: 'CONFIRMED'
    });
    
    return await booking.save();
  }
  
  async cancelBooking(bookingId: string): Promise<IBookingDocument> {
    const booking = await Booking.findOne({ bookingId });
    
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    if (booking.status === 'CANCELLED') {
      throw new Error('Booking already cancelled');
    }
    
    const now = new Date();
    const hoursUntilStart = getHoursDifference(now, booking.startTime);
    
    if (hoursUntilStart < MIN_CANCELLATION_HOURS) {
      throw new Error(
        `Cancellation not allowed. Must cancel at least ${MIN_CANCELLATION_HOURS} hours before start time`
      );
    }
    
    booking.status = 'CANCELLED';
    return await booking.save();
  }
  
  async getAllBookings(): Promise<IBookingDocument[]> {
    return await Booking.find().sort({ startTime: -1 });
  }
}