import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RoomsList from './components/RoomsList.js';
import BookingForm from './components/BookingForm.js';
import AdminView from './components/AdminView.js';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

const useStyles = makeStyles({
  appBar: {
    marginBottom: '2rem',
  },
  container: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
});

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Workspace Booking System
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" className={classes.container}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Rooms" />
          <Tab label="Book a Room" />
          <Tab label="Admin Panel" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <RoomsList />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <BookingForm />
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <AdminView />
        </TabPanel>
      </Container>
    </ThemeProvider>
  );
}

export default App;