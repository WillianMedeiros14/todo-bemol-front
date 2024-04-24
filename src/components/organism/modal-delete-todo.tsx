"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

import { Loader2, Trash2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import React from "react";

interface IPropsModalDeleteTodo {
  id: number;
  onRefetch: () => void;
}

export function ModalDeleteTodo({ id, onRefetch }: IPropsModalDeleteTodo) {
  const { toast } = useToast();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return api.delete(`/todo/deleteTodoById/${id}`);
    },
    onSuccess: () => {
      toast({
        description: "Todo deletado com sucesso.",
        className: "bg-green-600 text-white",
      });
      onRefetch();
      handleClose();
    },

    onError(error: any) {
      toast({
        description: "Erro ao deletar todo",
        variant: "destructive",
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-transparent bg-secondary-100 text-secondary-500 gap-2 hover:text-secondary-500">
          <Trash2 />
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você deseja excluir essa tarefa?</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja excluir essa tarefa, essa ação é
            irrevesivel
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <Button
            disabled={false}
            type="button"
            className="bg-secondary-500"
            onClick={() => {
              mutate();
            }}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sim, excluir
          </Button>
          {/* <AlertDialogAction className="bg-secondary-500">



            Sim, excluir

            {isPending &&  <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
