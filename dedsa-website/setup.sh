#!/bin/bash
set -euo pipefail

if [ -f frontend/package-lock.json ]; then
  npm ci --prefix frontend
else
  npm install --prefix frontend
fi

echo "Setup complete"