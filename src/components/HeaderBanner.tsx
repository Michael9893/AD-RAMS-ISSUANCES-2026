import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';

interface HeaderBannerProps {
  onSelectNav: (item: string) => void;
  onOpenTemplates?: (type?: string) => void;
  onSelectTemplatesCategory?: (category: string) => void;
  activeNav?: string;
  userEmail?: string | null;
  onOpenAuth: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  onSelectNav,
  onSelectTemplatesCategory,
  activeNav = 'Home',
  userEmail,
  onOpenAuth,
}) => {
  const [templatesDropdownOpen, setTemplatesDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setTemplatesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative w-full overflow-hidden bg-[#e9e8f4] select-none" ref={dropdownRef}>
      {/* Dynamic Geometric Artwork Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          viewBox="0 0 1440 380"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top-Left Geometric Accents */}
          {/* Deep blue backdrop wedge */}
          <polygon points="0,0 200,0 120,60 0,60" fill="#00188f" />
          {/* Yellow wedge with thin gold stripe */}
          <polygon points="0,0 100,0 0,110" fill="#ffd600" />
          <line x1="0" y1="115" x2="230" y2="0" stroke="#ffd600" strokeWidth="4" strokeLinecap="round" />

          {/* Bottom-Center Peaked Navy Blue Pavilion with Yellow Border */}
          <polygon
            points="680,380 840,240 1000,380"
            fill="#031d8e"
          />
          {/* Yellow outline chevron */}
          <polyline
            points="670,380 840,230 1010,380"
            stroke="#fed600"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Secondary subtle line inside */}
          <polyline
            points="700,380 840,260 980,380"
            stroke="#fed600"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />

          {/* Right Side Flag Geometric Stripes (Blue, Yellow, Red) */}
          {/* Red Stripe Angle */}
          <polygon
            points="1020,380 1180,245 1440,380"
            fill="#dc2626"
          />
          {/* Giant Red Diagonal Band */}
          <polygon
            points="1020,380 1200,245 1300,245 1120,380"
            fill="#e11d24"
          />
          {/* Yellow Diagonal Band */}
          <polygon
            points="1140,380 1320,245 1400,245 1220,380"
            fill="#fed500"
          />
          {/* Top Yellow Corner Slices */}
          <polygon
            points="1260,110 1440,0 1440,80 1340,180"
            fill="#ffd000"
          />
          {/* Deep Navy Diagonal Band */}
          <polygon
            points="1230,380 1410,245 1440,245 1440,380 1320,380"
            fill="#001a8f"
          />
          <polygon
            points="1360,160 1440,90 1440,200"
            fill="#04187f"
          />
        </svg>
      </div>

      {/* Top Navbar Row */}
      <div className="relative z-10 w-full flex items-center justify-between px-4 sm:px-8 pt-2 pb-4">
        {/* Top Left Yellow Badge */}
        <div className="relative group cursor-pointer" onClick={() => onSelectNav('Home')}>
          <div
            className="bg-[#ffd500] text-slate-900 font-extrabold text-sm sm:text-base tracking-wide px-4 sm:px-6 py-1.5 shadow-sm transform -skew-x-12 flex items-center justify-center border-b-2 border-amber-500/40 hover:bg-[#ffe033] transition-colors"
            style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
          >
            <span className="transform skew-x-12 pl-1 pr-3">AD-RAMS</span>
          </div>
        </div>

        {/* Top Right Navigation Items */}
        <nav className="flex items-center gap-4 sm:gap-8 text-sm sm:text-base font-normal text-slate-800">
          <button
            onClick={() => onSelectNav('Home')}
            className={`transition-colors hover:text-blue-900 cursor-pointer ${
              activeNav === 'Home' ? 'font-semibold text-blue-950' : 'text-slate-800'
            }`}
          >
            Home
          </button>

          {/* Direct Resources Navigation Button (no dropdown, matches screenshot) */}
          <button
            onClick={() => onSelectNav('Resources')}
            className={`transition-colors hover:text-blue-900 cursor-pointer ${
              activeNav === 'Resources' ? 'font-bold text-slate-950' : 'text-slate-800'
            }`}
          >
            Resources
          </button>

          {/* Templates Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setTemplatesDropdownOpen(!templatesDropdownOpen);
              }}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                activeNav === 'Templates'
                  ? 'font-bold text-slate-950'
                  : 'hover:text-blue-900 text-slate-800'
              }`}
            >
              <span>Templates</span>
              <ChevronDown className="w-4 h-4 text-slate-700" />
            </button>

            {templatesDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-xl border border-slate-200 py-1.5 z-50 text-xs sm:text-sm text-slate-800 animate-in fade-in slide-in-from-top-1">
                <button
                  onClick={() => {
                    onSelectNav('Templates');
                    if (onSelectTemplatesCategory) {
                      onSelectTemplatesCategory('fo1-unique');
                    }
                    setTemplatesDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-blue-50 font-medium text-slate-800 hover:text-blue-900 flex items-center justify-between"
                >
                  <span>FO 1 UNIQUE FORMS</span>
                </button>
                <button
                  onClick={() => {
                    onSelectNav('Templates');
                    if (onSelectTemplatesCategory) {
                      onSelectTemplatesCategory('records-related');
                    }
                    setTemplatesDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-blue-50 font-medium text-slate-800 hover:text-blue-900 flex items-center justify-between"
                >
                  <span>RECORDS RELATED FORMS</span>
                </button>
                <button
                  onClick={() => {
                    onSelectNav('Templates');
                    if (onSelectTemplatesCategory) {
                      onSelectTemplatesCategory('general');
                    }
                    setTemplatesDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-blue-50 font-medium text-slate-800 hover:text-blue-900 flex items-center justify-between"
                >
                  <span>GENERAL FORMS</span>
                </button>
                <button
                  onClick={() => {
                    onSelectNav('Templates');
                    if (onSelectTemplatesCategory) {
                      onSelectTemplatesCategory('admin-services');
                    }
                    setTemplatesDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-blue-50 font-medium text-slate-800 hover:text-blue-900 flex items-center justify-between"
                >
                  <span>ADMINISTRATIVE SERVICES FORMS</span>
                </button>
              </div>
            )}
          </div>

          {/* Administrative Issuances (Direct button, no dropdown, matches screenshot) */}
          <button
            onClick={() => onSelectNav('Administrative Issuances')}
            className={`transition-colors cursor-pointer ${
              activeNav === 'Administrative Issuances'
                ? 'font-bold text-slate-950'
                : 'hover:text-blue-900 text-slate-800'
            }`}
          >
            Administrative Issuances
          </button>

          {/* DSWD Staff Sign In / Account status */}
          <button
            onClick={onOpenAuth}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors ${
              userEmail
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-white/80 text-blue-900 border border-blue-200 hover:bg-white'
            }`}
            title={userEmail ? `Logged in as ${userEmail}` : 'Click to verify DSWD personnel access'}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span className="font-medium truncate max-w-[130px]">
              {userEmail ? userEmail.replace('@dswd.gov.ph', '') : 'DSWD Staff Login'}
            </span>
          </button>
        </nav>
      </div>

      {/* Main Hero Header Title: RAMS PORTAL, Templates, RECORDS DISPOSITION SCHEDULE (RDS), or Administrative Issuances 2026 */}
      <div className="relative z-10 w-full px-8 sm:px-12 pt-6 sm:pt-10 pb-16 sm:pb-24">
        {activeNav === 'Resources' ? (
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-bold text-[#001f94] tracking-[0.03em] leading-tight"
            style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >
            RECORDS DISPOSITION SCHEDULE (RDS)
          </h1>
        ) : activeNav === 'Templates' ? (
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold text-[#001f94] tracking-[0.06em] leading-none"
            style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >
            Templates
          </h1>
        ) : activeNav === 'Administrative Issuances' ? (
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-bold text-[#001f94] tracking-[0.04em] leading-tight"
            style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >
            Administrative Issuances 2026
          </h1>
        ) : (
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold text-[#001f94] tracking-[0.06em] leading-none"
            style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >
            RAMS PORTAL
          </h1>
        )}
      </div>
    </header>
  );
};
