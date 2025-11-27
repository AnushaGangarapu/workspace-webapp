const API_BASE = `${process.env.REACT_APP_API_URL}/api`;

// Helper to handle fetch responses
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API request failed");
  }
  return response.json();
}

export const api = {
  // Rooms
  getRooms: async () => {
    const response = await fetch(`${API_BASE}/rooms`, {
      method: "GET",
      credentials: "include",   // important!
      headers: {
        "Content-Type": "application/json"
      }
    });
    return handleResponse(response);
  },

  // Bookings
  createBooking: async (bookingData) => {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    });
    return handleResponse(response);
  },

  getBookings: async () => {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return handleResponse(response);
  },

  cancelBooking: async (bookingId) => {
    const response = await fetch(`${API_BASE}/bookings/${bookingId}/cancel`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: "{}"
    });
    return handleResponse(response);
  },

  // Analytics
  getAnalytics: async (from, to) => {
    const url = `${API_BASE}/analytics?from=${from}&to=${to}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return handleResponse(response);
  }
};
