import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Button,
  Alert,
  Fade,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import axios from 'axios';

// API base URL - change this when deploying
const API_BASE_URL = typeof process.env !== 'undefined' && process.env.REACT_APP_API_URL 
  ? process.env.REACT_APP_API_URL 
  : 'https://back-end-three-ivory.vercel.app';

const MarketOverview = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Attempting to fetch from: ${API_BASE_URL}/api/market/overview`);
      
      // Add a timestamp to prevent caching issues
      const apiUrl = `${API_BASE_URL}/api/market/overview?t=${new Date().getTime()}`;
      console.log("Full API URL:", apiUrl);
      
      const response = await axios.get(apiUrl, {
        timeout: 15000, // 15 second timeout
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Market data response:', response);
      setMarketData(response.data);
    } catch (err) {
      console.error('Error fetching market data:', err);
      
      // More detailed error message
      let errorMessage = 'Failed to fetch market data';
      if (err.message) {
        errorMessage += `: ${err.message}`;
      }
      if (err.response) {
        errorMessage += ` (Status: ${err.response.status})`;
      }
      if (!navigator.onLine) {
        errorMessage = 'No internet connection. Please check your network.';
      }
      
      setError(errorMessage);
      
      // Use mock data as fallback in case of error
      setMarketData([
        { symbol: '^GSPC', name: 'S&P 500', price: null, change: null, changePercent: null, error: true },
        { symbol: '^IXIC', name: 'NASDAQ', price: null, change: null, changePercent: null, error: true },
        { symbol: '^DJI', name: 'DOW', price: null, change: null, changePercent: null, error: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-retry on mount if needed
  useEffect(() => {
    fetchMarketData();
    
    // Setup auto-retry with increasing delay
    if (retryCount < 3) {
      const timer = setTimeout(() => {
        if (error) {
          console.log(`Auto-retry attempt ${retryCount + 1}...`);
          setRetryCount(prev => prev + 1);
          fetchMarketData();
        }
      }, 3000 * (retryCount + 1)); // 3s, 6s, 9s delays
      
      return () => clearTimeout(timer);
    }
  }, [retryCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const getIndexName = (symbol) => {
    switch (symbol) {
      case '^GSPC':
        return 'S&P 500';
      case '^IXIC':
        return 'NASDAQ';
      case '^DJI':
        return 'DOW';
      default:
        return symbol;
    }
  };

  // Safe number formatting function
  const formatNumber = (num, decimals = 2) => {
    if (num === null || num === undefined) return 'N/A';
    return Number(num).toFixed(decimals);
  };

  if (loading) {
    return (
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Market Overview
        </Typography>
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper 
      sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 2,
        borderTop: '4px solid #3f51b5',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        background: 'rgba(18, 18, 18, 0.6)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <ShowChartIcon color="primary" fontSize="large" />
          <Typography variant="h5" component="h2" fontWeight="bold" 
            sx={{ 
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Market Overview
          </Typography>
        </Box>
        <Button 
          variant="contained"
          startIcon={<RefreshIcon />} 
          size="small" 
          onClick={fetchMarketData}
          disabled={loading}
          sx={{ 
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
        >
          Refresh
        </Button>
      </Box>
      
      {error && (
        <Alert 
          severity="warning" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            '& .MuiAlert-icon': {
              fontSize: '1.5rem'
            }
          }}
        >
          {error}
        </Alert>
      )}
      
      <Grid container spacing={2}>
        {marketData.map((index, i) => (
          <Grid item xs={12} sm={4} key={index.symbol || Math.random()}>
            <Fade in={true} style={{ transitionDelay: `${i * 100}ms` }}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                  },
                  background: 'rgba(30, 30, 30, 0.7)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <CardContent>
                  <Typography color="text.secondary" gutterBottom sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                    {getIndexName(index.symbol)}
                  </Typography>
                  {index.error ? (
                    <Box display="flex" flexDirection="column" alignItems="center" gap={1} mt={2}>
                      <Typography color="error.main">Data unavailable</Typography>
                      <Button 
                        size="small" 
                        startIcon={<RefreshIcon />} 
                        onClick={fetchMarketData}
                        sx={{ mt: 1 }}
                      >
                        Retry
                      </Button>
                    </Box>
                  ) : (
                    <>
                      <Typography variant="h4" fontWeight="bold" sx={{ mt: 1, textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                        {formatNumber(index.price)}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={2}>
                        {(index.change || 0) >= 0 ? (
                          <TrendingUpIcon color="success" />
                        ) : (
                          <TrendingDownIcon color="error" />
                        )}
                        <Chip
                          label={`${(index.change || 0) >= 0 ? '+' : ''}${formatNumber(index.change)} (${formatNumber(index.changePercent)}%)`}
                          color={(index.change || 0) >= 0 ? 'success' : 'error'}
                          size="medium"
                          sx={{ 
                            fontWeight: 'bold', 
                            borderRadius: '16px',
                            py: 0.5,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}
                        />
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default MarketOverview; 