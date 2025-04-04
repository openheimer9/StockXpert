import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Paper,
  CircularProgress,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const featuredStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'META', name: 'Meta' },
];

const Home = () => {
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/market/overview');
        console.log('Market overview data:', response.data);
        setMarketData(response.data);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to fetch market data');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const handleStockClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };

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

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Stock Analysis
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Get comprehensive insights into stocks with our advanced analysis tools
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Featured Stocks
        </Typography>
        <Grid container spacing={2}>
          {featuredStocks.map((stock) => (
            <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
              <Card>
                <CardActionArea onClick={() => handleStockClick(stock.symbol)}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {stock.symbol}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {stock.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Market Overview
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : !marketData || !marketData.length ? (
          <Typography>No market data available</Typography>
        ) : (
          <Grid container spacing={2}>
            {marketData.map((index) => (
              <Grid item xs={12} md={4} key={index.symbol || Math.random()}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      {getIndexName(index.symbol)}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {formatNumber(index.price)}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      {(index.change || 0) >= 0 ? (
                        <TrendingUpIcon color="success" />
                      ) : (
                        <TrendingDownIcon color="error" />
                      )}
                      <Chip
                        label={`${(index.change || 0) >= 0 ? '+' : ''}${formatNumber(index.change)} (${formatNumber(index.changePercent)}%)`}
                        color={(index.change || 0) >= 0 ? 'success' : 'error'}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default Home; 