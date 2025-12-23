import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

// 1. Read keys safely
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

// 2. Debugging Check (Logs to your terminal)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("---------------------------------------------------")
  console.error("🔴 CRITICAL ERROR: Supabase Keys are missing!")
  console.error("Checked for: EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY")
  console.error("Current URL Value:", supabaseUrl)
  console.error("Current Key Value:", supabaseAnonKey ? "Loaded" : "Missing")
  console.error("---------------------------------------------------")
}

// 3. Prevent Crash: Fallback to empty string so app can at least load the error UI
export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})



// import 'react-native-url-polyfill/auto';
// import { createClient } from '@supabase/supabase-js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Platform } from 'react-native'; // <--- Add this

// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// // Safe Storage Logic
// // This prevents the "window is not defined" error during web builds
// const authStorage = Platform.OS === 'web' 
//   ? (typeof window !== 'undefined' ? AsyncStorage : undefined) 
//   : AsyncStorage;

// export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "", {
//   auth: {
//     storage: authStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });