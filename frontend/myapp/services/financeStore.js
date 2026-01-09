import { create } from 'zustand';
import { dashboardService } from '../services/dashboardService';
import { financeService } from '../services/financeService';

export const useFinanceStore = create((set, get) => ({
  // --- STATE ---
  dashboard: null,
  score: 0,
  transactions: [],
  goals: [],
  loading: false,

  // --- ACTIONS ---
  
  // Fetch everything needed for the Home Screen
  refreshDashboard: async () => {
    set({ loading: true });
    try {
      const [overview, scoreRes, goalsRes] = await Promise.all([
        dashboardService.getOverview(),
        dashboardService.getFinanceScore(),
        financeService.listGoals()
      ]);

      set({ 
        dashboard: overview.data, 
        score: scoreRes.data, 
        goals: goalsRes.data,
        loading: false 
      });
    } catch (error) {
      console.error("Finance Store Sync Error:", error);
      set({ loading: false });
    }
  },

  // Specialized fetch for the Transactions Tab
  fetchTransactions: async (params = {}) => {
    set({ loading: true });
    try {
      const res = await financeService.listTransactions(params);
      set({ transactions: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  }
}));