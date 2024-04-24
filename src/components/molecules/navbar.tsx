import Image from "next/image";
import { NewTodo } from "../organism/new-todo";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ModalSignOut } from "./modal-signOut";

export function Navbar() {
  return (
    <div className="mx-auto mb-9 flex w-full items-center justify-between flex-wrap gap-3">
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger>
            <Image
              src={"/assets/logoBemolDigital.png"}
              alt={"E-Farms"}
              width={64}
              height={64}
            />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2">
            <ModalSignOut />
          </PopoverContent>
        </Popover>

        <div className="ml-4 flex flex-col">
          <span className="text-2xl font-bold mb-2">Olá, Willian Medeiros</span>
          <span className="text-sm font-medium text-white-950">
            É ótimo tê-lo aqui. Vamos ser eficiente juntos?
          </span>
        </div>
      </div>

      <NewTodo />
    </div>
  );
}
