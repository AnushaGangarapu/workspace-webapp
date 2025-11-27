import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '/api';

export const api = {
  // Rooms
  getRooms: async () => {
    const response = await axios.get(`${API_BASE}/rooms`);
    return response.data;
  },
  
  // Bookings
  createBooking: async (bookingData) => {
    const response = await axios.post(`${API_BASE}/bookings`, bookingData);
    return response.data;
  },
  
  getBookings: async () => {
    const response = await axios.get(`${API_BASE}/bookings`);
    return response.data;
  },
  
  cancelBooking: async (bookingId) => {
    const response = await axios.post(`${API_BASE}/bookings/${bookingId}/cancel`);
    return response.data;
  },
  
  // Analytics
  getAnalytics: async (from, to) => {
    const response = await axios.get(`${API_BASE}/analytics`, {
      params: { from, to }
    });
    return response.data;
  }
};