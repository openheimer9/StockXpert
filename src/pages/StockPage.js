import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Divider,
  Fade,
  Zoom,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessIcon from '@mui/icons-material/Business';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShowChartIcon from '@mui/icons-material/ShowChart';

// API base URL - change this when deploying
const API_BASE_URL = typeof process.env !== 'undefined' && process.env.REACT_APP_API_URL 
  ? process.env.REACT_APP_API_URL 
  : 'https://back-end-three-ivory.vercel.app';

// TODO: Add chart visualization
// TODO: Add watchlist functionality
// TODO: Add historical data section

function StockPage() {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [watchlisted, setWatchlisted] = useState(false);  // implement later

  // Fetch data from backend API
  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE_URL}/api/stock/${symbol}`);
      console.log('Stock data:', response.data);
      setStockData(response.data);
      
      // For debugging
      // localStorage.setItem('lastStockData', JSON.stringify(response.data));
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setError(`Failed to fetch stock data: ${err.message || 'Unknown error'}`);
      
      // maybe add fallback data from local storage?
      // const fallbackData = localStorage.getItem('lastStockData');
      // if (fallbackData) setStockData(JSON.parse(fallbackData));
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchStockData();
  }, [symbol]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Helper functions for number formatting
  const formatNumber = (num, decimals = 2) => {
    if (num === null || num === undefined) return 'N/A';
    return Number(num).toFixed(decimals);
  };

  // For large numbers like market cap
  const formatLargeNumber = (num) => {
    if (num === null || num === undefined) return 'N/A';
    
    const n = Number(num);
    if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
    return `$${n.toFixed(2)}`;
  };

  // Format percent values
  const formatPercent = (num) => {
    if (num === null || num === undefined) return 'N/A';
    return `${(num * 100).toFixed(2)}%`;
  };

  // Handle loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" minHeight="60vh" pt={4}>
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3, 
            maxWidth: '600px', 
            width: '100%',
            borderRadius: 2,
            '& .MuiAlert-icon': {
              fontSize: '1.5rem'
            }
          }}
        >
          {error}
        </Alert>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<RefreshIcon />}
            onClick={fetchStockData}
            sx={{ borderRadius: 8 }}
          >
            Retry
          </Button>
          <Button 
            variant="outlined" 
            component={Link} 
            to="/"
            sx={{ borderRadius: 8 }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    );
  }

  // Handle no data state
  if (!stockData) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" minHeight="60vh" pt={4}>
        <Alert 
          severity="info" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
          }}
        >
          No data available for {symbol}
        </Alert>
        <Button 
          variant="contained" 
          component={Link} 
          to="/"
          sx={{ borderRadius: 8 }}
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Fade in={!loading} timeout={800}>
      <Box>
        <Zoom in={true} timeout={800}>
          <Paper 
            sx={{ 
              p: 3, 
              mb: 3, 
              borderRadius: 2,
              borderLeft: `6px solid ${(stockData.regularMarketChange || 0) >= 0 ? '#4caf50' : '#f44336'}`,
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  {stockData.name || symbol} 
                  <Chip 
                    label={stockData.symbol || symbol} 
                    size="small" 
                    color="primary" 
                    sx={{ ml: 1, borderRadius: 1, fontWeight: 'bold' }}
                  />
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <BusinessIcon fontSize="small" color="disabled" />
                  <Typography color="text.secondary" variant="body2">
                    {stockData.sector || 'N/A'} • {stockData.industry || 'N/A'}
                  </Typography>
                </Box>
              </Box>
              <Button 
                variant="contained"
                startIcon={<RefreshIcon />} 
                size="small" 
                onClick={fetchStockData}
                sx={{ borderRadius: 8 }}
              >
                Refresh
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" alignItems="center" gap={2}>
              <Box>
                <Typography variant="h3" fontWeight="bold">
                  ${formatNumber(stockData.regularMarketPrice)}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                {(stockData.regularMarketChange || 0) >= 0 ? (
                  <TrendingUpIcon color="success" sx={{ fontSize: 40 }} />
                ) : (
                  <TrendingDownIcon color="error" sx={{ fontSize: 40 }} />
                )}
                <Chip
                  label={`${(stockData.regularMarketChange || 0) >= 0 ? '+' : ''}${formatNumber(stockData.regularMarketChange)} (${formatNumber(stockData.regularMarketChangePercent)}%)`}
                  color={(stockData.regularMarketChange || 0) >= 0 ? 'success' : 'error'}
                  size="medium"
                  sx={{ 
                    fontWeight: 'bold', 
                    fontSize: '1rem',
                    height: 32,
                    borderRadius: 4
                  }}
                />
              </Box>
            </Box>
            
            {/* Will add watchlist button here
            <Box mt={2}>
              <Button 
                variant={watchlisted ? "contained" : "outlined"}
                size="small"
                onClick={() => setWatchlisted(!watchlisted)}
                startIcon={watchlisted ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              >
                {watchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>
            </Box>
            */}
          </Paper>
        </Zoom>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
              <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <ShowChartIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    Key Metrics
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4}>
                    <Card sx={{ borderRadius: 2, height: '100%' }}>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom variant="body2">
                          Market Cap
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {formatLargeNumber(stockData.marketCap)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Card sx={{ borderRadius: 2, height: '100%' }}>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom variant="body2">
                          P/E Ratio
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {formatNumber(stockData.forwardPE)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Card sx={{ borderRadius: 2, height: '100%' }}>
                      <CardContent>
                        <Typography color="text.secondary" gutterBottom variant="body2">
                          52-Week Change
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color={(stockData.fiftyTwoWeekChange || 0) >= 0 ? 'success.main' : 'error.main'}>
                          {formatPercent(stockData.fiftyTwoWeekChange)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Zoom>

            <Zoom in={true} style={{ transitionDelay: '300ms' }}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <MonetizationOnIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    Financial Performance
                  </Typography>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Metric</TableCell>
                        <TableCell align="right">Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Revenue</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          {formatLargeNumber(stockData.totalRevenue)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Profit Margins</TableCell>
                        <TableCell 
                          align="right" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: (stockData.profitMargin || 0) >= 0 ? 'success.main' : 'error.main'
                          }}
                        >
                          {formatPercent(stockData.profitMargin)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Return on Equity</TableCell>
                        <TableCell 
                          align="right" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: (stockData.returnOnEquity || 0) >= 0 ? 'success.main' : 'error.main'
                          }}
                        >
                          {formatPercent(stockData.returnOnEquity)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dividend Yield</TableCell>
                        <TableCell 
                          align="right" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: (stockData.dividendYield || 0) > 0 ? 'success.main' : 'inherit'
                          }}
                        >
                          {formatPercent(stockData.dividendYield)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Zoom>
          </Grid>

          <Grid item xs={12} md={4}>
            <Zoom in={true} style={{ transitionDelay: '400ms' }}>
              <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Company Information
                </Typography>
                <Box sx={{ mb: 2, mt: 3 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon color="action" fontSize="small" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: 0.5, ml: 3.5 }}>
                    {stockData.location || 'N/A'}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LanguageIcon color="action" fontSize="small" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Website
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: 0.5, ml: 3.5 }}>
                    {stockData.website ? (
                      <a 
                        href={stockData.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#90caf9', textDecoration: 'none' }}
                      >
                        {stockData.website}
                      </a>
                    ) : 'N/A'}
                  </Typography>
                </Box>
                <Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <BusinessIcon color="action" fontSize="small" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Exchange
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: 0.5, ml: 3.5 }}>
                    {stockData.exchange || 'N/A'}
                  </Typography>
                </Box>
              </Paper>
            </Zoom>
            
            {/* Will add recommendation trends here later
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Analyst Recommendations
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Coming soon...
                </Typography>
              </Box>
            </Paper>
            */}
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/"
            size="large"
            sx={{ 
              borderRadius: 8,
              px: 4,
              py: 1
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Fade>
  );
}

export default StockPage; 