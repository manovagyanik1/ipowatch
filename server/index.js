import express from 'express';
import cors from 'cors';
import { ipoRouter } from './routes/ipoRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Routes
app.use('/api/ipos', ipoRouter);

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
│  Health: http://localhost:${PORT}/health │
└────────────────────────────────────────┘
  `);
});