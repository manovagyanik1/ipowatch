import './config/env.js';
import express from 'express';
import cors from 'cors';
import { ipoRouter } from './routes/ipoRoutes.js';
import { subscriberRouter } from './routes/subscriberRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { corsOptions } from './config/cors.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Increase timeout to 30 seconds
const SERVER_TIMEOUT = 30000;

// Configure server timeout
app.use((req, res, next) => {
  res.setTimeout(SERVER_TIMEOUT, () => {
    res.status(408).json({ 
      error: 'Request timeout while processing data',
      timeout: SERVER_TIMEOUT
    });
  });
  next();
});

// Configure CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.vercel.app'] 
    : ['http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Mount all API routes under /api
const apiRouter = express.Router();

// Health check endpoint
apiRouter.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Routes
apiRouter.use('/ipos', ipoRouter);
apiRouter.use('/', subscriberRouter);

// Mount the API router
app.use('/api', apiRouter);

// Error handling
app.use(errorHandler);

// Handle unhandled routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    path: req.path
  });
});

// Only listen when running locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;