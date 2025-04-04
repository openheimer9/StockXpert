import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Slide,
} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';

// TODO: Add dark/light mode toggle functionality
// TODO: Add mobile menu dropdown
function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Will add this later when implementing theme toggle
  /*
  const toggleTheme = () => {
    // Toggle between light and dark mode
    setDarkMode(!darkMode);
  }
  */

  return (
    <Slide direction="down" in={true} timeout={500}>
      <AppBar 
        position="sticky" 
        color="transparent" 
        elevation={0}
        sx={{ 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(18, 18, 18, 0.6)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar>
          {/* Logo and brand name */}
          <Button
            component={RouterLink}
            to="/"
            sx={{
              textTransform: 'none',
              color: 'white',
              '&:hover': {
                background: 'transparent',
              },
            }}
            startIcon={<ShowChartIcon />}
          >
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #3f51b5 30%, #f50057 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              StockXpert
            </Typography>
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          {/* Navigation links - hide on mobile */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/"
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  backdropFilter: 'blur(5px)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/stock/AAPL"
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  backdropFilter: 'blur(5px)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Sample Stock
              </Button>
            </Box>
          )}
          
          {/* Theme toggle and GitHub link buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              color="inherit" 
              size="small"
              // onClick={toggleTheme} - will add this later
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(5px)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                },
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              <LightModeIcon fontSize="small" />
            </IconButton>
            <IconButton 
              color="inherit" 
              size="small"
              href="https://github.com/openheimer9/StockXpert"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(5px)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                },
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export default Navbar; 