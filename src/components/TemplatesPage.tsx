import React, { useState } from 'react';
import { ExternalLink, Folder, Table2, Download, Check } from 'lucide-react';
import { TEMPLATES_DATA, TemplateItem } from '../data/templatesData';

interface TemplatesPageProps {
  onBack: () => void;
  selectedCategory?: string | null;
  onSelectCategory?: (category: string) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  onBack,
  selectedCategory,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>(selectedCategory || 'all');

  const fo1UniqueForms = TEMPLATES_DATA.filter((t) => t.category === 'fo1-unique');
  const recordsRelatedForms = TEMPLATES_DATA.filter((t) => t.category === 'records-related');
  const generalForms = TEMPLATES_DATA.filter((t) => t.category === 'general');
  const adminServicesForms = TEMPLATES_DATA.filter((t) => t.category === 'admin-services');

  const handleDownload = (doc: TemplateItem) => {
    setDownloadSuccess(doc.title);
    setTimeout(() => setDownloadSuccess(null), 3000);

    const ext = doc.fileType === 'excel' ? 'xlsx' : doc.fileType === 'sheets' ? 'csv' : 'docx';
    const content = `DSWD Field Office 1 - Official Form Template\nTitle: ${doc.title}\nCategory: ${doc.categoryLabel}\nControlled Document - Records and Archives Management Section`;
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.title.includes('.') ? doc.title : `${doc.title}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

          {/* Table Rows */}
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
                    <div className="flex items-center gap-2.5 w-1/2 sm:w-5/12 min-w-0">
                      {renderFileIcon(doc.fileType)}
                      <span className="text-xs sm:text-[13px] text-slate-900 group-hover:text-blue-900 font-normal truncate">
                        {doc.title}
                      </span>
                    </div>

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
        {/* Top Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs py-1 border-b border-slate-200 pb-2">
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

        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Downloading template:</strong> {downloadSuccess}
            </span>
          </div>
        )}

        {/* 2-Column Pairs Layout matching Screenshots */}
        {/* Pair 1: GENERAL FORMS & ADMINISTRATIVE SERVICES FORMS */}
        {(activeFilter === 'all' || activeFilter === 'general' || activeFilter === 'admin-services') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {(activeFilter === 'all' || activeFilter === 'general') &&
              renderTable('GENERAL FORMS', generalForms)}
            {(activeFilter === 'all' || activeFilter === 'admin-services') &&
              renderTable('ADMINISTRATIVE SERVICES FORMS', adminServicesForms)}
          </div>
        )}

        {/* Pair 2: FO 1 UNIQUE FORMS & RECORDS RELATED FORMS */}
        {(activeFilter === 'all' || activeFilter === 'fo1-unique' || activeFilter === 'records-related') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-4">
            {(activeFilter === 'all' || activeFilter === 'fo1-unique') &&
              renderTable('FO 1 UNIQUE FORMS', fo1UniqueForms, true)}
            {(activeFilter === 'all' || activeFilter === 'records-related') &&
              renderTable('RECORDS RELATED FORMS', recordsRelatedForms)}
          </div>
        )}

        {/* Back Button */}
        <div className="flex justify-end pt-8 pb-2">
          <button
            onClick={onBack}
            className="px-6 py-1.5 bg-[#f8f9fa] border border-slate-300 text-slate-900 font-medium text-sm rounded shadow-xs hover:bg-white active:bg-slate-100 transition-colors cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
};
