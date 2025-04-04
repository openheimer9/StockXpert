import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Paper, 
  InputBase, 
  IconButton, 
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Fade
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// TODO: Replace with actual API later
const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' }, // added this myself
  { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.' },
];

function StockSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // This should be replaced with an actual API call
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 1) {
      // Mock search results for now
      const results = mockStocks.filter(item => 
        item.symbol.toLowerCase().includes(value.toLowerCase()) || 
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/stock/${query.trim().toUpperCase()}`);
      setQuery('');
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  function handleSuggestionClick(symbol) {
    navigate(`/stock/${symbol}`);
    setQuery('');
    setSuggestions([]);
  }

  return (
    <Box position="relative">
      {/* Search input with icon */}
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 10,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          background: 'rgba(30, 30, 30, 0.7)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s',
          '&:hover': {
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        <IconButton disabled sx={{ p: '10px', color: 'primary.main' }}>
          <TrendingUpIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: '1.1rem', py: 1 }}
          placeholder="Search for a stock symbol or company name..."
          value={query}
          onChange={handleSearch}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* Dropdown suggestions */}
      {suggestions.length > 0 && (
        <Fade in={true}>
          <Paper
            sx={{
              position: 'absolute',
              width: '100%',
              mt: 1,
              zIndex: 10,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(35, 35, 40, 0.85)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <List>
              {suggestions.map((suggestion) => (
                <ListItem
                  button
                  key={suggestion.symbol}
                  onClick={() => handleSuggestionClick(suggestion.symbol)}
                  sx={{
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(63, 81, 181, 0.2)',
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <Typography component="span" fontWeight="bold" color="primary.main">
                          {suggestion.symbol}
                        </Typography>
                        <Typography component="span" sx={{ ml: 1, color: 'text.secondary' }}>
                          - {suggestion.name}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Fade>
      )}
    </Box>
  );
}

export default StockSearch; 