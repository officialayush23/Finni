import { api } from './api';

export const financeService = {
  // --- INCOME APIs ---
  // GET /api/v1/income/
  listIncomes: () => api.get('/income/'),
  // POST /api/v1/income/
  createIncome: (data) => api.post('/income/', data),
  // PATCH /api/v1/income/{income_id}
  updateIncome: (id, data) => api.patch(`/income/${id}`, data),

  // --- BUDGET APIs ---
  // GET /api/v1/budgets/
  listBudgets: () => api.get('/budgets/'),
  // POST /api/v1/budgets/
  createBudget: (data) => api.post('/budgets/', data),
  // PATCH /api/v1/budgets/{budget_id}
  updateBudget: (id, data) => api.patch(`/budgets/${id}`, data),

  // --- GOAL APIs ---
  // GET /api/v1/goals/
  listGoals: () => api.get('/goals/'),
  // POST /api/v1/goals/
  createGoal: (data) => api.post('/goals/', data),
  // POST /api/v1/goals/{goal_id}/allocate
  allocateGoal: (id, data) => api.post(`/goals/${id}/allocate`, data),
  // GET /api/v1/goals/{goal_id}/feasibility (AI Check)
  getGoalFeasibility: (id) => api.get(`/goals/${id}/feasibility`),
  // GET /api/v1/goals/{goal_id}/optimize (AI Advice)
  optimizeGoal: (id) => api.get(`/goals/${id}/optimize`),

  // --- TRANSACTION APIs ---
  // GET /api/v1/transactions/
  listTransactions: (params) => api.get('/transactions/', { params }),
  // POST /api/v1/transactions/
  createTransaction: (data) => api.post('/transactions/', data),
  // PATCH /api/v1/transactions/{txn_id}
  updateTransaction: (id, data) => api.patch(`/transactions/${id}`, data),
};