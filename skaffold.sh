#!/bin/bash
./common/publish.sh
echo "⏳ Esperando 3 segundos..."
sleep 15
echo "✅ Listo!"
./service-seller/package.sh
skaffold dev

#chmod +x skaffold.sh

