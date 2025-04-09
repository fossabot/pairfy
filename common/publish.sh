#!/bin/bash

set -e

CURRENT_VERSION=$(node -p "require('./common/package.json').version")

echo "🔍 Verificando si la versión $CURRENT_VERSION ya está publicada en NPM..."

if npm view $(node -p "require('./common/package.json').name")@$CURRENT_VERSION > /dev/null 2>&1; then
  echo "🟡 Ya está publicada la versión $CURRENT_VERSION. Saltando publicación."
else
  echo "🚀 Publicando versión $CURRENT_VERSION..."
  npm run pub
fi
