import { useQuery } from "@tanstack/react-query";
import { getPageContent } from "../../api/pageApi";

// 1. Add 'options' parameter
export const usePageContentQuery = (page_key: string, lang: string = "en", options?: any) => {
  return useQuery({
    // 2. Add 'lang' here. CRITICAL: Prevents English/Arabic data collision
    queryKey: ["content", page_key, lang],
    
    queryFn: async () => {
      if (!page_key) return null;
      const data = await getPageContent(page_key, lang);
      return data;
    },
    
    // 3. Merge the default check with your custom options
    enabled: !!page_key,
    ...options, 
  });
};