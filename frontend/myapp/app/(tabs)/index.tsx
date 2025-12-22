// // // // import React, { useEffect, useState, useCallback } from 'react';
// // // // import { ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
// // // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Avatar } from 'tamagui';
// // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // import { BlurView } from 'expo-blur';
// // // // import { Activity, TrendingUp, Wallet, ArrowUpRight, RefreshCw, User } from '@tamagui/lucide-icons';
// // // // import { useRouter } from 'expo-router';

// // // // // Services & Types
// // // // import { UserService } from '../../services/userService';
// // // // import { AiService } from '../../services/aiService';
// // // // import { UserProfile } from '../../types/api';

// // // // export default function Dashboard() {
// // // //   const router = useRouter();
  
// // // //   // --- STATE ---
// // // //   const [profile, setProfile] = useState<UserProfile | null>(null);
// // // //   const [healthStatus, setHealthStatus] = useState<string>('Checking...');
// // // //   const [isSystemOnline, setIsSystemOnline] = useState(false);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [totalBalance, setTotalBalance] = useState(0);

// // // //   // --- DATA FETCHING ---
// // // //   const fetchData = useCallback(async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       // 1. Check AI System Health
// // // //       const online = await AiService.checkSystemHealth();
// // // //       setIsSystemOnline(online);
// // // //       setHealthStatus(online ? "System Operational" : "Offline / Unreachable");

// // // //       // 2. Fetch User Profile (Name + Investments)
// // // //       const userProfile = await UserService.getProfile();
// // // //       setProfile(userProfile);

// // // //       // 3. Calculate Total Balance (Sum of Investments)
// // // //       if (userProfile.investments) {
// // // //         const total = userProfile.investments.reduce((sum, item) => sum + (item.current_value || 0), 0);
// // // //         setTotalBalance(total);
// // // //       }

// // // //     } catch (error) {
// // // //       console.log("Dashboard Error:", error);
// // // //       setHealthStatus("Connection Error");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //   }, [fetchData]);

// // // //   const formatCurrency = (amount: number) => {
// // // //     return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
// // // //   };

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
// // // //         <ScrollView 
// // // //           contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 120 }}
// // // //           refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} tintColor="#EAB308" />}
// // // //         >
          
// // // //           {/* --- HEADER: GREETING & PROFILE --- */}
// // // //           <XStack jc="space-between" ai="center" mb="$6">
// // // //             <YStack>
// // // //               <Text color="$silver4" fontSize={12} letterSpacing={1}>WELCOME BACK</Text>
// // // //               <H2 color="white" fontWeight="900" fontSize={24} numberOfLines={1}>
// // // //                 {profile?.full_name ? profile.full_name.split(' ')[0] : 'Protocol User'}
// // // //               </H2>
// // // //             </YStack>
            
// // // //             {/* CLICKABLE AVATAR -> GO TO PROFILE */}
// // // //             <TouchableOpacity onPress={() => router.push('/profile')}>
// // // //               <YStack 
// // // //                 w={45} h={45} br={25} 
// // // //                 bg="rgba(234, 179, 8, 0.2)" 
// // // //                 jc="center" ai="center" 
// // // //                 borderColor="$gold3" bw={1}
// // // //                 shadowColor="$gold3" shadowRadius={5}
// // // //               >
// // // //                  <User size={20} color="#EAB308" />
// // // //               </YStack>
// // // //             </TouchableOpacity>
// // // //           </XStack>

// // // //           {/* --- BALANCE CARD --- */}
// // // //           <YStack mb="$6">
// // // //             <Text color="$silver4" fontSize={12} letterSpacing={2} mb="$1">TOTAL NET WORTH</Text>
// // // //             <H2 color="$white" fontWeight="900" fontSize={36}>
// // // //               {loading ? "..." : formatCurrency(totalBalance)}
// // // //             </H2>
// // // //             <XStack ai="center" space="$2" mt="$1">
// // // //               <TrendingUp size={16} color="#22c55e" />
// // // //               <Text color="#22c55e" fontSize={12} fontWeight="bold">+2.4% (Today)</Text>
// // // //             </XStack>
// // // //           </YStack>

// // // //           {/* --- SYSTEM STATUS --- */}
// // // //           <BlurView intensity={20} tint="dark" style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
// // // //             <XStack bg="rgba(255,255,255,0.03)" p="$4" ai="center" space="$4" borderColor="rgba(255,255,255,0.05)" bw={1}>
// // // //               <Activity size={24} color={isSystemOnline ? "#22c55e" : "#ef4444"} />
// // // //               <YStack f={1}>
// // // //                 <Text color="$white" fontWeight="bold">AI Core Status</Text>
// // // //                 <Text color="$silver4" fontSize={11}>{healthStatus}</Text>
// // // //               </YStack>
// // // //               {loading && <Spinner size="small" color="$gold3" />}
// // // //             </XStack>
// // // //           </BlurView>

// // // //           {/* --- QUICK ACTIONS --- */}
// // // //           <H4 color="$silver3" mb="$4" fontSize={14} letterSpacing={1}>QUICK ACTIONS</H4>
// // // //           <XStack space="$3" mb="$6">
// // // //             <Button 
// // // //               f={1} h={90} bg="rgba(255,255,255,0.03)" 
// // // //               borderColor="rgba(255,255,255,0.1)" bw={1} 
// // // //               onPress={() => router.push('/(tabs)/portfolio')}
// // // //               flexDirection="column" jc="center" ai="center" space="$2"
// // // //             >
// // // //               <ArrowUpRight size={22} color="$gold3" />
// // // //               <Text color="$silver4" fontSize={11}>Add Asset</Text>
// // // //             </Button>

// // // //             <Button 
// // // //               f={1} h={90} bg="rgba(255,255,255,0.03)" 
// // // //               borderColor="rgba(255,255,255,0.1)" bw={1} 
// // // //               onPress={() => router.push('/(tabs)/chat')}
// // // //               flexDirection="column" jc="center" ai="center" space="$2"
// // // //             >
// // // //               <RefreshCw size={22} color="$silver4" />
// // // //               <Text color="$silver4" fontSize={11}>Ask AI</Text>
// // // //             </Button>
// // // //           </XStack>

// // // //           {/* --- RECENT HOLDINGS --- */}
// // // //           <XStack jc="space-between" ai="center" mb="$3">
// // // //             <H4 color="$silver3" fontSize={14} letterSpacing={1}>HOLDINGS</H4>
// // // //             <Text color="$gold3" fontSize={12} onPress={() => router.push('/(tabs)/portfolio')}>View All</Text>
// // // //           </XStack>

// // // //           <YStack space="$3">
// // // //             {profile?.investments && profile.investments.length > 0 ? (
// // // //               profile.investments.slice(0, 3).map((inv, i) => (
// // // //                 <XStack key={i} bg="rgba(0,0,0,0.5)" p="$4" br="$4" jc="space-between" ai="center" borderColor="rgba(255,255,255,0.05)" bw={1}>
// // // //                   <YStack>
// // // //                     <Text color="white" fontWeight="bold">{inv.identifier}</Text>
// // // //                     <Text color="$silver4" fontSize={11}>{inv.asset_type.toUpperCase()}</Text>
// // // //                   </YStack>
// // // //                   <YStack ai="flex-end">
// // // //                     <Text color="white" fontWeight="bold">{formatCurrency(inv.current_value)}</Text>
// // // //                     <Text color="#22c55e" fontSize={11}>+0.0%</Text>
// // // //                   </YStack>
// // // //                 </XStack>
// // // //               ))
// // // //             ) : (
// // // //               <Text color="$silver4" fontStyle="italic">No assets linked yet.</Text>
// // // //             )}
// // // //           </YStack>

// // // //         </ScrollView>
// // // //       </LinearGradient>
// // // //     </Theme>
// // // //   );
// // // // }



// // // import React, { useEffect, useState, useCallback } from 'react';
// // // import { ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
// // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button } from 'tamagui';
// // // import { LinearGradient } from 'expo-linear-gradient';
// // // import { BlurView } from 'expo-blur';
// // // import { Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase } from '@tamagui/lucide-icons';
// // // import { useRouter } from 'expo-router';

// // // // Services & Types
// // // import { UserService } from '../../services/userService';
// // // import { AiService } from '../../services/aiService';
// // // import { UserProfile } from '../../types/api';

// // // export default function Dashboard() {
// // //   const router = useRouter();
  
// // //   // --- STATE ---
// // //   const [profile, setProfile] = useState<UserProfile | null>(null);
// // //   const [healthStatus, setHealthStatus] = useState<string>('Checking...');
// // //   const [isSystemOnline, setIsSystemOnline] = useState(false);
// // //   const [loading, setLoading] = useState(true);
// // //   const [totalBalance, setTotalBalance] = useState(0);

// // //   // --- DATA FETCHING ---
// // //   const fetchData = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       // 1. Check AI System Health
// // //       const online = await AiService.checkSystemHealth();
// // //       setIsSystemOnline(online);
// // //       setHealthStatus(online ? "System Operational" : "Offline / Unreachable");

// // //       // 2. Fetch User Profile (Name + Investments)
// // //       const userProfile = await UserService.getProfile();
// // //       setProfile(userProfile);

// // //       // 3. Calculate Total Balance (Sum of Investments)
// // //       if (userProfile.investments) {
// // //         const total = userProfile.investments.reduce((sum, item) => sum + (item.current_value || 0), 0);
// // //         setTotalBalance(total);
// // //       }

// // //     } catch (error) {
// // //       console.log("Dashboard Error:", error);
// // //       setHealthStatus("Connection Error");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, [fetchData]);

// // //   const formatCurrency = (amount: number) => {
// // //     return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
// // //   };

// // //   return (
// // //     <Theme name="dark">
// // //       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
// // //         <ScrollView 
// // //           contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 120 }}
// // //           refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} tintColor="#EAB308" />}
// // //         >
          
// // //           {/* --- HEADER: GREETING & PROFILE --- */}
// // //           <XStack jc="space-between" ai="center" mb="$6">
// // //             <YStack>
// // //               <Text color="$silver4" fontSize={12} letterSpacing={1}>WELCOME BACK</Text>
// // //               <H2 color="white" fontWeight="900" fontSize={24} numberOfLines={1}>
// // //                 {profile?.full_name ? profile.full_name.split(' ')[0] : 'Protocol User'}
// // //               </H2>
// // //             </YStack>
            
// // //             {/* CLICKABLE AVATAR -> GO TO PROFILE */}
// // //             <TouchableOpacity onPress={() => router.push('/profile')}>
// // //               <YStack 
// // //                 w={45} h={45} br={25} 
// // //                 bg="rgba(234, 179, 8, 0.2)" 
// // //                 jc="center" ai="center" 
// // //                 borderColor="$gold3" bw={1}
// // //                 shadowColor="$gold3" shadowRadius={5}
// // //               >
// // //                  <User size={20} color="#EAB308" />
// // //               </YStack>
// // //             </TouchableOpacity>
// // //           </XStack>

// // //           {/* --- BALANCE CARD --- */}
// // //           <YStack mb="$6">
// // //             <Text color="$silver4" fontSize={12} letterSpacing={2} mb="$1">TOTAL NET WORTH</Text>
// // //             <H2 color="$white" fontWeight="900" fontSize={36}>
// // //               {loading ? "..." : formatCurrency(totalBalance)}
// // //             </H2>
// // //             <XStack ai="center" space="$2" mt="$1">
// // //               <TrendingUp size={16} color="#22c55e" />
// // //               <Text color="#22c55e" fontSize={12} fontWeight="bold">+2.4% (Today)</Text>
// // //             </XStack>
// // //           </YStack>

// // //           {/* --- SYSTEM STATUS --- */}
// // //           <BlurView intensity={20} tint="dark" style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
// // //             <XStack bg="rgba(255,255,255,0.03)" p="$4" ai="center" space="$4" borderColor="rgba(255,255,255,0.05)" bw={1}>
// // //               <Activity size={24} color={isSystemOnline ? "#22c55e" : "#ef4444"} />
// // //               <YStack f={1}>
// // //                 <Text color="$white" fontWeight="bold">AI Core Status</Text>
// // //                 <Text color="$silver4" fontSize={11}>{healthStatus}</Text>
// // //               </YStack>
// // //               {loading && <Spinner size="small" color="$gold3" />}
// // //             </XStack>
// // //           </BlurView>

// // //           {/* --- QUICK ACTIONS --- */}
// // //           <H4 color="$silver3" mb="$4" fontSize={14} letterSpacing={1}>QUICK ACTIONS</H4>
// // //           <XStack space="$3" mb="$6">
// // //             {/* 1. Add Asset */}
// // //             <Button 
// // //               f={1} h={90} bg="rgba(255,255,255,0.03)" 
// // //               borderColor="rgba(255,255,255,0.1)" bw={1} 
// // //               onPress={() => router.push('/(tabs)/portfolio')}
// // //               flexDirection="column" jc="center" ai="center" space="$2"
// // //             >
// // //               <ArrowUpRight size={22} color="$gold3" />
// // //               <Text color="$silver4" fontSize={11}>Add Asset</Text>
// // //             </Button>

// // //             {/* 2. Ask AI */}
// // //             <Button 
// // //               f={1} h={90} bg="rgba(255,255,255,0.03)" 
// // //               borderColor="rgba(255,255,255,0.1)" bw={1} 
// // //               onPress={() => router.push('/(tabs)/chat')}
// // //               flexDirection="column" jc="center" ai="center" space="$2"
// // //             >
// // //               <RefreshCw size={22} color="$silver4" />
// // //               <Text color="$silver4" fontSize={11}>Ask AI</Text>
// // //             </Button>

// // //             {/* 3. Manage Income (NEW) */}
// // //             <Button 
// // //               f={1} h={90} bg="rgba(255,255,255,0.03)" 
// // //               borderColor="rgba(255,255,255,0.1)" bw={1} 
// // //               onPress={() => router.push('/income')} 
// // //               flexDirection="column" jc="center" ai="center" space="$2"
// // //             >
// // //               <Briefcase size={22} color="#22c55e" />
// // //               <Text color="$silver4" fontSize={11}>Income</Text>
// // //             </Button>
// // //           </XStack>

// // //           {/* --- RECENT HOLDINGS --- */}
// // //           <XStack jc="space-between" ai="center" mb="$3">
// // //             <H4 color="$silver3" fontSize={14} letterSpacing={1}>HOLDINGS</H4>
// // //             <Text color="$gold3" fontSize={12} onPress={() => router.push('/(tabs)/portfolio')}>View All</Text>
// // //           </XStack>

// // //           <YStack space="$3">
// // //             {profile?.investments && profile.investments.length > 0 ? (
// // //               profile.investments.slice(0, 3).map((inv, i) => (
// // //                 <XStack key={i} bg="rgba(0,0,0,0.5)" p="$4" br="$4" jc="space-between" ai="center" borderColor="rgba(255,255,255,0.05)" bw={1}>
// // //                   <YStack>
// // //                     <Text color="white" fontWeight="bold">{inv.identifier}</Text>
// // //                     <Text color="$silver4" fontSize={11}>{inv.asset_type.toUpperCase()}</Text>
// // //                   </YStack>
// // //                   <YStack ai="flex-end">
// // //                     <Text color="white" fontWeight="bold">{formatCurrency(inv.current_value)}</Text>
// // //                     <Text color="#22c55e" fontSize={11}>+0.0%</Text>
// // //                   </YStack>
// // //                 </XStack>
// // //               ))
// // //             ) : (
// // //               <Text color="$silver4" fontStyle="italic">No assets linked yet.</Text>
// // //             )}
// // //           </YStack>

// // //         </ScrollView>
// // //       </LinearGradient>
// // //     </Theme>
// // //   );
// // // }

// // import React, { useEffect, useState, useCallback } from 'react';
// // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
// // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button } from 'tamagui';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { BlurView } from 'expo-blur';
// // import { 
// //   Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target 
// // } from '@tamagui/lucide-icons';
// // import { useRouter } from 'expo-router';
// // import { SafeAreaView } from 'react-native-safe-area-context'; // 1. Fix Alignment

// // // Services & Types
// // import { UserService } from '../../services/userService';
// // import { AiService } from '../../services/aiService';
// // import { UserProfile } from '../../types/api';

// // const { width } = Dimensions.get('window');
// // // Calculate button width for 2-column grid (Total width - Padding - Gap) / 2
// // const BUTTON_WIDTH = (width - 40 - 15) / 2;

// // export default function Dashboard() {
// //   const router = useRouter();
  
// //   // --- STATE ---
// //   const [profile, setProfile] = useState<UserProfile | null>(null);
// //   const [healthStatus, setHealthStatus] = useState<string>('Checking...');
// //   const [isSystemOnline, setIsSystemOnline] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [totalBalance, setTotalBalance] = useState(0);

// //   // --- DATA FETCHING ---
// //   const fetchData = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       // 1. Check AI System Health
// //       const online = await AiService.checkSystemHealth();
// //       setIsSystemOnline(online);
// //       setHealthStatus(online ? "System Operational" : "Offline / Unreachable");

// //       // 2. Fetch User Profile
// //       const userProfile = await UserService.getProfile();
// //       setProfile(userProfile);

// //       // 3. Calculate Total Balance
// //       if (userProfile.investments) {
// //         const total = userProfile.investments.reduce((sum, item) => sum + (item.current_value || 0), 0);
// //         setTotalBalance(total);
// //       }

// //     } catch (error) {
// //       console.log("Dashboard Error:", error);
// //       setHealthStatus("Connection Error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchData();
// //   }, [fetchData]);

// //   const formatCurrency = (amount: number) => {
// //     return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
// //   };

// //   return (
// //     <Theme name="dark">
// //       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
        
// //         {/* 2. SAFE AREA VIEW: Fixes Top Notch Alignment */}
// //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
// //           <ScrollView 
// //             contentContainerStyle={{ padding: 20, paddingBottom: 150 }} // Increased bottom padding for Tab Bar
// //             showsVerticalScrollIndicator={false}
// //             refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} tintColor="#EAB308" />}
// //           >
            
// //             {/* --- HEADER --- */}
// //             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
// //               <YStack>
// //                 <Text color="$silver4" fontSize={12} letterSpacing={1}>WELCOME BACK</Text>
// //                 <H2 color="white" fontWeight="900" fontSize={24} numberOfLines={1}>
// //                   {profile?.full_name ? profile.full_name.split(' ')[0] : 'Protocol User'}
// //                 </H2>
// //               </YStack>
              
// //               <TouchableOpacity onPress={() => router.push('/profile')}>
// //                 <YStack 
// //                   w={45} h={45} br={25} 
// //                   bg="rgba(234, 179, 8, 0.2)" 
// //                   jc="center" ai="center" 
// //                   borderColor="$gold3" bw={1}
// //                   shadowColor="$gold3" shadowRadius={5}
// //                 >
// //                    <User size={20} color="#EAB308" />
// //                 </YStack>
// //               </TouchableOpacity>
// //             </XStack>

// //             {/* --- BALANCE CARD --- */}
// //             <YStack mb="$6">
// //               <Text color="$silver4" fontSize={12} letterSpacing={2} mb="$1">TOTAL NET WORTH</Text>
// //               <H2 color="$white" fontWeight="900" fontSize={36}>
// //                 {loading ? "..." : formatCurrency(totalBalance)}
// //               </H2>
// //               <XStack ai="center" space="$2" mt="$1">
// //                 <TrendingUp size={16} color="#22c55e" />
// //                 <Text color="#22c55e" fontSize={12} fontWeight="bold">+2.4% (Today)</Text>
// //               </XStack>
// //             </YStack>

// //             {/* --- SYSTEM STATUS --- */}
// //             <BlurView intensity={20} tint="dark" style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
// //               <XStack bg="rgba(255,255,255,0.03)" p="$4" ai="center" space="$4" borderColor="rgba(255,255,255,0.05)" bw={1}>
// //                 <Activity size={24} color={isSystemOnline ? "#22c55e" : "#ef4444"} />
// //                 <YStack f={1}>
// //                   <Text color="$white" fontWeight="bold">AI Core Status</Text>
// //                   <Text color="$silver4" fontSize={11}>{healthStatus}</Text>
// //                 </YStack>
// //                 {loading && <Spinner size="small" color="$gold3" />}
// //               </XStack>
// //             </BlurView>

// //             {/* --- QUICK ACTIONS (GRID LAYOUT) --- */}
// //             <H4 color="$silver3" mb="$4" fontSize={14} letterSpacing={1}>QUICK ACTIONS</H4>
            
// //             <XStack flexWrap="wrap" justifyContent="space-between" mb="$6" gap="$3">
              
// //               {/* 1. Add Asset */}
// //               <Button 
// //                 w={BUTTON_WIDTH} h={90} bg="rgba(255,255,255,0.03)" 
// //                 borderColor="rgba(255,255,255,0.1)" bw={1} 
// //                 onPress={() => router.push('/(tabs)/portfolio')}
// //                 flexDirection="column" jc="center" ai="center" space="$2"
// //               >
// //                 <ArrowUpRight size={22} color="$gold3" />
// //                 <Text color="$silver4" fontSize={11}>Add Asset</Text>
// //               </Button>

// //               {/* 2. Ask AI */}
// //               <Button 
// //                 w={BUTTON_WIDTH} h={90} bg="rgba(255,255,255,0.03)" 
// //                 borderColor="rgba(255,255,255,0.1)" bw={1} 
// //                 onPress={() => router.push('/(tabs)/chat')}
// //                 flexDirection="column" jc="center" ai="center" space="$2"
// //               >
// //                 <RefreshCw size={22} color="$silver4" />
// //                 <Text color="$silver4" fontSize={11}>Ask AI</Text>
// //               </Button>

// //               {/* 3. Manage Income */}
// //               <Button 
// //                 w={BUTTON_WIDTH} h={90} bg="rgba(255,255,255,0.03)" 
// //                 borderColor="rgba(255,255,255,0.1)" bw={1} 
// //                 onPress={() => router.push('/income')} 
// //                 flexDirection="column" jc="center" ai="center" space="$2"
// //               >
// //                 <Briefcase size={22} color="#22c55e" />
// //                 <Text color="$silver4" fontSize={11}>Income</Text>
// //               </Button>

// //               {/* 4. Budgets (NEW) */}
// //               <Button 
// //                 w={BUTTON_WIDTH} h={90} bg="rgba(255,255,255,0.03)" 
// //                 borderColor="rgba(255,255,255,0.1)" bw={1} 
// //                 onPress={() => router.push('/budgets')} 
// //                 flexDirection="column" jc="center" ai="center" space="$2"
// //               >
// //                 <Target size={22} color="#3b82f6" />
// //                 <Text color="$silver4" fontSize={11}>Budgets</Text>
// //               </Button>

// //             </XStack>

// //             {/* --- RECENT HOLDINGS --- */}
// //             <XStack jc="space-between" ai="center" mb="$3">
// //               <H4 color="$silver3" fontSize={14} letterSpacing={1}>HOLDINGS</H4>
// //               <Text color="$gold3" fontSize={12} onPress={() => router.push('/(tabs)/portfolio')}>View All</Text>
// //             </XStack>

// //             <YStack space="$3">
// //               {profile?.investments && profile.investments.length > 0 ? (
// //                 profile.investments.slice(0, 3).map((inv, i) => (
// //                   <XStack key={i} bg="rgba(0,0,0,0.5)" p="$4" br="$4" jc="space-between" ai="center" borderColor="rgba(255,255,255,0.05)" bw={1}>
// //                     <YStack>
// //                       <Text color="white" fontWeight="bold">{inv.identifier}</Text>
// //                       <Text color="$silver4" fontSize={11}>{inv.asset_type.toUpperCase()}</Text>
// //                     </YStack>
// //                     <YStack ai="flex-end">
// //                       <Text color="white" fontWeight="bold">{formatCurrency(inv.current_value)}</Text>
// //                       <Text color="#22c55e" fontSize={11}>+0.0%</Text>
// //                     </YStack>
// //                   </XStack>
// //                 ))
// //               ) : (
// //                 <Text color="$silver4" fontStyle="italic">No assets linked yet.</Text>
// //               )}
// //             </YStack>

// //           </ScrollView>
// //         </SafeAreaView>
// //       </LinearGradient>
// //     </Theme>
// //   );
// // }


// import React, { useEffect, useState, useCallback } from 'react';
// import { ScrollView, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
// import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button } from 'tamagui';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import { 
//   Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target 
// } from '@tamagui/lucide-icons';
// import { useRouter } from 'expo-router';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // Services & Types
// import { UserService } from '../../services/userService';
// import { AiService } from '../../services/aiService';
// import { UserProfile } from '../../types/api';

// // 🔑 TAB BAR HEIGHT (MUST MATCH YOUR TAB BAR)
// const TAB_BAR_HEIGHT = 70;

// const { width } = Dimensions.get('window');
// const BUTTON_WIDTH = (width - 40 - 15) / 2;

// export default function Dashboard() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets(); // ✅ FIX

//   // --- STATE ---
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [healthStatus, setHealthStatus] = useState<string>('Checking...');
//   const [isSystemOnline, setIsSystemOnline] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [totalBalance, setTotalBalance] = useState(0);

//   // --- DATA FETCHING ---
//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const online = await AiService.checkSystemHealth();
//       setIsSystemOnline(online);
//       setHealthStatus(online ? "System Operational" : "Offline / Unreachable");

//       const userProfile = await UserService.getProfile();
//       setProfile(userProfile);

//       if (userProfile.investments) {
//         const total = userProfile.investments.reduce(
//           (sum, item) => sum + (item.current_value || 0), 
//           0
//         );
//         setTotalBalance(total);
//       }
//     } catch (error) {
//       console.log("Dashboard Error:", error);
//       setHealthStatus("Connection Error");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

//   return (
//     <Theme name="dark">
//       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
//         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             refreshControl={
//               <RefreshControl
//                 refreshing={loading}
//                 onRefresh={fetchData}
//                 tintColor="#EAB308"
//               />
//             }
//             // ✅ CORRECT PADDING (NO OVERLAP)
//             contentContainerStyle={{
//               padding: 20,
//               paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 20,
//             }}
//           >

//             {/* HEADER */}
//             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
//               <YStack>
//                 <Text color="$silver4" fontSize={12} letterSpacing={1}>
//                   WELCOME BACK
//                 </Text>
//                 <H2 color="white" fontWeight="900" fontSize={24} numberOfLines={1}>
//                   {profile?.full_name ? profile.full_name.split(' ')[0] : 'Protocol User'}
//                 </H2>
//               </YStack>

//               <TouchableOpacity onPress={() => router.push('/profile')}>
//                 <YStack
//                   w={45}
//                   h={45}
//                   br={25}
//                   bg="rgba(234, 179, 8, 0.2)"
//                   jc="center"
//                   ai="center"
//                   borderColor="$gold3"
//                   bw={1}
//                 >
//                   <User size={20} color="#EAB308" />
//                 </YStack>
//               </TouchableOpacity>
//             </XStack>

//             {/* BALANCE */}
//             <YStack mb="$6">
//               <Text color="$silver4" fontSize={12} letterSpacing={2}>
//                 TOTAL NET WORTH
//               </Text>
//               <H2 color="$white" fontWeight="900" fontSize={36}>
//                 {loading ? "..." : formatCurrency(totalBalance)}
//               </H2>
//               <XStack ai="center" space="$2">
//                 <TrendingUp size={16} color="#22c55e" />
//                 <Text color="#22c55e" fontSize={12} fontWeight="bold">
//                   +2.4% (Today)
//                 </Text>
//               </XStack>
//             </YStack>

//             {/* SYSTEM STATUS */}
//             <BlurView intensity={20} tint="dark" style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
//               <XStack
//                 bg="rgba(255,255,255,0.03)"
//                 p="$4"
//                 ai="center"
//                 space="$4"
//                 borderColor="rgba(255,255,255,0.05)"
//                 bw={1}
//               >
//                 <Activity size={24} color={isSystemOnline ? "#22c55e" : "#ef4444"} />
//                 <YStack f={1}>
//                   <Text color="$white" fontWeight="bold">AI Core Status</Text>
//                   <Text color="$silver4" fontSize={11}>{healthStatus}</Text>
//                 </YStack>
//                 {loading && <Spinner size="small" color="$gold3" />}
//               </XStack>
//             </BlurView>

//             {/* QUICK ACTIONS */}
//             <H4 color="$silver3" mb="$4" fontSize={14} letterSpacing={1}>
//               QUICK ACTIONS
//             </H4>

//             <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" mb="$6">
//               <Button
//                 w={BUTTON_WIDTH}
//                 h={90}
//                 bg="rgba(255,255,255,0.03)"
//                 borderColor="rgba(255,255,255,0.1)"
//                 bw={1}
//                 jc="center"
//                 ai="center"
//                 flexDirection="column"
//                 onPress={() => router.push('/(tabs)/portfolio')}
//               >
//                 <ArrowUpRight size={22} color="$gold3" />
//                 <Text color="$silver4" fontSize={11}>Add Asset</Text>
//               </Button>

//               <Button
//                 w={BUTTON_WIDTH}
//                 h={90}
//                 bg="rgba(255,255,255,0.03)"
//                 borderColor="rgba(255,255,255,0.1)"
//                 bw={1}
//                 jc="center"
//                 ai="center"
//                 flexDirection="column"
//                 onPress={() => router.push('/(tabs)/chat')}
//               >
//                 <RefreshCw size={22} color="$silver4" />
//                 <Text color="$silver4" fontSize={11}>Ask AI</Text>
//               </Button>

//               <Button
//                 w={BUTTON_WIDTH}
//                 h={90}
//                 bg="rgba(255,255,255,0.03)"
//                 borderColor="rgba(255,255,255,0.1)"
//                 bw={1}
//                 jc="center"
//                 ai="center"
//                 flexDirection="column"
//                 onPress={() => router.push('/income')}
//               >
//                 <Briefcase size={22} color="#22c55e" />
//                 <Text color="$silver4" fontSize={11}>Income</Text>
//               </Button>

//               <Button
//                 w={BUTTON_WIDTH}
//                 h={90}
//                 bg="rgba(255,255,255,0.03)"
//                 borderColor="rgba(255,255,255,0.1)"
//                 bw={1}
//                 jc="center"
//                 ai="center"
//                 flexDirection="column"
//                 onPress={() => router.push('/budgets')}
//               >
//                 <Target size={22} color="#3b82f6" />
//                 <Text color="$silver4" fontSize={11}>Budgets</Text>
//               </Button>
//             </XStack>

//           </ScrollView>
//         </SafeAreaView>
//       </LinearGradient>
//     </Theme>
//   );
// }


import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search 
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Services & Types
import { UserService } from '../../services/userService';
import { AiService } from '../../services/aiService';
import { UserProfile } from '../../types/api';

// 🔑 TAB BAR HEIGHT (Adjust if your tab bar is different)
const TAB_BAR_HEIGHT = 70;

const { width } = Dimensions.get('window');
// Calculate button width for 2-column grid
const BUTTON_WIDTH = (width - 40 - 15) / 2;

export default function Dashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- STATE ---
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [healthStatus, setHealthStatus] = useState<string>('Checking...');
  const [isSystemOnline, setIsSystemOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);

  // --- DATA FETCHING ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const online = await AiService.checkSystemHealth();
      setIsSystemOnline(online);
      setHealthStatus(online ? "System Operational" : "Offline / Unreachable");

      const userProfile = await UserService.getProfile();
      setProfile(userProfile);

      if (userProfile.investments) {
        const total = userProfile.investments.reduce(
          (sum, item) => sum + (item.current_value || 0), 
          0
        );
        setTotalBalance(total);
      }
    } catch (error) {
      console.log("Dashboard Error:", error);
      setHealthStatus("Connection Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <Theme name="dark">
      <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={fetchData}
                tintColor="#EAB308"
              />
            }
            contentContainerStyle={{
              padding: 20,
              paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 20,
            }}
          >

            {/* HEADER */}
            <XStack jc="space-between" ai="center" mb="$6" mt="$2">
              <YStack>
                <Text color="$silver4" fontSize={12} letterSpacing={1}>
                  WELCOME BACK
                </Text>
                <H2 color="white" fontWeight="900" fontSize={24} numberOfLines={1}>
                  {profile?.full_name ? profile.full_name.split(' ')[0] : 'Protocol User'}
                </H2>
              </YStack>

              <TouchableOpacity onPress={() => router.push('/profile')}>
                <YStack
                  w={45} h={45} br={25}
                  bg="rgba(234, 179, 8, 0.2)"
                  jc="center" ai="center"
                  borderColor="$gold3" bw={1}
                >
                  <User size={20} color="#EAB308" />
                </YStack>
              </TouchableOpacity>
            </XStack>

            {/* BALANCE */}
            <YStack mb="$6">
              <Text color="$silver4" fontSize={12} letterSpacing={2}>
                TOTAL NET WORTH
              </Text>
              <H2 color="$white" fontWeight="900" fontSize={36}>
                {loading ? "..." : formatCurrency(totalBalance)}
              </H2>
              <XStack ai="center" space="$2">
                <TrendingUp size={16} color="#22c55e" />
                <Text color="#22c55e" fontSize={12} fontWeight="bold">
                  +2.4% (Today)
                </Text>
              </XStack>
            </YStack>

            {/* SYSTEM STATUS */}
            <BlurView intensity={20} tint="dark" style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
              <XStack
                bg="rgba(255,255,255,0.03)"
                p="$4" ai="center" space="$4"
                borderColor="rgba(255,255,255,0.05)" bw={1}
              >
                <Activity size={24} color={isSystemOnline ? "#22c55e" : "#ef4444"} />
                <YStack f={1}>
                  <Text color="$white" fontWeight="bold">AI Core Status</Text>
                  <Text color="$silver4" fontSize={11}>{healthStatus}</Text>
                </YStack>
                {loading && <Spinner size="small" color="$gold3" />}
              </XStack>
            </BlurView>

            {/* QUICK ACTIONS GRID */}
            <H4 color="$silver3" mb="$4" fontSize={14} letterSpacing={1}>
              QUICK ACTIONS
            </H4>

            <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" mb="$6">
              {/* 1. Add Asset */}
              <Button
                w={BUTTON_WIDTH} h={90} bg="rgba(255,255,255,0.03)"
                borderColor="rgba(255,255,255,0.1)" bw={1}
                jc="center" ai="center" flexDirection="column"
                onPress={() => router.push('/(tabs)/portfolio')}
              >
                <ArrowUpRight size={22} color="$gold3" />
                <Text color="$silver4" fontSize={11}>Add Asset</Text>
              </Button>

              {/* 2. AI Analysis */}
              <Button
                w={BUTTON_WIDTH} h={90} bg="rgba(255,255,255,0.03)"
                borderColor="rgba(255,255,255,0.1)" bw={1}
                jc="center" ai="center" flexDirection="column"
                onPress={() => router.push('/analysis')}
              >
                <Search size={22} color="#3b82f6" />
                <Text color="$silver4" fontSize={11}>AI Analysis</Text>
              </Button>

              {/* 3. Income */}
              <Button
                w={BUTTON_WIDTH} h={90} bg="rgba(255,255,255,0.03)"
                borderColor="rgba(255,255,255,0.1)" bw={1}
                jc="center" ai="center" flexDirection="column"
                onPress={() => router.push('/income')}
              >
                <Briefcase size={22} color="#22c55e" />
                <Text color="$silver4" fontSize={11}>Income</Text>
              </Button>

              {/* 4. Budgets */}
              <Button
                w={BUTTON_WIDTH} h={90} bg="rgba(255,255,255,0.03)"
                borderColor="rgba(255,255,255,0.1)" bw={1}
                jc="center" ai="center" flexDirection="column"
                onPress={() => router.push('/budgets')}
              >
                <Target size={22} color="#a855f7" />
                <Text color="$silver4" fontSize={11}>Budgets</Text>
              </Button>

              {/* 5. Transactions */}
              <Button
                w={BUTTON_WIDTH} h={90} bg="rgba(255,255,255,0.03)"
                borderColor="rgba(255,255,255,0.1)" bw={1}
                jc="center" ai="center" flexDirection="column"
                onPress={() => router.push('/transactions')}
              >
                <CreditCard size={22} color="#ef4444" />
                <Text color="$silver4" fontSize={11}>Transactions</Text>
              </Button>

              {/* 6. Ask AI */}
              <Button
                w={BUTTON_WIDTH} h={90} bg="rgba(255,255,255,0.03)"
                borderColor="rgba(255,255,255,0.1)" bw={1}
                jc="center" ai="center" flexDirection="column"
                onPress={() => router.push('/(tabs)/chat')}
              >
                <RefreshCw size={22} color="$silver4" />
                <Text color="$silver4" fontSize={11}>Ask AI</Text>
              </Button>
            </XStack>

            {/* HOLDINGS PREVIEW */}
            <XStack jc="space-between" ai="center" mb="$3">
              <H4 color="$silver3" fontSize={14} letterSpacing={1}>HOLDINGS</H4>
              <Text color="$gold3" fontSize={12} onPress={() => router.push('/(tabs)/portfolio')}>View All</Text>
            </XStack>

            <YStack space="$3">
              {profile?.investments && profile.investments.length > 0 ? (
                profile.investments.slice(0, 3).map((inv, i) => (
                  <XStack key={i} bg="rgba(0,0,0,0.5)" p="$4" br="$4" jc="space-between" ai="center" borderColor="rgba(255,255,255,0.05)" bw={1}>
                    <YStack>
                      <Text color="white" fontWeight="bold">{inv.identifier}</Text>
                      <Text color="$silver4" fontSize={11}>{inv.asset_type.toUpperCase()}</Text>
                    </YStack>
                    <YStack ai="flex-end">
                      <Text color="white" fontWeight="bold">{formatCurrency(inv.current_value)}</Text>
                      <Text color="#22c55e" fontSize={11}>+0.0%</Text>
                    </YStack>
                  </XStack>
                ))
              ) : (
                <Text color="$silver4" fontStyle="italic">No assets linked yet.</Text>
              )}
            </YStack>

          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </Theme>
  );
}
