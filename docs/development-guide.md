# Development Guide

## Prerequisites

- Node.js and npm
- Git

## Local Development Setup

### Frontend (Next.js)

1. From the repository root run `./setup.sh` to install frontend dependencies.
2. Navigate to the frontend directory: `cd frontend`

## Deployment

Refer to the deployment documentation for production setup instructions.

## Token Management

Run `node count-tokens-dir.js` to view token counts for each file. You can minimize JSON files to lower the overall count by executing `node minify-json.js` from the repository root.

## Performance & Monitoring

Aim for the following Core Web Vitals when developing UI components:

- **FCP** (First Contentful Paint) under **1.2s**
- **LCP** (Largest Contentful Paint) under **2.5s**
- **CLS** (Cumulative Layout Shift) under **0.1**

Use browser devtools and Lighthouse to track these metrics during development.
