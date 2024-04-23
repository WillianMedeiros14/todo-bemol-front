"use client";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn, Save } from "lucide-react";
import React from "react";
import { InputComponent } from "../atoms/input-component";

import { Form, FormField } from "../ui/form";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import Link from "next/link";

const formSchema = z
  .object({
    name: z.string().min(5, {
      message: "Nome deve ter pelo menos 6 caracteres",
    }),
    email: z
      .string()
      .min(5, {
        message: "E-mail é um campo obrigatório",
      })
      .email({ message: "E-mail inválido" }),

    password: z.string().min(8, {
      message: "Senha deve conter pelo menos 8 caracteres",
    }),
    confirmPassword: z.string().min(8, {
      message: "A confirmação de senha deve conter pelo menos 8 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type TypeSignUp = z.infer<typeof formSchema>;

export function SignUp() {
  const { toast } = useToast();

  const form = useForm<TypeSignUp>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      // return signUpService({
      //   ...values,
      // });
    },
    onSuccess: (data) => {
      toast({
        description: "Cadastro criado com sucesso.",
        className: "bg-green-600 text-white",
      });
      form.reset();
    },

    onError(error: any) {
      if (error?.code === "auth/email-already-in-use") {
        toast({
          description: "Esse email já está em uso",
          variant: "destructive",
        });
      } else {
        toast({
          description: "Erro ao criar cadastro",
          variant: "destructive",
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <InputComponent
                title="Nome"
                placeholder="Digite seu nome"
                isLoading={isPending}
                field={{ ...field }}
              />
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <InputComponent
                title="E-mail"
                placeholder="Informe seu e-mail"
                isLoading={isPending}
                field={{ ...field }}
              />
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <InputComponent
                title="Senha"
                type="password"
                placeholder="Digite sua senha"
                isLoading={isPending}
                field={{ ...field }}
              />
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <InputComponent
                title="Confirmação de senha"
                type="password"
                placeholder="Confirm sua senha"
                isLoading={isPending}
                field={{ ...field }}
              />
            )}
          />

          <div className="flex flex-col gap-2">
            <Button
              disabled={false}
              type="submit"
              className="w-full bg-primary-600 mt-4 gap-2"
            >
              Cadastrar
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save />
              )}
            </Button>

            <span className="font-normal text-center text-white-500">ou</span>

            <Button
              asChild
              variant={"outline"}
              type="button"
              className="border-none bg-secondary-50 text-primary-600"
            >
              <Link href={`/`}>Já tenho uma contra</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
