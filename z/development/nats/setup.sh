helm install nats nats/nats --set=config.jetstream.enabled=true --set=config.cluster.enabled=true -f values.yaml

#helm uninstall nats nats/nats

#helm install nats nats/nats -f values.yaml

#helm upgrade nats nats/nats -f values.yaml