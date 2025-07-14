// ecosystem.config.js
module.exports = {
  apps: [{
    name: "delaware-dsa-frontend",
    script: "server.js",
    cwd: "./.next/standalone",         // Run from the standalone folder
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
    watch: false,
    autorestart: true,
    max_memory_restart: "512M"
  }]
}
