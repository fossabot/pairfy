const env = 'dev'
const NETWORK = 'preprod'

const baseURL = {
  local: 'https://localhost:443',
  dev: 'https://pairfy.dev',
  prod: 'https://pairfy.store',
}

const HOST = baseURL[env]

const domains = {
  dev: 'pairfy.dev',
  prod: 'pairfy.store',
}

const domain = domains[env]

export { env, baseURL, HOST, NETWORK, domain }
