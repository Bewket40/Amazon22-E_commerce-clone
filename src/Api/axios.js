import axios from "axios"

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-b2e84/us-central1/api",
  baseURL: "https://api-5fc3ui4wna-uc.a.run.app",
});

export {axiosInstance}