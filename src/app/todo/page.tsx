import { Navbar } from "@/components/molecules/navbar";
import { TodoHome } from "@/components/organism/todo-home";

export default function Todo() {
  return (
    <main className="flex max-w-screen-2xl mx-auto min-h-screen flex-col p-10">
      <Navbar />

      <TodoHome />
    </main>
  );
}
