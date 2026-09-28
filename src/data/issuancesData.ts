export interface IssuanceItem {
  rsoNo: number;
  drn: string;
  subject: string;
  description: string;
  concernedStaff: string;
  preparedByOdsu: string;
  receivedPrintedBy?: string;
  datePrinted?: string;
  status?: string;
}

// Initialized empty as requested: "remove the inputed in the regional special order cy 20206 order and only the admin can input in it"
export const ISSUANCES_CY_2026: IssuanceItem[] = [];
