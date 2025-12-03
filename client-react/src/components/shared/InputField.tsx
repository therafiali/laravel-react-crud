// src/components/InputField.tsx
import { type LucideIcon, AlertCircle } from 'lucide-react';
import { type UseFormRegister, type UseFormWatch, type FieldErrors } from 'react-hook-form';

const containsArabic = (text: string) =>
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);

const containsEnglish = (text: string) => /[A-Za-z]/.test(text);

const getFieldWarning = (name: string, value: string) => {
  if (!value || value.trim().length === 0) return null;
  const isEnField = name.endsWith('_en');
  const isArField = name.endsWith('_ar');

  if (isEnField && containsArabic(value) && !containsEnglish(value))
    return '⚠️ This appears to be Arabic text in an English field';
  if (isArField && containsEnglish(value) && !containsArabic(value))
    return '⚠️ This appears to be English text in an Arabic field';
  return null;
};

interface InputFieldProps<T extends Record<string, any>> {
  icon: LucideIcon;
  label: string;
  name: keyof T;
  isTextarea?: boolean;
  lang: string;
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
}

export function InputField<T extends Record<string, any>>({
  icon: Icon,
  label,
  name,
  isTextarea = false,
  lang,
  register,
  watch,
  errors,
}: InputFieldProps<T>) {
  const currentValue = (watch(name) as string) || '';
  const warning = getFieldWarning(name as string, currentValue);
  const direction = lang === 'ar' ? 'rtl' : 'ltr';
  const hasError = !!errors[name];

  const baseInputClass = `w-full px-3 py-2 border rounded-lg focus:ring-2 ${
    warning || hasError
      ? 'border-orange-400 focus:ring-orange-500'
      : 'border-gray-300 focus:ring-blue-500'
  }`;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon size={16} /> {label}
        <span
          className={`text-xs px-2 py-0.5 rounded ${
            lang === 'en' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {lang.toUpperCase()}
        </span>
      </label>

      {isTextarea ? (
        <textarea
          {...register(name)}
          dir={direction}
          className={`${baseInputClass} resize-none`}
          rows={3}
          placeholder={lang === 'en' ? 'Enter English text...' : 'أدخل النص العربي...'}
        />
      ) : (
        <input
          type="text"
          {...register(name)}
          dir={direction}
          className={baseInputClass}
          placeholder={lang === 'en' ? 'Enter English text...' : 'أدخل النص العربي...'}
        />
      )}

      {warning && (
        <div className="flex items-start gap-2 text-sm text-orange-600 bg-orange-50 p-2 rounded">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>{warning}</span>
        </div>
      )}
      {errors[name] && (
        <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>{(errors[name] as any)?.message}</span>
        </div>
      )}
    </div>
  );
}