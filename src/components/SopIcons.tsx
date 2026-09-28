import React from 'react';

// 1. Request for Disposal of Valueless Records
export const DisposalIcon: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* City skyline background */}
    <rect x="25" y="42" width="18" height="48" rx="1" fill="#c7d2fe" opacity="0.6" />
    <rect x="47" y="30" width="22" height="60" rx="1" fill="#a5b4fc" opacity="0.5" />
    <rect x="73" y="36" width="26" height="54" rx="1" fill="#c7d2fe" opacity="0.5" />
    <rect x="103" y="44" width="20" height="46" rx="1" fill="#a5b4fc" opacity="0.6" />
    {/* Window dots */}
    <circle cx="34" cy="50" r="1.5" fill="#818cf8" />
    <circle cx="34" cy="58" r="1.5" fill="#818cf8" />
    <circle cx="34" cy="66" r="1.5" fill="#818cf8" />
    <circle cx="58" cy="40" r="1.5" fill="#6366f1" />
    <circle cx="58" cy="48" r="1.5" fill="#6366f1" />
    <circle cx="58" cy="56" r="1.5" fill="#6366f1" />
    <circle cx="86" cy="46" r="1.5" fill="#818cf8" />
    <circle cx="86" cy="54" r="1.5" fill="#818cf8" />

    {/* Laptop screen body */}
    <rect x="30" y="45" width="100" height="65" rx="5" fill="#1e40af" stroke="#1d4ed8" strokeWidth="2" />
    <rect x="36" y="50" width="88" height="55" rx="3" fill="#3b82f6" />
    {/* Window toolbar */}
    <rect x="36" y="50" width="88" height="12" fill="#1d4ed8" />
    <circle cx="42" cy="56" r="2" fill="#ef4444" />
    <circle cx="48" cy="56" r="2" fill="#f59e0b" />
    <circle cx="54" cy="56" r="2" fill="#10b981" />

    {/* Document sheet on screen */}
    <rect x="42" y="66" width="38" height="34" rx="2" fill="#ffffff" />
    <rect x="46" y="70" width="20" height="3" rx="1" fill="#3b82f6" />
    <rect x="46" y="76" width="30" height="2" fill="#cbd5e1" />
    <rect x="46" y="80" width="28" height="2" fill="#cbd5e1" />
    <rect x="46" y="84" width="24" height="2" fill="#cbd5e1" />
    <rect x="46" y="88" width="18" height="2" fill="#cbd5e1" />

    {/* Folder icon */}
    <path d="M85 68H94L98 72H118V96H85V68Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
    <path d="M87 74H116V94H87V74Z" fill="#fde68a" />
    <rect x="91" y="79" width="18" height="2" fill="#b45309" />
    <rect x="91" y="84" width="14" height="2" fill="#b45309" />

    {/* Laptop base */}
    <path d="M18 110C18 108 20 107 24 107H136C140 107 142 108 142 110L148 116H12L18 110Z" fill="#1e3a8a" />
    <rect x="68" y="108" width="24" height="2" rx="1" fill="#93c5fd" />

    {/* Magnifying Glass inspecting */}
    <circle cx="95" cy="88" r="14" fill="#ffffff" fillOpacity="0.4" stroke="#0284c7" strokeWidth="4" />
    <circle cx="95" cy="88" r="10" fill="#e0f2fe" fillOpacity="0.5" />
    <line x1="105" y1="98" x2="118" y2="111" stroke="#0369a1" strokeWidth="5" strokeLinecap="round" />
    {/* Glass shine */}
    <path d="M90 80A10 10 0 0 1 101 83" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 2. Request for Archival of Vital/Permanent Records
export const ArchivalIcon: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Filing Cabinet */}
    <rect x="75" y="55" width="60" height="70" rx="3" fill="#0d9488" stroke="#115e59" strokeWidth="2" />
    {/* Top drawer (open) */}
    <rect x="71" y="60" width="68" height="26" rx="2" fill="#14b8a6" stroke="#0f766e" strokeWidth="1.5" />
    <rect x="97" y="71" width="16" height="4" rx="2" fill="#042f2e" />
    {/* Bottom drawer (closed) */}
    <rect x="78" y="93" width="54" height="26" rx="2" fill="#0f766e" stroke="#134e4a" strokeWidth="1.5" />
    <rect x="97" y="104" width="16" height="4" rx="2" fill="#042f2e" />

    {/* Records folders inside open drawer */}
    <rect x="76" y="50" width="16" height="20" rx="1" fill="#f59e0b" transform="rotate(-10 76 50)" />
    <rect x="88" y="47" width="16" height="22" rx="1" fill="#3b82f6" transform="rotate(2 88 47)" />
    <rect x="100" y="46" width="18" height="22" rx="1" fill="#ef4444" transform="rotate(8 100 46)" />
    <rect x="114" y="48" width="18" height="22" rx="1" fill="#fbbf24" transform="rotate(15 114 48)" />

    {/* Person (Archivist putting records) */}
    {/* Hair / Head */}
    <circle cx="48" cy="38" r="9" fill="#1e293b" />
    <circle cx="50" cy="40" r="7" fill="#fbcfe8" />
    <path d="M42 36C42 31 46 29 52 29C57 29 60 33 60 37C60 38 56 36 52 36C47 36 44 38 42 36Z" fill="#1e293b" />
    {/* Torso / Blouse */}
    <path d="M42 47L36 78H62L58 47H42Z" fill="#f43f5e" />
    {/* Collar */}
    <path d="M47 47L50 54L53 47" stroke="#ffffff" strokeWidth="1.5" />
    {/* Arms holding vital records file */}
    <path d="M38 52L54 62L68 56" stroke="#fbcfe8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Vital Record Folder in hand */}
    <rect x="58" y="48" width="22" height="16" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="1" transform="rotate(-15 58 48)" />
    <text x="63" y="58" fill="#78350f" fontSize="6" fontWeight="bold" transform="rotate(-15 58 48)">VITAL</text>

    {/* Skirt */}
    <path d="M36 78L30 115H66L62 78H36Z" fill="#1e293b" />
    {/* Legs */}
    <rect x="38" y="115" width="6" height="15" fill="#fbcfe8" />
    <rect x="52" y="115" width="6" height="15" fill="#fbcfe8" />
    <rect x="36" y="127" width="10" height="5" rx="2" fill="#0f172a" />
    <rect x="50" y="127" width="10" height="5" rx="2" fill="#0f172a" />
  </svg>
);

// 3. Request for Messengerial Services
export const MessengerialIcon: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Dispatch Mailbox */}
    <rect x="72" y="65" width="34" height="42" rx="4" fill="#e11d48" stroke="#be123c" strokeWidth="2" />
    <rect x="76" y="70" width="26" height="6" rx="2" fill="#1e293b" />
    {/* Post / Pole */}
    <rect x="85" y="107" width="8" height="24" fill="#64748b" />
    <rect x="77" y="128" width="24" height="4" rx="1" fill="#475569" />

    {/* Messenger / Courier on left */}
    {/* Head / cap */}
    <circle cx="42" cy="52" r="8" fill="#fed7aa" />
    <path d="M34 50C34 44 38 43 44 43C50 43 53 45 54 48L59 48" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
    {/* Messenger Body */}
    <path d="M36 60L33 90H52L49 60H36Z" fill="#ec4899" />
    {/* Messenger bag cross strap */}
    <line x1="36" y1="62" x2="49" y2="84" stroke="#475569" strokeWidth="3" />
    <rect x="42" y="78" width="14" height="12" rx="2" fill="#92400e" />
    {/* Hands / Envelope held */}
    <path d="M46 68L65 72" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" />

    {/* Pants */}
    <rect x="33" y="90" width="8" height="28" fill="#1e3a8a" />
    <rect x="43" y="90" width="8" height="28" fill="#1e3a8a" />
    <rect x="31" y="115" width="12" height="6" rx="2" fill="#0284c7" />
    <rect x="43" y="115" width="12" height="6" rx="2" fill="#0284c7" />

    {/* Flying Letters & Envelopes */}
    {/* Envelope 1 */}
    <rect x="58" y="44" width="20" height="13" rx="1.5" fill="#ffffff" stroke="#0284c7" strokeWidth="1.2" transform="rotate(-18 58 44)" />
    <path d="M58 44L67 52L77 41" stroke="#0284c7" strokeWidth="1" />
    {/* Envelope 2 */}
    <rect x="92" y="38" width="22" height="14" rx="1.5" fill="#ffffff" stroke="#ef4444" strokeWidth="1.2" transform="rotate(12 92 38)" />
    <path d="M92 40L102 48L114 42" stroke="#ef4444" strokeWidth="1" />
    {/* Envelope 3 */}
    <rect x="80" y="24" width="18" height="12" rx="1.5" fill="#ffffff" stroke="#10b981" strokeWidth="1.2" transform="rotate(-5 80 24)" />

    {/* Floating @ symbol */}
    <circle cx="118" cy="52" r="9" fill="#3b82f6" fillOpacity="0.15" />
    <text x="113" y="56" fill="#2563eb" fontSize="12" fontWeight="bold" fontFamily="sans-serif">@</text>

    {/* Receiving person / colleague on right */}
    <circle cx="128" cy="68" r="7" fill="#fed7aa" />
    <path d="M122 75L120 102H136L134 75H122Z" fill="#38bdf8" />
    <rect x="122" y="102" width="5" height="18" fill="#334155" />
    <rect x="129" y="102" width="5" height="18" fill="#334155" />
  </svg>
);

// 4. Request for Technical Assistance on Records Management
export const TechnicalAssistanceIcon: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Conference Table */}
    <ellipse cx="80" cy="98" rx="48" ry="18" fill="#0284c7" />
    <ellipse cx="80" cy="95" rx="46" ry="16" fill="#38bdf8" />

    {/* Person 1 (Left - woman with books) */}
    <circle cx="48" cy="62" r="8" fill="#fed7aa" />
    <path d="M42 56C42 52 46 50 51 50C56 50 58 54 57 58" stroke="#b45309" strokeWidth="3" />
    <path d="M41 70L36 94H56L53 70H41Z" fill="#f59e0b" />
    {/* Question marks floating */}
    <text x="50" y="44" fill="#dc2626" fontSize="14" fontWeight="bold" fontFamily="sans-serif">???</text>

    {/* Person 2 (Center - advisor / facilitator) */}
    <circle cx="80" cy="54" r="8" fill="#fed7aa" />
    <path d="M72 49C73 45 77 43 82 43C87 43 89 46 88 50" stroke="#1e293b" strokeWidth="3" />
    <path d="M73 62L69 88H91L87 62H73Z" fill="#10b981" />

    {/* Person 3 (Right - records officer) */}
    <circle cx="112" cy="62" r="8" fill="#fed7aa" />
    <path d="M106 56C106 52 110 50 115 50C120 50 122 54 121 58" stroke="#4338ca" strokeWidth="3" />
    <path d="M104 70L100 94H121L117 70H104Z" fill="#6366f1" />

    {/* Stack of records manuals / guides on table */}
    <rect x="94" y="86" width="18" height="5" rx="1" fill="#ec4899" />
    <rect x="95" y="82" width="16" height="5" rx="1" fill="#3b82f6" />
    <rect x="96" y="78" width="15" height="5" rx="1" fill="#eab308" />

    {/* Laptop / Notebook on table */}
    <path d="M68 88L73 82H87L84 88H68Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
  </svg>
);

// 5. Request for Copies and Certification of Documents
export const CopiesCertificationIcon: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Service Window / Counter Frame */}
    <rect x="35" y="30" width="90" height="85" rx="6" fill="#1e293b" />
    <rect x="40" y="35" width="80" height="75" rx="4" fill="#f8fafc" />

    {/* Service counter divider / window glass */}
    <rect x="40" y="35" width="80" height="35" fill="#e0f2fe" opacity="0.6" />
    <line x1="80" y1="35" x2="80" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
    <rect x="35" y="70" width="90" height="8" fill="#334155" />

    {/* Documents Stack in background */}
    <rect x="52" y="22" width="56" height="40" rx="3" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
    <rect x="56" y="27" width="22" height="3" fill="#0284c7" />
    <line x1="56" y1="34" x2="100" y2="34" stroke="#94a3b8" strokeWidth="1.5" />
    <line x1="56" y1="39" x2="96" y2="39" stroke="#94a3b8" strokeWidth="1.5" />

    {/* Staff on Left */}
    <circle cx="56" cy="84" r="8" fill="#fed7aa" />
    <path d="M48 93L44 115H68L64 93H48Z" fill="#ef4444" />

    {/* Client on Right */}
    <circle cx="104" cy="84" r="8" fill="#fed7aa" />
    <path d="M96 93L92 115H116L112 93H96Z" fill="#0284c7" />

    {/* Big Green Transfer/Copy Exchange Arrows badge */}
    <circle cx="114" cy="54" r="18" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
    {/* Right arrow */}
    <path d="M106 49H118M118 49L114 45M118 49L114 53" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Left arrow */}
    <path d="M122 59H110M110 59L114 55M110 59L114 63" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 6. Certification and Dissemination of Administrative Issuances
export const CertificationStampIcon: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Red Circular Rubber Stamp */}
    {/* Serrated / Starburst outer decorative ring */}
    <circle cx="80" cy="70" r="54" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="80" cy="70" r="49" stroke="#dc2626" strokeWidth="3" />
    <circle cx="80" cy="70" r="44" stroke="#dc2626" strokeWidth="1.5" />

    {/* 3 Red Stars on Top */}
    <path d="M70 42L71.5 45H75L72.2 47L73.3 50.5L70 48.5L66.7 50.5L67.8 47L65 45H68.5L70 42Z" fill="#dc2626" />
    <path d="M80 39L81.5 42H85L82.2 44L83.3 47.5L80 45.5L76.7 47.5L77.8 44L75 42H78.5L80 39Z" fill="#dc2626" />
    <path d="M90 42L91.5 45H95L92.2 47L93.3 50.5L90 48.5L86.7 50.5L87.8 47L85 45H88.5L90 42Z" fill="#dc2626" />

    {/* Center Text: CERTIFIED TRUE COPY */}
    <text
      x="80"
      y="66"
      textAnchor="middle"
      fill="#dc2626"
      fontSize="12.5"
      fontWeight="900"
      fontFamily="Impact, Arial Black, sans-serif"
      letterSpacing="0.8"
    >
      CERTIFIED
    </text>
    <text
      x="80"
      y="80"
      textAnchor="middle"
      fill="#dc2626"
      fontSize="12.5"
      fontWeight="900"
      fontFamily="Impact, Arial Black, sans-serif"
      letterSpacing="0.8"
    >
      TRUE COPY
    </text>

    {/* 3 Red Stars on Bottom */}
    <path d="M70 94L71.5 97H75L72.2 99L73.3 102.5L70 100.5L66.7 102.5L77.8 99L65 97H68.5L70 94Z" fill="#dc2626" />
    <path d="M80 96L81.5 99H85L82.2 101L83.3 104.5L80 102.5L76.7 104.5L77.8 101L75 99H78.5L80 96Z" fill="#dc2626" />
    <path d="M90 94L91.5 97H95L92.2 99L93.3 102.5L90 100.5L86.7 102.5L87.8 99L85 97H88.5L90 94Z" fill="#dc2626" />

    {/* Distressed rubber stamp texture details */}
    <circle cx="56" cy="55" r="1.5" fill="#dc2626" opacity="0.6" />
    <circle cx="106" cy="65" r="1.2" fill="#dc2626" opacity="0.5" />
    <circle cx="62" cy="85" r="1.3" fill="#dc2626" opacity="0.7" />
    <circle cx="98" cy="88" r="1.4" fill="#dc2626" opacity="0.6" />
  </svg>
);

// 7. Provision of Freedom of Information (FOI) Request
export const FreedomOfInfoIcon: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Floating info speech balloons */}
    {/* Big central blue "i" bubble */}
    <circle cx="78" cy="40" r="14" fill="#3b82f6" />
    <circle cx="78" cy="34" r="2" fill="#ffffff" />
    <rect x="76.5" y="38" width="3" height="7" rx="1.5" fill="#ffffff" />

    {/* Secondary orange "i" bubble */}
    <circle cx="96" cy="34" r="11" fill="#f59e0b" />
    <circle cx="96" cy="30" r="1.6" fill="#ffffff" />
    <rect x="95" y="33" width="2" height="5" rx="1" fill="#ffffff" />

    {/* Speech dots */}
    <circle cx="58" cy="38" r="3" fill="#f43f5e" />
    <circle cx="52" cy="43" r="2" fill="#f43f5e" />

    {/* Left Officer (Male) */}
    <circle cx="60" cy="60" r="8" fill="#fed7aa" />
    <path d="M53 54C54 49 59 48 64 48C68 48 70 51 69 55" stroke="#1e293b" strokeWidth="3" />
    {/* Suit / Tie */}
    <path d="M51 69L46 98H74L69 69H51Z" fill="#3b82f6" />
    <path d="M58 69L60 76L62 69" fill="#ffffff" />
    <polygon points="60,74 58,82 60,86 62,82" fill="#ef4444" />
    {/* Legs */}
    <rect x="49" y="98" width="8" height="24" fill="#1e293b" />
    <rect x="62" y="98" width="8" height="24" fill="#1e293b" />
    <rect x="46" y="120" width="12" height="5" rx="2" fill="#0f172a" />
    <rect x="60" y="120" width="12" height="5" rx="2" fill="#0f172a" />

    {/* Right Officer (Female) */}
    <circle cx="102" cy="60" r="8" fill="#fed7aa" />
    <path d="M96 55C96 50 100 48 106 48C111 48 113 52 112 56L116 68" stroke="#475569" strokeWidth="3" />
    <path d="M93 69L89 94H115L111 69H93Z" fill="#ec4899" />
    {/* Skirt */}
    <path d="M89 94L84 112H118L114 94H89Z" fill="#1e293b" />
    {/* Legs */}
    <rect x="91" y="112" width="6" height="12" fill="#fed7aa" />
    <rect x="105" y="112" width="6" height="12" fill="#fed7aa" />
    <rect x="88" y="122" width="10" height="4" rx="2" fill="#0f172a" />
    <rect x="103" y="122" width="10" height="4" rx="2" fill="#0f172a" />

    {/* Information badge in hand */}
    <circle cx="80" cy="80" r="10" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
    <text x="80" y="84" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">i</text>
  </svg>
);

// 8. Processing of Incoming Documents
export const IncomingDocumentsIcon: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Document Folder (Teal / Blue-Green) */}
    <rect x="58" y="24" width="66" height="85" rx="4" fill="#0f766e" stroke="#115e59" strokeWidth="1.5" />
    <rect x="62" y="19" width="30" height="8" rx="2" fill="#0f766e" />

    {/* Stacked Paper Sheets with tabs */}
    <rect x="50" y="32" width="62" height="78" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
    {/* Document Header bar */}
    <rect x="56" y="38" width="22" height="4" rx="1" fill="#0284c7" />
    <rect x="82" y="38" width="24" height="4" rx="1" fill="#e2e8f0" />
    {/* Text lines */}
    <line x1="56" y1="48" x2="102" y2="48" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    <line x1="56" y1="54" x2="98" y2="54" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
    <line x1="56" y1="60" x2="104" y2="60" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
    <line x1="56" y1="66" x2="90" y2="66" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
    <line x1="56" y1="72" x2="95" y2="72" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
    <line x1="56" y1="78" x2="80" y2="78" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

    {/* Official Red "RECEIVED" Rubber Stamp */}
    <g transform="rotate(-12 110 88)">
      <rect x="86" y="74" width="46" height="26" rx="3" fill="#dc2626" fillOpacity="0.08" stroke="#dc2626" strokeWidth="2" strokeDasharray="2 1" />
      <rect x="88" y="76" width="42" height="22" rx="2" stroke="#dc2626" strokeWidth="1.2" />
      <text
        x="109"
        y="86"
        textAnchor="middle"
        fill="#dc2626"
        fontSize="7.5"
        fontWeight="bold"
        fontFamily="sans-serif"
        letterSpacing="0.5"
      >
        RECEIVED
      </text>
      <line x1="91" y1="89" x2="127" y2="89" stroke="#dc2626" strokeWidth="0.8" />
      <text x="109" y="95" textAnchor="middle" fill="#dc2626" fontSize="5.5" fontWeight="bold">
        AD-RAMS FO1
      </text>
    </g>

    {/* Stamp applicator / handle on side */}
    <rect x="36" y="74" width="14" height="22" rx="3" fill="#713f12" />
    <rect x="33" y="93" width="20" height="8" rx="2" fill="#94a3b8" />
    <path d="M38 74L43 62H47L52 74H38Z" fill="#ca8a04" />
  </svg>
);
