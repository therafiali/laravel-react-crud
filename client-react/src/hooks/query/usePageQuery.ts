import { useQuery } from "@tanstack/react-query";
import { getAllPages } from "../../api/pageApi";

export const usePageQuery = () => {
  return useQuery({
    queryKey: ["page"],
    queryFn: getAllPages,
  });
};
