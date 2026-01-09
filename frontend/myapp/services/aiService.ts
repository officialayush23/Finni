// services/aiService.ts
import { ApiService } from './apiService';

export const AiService = {
  // Check system health - returns true/false without throwing
  checkSystemHealth: async (): Promise<boolean> => {
    try {
      // Just do a simple HEAD or GET request to check if API is reachable
      await ApiService.getDashboardOverview();
      return true;
    } catch (error: any) {
      console.log('System health check failed:', error.message);
      return false;
    }
  },

  // Explain dashboard
  explainDashboard: async (query: string) => {
    try {
      const response = await ApiService.explainDashboard(query);
      return response.data;
    } catch (error: any) {
      console.error('Explain dashboard error:', error.message);
      throw error;
    }
  },

  // Analyze asset
  analyzeAsset: async (symbol: string) => {
    try {
      const response = await ApiService.analyzeAsset(symbol);
      return response.data;
    } catch (error: any) {
      console.error('Analyze asset error:', error.message);
      throw error;
    }
  },

  // Chat with AI advisor
  chatWithAdvisor: async (message: string) => {
    try {
      const response = await ApiService.chatWithAdvisor(message);
      return response.data;
    } catch (error: any) {
      console.error('Chat error:', error.message);
      throw error;
    }
  },
};