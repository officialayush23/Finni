// // // // types/api.ts

// // // // --- USER & PROFILE ---
// // // export interface UserProfile {
// // //   id: string;
// // //   email: string;
// // //   full_name?: string;
// // //   phone?: string;
// // //   preferences?: Record<string, any>;
// // //   incomes?: Income[];
// // //   investments?: Investment[];
// // // }

// // // export interface CreateProfileRequest {
// // //   full_name: string;
// // //   phone?: string;
// // //   preferences?: object;
// // //   metadata?: object;
// // // }

// // // export interface OnboardingRequest {
// // //   profile: {
// // //     full_name: string;
// // //     phone?: string;
// // //     currency: string;
// // //     risk_profile: string;
// // //   };
// // //   incomes: { name: string; yearly_amount: number }[];
// // //   investments: CreateInvestmentRequest[]; // Reusing investment schema
// // //   budget_preferences: {
// // //     daily_food_budget: number;
// // //     monthly_discretionary_budget: number;
// // //     exclude_from_food: string[];
// // //   };
// // // }

// // // // --- INCOME ---
// // // export interface Income {
// // //   id: string;
// // //   name: string;
// // //   source_type: string;
// // //   rate_type: 'fixed' | 'hourly';
// // //   estimated_monthly_amount: number;
// // //   is_active: boolean;
// // // }

// // // export interface AddIncomeRequest {
// // //   name: string;
// // //   source_type: string;
// // //   rate_type: 'fixed' | 'hourly';
// // //   estimated_monthly_amount: number;
// // // }

// // // // --- INVESTMENTS ---
// // // export interface Investment {
// // //   id: string;
// // //   asset_type: string; // 'stock', 'crypto', etc.
// // //   identifier: string; // 'AAPL', 'BTC'
// // //   name: string;
// // //   quantity: number;
// // //   avg_buy_price: number;
// // //   current_value: number;
// // //   expected_annual_return?: number;
// // //   risk_level?: string;
// // //   is_pinned?: boolean;
// // //   last_api_fetch?: string;
// // // }

// // // export interface CreateInvestmentRequest {
// // //   asset_type: string;
// // //   identifier: string;
// // //   name: string;
// // //   quantity: number;
// // //   avg_buy_price: number;
// // //   expected_annual_return?: number;
// // //   risk_level?: string;
// // //   is_pinned?: boolean;
// // // }

// // // // --- AI ANALYSIS (PROPHET + NEWS) ---
// // // export interface AnalysisResponse {
// // //   symbol: string;
// // //   metrics: {
// // //     current_price: number;
// // //     predicted_price_30d: number;
// // //     growth_percentage: number;
// // //     risk_score: number;
// // //   };
// // //   graph_data: {
// // //     date: string;
// // //     price: number;
// // //     type: 'actual' | 'predicted';
// // //     confidence_lower?: number;
// // //     confidence_upper?: number;
// // //   }[];
// // //   news: {
// // //     title: string;
// // //     source: string;
// // //     sentiment: 'positive' | 'negative' | 'neutral';
// // //     score: number;
// // //   }[];
// // // }

// // // // --- BUDGETS ---
// // // export interface Budget {
// // //   id: string;
// // //   name: string;
// // //   limit_amount: number;
// // //   period: 'monthly' | 'weekly' | 'yearly';
// // //   spent: number;
// // //   remaining: number;
// // //   percentage_used: number;
// // //   is_active: boolean;
// // // }

// // // export interface CreateBudgetRequest {
// // //   name: string;
// // //   limit_amount: number;
// // //   period: 'monthly' | 'weekly' | 'yearly';
// // //   alert_threshold?: number;
// // //   included_category_ids?: string[];
// // //   excluded_category_ids?: string[];
// // // }

// // // // --- TRANSACTIONS ---
// // // export interface Transaction {
// // //   id: string;
// // //   amount: number;
// // //   currency: string;
// // //   occurred_at: string; // ISO Date
// // //   description: string;
// // //   merchant_raw?: string;
// // //   category_id?: string;
// // //   source: 'manual' | 'bank_sync';
// // // }

// // // export interface CreateTransactionRequest {
// // //   amount: number;
// // //   currency?: string;
// // //   occurred_at?: string;
// // //   description: string;
// // //   category_id?: string;
// // //   merchant_raw?: string;
// // //   source?: 'manual';
// // // }

// // // // --- CHAT ---
// // // export interface ChatRequest {
// // //   message: string;
// // //   session_id?: string;
// // // }

// // // export interface ChatResponse {
// // //   response: string;
// // //   session_id: string;
// // // }


// // import axios from 'axios';
// // import { supabase } from '../lib/supabase';

// // // ---------------------------------------------------------------------------
// // // 🔧 CONFIGURATION
// // // ---------------------------------------------------------------------------
// // // REPLACE THIS with your computer's local IP address (e.g., http://192.168.1.5:8000)
// // const BASE_URL = 'http://10.192.198.195'; 

// // // 1. Create the Axios Instance (Exported as a NAMED constant)
// // export const api = axios.create({
// //   baseURL: BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// //   timeout: 10000, // 10 seconds timeout
// // });

// // // 2. Request Interceptor (Attaches Supabase Token)
// // api.interceptors.request.use(
// //   async (config) => {
// //     const { data } = await supabase.auth.getSession();
// //     const token = data.session?.access_token;

// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
    
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );




// // services/api.ts
// import axios from 'axios';
// import { supabase } from '../lib/supabase';

// // ⚠️ UPDATED TO YOUR NEW IP
// const BASE_URL = 'http://10.108.157.195:8000'; 

// export const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000, 
// });

// // Auth Interceptor (Stays the same)
// api.interceptors.request.use(
//   async (config) => {
//     const { data } = await supabase.auth.getSession();
//     const token = data.session?.access_token;
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// services/api.ts
import axios from 'axios';
import { supabase } from '../lib/supabase';

// ⚠️ YOUR CURRENT IP
const BASE_URL = 'http://10.108.157.195:8000'; 

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
      // 🟢 LOG THE TOKEN TO TERMINAL
      console.log("\n🔑 OUTGOING REQUEST TOKEN:");
      console.log(token);
      console.log("---------------------------------------------------");
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

