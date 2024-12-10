import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://cardano-preprod.blockfrost.io/api/v0",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Project_id": process.env.PROJECT_ID
  },
});

export { axiosAPI };
