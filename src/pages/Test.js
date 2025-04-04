import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Test = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Test Component
      </Typography>
      <Typography variant="body1" paragraph>
        This is a simple test component to check if React is working properly.
      </Typography>
      <Button variant="contained" color="primary">
        Test Button
      </Button>
    </Box>
  );
};

export default Test; 