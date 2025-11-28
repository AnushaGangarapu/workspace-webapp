import mongoose, { Schema, Document } from 'mongoose';
import { IBooking } from '../types';

export interface IBookingDocument extends IBooking, Document {}

const BookingSchema: Schema = new Schema({
  bookingId: { type: String, required: true, unique: true },
  roomId: { type: String, required: true, index: true },
  userName: { type: String, required: true },
  startTime: { type: Date, required: true, index: true },
  endTime: { type: Date, required: true, index: true },
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['CONFIRMED', 'CANCELLED'], 
    default: 'CONFIRMED',
    index: true 
  }
}, { timestamps: true });

// Compound index for efficient conflict checking
BookingSchema.index({ roomId: 1, startTime: 1, endTime: 1 });

export default mongoose.model<IBookingDocument>('Booking', BookingSchema);