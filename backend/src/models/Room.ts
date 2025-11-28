import mongoose, { Schema, Document } from 'mongoose';
import { IRoom } from '../types';

export interface IRoomDocument extends IRoom, Document {}

const RoomSchema: Schema = new Schema({
  roomId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  baseHourlyRate: { type: Number, required: true },
  capacity: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model<IRoomDocument>('Room', RoomSchema);

