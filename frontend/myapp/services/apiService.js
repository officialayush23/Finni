// services/apiService.js
import { api } from './api';

export const ApiService = {
  // Dashboard endpoints
  getDashboardOverview: () => api.get('/dashboard/overview'),
  getDashboardGoals: () => api.get('/dashboard/goals'),
  getDashboardInvestments: () => api.get('/dashboard/investments'),
  getDashboardScore: () => api.get('/dashboard/score'),
  getExpenseChart: () => api.get('/dashboard/charts/expenses'),
  getCategoryChart: () => api.get('/dashboard/charts/categories'),
  getInvestmentChart: () => api.get('/dashboard/charts/investments'),
  explainDashboard: (query) => api.post('/dashboard/explain', { query }),
  
  // User endpoints
  getUserProfile: () => api.get('/user/profile'),
  updateUserProfile: (data) => api.patch('/user/profile', data),
  upsertUserProfile: (data) => api.post('/user/profile', data),
  completeOnboarding: (data) => api.post('/user/onboarding', data),
  
  // Income endpoints
  getIncomes: () => api.get('/income'),
  createIncome: (data) => api.post('/income', data),
  updateIncome: (id, data) => api.patch(`/income/${id}`, data),
  
  // Investment endpoints
  getInvestments: () => api.get('/investments'),
  createInvestment: (data) => api.post('/investments', data),
  updateInvestment: (id, data) => api.patch(`/investments/${id}`, data),
  refreshInvestment: (id) => api.post(`/investments/${id}/refresh`),
  getInvestmentOverview: () => api.get('/investments/overview'),
  
  // Budget endpoints
  getBudgets: () => api.get('/budgets'),
  createBudget: (data) => api.post('/budgets', data),
  updateBudget: (id, data) => api.patch(`/budgets/${id}`, data),
  
  // Goal endpoints
  getGoals: () => api.get('/goals'),
  createGoal: (data) => api.post('/goals', data),
  allocateToGoal: (id, data) => api.post(`/goals/${id}/allocate`, data),
  getGoalFeasibility: (id) => api.get(`/goals/${id}/feasibility`),
  optimizeGoal: (id) => api.get(`/goals/${id}/optimize`),
  
  // Transaction endpoints
  getTransactions: () => api.get('/transactions'),
  createTransaction: (data) => api.post('/transactions', data),
  updateTransaction: (id, data) => api.patch(`/transactions/${id}`, data),
  
  // AI endpoints
  analyzeAsset: (symbol) => api.get(`/analysis/${symbol}`),
  chatWithAdvisor: (message) => api.post('/chat', { message }),
  
  // Ingestion endpoints
  ingestEvent: (source, data) => api.post(`/ingest/${source}`, data),
  ingestOCR: (data) => api.post('/ingest/ocr', data),
  
  // Generic methods
  get: (url) => api.get(url),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  patch: (url, data) => api.patch(url, data),
  delete: (url) => api.delete(url),

  // For CSV uploads specifically
  uploadCSV: async (formData) => {
    return axios.post('http://127.0.0.1:8000/api/v1/ingest/csv/', formData, {
      headers: {
        'Authorization': `Bearer ${yourToken}`,
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000,
    });
  }
};