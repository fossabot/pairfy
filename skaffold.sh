#!/bin/bash
./common/publish.sh
echo "⏳ SLEEP ..."
sleep 15

set -euo pipefail

TARGET_DIR="service-seller"  

echo "📦 Buscando última versión de @pairfy/common..."
LATEST_VERSION=$(npm show @pairfy/common version)

echo "📁 Entrando a ./$TARGET_DIR..."
cd "$TARGET_DIR"

echo "🔄 Instalando @pairfy/common@$LATEST_VERSION dentro de $TARGET_DIR..."
npm install @pairfy/common@$LATEST_VERSION

echo "✅ @pairfy/common actualizado a la versión $LATEST_VERSION en $TARGET_DIR"

cd - > /dev/null  


skaffold dev

#chmod +x skaffold.sh

