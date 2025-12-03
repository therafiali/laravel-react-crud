// pages/PageManagement.tsx
import { useState } from 'react';
import { usePageQuery } from '../hooks/query/usePageQuery';
import { PageList } from '../components/shared/PageList';
import { PageEditor } from '../components/shared/PageEditor';


const PageManagement = () => {
  const { data: pagesData } = usePageQuery();
  const [editingPageKey, setEditingPageKey] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Page Management</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {!editingPageKey ? (
          <PageList pages={pagesData || []} onEdit={(page) => setEditingPageKey(page.page_key)} />
        ) : (
          <PageEditor pageKey={editingPageKey} onCancel={() => setEditingPageKey(null)} />
        )}
      </div>
    </div>
  );
};

export default PageManagement;