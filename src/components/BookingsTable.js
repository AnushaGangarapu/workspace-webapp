import React from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { formatDateTime, formatCurrency } from '../utils/formatter.js';

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: 600,
  },
  statusChip: {
    fontWeight: 'bold',
  },
  emptyState: {
    padding: '3rem',
    textAlign: 'center',
    color: '#666',
  },
});

function BookingsTable({ bookings, onCancel }) {
  const classes = useStyles();

  if (bookings.length === 0) {
    return (
      <Paper className={classes.emptyState}>
        <Typography>No bookings found</Typography>
      </Paper>
    );
  }

  const columns = [
    { label: 'Booking ID', width: 120 },
    { label: 'Room', width: 100 },
    { label: 'User Name', width: 150 },
    { label: 'Start Time', width: 180 },
    { label: 'End Time', width: 180 },
    { label: 'Price', width: 100 },
    { label: 'Status', width: 120 },
    { label: 'Actions', width: 120 },
  ];

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.label}
            variant="head"
            align="left"
            style={{ width: column.width, backgroundColor: '#f5f5f5' }}
            sx={{ fontWeight: 'bold' }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, booking) {
    return (
      <>
        <TableCell style={{ width: columns[0].width }}>{booking.bookingId}</TableCell>
        <TableCell style={{ width: columns[1].width }}>{booking.roomId}</TableCell>
        <TableCell style={{ width: columns[2].width }}>{booking.userName}</TableCell>
        <TableCell style={{ width: columns[3].width }}>
          {formatDateTime(booking.startTime)}
        </TableCell>
        <TableCell style={{ width: columns[4].width }}>
          {formatDateTime(booking.endTime)}
        </TableCell>
        <TableCell style={{ width: columns[5].width }}>
          {formatCurrency(booking.totalPrice)}
        </TableCell>
        <TableCell style={{ width: columns[6].width }}>
          <Chip
            label={booking.status}
            color={booking.status === 'CONFIRMED' ? 'success' : 'default'}
            size="small"
            className={classes.statusChip}
          />
        </TableCell>
        <TableCell style={{ width: columns[7].width }}>
          {booking.status === 'CONFIRMED' && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => onCancel(booking.bookingId)}
            >
              Cancel
            </Button>
          )}
        </TableCell>
      </>
    );
  }

  return (
    <Paper style={{ height: 600, width: '100%' }}>
      <TableVirtuoso
        data={bookings}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

export default BookingsTable;