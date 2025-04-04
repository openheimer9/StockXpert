import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const StockDetails = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/stock/${symbol}`);
        console.log('Stock data:', response.data);
        setStockData(response.data);
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('Failed to fetch stock data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  // Safe number formatting function
  const formatNumber = (num, decimals = 2) => {
    if (num === null || num === undefined) return 'N/A';
    return Number(num).toFixed(decimals);
  };

  // Safe billion formatter
  const formatBillion = (num) => {
    if (num === null || num === undefined) return 'N/A';
    return `$${(Number(num) / 1e9).toFixed(2)}B`;
  };

  // Safe percentage formatter
  const formatPercentage = (num) => {
    if (num === null || num === undefined) return 'N/A';
    return `${(Number(num) * 100).toFixed(2)}%`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!stockData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography>No data available for {symbol}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1">
              {stockData.name || symbol} ({stockData.symbol || symbol})
            </Typography>
            <Typography color="text.secondary">
              {stockData.sector || 'N/A'} • {stockData.industry || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
              <Typography variant="h5">
                ${formatNumber(stockData.regularMarketPrice)}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                {(stockData.regularMarketChange || 0) >= 0 ? (
                  <TrendingUpIcon color="success" />
                ) : (
                  <TrendingDownIcon color="error" />
                )}
                <Chip
                  label={`${(stockData.regularMarketChange || 0) >= 0 ? '+' : ''}${formatNumber(stockData.regularMarketChange)} (${formatNumber(stockData.regularMarketChangePercent)}%)`}
                  color={(stockData.regularMarketChange || 0) >= 0 ? 'success' : 'error'}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Key Metrics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Market Cap
                    </Typography>
                    <Typography variant="h6">
                      {stockData.marketCap ? formatBillion(stockData.marketCap) : 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      P/E Ratio
                    </Typography>
                    <Typography variant="h6">
                      {formatNumber(stockData.forwardPE)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Dividend Yield
                    </Typography>
                    <Typography variant="h6">
                      {stockData.dividendYield ? formatPercentage(stockData.dividendYield) : 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Financial Performance
            </Typography>
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
                    <TableCell align="right">
                      {formatBillion(stockData.totalRevenue)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Net Income</TableCell>
                    <TableCell align="right">
                      {formatBillion(stockData.netIncome)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Operating Margin</TableCell>
                    <TableCell align="right">
                      {formatPercentage(stockData.operatingMargins)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Return on Equity</TableCell>
                    <TableCell align="right">
                      {formatPercentage(stockData.returnOnEquity)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Company Information
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Location
              </Typography>
              <Typography>{stockData.location || 'N/A'}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Website
              </Typography>
              <Typography>
                {stockData.website ? (
                  <a href={stockData.website} target="_blank" rel="noopener noreferrer">
                    {stockData.website}
                  </a>
                ) : (
                  'N/A'
                )}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Exchange
              </Typography>
              <Typography>{stockData.exchange || 'N/A'}</Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Analyst Recommendations
            </Typography>
            {!stockData.recommendations || stockData.recommendations.length === 0 ? (
              <Typography>No recommendations available</Typography>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Rating</TableCell>
                      <TableCell align="right">Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stockData.recommendations.map((rec, index) => (
                      <TableRow key={rec.rating || `recommendation-${index}`}>
                        <TableCell>{rec.rating || 'N/A'}</TableCell>
                        <TableCell align="right">{rec.count || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StockDetails; 