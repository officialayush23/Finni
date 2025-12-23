// // // services/userService.ts
// // import api from './api';
// // import { UserProfile, CreateProfileRequest, OnboardingRequest } from '../types/api';

// // export const UserService = {
  
// //   // GET /api/v1/user/profile
// //   // Fetches full profile including connected incomes/investments
// //   getProfile: async (): Promise<UserProfile> => {
// //     const response = await api.get('/api/v1/user/profile');
// //     return response.data;
// //   },

// //   // POST /api/v1/user/profile
// //   // Used for initial creation or full overwrite
// //   upsertProfile: async (data: CreateProfileRequest): Promise<UserProfile> => {
// //     const response = await api.post('/api/v1/user/profile', data);
// //     return response.data;
// //   },

// //   // PATCH /api/v1/user/profile
// //   // Used for partial updates (Name, Phone, etc.)
// //   updateProfile: async (data: Partial<CreateProfileRequest>) => {
// //     const response = await api.patch('/api/v1/user/profile', data);
// //     return response.data;
// //   },

// //   // POST /api/v1/user/onboarding
// //   // Complex setup: Sets profile + adds initial income/budget/investments in one go
// //   submitOnboarding: async (data: OnboardingRequest) => {
// //     const response = await api.post('/api/v1/user/onboarding', data);
// //     return response.data;
// //   }
// // };


// import { api } from './api'; // <--- UPDATED IMPORT
// import { UserProfile, CreateProfileRequest, OnboardingRequest } from '../types/api';

// export const UserService = {
  
//   getProfile: async (): Promise<UserProfile> => {
//     const response = await api.get('/api/v1/user/profile');
//     return response.data;
//   },

//   upsertProfile: async (data: CreateProfileRequest): Promise<UserProfile> => {
//     const response = await api.post('/api/v1/user/profile', data);
//     return response.data;
//   },

//   updateProfile: async (data: Partial<CreateProfileRequest>) => {
//     const response = await api.patch('/api/v1/user/profile', data);
//     return response.data;
//   },

//   submitOnboarding: async (data: OnboardingRequest) => {
//     const response = await api.post('/api/v1/user/onboarding', data);
//     return response.data;
//   }
// };


// // services/userService.ts
// import { api } from './api'; 
// import { UserProfile, CreateProfileRequest, OnboardingRequest } from '../types/api';

// export const UserService = {
  
//   // 1. GET Profile
//   getProfile: async (): Promise<UserProfile> => {
//     const response = await api.get('/api/v1/user/profile');
//     return response.data;
//   },

//   // 2. POST Profile (Upsert/Create)
//   upsertProfile: async (data: CreateProfileRequest): Promise<UserProfile> => {
//     const response = await api.post('/api/v1/user/profile', data);
//     return response.data;
//   },

//   // 3. PATCH Profile (Update details)
//   updateProfile: async (data: Partial<CreateProfileRequest>) => {
//     const response = await api.patch('/api/v1/user/profile', data);
//     return response.data;
//   },

//   // 4. POST Onboarding (Initial Setup)
//   submitOnboarding: async (data: OnboardingRequest) => {
//     const response = await api.post('/api/v1/user/onboarding', data);
//     return response.data;
//   }
// };


// services/userService.js
import { api } from './api';

export const UserService = {
  getProfile: async () => {
    const response = await api.get('/api/v1/user/profile');
    return response.data;
  },

  // Use this for "Save Changes"
  updateProfile: async (payload) => {
    // payload should be { full_name, phone, preferences: {} }
    const response = await api.patch('/api/v1/user/profile', payload);
    return response.data;
  },

  // Use this if you want to overwrite everything
  upsertProfile: async (payload) => {
    const response = await api.post('/api/v1/user/profile', payload);
    return response.data;
  }
};