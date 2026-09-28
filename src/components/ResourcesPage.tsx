import React, { useState, useRef } from 'react';
import { ExternalLink, Upload, Trash2, Check, Loader2, AlertCircle } from 'lucide-react';
import { PdfDoc } from '../types';
import { saveFileBlob, deleteFile, getFileUrl } from '../utils/fileStorage';

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
  pdfList,
  onAddPdf,
  onDeletePdf,
}) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = (file: File) => {
    setSelectedFile(file);
    setErrorMessage(null);
    if (!newTitle || newTitle.trim() === '') {
      setNewTitle(file.name);
    }
  };

  const handleOpenPdfWithContent = async (doc: PdfDoc) => {
    let fileUrl = doc.fileUrl;
    if (!fileUrl && doc.isCustomUploaded) {
      try {
        const stored = await getFileUrl(doc.id);
        if (stored) {
          fileUrl = stored;
        }
      } catch (err) {
        console.warn('Could not fetch stored file:', err);
      }
    }
    onOpenPdf({ ...doc, fileUrl });
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setErrorMessage('Please provide a document title.');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    try {
      const docId = `custom-${Date.now()}`;
      let fileUrl: string | undefined = undefined;

      if (selectedFile) {
        await saveFileBlob(docId, selectedFile);
        fileUrl = (await getFileUrl(docId)) || undefined;
      }

      const today = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dateFormatted = `${months[today.getMonth()]} ${today.getDate()}`;
      const finalTitle = newTitle.toLowerCase().endsWith('.pdf') ? newTitle : `${newTitle}.pdf`;

      const newDoc: PdfDoc = {
        id: docId,
        title: finalTitle,
        lastModified: `${dateFormatted} Records Administration Management Section FO 01`,
        author: 'Records Administration Management Section FO 01',
        fileUrl: fileUrl,
        fileSize: selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : '1.2 MB',
        isCustomUploaded: true,
      };

      onAddPdf(newDoc);
      setIsUploadModalOpen(false);
      setNewTitle('');
      setSelectedFile(null);
      setUploadSuccessMsg(`Uploaded "${finalTitle}" successfully.`);
      setTimeout(() => setUploadSuccessMsg(null), 3000);
    } catch (err) {
      console.error('Upload error:', err);
      setErrorMessage('Failed to save document. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteFile(id);
    onDeletePdf(id);
  };

  return (
    <section className="w-full bg-[#f1eff7] px-4 sm:px-8 md:px-12 pt-2 pb-12 select-none">
      <div className="max-w-[1500px] mx-auto space-y-4">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pt-1">
          <div className="text-xs text-slate-600 font-medium">
            Records Disposition Schedule (RDS)
          </div>

          <button
            onClick={() => {
              setErrorMessage(null);
              setIsUploadModalOpen(true);
            }}
            className="px-3.5 py-1.5 bg-[#00178c] hover:bg-blue-900 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload PDF</span>
          </button>
        </div>

        {uploadSuccessMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{uploadSuccessMsg}</span>
          </div>
        )}

        {/* 2-Column Split Layout */}
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
                onClick={() => handleOpenPdfWithContent(pdfList[0])}
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
                    onClick={() => handleOpenPdfWithContent(doc)}
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

                    {doc.isCustomUploaded && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(doc.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity cursor-pointer"
                        title="Delete upload"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
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

      {/* Simple Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-[#00178c] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-base">Upload PDF Document</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-5 space-y-3.5 text-xs sm:text-sm text-slate-800">
              {errorMessage && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select File:</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded p-4 text-center cursor-pointer bg-slate-50 hover:bg-blue-50/50 transition-colors"
                >
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                  {selectedFile ? (
                    <div>
                      <span className="font-semibold text-blue-900 block truncate">{selectedFile.name}</span>
                      <span className="text-[11px] text-slate-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Click to choose different file
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-medium text-slate-700 block">Click to choose a PDF file</span>
                      <span className="text-[11px] text-slate-400">PDF documents (.pdf)</span>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleSelectFile(e.target.files[0]);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Updated RDS Guidelines 2026.pdf"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100 cursor-pointer"
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-1.5 bg-[#00178c] text-white font-semibold rounded hover:bg-blue-900 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <span>Upload</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
