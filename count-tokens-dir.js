#!/usr/bin/env node


const fs = require('fs/promises');
const path = require('path');


const EXCLUDE_FILES = [
  'README.md',
  '.env',
  '1.jpg',
  '2.jpg',
  '3.jpg',
  'delaware-dsa-handbook.pdf',
  'package-lock.json',
  'may-2025-newsletter.html',
  '.DS_Store',
  'dedsa-logo.png',
  '*.woff',
  '*.woff2',
  '*.eot',
  'output.txt',
  /\.(test|spec)\.[jt]sx?$/,
];

function shouldExcludeFile(filename) {
  return EXCLUDE_FILES.some((pattern) =>
    typeof pattern === 'string' ? filename === pattern : pattern.test(filename)
  );
}

async function* getFiles(dir) {
  for (const dirent of await fs.readdir(dir, { withFileTypes: true })) {
    const res = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      if (
        [
          '.next',
          'node_modules',
          '.git',
          '.husky',
          'backend',
          'original-backup',
          'dist',
          'fonts',
        ].includes(dirent.name)
      ) {
        continue;
      }
      yield* getFiles(res);
    } else if (dirent.isFile()) {
      if (shouldExcludeFile(dirent.name)) continue;
      yield res;
    }
  }
}

(async () => {
  const { Tiktoken } = await import('js-tiktoken/lite');
  const { default: o200k } = await import('js-tiktoken/ranks/o200k_base');
  const enc = new Tiktoken(o200k);

  const results = [];
  try {
    for await (const filePath of getFiles(process.cwd())) {
      let text;
      try {
        text = await fs.readFile(filePath, 'utf8');
      } catch {
        console.error(`⚠️  Skipping unreadable: ${filePath}`);
        continue;
      }
      const tokens = enc.encode(text).length;
      results.push({ file: path.relative(process.cwd(), filePath), tokens });
    }

    
    results.sort((a, b) => b.tokens - a.tokens);
    for (const { file, tokens } of results) {
      console.log(`${file}: ${tokens}`);
    }
  } finally {
    
    if (typeof enc.free === 'function') {
      enc.free();
    }
  }
})();
