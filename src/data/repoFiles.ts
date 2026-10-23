export interface RepoFile {
  name: string;
  path: string;
  language: string;
  description: string;
  content: string;
}

export const REPOSITORY_FILES: RepoFile[] = [
  {
    name: 'README.md',
    path: '/README.md',
    language: 'markdown',
    description: 'Main project documentation, setup guide, branching overview, and submission guide.',
    content: `# SWYNEX Git Workflow and Project Baseline

> **Internship Program**: SWYNEX Technologies  
> **Task Number**: Task 1 — Git Workflow and Project Baseline  
> **Student / Contributor**: Sathwik Ganji (`sathwik-svg` / `ganjisathwik73@gmail.com`)  
> **Repository**: `SWYNEX-Git-Workflow-and-Project-Baseline`  

---

## 📌 Executive Summary

This repository establishes an industry-standard **Git Workflow and Project Baseline** designed for collaborative, high-velocity software engineering at **SWYNEX Technologies**. It defines strict branching protocols, conventional commit standards, PR review lifecycles, and automated continuous integration baselines, accompanied by an interactive sample application demonstrating these concepts in practice.

---

## 🎯 Objectives Completed for Task 1

1. **Repository Baseline**: Created structured repository architecture with production-grade \`.gitignore\`, comprehensive documentation, and environment configuration.
2. **Git Workflow & Branching Strategy**: Defined a predictable Git Flow / Trunk-Based hybrid branching standard documented in [\`BRANCHING.md\`](./BRANCHING.md).
3. **Commit Message Discipline**: Adopted the Conventional Commits specification with atomic changes and scoped messages.
4. **Interactive Sample Application**: Built an interactive Git Workflow Simulator, CLI command sandbox, baseline inspector, and submission readiness suite.
5. **Quality & Review Protocols**: Documented pull request checklists, code review guidelines, and CI lint/build pipelines.

---

## 🌿 Git Branching Strategy Summary

| Branch Name | Base Branch | Target Branch | Purpose & Scope |
| :--- | :--- | :--- | :--- |
| \`main\` | — | Production | Stable, production-ready code. Locked with strict protection rules. |
| \`develop\` | \`main\` | \`main\` | Integration branch for upcoming releases. |
| \`feature/<name>\` | \`develop\` | \`develop\` | New functionality or feature development (e.g., \`feature/auth-provider\`). |
| \`bugfix/<name>\` | \`develop\` | \`develop\` | Non-urgent fixes during active development cycles. |
| \`release/vX.Y.Z\` | \`develop\` | \`main\` & \`develop\` | Release candidate stabilization and version bumping. |
| \`hotfix/<name>\` | \`main\` | \`main\` & \`develop\` | Urgent patches directly applied to production issues. |

For detailed rules on merge strategies, rebase workflows, and conflict resolution, see [**BRANCHING.md**](./BRANCHING.md).

---

## 💬 Conventional Commit Standards

Every commit message must be atomic and follow the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/) specification:

\`\`\`text
<type>(<optional scope>): <description in imperative mood>

[optional body explaining 'why' and context]

[optional footer(s) like Closes #123]
\`\`\`

---

## 🚀 Quick Start & Development Setup

\`\`\`bash
# 1. Clone repository
git clone https://github.com/sathwik-svg/SWYNEX-Git-Workflow-and-Project-Baseline.git
cd SWYNEX-Git-Workflow-and-Project-Baseline

# 2. Install dependencies
npm install

# 3. Start local dev server
npm run dev

# 4. Lint and verify types
npm run lint

# 5. Compile production build
npm run build
\`\`\`

---

## 📄 License & Attribution

Distributed under the Apache-2.0 License. Built for the **SWYNEX Technologies Internship Program**.
`,
  },
  {
    name: 'BRANCHING.md',
    path: '/BRANCHING.md',
    language: 'markdown',
    description: 'Formal branching policy, branch protection rules, rebase workflows, and SemVer release notes.',
    content: `# SWYNEX Technologies — Git Branching Strategy & Lifecycle Notes

This document outlines the formal Git branching model, branch protection standards, merge strategies, and release lifecycles enforced at **SWYNEX Technologies**.

---

## 1. Branch Hierarchy & Classification

- **\`main\`**:
  - Contains strictly production-ready, deployable code.
  - Direct pushes and force-pushes (\`git push -f\`) are prohibited.
  - Code lands in \`main\` exclusively through vetted Pull Requests from \`release/*\` or \`hotfix/*\` branches.
  - Every merge to \`main\` receives an annotated semantic tag (e.g., \`v1.0.0\`).

- **\`develop\`**:
  - Serves as the integration branch for upcoming releases.
  - Receives merged feature branches after peer review and passing automated CI checks.

- **\`feature/<name>\`**:
  - Branched off \`develop\`, merges back into \`develop\` via PR.

- **\`hotfix/<name>\`**:
  - Branched off \`main\`, merges into both \`main\` and \`develop\`.

---

## 2. Branch Protection Rules

1. **Require Pull Request Reviews**: Minimum 1 approved code review before merge.
2. **Require Status Checks to Pass**: Automated CI build and TypeScript verification must pass.
3. **Require Linear History**: Commits squashed or rebased to eliminate messy merge bubbles.

---

## 3. Merge vs. Rebase Strategy

- **Feature update**: \`git pull --rebase origin develop\`
- **Feature into develop**: Squash & Merge via GitHub PR.
- **Release into main**: Merge commit preserving release milestone (\`git merge --no-ff\`).
`,
  },
  {
    name: '.gitignore',
    path: '/.gitignore',
    language: 'plaintext',
    description: 'Production-grade rules ignoring node_modules, build outputs, environment secrets, and OS logs.',
    content: `# ==============================================================================
# SWYNEX Technologies - Git Project Baseline
# Project: SWYNEX-Git-Workflow-and-Project-Baseline
# ==============================================================================

# Dependencies
node_modules/
.pnp
.pnp.js

# Build Outputs & Bundles
dist/
dist-ssr/
build/
*.local

# Environment Variables & Secrets
.env
.env*.local
.env.production
.env.development
!.env.example

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*

# Testing & Code Coverage
coverage/
*.lcov
.nyc_output

# Editor & IDE specific files
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
.idea/
*.suo
*.sw?

# OS Generated Files
.DS_Store
Thumbs.db

# Cache & Temporary
.eslintcache
*.tsbuildinfo
.vite/
`,
  },
  {
    name: '.github/workflows/ci.yml',
    path: '/.github/workflows/ci.yml',
    language: 'yaml',
    description: 'Automated GitHub Actions CI workflow running typecheck, linting, and production builds.',
    content: `name: SWYNEX CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  validate:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    steps:
    - name: Checkout Code
      uses: actions/checkout@v4

    - name: Setup Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'

    - name: Install Dependencies
      run: npm ci

    - name: Typecheck & Lint
      run: npm run lint

    - name: Build Production Assets
      run: npm run build
`,
  },
  {
    name: 'CONTRIBUTING.md',
    path: '/CONTRIBUTING.md',
    language: 'markdown',
    description: 'Guidelines for code contributions, PR checklists, and peer review standards.',
    content: `# Contributing to SWYNEX Project Baseline

Thank you for contributing to the **SWYNEX Technologies** engineering ecosystem.

## 1. Development Lifecycle
1. Branch from \`develop\`: \`git checkout -b feature/your-feature\`
2. Commit with discipline using Conventional Commits.
3. Verify builds and lints locally: \`npm run lint && npm run build\`
4. Push and open a Pull Request targeting \`develop\`.

## 2. Pull Request Checklist
- [ ] Code builds without errors (\`npm run build\`).
- [ ] TypeScript check passes cleanly (\`npm run lint\`).
- [ ] Commits follow Conventional Commits formatting.
- [ ] No extraneous logs or secret credentials committed.
`,
  },
];
