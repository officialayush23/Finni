// services/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

export const AuthService = {
  // Sign up with email and password
  signUp: async (email, password, userData = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear any additional stored data
      await AsyncStorage.removeItem('onboarding_complete');
      await AsyncStorage.removeItem('user_preferences');
      
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },

  // Get current session
  getSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    try {
      const session = await AuthService.getSession();
      return !!session;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  },

  // Forgot password
  resetPassword: async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'myapp://reset-password',
      });
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  // Update password
  updatePassword: async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: profileData,
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Store custom data in AsyncStorage
  setStorageItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Set storage error:', error);
      throw error;
    }
  },

  // Get custom data from AsyncStorage
  getStorageItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Get storage error:', error);
      throw error;
    }
  },

  // Remove custom data from AsyncStorage
  removeStorageItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Remove storage error:', error);
      throw error;
    }
  },
};