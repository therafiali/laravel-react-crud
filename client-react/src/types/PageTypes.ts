// types/page.types.ts

export type Language = 'en' | 'ar';

export interface Page {
  page_key: string;
  is_public?: boolean;
}

export interface PageContent {
  heading?: string;
  page_title?: string;
  subheading?: string;
  description?: string;
  intro_text?: string;
  main_image?: string;
  gallery_images?: string[];
}

export interface PageContentResponse {
  data: PageContent;
}

export interface PageContentForm {
  heading_en?: string;
  heading_ar?: string;
  description_en?: string;
  description_ar?: string;
  subheading_en?: string;
  subheading_ar?: string;
  main_image_en?: string;
  main_image_ar?: string;
  gallery_images_en?: string[];
  gallery_images_ar?: string[];
}

export interface DynamicPageData {
  id: number;
  page_key: string;
  lang: string;
  heading: string;
  subheading: string;
  description: string;
  main_image: string;
  gallery_images: string[];
  created_at: string;
  updated_at: string;
}
