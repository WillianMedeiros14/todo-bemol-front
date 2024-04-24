"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronLeft, Edit2, Edit3, Loader2, Save } from "lucide-react";

import { Form, FormField } from "../ui/form";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputComponent } from "../atoms/input-component";
import { InputAreComponent } from "../atoms/input-area-component";
import { createTodoService } from "@/services/createTodo.service";
import { useGetTodoHome } from "@/hooks/useGetTodoHome";
import { ITodo } from "@/services/getTodoHome.service";
import { api } from "@/config/axios";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Nome deve ter pelo menos 6 caracteres",
  }),
  description: z
    .string()
    .max(500, {
      message: "Nome deve ter pelo menos 6 caracteres",
    })
    .optional(),
  completed: z.boolean(),
});

export type TypeNewTodo = z.infer<typeof formSchema>;

interface IUpdateTodo {
  dataUpdate: ITodo;
}

export function UpdateTodo({ dataUpdate }: IUpdateTodo) {
  const { toast } = useToast();
  const { refetch } = useGetTodoHome();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const form = useForm<TypeNewTodo>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: dataUpdate.name,
      description: dataUpdate.description ? dataUpdate.description : undefined,
      completed: dataUpdate.completed,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const data = {
        name: values.name,
        description: values.description,
        completed: values.completed,
      };

      return api.put(`/todo/updateTodo/${dataUpdate.id}`, data);
    },
    onSuccess: (data) => {
      refetch();

      toast({
        description: "Todo alterado com sucesso.",
        className: "bg-green-600 text-white",
      });
      form.reset();
      handleClose();
    },

    onError(error: any) {
      toast({
        description: "Erro ao alterar todo",
        variant: "destructive",
      });
    },
  });

  const handleChange = (value: boolean) => {
    setOpen(value);

    form.setValue("name", dataUpdate.name);
    if (dataUpdate.description) {
      form.setValue("description", dataUpdate.description);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <Sheet open={open} onOpenChange={handleChange}>
      <SheetTrigger asChild>
        <Button className="bg-transparent text-black gap-2 hover:text-white-default">
          <Edit3 />
          Editar
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center">
          <SheetClose asChild className="mt-2">
            <Button variant={"ghost"} className="hover:bg-transparent">
              <ChevronLeft />
            </Button>
          </SheetClose>
          <div>
            <SheetTitle>Tarefa</SheetTitle>
            <SheetDescription>Crie sua tarefa</SheetDescription>
          </div>
        </SheetHeader>

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
                    title="Tarefa"
                    placeholder="Digite o nome da tarefa"
                    isLoading={isPending}
                    field={{ ...field }}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <InputAreComponent
                    title="Descrição"
                    placeholder="Digite a descrição da tarefa"
                    isLoading={isPending}
                    field={{ ...field }}
                  />
                )}
              />

              <div className="flex flex-1 flex-col gap-2">
                <Button
                  disabled={false}
                  type="submit"
                  className="w-full bg-primary-600 mt-4 gap-2"
                >
                  Salvar
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save />
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
