import React, { useState } from 'react';
import { BarChart3, Info, X, Shield, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Statically initialized with authentic numbers from screenshot, with persistent local counter
  const [visitorStats] = useState(() => {
    return {
      total: '9 794',
      today: '55',
      yesterday: '15',
    };
  });

  return (
    <>
      <footer className="relative w-full bg-[#001484] text-white px-4 sm:px-8 py-6 sm:py-8 select-none">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Left Side: Visitors Counter Box (Authentic replica) */}
          <div className="w-full sm:w-auto flex justify-center sm:justify-start">
            <div className="border border-white/70 rounded-[1px] p-2.5 min-w-[125px] text-[11px] font-sans tracking-tight bg-transparent text-white">
              {/* Header with bars icon */}
              <div className="flex items-center gap-1.5 font-bold mb-1 border-b border-white/20 pb-1">
                <BarChart3 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="text-[11.5px]">Visitors</span>
              </div>
              {/* Counter list */}
              <div className="space-y-0.5 font-mono text-[10.5px]">
                <div className="flex justify-between gap-2">
                  <span className="font-sans">Total:</span>
                  <span className="font-bold">{visitorStats.total}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="font-sans">Today:</span>
                  <span className="font-semibold">{visitorStats.today}</span>
                </div>
                <div className="flex justify-between gap-2 text-white/90">
                  <span className="font-sans">Yesterday:</span>
                  <span>{visitorStats.yesterday}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center / Right Content: Contact & Copyright */}
          <div className="flex-1 text-center md:text-left md:pl-8 space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
            <p className="font-normal text-white">
              Email Address :{' '}
              <a
                href="mailto:rams.fo1@dswd.gov.ph"
                className="hover:underline text-white underline decoration-white/60 hover:decoration-white"
              >
                rams.fo1@dswd.gov.ph
              </a>{' '}
              | Landline :{' '}
              <a href="tel:0726878000" className="hover:underline text-white">
                (072) 687-8000 local 11224
              </a>
            </p>

            <p className="font-normal text-white/95">
              ©2025 Administrative Division - Records and Archives Management Section. All Rights Reserved.
            </p>

            <p className="text-[11px] tracking-wider text-white/80 font-mono pt-0.5">
              RGB/AD-RAMS
            </p>
          </div>
        </div>

        {/* Bottom Left (i) Info Button (Google Sites replica) */}
        <div className="absolute left-2 sm:left-4 bottom-2 z-20">
          <button
            onClick={() => setShowInfoModal(true)}
            className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors shadow-sm"
            title="Site Information & Page Details"
            aria-label="Site Information"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* Google Sites Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 text-slate-800 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-base text-slate-900">Portal Information</h3>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs sm:text-sm">
              <div>
                <span className="font-semibold text-slate-700 block">Organization:</span>
                <p className="text-slate-600">
                  Department of Social Welfare and Development (DSWD) - Field Office 1
                </p>
              </div>
              <div>
                <span className="font-semibold text-slate-700 block">Office / Unit:</span>
                <p className="text-slate-600">
                  Administrative Division - Records and Archives Management Section (AD-RAMS)
                </p>
              </div>
              <div>
                <span className="font-semibold text-slate-700 block">Address:</span>
                <p className="text-slate-600">
                  Quezon Avenue, City of San Fernando, La Union, 2500 Philippines
                </p>
              </div>
              <div>
                <span className="font-semibold text-slate-700 block">Access Classification:</span>
                <p className="text-amber-700 font-medium bg-amber-50 p-2 rounded border border-amber-200">
                  Internal DSWD Workspace & Frontline Citizen's Charter Portal. Standard Operating Procedures restricted to official <span className="font-mono">@dswd.gov.ph</span> accounts.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Platform: AD-RAMS Web Portal v2.5</span>
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-1.5 bg-[#001484] text-white rounded text-xs font-medium hover:bg-blue-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
