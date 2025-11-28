import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
  Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { api } from '../api/api';
import { formatCurrency } from '../utils/formatter.js';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  formField: {
    flex: 1,
    minWidth: '250px',
  },
  submitButton: {
    marginTop: '1rem',
  },
  resultCard: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f5f5f5',
  },
}));

function BookingForm() {
  const classes = useStyles();
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomId: '',
    userName: '',
    startTime: '',
    endTime: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await api.getRooms();
      setRooms(data);
    } catch (err) {
      console.error('Failed to load rooms:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const bookingData = {
        ...formData,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
      };

      const response = await api.createBooking(bookingData);
      setResult(response);
      
      // Clear form
      setFormData({
        roomId: '',
        userName: '',
        startTime: '',
        endTime: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Book a Meeting Room
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              select
              label="Select Room"
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              required
              fullWidth
            >
              <MenuItem value="">Select a room</MenuItem>
              {rooms.map((room) => (
                <MenuItem key={room.roomId} value={room.roomId}>
                  {room.name} - {formatCurrency(room.baseHourlyRate)}/hr (Capacity: {room.capacity})
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Your Name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              fullWidth
              placeholder="Enter your name"
            />

            <div className={classes.formRow}>
              <TextField
                label="Start Time"
                name="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={handleChange}
                required
                className={classes.formField}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="End Time"
                name="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={handleChange}
                required
                className={classes.formField}
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <Typography variant="caption" color="textSecondary">
              Note: Peak hours (Mon-Fri 10 AM-1 PM, 4 PM-7 PM) are charged at 1.5x base rate
            </Typography>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              className={classes.submitButton}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Booking'}
            </Button>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Box className={classes.resultCard}>
              <Alert severity="success" sx={{ mb: 2 }}>
                Booking created successfully!
              </Alert>
              <Typography variant="body1">
                <strong>Booking ID:</strong> {result.bookingId}
              </Typography>
              <Typography variant="body1">
                <strong>Room:</strong> {result.roomId}
              </Typography>
              <Typography variant="body1">
                <strong>User:</strong> {result.userName}
              </Typography>
              <Typography variant="body1">
                <strong>Total Price:</strong> {formatCurrency(result.totalPrice)}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {result.status}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default BookingForm;
