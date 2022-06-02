import axios from "axios";
import { baseUrl } from "./types";

export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});
