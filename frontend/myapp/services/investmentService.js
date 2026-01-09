import { api } from './api';

export const investmentService = {
  // GET /api/v1/investments/ - List all holdings
  listInvestments: () => api.get('/investments/'),

  // POST /api/v1/investments/ - Create a new holding
  createInvestment: (data) => api.post('/investments/', data),

  // PATCH /api/v1/investments/{investment_id} - Update quantity/price
  updateInvestment: (id, data) => api.patch(`/investments/${id}`, data),

  // POST /api/v1/investments/{investment_id}/refresh - Force live price update
  refreshInvestment: (id) => api.post(`/investments/${id}/refresh`),

  // GET /api/v1/investments/overview - Total portfolio performance
  getOverview: () => api.get('/investments/overview'),

  // --- AI ANALYSIS ADD-ON ---
  // GET /api/v1/analysis/{symbol} - Growth prediction & Sentiment
  analyzeAsset: (symbol, assetType = 'stock') => 
    api.get(`/analysis/${symbol}`, { 
      params: { asset_type: assetType } 
    })
};