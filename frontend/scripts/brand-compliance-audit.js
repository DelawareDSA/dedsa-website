#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('DSA Brand Compliance Audit');
console.log('==========================\n');

let issues = [];

function checkFonts() {
  const cssFiles = ['src/app/globals.css', 'tailwind.config.js'];
  let fontsCorrect = true;
  cssFiles.forEach((file) => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      if (!content.includes('styrene') && !content.includes('Styrene')) {
        issues.push(`❌ Missing Styrene B font in ${file}`);
        fontsCorrect = false;
      }
      if (!content.includes('manifold') && !content.includes('Manifold')) {
        issues.push(`❌ Missing Manifold DSA font in ${file}`);
        fontsCorrect = false;
      }
    }
  });
  if (fontsCorrect) {
    console.log('✅ Typography: DSA-approved fonts configured');
  }
}

function checkColors() {
  const configFile = 'tailwind.config.js';
  if (fs.existsSync(configFile)) {
    const content = fs.readFileSync(configFile, 'utf8');
    if (content.includes('#EC1F27')) {
      console.log('✅ Colors: DSA Red (#EC1F27) configured');
    } else {
      issues.push('❌ Colors: DSA Red (#EC1F27) not found');
    }
    if (content.includes('pink') || content.includes('rose')) {
      issues.push('⚠️  Colors: Pink/rose colors detected (should use DSA Red)');
    }
  }
}

function checkMessageLength() {
  const homeFile = 'src/core/content/pages/home.json';
  if (fs.existsSync(homeFile)) {
    const content = JSON.parse(fs.readFileSync(homeFile, 'utf8'));
    if (content.strategicPrioritiesSection?.priorities) {
      let compliant = true;
      content.strategicPrioritiesSection.priorities.forEach((priority) => {
        const wordCount = priority.title.split(' ').length;
        if (wordCount > 15) {
          issues.push(
            `❌ Message: "${priority.title}" is ${wordCount} words (max 15)`
          );
          compliant = false;
        }
      });
      if (compliant) {
        console.log('✅ Messaging: Priority titles under 15-word limit');
      }
    }
  }
}

function checkAltText() {
  console.log('⚠️  Alt-text: Manual review required for all images');
  issues.push(
    '📋 TODO: Verify all images have descriptive alt-text (≤120 chars)'
  );
}

function checkFontSizes() {
  const globalCSS = 'src/app/globals.css';
  if (fs.existsSync(globalCSS)) {
    const content = fs.readFileSync(globalCSS, 'utf8');
    if (content.includes('max(16px, 1rem)')) {
      console.log('✅ Typography: 16px minimum font size enforced');
    } else {
      issues.push('❌ Typography: 16px minimum font size not enforced');
    }
  }
}

checkFonts();
checkColors();
checkMessageLength();
checkAltText();
checkFontSizes();

console.log('\n' + '='.repeat(40));
if (issues.length === 0) {
  console.log('🎉 All automated checks passed!');
} else {
  console.log(`Found ${issues.length} compliance issues:\n`);
  issues.forEach((issue) => console.log(issue));
  console.log('\nPlease address these issues before deployment.');
}

console.log('\nManual checks still required:');
console.log('• Photo releases for all member images');
console.log('• Steering Committee approval for content changes');
console.log('• HTTPS enforcement on production');
console.log('• Form encryption for contact submissions');
