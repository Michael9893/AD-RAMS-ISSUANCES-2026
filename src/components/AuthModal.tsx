import React, { useState } from 'react';
import { X, ShieldCheck, Mail, CheckCircle2, User, KeyRound } from 'lucide-react';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = emailInput.trim();
    if (!clean) return;
    onLogin(clean);
    onClose();
  };

  const handleQuickLogin = (roleEmail: string) => {
    onLogin(roleEmail);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#00178c] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">AD-RAMS Admin Access</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 cursor-pointer"
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
                <h4 className="font-bold text-slate-900 text-base">Admin Mode Active</h4>
                <p className="font-mono text-xs text-blue-900 font-semibold mt-1 bg-blue-50 py-1.5 px-3 rounded inline-block border border-blue-200">
                  {userEmail}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  You have full administrative privileges to upload PDFs, manage templates, and publish 2026 Special Orders.
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onLogout}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 font-medium text-xs transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-[#00178c] text-white rounded font-medium text-xs hover:bg-blue-900 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-900">
                Sign in to manage official records, upload PDFs, and publish 2026 Special Orders.
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enter Email Address:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. admin@dswd.gov.ph or your email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#00178c] hover:bg-blue-900 text-white font-semibold rounded text-xs sm:text-sm transition-colors shadow-xs cursor-pointer"
                >
                  Sign In
                </button>
              </form>

              {/* 1-Click Fast Admin Mode */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Quick Access (1-Click)
                </div>
                <button
                  onClick={() => handleQuickLogin('admin@dswd.gov.ph')}
                  className="w-full text-left px-3 py-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded flex items-center justify-between transition-colors text-xs cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <KeyRound className="w-4 h-4 text-blue-700" />
                    <div>
                      <div className="font-semibold text-slate-800 group-hover:text-blue-950">
                        Enable Admin Privileges
                      </div>
                      <div className="text-[11px] text-slate-500">admin@dswd.gov.ph</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    Activate
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
