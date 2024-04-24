import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Info, Settings, User } from "lucide-react";
import Image from "next/image";
import { ModalSignOut } from "./modal-signOut";
import React from "react";

export function MenuProfile() {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Image
          src={"/assets/logoBemolDigital.png"}
          alt={"E-Farms"}
          width={64}
          height={64}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-4">
        <DropdownMenuItem className="gap-2 p-2 text-white-950">
          <User className="text-primary-400" />
          Perfil
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2 p-2 text-white-950">
          <Settings className="text-primary-400" />
          Configurações
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2  p-2  text-white-950">
          <Info className="text-primary-400" />
          Sobre
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <ModalSignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
