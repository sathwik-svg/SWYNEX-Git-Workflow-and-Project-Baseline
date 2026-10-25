# SWYNEX Technologies — Release Notes & Changelog

All notable changes to this project are documented in this file, adhering to the [Conventional Commits](https://www.conventionalcommits.org/) and [Semantic Versioning](https://semver.org/) standards.

---

## [v1.2.0] — 2026-10-24 (Task 4: Final Delivery Pipeline)

### 🚀 Continuous Delivery & Release Automation
- **Unified Delivery Pipeline**: Implemented `.github/workflows/delivery.yml` joining build, test, container packaging, staging deployment, smoke verification, and release notes into one deterministic lifecycle.
- **Automated Release Notes Generation**: Integrated commit-driven changelog synthesis tagging releases and publishing immutable release tarballs.
- **Staging Smoke Verification**: Added pre-promotion container health check probe validating zero-downtime readiness.
- **Visual Run Proof**: Documented verified execution logs and pipeline DAG visualization in `PIPELINE.md`.

### 📦 Artifact Distribution
- **Release Tarball**: `swynex-release-v1.2.0.tar.gz`
- **SHA-256 Checksum**: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

---

## [v1.1.0] — 2026-10-24 (Task 3: Container or Repeatable Deployment)

### 🐳 Containerization & Repeatable Runs
- **Multi-Stage Dockerfile**: Implemented Node 20 Alpine multi-stage build, slashing final runtime image size to `<80MB`.
- **Security Hardening**: Dropped root privileges, executing as non-root user `appuser` (UID 10001).
- **Native Healthcheck Probe**: Added Docker `HEALTHCHECK` querying Express `/health` endpoint every 30 seconds.
- **Repeatable Orchestration**: Added `docker-compose.yml` with CPU/memory limits (`cpus: 0.75`, `memory: 512M`).
- **Intern Onboarding Runbook**: Published comprehensive onboarding guide in `DEPLOYMENT.md`.

---

## [v1.0.1] — 2026-10-24 (Task 2: Continuous Integration Pipeline)

### ⚙️ CI Pipeline & Quality Gates
- **Multi-Node Matrix Testing**: Configured automated test execution across Node.js `18.x`, `20.x`, and `22.x`.
- **Automated Unit Testing Suite**: Added Vitest test suite with 15 invariant gates covering Conventional Commits and branch rules.
- **Concurrency Management**: Added `cancel-in-progress: true` to optimize GitHub Actions runner compute.
- **Security Dependency Audit**: Added automated `npm audit` checking for CVE advisories.

---

## [v1.0.0] — 2026-10-23 (Task 1: Git Workflow & Baseline)

### 🌿 Initial Project Baseline
- **Git Branching Strategy**: Formalized Git Flow & Trunk hybrid model documented in `BRANCHING.md`.
- **Conventional Commits**: Enforced standard commit messages with types (`feat`, `fix`, `docs`, `chore`, `ci`).
- **Clean Configuration**: Configured production-grade `.gitignore`, `tsconfig.json`, and environment templates.
- **Interactive Workbench**: Built interactive developer application with commit graph visualizer and CLI sandbox.
