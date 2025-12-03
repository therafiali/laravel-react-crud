import { usePageContentQuery } from "../hooks/query/usePageContentQuery";
import { useLanguage } from "../context/LanguageContext";

// Interface matches your JSON response exactly
interface AboutPageData {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  main_image: string;
  gallery_images: string[];
}

const About = () => {
  const { language, setLanguage } = useLanguage(); // Get global state
  
  // Pass dynamic language to hook
  const { data, isLoading } = usePageContentQuery("about", language);
  
  const pageContent = data as AboutPageData | undefined;

  // --- Loading Skeleton ---
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse">
        <div className="h-8 bg-gray-200 w-1/3 mx-auto mb-12 rounded"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 w-full rounded"></div>
            <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
            <div className="h-4 bg-gray-200 w-4/6 rounded"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!pageContent) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      
      {/* --- Language Toggles (Clean Pill Design) --- */}
      <div className="flex justify-end mb-8">
        <div className="bg-gray-100 p-1 rounded-full inline-flex">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              language === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              language === 'ar' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            العربية
          </button>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <div className="text-center mb-16">
        <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">
          {pageContent.subheading}
        </span>
        <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
          {pageContent.heading}
        </h1>
      </div>

      {/* --- Main Content Split --- */}
      {/* In RTL, the browser automatically puts the first div on the right and second on the left */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        
        {/* Text Block */}
        <div className="prose prose-lg text-gray-600 max-w-none">
          <p className="whitespace-pre-line leading-relaxed">
            {pageContent.description}
          </p>
        </div>

        {/* Image Block */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative">
             {pageContent.main_image ? (
                <img
                  src={pageContent.main_image}
                  alt={pageContent.heading}
                  className="w-full rounded-2xl shadow-xl object-cover transform transition-transform duration-500 group-hover:scale-[1.01]"
                />
             ) : (
               <div className="h-64 bg-gray-100 rounded-2xl flex items-center justify-center">No Image</div>
             )}
          </div>
        </div>
      </div>

      {/* --- Gallery Grid --- */}
      {pageContent.gallery_images?.length > 0 && (
        <div className="border-t border-gray-100 pt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'معرض الصور' : 'Gallery'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {pageContent.gallery_images.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl bg-gray-100 aspect-square group">
                <img
                  src={img}
                  alt={`Gallery ${idx}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default About;