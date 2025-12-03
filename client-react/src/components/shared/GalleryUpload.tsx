// src/components/GalleryUpload.tsx
import { X } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

interface GalleryUploadProps {
  lang: 'en' | 'ar';
  pageKey: string;
  images: string[];
  onImageAdd: (imageUrl: string) => void;
  onImageRemove: (index: number) => void;
}

export const GalleryUpload = ({
  lang,
  pageKey,
  images,
  onImageAdd,
  onImageRemove,
}: GalleryUploadProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">
        {lang === 'en' ? 'Gallery Images' : 'صور المعرض'}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Existing Images */}
        {images.map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => onImageRemove(index)}
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
            >
              <X size={16} className="text-red-600" />
            </button>
          </div>
        ))}

        {/* Add New Image */}
        <ImageUploadField
          label={lang === 'en' ? 'Add Image' : 'إضافة صورة'}
          name={`gallery_new_${lang}`}
          lang={lang}
          pageKey={pageKey}
          onImageChange={onImageAdd}
          onImageRemove={() => {}}
        />
      </div>
    </div>
  );
};