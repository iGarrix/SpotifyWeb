import axios from "axios";
import { baseUrl } from "./types";

export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export const AuthorizateHeader = (token: any) => {
  return {
    headers: {
      Authorization: "Bearer " + token
    }
  }
}
export interface IAuthConfig {
  headers: { Authorization: any };
}