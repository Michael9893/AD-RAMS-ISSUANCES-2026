export interface PdfDoc {
  id: string;
  title: string;
  lastModified: string;
  author: string;
  fileUrl?: string;
  fileSize?: string;
  isCustomUploaded?: boolean;
}
