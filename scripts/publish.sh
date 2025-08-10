#!/bin/bash
set -euo pipefail

# This script executes integration tests and publishes a stable version

# Check if VERSION argument is provided
if [ $# -eq 0 ]; then
    echo "Error: VERSION argument is required"
    echo "Usage: $0 <VERSION>"
    echo "Example: $0 1.2.3"
    exit 1
fi

VERSION="$1"

echo "Building project..."
npm ci
npm run build

echo "Running integration tests..."
npm run integrate_test

echo "Setting version to $VERSION..."
# Set the specified version and commit the changes
npm version "$VERSION"
npm run jsr:version

# Add files to git
git add jsr.json package*.json

# Commit with version as message
ACTUAL_VERSION=$(jq -r '.version' package.json)
git commit -m "$ACTUAL_VERSION"

echo "Publishing to npm..."
npm publish --provenance

echo "Publishing to JSR..."
npx -y jsr publish

echo "Publish completed successfully!"
