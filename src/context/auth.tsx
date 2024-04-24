"use client";
import { queryClient } from "@/app/providers";
import { TypeSignIn } from "@/components/organism/signIn";

import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/axios";

import { signInService } from "@/services/signIn.service";

import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import { ReactNode, createContext, useEffect } from "react";

export interface IToken {
  type: "bearer";
  token: string;
  expiresAt: Date;
}

export interface IIuser {
  id: number;
  username: string;
  email: string;
  image: string;
}

export interface ISignInResult {
  user: IIuser;
  token: IToken;
}

interface AuthContextData {
  SignIn: (credentials: TypeSignIn) => void;
  SignOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);
export let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthProviderProps) {
  const { toast } = useToast();
  const { replace } = useRouter();

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signIn":
          window.location.href = "/todo";

          break;
        case "signOut":
          destroyCookie(undefined, "userId", { path: "/" });
          window.location.href = "/";
          replace("/");
          break;
        default:
          break;
      }
    };
  }, [replace]);

  async function SignIn({ email, password }: TypeSignIn) {
    try {
      const result = await signInService({
        email,
        password,
      });

      console.log({ result });
      const token = result.token.token;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      queryClient.setQueriesData(
        { queryKey: ["keyUserDetails", token] },
        () => {
          return {
            ...result.user,
          };
        }
      );

      setCookie(undefined, "auth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      authChannel.postMessage("signIn");

      window.location.href = "/todo";

      toast({
        description: "Todo criado com sucesso.",
        className: "bg-green-600 text-white",
      });
    } catch (error) {
      toast({
        description: "Credenciais inválidas!",
        variant: "destructive",
      });
    }
  }

  async function SignOut() {
    queryClient.clear();
    toast({
      description: "Você foi deslogado",
      className: "bg-green-600 text-white",
    });

    destroyCookie(undefined, "auth.token", { path: "/" });

    replace("/");
    authChannel.postMessage("signOut");
  }

  return (
    <AuthContext.Provider value={{ SignIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
}
