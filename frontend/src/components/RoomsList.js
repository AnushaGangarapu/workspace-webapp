import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PeopleIcon from '@mui/icons-material/People';
import { api } from '../api/api';
import { formatCurrency } from '../utils/formatter.js';

const useStyles = makeStyles((theme) => ({
  roomCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    },
  },
  roomHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  roomInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem',
  },
}));

function RoomsList() {
  const classes = useStyles();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await api.getRooms();
      setRooms(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Available Meeting Rooms
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.roomId}>
            <Card className={classes.roomCard}>
              <CardContent>
                <div className={classes.roomHeader}>
                  <MeetingRoomIcon color="primary" />
                  <Typography variant="h6">{room.name}</Typography>
                </div>
                
                <Typography color="textSecondary" gutterBottom>
                  Room ID: {room.roomId}
                </Typography>
                
                <div className={classes.roomInfo}>
                  <Chip 
                    icon={<PeopleIcon />} 
                    label={`Capacity: ${room.capacity}`}
                    size="small"
                  />
                  <Typography variant="h6" color="primary">
                    {formatCurrency(room.baseHourlyRate)}/hr
                  </Typography>
                </div>
                
                <Typography variant="caption" color="textSecondary" sx={{ mt: 2, display: 'block' }}>
                  * Peak hours (10 AM-1 PM, 4 PM-7 PM): {formatCurrency(room.baseHourlyRate * 1.5)}/hr
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default RoomsList;