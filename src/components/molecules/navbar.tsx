"use client";

import { NewTodo } from "../organism/new-todo";
import { useGetUserDetails } from "@/hooks/useGetUserDetails";
import { MenuProfile } from "./menu-profile";

export function Navbar() {
  const { data } = useGetUserDetails();

  return (
    <div className="mx-auto mb-9 flex w-full items-center justify-between flex-wrap gap-3">
      <div className="flex items-center">
        <MenuProfile />

        <div className="ml-4 flex flex-col">
          <span className="text-2xl font-bold mb-2">Olá, {data?.username}</span>
          <span className="text-sm font-medium text-white-950">
            É ótimo tê-lo aqui. Vamos ser eficiente juntos?
          </span>
        </div>
      </div>

      <NewTodo />
    </div>
  );
}
