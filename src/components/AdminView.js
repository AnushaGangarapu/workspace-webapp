import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import { api } from '../api/api';
import BookingsTable from './BookingsTable';
import Analytics from './Analytics';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  section: {
    marginBottom: '3rem',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem',
  },
});

function AdminView() {
  const classes = useStyles();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await api.getBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await api.cancelBooking(bookingId);
      await fetchBookings(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to cancel booking');
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h5">Admin Panel</Typography>
        <Button
          startIcon={<RefreshIcon />}
          onClick={fetchBookings}
          variant="outlined"
        >
          Refresh
        </Button>
      </div>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <div className={classes.section}>
        <Typography variant="h6" gutterBottom>
          All Bookings
        </Typography>
        {loading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <BookingsTable 
            bookings={bookings} 
            onCancel={handleCancelBooking}
          />
        )}
      </div>

      <Divider sx={{ my: 4 }} />

      <div className={classes.section}>
        <Analytics />
      </div>
    </div>
  );
}

export default AdminView;

