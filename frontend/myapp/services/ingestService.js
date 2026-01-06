import { api } from './api';

export const ingestService = {
  /**
   * POST /api/v1/ingest/{source}
   * @param {string} source - e.g., 'sms', 'manual'
   * @param {string} rawText - The raw text to parse
   * @param {string} sender - The sender ID (optional)
   */
  ingestEvent: (source, rawText, sender = null) => {
    return api.post(`/ingest/${source}`, null, {
      params: {
        raw_text: rawText,
        sender: sender
      }
    });
  },

  /**
   * POST /api/v1/ingest/ocr
   * Handles multipart/form-data for receipt images
   */
  ingestOCR: (fileUri) => {
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      type: 'image/jpeg',
      name: 'receipt.jpg',
    });

    return api.post('/ingest/ocr', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};