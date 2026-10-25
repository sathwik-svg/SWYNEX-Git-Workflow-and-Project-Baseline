import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  Package,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  FileCode,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PipelineJob {
  id: string;
  name: string;
  icon: 'lint' | 'test' | 'security' | 'build' | 'artifact';
  runtime: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  duration?: string;
  logs: string[];
}

export const CIPipelineSimulator: React.FC = () => {
  const [pipelineStatus, setPipelineStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [activeBranch, setActiveBranch] = useState('develop');
  const [selectedJobId, setSelectedJobId] = useState<string>('job-2');
  const [totalDuration, setTotalDuration] = useState('0.0s');

  const defaultJobs: PipelineJob[] = [
    {
      id: 'job-1',
      name: 'Code Quality & Type Integrity',
      icon: 'lint',
      runtime: 'Node 20.x',
      status: 'idle',
      logs: [
        'Run actions/checkout@v4',
        'Run actions/setup-node@v4 with cache: npm',
        'Executing npm ci [clean install]...',
        'added 184 packages in 1.42s',
        'Executing npm run lint [tsc --noEmit]...',
        '✓ TypeScript v5.x strict typecheck passed: 0 errors found.',
        '✓ Code formatting and style invariants verified.',
      ],
    },
    {
      id: 'job-2',
      name: 'Automated Unit Tests (Matrix 18.x, 20.x, 22.x)',
      icon: 'test',
      runtime: 'Matrix: 3 Nodes',
      status: 'idle',
      logs: [
        'Matrix runner dispatched across Node 18.x, 20.x, 22.x',
        'Running vitest run --reporter=verbose...',
        ' ✓ src/__tests__/pipeline.test.ts (15 tests) [42ms]',
        '   ✓ Conventional Commits: approve valid feat with scope',
        '   ✓ Conventional Commits: approve valid fix without scope',
        '   ✓ Conventional Commits: approve breaking change indicator (!)',
        '   ✓ Conventional Commits: reject non-conventional formats',
        '   ✓ Branch Governance: validate main, develop, feature, hotfix',
        '   ✓ Release Gate: validate SemVer v1.0.0 notation',
        '   ✓ Architectural Invariants: active branch enum complete',
        'Test Files: 1 passed (1)',
        'Tests:      15 passed (15)',
        'Duration:   434ms (100% assertions satisfied)',
      ],
    },
    {
      id: 'job-3',
      name: 'Dependency Vulnerability Audit',
      icon: 'security',
      runtime: 'Node 20.x',
      status: 'idle',
      logs: [
        'Running npm audit --audit-level=high...',
        'Auditing 184 production and dev dependencies...',
        'Scanning package-lock against CVE advisory database...',
        'found 0 vulnerabilities (critical: 0, high: 0, moderate: 0)',
        '✓ Security baseline approved by SWYNEX policy.',
      ],
    },
    {
      id: 'job-4',
      name: 'Production Build & Asset Packaging',
      icon: 'build',
      runtime: 'Node 20.x',
      status: 'idle',
      logs: [
        'Needs: [job-1: success, job-2: success]',
        'Executing vite build for production...',
        'transforming (34) client modules...',
        '✓ 34 modules transformed.',
        'dist/index.html                  0.85 kB │ gzip: 0.42 kB',
        'dist/assets/index-D8x2n.js     142.10 kB │ gzip: 44.82 kB',
        '✓ Built in 340ms',
        'Checking distribution asset: test -f dist/index.html [OK]',
      ],
    },
    {
      id: 'job-5',
      name: 'Artifact Storage & Retention',
      icon: 'artifact',
      runtime: 'Runner',
      status: 'idle',
      logs: [
        'Executing actions/upload-artifact@v4',
        'Artifact name: swynex-production-bundle',
        'Artifact path: dist/',
        'Retention policy: 14 days configured',
        'Uploading 8 files (148.2 KB)...',
        '✓ Artifact uploaded successfully: swynex-production-bundle.zip',
        'Status: Quality gates satisfied. PR approved for merge.',
      ],
    },
  ];

  const [jobs, setJobs] = useState<PipelineJob[]>(defaultJobs);

  const runPipeline = () => {
    setPipelineStatus('running');
    setTotalDuration('0.0s');

    // Reset jobs
    const reset = jobs.map((j) => ({ ...j, status: 'idle' as const, duration: undefined }));
    setJobs(reset);

    const startTime = Date.now();

    // Step 1: Lint
    setTimeout(() => {
      setJobs((prev) =>
        prev.map((j) => (j.id === 'job-1' ? { ...j, status: 'running' } : j))
      );
    }, 400);

    setTimeout(() => {
      setJobs((prev) =>
        prev.map((j) => (j.id === 'job-1' ? { ...j, status: 'success', duration: '1.8s' } : j))
      );
      // Trigger Job 2 and Job 3 in parallel
      setJobs((prev) =>
        prev.map((j) =>
          j.id === 'job-2' || j.id === 'job-3' ? { ...j, status: 'running' } : j
        )
      );
    }, 2200);

    // Job 3 finishes
    setTimeout(() => {
      setJobs((prev) =>
        prev.map((j) => (j.id === 'job-3' ? { ...j, status: 'success', duration: '1.2s' } : j))
      );
    }, 3400);

    // Job 2 finishes (or fails if simulated)
    setTimeout(() => {
      if (simulateFailure) {
        setJobs((prev) =>
          prev.map((j) =>
            j.id === 'job-2'
              ? {
                  ...j,
                  status: 'failed',
                  duration: '2.1s',
                  logs: [
                    ...j.logs.slice(0, 3),
                    'FAIL src/__tests__/pipeline.test.ts > Conventional Commits',
                    'AssertionError: expected false to be true',
                    'Pipeline failed: PR merge is blocked by SWYNEX branch protection.',
                  ],
                }
              : j
          )
        );
        setPipelineStatus('failed');
        setTotalDuration(`${((Date.now() - startTime) / 1000).toFixed(1)}s`);
      } else {
        setJobs((prev) =>
          prev.map((j) => (j.id === 'job-2' ? { ...j, status: 'success', duration: '2.3s' } : j))
        );
        // Start Job 4
        setJobs((prev) =>
          prev.map((j) => (j.id === 'job-4' ? { ...j, status: 'running' } : j))
        );
      }
    }, 4500);

    // Job 4 finishes
    if (!simulateFailure) {
      setTimeout(() => {
        setJobs((prev) =>
          prev.map((j) => (j.id === 'job-4' ? { ...j, status: 'success', duration: '2.8s' } : j))
        );
        // Start Job 5
        setJobs((prev) =>
          prev.map((j) => (j.id === 'job-5' ? { ...j, status: 'running' } : j))
        );
      }, 7300);

      // Job 5 finishes
      setTimeout(() => {
        setJobs((prev) =>
          prev.map((j) => (j.id === 'job-5' ? { ...j, status: 'success', duration: '1.1s' } : j))
        );
        setPipelineStatus('success');
        setTotalDuration(`${((Date.now() - startTime) / 1000).toFixed(1)}s`);
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, 8500);
    }
  };

  const handleReset = () => {
    setPipelineStatus('idle');
    setJobs(defaultJobs);
    setTotalDuration('0.0s');
  };

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const getJobIcon = (type: PipelineJob['icon']) => {
    switch (type) {
      case 'lint':
        return <FileCode className="w-4 h-4 text-indigo-400" />;
      case 'test':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-amber-400" />;
      case 'build':
        return <Layers className="w-4 h-4 text-blue-400" />;
      case 'artifact':
        return <Package className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Task 2 Core Deliverable</span>
              <span aria-hidden="true">·</span>
              <span>GitHub Actions Workflow</span>
              <span aria-hidden="true">·</span>
              <span>Dublin Tech Hub Standards</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Continuous Integration Pipeline Simulator
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Simulates the multi-stage quality gate configured in <code className="text-indigo-300 font-mono">.github/workflows/ci.yml</code>. Runs automated typechecking, multi-node matrix testing, and artifact generation.
            </p>
          </div>

          {/* Trigger controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setSimulateFailure(!simulateFailure)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
                simulateFailure
                  ? 'bg-red-950/40 border-red-500/50 text-red-300'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle to test how CI blocks failing PRs"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Simulate Failure: {simulateFailure ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={runPipeline}
              disabled={pipelineStatus === 'running'}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{pipelineStatus === 'running' ? 'Running Gates...' : 'Trigger CI Pipeline'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pipeline Telemetry Strip */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Trigger:</span>
              <span className="font-mono text-slate-200 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                push & pull_request
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Branch:</span>
              <select
                value={activeBranch}
                onChange={(e) => setActiveBranch(e.target.value)}
                className="bg-slate-950 text-emerald-400 font-mono text-xs px-2 py-0.5 rounded border border-slate-800 focus:outline-none"
              >
                <option value="main">main</option>
                <option value="develop">develop</option>
                <option value="feature/ci-matrix">feature/ci-matrix</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Duration: <span className="text-white tabular-nums">{totalDuration}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Status:</span>
              {pipelineStatus === 'idle' && <span className="text-slate-400">Idle (Ready)</span>}
              {pipelineStatus === 'running' && <span className="text-amber-400 animate-pulse">Running In Progress...</span>}
              {pipelineStatus === 'success' && <span className="text-emerald-400 font-bold">Passed (All 5 Gates Green)</span>}
              {pipelineStatus === 'failed' && <span className="text-red-400 font-bold">Failed (PR Blocked)</span>}
            </div>
          </div>
        </div>
      </div>

      {/* DAG / Stage Progression Graph */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            GitHub Actions Directed Acyclic Graph (DAG)
          </h3>
          <a
            href="https://github.com/sathwik-svg/SWYNEX-CI-Pipeline/actions"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
          >
            Live GitHub Actions <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Horizontal Job Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-stretch">
          {jobs.map((job, idx) => {
            const isSelected = selectedJobId === job.id;
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`relative p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-850 border-indigo-500 shadow-md'
                    : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                      {getJobIcon(job.icon)}
                    </div>
                    {job.status === 'success' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {job.status === 'failed' && (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    {job.status === 'running' && (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                    )}
                    {job.status === 'idle' && (
                      <span className="text-[10px] text-slate-500 font-mono">Stage {idx + 1}</span>
                    )}
                  </div>

                  <h4 className="text-xs font-semibold text-slate-100 leading-snug">
                    {job.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">
                    {job.runtime}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-850/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="capitalize">{job.status}</span>
                  {job.duration && <span className="font-mono text-slate-300">{job.duration}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Log Console for Selected Stage */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-300 font-semibold">{selectedJob.name}</span>
            <span className="text-slate-500 font-normal">({selectedJob.runtime})</span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-slate-400">Status:</span>
            <span
              className={`font-semibold capitalize ${
                selectedJob.status === 'success'
                  ? 'text-emerald-400'
                  : selectedJob.status === 'failed'
                  ? 'text-red-400'
                  : 'text-slate-400'
              }`}
            >
              {selectedJob.status}
            </span>
          </div>
        </div>

        <div className="p-4 bg-slate-950 max-h-60 overflow-y-auto space-y-1 text-slate-300">
          {selectedJob.logs.map((line, lIdx) => (
            <div key={lIdx} className="flex items-start gap-2">
              <span className="text-slate-600 select-none text-[10px] w-5 text-right">{lIdx + 1}</span>
              <p
                className={`leading-relaxed ${
                  line.includes('✓') || line.includes('passed')
                    ? 'text-emerald-400'
                    : line.includes('FAIL') || line.includes('AssertionError')
                    ? 'text-red-400'
                    : 'text-slate-300'
                }`}
              >
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
