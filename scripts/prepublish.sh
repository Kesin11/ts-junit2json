#!/bin/bash
set -euo pipefail

# Test publishing from local purpose

echo "Building project..."
npm ci
npm run build

echo "Running integration tests..."
npm run integrate_test

echo "Creating prerelease version..."
# Bump package.json and jsr.json then commit the changes that mimic `npm version`
npm version prerelease --no-git-tag-version
npm run jsr:version

# Add files to git
git add jsr.json package*.json

# Commit with version as message
VERSION=$(jq -r '.version' package.json)
git commit -m "$VERSION"

echo "Publishing to npm with beta tag..."
npm publish --tag=beta

echo "Publishing to JSR..."
npx -y jsr publish

echo "Prepublish completed successfully!"
