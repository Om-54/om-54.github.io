#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "  OMPRAKASH RAHANGDALE — PORTFOLIO PUBLISHER"
echo "=========================================================="
echo ""

# Check authentication
if ! gh auth status &>/dev/null; then
  echo "Step 1: Logging into GitHub via browser..."
  echo "A browser window will open. Click 'Authorize github' to confirm."
  echo ""
  gh auth login -w -p https
fi

echo ""
echo "Step 2: Creating repository and pushing code..."

# Create repo if it doesn't exist and push main
if gh repo view Om-54/om-54.github.io &>/dev/null; then
  echo "Repository Om-54/om-54.github.io exists. Pushing latest code..."
  git remote set-url origin https://github.com/Om-54/om-54.github.io.git 2>/dev/null || git remote add origin https://github.com/Om-54/om-54.github.io.git
  git push -u origin main
else
  echo "Creating new public repository Om-54/om-54.github.io..."
  gh repo create Om-54/om-54.github.io --public --source=. --remote=origin --push
fi

echo ""
echo "=========================================================="
echo "  🎉 SUCCESS! YOUR PORTFOLIO IS PUBLISHED ONLINE!"
echo "  Your live website URL: https://om-54.github.io"
echo "=========================================================="
