// types/api.ts

// // Matches: POST /api/v1/user/profile
// export interface UserProfile {
//   id?: string;
//   email?: string;
//   full_name?: string;
//   phone?: string;
//   preferences?: Record<string, any>;
//   metadata?: Record<string, any>;
// }

// // Matches: POST /api/v1/user/profile Request Body
// export interface CreateProfileRequest {
//   full_name: string;
//   phone?: string;
//   preferences?: object;
//   metadata?: object;
// }


// types/api.ts

export interface Income {
  id?: string;
  name: string;
  estimated_monthly_amount: number;
  rate_type: string;
}

export interface Investment {
  id?: string;
  identifier: string;
  asset_type: string;
  current_value: number;
  quantity: number;
  avg_buy_price: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  preferences?: Record<string, any>;
  incomes?: Income[];
  investments?: Investment[];
}

export interface CreateProfileRequest {
  full_name: string;
  phone?: string;
  preferences?: object;
  metadata?: object;
}

export interface OnboardingRequest {
  profile: {
    full_name: string;
    phone?: string;
    currency: string;
    risk_profile: string;
  };
  incomes: { name: string; yearly_amount: number }[];
  investments: any[]; 
  budget_preferences: any;
}


// types/api.ts

// --- INCOME ---
export interface Income {
  id: string;
  name: string;
  source_type: string; // 'salary', 'freelance', 'business', etc.
  rate_type: string;   // 'fixed', 'hourly'
  estimated_monthly_amount: number;
  is_active: boolean;
}

export interface CreateIncomeRequest {
  name: string;
  source_type: string;
  rate_type: string;
  estimated_monthly_amount: number;
  api_source_identifier?: string;
}

export interface UpdateIncomeRequest {
  estimated_monthly_amount?: number;
  is_active?: boolean;
}


export type AssetType = 'stock' | 'crypto' | 'bond' | 'mutual_fund' | 'gold' | 'real_estate';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Investment {
  id: string;
  asset_type: AssetType; 
  identifier: string; // e.g. "AAPL", "BTC"
  name: string;       // e.g. "Apple Inc."
  quantity: number;
  avg_buy_price: number;
  current_value: number;
  expected_annual_return: number;
  risk_level: RiskLevel;
  is_pinned: boolean;
  last_api_fetch?: string;
}

export interface CreateInvestmentRequest {
  asset_type: string;
  identifier: string;
  name: string;
  quantity: number;
  avg_buy_price: number;
  expected_annual_return?: number;
  risk_level?: string;
  is_pinned?: boolean;
}

export interface UpdateInvestmentRequest {
  quantity?: number;
  avg_buy_price?: number;
  expected_annual_return?: number;
  risk_level?: string;
  is_pinned?: boolean;
}