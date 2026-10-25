# SWYNEX Technologies — Git Branching Strategy & Lifecycle Notes

This document outlines the formal Git branching model, branch protection standards, merge strategies, and release lifecycles enforced at **SWYNEX Technologies**.

---

## 1. Branch Hierarchy & Classification

```text
  main (production) ──────────────────────────────●──────────────● [v1.0.0]
         ▲                                       ▲              ▲
         │                                       │ (hotfix)     │ (release PR)
         │                                 ┌─────┴──────┐       │
         │ hotfix/auth-leak                │            │       │
         └─────────────────────────────────┴────────────┘       │
                                                                │
  develop (staging/integration) ──────●────────────●────────────┴────●
                                      ▲            ▲
                                      │            │
         feature/user-auth     ───────┘            │
         feature/metrics       ────────────────────┘
```

### 1.1 Long-Lived Branches

- **`main`**:
  - Contains strictly production-ready, deployable code.
  - Direct pushes and force-pushes (`git push -f`) are prohibited.
  - Code lands in `main` exclusively through vetted Pull Requests from `release/*` or `hotfix/*` branches.
  - Every merge to `main` receives an annotated semantic tag (e.g., `v1.0.0`).

- **`develop`**:
  - Serves as the integration branch for upcoming releases.
  - Receives merged feature branches after peer review and passing automated CI checks.
  - Acts as the baseline for nightlies and staging environments.

### 1.2 Ephemeral / Supporting Branches

- **`feature/<short-description>`**:
  - **Base**: `develop`
  - **Merges Into**: `develop`
  - **Naming**: Kebab-case, prefixed with `feature/` (e.g., `feature/git-simulator`, `feature/oauth-integration`).
  - **Lifecycle**: Deleted immediately after successful merge.

- **`bugfix/<ticket-or-description>`**:
  - **Base**: `develop`
  - **Merges Into**: `develop`
  - **Naming**: `bugfix/sidebar-overflow`, `bugfix/sw-102-null-state`.
  - **Purpose**: Routine bug remediation discovered during internal testing.

- **`release/vX.Y.Z`**:
  - **Base**: `develop`
  - **Merges Into**: Both `main` and `develop`
  - **Naming**: SemVer prefixed with `release/` (e.g., `release/v1.0.0`).
  - **Purpose**: Freezes feature additions for regression testing, minor bug fixes, documentation polishing, and version bumping.

- **`hotfix/<issue-name>`**:
  - **Base**: `main`
  - **Merges Into**: Both `main` and `develop`
  - **Naming**: `hotfix/security-patch`, `hotfix/database-connection-leak`.
  - **Purpose**: Urgent production remedies requiring immediate deployment without waiting for the normal development release cycle.

---

## 2. Branch Protection Rules

For repository administrators and team leads:

1. **Require Pull Request Reviews**:
   - Minimum 1 approved code review before merge.
   - Code owners (`CODEOWNERS`) review required on core baseline configurations.
2. **Require Status Checks to Pass**:
   - CI Build & TypeScript Compilation (`npm run build`).
   - Lint verification (`npm run lint`).
   - All tests passing with no regressions.
3. **Require Linear History**:
   - Commits are squashed or rebased to eliminate untidy merge bubble commits on feature branches.
4. **Include Administrators**:
   - Branch protection policies apply universally to ensure baseline stability.

---

## 3. Merge vs. Rebase Strategy

| Scenario | Strategy | Command / Action | Rationale |
| :--- | :--- | :--- | :--- |
| Updating local feature branch with `develop` | **Rebase** | `git pull --rebase origin develop` | Keeps local commit history clean and linear before opening PR. |
| Merging feature branch into `develop` | **Squash & Merge** (via GitHub PR) | GitHub UI: "Squash and merge" | Synthesizes incremental exploratory commits into a clean, atomic feature commit. |
| Merging `release/vX.Y.Z` into `main` | **Merge Commit** | `git merge --no-ff release/vX.Y.Z` | Preserves the distinct release milestone and history timestamp in `main`. |
| Urgent hotfix into `main` | **Squash & Merge** or **Fast-Forward** | GitHub UI / PR review | Quickly delivers fix with clear reference to incident. |

---

## 4. Conflict Resolution Protocol

When merge conflicts occur during rebase:

1. **Inspect Conflict Markers**:
   ```bash
   git status
   ```
2. **Open Conflicted Files**:
   Locate standard conflict delimiters:
   ```text
   <<<<<<< HEAD (current change)
   const apiEndpoint = "/api/v2/workflow";
   =======
   const apiEndpoint = "/api/v3/workflow";
   >>>>>>> feature/auth (incoming change)
   ```
3. **Resolve Manually**:
   Consult with code authors, combine logic appropriately, and remove markers.
4. **Mark as Resolved and Continue**:
   ```bash
   git add <resolved-file>
   git rebase --continue
   ```
5. **Never Force-Push Blindly**:
   Always verify with `git log` and `npm run lint` before updating the remote branch using `--force-with-lease`:
   ```bash
   git push --force-with-lease origin feature/<name>
   ```

---

## 5. Semantic Versioning Tagging Reference

Tags follow `vMAJOR.MINOR.PATCH` format:
- **`MAJOR`**: Incompatible API or structural architectural breaks.
- **`MINOR`**: Backwards-compatible new features.
- **`PATCH`**: Backwards-compatible bug fixes.

Creating an annotated tag:
```bash
git checkout main
git pull origin main
git tag -a v1.0.0 -m "Release v1.0.0: SWYNEX Git Workflow & Project Baseline"
git push origin v1.0.0
```
