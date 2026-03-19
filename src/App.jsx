import { useMemo, useState } from 'react';
import { ManaLogo } from './components/ManaLogo';

const features = [
  {
    title: 'Free chat endpoint',
    description: 'Call /chat with a single message payload and receive a clean JSON response without exposing your NVIDIA API key.',
  },
  {
    title: 'Production-friendly wrapper',
    description: 'Built-in error handling, structured usage logging, configurable model selection, and optional rate limiting.',
  },
  {
    title: 'Deploy anywhere fast',
    description: 'Run locally with Express + Vite or ship to Vercel and GitHub Pages using the included deployment guides.',
  },
];

const docsSteps = [
  'cp .env.example .env',
  'npm install',
  'npm run dev',
  'curl -X POST http://localhost:3001/chat -H "Content-Type: application/json" -d "{\"message\":\"Hello from Mana\"}"',
];

const sampleMessages = [
  'Summarize why AI wrappers are useful for developer tools.',
  'Write a playful product tagline for Mana.',
  'Explain what NVIDIA NIM is in one paragraph.',
];

const pricingItems = [
  'Always Free',
  'No per-seat fees',
  'No exposed NVIDIA credentials',
  'Bring your own deployment',
];

function App() {
  const [message, setMessage] = useState(sampleMessages[0]);
  const [response, setResponse] = useState('Your live response will appear here. Connect the server and ask Mana anything.');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiBase = useMemo(() => import.meta.env.VITE_API_BASE_URL || '', []);

  const submitMessage = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${apiBase}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Mana could not complete the request.');
      }

      setResponse(data.response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden text-mana-text">
      <div className="pointer-events-none absolute inset-0 grid-overlay" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_center,rgba(110,231,255,0.18),transparent_38%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-16 pt-6 sm:px-8 lg:px-10">
        <header className="glass sticky top-4 z-20 mb-12 flex items-center justify-between rounded-full px-5 py-3 shadow-glow">
          <div className="flex items-center gap-3">
            <ManaLogo compact />
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-mana-muted">Mana</span>
          </div>
          <nav className="hidden gap-6 text-sm text-mana-muted md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#demo" className="hover:text-white">Chat Demo</a>
            <a href="#quickstart" className="hover:text-white">Quick Start</a>
            <a href="#docs" className="hover:text-white">Docs</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </nav>
        </header>

        <main className="flex flex-1 flex-col gap-24">
          <section className="relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-200 shadow-glow">
                NVIDIA-powered chat API wrapper for builders
              </p>
              <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                Mana — Free AI Chat, Powered by NVIDIA
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-mana-muted sm:text-xl">
                Ship a polished AI chat API and landing page in minutes. Mana wraps NVIDIA&apos;s chat API,
                keeps authentication server-side, and gives developers a dead-simple <code>/chat</code> endpoint.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#demo"
                  className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-300"
                >
                  Try Mana
                </a>
                <a
                  href="#docs"
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/10"
                >
                  View Docs
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.title} className="glass rounded-3xl p-5 shadow-glow">
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-mana-muted">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 top-10 h-20 w-20 animate-float rounded-3xl border border-cyan-300/20 bg-cyan-400/10 blur-sm" />
              <div className="absolute right-2 top-0 h-24 w-24 animate-float rounded-full bg-purple-500/20 blur-2xl" />
              <div className="glass relative overflow-hidden rounded-[2rem] p-8 shadow-glow">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="absolute -bottom-14 left-0 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />
                <div className="relative flex flex-col items-center gap-8">
                  <ManaLogo />
                  <div className="grid w-full grid-cols-3 gap-4">
                    {[...Array(9)].map((_, index) => (
                      <div
                        key={index}
                        className="hex-tile h-16 border border-cyan-300/15 bg-gradient-to-br from-cyan-300/20 to-transparent shadow-glow"
                        style={{ animationDelay: `${index * 120}ms` }}
                      />
                    ))}
                  </div>
                  <div className="w-full rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                    <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-mana-muted">
                      <span>Mana Gateway</span>
                      <span>Secure /chat</span>
                    </div>
                    <div className="space-y-3 text-sm text-mana-muted">
                      <div className="rounded-2xl bg-white/5 p-3">POST /chat → {`{ message }`}</div>
                      <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-100">{`{ response: "AI reply" }`}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="grid gap-6 md:grid-cols-3">
            {[
              ['Logs every request', 'Tracks prompt previews, latency, model, and success/error states for lightweight observability.'],
              ['Optional rate limiting', 'Protect the free tier with configurable request caps per IP and a friendly JSON error response.'],
              ['Examples included', 'Use the included Node.js and Python snippets or start with the one-line curl examples.'],
            ].map(([title, description]) => (
              <div key={title} className="glass rounded-[2rem] p-6">
                <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
                  Feature
                </div>
                <h2 className="text-2xl font-semibold text-white">{title}</h2>
                <p className="mt-3 text-mana-muted">{description}</p>
              </div>
            ))}
          </section>

          <section id="demo" className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="glass rounded-[2rem] p-8">
              <h2 className="text-3xl font-semibold text-white">Chat Demo</h2>
              <p className="mt-3 text-mana-muted">
                Test your deployed <code>/chat</code> endpoint right from the landing page.
              </p>

              <form onSubmit={submitMessage} className="mt-6 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-cyan-100">Message</span>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={6}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 transition focus:border-cyan-300/60"
                  />
                </label>

                <div className="flex flex-wrap gap-3">
                  {sampleMessages.map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => setMessage(sample)}
                      className="rounded-full border border-white/10 px-4 py-2 text-sm text-mana-muted transition hover:border-cyan-300/50 hover:text-white"
                    >
                      {sample}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Contacting NVIDIA…' : 'Send to Mana'}
                </button>
              </form>
            </div>

            <div className="glass rounded-[2rem] p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-white">Response</h3>
                <span className="rounded-full border border-cyan-300/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
                  Live JSON
                </span>
              </div>
              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 text-sm leading-7 text-slate-200">
                <pre className="code-block">{JSON.stringify(error ? { error } : { response }, null, 2)}</pre>
              </div>
              <p className="mt-4 text-sm text-mana-muted">
                Tip: set <code>VITE_API_BASE_URL</code> when hosting the frontend on GitHub Pages so the demo points to your deployed API.
              </p>
            </div>
          </section>

          <section id="quickstart" className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="glass rounded-[2rem] p-8">
              <h2 className="text-3xl font-semibold text-white">Quick Start</h2>
              <ol className="mt-6 space-y-4 text-mana-muted">
                {docsSteps.map((step, index) => (
                  <li key={step} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-sm font-semibold text-cyan-200">
                      {index + 1}
                    </span>
                    <code className="text-sm text-slate-100">{step}</code>
                  </li>
                ))}
              </ol>
            </div>

            <div id="docs" className="glass rounded-[2rem] p-8">
              <h2 className="text-3xl font-semibold text-white">Docs & Examples</h2>
              <div className="mt-6 space-y-4 text-sm text-mana-muted">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-200">Node.js</p>
                  <pre className="code-block text-slate-100">{`fetch('https://your-api.example.com/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello from Node.js' })
}).then((res) => res.json()).then(console.log);`}</pre>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-200">Python</p>
                  <pre className="code-block text-slate-100">{`import requests
print(requests.post('https://your-api.example.com/chat', json={'message': 'Hello from Python'}).json())`}</pre>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-200">One-line curl</p>
                  <pre className="code-block text-slate-100">{`curl -X POST https://your-api.example.com/chat -H 'Content-Type: application/json' -d '{"message":"Hello Mana"}'`}</pre>
                </div>
              </div>
            </div>
          </section>

          <section id="pricing" className="glass rounded-[2rem] p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Pricing</p>
                <h2 className="mt-2 text-4xl font-semibold text-white">Always Free</h2>
                <p className="mt-3 max-w-2xl text-mana-muted">
                  Mana is designed as a zero-cost developer gateway you can deploy yourself. Customize the wrapper,
                  set your own NVIDIA credentials, and keep your app experience frictionless.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {pricingItems.map((item) => (
                  <div key={item} className="rounded-3xl border border-cyan-300/15 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-100">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
