import { TypeSignUp } from "@/components/organism/signUp";
import { api } from "@/config/axios";
import { ISignInResult } from "@/context/auth";

export async function signOutService(data: TypeSignUp) {
  const dataForm = {
    username: data.username,
    email: data.email,
    password: data.password,
  };

  const response = await api.post<ISignInResult>("/register", dataForm);
  return response.data;
}
