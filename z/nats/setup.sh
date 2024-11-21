helm install nats nats/nats --set=config.jetstream.enabled=true --set=cluster.enabled=true



helm install nats nats/nats -f values.yaml