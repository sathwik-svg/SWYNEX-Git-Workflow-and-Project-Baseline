import React, { useState } from 'react';
import { GitCommit, Copy, Check, Search, BookOpen, Sparkles, Terminal } from 'lucide-react';
import { CONVENTIONAL_COMMIT_TYPES, CHEAT_SHEET_COMMANDS } from '../data/gitStandards';

export const CommitBuilder: React.FC = () => {
  const [selectedType, setSelectedType] = useState('feat');
  const [scope, setScope] = useState('workflow');
  const [subject, setSubject] = useState('establish project baseline and branching strategy');
  const [body, setBody] = useState('Implements standard Git Flow and Conventional Commits for SWYNEX Task 1.');
  const [issueNumber, setIssueNumber] = useState('1');
  const [isBreaking, setIsBreaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // Format full commit message
  const breakingMarker = isBreaking ? '!' : '';
  const scopeSegment = scope.trim() ? `(${scope.trim()})` : '';
  const firstLine = `${selectedType}${breakingMarker}${scopeSegment}: ${subject.trim()}`;
  
  let fullCommitCmd = `git commit -m "${firstLine}"`;
  if (body.trim()) {
    fullCommitCmd += ` -m "${body.trim()}"`;
  }
  if (issueNumber.trim()) {
    fullCommitCmd += ` -m "Closes #${issueNumber.trim()}"`;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCommitCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copySingleCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1500);
  };

  const filteredCategories = CHEAT_SHEET_COMMANDS.map((cat) => ({
    ...cat,
    commands: cat.commands.filter(
      (c) =>
        c.cmd.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.commands.length > 0);

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <span>Git Hygiene</span>
          <span aria-hidden="true">·</span>
          <span>Conventional Commits v1.0.0</span>
          <span aria-hidden="true">·</span>
          <span>SemVer Aligned</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Conventional Commit Generator & Command Reference
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Construct structured, semantic commit messages automatically, and browse essential Git commands for baseline development.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Commit Generator (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <GitCommit className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-slate-200">Interactive Commit Message Generator</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Type selector */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">1. Commit Type</label>
              <div className="grid grid-cols-3 gap-1.5">
                {CONVENTIONAL_COMMIT_TYPES.map((t) => (
                  <button
                    key={t.type}
                    type="button"
                    onClick={() => setSelectedType(t.type)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      selectedType === t.type
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-mono block">{t.type}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scope & Breaking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">2. Scope</label>
                <input
                  type="text"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  placeholder="e.g. auth, baseline, docs"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={isBreaking}
                    onChange={(e) => setIsBreaking(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-0"
                  />
                  <span className="text-slate-300 text-xs font-medium">Breaking Change (!)</span>
                </label>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                3. Short Imperative Summary (no capital first letter, no period)
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. establish git branching baseline"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">4. Body Context (optional)</label>
              <textarea
                rows={2}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Explain the motivation and contrast with previous behavior"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono resize-none"
              />
            </div>

            {/* Issue tracker */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">5. Issue / Ticket Reference (optional)</label>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-mono">Closes #</span>
                <input
                  type="text"
                  value={issueNumber}
                  onChange={(e) => setIssueNumber(e.target.value)}
                  placeholder="1"
                  className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            {/* Generated Command Box */}
            <div className="pt-2">
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-indigo-400" /> Generated Git Command:
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Command</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="font-mono text-emerald-400 text-xs whitespace-pre-wrap break-all leading-relaxed">
                  {fullCommitCmd}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Git Command Cheat Sheet (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-200">Git Workflow Cheat Sheet</h3>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search commands..."
                className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-44"
              />
            </div>
          </div>

          {/* Categorized Command List */}
          <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
            {filteredCategories.map((category) => (
              <div key={category.category} className="space-y-2">
                <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  {category.category}
                </h4>

                <div className="space-y-2">
                  {category.commands.map((cmd) => (
                    <div
                      key={cmd.cmd}
                      className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <code className="text-xs font-mono text-slate-200 font-semibold block truncate">
                          {cmd.cmd}
                        </code>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{cmd.desc}</span>
                      </div>

                      <button
                        onClick={() => copySingleCommand(cmd.cmd)}
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors shrink-0"
                        title="Copy command"
                      >
                        {copiedCmd === cmd.cmd ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
