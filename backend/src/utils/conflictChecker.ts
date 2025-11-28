import { IBookingDocument } from '../models/Booking';

export const hasConflict = (
  newStart: Date,
  newEnd: Date,
  existingBookings: IBookingDocument[]
): { conflict: boolean; conflictingBooking?: IBookingDocument } => {
  for (const booking of existingBookings) {
    // Conflict if: new starts before existing ends AND new ends after existing starts
    // Allow back-to-back: if newStart === existingEnd, no conflict
    if (newStart < booking.endTime && newEnd > booking.startTime) {
      return { conflict: true, conflictingBooking: booking };
    }
  }
  return { conflict: false };
};
