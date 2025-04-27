helm repo add weaviate https://weaviate.github.io/weaviate-helm
helm repo update


helm install weaviate weaviate/weaviate -f values.yaml


helm upgrade weaviate weaviate/weaviate -f values.yaml
