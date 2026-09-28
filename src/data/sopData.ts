export interface SopItem {
  id: string;
  code: string;
  title: string;
  originalLabel: string;
  description: string;
  objective: string;
  scope: string;
  legalBasis: string[];
  processingTime: string;
  clientType: string;
  fees: string;
  checklist: string[];
  steps: {
    step: number;
    activity: string;
    responsiblePerson: string;
    duration: string;
  }[];
  googleDriveLink?: string;
  formType: string;
}

export const SOP_ITEMS: SopItem[] = [
  {
    id: 'disposal',
    code: 'DSWD-FO1-AD-RAMS-SOP-01',
    title: 'Request for Disposal of Valueless Records',
    originalLabel: 'Request for Diposal of Valueless Records',
    description: 'Guidelines and standardized procedure for the systematic inventory, appraisal, and authorized disposal of valueless and non-current records in accordance with National Archives of the Philippines (NAP) mandates.',
    objective: 'To economize office space, secure record integrity, and ensure strict compliance with NAP disposal protocols.',
    scope: 'Covers all Divisions, Sections, and Specialized Units of DSWD Field Office 1 possessing records that have exceeded their mandatory retention periods.',
    legalBasis: [
      'Republic Act No. 9470 (National Archives of the Philippines Act of 2007)',
      'NAP General Circular No. 1 & 2 s. 2008 (Guidelines on the Disposal of Valueless Records)',
      'DSWD Records Management Manual & Regional Disposition Schedule (RDS)'
    ],
    processingTime: '15 to 20 Working Days (Subject to NAP On-site Inspection & Issuance of Authority to Dispose)',
    clientType: 'DSWD FO1 Divisions, Centers, and Regional Programs',
    fees: 'None (Government internal compliance service)',
    checklist: [
      'Accomplished NAP Form No. 1 (Request for Authority to Dispose of Records)',
      'Inventory and Inspection Report of Valueless Records',
      'Certificate of Records Appraisal conducted by the Section Records Custodian',
      'Endorsement from Division Chief / Section Head'
    ],
    steps: [
      { step: 1, activity: 'Submission of Accomplished NAP Form 1 & Records Inventory by Division Custodian to RAMS', responsiblePerson: 'Requesting Division Custodian', duration: '1 Day' },
      { step: 2, activity: 'Physical appraisal, inventory verification, and calculation of retention period compliance', responsiblePerson: 'RAMS Records Officer / Appraiser', duration: '3 Days' },
      { step: 3, activity: 'Preparation and endorsement of Authority to Dispose to National Archives of the Philippines (NAP)', responsiblePerson: 'Head of RAMS / Regional Director', duration: '2 Days' },
      { step: 4, activity: 'Coordination with NAP Inspection Team and accredited waste-paper recycling contractor', responsiblePerson: 'RAMS Disposal Committee', duration: '5-10 Days' },
      { step: 5, activity: 'Actual witnessed shredding/disposal and issuance of Certificate of Disposal', responsiblePerson: 'RAMS, COA Resident Auditor, NAP Witness', duration: '1 Day' }
    ],
    formType: 'disposal-form'
  },
  {
    id: 'archival',
    code: 'DSWD-FO1-AD-RAMS-SOP-02',
    title: 'Request for Archival of Vital / Permanent Records',
    originalLabel: 'Request for Archival of Vital/Permanent Records',
    description: 'Procedure for the systematic transfer, boxing, metadata indexing, and climate-controlled preservation of permanent, historical, and vital records of the Department.',
    objective: 'To safeguard irreplaceable public records, maintain preservation standards, and ensure rapid retrieval during audit and legal inquiries.',
    scope: 'All vital records (contracts, personnel jackets, title deeds, adoption files, approved project terminal reports).',
    legalBasis: [
      'RA 9470 Article III - Management of Public Records',
      'DSWD Memorandum Circular on Regional Archival Management'
    ],
    processingTime: '3 to 5 Working Days',
    clientType: 'All Regional Sections, Centers, and Attached Institutions',
    fees: 'None',
    checklist: [
      'Accomplished Archival Transmittal Form (RAMS-AF-01)',
      'Box Content Inventory Sheet (Duplicate copy inside box, duplicate to RAMS)',
      'Standardized Acid-Free Archival Boxes (properly labeled per DSWD coding rules)',
      'Digital scan metadata spreadsheet'
    ],
    steps: [
      { step: 1, activity: 'Sorting, de-stapling, and box indexing of vital records per year & series', responsiblePerson: 'Originating Unit Records Custodian', duration: '2 Days' },
      { step: 2, activity: 'Submission of Archival Transfer Request with digital inventory index to RAMS', responsiblePerson: 'Originating Unit', duration: '1 Day' },
      { step: 3, activity: 'RAMS validation of box contents, barcoding, and assignment of Archive Bay/Shelf number', responsiblePerson: 'RAMS Archivist', duration: '1-2 Days' },
      { step: 4, activity: 'Issuance of Official Archival Receipt and acknowledgement copy', responsiblePerson: 'RAMS Section Head', duration: '1 Day' }
    ],
    formType: 'archival-form'
  },
  {
    id: 'messengerial',
    code: 'DSWD-FO1-AD-RAMS-SOP-03',
    title: 'Request for Messengerial and Dispatch Services',
    originalLabel: 'Request for Messengerial Services',
    description: 'Official handling, logging, packaging, and dispatch of outgoing correspondence, cheques, payroll transmittals, and inter-agency mail to external government bodies and postal carriers.',
    objective: 'To maintain timely, secure, and traceable delivery of all outgoing official mail and packages.',
    scope: 'Official communications originating from DSWD FO1 addressed to external partners, national offices, local government units, and beneficiaries.',
    legalBasis: [
      'PhilPost Domestic Postal Regulations',
      'DSWD FO1 Administrative Issuance on Courier & Dispatch Guidelines'
    ],
    processingTime: 'Same Day Dispatch (for requests received before 1:00 PM cutoff)',
    clientType: 'DSWD FO1 Personnel and Project Units',
    fees: 'None (Funded under Regional Postal Budget)',
    checklist: [
      'Accomplished Messengerial Dispatch Slip with tracking routing slip',
      'Addressed envelope with complete recipient name, agency, designation, and contact number',
      'For urgent/rush dispatches: Prioritized signature stamp of Division Chief'
    ],
    steps: [
      { step: 1, activity: 'Delivery of enveloped communications to RAMS Dispatch Counter with signed routing slip', responsiblePerson: 'Requesting Staff', duration: '15 Minutes' },
      { step: 2, activity: 'Verification of attachments, stamping with Official Dispatch Barcode/Serial Number', responsiblePerson: 'RAMS Messengerial Clerk', duration: '10 Minutes' },
      { step: 3, activity: 'Batch sorting into Hand-Carried Courier, Regional Post, or Commercial Express', responsiblePerson: 'RAMS Dispatcher', duration: '1 Hour' },
      { step: 4, activity: 'Physical delivery or drop-off at Philippine Postal Corporation / Courier carrier', responsiblePerson: 'DSWD Official Messenger', duration: 'Within 24 Hours' },
      { step: 5, activity: 'Return and digital upload of signed Proof of Delivery (POD) / registry receipt', responsiblePerson: 'RAMS Records Officer', duration: 'Upon completion' }
    ],
    formType: 'messengerial-form'
  },
  {
    id: 'technical-assistance',
    code: 'DSWD-FO1-AD-RAMS-SOP-04',
    title: 'Request for Technical Assistance on Records Management',
    originalLabel: 'Request for Technical Assistance on Records Management',
    description: 'Provision of advisory, capacity building, file classification structuring, and records disaster preparedness assistance to regional divisions, newly established centers, and municipal operations offices.',
    objective: 'To capacitate records custodians across Region 1 with uniform classification, digitization, and records retention compliance.',
    scope: 'Any unit seeking guidance on records disposition, filing system restructuring, electronic archiving, or disaster salvage.',
    legalBasis: [
      'NAP Guidelines on Capacity Development for Government Records Officers',
      'DSWD Field Office 1 Quality Management System (QMS)'
    ],
    processingTime: '5 to 7 Working Days from request endorsement',
    clientType: 'All Field Office 1 Divisions, Social Welfare and Development (SWAD) Teams, and Centers',
    fees: 'None',
    checklist: [
      'Technical Assistance Request Form (TARF-RAMS)',
      'Brief profile of the records holdings or identified challenges',
      'Preferred schedule and modality (Face-to-face workshop or virtual session)'
    ],
    steps: [
      { step: 1, activity: 'Endorsement of TARF to RAMS through the Document Management System (DMS)', responsiblePerson: 'Requesting Division Head', duration: '1 Day' },
      { step: 2, activity: 'Needs assessment and formulation of tailored technical assistance plan', responsiblePerson: 'RAMS Technical Specialist', duration: '2 Days' },
      { step: 3, activity: 'Confirmation of coaching/training schedule and deployment of resource materials', responsiblePerson: 'RAMS Section Head', duration: '1 Day' },
      { step: 4, activity: 'Conduct of Technical Assistance session / on-site appraisal walk-through', responsiblePerson: 'RAMS Team', duration: '1-2 Days' },
      { step: 5, activity: 'Issuance of Technical Assistance Report and Action Plan with follow-up monitoring', responsiblePerson: 'RAMS Records Appraiser', duration: '2 Days' }
    ],
    formType: 'technical-assistance'
  },
  {
    id: 'copies-certification',
    code: 'DSWD-FO1-AD-RAMS-SOP-05',
    title: 'Request for Copies and Certification of Documents',
    originalLabel: 'Request for Copies and Certification of Documents',
    description: 'Verification of authenticity, retrieval from regional archives, photocopying/certified true copy stamping, and issuance of official records to authorized personnel or client stakeholders.',
    objective: 'To facilitate transparent access to official records while enforcing data privacy and archival protection.',
    scope: 'Administrative issuances, office orders, special orders, travel authorities, service records, and public communications.',
    legalBasis: [
      'Executive Order No. 2 s. 2016 (Freedom of Information)',
      'Republic Act No. 10173 (Data Privacy Act of 2012)',
      'DSWD Citizen\'s Charter Service Standards'
    ],
    processingTime: '1 Working Day (Simple) to 3 Working Days (Archived records requiring warehouse retrieval)',
    clientType: 'DSWD Employees, Government Agencies, General Public (Subject to Data Privacy clearances)',
    fees: 'Free of charge for official government use',
    checklist: [
      'Accomplished Document Request Slip (DRS-RAMS-05)',
      'Valid Government-issued ID of requesting individual',
      'Special Power of Attorney (SPA) or Authorization Letter if representative',
      'Document reference details (Subject, Date, Type of Issuance)'
    ],
    steps: [
      { step: 1, activity: 'Filing of Document Request Slip in-person or via rams.fo1@dswd.gov.ph', responsiblePerson: 'Requesting Party', duration: '10 Minutes' },
      { step: 2, activity: 'Review of eligibility, privacy clearance, and search in the Electronic Archive Database', responsiblePerson: 'RAMS Receiving Clerk', duration: '30 Minutes' },
      { step: 3, activity: 'Retrieval of original document from active repository or archival cold storage', responsiblePerson: 'RAMS Vault Custodian', duration: '1-2 Hours' },
      { step: 4, activity: 'Reproduction, affixing of Official Certified True Copy Stamp and authorized signature', responsiblePerson: 'Designated Records Officer', duration: '30 Minutes' },
      { step: 5, activity: 'Releasing of certified copy to client with signed transmittal receipt', responsiblePerson: 'RAMS Releasing Officer', duration: '10 Minutes' }
    ],
    formType: 'copies-certification'
  },
  {
    id: 'administrative-issuances',
    code: 'DSWD-FO1-AD-RAMS-SOP-06',
    title: 'Certification and Dissemination of Administrative Issuances',
    originalLabel: 'Certification and Dissemination of Administrative Issuances',
    description: 'Centralized numbering, electronic indexing, official stamping, regional publication, and circularization of Administrative Orders (AO), Memorandum Circulars (MC), Regional Memorandums, and Special Orders.',
    objective: 'To ensure all regional personnel receive prompt, verified, and legally binding copies of management policies and operational directives.',
    scope: 'All policy issuances originating from the Central Office or signed by the Regional Director.',
    legalBasis: [
      'DSWD Administrative Order No. 1 s. 2021 (Guidelines on Administrative Issuances)',
      'Revised Administrative Code of 1987'
    ],
    processingTime: 'Within 4 Hours from receipt of signed original issuance',
    clientType: 'All Field Office 1 Offices, Divisions, Centers, and Field Staff',
    fees: 'None',
    checklist: [
      'Original signed issuance with complete initial/routing slip',
      'Electronic copy (Word / PDF format) for digital repository upload',
      'Distribution list (All Staff / Specific Divisions)'
    ],
    steps: [
      { step: 1, activity: 'Receipt of approved and signed issuance from Office of the Regional Director (ORD)', responsiblePerson: 'ORD Liaison to RAMS', duration: '15 Minutes' },
      { step: 2, activity: 'Assignment of official issuance serial number, recording in Issuance Registry Book', responsiblePerson: 'RAMS Issuances Officer', duration: '20 Minutes' },
      { step: 3, activity: 'High-resolution PDF scanning, OCR conversion, and metadata tagging', responsiblePerson: 'RAMS Digital Archivist', duration: '30 Minutes' },
      { step: 4, activity: 'Uploading to Regional RAMS Portal repository and broadcast via official email bulletin', responsiblePerson: 'RAMS Web Administrator', duration: '1 Hour' },
      { step: 5, activity: 'Physical filing of original hard copy in fireproof Master Issuance Cabinet', responsiblePerson: 'RAMS Master File Custodian', duration: '30 Minutes' }
    ],
    formType: 'administrative-issuances'
  },
  {
    id: 'foi-request',
    code: 'DSWD-FO1-AD-RAMS-SOP-07',
    title: 'Provision of Freedom of Information (FOI) Request',
    originalLabel: 'Provision of Freedom of Information Request',
    description: 'Receiving, evaluating, processing, coordinating with content-owning divisions, and releasing requested public documents under the Freedom of Information program.',
    objective: 'To uphold the constitutional right of citizens to information on matters of public concern while observing legal exceptions and data privacy.',
    scope: 'All public information, official statistics, program updates, and reports held by DSWD Field Office 1.',
    legalBasis: [
      'Executive Order No. 2, s. 2016 (Operationalizing Freedom of Information)',
      'DSWD FOI People\'s Manual (Administrative Order No. 12, s. 2017)',
      'PCO-FOI Memorandum Circulars'
    ],
    processingTime: '15 Working Days (Extendable by up to 20 days for complex requests)',
    clientType: 'Filipino Citizens, Researchers, Students, NGOs, Media Personnel',
    fees: 'Free (Reasonable actual reproduction cost applies for voluminous paper photocopies)',
    checklist: [
      'Accomplished DSWD FOI Request Form (or eFOI portal electronic ticket)',
      'Two (2) Valid Government IDs showing photo and proof of identity',
      'Clear statement of purpose/justification for the requested information',
      'Non-disclosure / research undertaking for academic thesis inquiries'
    ],
    steps: [
      { step: 1, activity: 'Receipt and preliminary evaluation of FOI request at RAMS FOI Receiving Window or online portal', responsiblePerson: 'RAMS FOI Receiving Officer (FRO)', duration: '1 Day' },
      { step: 2, activity: 'Verification of request against the Inventory of Exceptions to FOI', responsiblePerson: 'FOI Decision Maker / Legal Unit', duration: '2 Days' },
      { step: 3, activity: 'Forwarding of request to concerned Program / Division for data consolidation', responsiblePerson: 'Action Division Focal', duration: '5-8 Days' },
      { step: 4, activity: 'Collation, review, and clearance of consolidated response document', responsiblePerson: 'RAMS FRO & Division Head', duration: '2 Days' },
      { step: 5, activity: 'Formal transmittal of official information package to applicant', responsiblePerson: 'RAMS FOI Receiving Officer', duration: '1 Day' }
    ],
    formType: 'foi-request'
  },
  {
    id: 'incoming-documents',
    code: 'DSWD-FO1-AD-RAMS-SOP-08',
    title: 'Processing of Incoming Documents',
    originalLabel: 'Processing of Incoming Documents',
    description: 'Centralized receipt, sanitation, inspection, digital barcoding, logging in the Document Management System (DMS), and expedited routing of external communications to concerned divisions.',
    objective: 'To guarantee that zero documents are misplaced, establish strict delivery accountability, and expedite executive decision-making.',
    scope: 'All letters, memorandums, court orders, project billings, citizen petitions, and parcels received from external stakeholders.',
    legalBasis: [
      'DSWD Guidelines on Document Tracking & Centralized Receiving',
      'Anti-Red Tape Act (ARTA) - Republic Act No. 11032 (3-7-20 Day Rule)'
    ],
    processingTime: 'Within 30 Minutes from physical receipt at Receiving Counter',
    clientType: 'External Agencies, LGUs, Suppliers, Beneficiaries, Private Citizens',
    fees: 'None',
    checklist: [
      'Two (2) physical copies of the document (1 Receiving copy for client, 1 Action copy for DSWD)',
      'Complete attachments and annexes indicated in the transmittal',
      'Complete contact information of sender (Email, Phone number, Address)'
    ],
    steps: [
      { step: 1, activity: 'Physical receiving, completeness check of attachments, and client receiving copy stamping', responsiblePerson: 'RAMS Frontline Receiving Clerk', duration: '5 Minutes' },
      { step: 2, activity: 'Generation and printing of unique Document Tracking Barcode Sticker', responsiblePerson: 'RAMS Receiving Clerk', duration: '5 Minutes' },
      { step: 3, activity: 'High-speed scanning and creation of digital ticket in DSWD Central DMS', responsiblePerson: 'RAMS Digital Scanning Aide', duration: '10 Minutes' },
      { step: 4, activity: 'Electronic notification and physical dispatch to designated Action Division / ORD', responsiblePerson: 'RAMS Document Courier', duration: '10 Minutes' },
      { step: 5, activity: 'Tracking of division compliance and acknowledgment receipt in system', responsiblePerson: 'RAMS Document Controller', duration: 'Continuous' }
    ],
    formType: 'incoming-documents'
  }
];
