import { create } from 'zustand';
import { userService } from '../services/userService';

export const useUserStore = create((set) => ({
  user: null,
  loading: false,

  fetchProfile: async () => {
    set({ loading: true });
    try {
      const res = await userService.getProfile();
      set({ user: res.data, loading: false });
    } catch (e) {
      set({ loading: false });
    }
  }
}));