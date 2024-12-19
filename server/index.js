import express from 'express';
import cors from 'cors';
import { ipoRouter } from './routes/ipoRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { corsOptions } from './config/cors.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS - use the imported corsOptions
app.use(cors(corsOptions));

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

// Start server
app.listen(PORT, () => {
  console.log(`
┌────────────────────────────────────────┐
│  IPO Watch Server                      │
├────────────────────────────────────────┤
│  Status: Running                       │
│  URL: http://localhost:${PORT}          │
│  Health: http://localhost:${PORT}/api/health │
└────────────────────────────────────────┘
  `);
});