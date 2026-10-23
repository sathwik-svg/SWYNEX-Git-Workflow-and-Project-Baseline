import React, { useState } from 'react';
import { CheckCircle2, Clock, GitPullRequest, GitBranch, Plus, Filter, Tag, Check } from 'lucide-react';

interface SprintTask {
  id: string;
  title: string;
  branch: string;
  assignee: string;
  status: 'todo' | 'in_progress' | 'review' | 'merged';
  priority: 'low' | 'medium' | 'high';
  commitHash?: string;
  prNumber?: number;
}

const INITIAL_TASKS: SprintTask[] = [
  {
    id: 'TASK-101',
    title: 'Initialize repository structure & baseline .gitignore',
    branch: 'main',
    assignee: 'Sathwik Ganji',
    status: 'merged',
    priority: 'high',
    commitHash: 'a1b2c3d',
    prNumber: 1,
  },
  {
    id: 'TASK-102',
    title: 'Draft comprehensive BRANCHING.md strategy document',
    branch: 'develop',
    assignee: 'Sathwik Ganji',
    status: 'merged',
    priority: 'high',
    commitHash: '7c8d9e0',
    prNumber: 2,
  },
  {
    id: 'TASK-103',
    title: 'Implement Interactive Git Workflow Visualizer',
    branch: 'feature/auth-service',
    assignee: 'Sathwik Ganji',
    status: 'in_progress',
    priority: 'high',
    commitHash: '5d6e7f8',
  },
  {
    id: 'TASK-104',
    title: 'Automate GitHub Actions CI pipeline for linting & tests',
    branch: 'feature/ci-pipeline',
    assignee: 'Sathwik Ganji',
    status: 'review',
    priority: 'medium',
    prNumber: 3,
  },
  {
    id: 'TASK-105',
    title: 'Verify incognito access for submission links',
    branch: 'develop',
    assignee: 'Sathwik Ganji',
    status: 'todo',
    priority: 'high',
  },
];

export const SampleTaskApp: React.FC = () => {
  const [tasks, setTasks] = useState<SprintTask[]>(INITIAL_TASKS);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBranch, setNewBranch] = useState('feature/new-module');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const filteredTasks = tasks.filter((t) => {
    if (filterStatus === 'all') return true;
    return t.status === filterStatus;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const task: SprintTask = {
      id: `TASK-${100 + tasks.length + 1}`,
      title: newTitle.trim(),
      branch: newBranch.trim(),
      assignee: 'Sathwik Ganji',
      status: 'todo',
      priority: newPriority,
    };

    setTasks([task, ...tasks]);
    setNewTitle('');
    setShowNewTaskModal(false);
  };

  const updateStatus = (id: string, newStatus: SprintTask['status']) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            status: newStatus,
            commitHash: newStatus === 'merged' && !t.commitHash ? Math.random().toString(16).substring(2, 9) : t.commitHash,
          };
        }
        return t;
      })
    );
  };

  const getStatusBadge = (status: SprintTask['status']) => {
    switch (status) {
      case 'merged':
        return <span className="text-emerald-400 font-mono text-[11px] font-semibold">merged</span>;
      case 'review':
        return <span className="text-purple-400 font-mono text-[11px] font-semibold">in review</span>;
      case 'in_progress':
        return <span className="text-blue-400 font-mono text-[11px] font-semibold">in progress</span>;
      default:
        return <span className="text-slate-400 font-mono text-[11px] font-semibold">todo</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Sample App Baseline</span>
            <span aria-hidden="true">·</span>
            <span>Sprint & Branch Alignment</span>
            <span aria-hidden="true">·</span>
            <span>Modular React 19</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Git-Linked Sprint Task Baseline
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            A small production sample application illustrating how features are decomposed into issues, tied to Git branches, and transitioned through PR merges.
          </p>
        </div>

        <button
          onClick={() => setShowNewTaskModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Sprint Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs">
        <span className="text-slate-400 flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" /> Status Filter:
        </span>
        {['all', 'todo', 'in_progress', 'review', 'merged'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium capitalize ${
              filterStatus === st
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Task List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-indigo-400 font-semibold">{task.id}</span>
              {getStatusBadge(task.status)}
            </div>

            <h4 className="text-sm font-semibold text-white leading-snug">
              {task.title}
            </h4>

            {/* Branch and commit info */}
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-850 space-y-1.5 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-slate-300">
                <GitBranch className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{task.branch}</span>
              </div>
              {task.commitHash && (
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Tag className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>commit: {task.commitHash}</span>
                </div>
              )}
            </div>

            {/* Status Change Selector */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-850 text-xs text-slate-400">
              <span>Status:</span>
              <select
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value as SprintTask['status'])}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 font-mono text-[11px] focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="review">In Review (PR)</option>
                <option value="merged">Merged</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: New Task */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">Create Sprint Baseline Task</h3>
            <p className="text-xs text-slate-400 mb-4">
              Link code work directly to an upcoming Git feature branch.
            </p>

            <form onSubmit={handleAddTask} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Task Description</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement user profile settings"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Linked Feature Branch</label>
                <input
                  type="text"
                  value={newBranch}
                  onChange={(e) => setNewBranch(e.target.value)}
                  placeholder="feature/..."
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="px-3.5 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
