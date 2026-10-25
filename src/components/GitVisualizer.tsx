import React, { useState } from 'react';
import {
  GitCommit,
  GitBranch,
  GitMerge,
  Tag,
  RotateCcw,
  Plus,
  Play,
  ArrowRight,
  Info,
  Check,
  User,
  Clock,
  Hash,
} from 'lucide-react';
import { CommitNode, DEFAULT_BRANCHES, INITIAL_COMMITS, CONVENTIONAL_COMMIT_TYPES } from '../data/gitStandards';

export const GitVisualizer: React.FC = () => {
  const [commits, setCommits] = useState<CommitNode[]>(INITIAL_COMMITS);
  const [activeBranch, setActiveBranch] = useState<string>('develop');
  const [selectedCommit, setSelectedCommit] = useState<CommitNode | null>(INITIAL_COMMITS[INITIAL_COMMITS.length - 1]);
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);

  // Form states
  const [commitType, setCommitType] = useState('feat');
  const [commitScope, setCommitScope] = useState('workflow');
  const [commitDesc, setCommitDesc] = useState('add interactive branch simulation');
  const [newBranchName, setNewBranchName] = useState('feature/ci-pipeline');
  const [mergeSourceBranch, setMergeSourceBranch] = useState('feature/auth-service');
  const [tagName, setTagName] = useState('v1.0.0');

  // Available unique branches in commit list
  const existingBranches = Array.from(new Set(commits.map((c) => c.branch)));
  const allBranches = Array.from(new Set([...DEFAULT_BRANCHES.map((b) => b.name), ...existingBranches]));

  const getBranchColor = (branchName: string) => {
    const found = DEFAULT_BRANCHES.find((b) => b.name === branchName);
    if (found) return found.color;
    if (branchName.startsWith('feature/')) return '#8b5cf6';
    if (branchName.startsWith('hotfix/')) return '#ef4444';
    if (branchName.startsWith('release/')) return '#f59e0b';
    if (branchName.startsWith('bugfix/')) return '#06b6d4';
    return '#64748b';
  };

  const generateHash = () => {
    return Math.random().toString(16).substring(2, 9);
  };

  const handleCreateCommit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!commitDesc.trim()) return;

    const fullMessage = commitScope.trim()
      ? `${commitType}(${commitScope.trim()}): ${commitDesc.trim()}`
      : `${commitType}: ${commitDesc.trim()}`;

    const parent = commits.filter((c) => c.branch === activeBranch).slice(-1)[0] || commits[commits.length - 1];

    const newCommit: CommitNode = {
      id: `c_${Date.now()}`,
      hash: generateHash(),
      branch: activeBranch,
      message: fullMessage,
      author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      parentHash: parent?.hash,
      isHead: true,
    };

    const updated = commits.map((c) => ({ ...c, isHead: false }));
    setCommits([...updated, newCommit]);
    setSelectedCommit(newCommit);
    setCommitDesc('');
    setShowCommitModal(false);
  };

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newBranchName.trim().toLowerCase().replace(/\s+/g, '-');
    if (!cleanName) return;

    setActiveBranch(cleanName);
    setShowBranchModal(false);
  };

  const handleMergeBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mergeSourceBranch === activeBranch) return;

    const sourceLastCommit = commits.filter((c) => c.branch === mergeSourceBranch).slice(-1)[0];
    const targetLastCommit = commits.filter((c) => c.branch === activeBranch).slice(-1)[0];

    const mergeCommit: CommitNode = {
      id: `c_${Date.now()}`,
      hash: generateHash(),
      branch: activeBranch,
      message: `merge(pr): merge branch '${mergeSourceBranch}' into '${activeBranch}'`,
      author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      parentHash: targetLastCommit?.hash || sourceLastCommit?.hash,
      isHead: true,
    };

    const updated = commits.map((c) => ({ ...c, isHead: false }));
    setCommits([...updated, mergeCommit]);
    setSelectedCommit(mergeCommit);
    setShowMergeModal(false);
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCommit || !tagName.trim()) return;

    const updated = commits.map((c) => {
      if (c.id === selectedCommit.id) {
        return { ...c, tag: tagName.trim() };
      }
      return c;
    });

    setCommits(updated);
    setSelectedCommit({ ...selectedCommit, tag: tagName.trim() });
    setShowTagModal(false);
  };

  const handleResetToBaseline = () => {
    setCommits(INITIAL_COMMITS);
    setActiveBranch('develop');
    setSelectedCommit(INITIAL_COMMITS[INITIAL_COMMITS.length - 1]);
  };

  // Preset Scenario Runners
  const runStandardFlowPreset = () => {
    const parentHash = commits.find((c) => c.branch === 'develop')?.hash || '9a0b1c2';
    const cBranch = 'feature/submission-dashboard';
    const c1: CommitNode = {
      id: `preset_${Date.now()}_1`,
      hash: generateHash(),
      branch: cBranch,
      message: 'feat(ui): scaffold submission checklist card',
      author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
      timestamp: '2026-10-23 08:15',
      parentHash,
    };
    const c2: CommitNode = {
      id: `preset_${Date.now()}_2`,
      hash: generateHash(),
      branch: cBranch,
      message: 'test(ui): add validator verification for LinkedIn post',
      author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
      timestamp: '2026-10-23 08:30',
      parentHash: c1.hash,
    };
    const c3: CommitNode = {
      id: `preset_${Date.now()}_3`,
      hash: generateHash(),
      branch: 'develop',
      message: "merge(pr): merge branch 'feature/submission-dashboard' into 'develop'",
      author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
      timestamp: '2026-10-23 08:45',
      parentHash: c2.hash,
      isHead: true,
    };

    setCommits([...commits.map((c) => ({ ...c, isHead: false })), c1, c2, c3]);
    setActiveBranch('develop');
    setSelectedCommit(c3);
  };

  const runHotfixFlowPreset = () => {
    const mainLast = commits.filter((c) => c.branch === 'main').slice(-1)[0];
    const hBranch = 'hotfix/token-expiry';
    const c1: CommitNode = {
      id: `hotfix_${Date.now()}_1`,
      hash: generateHash(),
      branch: hBranch,
      message: 'fix(security): resolve stale session invalidation on logout',
      author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
      timestamp: '2026-10-23 09:00',
      parentHash: mainLast?.hash,
    };
    const c2: CommitNode = {
      id: `hotfix_${Date.now()}_2`,
      hash: generateHash(),
      branch: 'main',
      message: "merge(hotfix): merge branch 'hotfix/token-expiry' into 'main'",
      author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
      timestamp: '2026-10-23 09:15',
      parentHash: c1.hash,
      tag: 'v1.0.1',
      isHead: true,
    };

    setCommits([...commits.map((c) => ({ ...c, isHead: false })), c1, c2]);
    setActiveBranch('main');
    setSelectedCommit(c2);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Concept explainer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>SWYNEX Git Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Git Flow & Trunk Hybrid</span>
              <span aria-hidden="true">·</span>
              <span>Linear History Enforced</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Interactive Git Workflow & Commit Graph
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Simulate enterprise Git branching, Conventional Commits, Pull Request merges, and semantic version tagging in real time.
            </p>
          </div>

          {/* Quick Scenario Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={runStandardFlowPreset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <Play className="w-3 h-3 text-emerald-400" />
              <span>Simulate Feature PR</span>
            </button>
            <button
              onClick={runHotfixFlowPreset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <Play className="w-3 h-3 text-red-400" />
              <span>Simulate Hotfix</span>
            </button>
            <button
              onClick={handleResetToBaseline}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/40 hover:bg-slate-800 rounded-lg transition-colors"
              title="Reset graph to initial baseline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Toolbar / Action Controls */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Active branch indicator & switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Active Branch (HEAD):</span>
            <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-700">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getBranchColor(activeBranch) }}
              />
              <select
                value={activeBranch}
                onChange={(e) => setActiveBranch(e.target.value)}
                className="bg-transparent text-xs font-mono font-medium text-slate-200 focus:outline-none cursor-pointer"
              >
                {allBranches.map((b) => (
                  <option key={b} value={b} className="bg-slate-900 text-slate-200 font-mono">
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCommitModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Commit</span>
            </button>
            <button
              onClick={() => setShowBranchModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
              <span>New Branch</span>
            </button>
            <button
              onClick={() => setShowMergeModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <GitMerge className="w-3.5 h-3.5 text-emerald-400" />
              <span>Merge</span>
            </button>
            <button
              onClick={() => setShowTagModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>Tag Release</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split: Commit Graph + Commit Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Graph Visualizer Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-slate-200">Commit History & Branches</h3>
            </div>
            <div className="text-xs text-slate-400 font-mono tabular-nums">
              Total Commits: {commits.length}
            </div>
          </div>

          {/* Interactive Commit List & Graph */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {commits.map((commit, index) => {
              const isSelected = selectedCommit?.id === commit.id;
              const branchColor = getBranchColor(commit.branch);

              return (
                <div
                  key={commit.id}
                  onClick={() => setSelectedCommit(commit)}
                  className={`group relative p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-indigo-500/70 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Node indicator */}
                      <div className="mt-1 flex flex-col items-center">
                        <div
                          className="w-3.5 h-3.5 rounded-full border-2 border-slate-950 flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ backgroundColor: branchColor }}
                        />
                        {index < commits.length - 1 && (
                          <div className="w-0.5 h-8 bg-slate-800 group-hover:bg-slate-700 transition-colors" />
                        )}
                      </div>

                      <div className="min-w-0">
                        {/* Commit message */}
                        <p className="text-sm font-medium text-slate-100 group-hover:text-indigo-300 transition-colors truncate">
                          {commit.message}
                        </p>

                        {/* Metadata row */}
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                          <span
                            className="font-mono px-1.5 py-0.5 rounded text-[11px]"
                            style={{
                              backgroundColor: `${branchColor}18`,
                              color: branchColor,
                            }}
                          >
                            {commit.branch}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-slate-400">{commit.hash}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{commit.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags & HEAD Indicators */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {commit.tag && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                          <Tag className="w-3 h-3" />
                          {commit.tag}
                        </span>
                      )}
                      {commit.isHead && (
                        <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                          HEAD
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Commit Details & Inspector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-800">
              <Info className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-slate-200">Commit Inspector</h3>
            </div>

            {selectedCommit ? (
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Commit Message:</span>
                  <p className="text-sm font-semibold text-white bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono break-words">
                    {selectedCommit.message}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1 mb-1">
                      <Hash className="w-3 h-3" /> SHA-1 Hash
                    </span>
                    <span className="font-mono text-indigo-300 font-medium">
                      {selectedCommit.hash}
                    </span>
                  </div>

                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1 mb-1">
                      <GitBranch className="w-3 h-3" /> Branch
                    </span>
                    <span className="font-mono text-emerald-300 font-medium truncate block">
                      {selectedCommit.branch}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <User className="w-3 h-3" /> Author
                  </span>
                  <span className="text-slate-200 font-mono text-[11px] block break-all">
                    {selectedCommit.author}
                  </span>
                </div>

                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Timestamp
                  </span>
                  <span className="text-slate-200 tabular-nums font-mono text-[11px]">
                    {selectedCommit.timestamp}
                  </span>
                </div>

                {selectedCommit.parentHash && (
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-slate-400 block mb-1">Parent Commit Hash</span>
                    <span className="font-mono text-slate-300">{selectedCommit.parentHash}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                Select a commit node from the graph to inspect metadata.
              </div>
            )}
          </div>

          {/* Quick Branch Directory */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-emerald-400" />
              Branch Rules Directory
            </h3>
            <div className="space-y-2.5 text-xs">
              {DEFAULT_BRANCHES.map((b) => (
                <div
                  key={b.name}
                  onClick={() => setActiveBranch(b.name)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    activeBranch === b.name
                      ? 'bg-slate-850 border-indigo-500/50'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-medium" style={{ color: b.color }}>
                      {b.name}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                      {b.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: New Commit */}
      {showCommitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">Create Conventional Commit</h3>
            <p className="text-xs text-slate-400 mb-4">
              Target branch: <span className="text-indigo-400 font-mono">{activeBranch}</span>
            </p>

            <form onSubmit={handleCreateCommit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Type</label>
                <select
                  value={commitType}
                  onChange={(e) => setCommitType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {CONVENTIONAL_COMMIT_TYPES.map((t) => (
                    <option key={t.type} value={t.type}>
                      {t.type} — {t.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Scope (optional)</label>
                <input
                  type="text"
                  value={commitScope}
                  onChange={(e) => setCommitScope(e.target.value)}
                  placeholder="e.g. auth, api, ui, baseline"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Imperative Summary</label>
                <input
                  type="text"
                  value={commitDesc}
                  onChange={(e) => setCommitDesc(e.target.value)}
                  placeholder="e.g. configure environment baseline"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">Preview Commit Message:</span>
                <span className="font-mono text-emerald-400 font-medium">
                  {commitScope.trim() ? `${commitType}(${commitScope.trim()}): ` : `${commitType}: `}
                  {commitDesc.trim() || '...'}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCommitModal(false)}
                  className="px-3.5 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
                >
                  Commit to {activeBranch}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: New Branch */}
      {showBranchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">Create New Git Branch</h3>
            <p className="text-xs text-slate-400 mb-4">
              Will branch from current HEAD on <span className="text-indigo-400 font-mono">{activeBranch}</span>
            </p>

            <form onSubmit={handleCreateBranch} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Branch Name</label>
                <input
                  type="text"
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                  placeholder="e.g. feature/checkout-flow, bugfix/header-gap"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Convention: Use feature/*, bugfix/*, release/*, or hotfix/*
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBranchModal(false)}
                  className="px-3.5 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
                >
                  Checkout New Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Merge Branch */}
      {showMergeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">Merge Branch (Pull Request)</h3>
            <p className="text-xs text-slate-400 mb-4">
              Merge source branch into active target: <span className="text-indigo-400 font-mono">{activeBranch}</span>
            </p>

            <form onSubmit={handleMergeBranch} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Source Branch to Merge</label>
                <select
                  value={mergeSourceBranch}
                  onChange={(e) => setMergeSourceBranch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                >
                  {allBranches
                    .filter((b) => b !== activeBranch)
                    .map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                </select>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 flex items-center justify-between">
                <span className="font-mono text-purple-400">{mergeSourceBranch}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
                <span className="font-mono text-emerald-400">{activeBranch}</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMergeModal(false)}
                  className="px-3.5 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
                >
                  Confirm Merge PR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Tag */}
      {showTagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">Tag Release Milestone</h3>
            <p className="text-xs text-slate-400 mb-4">
              Apply semantic version tag to commit <span className="text-indigo-400 font-mono">{selectedCommit?.hash}</span>
            </p>

            <form onSubmit={handleAddTag} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Tag Name</label>
                <input
                  type="text"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="e.g. v1.0.0, v1.1.0-beta"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTagModal(false)}
                  className="px-3.5 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg transition-colors"
                >
                  Apply Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
