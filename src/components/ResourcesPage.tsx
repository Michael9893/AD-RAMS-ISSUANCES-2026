import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PdfDoc } from '../types';

interface ResourcesPageProps {
  onBack: () => void;
  onOpenPdf: (doc: PdfDoc) => void;
  pdfList: PdfDoc[];
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  onBack,
  onOpenPdf,
  pdfList,
}) => {
  return (
    <section className="w-full bg-[#f1eff7] px-4 sm:px-8 md:px-12 pt-2 pb-12 select-none">
      <div className="max-w-[1500px] mx-auto space-y-4">
        {/* 2-Column Split Layout matching the official portal screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: White Table Container */}
          <div className="lg:col-span-7 bg-white rounded-xs shadow-xs border border-slate-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between text-xs bg-white">
              <div className="flex items-center gap-8 w-full pr-4">
                <span className="text-[#dc2626] font-bold text-xs uppercase tracking-wider w-1/2 sm:w-5/12">
                  TITLE
                </span>
                <span className="text-slate-500 font-medium text-xs uppercase tracking-wider flex-1">
                  LAST MODIFIED
                </span>
              </div>

              <button
                onClick={() => onOpenPdf(pdfList[0])}
                className="w-7 h-7 bg-[#94a3b8] hover:bg-slate-500 text-white flex items-center justify-center rounded-xs transition-colors shrink-0 shadow-2xs cursor-pointer"
                title="Open Folder View"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Table Rows List */}
            <div className="divide-y divide-slate-100">
              {pdfList.map((doc) => {
                const parts = doc.lastModified.split(' ');
                const datePart = parts.slice(0, 2).join(' ');
                const authorPart = parts.slice(2).join(' ');

                return (
                  <div
                    key={doc.id}
                    className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer"
                    onClick={() => onOpenPdf(doc)}
                  >
                    <div className="flex items-center gap-8 w-full pr-4">
                      <div className="flex items-center gap-2.5 w-1/2 sm:w-5/12 min-w-0">
                        <div className="bg-[#dc2626] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] tracking-tight shrink-0 flex items-center justify-center shadow-2xs">
                          PDF
                        </div>
                        <span className="text-xs sm:text-[13px] text-slate-900 group-hover:text-blue-900 font-normal truncate">
                          {doc.title}
                        </span>
                      </div>

                      <div className="flex-1 text-xs text-slate-500 truncate">
                        <span className="font-semibold text-slate-800">{datePart}</span>{' '}
                        <span className="text-slate-500">{authorPart}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Text Description */}
          <div className="lg:col-span-5 pt-2 sm:pt-4 lg:pl-6">
            <p className="text-base sm:text-[1.125rem] text-[#111111] leading-[1.65] font-normal select-text">
              This section contains essential reference materials, including the Updated Records Disposition Schedule
              (RDS), which serves as the primary tool for the proper identification and categorization of records and
              guide to when to dispose of records.
            </p>
          </div>
        </div>

        {/* Back Button matching original design */}
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
