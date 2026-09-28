import React from 'react';
import {
  DisposalIcon,
  ArchivalIcon,
  MessengerialIcon,
  TechnicalAssistanceIcon,
  CopiesCertificationIcon,
  CertificationStampIcon,
  FreedomOfInfoIcon,
  IncomingDocumentsIcon,
} from './SopIcons';
import { SOP_ITEMS, SopItem } from '../data/sopData';

interface SopSectionProps {
  onSelectSop: (item: SopItem) => void;
}

export const SopSection: React.FC<SopSectionProps> = ({ onSelectSop }) => {
  // Map IDs to specific icon components
  const getIcon = (id: string) => {
    switch (id) {
      case 'disposal':
        return <DisposalIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto transform transition-transform group-hover:scale-105 duration-200" />;
      case 'archival':
        return <ArchivalIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto transform transition-transform group-hover:scale-105 duration-200" />;
      case 'messengerial':
        return <MessengerialIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto transform transition-transform group-hover:scale-105 duration-200" />;
      case 'technical-assistance':
        return <TechnicalAssistanceIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto transform transition-transform group-hover:scale-105 duration-200" />;
      case 'copies-certification':
        return <CopiesCertificationIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto transform transition-transform group-hover:scale-105 duration-200" />;
      case 'administrative-issuances':
        return <CertificationStampIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto transform transition-transform group-hover:scale-105 duration-200" />;
      case 'foi-request':
        return <FreedomOfInfoIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto transform transition-transform group-hover:scale-105 duration-200" />;
      case 'incoming-documents':
        return <IncomingDocumentsIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto transform transition-transform group-hover:scale-105 duration-200" />;
      default:
        return null;
    }
  };

  // Exact line break structures as shown in the screenshot
  const renderFormattedLabel = (id: string) => {
    switch (id) {
      case 'disposal':
        return (
          <>
            Request for<br />
            Diposal of<br />
            Valueless<br />
            Records
          </>
        );
      case 'archival':
        return (
          <>
            Request for<br />
            Archival of<br />
            Vital/<br />
            Permanent<br />
            Records
          </>
        );
      case 'messengerial':
        return (
          <>
            Request for<br />
            Messengerial<br />
            Services
          </>
        );
      case 'technical-assistance':
        return (
          <>
            Request for<br />
            Technical<br />
            Assistance<br />
            on Records<br />
            Management
          </>
        );
      case 'copies-certification':
        return (
          <>
            Request for<br />
            Copies and<br />
            Certification<br />
            of<br />
            Documents
          </>
        );
      case 'administrative-issuances':
        return (
          <>
            Certification<br />
            and<br />
            Disseminatio<br />
            n of<br />
            Administrati<br />
            ve Issuances
          </>
        );
      case 'foi-request':
        return (
          <>
            Provision of<br />
            Freedom of<br />
            Information<br />
            Request
          </>
        );
      case 'incoming-documents':
        return (
          <>
            Processing of<br />
            Incoming<br />
            Documents
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-[#f1eff7] px-4 sm:px-8 md:px-12 pt-4 pb-16">
      <div className="max-w-[1500px] mx-auto">
        <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#081878] tracking-normal font-normal">
          Standard Operating Procedures (SOPs)
        </h2>

        <p className="font-bold text-[14px] sm:text-[15.5px] text-[#111827] mt-3 mb-10">
          NOTE: Only DSWD issued email can access this.
        </p>

        {/* 8 Columns Grid - Horizontal layout matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-10 gap-x-4 sm:gap-x-6 items-start justify-items-center">
          {SOP_ITEMS.map((sop) => (
            <div
              key={sop.id}
              onClick={() => onSelectSop(sop)}
              className="group flex flex-col items-center cursor-pointer text-center w-full max-w-[155px] focus:outline-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectSop(sop);
                }
              }}
            >
              {/* Illustration container */}
              <div className="w-full h-28 sm:h-32 flex items-center justify-center mb-3">
                {getIcon(sop.id)}
              </div>

              {/* Blue underlined multi-line label */}
              <span className="text-[#0e1d88] group-hover:text-blue-900 underline text-[12.5px] sm:text-[13.5px] font-medium leading-[1.3] transition-colors select-text">
                {renderFormattedLabel(sop.id)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
