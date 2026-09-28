import React from 'react';
import { FileText } from 'lucide-react';
import { ISSUANCES_CY_2026 } from '../data/issuancesData';

interface IssuancesPageProps {
  onBack: () => void;
}

export const IssuancesPage: React.FC<IssuancesPageProps> = ({ onBack }) => {
  return (
    <section className="w-full bg-[#f1eff7] px-2 sm:px-6 md:px-12 pt-2 pb-12 select-none">
      <div className="max-w-[1550px] mx-auto space-y-4">
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

          {/* Clean Empty State */}
          <div className="py-16 px-4 text-center bg-white space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-slate-400" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                No Regional Special Orders recorded for CY 2026
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                The CY 2026 Regional Special Order registry is currently empty.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end pt-4 pb-2">
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
