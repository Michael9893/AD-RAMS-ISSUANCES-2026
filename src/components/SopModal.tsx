import React, { useState } from 'react';
import { X, CheckCircle, Clock, AlertTriangle, FileText, Download, Send, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { SopItem } from '../data/sopData';

interface SopModalProps {
  sop: SopItem | null;
  onClose: () => void;
  userEmail: string | null;
  onOpenAuth: () => void;
}

export const SopModal: React.FC<SopModalProps> = ({
  sop,
  onClose,
  userEmail,
  onOpenAuth,
}) => {
  const [activeTab, setActiveTab] = useState<'procedure' | 'request' | 'documents'>('procedure');
  const [formData, setFormData] = useState({
    divisionUnit: '',
    contactPerson: '',
    email: userEmail || '',
    phone: '',
    purpose: '',
    referenceNumber: '',
    urgency: 'Normal',
    agreeTerms: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [referenceTicket, setReferenceTicket] = useState('');

  if (!sop) return null;

  const isDswdStaff = userEmail && userEmail.toLowerCase().endsWith('@dswd.gov.ph');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = `DSWD-FO1-${sop.id.toUpperCase().slice(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceTicket(randomTicket);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="bg-[#00178c] text-white px-6 py-4 flex items-start justify-between">
          <div className="pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-slate-900 text-[11px] font-bold px-2 py-0.5 rounded tracking-wide">
                {sop.code}
              </span>
              <span className="text-white/80 text-xs">Administrative Division - RAMS</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">{sop.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('procedure')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'procedure'
                ? 'border-blue-700 text-blue-800 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Standard Operating Procedure
          </button>
          <button
            onClick={() => setActiveTab('request')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'request'
                ? 'border-blue-700 text-blue-800 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Submit Service Request</span>
            {!isDswdStaff && <Lock className="w-3.5 h-3.5 text-amber-600" />}
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'documents'
                ? 'border-blue-700 text-blue-800 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Checklist & Forms
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800">
          {/* Procedure Tab */}
          {activeTab === 'procedure' && (
            <div className="space-y-6">
              {/* Notice Banner */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">NOTE: Only DSWD issued email can access this repository and forms.</span>
                  <p className="text-amber-900/90 text-xs mt-0.5">
                    All transactions within this section are audited in accordance with the National Archives of the Philippines (NAP) Act (RA 9470).
                  </p>
                </div>
              </div>

              {/* Description & Objective */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                  <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-1.5">Overview</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{sop.description}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                  <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-1.5">Objective & Scope</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{sop.objective}</p>
                  <p className="text-xs text-slate-500 mt-2"><strong>Scope:</strong> {sop.scope}</p>
                </div>
              </div>

              {/* Service Standards Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <span className="text-blue-700 font-semibold block">Processing Time</span>
                  <span className="text-slate-800 font-bold text-sm">{sop.processingTime}</span>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
                  <span className="text-emerald-700 font-semibold block">Service Fee</span>
                  <span className="text-slate-800 font-bold text-sm">{sop.fees}</span>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded col-span-2 sm:col-span-1">
                  <span className="text-purple-700 font-semibold block">Responsible Unit</span>
                  <span className="text-slate-800 font-bold text-sm">AD-RAMS FO1</span>
                </div>
              </div>

              {/* Step-by-Step Procedure Flowchart */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-700" />
                  <span>Standard Operating Workflow</span>
                </h4>
                <div className="space-y-3">
                  {sop.steps.map((st) => (
                    <div
                      key={st.step}
                      className="flex items-start gap-4 p-3 bg-slate-50 rounded border border-slate-200 text-xs sm:text-sm"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {st.step}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{st.activity}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                          <span>Responsible: <strong className="text-slate-700">{st.responsiblePerson}</strong></span>
                          <span>·</span>
                          <span>Duration: <strong className="text-slate-700">{st.duration}</strong></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('request')}
                  className="px-4 py-2 bg-[#00178c] text-white rounded font-medium text-xs sm:text-sm hover:bg-blue-900 transition-colors flex items-center gap-2"
                >
                  <span>Submit Service Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className="px-4 py-2 bg-slate-100 text-slate-700 border border-slate-300 rounded font-medium text-xs sm:text-sm hover:bg-slate-200 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>View Required Templates</span>
                </button>
              </div>
            </div>
          )}

          {/* Request Submission Tab */}
          {activeTab === 'request' && (
            <div>
              {!isDswdStaff ? (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg text-center space-y-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div className="max-w-md mx-auto space-y-2">
                    <h3 className="font-bold text-slate-900 text-base">DSWD Email Verification Required</h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      As indicated in the portal policy: <br />
                      <strong className="text-slate-800">"NOTE: Only DSWD issued email can access this."</strong>
                    </p>
                    <p className="text-xs text-slate-500">
                      Please authenticate your official DSWD email (<span className="font-mono text-blue-700">@dswd.gov.ph</span>) to proceed with online filing.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={onOpenAuth}
                      className="px-5 py-2.5 bg-[#00178c] text-white font-medium rounded-md hover:bg-blue-900 text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authenticate DSWD Account</span>
                    </button>
                  </div>
                </div>
              ) : submitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-950">Service Request Successfully Filed!</h3>
                  <p className="text-sm text-slate-700 max-w-md mx-auto">
                    Your request under <strong>{sop.title}</strong> has been transmitted to AD-RAMS FO1.
                  </p>
                  <div className="bg-white p-3 rounded border border-emerald-300 inline-block font-mono text-sm font-bold text-blue-900">
                    Routing Ticket: {referenceTicket}
                  </div>
                  <p className="text-xs text-slate-500">
                    A formal tracking notification has been logged to {userEmail}. Please retain your ticket reference.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded text-xs font-medium hover:bg-emerald-800"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span className="text-emerald-900 font-medium">
                        Verified DSWD Staff: <span className="font-mono">{userEmail}</span>
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                      Authorized Access
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Requesting Division / Unit *</label>
                      <select
                        required
                        value={formData.divisionUnit}
                        onChange={(e) => setFormData({ ...formData, divisionUnit: e.target.value })}
                        className="w-full border border-slate-300 rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      >
                        <option value="">Select Division</option>
                        <option value="Administrative Division">Administrative Division</option>
                        <option value="Financial Management Division (FMD)">Financial Management Division (FMD)</option>
                        <option value="Promotive Services Division (PSD)">Promotive Services Division (PSD)</option>
                        <option value="Disaster Response Management Division (DRMD)">Disaster Response Management Division (DRMD)</option>
                        <option value="Operations Division">Operations Division</option>
                        <option value="Policy and Plans Division (PPD)">Policy and Plans Division (PPD)</option>
                        <option value="Human Resource Management & Development Division (HRMDD)">HRMDD</option>
                        <option value="Office of the Regional Director (ORD)">Office of the Regional Director (ORD)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Contact Person / Focal *</label>
                      <input
                        type="text"
                        required
                        placeholder="Juan Dela Cruz, SWO II"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full border border-slate-300 rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Local / Mobile Number *</label>
                      <input
                        type="text"
                        required
                        placeholder="local 11200 or 0917-xxx-xxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-slate-300 rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Priority Level</label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full border border-slate-300 rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      >
                        <option value="Normal">Normal Turnaround</option>
                        <option value="Urgent">Urgent (Requires Division Chief Concurrence)</option>
                        <option value="Scheduled">Scheduled Project Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Details / Purpose of Request / Document Subjects *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Specify document titles, box numbers, dates, volume, or specific assistance required..."
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      className="mt-1 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
                    />
                    <label htmlFor="terms" className="text-xs text-slate-600">
                      I certify that this request complies with DSWD Records and Archives Management protocols, the Data Privacy Act of 2012, and the Section's Mandate.
                    </label>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('procedure')}
                      className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-100"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#00178c] text-white font-semibold rounded hover:bg-blue-900 flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Request to AD-RAMS</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Checklist & Forms Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-700" />
                  <span>Mandatory Requirements Checklist</span>
                </h4>
                <div className="space-y-2">
                  {sop.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Legal Basis & Mandate</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                  {sop.legalBasis.map((lb, idx) => (
                    <li key={idx}>{lb}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h5 className="font-bold text-blue-900 text-xs sm:text-sm mb-1">
                  Need official hardcopy templates?
                </h5>
                <p className="text-xs text-slate-600 mb-3">
                  All standardized templates can be obtained from the RAMS Frontline Desk or downloaded directly via the top navigation "Templates" menu.
                </p>
                <div className="flex gap-2">
                  <a
                    href="mailto:rams.fo1@dswd.gov.ph?subject=Template Request: "
                    className="px-3 py-1.5 bg-blue-700 text-white rounded text-xs font-medium hover:bg-blue-800"
                  >
                    Email RAMS Desk
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>DSWD Field Office 1 | Quezon Ave, City of San Fernando, La Union</span>
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
