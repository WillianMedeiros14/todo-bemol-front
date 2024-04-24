import { api } from "@/config/axios";

export interface ITodo {
  id: number;
  name: string;
  description: string;
  userId: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getAllService() {
  const response = await api.get<ITodo[]>("/todo/getAll");
  return response.data;
}
