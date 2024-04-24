import { api } from "@/config/axios";
import { IIuser } from "@/context/auth";

export async function getUserDetailsService() {
  const response = await api.get<IIuser>("/me");
  return response.data;
}
