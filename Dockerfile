# ==============================================================================
# SWYNEX Technologies — Task 3: Containerization & Repeatable Deployment
# Multi-Stage, Hardened Production Container
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build & Quality Verification
# ------------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code and build production assets
COPY . .
RUN npm run lint
RUN npm run test
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Hardened, Lightweight Production Runtime (< 80MB)
# ------------------------------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Install curl for reliable container health check probes
RUN apk add --no-cache curl

# Create non-root unprivileged service user for defense-in-depth security
RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy runtime dependencies only
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled assets from builder
COPY --from=builder /app/dist ./dist
COPY server.js ./

# Set ownership to unprivileged user
RUN chown -R appuser:appgroup /app

# Switch to non-root execution
USER appuser

# Expose standardized application port
EXPOSE 3000

# Health Check probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start production server
CMD ["node", "server.js"]
