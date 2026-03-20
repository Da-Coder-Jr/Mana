import { useEffect, useMemo, useState } from 'react';

const workspaces = [
  {
    id: 'shell',
    label: 'shell',
    name: 'mana-shell',
    directory: '~/Projects/Mana',
    branch: 'codex/warp-terminal-ui',
    status: 'Live preview',
    summary: 'Prompt rendering, command blocks, and split panes tuned for a polished terminal workflow.',
    command: 'mana prompt preview --profile aurora-grid',
    tabs: ['session.mana', 'blocks.ts', 'theme.json'],
    metrics: [
      ['blocks', '12 live'],
      ['splits', '3 panes'],
      ['latency', '14 ms'],
    ],
    blocks: [
      {
        title: 'Prompt bootstrap',
        state: 'ready',
        latency: '14 ms',
        lines: [
          '$ mana prompt preview --profile aurora-grid',
          'Loaded shell frame, prompt glyphs, and compact git context.',
          'Injected workspace badges, runtime tags, and command hints.',
        ],
      },
      {
        title: 'Reusable command blocks',
        state: 'running',
        latency: '2 sec',
        lines: [
          '$ mana blocks render --layout stacked',
          'Streaming stdout into cards that can be recalled later.',
          'Pinned the last successful build next to the active shell block.',
        ],
      },
      {
        title: 'Theme export',
        state: 'queued',
        latency: 'next',
        lines: [
          '$ mana theme export --target wezterm',
          'Prepared accent tokens, prompt separators, and terminal chrome values.',
          'Waiting for a final palette pick before writing the config bundle.',
        ],
      },
    ],
    checklist: [
      'Compact prompt with git, runtime, and host metadata',
      'Stacked output blocks instead of one long scrollback wall',
      'Split editor, shell, and logs in the same visual frame',
    ],
    feed: [
      '[10:12] Refreshed prompt tokens for dark glass chrome.',
      '[10:15] Synced command block spacing with the tab strip.',
      '[10:20] Replayed the last build output into a pinned block.',
    ],
  },
  {
    id: 'themes',
    label: 'themes',
    name: 'mana-themes',
    directory: '~/Projects/Mana/themes',
    branch: 'palette/studio',
    status: 'Studio open',
    summary: 'Theme packs for shell chrome, prompt highlights, command borders, and focused glow.',
    command: 'mana theme compare --preset ember-syntax',
    tabs: ['palette.mana', 'shell.css', 'preview.log'],
    metrics: [
      ['presets', '9 loaded'],
      ['accents', '24 tokens'],
      ['contrast', 'AA pass'],
    ],
    blocks: [
      {
        title: 'Accent merge',
        state: 'ready',
        latency: '9 ms',
        lines: [
          '$ mana theme compare --preset ember-syntax',
          'Shifted tab focus, prompt edge, and cursor glow onto one accent family.',
          'Balanced command headers so bright colors do not overpower output.',
        ],
      },
      {
        title: 'Surface polish',
        state: 'running',
        latency: '1 sec',
        lines: [
          '$ mana frame tune --glass medium',
          'Raised top bar contrast and softened the panel shadow falloff.',
          'Added a subtle scanline grid so the shell still feels technical.',
        ],
      },
      {
        title: 'Export bundle',
        state: 'ready',
        latency: 'done',
        lines: [
          '$ mana theme pack --shareable',
          'Bundled prompt, terminal, and split-pane tokens into one profile.',
          'Ready to ship a single preset instead of scattered theme fragments.',
        ],
      },
    ],
    checklist: [
      'Single accent color driving tabs, prompt, and active command block',
      'Glass panels with readable contrast on laptop and ultrawide layouts',
      'Preset export that can map to other terminal configs later',
    ],
    feed: [
      '[09:48] Locked the ember palette into the shell border system.',
      '[09:51] Reduced blur so output text stays crisp.',
      '[09:57] Added preset previews for prompt and split-pane chrome.',
    ],
  },
  {
    id: 'flows',
    label: 'flows',
    name: 'mana-flows',
    directory: '~/Projects/Mana/flows',
    branch: 'workflow/notebooks',
    status: 'Flow sync',
    summary: 'Notebook-style terminal flows that group commands, notes, and agent suggestions in one place.',
    command: 'mana workflow open deploy-preview',
    tabs: ['deploy.flow', 'notes.md', 'agent.out'],
    metrics: [
      ['flows', '6 saved'],
      ['steps', '23 actions'],
      ['handoffs', '4 agents'],
    ],
    blocks: [
      {
        title: 'Deploy flow',
        state: 'running',
        latency: '3 sec',
        lines: [
          '$ mana workflow open deploy-preview',
          'Loaded setup, build, and verification blocks into a single command lane.',
          'Attached notes and agent guidance beside each shell block.',
        ],
      },
      {
        title: 'Team handoff',
        state: 'queued',
        latency: 'waiting',
        lines: [
          '$ mana agent assign --task review-ui',
          'Prepared a review block with diff context and release notes.',
          'Holding until the latest build artifact is attached to the session.',
        ],
      },
      {
        title: 'Recap block',
        state: 'ready',
        latency: 'done',
        lines: [
          '$ mana summary tail --last-run',
          'Captured the exact commands, timings, and status badges from the flow.',
          'Ready to reuse the same sequence without rebuilding the context by hand.',
        ],
      },
    ],
    checklist: [
      'Saved command sequences with notes next to each shell block',
      'Agent guidance embedded directly in the flow rather than separate docs',
      'Fast recap of what ran, what failed, and what to retry next',
    ],
    feed: [
      '[08:31] Opened the deploy notebook in split view.',
      '[08:36] Linked review notes to the verification block.',
      '[08:43] Saved the final session as a reusable flow template.',
    ],
  },
];

const themeProfiles = [
  {
    id: 'aurora-grid',
    name: 'Aurora Grid',
    accent: '#74f7d5',
    strong: '#d9fff7',
    soft: '#11323a',
    glow: 'rgba(116, 247, 213, 0.24)',
    description: 'Cool mint glow with a dense grid backdrop and bright prompt edge.',
  },
  {
    id: 'ember-syntax',
    name: 'Ember Syntax',
    accent: '#ff9f58',
    strong: '#ffe6d1',
    soft: '#362015',
    glow: 'rgba(255, 159, 88, 0.22)',
    description: 'Warm orange chrome for command-heavy sessions and low-light desks.',
  },
  {
    id: 'cobalt-ops',
    name: 'Cobalt Ops',
    accent: '#69a7ff',
    strong: '#dce9ff',
    soft: '#152541',
    glow: 'rgba(105, 167, 255, 0.22)',
    description: 'Sharper blue contrast for workflows that need a colder operations feel.',
  },
];

const overviewStats = [
  ['shell chrome', 'Warp-style'],
  ['layout', '3-column'],
  ['blocks', 'Reusable'],
  ['mode', 'Theme studio'],
];

const shortcutCards = [
  {
    label: 'Command palette',
    value: 'cmd + k',
    note: 'Search flows, presets, and pinned blocks.',
  },
  {
    label: 'Split terminal',
    value: 'cmd + d',
    note: 'Open a second shell without losing the current block stack.',
  },
  {
    label: 'Replay last block',
    value: 'shift + enter',
    note: 'Re-run the focused command while keeping its prior output nearby.',
  },
];

const stateClasses = {
  ready: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100',
  running: 'border-sky-400/20 bg-sky-400/10 text-sky-100',
  queued: 'border-amber-300/20 bg-amber-300/10 text-amber-100',
};

function App() {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0].id);
  const [activeTheme, setActiveTheme] = useState(themeProfiles[0].id);
  const [draftCommand, setDraftCommand] = useState(workspaces[0].command);

  const workspace = useMemo(
    () => workspaces.find((entry) => entry.id === activeWorkspace) ?? workspaces[0],
    [activeWorkspace],
  );
  const theme = useMemo(
    () => themeProfiles.find((entry) => entry.id === activeTheme) ?? themeProfiles[0],
    [activeTheme],
  );

  useEffect(() => {
    setDraftCommand(workspace.command);
  }, [workspace]);

  return (
    <div
      className="app-shell min-h-screen text-slate-100"
      style={{
        '--theme-accent': theme.accent,
        '--theme-strong': theme.strong,
        '--theme-soft': theme.soft,
        '--theme-glow': theme.glow,
      }}
    >
      <div className="halo halo-left" />
      <div className="halo halo-right" />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col gap-6 px-4 py-6 sm:px-6 xl:px-8">
        <header className="window-panel flex flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Mana Terminal UI</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
              Make the repo feel like a modern terminal workspace.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              This refactor turns Mana into a polished, Warp-inspired shell interface with command
              blocks, theme presets, split-pane context, and a stronger sense of terminal chrome.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {overviewStats.map(([label, value]) => (
              <div key={label} className="stat-card">
                <p className="stat-label">{label}</p>
                <p className="stat-value">{value}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="window-panel p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Workspaces</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-50">Session rail</h2>
              </div>
              <div className="terminal-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {workspaces.map((entry) => {
                const isActive = entry.id === workspace.id;

                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setActiveWorkspace(entry.id)}
                    className={`workspace-card ${isActive ? 'workspace-card-active' : ''}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-slate-100">{entry.name}</span>
                      <span className="workspace-label">{entry.label}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{entry.summary}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>{entry.directory}</span>
                      <span>{entry.status}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="panel-section mt-6">
              <p className="section-title">Workspace checklist</p>
              <div className="mt-4 space-y-3">
                {workspace.checklist.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/6 bg-white/4 px-3 py-3 text-sm leading-6 text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="window-panel overflow-hidden">
              <div className="border-b border-white/8 px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="eyebrow">Active session</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-50">{workspace.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{workspace.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {workspace.metrics.map(([label, value]) => (
                      <div key={label} className="metric-pill">
                        <span className="metric-label">{label}</span>
                        <span className="metric-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {workspace.tabs.map((tab, index) => (
                    <div
                      key={tab}
                      className={`tab-pill ${index === 0 ? 'tab-pill-active' : ''}`}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              </div>

              <div className="terminal-surface p-5 sm:p-6">
                <div className="command-bar">
                  <span className="font-mono text-sm text-[var(--theme-strong)]">mana</span>
                  <input
                    value={draftCommand}
                    onChange={(event) => setDraftCommand(event.target.value)}
                    className="command-input"
                    aria-label="Command preview"
                  />
                  <button type="button" className="run-button">
                    Run block
                  </button>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                  <div className="space-y-4">
                    {workspace.blocks.map((block, index) => (
                      <article key={block.title} className="terminal-block">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="block-index">Block {String(index + 1).padStart(2, '0')}</p>
                            <h3 className="mt-1 text-lg font-medium text-slate-50">{block.title}</h3>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`status-chip ${stateClasses[block.state] ?? stateClasses.ready}`}>
                              {block.state}
                            </span>
                            <span className="rounded-full border border-white/8 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-500">
                              {block.latency}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2 font-mono text-sm leading-7 text-slate-300">
                          {block.lines.map((line) => (
                            <div
                              key={line}
                              className={line.startsWith('$') ? 'text-[var(--theme-strong)]' : ''}
                            >
                              {line}
                            </div>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>

                  <aside className="space-y-4">
                    <div className="terminal-sidecard">
                      <p className="section-title">Prompt anatomy</p>
                      <div className="mt-4 space-y-3 font-mono text-sm text-slate-300">
                        <div className="rounded-2xl border border-white/6 bg-black/20 px-3 py-3">
                          <span className="text-[var(--theme-strong)]">mana</span>
                          <span className="text-slate-500">:</span>
                          <span className="text-slate-200">{workspace.directory}</span>
                        </div>
                        <div className="rounded-2xl border border-white/6 bg-black/20 px-3 py-3">
                          branch <span className="text-[var(--theme-strong)]">{workspace.branch}</span>
                        </div>
                        <div className="rounded-2xl border border-white/6 bg-black/20 px-3 py-3">
                          preset <span className="text-[var(--theme-strong)]">{theme.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="terminal-sidecard">
                      <p className="section-title">Command stack</p>
                      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                        <div className="rounded-2xl border border-white/6 bg-white/4 px-3 py-3">
                          Pinned build log stays visible beside the current command block.
                        </div>
                        <div className="rounded-2xl border border-white/6 bg-white/4 px-3 py-3">
                          Reusable flows bundle command history, notes, and agent output.
                        </div>
                        <div className="rounded-2xl border border-white/6 bg-white/4 px-3 py-3">
                          Theme presets control tabs, prompt edge, panels, and cursor glow.
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="window-panel p-4">
                <p className="section-title">Recent session feed</p>
                <div className="mt-4 space-y-3 font-mono text-sm text-slate-300">
                  {workspace.feed.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/6 bg-white/4 px-4 py-3">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="window-panel p-4">
                <p className="section-title">Keyboard flow</p>
                <div className="mt-4 space-y-3">
                  {shortcutCards.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/6 bg-white/4 px-4 py-3"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium text-slate-100">{item.label}</span>
                        <span className="rounded-full border border-white/8 px-3 py-1 font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
                          {item.value}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="window-panel p-4">
            <p className="eyebrow">Theme studio</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-50">Preset switcher</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Pick a preset and the terminal chrome updates instantly across the prompt, blocks, and
              focused accents.
            </p>

            <div className="mt-5 space-y-3">
              {themeProfiles.map((profile) => {
                const isActive = profile.id === theme.id;

                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => setActiveTheme(profile.id)}
                    className={`theme-card ${isActive ? 'theme-card-active' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="theme-swatch"
                        style={{
                          background: `linear-gradient(135deg, ${profile.accent}, ${profile.strong})`,
                          boxShadow: `0 0 24px ${profile.glow}`,
                        }}
                      />
                      <div className="text-left">
                        <div className="text-sm font-medium text-slate-100">{profile.name}</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">
                          {profile.id}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-left text-sm leading-6 text-slate-300">
                      {profile.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="panel-section mt-6">
              <p className="section-title">Why this feels better</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                <div className="rounded-2xl border border-white/6 bg-white/4 px-4 py-3">
                  Clear shell chrome gives the interface a terminal identity instead of a generic dashboard.
                </div>
                <div className="rounded-2xl border border-white/6 bg-white/4 px-4 py-3">
                  Command blocks separate input, output, and notes so sessions are easier to scan later.
                </div>
                <div className="rounded-2xl border border-white/6 bg-white/4 px-4 py-3">
                  Theme presets make the project feel configurable, not just decorated.
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
