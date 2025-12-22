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

// types/api.ts

// --- AI ANALYSIS ---
export interface GraphPoint {
  date: string;
  price: number;
  type: 'historical' | 'predicted';
  confidence_lower?: number;
  confidence_upper?: number;
}

export interface AnalysisMetrics {
  current_price: number;
  predicted_price_30d: number;
  growth_percentage: number;
  risk_score: number; // 0-100
}

export interface NewsItem {
  title: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
}

export interface AnalysisResponse {
  symbol: string;
  graph_data: GraphPoint[];
  metrics: AnalysisMetrics;
  news: NewsItem[];
}

// types/api.ts

// --- BUDGETS ---
export type BudgetPeriod = 'monthly' | 'weekly' | 'yearly' | 'custom';

export interface Budget {
  id: string;
  name: string;
  limit_amount: number;
  period: BudgetPeriod;
  alert_threshold: number; // e.g. 80 for 80%
  is_active: boolean;
  spent: number;           // calculated by backend
  remaining: number;       // calculated by backend
  percentage_used: number; // calculated by backend
}

export interface CreateBudgetRequest {
  name: string;
  limit_amount: number;
  period: string; // 'monthly'
  included_category_ids?: string[]; // Optional for now
  excluded_category_ids?: string[];
  excluded_merchants?: string[];
  alert_threshold?: number;
}

export interface UpdateBudgetRequest {
  name?: string;
  limit_amount?: number;
  period?: string;
  alert_threshold?: number;
  is_active?: boolean;
}

// types/api.ts

export type TransactionSource = 'manual' | 'voice' | 'chatbot' | 'csv' | 'notification' | 'wallet' | 'blockchain';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  occurred_at: string;
  category_id: string;
  merchant_raw: string;
  description: string;
  source: TransactionSource;
}

export interface CreateTransactionRequest {
  amount: number;
  currency: string;
  occurred_at: string; // ISO String
  category_id?: string;
  merchant_raw: string;
  description: string;
  source: string;
}

