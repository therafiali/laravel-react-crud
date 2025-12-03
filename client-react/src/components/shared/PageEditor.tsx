// src/components/PageEditor.tsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, X, Type, AlignLeft, Globe } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';
import { usePageContentQuery } from '../../hooks/query/usePageContentQuery';
import { usePageContentMutation } from '../../hooks/mutations/usePageContentMutation';
import { GalleryUpload } from './GalleryUpload';
import { LanguageTabs } from './LanguageTabs';
import { InputField } from './InputField';


// --- Schema & Types ---
const pageContentSchema = z.object({
  heading_en: z.string().optional(),
  heading_ar: z.string().optional(),
  description_en: z.string().optional(),
  description_ar: z.string().optional(),
  subheading_en: z.string().optional(),
  subheading_ar: z.string().optional(),
  main_image_en: z.string().optional(),
  main_image_ar: z.string().optional(),
  gallery_images_en: z.array(z.string()).optional(),
  gallery_images_ar: z.array(z.string()).optional(),
});

type PageContentForm = z.infer<typeof pageContentSchema>;
type Language = 'en' | 'ar';

// --- Form Field Configuration ---
const FORM_FIELDS = [
  { baseName: 'heading', label: 'Heading', arLabel: 'العنوان', icon: Type, isTextarea: false },
  { baseName: 'subheading', label: 'Subheading', arLabel: 'العنوان الفرعي', icon: Type, isTextarea: false },
  { baseName: 'description', label: 'Description', arLabel: 'الوصف', icon: AlignLeft, isTextarea: true },
] as const;

const IMAGE_FIELDS = [
  { baseName: 'main_image', label: 'Main Image', arLabel: 'الصورة الرئيسية' },
] as const;

// --- Helper Functions ---
const containsArabic = (text: string) =>
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
const containsEnglish = (text: string) => /[A-Za-z]/.test(text);

const getSafeArValue = (val: string | undefined) => {
  const text = val || '';
  if (containsEnglish(text) && !containsArabic(text)) return '';
  return text;
};

// --- Component ---
interface PageEditorProps {
  pageKey: string;
  onCancel: () => void;
}

export const PageEditor = ({ pageKey, onCancel }: PageEditorProps) => {
  const [activeTab, setActiveTab] = useState<Language>('en');

  // Queries
  const { data: dataEn, isLoading: isLoadingEn } = usePageContentQuery(pageKey, 'en');
  const { data: dataAr, isLoading: isLoadingAr } = usePageContentQuery(pageKey, 'ar', {
    enabled: activeTab === 'ar',
  });

  const mutation = usePageContentMutation();

  // Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PageContentForm>({
    resolver: zodResolver(pageContentSchema),
    defaultValues: {
      heading_en: '',
      heading_ar: '',
      description_en: '',
      description_ar: '',
      subheading_en: '',
      subheading_ar: '',
      main_image_en: '',
      main_image_ar: '',
      gallery_images_en: [],
      gallery_images_ar: [],
    },
  });

  // Load English Data
  useEffect(() => {
    const contentEn = dataEn?.data || dataEn || {};
    if (Object.keys(contentEn).length > 0) {
      setValue('heading_en', contentEn.heading || contentEn.page_title || '');
      setValue('subheading_en', contentEn.subheading || '');
      setValue('description_en', contentEn.description || contentEn.intro_text || '');
      setValue('main_image_en', contentEn.main_image || '');
      setValue('gallery_images_en', contentEn.gallery_images || []);
    }
  }, [dataEn, setValue]);

  // Load Arabic Data
  useEffect(() => {
    const contentAr = dataAr?.data || dataAr || {};
    if (Object.keys(contentAr).length > 0) {
      setValue('heading_ar', getSafeArValue(contentAr.heading || contentAr.page_title));
      setValue('subheading_ar', getSafeArValue(contentAr.subheading));
      setValue('description_ar', getSafeArValue(contentAr.description || contentAr.intro_text));
      setValue('main_image_ar', contentAr.main_image || '');
      setValue('gallery_images_ar', contentAr.gallery_images || []);
    }
  }, [dataAr, setValue]);

  // Image Handlers
  const handleImageChange = (imageUrl: string, fieldName: string) => {
    setValue(fieldName as keyof PageContentForm, imageUrl);
  };

  const handleImageRemove = (fieldName: string) => {
    setValue(fieldName as keyof PageContentForm, '');
  };

  const handleGalleryImageAdd = (imageUrl: string) => {
    const currentGallery = watch(`gallery_images_${activeTab}` as keyof PageContentForm) as string[] || [];
    const updatedGallery = [...currentGallery, imageUrl];
    setValue(`gallery_images_${activeTab}` as keyof PageContentForm, updatedGallery as any);
  };

  const handleGalleryImageRemove = (index: number) => {
    const currentGallery = watch(`gallery_images_${activeTab}` as keyof PageContentForm) as string[] || [];
    const updatedGallery = currentGallery.filter((_, i) => i !== index);
    setValue(`gallery_images_${activeTab}` as keyof PageContentForm, updatedGallery as any);
  };

  // Submit Handler
  const onSubmit = (data: PageContentForm) => {
    mutation.mutate({ page_key: pageKey, formData: data, lang: activeTab });
  };

  // Loading State
  if (isLoadingEn) {
    return <div className="p-10 text-center text-gray-500">Loading English content...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Globe size={20} />
          Edit Page: <span className="capitalize">{pageKey}</span>
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {/* Language Tabs */}
        <LanguageTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        {activeTab === 'ar' && isLoadingAr ? (
          <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-lg">
            Loading Arabic content...
          </div>
        ) : (
          <div className="space-y-6">
            {/* Text Fields */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-800">
                {activeTab === 'en' ? 'Content' : 'المحتوى'}
              </h3>
              {FORM_FIELDS.map((field) => (
                <InputField
                  key={`${field.baseName}_${activeTab}`}
                  icon={field.icon}
                  label={activeTab === 'en' ? field.label : field.arLabel}
                  name={`${field.baseName}_${activeTab}` as keyof PageContentForm}
                  lang={activeTab}
                  isTextarea={field.isTextarea}
                  register={register}
                  watch={watch}
                  errors={errors}
                />
              ))}
            </div>

            {/* Image Fields */}
            <div className="border-t pt-6">
              <h3 className="text-md font-semibold text-gray-800 mb-4">
                {activeTab === 'en' ? 'Images' : 'الصور'}
              </h3>
              <div className="space-y-4">
                {IMAGE_FIELDS.map((field) => (
                  <ImageUploadField
                    key={`${field.baseName}_${activeTab}`}
                    label={activeTab === 'en' ? field.label : field.arLabel}
                    name={`${field.baseName}_${activeTab}`}
                    lang={activeTab}
                    pageKey={pageKey}
                    currentImage={watch(`${field.baseName}_${activeTab}` as keyof PageContentForm) as string}
                    onImageChange={handleImageChange}
                    onImageRemove={handleImageRemove}
                  />
                ))}
              </div>

              {/* Gallery Images */}
              <div className="mt-6">
                <GalleryUpload
                  lang={activeTab}
                  pageKey={pageKey}
                  images={(watch(`gallery_images_${activeTab}` as keyof PageContentForm) as string[]) || []}
                  onImageAdd={handleGalleryImageAdd}
                  onImageRemove={handleGalleryImageRemove}
                />
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-6 mt-6 border-t">
          <button
            type="submit"
            disabled={mutation.isPending || (activeTab === 'ar' && isLoadingAr)}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={18} />
            {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <X size={18} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};