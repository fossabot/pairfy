helm repo add weaviate https://weaviate.github.io/weaviate-helm
helm repo update


helm install weaviate weaviate/weaviate -f values.yaml

helm upgrade weaviate weaviate/weaviate -f values.yaml

#helm uninstall weaviate weaviate/weaviate

helm uninstall weaviate


#kubectl delete  pvc weaviate-data-weaviate-0

#kubectl delete pv