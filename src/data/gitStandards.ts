export interface CommitNode {
  id: string;
  hash: string;
  branch: string;
  message: string;
  author: string;
  timestamp: string;
  parentHash?: string;
  tag?: string;
  isHead?: boolean;
}

export interface BranchInfo {
  name: string;
  color: string;
  description: string;
  type: 'protected' | 'integration' | 'feature' | 'hotfix' | 'release';
}

export const DEFAULT_BRANCHES: BranchInfo[] = [
  {
    name: 'main',
    color: '#3b82f6', // blue
    description: 'Production stable code. Strict protection rules apply.',
    type: 'protected',
  },
  {
    name: 'develop',
    color: '#10b981', // emerald
    description: 'Integration branch for upcoming release candidate.',
    type: 'integration',
  },
  {
    name: 'feature/auth-service',
    color: '#8b5cf6', // purple
    description: 'Active feature branch implementing secure authentication.',
    type: 'feature',
  },
  {
    name: 'hotfix/token-leak',
    color: '#ef4444', // red
    description: 'Urgent production fix for session token invalidation.',
    type: 'hotfix',
  },
  {
    name: 'release/v1.0.0',
    color: '#f59e0b', // amber
    description: 'Release stabilization and final documentation bump.',
    type: 'release',
  },
];

export const INITIAL_COMMITS: CommitNode[] = [
  {
    id: 'c1',
    hash: 'a1b2c3d',
    branch: 'main',
    message: 'chore(init): initial repository baseline structure',
    author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
    timestamp: '2026-10-22 09:15',
    tag: 'v0.9.0',
  },
  {
    id: 'c2',
    hash: 'e4f5a6b',
    branch: 'develop',
    parentHash: 'a1b2c3d',
    message: 'docs(baseline): configure README.md and .gitignore',
    author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
    timestamp: '2026-10-22 10:30',
  },
  {
    id: 'c3',
    hash: '7c8d9e0',
    branch: 'develop',
    parentHash: 'e4f5a6b',
    message: 'feat(docs): add formal BRANCHING.md strategy guide',
    author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
    timestamp: '2026-10-22 11:45',
  },
  {
    id: 'c4',
    hash: '1a2b3c4',
    branch: 'feature/auth-service',
    parentHash: '7c8d9e0',
    message: 'feat(auth): initialize OAuth token refresh lifecycle',
    author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
    timestamp: '2026-10-22 14:00',
  },
  {
    id: 'c5',
    hash: '5d6e7f8',
    branch: 'feature/auth-service',
    parentHash: '1a2b3c4',
    message: 'test(auth): add unit test coverage for token verification',
    author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
    timestamp: '2026-10-22 15:30',
  },
  {
    id: 'c6',
    hash: '9a0b1c2',
    branch: 'develop',
    parentHash: '7c8d9e0',
    message: 'feat(app): build interactive Git simulator and workbench',
    author: 'Sathwik Ganji <ganjisathwik73@gmail.com>',
    timestamp: '2026-10-23 08:00',
    isHead: true,
  },
];

export const CONVENTIONAL_COMMIT_TYPES = [
  { type: 'feat', label: 'Feature', description: 'A new user-facing or platform capability' },
  { type: 'fix', label: 'Bug Fix', description: 'A bug fix or patch' },
  { type: 'docs', label: 'Documentation', description: 'Documentation changes only' },
  { type: 'style', label: 'Style', description: 'Formatting, white-space, missing semi-colons' },
  { type: 'refactor', label: 'Refactor', description: 'Code restructuring without changing behavior' },
  { type: 'perf', label: 'Performance', description: 'A code change that improves performance' },
  { type: 'test', label: 'Testing', description: 'Adding missing tests or correcting existing tests' },
  { type: 'chore', label: 'Chore', description: 'Build process, auxiliary tool or library updates' },
  { type: 'ci', label: 'CI / CD', description: 'Continuous integration scripts and workflow adjustments' },
];

export const CHEAT_SHEET_COMMANDS = [
  {
    category: 'Setup & Baseline',
    commands: [
      { cmd: 'git init', desc: 'Initialize a brand new local Git repository' },
      { cmd: 'git clone <url>', desc: 'Clone an existing repository into a new directory' },
      { cmd: 'git config --global user.name "Your Name"', desc: 'Set global author commit name' },
      { cmd: 'git config --global user.email "your.email@example.com"', desc: 'Set global author commit email' },
    ],
  },
  {
    category: 'Branching & Switching',
    commands: [
      { cmd: 'git branch -M main', desc: 'Rename current active branch to main' },
      { cmd: 'git checkout -b feature/login', desc: 'Create and switch immediately to new branch' },
      { cmd: 'git switch develop', desc: 'Switch branch context (modern Git syntax)' },
      { cmd: 'git branch -a', desc: 'List all local and remote tracking branches' },
      { cmd: 'git branch -d feature/old', desc: 'Safely delete a merged branch' },
    ],
  },
  {
    category: 'Staging & Commits',
    commands: [
      { cmd: 'git status', desc: 'Show working tree status and staged changes' },
      { cmd: 'git add .', desc: 'Stage all modified, untracked, and deleted files' },
      { cmd: 'git commit -m "feat(scope): imperative summary"', desc: 'Create commit using Conventional Commits' },
      { cmd: 'git commit --amend', desc: 'Modify the most recent commit message or files' },
    ],
  },
  {
    category: 'Merging & History',
    commands: [
      { cmd: 'git log --oneline --graph --all', desc: 'Display visual ASCII branch graph' },
      { cmd: 'git pull --rebase origin develop', desc: 'Rebase local branch on top of upstream changes' },
      { cmd: 'git merge --no-ff feature/auth', desc: 'Merge preserving explicit merge commit milestone' },
      { cmd: 'git cherry-pick <hash>', desc: 'Apply a specific commit from another branch' },
    ],
  },
  {
    category: 'Undo & Emergency',
    commands: [
      { cmd: 'git reset --soft HEAD~1', desc: 'Undo last commit while keeping changes staged' },
      { cmd: 'git restore --staged <file>', desc: 'Unstage file while preserving local modifications' },
      { cmd: 'git stash push -m "wip"', desc: 'Temporarily shelve uncommitted working tree changes' },
      { cmd: 'git stash pop', desc: 'Re-apply stashed changes and drop from stash list' },
      { cmd: 'git reflog', desc: 'View local reference logs to recover "lost" commits' },
    ],
  },
];
