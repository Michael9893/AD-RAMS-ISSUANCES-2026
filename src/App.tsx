/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderBanner } from './components/HeaderBanner';
import { DisclaimerNotice } from './components/DisclaimerNotice';
import { MandateSection } from './components/MandateSection';
import { SopSection } from './components/SopSection';
import { ResourcesPage } from './components/ResourcesPage';
import { TemplatesPage } from './components/TemplatesPage';
import { IssuancesPage } from './components/IssuancesPage';
import { Footer } from './components/Footer';
import { SopModal } from './components/SopModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { SopItem } from './data/sopData';
import { PdfDoc } from './types';

// Default 5 PDF documents from the user's screenshot
const DEFAULT_PDF_LIST: PdfDoc[] = [
  {
    id: 'rds-all',
    title: 'All RDS (DSWD).pdf',
    lastModified: 'Feb 26 Records Administration Management Section FO 01',
    author: 'Records Administration Management Section FO 01',
  },
  {
    id: 'nap-circular-5',
    title: 'NAP_General_Circular_No_5.pdf',
    lastModified: 'Jan 19 Records Administration Management Section FO 01',
    author: 'Records Administration Management Section FO 01',
  },
  {
    id: 'rds-2007',
    title: 'RDS 2007 (DSWD).pdf',
    lastModified: 'Jan 20 Records Administration Management Section FO 01',
    author: 'Records Administration Management Section FO 01',
  },
  {
    id: 'rds-2015',
    title: 'RDS 2015 (DSWD).pdf',
    lastModified: 'Jan 23 Records Administration Management Section FO 01',
    author: 'Records Administration Management Section FO 01',
  },
  {
    id: 'rds-2022',
    title: 'RDS 2022 (DSWD).pdf',
    lastModified: 'Jan 20 Records Administration Management Section FO 01',
    author: 'Records Administration Management Section FO 01',
  },
];

export default function App() {
  const [activeNav, setActiveNav] = useState<'Home' | 'Resources' | 'Templates' | '2026'>('Home');
  const [selectedTemplatesCategory, setSelectedTemplatesCategory] = useState<string | null>(null);

  const [selectedSop, setSelectedSop] = useState<SopItem | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<PdfDoc | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#f1eff7] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Header Hero with Geometric Visual Artwork & Navbar */}
      <HeaderBanner
        onSelectNav={(nav) => {
          if (nav === 'Home') {
            setActiveNav('Home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (nav === 'Resources') {
            setActiveNav('Resources');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (nav === 'Templates') {
            setActiveNav('Templates');
            setSelectedTemplatesCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (nav === '2026' || nav === 'Administrative Issuances') {
            setActiveNav('2026');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onSelectTemplatesCategory={(cat) => {
          setActiveNav('Templates');
          setSelectedTemplatesCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeNav={activeNav}
      />

      {/* Main Body Content */}
      <main className="flex-1 w-full">
        {/* 2. Disclaimer Notice with Top and Bottom Dividers */}
        <DisclaimerNotice />

        {activeNav === 'Home' && (
          <>
            {/* 3. The Section's Mandate */}
            <MandateSection />

            {/* 4. Standard Operating Procedures (SOPs) with 8 items */}
            <SopSection
              onSelectSop={(sop) => {
                setSelectedSop(sop);
              }}
            />
          </>
        )}

        {activeNav === 'Resources' && (
          /* Resources Page View */
          <ResourcesPage
            onBack={() => {
              setActiveNav('Home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPdf={(doc) => setSelectedPdf(doc)}
            pdfList={DEFAULT_PDF_LIST}
          />
        )}

        {activeNav === 'Templates' && (
          /* Templates Page View with 4 Categories */
          <TemplatesPage
            onBack={() => {
              setActiveNav('Home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            selectedCategory={selectedTemplatesCategory}
            onSelectCategory={(cat) => setSelectedTemplatesCategory(cat)}
          />
        )}

        {(activeNav === '2026' || (activeNav as string) === 'Administrative Issuances') && (
          /* 2026 Regional Special Orders Page View */
          <IssuancesPage
            onBack={() => {
              setActiveNav('Home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* 5. Blue Footer with Visitor Box and Contact Details */}
      <Footer />

      {/* Interactive Modals */}
      {selectedSop && (
        <SopModal
          sop={selectedSop}
          onClose={() => setSelectedSop(null)}
        />
      )}

      {selectedPdf && (
        <PdfViewerModal
          doc={selectedPdf}
          onClose={() => setSelectedPdf(null)}
        />
      )}
    </div>
  );
}
