import React, { useState } from 'react';
import { X, ShieldCheck, Mail, AlertCircle, CheckCircle2, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
  onLogin: (email: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  userEmail,
  onLogin,
  onLogout,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = emailInput.trim().toLowerCase();
    if (!clean.endsWith('@dswd.gov.ph')) {
      setError('Access Restricted: Only official DSWD issued emails (@dswd.gov.ph) are permitted.');
      return;
    }
    setError('');
    onLogin(clean);
    onClose();
  };

  const handleDemoLogin = (email: string) => {
    setError('');
    onLogin(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#00178c] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">DSWD Workspace Authentication</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-slate-800 text-xs sm:text-sm">
          {userEmail ? (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Currently Authenticated</h4>
                <p className="font-mono text-xs text-blue-900 font-semibold mt-1 bg-blue-50 py-1.5 px-3 rounded inline-block border border-blue-200">
                  {userEmail}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  You have full authorized access to submit SOP service requests and view restricted templates.
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onLogout}
                  className="px-4 py-2 border border-rose-300 text-rose-700 rounded hover:bg-rose-50 font-medium text-xs transition-colors"
                >
                  Sign Out
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-[#00178c] text-white rounded font-medium text-xs hover:bg-blue-900"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-900">
                <strong className="block mb-0.5">Departmental Access Control</strong>
                "NOTE: Only DSWD issued email can access this." Please verify with your official @dswd.gov.ph account.
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    DSWD Email Address:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. employee@dswd.gov.ph"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        setError('');
                      }}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#00178c] hover:bg-blue-900 text-white font-semibold rounded text-xs sm:text-sm transition-colors shadow-sm"
                >
                  Verify Email Access
                </button>
              </form>

              {/* Fast Demo Accounts */}
              <div className="pt-3 border-t border-slate-200">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Simulate DSWD Staff Roles (1-Click Test)
                </div>
                <div className="space-y-1.5">
                  <button
                    onClick={() => handleDemoLogin('rams.fo1@dswd.gov.ph')}
                    className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded flex items-center justify-between transition-colors text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">AD-RAMS Section Head / Administrator</div>
                      <div className="font-mono text-slate-500 text-[11px]">rams.fo1@dswd.gov.ph</div>
                    </div>
                    <User className="w-4 h-4 text-blue-700" />
                  </button>

                  <button
                    onClick={() => handleDemoLogin('custodian.records@dswd.gov.ph')}
                    className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded flex items-center justify-between transition-colors text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">Division Records Custodian (Field Staff)</div>
                      <div className="font-mono text-slate-500 text-[11px]">custodian.records@dswd.gov.ph</div>
                    </div>
                    <User className="w-4 h-4 text-emerald-700" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
