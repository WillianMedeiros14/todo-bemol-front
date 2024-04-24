import { TypeSignIn } from "@/components/organism/signIn";
import { api } from "@/config/axios";
import { ISignInResult } from "@/context/auth";

export async function signInService(data: TypeSignIn) {
  const response = await api.post<ISignInResult>("/authenticate", data);
  return response.data;
}
