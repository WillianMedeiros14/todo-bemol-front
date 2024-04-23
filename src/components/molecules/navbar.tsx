import Image from "next/image";
import { NewTodo } from "../organism/new-todo";

export function Navbar() {
  return (
    <div className="mx-auto mb-9 flex w-full items-center justify-between flex-wrap">
      <div className="flex items-center">
        <Image
          src={"/assets/logoBemolDigital.png"}
          alt={"E-Farms"}
          width={64}
          height={64}
        />
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
