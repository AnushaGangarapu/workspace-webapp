import Room, { IRoomDocument } from '../models/Room';

export class RoomService {
  async getAllRooms(): Promise<IRoomDocument[]> {
    return await Room.find().sort({ roomId: 1 });
  }
  
  async getRoomByRoomId(roomId: string): Promise<IRoomDocument | null> {
    return await Room.findOne({ roomId }).exec();

  }
  
  async createRoom(roomData: {
    roomId: string;
    name: string;
    baseHourlyRate: number;
    capacity: number;
  }): Promise<IRoomDocument> {
    const room = new Room(roomData);
    return await room.save();
  }
}