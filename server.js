/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SWYNEX Technologies - Production Container Server
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

// Security & Caching Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Container Healthcheck Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production',
  });
});

// Serve Static Assets with caching
app.use(express.static(DIST_DIR, {
  maxAge: '1d',
  etag: true,
}));

// SPA Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SWYNEX Container runtime active on http://0.0.0.0:${PORT}`);
  console.log(`🩺 Health check endpoint available at http://0.0.0.0:${PORT}/health`);
});
