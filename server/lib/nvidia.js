const defaultApiUrl = 'https://integrate.api.nvidia.com/v1/chat/completions';
const defaultModel = 'meta/llama-3.1-70b-instruct';

export async function callNvidiaChat(message) {
  const apiKey = process.env.NVIDIA_API_KEY;
  const apiUrl = process.env.NVIDIA_API_URL || defaultApiUrl;
  const model = process.env.NVIDIA_MODEL || defaultModel;

  if (!apiKey) {
    throw new Error('Missing NVIDIA_API_KEY environment variable.');
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      top_p: 0.9,
      max_tokens: 512,
      stream: false,
      messages: [
        {
          role: 'system',
          content:
            'You are Mana, a helpful AI assistant delivered through a free developer-friendly chat wrapper powered by NVIDIA.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = data?.error?.message || data?.message || 'NVIDIA API request failed.';
    const error = new Error(errorMessage);
    error.status = response.status;
    error.details = data;
    throw error;
  }

  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    const error = new Error('NVIDIA API returned an unexpected response shape.');
    error.status = 502;
    error.details = data;
    throw error;
  }

  return {
    response: content.trim(),
    model,
    raw: data,
  };
}
