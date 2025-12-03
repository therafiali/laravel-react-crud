// components/ImageUploadField.tsx
import { useState, useRef, useEffect } from "react";
import { Image, Upload, X, Loader2 } from "lucide-react";
import { api } from "../../api/axios";

interface ImageUploadFieldProps {
  label: string;
  name: string;
  lang: "en" | "ar";
  pageKey: string;
  currentImage?: string;
  onImageChange: (imageUrl: string, fieldName: string) => void;
  onImageRemove: (fieldName: string) => void;
}

export const ImageUploadField = ({
  label,
  name,
  lang,
  pageKey,
  currentImage,
  onImageChange,
  onImageRemove,
}: ImageUploadFieldProps) => {
  const [preview, setPreview] = useState<string>(currentImage || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when currentImage prop changes
  useEffect(() => {
    setPreview(currentImage || "");
  }, [currentImage]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("page_key", pageKey);
      formData.append("lang", lang);
      formData.append("field_name", name);

      const response = await api.post("/pages/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;

      onImageChange(result.url, name);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
      setPreview(currentImage || "");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onImageRemove(name);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Image size={16} /> {label}
        <span
          className={`text-xs px-2 py-0.5 rounded ${
            lang === "en"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {lang.toUpperCase()}
        </span>
      </label>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={label}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                disabled={isUploading}
              >
                <Upload size={16} className="text-gray-700" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                disabled={isUploading}
              >
                <X size={16} className="text-red-600" />
              </button>
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <Loader2 size={32} className="text-white animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 size={32} className="animate-spin mb-2" />
            ) : (
              <Upload size={32} className="mb-2" />
            )}
            <span className="text-sm">
              {isUploading ? "Uploading..." : "Click to upload image"}
            </span>
            <span className="text-xs text-gray-400 mt-1">
              PNG, JPG, GIF up to 5MB
            </span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
