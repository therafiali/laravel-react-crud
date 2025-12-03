import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/axios";

interface UploadImageParams {
  file: File;
  page_key: string;
  lang: "en" | "ar";
  field_name: string; // e.g., 'main_image', 'gallery_image_1', etc.
}

export interface UploadImageResponse {
  url: string;
  path: string;
}

export const useImageUploadMutation = () => {
  return useMutation({
    mutationFn: async ({
      file,
      page_key,
      lang,
      field_name,
    }: UploadImageParams): Promise<UploadImageResponse> => {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("page_key", page_key),
        formData.append("lang", lang),
        formData.append("field_name", field_name);

      const response = await api.post("/pages/upload-image", formData);

      if (!response.data) {
        throw new Error("Failed to upload image");
      }

      return response.data?.data;
    },
    onError: (error) => {
      console.error("Image upload error", error);
      alert("Failed to upload image. PLease try again.");
    },
  });
};
