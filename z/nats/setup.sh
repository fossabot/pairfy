helm install nats nats/nats --set=config.jetstream.enabled=true --set=config.cluster.enabled=true


helm install nats nats/nats -f values.yaml