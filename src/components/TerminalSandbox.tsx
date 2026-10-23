import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, Copy, Check } from 'lucide-react';

interface CommandEntry {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const TerminalSandbox: React.FC = () => {
  const [input, setInput] = useState('');
  const [currentBranch, setCurrentBranch] = useState('develop');
  const [stagedFiles, setStagedFiles] = useState<string[]>(['README.md', 'BRANCHING.md', '.gitignore']);
  const [history, setHistory] = useState<CommandEntry[]>([
    {
      command: 'git status',
      output: (
        <div className="text-slate-300 space-y-1">
          <p>On branch <span className="text-emerald-400 font-bold">develop</span></p>
          <p>Your branch is up to date with &apos;origin/develop&apos;.</p>
          <p className="mt-2 text-slate-400">Changes to be committed:</p>
          <p className="text-emerald-400 pl-4">new file:   README.md</p>
          <p className="text-emerald-400 pl-4">new file:   BRANCHING.md</p>
          <p className="text-emerald-400 pl-4">new file:   .gitignore</p>
          <p className="text-emerald-400 pl-4">new file:   .github/workflows/ci.yml</p>
        </div>
      ),
      timestamp: '08:00:12',
    },
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    if (!raw) return;

    const parts = raw.split(' ');
    const base = parts[0];
    const sub = parts[1];
    let output: React.ReactNode = null;

    if (raw === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (raw === 'help') {
      output = (
        <div className="text-slate-300 space-y-1.5">
          <p className="text-indigo-400 font-bold">SWYNEX Git CLI Sandbox - Available Commands:</p>
          <p><span className="text-amber-300 font-mono">git status</span> — inspect staging and working tree state</p>
          <p><span className="text-amber-300 font-mono">git branch [-a]</span> — list local & remote branches</p>
          <p><span className="text-amber-300 font-mono">git checkout &lt;branch&gt;</span> — switch to existing branch</p>
          <p><span className="text-amber-300 font-mono">git checkout -b &lt;name&gt;</span> — create & checkout new branch</p>
          <p><span className="text-amber-300 font-mono">git add .</span> — stage all modified baseline files</p>
          <p><span className="text-amber-300 font-mono">git commit -m &quot;...&quot;</span> — commit staged changes with Conventional Commits</p>
          <p><span className="text-amber-300 font-mono">git log [--oneline]</span> — display visual commit log</p>
          <p><span className="text-amber-300 font-mono">git merge &lt;branch&gt;</span> — merge specified branch into active branch</p>
          <p><span className="text-amber-300 font-mono">git push origin &lt;branch&gt;</span> — push branch commits to GitHub</p>
          <p><span className="text-amber-300 font-mono">git remote -v</span> — show configured GitHub remote URL</p>
          <p><span className="text-amber-300 font-mono">npm run lint / npm run build</span> — run baseline verification pipelines</p>
          <p><span className="text-amber-300 font-mono">ls -la / cat README.md</span> — browse project files</p>
          <p><span className="text-amber-300 font-mono">clear</span> — wipe terminal history</p>
        </div>
      );
    } else if (raw === 'git status') {
      output = (
        <div className="text-slate-300 space-y-1">
          <p>On branch <span className="text-emerald-400 font-bold">{currentBranch}</span></p>
          {stagedFiles.length > 0 ? (
            <div>
              <p className="text-slate-400">Changes to be committed (use &quot;git restore --staged &lt;file&gt;...&quot; to unstage):</p>
              {stagedFiles.map((f) => (
                <p key={f} className="text-emerald-400 pl-4">modified:   {f}</p>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">nothing to commit, working tree clean</p>
          )}
        </div>
      );
    } else if (raw.startsWith('git branch')) {
      output = (
        <div className="text-slate-300 space-y-1 font-mono">
          <p className={currentBranch === 'main' ? 'text-emerald-400 font-bold' : ''}>
            {currentBranch === 'main' ? '* ' : '  '}main
          </p>
          <p className={currentBranch === 'develop' ? 'text-emerald-400 font-bold' : ''}>
            {currentBranch === 'develop' ? '* ' : '  '}develop
          </p>
          <p className={currentBranch === 'feature/auth-service' ? 'text-emerald-400 font-bold' : ''}>
            {currentBranch === 'feature/auth-service' ? '* ' : '  '}feature/auth-service
          </p>
          <p className={currentBranch === 'hotfix/token-leak' ? 'text-emerald-400 font-bold' : ''}>
            {currentBranch === 'hotfix/token-leak' ? '* ' : '  '}hotfix/token-leak
          </p>
          {raw.includes('-a') && (
            <div className="text-red-400/80 pt-1">
              <p>  remotes/origin/HEAD -&gt; origin/main</p>
              <p>  remotes/origin/main</p>
              <p>  remotes/origin/develop</p>
            </div>
          )}
        </div>
      );
    } else if (raw.startsWith('git checkout -b ') || raw.startsWith('git switch -c ')) {
      const bName = raw.split(' ')[raw.startsWith('git checkout') ? 3 : 2];
      if (bName) {
        setCurrentBranch(bName);
        output = <p className="text-emerald-400 font-mono">Switched to a new branch &apos;{bName}&apos;</p>;
      }
    } else if (raw.startsWith('git checkout ') || raw.startsWith('git switch ')) {
      const bName = raw.split(' ')[raw.startsWith('git checkout') ? 2 : 1];
      if (bName) {
        setCurrentBranch(bName);
        output = <p className="text-emerald-400 font-mono">Switched to branch &apos;{bName}&apos;</p>;
      }
    } else if (raw.startsWith('git add')) {
      setStagedFiles(['README.md', 'BRANCHING.md', '.gitignore', '.github/workflows/ci.yml', 'package.json']);
      output = <p className="text-slate-400 font-mono">Staged all tracked and untracked changes.</p>;
    } else if (raw.startsWith('git commit')) {
      const match = raw.match(/-m\s+["'](.+?)["']/);
      const msg = match ? match[1] : 'chore: baseline commit';
      const hash = Math.random().toString(16).substring(2, 9);
      setStagedFiles([]);
      output = (
        <div className="text-slate-300 font-mono space-y-1">
          <p>[{currentBranch} {hash}] {msg}</p>
          <p className="text-slate-500"> 4 files changed, 240 insertions(+)</p>
          <p className="text-emerald-400 font-sans text-xs">✓ Follows SWYNEX Conventional Commit standards.</p>
        </div>
      );
    } else if (raw.startsWith('git log')) {
      output = (
        <div className="text-slate-300 font-mono space-y-1 text-xs">
          <p className="text-amber-400">* 9a0b1c2 (HEAD -&gt; {currentBranch}) feat(app): build interactive Git simulator and workbench</p>
          <p className="text-indigo-400">* 7c8d9e0 feat(docs): add formal BRANCHING.md strategy guide</p>
          <p className="text-indigo-400">* e4f5a6b docs(baseline): configure README.md and .gitignore</p>
          <p className="text-blue-400">* a1b2c3d (tag: v0.9.0, origin/main) chore(init): initial repository baseline structure</p>
        </div>
      );
    } else if (raw.startsWith('git push')) {
      output = (
        <div className="text-slate-300 font-mono space-y-1">
          <p>Enumerating objects: 12, done.</p>
          <p>Counting objects: 100% (12/12), done.</p>
          <p>Writing objects: 100% (12/12), 4.2 KiB | 4.20 MiB/s, done.</p>
          <p className="text-emerald-400">To https://github.com/sathwik-svg/SWYNEX-Git-Workflow-and-Project-Baseline.git</p>
          <p className="text-emerald-400 font-bold"> * [new branch]      {currentBranch} -&gt; {currentBranch}</p>
        </div>
      );
    } else if (raw === 'git remote -v') {
      output = (
        <div className="text-slate-300 font-mono space-y-1">
          <p>origin  https://github.com/sathwik-svg/SWYNEX-Git-Workflow-and-Project-Baseline.git (fetch)</p>
          <p>origin  https://github.com/sathwik-svg/SWYNEX-Git-Workflow-and-Project-Baseline.git (push)</p>
        </div>
      );
    } else if (raw.startsWith('git merge')) {
      const src = parts[2] || 'feature/auth-service';
      output = (
        <div className="text-slate-300 font-mono space-y-1">
          <p>Updating 7c8d9e0..5d6e7f8</p>
          <p className="text-emerald-400">Fast-forward</p>
          <p> src/auth/provider.ts | 48 ++++++++++++++++++++++++++++++++++++++++++++++++</p>
          <p> 1 file changed, 48 insertions(+)</p>
        </div>
      );
    } else if (raw === 'npm run lint') {
      output = (
        <div className="text-slate-300 font-mono space-y-1">
          <p>&gt; react-example@0.0.0 lint</p>
          <p>&gt; tsc --noEmit</p>
          <p className="text-emerald-400 font-bold mt-1">✓ TypeScript compilation passed with 0 errors.</p>
        </div>
      );
    } else if (raw === 'npm run build') {
      output = (
        <div className="text-slate-300 font-mono space-y-1">
          <p>&gt; vite build</p>
          <p className="text-slate-400">vite v8.3.0 building for production...</p>
          <p className="text-slate-400">transforming (28) modules...</p>
          <p className="text-emerald-400">✓ 34 modules transformed.</p>
          <p className="text-slate-200">dist/index.html                   0.85 kB │ gzip:  0.42 kB</p>
          <p className="text-slate-200">dist/assets/index-D8x2n.js        142.10 kB │ gzip: 44.82 kB</p>
          <p className="text-emerald-400 font-bold">✓ built in 340ms</p>
        </div>
      );
    } else if (raw === 'ls' || raw === 'ls -la') {
      output = (
        <div className="text-slate-300 font-mono grid grid-cols-2 sm:grid-cols-3 gap-2">
          <span>.github/</span>
          <span>.gitignore</span>
          <span>.env.example</span>
          <span>BRANCHING.md</span>
          <span>CONTRIBUTING.md</span>
          <span>README.md</span>
          <span>index.html</span>
          <span>package.json</span>
          <span>src/</span>
          <span>tsconfig.json</span>
          <span>vite.config.ts</span>
        </div>
      );
    } else if (raw.startsWith('cat ')) {
      const file = parts[1];
      output = (
        <p className="text-slate-300 font-mono text-xs">
          [File: {file}] — Inspect full content in the &quot;Baseline Docs&quot; tab.
        </p>
      );
    } else {
      output = (
        <p className="text-red-400 font-mono">
          command not recognized: {base}. Type <span className="text-white underline">&apos;help&apos;</span> to see supported Git and npm commands.
        </p>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: raw,
        output,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const copyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const quickCommands = [
    'git status',
    'git branch -a',
    'git checkout -b feature/user-profile',
    'git add .',
    'git commit -m "feat(profile): implement user avatar upload"',
    'git log --oneline',
    'git push origin develop',
    'npm run lint',
    'npm run build',
  ];

  return (
    <div className="space-y-4">
      {/* Quick click suggestions */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400">Quick run:</span>
        {quickCommands.map((qc) => (
          <button
            key={qc}
            onClick={() => handleCommand(qc)}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 font-mono text-[11px] text-slate-300 hover:text-white transition-colors"
          >
            {qc}
          </button>
        ))}
      </div>

      {/* Terminal Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
        {/* Terminal Header */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-slate-400 text-[11px] ml-2">
              bash — sathwik@swynex:~/SWYNEX-Git-Workflow-and-Project-Baseline ({currentBranch})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistory([])}
              className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800 transition-colors"
              title="Clear terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 space-y-4 min-h-[380px] max-h-[520px] overflow-y-auto">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-indigo-400 font-semibold">swynex@baseline</span>
                  <span className="text-slate-600">:</span>
                  <span className="text-emerald-400 font-semibold">~/repo</span>
                  <span className="text-slate-500">({currentBranch})</span>
                  <span className="text-slate-400">$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[10px] text-slate-500">
                  <span>{item.timestamp}</span>
                  <button
                    onClick={() => copyText(item.command, idx)}
                    className="hover:text-slate-300"
                    title="Copy command"
                  >
                    {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="pl-4 text-slate-300 border-l border-slate-800/80 my-1 py-0.5">
                {item.output}
              </div>
            </div>
          ))}

          {/* Prompt Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
              <span className="text-indigo-400 font-semibold">swynex@baseline</span>
              <span className="text-slate-600">:</span>
              <span className="text-emerald-400 font-semibold">~/repo</span>
              <span className="text-slate-500">({currentBranch})</span>
              <span className="text-slate-400">$</span>
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type git status, git log, git checkout -b ..., or help"
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600 caret-indigo-400"
              autoFocus
            />
            <button
              onClick={() => handleCommand(input)}
              className="text-slate-400 hover:text-white p-1"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};
