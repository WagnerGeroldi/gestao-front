import axios from "axios";

const baseURL = "http://localhost:3334/";

const api = axios.create({
  baseURL: baseURL,
});

export { api };
