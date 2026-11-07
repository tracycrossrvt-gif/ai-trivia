import 'dotenv/config';
import express from 'express';
import practiceRoutes from './routes/practice.js';

const app = express();

// Vercel sits in front of the app, so read the visitor's IP from its headers.
// The per-visitor limits on reports and explanations depend on this.
app.set('trust proxy', true);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/practice', practiceRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`VetBoard API running on http://localhost:${port}`);
});
