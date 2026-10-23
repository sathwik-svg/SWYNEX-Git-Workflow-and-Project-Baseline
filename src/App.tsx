import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { GitVisualizer } from './components/GitVisualizer';
import { TerminalSandbox } from './components/TerminalSandbox';
import { DocViewer } from './components/DocViewer';
import { CommitBuilder } from './components/CommitBuilder';
import { SubmissionHelper } from './components/SubmissionHelper';
import { SampleTaskApp } from './components/SampleTaskApp';
import { REPOSITORY_FILES } from './data/repoFiles';
import {
  GitBranch,
  FileCode,
  Terminal,
  CheckCircle2,
  Sparkles,
  Layers,
  Share2,
  FolderGit2,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('simulator');
  const [completedChecklist, setCompletedChecklist] = useState<string[]>([
    'repo_name',
    'readme',
    'gitignore',
    'branching_notes',
    'sample_app',
    'linkedin_mention',
    'linkedin_hashtags',
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportBaseline = () => {
    let script = `#!/usr/bin/env bash
# ==============================================================================
# SWYNEX Technologies - Project Baseline Generator Script
# Run this script to generate all baseline files
# ==============================================================================

set -e
echo "🚀 Generating SWYNEX-Git-Workflow-and-Project-Baseline..."

mkdir -p .github/workflows
`;

    REPOSITORY_FILES.forEach((file) => {
      script += `
cat << 'EOF' > "${file.name}"
${file.content}
EOF
`;
    });

    script += `
echo "✅ All baseline files created successfully!"
git init
git add .
git commit -m "feat(baseline): establish SWYNEX Git workflow and initial application"
git branch -M main
echo "Repository baseline initialized!"
`;

    const blob = new Blob([script], { type: 'text/x-sh;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'setup-swynex-baseline.sh';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Exported baseline generator script (setup-swynex-baseline.sh)');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Strict 3-zone Top Bar Contract */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExport={handleExportBaseline}
        completedTasksCount={completedChecklist.length}
        totalTasksCount={10}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Editorial Hero Header */}
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span className="text-indigo-400 font-semibold">SWYNEX Technologies</span>
                <span aria-hidden="true">·</span>
                <span>Internship Task 1</span>
                <span aria-hidden="true">·</span>
                <span>Git Workflow & Project Baseline</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Git Workflow & Project Baseline
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                A production-grade baseline establishing branching protocols, Conventional Commits, PR reviews, and an interactive developer workbench built for SWYNEX Technologies.
              </p>
            </div>

            {/* Quick Deliverable Badges */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs shrink-0 min-w-[260px]">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-850">
                <span className="font-medium text-slate-300">Deliverables Verified</span>
                <span className="font-mono text-emerald-400">4 / 4 Complete</span>
              </div>
              <div className="space-y-1 font-mono text-[11px] text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>README.md (Docs & Setup)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>.gitignore (Production Clean)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>BRANCHING.md (Strategy Notes)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Interactive Sample App</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation Ribbon */}
          <div className="flex items-center gap-1.5 mt-6 pt-5 border-t border-slate-800/80 overflow-x-auto">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'simulator'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Workflow Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'terminal'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal CLI</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'docs'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Baseline Docs & Config</span>
            </button>

            <button
              onClick={() => setActiveTab('commits')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'commits'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commit Generator</span>
            </button>

            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'tasks'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Sample Task Baseline</span>
            </button>

            <button
              onClick={() => setActiveTab('submission')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'submission'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Submission Suite</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tab Panes */}
        {activeTab === 'simulator' && <GitVisualizer />}
        {activeTab === 'terminal' && <TerminalSandbox />}
        {activeTab === 'docs' && <DocViewer />}
        {activeTab === 'commits' && <CommitBuilder />}
        {activeTab === 'tasks' && <SampleTaskApp />}
        {activeTab === 'submission' && (
          <SubmissionHelper
            completedChecklist={completedChecklist}
            setCompletedChecklist={setCompletedChecklist}
          />
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Editorial Footer */}
      <footer className="border-t border-slate-850 mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">SWYNEX Technologies Internship</span>
            <span aria-hidden="true">·</span>
            <span>Task 1: Git Workflow and Project Baseline</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Author: Sathwik Ganji</span>
            <span aria-hidden="true">·</span>
            <span>License: Apache-2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
