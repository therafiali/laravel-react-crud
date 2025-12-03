import type { Language } from "../types/PageTypes";
import { api } from "./axios";


interface PageContentPayload {
  lang: Language;
  data: {
    heading?: string;
    subheading?: string;
    description?: string;
    main_image?: string;
    gallery_images?: string[];
  };
}


const getAllPages = async () => {
  const response = await api.get("/page");
  return response.data?.data;
};

const getPageContent = async (page_key: string, lang: string) => {
  const response = await api.get(`/pages/${page_key}/content?lang=${lang}`);
  return response.data?.data || {};
};

const addPageContent = async (data: PageContentPayload, page_key: string) => {
  const response = await api.post(`/pages/${page_key}/content`, data);
  return response.data?.data;
};

export { getAllPages, getPageContent, addPageContent };
