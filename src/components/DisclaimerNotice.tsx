import React from 'react';

export const DisclaimerNotice: React.FC = () => {
  return (
    <section className="w-full bg-[#f1eff7] px-6 sm:px-12 pt-6 pb-6">
      {/* Top Divider Line */}
      <hr className="border-t border-[#d8d4e4] mb-6" />

      <div className="max-w-7xl mx-auto space-y-3">
        <h2 className="text-[#dc2626] font-bold underline tracking-wide text-sm sm:text-base uppercase inline-block">
          DISCLAIMER NOTICE:
        </h2>

        <p className="font-serif italic text-[13px] sm:text-[14.5px] text-[#222222] leading-relaxed tracking-normal">
          This correspondence and any file transmitted with it are CONFIDENTIAL and intended solely for the use of
          individuals or entities to whom this is addressed. Access by anyone else is strictly unauthorized. If you are
          not the intended recipient, any disclosure, copying, distribution or any other action taken or omitted to be
          taken in reliance on it is prohibited and unlawful. It shall justify the AD-RAMS to exercise whatever rights and
          remedies under the applicable laws, rules and regulations. In such case, please notify the AD-RAMS and
          subsequently return this correspondence.
        </p>
      </div>

      {/* Bottom Divider Line */}
      <hr className="border-t border-[#d8d4e4] mt-6" />
    </section>
  );
};
