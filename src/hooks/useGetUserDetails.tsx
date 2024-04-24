import { getUserDetailsService } from "@/services/getUserDetails.service";
import { useQuery } from "@tanstack/react-query";

import { parseCookies } from "nookies";

const { "auth.token": accessToken } = parseCookies();

export function useGetUserDetails() {
  return useQuery({
    queryKey: ["keyUserDetails", accessToken],
    queryFn: async () => {
      const result = await getUserDetailsService();

      return result;
    },
  });
}
