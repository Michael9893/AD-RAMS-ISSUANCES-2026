import React, { useState } from 'react';
import { X, FileText, Download, Check, Shield, Search, ArrowDownToLine, Printer } from 'lucide-react';

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'resources' | 'templates' | 'issuances';
  initialItem?: string;
  userEmail: string | null;
  onOpenAuth: () => void;
}

export const ResourcesModal: React.FC<ResourcesModalProps> = ({
  isOpen,
  onClose,
  type,
  initialItem,
  userEmail,
  onOpenAuth,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const isDswdStaff = userEmail && userEmail.toLowerCase().endsWith('@dswd.gov.ph');

  const handleSimulateDownload = (docName: string) => {
    setDownloadSuccess(docName);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2800);
  };

  const getTitle = () => {
    switch (type) {
      case 'resources':
        return 'Official Records & Archives Resources';
      case 'templates':
        return 'Standardized Document Templates & Forms';
      case 'issuances':
        return 'DSWD Administrative Issuances & Directives';
    }
  };

  const getItems = () => {
    if (type === 'resources') {
      return [
        {
          id: 'citizens-charter',
          title: "Citizen's Charter - AD-RAMS External & Internal Services",
          category: 'Standard Service Guide',
          code: 'CC-RAMS-2025',
          description: 'Official schedule of service steps, processing turnarounds, document requirements, and frontline assistance protocols per Republic Act No. 11032.',
        },
        {
          id: 'records-disposition',
          title: 'Records Disposition Schedule (RDS) - DSWD Specific Schedules',
          category: 'Retention Guidelines',
          code: 'RDS-DSWD-NAP-2024',
          description: 'Authorized retention periods for welfare case files, adoption dossiers, disaster relief distribution receipts, vouchers, and procurement files.',
        },
        {
          id: 'nap-act',
          title: 'Republic Act No. 9470 - National Archives of the Philippines Act',
          category: 'Statutory Law',
          code: 'RA-9470',
          description: 'The primary legislation governing public records management, archival repositories, authorized disposal sanctions, and public transparency in the Philippines.',
        },
        {
          id: 'manual',
          title: 'DSWD Comprehensive Records Management Manual',
          category: 'Department Operations Manual',
          code: 'RMM-VOL-1',
          description: 'Comprehensive standard manual for classification, file barcoding, document routing, disaster recovery, and vital records protection across regional offices.',
        },
      ];
    } else if (type === 'templates') {
      return [
        {
          id: 'disposal-form',
          title: 'NAP Form No. 1 - Request for Authority to Dispose of Records',
          category: 'Disposal Protocol',
          code: 'NAP-FR-01',
          description: 'Mandatory standard form submitted to the National Archives of the Philippines prior to shredding or discarding any government documents.',
        },
        {
          id: 'cert-appearance',
          title: 'Certificate of Appearance (COA) - Regional Form',
          category: 'Administrative Form',
          code: 'DSWD-FO1-AD-COA',
          description: 'Standardized certification of presence for external visitors, municipal social welfare officers, and auditors conducting business at Field Office 1.',
        },
        {
          id: 'transmittal-slip',
          title: 'Records Transmittal & Receipt Routing Slip',
          category: 'Routing Control',
          code: 'RAMS-RTRS-03',
          description: 'Serial-tracked routing jacket utilized for batch forwarding of official communications, payroll files, and inter-divisional transmittals.',
        },
        {
          id: 'foi-form',
          title: 'Standard Freedom of Information (FOI) Request Form',
          category: 'Transparency',
          code: 'FOI-REQ-FO1',
          description: 'Official application sheet for citizens and academic researchers requesting access to regional public welfare statistics and reports.',
        },
        {
          id: 'technical-assistance',
          title: 'Technical Assistance Request Form (TARF-RAMS)',
          category: 'Advisory Form',
          code: 'TARF-AD-04',
          description: 'Application form for SWAD teams and municipal cluster offices requesting on-site records appraisal, indexing, and coaching.',
        },
      ];
    } else {
      return [
        {
          id: 'mc',
          title: 'Memorandum Circular No. 04 s. 2024 - Electronic Archiving Policies',
          category: 'Memorandum Circular',
          code: 'MC-2024-004',
          description: 'Guidelines on digital document capture, metadata tagging standards, and cloud archival storage security in regional offices.',
        },
        {
          id: 'ao',
          title: 'Administrative Order No. 12 s. 2023 - FOI People\'s Manual Updates',
          category: 'Administrative Order',
          code: 'AO-2023-012',
          description: 'Updated operational protocols for processing public records requests, inventory of exceptions, and appeal mechanisms.',
        },
        {
          id: 'so',
          title: 'Special Order No. 208 s. 2024 - Reconstitution of Records Committee',
          category: 'Special Order',
          code: 'SO-2024-208',
          description: 'Designation of Division Records Custodians and appraisal committee members for Field Office 1.',
        },
        {
          id: 'rm',
          title: 'Regional Memorandum No. 15 s. 2025 - Year-End Records Disposal Calendar',
          category: 'Regional Memorandum',
          code: 'RM-FO1-2025-015',
          description: 'Deadlines and inspection schedules for the inventory and turnover of valueless files to AD-RAMS.',
        },
      ];
    }
  };

  const filteredItems = getItems().filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#00178c] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base sm:text-lg">{getTitle()}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar & Notice */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search documents by title, form code, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-xs sm:text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {downloadSuccess && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>
                <strong>Document generated:</strong> {downloadSuccess} was saved to your downloads folder.
              </span>
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-slate-800">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg border border-slate-200 hover:border-blue-400 bg-white shadow-xs transition-all space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {item.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSimulateDownload(item.title)}
                    className="px-3 py-1.5 bg-[#00178c] hover:bg-blue-900 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded border border-slate-200"
                    title="Print Document"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 text-sm sm:text-base">{item.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs sm:text-sm">
              No matching records found for "{searchQuery}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Official DSWD Regional Records Registry</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-300 text-slate-800 rounded font-medium hover:bg-slate-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
