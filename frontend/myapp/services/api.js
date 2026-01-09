import axios from 'axios';
import { supabase } from '../lib/supabase';

// 🚀 Use 10.0.2.2 for Android Emulator, or your Local IP for Physical Devices
const BASE_URL = "http://10.0.2.2:8000/api/v1";  

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 
    'Content-Type': 'application/json' 
  },
  timeout: 15000, 
});

// --- REQUEST INTERCEPTOR ---
api.interceptors.request.use(
  async (config) => {
    // Get the current session from Supabase
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (token) {
      // 🟢 ATTACH TOKEN TO HEADERS
      config.headers.Authorization = `Bearer ${token}`;
      
      // 🟢 PRINT TOKEN TO TERMINAL (METRO LOGS)
      console.log("\n------------------ OUTGOING JWT TOKEN ------------------");
      console.log(token);
      console.log("--------------------------------------------------------\n");
    } else {
      console.warn("⚠️ No active Supabase session found.");
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- RESPONSE INTERCEPTOR ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("❌ UNAUTHORIZED: Token is invalid or has expired.");
    }
    return Promise.reject(error);
  }
);