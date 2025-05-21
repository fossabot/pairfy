helm repo add verdaccio https://charts.verdaccio.org
helm repo update


#helm install verdaccio verdaccio/verdaccio



helm install verdaccio verdaccio/verdaccio -f values.yaml
