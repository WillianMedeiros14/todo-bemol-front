import axios from "axios";
import { parseCookies } from "nookies";

const { "auth.token": accessToken } = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
