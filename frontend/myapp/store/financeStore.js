import { create } from 'zustand';
import { dashboardService } from '../services/dashboardService';
import { financeService } from '../services/financeService';

export const useFinanceStore = create((set) => ({
  dashboard: null,
  score: 0,
  goals: [],
  loading: false,

  refreshDashboard: async () => {
    set({ loading: true });
    try {
      // 1. Fetch data from your new APIs
      const [overview, scoreRes, goalsRes] = await Promise.all([
        dashboardService.getOverview(),
        dashboardService.getFinanceScore(),
        financeService.listGoals()
      ]);

      // 2. Update the "Brain"
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
  }
}));