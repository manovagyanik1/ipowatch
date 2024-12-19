const allowedOrigins = [
  'http://localhost:5173',  // Vite default
  'http://127.0.0.1:5173', // Vite alternative
  'http://localhost:3000',  // Express server
  'http://127.0.0.1:3000'  // Express alternative
];

export const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
  preflightContinue: false
};