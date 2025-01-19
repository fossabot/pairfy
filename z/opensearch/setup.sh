helm repo add opensearch-operator https://opensearch-project.github.io/opensearch-k8s-operator/

helm repo list | grep opensearch

helm install opensearch-operator opensearch-operator/opensearch-operator


#https://github.com/Opster/opensearch-k8s-operator

kubectl apply -f A/k8s/opensearch-cluster.yaml

kubectl port-forward svc/my-cluster-dashboards 5601

kubectl port-forward svc/my-cluster 9200

#kubectl delete -f A/k8s/opensearch-cluster.yaml

