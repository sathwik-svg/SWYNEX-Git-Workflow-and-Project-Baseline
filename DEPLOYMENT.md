# SWYNEX Technologies — Container Onboarding & Deployment Guide

Welcome to **SWYNEX Technologies**! This guide provides incoming interns and software engineers with step-by-step instructions to build, run, debug, and deploy the application container in any environment with 100% repeatability.

---

## 📋 Prerequisites

Before running the container, ensure your system has one of the following installed:
- **Docker Desktop** (macOS, Windows, or Linux) $\ge$ `v24.0.0`
- **Docker Compose** $\ge$ `v2.20.0`
- *(Alternative)*: **Podman** / `podman-compose`

Verify your installation:
```bash
docker --version
docker compose version
```

---

## ⚡ Option 1: Quick Start with Docker Compose (Recommended)

The simplest way to spin up the fully configured production stack with health checks:

### 1. Clone the Repository
```bash
git clone https://github.com/sathwik-svg/SWYNEX-Container-or-Repeatable-Deployment.git
cd SWYNEX-Container-or-Repeatable-Deployment
```

### 2. Launch the Container Stack
```bash
docker compose up --build -d
```

### 3. Verify Health & Access the Application
Open your browser and navigate to:
- **Application UI**: [http://localhost:3000](http://localhost:3000)
- **Container Health Check**: [http://localhost:3000/health](http://localhost:3000/health)

### 4. Stop the Stack
```bash
docker compose down
```

---

## 🛠️ Option 2: Build & Run with Standard Docker CLI

### 1. Build the Multi-Stage Docker Image
```bash
docker build -t swynex-app:v1.0.0 .
```

> **What happens during the build?**
> - **Stage 1 (`builder`)**: Uses Node 20 Alpine, executes `npm ci`, runs TypeScript typecheck, executes the 15 Vitest quality gates, and compiles optimized production assets.
> - **Stage 2 (`runner`)**: Discards all build tools and source code, copies only production bundles and server runtime, switches to non-root `appuser` (UID 10001), and configures health check probes. Total image size is under 80MB!

### 2. Run the Container
```bash
docker run -d \
  --name swynex-production-container \
  -p 3000:3000 \
  --restart unless-stopped \
  swynex-app:v1.0.0
```

### 3. Verify the Container is Running
```bash
docker ps --filter "name=swynex-production-container"
```

---

## 🔍 Container Inspection & Diagnostics Runbook

### Check Container Health Status
```bash
docker inspect --format='{{json .State.Health.Status}}' swynex-production-container
# Expected Output: "healthy"
```

### View Live Streaming Logs
```bash
docker logs -f swynex-production-container
```

### Inspect Container Resource Usage (CPU & Memory)
```bash
docker stats swynex-production-container --no-stream
```

### Open an Interactive Shell inside the Container
```bash
docker exec -it swynex-production-container sh
```

---

## ☁️ Cloud & Production Deployment Reference

This container is packaged according to the Open Container Initiative (OCI) specification and is directly deployable to any modern cloud container platform:

### Deploy to Google Cloud Run
```bash
# Tag image for Google Artifact Registry
docker tag swynex-app:v1.0.0 gcr.io/PROJECT_ID/swynex-app:v1.0.0

# Push and deploy
docker push gcr.io/PROJECT_ID/swynex-app:v1.0.0
gcloud run deploy swynex-app \
  --image gcr.io/PROJECT_ID/swynex-app:v1.0.0 \
  --platform managed \
  --port 3000 \
  --allow-unauthenticated
```

### Deploy to AWS ECS / Fargate
```bash
# Authenticate and push to Amazon ECR
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.eu-west-1.amazonaws.com
docker tag swynex-app:v1.0.0 ACCOUNT_ID.dkr.ecr.eu-west-1.amazonaws.com/swynex-app:latest
docker push ACCOUNT_ID.dkr.ecr.eu-west-1.amazonaws.com/swynex-app:latest
```

---

## ❓ Troubleshooting Common Issues

| Issue | Cause | Resolution |
| :--- | :--- | :--- |
| `port 3000 already in use` | Another local process is bound to port 3000 | Run on another port: `docker run -p 8080:3000 swynex-app:v1.0.0` or stop the conflicting process. |
| Container status `unhealthy` | `/health` probe failed or timed out | Run `docker logs swynex-production-container` to inspect server startup output. |
| `permission denied` | Trying to write outside unprivileged user scope | The container runs as non-root `appuser`. Persist data only via attached Docker volumes. |
