# Delaware DSA Website

Website for Delaware DSA

## Technology Stack

### Backend

- WordPress (Headless Mode)
- WPGraphQL
- MariaDB
- Redis
- PublishPress Authors

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Apollo Client

### Infrastructure

- Local by Flywheel (local development)
- GridPane (WordPress hosting)
- Vercel (Next.js hosting)
- GitHub Actions (CI/CD)
- Cloudflare (CDN and security)

## Directory Structure

- `/backend` - WordPress headless CMS files
- `/frontend` - Next.js application
- `/docs` - Documentation
- `/scripts` - Utility scripts
- `/.github` - GitHub Actions workflow configurations

## Setup

Run `./setup.sh` from the repository root to install Node tooling used by the frontend.

## Token Management

Use `node count-tokens-dir.js` to inspect token counts for all files. To reduce token usage in JSON content, run `node minify-json.js` which minifies every JSON file in the repository.
