import React, { useState } from 'react';
import { ExternalLink, Folder, FileSpreadsheet, FileText, Table2, Download, Upload, Plus, Check } from 'lucide-react';
import { TEMPLATES_DATA, TemplateItem } from '../data/templatesData';

interface TemplatesPageProps {
  onBack: () => void;
  selectedCategory?: string | null;
  onSelectCategory?: (category: string) => void;
  userEmail: string | null;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  onBack,
  selectedCategory,
  onSelectCategory,
  userEmail,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>(selectedCategory || 'all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [customTemplates, setCustomTemplates] = useState<TemplateItem[]>(() => {
    try {
      const saved = localStorage.getItem('ad_rams_custom_templates');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TemplateItem['category']>('fo1-unique');
  const [newFileType, setNewFileType] = useState<TemplateItem['fileType']>('word');

  const allTemplates = [...TEMPLATES_DATA, ...customTemplates];

  const fo1UniqueForms = allTemplates.filter((t) => t.category === 'fo1-unique');
  const recordsRelatedForms = allTemplates.filter((t) => t.category === 'records-related');
  const generalForms = allTemplates.filter((t) => t.category === 'general');
  const adminServicesForms = allTemplates.filter((t) => t.category === 'admin-services');

  const handleDownload = (doc: TemplateItem) => {
    setDownloadSuccess(doc.title);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const categoryLabelMap = {
      'fo1-unique': 'FO 1 UNIQUE FORMS',
      'records-related': 'RECORDS RELATED FORMS',
      general: 'GENERAL FORMS',
      'admin-services': 'ADMINISTRATIVE SERVICES FORMS',
    };

    const newItem: TemplateItem = {
      id: `custom-tpl-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      categoryLabel: categoryLabelMap[newCategory],
      lastModified: `Today Records Administration Management Section FO 01`,
      fileType: newFileType,
      author: 'Records Administration Management Section FO 01',
      isFolder: newFileType === 'folder',
    };

    const updated = [newItem, ...customTemplates];
    setCustomTemplates(updated);
    try {
      localStorage.setItem('ad_rams_custom_templates', JSON.stringify(updated));
    } catch {}

    setIsUploadOpen(false);
    setNewTitle('');
  };

  // Render authentic icon for each file type
  const renderFileIcon = (type: TemplateItem['fileType']) => {
    switch (type) {
      case 'folder':
        return (
          <div className="text-slate-400 shrink-0">
            <Folder className="w-4 h-4 fill-slate-400 stroke-slate-500" />
          </div>
        );
      case 'excel':
        return (
          <div className="w-4 h-4 bg-emerald-600 rounded-[2px] flex items-center justify-center text-[9px] font-bold text-white shrink-0 shadow-2xs">
            X
          </div>
        );
      case 'word':
        return (
          <div className="w-4 h-4 bg-blue-600 rounded-[2px] flex items-center justify-center text-[9px] font-bold text-white shrink-0 shadow-2xs">
            W
          </div>
        );
      case 'sheets':
        return (
          <div className="w-4 h-4 bg-emerald-500 rounded-[2px] flex items-center justify-center text-white shrink-0 shadow-2xs">
            <Table2 className="w-3 h-3" />
          </div>
        );
    }
  };

  const renderTable = (
    title: string,
    items: TemplateItem[],
    showExternalLink: boolean = false
  ) => {
    return (
      <div className="flex flex-col w-full">
        {/* Section Heading */}
        <h3 className="text-center font-bold text-lg sm:text-xl md:text-2xl text-[#0b1a78] tracking-wide mb-3 font-serif uppercase">
          {title}
        </h3>

        {/* White Table Box */}
        <div className="bg-white rounded-xs shadow-xs border border-slate-200 overflow-hidden flex flex-col">
          {/* Table Header */}
          <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between text-xs bg-white">
            <div className="flex items-center gap-6 w-full pr-3">
              <span className="text-[#dc2626] font-bold text-xs uppercase tracking-wider w-1/2 sm:w-5/12">
                TITLE
              </span>
              <span className="text-slate-500 font-medium text-xs uppercase tracking-wider flex-1">
                LAST MODIFIED
              </span>
            </div>

            {showExternalLink && (
              <button
                onClick={() => handleDownload(items[0])}
                className="w-7 h-7 bg-[#94a3b8] hover:bg-slate-500 text-white flex items-center justify-center rounded-xs transition-colors shrink-0 shadow-2xs cursor-pointer"
                title="Open Folder View"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Table Rows with scroll container matching original */}
          <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
            {items.map((doc) => {
              const parts = doc.lastModified.split(' ');
              const datePart = parts.slice(0, 2).join(' ');
              const authorPart = parts.slice(2).join(' ');

              return (
                <div
                  key={doc.id}
                  className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer"
                  onClick={() => handleDownload(doc)}
                >
                  <div className="flex items-center gap-6 w-full pr-3">
                    {/* Left: Icon + Title */}
                    <div className="flex items-center gap-2.5 w-1/2 sm:w-5/12 min-w-0">
                      {renderFileIcon(doc.fileType)}
                      <span className="text-xs sm:text-[13px] text-slate-900 group-hover:text-blue-900 font-normal truncate">
                        {doc.title}
                      </span>
                    </div>

                    {/* Right: Last Modified */}
                    <div className="flex-1 text-xs text-slate-500 truncate">
                      <span className="font-semibold text-slate-800">{datePart}</span>{' '}
                      <span className="text-slate-500">{authorPart}</span>
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <Download className="w-3.5 h-3.5 text-blue-700" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-[#f1eff7] px-4 sm:px-8 md:px-12 pt-2 pb-12 select-none">
      <div className="max-w-[1500px] mx-auto space-y-8">
        {/* Top Control Bar: Category Quick-Filter & Upload Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 pt-1 border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto text-xs py-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#00178c] text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setActiveFilter('fo1-unique')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'fo1-unique'
                  ? 'bg-[#00178c] text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              FO 1 UNIQUE FORMS
            </button>
            <button
              onClick={() => setActiveFilter('records-related')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'records-related'
                  ? 'bg-[#00178c] text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              RECORDS RELATED FORMS
            </button>
            <button
              onClick={() => setActiveFilter('general')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'general'
                  ? 'bg-[#00178c] text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              GENERAL FORMS
            </button>
            <button
              onClick={() => setActiveFilter('admin-services')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'admin-services'
                  ? 'bg-[#00178c] text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              ADMINISTRATIVE SERVICES FORMS
            </button>
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-3 py-1.5 bg-[#00178c] hover:bg-blue-900 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer ml-auto"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Template (Admin)</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>Downloading form:</strong> {downloadSuccess}
            </span>
          </div>
        )}

        {/* 2-Column Pairs Layout matching Screenshots */}
        {/* Pair 1: GENERAL FORMS & ADMINISTRATIVE SERVICES FORMS (Image 1) */}
        {(activeFilter === 'all' || activeFilter === 'general' || activeFilter === 'admin-services') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {(activeFilter === 'all' || activeFilter === 'general') &&
              renderTable('GENERAL FORMS', generalForms)}
            {(activeFilter === 'all' || activeFilter === 'admin-services') &&
              renderTable('ADMINISTRATIVE SERVICES FORMS', adminServicesForms)}
          </div>
        )}

        {/* Pair 2: FO 1 UNIQUE FORMS & RECORDS RELATED FORMS (Image 2 & 3) */}
        {(activeFilter === 'all' || activeFilter === 'fo1-unique' || activeFilter === 'records-related') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-4">
            {(activeFilter === 'all' || activeFilter === 'fo1-unique') &&
              renderTable('FO 1 UNIQUE FORMS', fo1UniqueForms, true)}
            {(activeFilter === 'all' || activeFilter === 'records-related') &&
              renderTable('RECORDS RELATED FORMS', recordsRelatedForms)}
          </div>
        )}

        {/* Back Button matching Screenshot 3 */}
        <div className="flex justify-end pt-8 pb-2">
          <button
            onClick={onBack}
            className="px-6 py-1.5 bg-[#f8f9fa] border border-slate-300 text-slate-900 font-medium text-sm rounded shadow-xs hover:bg-white active:bg-slate-100 transition-colors cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>

      {/* Admin Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-[#00178c] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-base">Add / Upload Official Template</h3>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4 text-xs sm:text-sm text-slate-800">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Category *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="fo1-unique">FO 1 UNIQUE FORMS</option>
                  <option value="records-related">RECORDS RELATED FORMS</option>
                  <option value="general">GENERAL FORMS</option>
                  <option value="admin-services">ADMINISTRATIVE SERVICES FORMS</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">File Format / Type</label>
                <select
                  value={newFileType}
                  onChange={(e) => setNewFileType(e.target.value as any)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="word">Word Document (.docx)</option>
                  <option value="excel">Excel Spreadsheet (.xlsx)</option>
                  <option value="sheets">Google Sheets Form</option>
                  <option value="folder">Directory / Folder</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Template Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DSWD-GF-006_REV 01_Travel Order Form.docx"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00178c] text-white font-semibold rounded hover:bg-blue-900"
                >
                  Save Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
