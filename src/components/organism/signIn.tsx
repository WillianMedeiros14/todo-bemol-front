"use client";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { InputComponent } from "../atoms/input-component";

import { Form, FormField } from "../ui/form";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

const formSchema = z.object({
  email: z
    .string()
    .min(5, {
      message: "E-mail é um campo obrigatório",
    })
    .email({ message: "E-mail inválido" }),
  password: z.string().min(8, {
    message: "Senha deve conter pelo menos 8 caracteres",
  }),
});

export type TypeSignIn = z.infer<typeof formSchema>;

export function SignIn() {
  const { toast } = useToast();

  const form = useForm<TypeSignIn>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: TypeSignIn) => {
      //   return SignIn({
      //     ...values,
      //   });
    },
    onSuccess: () => {
      //   form.reset();
      //   handleClose();
    },

    onError(error: any) {
      const { data } = error?.response;

      console.log({ data });

      toast({
        description: "Erro ao realizar login",
        variant: "destructive",
      });
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

          <div className="flex flex-col">
            <Button
              disabled={false}
              type="submit"
              className="w-full bg-primary-600 mt-4 gap-2"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Entrar
            </Button>

            <span className="font-normal text-center text-white-500">ou</span>

            <Button
              variant={"outline"}
              disabled={false}
              type="submit"
              className="w-full"
              // onClick={handleClose}
            >
              Cadastre-se
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
