import React from 'react';

export const MandateSection: React.FC = () => {
  return (
    <section className="w-full bg-[#f1eff7] px-6 sm:px-12 pt-4 pb-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#081878] tracking-normal font-normal">
          The Section's Mandate
        </h2>

        <p className="text-[14px] sm:text-[15.5px] text-[#222222] leading-relaxed max-w-6xl font-normal">
          To develop policies, programs, and procedures for an efficient and effective records management and ensure
          appropriate management systems and procedures are in-placed for economical, efficient, and effective
          services.
        </p>
      </div>
    </section>
  );
};
