// src/components/PageList.tsx
import { Edit2 } from 'lucide-react';

interface Page {
  page_key: string;
}

interface PageListProps {
  pages: Page[];
  onEdit: (page: Page) => void;
}

export const PageList = ({ pages, onEdit }: PageListProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Page Name
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {pages?.map((page) => (
            <tr key={page.page_key} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 capitalize">
                {page.page_key}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onEdit(page)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 size={14} /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};