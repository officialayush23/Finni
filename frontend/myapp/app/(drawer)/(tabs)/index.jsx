// // // // // // import React, { useEffect, useState, useCallback } from 'react';
// // // // // // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
// // // // // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress } from 'tamagui';
// // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // import { BlurView } from 'expo-blur';
// // // // // // import { 
// // // // // //   Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
// // // // // //   ChevronRight, Shield, Zap, PieChart, BarChart3, Wallet, Target as TargetIcon, Cpu
// // // // // // } from '@tamagui/lucide-icons';
// // // // // // import { useRouter } from 'expo-router';
// // // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // // // // // Services
// // // // // // import { UserService } from '../../../services/userService';
// // // // // // import { AiService } from '../../../services/aiService';

// // // // // // const TAB_BAR_HEIGHT = 70;
// // // // // // const { width } = Dimensions.get('window');
// // // // // // const BUTTON_WIDTH = (width - 40 - 15) / 2;

// // // // // // export default function Dashboard() {
// // // // // //   const router = useRouter();
// // // // // //   const insets = useSafeAreaInsets();
// // // // // //   const scaleAnim = useState(new Animated.Value(1))[0];

// // // // // //   // --- STATE ---
// // // // // //   const [profile, setProfile] = useState(null);
// // // // // //   const [healthStatus, setHealthStatus] = useState('Checking...');
// // // // // //   const [isSystemOnline, setIsSystemOnline] = useState(false);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [totalBalance, setTotalBalance] = useState(0);

// // // // // //   // --- DATA FETCHING ---
// // // // // //   const fetchData = useCallback(async () => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       // 1. Check System Health with a catch to prevent total crash
// // // // // //       const online = await AiService.checkSystemHealth().catch(() => false);
// // // // // //       setIsSystemOnline(online);
// // // // // //       setHealthStatus(online ? "System Operational" : "Offline / Unreachable");

// // // // // //       // 2. Get Profile
// // // // // //       const userProfile = await UserService.getProfile();
// // // // // //       setProfile(userProfile);

// // // // // //       // 3. Calculate Balance safely
// // // // // //       if (userProfile && userProfile.investments) {
// // // // // //         const total = userProfile.investments.reduce(
// // // // // //           (sum, item) => sum + (Number(item.current_value) || 0), 
// // // // // //           0
// // // // // //         );
// // // // // //         setTotalBalance(total);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.log("Dashboard Sync Error:", error);
// // // // // //       setHealthStatus("Connection Error");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     fetchData();
// // // // // //   }, [fetchData]);

// // // // // //   const formatCurrency = (amount) =>
// // // // // //     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount || 0);

// // // // // //   return (
// // // // // //     <Theme name="dark">
// // // // // //       <LinearGradient 
// // // // // //         colors={['#000000', '#0A0A0A', '#111111']}
// // // // // //         start={{ x: 0, y: 0 }}
// // // // // //         end={{ x: 1, y: 1 }}
// // // // // //         style={{ flex: 1 }}
// // // // // //       >
// // // // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
// // // // // //           <ScrollView
// // // // // //             showsVerticalScrollIndicator={false}
// // // // // //             refreshControl={
// // // // // //               <RefreshControl
// // // // // //                 refreshing={loading}
// // // // // //                 onRefresh={fetchData}
// // // // // //                 tintColor="#EAB308"
// // // // // //               />
// // // // // //             }
// // // // // //             contentContainerStyle={{
// // // // // //               padding: 20,
// // // // // //               paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 20,
// // // // // //             }}
// // // // // //           >

// // // // // //             {/* ENHANCED HEADER */}
// // // // // //             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
// // // // // //               <YStack>
// // // // // //                 <XStack ai="center" space="$2" mb="$1">
// // // // // //                   <Shield size={14} color="#EAB308" />
// // // // // //                   <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">PROTOCOL</Text>
// // // // // //                 </XStack>
// // // // // //                 <H2 
// // // // // //                   color="white" 
// // // // // //                   fontWeight="900" 
// // // // // //                   fontSize={28} 
// // // // // //                   numberOfLines={1}
// // // // // //                   style={{
// // // // // //                     textShadowColor: 'rgba(234, 179, 8, 0.3)',
// // // // // //                     textShadowOffset: { width: 0, height: 0 },
// // // // // //                     textShadowRadius: 10,
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   {profile?.full_name ? profile.full_name.split(' ')[0] : 'Protocol User'}
// // // // // //                 </H2>
// // // // // //               </YStack>

// // // // // //               <TouchableOpacity 
// // // // // //                 onPress={() => router.push('/profile')}
// // // // // //                 style={{
// // // // // //                   shadowColor: '#EAB308',
// // // // // //                   shadowOffset: { width: 0, height: 0 },
// // // // // //                   shadowOpacity: 0.4,
// // // // // //                   shadowRadius: 10,
// // // // // //                   elevation: 10,
// // // // // //                 }}
// // // // // //               >
// // // // // //                 <LinearGradient
// // // // // //                   colors={['#EAB308', '#CA8A04']}
// // // // // //                   start={{ x: 0, y: 0 }}
// // // // // //                   end={{ x: 1, y: 1 }}
// // // // // //                   style={{
// // // // // //                     width: 48,
// // // // // //                     height: 48,
// // // // // //                     borderRadius: 24,
// // // // // //                     justifyContent: 'center',
// // // // // //                     alignItems: 'center',
// // // // // //                     borderWidth: 2,
// // // // // //                     borderColor: 'rgba(255, 255, 255, 0.2)',
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <User size={22} color="black" />
// // // // // //                 </LinearGradient>
// // // // // //               </TouchableOpacity>
// // // // // //             </XStack>

// // // // // // {/* BALANCE SECTION - Minimal & Powerful */}
// // // // // // <YStack 
// // // // // //   bg="#111111" 
// // // // // //   p="$5" 
// // // // // //   br="$4" 
// // // // // //   mb="$5" 
// // // // // //   bw={1.5}
// // // // // //   borderColor="rgba(234, 179, 8, 0.2)"
// // // // // //   style={{
// // // // // //     position: 'relative',
// // // // // //     overflow: 'hidden',
// // // // // //   }}
// // // // // // >
// // // // // //   <YStack 
// // // // // //     position="absolute" 
// // // // // //     top={0} 
// // // // // //     right={0} 
// // // // // //     width={100} 
// // // // // //     height={100} 
// // // // // //     br={50}
// // // // // //     bg="rgba(234, 179, 8, 0.05)"
// // // // // //   />
  
// // // // // //   <Text 
// // // // // //     color="#EAB308" 
// // // // // //     fontSize={11} 
// // // // // //     letterSpacing={2} 
// // // // // //     fontWeight="600" 
// // // // // //     mb="$2"
// // // // // //   >
// // // // // //     TOTAL NET WORTH
// // // // // //   </Text>
  
// // // // // //   <H2 
// // // // // //     color="white" 
// // // // // //     fontWeight="900" 
// // // // // //     fontSize={38}
// // // // // //     letterSpacing={-0.5}
// // // // // //   >
// // // // // //     {loading && !profile ? "..." : formatCurrency(totalBalance)}
// // // // // //   </H2>
  
// // // // // //   <XStack ai="center" space="$3" mt="$3">
// // // // // //     <XStack 
// // // // // //       bg="#1a1a1a" 
// // // // // //       px="$2.5" 
// // // // // //       py="$1" 
// // // // // //       br="$2"
// // // // // //       ai="center"
// // // // // //       borderColor="rgba(34, 197, 94, 0.3)"
// // // // // //       bw={1}
// // // // // //     >
// // // // // //       <TrendingUp size={14} color="#22c55e" />
// // // // // //       <Text color="#22c55e" fontSize={12} fontWeight="700" ml="$1">+2.4% Today</Text>
// // // // // //     </XStack>
    
// // // // // //     <XStack 
// // // // // //       bg="#1a1a1a" 
// // // // // //       px="$2.5" 
// // // // // //       py="$1" 
// // // // // //       br="$2"
// // // // // //       ai="center"
// // // // // //       borderColor="rgba(234, 179, 8, 0.3)"
// // // // // //       bw={1}
// // // // // //     >
// // // // // //       <BarChart3 size={14} color="#EAB308" />
// // // // // //       <Text color="#EAB308" fontSize={12} fontWeight="700" ml="$1">+5.2% Monthly</Text>
// // // // // //     </XStack>
// // // // // //   </XStack>
// // // // // // </YStack>

// // // // // //             {/* ENHANCED SYSTEM STATUS */}
// // // // // //             <TouchableOpacity 
// // // // // //               activeOpacity={0.9}
// // // // // //               onPress={() => router.push('/')}
// // // // // //               style={{
// // // // // //                 marginBottom: 24,
// // // // // //                 shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
// // // // // //                 shadowOffset: { width: 0, height: 4 },
// // // // // //                 shadowOpacity: 0.3,
// // // // // //                 shadowRadius: 8,
// // // // // //                 elevation: 8,
// // // // // //               }}
// // // // // //             >
// // // // // //               <LinearGradient
// // // // // //                 colors={isSystemOnline 
// // // // // //                   ? ['rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0.05)'] 
// // // // // //                   : ['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.05)']
// // // // // //                 }
// // // // // //                 start={{ x: 0, y: 0 }}
// // // // // //                 end={{ x: 1, y: 1 }}
// // // // // //                 style={{
// // // // // //                   borderRadius: 20,
// // // // // //                   padding: 20,
// // // // // //                   borderWidth: 1,
// // // // // //                   borderColor: isSystemOnline ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
// // // // // //                 }}
// // // // // //               >
// // // // // //                 <XStack ai="center" space="$4">
// // // // // //                   <LinearGradient
// // // // // //                     colors={isSystemOnline ? ['#22c55e', '#16a34a'] : ['#ef4444', '#dc2626']}
// // // // // //                     start={{ x: 0, y: 0 }}
// // // // // //                     end={{ x: 1, y: 1 }}
// // // // // //                     style={{
// // // // // //                       width: 44,
// // // // // //                       height: 44,
// // // // // //                       borderRadius: 22,
// // // // // //                       justifyContent: 'center',
// // // // // //                       alignItems: 'center',
// // // // // //                       shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
// // // // // //                       shadowOffset: { width: 0, height: 2 },
// // // // // //                       shadowOpacity: 0.4,
// // // // // //                       shadowRadius: 4,
// // // // // //                       elevation: 4,
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     {isSystemOnline ? (
// // // // // //                       <Cpu size={22} color="white" />
// // // // // //                     ) : (
// // // // // //                       <Activity size={22} color="white" />
// // // // // //                     )}
// // // // // //                   </LinearGradient>
                  
// // // // // //                   <YStack f={1}>
// // // // // //                     <Text color="white" fontWeight="800" fontSize={16}>AI CORE SYSTEM</Text>
// // // // // //                     <Text color={isSystemOnline ? "rgba(34, 197, 94, 0.9)" : "rgba(239, 68, 68, 0.9)"} 
// // // // // //                           fontSize={13} 
// // // // // //                           fontWeight="600">
// // // // // //                       {healthStatus}
// // // // // //                     </Text>
// // // // // //                   </YStack>
                  
// // // // // //                   {loading ? (
// // // // // //                     <Spinner size="small" color={isSystemOnline ? "#22c55e" : "#ef4444"} />
// // // // // //                   ) : (
// // // // // //                     <LinearGradient
// // // // // //                       colors={isSystemOnline ? ['#22c55e', '#16a34a'] : ['#ef4444', '#dc2626']}
// // // // // //                       style={{
// // // // // //                         width: 12,
// // // // // //                         height: 12,
// // // // // //                         borderRadius: 6,
// // // // // //                         shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
// // // // // //                         shadowOffset: { width: 0, height: 0 },
// // // // // //                         shadowOpacity: 0.8,
// // // // // //                         shadowRadius: 4,
// // // // // //                       }}
// // // // // //                     />
// // // // // //                   )}
// // // // // //                 </XStack>
// // // // // //               </LinearGradient>
// // // // // //             </TouchableOpacity>

// // // // // //             {/* POWERFUL QUICK ACTIONS GRID */}
// // // // // //             <H4 
// // // // // //               color="#EAB308" 
// // // // // //               mb="$4" 
// // // // // //               fontSize={15} 
// // // // // //               letterSpacing={2} 
// // // // // //               fontWeight="800"
// // // // // //               style={{
// // // // // //                 textShadowColor: 'rgba(234, 179, 8, 0.3)',
// // // // // //                 textShadowOffset: { width: 0, height: 0 },
// // // // // //                 textShadowRadius: 5,
// // // // // //               }}
// // // // // //             >
// // // // // //               QUICK ACTIONS
// // // // // //             </H4>
// // // // // //             <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" mb="$6">
// // // // // //               <ActionButton 
// // // // // //                 icon={<ArrowUpRight size={24} color="white"/>} 
// // // // // //                 label="Add Asset" 
// // // // // //                 onPress={() => router.push('/portfolio')}
// // // // // //                 gradient={['#EAB308', '#CA8A04']}
// // // // // //               />
// // // // // //               <ActionButton 
// // // // // //                 icon={<Search size={24} color="white"/>} 
// // // // // //                 label="AI Analysis" 
// // // // // //                 onPress={() => router.push('/analysis')}
// // // // // //                 gradient={['#3b82f6', '#2563eb']}
// // // // // //               />
// // // // // //               <ActionButton 
// // // // // //                 icon={<Briefcase size={24} color="white"/>} 
// // // // // //                 label="Income" 
// // // // // //                 onPress={() => router.push('/income')}
// // // // // //                 gradient={['#22c55e', '#16a34a']}
// // // // // //               />
// // // // // //               <ActionButton 
// // // // // //                 icon={<Target size={24} color="white"/>} 
// // // // // //                 label="Budgets" 
// // // // // //                 onPress={() => router.push('/budgets')}
// // // // // //                 gradient={['#a855f7', '#9333ea']}
// // // // // //               />
// // // // // //               <ActionButton 
// // // // // //                 icon={<CreditCard size={24} color="white"/>} 
// // // // // //                 label="Spend" 
// // // // // //                 onPress={() => router.push('/transactions')}
// // // // // //                 gradient={['#ef4444', '#dc2626']}
// // // // // //               />
// // // // // //               <ActionButton 
// // // // // //                 icon={<RefreshCw size={24} color="white"/>} 
// // // // // //                 label="Ask AI" 
// // // // // //                 onPress={() => router.push('/(tabs)/chat')}
// // // // // //                 gradient={['#64748b', '#475569']}
// // // // // //               />
// // // // // //               <ActionButton 
// // // // // //                 icon={<Target size={24} color="white"/>} 
// // // // // //                 label="Goals" 
// // // // // //                 onPress={() => router.push('/goals')}
// // // // // //                 gradient={['#8a4402ff', '#8a4402ff']}
// // // // // //               />
// // // // // //             </XStack>

// // // // // //             {/* ENHANCED FINANCIAL GOALS SECTION */}
// // // // // //             <XStack jc="space-between" ai="center" mb="$3">
// // // // // //               <H4 
// // // // // //                 color="#EAB308" 
// // // // // //                 fontSize={15} 
// // // // // //                 letterSpacing={2} 
// // // // // //                 fontWeight="800"
// // // // // //                 style={{
// // // // // //                   textShadowColor: 'rgba(234, 179, 8, 0.3)',
// // // // // //                   textShadowOffset: { width: 0, height: 0 },
// // // // // //                   textShadowRadius: 5,
// // // // // //                 }}
// // // // // //               >
// // // // // //                 GOALS PROGRESS
// // // // // //               </H4>
// // // // // //               <TouchableOpacity 
// // // // // //                 onPress={() => router.push('/goals')}
// // // // // //                 activeOpacity={0.7}
// // // // // //               >
// // // // // //                 <LinearGradient
// // // // // //                   colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
// // // // // //                   start={{ x: 0, y: 0 }}
// // // // // //                   end={{ x: 1, y: 1 }}
// // // // // //                   style={{
// // // // // //                     borderRadius: 12,
// // // // // //                     paddingHorizontal: 12,
// // // // // //                     paddingVertical: 6,
// // // // // //                     flexDirection: 'row',
// // // // // //                     alignItems: 'center',
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <Text color="#EAB308" fontSize={12} fontWeight="800">MANAGE</Text>
// // // // // //                   <ChevronRight size={14} color="#EAB308" ml="$1" />
// // // // // //                 </LinearGradient>
// // // // // //               </TouchableOpacity>
// // // // // //             </XStack>
            
// // // // // //             <YStack space="$3" mb="$6">
// // // // // //               {profile?.goals && profile.goals.length > 0 ? (
// // // // // //                 profile.goals.slice(0, 2).map((goal, i) => (
// // // // // //                   <TouchableOpacity 
// // // // // //                     key={i} 
// // // // // //                     activeOpacity={0.9}
// // // // // //                     onPress={() => router.push(`/goals/${goal.id}`)}
// // // // // //                     style={{
// // // // // //                       shadowColor: '#EAB308',
// // // // // //                       shadowOffset: { width: 0, height: 4 },
// // // // // //                       shadowOpacity: 0.1,
// // // // // //                       shadowRadius: 8,
// // // // // //                       elevation: 4,
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     <LinearGradient
// // // // // //                       colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
// // // // // //                       start={{ x: 0, y: 0 }}
// // // // // //                       end={{ x: 1, y: 1 }}
// // // // // //                       style={{
// // // // // //                         padding: 20,
// // // // // //                         borderRadius: 20,
// // // // // //                         borderWidth: 1,
// // // // // //                         borderColor: 'rgba(234, 179, 8, 0.2)',
// // // // // //                       }}
// // // // // //                     >
// // // // // //                       <XStack jc="space-between" mb="$3">
// // // // // //                         <YStack>
// // // // // //                           <XStack ai="center" space="$2" mb="$1">
// // // // // //                             <TargetIcon size={14} color="#EAB308" />
// // // // // //                             <Text color="white" fontWeight="800" fontSize={15}>{goal.title}</Text>
// // // // // //                           </XStack>
// // // // // //                           <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
// // // // // //                             {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
// // // // // //                           </Text>
// // // // // //                         </YStack>
// // // // // //                         <Text color="#EAB308" fontSize={18} fontWeight="900">
// // // // // //                           {Math.round((goal.current / goal.target) * 100)}%
// // // // // //                         </Text>
// // // // // //                       </XStack>
// // // // // //                       <Progress 
// // // // // //                         value={(goal.current / goal.target) * 100} 
// // // // // //                         h={8} 
// // // // // //                         bg="rgba(255,255,255,0.1)"
// // // // // //                         br="$10"
// // // // // //                       >
// // // // // //                         <Progress.Indicator 
// // // // // //                           bg="#EAB308" 
// // // // // //                           animation="bouncy"
// // // // // //                           br="$10"
// // // // // //                           style={{
// // // // // //                             shadowColor: '#EAB308',
// // // // // //                             shadowOffset: { width: 0, height: 0 },
// // // // // //                             shadowOpacity: 0.5,
// // // // // //                             shadowRadius: 4,
// // // // // //                           }}
// // // // // //                         />
// // // // // //                       </Progress>
// // // // // //                     </LinearGradient>
// // // // // //                   </TouchableOpacity>
// // // // // //                 ))
// // // // // //               ) : (
// // // // // //                 <TouchableOpacity 
// // // // // //                   activeOpacity={0.8}
// // // // // //                   onPress={() => router.push('/goals')}
// // // // // //                   style={{
// // // // // //                     shadowColor: '#EAB308',
// // // // // //                     shadowOffset: { width: 0, height: 4 },
// // // // // //                     shadowOpacity: 0.1,
// // // // // //                     shadowRadius: 8,
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <LinearGradient
// // // // // //                     colors={['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']}
// // // // // //                     start={{ x: 0, y: 0 }}
// // // // // //                     end={{ x: 1, y: 1 }}
// // // // // //                     style={{
// // // // // //                       padding: 24,
// // // // // //                       borderRadius: 20,
// // // // // //                       borderWidth: 2,
// // // // // //                       borderColor: 'rgba(234, 179, 8, 0.2)',
// // // // // //                       borderStyle: 'dashed',
// // // // // //                       alignItems: 'center',
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     <Target size={28} color="#EAB308" />
// // // // // //                     <Text color="#EAB308" fontSize={13} fontWeight="700" mt="$2">SET YOUR FIRST GOAL</Text>
// // // // // //                     <Text color="rgba(234, 179, 8, 0.6)" fontSize={11} mt="$1">Tap to create financial target</Text>
// // // // // //                   </LinearGradient>
// // // // // //                 </TouchableOpacity>
// // // // // //               )}
// // // // // //             </YStack>

// // // // // //             {/* POWERFUL HOLDINGS PREVIEW */}
// // // // // //             <XStack jc="space-between" ai="center" mb="$3">
// // // // // //               <H4 
// // // // // //                 color="#EAB308" 
// // // // // //                 fontSize={15} 
// // // // // //                 letterSpacing={2} 
// // // // // //                 fontWeight="800"
// // // // // //                 style={{
// // // // // //                   textShadowColor: 'rgba(234, 179, 8, 0.3)',
// // // // // //                   textShadowOffset: { width: 0, height: 0 },
// // // // // //                   textShadowRadius: 5,
// // // // // //                 }}
// // // // // //               >
// // // // // //                 HOLDINGS
// // // // // //               </H4>
// // // // // //               <TouchableOpacity 
// // // // // //                 onPress={() => router.push('/portfolio')}
// // // // // //                 activeOpacity={0.7}
// // // // // //               >
// // // // // //                 <LinearGradient
// // // // // //                   colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
// // // // // //                   start={{ x: 0, y: 0 }}
// // // // // //                   end={{ x: 1, y: 1 }}
// // // // // //                   style={{
// // // // // //                     borderRadius: 12,
// // // // // //                     paddingHorizontal: 12,
// // // // // //                     paddingVertical: 6,
// // // // // //                     flexDirection: 'row',
// // // // // //                     alignItems: 'center',
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <Text color="#EAB308" fontSize={12} fontWeight="800">VIEW ALL</Text>
// // // // // //                   <ChevronRight size={14} color="#EAB308" ml="$1" />
// // // // // //                 </LinearGradient>
// // // // // //               </TouchableOpacity>
// // // // // //             </XStack>

// // // // // //             <YStack space="$3">
// // // // // //               {profile?.investments && profile.investments.length > 0 ? (
// // // // // //                 profile.investments.slice(0, 3).map((inv, i) => (
// // // // // //                   <TouchableOpacity 
// // // // // //                     key={i} 
// // // // // //                     activeOpacity={0.9}
      
// // // // // //                     style={{
// // // // // //                       shadowColor: '#EAB308',
// // // // // //                       shadowOffset: { width: 0, height: 4 },
// // // // // //                       shadowOpacity: 0.1,
// // // // // //                       shadowRadius: 8,
// // // // // //                       elevation: 4,
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     <LinearGradient
// // // // // //                       colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
// // // // // //                       start={{ x: 0, y: 0 }}
// // // // // //                       end={{ x: 1, y: 1 }}
// // // // // //                       style={{
// // // // // //                         padding: 20,
// // // // // //                         borderRadius: 20,
// // // // // //                         borderWidth: 1,
// // // // // //                         borderColor: 'rgba(234, 179, 8, 0.2)',
// // // // // //                         flexDirection: 'row',
// // // // // //                         justifyContent: 'space-between',
// // // // // //                         alignItems: 'center',
// // // // // //                       }}
// // // // // //                     >
// // // // // //                       <XStack ai="center" space="$4">
// // // // // //                         <LinearGradient
// // // // // //                           colors={i === 0 ? ['#EAB308', '#CA8A04'] : 
// // // // // //                                  i === 1 ? ['#3b82f6', '#2563eb'] : 
// // // // // //                                  ['#22c55e', '#16a34a']}
// // // // // //                           start={{ x: 0, y: 0 }}
// // // // // //                           end={{ x: 1, y: 1 }}
// // // // // //                           style={{
// // // // // //                             width: 48,
// // // // // //                             height: 48,
// // // // // //                             borderRadius: 14,
// // // // // //                             justifyContent: 'center',
// // // // // //                             alignItems: 'center',
// // // // // //                             shadowColor: i === 0 ? '#EAB308' : i === 1 ? '#3b82f6' : '#22c55e',
// // // // // //                             shadowOffset: { width: 0, height: 2 },
// // // // // //                             shadowOpacity: 0.4,
// // // // // //                             shadowRadius: 4,
// // // // // //                             elevation: 4,
// // // // // //                           }}
// // // // // //                         >
// // // // // //                           {i === 0 && <Wallet size={24} color="white" />}
// // // // // //                           {i === 1 && <TrendingUp size={24} color="white" />}
// // // // // //                           {i === 2 && <PieChart size={24} color="white" />}
// // // // // //                         </LinearGradient>
// // // // // //                         <YStack>
// // // // // //                           <Text color="white" fontWeight="800" fontSize={16}>{inv.identifier}</Text>
// // // // // //                           <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
// // // // // //                             {inv.asset_type?.toUpperCase()}
// // // // // //                           </Text>
// // // // // //                         </YStack>
// // // // // //                       </XStack>
// // // // // //                       <YStack ai="flex-end">
// // // // // //                         <Text color="white" fontWeight="800" fontSize={16}>
// // // // // //                           {formatCurrency(inv.current_value)}
// // // // // //                         </Text>
// // // // // //                         <LinearGradient
// // // // // //                           colors={['#22c55e', '#16a34a']}
// // // // // //                           start={{ x: 0, y: 0 }}
// // // // // //                           end={{ x: 1, y: 1 }}
// // // // // //                           style={{
// // // // // //                             borderRadius: 12,
// // // // // //                             paddingHorizontal: 8,
// // // // // //                             paddingVertical: 3,
// // // // // //                             marginTop: 4,
// // // // // //                             flexDirection: 'row',
// // // // // //                             alignItems: 'center',
// // // // // //                           }}
// // // // // //                         >
// // // // // //                           <TrendingUp size={12} color="white" />
// // // // // //                           <Text color="white" fontSize={11} fontWeight="700" ml="$0.5">STABLE</Text>
// // // // // //                         </LinearGradient>
// // // // // //                       </YStack>
// // // // // //                     </LinearGradient>
// // // // // //                   </TouchableOpacity>
// // // // // //                 ))
// // // // // //               ) : (
// // // // // //                 <TouchableOpacity 
// // // // // //                   activeOpacity={0.8}
// // // // // //                   onPress={() => router.push('/portfolio')}
// // // // // //                   style={{
// // // // // //                     shadowColor: '#EAB308',
// // // // // //                     shadowOffset: { width: 0, height: 4 },
// // // // // //                     shadowOpacity: 0.1,
// // // // // //                     shadowRadius: 8,
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <LinearGradient
// // // // // //                     colors={['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']}
// // // // // //                     start={{ x: 0, y: 0 }}
// // // // // //                     end={{ x: 1, y: 1 }}
// // // // // //                     style={{
// // // // // //                       padding: 24,
// // // // // //                       borderRadius: 20,
// // // // // //                       borderWidth: 2,
// // // // // //                       borderColor: 'rgba(234, 179, 8, 0.2)',
// // // // // //                       borderStyle: 'dashed',
// // // // // //                       alignItems: 'center',
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     <Wallet size={28} color="#EAB308" />
// // // // // //                     <Text color="#EAB308" fontSize={13} fontWeight="700" mt="$2">ADD FIRST ASSET</Text>
// // // // // //                     <Text color="rgba(234, 179, 8, 0.6)" fontSize={11} mt="$1">Tap to link your investments</Text>
// // // // // //                   </LinearGradient>
// // // // // //                 </TouchableOpacity>
// // // // // //               )}
// // // // // //             </YStack>

// // // // // //             {/* BOTTOM PADDING */}
// // // // // //             <YStack h={40} />

// // // // // //           </ScrollView>
// // // // // //         </SafeAreaView>
// // // // // //       </LinearGradient>
// // // // // //     </Theme>
// // // // // //   );
// // // // // // }

// // // // // // // Enhanced ActionButton with Powerful Gradients
// // // // // // function ActionButton({ icon, label, onPress, gradient }) {
// // // // // //   const [scale] = useState(new Animated.Value(1));

// // // // // //   const handlePressIn = () => {
// // // // // //     Animated.spring(scale, {
// // // // // //       toValue: 0.95,
// // // // // //       useNativeDriver: true,
// // // // // //       tension: 150,
// // // // // //       friction: 3,
// // // // // //     }).start();
// // // // // //   };

// // // // // //   const handlePressOut = () => {
// // // // // //     Animated.spring(scale, {
// // // // // //       toValue: 1,
// // // // // //       useNativeDriver: true,
// // // // // //       tension: 150,
// // // // // //       friction: 3,
// // // // // //     }).start();
// // // // // //   };

// // // // // //   return (
// // // // // //     <TouchableOpacity
// // // // // //       activeOpacity={1}
// // // // // //       onPressIn={handlePressIn}
// // // // // //       onPressOut={handlePressOut}
// // // // // //       onPress={onPress}
// // // // // //       style={{
// // // // // //         width: BUTTON_WIDTH,
// // // // // //         height: 100,
// // // // // //         marginBottom: 12,
// // // // // //       }}
// // // // // //     >
// // // // // //       <Animated.View style={{ transform: [{ scale }], flex: 1 }}>
// // // // // //         <LinearGradient
// // // // // //           colors={gradient}
// // // // // //           start={{ x: 0, y: 0 }}
// // // // // //           end={{ x: 1, y: 1 }}
// // // // // //           style={{
// // // // // //             flex: 1,
// // // // // //             borderRadius: 20,
// // // // // //             justifyContent: 'center',
// // // // // //             alignItems: 'center',
// // // // // //             shadowColor: gradient[0],
// // // // // //             shadowOffset: { width: 0, height: 4 },
// // // // // //             shadowOpacity: 0.3,
// // // // // //             shadowRadius: 8,
// // // // // //             elevation: 8,
// // // // // //             borderWidth: 1,
// // // // // //             borderColor: 'rgba(255, 255, 255, 0.1)',
// // // // // //           }}
// // // // // //         >
// // // // // //           {icon}
// // // // // //           <Text color="white" fontSize={12} fontWeight="800" mt="$2" letterSpacing={0.5}>
// // // // // //             {label}
// // // // // //           </Text>
// // // // // //         </LinearGradient>
// // // // // //       </Animated.View>
// // // // // //     </TouchableOpacity>
// // // // // //   );
// // // // // // }



// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import { ScrollView, RefreshControl } from 'react-native';
// // // // // // import { YStack, XStack, Text, Card, Button, H3, Spinner, LinearGradient } from 'tamagui';
// // // // // // import { Sparkles, TrendingUp, Wallet, Target, ChevronRight } from '@tamagui/lucide-icons';
// // // // // // import { useFinanceStore } from '../../../store/financeStore';
// // // // // // import { dashboardService } from '../../../services/dashboardService';

// // // // // // export default function Dashboard() {
// // // // // //   const { dashboard, score, loading, refreshDashboard } = useFinanceStore();
// // // // // //   const [aiInsight, setAiInsight] = useState('');
// // // // // //   const [isExplaining, setIsExplaining] = useState(false);

// // // // // //   useEffect(() => {
// // // // // //     refreshDashboard();
// // // // // //   }, []);

// // // // // //   const handleExplainAI = async () => {
// // // // // //     setIsExplaining(true);
// // // // // //     try {
// // // // // //       const res = await dashboardService.explainDashboard();
// // // // // //       setAiInsight(res.data);
// // // // // //     } catch (e) {
// // // // // //       setAiInsight("Failed to generate insight. Check connection.");
// // // // // //     } finally {
// // // // // //       setIsExplaining(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <ScrollView 
// // // // // //       style={{ backgroundColor: '#000' }}
// // // // // //       refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshDashboard} tintColor="#EAB308" />}
// // // // // //     >
// // // // // //       <YStack p="$4" space="$5" pt="$8">
        
// // // // // //         {/* FINANCE SCORE SECTION */}
// // // // // //         <Card p="$5" br="$6" bc="$gray3" bw={1} bg="rgba(255,255,255,0.03)">
// // // // // //           <XStack jc="space-between" ai="center">
// // // // // //             <YStack space="$1">
// // // // // //               <Text color="$gray11" ls={1} fontSize={12} fontWeight="bold">FINANCE SCORE</Text>
// // // // // //               <H3 color="white" fontSize={42}>{score}<Text fontSize={18} color="$gray10">/100</Text></H3>
// // // // // //             </YStack>
// // // // // //             <Button 
// // // // // //               size="$3" br="$10" bg="$gold10" color="black" 
// // // // // //               icon={isExplaining ? <Spinner color="black" /> : Sparkles}
// // // // // //               onPress={handleExplainAI}
// // // // // //             >
// // // // // //               Explain
// // // // // //             </Button>
// // // // // //           </XStack>
          
// // // // // //           {aiInsight ? (
// // // // // //             <YStack mt="$4" p="$3" br="$4" bg="rgba(234,179,8,0.1)" bc="$gold8" bw={0.5}>
// // // // // //               <Text color="white" fontSize={13} lh={18}>{aiInsight}</Text>
// // // // // //             </YStack>
// // // // // //           ) : null}
// // // // // //         </Card>

// // // // // //         {/* QUICK STATS */}
// // // // // //         <XStack space="$3">
// // // // // //           <StatCard icon={<Wallet size={18} color="$gold10"/>} label="Net Worth" value={`₹${dashboard?.total_assets || 0}`} />
// // // // // //           <StatCard icon={<TrendingUp size={18} color="$green10"/>} label="Avg Spend" value={`₹${dashboard?.monthly_expenses || 0}`} />
// // // // // //         </XStack>

// // // // // //         {/* GOAL PREVIEW (Intelligence API) */}
// // // // // //         <YStack space="$3">
// // // // // //           <XStack jc="space-between" ai="center">
// // // // // //             <Text color="white" fontWeight="bold">Active Goals</Text>
// // // // // //             <ChevronRight size={18} color="$gray10" />
// // // // // //           </XStack>
// // // // // //           {dashboard?.goals?.map((goal, i) => (
// // // // // //             <Card key={i} p="$4" bc="$gray3" bw={1} bg="#080808">
// // // // // //               <XStack jc="space-between" ai="center">
// // // // // //                 <YStack>
// // // // // //                   <Text color="white" fontWeight="bold">{goal.name}</Text>
// // // // // //                   <Text color="$gray11" fontSize={12}>Target: ₹{goal.target_amount}</Text>
// // // // // //                 </YStack>
// // // // // //                 <Text color="$gold10" fontWeight="bold">{goal.progress_pct}%</Text>
// // // // // //               </XStack>
// // // // // //             </Card>
// // // // // //           ))}
// // // // // //         </YStack>

// // // // // //       </YStack>
// // // // // //     </ScrollView>
// // // // // //   );
// // // // // // }

// // // // // // // Helper Mini-Component
// // // // // // function StatCard({ icon, label, value }) {
// // // // // //   return (
// // // // // //     <Card f={1} p="$4" br="$5" bc="$gray3" bw={1} bg="rgba(255,255,255,0.02)">
// // // // // //       {icon}
// // // // // //       <Text color="$gray10" fontSize={11} mt="$2" ls={0.5}>{label}</Text>
// // // // // //       <Text color="white" fontSize={18} fontWeight="bold" mt="$1">{value}</Text>
// // // // // //     </Card>
// // // // // //   );
// // // // // // }



// // // // // // import React, { useEffect, useState, useCallback } from 'react';
// // // // // // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
// // // // // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress } from 'tamagui';
// // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // import { 
// // // // // //   Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
// // // // // //   ChevronRight, Shield, BarChart3, Wallet, Cpu
// // // // // // } from '@tamagui/lucide-icons';
// // // // // // import { useRouter } from 'expo-router';
// // // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // // // // // --- NEW WIRING (The Brains) ---
// // // // // // import { useFinanceStore } from '../../../store/financeStore';
// // // // // // import { useUserStore } from '../../../store/userStore';

// // // // // // const { width } = Dimensions.get('window');
// // // // // // const BUTTON_WIDTH = (width - 40 - 15) / 2;

// // // // // // export default function Dashboard() {
// // // // // //   const router = useRouter();
// // // // // //   const insets = useSafeAreaInsets();
  
// // // // // //   // 1. Get data from the Global Stores we just created
// // // // // //   const { dashboard, score, loading, refreshDashboard } = useFinanceStore();
// // // // // //   const { user, fetchProfile } = useUserStore();

// // // // // //   // 2. Initial Sync
// // // // // //   useEffect(() => {
// // // // // //     refreshDashboard();
// // // // // //     fetchProfile();
// // // // // //   }, []);

// // // // // //   const formatCurrency = (amount) =>
// // // // // //     new Intl.NumberFormat('en-IN', { 
// // // // // //       style: 'currency', 
// // // // // //       currency: 'INR', 
// // // // // //       maximumFractionDigits: 0 
// // // // // //     }).format(amount || 0);

// // // // // //   return (
// // // // // //     <Theme name="dark">
// // // // // //       <LinearGradient 
// // // // // //         colors={['#000000', '#0A0A0A', '#111111']}
// // // // // //         start={{ x: 0, y: 0 }}
// // // // // //         end={{ x: 1, y: 1 }}
// // // // // //         style={{ flex: 1 }}
// // // // // //       >
// // // // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
// // // // // //           <ScrollView
// // // // // //             showsVerticalScrollIndicator={false}
// // // // // //             refreshControl={
// // // // // //               <RefreshControl
// // // // // //                 refreshing={loading}
// // // // // //                 onRefresh={refreshDashboard}
// // // // // //                 tintColor="#EAB308"
// // // // // //               />
// // // // // //             }
// // // // // //             contentContainerStyle={{
// // // // // //               padding: 20,
// // // // // //               paddingBottom: 100,
// // // // // //             }}
// // // // // //           >
// // // // // //             {/* ENHANCED HEADER - Kept your exact split logic */}
// // // // // //             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
// // // // // //               <YStack>
// // // // // //                 <XStack ai="center" space="$2" mb="$1">
// // // // // //                   <Shield size={14} color="#EAB308" />
// // // // // //                   <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">PROTOCOL</Text>
// // // // // //                 </XStack>
// // // // // //                 <H2 color="white" fontWeight="900" fontSize={28}>
// // // // // //                   {user?.full_name ? user.full_name.split(' ')[0] : 'Protocol User'}
// // // // // //                 </H2>
// // // // // //               </YStack>

// // // // // //               <TouchableOpacity onPress={() => router.push('/profile')}>
// // // // // //                 <LinearGradient
// // // // // //                   colors={['#EAB308', '#CA8A04']}
// // // // // //                   style={{ width: 48, height: 48, borderRadius: 24, jc: 'center', ai: 'center', bw: 2, bc: 'rgba(255, 255, 255, 0.2)' }}
// // // // // //                 >
// // // // // //                   <User size={22} color="black" />
// // // // // //                 </LinearGradient>
// // // // // //               </TouchableOpacity>
// // // // // //             </XStack>

// // // // // //             {/* BALANCE SECTION - Using dashboard.total_assets */}
// // // // // //             <YStack bg="#111" p="$5" br="$4" mb="$5" bw={1.5} borderColor="rgba(234, 179, 8, 0.2)">
// // // // // //               <Text color="#EAB308" fontSize={11} letterSpacing={2} fontWeight="600" mb="$2">TOTAL NET WORTH</Text>
// // // // // //               <H2 color="white" fontWeight="900" fontSize={38}>
// // // // // //                 {loading && !dashboard ? "..." : formatCurrency(dashboard?.total_assets)}
// // // // // //               </H2>
// // // // // //               <XStack ai="center" space="$3" mt="$3">
// // // // // //                 <XStack bg="#1a1a1a" px="$2.5" py="$1" br="$2" ai="center" borderColor="rgba(34, 197, 94, 0.3)" bw={1}>
// // // // // //                   <TrendingUp size={14} color="#22c55e" />
// // // // // //                   <Text color="#22c55e" fontSize={12} fontWeight="700" ml="$1">+2.4% Today</Text>
// // // // // //                 </XStack>
// // // // // //               </XStack>
// // // // // //             </YStack>

// // // // // //             {/* SYSTEM STATUS - Using your Finance Score API */}
// // // // // //             <YStack mb={24} p={20} br={20} bw={1} bc="rgba(34, 197, 94, 0.3)" bg="rgba(34, 197, 94, 0.05)">
// // // // // //               <XStack ai="center" space="$4">
// // // // // //                 <Cpu size={22} color="#22c55e" />
// // // // // //                 <YStack f={1}>
// // // // // //                   <Text color="white" fontWeight="800" fontSize={16}>AI CORE SYSTEM</Text>
// // // // // //                   <Text color="rgba(34, 197, 94, 0.9)" fontSize={13} fontWeight="600">
// // // // // //                     Finance Score: {score}/100
// // // // // //                   </Text>
// // // // // //                 </YStack>
// // // // // //               </XStack>
// // // // // //             </YStack>

// // // // // //             {/* QUICK ACTIONS GRID - Kept your exact gradients */}
// // // // // //             <H4 color="#EAB308" mb="$4" fontSize={15} letterSpacing={2} fontWeight="800">QUICK ACTIONS</H4>
// // // // // //             <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" mb="$6">
// // // // // //               <ActionButton icon={<ArrowUpRight size={24} color="white"/>} label="Add Asset" onPress={() => router.push('/portfolio')} gradient={['#EAB308', '#CA8A04']} />
// // // // // //               <ActionButton icon={<Search size={24} color="white"/>} label="AI Analysis" onPress={() => router.push('/analysis')} gradient={['#3b82f6', '#2563eb']} />
// // // // // //               <ActionButton icon={<Briefcase size={24} color="white"/>} label="Income" onPress={() => router.push('/income')} gradient={['#22c55e', '#16a34a']} />
// // // // // //               <ActionButton icon={<CreditCard size={24} color="white"/>} label="Spend" onPress={() => router.push('/transactions')} gradient={['#ef4444', '#dc2626']} />
// // // // // //             </XStack>

// // // // // //             {/* GOALS PROGRESS - Mapping your real Goals from API */}
// // // // // //             <H4 color="#EAB308" fontSize={15} letterSpacing={2} fontWeight="800" mb="$3">GOALS PROGRESS</H4>
// // // // // //             <YStack space="$3" mb="$6">
// // // // // //               {dashboard?.goals?.map((goal, i) => (
// // // // // //                 <LinearGradient key={i} colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']} style={{ padding: 20, borderRadius: 20, bw: 1, borderColor: 'rgba(234, 179, 8, 0.2)' }}>
// // // // // //                   <XStack jc="space-between" mb="$3">
// // // // // //                     <Text color="white" fontWeight="800">{goal.name}</Text>
// // // // // //                     <Text color="#EAB308" fontWeight="900">{goal.progress_pct}%</Text>
// // // // // //                   </XStack>
// // // // // //                   <Progress value={goal.progress_pct} h={8} bg="rgba(255,255,255,0.1)">
// // // // // //                     <Progress.Indicator bg="#EAB308" animation="bouncy" />
// // // // // //                   </Progress>
// // // // // //                 </LinearGradient>
// // // // // //               ))}
// // // // // //             </YStack>

// // // // // //           </ScrollView>
// // // // // //         </SafeAreaView>
// // // // // //       </LinearGradient>
// // // // // //     </Theme>
// // // // // //   );
// // // // // // }

// // // // // // // ActionButton Helper (kept your scaling animation logic)
// // // // // // function ActionButton({ icon, label, onPress, gradient }) {
// // // // // //   return (
// // // // // //     <TouchableOpacity onPress={onPress} style={{ width: BUTTON_WIDTH, height: 100 }}>
// // // // // //       <LinearGradient colors={gradient} style={{ flex: 1, br: 20, jc: 'center', ai: 'center', shadowOpacity: 0.3 }}>
// // // // // //         {icon}
// // // // // //         <Text color="white" fontSize={12} fontWeight="800" mt="$2">{label}</Text>
// // // // // //       </LinearGradient>
// // // // // //     </TouchableOpacity>
// // // // // //   );
// // // // // // }





// // // // // import React, { useEffect, useState, useCallback, useRef } from 'react';
// // // // // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
// // // // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress, Card } from 'tamagui';
// // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // import { 
// // // // //   TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
// // // // //   ChevronRight, Shield, BarChart3, Wallet, Target as TargetIcon, Cpu, Sparkles
// // // // // } from '@tamagui/lucide-icons';
// // // // // import { useRouter } from 'expo-router';
// // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // // // // --- SERVICES ---
// // // // // import { api } from '../../../services/api';
// // // // // import { UserService } from '../../../services/userService';

// // // // // const { width } = Dimensions.get('window');
// // // // // const BUTTON_WIDTH = (width - 40 - 15) / 2;

// // // // // export default function Dashboard() {
// // // // //   const router = useRouter();
// // // // //   const insets = useSafeAreaInsets();

// // // // //   // --- DASHBOARD STATE ---
// // // // //   const [profile, setProfile] = useState(null);
// // // // //   const [overview, setOverview] = useState({ monthly_income: 0, monthly_expense: 0, total_investments: 0 });
// // // // //   const [goals, setGoals] = useState([]);
// // // // //   const [investments, setInvestments] = useState([]);
// // // // //   const [financeScore, setFinanceScore] = useState(0);
// // // // //   const [aiExplanation, setAiExplanation] = useState('');
  
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [isExplaining, setIsExplaining] = useState(false);

// // // // //   // --- DATA FETCHING (Multi-API Sync) ---
// // // // //   const fetchData = useCallback(async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       // Calling all dashboard APIs in parallel for speed
// // // // //       const [
// // // // //         profileRes, 
// // // // //         overviewRes, 
// // // // //         goalsRes, 
// // // // //         investmentsRes, 
// // // // //         scoreRes
// // // // //       ] = await Promise.all([
// // // // //         UserService.getProfile(),
// // // // //         api.get('/api/v1/dashboard/overview'),
// // // // //         api.get('/api/v1/dashboard/goals'),
// // // // //         api.get('/api/v1/dashboard/investments'),
// // // // //         api.get('/api/v1/dashboard/score')
// // // // //       ]);

// // // // //       setProfile(profileRes);
// // // // //       setOverview(overviewRes.data);
// // // // //       setGoals(goalsRes.data || []);
// // // // //       setInvestments(investmentsRes.data || []);
// // // // //       setFinanceScore(scoreRes.data);

// // // // //     } catch (error) {
// // // // //       console.error("Dashboard Sync Error:", error);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     fetchData();
// // // // //   }, [fetchData]);

// // // // //   // --- AI EXPLAIN FUNCTION ---
// // // // //   const handleAiExplain = async () => {
// // // // //     setIsExplaining(true);
// // // // //     try {
// // // // //       const res = await api.post('/api/v1/dashboard/explain');
// // // // //       setAiExplanation(res.data);
// // // // //     } catch (e) {
// // // // //       setAiExplanation("AI Core currently analyzing updated signals. Try again shortly.");
// // // // //     } finally {
// // // // //       setIsExplaining(false);
// // // // //     }
// // // // //   };

// // // // //   const formatCurrency = (amount) =>
// // // // //     new Intl.NumberFormat('en-IN', { 
// // // // //       style: 'currency', 
// // // // //       currency: 'INR',
// // // // //       maximumFractionDigits: 0 
// // // // //     }).format(amount || 0);

// // // // //   return (
// // // // //     <Theme name="dark">
// // // // //       <LinearGradient 
// // // // //         colors={['#000000', '#0A0A0A', '#111111']}
// // // // //         start={{ x: 0, y: 0 }}
// // // // //         end={{ x: 1, y: 1 }}
// // // // //         style={{ flex: 1 }}
// // // // //       >
// // // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
// // // // //           <ScrollView
// // // // //             showsVerticalScrollIndicator={false}
// // // // //             refreshControl={
// // // // //               <RefreshControl refreshing={loading} onRefresh={fetchData} tintColor="#EAB308" />
// // // // //             }
// // // // //             contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
// // // // //           >
// // // // //             {/* PROTOCOL HEADER */}
// // // // //             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
// // // // //               <YStack>
// // // // //                 <XStack ai="center" space="$2" mb="$1">
// // // // //                   <Shield size={14} color="#EAB308" />
// // // // //                   <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">PROTOCOL</Text>
// // // // //                 </XStack>
// // // // //                 <H2 color="white" fontWeight="900" fontSize={28}>
// // // // //                   {profile?.full_name ? profile.full_name.split(' ')[0] : 'FINNI USER'}
// // // // //                 </H2>
// // // // //               </YStack>

// // // // //               <TouchableOpacity onPress={() => router.push('/profile')}>
// // // // //                 <LinearGradient
// // // // //                   colors={['#EAB308', '#CA8A04']}
// // // // //                   style={{ width: 48, height: 48, borderRadius: 24, jc: 'center', ai: 'center', bw: 2, bc: 'rgba(255, 255, 255, 0.2)' }}
// // // // //                 >
// // // // //                   <User size={22} color="black" />
// // // // //                 </LinearGradient>
// // // // //               </TouchableOpacity>
// // // // //             </XStack>

// // // // //             {/* BALANCE SECTION */}
// // // // //             <YStack 
// // // // //               bg="#111111" p="$5" br="$4" mb="$5" bw={1.5} borderColor="rgba(234, 179, 8, 0.2)"
// // // // //             >
// // // // //               <Text color="#EAB308" fontSize={11} letterSpacing={2} fontWeight="600" mb="$2">TOTAL INVESTMENTS</Text>
// // // // //               <H2 color="white" fontWeight="900" fontSize={38} letterSpacing={-0.5}>
// // // // //                 {formatCurrency(overview.total_investments)}
// // // // //               </H2>
              
// // // // //               <XStack ai="center" space="$3" mt="$3">
// // // // //                 <XStack bg="#1a1a1a" px="$2.5" py="$1" br="$2" ai="center" bc="rgba(34, 197, 94, 0.3)" bw={1}>
// // // // //                   <TrendingUp size={14} color="#22c55e" />
// // // // //                   <Text color="#22c55e" fontSize={12} fontWeight="700" ml="$1">+2.4% Today</Text>
// // // // //                 </XStack>
                
// // // // //                 <Button 
// // // // //                   size="$2" br="$10" bg="$gold10" color="black" 
// // // // //                   icon={isExplaining ? <Spinner color="black" /> : Sparkles}
// // // // //                   onPress={handleAiExplain}
// // // // //                 >
// // // // //                   AI Explain
// // // // //                 </Button>
// // // // //               </XStack>

// // // // //               {aiExplanation ? (
// // // // //                 <YStack mt="$4" p="$3" br="$4" bg="rgba(234, 179, 8, 0.1)" bc="$gold8" bw={0.5}>
// // // // //                    <Text color="white" fontSize={13} lh={18}>{aiExplanation}</Text>
// // // // //                 </YStack>
// // // // //               ) : null}
// // // // //             </YStack>

// // // // //             {/* SYSTEM STATUS (FINANCE SCORE) */}
// // // // //             <YStack mb={24} p={20} br={20} bw={1} bc="rgba(34, 197, 94, 0.3)" bg="rgba(34, 197, 94, 0.05)">
// // // // //               <XStack ai="center" space="$4">
// // // // //                 <LinearGradient
// // // // //                   colors={['#22c55e', '#16a34a']}
// // // // //                   style={{ width: 44, height: 44, borderRadius: 22, jc: 'center', ai: 'center' }}
// // // // //                 >
// // // // //                   <Cpu size={22} color="white" />
// // // // //                 </LinearGradient>
// // // // //                 <YStack f={1}>
// // // // //                   <Text color="white" fontWeight="800" fontSize={16}>FINANCE SCORE: {financeScore}/100</Text>
// // // // //                   <Text color="rgba(34, 197, 94, 0.9)" fontSize={13} fontWeight="600">
// // // // //                     System suggests {financeScore > 70 ? 'optimal' : 'adjusting'} liquidity.
// // // // //                   </Text>
// // // // //                 </YStack>
// // // // //               </XStack>
// // // // //             </YStack>

// // // // //             {/* QUICK ACTIONS GRID */}
// // // // //             <H4 color="#EAB308" mb="$4" fontSize={15} letterSpacing={2} fontWeight="800">QUICK ACTIONS</H4>
// // // // //             <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" mb="$6">
// // // // //               <ActionButton icon={<ArrowUpRight size={24} color="white"/>} label="Add Asset" onPress={() => router.push('/portfolio')} gradient={['#EAB308', '#CA8A04']} />
// // // // //               <ActionButton icon={<Search size={24} color="white"/>} label="AI Analysis" onPress={() => router.push('/analysis')} gradient={['#3b82f6', '#2563eb']} />
// // // // //               <ActionButton icon={<Briefcase size={24} color="white"/>} label="Income" onPress={() => router.push('/income')} gradient={['#22c55e', '#16a34a']} />
// // // // //               <ActionButton icon={<CreditCard size={24} color="white"/>} label="Spend" onPress={() => router.push('/transactions')} gradient={['#ef4444', '#dc2626']} />
// // // // //             </XStack>

// // // // //             {/* GOALS PROGRESS */}
// // // // //             <XStack jc="space-between" ai="center" mb="$3">
// // // // //               <H4 color="#EAB308" fontSize={15} letterSpacing={2} fontWeight="800">GOALS PROGRESS</H4>
// // // // //               <TouchableOpacity onPress={() => router.push('/goals')}>
// // // // //                 <Text color="#EAB308" fontSize={12} fontWeight="800">MANAGE <ChevronRight size={12} /></Text>
// // // // //               </TouchableOpacity>
// // // // //             </XStack>
            
// // // // //             <YStack space="$3" mb="$6">
// // // // //               {goals.length > 0 ? goals.slice(0, 2).map((goal, i) => (
// // // // //                 <LinearGradient key={i} colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']} style={{ padding: 20, borderRadius: 20, bw: 1, borderColor: 'rgba(234, 179, 8, 0.2)' }}>
// // // // //                   <XStack jc="space-between" mb="$3">
// // // // //                     <Text color="white" fontWeight="800" fontSize={15}>{goal.name}</Text>
// // // // //                     <Text color="#EAB308" fontSize={18} fontWeight="900">{Math.round((goal.current_amount / goal.target_amount) * 100)}%</Text>
// // // // //                   </XStack>
// // // // //                   <Progress value={(goal.current_amount / goal.target_amount) * 100} h={8} bg="rgba(255,255,255,0.1)">
// // // // //                     <Progress.Indicator bg="#EAB308" animation="bouncy" />
// // // // //                   </Progress>
// // // // //                 </LinearGradient>
// // // // //               )) : (
// // // // //                 <Text color="$gray10" textAlign="center" py="$4">No active goals found.</Text>
// // // // //               )}
// // // // //             </YStack>

// // // // //             {/* HOLDINGS PREVIEW */}
// // // // //             <H4 color="#EAB308" fontSize={15} letterSpacing={2} fontWeight="800" mb="$3">HOLDINGS</H4>
// // // // //             <YStack space="$3">
// // // // //               {investments.length > 0 ? investments.slice(0, 3).map((inv, i) => (
// // // // //                 <LinearGradient key={i} colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']} style={{ padding: 20, borderRadius: 20, bw: 1, borderColor: 'rgba(234, 179, 8, 0.2)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
// // // // //                   <XStack ai="center" space="$4">
// // // // //                     <YStack>
// // // // //                       <Text color="white" fontWeight="800" fontSize={16}>{inv.name || inv.identifier}</Text>
// // // // //                       <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>{inv.asset_type?.toUpperCase()}</Text>
// // // // //                     </YStack>
// // // // //                   </XStack>
// // // // //                   <YStack ai="flex-end">
// // // // //                     <Text color="white" fontWeight="800" fontSize={16}>{formatCurrency(inv.current_value)}</Text>
// // // // //                     <Text color="$green10" fontSize={11} fontWeight="700">LIVE</Text>
// // // // //                   </YStack>
// // // // //                 </LinearGradient>
// // // // //               )) : (
// // // // //                 <Text color="$gray10" textAlign="center" py="$4">No assets tracked.</Text>
// // // // //               )}
// // // // //             </YStack>

// // // // //           </ScrollView>
// // // // //         </SafeAreaView>
// // // // //       </LinearGradient>
// // // // //     </Theme>
// // // // //   );
// // // // // }

// // // // // // --- REUSABLE COMPONENTS ---
// // // // // function ActionButton({ icon, label, onPress, gradient }) {
// // // // //   const scale = useRef(new Animated.Value(1)).current;

// // // // //   const handlePressIn = () => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
// // // // //   const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

// // // // //   return (
// // // // //     <TouchableOpacity 
// // // // //       activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}
// // // // //       style={{ width: BUTTON_WIDTH, height: 100, marginBottom: 12 }}
// // // // //     >
// // // // //       <Animated.View style={{ transform: [{ scale }], flex: 1 }}>
// // // // //         <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', shadowColor: gradient[0], shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
// // // // //           {icon}
// // // // //           <Text color="white" fontSize={12} fontWeight="800" mt="$2" letterSpacing={0.5}>{label}</Text>
// // // // //         </LinearGradient>
// // // // //       </Animated.View>
// // // // //     </TouchableOpacity>
// // // // //   );
// // // // // }


// // // // import React, { useEffect, useState, useCallback, useRef } from 'react';
// // // // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
// // // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress } from 'tamagui';
// // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // import { 
// // // //   TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
// // // //   ChevronRight, Shield, BarChart3, Wallet, Target as TargetIcon, Cpu, Sparkles
// // // // } from '@tamagui/lucide-icons';
// // // // import { useRouter } from 'expo-router';
// // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // // // --- SERVICES ---
// // // // import { api } from '../../../services/api';
// // // // import { UserService } from '../../../services/userService';

// // // // const { width } = Dimensions.get('window');
// // // // const BUTTON_WIDTH = (width - 40 - 15) / 2;

// // // // export default function Dashboard() {
// // // //   const router = useRouter();
// // // //   const insets = useSafeAreaInsets();

// // // //   // --- DASHBOARD STATE ---
// // // //   const [profile, setProfile] = useState(null);
// // // //   const [overview, setOverview] = useState({ monthly_income: 0, monthly_expense: 0, total_investments: 0 });
// // // //   const [goals, setGoals] = useState([]);
// // // //   const [investments, setInvestments] = useState([]);
// // // //   const [financeScore, setFinanceScore] = useState(0); // Initialize as a number
// // // //   const [aiExplanation, setAiExplanation] = useState('');
  
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [isExplaining, setIsExplaining] = useState(false);

// // // //   // --- DATA FETCHING ---
// // // //   const fetchData = useCallback(async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const [profileRes, overviewRes, goalsRes, investmentsRes, scoreRes] = await Promise.all([
// // // //         UserService.getProfile(),
// // // //         api.get('/api/v1/dashboard/overview'),
// // // //         api.get('/api/v1/dashboard/goals'),
// // // //         api.get('/api/v1/dashboard/investments'),
// // // //         api.get('/api/v1/dashboard/score')
// // // //       ]);

// // // //       setProfile(profileRes);
// // // //       setOverview(overviewRes.data);
// // // //       setGoals(goalsRes.data || []);
// // // //       setInvestments(investmentsRes.data || []);
      
// // // //       // ✅ FIX: Extract the score if it's an object, otherwise use it directly
// // // //       const scoreValue = typeof scoreRes.data === 'object' ? scoreRes.data.score : scoreRes.data;
// // // //       setFinanceScore(scoreValue || 0);

// // // //     } catch (error) {
// // // //       console.error("Dashboard Sync Error:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //   }, [fetchData]);

// // // //   const handleAiExplain = async () => {
// // // //     setIsExplaining(true);
// // // //     try {
// // // //       const res = await api.post('/api/v1/dashboard/explain');
// // // //       // If the response is an object like { "summary": "..." }, extract the string
// // // //       const summaryText = typeof res.data === 'object' ? res.data.summary : res.data;
// // // //       setAiExplanation(summaryText);
// // // //     } catch (e) {
// // // //       setAiExplanation("AI Core currently analyzing signals.");
// // // //     } finally {
// // // //       setIsExplaining(false);
// // // //     }
// // // //   };

// // // //   const formatCurrency = (amount) =>
// // // //     new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);

// // // //   if (loading && !profile) {
// // // //     return (
// // // //       <YStack f={1} bg="#000" jc="center" ai="center">
// // // //         <Spinner size="large" color="#EAB308" />
// // // //       </YStack>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <LinearGradient colors={['#000000', '#0A0A0A', '#111111']} style={{ flex: 1 }}>
// // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
// // // //           <ScrollView
// // // //             showsVerticalScrollIndicator={false}
// // // //             refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} tintColor="#EAB308" />}
// // // //             contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
// // // //           >
// // // //             {/* PROTOCOL HEADER */}
// // // //             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
// // // //               <YStack>
// // // //                 <XStack ai="center" space="$2" mb="$1">
// // // //                   <Shield size={14} color="#EAB308" />
// // // //                   <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">PROTOCOL</Text>
// // // //                 </XStack>
// // // //                 <H2 color="white" fontWeight="900" fontSize={28}>
// // // //                   {profile?.full_name ? profile.full_name.split(' ')[0] : 'FINNI USER'}
// // // //                 </H2>
// // // //               </YStack>
// // // //               <TouchableOpacity onPress={() => router.push('/profile')}>
// // // //                 <YStack w={48} h={48} br={24} bg="$gold10" jc="center" ai="center">
// // // //                   <User size={22} color="black" />
// // // //                 </YStack>
// // // //               </TouchableOpacity>
// // // //             </XStack>

// // // //             {/* BALANCE CARD */}
// // // //             <YStack bg="#111" p="$5" br="$4" mb="$5" bw={1.5} bc="rgba(234, 179, 8, 0.2)">
// // // //               <Text color="#EAB308" fontSize={11} letterSpacing={2} fontWeight="600" mb="$2">TOTAL INVESTMENTS</Text>
// // // //               <H2 color="white" fontWeight="900" fontSize={38}>
// // // //                 {formatCurrency(overview.total_investments)}
// // // //               </H2>
// // // //               <XStack ai="center" space="$3" mt="$3">
// // // //                 <Button size="$2" br="$10" bg="$gold10" color="black" icon={isExplaining ? <Spinner color="black" /> : Sparkles} onPress={handleAiExplain}>
// // // //                   AI Explain
// // // //                 </Button>
// // // //               </XStack>
// // // //               {aiExplanation ? (
// // // //                 <YStack mt="$4" p="$3" br="$4" bg="rgba(234, 179, 8, 0.1)" bc="$gold8" bw={0.5}>
// // // //                    <Text color="white" fontSize={13}>{String(aiExplanation)}</Text>
// // // //                 </YStack>
// // // //               ) : null}
// // // //             </YStack>

// // // //             {/* FINANCE SCORE CARD */}
// // // //             <YStack mb={24} p={20} br={20} bw={1} bc="rgba(34, 197, 94, 0.3)" bg="rgba(34, 197, 94, 0.05)">
// // // //               <XStack ai="center" space="$4">
// // // //                 <Cpu size={22} color="#22c55e" />
// // // //                 <YStack f={1}>
// // // //                   {/* ✅ FIX: financeScore is now guaranteed to be a number/string, not an object */}
// // // //                   <Text color="white" fontWeight="800" fontSize={16}>FINANCE SCORE: {financeScore}/100</Text>
// // // //                   <Text color="rgba(34, 197, 94, 0.9)" fontSize={13} fontWeight="600">
// // // //                     System analysis: {financeScore > 70 ? 'Operational' : 'Adjustment Required'}
// // // //                   </Text>
// // // //                 </YStack>
// // // //               </XStack>
// // // //             </YStack>

// // // //             {/* QUICK ACTIONS GRID */}
// // // //             <H4 color="#EAB308" mb="$4" fontSize={15} letterSpacing={2} fontWeight="800">QUICK ACTIONS</H4>
// // // //             <XStack flexWrap="wrap" jc="space-between" gap="$3" mb="$6">
// // // //               <ActionButton icon={<ArrowUpRight size={24} color="white"/>} label="Add Asset" onPress={() => router.push('/portfolio')} gradient={['#EAB308', '#CA8A04']} />
// // // //               <ActionButton icon={<Search size={24} color="white"/>} label="AI Analysis" onPress={() => router.push('/analysis')} gradient={['#3b82f6', '#2563eb']} />
// // // //               <ActionButton icon={<Briefcase size={24} color="white"/>} label="Income" onPress={() => router.push('/income')} gradient={['#22c55e', '#16a34a']} />
// // // //               <ActionButton icon={<CreditCard size={24} color="white"/>} label="Spend" onPress={() => router.push('/transactions')} gradient={['#ef4444', '#dc2626']} />
// // // //             </XStack>

// // // //           </ScrollView>
// // // //         </SafeAreaView>
// // // //       </LinearGradient>
// // // //     </Theme>
// // // //   );
// // // // }

// // // // function ActionButton({ icon, label, onPress, gradient }) {
// // // //   return (
// // // //     <TouchableOpacity onPress={onPress} style={{ width: BUTTON_WIDTH, height: 100, marginBottom: 12 }}>
// // // //       <LinearGradient colors={gradient} style={{ flex: 1, br: 20, jc: 'center', ai: 'center' }}>
// // // //         {icon}
// // // //         <Text color="white" fontSize={12} fontWeight="800" mt="$2">{label}</Text>
// // // //       </LinearGradient>
// // // //     </TouchableOpacity>
// // // //   );
// // // // }



// // // import React, { useEffect, useState, useCallback } from 'react';
// // // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
// // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress } from 'tamagui';
// // // import { LinearGradient } from 'expo-linear-gradient';
// // // import { BlurView } from 'expo-blur';
// // // import { 
// // //   Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
// // //   ChevronRight, Shield, Zap, PieChart, BarChart3, Wallet, Target as TargetIcon, Cpu
// // // } from '@tamagui/lucide-icons';
// // // import { useRouter } from 'expo-router';
// // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // // Services - Updated to use new endpoints
// // // import { ApiService } from '../../../services/apiService';

// // // const TAB_BAR_HEIGHT = 70;
// // // const { width } = Dimensions.get('window');
// // // const BUTTON_WIDTH = (width - 40 - 15) / 2;

// // // export default function Dashboard() {
// // //   const router = useRouter();
// // //   const insets = useSafeAreaInsets();
// // //   const scaleAnim = useState(new Animated.Value(1))[0];

// // //   // --- STATE ---
// // //   const [dashboardData, setDashboardData] = useState({
// // //     overview: null,
// // //     goals: [],
// // //     investments: [],
// // //     financeScore: null
// // //   });
// // //   const [healthStatus, setHealthStatus] = useState('Checking...');
// // //   const [isSystemOnline, setIsSystemOnline] = useState(false);
// // //   const [loading, setLoading] = useState(true);
// // //   const [refreshing, setRefreshing] = useState(false);

// // //   // --- DATA FETCHING ---
// // //   const fetchDashboardData = useCallback(async () => {
// // //     try {
// // //       setLoading(true);
      
// // //       // Fetch all dashboard data in parallel
// // //       const [overviewRes, goalsRes, investmentsRes, scoreRes] = await Promise.all([
// // //         ApiService.get('/dashboard/overview'),
// // //         ApiService.get('/dashboard/goals'),
// // //         ApiService.get('/dashboard/investments'),
// // //         ApiService.get('/dashboard/score')
// // //       ]);

// // //       setDashboardData({
// // //         overview: overviewRes.data,
// // //         goals: goalsRes.data || [],
// // //         investments: investmentsRes.data || [],
// // //         financeScore: scoreRes.data
// // //       });

// // //       // Check system health - assuming overview endpoint indicates system status
// // //       setIsSystemOnline(true);
// // //       setHealthStatus("System Operational");
      
// // //     } catch (error) {
// // //       console.log("Dashboard Data Fetch Error:", error);
// // //       setHealthStatus("Connection Error");
// // //       setIsSystemOnline(false);
      
// // //       // Set fallback data
// // //       setDashboardData({
// // //         overview: { total_balance: 0, monthly_growth: 0, daily_growth: 0 },
// // //         goals: [],
// // //         investments: [],
// // //         financeScore: { score: 0, level: 'Beginner' }
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //       setRefreshing(false);
// // //     }
// // //   }, []);

// // //   const fetchData = useCallback(async () => {
// // //     await fetchDashboardData();
// // //   }, [fetchDashboardData]);

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, [fetchData]);

// // //   const onRefresh = useCallback(() => {
// // //     setRefreshing(true);
// // //     fetchDashboardData();
// // //   }, [fetchDashboardData]);

// // //   const formatCurrency = (amount) =>
// // //     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount || 0);

// // //   const calculateTotalBalance = () => {
// // //     if (dashboardData.overview?.total_balance) {
// // //       return dashboardData.overview.total_balance;
// // //     }
    
// // //     // Fallback calculation from investments
// // //     if (dashboardData.investments && dashboardData.investments.length > 0) {
// // //       return dashboardData.investments.reduce(
// // //         (sum, item) => sum + (Number(item.current_value) || 0), 
// // //         0
// // //       );
// // //     }
    
// // //     return 0;
// // //   };

// // //   const totalBalance = calculateTotalBalance();
// // //   const monthlyGrowth = dashboardData.overview?.monthly_growth || 5.2;
// // //   const dailyGrowth = dashboardData.overview?.daily_growth || 2.4;
// // //   const financeScore = dashboardData.financeScore?.score || 0;
// // //   const scoreLevel = dashboardData.financeScore?.level || 'Beginner';

// // //   return (
// // //     <Theme name="dark">
// // //       <LinearGradient 
// // //         colors={['#000000', '#0A0A0A', '#111111']}
// // //         start={{ x: 0, y: 0 }}
// // //         end={{ x: 1, y: 1 }}
// // //         style={{ flex: 1 }}
// // //       >
// // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
// // //           <ScrollView
// // //             showsVerticalScrollIndicator={false}
// // //             refreshControl={
// // //               <RefreshControl
// // //                 refreshing={refreshing}
// // //                 onRefresh={onRefresh}
// // //                 tintColor="#EAB308"
// // //               />
// // //             }
// // //             contentContainerStyle={{
// // //               padding: 20,
// // //               paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 20,
// // //             }}
// // //           >

// // //             {/* ENHANCED HEADER */}
// // //             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
// // //               <YStack>
// // //                 <XStack ai="center" space="$2" mb="$1">
// // //                   <Shield size={14} color="#EAB308" />
// // //                   <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">PROTOCOL</Text>
// // //                 </XStack>
// // //                 <H2 
// // //                   color="white" 
// // //                   fontWeight="900" 
// // //                   fontSize={28} 
// // //                   numberOfLines={1}
// // //                   style={{
// // //                     textShadowColor: 'rgba(234, 179, 8, 0.3)',
// // //                     textShadowOffset: { width: 0, height: 0 },
// // //                     textShadowRadius: 10,
// // //                   }}
// // //                 >
// // //                   Dashboard
// // //                 </H2>
// // //               </YStack>

// // //               {/* FINANCE SCORE BADGE */}
// // //               <TouchableOpacity 
// // //                 onPress={() => router.push('/profile')}
// // //                 activeOpacity={0.8}
// // //               >
// // //                 <LinearGradient
// // //                   colors={getScoreGradient(financeScore)}
// // //                   start={{ x: 0, y: 0 }}
// // //                   end={{ x: 1, y: 1 }}
// // //                   style={{
// // //                     paddingHorizontal: 12,
// // //                     paddingVertical: 8,
// // //                     borderRadius: 20,
// // //                     alignItems: 'center',
// // //                     minWidth: 100,
// // //                     borderWidth: 1,
// // //                     borderColor: 'rgba(255, 255, 255, 0.2)',
// // //                   }}
// // //                 >
// // //                   <Text color="white" fontSize={10} fontWeight="700">FINANCE SCORE</Text>
// // //                   <XStack ai="center" space="$1">
// // //                     <Text color="white" fontSize={16} fontWeight="900">{financeScore}</Text>
// // //                     <Text color="rgba(255,255,255,0.8)" fontSize={10}>/100</Text>
// // //                   </XStack>
// // //                   <Text color="rgba(255,255,255,0.9)" fontSize={9} fontWeight="600">{scoreLevel}</Text>
// // //                 </LinearGradient>
// // //               </TouchableOpacity>
// // //             </XStack>

// // //             {/* BALANCE SECTION - Minimal & Powerful */}
// // //             <YStack 
// // //               bg="#111111" 
// // //               p="$5" 
// // //               br="$4" 
// // //               mb="$5" 
// // //               bw={1.5}
// // //               borderColor="rgba(234, 179, 8, 0.2)"
// // //               style={{
// // //                 position: 'relative',
// // //                 overflow: 'hidden',
// // //               }}
// // //             >
// // //               <YStack 
// // //                 position="absolute" 
// // //                 top={0} 
// // //                 right={0} 
// // //                 width={100} 
// // //                 height={100} 
// // //                 br={50}
// // //                 bg="rgba(234, 179, 8, 0.05)"
// // //               />
              
// // //               <Text 
// // //                 color="#EAB308" 
// // //                 fontSize={11} 
// // //                 letterSpacing={2} 
// // //                 fontWeight="600" 
// // //                 mb="$2"
// // //               >
// // //                 TOTAL NET WORTH
// // //               </Text>
              
// // //               <H2 
// // //                 color="white" 
// // //                 fontWeight="900" 
// // //                 fontSize={38}
// // //                 letterSpacing={-0.5}
// // //               >
// // //                 {loading && !dashboardData.overview ? "..." : formatCurrency(totalBalance)}
// // //               </H2>
              
// // //               <XStack ai="center" space="$3" mt="$3">
// // //                 <XStack 
// // //                   bg="#1a1a1a" 
// // //                   px="$2.5" 
// // //                   py="$1" 
// // //                   br="$2"
// // //                   ai="center"
// // //                   borderColor="rgba(34, 197, 94, 0.3)"
// // //                   bw={1}
// // //                 >
// // //                   <TrendingUp size={14} color="#22c55e" />
// // //                   <Text color="#22c55e" fontSize={12} fontWeight="700" ml="$1">+{dailyGrowth}% Today</Text>
// // //                 </XStack>
                
// // //                 <XStack 
// // //                   bg="#1a1a1a" 
// // //                   px="$2.5" 
// // //                   py="$1" 
// // //                   br="$2"
// // //                   ai="center"
// // //                   borderColor="rgba(234, 179, 8, 0.3)"
// // //                   bw={1}
// // //                 >
// // //                   <BarChart3 size={14} color="#EAB308" />
// // //                   <Text color="#EAB308" fontSize={12} fontWeight="700" ml="$1">+{monthlyGrowth}% Monthly</Text>
// // //                 </XStack>
// // //               </XStack>
// // //             </YStack>

// // //             {/* ENHANCED SYSTEM STATUS */}
// // //             <TouchableOpacity 
// // //               activeOpacity={0.9}
// // //               onPress={() => router.push('/system')}
// // //               style={{
// // //                 marginBottom: 24,
// // //                 shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
// // //                 shadowOffset: { width: 0, height: 4 },
// // //                 shadowOpacity: 0.3,
// // //                 shadowRadius: 8,
// // //                 elevation: 8,
// // //               }}
// // //             >
// // //               <LinearGradient
// // //                 colors={isSystemOnline 
// // //                   ? ['rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0.05)'] 
// // //                   : ['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.05)']
// // //                 }
// // //                 start={{ x: 0, y: 0 }}
// // //                 end={{ x: 1, y: 1 }}
// // //                 style={{
// // //                   borderRadius: 20,
// // //                   padding: 20,
// // //                   borderWidth: 1,
// // //                   borderColor: isSystemOnline ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
// // //                 }}
// // //               >
// // //                 <XStack ai="center" space="$4">
// // //                   <LinearGradient
// // //                     colors={isSystemOnline ? ['#22c55e', '#16a34a'] : ['#ef4444', '#dc2626']}
// // //                     start={{ x: 0, y: 0 }}
// // //                     end={{ x: 1, y: 1 }}
// // //                     style={{
// // //                       width: 44,
// // //                       height: 44,
// // //                       borderRadius: 22,
// // //                       justifyContent: 'center',
// // //                       alignItems: 'center',
// // //                       shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
// // //                       shadowOffset: { width: 0, height: 2 },
// // //                       shadowOpacity: 0.4,
// // //                       shadowRadius: 4,
// // //                       elevation: 4,
// // //                     }}
// // //                   >
// // //                     {isSystemOnline ? (
// // //                       <Cpu size={22} color="white" />
// // //                     ) : (
// // //                       <Activity size={22} color="white" />
// // //                     )}
// // //                   </LinearGradient>
                  
// // //                   <YStack f={1}>
// // //                     <Text color="white" fontWeight="800" fontSize={16}>AI CORE SYSTEM</Text>
// // //                     <Text color={isSystemOnline ? "rgba(34, 197, 94, 0.9)" : "rgba(239, 68, 68, 0.9)"} 
// // //                           fontSize={13} 
// // //                           fontWeight="600">
// // //                       {healthStatus}
// // //                     </Text>
// // //                     <Text color="rgba(255,255,255,0.6)" fontSize={11} mt="$1">
// // //                       Last updated: Just now
// // //                     </Text>
// // //                   </YStack>
                  
// // //                   {loading ? (
// // //                     <Spinner size="small" color={isSystemOnline ? "#22c55e" : "#ef4444"} />
// // //                   ) : (
// // //                     <LinearGradient
// // //                       colors={isSystemOnline ? ['#22c55e', '#16a34a'] : ['#ef4444', '#dc2626']}
// // //                       style={{
// // //                         width: 12,
// // //                         height: 12,
// // //                         borderRadius: 6,
// // //                         shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
// // //                         shadowOffset: { width: 0, height: 0 },
// // //                         shadowOpacity: 0.8,
// // //                         shadowRadius: 4,
// // //                       }}
// // //                     />
// // //                   )}
// // //                 </XStack>
// // //               </LinearGradient>
// // //             </TouchableOpacity>

// // //             {/* POWERFUL QUICK ACTIONS GRID */}
// // //             <H4 
// // //               color="#EAB308" 
// // //               mb="$4" 
// // //               fontSize={15} 
// // //               letterSpacing={2} 
// // //               fontWeight="800"
// // //               style={{
// // //                 textShadowColor: 'rgba(234, 179, 8, 0.3)',
// // //                 textShadowOffset: { width: 0, height: 0 },
// // //                 textShadowRadius: 5,
// // //               }}
// // //             >
// // //               QUICK ACTIONS
// // //             </H4>
// // //             <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" mb="$6">
// // //               <ActionButton 
// // //                 icon={<ArrowUpRight size={24} color="white"/>} 
// // //                 label="Add Asset" 
// // //                 onPress={() => router.push('/portfolio')}
// // //                 gradient={['#EAB308', '#CA8A04']}
// // //               />
// // //               <ActionButton 
// // //                 icon={<Search size={24} color="white"/>} 
// // //                 label="AI Analysis" 
// // //                 onPress={() => router.push('/analysis')}
// // //                 gradient={['#3b82f6', '#2563eb']}
// // //               />
// // //               <ActionButton 
// // //                 icon={<Briefcase size={24} color="white"/>} 
// // //                 label="Income" 
// // //                 onPress={() => router.push('/income')}
// // //                 gradient={['#22c55e', '#16a34a']}
// // //               />
// // //               <ActionButton 
// // //                 icon={<Target size={24} color="white"/>} 
// // //                 label="Budgets" 
// // //                 onPress={() => router.push('/budgets')}
// // //                 gradient={['#a855f7', '#9333ea']}
// // //               />
// // //               <ActionButton 
// // //                 icon={<CreditCard size={24} color="white"/>} 
// // //                 label="Spend" 
// // //                 onPress={() => router.push('/transactions')}
// // //                 gradient={['#ef4444', '#dc2626']}
// // //               />
// // //               <ActionButton 
// // //                 icon={<RefreshCw size={24} color="white"/>} 
// // //                 label="Ask AI" 
// // //                 onPress={() => router.push('/(tabs)/chat')}
// // //                 gradient={['#64748b', '#475569']}
// // //               />
// // //               <ActionButton 
// // //                 icon={<Target size={24} color="white"/>} 
// // //                 label="Goals" 
// // //                 onPress={() => router.push('/goals')}
// // //                 gradient={['#8a4402ff', '#8a4402ff']}
// // //               />
// // //               <ActionButton 
// // //                 icon={<PieChart size={24} color="white"/>} 
// // //                 label="Charts" 
// // //                 onPress={() => router.push('/dashboard/charts')}
// // //                 gradient={['#06b6d4', '#0891b2']}
// // //               />
// // //             </XStack>

// // //             {/* ENHANCED FINANCIAL GOALS SECTION */}
// // //             <XStack jc="space-between" ai="center" mb="$3">
// // //               <H4 
// // //                 color="#EAB308" 
// // //                 fontSize={15} 
// // //                 letterSpacing={2} 
// // //                 fontWeight="800"
// // //                 style={{
// // //                   textShadowColor: 'rgba(234, 179, 8, 0.3)',
// // //                   textShadowOffset: { width: 0, height: 0 },
// // //                   textShadowRadius: 5,
// // //                 }}
// // //               >
// // //                 GOALS PROGRESS
// // //               </H4>
// // //               <TouchableOpacity 
// // //                 onPress={() => router.push('/goals')}
// // //                 activeOpacity={0.7}
// // //               >
// // //                 <LinearGradient
// // //                   colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
// // //                   start={{ x: 0, y: 0 }}
// // //                   end={{ x: 1, y: 1 }}
// // //                   style={{
// // //                     borderRadius: 12,
// // //                     paddingHorizontal: 12,
// // //                     paddingVertical: 6,
// // //                     flexDirection: 'row',
// // //                     alignItems: 'center',
// // //                   }}
// // //                 >
// // //                   <Text color="#EAB308" fontSize={12} fontWeight="800">MANAGE</Text>
// // //                   <ChevronRight size={14} color="#EAB308" ml="$1" />
// // //                 </LinearGradient>
// // //               </TouchableOpacity>
// // //             </XStack>
            
// // //             <YStack space="$3" mb="$6">
// // //               {dashboardData.goals && dashboardData.goals.length > 0 ? (
// // //                 dashboardData.goals.slice(0, 2).map((goal, i) => (
// // //                   <TouchableOpacity 
// // //                     key={goal.id || i} 
// // //                     activeOpacity={0.9}
// // //                     onPress={() => router.push(`/goals/${goal.id}`)}
// // //                     style={{
// // //                       shadowColor: '#EAB308',
// // //                       shadowOffset: { width: 0, height: 4 },
// // //                       shadowOpacity: 0.1,
// // //                       shadowRadius: 8,
// // //                       elevation: 4,
// // //                     }}
// // //                   >
// // //                     <LinearGradient
// // //                       colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
// // //                       start={{ x: 0, y: 0 }}
// // //                       end={{ x: 1, y: 1 }}
// // //                       style={{
// // //                         padding: 20,
// // //                         borderRadius: 20,
// // //                         borderWidth: 1,
// // //                         borderColor: 'rgba(234, 179, 8, 0.2)',
// // //                       }}
// // //                     >
// // //                       <XStack jc="space-between" mb="$3">
// // //                         <YStack>
// // //                           <XStack ai="center" space="$2" mb="$1">
// // //                             <TargetIcon size={14} color="#EAB308" />
// // //                             <Text color="white" fontWeight="800" fontSize={15}>{goal.title}</Text>
// // //                           </XStack>
// // //                           <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
// // //                             {formatCurrency(goal.current_amount)} of {formatCurrency(goal.target_amount)}
// // //                           </Text>
// // //                         </YStack>
// // //                         <Text color="#EAB308" fontSize={18} fontWeight="900">
// // //                           {goal.progress_percentage || Math.round((goal.current_amount / goal.target_amount) * 100)}%
// // //                         </Text>
// // //                       </XStack>
// // //                       <Progress 
// // //                         value={goal.progress_percentage || (goal.current_amount / goal.target_amount) * 100} 
// // //                         h={8} 
// // //                         bg="rgba(255,255,255,0.1)"
// // //                         br="$10"
// // //                       >
// // //                         <Progress.Indicator 
// // //                           bg="#EAB308" 
// // //                           animation="bouncy"
// // //                           br="$10"
// // //                           style={{
// // //                             shadowColor: '#EAB308',
// // //                             shadowOffset: { width: 0, height: 0 },
// // //                             shadowOpacity: 0.5,
// // //                             shadowRadius: 4,
// // //                           }}
// // //                         />
// // //                       </Progress>
// // //                       {goal.deadline && (
// // //                         <Text color="rgba(255,255,255,0.5)" fontSize={11} mt="$2">
// // //                           Target: {new Date(goal.deadline).toLocaleDateString()}
// // //                         </Text>
// // //                       )}
// // //                     </LinearGradient>
// // //                   </TouchableOpacity>
// // //                 ))
// // //               ) : (
// // //                 <TouchableOpacity 
// // //                   activeOpacity={0.8}
// // //                   onPress={() => router.push('/goals')}
// // //                   style={{
// // //                     shadowColor: '#EAB308',
// // //                     shadowOffset: { width: 0, height: 4 },
// // //                     shadowOpacity: 0.1,
// // //                     shadowRadius: 8,
// // //                   }}
// // //                 >
// // //                   <LinearGradient
// // //                     colors={['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']}
// // //                     start={{ x: 0, y: 0 }}
// // //                     end={{ x: 1, y: 1 }}
// // //                     style={{
// // //                       padding: 24,
// // //                       borderRadius: 20,
// // //                       borderWidth: 2,
// // //                       borderColor: 'rgba(234, 179, 8, 0.2)',
// // //                       borderStyle: 'dashed',
// // //                       alignItems: 'center',
// // //                     }}
// // //                   >
// // //                     <Target size={28} color="#EAB308" />
// // //                     <Text color="#EAB308" fontSize={13} fontWeight="700" mt="$2">SET YOUR FIRST GOAL</Text>
// // //                     <Text color="rgba(234, 179, 8, 0.6)" fontSize={11} mt="$1">Tap to create financial target</Text>
// // //                   </LinearGradient>
// // //                 </TouchableOpacity>
// // //               )}
// // //             </YStack>

// // //             {/* POWERFUL HOLDINGS PREVIEW */}
// // //             <XStack jc="space-between" ai="center" mb="$3">
// // //               <H4 
// // //                 color="#EAB308" 
// // //                 fontSize={15} 
// // //                 letterSpacing={2} 
// // //                 fontWeight="800"
// // //                 style={{
// // //                   textShadowColor: 'rgba(234, 179, 8, 0.3)',
// // //                   textShadowOffset: { width: 0, height: 0 },
// // //                   textShadowRadius: 5,
// // //                 }}
// // //               >
// // //                 HOLDINGS
// // //               </H4>
// // //               <TouchableOpacity 
// // //                 onPress={() => router.push('/portfolio')}
// // //                 activeOpacity={0.7}
// // //               >
// // //                 <LinearGradient
// // //                   colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
// // //                   start={{ x: 0, y: 0 }}
// // //                   end={{ x: 1, y: 1 }}
// // //                   style={{
// // //                     borderRadius: 12,
// // //                     paddingHorizontal: 12,
// // //                     paddingVertical: 6,
// // //                     flexDirection: 'row',
// // //                     alignItems: 'center',
// // //                   }}
// // //                 >
// // //                   <Text color="#EAB308" fontSize={12} fontWeight="800">VIEW ALL</Text>
// // //                   <ChevronRight size={14} color="#EAB308" ml="$1" />
// // //                 </LinearGradient>
// // //               </TouchableOpacity>
// // //             </XStack>

// // //             <YStack space="$3">
// // //               {dashboardData.investments && dashboardData.investments.length > 0 ? (
// // //                 dashboardData.investments.slice(0, 3).map((inv, i) => (
// // //                   <TouchableOpacity 
// // //                     key={inv.id || i} 
// // //                     activeOpacity={0.9}
// // //                     onPress={() => router.push(`/portfolio/${inv.id}`)}
// // //                     style={{
// // //                       shadowColor: '#EAB308',
// // //                       shadowOffset: { width: 0, height: 4 },
// // //                       shadowOpacity: 0.1,
// // //                       shadowRadius: 8,
// // //                       elevation: 4,
// // //                     }}
// // //                   >
// // //                     <LinearGradient
// // //                       colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
// // //                       start={{ x: 0, y: 0 }}
// // //                       end={{ x: 1, y: 1 }}
// // //                       style={{
// // //                         padding: 20,
// // //                         borderRadius: 20,
// // //                         borderWidth: 1,
// // //                         borderColor: 'rgba(234, 179, 8, 0.2)',
// // //                         flexDirection: 'row',
// // //                         justifyContent: 'space-between',
// // //                         alignItems: 'center',
// // //                       }}
// // //                     >
// // //                       <XStack ai="center" space="$4">
// // //                         <LinearGradient
// // //                           colors={i === 0 ? ['#EAB308', '#CA8A04'] : 
// // //                                  i === 1 ? ['#3b82f6', '#2563eb'] : 
// // //                                  ['#22c55e', '#16a34a']}
// // //                           start={{ x: 0, y: 0 }}
// // //                           end={{ x: 1, y: 1 }}
// // //                           style={{
// // //                             width: 48,
// // //                             height: 48,
// // //                             borderRadius: 14,
// // //                             justifyContent: 'center',
// // //                             alignItems: 'center',
// // //                             shadowColor: i === 0 ? '#EAB308' : i === 1 ? '#3b82f6' : '#22c55e',
// // //                             shadowOffset: { width: 0, height: 2 },
// // //                             shadowOpacity: 0.4,
// // //                             shadowRadius: 4,
// // //                             elevation: 4,
// // //                           }}
// // //                         >
// // //                           {i === 0 && <Wallet size={24} color="white" />}
// // //                           {i === 1 && <TrendingUp size={24} color="white" />}
// // //                           {i === 2 && <PieChart size={24} color="white" />}
// // //                         </LinearGradient>
// // //                         <YStack>
// // //                           <Text color="white" fontWeight="800" fontSize={16}>
// // //                             {inv.name || inv.identifier || `Investment ${i+1}`}
// // //                           </Text>
// // //                           <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
// // //                             {inv.type?.toUpperCase() || inv.asset_type?.toUpperCase() || 'INVESTMENT'}
// // //                           </Text>
// // //                         </YStack>
// // //                       </XStack>
// // //                       <YStack ai="flex-end">
// // //                         <Text color="white" fontWeight="800" fontSize={16}>
// // //                           {formatCurrency(inv.current_value || inv.value)}
// // //                         </Text>
// // //                         <XStack 
// // //                           bg={getReturnColor(inv.return_percentage)}
// // //                           px="$2" 
// // //                           py="$1" 
// // //                           br="$2"
// // //                           ai="center"
// // //                           mt="$1"
// // //                         >
// // //                           <TrendingUp size={12} color="white" />
// // //                           <Text color="white" fontSize={11} fontWeight="700" ml="$0.5">
// // //                             {inv.return_percentage ? `${inv.return_percentage > 0 ? '+' : ''}${inv.return_percentage}%` : 'STABLE'}
// // //                           </Text>
// // //                         </XStack>
// // //                       </YStack>
// // //                     </LinearGradient>
// // //                   </TouchableOpacity>
// // //                 ))
// // //               ) : (
// // //                 <TouchableOpacity 
// // //                   activeOpacity={0.8}
// // //                   onPress={() => router.push('/portfolio')}
// // //                   style={{
// // //                     shadowColor: '#EAB308',
// // //                     shadowOffset: { width: 0, height: 4 },
// // //                     shadowOpacity: 0.1,
// // //                     shadowRadius: 8,
// // //                   }}
// // //                 >
// // //                   <LinearGradient
// // //                     colors={['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']}
// // //                     start={{ x: 0, y: 0 }}
// // //                     end={{ x: 1, y: 1 }}
// // //                     style={{
// // //                       padding: 24,
// // //                       borderRadius: 20,
// // //                       borderWidth: 2,
// // //                       borderColor: 'rgba(234, 179, 8, 0.2)',
// // //                       borderStyle: 'dashed',
// // //                       alignItems: 'center',
// // //                     }}
// // //                   >
// // //                     <Wallet size={28} color="#EAB308" />
// // //                     <Text color="#EAB308" fontSize={13} fontWeight="700" mt="$2">ADD FIRST ASSET</Text>
// // //                     <Text color="rgba(234, 179, 8, 0.6)" fontSize={11} mt="$1">Tap to link your investments</Text>
// // //                   </LinearGradient>
// // //                 </TouchableOpacity>
// // //               )}
// // //             </YStack>

// // //             {/* ADDITIONAL ACTIONS */}
// // //             <XStack jc="space-between" mt="$6" mb="$4">
// // //               <TouchableOpacity 
// // //                 onPress={() => router.push('/dashboard/charts')}
// // //                 activeOpacity={0.8}
// // //                 style={{ flex: 1, marginRight: 8 }}
// // //               >
// // //                 <LinearGradient
// // //                   colors={['rgba(59, 130, 246, 0.2)', 'rgba(37, 99, 235, 0.1)']}
// // //                   start={{ x: 0, y: 0 }}
// // //                   end={{ x: 1, y: 1 }}
// // //                   style={{
// // //                     padding: 16,
// // //                     borderRadius: 16,
// // //                     alignItems: 'center',
// // //                     borderWidth: 1,
// // //                     borderColor: 'rgba(59, 130, 246, 0.3)',
// // //                   }}
// // //                 >
// // //                   <BarChart3 size={20} color="#3b82f6" />
// // //                   <Text color="#3b82f6" fontSize={12} fontWeight="700" mt="$2">View Charts</Text>
// // //                 </LinearGradient>
// // //               </TouchableOpacity>
              
// // //               <TouchableOpacity 
// // //                 onPress={() => router.push('/(tabs)/chat')}
// // //                 activeOpacity={0.8}
// // //                 style={{ flex: 1, marginLeft: 8 }}
// // //               >
// // //                 <LinearGradient
// // //                   colors={['rgba(234, 179, 8, 0.2)', 'rgba(202, 138, 4, 0.1)']}
// // //                   start={{ x: 0, y: 0 }}
// // //                   end={{ x: 1, y: 1 }}
// // //                   style={{
// // //                     padding: 16,
// // //                     borderRadius: 16,
// // //                     alignItems: 'center',
// // //                     borderWidth: 1,
// // //                     borderColor: 'rgba(234, 179, 8, 0.3)',
// // //                   }}
// // //                 >
// // //                   <Zap size={20} color="#EAB308" />
// // //                   <Text color="#EAB308" fontSize={12} fontWeight="700" mt="$2">AI Insights</Text>
// // //                 </LinearGradient>
// // //               </TouchableOpacity>
// // //             </XStack>

// // //             {/* BOTTOM PADDING */}
// // //             <YStack h={40} />

// // //           </ScrollView>
// // //         </SafeAreaView>
// // //       </LinearGradient>
// // //     </Theme>
// // //   );
// // // }

// // // // Enhanced ActionButton with Powerful Gradients
// // // function ActionButton({ icon, label, onPress, gradient }) {
// // //   const [scale] = useState(new Animated.Value(1));

// // //   const handlePressIn = () => {
// // //     Animated.spring(scale, {
// // //       toValue: 0.95,
// // //       useNativeDriver: true,
// // //       tension: 150,
// // //       friction: 3,
// // //     }).start();
// // //   };

// // //   const handlePressOut = () => {
// // //     Animated.spring(scale, {
// // //       toValue: 1,
// // //       useNativeDriver: true,
// // //       tension: 150,
// // //       friction: 3,
// // //     }).start();
// // //   };

// // //   return (
// // //     <TouchableOpacity
// // //       activeOpacity={1}
// // //       onPressIn={handlePressIn}
// // //       onPressOut={handlePressOut}
// // //       onPress={onPress}
// // //       style={{
// // //         width: BUTTON_WIDTH,
// // //         height: 100,
// // //         marginBottom: 12,
// // //       }}
// // //     >
// // //       <Animated.View style={{ transform: [{ scale }], flex: 1 }}>
// // //         <LinearGradient
// // //           colors={gradient}
// // //           start={{ x: 0, y: 0 }}
// // //           end={{ x: 1, y: 1 }}
// // //           style={{
// // //             flex: 1,
// // //             borderRadius: 20,
// // //             justifyContent: 'center',
// // //             alignItems: 'center',
// // //             shadowColor: gradient[0],
// // //             shadowOffset: { width: 0, height: 4 },
// // //             shadowOpacity: 0.3,
// // //             shadowRadius: 8,
// // //             elevation: 8,
// // //             borderWidth: 1,
// // //             borderColor: 'rgba(255, 255, 255, 0.1)',
// // //           }}
// // //         >
// // //           {icon}
// // //           <Text color="white" fontSize={12} fontWeight="800" mt="$2" letterSpacing={0.5}>
// // //             {label}
// // //           </Text>
// // //         </LinearGradient>
// // //       </Animated.View>
// // //     </TouchableOpacity>
// // //   );
// // // }

// // // // Helper functions
// // // function getScoreGradient(score) {
// // //   if (score >= 80) return ['#22c55e', '#16a34a'];
// // //   if (score >= 60) return ['#eab308', '#ca8a04'];
// // //   if (score >= 40) return ['#f97316', '#ea580c'];
// // //   return ['#ef4444', '#dc2626'];
// // // }

// // // function getReturnColor(returnPercentage) {
// // //   if (!returnPercentage) return '#22c55e';
// // //   if (returnPercentage > 0) return '#22c55e';
// // //   if (returnPercentage < 0) return '#ef4444';
// // //   return '#eab308';
// // // }

// import React, { useEffect, useState, useCallback } from 'react';
// import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
// import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress } from 'tamagui';
// import { LinearGradient } from 'expo-linear-gradient';
// import { 
//   Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
//   ChevronRight, Shield, Zap, PieChart, BarChart3, Wallet, Target as TargetIcon, Cpu
// } from '@tamagui/lucide-icons';
// import { LineChart, PieChart as RNSPieChart } from 'react-native-chart-kit';
// import { useRouter } from 'expo-router';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // Services
// import { ApiService } from '../../../services/apiService';
// import { AiService } from '../../../services/aiService';

// const TAB_BAR_HEIGHT = 70;
// const { width } = Dimensions.get('window');
// const BUTTON_WIDTH = (width - 40 - 15) / 2;

// export default function Dashboard() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
//   const scaleAnim = useState(new Animated.Value(1))[0];

//   // --- STATE ---
//   const [dashboardData, setDashboardData] = useState({
//     overview: null,
//     goals: [],
//     investments: [],
//     financeScore: null,
//     totalBalance: 0
//   });
//   const [healthStatus, setHealthStatus] = useState('Checking...');
//   const [isSystemOnline, setIsSystemOnline] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // --- DATA FETCHING ---
//   const fetchDashboardData = useCallback(async () => {
//     try {
//       setLoading(true);
      
//       // Check system health by trying to reach the API
//       try {
//         await ApiService.getDashboardOverview();
//         setIsSystemOnline(true);
//         setHealthStatus("System Operational");
//       } catch (healthError) {
//         setIsSystemOnline(false);
//         setHealthStatus("Offline / Unreachable");
//         throw new Error('System offline');
//       }

//       // Fetch all dashboard data
//       const [overviewRes, goalsRes, investmentsRes, scoreRes] = await Promise.all([
//         ApiService.getDashboardOverview(),
//         ApiService.getDashboardGoals(),
//         ApiService.getDashboardInvestments(),
//         ApiService.getDashboardScore().catch(() => ({ data: null })) // Score might not be implemented
//       ]);

//       const overview = overviewRes.data;
//       const goals = goalsRes.data || [];
//       const investments = investmentsRes.data || [];
//       const financeScore = scoreRes?.data || null;
      
//       // Calculate total balance
//       let totalBalance = 0;
//       if (overview?.total_balance !== undefined) {
//         totalBalance = overview.total_balance;
//       } else if (investments && investments.length > 0) {
//         totalBalance = investments.reduce(
//           (sum, item) => sum + (Number(item.current_value) || 0), 
//           0
//         );
//       }

//       setDashboardData({
//         overview,
//         goals,
//         investments,
//         financeScore,
//         totalBalance
//       });
      
//     } catch (error) {
//       console.log("Dashboard Sync Error:", error.message || error);
//       setHealthStatus("Connection Error");
//       setIsSystemOnline(false);
      
//       // Clear data on error
//       setDashboardData({
//         overview: null,
//         goals: [],
//         investments: [],
//         financeScore: null,
//         totalBalance: 0
//       });
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   const fetchData = useCallback(async () => {
//     await fetchDashboardData();
//   }, [fetchDashboardData]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchDashboardData();
//   }, [fetchDashboardData]);

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount || 0);

//   // Helper function to calculate total balance
//   const calculateTotalBalance = () => {
//     if (dashboardData.overview?.total_balance) {
//       return dashboardData.overview.total_balance;
//     }
    
//     if (dashboardData.investments && dashboardData.investments.length > 0) {
//       return dashboardData.investments.reduce(
//         (sum, item) => sum + (Number(item.current_value) || 0), 
//         0
//       );
//     }
    
//     return 0;
//   };

//   const totalBalance = calculateTotalBalance();
//   const monthlyGrowth = dashboardData.overview?.monthly_growth || 0;
//   const dailyGrowth = dashboardData.overview?.daily_growth || 0;
//   const financeScore = dashboardData.financeScore?.score || 0;
//   const scoreLevel = dashboardData.financeScore?.level || 'Beginner';

//   return (
//     <Theme name="dark">
//       <LinearGradient 
//         colors={['#000000', '#0A0A0A', '#111111']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={{ flex: 1 }}
//       >
//         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 tintColor="#EAB308"
//               />
//             }
//             contentContainerStyle={{
//               padding: 20,
//               paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 20,
//             }}
//           >

//             {/* ENHANCED HEADER */}
//             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
//               <YStack>
//                 <XStack ai="center" space="$2" mb="$1">
//                   <Shield size={14} color="#EAB308" />
//                   <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">PROTOCOL</Text>
//                 </XStack>
//                 <H2 
//                   color="white" 
//                   fontWeight="900" 
//                   fontSize={28} 
//                   numberOfLines={1}
//                   style={{
//                     textShadowColor: 'rgba(234, 179, 8, 0.3)',
//                     textShadowOffset: { width: 0, height: 0 },
//                     textShadowRadius: 10,
//                   }}
//                 >
//                   DASHBOARD
//                 </H2>
//               </YStack>

//               <TouchableOpacity 
//                 onPress={() => router.push('/profile')}
//                 style={{
//                   shadowColor: '#EAB308',
//                   shadowOffset: { width: 0, height: 0 },
//                   shadowOpacity: 0.4,
//                   shadowRadius: 10,
//                   elevation: 10,
//                 }}
//               >
//                 <LinearGradient
//                   colors={['#EAB308', '#CA8A04']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={{
//                     width: 48,
//                     height: 48,
//                     borderRadius: 24,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     borderWidth: 2,
//                     borderColor: 'rgba(255, 255, 255, 0.2)',
//                   }}
//                 >
//                   <User size={22} color="black" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </XStack>

//             {/* BALANCE SECTION */}
//             <YStack 
//               bg="#111111" 
//               p="$5" 
//               br="$4" 
//               mb="$5" 
//               bw={1.5}
//               borderColor="rgba(234, 179, 8, 0.2)"
//               style={{
//                 position: 'relative',
//                 overflow: 'hidden',
//               }}
//             >
//               <YStack 
//                 position="absolute" 
//                 top={0} 
//                 right={0} 
//                 width={100} 
//                 height={100} 
//                 br={50}
//                 bg="rgba(234, 179, 8, 0.05)"
//               />
              
//               <Text 
//                 color="#EAB308" 
//                 fontSize={11} 
//                 letterSpacing={2} 
//                 fontWeight="600" 
//                 mb="$2"
//               >
//                 TOTAL NET WORTH
//               </Text>
              
//               <H2 
//                 color="white" 
//                 fontWeight="900" 
//                 fontSize={38}
//                 letterSpacing={-0.5}
//               >
//                 {loading ? "..." : formatCurrency(totalBalance)}
//               </H2>
              
//               <XStack ai="center" space="$3" mt="$3">
//                 <XStack 
//                   bg="#1a1a1a" 
//                   px="$2.5" 
//                   py="$1" 
//                   br="$2"
//                   ai="center"
//                   borderColor="rgba(34, 197, 94, 0.3)"
//                   bw={1}
//                 >
//                   <TrendingUp size={14} color="#22c55e" />
//                   <Text color="#22c55e" fontSize={12} fontWeight="700" ml="$1">+{dailyGrowth}% Today</Text>
//                 </XStack>
                
//                 <XStack 
//                   bg="#1a1a1a" 
//                   px="$2.5" 
//                   py="$1" 
//                   br="$2"
//                   ai="center"
//                   borderColor="rgba(234, 179, 8, 0.3)"
//                   bw={1}
//                 >
//                   <BarChart3 size={14} color="#EAB308" />
//                   <Text color="#EAB308" fontSize={12} fontWeight="700" ml="$1">+{monthlyGrowth}% Monthly</Text>
//                 </XStack>
//               </XStack>
//             </YStack>

//             {/* ENHANCED SYSTEM STATUS */}
//             <TouchableOpacity 
//               activeOpacity={0.9}
//               onPress={() => router.push('/')}
//               style={{
//                 marginBottom: 24,
//                 shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 8,
//                 elevation: 8,
//               }}
//             >
//               <LinearGradient
//                 colors={isSystemOnline 
//                   ? ['rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0.05)'] 
//                   : ['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.05)']
//                 }
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={{
//                   borderRadius: 20,
//                   padding: 20,
//                   borderWidth: 1,
//                   borderColor: isSystemOnline ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
//                 }}
//               >
//                 <XStack ai="center" space="$4">
//                   <LinearGradient
//                     colors={isSystemOnline ? ['#22c55e', '#16a34a'] : ['#ef4444', '#dc2626']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={{
//                       width: 44,
//                       height: 44,
//                       borderRadius: 22,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
//                       shadowOffset: { width: 0, height: 2 },
//                       shadowOpacity: 0.4,
//                       shadowRadius: 4,
//                       elevation: 4,
//                     }}
//                   >
//                     {isSystemOnline ? (
//                       <Cpu size={22} color="white" />
//                     ) : (
//                       <Activity size={22} color="white" />
//                     )}
//                   </LinearGradient>
                  
//                   <YStack f={1}>
//                     <Text color="white" fontWeight="800" fontSize={16}>AI CORE SYSTEM</Text>
//                     <Text color={isSystemOnline ? "rgba(34, 197, 94, 0.9)" : "rgba(239, 68, 68, 0.9)"} 
//                           fontSize={13} 
//                           fontWeight="600">
//                       {healthStatus}
//                     </Text>
//                   </YStack>
                  
//                   {loading ? (
//                     <Spinner size="small" color={isSystemOnline ? "#22c55e" : "#ef4444"} />
//                   ) : (
//                     <LinearGradient
//                       colors={isSystemOnline ? ['#22c55e', '#16a34a'] : ['#ef4444', '#dc2626']}
//                       style={{
//                         width: 12,
//                         height: 12,
//                         borderRadius: 6,
//                         shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
//                         shadowOffset: { width: 0, height: 0 },
//                         shadowOpacity: 0.8,
//                         shadowRadius: 4,
//                       }}
//                     />
//                   )}
//                 </XStack>
//               </LinearGradient>
//             </TouchableOpacity>

//             {/* POWERFUL QUICK ACTIONS GRID */}
//             <H4 
//               color="#EAB308" 
//               mb="$4" 
//               fontSize={15} 
//               letterSpacing={2} 
//               fontWeight="800"
//               style={{
//                 textShadowColor: 'rgba(234, 179, 8, 0.3)',
//                 textShadowOffset: { width: 0, height: 0 },
//                 textShadowRadius: 5,
//               }}
//             >
//               QUICK ACTIONS
//             </H4>
//             <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" mb="$6">
//               <ActionButton 
//                 icon={<ArrowUpRight size={24} color="white"/>} 
//                 label="Add Asset" 
//                 onPress={() => router.push('/portfolio')}
//                 gradient={['#EAB308', '#CA8A04']}
//               />
//               <ActionButton 
//                 icon={<Search size={24} color="white"/>} 
//                 label="AI Analysis" 
//                 onPress={() => router.push('/analysis')}
//                 gradient={['#3b82f6', '#2563eb']}
//               />
//               <ActionButton 
//                 icon={<Briefcase size={24} color="white"/>} 
//                 label="Income" 
//                 onPress={() => router.push('/income')}
//                 gradient={['#22c55e', '#16a34a']}
//               />
//               <ActionButton 
//                 icon={<Target size={24} color="white"/>} 
//                 label="Budgets" 
//                 onPress={() => router.push('/budgets')}
//                 gradient={['#a855f7', '#9333ea']}
//               />
//               <ActionButton 
//                 icon={<CreditCard size={24} color="white"/>} 
//                 label="Spend" 
//                 onPress={() => router.push('/transactions')}
//                 gradient={['#ef4444', '#dc2626']}
//               />
//               <ActionButton 
//                 icon={<RefreshCw size={24} color="white"/>} 
//                 label="Ask AI" 
//                 onPress={() => router.push('/(tabs)/chat')}
//                 gradient={['#64748b', '#475569']}
//               />
//               <ActionButton 
//                 icon={<Target size={24} color="white"/>} 
//                 label="Goals" 
//                 onPress={() => router.push('/goals')}
//                 gradient={['#8a4402ff', '#8a4402ff']}
//               />
//               <ActionButton 
//                 icon={<Briefcase size={24} color="white"/>} 
//                 label="Ingest" 
//                 onPress={() => router.push('/ingest')}
//                 gradient={['#22c55e', '#16a34a']}
//               />
//             </XStack>

//             {/* ENHANCED FINANCIAL GOALS SECTION */}
//             <XStack jc="space-between" ai="center" mb="$3">
//               <H4 
//                 color="#EAB308" 
//                 fontSize={15} 
//                 letterSpacing={2} 
//                 fontWeight="800"
//                 style={{
//                   textShadowColor: 'rgba(234, 179, 8, 0.3)',
//                   textShadowOffset: { width: 0, height: 0 },
//                   textShadowRadius: 5,
//                 }}
//               >
//                 GOALS PROGRESS
//               </H4>
//               <TouchableOpacity 
//                 onPress={() => router.push('/goals')}
//                 activeOpacity={0.7}
//               >
//                 <LinearGradient
//                   colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={{
//                     borderRadius: 12,
//                     paddingHorizontal: 12,
//                     paddingVertical: 6,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <Text color="#EAB308" fontSize={12} fontWeight="800">MANAGE</Text>
//                   <ChevronRight size={14} color="#EAB308" ml="$1" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </XStack>
            
//             <YStack space="$3" mb="$6">
//               {dashboardData.goals && dashboardData.goals.length > 0 ? (
//                 dashboardData.goals.slice(0, 2).map((goal, i) => (
//                   <TouchableOpacity 
//                     key={goal.id || i} 
//                     activeOpacity={0.9}
//                     onPress={() => router.push(`/goals/${goal.id}`)}
//                     style={{
//                       shadowColor: '#EAB308',
//                       shadowOffset: { width: 0, height: 4 },
//                       shadowOpacity: 0.1,
//                       shadowRadius: 8,
//                       elevation: 4,
//                     }}
//                   >
//                     <LinearGradient
//                       colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
//                       start={{ x: 0, y: 0 }}
//                       end={{ x: 1, y: 1 }}
//                       style={{
//                         padding: 20,
//                         borderRadius: 20,
//                         borderWidth: 1,
//                         borderColor: 'rgba(234, 179, 8, 0.2)',
//                       }}
//                     >
//                       <XStack jc="space-between" mb="$3">
//                         <YStack>
//                           <XStack ai="center" space="$2" mb="$1">
//                             <TargetIcon size={14} color="#EAB308" />
//                             <Text color="white" fontWeight="800" fontSize={15}>{goal.title}</Text>
//                           </XStack>
//                           <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
//                             {formatCurrency(goal.current_amount)} of {formatCurrency(goal.target_amount)}
//                           </Text>
//                         </YStack>
//                         <Text color="#EAB308" fontSize={18} fontWeight="900">
//                           {Math.round((goal.current_amount / goal.target_amount) * 100)}%
//                         </Text>
//                       </XStack>
//                       <Progress 
//                         value={(goal.current_amount / goal.target_amount) * 100} 
//                         h={8} 
//                         bg="rgba(255,255,255,0.1)"
//                         br="$10"
//                       >
//                         <Progress.Indicator 
//                           bg="#EAB308" 
//                           animation="bouncy"
//                           br="$10"
//                           style={{
//                             shadowColor: '#EAB308',
//                             shadowOffset: { width: 0, height: 0 },
//                             shadowOpacity: 0.5,
//                             shadowRadius: 4,
//                           }}
//                         />
//                       </Progress>
//                     </LinearGradient>
//                   </TouchableOpacity>
//                 ))
//               ) : (
//                 <TouchableOpacity 
//                   activeOpacity={0.8}
//                   onPress={() => router.push('/goals')}
//                   style={{
//                     shadowColor: '#EAB308',
//                     shadowOffset: { width: 0, height: 4 },
//                     shadowOpacity: 0.1,
//                     shadowRadius: 8,
//                   }}
//                 >
//                   <LinearGradient
//                     colors={['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={{
//                       padding: 24,
//                       borderRadius: 20,
//                       borderWidth: 2,
//                       borderColor: 'rgba(234, 179, 8, 0.2)',
//                       borderStyle: 'dashed',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Target size={28} color="#EAB308" />
//                     <Text color="#EAB308" fontSize={13} fontWeight="700" mt="$2">SET YOUR FIRST GOAL</Text>
//                     <Text color="rgba(234, 179, 8, 0.6)" fontSize={11} mt="$1">Tap to create financial target</Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
//               )}
//             </YStack>

//             {/* POWERFUL HOLDINGS PREVIEW */}
//             <XStack jc="space-between" ai="center" mb="$3">
//               <H4 
//                 color="#EAB308" 
//                 fontSize={15} 
//                 letterSpacing={2} 
//                 fontWeight="800"
//                 style={{
//                   textShadowColor: 'rgba(234, 179, 8, 0.3)',
//                   textShadowOffset: { width: 0, height: 0 },
//                   textShadowRadius: 5,
//                 }}
//               >
//                 HOLDINGS
//               </H4>
//               <TouchableOpacity 
//                 onPress={() => router.push('/portfolio')}
//                 activeOpacity={0.7}
//               >
//                 <LinearGradient
//                   colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={{
//                     borderRadius: 12,
//                     paddingHorizontal: 12,
//                     paddingVertical: 6,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <Text color="#EAB308" fontSize={12} fontWeight="800">VIEW ALL</Text>
//                   <ChevronRight size={14} color="#EAB308" ml="$1" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </XStack>

//             <YStack space="$3">
//               {dashboardData.investments && dashboardData.investments.length > 0 ? (
//                 dashboardData.investments.slice(0, 3).map((inv, i) => (
//                   <TouchableOpacity 
//                     key={inv.id || i} 
//                     activeOpacity={0.9}
//                     style={{
//                       shadowColor: '#EAB308',
//                       shadowOffset: { width: 0, height: 4 },
//                       shadowOpacity: 0.1,
//                       shadowRadius: 8,
//                       elevation: 4,
//                     }}
//                   >
//                     <LinearGradient
//                       colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
//                       start={{ x: 0, y: 0 }}
//                       end={{ x: 1, y: 1 }}
//                       style={{
//                         padding: 20,
//                         borderRadius: 20,
//                         borderWidth: 1,
//                         borderColor: 'rgba(234, 179, 8, 0.2)',
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                       }}
//                     >
//                       <XStack ai="center" space="$4">
//                         <LinearGradient
//                           colors={i === 0 ? ['#EAB308', '#CA8A04'] : 
//                                  i === 1 ? ['#3b82f6', '#2563eb'] : 
//                                  ['#22c55e', '#16a34a']}
//                           start={{ x: 0, y: 0 }}
//                           end={{ x: 1, y: 1 }}
//                           style={{
//                             width: 48,
//                             height: 48,
//                             borderRadius: 14,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             shadowColor: i === 0 ? '#EAB308' : i === 1 ? '#3b82f6' : '#22c55e',
//                             shadowOffset: { width: 0, height: 2 },
//                             shadowOpacity: 0.4,
//                             shadowRadius: 4,
//                             elevation: 4,
//                           }}
//                         >
//                           {i === 0 && <Wallet size={24} color="white" />}
//                           {i === 1 && <TrendingUp size={24} color="white" />}
//                           {i === 2 && <PieChart size={24} color="white" />}
//                         </LinearGradient>
//                         <YStack>
//                           <Text color="white" fontWeight="800" fontSize={16}>{inv.identifier || inv.name}</Text>
//                           <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
//                             {inv.asset_type?.toUpperCase()}
//                           </Text>
//                         </YStack>
//                       </XStack>
//                       <YStack ai="flex-end">
//                         <Text color="white" fontWeight="800" fontSize={16}>
//                           {formatCurrency(inv.current_value)}
//                         </Text>
//                         <LinearGradient
//                           colors={['#22c55e', '#16a34a']}
//                           start={{ x: 0, y: 0 }}
//                           end={{ x: 1, y: 1 }}
//                           style={{
//                             borderRadius: 12,
//                             paddingHorizontal: 8,
//                             paddingVertical: 3,
//                             marginTop: 4,
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                           }}
//                         >
//                           <TrendingUp size={12} color="white" />
//                           <Text color="white" fontSize={11} fontWeight="700" ml="$0.5">STABLE</Text>
//                         </LinearGradient>
//                       </YStack>
//                     </LinearGradient>
//                   </TouchableOpacity>
//                 ))
//               ) : (
//                 <TouchableOpacity 
//                   activeOpacity={0.8}
//                   onPress={() => router.push('/portfolio')}
//                   style={{
//                     shadowColor: '#EAB308',
//                     shadowOffset: { width: 0, height: 4 },
//                     shadowOpacity: 0.1,
//                     shadowRadius: 8,
//                   }}
//                 >
//                   <LinearGradient
//                     colors={['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={{
//                       padding: 24,
//                       borderRadius: 20,
//                       borderWidth: 2,
//                       borderColor: 'rgba(234, 179, 8, 0.2)',
//                       borderStyle: 'dashed',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Wallet size={28} color="#EAB308" />
//                     <Text color="#EAB308" fontSize={13} fontWeight="700" mt="$2">ADD FIRST ASSET</Text>
//                     <Text color="rgba(234, 179, 8, 0.6)" fontSize={11} mt="$1">Tap to link your investments</Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
//               )}
//             </YStack>

//             {/* BOTTOM PADDING */}
//             <YStack h={40} />

//           </ScrollView>
//         </SafeAreaView>
//       </LinearGradient>
//     </Theme>
//   );
// }

// // Enhanced ActionButton with Powerful Gradients
// function ActionButton({ icon, label, onPress, gradient }) {
//   const [scale] = useState(new Animated.Value(1));

//   const handlePressIn = () => {
//     Animated.spring(scale, {
//       toValue: 0.95,
//       useNativeDriver: true,
//       tension: 150,
//       friction: 3,
//     }).start();
//   };

//   const handlePressOut = () => {
//     Animated.spring(scale, {
//       toValue: 1,
//       useNativeDriver: true,
//       tension: 150,
//       friction: 3,
//     }).start();
//   };

//   return (
//     <TouchableOpacity
//       activeOpacity={1}
//       onPressIn={handlePressIn}
//       onPressOut={handlePressOut}
//       onPress={onPress}
//       style={{
//         width: BUTTON_WIDTH,
//         height: 100,
//         marginBottom: 12,
//       }}
//     >
//       <Animated.View style={{ transform: [{ scale }], flex: 1 }}>
//         <LinearGradient
//           colors={gradient}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={{
//             flex: 1,
//             borderRadius: 20,
//             justifyContent: 'center',
//             alignItems: 'center',
//             shadowColor: gradient[0],
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 0.3,
//             shadowRadius: 8,
//             elevation: 8,
//             borderWidth: 1,
//             borderColor: 'rgba(255, 255, 255, 0.1)',
//           }}
//         >
//           {icon}
//           <Text color="white" fontSize={12} fontWeight="800" mt="$2" letterSpacing={0.5}>
//             {label}
//           </Text>
//         </LinearGradient>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// }   


// // import React, { useEffect, useState, useCallback, useRef } from 'react';
// // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated, Easing, PanResponder, View } from 'react-native';
// // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress, Card } from 'tamagui';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import * as Haptics from 'expo-haptics';
// // import { 
// //   Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
// //   ChevronRight, Shield, Zap, PieChart, BarChart3, Wallet, Target as TargetIcon, Cpu,
// //   Star, Award, Trophy, TrendingDown, Eye, EyeOff, MoreVertical, Sparkles, Rocket,
// //   Bell, Settings, LineChart, Coins, Globe, Shield as ShieldIcon, Lock, Unlock,
// //   Clock, Calendar, CheckCircle, AlertCircle, DollarSign, Bitcoin, Landmark,
// //   Smartphone, CreditCard as CardIcon, Bank, Building
// // } from '@tamagui/lucide-icons';
// // import { useRouter } from 'expo-router';
// // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // import { BlurView } from 'expo-blur';
// // import AnimatedNumber from 'react-native-animated-number';
// // import { MotiView, MotiText } from 'moti';

// // // Services
// // import { ApiService } from '../../../services/apiService';
// // import { AiService } from '../../../services/aiService';

// // const TAB_BAR_HEIGHT = 70;
// // const { width, height } = Dimensions.get('window');
// // const BUTTON_WIDTH = (width - 40 - 15) / 2;

// // // Glassmorphism effect
// // const GlassCard = ({ children, intensity = 20, ...props }) => (
// //   <BlurView intensity={intensity} tint="dark" style={{ borderRadius: 24, overflow: 'hidden' }}>
// //     <LinearGradient
// //       colors={['rgba(255, 255, 255, 0.07)', 'rgba(255, 255, 255, 0.03)']}
// //       start={{ x: 0, y: 0 }}
// //       end={{ x: 1, y: 1 }}
// //       style={{ padding: 20, borderRadius: 24 }}
// //       {...props}
// //     >
// //       {children}
// //     </LinearGradient>
// //   </BlurView>
// // );

// // export default function Dashboard() {
// //   const router = useRouter();
// //   const insets = useSafeAreaInsets();
// //   const scrollY = useRef(new Animated.Value(0)).current;
// //   const balanceScale = useRef(new Animated.Value(1)).current;
// //   const [showBalance, setShowBalance] = useState(true);
// //   const [isAnimating, setIsAnimating] = useState(false);

// //   // --- STATE ---
// //   const [dashboardData, setDashboardData] = useState({
// //     overview: null,
// //     goals: [],
// //     investments: [],
// //     financeScore: null,
// //     totalBalance: 0,
// //     insights: [],
// //     recentTransactions: []
// //   });
  
// //   const [healthStatus, setHealthStatus] = useState('Checking...');
// //   const [isSystemOnline, setIsSystemOnline] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [stats, setStats] = useState({
// //     dailyChange: 0,
// //     weeklyChange: 0,
// //     monthlyChange: 0,
// //     riskLevel: 'Low',
// //     portfolioDiversity: 0
// //   });

// //   // Parallax effect for header
// //   const headerTranslateY = scrollY.interpolate({
// //     inputRange: [0, 100],
// //     outputRange: [0, -50],
// //     extrapolate: 'clamp',
// //   });

// //   const headerOpacity = scrollY.interpolate({
// //     inputRange: [0, 80],
// //     outputRange: [1, 0],
// //     extrapolate: 'clamp',
// //   });

// //   // Enhanced data fetching with simulated analytics
// //   const fetchDashboardData = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// //       // System health check with enhanced monitoring
// //       try {
// //         const healthCheck = await ApiService.getSystemHealth();
// //         setIsSystemOnline(true);
// //         setHealthStatus(healthCheck.data?.status || "System Operational");
        
// //         // Add subtle haptic feedback for success
// //         Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
// //       } catch (healthError) {
// //         setIsSystemOnline(false);
// //         setHealthStatus("Offline / Unreachable");
// //         Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
// //         throw new Error('System offline');
// //       }

// //       // Enhanced parallel fetching with timeout
// //       const fetchPromises = [
// //         ApiService.getDashboardOverview(),
// //         ApiService.getDashboardGoals(),
// //         ApiService.getDashboardInvestments(),
// //         ApiService.getDashboardScore(),
// //         ApiService.getRecentTransactions().catch(() => ({ data: [] })),
// //         ApiService.getFinancialInsights().catch(() => ({ data: [] }))
// //       ];

// //       const [
// //         overviewRes, 
// //         goalsRes, 
// //         investmentsRes, 
// //         scoreRes, 
// //         transactionsRes,
// //         insightsRes
// //       ] = await Promise.all(fetchPromises.map(p => 
// //         Promise.race([p, new Promise(resolve => setTimeout(resolve, 5000))])
// //       ));

// //       const overview = overviewRes?.data || {};
// //       const goals = goalsRes?.data || [];
// //       const investments = investmentsRes?.data || [];
// //       const financeScore = scoreRes?.data || { score: 0, level: 'Beginner' };
// //       const recentTransactions = transactionsRes?.data || [];
// //       const insights = insightsRes?.data || [];

// //       // Calculate enhanced metrics
// //       const totalBalance = overview.total_balance || 
// //         investments.reduce((sum, inv) => sum + (Number(inv.current_value) || 0), 0);
      
// //       // Simulate market data with realistic fluctuations
// //       const dailyChange = Math.random() > 0.5 ? 
// //         parseFloat((Math.random() * 2).toFixed(2)) : 
// //         -parseFloat((Math.random() * 1).toFixed(2));
      
// //       const weeklyChange = Math.random() > 0.3 ? 
// //         parseFloat((Math.random() * 5).toFixed(2)) : 
// //         -parseFloat((Math.random() * 2).toFixed(2));

// //       setDashboardData({
// //         overview,
// //         goals: goals.slice(0, 3), // Limit to 3 for UI
// //         investments: investments.slice(0, 4),
// //         financeScore,
// //         totalBalance,
// //         insights: insights.slice(0, 2),
// //         recentTransactions: recentTransactions.slice(0, 3)
// //       });

// //       setStats({
// //         dailyChange,
// //         weeklyChange,
// //         monthlyChange: overview.monthly_growth || 0,
// //         riskLevel: calculateRiskLevel(investments),
// //         portfolioDiversity: calculateDiversityScore(investments)
// //       });

// //       // Celebration animation for positive growth
// //       if (dailyChange > 0) {
// //         Animated.sequence([
// //           Animated.timing(balanceScale, {
// //             toValue: 1.05,
// //             duration: 200,
// //             useNativeDriver: true,
// //             easing: Easing.out(Easing.ease)
// //           }),
// //           Animated.timing(balanceScale, {
// //             toValue: 1,
// //             duration: 200,
// //             useNativeDriver: true,
// //             easing: Easing.in(Easing.ease)
// //           })
// //         ]).start();
// //       }

// //     } catch (error) {
// //       console.log("Dashboard Sync Error:", error.message || error);
// //       setHealthStatus("Connection Error");
// //       setIsSystemOnline(false);
// //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      
// //       // Set fallback data for demo
// //       setDashboardData(prev => ({
// //         ...prev,
// //         goals: [],
// //         investments: [],
// //         insights: []
// //       }));
// //     } finally {
// //       setLoading(false);
// //       setRefreshing(false);
// //     }
// //   }, []);

// //   const calculateRiskLevel = (investments) => {
// //     if (!investments.length) return 'Low';
// //     const highRiskCount = investments.filter(inv => 
// //       inv.asset_type === 'crypto' || inv.asset_type === 'equity'
// //     ).length;
// //     return highRiskCount > investments.length / 2 ? 'High' : 'Moderate';
// //   };

// //   const calculateDiversityScore = (investments) => {
// //     if (!investments.length) return 0;
// //     const types = new Set(investments.map(inv => inv.asset_type));
// //     return Math.min(Math.round((types.size / 5) * 100), 100);
// //   };

// //   const fetchData = useCallback(async () => {
// //     await fetchDashboardData();
// //   }, [fetchDashboardData]);

// //   useEffect(() => {
// //     fetchData();
// //     // Auto-refresh every 30 seconds
// //     const interval = setInterval(() => {
// //       fetchDashboardData();
// //     }, 30000);
// //     return () => clearInterval(interval);
// //   }, [fetchData]);

// //   const onRefresh = useCallback(() => {
// //     setRefreshing(true);
// //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
// //     fetchDashboardData();
// //   }, [fetchDashboardData]);

// //   const formatCurrency = (amount) =>
// //     new Intl.NumberFormat('en-US', { 
// //       style: 'currency', 
// //       currency: 'INR',
// //       minimumFractionDigits: 0,
// //       maximumFractionDigits: 0 
// //     }).format(amount || 0);

// //   const formatCompactCurrency = (amount) => {
// //     if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
// //     if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
// //     if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
// //     return formatCurrency(amount);
// //   };

// //   const handleBalanceToggle = () => {
// //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
// //     setShowBalance(!showBalance);
// //   };

// //   const getAssetIcon = (type, index) => {
// //     const icons = {
// //       'equity': <TrendingUp size={20} color="white" />,
// //       'mutual_fund': <PieChart size={20} color="white" />,
// //       'crypto': <Bitcoin size={20} color="white" />,
// //       'fd': <Landmark size={20} color="white" />,
// //       'savings': <Bank size={20} color="white" />,
// //       'debt': <CardIcon size={20} color="white" />,
// //       'real_estate': <Building size={20} color="white" />
// //     };
// //     return icons[type] || <Coins size={20} color="white" />;
// //   };

// //   const getGoalStatusColor = (progress) => {
// //     if (progress >= 100) return '#22c55e';
// //     if (progress >= 75) return '#3b82f6';
// //     if (progress >= 50) return '#eab308';
// //     if (progress >= 25) return '#f97316';
// //     return '#ef4444';
// //   };

// //   return (
// //     <Theme name="dark">
// //       <LinearGradient 
// //         colors={['#000000', '#0A0A0A', '#111111']}
// //         start={{ x: 0, y: 0 }}
// //         end={{ x: 1, y: 1 }}
// //         style={{ flex: 1 }}
// //       >
// //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
// //           {/* Animated Header */}
// //           <Animated.View
// //             style={{
// //               position: 'absolute',
// //               top: 0,
// //               left: 0,
// //               right: 0,
// //               zIndex: 100,
// //               transform: [{ translateY: headerTranslateY }],
// //               opacity: headerOpacity,
// //               paddingTop: insets.top,
// //               backgroundColor: 'rgba(0,0,0,0.9)',
// //               borderBottomWidth: 1,
// //               borderBottomColor: 'rgba(234, 179, 8, 0.1)',
// //             }}
// //           >
// //             <XStack jc="space-between" ai="center" p="$4" pb="$2">
// //               <YStack>
// //                 <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">FINANCIAL OS</Text>
// //                 <H2 color="white" fontWeight="900" fontSize={24}>Dashboard</H2>
// //               </YStack>
// //               <XStack space="$3">
// //                 <TouchableOpacity onPress={() => router.push('/notifications')}>
// //                   <Bell size={24} color="white" />
// //                 </TouchableOpacity>
// //                 <TouchableOpacity onPress={() => router.push('/settings')}>
// //                   <Settings size={24} color="white" />
// //                 </TouchableOpacity>
// //               </XStack>
// //             </XStack>
// //           </Animated.View>

// //           <ScrollView
// //             showsVerticalScrollIndicator={false}
// //             refreshControl={
// //               <RefreshControl
// //                 refreshing={refreshing}
// //                 onRefresh={onRefresh}
// //                 tintColor="#EAB308"
// //                 colors={['#EAB308']}
// //                 progressBackgroundColor="#1a1a1a"
// //               />
// //             }
// //             onScroll={Animated.event(
// //               [{ nativeEvent: { contentOffset: { y: scrollY } } }],
// //               { useNativeDriver: true }
// //             )}
// //             scrollEventThrottle={16}
// //             contentContainerStyle={{
// //               padding: 20,
// //               paddingTop: 100 + insets.top,
// //               paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 30,
// //             }}
// //           >

// //             {/* HERO BALANCE CARD */}
// //             <Animated.View style={{ transform: [{ scale: balanceScale }] }}>
// //               <TouchableOpacity 
// //                 activeOpacity={0.9}
// //                 onPress={handleBalanceToggle}
// //                 onLongPress={() => {
// //                   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
// //                   router.push('/analytics');
// //                 }}
// //               >
// //                 <LinearGradient
// //                   colors={['#1a1a1a', '#0a0a0a']}
// //                   start={{ x: 0, y: 0 }}
// //                   end={{ x: 1, y: 1 }}
// //                   style={{
// //                     borderRadius: 32,
// //                     padding: 24,
// //                     marginBottom: 24,
// //                     borderWidth: 2,
// //                     borderColor: 'rgba(234, 179, 8, 0.2)',
// //                     shadowColor: '#EAB308',
// //                     shadowOffset: { width: 0, height: 10 },
// //                     shadowOpacity: 0.3,
// //                     shadowRadius: 20,
// //                     elevation: 20,
// //                   }}
// //                 >
// //                   <XStack jc="space-between" ai="center" mb="$4">
// //                     <Text color="rgba(255,255,255,0.7)" fontSize={12} fontWeight="600">
// //                       TOTAL NET WORTH
// //                     </Text>
// //                     <TouchableOpacity onPress={handleBalanceToggle}>
// //                       {showBalance ? (
// //                         <Eye size={18} color="rgba(255,255,255,0.5)" />
// //                       ) : (
// //                         <EyeOff size={18} color="rgba(255,255,255,0.5)" />
// //                       )}
// //                     </TouchableOpacity>
// //                   </XStack>
                  
// //                   {showBalance ? (
// //                     <AnimatedNumber
// //                       value={dashboardData.totalBalance}
// //                       formatter={formatCurrency}
// //                       style={{
// //                         color: 'white',
// //                         fontSize: 48,
// //                         fontWeight: '900',
// //                         letterSpacing: -1,
// //                         includeFontPadding: false,
// //                       }}
// //                       timing="easeOut"
// //                       steps={15}
// //                     />
// //                   ) : (
// //                     <Text color="white" fontSize={48} fontWeight="900" letterSpacing={2}>
// //                       ••••••••
// //                     </Text>
// //                   )}
                  
// //                   {/* Live Stats Row */}
// //                   <XStack jc="space-between" mt="$6" flexWrap="wrap" gap="$3">
// //                     {[
// //                       { label: 'TODAY', value: stats.dailyChange, icon: TrendingUp },
// //                       { label: 'THIS WEEK', value: stats.weeklyChange, icon: BarChart3 },
// //                       { label: 'RISK', value: stats.riskLevel, icon: ShieldIcon },
// //                       { label: 'DIVERSITY', value: `${stats.portfolioDiversity}%`, icon: PieChart }
// //                     ].map((stat, i) => (
// //                       <YStack key={i} ai="center" minWidth={70}>
// //                         <XStack ai="center" space="$1" mb="$1">
// //                           <stat.icon size={12} color={
// //                             stat.value > 0 ? '#22c55e' : 
// //                             typeof stat.value === 'string' ? '#eab308' : '#ef4444'
// //                           } />
// //                           <Text color="rgba(255,255,255,0.6)" fontSize={10} fontWeight="600">
// //                             {stat.label}
// //                           </Text>
// //                         </XStack>
// //                         <Text color="white" fontSize={16} fontWeight="800">
// //                           {typeof stat.value === 'number' ? 
// //                             `${stat.value > 0 ? '+' : ''}${stat.value}%` : 
// //                             stat.value
// //                           }
// //                         </Text>
// //                       </YStack>
// //                     ))}
// //                   </XStack>
// //                 </LinearGradient>
// //               </TouchableOpacity>
// //             </Animated.View>

// //             {/* QUICK STATS GRID */}
// //             <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" mb="$6">
// //               {[
// //                 { icon: <Zap size={18} color="#EAB308" />, label: 'AI SCORE', value: `${dashboardData.financeScore?.score || 0}/100`, color: '#EAB308' },
// //                 { icon: <Target size={18} color="#3b82f6" />, label: 'GOALS', value: dashboardData.goals.length, color: '#3b82f6' },
// //                 { icon: <Briefcase size={18} color="#22c55e" />, label: 'ASSETS', value: dashboardData.investments.length, color: '#22c55e' },
// //                 { icon: <Award size={18} color="#a855f7" />, label: 'LEVEL', value: dashboardData.financeScore?.level || 'Beginner', color: '#a855f7' }
// //               ].map((stat, i) => (
// //                 <GlassCard key={i} style={{ width: (width - 56) / 2 }}>
// //                   <XStack ai="center" space="$3">
// //                     <LinearGradient
// //                       colors={[`${stat.color}20`, `${stat.color}10`]}
// //                       style={{
// //                         width: 44,
// //                         height: 44,
// //                         borderRadius: 12,
// //                         justifyContent: 'center',
// //                         alignItems: 'center',
// //                       }}
// //                     >
// //                       {stat.icon}
// //                     </LinearGradient>
// //                     <YStack>
// //                       <Text color="rgba(255,255,255,0.6)" fontSize={11} fontWeight="600">
// //                         {stat.label}
// //                       </Text>
// //                       <Text color="white" fontSize={20} fontWeight="800">
// //                         {stat.value}
// //                       </Text>
// //                     </YStack>
// //                   </XStack>
// //                 </GlassCard>
// //               ))}
// //             </XStack>

// //             {/* AI SYSTEM STATUS WITH ANIMATION */}
// //             <MotiView
// //               from={{ opacity: 0, translateY: 20 }}
// //               animate={{ opacity: 1, translateY: 0 }}
// //               transition={{ type: 'timing', duration: 600 }}
// //             >
// //               <TouchableOpacity 
// //                 activeOpacity={0.8}
// //                 onPress={() => router.push('/system-health')}
// //                 style={{ marginBottom: 24 }}
// //               >
// //                 <LinearGradient
// //                   colors={isSystemOnline ? 
// //                     ['rgba(34, 197, 94, 0.15)', 'rgba(34, 197, 94, 0.05)'] : 
// //                     ['rgba(239, 68, 68, 0.15)', 'rgba(239, 68, 68, 0.05)']
// //                   }
// //                   start={{ x: 0, y: 0 }}
// //                   end={{ x: 1, y: 1 }}
// //                   style={{
// //                     borderRadius: 24,
// //                     padding: 20,
// //                     borderWidth: 1,
// //                     borderColor: isSystemOnline ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
// //                   }}
// //                 >
// //                   <XStack ai="center" space="$4">
// //                     <MotiView
// //                       animate={{ rotate: isSystemOnline ? ['0deg', '360deg'] : '0deg' }}
// //                       transition={{ type: 'timing', duration: 2000, loop: isSystemOnline }}
// //                     >
// //                       <LinearGradient
// //                         colors={isSystemOnline ? ['#22c55e', '#16a34a'] : ['#ef4444', '#dc2626']}
// //                         style={{
// //                           width: 52,
// //                           height: 52,
// //                           borderRadius: 26,
// //                           justifyContent: 'center',
// //                           alignItems: 'center',
// //                         }}
// //                       >
// //                         <Cpu size={24} color="white" />
// //                       </LinearGradient>
// //                     </MotiView>
                    
// //                     <YStack f={1}>
// //                       <Text color="white" fontWeight="800" fontSize={16}>AI FINANCIAL ADVISOR</Text>
// //                       <Text 
// //                         color={isSystemOnline ? "#22c55e" : "#ef4444"} 
// //                         fontSize={14} 
// //                         fontWeight="600"
// //                       >
// //                         {healthStatus}
// //                       </Text>
// //                       {isSystemOnline && (
// //                         <Text color="rgba(255,255,255,0.6)" fontSize={12} mt="$1">
// //                           Analyzing {dashboardData.investments.length} assets • Last updated just now
// //                         </Text>
// //                       )}
// //                     </YStack>
                    
// //                     {loading ? (
// //                       <Spinner size="small" color={isSystemOnline ? "#22c55e" : "#ef4444"} />
// //                     ) : (
// //                       <ChevronRight size={20} color={isSystemOnline ? "#22c55e" : "#ef4444"} />
// //                     )}
// //                   </XStack>
// //                 </LinearGradient>
// //               </TouchableOpacity>
// //             </MotiView>

// //             {/* ACTION CAROUSEL */}
// //             <ScrollView 
// //               horizontal 
// //               showsHorizontalScrollIndicator={false} 
// //               style={{ marginBottom: 24 }}
// //               contentContainerStyle={{ gap: 12 }}
// //             >
// //               {[
// //                 { icon: <Rocket size={20} color="white" />, label: 'AI Analysis', color: '#3b82f6', route: '/analysis' },
// //                 { icon: <Sparkles size={20} color="white" />, label: 'Optimize', color: '#8b5cf6', route: '/optimize' },
// //                 { icon: <LineChart size={20} color="white" />, label: 'Forecast', color: '#10b981', route: '/forecast' },
// //                 { icon: <Globe size={20} color="white" />, label: 'Global', color: '#f59e0b', route: '/global' },
// //                 { icon: <Shield size={20} color="white" />, label: 'Secure', color: '#6366f1', route: '/security' },
// //                 { icon: <Smartphone size={20} color="white" />, label: 'Scan Bill', color: '#ec4899', route: '/scan' }
// //               ].map((action, i) => (
// //                 <TouchableOpacity
// //                   key={i}
// //                   onPress={() => {
// //                     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
// //                     router.push(action.route);
// //                   }}
// //                   activeOpacity={0.7}
// //                 >
// //                   <LinearGradient
// //                     colors={[`${action.color}`, `${action.color}DD`]}
// //                     start={{ x: 0, y: 0 }}
// //                     end={{ x: 1, y: 1 }}
// //                     style={{
// //                       width: 100,
// //                       height: 120,
// //                       borderRadius: 20,
// //                       justifyContent: 'center',
// //                       alignItems: 'center',
// //                       padding: 16,
// //                     }}
// //                   >
// //                     <LinearGradient
// //                       colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
// //                       style={{
// //                         width: 48,
// //                         height: 48,
// //                         borderRadius: 24,
// //                         justifyContent: 'center',
// //                         alignItems: 'center',
// //                         marginBottom: 12,
// //                       }}
// //                     >
// //                       {action.icon}
// //                     </LinearGradient>
// //                     <Text color="white" fontSize={12} fontWeight="800" textAlign="center">
// //                       {action.label}
// //                     </Text>
// //                   </LinearGradient>
// //                 </TouchableOpacity>
// //               ))}
// //             </ScrollView>

// //             {/* GOALS SECTION WITH PROGRESS WHEELS */}
// //             <YStack mb="$6">
// //               <XStack jc="space-between" ai="center" mb="$4">
// //                 <Text color="#EAB308" fontSize={15} fontWeight="800" letterSpacing={1}>FINANCIAL GOALS</Text>
// //                 <TouchableOpacity 
// //                   onPress={() => router.push('/goals')}
// //                   style={{ flexDirection: 'row', alignItems: 'center' }}
// //                 >
// //                   <Text color="rgba(234, 179, 8, 0.8)" fontSize={12} fontWeight="600">View All</Text>
// //                   <ChevronRight size={16} color="#EAB308" />
// //                 </TouchableOpacity>
// //               </XStack>
              
// //               {dashboardData.goals.length > 0 ? (
// //                 <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
// //                   {dashboardData.goals.map((goal, i) => {
// //                     const progress = Math.min(Math.round((goal.current_amount / goal.target_amount) * 100), 100);
// //                     const color = getGoalStatusColor(progress);
// //                     return (
// //                       <TouchableOpacity
// //                         key={goal.id || i}
// //                         activeOpacity={0.8}
// //                         onPress={() => router.push(`/goals/${goal.id}`)}
// //                       >
// //                         <GlassCard style={{ width: width * 0.7 }}>
// //                           <XStack jc="space-between" mb="$4">
// //                             <YStack>
// //                               <Text color="white" fontWeight="800" fontSize={16} numberOfLines={1}>
// //                                 {goal.title}
// //                               </Text>
// //                               <Text color="rgba(255,255,255,0.6)" fontSize={12} mt="$1">
// //                                 Target: {formatCompactCurrency(goal.target_amount)}
// //                               </Text>
// //                             </YStack>
// //                             <YStack ai="flex-end">
// //                               <LinearGradient
// //                                 colors={[`${color}`, `${color}DD`]}
// //                                 style={{
// //                                   width: 36,
// //                                   height: 36,
// //                                   borderRadius: 18,
// //                                   justifyContent: 'center',
// //                                   alignItems: 'center',
// //                                 }}
// //                               >
// //                                 <Text color="white" fontSize={12} fontWeight="900">{progress}%</Text>
// //                               </LinearGradient>
// //                             </YStack>
// //                           </XStack>
                          
// //                           <Progress 
// //                             value={progress} 
// //                             size="$2"
// //                             bg="rgba(255,255,255,0.1)"
// //                             br="$10"
// //                           >
// //                             <Progress.Indicator 
// //                               bg={color}
// //                               animation="bouncy"
// //                               br="$10"
// //                             />
// //                           </Progress>
                          
// //                           <XStack jc="space-between" mt="$3">
// //                             <Text color="rgba(255,255,255,0.6)" fontSize={11}>
// //                               {formatCompactCurrency(goal.current_amount)}
// //                             </Text>
// //                             <Text color="rgba(255,255,255,0.6)" fontSize={11}>
// //                               {goal.deadline || 'No deadline'}
// //                             </Text>
// //                           </XStack>
// //                         </GlassCard>
// //                       </TouchableOpacity>
// //                     );
// //                   })}
// //                 </ScrollView>
// //               ) : (
// //                 <TouchableOpacity 
// //                   activeOpacity={0.8}
// //                   onPress={() => router.push('/goals/new')}
// //                 >
// //                   <LinearGradient
// //                     colors={['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']}
// //                     start={{ x: 0, y: 0 }}
// //                     end={{ x: 1, y: 1 }}
// //                     style={{
// //                       padding: 40,
// //                       borderRadius: 24,
// //                       alignItems: 'center',
// //                       borderWidth: 2,
// //                       borderColor: 'rgba(234, 179, 8, 0.2)',
// //                       borderStyle: 'dashed',
// //                     }}
// //                   >
// //                     <Target size={32} color="#EAB308" />
// //                     <Text color="#EAB308" fontSize={14} fontWeight="700" mt="$3">Create First Goal</Text>
// //                     <Text color="rgba(234, 179, 8, 0.6)" fontSize={11} mt="$1">Start your financial journey</Text>
// //                   </LinearGradient>
// //                 </TouchableOpacity>
// //               )}
// //             </YStack>

// //             {/* INVESTMENT PORTFOLIO */}
// //             <YStack mb="$6">
// //               <XStack jc="space-between" ai="center" mb="$4">
// //                 <Text color="#EAB308" fontSize={15} fontWeight="800" letterSpacing={1}>INVESTMENT PORTFOLIO</Text>
// //                 <TouchableOpacity 
// //                   onPress={() => router.push('/portfolio')}
// //                   style={{ flexDirection: 'row', alignItems: 'center' }}
// //                 >
// //                   <Text color="rgba(234, 179, 8, 0.8)" fontSize={12} fontWeight="600">Manage</Text>
// //                   <ChevronRight size={16} color="#EAB308" />
// //                 </TouchableOpacity>
// //               </XStack>
              
// //               {dashboardData.investments.length > 0 ? (
// //                 <YStack space="$3">
// //                   {dashboardData.investments.map((investment, i) => (
// //                     <MotiView
// //                       key={investment.id || i}
// //                       from={{ opacity: 0, translateX: -20 }}
// //                       animate={{ opacity: 1, translateX: 0 }}
// //                       transition={{ type: 'timing', duration: 300, delay: i * 100 }}
// //                     >
// //                       <TouchableOpacity activeOpacity={0.8}>
// //                         <GlassCard>
// //                           <XStack ai="center" space="$4">
// //                             <LinearGradient
// //                               colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
// //                               style={{
// //                                 width: 52,
// //                                 height: 52,
// //                                 borderRadius: 16,
// //                                 justifyContent: 'center',
// //                                 alignItems: 'center',
// //                               }}
// //                             >
// //                               {getAssetIcon(investment.asset_type, i)}
// //                             </LinearGradient>
                            
// //                             <YStack f={1}>
// //                               <Text color="white" fontWeight="800" fontSize={16}>
// //                                 {investment.name || investment.identifier}
// //                               </Text>
// //                               <Text color="rgba(255,255,255,0.6)" fontSize={12}>
// //                                 {investment.asset_type?.toUpperCase() || 'ASSET'}
// //                               </Text>
// //                             </YStack>
                            
// //                             <YStack ai="flex-end">
// //                               <Text color="white" fontWeight="800" fontSize={16}>
// //                                 {formatCompactCurrency(investment.current_value)}
// //                               </Text>
// //                               <Text 
// //                                 color={investment.growth > 0 ? '#22c55e' : '#ef4444'} 
// //                                 fontSize={12} 
// //                                 fontWeight="700"
// //                               >
// //                                 {investment.growth > 0 ? '+' : ''}{investment.growth || 0}%
// //                               </Text>
// //                             </YStack>
// //                           </XStack>
// //                         </GlassCard>
// //                       </TouchableOpacity>
// //                     </MotiView>
// //                   ))}
// //                 </YStack>
// //               ) : (
// //                 <TouchableOpacity 
// //                   activeOpacity={0.8}
// //                   onPress={() => router.push('/portfolio/add')}
// //                 >
// //                   <LinearGradient
// //                     colors={['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']}
// //                     start={{ x: 0, y: 0 }}
// //                     end={{ x: 1, y: 1 }}
// //                     style={{
// //                       padding: 40,
// //                       borderRadius: 24,
// //                       alignItems: 'center',
// //                       borderWidth: 2,
// //                       borderColor: 'rgba(234, 179, 8, 0.2)',
// //                       borderStyle: 'dashed',
// //                     }}
// //                   >
// //                     <Wallet size={32} color="#EAB308" />
// //                     <Text color="#EAB308" fontSize={14} fontWeight="700" mt="$3">Add First Investment</Text>
// //                     <Text color="rgba(234, 179, 8, 0.6)" fontSize={11} mt="$1">Connect your portfolio</Text>
// //                   </LinearGradient>
// //                 </TouchableOpacity>
// //               )}
// //             </YStack>

// //             {/* AI INSIGHTS */}
// //             {dashboardData.insights.length > 0 && (
// //               <YStack mb="$6">
// //                 <XStack jc="space-between" ai="center" mb="$4">
// //                   <Text color="#EAB308" fontSize={15} fontWeight="800" letterSpacing={1}>AI INSIGHTS</Text>
// //                   <Sparkles size={20} color="#EAB308" />
// //                 </XStack>
                
// //                 <YStack space="$3">
// //                   {dashboardData.insights.map((insight, i) => (
// //                     <TouchableOpacity key={i} activeOpacity={0.8}>
// //                       <LinearGradient
// //                         colors={['rgba(59, 130, 246, 0.15)', 'rgba(59, 130, 246, 0.05)']}
// //                         start={{ x: 0, y: 0 }}
// //                         end={{ x: 1, y: 1 }}
// //                         style={{
// //                           borderRadius: 20,
// //                           padding: 16,
// //                           borderWidth: 1,
// //                           borderColor: 'rgba(59, 130, 246, 0.3)',
// //                         }}
// //                       >
// //                         <XStack ai="flex-start" space="$3">
// //                           <LinearGradient
// //                             colors={['#3b82f6', '#2563eb']}
// //                             style={{
// //                               width: 32,
// //                               height: 32,
// //                               borderRadius: 16,
// //                               justifyContent: 'center',
// //                               alignItems: 'center',
// //                             }}
// //                           >
// //                             <Sparkles size={16} color="white" />
// //                           </LinearGradient>
// //                           <YStack f={1}>
// //                             <Text color="white" fontWeight="700" fontSize={14}>
// //                               {insight.title}
// //                             </Text>
// //                             <Text color="rgba(255,255,255,0.7)" fontSize={12} mt="$1">
// //                               {insight.description}
// //                             </Text>
// //                             {insight.action && (
// //                               <Text color="#3b82f6" fontSize={11} fontWeight="600" mt="$2">
// //                                 {insight.action}
// //                               </Text>
// //                             )}
// //                           </YStack>
// //                         </XStack>
// //                       </LinearGradient>
// //                     </TouchableOpacity>
// //                   ))}
// //                 </YStack>
// //               </YStack>
// //             )}

// //             {/* RECENT ACTIVITY */}
// //             {dashboardData.recentTransactions.length > 0 && (
// //               <YStack>
// //                 <XStack jc="space-between" ai="center" mb="$4">
// //                   <Text color="#EAB308" fontSize={15} fontWeight="800" letterSpacing={1}>RECENT ACTIVITY</Text>
// //                   <Clock size={20} color="#EAB308" />
// //                 </XStack>
                
// //                 <YStack space="$2">
// //                   {dashboardData.recentTransactions.map((transaction, i) => (
// //                     <TouchableOpacity key={i} activeOpacity={0.7}>
// //                       <XStack ai="center" space="$3" py="$3">
// //                         <LinearGradient
// //                           colors={transaction.amount > 0 ? 
// //                             ['rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0.1)'] : 
// //                             ['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.1)']
// //                           }
// //                           style={{
// //                             width: 40,
// //                             height: 40,
// //                             borderRadius: 20,
// //                             justifyContent: 'center',
// //                             alignItems: 'center',
// //                           }}
// //                         >
// //                           {transaction.amount > 0 ? 
// //                             <ArrowUpRight size={18} color={transaction.amount > 0 ? '#22c55e' : '#ef4444'} /> :
// //                             <ArrowUpRight size={18} color="#ef4444" rotation={180} />
// //                           }
// //                         </LinearGradient>
                        
// //                         <YStack f={1}>
// //                           <Text color="white" fontSize={14} fontWeight="600">
// //                             {transaction.description}
// //                           </Text>
// //                           <Text color="rgba(255,255,255,0.5)" fontSize={11}>
// //                             {transaction.category} • {transaction.date}
// //                           </Text>
// //                         </YStack>
                        
// //                         <Text 
// //                           color={transaction.amount > 0 ? '#22c55e' : '#ef4444'} 
// //                           fontSize={14} 
// //                           fontWeight="800"
// //                         >
// //                           {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
// //                         </Text>
// //                       </XStack>
// //                     </TouchableOpacity>
// //                   ))}
// //                 </YStack>
// //               </YStack>
// //             )}

// //             {/* BOTTOM SPACER */}
// //             <YStack h={40} />

// //           </ScrollView>

// //           {/* FLOATING ACTION BUTTON */}
// //           <TouchableOpacity
// //             activeOpacity={0.8}
// //             onPress={() => {
// //               Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
// //               router.push('/(tabs)/chat');
// //             }}
// //             style={{
// //               position: 'absolute',
// //               bottom: TAB_BAR_HEIGHT + insets.bottom + 20,
// //               right: 20,
// //               zIndex: 1000,
// //             }}
// //           >
// //             <MotiView
// //               animate={{ scale: [1, 1.1, 1] }}
// //               transition={{ type: 'timing', duration: 2000, loop: true }}
// //             >
// //               <LinearGradient
// //                 colors={['#EAB308', '#CA8A04']}
// //                 start={{ x: 0, y: 0 }}
// //                 end={{ x: 1, y: 1 }}
// //                 style={{
// //                   width: 60,
// //                   height: 60,
// //                   borderRadius: 30,
// //                   justifyContent: 'center',
// //                   alignItems: 'center',
// //                   shadowColor: '#EAB308',
// //                   shadowOffset: { width: 0, height: 10 },
// //                   shadowOpacity: 0.5,
// //                   shadowRadius: 20,
// //                   elevation: 20,
// //                   borderWidth: 2,
// //                   borderColor: 'rgba(255, 255, 255, 0.2)',
// //                 }}
// //               >
// //                 <Zap size={24} color="black" fill="black" />
// //               </LinearGradient>
// //             </MotiView>
// //           </TouchableOpacity>

// //         </SafeAreaView>
// //       </LinearGradient>
// //     </Theme>
// //   );
// // }


import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated, View, Alert } from 'react-native';
import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress , Card } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
  ChevronRight, Shield, Zap, PieChart as PieChartIcon, BarChart3, Wallet, Target as TargetIcon, Cpu,
  CheckCircle, LineChart as LineChartIcon, DollarSign , X , Circle , TrendingDown , PieChart 
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AiAnalysisCard from './AiAnalysisCard';
// Services
import { ApiService } from '../../../services/apiService';

const TAB_BAR_HEIGHT = 70;
const { width } = Dimensions.get('window');
const BUTTON_WIDTH = (width - 40 - 15) / 2;

export default function Dashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scaleAnim = useState(new Animated.Value(1))[0];

  // --- STATE ---
  const [dashboardData, setDashboardData] = useState({
    overview: null,
    goals: [],
    investments: [],
    financeScore: null,
    totalBalance: 0,
    charts: {
      expenses: null,
      categories: null,
      investments: null
    },
    aiExplanation: null
  });
  
  const [healthStatus, setHealthStatus] = useState('Checking...');
  const [isSystemOnline, setIsSystemOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeChart, setActiveChart] = useState('expenses'); // 'expenses', 'categories', 'investments'
  const [explaining, setExplaining] = useState(false);

  // --- DATA FETCHING ---
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Check system health by trying to reach the API
      try {
        await ApiService.get('/dashboard/overview');
        setIsSystemOnline(true);
        setHealthStatus("System Operational");
      } catch (healthError) {
        setIsSystemOnline(false);
        setHealthStatus("Offline / Unreachable");
        throw new Error('System offline');
      }

      // Fetch all dashboard data in parallel
      const [
        overviewRes, 
        goalsRes, 
        investmentsRes, 
        scoreRes,
        expensesRes,
        categoriesRes,
        investmentsChartRes
      ] = await Promise.all([
        ApiService.get('/dashboard/overview'),
        ApiService.get('/dashboard/goals'),
        ApiService.get('/dashboard/investments'),
        ApiService.get('/dashboard/score').catch(() => ({ data: null })),
        ApiService.get('/dashboard/charts/expenses').catch(() => ({ data: null })),
        ApiService.get('/dashboard/charts/categories').catch(() => ({ data: null })),
        ApiService.get('/dashboard/charts/investments').catch(() => ({ data: null }))
      ]);

      const overview = overviewRes.data;
      const goals = goalsRes.data || [];
      const investments = investmentsRes.data || [];
      const financeScore = scoreRes?.data || null;
      
      // Process chart data
      const charts = {
        expenses: expensesRes?.data || null,
        categories: categoriesRes?.data || null,
        investments: investmentsChartRes?.data || null
      };

      // Calculate total balance
      let totalBalance = 0;
      if (overview?.total_balance !== undefined) {
        totalBalance = overview.total_balance;
      } else if (investments && investments.length > 0) {
        totalBalance = investments.reduce(
          (sum, item) => sum + (Number(item.current_value) || 0), 
          0
        );
      }

      setDashboardData({
        overview,
        goals,
        investments,
        financeScore,
        totalBalance,
        charts
      });
      
    } catch (error) {
      console.log("Dashboard Sync Error:", error.message || error);
      setHealthStatus("Connection Error");
      setIsSystemOnline(false);
      
      // Clear data on error
      setDashboardData({
        overview: null,
        goals: [],
        investments: [],
        financeScore: null,
        totalBalance: 0,
        charts: {
          expenses: null,
          categories: null,
          investments: null
        },
        aiExplanation: null
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const fetchData = useCallback(async () => {
    await fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Add a function to get AI explanation:
  const getAIExplanation = async () => {
  try {
    setExplaining(true);
    const response = await ApiService.post('/dashboard/explain');
    
    // Store the entire response or just the summary
    setDashboardData(prev => ({
      ...prev,
      aiExplanation: response.data // Store entire response
    }));
    
    // Optional: Show an alert with the summary
    Alert.alert(
      'AI Analysis Complete',
      response.data?.summary?.substring(0, 200) + '...', // Show first 200 chars
      [{ text: 'OK' }]
    );
  } catch (error) {
    console.error('AI explanation error:', error);
    Alert.alert('Error', 'Failed to get AI analysis. Please try again.');
  } finally {
    setExplaining(false);
  }
};

  // Helper functions
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);

  const calculateTotalBalance = () => {
    if (dashboardData.overview?.total_balance) {
      return dashboardData.overview.total_balance;
    }
    
    if (dashboardData.investments && dashboardData.investments.length > 0) {
      return dashboardData.investments.reduce(
        (sum, item) => sum + (Number(item.current_value) || 0), 
        0
      );
    }
    
    return 0;
  };

  // Prepare chart data functions
  const prepareExpensesChartData = () => {
    if (!dashboardData.charts.expenses) return null;
    
    // If data is in API format, adapt it
    if (Array.isArray(dashboardData.charts.expenses)) {
      const labels = dashboardData.charts.expenses.map(item => item.month || item.label);
      const data = dashboardData.charts.expenses.map(item => item.amount || item.value);
      
      return {
        labels: labels.slice(-6), // Last 6 months
        datasets: [{
          data: data.slice(-6),
          color: (opacity = 1) => `rgba(234, 179, 8, ${opacity})`,
          strokeWidth: 2
        }]
      };
    }
    
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        data: [6500, 7200, 8100, 6800, 7500, 9200],
        color: (opacity = 1) => `rgba(234, 179, 8, ${opacity})`,
        strokeWidth: 2
      }]
    };
  };

  const prepareCategoriesChartData = () => {
    if (!dashboardData.charts.categories || !Array.isArray(dashboardData.charts.categories)) {
      return [
        { name: 'Food', amount: 5000, color: '#EAB308' },
        { name: 'Shopping', amount: 3000, color: '#3B82F6' },
        { name: 'Entertainment', amount: 2000, color: '#10B981' },
        { name: 'Transport', amount: 1500, color: '#8B5CF6' },
        { name: 'Bills', amount: 4000, color: '#EF4444' }
      ];
    }
    
    return dashboardData.charts.categories.map(item => ({
      name: item.name || item.category,
      amount: item.amount || item.value,
      color: item.color || getRandomColor()
    }));
  };

  const getRandomColor = () => {
    const colors = ['#EAB308', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F59E0B', '#22C55E'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Render chart based on active selection
  const renderChart = () => {
    if (activeChart === 'expenses') {
      return (
        <YStack ai="center" p="$4">
          <LineChartIcon size={48} color="#EAB308" opacity={0.3} />
          <Text color="#666666" fontSize={12} textAlign="center" mt="$2">
            Expense trend chart would appear here
          </Text>
        </YStack>
      );
    } else if (activeChart === 'categories') {
      const categoriesData = prepareCategoriesChartData();
      return (
        <YStack space="$3">
          {categoriesData.map((category, index) => (
            <XStack key={index} jc="space-between" ai="center" p="$2" bg="#222222" br="$3">
              <XStack ai="center" space="$3">
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: category.color }} />
                <Text color="white" fontSize={13}>{category.name}</Text>
              </XStack>
              <Text color="#EAB308" fontSize={13} fontWeight="700">
                {formatCurrency(category.amount)}
              </Text>
            </XStack>
          ))}
        </YStack>
      );
    } else {
      return (
        <YStack ai="center" p="$4">
          <PieChartIcon size={48} color="#10B981" opacity={0.3} />
          <Text color="#666666" fontSize={12} textAlign="center" mt="$2">
            Investment allocation chart would appear here
          </Text>
        </YStack>
      );
    }
  };

  const totalBalance = calculateTotalBalance();
  const monthlyGrowth = dashboardData.overview?.monthly_growth || 0;
  const dailyGrowth = dashboardData.overview?.daily_growth || 0;
  const financeScore = dashboardData.financeScore?.score || 0;
  const scoreLevel = dashboardData.financeScore?.level || 'Beginner';

  return (
    <Theme name="dark">
      <LinearGradient 
        colors={['#000000', '#0A0A0A', '#111111']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#EAB308"
              />
            }
            contentContainerStyle={{
              padding: 20,
              paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 20,
            }}
          >

            {/* ENHANCED HEADER */}
            <XStack jc="space-between" ai="center" mb="$6" mt="$2">
              <YStack>
                <XStack ai="center" space="$2" mb="$1">
                  <Shield size={14} color="#EAB308" />
                  <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">PROTOCOL</Text>
                </XStack>
                <H2 
                  color="white" 
                  fontWeight="900" 
                  fontSize={28} 
                  numberOfLines={1}
                  style={{
                    textShadowColor: 'rgba(234, 179, 8, 0.3)',
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 10,
                  }}
                >
                  DASHBOARD
                </H2>
              </YStack>

              <TouchableOpacity 
                onPress={() => router.push('/profile')}
                style={{
                  shadowColor: '#EAB308',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                  elevation: 10,
                }}
              >
                <LinearGradient
                  colors={['#EAB308', '#CA8A04']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <User size={22} color="black" />
                </LinearGradient>
              </TouchableOpacity>
            </XStack>

            {/* BALANCE SECTION */}
<YStack 
  bg="#111111" 
  p="$5" 
  br="$4" 
  mb="$5" 
  bw={1.5}
  borderColor="rgba(234, 179, 8, 0.2)"
  style={{
    position: 'relative',
    overflow: 'hidden',
  }}
>
  <YStack 
    position="absolute" 
    top={0} 
    right={0} 
    width={100} 
    height={100} 
    br={50}
    bg="rgba(234, 179, 8, 0.05)"
  />
  
  {/* Header */}
  <Text 
    color="#EAB308" 
    fontSize={11} 
    letterSpacing={2} 
    fontWeight="600" 
    mb="$3"
  >
    MONTHLY FINANCIAL SNAPSHOT
  </Text>
  
  {/* Net Worth */}
  <YStack mb="$4">
    <Text color="rgba(255,255,255,0.7)" fontSize={12} mb="$1">
      NET WORTH
    </Text>
    <H2 
      color="white" 
      fontWeight="900" 
      fontSize={38}
      letterSpacing={-0.5}
    >
      {loading ? "..." : formatCurrency(
        (dashboardData.overview?.savings || 0) + 
        (dashboardData.overview?.total_investments || 0)
      )}
    </H2>
  </YStack>
  
  {/* Financial Metrics Grid */}
  <XStack flexWrap="wrap" gap="$3">
    {/* Income Card */}
    <Card 
      bg="rgba(34, 197, 94, 0.1)" 
      p="$3" 
      br="$3"
      f={1}
      minWidth="48%"
      borderColor="rgba(34, 197, 94, 0.3)"
      bw={1}
    >
      <YStack space="$1">
        <XStack ai="center" space="$2">
          <Circle size={20} bg="rgba(34, 197, 94, 0.2)">
            <TrendingUp size={10} color="#22c55e" />
          </Circle>
          <Text color="#22c55e" fontSize={10} fontWeight="700">
            INCOME
          </Text>
        </XStack>
        <Text color="white" fontSize={16} fontWeight="800">
          ₹{(dashboardData.overview?.monthly_income || 0).toLocaleString('en-IN')}
        </Text>
      </YStack>
    </Card>
    
    {/* Expense Card */}
    <Card 
      bg="rgba(239, 68, 68, 0.1)" 
      p="$3" 
      br="$3"
      f={1}
      minWidth="48%"
      borderColor="rgba(239, 68, 68, 0.3)"
      bw={1}
    >
      <YStack space="$1">
        <XStack ai="center" space="$2">
          <Circle size={20} bg="rgba(239, 68, 68, 0.2)">
            <TrendingDown size={10} color="#ef4444" />
          </Circle>
          <Text color="#ef4444" fontSize={10} fontWeight="700">
            EXPENSE
          </Text>
        </XStack>
        <Text color="white" fontSize={16} fontWeight="800">
          ₹{(dashboardData.overview?.monthly_expense || 0).toLocaleString('en-IN')}
        </Text>
      </YStack>
    </Card>
    
    {/* Savings Card */}
    <Card 
      bg="rgba(234, 179, 8, 0.1)" 
      p="$3" 
      br="$3"
      f={1}
      minWidth="48%"
      borderColor="rgba(234, 179, 8, 0.3)"
      bw={1}
      mt="$3"
    >
      <YStack space="$1">
        <XStack ai="center" space="$2">
          <Circle size={20} bg="rgba(234, 179, 8, 0.2)">
            <Wallet size={10} color="#EAB308" />
          </Circle>
          <Text color="#EAB308" fontSize={10} fontWeight="700">
            SAVINGS
          </Text>
        </XStack>
        <Text color="white" fontSize={16} fontWeight="800">
          ₹{(dashboardData.overview?.savings || 0).toLocaleString('en-IN')}
        </Text>
      </YStack>
    </Card>
    
    {/* Savings Rate Card */}
    <Card 
      bg="rgba(139, 92, 246, 0.1)" 
      p="$3" 
      br="$3"
      f={1}
      minWidth="48%"
      borderColor="rgba(139, 92, 246, 0.3)"
      bw={1}
      mt="$3"
    >
      <YStack space="$1">
        <XStack ai="center" space="$2">
          <Circle size={20} bg="rgba(139, 92, 246, 0.2)">
            <PieChart size={10} color="#8b5cf6" />
          </Circle>
          <Text color="#8b5cf6" fontSize={10} fontWeight="700">
            RATE
          </Text>
        </XStack>
        <Text color="white" fontSize={16} fontWeight="800">
          {(dashboardData.overview?.savings_rate || 0).toFixed(1)}%
        </Text>
      </YStack>
    </Card>
  </XStack>
  
  {/* Investments (if any) */}
  {(dashboardData.overview?.total_investments || 0) > 0 && (
    <Card 
      bg="rgba(59, 130, 246, 0.1)" 
      p="$3" 
      br="$3"
      mt="$3"
      borderColor="rgba(59, 130, 246, 0.3)"
      bw={1}
    >
      <XStack ai="center" jc="space-between">
        <XStack ai="center" space="$2">
          <Circle size={20} bg="rgba(59, 130, 246, 0.2)">
            <TrendingUp size={10} color="#3b82f6" />
          </Circle>
          <Text color="#3b82f6" fontSize={10} fontWeight="700">
            INVESTMENTS
          </Text>
        </XStack>
        <Text color="white" fontSize={14} fontWeight="800">
          ₹{(dashboardData.overview?.total_investments || 0).toLocaleString('en-IN')}
        </Text>
      </XStack>
    </Card>
  )}
</YStack>

            {/* ENHANCED SYSTEM STATUS */}
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={fetchData}
              style={{
                marginBottom: 24,
                shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <LinearGradient
                colors={isSystemOnline 
                  ? ['rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0.05)'] 
                  : ['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.05)']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 20,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: isSystemOnline ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                }}
              >
                <XStack ai="center" space="$4">
                  <LinearGradient
                    colors={isSystemOnline ? ['#22c55e', '#16a34a'] : ['#ef4444', '#dc2626']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.4,
                      shadowRadius: 4,
                      elevation: 4,
                    }}
                  >
                    {isSystemOnline ? (
                      <Cpu size={22} color="white" />
                    ) : (
                      <Activity size={22} color="white" />
                    )}
                  </LinearGradient>
                  
                  <YStack f={1}>
                    <Text color="white" fontWeight="800" fontSize={16}>AI CORE SYSTEM</Text>
                    <Text color={isSystemOnline ? "rgba(34, 197, 94, 0.9)" : "rgba(239, 68, 68, 0.9)"} 
                          fontSize={13} 
                          fontWeight="600">
                      {healthStatus}
                    </Text>
                  </YStack>
                  
                  {loading ? (
                    <Spinner size="small" color={isSystemOnline ? "#22c55e" : "#ef4444"} />
                  ) : (
                    <LinearGradient
                      colors={isSystemOnline ? ['#22c55e', '#16a34a'] : ['#ef4444', '#dc2626']}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.8,
                        shadowRadius: 4,
                      }}
                    />
                  )}
                </XStack>
              </LinearGradient>
            </TouchableOpacity>

            {/* POWERFUL QUICK ACTIONS GRID */}
            <H4 
              color="#EAB308" 
              mb="$4" 
              fontSize={15} 
              letterSpacing={2} 
              fontWeight="800"
              style={{
                textShadowColor: 'rgba(234, 179, 8, 0.3)',
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 5,
              }}
            >
              QUICK ACTIONS
            </H4>
            <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" mb="$6">
              <ActionButton 
                icon={<ArrowUpRight size={24} color="white"/>} 
                label="Add Asset" 
                onPress={() => router.push('/portfolio')}
                gradient={['#EAB308', '#CA8A04']}
              />
              <ActionButton 
                icon={<Search size={24} color="white"/>} 
                label="AI Analysis" 
                onPress={() => router.push('/analysis')}
                gradient={['#3b82f6', '#2563eb']}
              />
              <ActionButton 
                icon={<Briefcase size={24} color="white"/>} 
                label="Income" 
                onPress={() => router.push('/income')}
                gradient={['#22c55e', '#16a34a']}
              />
              <ActionButton 
                icon={<Target size={24} color="white"/>} 
                label="Budgets" 
                onPress={() => router.push('/budgets')}
                gradient={['#a855f7', '#9333ea']}
              />
              <ActionButton 
                icon={<CreditCard size={24} color="white"/>} 
                label="Spend" 
                onPress={() => router.push('/transactions')}
                gradient={['#ef4444', '#dc2626']}
              />
              <ActionButton 
                icon={<RefreshCw size={24} color="white"/>} 
                label="Ask AI" 
                onPress={() => router.push('/(tabs)/chat')}
                gradient={['#64748b', '#475569']}
              />
              <ActionButton 
                icon={<Target size={24} color="white"/>} 
                label="Goals" 
                onPress={() => router.push('/goals')}
                gradient={['#8a4402ff', '#8a4402ff']}
              />
              <ActionButton 
                icon={<Briefcase size={24} color="white"/>} 
                label="Ingest" 
                onPress={() => router.push('/ingest')}
                gradient={['#22c55e', '#16a34a']}
              />
              <ActionButton 
                icon={<Briefcase size={24} color="white"/>} 
                label="Categories" 
                onPress={() => router.push('/categories')}
                gradient={['#31183e', '#31183e']}
              />
            </XStack>

            {/* CHARTS SECTION */}
 {/* CHARTS SECTION */}
<YStack space="$3" mb="$4" mt="$4">
  <XStack jc="space-between" ai="center">
    <H4 
      color="#EAB308" 
      fontSize={15} 
      letterSpacing={2} 
      fontWeight="800"
      style={{
        textShadowColor: 'rgba(234, 179, 8, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
      }}
    >
      FINANCIAL CHARTS
    </H4>
  </XStack>
  
  {/* Chart Selection Buttons - Now in their own row */}
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingRight: 20 }}
  >
    <XStack space="$2">
      <TouchableOpacity 
        onPress={() => setActiveChart('expenses')}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: activeChart === 'expenses' ? '#EAB30820' : '#333333',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: activeChart === 'expenses' ? '#EAB308' : '#444444',
          minWidth: 100,
          alignItems: 'center',
        }}
      >
        <Text 
          color={activeChart === 'expenses' ? '#EAB308' : '#666666'} 
          fontSize={12} 
          fontWeight="700"
        >
          Expenses
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => setActiveChart('categories')}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: activeChart === 'categories' ? '#3B82F620' : '#333333',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: activeChart === 'categories' ? '#3B82F6' : '#444444',
          minWidth: 100,
          alignItems: 'center',
        }}
      >
        <Text 
          color={activeChart === 'categories' ? '#3B82F6' : '#666666'} 
          fontSize={12} 
          fontWeight="700"
        >
          Categories
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => setActiveChart('investments')}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: activeChart === 'investments' ? '#10B98120' : '#333333',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: activeChart === 'investments' ? '#10B981' : '#444444',
          minWidth: 100,
          alignItems: 'center',
        }}
      >
        <Text 
          color={activeChart === 'investments' ? '#10B981' : '#666666'} 
          fontSize={12} 
          fontWeight="700"
        >
          Investments
        </Text>
      </TouchableOpacity>
    </XStack>
  </ScrollView>
</YStack>

<Card 
  bg="#1A1A1A" 
  p="$4" 
  br="$4" 
  mb="$6"
  borderWidth={1}
  borderColor="#333333"
  minHeight={200}
>
  {renderChart()}
</Card>

{/* FINANCE SCORE SECTION - Fixed alignment */}
<YStack mb="$6">
  <TouchableOpacity 
    onPress={getAIExplanation}
    activeOpacity={0.9}
    disabled={explaining}
  >
    <LinearGradient
      colors={['#1A1A1A', '#111111']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: '#EAB308',
        position: 'relative',
        overflow: 'hidden',
        opacity: explaining ? 0.8 : 1,
      }}
    >
      {/* Decorative background */}
      <View style={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
      }} />
      
      <YStack space="$4">
        {/* Header and Score */}
        <XStack jc="space-between" ai="center">
          <YStack flex={1}>
            <Text color="#EAB308" fontSize={11} letterSpacing={2} fontWeight="800">
              FINANCIAL HEALTH SCORE
            </Text>
            <Text>
            </Text>
            <Text></Text>
            <Text></Text>
            <Text color="white" fontSize={28} fontWeight="900" mt="$2">
              {financeScore || 0}/100
            </Text>
            <Text color="#EAB308" fontSize={12} fontWeight="700" mt="$1">
              {scoreLevel}
            </Text>
          </YStack>
          
          {/* Progress Circle - Fixed size */}
          <View style={{
            width: 90,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 160,
          }}>
            <Progress 
              value={financeScore || 0} 
              size="$6" 
              bg="#333333"
              bw={2}
              bc="#EAB308"
            >
              <Progress.Indicator 
                bg="#EAB308" 
                animation="bouncy"
              />
            </Progress>
            <Text 
              color="#000000" 
              fontSize={12} 
              fontWeight="900"
              style={{ position: 'absolute' }}
            >
              {financeScore || 0}%
            </Text>
          </View>
        </XStack>
        
        {/* Description and Button - Stack vertically on small screens */}
        <YStack space="$3">
          <Text color="#666666" fontSize={12} lineHeight={16}>
            {dashboardData.financeScore?.message || 'Your financial health score based on spending, savings, and investments'}
          </Text>
          
          <XStack jc="flex-end">
  <TouchableOpacity 
    onPress={getAIExplanation}
    disabled={explaining}
    style={{
      backgroundColor: '#EAB308',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      opacity: explaining ? 0.7 : 1,
      minWidth: 120,
      justifyContent: 'center',
      shadowColor: '#EAB308',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    }}
  >
    {explaining ? (
      <Spinner size="small" color="black" />
    ) : (
      <>
        <Cpu size={16} color="black" />
        <Text color="black" fontSize={12} fontWeight="700" ml="$2">
          AI Analysis
        </Text>
      </>
    )}
  </TouchableOpacity>
</XStack>
        </YStack>
      </YStack>
    </LinearGradient>
  </TouchableOpacity>
</YStack>

{/* AI EXPLANATION SECTION */}
{/* AI EXPLANATION SECTION */}

{dashboardData.aiExplanation && (
  <AiAnalysisCard
    explanation={dashboardData.aiExplanation}
    onClose={() => setDashboardData(prev => ({
      ...prev,
      aiExplanation: null,
      aiExpanded: false
    }))}
    onRefresh={getAIExplanation}
    loading={explaining}
    expanded={dashboardData.aiExpanded}
    onToggleExpand={(expanded) => setDashboardData(prev => ({
      ...prev,
      aiExpanded: expanded
    }))}
  />
)}

            {/* ENHANCED FINANCIAL GOALS SECTION */}
            <XStack jc="space-between" ai="center" mb="$3" mt="$4">
              <H4 
                color="#EAB308" 
                fontSize={15} 
                letterSpacing={2} 
                fontWeight="800"
                style={{
                  textShadowColor: 'rgba(234, 179, 8, 0.3)',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 5,
                }}
              >
                GOALS PROGRESS
              </H4>
              <TouchableOpacity 
                onPress={() => router.push('/goals')}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text color="#EAB308" fontSize={12} fontWeight="800">MANAGE</Text>
                  <ChevronRight size={14} color="#EAB308" ml="$1" />
                </LinearGradient>
              </TouchableOpacity>
            </XStack>
            
            <YStack space="$3" mb="$6">
              {dashboardData.goals && dashboardData.goals.length > 0 ? (
                dashboardData.goals.slice(0, 2).map((goal, i) => (
                  <TouchableOpacity 
                    key={goal.id || i} 
                    activeOpacity={0.9}
                    onPress={() => router.push(`/goals/${goal.id}`)}
                    style={{
                      shadowColor: '#EAB308',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 4,
                    }}
                  >
                    <LinearGradient
                      colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        padding: 20,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: 'rgba(234, 179, 8, 0.2)',
                      }}
                    >
                      <XStack jc="space-between" mb="$3">
                        <YStack>
                          <XStack ai="center" space="$2" mb="$1">
                            <TargetIcon size={14} color="#EAB308" />
                            <Text color="white" fontWeight="800" fontSize={15}>{goal.name || goal.title}</Text>
                          </XStack>
                          <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
                            {formatCurrency(goal.current_amount || 0)} of {formatCurrency(goal.target_amount || 0)}
                          </Text>
                        </YStack>
                        <Text color="#EAB308" fontSize={18} fontWeight="900">
                          {Math.round(((goal.current_amount || 0) / (goal.target_amount || 1)) * 100)}%
                        </Text>
                      </XStack>
                      <Progress 
                        value={((goal.current_amount || 0) / (goal.target_amount || 1)) * 100} 
                        h={8} 
                        bg="rgba(255,255,255,0.1)"
                        br="$10"
                      >
                        <Progress.Indicator 
                          bg="#EAB308" 
                          animation="bouncy"
                          br="$10"
                          style={{
                            shadowColor: '#EAB308',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.5,
                            shadowRadius: 4,
                          }}
                        />
                      </Progress>
                    </LinearGradient>
                  </TouchableOpacity>
                ))
              ) : (
                <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={() => router.push('/goals')}
                  style={{
                    shadowColor: '#EAB308',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                  }}
                >
                  <LinearGradient
                    colors={['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      padding: 24,
                      borderRadius: 20,
                      borderWidth: 2,
                      borderColor: 'rgba(234, 179, 8, 0.2)',
                      borderStyle: 'dashed',
                      alignItems: 'center',
                    }}
                  >
                    <Target size={28} color="#EAB308" />
                    <Text color="#EAB308" fontSize={13} fontWeight="700" mt="$2">SET YOUR FIRST GOAL</Text>
                    <Text color="rgba(234, 179, 8, 0.6)" fontSize={11} mt="$1">Tap to create financial target</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </YStack>

            {/* POWERFUL HOLDINGS PREVIEW */}
            <XStack jc="space-between" ai="center" mb="$3">
              <H4 
                color="#EAB308" 
                fontSize={15} 
                letterSpacing={2} 
                fontWeight="800"
                style={{
                  textShadowColor: 'rgba(234, 179, 8, 0.3)',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 5,
                }}
              >
                HOLDINGS
              </H4>
              <TouchableOpacity 
                onPress={() => router.push('/portfolio')}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text color="#EAB308" fontSize={12} fontWeight="800">VIEW ALL</Text>
                  <ChevronRight size={14} color="#EAB308" ml="$1" />
                </LinearGradient>
              </TouchableOpacity>
            </XStack>

            <YStack space="$3">
              {dashboardData.investments && dashboardData.investments.length > 0 ? (
                dashboardData.investments.slice(0, 3).map((inv, i) => (
                  <TouchableOpacity 
                    key={inv.id || i} 
                    activeOpacity={0.9}
                    onPress={() => router.push(`/portfolio/${inv.id}`)}
                    style={{
                      shadowColor: '#EAB308',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 4,
                    }}
                  >
                    <LinearGradient
                      colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        padding: 20,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: 'rgba(234, 179, 8, 0.2)',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <XStack ai="center" space="$4">
                        <LinearGradient
                          colors={i === 0 ? ['#EAB308', '#CA8A04'] : 
                                 i === 1 ? ['#3b82f6', '#2563eb'] : 
                                 ['#22c55e', '#16a34a']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: i === 0 ? '#EAB308' : i === 1 ? '#3b82f6' : '#22c55e',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.4,
                            shadowRadius: 4,
                            elevation: 4,
                          }}
                        >
                          {i === 0 && <Wallet size={24} color="white" />}
                          {i === 1 && <TrendingUp size={24} color="white" />}
                          {i === 2 && <PieChartIcon size={24} color="white" />}
                        </LinearGradient>
                        <YStack>
                          <Text color="white" fontWeight="800" fontSize={16}>{inv.identifier || inv.name || 'Investment'}</Text>
                          <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
                            {inv.asset_type?.toUpperCase() || 'ASSET'}
                          </Text>
                        </YStack>
                      </XStack>
                      <YStack ai="flex-end">
                        <Text color="white" fontWeight="800" fontSize={16}>
                          {formatCurrency(inv.current_value || inv.avg_buy_price || 0)}
                        </Text>
                        <LinearGradient
                          colors={['#22c55e', '#16a34a']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={{
                            borderRadius: 12,
                            paddingHorizontal: 8,
                            paddingVertical: 3,
                            marginTop: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <TrendingUp size={12} color="white" />
                          <Text color="white" fontSize={11} fontWeight="700" ml="$0.5">ACTIVE</Text>
                        </LinearGradient>
                      </YStack>
                    </LinearGradient>
                  </TouchableOpacity>
                ))
              ) : (
                <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={() => router.push('/portfolio')}
                  style={{
                    shadowColor: '#EAB308',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                  }}
                >
                  <LinearGradient
                    colors={['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      padding: 24,
                      borderRadius: 20,
                      borderWidth: 2,
                      borderColor: 'rgba(234, 179, 8, 0.2)',
                      borderStyle: 'dashed',
                      alignItems: 'center',
                    }}
                  >
                    <Wallet size={28} color="#EAB308" />
                    <Text color="#EAB308" fontSize={13} fontWeight="700" mt="$2">ADD FIRST ASSET</Text>
                    <Text color="rgba(234, 179, 8, 0.6)" fontSize={11} mt="$1">Tap to link your investments</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </YStack>

            {/* BOTTOM PADDING */}
            <YStack h={40} />

          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </Theme>
  );
}

// Enhanced ActionButton with Powerful Gradients
function ActionButton({ icon, label, onPress, gradient }) {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 150,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 3,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={{
        width: BUTTON_WIDTH,
        height: 100,
        marginBottom: 12,
      }}
    >
      <Animated.View style={{ transform: [{ scale }], flex: 1 }}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: gradient[0],
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          {icon}
          <Text color="white" fontSize={12} fontWeight="800" mt="$2" letterSpacing={0.5}>
            {label}
          </Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}