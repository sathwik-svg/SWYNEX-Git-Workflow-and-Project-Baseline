import React, { useState, useEffect } from 'react';
import {
  Box,
  Play,
  Square,
  Activity,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContainerWorkbench: React.FC = () => {
  const [containerState, setContainerState] = useState<'running' | 'stopped'>('running');
  const [healthStatus, setHealthStatus] = useState<'healthy' | 'checking' | 'unhealthy'>('healthy');
  const [uptime, setUptime] = useState(148);
  const [cpuUsage, setCpuUsage] = useState(0.3);
  const [memoryUsage, setMemoryUsage] = useState(42.8);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([
    'Initializing SWYNEX Multi-Stage Alpine Container...',
    'Verified unprivileged user context: appuser (UID: 10001, GID: 10001)',
    'Loaded production bundles from builder stage (size: 148.2 KB)',
    '🚀 SWYNEX Container runtime active on http://0.0.0.0:3000',
    '🩺 Health check endpoint registered at http://0.0.0.0:3000/health',
    '[Docker Daemon Probe] GET /health -> 200 OK (latency: 1.4ms)',
    '[Docker Daemon Probe] GET /health -> 200 OK (latency: 1.1ms)',
  ]);

  // Periodic uptime increment and simulated health check probe
  useEffect(() => {
    if (containerState !== 'running') return;

    const timer = setInterval(() => {
      setUptime((prev) => prev + 1);
      // Subtle fluctuations in cpu/memory for realistic dashboard feel
      setCpuUsage(Number((0.2 + Math.random() * 0.3).toFixed(1)));
    }, 1000);

    return () => clearInterval(timer);
  }, [containerState]);

  const handleStartContainer = () => {
    setContainerState('running');
    setHealthStatus('healthy');
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] docker run -d -p 3000:3000 --name swynex-app swynex-app:latest`,
      `[${new Date().toLocaleTimeString()}] Container started successfully (ID: 7a8f9c2d1e)`,
      `[${new Date().toLocaleTimeString()}] Server listening on port 3000 (status: healthy)`,
    ]);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const handleStopContainer = () => {
    setContainerState('stopped');
    setHealthStatus('unhealthy');
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] docker stop swynex-production-container`,
      `[${new Date().toLocaleTimeString()}] SIGTERM received. Gracefully shutting down Express server...`,
      `[${new Date().toLocaleTimeString()}] Container stopped. Port 3000 released.`,
    ]);
  };

  const handleTriggerHealthCheck = () => {
    setHealthStatus('checking');
    setTimeout(() => {
      if (containerState === 'running') {
        setHealthStatus('healthy');
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Manual probe: curl -f http://localhost:3000/health -> 200 OK`,
          `[${new Date().toLocaleTimeString()}] Response: {"status":"healthy","uptime":${uptime},"environment":"production"}`,
        ]);
      } else {
        setHealthStatus('unhealthy');
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Manual probe: curl -f http://localhost:3000/health -> Failed: Connection refused`,
        ]);
      }
    }, 400);
  };

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1500);
  };

  const quickCommands = [
    {
      title: 'One-Command Stack (Compose)',
      cmd: 'docker compose up --build -d',
      desc: 'Builds multi-stage image and launches background stack with healthcheck',
    },
    {
      title: 'Build Multi-Stage Image',
      cmd: 'docker build -t swynex-app:v1.0.0 .',
      desc: 'Builds lightweight Alpine image (<80MB) through builder & runner stages',
    },
    {
      title: 'Run Hardened Container',
      cmd: 'docker run -d -p 3000:3000 --name swynex-app swynex-app:v1.0.0',
      desc: 'Runs container detached, non-root on port 3000 with restart protection',
    },
    {
      title: 'Inspect Health Status',
      cmd: "docker inspect --format='{{json .State.Health.Status}}' swynex-app",
      desc: 'Queries native Docker healthcheck engine for status ("healthy")',
    },
    {
      title: 'Follow Streaming Logs',
      cmd: 'docker logs -f swynex-app',
      desc: 'Streams real-time container startup output and incoming HTTP requests',
    },
    {
      title: 'Interactive Shell',
      cmd: 'docker exec -it swynex-app sh',
      desc: 'Spawns an interactive Alpine shell as unprivileged appuser',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Task 3 Deliverable</span>
              <span aria-hidden="true">·</span>
              <span>Docker & Multi-Stage Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Repeatable Deployment</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Container Lifecycle & Deployment Simulator
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Simulates the multi-stage Alpine Docker runtime, healthcheck polling, resource quotas, and unprivileged user execution configured in <code className="text-indigo-300 font-mono">/Dockerfile</code>.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {containerState === 'running' ? (
              <button
                onClick={handleStopContainer}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors shadow-sm"
              >
                <Square className="w-3.5 h-3.5" />
                <span>Stop Container</span>
              </button>
            ) : (
              <button
                onClick={handleStartContainer}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Start Container</span>
              </button>
            )}

            <button
              onClick={handleTriggerHealthCheck}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${healthStatus === 'checking' ? 'animate-spin' : ''}`} />
              <span>Poll /health</span>
            </button>
          </div>
        </div>

        {/* Live Container Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-5 pt-4 border-t border-slate-800 text-xs font-mono">
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
            <span className="text-slate-500 block text-[10px] uppercase">CONTAINER STATE</span>
            <span
              className={`font-bold uppercase ${
                containerState === 'running' ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {containerState}
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
            <span className="text-slate-500 block text-[10px] uppercase">HEALTHCHECK</span>
            <span
              className={`font-bold uppercase ${
                healthStatus === 'healthy'
                  ? 'text-emerald-400'
                  : healthStatus === 'checking'
                  ? 'text-amber-400'
                  : 'text-red-400'
              }`}
            >
              {healthStatus}
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
            <span className="text-slate-500 block text-[10px] uppercase">EXPOSED PORT</span>
            <span className="text-indigo-300 font-bold">3000:3000</span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
            <span className="text-slate-500 block text-[10px] uppercase">IMAGE SIZE</span>
            <span className="text-slate-200 font-bold">74.8 MB (Alpine)</span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
            <span className="text-slate-500 block text-[10px] uppercase">MEMORY USAGE</span>
            <span className="text-slate-200 font-bold tabular-nums">{memoryUsage} MB / 512M</span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
            <span className="text-slate-500 block text-[10px] uppercase">SECURITY CONTEXT</span>
            <span className="text-emerald-400 font-bold truncate block">non-root (appuser)</span>
          </div>
        </div>
      </div>

      {/* Multi-Stage Visual Topology */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 pb-2 border-b border-slate-800">
          <Layers className="w-4 h-4 text-indigo-400" />
          Multi-Stage Build Pipeline Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stage 1 Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-indigo-400 font-bold">Stage 1: Build & Verify</span>
              <span className="text-slate-500 font-mono text-[11px]">node:20-alpine AS builder</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Isolated workspace that compiles TypeScript assets, checks code hygiene, and executes all 15 Vitest quality gates.
            </p>
            <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-[11px] text-slate-400 space-y-1">
              <div className="text-emerald-400">✓ npm ci [clean install]</div>
              <div className="text-emerald-400">✓ npm run lint [tsc strict]</div>
              <div className="text-emerald-400">✓ npm run test [15 invariant gates]</div>
              <div className="text-emerald-400">✓ npm run build [dist/ generated]</div>
            </div>
            <span className="text-[10px] text-slate-500 block">
              * Build tools, devDependencies, and test runners are discarded at this stage.
            </span>
          </div>

          {/* Stage 2 Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-emerald-400 font-bold">Stage 2: Hardened Runtime</span>
              <span className="text-slate-500 font-mono text-[11px]">node:20-alpine AS runner</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ultra-lightweight production image containing only compiled assets, unprivileged user, and native Docker healthcheck probe.
            </p>
            <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-[11px] text-slate-400 space-y-1">
              <div className="text-emerald-400">✓ USER appuser (UID 10001, non-root)</div>
              <div className="text-emerald-400">✓ COPY --from=builder /app/dist</div>
              <div className="text-emerald-400">✓ HEALTHCHECK curl -f /health (30s)</div>
              <div className="text-emerald-400">✓ EXPOSE 3000 & node server.js</div>
            </div>
            <span className="text-[10px] text-emerald-400 block font-medium">
              * Final Image Size: 74.8MB (91% smaller than full Node base image)
            </span>
          </div>
        </div>
      </div>

      {/* Terminal Logs & Live Output */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-300 font-semibold">docker logs -f swynex-production-container</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-slate-400">Uptime: <span className="text-slate-200 tabular-nums">{uptime}s</span></span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Live
            </span>
          </div>
        </div>

        <div className="p-4 max-h-56 overflow-y-auto space-y-1 text-slate-300">
          {logs.map((line, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-slate-600 select-none text-[10px] w-5 text-right">{idx + 1}</span>
              <p
                className={`leading-relaxed ${
                  line.includes('🚀') || line.includes('healthy') || line.includes('200 OK')
                    ? 'text-emerald-400'
                    : line.includes('SIGTERM') || line.includes('stopped') || line.includes('Failed')
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

      {/* Intern Quick-Run Command Cheat Sheet */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Intern Onboarding: Docker Runbook Commands
          </h3>
          <span className="text-xs text-slate-400">Copy & execute in your terminal</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickCommands.map((item) => (
            <div
              key={item.cmd}
              className="p-3 rounded-lg bg-slate-950/70 border border-slate-850 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-indigo-400 block mb-1">
                  {item.title}
                </span>
                <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">{item.desc}</p>
              </div>

              <div className="flex items-center justify-between gap-2 bg-slate-900 p-2 rounded border border-slate-800 font-mono text-xs">
                <code className="text-slate-200 truncate">{item.cmd}</code>
                <button
                  onClick={() => copyCommand(item.cmd)}
                  className="text-slate-400 hover:text-white shrink-0 p-1 rounded hover:bg-slate-800 transition-colors"
                  title="Copy command"
                >
                  {copiedCmd === item.cmd ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
