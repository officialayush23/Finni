// services/userService.js
import { ApiService } from './apiService';

export const UserService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await ApiService.getUserProfile();
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      // Return mock data for development if API fails
      return {
        id: '1',
        email: 'user@example.com',
        full_name: 'Demo User',
        phone: '',
        preferences: {},
        incomes: [],
        investments: [],
        goals: []
      };
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await ApiService.updateUserProfile(profileData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Upsert profile
  upsertProfile: async (profileData) => {
    try {
      const response = await ApiService.upsertUserProfile(profileData);
      return response.data;
    } catch (error) {
      console.error('Upsert profile error:', error);
      throw error;
    }
  },

  // Onboarding
  completeOnboarding: async (onboardingData) => {
    try {
      const response = await ApiService.completeOnboarding(onboardingData);
      return response.data;
    } catch (error) {
      console.error('Onboarding error:', error);
      throw error;
    }
  },
};