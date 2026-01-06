import { api } from './api';

export const dashboardService = {
  // GET /api/v1/dashboard/overview - Main summary cards
  getOverview: () => api.get('/dashboard/overview'),

  // GET /api/v1/dashboard/goals - Status of active goals
  getGoals: () => api.get('/dashboard/goals'),

  // GET /api/v1/dashboard/investments - Recent portfolio performance
  getInvestments: () => api.get('/dashboard/investments'),

  // GET /api/v1/dashboard/score - The Finance Score (0-100)
  getFinanceScore: () => api.get('/dashboard/score'),

  // --- CHART DATA ---
  // GET /api/v1/dashboard/charts/expenses
  getExpenseCharts: () => api.get('/dashboard/charts/expenses'),
  
  // GET /api/v1/dashboard/charts/categories
  getCategoryCharts: () => api.get('/dashboard/charts/categories'),
  
  // GET /api/v1/dashboard/charts/investments
  getInvestmentCharts: () => api.get('/dashboard/charts/investments'),

  // --- AI INSIGHTS ---
  // POST /api/v1/dashboard/explain - AI summary of your dashboard
  explainDashboard: () => api.post('/dashboard/explain')
};