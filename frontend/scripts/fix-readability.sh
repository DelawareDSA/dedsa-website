#!/bin/bash

# Delaware DSA Readability Fixer
# This script applies all readability improvements and then checks the results

echo "🔧 Delaware DSA Readability Fixer"
echo "================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the frontend directory"
    echo "   Expected to find package.json in current directory"
    exit 1
fi

if [ ! -d "src/core/content/pages" ]; then
    echo "❌ Error: Content directory not found"
    echo "   Expected to find src/core/content/pages/"
    exit 1
fi

# Check if the fix script exists
if [ ! -f "scripts/fix-readability.js" ]; then
    echo "❌ Error: fix-readability.js script not found"
    echo "   Please ensure scripts/fix-readability.js exists"
    exit 1
fi

echo "📋 Step 1: Backing up current content..."
BACKUP_DIR="content-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r src/core/content/pages/* "$BACKUP_DIR/"
echo "✅ Backup created: $BACKUP_DIR"
echo ""

echo "🔧 Step 2: Applying readability fixes..."
node scripts/fix-readability.js
RESULT=$?

if [ $RESULT -ne 0 ]; then
    echo ""
    echo "❌ Error applying fixes. Restoring backup..."
    rm -rf src/core/content/pages/*
    cp -r "$BACKUP_DIR"/* src/core/content/pages/
    echo "✅ Backup restored"
    exit 1
fi

echo ""
echo "📊 Step 3: Checking readability scores..."
node scripts/check-readability.js
READABILITY_RESULT=$?

echo ""
echo "📈 Results Summary"
echo "=================="

if [ $READABILITY_RESULT -eq 0 ]; then
    echo "🎉 All content now meets Grade 10 readability standards!"
    echo "✅ Backup available at: $BACKUP_DIR"
    echo ""
    echo "Next steps:"
    echo "- Review the changes: git diff"
    echo "- Test the website: npm run dev"
    echo "- Commit changes: git add . && git commit -m 'Improve content readability'"
else
    echo "⚠️  Some content may still need manual review"
    echo "✅ Backup available at: $BACKUP_DIR"
    echo ""
    echo "Next steps:"
    echo "- Review remaining issues above"
    echo "- Test the website: npm run dev"
    echo "- Consider manual adjustments for any remaining low scores"
fi

echo ""
echo "🔧 Available commands:"
echo "- npm run check-readability  (check scores only)"
echo "- npm run fix-readability    (apply fixes only)"
echo "- npm run readability        (fix + check)"