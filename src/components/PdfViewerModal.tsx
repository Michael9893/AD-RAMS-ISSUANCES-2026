import React, { useState } from 'react';
import { X, Download, Printer, ZoomIn, ZoomOut, FileText, ShieldAlert, ExternalLink } from 'lucide-react';
import { PdfDoc } from '../types';

interface PdfViewerModalProps {
  doc: PdfDoc | null;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ doc, onClose }) => {
  const [zoom, setZoom] = useState(100);

  if (!doc) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (doc.fileUrl) {
      const a = document.createElement('a');
      a.href = doc.fileUrl;
      a.download = doc.title;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Create empty mock PDF download blob
      const content = `%PDF-1.4\n1 0 obj\n<< /Title (${doc.title}) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
      const blob = new Blob([content], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.title;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex flex-col justify-between items-center p-2 sm:p-4 overflow-hidden">
      {/* Top PDF Toolbar */}
      <div className="w-full max-w-5xl bg-[#1e293b] text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between shadow-lg text-xs sm:text-sm">
        <div className="flex items-center gap-2 truncate pr-4">
          <div className="bg-red-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded uppercase">
            PDF
          </div>
          <span className="font-medium text-white truncate max-w-[200px] sm:max-w-md">
            {doc.title}
          </span>
          <span className="text-slate-400 text-xs hidden md:inline">
            · {doc.lastModified}
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 rounded px-2 py-1 text-slate-300">
            <button
              onClick={() => setZoom((prev) => Math.max(75, prev - 10))}
              className="p-1 hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono px-1">{zoom}%</span>
            <button
              onClick={() => setZoom((prev) => Math.min(150, prev + 10))}
              className="p-1 hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="p-1.5 hover:bg-slate-700 text-slate-200 hover:text-white rounded transition-colors cursor-pointer"
            title="Download Document"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="p-1.5 hover:bg-slate-700 text-slate-200 hover:text-white rounded transition-colors cursor-pointer"
            title="Print Document"
          >
            <Printer className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <button
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded transition-colors cursor-pointer"
            title="Close Viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="w-full max-w-5xl flex-1 bg-[#334155] rounded-b-lg overflow-y-auto p-4 sm:p-8 flex justify-center items-start shadow-2xl">
        <div
          className="bg-white text-slate-900 rounded-sm shadow-2xl transition-transform duration-150 origin-top flex flex-col justify-between"
          style={{
            width: `${(8.5 * 96 * zoom) / 100}px`,
            minHeight: `${(11 * 96 * zoom) / 100}px`,
            padding: `${(40 * zoom) / 100}px`,
          }}
        >
          {doc.fileUrl ? (
            /* Uploaded file preview with reliable fallback */
            <div className="w-full h-full flex flex-col">
              <object
                data={doc.fileUrl}
                type="application/pdf"
                className="w-full flex-1 min-h-[620px] border-0 rounded"
              >
                <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded my-auto space-y-3">
                  <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto">
                    <FileText className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{doc.title}</h4>
                  <p className="text-xs text-slate-500">
                    Uploaded file size: {doc.fileSize || 'Standard Document'} · Author: {doc.author}
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-[#00178c] hover:bg-blue-900 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download File</span>
                    </button>
                  </div>
                </div>
              </object>
            </div>
          ) : (
            /* Clean Empty Official PDF Preview (per user request: "make the pdf just empty for now") */
            <div className="w-full h-full flex flex-col justify-between border border-slate-300 p-8 sm:p-12 relative overflow-hidden bg-white">
              {/* Subtle Official Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04] rotate-[-30deg]">
                <span className="text-7xl font-bold uppercase tracking-widest text-slate-900">
                  DSWD FO1 · RDS
                </span>
              </div>

              {/* Official Header */}
              <div className="text-center border-b-2 border-slate-900 pb-6 mb-8 relative z-10">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                  Republic of the Philippines
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-700 font-bold mb-0.5">
                  Department of Social Welfare and Development
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-600 mb-1">
                  Field Office 1 — City of San Fernando, La Union
                </div>
                <div className="text-sm uppercase tracking-wide font-extrabold text-blue-900 mt-2">
                  Administrative Division · Records and Archives Management Section
                </div>
              </div>

              {/* Document Title & Reference */}
              <div className="text-center my-auto py-12 relative z-10 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-2">
                  <FileText className="w-8 h-8 text-blue-800" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-serif">
                  {doc.title}
                </h2>
                <div className="text-xs font-mono text-slate-500">
                  Document Reference: RDS-REF-{doc.id.toUpperCase()}
                </div>

                <div className="max-w-md mx-auto p-4 bg-slate-50 border border-dashed border-slate-300 rounded text-center space-y-2 mt-6">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>Official Empty Document Canvas</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    This document is currently empty as provisioned. Authorized AD-RAMS administrators can upload updated official scans or replace this file anytime using the Admin Upload tool.
                  </p>
                </div>
              </div>

              {/* Official Footer */}
              <div className="border-t border-slate-300 pt-4 mt-8 flex items-center justify-between text-[11px] text-slate-500 relative z-10">
                <div>
                  <span>Last Modified: <strong>{doc.lastModified}</strong></span>
                  <span className="mx-2">·</span>
                  <span>{doc.author}</span>
                </div>
                <div className="font-mono">Page 1 of 1</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
