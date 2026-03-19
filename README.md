# Mana

**Mana — Free AI Chat, Powered by NVIDIA** is a ready-to-deploy full-stack project that exposes a simple `/chat` endpoint, wraps NVIDIA's chat API behind your own server, and ships with a futuristic React landing page, examples, and deployment docs.

> Mana keeps authentication internal. Your app users call your API, not NVIDIA directly.

## Features

- **Simple chat API**: `POST /chat` with `{ "message": "..." }` and receive `{ "response": "..." }`.
- **Graceful error handling**: user-friendly JSON errors for invalid payloads, rate limits, and upstream failures.
- **Usage logging**: prompt previews, latency, model name, and IP are logged server-side.
- **Optional rate limiting**: configurable per-IP request limits using `express-rate-limit`.
- **Developer-ready frontend**: responsive landing page, live chat demo, animated logo, docs blocks, and quick start sections.
- **Deployment options**: works as a local full-stack app, a Vercel deployment, or a split GitHub Pages + Vercel setup.

## Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **API target**: NVIDIA chat completions endpoint (configurable through environment variables)
- **Hosting**: Vercel full-stack or GitHub Pages frontend + Vercel API

## Project structure

```text
.
├── api/chat.js            # Vercel serverless adapter
├── examples/node.mjs      # Node.js example
├── examples/python.py     # Python example
├── server/index.js        # Express server
├── server/lib/nvidia.js   # Shared NVIDIA API wrapper
├── src/                   # React landing page
├── .env.example           # Environment variables
└── vercel.json            # Vercel deployment config
```

## Local development

### 1. Install

```bash
npm install
cp .env.example .env
```

### 2. Configure NVIDIA credentials

Set these values in `.env`:

```bash
NVIDIA_API_KEY=nvapi-your-key
NVIDIA_API_URL=https://integrate.api.nvidia.com/v1/chat/completions
NVIDIA_MODEL=meta/llama-3.1-70b-instruct
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=30
VITE_API_BASE_URL=http://localhost:3001
```

### 3. Run the app

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3001/chat`

## API usage

### Endpoint

`POST /chat`

### Request body

```json
{ "message": "Tell me about Mana." }
```

### Success response

```json
{ "response": "Mana is a free AI chat wrapper powered by NVIDIA..." }
```

### Error response

```json
{ "error": "Request body must include a non-empty \"message\" string." }
```

### One-line examples

#### curl

```bash
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello Mana"}'
```

#### JavaScript / Node.js

```bash
node examples/node.mjs
```

#### Python

```bash
python examples/python.py
```

## Developer SDK examples

### JavaScript / Node.js

```js
const response = await fetch('https://your-api.example.com/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello from Node.js' })
});

console.log(await response.json());
```

### Python

```python
import requests

response = requests.post(
    'https://your-api.example.com/chat',
    json={'message': 'Hello from Python'},
    timeout=30,
)
print(response.json())
```

## Deployment

### Option A: Vercel full-stack

1. Push this repository to GitHub.
2. Import the project into Vercel.
3. Add environment variables from `.env.example` in the Vercel dashboard:
   - `NVIDIA_API_KEY`
   - `NVIDIA_API_URL`
   - `NVIDIA_MODEL`
   - `VITE_API_BASE_URL` (set it to your deployed base URL, or leave empty to use same-origin `/chat`)
4. Deploy. Vercel will build the React app and route `/chat` to `api/chat.js` using `vercel.json`.

### Option B: GitHub Pages frontend + Vercel API

1. Deploy the API to Vercel using this repository.
2. Set `VITE_API_BASE_URL=https://your-vercel-app.vercel.app` before building the frontend.
3. Build the frontend:

   ```bash
   npm run build
   ```

4. Publish the `dist/` directory to GitHub Pages using your preferred workflow.
5. The landing page chat demo will now send requests to your Vercel-hosted `/chat` endpoint.

## Notes about NVIDIA

Mana is a wrapper around NVIDIA's chat API. The project hides authentication from your end users, but **you still need to provide your own NVIDIA API key** through environment variables on the server.

The default API URL targets NVIDIA's chat completions endpoint and can be changed if you switch models or endpoints.

## Production tips

- Tune `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_MS` to protect your free tier.
- Add persistent logging or analytics if you want usage dashboards.
- Consider caching or moderation middleware if you plan to expose Mana publicly.
- If you want the frontend and backend on the same host, run `npm run build && npm start`.
