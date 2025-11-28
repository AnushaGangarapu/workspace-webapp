import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import BarChartIcon from '@mui/icons-material/BarChart';
import { api } from '../api/api';
import { formatCurrency } from '../utils/formatter.js';
///home/unifo/TASKMANAGEMENT/workspace-booking/workspace-webapp/src/utils/formatter.js

const useStyles = makeStyles({
  form: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '1.5rem',
  },
  dateField: {
    minWidth: '180px',
  },
  tableContainer: {
    marginTop: '1.5rem',
  },
  emptyState: {
    padding: '2rem',
    textAlign: 'center',
    color: '#666',
  },
});

function Analytics() {
  const classes = useStyles();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const handleFetchAnalytics = async () => {
    if (!fromDate || !toDate) {
      setError('Please select both from and to dates');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await api.getAnalytics(fromDate, toDate);
      setAnalytics(data);
      setFetched(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = analytics.reduce((sum, item) => sum + item.totalRevenue, 0);
  const totalHours = analytics.reduce((sum, item) => sum + item.totalHours, 0);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <BarChartIcon color="primary" />
          <Typography variant="h6">Analytics & Reports</Typography>
        </Box>

        <div className={classes.form}>
          <TextField
            label="From Date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className={classes.dateField}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="To Date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className={classes.dateField}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            variant="contained"
            onClick={handleFetchAnalytics}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Fetch Analytics'}
          </Button>
        </div>

        {error && <Alert severity="error">{error}</Alert>}

        {fetched && analytics.length === 0 && (
          <Paper className={classes.emptyState}>
            <Typography>No bookings found for the selected date range</Typography>
          </Paper>
        )}

        {analytics.length > 0 && (
          <>
            <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body1">
                <strong>Total Hours Booked:</strong> {totalHours.toFixed(1)} hours
              </Typography>
              <Typography variant="body1">
                <strong>Total Revenue:</strong> {formatCurrency(totalRevenue)}
              </Typography>
            </Box>

            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Room ID</strong></TableCell>
                    <TableCell><strong>Room Name</strong></TableCell>
                    <TableCell align="right"><strong>Total Hours</strong></TableCell>
                    <TableCell align="right"><strong>Total Revenue</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analytics.map((row) => (
                    <TableRow key={row.roomId}>
                      <TableCell>{row.roomId}</TableCell>
                      <TableCell>{row.roomName}</TableCell>
                      <TableCell align="right">{row.totalHours.toFixed(1)} hrs</TableCell>
                      <TableCell align="right">{formatCurrency(row.totalRevenue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default Analytics;