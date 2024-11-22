
helm uninstall nats-exporter prometheus-community/prometheus-nats-exporter

helm install nats-exporter prometheus-community/prometheus-nats-exporter \
  --set nats.url="http://nats:8222" \
  --set service.port=7777 \
  --set service.targetPort=7777 



