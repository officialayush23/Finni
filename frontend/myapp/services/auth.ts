// // services/auth.ts
// import { supabase } from '../lib/supabase';
// import api from './api'; // Your axios instance
// import { CreateProfileRequest } from '../types/api';
// import { Alert } from 'react-native';

// export const AuthService = {
  
//   // 1. LOGIN (Supabase Only)
//   login: async (email: string, pass: string) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password: pass,
//     });
    
//     if (error) throw error;

//     // --- 🔍 DEBUG TOKEN FOR BACKEND SWAGGER ---
//     if (data.session?.access_token) {
//       console.log("\n⚠️ COPY THIS TOKEN FOR SWAGGER AUTHORIZE:\n");
//       console.log(data.session.access_token);
//       console.log("\n--------------------------------------------\n");
//     }
//     // ------------------------------------------

//     return data;
//   },

//   // 2. REGISTER (Supabase + Python Backend Sync)
//   register: async (email: string, pass: string, fullName: string) => {
//     // A. Create Auth User in Supabase
//     const { data: authData, error: authError } = await supabase.auth.signUp({
//       email,
//       password: pass,
//     });

//     if (authError) throw authError;
//     if (!authData.user) throw new Error("No user created");

//     // --- 🔍 DEBUG TOKEN FOR BACKEND SWAGGER ---
//     if (authData.session?.access_token) {
//       console.log("\n⚠️ COPY THIS TOKEN FOR SWAGGER AUTHORIZE:\n");
//       console.log(authData.session.access_token);
//       console.log("\n--------------------------------------------\n");
//     }
//     // ------------------------------------------

//     // B. Sync Profile to your Python Backend
//     try {
//       const profileData: CreateProfileRequest = {
//         full_name: fullName,
//         phone: "", // Optional
//         preferences: {},
//         metadata: { source: "mobile_register" }
//       };

//       // We manually set the token header here because the interceptor 
//       // might not have picked up the new session yet
//       await api.post('/api/v1/user/profile', profileData, {
//         headers: { Authorization: `Bearer ${authData.session?.access_token}` }
//       });
      
//     } catch (backendError) {
//       console.warn("Backend Sync Failed:", backendError);
//       Alert.alert("Note", "Account created, but profile sync failed. You can update it later.");
//     }

//     return authData;
//   },

//   // 3. LOGOUT
//   logout: async () => {
//     await supabase.auth.signOut();
//   }
// };


import { supabase } from '../lib/supabase';
import { api } from './api'; // <--- UPDATED IMPORT
import { CreateProfileRequest } from '../types/api';
import { Alert } from 'react-native';

export const AuthService = {
  
  // LOGIN
  login: async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) throw error;
    return data;
  },

  // REGISTER
  register: async (email: string, pass: string, fullName: string) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: pass,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("No user created");

    // Sync Profile to Python Backend
    try {
      const profileData: CreateProfileRequest = {
        full_name: fullName,
        phone: "",
        preferences: {},
        metadata: { source: "mobile_register" }
      };

      await api.post('/api/v1/user/profile', profileData, {
        headers: { Authorization: `Bearer ${authData.session?.access_token}` }
      });
      
    } catch (backendError) {
      console.warn("Backend Sync Failed:", backendError);
      Alert.alert("Note", "Account created, but profile sync failed.");
    }

    return authData;
  },

  // LOGOUT
  logout: async () => {
    await supabase.auth.signOut();
  }
};