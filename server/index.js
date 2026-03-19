import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { callNvidiaChat } from './lib/nvidia.js';

const app = express();
const port = Number(process.env.PORT || 3001);
const clientOrigin = process.env.CLIENT_ORIGIN || '*';

app.use(cors({ origin: clientOrigin === '*' ? true : clientOrigin }));
app.use(express.json({ limit: '1mb' }));

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000),
  max: Number(process.env.RATE_LIMIT_MAX || 30),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Rate limit exceeded. Please try again soon.',
  },
});

app.use('/chat', limiter);

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'mana' });
});

app.post('/chat', async (req, res) => {
  const startedAt = Date.now();
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (!message) {
    return res.status(400).json({ error: 'Request body must include a non-empty "message" string.' });
  }

  try {
    const result = await callNvidiaChat(message);
    const duration = Date.now() - startedAt;

    console.log(
      JSON.stringify({
        event: 'chat_success',
        model: result.model,
        durationMs: duration,
        promptPreview: message.slice(0, 80),
        promptLength: message.length,
        ip: req.ip,
      }),
    );

    return res.json({ response: result.response });
  } catch (error) {
    const duration = Date.now() - startedAt;

    console.error(
      JSON.stringify({
        event: 'chat_error',
        durationMs: duration,
        promptPreview: message.slice(0, 80),
        promptLength: message.length,
        ip: req.ip,
        status: error.status || 500,
        error: error.message,
      }),
    );

    return res.status(error.status || 500).json({
      error: error.message || 'Unexpected server error.',
    });
  }
});

app.use(express.static('dist'));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/chat') || req.path.startsWith('/health')) {
    return next();
  }

  return res.sendFile(new URL('../dist/index.html', import.meta.url).pathname, (err) => {
    if (err) {
      next();
    }
  });
});

app.listen(port, () => {
  console.log(`Mana API listening on http://localhost:${port}`);
});
