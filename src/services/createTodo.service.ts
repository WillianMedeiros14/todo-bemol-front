import { TypeNewTodo } from "@/components/organism/new-todo";
import { api } from "@/config/axios";

export async function createTodoService(data: TypeNewTodo) {
  const response = await api.post("/todo/create", data);
  return response.data;
}
