const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Determine API URL based on environment
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api', // no rewrite needed, but could be configured if needed
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ 
          error: 'Proxy error connecting to API',
          message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
        }));
      }
    })
  );
}; 