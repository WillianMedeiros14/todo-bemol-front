"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { LogOut } from "lucide-react";

import React from "react";
import { useAuth } from "@/hooks/useAuth";

export function ModalSignOut() {
  const { SignOut } = useAuth();

  const [open, setOpen] = React.useState(false);

  function onPress() {
    SignOut();
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="text-red-600 hover:text-red-400 gap-2"
          variant="ghost"
        >
          <LogOut />
          Sair
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você deseja sair?</AlertDialogTitle>
          <AlertDialogDescription>
            Tudo bem, mas você irá precisar se autenticar novamente quando
            quiser voltar
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <Button
            disabled={false}
            type="button"
            className="bg-secondary-500 gap-2"
            onClick={() => {
              onPress();
            }}
          >
            Sim, quero sair
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
