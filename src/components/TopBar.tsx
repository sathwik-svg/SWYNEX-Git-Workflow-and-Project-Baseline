import React from 'react';
import { GitBranch, Download, CheckCircle2 } from 'lucide-react';

interface TopBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExport: () => void;
  completedTasksCount: number;
  totalTasksCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  onExport,
  completedTasksCount,
  totalTasksCount,
}) => {
  const navItems = [
    { id: 'simulator', label: 'Workflow Simulator' },
    { id: 'terminal', label: 'Terminal CLI' },
    { id: 'docs', label: 'Baseline Docs' },
    { id: 'commits', label: 'Commit Standards' },
    { id: 'submission', label: 'Submission Suite' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand wordmark (single text element) */}
          <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <GitBranch className="w-4 h-4" />
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('simulator');
              }}
              className="text-base font-bold tracking-tight text-white hover:text-indigo-300 transition-colors"
            >
              SWYNEX Git Baseline
            </a>
          </div>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 text-xs uppercase tracking-wider py-1 ${
                  activeTab === item.id
                    ? 'text-indigo-400 font-semibold border-b-2 border-indigo-500'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('submission')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{completedTasksCount}/{totalTasksCount} Verified</span>
            </button>
            <button
              onClick={onExport}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-indigo-600/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Baseline</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
