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
import { AuthModal } from './components/AuthModal';
import { ResourcesModal } from './components/ResourcesModal';
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
  const [activeNav, setActiveNav] = useState<'Home' | 'Resources' | 'Templates' | 'Administrative Issuances'>('Home');
  const [selectedTemplatesCategory, setSelectedTemplatesCategory] = useState<string | null>(null);

  const [selectedSop, setSelectedSop] = useState<SopItem | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // PDF Document Viewer State
  const [selectedPdf, setSelectedPdf] = useState<PdfDoc | null>(null);

  // PDF List State (with local storage persistence for admin uploads)
  const [pdfList, setPdfList] = useState<PdfDoc[]>(() => {
    try {
      const saved = localStorage.getItem('ad_rams_pdf_list');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_PDF_LIST;
  });

  const handleAddPdf = (newDoc: PdfDoc) => {
    setPdfList((prev) => {
      const updated = [newDoc, ...prev];
      try {
        localStorage.setItem('ad_rams_pdf_list', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleDeletePdf = (id: string) => {
    setPdfList((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      try {
        localStorage.setItem('ad_rams_pdf_list', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Issuances modal state
  const [resourcesModalOpen, setResourcesModalOpen] = useState(false);
  const [resourceModalType, setResourceModalType] = useState<'resources' | 'templates' | 'issuances'>('issuances');
  const [selectedResourceItem, setSelectedResourceItem] = useState<string | undefined>(undefined);

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
          } else if (nav === 'Administrative Issuances') {
            setActiveNav('Administrative Issuances');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onSelectTemplatesCategory={(cat) => {
          setActiveNav('Templates');
          setSelectedTemplatesCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeNav={activeNav}
        userEmail={userEmail}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Body Content */}
      <main className="flex-1 w-full">
        {/* 2. Disclaimer Notice with Top and Bottom Dividers (appears on Home, Resources, Templates, and Issuances per screenshots) */}
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
            userEmail={userEmail}
            onOpenAuth={() => setAuthModalOpen(true)}
            pdfList={pdfList}
            onAddPdf={handleAddPdf}
            onDeletePdf={handleDeletePdf}
          />
        )}

        {activeNav === 'Templates' && (
          /* Templates Page View (Carbon copy of uploaded screenshots) */
          <TemplatesPage
            onBack={() => {
              setActiveNav('Home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            selectedCategory={selectedTemplatesCategory}
            onSelectCategory={(cat) => setSelectedTemplatesCategory(cat)}
            userEmail={userEmail}
          />
        )}

        {activeNav === 'Administrative Issuances' && (
          /* Administrative Issuances 2026 Page View (Carbon copy of uploaded screenshots) */
          <IssuancesPage
            onBack={() => {
              setActiveNav('Home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            userEmail={userEmail}
            onOpenAuth={() => setAuthModalOpen(true)}
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
          userEmail={userEmail}
          onOpenAuth={() => setAuthModalOpen(true)}
        />
      )}

      {selectedPdf && (
        <PdfViewerModal
          doc={selectedPdf}
          onClose={() => setSelectedPdf(null)}
        />
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        userEmail={userEmail}
        onLogin={(email) => setUserEmail(email)}
        onLogout={() => setUserEmail(null)}
      />

      <ResourcesModal
        isOpen={resourcesModalOpen}
        onClose={() => setResourcesModalOpen(false)}
        type={resourceModalType}
        initialItem={selectedResourceItem}
        userEmail={userEmail}
        onOpenAuth={() => setAuthModalOpen(true)}
      />
    </div>
  );
}
