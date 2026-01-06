// // // // import React, { useEffect, useState, useCallback } from 'react';
// // // // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
// // // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress } from 'tamagui';
// // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // import { BlurView } from 'expo-blur';
// // // // import { 
// // // //   Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
// // // //   ChevronRight, Shield, Zap, PieChart, BarChart3, Wallet, Target as TargetIcon, Cpu
// // // // } from '@tamagui/lucide-icons';
// // // // import { useRouter } from 'expo-router';
// // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // // // Services
// // // // import { UserService } from '../../../services/userService';
// // // // import { AiService } from '../../../services/aiService';

// // // // const TAB_BAR_HEIGHT = 70;
// // // // const { width } = Dimensions.get('window');
// // // // const BUTTON_WIDTH = (width - 40 - 15) / 2;

// // // // export default function Dashboard() {
// // // //   const router = useRouter();
// // // //   const insets = useSafeAreaInsets();
// // // //   const scaleAnim = useState(new Animated.Value(1))[0];

// // // //   // --- STATE ---
// // // //   const [profile, setProfile] = useState(null);
// // // //   const [healthStatus, setHealthStatus] = useState('Checking...');
// // // //   const [isSystemOnline, setIsSystemOnline] = useState(false);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [totalBalance, setTotalBalance] = useState(0);

// // // //   // --- DATA FETCHING ---
// // // //   const fetchData = useCallback(async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       // 1. Check System Health with a catch to prevent total crash
// // // //       const online = await AiService.checkSystemHealth().catch(() => false);
// // // //       setIsSystemOnline(online);
// // // //       setHealthStatus(online ? "System Operational" : "Offline / Unreachable");

// // // //       // 2. Get Profile
// // // //       const userProfile = await UserService.getProfile();
// // // //       setProfile(userProfile);

// // // //       // 3. Calculate Balance safely
// // // //       if (userProfile && userProfile.investments) {
// // // //         const total = userProfile.investments.reduce(
// // // //           (sum, item) => sum + (Number(item.current_value) || 0), 
// // // //           0
// // // //         );
// // // //         setTotalBalance(total);
// // // //       }
// // // //     } catch (error) {
// // // //       console.log("Dashboard Sync Error:", error);
// // // //       setHealthStatus("Connection Error");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //   }, [fetchData]);

// // // //   const formatCurrency = (amount) =>
// // // //     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount || 0);

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <LinearGradient 
// // // //         colors={['#000000', '#0A0A0A', '#111111']}
// // // //         start={{ x: 0, y: 0 }}
// // // //         end={{ x: 1, y: 1 }}
// // // //         style={{ flex: 1 }}
// // // //       >
// // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
// // // //           <ScrollView
// // // //             showsVerticalScrollIndicator={false}
// // // //             refreshControl={
// // // //               <RefreshControl
// // // //                 refreshing={loading}
// // // //                 onRefresh={fetchData}
// // // //                 tintColor="#EAB308"
// // // //               />
// // // //             }
// // // //             contentContainerStyle={{
// // // //               padding: 20,
// // // //               paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 20,
// // // //             }}
// // // //           >

// // // //             {/* ENHANCED HEADER */}
// // // //             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
// // // //               <YStack>
// // // //                 <XStack ai="center" space="$2" mb="$1">
// // // //                   <Shield size={14} color="#EAB308" />
// // // //                   <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">PROTOCOL</Text>
// // // //                 </XStack>
// // // //                 <H2 
// // // //                   color="white" 
// // // //                   fontWeight="900" 
// // // //                   fontSize={28} 
// // // //                   numberOfLines={1}
// // // //                   style={{
// // // //                     textShadowColor: 'rgba(234, 179, 8, 0.3)',
// // // //                     textShadowOffset: { width: 0, height: 0 },
// // // //                     textShadowRadius: 10,
// // // //                   }}
// // // //                 >
// // // //                   {profile?.full_name ? profile.full_name.split(' ')[0] : 'Protocol User'}
// // // //                 </H2>
// // // //               </YStack>

// // // //               <TouchableOpacity 
// // // //                 onPress={() => router.push('/profile')}
// // // //                 style={{
// // // //                   shadowColor: '#EAB308',
// // // //                   shadowOffset: { width: 0, height: 0 },
// // // //                   shadowOpacity: 0.4,
// // // //                   shadowRadius: 10,
// // // //                   elevation: 10,
// // // //                 }}
// // // //               >
// // // //                 <LinearGradient
// // // //                   colors={['#EAB308', '#CA8A04']}
// // // //                   start={{ x: 0, y: 0 }}
// // // //                   end={{ x: 1, y: 1 }}
// // // //                   style={{
// // // //                     width: 48,
// // // //                     height: 48,
// // // //                     borderRadius: 24,
// // // //                     justifyContent: 'center',
// // // //                     alignItems: 'center',
// // // //                     borderWidth: 2,
// // // //                     borderColor: 'rgba(255, 255, 255, 0.2)',
// // // //                   }}
// // // //                 >
// // // //                   <User size={22} color="black" />
// // // //                 </LinearGradient>
// // // //               </TouchableOpacity>
// // // //             </XStack>

// // // // {/* BALANCE SECTION - Minimal & Powerful */}
// // // // <YStack 
// // // //   bg="#111111" 
// // // //   p="$5" 
// // // //   br="$4" 
// // // //   mb="$5" 
// // // //   bw={1.5}
// // // //   borderColor="rgba(234, 179, 8, 0.2)"
// // // //   style={{
// // // //     position: 'relative',
// // // //     overflow: 'hidden',
// // // //   }}
// // // // >
// // // //   <YStack 
// // // //     position="absolute" 
// // // //     top={0} 
// // // //     right={0} 
// // // //     width={100} 
// // // //     height={100} 
// // // //     br={50}
// // // //     bg="rgba(234, 179, 8, 0.05)"
// // // //   />
  
// // // //   <Text 
// // // //     color="#EAB308" 
// // // //     fontSize={11} 
// // // //     letterSpacing={2} 
// // // //     fontWeight="600" 
// // // //     mb="$2"
// // // //   >
// // // //     TOTAL NET WORTH
// // // //   </Text>
  
// // // //   <H2 
// // // //     color="white" 
// // // //     fontWeight="900" 
// // // //     fontSize={38}
// // // //     letterSpacing={-0.5}
// // // //   >
// // // //     {loading && !profile ? "..." : formatCurrency(totalBalance)}
// // // //   </H2>
  
// // // //   <XStack ai="center" space="$3" mt="$3">
// // // //     <XStack 
// // // //       bg="#1a1a1a" 
// // // //       px="$2.5" 
// // // //       py="$1" 
// // // //       br="$2"
// // // //       ai="center"
// // // //       borderColor="rgba(34, 197, 94, 0.3)"
// // // //       bw={1}
// // // //     >
// // // //       <TrendingUp size={14} color="#22c55e" />
// // // //       <Text color="#22c55e" fontSize={12} fontWeight="700" ml="$1">+2.4% Today</Text>
// // // //     </XStack>
    
// // // //     <XStack 
// // // //       bg="#1a1a1a" 
// // // //       px="$2.5" 
// // // //       py="$1" 
// // // //       br="$2"
// // // //       ai="center"
// // // //       borderColor="rgba(234, 179, 8, 0.3)"
// // // //       bw={1}
// // // //     >
// // // //       <BarChart3 size={14} color="#EAB308" />
// // // //       <Text color="#EAB308" fontSize={12} fontWeight="700" ml="$1">+5.2% Monthly</Text>
// // // //     </XStack>
// // // //   </XStack>
// // // // </YStack>

// // // //             {/* ENHANCED SYSTEM STATUS */}
// // // //             <TouchableOpacity 
// // // //               activeOpacity={0.9}
// // // //               onPress={() => router.push('/')}
// // // //               style={{
// // // //                 marginBottom: 24,
// // // //                 shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
// // // //                 shadowOffset: { width: 0, height: 4 },
// // // //                 shadowOpacity: 0.3,
// // // //                 shadowRadius: 8,
// // // //                 elevation: 8,
// // // //               }}
// // // //             >
// // // //               <LinearGradient
// // // //                 colors={isSystemOnline 
// // // //                   ? ['rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0.05)'] 
// // // //                   : ['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.05)']
// // // //                 }
// // // //                 start={{ x: 0, y: 0 }}
// // // //                 end={{ x: 1, y: 1 }}
// // // //                 style={{
// // // //                   borderRadius: 20,
// // // //                   padding: 20,
// // // //                   borderWidth: 1,
// // // //                   borderColor: isSystemOnline ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
// // // //                 }}
// // // //               >
// // // //                 <XStack ai="center" space="$4">
// // // //                   <LinearGradient
// // // //                     colors={isSystemOnline ? ['#22c55e', '#16a34a'] : ['#ef4444', '#dc2626']}
// // // //                     start={{ x: 0, y: 0 }}
// // // //                     end={{ x: 1, y: 1 }}
// // // //                     style={{
// // // //                       width: 44,
// // // //                       height: 44,
// // // //                       borderRadius: 22,
// // // //                       justifyContent: 'center',
// // // //                       alignItems: 'center',
// // // //                       shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
// // // //                       shadowOffset: { width: 0, height: 2 },
// // // //                       shadowOpacity: 0.4,
// // // //                       shadowRadius: 4,
// // // //                       elevation: 4,
// // // //                     }}
// // // //                   >
// // // //                     {isSystemOnline ? (
// // // //                       <Cpu size={22} color="white" />
// // // //                     ) : (
// // // //                       <Activity size={22} color="white" />
// // // //                     )}
// // // //                   </LinearGradient>
                  
// // // //                   <YStack f={1}>
// // // //                     <Text color="white" fontWeight="800" fontSize={16}>AI CORE SYSTEM</Text>
// // // //                     <Text color={isSystemOnline ? "rgba(34, 197, 94, 0.9)" : "rgba(239, 68, 68, 0.9)"} 
// // // //                           fontSize={13} 
// // // //                           fontWeight="600">
// // // //                       {healthStatus}
// // // //                     </Text>
// // // //                   </YStack>
                  
// // // //                   {loading ? (
// // // //                     <Spinner size="small" color={isSystemOnline ? "#22c55e" : "#ef4444"} />
// // // //                   ) : (
// // // //                     <LinearGradient
// // // //                       colors={isSystemOnline ? ['#22c55e', '#16a34a'] : ['#ef4444', '#dc2626']}
// // // //                       style={{
// // // //                         width: 12,
// // // //                         height: 12,
// // // //                         borderRadius: 6,
// // // //                         shadowColor: isSystemOnline ? '#22c55e' : '#ef4444',
// // // //                         shadowOffset: { width: 0, height: 0 },
// // // //                         shadowOpacity: 0.8,
// // // //                         shadowRadius: 4,
// // // //                       }}
// // // //                     />
// // // //                   )}
// // // //                 </XStack>
// // // //               </LinearGradient>
// // // //             </TouchableOpacity>

// // // //             {/* POWERFUL QUICK ACTIONS GRID */}
// // // //             <H4 
// // // //               color="#EAB308" 
// // // //               mb="$4" 
// // // //               fontSize={15} 
// // // //               letterSpacing={2} 
// // // //               fontWeight="800"
// // // //               style={{
// // // //                 textShadowColor: 'rgba(234, 179, 8, 0.3)',
// // // //                 textShadowOffset: { width: 0, height: 0 },
// // // //                 textShadowRadius: 5,
// // // //               }}
// // // //             >
// // // //               QUICK ACTIONS
// // // //             </H4>
// // // //             <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" mb="$6">
// // // //               <ActionButton 
// // // //                 icon={<ArrowUpRight size={24} color="white"/>} 
// // // //                 label="Add Asset" 
// // // //                 onPress={() => router.push('/portfolio')}
// // // //                 gradient={['#EAB308', '#CA8A04']}
// // // //               />
// // // //               <ActionButton 
// // // //                 icon={<Search size={24} color="white"/>} 
// // // //                 label="AI Analysis" 
// // // //                 onPress={() => router.push('/analysis')}
// // // //                 gradient={['#3b82f6', '#2563eb']}
// // // //               />
// // // //               <ActionButton 
// // // //                 icon={<Briefcase size={24} color="white"/>} 
// // // //                 label="Income" 
// // // //                 onPress={() => router.push('/income')}
// // // //                 gradient={['#22c55e', '#16a34a']}
// // // //               />
// // // //               <ActionButton 
// // // //                 icon={<Target size={24} color="white"/>} 
// // // //                 label="Budgets" 
// // // //                 onPress={() => router.push('/budgets')}
// // // //                 gradient={['#a855f7', '#9333ea']}
// // // //               />
// // // //               <ActionButton 
// // // //                 icon={<CreditCard size={24} color="white"/>} 
// // // //                 label="Spend" 
// // // //                 onPress={() => router.push('/transactions')}
// // // //                 gradient={['#ef4444', '#dc2626']}
// // // //               />
// // // //               <ActionButton 
// // // //                 icon={<RefreshCw size={24} color="white"/>} 
// // // //                 label="Ask AI" 
// // // //                 onPress={() => router.push('/(tabs)/chat')}
// // // //                 gradient={['#64748b', '#475569']}
// // // //               />
// // // //               <ActionButton 
// // // //                 icon={<Target size={24} color="white"/>} 
// // // //                 label="Goals" 
// // // //                 onPress={() => router.push('/goals')}
// // // //                 gradient={['#8a4402ff', '#8a4402ff']}
// // // //               />
// // // //             </XStack>

// // // //             {/* ENHANCED FINANCIAL GOALS SECTION */}
// // // //             <XStack jc="space-between" ai="center" mb="$3">
// // // //               <H4 
// // // //                 color="#EAB308" 
// // // //                 fontSize={15} 
// // // //                 letterSpacing={2} 
// // // //                 fontWeight="800"
// // // //                 style={{
// // // //                   textShadowColor: 'rgba(234, 179, 8, 0.3)',
// // // //                   textShadowOffset: { width: 0, height: 0 },
// // // //                   textShadowRadius: 5,
// // // //                 }}
// // // //               >
// // // //                 GOALS PROGRESS
// // // //               </H4>
// // // //               <TouchableOpacity 
// // // //                 onPress={() => router.push('/goals')}
// // // //                 activeOpacity={0.7}
// // // //               >
// // // //                 <LinearGradient
// // // //                   colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
// // // //                   start={{ x: 0, y: 0 }}
// // // //                   end={{ x: 1, y: 1 }}
// // // //                   style={{
// // // //                     borderRadius: 12,
// // // //                     paddingHorizontal: 12,
// // // //                     paddingVertical: 6,
// // // //                     flexDirection: 'row',
// // // //                     alignItems: 'center',
// // // //                   }}
// // // //                 >
// // // //                   <Text color="#EAB308" fontSize={12} fontWeight="800">MANAGE</Text>
// // // //                   <ChevronRight size={14} color="#EAB308" ml="$1" />
// // // //                 </LinearGradient>
// // // //               </TouchableOpacity>
// // // //             </XStack>
            
// // // //             <YStack space="$3" mb="$6">
// // // //               {profile?.goals && profile.goals.length > 0 ? (
// // // //                 profile.goals.slice(0, 2).map((goal, i) => (
// // // //                   <TouchableOpacity 
// // // //                     key={i} 
// // // //                     activeOpacity={0.9}
// // // //                     onPress={() => router.push(`/goals/${goal.id}`)}
// // // //                     style={{
// // // //                       shadowColor: '#EAB308',
// // // //                       shadowOffset: { width: 0, height: 4 },
// // // //                       shadowOpacity: 0.1,
// // // //                       shadowRadius: 8,
// // // //                       elevation: 4,
// // // //                     }}
// // // //                   >
// // // //                     <LinearGradient
// // // //                       colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
// // // //                       start={{ x: 0, y: 0 }}
// // // //                       end={{ x: 1, y: 1 }}
// // // //                       style={{
// // // //                         padding: 20,
// // // //                         borderRadius: 20,
// // // //                         borderWidth: 1,
// // // //                         borderColor: 'rgba(234, 179, 8, 0.2)',
// // // //                       }}
// // // //                     >
// // // //                       <XStack jc="space-between" mb="$3">
// // // //                         <YStack>
// // // //                           <XStack ai="center" space="$2" mb="$1">
// // // //                             <TargetIcon size={14} color="#EAB308" />
// // // //                             <Text color="white" fontWeight="800" fontSize={15}>{goal.title}</Text>
// // // //                           </XStack>
// // // //                           <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
// // // //                             {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
// // // //                           </Text>
// // // //                         </YStack>
// // // //                         <Text color="#EAB308" fontSize={18} fontWeight="900">
// // // //                           {Math.round((goal.current / goal.target) * 100)}%
// // // //                         </Text>
// // // //                       </XStack>
// // // //                       <Progress 
// // // //                         value={(goal.current / goal.target) * 100} 
// // // //                         h={8} 
// // // //                         bg="rgba(255,255,255,0.1)"
// // // //                         br="$10"
// // // //                       >
// // // //                         <Progress.Indicator 
// // // //                           bg="#EAB308" 
// // // //                           animation="bouncy"
// // // //                           br="$10"
// // // //                           style={{
// // // //                             shadowColor: '#EAB308',
// // // //                             shadowOffset: { width: 0, height: 0 },
// // // //                             shadowOpacity: 0.5,
// // // //                             shadowRadius: 4,
// // // //                           }}
// // // //                         />
// // // //                       </Progress>
// // // //                     </LinearGradient>
// // // //                   </TouchableOpacity>
// // // //                 ))
// // // //               ) : (
// // // //                 <TouchableOpacity 
// // // //                   activeOpacity={0.8}
// // // //                   onPress={() => router.push('/goals')}
// // // //                   style={{
// // // //                     shadowColor: '#EAB308',
// // // //                     shadowOffset: { width: 0, height: 4 },
// // // //                     shadowOpacity: 0.1,
// // // //                     shadowRadius: 8,
// // // //                   }}
// // // //                 >
// // // //                   <LinearGradient
// // // //                     colors={['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']}
// // // //                     start={{ x: 0, y: 0 }}
// // // //                     end={{ x: 1, y: 1 }}
// // // //                     style={{
// // // //                       padding: 24,
// // // //                       borderRadius: 20,
// // // //                       borderWidth: 2,
// // // //                       borderColor: 'rgba(234, 179, 8, 0.2)',
// // // //                       borderStyle: 'dashed',
// // // //                       alignItems: 'center',
// // // //                     }}
// // // //                   >
// // // //                     <Target size={28} color="#EAB308" />
// // // //                     <Text color="#EAB308" fontSize={13} fontWeight="700" mt="$2">SET YOUR FIRST GOAL</Text>
// // // //                     <Text color="rgba(234, 179, 8, 0.6)" fontSize={11} mt="$1">Tap to create financial target</Text>
// // // //                   </LinearGradient>
// // // //                 </TouchableOpacity>
// // // //               )}
// // // //             </YStack>

// // // //             {/* POWERFUL HOLDINGS PREVIEW */}
// // // //             <XStack jc="space-between" ai="center" mb="$3">
// // // //               <H4 
// // // //                 color="#EAB308" 
// // // //                 fontSize={15} 
// // // //                 letterSpacing={2} 
// // // //                 fontWeight="800"
// // // //                 style={{
// // // //                   textShadowColor: 'rgba(234, 179, 8, 0.3)',
// // // //                   textShadowOffset: { width: 0, height: 0 },
// // // //                   textShadowRadius: 5,
// // // //                 }}
// // // //               >
// // // //                 HOLDINGS
// // // //               </H4>
// // // //               <TouchableOpacity 
// // // //                 onPress={() => router.push('/portfolio')}
// // // //                 activeOpacity={0.7}
// // // //               >
// // // //                 <LinearGradient
// // // //                   colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
// // // //                   start={{ x: 0, y: 0 }}
// // // //                   end={{ x: 1, y: 1 }}
// // // //                   style={{
// // // //                     borderRadius: 12,
// // // //                     paddingHorizontal: 12,
// // // //                     paddingVertical: 6,
// // // //                     flexDirection: 'row',
// // // //                     alignItems: 'center',
// // // //                   }}
// // // //                 >
// // // //                   <Text color="#EAB308" fontSize={12} fontWeight="800">VIEW ALL</Text>
// // // //                   <ChevronRight size={14} color="#EAB308" ml="$1" />
// // // //                 </LinearGradient>
// // // //               </TouchableOpacity>
// // // //             </XStack>

// // // //             <YStack space="$3">
// // // //               {profile?.investments && profile.investments.length > 0 ? (
// // // //                 profile.investments.slice(0, 3).map((inv, i) => (
// // // //                   <TouchableOpacity 
// // // //                     key={i} 
// // // //                     activeOpacity={0.9}
      
// // // //                     style={{
// // // //                       shadowColor: '#EAB308',
// // // //                       shadowOffset: { width: 0, height: 4 },
// // // //                       shadowOpacity: 0.1,
// // // //                       shadowRadius: 8,
// // // //                       elevation: 4,
// // // //                     }}
// // // //                   >
// // // //                     <LinearGradient
// // // //                       colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
// // // //                       start={{ x: 0, y: 0 }}
// // // //                       end={{ x: 1, y: 1 }}
// // // //                       style={{
// // // //                         padding: 20,
// // // //                         borderRadius: 20,
// // // //                         borderWidth: 1,
// // // //                         borderColor: 'rgba(234, 179, 8, 0.2)',
// // // //                         flexDirection: 'row',
// // // //                         justifyContent: 'space-between',
// // // //                         alignItems: 'center',
// // // //                       }}
// // // //                     >
// // // //                       <XStack ai="center" space="$4">
// // // //                         <LinearGradient
// // // //                           colors={i === 0 ? ['#EAB308', '#CA8A04'] : 
// // // //                                  i === 1 ? ['#3b82f6', '#2563eb'] : 
// // // //                                  ['#22c55e', '#16a34a']}
// // // //                           start={{ x: 0, y: 0 }}
// // // //                           end={{ x: 1, y: 1 }}
// // // //                           style={{
// // // //                             width: 48,
// // // //                             height: 48,
// // // //                             borderRadius: 14,
// // // //                             justifyContent: 'center',
// // // //                             alignItems: 'center',
// // // //                             shadowColor: i === 0 ? '#EAB308' : i === 1 ? '#3b82f6' : '#22c55e',
// // // //                             shadowOffset: { width: 0, height: 2 },
// // // //                             shadowOpacity: 0.4,
// // // //                             shadowRadius: 4,
// // // //                             elevation: 4,
// // // //                           }}
// // // //                         >
// // // //                           {i === 0 && <Wallet size={24} color="white" />}
// // // //                           {i === 1 && <TrendingUp size={24} color="white" />}
// // // //                           {i === 2 && <PieChart size={24} color="white" />}
// // // //                         </LinearGradient>
// // // //                         <YStack>
// // // //                           <Text color="white" fontWeight="800" fontSize={16}>{inv.identifier}</Text>
// // // //                           <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
// // // //                             {inv.asset_type?.toUpperCase()}
// // // //                           </Text>
// // // //                         </YStack>
// // // //                       </XStack>
// // // //                       <YStack ai="flex-end">
// // // //                         <Text color="white" fontWeight="800" fontSize={16}>
// // // //                           {formatCurrency(inv.current_value)}
// // // //                         </Text>
// // // //                         <LinearGradient
// // // //                           colors={['#22c55e', '#16a34a']}
// // // //                           start={{ x: 0, y: 0 }}
// // // //                           end={{ x: 1, y: 1 }}
// // // //                           style={{
// // // //                             borderRadius: 12,
// // // //                             paddingHorizontal: 8,
// // // //                             paddingVertical: 3,
// // // //                             marginTop: 4,
// // // //                             flexDirection: 'row',
// // // //                             alignItems: 'center',
// // // //                           }}
// // // //                         >
// // // //                           <TrendingUp size={12} color="white" />
// // // //                           <Text color="white" fontSize={11} fontWeight="700" ml="$0.5">STABLE</Text>
// // // //                         </LinearGradient>
// // // //                       </YStack>
// // // //                     </LinearGradient>
// // // //                   </TouchableOpacity>
// // // //                 ))
// // // //               ) : (
// // // //                 <TouchableOpacity 
// // // //                   activeOpacity={0.8}
// // // //                   onPress={() => router.push('/portfolio')}
// // // //                   style={{
// // // //                     shadowColor: '#EAB308',
// // // //                     shadowOffset: { width: 0, height: 4 },
// // // //                     shadowOpacity: 0.1,
// // // //                     shadowRadius: 8,
// // // //                   }}
// // // //                 >
// // // //                   <LinearGradient
// // // //                     colors={['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']}
// // // //                     start={{ x: 0, y: 0 }}
// // // //                     end={{ x: 1, y: 1 }}
// // // //                     style={{
// // // //                       padding: 24,
// // // //                       borderRadius: 20,
// // // //                       borderWidth: 2,
// // // //                       borderColor: 'rgba(234, 179, 8, 0.2)',
// // // //                       borderStyle: 'dashed',
// // // //                       alignItems: 'center',
// // // //                     }}
// // // //                   >
// // // //                     <Wallet size={28} color="#EAB308" />
// // // //                     <Text color="#EAB308" fontSize={13} fontWeight="700" mt="$2">ADD FIRST ASSET</Text>
// // // //                     <Text color="rgba(234, 179, 8, 0.6)" fontSize={11} mt="$1">Tap to link your investments</Text>
// // // //                   </LinearGradient>
// // // //                 </TouchableOpacity>
// // // //               )}
// // // //             </YStack>

// // // //             {/* BOTTOM PADDING */}
// // // //             <YStack h={40} />

// // // //           </ScrollView>
// // // //         </SafeAreaView>
// // // //       </LinearGradient>
// // // //     </Theme>
// // // //   );
// // // // }

// // // // // Enhanced ActionButton with Powerful Gradients
// // // // function ActionButton({ icon, label, onPress, gradient }) {
// // // //   const [scale] = useState(new Animated.Value(1));

// // // //   const handlePressIn = () => {
// // // //     Animated.spring(scale, {
// // // //       toValue: 0.95,
// // // //       useNativeDriver: true,
// // // //       tension: 150,
// // // //       friction: 3,
// // // //     }).start();
// // // //   };

// // // //   const handlePressOut = () => {
// // // //     Animated.spring(scale, {
// // // //       toValue: 1,
// // // //       useNativeDriver: true,
// // // //       tension: 150,
// // // //       friction: 3,
// // // //     }).start();
// // // //   };

// // // //   return (
// // // //     <TouchableOpacity
// // // //       activeOpacity={1}
// // // //       onPressIn={handlePressIn}
// // // //       onPressOut={handlePressOut}
// // // //       onPress={onPress}
// // // //       style={{
// // // //         width: BUTTON_WIDTH,
// // // //         height: 100,
// // // //         marginBottom: 12,
// // // //       }}
// // // //     >
// // // //       <Animated.View style={{ transform: [{ scale }], flex: 1 }}>
// // // //         <LinearGradient
// // // //           colors={gradient}
// // // //           start={{ x: 0, y: 0 }}
// // // //           end={{ x: 1, y: 1 }}
// // // //           style={{
// // // //             flex: 1,
// // // //             borderRadius: 20,
// // // //             justifyContent: 'center',
// // // //             alignItems: 'center',
// // // //             shadowColor: gradient[0],
// // // //             shadowOffset: { width: 0, height: 4 },
// // // //             shadowOpacity: 0.3,
// // // //             shadowRadius: 8,
// // // //             elevation: 8,
// // // //             borderWidth: 1,
// // // //             borderColor: 'rgba(255, 255, 255, 0.1)',
// // // //           }}
// // // //         >
// // // //           {icon}
// // // //           <Text color="white" fontSize={12} fontWeight="800" mt="$2" letterSpacing={0.5}>
// // // //             {label}
// // // //           </Text>
// // // //         </LinearGradient>
// // // //       </Animated.View>
// // // //     </TouchableOpacity>
// // // //   );
// // // // }



// // // // import React, { useEffect, useState } from 'react';
// // // // import { ScrollView, RefreshControl } from 'react-native';
// // // // import { YStack, XStack, Text, Card, Button, H3, Spinner, LinearGradient } from 'tamagui';
// // // // import { Sparkles, TrendingUp, Wallet, Target, ChevronRight } from '@tamagui/lucide-icons';
// // // // import { useFinanceStore } from '../../../store/financeStore';
// // // // import { dashboardService } from '../../../services/dashboardService';

// // // // export default function Dashboard() {
// // // //   const { dashboard, score, loading, refreshDashboard } = useFinanceStore();
// // // //   const [aiInsight, setAiInsight] = useState('');
// // // //   const [isExplaining, setIsExplaining] = useState(false);

// // // //   useEffect(() => {
// // // //     refreshDashboard();
// // // //   }, []);

// // // //   const handleExplainAI = async () => {
// // // //     setIsExplaining(true);
// // // //     try {
// // // //       const res = await dashboardService.explainDashboard();
// // // //       setAiInsight(res.data);
// // // //     } catch (e) {
// // // //       setAiInsight("Failed to generate insight. Check connection.");
// // // //     } finally {
// // // //       setIsExplaining(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <ScrollView 
// // // //       style={{ backgroundColor: '#000' }}
// // // //       refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshDashboard} tintColor="#EAB308" />}
// // // //     >
// // // //       <YStack p="$4" space="$5" pt="$8">
        
// // // //         {/* FINANCE SCORE SECTION */}
// // // //         <Card p="$5" br="$6" bc="$gray3" bw={1} bg="rgba(255,255,255,0.03)">
// // // //           <XStack jc="space-between" ai="center">
// // // //             <YStack space="$1">
// // // //               <Text color="$gray11" ls={1} fontSize={12} fontWeight="bold">FINANCE SCORE</Text>
// // // //               <H3 color="white" fontSize={42}>{score}<Text fontSize={18} color="$gray10">/100</Text></H3>
// // // //             </YStack>
// // // //             <Button 
// // // //               size="$3" br="$10" bg="$gold10" color="black" 
// // // //               icon={isExplaining ? <Spinner color="black" /> : Sparkles}
// // // //               onPress={handleExplainAI}
// // // //             >
// // // //               Explain
// // // //             </Button>
// // // //           </XStack>
          
// // // //           {aiInsight ? (
// // // //             <YStack mt="$4" p="$3" br="$4" bg="rgba(234,179,8,0.1)" bc="$gold8" bw={0.5}>
// // // //               <Text color="white" fontSize={13} lh={18}>{aiInsight}</Text>
// // // //             </YStack>
// // // //           ) : null}
// // // //         </Card>

// // // //         {/* QUICK STATS */}
// // // //         <XStack space="$3">
// // // //           <StatCard icon={<Wallet size={18} color="$gold10"/>} label="Net Worth" value={`₹${dashboard?.total_assets || 0}`} />
// // // //           <StatCard icon={<TrendingUp size={18} color="$green10"/>} label="Avg Spend" value={`₹${dashboard?.monthly_expenses || 0}`} />
// // // //         </XStack>

// // // //         {/* GOAL PREVIEW (Intelligence API) */}
// // // //         <YStack space="$3">
// // // //           <XStack jc="space-between" ai="center">
// // // //             <Text color="white" fontWeight="bold">Active Goals</Text>
// // // //             <ChevronRight size={18} color="$gray10" />
// // // //           </XStack>
// // // //           {dashboard?.goals?.map((goal, i) => (
// // // //             <Card key={i} p="$4" bc="$gray3" bw={1} bg="#080808">
// // // //               <XStack jc="space-between" ai="center">
// // // //                 <YStack>
// // // //                   <Text color="white" fontWeight="bold">{goal.name}</Text>
// // // //                   <Text color="$gray11" fontSize={12}>Target: ₹{goal.target_amount}</Text>
// // // //                 </YStack>
// // // //                 <Text color="$gold10" fontWeight="bold">{goal.progress_pct}%</Text>
// // // //               </XStack>
// // // //             </Card>
// // // //           ))}
// // // //         </YStack>

// // // //       </YStack>
// // // //     </ScrollView>
// // // //   );
// // // // }

// // // // // Helper Mini-Component
// // // // function StatCard({ icon, label, value }) {
// // // //   return (
// // // //     <Card f={1} p="$4" br="$5" bc="$gray3" bw={1} bg="rgba(255,255,255,0.02)">
// // // //       {icon}
// // // //       <Text color="$gray10" fontSize={11} mt="$2" ls={0.5}>{label}</Text>
// // // //       <Text color="white" fontSize={18} fontWeight="bold" mt="$1">{value}</Text>
// // // //     </Card>
// // // //   );
// // // // }



// // // // import React, { useEffect, useState, useCallback } from 'react';
// // // // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
// // // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress } from 'tamagui';
// // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // import { 
// // // //   Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
// // // //   ChevronRight, Shield, BarChart3, Wallet, Cpu
// // // // } from '@tamagui/lucide-icons';
// // // // import { useRouter } from 'expo-router';
// // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // // // --- NEW WIRING (The Brains) ---
// // // // import { useFinanceStore } from '../../../store/financeStore';
// // // // import { useUserStore } from '../../../store/userStore';

// // // // const { width } = Dimensions.get('window');
// // // // const BUTTON_WIDTH = (width - 40 - 15) / 2;

// // // // export default function Dashboard() {
// // // //   const router = useRouter();
// // // //   const insets = useSafeAreaInsets();
  
// // // //   // 1. Get data from the Global Stores we just created
// // // //   const { dashboard, score, loading, refreshDashboard } = useFinanceStore();
// // // //   const { user, fetchProfile } = useUserStore();

// // // //   // 2. Initial Sync
// // // //   useEffect(() => {
// // // //     refreshDashboard();
// // // //     fetchProfile();
// // // //   }, []);

// // // //   const formatCurrency = (amount) =>
// // // //     new Intl.NumberFormat('en-IN', { 
// // // //       style: 'currency', 
// // // //       currency: 'INR', 
// // // //       maximumFractionDigits: 0 
// // // //     }).format(amount || 0);

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <LinearGradient 
// // // //         colors={['#000000', '#0A0A0A', '#111111']}
// // // //         start={{ x: 0, y: 0 }}
// // // //         end={{ x: 1, y: 1 }}
// // // //         style={{ flex: 1 }}
// // // //       >
// // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
// // // //           <ScrollView
// // // //             showsVerticalScrollIndicator={false}
// // // //             refreshControl={
// // // //               <RefreshControl
// // // //                 refreshing={loading}
// // // //                 onRefresh={refreshDashboard}
// // // //                 tintColor="#EAB308"
// // // //               />
// // // //             }
// // // //             contentContainerStyle={{
// // // //               padding: 20,
// // // //               paddingBottom: 100,
// // // //             }}
// // // //           >
// // // //             {/* ENHANCED HEADER - Kept your exact split logic */}
// // // //             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
// // // //               <YStack>
// // // //                 <XStack ai="center" space="$2" mb="$1">
// // // //                   <Shield size={14} color="#EAB308" />
// // // //                   <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">PROTOCOL</Text>
// // // //                 </XStack>
// // // //                 <H2 color="white" fontWeight="900" fontSize={28}>
// // // //                   {user?.full_name ? user.full_name.split(' ')[0] : 'Protocol User'}
// // // //                 </H2>
// // // //               </YStack>

// // // //               <TouchableOpacity onPress={() => router.push('/profile')}>
// // // //                 <LinearGradient
// // // //                   colors={['#EAB308', '#CA8A04']}
// // // //                   style={{ width: 48, height: 48, borderRadius: 24, jc: 'center', ai: 'center', bw: 2, bc: 'rgba(255, 255, 255, 0.2)' }}
// // // //                 >
// // // //                   <User size={22} color="black" />
// // // //                 </LinearGradient>
// // // //               </TouchableOpacity>
// // // //             </XStack>

// // // //             {/* BALANCE SECTION - Using dashboard.total_assets */}
// // // //             <YStack bg="#111" p="$5" br="$4" mb="$5" bw={1.5} borderColor="rgba(234, 179, 8, 0.2)">
// // // //               <Text color="#EAB308" fontSize={11} letterSpacing={2} fontWeight="600" mb="$2">TOTAL NET WORTH</Text>
// // // //               <H2 color="white" fontWeight="900" fontSize={38}>
// // // //                 {loading && !dashboard ? "..." : formatCurrency(dashboard?.total_assets)}
// // // //               </H2>
// // // //               <XStack ai="center" space="$3" mt="$3">
// // // //                 <XStack bg="#1a1a1a" px="$2.5" py="$1" br="$2" ai="center" borderColor="rgba(34, 197, 94, 0.3)" bw={1}>
// // // //                   <TrendingUp size={14} color="#22c55e" />
// // // //                   <Text color="#22c55e" fontSize={12} fontWeight="700" ml="$1">+2.4% Today</Text>
// // // //                 </XStack>
// // // //               </XStack>
// // // //             </YStack>

// // // //             {/* SYSTEM STATUS - Using your Finance Score API */}
// // // //             <YStack mb={24} p={20} br={20} bw={1} bc="rgba(34, 197, 94, 0.3)" bg="rgba(34, 197, 94, 0.05)">
// // // //               <XStack ai="center" space="$4">
// // // //                 <Cpu size={22} color="#22c55e" />
// // // //                 <YStack f={1}>
// // // //                   <Text color="white" fontWeight="800" fontSize={16}>AI CORE SYSTEM</Text>
// // // //                   <Text color="rgba(34, 197, 94, 0.9)" fontSize={13} fontWeight="600">
// // // //                     Finance Score: {score}/100
// // // //                   </Text>
// // // //                 </YStack>
// // // //               </XStack>
// // // //             </YStack>

// // // //             {/* QUICK ACTIONS GRID - Kept your exact gradients */}
// // // //             <H4 color="#EAB308" mb="$4" fontSize={15} letterSpacing={2} fontWeight="800">QUICK ACTIONS</H4>
// // // //             <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" mb="$6">
// // // //               <ActionButton icon={<ArrowUpRight size={24} color="white"/>} label="Add Asset" onPress={() => router.push('/portfolio')} gradient={['#EAB308', '#CA8A04']} />
// // // //               <ActionButton icon={<Search size={24} color="white"/>} label="AI Analysis" onPress={() => router.push('/analysis')} gradient={['#3b82f6', '#2563eb']} />
// // // //               <ActionButton icon={<Briefcase size={24} color="white"/>} label="Income" onPress={() => router.push('/income')} gradient={['#22c55e', '#16a34a']} />
// // // //               <ActionButton icon={<CreditCard size={24} color="white"/>} label="Spend" onPress={() => router.push('/transactions')} gradient={['#ef4444', '#dc2626']} />
// // // //             </XStack>

// // // //             {/* GOALS PROGRESS - Mapping your real Goals from API */}
// // // //             <H4 color="#EAB308" fontSize={15} letterSpacing={2} fontWeight="800" mb="$3">GOALS PROGRESS</H4>
// // // //             <YStack space="$3" mb="$6">
// // // //               {dashboard?.goals?.map((goal, i) => (
// // // //                 <LinearGradient key={i} colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']} style={{ padding: 20, borderRadius: 20, bw: 1, borderColor: 'rgba(234, 179, 8, 0.2)' }}>
// // // //                   <XStack jc="space-between" mb="$3">
// // // //                     <Text color="white" fontWeight="800">{goal.name}</Text>
// // // //                     <Text color="#EAB308" fontWeight="900">{goal.progress_pct}%</Text>
// // // //                   </XStack>
// // // //                   <Progress value={goal.progress_pct} h={8} bg="rgba(255,255,255,0.1)">
// // // //                     <Progress.Indicator bg="#EAB308" animation="bouncy" />
// // // //                   </Progress>
// // // //                 </LinearGradient>
// // // //               ))}
// // // //             </YStack>

// // // //           </ScrollView>
// // // //         </SafeAreaView>
// // // //       </LinearGradient>
// // // //     </Theme>
// // // //   );
// // // // }

// // // // // ActionButton Helper (kept your scaling animation logic)
// // // // function ActionButton({ icon, label, onPress, gradient }) {
// // // //   return (
// // // //     <TouchableOpacity onPress={onPress} style={{ width: BUTTON_WIDTH, height: 100 }}>
// // // //       <LinearGradient colors={gradient} style={{ flex: 1, br: 20, jc: 'center', ai: 'center', shadowOpacity: 0.3 }}>
// // // //         {icon}
// // // //         <Text color="white" fontSize={12} fontWeight="800" mt="$2">{label}</Text>
// // // //       </LinearGradient>
// // // //     </TouchableOpacity>
// // // //   );
// // // // }





// // // import React, { useEffect, useState, useCallback, useRef } from 'react';
// // // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
// // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress, Card } from 'tamagui';
// // // import { LinearGradient } from 'expo-linear-gradient';
// // // import { 
// // //   TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
// // //   ChevronRight, Shield, BarChart3, Wallet, Target as TargetIcon, Cpu, Sparkles
// // // } from '@tamagui/lucide-icons';
// // // import { useRouter } from 'expo-router';
// // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // // --- SERVICES ---
// // // import { api } from '../../../services/api';
// // // import { UserService } from '../../../services/userService';

// // // const { width } = Dimensions.get('window');
// // // const BUTTON_WIDTH = (width - 40 - 15) / 2;

// // // export default function Dashboard() {
// // //   const router = useRouter();
// // //   const insets = useSafeAreaInsets();

// // //   // --- DASHBOARD STATE ---
// // //   const [profile, setProfile] = useState(null);
// // //   const [overview, setOverview] = useState({ monthly_income: 0, monthly_expense: 0, total_investments: 0 });
// // //   const [goals, setGoals] = useState([]);
// // //   const [investments, setInvestments] = useState([]);
// // //   const [financeScore, setFinanceScore] = useState(0);
// // //   const [aiExplanation, setAiExplanation] = useState('');
  
// // //   const [loading, setLoading] = useState(true);
// // //   const [isExplaining, setIsExplaining] = useState(false);

// // //   // --- DATA FETCHING (Multi-API Sync) ---
// // //   const fetchData = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       // Calling all dashboard APIs in parallel for speed
// // //       const [
// // //         profileRes, 
// // //         overviewRes, 
// // //         goalsRes, 
// // //         investmentsRes, 
// // //         scoreRes
// // //       ] = await Promise.all([
// // //         UserService.getProfile(),
// // //         api.get('/api/v1/dashboard/overview'),
// // //         api.get('/api/v1/dashboard/goals'),
// // //         api.get('/api/v1/dashboard/investments'),
// // //         api.get('/api/v1/dashboard/score')
// // //       ]);

// // //       setProfile(profileRes);
// // //       setOverview(overviewRes.data);
// // //       setGoals(goalsRes.data || []);
// // //       setInvestments(investmentsRes.data || []);
// // //       setFinanceScore(scoreRes.data);

// // //     } catch (error) {
// // //       console.error("Dashboard Sync Error:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, [fetchData]);

// // //   // --- AI EXPLAIN FUNCTION ---
// // //   const handleAiExplain = async () => {
// // //     setIsExplaining(true);
// // //     try {
// // //       const res = await api.post('/api/v1/dashboard/explain');
// // //       setAiExplanation(res.data);
// // //     } catch (e) {
// // //       setAiExplanation("AI Core currently analyzing updated signals. Try again shortly.");
// // //     } finally {
// // //       setIsExplaining(false);
// // //     }
// // //   };

// // //   const formatCurrency = (amount) =>
// // //     new Intl.NumberFormat('en-IN', { 
// // //       style: 'currency', 
// // //       currency: 'INR',
// // //       maximumFractionDigits: 0 
// // //     }).format(amount || 0);

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
// // //               <RefreshControl refreshing={loading} onRefresh={fetchData} tintColor="#EAB308" />
// // //             }
// // //             contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
// // //           >
// // //             {/* PROTOCOL HEADER */}
// // //             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
// // //               <YStack>
// // //                 <XStack ai="center" space="$2" mb="$1">
// // //                   <Shield size={14} color="#EAB308" />
// // //                   <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">PROTOCOL</Text>
// // //                 </XStack>
// // //                 <H2 color="white" fontWeight="900" fontSize={28}>
// // //                   {profile?.full_name ? profile.full_name.split(' ')[0] : 'FINNI USER'}
// // //                 </H2>
// // //               </YStack>

// // //               <TouchableOpacity onPress={() => router.push('/profile')}>
// // //                 <LinearGradient
// // //                   colors={['#EAB308', '#CA8A04']}
// // //                   style={{ width: 48, height: 48, borderRadius: 24, jc: 'center', ai: 'center', bw: 2, bc: 'rgba(255, 255, 255, 0.2)' }}
// // //                 >
// // //                   <User size={22} color="black" />
// // //                 </LinearGradient>
// // //               </TouchableOpacity>
// // //             </XStack>

// // //             {/* BALANCE SECTION */}
// // //             <YStack 
// // //               bg="#111111" p="$5" br="$4" mb="$5" bw={1.5} borderColor="rgba(234, 179, 8, 0.2)"
// // //             >
// // //               <Text color="#EAB308" fontSize={11} letterSpacing={2} fontWeight="600" mb="$2">TOTAL INVESTMENTS</Text>
// // //               <H2 color="white" fontWeight="900" fontSize={38} letterSpacing={-0.5}>
// // //                 {formatCurrency(overview.total_investments)}
// // //               </H2>
              
// // //               <XStack ai="center" space="$3" mt="$3">
// // //                 <XStack bg="#1a1a1a" px="$2.5" py="$1" br="$2" ai="center" bc="rgba(34, 197, 94, 0.3)" bw={1}>
// // //                   <TrendingUp size={14} color="#22c55e" />
// // //                   <Text color="#22c55e" fontSize={12} fontWeight="700" ml="$1">+2.4% Today</Text>
// // //                 </XStack>
                
// // //                 <Button 
// // //                   size="$2" br="$10" bg="$gold10" color="black" 
// // //                   icon={isExplaining ? <Spinner color="black" /> : Sparkles}
// // //                   onPress={handleAiExplain}
// // //                 >
// // //                   AI Explain
// // //                 </Button>
// // //               </XStack>

// // //               {aiExplanation ? (
// // //                 <YStack mt="$4" p="$3" br="$4" bg="rgba(234, 179, 8, 0.1)" bc="$gold8" bw={0.5}>
// // //                    <Text color="white" fontSize={13} lh={18}>{aiExplanation}</Text>
// // //                 </YStack>
// // //               ) : null}
// // //             </YStack>

// // //             {/* SYSTEM STATUS (FINANCE SCORE) */}
// // //             <YStack mb={24} p={20} br={20} bw={1} bc="rgba(34, 197, 94, 0.3)" bg="rgba(34, 197, 94, 0.05)">
// // //               <XStack ai="center" space="$4">
// // //                 <LinearGradient
// // //                   colors={['#22c55e', '#16a34a']}
// // //                   style={{ width: 44, height: 44, borderRadius: 22, jc: 'center', ai: 'center' }}
// // //                 >
// // //                   <Cpu size={22} color="white" />
// // //                 </LinearGradient>
// // //                 <YStack f={1}>
// // //                   <Text color="white" fontWeight="800" fontSize={16}>FINANCE SCORE: {financeScore}/100</Text>
// // //                   <Text color="rgba(34, 197, 94, 0.9)" fontSize={13} fontWeight="600">
// // //                     System suggests {financeScore > 70 ? 'optimal' : 'adjusting'} liquidity.
// // //                   </Text>
// // //                 </YStack>
// // //               </XStack>
// // //             </YStack>

// // //             {/* QUICK ACTIONS GRID */}
// // //             <H4 color="#EAB308" mb="$4" fontSize={15} letterSpacing={2} fontWeight="800">QUICK ACTIONS</H4>
// // //             <XStack flexWrap="wrap" justifyContent="space-between" gap="$3" mb="$6">
// // //               <ActionButton icon={<ArrowUpRight size={24} color="white"/>} label="Add Asset" onPress={() => router.push('/portfolio')} gradient={['#EAB308', '#CA8A04']} />
// // //               <ActionButton icon={<Search size={24} color="white"/>} label="AI Analysis" onPress={() => router.push('/analysis')} gradient={['#3b82f6', '#2563eb']} />
// // //               <ActionButton icon={<Briefcase size={24} color="white"/>} label="Income" onPress={() => router.push('/income')} gradient={['#22c55e', '#16a34a']} />
// // //               <ActionButton icon={<CreditCard size={24} color="white"/>} label="Spend" onPress={() => router.push('/transactions')} gradient={['#ef4444', '#dc2626']} />
// // //             </XStack>

// // //             {/* GOALS PROGRESS */}
// // //             <XStack jc="space-between" ai="center" mb="$3">
// // //               <H4 color="#EAB308" fontSize={15} letterSpacing={2} fontWeight="800">GOALS PROGRESS</H4>
// // //               <TouchableOpacity onPress={() => router.push('/goals')}>
// // //                 <Text color="#EAB308" fontSize={12} fontWeight="800">MANAGE <ChevronRight size={12} /></Text>
// // //               </TouchableOpacity>
// // //             </XStack>
            
// // //             <YStack space="$3" mb="$6">
// // //               {goals.length > 0 ? goals.slice(0, 2).map((goal, i) => (
// // //                 <LinearGradient key={i} colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']} style={{ padding: 20, borderRadius: 20, bw: 1, borderColor: 'rgba(234, 179, 8, 0.2)' }}>
// // //                   <XStack jc="space-between" mb="$3">
// // //                     <Text color="white" fontWeight="800" fontSize={15}>{goal.name}</Text>
// // //                     <Text color="#EAB308" fontSize={18} fontWeight="900">{Math.round((goal.current_amount / goal.target_amount) * 100)}%</Text>
// // //                   </XStack>
// // //                   <Progress value={(goal.current_amount / goal.target_amount) * 100} h={8} bg="rgba(255,255,255,0.1)">
// // //                     <Progress.Indicator bg="#EAB308" animation="bouncy" />
// // //                   </Progress>
// // //                 </LinearGradient>
// // //               )) : (
// // //                 <Text color="$gray10" textAlign="center" py="$4">No active goals found.</Text>
// // //               )}
// // //             </YStack>

// // //             {/* HOLDINGS PREVIEW */}
// // //             <H4 color="#EAB308" fontSize={15} letterSpacing={2} fontWeight="800" mb="$3">HOLDINGS</H4>
// // //             <YStack space="$3">
// // //               {investments.length > 0 ? investments.slice(0, 3).map((inv, i) => (
// // //                 <LinearGradient key={i} colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']} style={{ padding: 20, borderRadius: 20, bw: 1, borderColor: 'rgba(234, 179, 8, 0.2)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
// // //                   <XStack ai="center" space="$4">
// // //                     <YStack>
// // //                       <Text color="white" fontWeight="800" fontSize={16}>{inv.name || inv.identifier}</Text>
// // //                       <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>{inv.asset_type?.toUpperCase()}</Text>
// // //                     </YStack>
// // //                   </XStack>
// // //                   <YStack ai="flex-end">
// // //                     <Text color="white" fontWeight="800" fontSize={16}>{formatCurrency(inv.current_value)}</Text>
// // //                     <Text color="$green10" fontSize={11} fontWeight="700">LIVE</Text>
// // //                   </YStack>
// // //                 </LinearGradient>
// // //               )) : (
// // //                 <Text color="$gray10" textAlign="center" py="$4">No assets tracked.</Text>
// // //               )}
// // //             </YStack>

// // //           </ScrollView>
// // //         </SafeAreaView>
// // //       </LinearGradient>
// // //     </Theme>
// // //   );
// // // }

// // // // --- REUSABLE COMPONENTS ---
// // // function ActionButton({ icon, label, onPress, gradient }) {
// // //   const scale = useRef(new Animated.Value(1)).current;

// // //   const handlePressIn = () => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
// // //   const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

// // //   return (
// // //     <TouchableOpacity 
// // //       activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}
// // //       style={{ width: BUTTON_WIDTH, height: 100, marginBottom: 12 }}
// // //     >
// // //       <Animated.View style={{ transform: [{ scale }], flex: 1 }}>
// // //         <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', shadowColor: gradient[0], shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
// // //           {icon}
// // //           <Text color="white" fontSize={12} fontWeight="800" mt="$2" letterSpacing={0.5}>{label}</Text>
// // //         </LinearGradient>
// // //       </Animated.View>
// // //     </TouchableOpacity>
// // //   );
// // // }


// // import React, { useEffect, useState, useCallback, useRef } from 'react';
// // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
// // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress } from 'tamagui';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { 
// //   TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
// //   ChevronRight, Shield, BarChart3, Wallet, Target as TargetIcon, Cpu, Sparkles
// // } from '@tamagui/lucide-icons';
// // import { useRouter } from 'expo-router';
// // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // --- SERVICES ---
// // import { api } from '../../../services/api';
// // import { UserService } from '../../../services/userService';

// // const { width } = Dimensions.get('window');
// // const BUTTON_WIDTH = (width - 40 - 15) / 2;

// // export default function Dashboard() {
// //   const router = useRouter();
// //   const insets = useSafeAreaInsets();

// //   // --- DASHBOARD STATE ---
// //   const [profile, setProfile] = useState(null);
// //   const [overview, setOverview] = useState({ monthly_income: 0, monthly_expense: 0, total_investments: 0 });
// //   const [goals, setGoals] = useState([]);
// //   const [investments, setInvestments] = useState([]);
// //   const [financeScore, setFinanceScore] = useState(0); // Initialize as a number
// //   const [aiExplanation, setAiExplanation] = useState('');
  
// //   const [loading, setLoading] = useState(true);
// //   const [isExplaining, setIsExplaining] = useState(false);

// //   // --- DATA FETCHING ---
// //   const fetchData = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const [profileRes, overviewRes, goalsRes, investmentsRes, scoreRes] = await Promise.all([
// //         UserService.getProfile(),
// //         api.get('/api/v1/dashboard/overview'),
// //         api.get('/api/v1/dashboard/goals'),
// //         api.get('/api/v1/dashboard/investments'),
// //         api.get('/api/v1/dashboard/score')
// //       ]);

// //       setProfile(profileRes);
// //       setOverview(overviewRes.data);
// //       setGoals(goalsRes.data || []);
// //       setInvestments(investmentsRes.data || []);
      
// //       // ✅ FIX: Extract the score if it's an object, otherwise use it directly
// //       const scoreValue = typeof scoreRes.data === 'object' ? scoreRes.data.score : scoreRes.data;
// //       setFinanceScore(scoreValue || 0);

// //     } catch (error) {
// //       console.error("Dashboard Sync Error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchData();
// //   }, [fetchData]);

// //   const handleAiExplain = async () => {
// //     setIsExplaining(true);
// //     try {
// //       const res = await api.post('/api/v1/dashboard/explain');
// //       // If the response is an object like { "summary": "..." }, extract the string
// //       const summaryText = typeof res.data === 'object' ? res.data.summary : res.data;
// //       setAiExplanation(summaryText);
// //     } catch (e) {
// //       setAiExplanation("AI Core currently analyzing signals.");
// //     } finally {
// //       setIsExplaining(false);
// //     }
// //   };

// //   const formatCurrency = (amount) =>
// //     new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);

// //   if (loading && !profile) {
// //     return (
// //       <YStack f={1} bg="#000" jc="center" ai="center">
// //         <Spinner size="large" color="#EAB308" />
// //       </YStack>
// //     );
// //   }

// //   return (
// //     <Theme name="dark">
// //       <LinearGradient colors={['#000000', '#0A0A0A', '#111111']} style={{ flex: 1 }}>
// //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
// //           <ScrollView
// //             showsVerticalScrollIndicator={false}
// //             refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} tintColor="#EAB308" />}
// //             contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
// //           >
// //             {/* PROTOCOL HEADER */}
// //             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
// //               <YStack>
// //                 <XStack ai="center" space="$2" mb="$1">
// //                   <Shield size={14} color="#EAB308" />
// //                   <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">PROTOCOL</Text>
// //                 </XStack>
// //                 <H2 color="white" fontWeight="900" fontSize={28}>
// //                   {profile?.full_name ? profile.full_name.split(' ')[0] : 'FINNI USER'}
// //                 </H2>
// //               </YStack>
// //               <TouchableOpacity onPress={() => router.push('/profile')}>
// //                 <YStack w={48} h={48} br={24} bg="$gold10" jc="center" ai="center">
// //                   <User size={22} color="black" />
// //                 </YStack>
// //               </TouchableOpacity>
// //             </XStack>

// //             {/* BALANCE CARD */}
// //             <YStack bg="#111" p="$5" br="$4" mb="$5" bw={1.5} bc="rgba(234, 179, 8, 0.2)">
// //               <Text color="#EAB308" fontSize={11} letterSpacing={2} fontWeight="600" mb="$2">TOTAL INVESTMENTS</Text>
// //               <H2 color="white" fontWeight="900" fontSize={38}>
// //                 {formatCurrency(overview.total_investments)}
// //               </H2>
// //               <XStack ai="center" space="$3" mt="$3">
// //                 <Button size="$2" br="$10" bg="$gold10" color="black" icon={isExplaining ? <Spinner color="black" /> : Sparkles} onPress={handleAiExplain}>
// //                   AI Explain
// //                 </Button>
// //               </XStack>
// //               {aiExplanation ? (
// //                 <YStack mt="$4" p="$3" br="$4" bg="rgba(234, 179, 8, 0.1)" bc="$gold8" bw={0.5}>
// //                    <Text color="white" fontSize={13}>{String(aiExplanation)}</Text>
// //                 </YStack>
// //               ) : null}
// //             </YStack>

// //             {/* FINANCE SCORE CARD */}
// //             <YStack mb={24} p={20} br={20} bw={1} bc="rgba(34, 197, 94, 0.3)" bg="rgba(34, 197, 94, 0.05)">
// //               <XStack ai="center" space="$4">
// //                 <Cpu size={22} color="#22c55e" />
// //                 <YStack f={1}>
// //                   {/* ✅ FIX: financeScore is now guaranteed to be a number/string, not an object */}
// //                   <Text color="white" fontWeight="800" fontSize={16}>FINANCE SCORE: {financeScore}/100</Text>
// //                   <Text color="rgba(34, 197, 94, 0.9)" fontSize={13} fontWeight="600">
// //                     System analysis: {financeScore > 70 ? 'Operational' : 'Adjustment Required'}
// //                   </Text>
// //                 </YStack>
// //               </XStack>
// //             </YStack>

// //             {/* QUICK ACTIONS GRID */}
// //             <H4 color="#EAB308" mb="$4" fontSize={15} letterSpacing={2} fontWeight="800">QUICK ACTIONS</H4>
// //             <XStack flexWrap="wrap" jc="space-between" gap="$3" mb="$6">
// //               <ActionButton icon={<ArrowUpRight size={24} color="white"/>} label="Add Asset" onPress={() => router.push('/portfolio')} gradient={['#EAB308', '#CA8A04']} />
// //               <ActionButton icon={<Search size={24} color="white"/>} label="AI Analysis" onPress={() => router.push('/analysis')} gradient={['#3b82f6', '#2563eb']} />
// //               <ActionButton icon={<Briefcase size={24} color="white"/>} label="Income" onPress={() => router.push('/income')} gradient={['#22c55e', '#16a34a']} />
// //               <ActionButton icon={<CreditCard size={24} color="white"/>} label="Spend" onPress={() => router.push('/transactions')} gradient={['#ef4444', '#dc2626']} />
// //             </XStack>

// //           </ScrollView>
// //         </SafeAreaView>
// //       </LinearGradient>
// //     </Theme>
// //   );
// // }

// // function ActionButton({ icon, label, onPress, gradient }) {
// //   return (
// //     <TouchableOpacity onPress={onPress} style={{ width: BUTTON_WIDTH, height: 100, marginBottom: 12 }}>
// //       <LinearGradient colors={gradient} style={{ flex: 1, br: 20, jc: 'center', ai: 'center' }}>
// //         {icon}
// //         <Text color="white" fontSize={12} fontWeight="800" mt="$2">{label}</Text>
// //       </LinearGradient>
// //     </TouchableOpacity>
// //   );
// // }



// import React, { useEffect, useState, useCallback } from 'react';
// import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
// import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress } from 'tamagui';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import { 
//   Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
//   ChevronRight, Shield, Zap, PieChart, BarChart3, Wallet, Target as TargetIcon, Cpu
// } from '@tamagui/lucide-icons';
// import { useRouter } from 'expo-router';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // Services - Updated to use new endpoints
// import { ApiService } from '../../../services/apiService';

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
//     financeScore: null
//   });
//   const [healthStatus, setHealthStatus] = useState('Checking...');
//   const [isSystemOnline, setIsSystemOnline] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // --- DATA FETCHING ---
//   const fetchDashboardData = useCallback(async () => {
//     try {
//       setLoading(true);
      
//       // Fetch all dashboard data in parallel
//       const [overviewRes, goalsRes, investmentsRes, scoreRes] = await Promise.all([
//         ApiService.get('/dashboard/overview'),
//         ApiService.get('/dashboard/goals'),
//         ApiService.get('/dashboard/investments'),
//         ApiService.get('/dashboard/score')
//       ]);

//       setDashboardData({
//         overview: overviewRes.data,
//         goals: goalsRes.data || [],
//         investments: investmentsRes.data || [],
//         financeScore: scoreRes.data
//       });

//       // Check system health - assuming overview endpoint indicates system status
//       setIsSystemOnline(true);
//       setHealthStatus("System Operational");
      
//     } catch (error) {
//       console.log("Dashboard Data Fetch Error:", error);
//       setHealthStatus("Connection Error");
//       setIsSystemOnline(false);
      
//       // Set fallback data
//       setDashboardData({
//         overview: { total_balance: 0, monthly_growth: 0, daily_growth: 0 },
//         goals: [],
//         investments: [],
//         financeScore: { score: 0, level: 'Beginner' }
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

//   const calculateTotalBalance = () => {
//     if (dashboardData.overview?.total_balance) {
//       return dashboardData.overview.total_balance;
//     }
    
//     // Fallback calculation from investments
//     if (dashboardData.investments && dashboardData.investments.length > 0) {
//       return dashboardData.investments.reduce(
//         (sum, item) => sum + (Number(item.current_value) || 0), 
//         0
//       );
//     }
    
//     return 0;
//   };

//   const totalBalance = calculateTotalBalance();
//   const monthlyGrowth = dashboardData.overview?.monthly_growth || 5.2;
//   const dailyGrowth = dashboardData.overview?.daily_growth || 2.4;
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
//                   Dashboard
//                 </H2>
//               </YStack>

//               {/* FINANCE SCORE BADGE */}
//               <TouchableOpacity 
//                 onPress={() => router.push('/profile')}
//                 activeOpacity={0.8}
//               >
//                 <LinearGradient
//                   colors={getScoreGradient(financeScore)}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={{
//                     paddingHorizontal: 12,
//                     paddingVertical: 8,
//                     borderRadius: 20,
//                     alignItems: 'center',
//                     minWidth: 100,
//                     borderWidth: 1,
//                     borderColor: 'rgba(255, 255, 255, 0.2)',
//                   }}
//                 >
//                   <Text color="white" fontSize={10} fontWeight="700">FINANCE SCORE</Text>
//                   <XStack ai="center" space="$1">
//                     <Text color="white" fontSize={16} fontWeight="900">{financeScore}</Text>
//                     <Text color="rgba(255,255,255,0.8)" fontSize={10}>/100</Text>
//                   </XStack>
//                   <Text color="rgba(255,255,255,0.9)" fontSize={9} fontWeight="600">{scoreLevel}</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </XStack>

//             {/* BALANCE SECTION - Minimal & Powerful */}
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
//                 {loading && !dashboardData.overview ? "..." : formatCurrency(totalBalance)}
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
//               onPress={() => router.push('/system')}
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
//                     <Text color="rgba(255,255,255,0.6)" fontSize={11} mt="$1">
//                       Last updated: Just now
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
//                 icon={<PieChart size={24} color="white"/>} 
//                 label="Charts" 
//                 onPress={() => router.push('/dashboard/charts')}
//                 gradient={['#06b6d4', '#0891b2']}
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
//                           {goal.progress_percentage || Math.round((goal.current_amount / goal.target_amount) * 100)}%
//                         </Text>
//                       </XStack>
//                       <Progress 
//                         value={goal.progress_percentage || (goal.current_amount / goal.target_amount) * 100} 
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
//                       {goal.deadline && (
//                         <Text color="rgba(255,255,255,0.5)" fontSize={11} mt="$2">
//                           Target: {new Date(goal.deadline).toLocaleDateString()}
//                         </Text>
//                       )}
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
//                     onPress={() => router.push(`/portfolio/${inv.id}`)}
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
//                           <Text color="white" fontWeight="800" fontSize={16}>
//                             {inv.name || inv.identifier || `Investment ${i+1}`}
//                           </Text>
//                           <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
//                             {inv.type?.toUpperCase() || inv.asset_type?.toUpperCase() || 'INVESTMENT'}
//                           </Text>
//                         </YStack>
//                       </XStack>
//                       <YStack ai="flex-end">
//                         <Text color="white" fontWeight="800" fontSize={16}>
//                           {formatCurrency(inv.current_value || inv.value)}
//                         </Text>
//                         <XStack 
//                           bg={getReturnColor(inv.return_percentage)}
//                           px="$2" 
//                           py="$1" 
//                           br="$2"
//                           ai="center"
//                           mt="$1"
//                         >
//                           <TrendingUp size={12} color="white" />
//                           <Text color="white" fontSize={11} fontWeight="700" ml="$0.5">
//                             {inv.return_percentage ? `${inv.return_percentage > 0 ? '+' : ''}${inv.return_percentage}%` : 'STABLE'}
//                           </Text>
//                         </XStack>
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

//             {/* ADDITIONAL ACTIONS */}
//             <XStack jc="space-between" mt="$6" mb="$4">
//               <TouchableOpacity 
//                 onPress={() => router.push('/dashboard/charts')}
//                 activeOpacity={0.8}
//                 style={{ flex: 1, marginRight: 8 }}
//               >
//                 <LinearGradient
//                   colors={['rgba(59, 130, 246, 0.2)', 'rgba(37, 99, 235, 0.1)']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={{
//                     padding: 16,
//                     borderRadius: 16,
//                     alignItems: 'center',
//                     borderWidth: 1,
//                     borderColor: 'rgba(59, 130, 246, 0.3)',
//                   }}
//                 >
//                   <BarChart3 size={20} color="#3b82f6" />
//                   <Text color="#3b82f6" fontSize={12} fontWeight="700" mt="$2">View Charts</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 onPress={() => router.push('/(tabs)/chat')}
//                 activeOpacity={0.8}
//                 style={{ flex: 1, marginLeft: 8 }}
//               >
//                 <LinearGradient
//                   colors={['rgba(234, 179, 8, 0.2)', 'rgba(202, 138, 4, 0.1)']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={{
//                     padding: 16,
//                     borderRadius: 16,
//                     alignItems: 'center',
//                     borderWidth: 1,
//                     borderColor: 'rgba(234, 179, 8, 0.3)',
//                   }}
//                 >
//                   <Zap size={20} color="#EAB308" />
//                   <Text color="#EAB308" fontSize={12} fontWeight="700" mt="$2">AI Insights</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </XStack>

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

// // Helper functions
// function getScoreGradient(score) {
//   if (score >= 80) return ['#22c55e', '#16a34a'];
//   if (score >= 60) return ['#eab308', '#ca8a04'];
//   if (score >= 40) return ['#f97316', '#ea580c'];
//   return ['#ef4444', '#dc2626'];
// }

// function getReturnColor(returnPercentage) {
//   if (!returnPercentage) return '#22c55e';
//   if (returnPercentage > 0) return '#22c55e';
//   if (returnPercentage < 0) return '#ef4444';
//   return '#eab308';
// }

import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Progress } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Activity, TrendingUp, ArrowUpRight, RefreshCw, User, Briefcase, Target, CreditCard, Search,
  ChevronRight, Shield, Zap, PieChart, BarChart3, Wallet, Target as TargetIcon, Cpu
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Services
import { ApiService } from '../../../services/apiService';
import { AiService } from '../../../services/aiService';

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
    totalBalance: 0
  });
  const [healthStatus, setHealthStatus] = useState('Checking...');
  const [isSystemOnline, setIsSystemOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // --- DATA FETCHING ---
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Check system health by trying to reach the API
      try {
        await ApiService.getDashboardOverview();
        setIsSystemOnline(true);
        setHealthStatus("System Operational");
      } catch (healthError) {
        setIsSystemOnline(false);
        setHealthStatus("Offline / Unreachable");
        throw new Error('System offline');
      }

      // Fetch all dashboard data
      const [overviewRes, goalsRes, investmentsRes, scoreRes] = await Promise.all([
        ApiService.getDashboardOverview(),
        ApiService.getDashboardGoals(),
        ApiService.getDashboardInvestments(),
        ApiService.getDashboardScore().catch(() => ({ data: null })) // Score might not be implemented
      ]);

      const overview = overviewRes.data;
      const goals = goalsRes.data || [];
      const investments = investmentsRes.data || [];
      const financeScore = scoreRes?.data || null;
      
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
        totalBalance
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
        totalBalance: 0
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

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount || 0);

  // Helper function to calculate total balance
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
              
              <Text 
                color="#EAB308" 
                fontSize={11} 
                letterSpacing={2} 
                fontWeight="600" 
                mb="$2"
              >
                TOTAL NET WORTH
              </Text>
              
              <H2 
                color="white" 
                fontWeight="900" 
                fontSize={38}
                letterSpacing={-0.5}
              >
                {loading ? "..." : formatCurrency(totalBalance)}
              </H2>
              
              <XStack ai="center" space="$3" mt="$3">
                <XStack 
                  bg="#1a1a1a" 
                  px="$2.5" 
                  py="$1" 
                  br="$2"
                  ai="center"
                  borderColor="rgba(34, 197, 94, 0.3)"
                  bw={1}
                >
                  <TrendingUp size={14} color="#22c55e" />
                  <Text color="#22c55e" fontSize={12} fontWeight="700" ml="$1">+{dailyGrowth}% Today</Text>
                </XStack>
                
                <XStack 
                  bg="#1a1a1a" 
                  px="$2.5" 
                  py="$1" 
                  br="$2"
                  ai="center"
                  borderColor="rgba(234, 179, 8, 0.3)"
                  bw={1}
                >
                  <BarChart3 size={14} color="#EAB308" />
                  <Text color="#EAB308" fontSize={12} fontWeight="700" ml="$1">+{monthlyGrowth}% Monthly</Text>
                </XStack>
              </XStack>
            </YStack>

            {/* ENHANCED SYSTEM STATUS */}
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => router.push('/')}
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
            </XStack>

            {/* ENHANCED FINANCIAL GOALS SECTION */}
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
                            <Text color="white" fontWeight="800" fontSize={15}>{goal.title}</Text>
                          </XStack>
                          <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
                            {formatCurrency(goal.current_amount)} of {formatCurrency(goal.target_amount)}
                          </Text>
                        </YStack>
                        <Text color="#EAB308" fontSize={18} fontWeight="900">
                          {Math.round((goal.current_amount / goal.target_amount) * 100)}%
                        </Text>
                      </XStack>
                      <Progress 
                        value={(goal.current_amount / goal.target_amount) * 100} 
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
                          {i === 2 && <PieChart size={24} color="white" />}
                        </LinearGradient>
                        <YStack>
                          <Text color="white" fontWeight="800" fontSize={16}>{inv.identifier || inv.name}</Text>
                          <Text color="rgba(255, 255, 255, 0.6)" fontSize={12}>
                            {inv.asset_type?.toUpperCase()}
                          </Text>
                        </YStack>
                      </XStack>
                      <YStack ai="flex-end">
                        <Text color="white" fontWeight="800" fontSize={16}>
                          {formatCurrency(inv.current_value)}
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
                          <Text color="white" fontSize={11} fontWeight="700" ml="$0.5">STABLE</Text>
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