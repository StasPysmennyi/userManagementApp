import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import { errorHandler } from 'src/middleware/errorHandler';
import { usersRouter } from 'src/routes/users';

const app = express();
const PORT = process.env.API_PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/users', usersRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
