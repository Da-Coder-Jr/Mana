import { callNvidiaChat } from '../server/lib/nvidia.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const startedAt = Date.now();
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (!message) {
    return res.status(400).json({ error: 'Request body must include a non-empty "message" string.' });
  }

  try {
    const result = await callNvidiaChat(message);

    console.log(
      JSON.stringify({
        event: 'chat_success',
        runtime: 'vercel',
        model: result.model,
        durationMs: Date.now() - startedAt,
        promptPreview: message.slice(0, 80),
        promptLength: message.length,
      }),
    );

    return res.status(200).json({ response: result.response });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: 'chat_error',
        runtime: 'vercel',
        durationMs: Date.now() - startedAt,
        promptPreview: message.slice(0, 80),
        promptLength: message.length,
        status: error.status || 500,
        error: error.message,
      }),
    );

    return res.status(error.status || 500).json({
      error: error.message || 'Unexpected server error.',
    });
  }
}
