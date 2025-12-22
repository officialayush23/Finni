// // // services/financeService.ts
// // import api from './api';
// // import { 
// //   UserProfile, 
// //   Income, AddIncomeRequest,
// //   Investment, CreateInvestmentRequest,
// //   Budget, CreateBudgetRequest,
// //   Transaction, CreateTransactionRequest,
// //   OnboardingRequest 
// // } from '../types/api';

// // export const FinanceService = {
  
// //   // --- 👤 USER PROFILE ---
// //   getProfile: async (): Promise<UserProfile> => {
// //     const response = await api.get('/api/v1/user/profile');
// //     return response.data;
// //   },

// //   submitOnboarding: async (data: OnboardingRequest) => {
// //     const response = await api.post('/api/v1/user/onboarding', data);
// //     return response.data;
// //   },

// //   // --- 💰 INCOME ---
// //   addIncome: async (data: AddIncomeRequest): Promise<Income> => {
// //     const response = await api.post('/api/v1/income/', data);
// //     return response.data;
// //   },

// //   // --- 📈 INVESTMENTS ---
// //   getInvestments: async (): Promise<Investment[]> => {
// //     const response = await api.get('/api/v1/investments/');
// //     return response.data;
// //   },

// //   addInvestment: async (data: CreateInvestmentRequest): Promise<Investment> => {
// //     const response = await api.post('/api/v1/investments/', data);
// //     return response.data;
// //   },

// //   refreshInvestment: async (id: string) => {
// //     // Triggers backend to fetch latest price from external APIs
// //     const response = await api.post(`/api/v1/investments/${id}/refresh`);
// //     return response.data;
// //   },

// //   // --- 📉 BUDGETS ---
// //   getBudgets: async (): Promise<Budget[]> => {
// //     const response = await api.get('/api/v1/budgets/');
// //     return response.data;
// //   },

// //   createBudget: async (data: CreateBudgetRequest): Promise<Budget> => {
// //     const response = await api.post('/api/v1/budgets/', data);
// //     return response.data;
// //   },

// //   // --- 💳 TRANSACTIONS ---
// //   getTransactions: async (startDate?: string, endDate?: string): Promise<Transaction[]> => {
// //     const params = new URLSearchParams();
// //     if (startDate) params.append('start_date', startDate);
// //     if (endDate) params.append('end_date', endDate);
    
// //     const response = await api.get(`/api/v1/transactions/?${params.toString()}`);
// //     return response.data;
// //   },

// //   createTransaction: async (data: CreateTransactionRequest): Promise<Transaction> => {
// //     const response = await api.post('/api/v1/transactions/', data);
// //     return response.data;
// //   }
// // };


// import { api } from './api'; // <--- UPDATED IMPORT
// import { 
//   UserProfile, 
//   Income, AddIncomeRequest,
//   Investment, CreateInvestmentRequest,
//   Budget, CreateBudgetRequest,
//   Transaction, CreateTransactionRequest,
//   OnboardingRequest 
// } from '../types/api';

// export const FinanceService = {
  
//   getProfile: async (): Promise<UserProfile> => {
//     const response = await api.get('/api/v1/user/profile');
//     return response.data;
//   },

//   submitOnboarding: async (data: OnboardingRequest) => {
//     const response = await api.post('/api/v1/user/onboarding', data);
//     return response.data;
//   },

//   addIncome: async (data: AddIncomeRequest): Promise<Income> => {
//     const response = await api.post('/api/v1/income/', data);
//     return response.data;
//   },

//   getInvestments: async (): Promise<Investment[]> => {
//     const response = await api.get('/api/v1/investments/');
//     return response.data;
//   },

//   addInvestment: async (data: CreateInvestmentRequest): Promise<Investment> => {
//     const response = await api.post('/api/v1/investments/', data);
//     return response.data;
//   },

//   refreshInvestment: async (id: string) => {
//     const response = await api.post(`/api/v1/investments/${id}/refresh`);
//     return response.data;
//   },

//   getBudgets: async (): Promise<Budget[]> => {
//     const response = await api.get('/api/v1/budgets/');
//     return response.data;
//   },

//   createBudget: async (data: CreateBudgetRequest): Promise<Budget> => {
//     const response = await api.post('/api/v1/budgets/', data);
//     return response.data;
//   },

//   getTransactions: async (startDate?: string, endDate?: string): Promise<Transaction[]> => {
//     const params = new URLSearchParams();
//     if (startDate) params.append('start_date', startDate);
//     if (endDate) params.append('end_date', endDate);
    
//     const response = await api.get(`/api/v1/transactions/?${params.toString()}`);
//     return response.data;
//   },

//   createTransaction: async (data: CreateTransactionRequest): Promise<Transaction> => {
//     const response = await api.post('/api/v1/transactions/', data);
//     return response.data;
//   }
// };



// services/financeService.ts
import { api } from './api';
import { 
  CreateTransactionRequest , Transaction ,
  Budget, CreateBudgetRequest, UpdateBudgetRequest ,
  Income, CreateIncomeRequest, UpdateIncomeRequest ,
  Investment, CreateInvestmentRequest, UpdateInvestmentRequest
} from '../types/api';

export const FinanceService = {

  // --- INCOME ENDPOINTS ---

  // GET /api/v1/income/
  getIncomes: async (): Promise<Income[]> => {
    const response = await api.get('/api/v1/income/');
    return response.data;
  },

  // POST /api/v1/income/
  addIncome: async (data: CreateIncomeRequest): Promise<Income> => {
    const response = await api.post('/api/v1/income/', data);
    return response.data;
  },

  // PATCH /api/v1/income/{id}
  updateIncome: async (id: string, data: UpdateIncomeRequest): Promise<string> => {
    const response = await api.patch(`/api/v1/income/${id}`, data);
    return response.data;
  },

  // ... (Keep existing methods for Investments/Transactions/Profile)
  // 1. GET ALL
  getInvestments: async (): Promise<Investment[]> => {
    const response = await api.get('/api/v1/investments/');
    return response.data;
  },

  // 2. CREATE (Add new Asset)
  addInvestment: async (data: CreateInvestmentRequest): Promise<Investment> => {
    const response = await api.post('/api/v1/investments/', data);
    return response.data;
  },

  // 3. UPDATE (Edit quantity/price/pin)
  updateInvestment: async (id: string, data: UpdateInvestmentRequest): Promise<string> => {
    const response = await api.patch(`/api/v1/investments/${id}`, data);
    return response.data;
  },

  // 4. REFRESH (Force update current price)
  refreshInvestment: async (id: string): Promise<string> => {
    const response = await api.post(`/api/v1/investments/${id}/refresh`);
    return response.data;
  },

  // 1. GET ALL
  getBudgets: async (): Promise<Budget[]> => {
    const response = await api.get('/api/v1/budgets/');
    return response.data;
  },

  // 2. CREATE
  createBudget: async (data: CreateBudgetRequest): Promise<Budget> => {
    const response = await api.post('/api/v1/budgets/', data);
    return response.data;
  },

  // 3. UPDATE
  updateBudget: async (id: string, data: UpdateBudgetRequest): Promise<string> => {
    const response = await api.patch(`/api/v1/budgets/${id}`, data);
    return response.data;
  },

  // --- TRANSACTIONS ---
  getTransactions: async (startDate?: string, endDate?: string): Promise<Transaction[]> => {
    const response = await api.get('/api/v1/transactions/', {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data;
  },

  createTransaction: async (data: CreateTransactionRequest): Promise<Transaction> => {
    const response = await api.post('/api/v1/transactions/', data);
    return response.data;
  },

  updateTransaction: async (id: string, data: Partial<CreateTransactionRequest>): Promise<Transaction> => {
    const response = await api.patch(`/api/v1/transactions/${id}`, data);
    return response.data;
  }
};
