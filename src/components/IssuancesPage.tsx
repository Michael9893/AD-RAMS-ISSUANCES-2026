import React, { useState, useEffect } from 'react';
import { ISSUANCES_CY_2026, IssuanceItem } from '../data/issuancesData';
import { Search, Plus, FileText, Download, Printer, X, Check, Shield, Lock, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';

interface IssuancesPageProps {
  onBack: () => void;
  userEmail: string | null;
  onOpenAuth: () => void;
}

export const IssuancesPage: React.FC<IssuancesPageProps> = ({ onBack, userEmail, onOpenAuth }) => {
  const [search, setSearch] = useState('');
  const [selectedIssuance, setSelectedIssuance] = useState<IssuanceItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [authWarning, setAuthWarning] = useState<string | null>(null);

  const isAdmin = Boolean(userEmail && userEmail.toLowerCase().endsWith('@dswd.gov.ph'));

  const [issuancesList, setIssuancesList] = useState<IssuanceItem[]>(() => {
    try {
      const saved = localStorage.getItem('ad_rams_issuances_2026_clean');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ISSUANCES_CY_2026; // empty []
  });

  const [newDrn, setNewDrn] = useState('');
  const [newSubject, setNewSubject] = useState('Authority');
  const [newDescription, setNewDescription] = useState('');
  const [newConcernedStaff, setNewConcernedStaff] = useState('');
  const [newPreparedBy, setNewPreparedBy] = useState('LDS');
  const [newReceivedBy, setNewReceivedBy] = useState('');
  const [newDatePrinted, setNewDatePrinted] = useState('');

  const filteredList = issuancesList.filter(
    (item) =>
      item.drn.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.concernedStaff.toLowerCase().includes(search.toLowerCase()) ||
      item.preparedByOdsu.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAddModal = () => {
    if (!isAdmin) {
      setAuthWarning('Access Restricted: Only authorized DSWD administrators can input records into the CY 2026 Databank. Please log in with your @dswd.gov.ph account.');
      onOpenAuth();
      return;
    }
    setAuthWarning(null);
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      onOpenAuth();
      return;
    }
    if (!newDescription.trim() || !newDrn.trim()) return;

    const newItem: IssuanceItem = {
      rsoNo: issuancesList.length + 1,
      drn: newDrn,
      subject: newSubject,
      description: newDescription,
      concernedStaff: newConcernedStaff || 'Staff Member',
      preparedByOdsu: newPreparedBy,
      receivedPrintedBy: newReceivedBy,
      datePrinted: newDatePrinted,
      status: '',
    };

    const updated = [...issuancesList, newItem];
    setIssuancesList(updated);
    try {
      localStorage.setItem('ad_rams_issuances_2026_clean', JSON.stringify(updated));
    } catch {}

    setIsAddModalOpen(false);
    setNewDrn('');
    setNewDescription('');
    setNewConcernedStaff('');
    setNewReceivedBy('');
    setNewDatePrinted('');
  };

  const handleDeleteItem = (rsoNo: number) => {
    if (!isAdmin) return;
    const updated = issuancesList
      .filter((item) => item.rsoNo !== rsoNo)
      .map((item, idx) => ({ ...item, rsoNo: idx + 1 })); // renumber
    setIssuancesList(updated);
    try {
      localStorage.setItem('ad_rams_issuances_2026_clean', JSON.stringify(updated));
    } catch {}
  };

  const handleClearAll = () => {
    if (!isAdmin) return;
    if (confirm('Are you sure you want to clear all entered 2026 Regional Special Orders?')) {
      setIssuancesList([]);
      try {
        localStorage.removeItem('ad_rams_issuances_2026_clean');
      } catch {}
    }
  };

  return (
    <section className="w-full bg-[#f1eff7] px-2 sm:px-6 md:px-12 pt-2 pb-12 select-none">
      <div className="max-w-[1550px] mx-auto space-y-4">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-[13px] text-slate-800 font-sans font-medium">
              Databank of Issuances CY 2026
            </span>
            {isAdmin ? (
              <span className="text-[11px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-mono flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Admin Input Enabled ({userEmail})</span>
              </span>
            ) : (
              <span className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-mono flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-600" />
                <span>Admin Input Protected</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {issuancesList.length > 0 && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  placeholder="Search DRN, subject, staff..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-1 bg-white border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none w-48 sm:w-64"
                />
              </div>
            )}

            <button
              onClick={handleOpenAddModal}
              className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer ${
                isAdmin
                  ? 'bg-[#00178c] hover:bg-blue-900 text-white'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
              }`}
              title={isAdmin ? 'Add new RSO entry' : 'Admin login required to input'}
            >
              {isAdmin ? (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Input 2026 Issuance (Admin)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Admin Login to Input</span>
                </>
              )}
            </button>

            {isAdmin && issuancesList.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-2.5 py-1 text-xs text-rose-700 hover:bg-rose-50 border border-rose-200 rounded transition-colors"
                title="Clear all entries"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {authWarning && (
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{authWarning}</span>
            </div>
            <button
              onClick={() => onOpenAuth()}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-semibold"
            >
              Login as Admin
            </button>
          </div>
        )}

        {/* Databank Table Container */}
        <div className="bg-white rounded-xs border border-slate-300 shadow-xs overflow-hidden">
          {/* Blue Header Banner */}
          <div className="bg-[#001484] text-white">
            <div className="py-2.5 text-center">
              <h2 className="text-lg sm:text-2xl font-black uppercase tracking-wider">
                REGIONAL SPECIAL ORDER CY 2026
              </h2>
            </div>

            {/* Table Column Headers */}
            <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider border-t border-blue-900/60 text-white">
              <div className="col-span-1 text-center">RSO No.</div>
              <div className="col-span-2">DRN</div>
              <div className="col-span-2">Subject</div>
              <div className="col-span-3">Description</div>
              <div className="col-span-1">Concerned Staff</div>
              <div className="col-span-1 text-center">Prepared by ODSU</div>
              <div className="col-span-1">RECEIVED / PRINTED BY</div>
              <div className="col-span-1 text-center">DATE PRINTED</div>
            </div>
          </div>

          {/* Table Data Rows or Empty State */}
          {issuancesList.length === 0 ? (
            /* Empty State as requested: "remove the inputed in the regional special order cy 20206 order and only the admin can input in it" */
            <div className="py-16 px-4 text-center bg-white space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-slate-400" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                  No Regional Special Orders recorded for CY 2026
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The CY 2026 Regional Special Order registry is currently empty. Only authorized AD-RAMS administrators can input and circularize official issuance records.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 bg-[#001484] hover:bg-blue-900 text-white text-xs font-semibold rounded shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {isAdmin ? (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Input First 2026 RSO Entry</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-amber-300" />
                      <span>Authenticate as Admin to Input Records</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 text-xs sm:text-[12.5px] bg-white max-h-[600px] overflow-y-auto">
              {filteredList.map((item) => (
                <div
                  key={item.rsoNo}
                  className="grid grid-cols-12 gap-2 px-3 py-2.5 items-start hover:bg-blue-50/50 transition-colors group"
                >
                  {/* RSO No */}
                  <div className="col-span-1 text-center font-medium text-slate-800">
                    {item.rsoNo}
                  </div>

                  {/* DRN */}
                  <div className="col-span-2 font-mono text-[11px] sm:text-xs text-slate-700 break-words">
                    {item.drn}
                  </div>

                  {/* Subject */}
                  <div className="col-span-2 text-slate-800 leading-snug">
                    {item.subject}
                  </div>

                  {/* Description (Blue Underlined Clickable Link) */}
                  <div className="col-span-3">
                    <button
                      onClick={() => setSelectedIssuance(item)}
                      className="text-left text-[#1523a6] hover:text-blue-900 underline font-normal leading-snug cursor-pointer transition-colors"
                    >
                      {item.description}
                    </button>
                  </div>

                  {/* Concerned Staff */}
                  <div className="col-span-1 text-slate-700 leading-snug text-[11.5px]">
                    {item.concernedStaff}
                  </div>

                  {/* Prepared by ODSU */}
                  <div className="col-span-1 text-center font-medium text-slate-700">
                    {item.preparedByOdsu}
                  </div>

                  {/* RECEIVED / PRINTED BY */}
                  <div className="col-span-1 text-slate-700 text-[11.5px]">
                    {item.receivedPrintedBy || ''}
                  </div>

                  {/* DATE PRINTED & Admin Action */}
                  <div className="col-span-1 flex items-center justify-between text-slate-700 text-[11px]">
                    <span className="w-full text-center">{item.datePrinted || ''}</span>
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteItem(item.rsoNo)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {filteredList.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No matching 2026 administrative issuances found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Back Button matching other pages */}
        <div className="flex justify-end pt-4 pb-2">
          <button
            onClick={onBack}
            className="px-6 py-1.5 bg-[#f8f9fa] border border-slate-300 text-slate-900 font-medium text-sm rounded shadow-xs hover:bg-white active:bg-slate-100 transition-colors cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>

      {/* Issuance Detail View Modal */}
      {selectedIssuance && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-[#001484] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded uppercase">
                  RSO #{selectedIssuance.rsoNo} · CY 2026
                </span>
                <h3 className="font-bold text-base mt-1">Regional Special Order Detail</h3>
              </div>
              <button
                onClick={() => setSelectedIssuance(null)}
                className="text-white/80 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-800">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                  Document Routing Number (DRN):
                </span>
                <p className="font-mono font-bold text-blue-900 text-sm">{selectedIssuance.drn}</p>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 block">
                  Subject:
                </span>
                <p className="font-semibold text-slate-900 text-sm mt-0.5">{selectedIssuance.subject}</p>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 block">
                  Full Directive Description:
                </span>
                <p className="text-slate-700 leading-relaxed mt-0.5 bg-slate-50 p-3 rounded border border-slate-200">
                  {selectedIssuance.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Concerned Personnel:</span>
                  <span className="font-semibold text-slate-800">{selectedIssuance.concernedStaff}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Originating Unit (ODSU):</span>
                  <span className="font-semibold text-slate-800">{selectedIssuance.preparedByOdsu}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Date Printed / Released:</span>
                  <span className="font-semibold text-slate-800">{selectedIssuance.datePrinted || 'Pending Release'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print RSO Slip</span>
                </button>
                <button
                  onClick={() => setSelectedIssuance(null)}
                  className="px-5 py-2 bg-[#001484] text-white rounded font-medium hover:bg-blue-900"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Add Issuance Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-[#001484] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">Record New 2026 Issuance (Admin Only)</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-3 text-xs sm:text-sm text-slate-800">
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900">
                You are encoding as verified administrator: <span className="font-mono font-semibold">{userEmail}</span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Routing Number (DRN) *</label>
                <input
                  type="text"
                  required
                  placeholder="I-FO-HRMDD-LDS-A-SO-26-01-..."
                  value={newDrn}
                  onChange={(e) => setNewDrn(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject *</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Authority">Authority</option>
                    <option value="Authority to Adopt Flexible Work Arrangement">Authority to Adopt FWA</option>
                    <option value="Authority to Render Overtime Services">Authority to Render Overtime</option>
                    <option value="Confirmation">Confirmation</option>
                    <option value="Designation">Designation</option>
                    <option value="Special Assignment">Special Assignment</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Originating ODSU</label>
                  <input
                    type="text"
                    value={newPreparedBy}
                    onChange={(e) => setNewPreparedBy(e.target.value)}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Directive Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Specify official event, staff mandate, dates, and locations..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Concerned Staff</label>
                  <input
                    type="text"
                    placeholder="Staff name / et al"
                    value={newConcernedStaff}
                    onChange={(e) => setNewConcernedStaff(e.target.value)}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Received / Printed By</label>
                  <input
                    type="text"
                    placeholder="Receiver name"
                    value={newReceivedBy}
                    onChange={(e) => setNewReceivedBy(e.target.value)}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#001484] text-white font-semibold rounded hover:bg-blue-900"
                >
                  Save & Publish RSO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
