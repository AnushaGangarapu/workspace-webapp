import { Request, Response, NextFunction } from 'express';
import { BookingService } from '../services/bookingService';
import { CreateBookingRequest } from '../types';

const bookingService = new BookingService();

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingData: CreateBookingRequest = req.body;
    const booking = await bookingService.createBooking(bookingData);
    
    res.status(201).json({
      bookingId: booking.bookingId,
      roomId: booking.roomId,
      userName: booking.userName,
      totalPrice: booking.totalPrice,
      status: booking.status
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.cancelBooking(id);
    
    res.json({
      bookingId: booking.bookingId,
      status: booking.status,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};