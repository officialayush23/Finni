import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // Action to fetch profile from GET /api/v1/user/profile
  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/user/profile');
      set({ user: response.data, loading: false });
    } catch (err) {
      set({ 
        error: err.response?.data?.detail || "Could not load profile", 
        loading: false 
      });
    }
  },

  // Action to update local state after a PATCH or POST
  setUser: (userData) => set({ user: userData }),

  // Action to Logout
  logout: async () => {
    await AsyncStorage.removeItem('userToken');
    set({ user: null });
  }
}));