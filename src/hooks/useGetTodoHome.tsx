import { getAllService } from "@/services/getTodoHome.service";
import { useQuery } from "@tanstack/react-query";

import { parseCookies } from "nookies";

const { "auth.token": accessToken } = parseCookies();

export function useGetTodoHome() {
  return useQuery({
    queryKey: ["keyProductsHome", accessToken],
    queryFn: () => getAllService(),
  });
}
