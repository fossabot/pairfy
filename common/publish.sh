#!/bin/bash

set -e

cd "$(dirname "$0")/.." # Mover al root del proyecto (si ejecutas desde ./common)

PACKAGE_DIR="./common"
PACKAGE_NAME=$(node -p "require('$PACKAGE_DIR/package.json').name")
CURRENT_VERSION=$(node -p "require('$PACKAGE_DIR/package.json').version")

echo "🔍 Verificando si hubo cambios en $PACKAGE_NAME desde la última publicación..."

# Verificar si hay cambios sin commitear
if git diff --quiet HEAD -- $PACKAGE_DIR; then
  echo "✅ No hay cambios en $PACKAGE_DIR. No se publicará nada."
  exit 0
fi

# Verificar si la versión ya está publicada
if npm view $PACKAGE_NAME@$CURRENT_VERSION > /dev/null 2>&1; then
  echo "🟡 La versión $CURRENT_VERSION ya está publicada."

  cd $PACKAGE_DIR

  npm run pub

else
  echo "🚀 Publicando versión $CURRENT_VERSION..."

  cd $PACKAGE_DIR

  npm run pub
fi
