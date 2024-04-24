"use client";

import { useGetTodoHome } from "@/hooks/useGetTodoHome";

import { Loader2, Ellipsis, Edit3, Trash2 } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/axios";
import { useToast } from "../ui/use-toast";
import { formatLastEditedAgo } from "@/functions/formatLastEditedAgo";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModalDeleteTodo } from "./modal-delete-todo";
import { UpdateTodo } from "./update-todo";
interface IOnCheckedProps {
  completed: boolean;
  id: number;
}

export function TodoHome() {
  const { toast } = useToast();

  const { data, isLoading, refetch } = useGetTodoHome();
  const [idSelect, setIdSelect] = useState(0);

  function onChecked({ completed, id }: IOnCheckedProps) {
    setIdSelect(id);
    mutate({
      completed,
      id,
    });
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: IOnCheckedProps) => {
      const data = {
        completed: values.completed,
      };

      return api.put(`/todo/updateTodo/${values.id}`, data);
    },
    onSuccess: () => {
      refetch();
      setIdSelect(0);
    },

    onError(error: any) {
      const { data } = error?.response;

      toast({
        description: "Erro ao alterar Check do todo",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex flex-1 w-full flex-col">
      <div className="mb-7">
        <span className="text-sm font-semibold text-white-950">
          {data && data?.length > 0 ? data?.length : 0} tarefas
        </span>
      </div>
      {isLoading && (
        <div className="flex flex-wrap mx-auto pt-10 justify-center">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        </div>
      )}

      {data?.length === 0 && (
        <span className="text-sm font-semibold text-white-950 text-center">
          Nenhuma tarefa cadastrada
        </span>
      )}

      {data && data?.length > 0 && (
        <div className="flex w-full flex-col ">
          {data && data?.length > 0 && (
            <Accordion
              type="single"
              collapsible
              className="w-full flex flex-col"
            >
              {data?.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id.toString()}
                  className="flex flex-col"
                >
                  <div className="flex items-center flex-row gap-2 ">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => {
                          onChecked({
                            completed: !item.completed,
                            id: item.id,
                          });
                        }}
                      />

                      <span className="text-sm font-semibold">{item.name}</span>
                    </div>
                    <div className="flex flex-1 justify-center items-center">
                      <span>{`Última edição ${formatLastEditedAgo(
                        item.updatedAt
                      )}`}</span>
                    </div>

                    <AccordionTrigger />
                  </div>

                  <AccordionContent className="flex flex-row justify-between">
                    {`${item.description ? item.description : "-"}`}

                    <Popover>
                      <PopoverTrigger>
                        <Ellipsis />
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col gap-2">
                        <UpdateTodo dataUpdate={item} />

                        <ModalDeleteTodo id={item.id} onRefetch={refetch} />
                      </PopoverContent>
                    </Popover>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      )}
    </div>
  );
}
