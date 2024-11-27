import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { auth } from 'express-oauth2-jwt-bearer';
import { listingsRouter } from './routes/listings.js';
import { usersRouter } from './routes/users.js';
import { paymentsRouter } from './routes/payments.js';
import { analyticsRouter } from './routes/analytics.js';
import { initializeDatabase } from './database/init.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize database
initializeDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Auth0 JWT validation middleware
const checkJwt = auth({
  audience: 'https://api.avatarai.com',
  issuerBaseURL: `https://dev-ryb2nxovei76xysy.us.auth0.com/`,
});

// Routes
app.use('/api/listings', checkJwt, listingsRouter);
app.use('/api/users', checkJwt, usersRouter);
app.use('/api/payments', checkJwt, paymentsRouter);
app.use('/api/analytics', checkJwt, analyticsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});