import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPageContent } from "../../api/pageApi";
import type { PageContentForm } from "../../types/PageTypes";

interface PageContentMutationParams {
  page_key: string;
  formData: PageContentForm;
  lang: "en" | "ar";
}

export const usePageContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      page_key,
      formData,
      lang, // New parameter: 'en' or 'ar'
    }: PageContentMutationParams) => {
      // Only prepare and send payload for the active language
      const payload = {
        lang: lang,
        data: {
          heading: formData[`heading_${lang}`],
          subheading: formData[`subheading_${lang}`],
          description: formData[`description_${lang}`],
          main_image: formData[`main_image_${lang}`],
          gallery_images: formData[`gallery_images_${lang}`] || [],
        },
      };
      await addPageContent(payload, page_key);
    },
    onSuccess: (_, variables) => {
      // Invalidate queries for the specific language that was updated
      queryClient.invalidateQueries({
        queryKey: ["content", variables.page_key, variables.lang],
      });

      const langName = variables.lang === "en" ? "English" : "Arabic";
      alert(`${langName} content saved successfully!`);
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to save content");
    },
  });
};
