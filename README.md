# SWYNEX Git Workflow and Project Baseline

> **Internship Program**: SWYNEX Technologies  
> **Task Number**: Task 1 — Git Workflow and Project Baseline  
> **Student / Contributor**: Sathwik Ganji (`sathwik-svg` / `ganjisathwik73@gmail.com`)  
> **Repository**: `SWYNEX-Git-Workflow-and-Project-Baseline`  

---

## 📌 Executive Summary

This repository establishes an industry-standard **Git Workflow and Project Baseline** designed for collaborative, high-velocity software engineering at **SWYNEX Technologies**. It defines strict branching protocols, conventional commit standards, PR review lifecycles, and automated continuous integration baselines, accompanied by an interactive sample application demonstrating these concepts in practice.

---

## 🎯 Objectives Completed for Task 1

1. **Repository Baseline**: Created structured repository architecture with production-grade `.gitignore`, comprehensive documentation, and environment configuration.
2. **Git Workflow & Branching Strategy**: Defined a predictable Git Flow / Trunk-Based hybrid branching standard documented in [`BRANCHING.md`](./BRANCHING.md).
3. **Commit Message Discipline**: Adopted the Conventional Commits specification with atomic changes and scoped messages.
4. **Interactive Sample Application**: Built an interactive Git Workflow Simulator, CLI command sandbox, baseline inspector, and submission readiness suite.
5. **Quality & Review Protocols**: Documented pull request checklists, code review guidelines, and CI lint/build pipelines.

---

## 📂 Repository Structure

```text
SWYNEX-Git-Workflow-and-Project-Baseline/
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated CI pipeline for linting & building
├── .env.example                 # Documented environment variable template
├── .gitignore                   # Curated ignore rules for Node, IDEs & OS files
├── BRANCHING.md                 # Formal Branching & Release Strategy
├── CONTRIBUTING.md              # Contributor guidelines & PR checklist
├── README.md                    # Core project documentation (this file)
├── index.html                   # HTML entry point with metadata tags
├── metadata.json                # Project capabilities & descriptors
├── package.json                 # Project dependencies & npm scripts
├── tsconfig.json                # Strict TypeScript compiler options
├── vite.config.ts               # Vite bundler configuration
└── src/
    ├── App.tsx                  # Main application orchestrator & workbench
    ├── main.tsx                 # React DOM mount point
    ├── index.css                # Global styles with Tailwind CSS
    ├── components/              # Modular UI components
    │   ├── GitVisualizer.tsx    # Interactive Git commit graph & branch visualizer
    │   ├── TerminalSandbox.tsx  # Git CLI command emulator with live state
    │   ├── DocViewer.tsx        # In-app file viewer & one-click exporter
    │   ├── SubmissionHelper.tsx # LinkedIn copy generator & checklist validator
    │   └── SampleTaskApp.tsx    # Sample project baseline tracker
    └── data/
        └── gitStandards.ts      # Structured reference data for Git workflows
```

---

## 🌿 Git Branching Strategy Summary

Our team follows a structured branching policy detailed fully in [`BRANCHING.md`](./BRANCHING.md):

| Branch Name | Base Branch | Target Branch | Purpose & Scope |
| :--- | :--- | :--- | :--- |
| `main` | — | Production | Stable, production-ready code. Locked with strict protection rules. |
| `develop` | `main` | `main` | Integration branch for upcoming releases. |
| `feature/<name>` | `develop` | `develop` | New functionality or feature development (e.g., `feature/auth-provider`). |
| `bugfix/<name>` | `develop` | `develop` | Non-urgent fixes during active development cycles. |
| `release/vX.Y.Z` | `develop` | `main` & `develop` | Release candidate stabilization and version bumping. |
| `hotfix/<name>` | `main` | `main` & `develop` | Urgent patches directly applied to production issues. |

For detailed rules on merge strategies, rebase workflows, and conflict resolution, see [**BRANCHING.md**](./BRANCHING.md).

---

## 💬 Conventional Commit Standards

Every commit message must be atomic and follow the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/) specification:

```text
<type>(<optional scope>): <description in imperative mood>

[optional body explaining 'why' and context]

[optional footer(s) like Closes #123]
```

### Allowed Types
- **`feat`**: A new feature for the user or platform (e.g., `feat(auth): add OAuth2 token refresh`)
- **`fix`**: A bug fix (e.g., `fix(parser): resolve null pointer on empty input`)
- **`docs`**: Documentation changes only (e.g., `docs(readme): update deployment guide`)
- **`style`**: Formatting, whitespace, semicolon fixes (no production logic change)
- **`refactor`**: Code restructuring without altering external behavior
- **`perf`**: Performance optimizations
- **`test`**: Adding missing unit, integration, or end-to-end tests
- **`chore`**: Maintenance, build system configs, or dependency updates

---

## 🚀 Quick Start & Development Setup

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher
- Git `v2.30.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/sathwik-svg/SWYNEX-Git-Workflow-and-Project-Baseline.git
cd SWYNEX-Git-Workflow-and-Project-Baseline
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the template environment file:
```bash
cp .env.example .env
```

### 4. Run Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:3000`.

### 5. Build for Production & Linting
```bash
# Verify TypeScript types and lint
npm run lint

# Compile optimized static bundle
npm run build
```

---

## 🛠️ Step-by-Step GitHub Setup & Push Commands

To initialize and push this baseline to your official GitHub repository:

```bash
# 1. Initialize local Git repository (if not already initialized)
git init

# 2. Stage all baseline files
git add .

# 3. Create initial baseline commit adhering to Conventional Commits
git commit -m "feat(baseline): establish SWYNEX Git workflow and initial application"

# 4. Set default branch to main
git branch -M main

# 5. Link to your public GitHub repository
git remote add origin https://github.com/sathwik-svg/SWYNEX-Git-Workflow-and-Project-Baseline.git

# 6. Push local commits to remote
git push -u origin main

# 7. Create and push development branch
git checkout -b develop
git push -u origin develop
```

---

## 📝 LinkedIn Submission Template

For Task 1 submission requirements:

```text
Excited to share that I have completed Task 1 of my software engineering internship with @SWYNEX Technologies! 🚀

For Task 1, I established a clean Git Workflow and Project Baseline. Key deliverables include:
🔹 Architected a standard Git Flow & Trunk branching model (main, develop, feature, hotfix).
🔹 Implemented Conventional Commits standards and atomic changelog hygiene.
🔹 Configured production-ready .gitignore, PR review templates, and CI baseline.
🔹 Developed an interactive Git Workflow Simulator & developer workbench.

📂 GitHub Repository: https://github.com/sathwik-svg/SWYNEX-Git-Workflow-and-Project-Baseline
💻 Live Demo: https://ais-pre-ze3uf6qukon6gdukiw334v-981864576343.asia-east1.run.app

Huge thanks to the team at @SWYNEX Technologies for the mentorship and high-standard engineering challenges!

#SWYNEX #Internship #GitWorkflow #SoftwareEngineering #WebDevelopment #DevOps #CleanCode
```

---

## 📄 License & Attribution

Distributed under the Apache-2.0 License. Built for the **SWYNEX Technologies Internship Program**.
