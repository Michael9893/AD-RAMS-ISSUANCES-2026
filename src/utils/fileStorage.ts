// Robust IndexedDB & memory file storage
// Avoids 5MB localStorage limits and handles File/Blob storage safely

const DB_NAME = 'AD_RAMS_STORAGE_DB';
const DB_VERSION = 2;
const STORE_NAME = 'blobs';

// Memory cache fallback for iframes or environments where IndexedDB is blocked
const memoryBlobCache = new Map<string, Blob>();
const memoryUrlCache = new Map<string, string>();

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Failed to open database'));
  });
}

/**
 * Save a File or Blob with a unique identifier
 */
export async function saveFileBlob(id: string, fileOrBlob: Blob | File): Promise<void> {
  memoryBlobCache.set(id, fileOrBlob);
  // Also create and cache an object URL for immediate use
  try {
    const existingUrl = memoryUrlCache.get(id);
    if (existingUrl) {
      URL.revokeObjectURL(existingUrl);
    }
    const url = URL.createObjectURL(fileOrBlob);
    memoryUrlCache.set(id, url);
  } catch (err) {
    console.warn('Could not create ObjectURL:', err);
  }

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(fileOrBlob, id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB save failed, stored in memory cache:', err);
  }
}

/**
 * Retrieve a stored Blob
 */
export async function getFileBlob(id: string): Promise<Blob | null> {
  if (memoryBlobCache.has(id)) {
    return memoryBlobCache.get(id) || null;
  }
  try {
    const db = await openDB();
    return await new Promise<Blob | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => {
        const result = req.result;
        if (result instanceof Blob) {
          memoryBlobCache.set(id, result);
          resolve(result);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Get a usable object URL for viewing or downloading the file
 */
export async function getFileUrl(id: string): Promise<string | null> {
  if (memoryUrlCache.has(id)) {
    return memoryUrlCache.get(id) || null;
  }
  const blob = await getFileBlob(id);
  if (blob) {
    try {
      const url = URL.createObjectURL(blob);
      memoryUrlCache.set(id, url);
      return url;
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Remove a stored file
 */
export async function deleteFile(id: string): Promise<void> {
  const url = memoryUrlCache.get(id);
  if (url) {
    try {
      URL.revokeObjectURL(url);
    } catch {}
    memoryUrlCache.delete(id);
  }
  memoryBlobCache.delete(id);

  try {
    const db = await openDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {}
}

/**
 * Legacy support for DataURL reading if needed
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// Backward compatibility aliases
export const saveFileToDB = async (id: string, dataUrl: string) => {
  // convert dataUrl to Blob and save
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    await saveFileBlob(id, blob);
  } catch {
    // fallback
  }
};

export const getFileFromDB = getFileUrl;
export const deleteFileFromDB = deleteFile;
