import { useMemo, useState } from 'react';

const rooms = [
  {
    id: 'hearth',
    name: '~/hearth',
    title: 'Hearth Session',
    mood: 'Warm amber glow · rain against the window',
    accent: 'text-amber-200',
    border: 'border-amber-300/30',
    prompt: 'brew --focus',
    note: 'A slow little workspace for writing, planning, and keeping the day gentle.',
    tasks: [
      { label: 'Steep tea for 4 minutes', done: true },
      { label: 'Draft tiny roadmap', done: true },
      { label: 'Queue lo-fi cassette', done: false },
    ],
    log: [
      '[08:14] Booted hearth daemon and warmed the terminal.',
      '[08:18] Synced notes into today.txt.',
      '[08:26] Marked the morning as intentionally unhurried.',
    ],
  },
  {
    id: 'garden',
    name: '~/garden',
    title: 'Garden Queue',
    mood: 'Soft green phosphor · herbs by the sill',
    accent: 'text-emerald-200',
    border: 'border-emerald-300/30',
    prompt: 'harvest --ideas',
    note: 'Use this pane for collecting fragments before they turn into plans.',
    tasks: [
      { label: 'Capture three playful prompts', done: true },
      { label: 'Refine tonight\'s sketch', done: false },
      { label: 'Archive old snippets', done: false },
    ],
    log: [
      '[09:02] Seeded notes with an autumn palette.',
      '[09:09] Opened a scratch buffer for story beats.',
      '[09:17] Let one good idea stay unfinished on purpose.',
    ],
  },
  {
    id: 'attic',
    name: '~/attic',
    title: 'Attic Archive',
    mood: 'Dusty plum glow · cedar shelves overhead',
    accent: 'text-fuchsia-200',
    border: 'border-fuchsia-300/30',
    prompt: 'catalog --memories',
    note: 'A calm archive for old snippets, little rituals, and saved inspiration.',
    tasks: [
      { label: 'Tag favorite terminal themes', done: true },
      { label: 'Pin a cozy command alias', done: true },
      { label: 'Restore winter playlist links', done: false },
    ],
    log: [
      '[21:03] Indexed wallpaper references.',
      '[21:14] Restored a trusted shell alias: settle-in.',
      '[21:26] Archived three gentle UI ideas for later.',
    ],
  },
];

const commandOutputs = {
  'brew --focus': [
    '> heating workspace… done',
    '> status: candles lit, notifications muted, cursor relaxed',
    '> suggestion: pick one tiny thing and let it be enough',
  ],
  'harvest --ideas': [
    '> collecting soft fragments from open buffers',
    '> queued: moonlit checklist, porch playlist, amber accent tokens',
    '> suggestion: keep the rough edges; they make the space feel lived in',
  ],
  'catalog --memories': [
    '> attic index mounted successfully',
    '> restored snapshots: shell ritual.md, evening-notes.txt, lantern-theme.json',
    '> suggestion: save what still feels warm when reopened',
  ],
};

const shellHistory = [
  '$ settle-in --lights low',
  '$ tea --refill chamomile',
  '$ git status',
  '  on branch cozy-mode',
  '$ npm run daydream',
];

const statusCards = [
  ['uptime', '08h 42m'],
  ['lamps', '2 glowing'],
  ['playlist', 'lo-fi rain'],
  ['focus', 'soft sprint'],
];

function App() {
  const [activeRoom, setActiveRoom] = useState(rooms[0].id);
  const [draft, setDraft] = useState('Design a terminal nook that feels like warm wood, green phosphor, and a rainy evening.');

  const room = useMemo(() => rooms.find((entry) => entry.id === activeRoom) ?? rooms[0], [activeRoom]);
  const output = commandOutputs[room.prompt] ?? [];
  const completedCount = room.tasks.filter((task) => task.done).length;

  return (
    <div className="min-h-screen bg-ink text-stone-100">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="window-panel flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-stone-400">Cozy TUI Project</p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-50 sm:text-4xl">Hearth Terminal</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-300 sm:text-base">
              A single-page, cozy terminal-inspired retreat for planning gentle work, collecting ideas,
              and enjoying a moody desktop atmosphere.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {statusCards.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-stone-700/80 bg-stone-950/70 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.35em] text-stone-500">{label}</p>
                <p className="mt-2 text-base font-medium text-stone-100">{value}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid flex-1 gap-6 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="window-panel p-4">
            <div className="terminal-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Rooms</p>
              <div className="mt-3 space-y-3">
                {rooms.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setActiveRoom(entry.id)}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                      entry.id === room.id
                        ? `bg-stone-900/95 ${entry.border} shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_50px_rgba(0,0,0,0.35)]`
                        : 'border-stone-800 bg-stone-950/70 hover:border-stone-700 hover:bg-stone-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-stone-100">{entry.name}</span>
                      <span className={`text-xs uppercase tracking-[0.3em] ${entry.accent}`}>{entry.id}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-stone-400">{entry.mood}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-950/80 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Shell history</p>
              <div className="mt-3 space-y-2 font-mono text-sm text-stone-300">
                {shellHistory.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          </aside>

          <section className="window-panel overflow-hidden">
            <div className="border-b border-stone-800/90 px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className={`text-xs uppercase tracking-[0.35em] ${room.accent}`}>{room.mood}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-stone-50">{room.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-300">{room.note}</p>
                </div>
                <div className={`rounded-full border px-4 py-2 text-sm ${room.border} bg-stone-950/75 ${room.accent}`}>
                  {completedCount}/{room.tasks.length} rituals completed
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="terminal-shell min-h-[320px]">
                  <div className="flex items-center justify-between border-b border-stone-800/80 px-4 py-3">
                    <span className="font-mono text-sm text-stone-400">{room.prompt}</span>
                    <span className="rounded-full border border-stone-700 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-stone-500">
                      active session
                    </span>
                  </div>
                  <div className="space-y-4 px-4 py-5 font-mono text-sm leading-7 text-stone-200">
                    <div className="text-stone-500">$ {room.prompt}</div>
                    {output.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                    <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-100">
                      tip → let the interface breathe; empty space is part of the comfort.
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-stone-800 bg-stone-950/75 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Ritual checklist</p>
                    <div className="mt-4 space-y-3">
                      {room.tasks.map((task) => (
                        <div key={task.label} className="flex items-start gap-3 rounded-2xl border border-stone-800/80 bg-stone-900/70 px-3 py-3">
                          <span className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs ${task.done ? 'border-emerald-300/50 bg-emerald-400/15 text-emerald-200' : 'border-stone-700 text-stone-500'}`}>
                            {task.done ? '✓' : '·'}
                          </span>
                          <span className="text-sm leading-6 text-stone-300">{task.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-stone-800 bg-stone-950/75 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Session log</p>
                    <div className="mt-4 space-y-3 font-mono text-sm text-stone-300">
                      {room.log.map((item) => (
                        <div key={item} className="rounded-2xl border border-stone-800/80 bg-stone-900/70 px-3 py-3">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="rounded-3xl border border-stone-800 bg-stone-950/75 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Scratch buffer</p>
                  <textarea
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    className="mt-4 min-h-[220px] w-full resize-none rounded-2xl border border-stone-800 bg-stone-900/80 px-4 py-4 font-mono text-sm leading-7 text-stone-200 outline-none transition focus:border-amber-300/40"
                  />
                </div>

                <div className="rounded-3xl border border-stone-800 bg-stone-950/75 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Palette tokens</p>
                  <div className="mt-4 grid gap-3">
                    {[
                      ['amber-glow', '#f59e0b'],
                      ['moss-phosphor', '#34d399'],
                      ['plum-shadow', '#c084fc'],
                      ['woodsmoke', '#1c1917'],
                    ].map(([name, value]) => (
                      <div key={name} className="flex items-center justify-between rounded-2xl border border-stone-800/80 bg-stone-900/70 px-3 py-3">
                        <div className="flex items-center gap-3">
                          <span className="h-4 w-4 rounded-full border border-white/10" style={{ backgroundColor: value }} />
                          <span className="font-mono text-sm text-stone-300">{name}</span>
                        </div>
                        <span className="font-mono text-xs text-stone-500">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-stone-800 bg-gradient-to-br from-amber-400/10 via-transparent to-emerald-400/10 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Now playing</p>
                  <h3 className="mt-3 text-xl font-medium text-stone-100">Rain on the Fire Escape</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-300">
                    Hushed keys, kettle steam, and a cassette loop tuned for long evenings.
                  </p>
                </div>
              </aside>
            </div>
          </section>

          <aside className="window-panel p-4">
            <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Project notes</p>
            <div className="mt-4 space-y-4">
              {[
                'Replace the flashy landing-page feel with a tactile terminal nook.',
                'Keep everything in one self-contained Vite + React project.',
                'Favor warm colors, monospace details, and quiet interaction patterns.',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-stone-800 bg-stone-950/80 px-4 py-4 text-sm leading-6 text-stone-300">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-950/80 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Commands</p>
              <div className="mt-3 space-y-2 font-mono text-sm text-stone-300">
                <div>npm install</div>
                <div>npm run dev</div>
                <div>npm run build</div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
