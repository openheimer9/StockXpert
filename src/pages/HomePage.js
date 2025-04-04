import React from 'react';
import { Box, Typography, Button, Grid, Paper, Fade, Zoom } from '@mui/material';
import { Link } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import StockSearch from '../components/StockSearch';
import MarketOverview from '../components/MarketOverview';

// My favorite stocks to display
const popularStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' }, // might add more EV stocks later
  { symbol: 'NVDA', name: 'NVIDIA Corporation' }, // AI leader
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' }, // banking sector
];

// TODO: Add filter options for sectors
function HomePage() {
  // Will add state for filtering later
  // const [filterSector, setFilterSector] = useState(null);

  return (
    <Fade in={true} timeout={800}>
      <Box>
        <Zoom in={true} timeout={800}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              mb: 5,
              pt: 2
            }}
          >
            {/* Main heading with gradient - looks cool */}
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(45deg, #3f51b5 30%, #f50057 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                mb: 2,
                display: 'inline-block',
                textShadow: '0 3px 15px rgba(0,0,0,0.4)',
                letterSpacing: '0.5px'
              }}
            >
              StockXpert
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto', 
                mb: 4,
                px: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                color: 'rgba(255,255,255,0.85)'
              }}
            >
              Get comprehensive insights into stocks with real-time data and advanced analytics
            </Typography>
            
            <Box 
              sx={{ 
                maxWidth: '600px', 
                mx: 'auto',
                px: 2,
                mb: 5
              }}
            >
              <StockSearch />
            </Box>
          </Box>
        </Zoom>
        
        <MarketOverview />
        
        {/* Popular stocks section */}
        <Zoom in={true} style={{ transitionDelay: '400ms' }}>
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              textAlign: 'center',
              mb: 4,
              background: 'rgba(18, 18, 18, 0.6)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
              // boxShadow: "0px 4px 20px rgba(0,0,0,0.25)"
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={3}>
              <SearchIcon color="primary" />
              <Typography variant="h5" component="h2" fontWeight="bold" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                Popular Stocks
              </Typography>
            </Box>
            
            <Grid container spacing={2} justifyContent="center">
              {popularStocks.map((stock) => (
                <Grid item key={stock.symbol}>
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    to={`/stock/${stock.symbol}`}
                    startIcon={<TrendingUpIcon />}
                    sx={{ 
                      borderRadius: 8,
                      px: 2,
                      py: 1,
                      fontWeight: 'bold',
                      backdropFilter: 'blur(5px)',
                      backgroundColor: 'rgba(30, 30, 40, 0.4)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.3s',
                        backgroundColor: 'rgba(63, 81, 181, 0.2)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        borderColor: 'rgba(63, 81, 181, 0.5)',
                      },
                    }}
                  >
                    {stock.symbol}
                  </Button>
                </Grid>
              ))}
            </Grid>
            
            <Box mt={4}>
              <Typography variant="body2" color="text.secondary">
                Data provided by Yahoo Finance API
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                © 2025 StockXpert - Developed by Bhagirath Devani
              </Typography>
            </Box>
          </Paper>
        </Zoom>
      </Box>
    </Fade>
  );
}

export default HomePage; 