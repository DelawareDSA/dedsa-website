#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function calculateFleschScore(text) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.trim().length > 0);
  const syllables = words.reduce(
    (total, word) => total + countSyllables(word),
    0
  );

  if (sentences.length === 0 || words.length === 0) return 0;

  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  return 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
}

function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function getGradeLevel(score) {
  if (score >= 90) return 'Grade 5';
  if (score >= 80) return 'Grade 6';
  if (score >= 70) return 'Grade 7';
  if (score >= 60) return 'Grade 8-9';
  if (score >= 50) return 'Grade 10-12';
  if (score >= 30) return 'College';
  return 'Graduate';
}

const contentDir = path.join(__dirname, '../src/core/content/pages');
const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.json'));

console.log('DSA Readability Compliance Check');
console.log('=================================');
console.log('TARGET: Grade 10 (Flesch Score 60-70)\n');

let allCompliant = true;

files.forEach((file) => {
  const content = JSON.parse(
    fs.readFileSync(path.join(contentDir, file), 'utf8')
  );

  function checkText(obj, p = '') {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = p ? `${p}.${key}` : key;

      if (typeof value === 'string' && value.length > 50) {
        const score = calculateFleschScore(value);
        const grade = getGradeLevel(score);
        const compliant = score >= 60 && score <= 70;
        if (!compliant) allCompliant = false;
        console.log(`${file} -> ${currentPath}`);
        console.log(
          `  Score: ${score.toFixed(1)} (${grade}) ${compliant ? '✅' : '❌'}`
        );
        console.log(`  Text: "${value.substring(0, 60)}..."`);
        console.log('');
      } else if (typeof value === 'object' && value !== null) {
        checkText(value, currentPath);
      }
    }
  }

  checkText(content);
});

if (allCompliant) {
  console.log('🎉 All content meets DSA readability standards!');
  process.exit(0);
} else {
  console.log(
    '⚠️  Some content needs simplification for Grade 10 readability.'
  );
  process.exit(1);
}
