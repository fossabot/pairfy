#!/bin/bash

set -euo pipefail

echo "📦 Buscando última versión..."
LATEST_VERSION=$(npm show @pairfy/common version)

echo "🔄 Instalando @pairfy/common@$LATEST_VERSION..."
npm install @pairfy/common@$LATEST_VERSION

echo "✅ Express actualizado a la versión $LATEST_VERSION"
