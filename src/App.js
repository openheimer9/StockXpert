import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StockPage from './pages/StockPage';

// Create a dark theme with custom colors
// TODO: Add light theme & theme toggle functionality
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5', // I like this blue
    },
    secondary: {
      main: '#f50057', // goes well with the blue
    },
    background: {
      default: '#121212',
      paper: 'rgba(18, 18, 18, 0.6)',
    },
  },
  components: {
    // Custom paper styling
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(18, 18, 18, 0.6)',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(30, 30, 30, 0.65)',
          backdropFilter: 'blur(5px)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          },
          borderRadius: 8,
        },
      },
    },
    // navbar styling
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(18, 18, 18, 0.7)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    // Button styles - no text transform & rounded corners
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
  // Typography adjustments
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

// Main app component
function App() {
  // const [darkMode, setDarkMode] = useState(true);
  // Will add theme toggle later

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        // using image from github for now, will replace with local one later
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
                     url('https://raw.githubusercontent.com/cursor-app-assets/stock-app/main/bull-bear-market.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}>
        <Navbar />
        <Container sx={{ 
          position: 'relative',
          zIndex: 2, 
          py: 4,
          maxWidth: { xs: '100%', sm: '95%', md: '90%', lg: '1200px' }
        }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stock/:symbol" element={<StockPage />} />
            {/* Add more routes here as needed */}
            {/* <Route path="/about" element={<AboutPage />} /> */}
            {/* <Route path="/watchlist" element={<WatchlistPage />} /> */}
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 