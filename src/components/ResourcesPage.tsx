import React, { useState, useRef } from 'react';
import { ExternalLink, Upload, Trash2, Plus, FileText, CheckCircle2, Shield } from 'lucide-react';
import { PdfDoc } from '../types';

interface ResourcesPageProps {
  onBack: () => void;
  onOpenPdf: (doc: PdfDoc) => void;
  userEmail: string | null;
  onOpenAuth: () => void;
  pdfList: PdfDoc[];
  onAddPdf: (newDoc: PdfDoc) => void;
  onDeletePdf: (id: string) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  onBack,
  onOpenPdf,
  userEmail,
  onOpenAuth,
  pdfList,
  onAddPdf,
  onDeletePdf,
}) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('Records Administration Management Section FO 01');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!newTitle) {
        setNewTitle(file.name);
      }
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    let fileUrl: string | undefined = undefined;
    if (selectedFile) {
      fileUrl = URL.createObjectURL(selectedFile);
    }

    const today = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateFormatted = `${months[today.getMonth()]} ${today.getDate()}`;

    const newDoc: PdfDoc = {
      id: `custom-${Date.now()}`,
      title: newTitle.endsWith('.pdf') ? newTitle : `${newTitle}.pdf`,
      lastModified: `${dateFormatted} ${newAuthor}`,
      author: newAuthor,
      fileUrl: fileUrl,
      fileSize: selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : '1.2 MB',
      isCustomUploaded: true,
    };

    onAddPdf(newDoc);
    setIsUploadModalOpen(false);
    setNewTitle('');
    setSelectedFile(null);
  };

  return (
    <section className="w-full bg-[#f1eff7] px-4 sm:px-8 md:px-12 pt-2 pb-12 select-none">
      <div className="max-w-[1500px] mx-auto">
        {/* Admin Bar Header */}
        <div className="flex items-center justify-between pb-4 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Reference Document Repository
            </span>
            {userEmail && (
              <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-medium">
                Admin: {userEmail}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-3 py-1.5 bg-[#00178c] hover:bg-blue-900 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload PDF as Admin</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split Layout matching Screenshot 1 & 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: White Table Container (Google Drive / Embed Style) */}
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

              {/* Square External Link Button in top right header */}
              <button
                onClick={() => onOpenPdf(pdfList[0])}
                className="w-7 h-7 bg-[#94a3b8] hover:bg-slate-500 text-white flex items-center justify-center rounded-xs transition-colors shrink-0 shadow-2xs"
                title="Open Folder in New View"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Table Rows List */}
            <div className="divide-y divide-slate-100">
              {pdfList.map((doc) => {
                // Split date and author for authentic styling
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
                      {/* Left: Red PDF icon + Title */}
                      <div className="flex items-center gap-2.5 w-1/2 sm:w-5/12 min-w-0">
                        {/* Red PDF Icon */}
                        <div className="bg-[#dc2626] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] tracking-tight shrink-0 flex items-center justify-center shadow-2xs">
                          PDF
                        </div>
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

                    {/* Admin Delete Action for custom uploads */}
                    {doc.isCustomUploaded && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePdf(doc.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity"
                        title="Delete custom upload"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Text Description Paragraph matching Screenshot 1 & 2 */}
          <div className="lg:col-span-5 pt-2 sm:pt-4 lg:pl-6">
            <p className="text-base sm:text-[1.125rem] text-[#111111] leading-[1.65] font-normal select-text">
              This section contains essential reference materials, including the Updated Records Disposition Schedule
              (RDS), which serves as the primary tool for the proper identification and categorization of records and
              guide to when to dispose of records.
            </p>
          </div>
        </div>

        {/* Back Button matching Screenshot 2 */}
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
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-[#00178c] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">Admin PDF Upload</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4 text-xs sm:text-sm text-slate-800">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900 leading-relaxed">
                Upload new Records Disposition Schedule (RDS) or circular documents to the repository. The uploaded file will be available immediately in the table.
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select PDF File:</label>
                <input
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#00178c] file:text-white hover:file:bg-blue-900 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RDS_2026_Updated_Guidelines.pdf"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Author / Division Attribution</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00178c] text-white font-semibold rounded hover:bg-blue-900 flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Document</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
