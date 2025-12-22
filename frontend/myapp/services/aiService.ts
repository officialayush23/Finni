// // services/aiService.ts
// import api from './api';
// import { ChatResponse, AnalysisResponse } from '../types/api';

// export const AiService = {
  
//   // --- 🤖 AI CHAT ---
//   // Connects to: POST /api/v1/chat/
//   sendMessage: async (message: string, sessionId?: string): Promise<ChatResponse> => {
//     const response = await api.post('/api/v1/chat/', {
//       message,
//       session_id: sessionId
//     });
//     return response.data;
//   },

//   // --- 📊 MARKET ANALYSIS ---
//   // Connects to: GET /api/v1/analysis/{symbol}
//   // Returns: Prophet Price Prediction + FinBERT News Sentiment
//   analyzeAsset: async (symbol: string, assetType: string = 'stock'): Promise<AnalysisResponse> => {
//     // Example: /api/v1/analysis/AAPL?asset_type=stock
//     const response = await api.get(`/api/v1/analysis/${symbol}`, {
//       params: { asset_type: assetType }
//     });
//     return response.data;
//   },

//   // --- 💓 HEALTH CHECK ---
//   // Connects to: GET /api/v1/ingest/health
//   // Used to show the "AI Core Status" on your dashboard
//   checkSystemHealth: async (): Promise<boolean> => {
//     try {
//       const response = await api.get('/api/v1/ingest/health');
//       // If it returns 200 OK, the system is alive
//       return response.status === 200;
//     } catch (e) {
//       return false;
//     }
//   }
// };


import { api } from './api'; // <--- UPDATED IMPORT
import { ChatResponse, AnalysisResponse } from '../types/api';

export const AiService = {
  
  sendMessage: async (message: string, sessionId?: string): Promise<ChatResponse> => {
    const response = await api.post('/api/v1/chat/', {
      message,
      session_id: sessionId
    });
    return response.data;
  },

  analyzeAsset: async (symbol: string, assetType: string = 'stock'): Promise<AnalysisResponse> => {
    const response = await api.get(`/api/v1/analysis/${symbol}`, {
      params: { asset_type: assetType }
    });
    return response.data;
  },

  checkSystemHealth: async (): Promise<boolean> => {
    try {
      const response = await api.get('/api/v1/ingest/health');
      return response.status === 200;
    } catch (e) {
      return false;
    }
  }
};