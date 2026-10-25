import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { FinalDeliveryWorkbench } from './components/FinalDeliveryWorkbench';
import { ContainerWorkbench } from './components/ContainerWorkbench';
import { DocViewer } from './components/DocViewer';
import { TestRunner } from './components/TestRunner';
import { TerminalSandbox } from './components/TerminalSandbox';
import { SubmissionHelper } from './components/SubmissionHelper';
import { REPOSITORY_FILES } from './data/repoFiles';
import {
  Rocket,
  Box,
  FileCode,
  Cpu,
  Terminal,
  Share2,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('delivery');
  const [completedChecklist, setCompletedChecklist] = useState<string[]>([
    'repo_name',
    'delivery_workflow',
    'pipeline_doc',
    'screenshots_proof',
    'release_notes',
    'container_baseline',
    'automated_tests',
    'public_repo',
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
# SWYNEX Technologies - Final Delivery Pipeline Setup Script
# Task 4: Final Delivery Pipeline
# ==============================================================================

set -e
echo "🚀 Initializing SWYNEX-Final-Delivery-Pipeline repository..."

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
echo "✅ All final delivery pipeline files created successfully!"
echo "Running local quality gates..."
npm run lint
npm run test
npm run build
echo "Pipeline baseline ready for GitHub deployment!"
`;

    const blob = new Blob([script], { type: 'text/x-sh;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'setup-swynex-delivery-pipeline.sh';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Exported Delivery Pipeline setup script (setup-swynex-delivery-pipeline.sh)');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* 3-Zone Top Bar */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExport={handleExportBaseline}
        completedTasksCount={completedChecklist.length}
        totalTasksCount={10}
      />

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Editorial Hero Header */}
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span className="text-indigo-400 font-semibold">SWYNEX Technologies</span>
                <span aria-hidden="true">·</span>
                <span>Internship Task 4</span>
                <span aria-hidden="true">·</span>
                <span>Final Delivery Pipeline</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Final Delivery Pipeline & Release Automation
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                A unified CI/CD delivery lifecycle engineered to European and Dublin Silicon Docks standards. Connects automated quality checks, multi-node matrix tests, container packaging, staging smoke verification, and commit-driven release notes into a single automated pipeline.
              </p>
            </div>

            {/* Quick Status Box */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs shrink-0 min-w-[270px]">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-850">
                <span className="font-medium text-slate-300">Delivery Status</span>
                <span className="font-mono text-emerald-400">Release v1.2.0 Green</span>
              </div>
              <div className="space-y-1 font-mono text-[11px] text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Quality Gates & Test Matrix (15/15)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Production Bundle Packaging</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Multi-Stage Alpine Container (&lt;80MB)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Staging Deploy & Smoke Probe (/health)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Automated Release Notes & Tarball</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Ribbon */}
          <div className="flex items-center gap-1.5 mt-6 pt-5 border-t border-slate-800/80 overflow-x-auto">
            <button
              onClick={() => setActiveTab('delivery')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'delivery'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Delivery Pipeline</span>
            </button>

            <button
              onClick={() => setActiveTab('container')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'container'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Container Stack</span>
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
              <span>Pipeline & Release Docs</span>
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'tests'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Unit Tests</span>
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
              onClick={() => setActiveTab('submission')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'submission'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Task 4 Ready</span>
            </button>
          </div>
        </div>

        {/* Dynamic Panes */}
        {activeTab === 'delivery' && <FinalDeliveryWorkbench />}
        {activeTab === 'container' && <ContainerWorkbench />}
        {activeTab === 'docs' && <DocViewer />}
        {activeTab === 'tests' && <TestRunner />}
        {activeTab === 'terminal' && <TerminalSandbox />}
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

      {/* Clean Footer */}
      <footer className="border-t border-slate-850 mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">SWYNEX Technologies Internship</span>
            <span aria-hidden="true">·</span>
            <span>Task 4: Final Delivery Pipeline</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Author: Sathwik Ganji (sathwik-svg)</span>
            <span aria-hidden="true">·</span>
            <span>License: Apache-2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
