const env = "prod";
const NETWORK = "preprod";
const baseURL = {
  local: "https://localhost:443",
  dev: "https://pairfy.dev",
  prod: "https://pairfy.store",
};

const HOST = baseURL[env];

export { env, baseURL, HOST, NETWORK };
