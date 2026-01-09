// // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // import {
// // // // // // //   View,
// // // // // // //   Text,
// // // // // // //   ScrollView,
// // // // // // //   StyleSheet,
// // // // // // //   TouchableOpacity,
// // // // // // //   RefreshControl,
// // // // // // //   ActivityIndicator,
// // // // // // //   Modal,
// // // // // // //   TextInput,
// // // // // // //   Platform,
// // // // // // //   Alert
// // // // // // // } from 'react-native';
// // // // // // // import { 
// // // // // // //   User, 
// // // // // // //   TrendingUp, 
// // // // // // //   PieChart, 
// // // // // // //   AlertCircle, 
// // // // // // //   RefreshCw, 
// // // // // // //   DollarSign, 
// // // // // // //   ChevronLeft, 
// // // // // // //   LogOut, 
// // // // // // //   Edit3, 
// // // // // // //   X, 
// // // // // // //   CheckCircle 
// // // // // // // } from 'lucide-react-native';
// // // // // // // import { useRouter } from 'expo-router';
// // // // // // // import { api } from '../services/api';

// // // // // // // export default function ProfileScreen() {
// // // // // // //   const router = useRouter();
// // // // // // //   const [profile, setProfile] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [refreshing, setRefreshing] = useState(false);
// // // // // // //   const [errorDetail, setErrorDetail] = useState(null);

// // // // // // //   // Edit Modal State
// // // // // // //   const [isEditModalOpen, setEditModalOpen] = useState(false);
// // // // // // //   const [updating, setUpdating] = useState(false);
// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     full_name: '',
// // // // // // //     phone: '',
// // // // // // //   });

// // // // // // //   const fetchProfile = async () => {
// // // // // // //     try {
// // // // // // //       setErrorDetail(null);
// // // // // // //       const response = await api.get('/api/v1/user/profile');
// // // // // // //       setProfile(response.data);
// // // // // // //       setFormData({
// // // // // // //         full_name: response.data.full_name || '',
// // // // // // //         phone: response.data.phone || '',
// // // // // // //       });
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ API Failure:", error);
// // // // // // //       setErrorDetail(error.response?.data?.detail || "Could not sync with neural network.");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //       setRefreshing(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleUpdate = async () => {
// // // // // // //     setUpdating(true);
// // // // // // //     try {
// // // // // // //       // API call to PATCH profile
// // // // // // //       await api.patch('/api/v1/user/profile', {
// // // // // // //         full_name: formData.full_name,
// // // // // // //         phone: formData.phone,
// // // // // // //         preferences: profile?.preferences || {}
// // // // // // //       });
      
// // // // // // //       await fetchProfile(); // Refresh data
// // // // // // //       setEditModalOpen(false);
// // // // // // //       Alert.alert("Success", "Neural Identity Updated");
// // // // // // //     } catch (error) {
// // // // // // //       Alert.alert("Update Failed", error.message);
// // // // // // //     } finally {
// // // // // // //       setUpdating(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     fetchProfile();
// // // // // // //   }, []);

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <View style={[styles.container, styles.center]}>
// // // // // // //         <ActivityIndicator size="large" color="#EAB308" />
// // // // // // //         <Text style={styles.loadingText}>ACCESSING SECURE DATA...</Text>
// // // // // // //       </View>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <View style={styles.container}>
// // // // // // //       {/* Header Navigation */}
// // // // // // //       <View style={styles.navBar}>
// // // // // // //         <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
// // // // // // //           <ChevronLeft size={24} color="#FFF" />
// // // // // // //         </TouchableOpacity>
// // // // // // //         <Text style={styles.navTitle}>IDENTITY</Text>
// // // // // // //         <TouchableOpacity onPress={() => setEditModalOpen(true)} style={styles.iconBtn}>
// // // // // // //           <Edit3 size={20} color="#EAB308" />
// // // // // // //         </TouchableOpacity>
// // // // // // //       </View>

// // // // // // //       <ScrollView
// // // // // // //         contentContainerStyle={styles.scrollContent}
// // // // // // //         refreshControl={
// // // // // // //           <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchProfile(); }} tintColor="#EAB308" />
// // // // // // //         }
// // // // // // //       >
// // // // // // //         {/* Profile Card */}
// // // // // // //         <View style={styles.profileHeader}>
// // // // // // //           <View style={styles.avatar}>
// // // // // // //             <User size={40} color="#000" />
// // // // // // //           </View>
// // // // // // //           <Text style={styles.userName}>{profile?.full_name || "Neural User"}</Text>
// // // // // // //           <Text style={styles.userEmail}>{profile?.email}</Text>
// // // // // // //           {profile?.phone ? <Text style={styles.userPhone}>{profile.phone}</Text> : null}
// // // // // // //         </View>

// // // // // // //         <View style={styles.divider} />

// // // // // // //         {/* Incomes Section */}
// // // // // // //         <View style={styles.sectionHeader}>
// // // // // // //           <DollarSign size={18} color="#EAB308" />
// // // // // // //           <Text style={styles.sectionTitle}>INCOME STREAMS</Text>
// // // // // // //         </View>

// // // // // // //         {profile?.incomes?.map((income) => (
// // // // // // //           <View key={income.id} style={styles.dataCard}>
// // // // // // //             <View>
// // // // // // //               <Text style={styles.cardName}>{income.name}</Text>
// // // // // // //               <Text style={styles.cardSub}>{income.rate_type?.toUpperCase()}</Text>
// // // // // // //             </View>
// // // // // // //             <Text style={styles.cardAmount}>+${(income.estimated_monthly_amount ?? 0).toLocaleString()}</Text>
// // // // // // //           </View>
// // // // // // //         ))}

// // // // // // //         {/* Investments Section */}
// // // // // // //         <View style={[styles.sectionHeader, { marginTop: 30 }]}>
// // // // // // //           <PieChart size={18} color="#EAB308" />
// // // // // // //           <Text style={styles.sectionTitle}>ASSET PORTFOLIO</Text>
// // // // // // //         </View>

// // // // // // //         {profile?.investments?.map((asset) => (
// // // // // // //           <View key={asset.id} style={styles.dataCard}>
// // // // // // //             <View style={styles.assetRow}>
// // // // // // //               <View style={styles.assetIcon}>
// // // // // // //                 <TrendingUp size={16} color="#EAB308" />
// // // // // // //               </View>
// // // // // // //               <View>
// // // // // // //                 <Text style={styles.cardName}>{asset.name}</Text>
// // // // // // //                 <Text style={styles.cardSub}>{asset.asset_type}</Text>
// // // // // // //               </View>
// // // // // // //             </View>
// // // // // // //             <View style={{ alignItems: 'flex-end' }}>
// // // // // // //               <Text style={styles.cardValue}>${(asset.current_value ?? 0).toLocaleString()}</Text>
// // // // // // //               <Text style={styles.cardReturn}>+{(asset.expected_return_pct ?? 0)}%</Text>
// // // // // // //             </View>
// // // // // // //           </View>
// // // // // // //         ))}

// // // // // // //         {/* Logout */}
// // // // // // //         <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/')}>
// // // // // // //           <LogOut size={18} color="#FF453A" />
// // // // // // //           <Text style={styles.logoutText}>Log out</Text>
// // // // // // //         </TouchableOpacity>
// // // // // // //       </ScrollView>

// // // // // // //       {/* --- EDIT MODAL --- */}
// // // // // // //       <Modal visible={isEditModalOpen} animationType="slide" transparent>
// // // // // // //         <View style={styles.modalOverlay}>
// // // // // // //           <View style={styles.modalContent}>
// // // // // // //             <View style={styles.modalHeader}>
// // // // // // //               <Text style={styles.modalTitle}>UPDATE IDENTITY</Text>
// // // // // // //               <TouchableOpacity onPress={() => setEditModalOpen(false)}>
// // // // // // //                 <X size={24} color="#666" />
// // // // // // //               </TouchableOpacity>
// // // // // // //             </View>

// // // // // // //             <View style={styles.inputGroup}>
// // // // // // //               <Text style={styles.label}>FULL NAME</Text>
// // // // // // //               <TextInput
// // // // // // //                 style={styles.input}
// // // // // // //                 value={formData.full_name}
// // // // // // //                 onChangeText={(t) => setFormData({ ...formData, full_name: t })}
// // // // // // //                 placeholder="Enter full name"
// // // // // // //                 placeholderTextColor="#444"
// // // // // // //               />
// // // // // // //             </View>

// // // // // // //             <View style={styles.inputGroup}>
// // // // // // //               <Text style={styles.label}>PHONE NUMBER</Text>
// // // // // // //               <TextInput
// // // // // // //                 style={styles.input}
// // // // // // //                 value={formData.phone}
// // // // // // //                 onChangeText={(t) => setFormData({ ...formData, phone: t })}
// // // // // // //                 placeholder="+1 234 567 890"
// // // // // // //                 placeholderTextColor="#444"
// // // // // // //                 keyboardType="phone-pad"
// // // // // // //               />
// // // // // // //             </View>

// // // // // // //             <TouchableOpacity 
// // // // // // //               style={[styles.saveBtn, updating && { opacity: 0.5 }]} 
// // // // // // //               onPress={handleUpdate}
// // // // // // //               disabled={updating}
// // // // // // //             >
// // // // // // //               {updating ? (
// // // // // // //                 <ActivityIndicator color="#000" />
// // // // // // //               ) : (
// // // // // // //                 <>
// // // // // // //                   <CheckCircle size={18} color="#000" />
// // // // // // //                   <Text style={styles.saveBtnText}>COMMIT CHANGES</Text>
// // // // // // //                 </>
// // // // // // //               )}
// // // // // // //             </TouchableOpacity>
// // // // // // //           </View>
// // // // // // //         </View>
// // // // // // //       </Modal>
// // // // // // //     </View>
// // // // // // //   );
// // // // // // // }

// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: { flex: 1, backgroundColor: '#000' },
// // // // // // //   center: { justifyContent: 'center', alignItems: 'center' },
// // // // // // //   loadingText: { color: '#666', marginTop: 15, letterSpacing: 2, fontSize: 10 },
// // // // // // //   navBar: {
// // // // // // //     flexDirection: 'row',
// // // // // // //     justifyContent: 'space-between',
// // // // // // //     alignItems: 'center',
// // // // // // //     paddingTop: Platform.OS === 'ios' ? 60 : 40,
// // // // // // //     paddingHorizontal: 20,
// // // // // // //     paddingBottom: 15,
// // // // // // //   },
// // // // // // //   iconBtn: {
// // // // // // //     width: 40,
// // // // // // //     height: 40,
// // // // // // //     borderRadius: 20,
// // // // // // //     backgroundColor: '#111',
// // // // // // //     justifyContent: 'center',
// // // // // // //     alignItems: 'center',
// // // // // // //   },
// // // // // // //   navTitle: { color: '#FFF', fontWeight: '800', letterSpacing: 2, fontSize: 14 },
// // // // // // //   scrollContent: { padding: 20, paddingBottom: 100 },
// // // // // // //   profileHeader: { alignItems: 'center', marginVertical: 20 },
// // // // // // //   avatar: {
// // // // // // //     width: 80,
// // // // // // //     height: 80,
// // // // // // //     borderRadius: 40,
// // // // // // //     backgroundColor: '#EAB308',
// // // // // // //     justifyContent: 'center',
// // // // // // //     alignItems: 'center',
// // // // // // //     marginBottom: 15,
// // // // // // //   },
// // // // // // //   userName: { color: '#FFF', fontSize: 22, fontWeight: '900' },
// // // // // // //   userEmail: { color: '#666', fontSize: 14, marginTop: 4 },
// // // // // // //   userPhone: { color: '#666', fontSize: 12, marginTop: 2 },
// // // // // // //   divider: { height: 1, backgroundColor: '#222', marginVertical: 25 },
// // // // // // //   sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
// // // // // // //   sectionTitle: { color: '#FFF', fontWeight: '700', fontSize: 12, letterSpacing: 1.5, marginLeft: 10 },
// // // // // // //   dataCard: {
// // // // // // //     backgroundColor: '#0A0A0A',
// // // // // // //     borderRadius: 12,
// // // // // // //     padding: 16,
// // // // // // //     flexDirection: 'row',
// // // // // // //     justifyContent: 'space-between',
// // // // // // //     alignItems: 'center',
// // // // // // //     marginBottom: 10,
// // // // // // //     borderWidth: 1,
// // // // // // //     borderColor: '#1A1A1A',
// // // // // // //   },
// // // // // // //   cardName: { color: '#FFF', fontWeight: '600', fontSize: 16 },
// // // // // // //   cardSub: { color: '#444', fontSize: 10, marginTop: 2 },
// // // // // // //   cardAmount: { color: '#22C55E', fontWeight: '800', fontSize: 16 },
// // // // // // //   cardValue: { color: '#FFF', fontWeight: '700', fontSize: 16 },
// // // // // // //   cardReturn: { color: '#22C55E', fontSize: 11, fontWeight: '600' },
// // // // // // //   assetRow: { flexDirection: 'row', alignItems: 'center' },
// // // // // // //   assetIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#1A1608', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
// // // // // // //   logoutBtn: {
// // // // // // //     marginTop: 40,
// // // // // // //     flexDirection: 'row',
// // // // // // //     alignItems: 'center',
// // // // // // //     justifyContent: 'center',
// // // // // // //     padding: 16,
// // // // // // //     borderRadius: 12,
// // // // // // //     borderWidth: 1,
// // // // // // //     borderColor: 'rgba(255, 69, 58, 0.2)',
// // // // // // //   },
// // // // // // //   logoutText: { color: '#FF453A', fontWeight: '700', marginLeft: 10, fontSize: 12 },
// // // // // // //   // Modal Styles
// // // // // // //   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' },
// // // // // // //   modalContent: { backgroundColor: '#111', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 50 },
// // // // // // //   modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
// // // // // // //   modalTitle: { color: '#FFF', fontWeight: '800', fontSize: 16, letterSpacing: 1 },
// // // // // // //   inputGroup: { marginBottom: 20 },
// // // // // // //   label: { color: '#666', fontSize: 10, fontWeight: '700', marginBottom: 8, letterSpacing: 1 },
// // // // // // //   input: { backgroundColor: '#000', borderRadius: 10, padding: 15, color: '#FFF', borderWidth: 1, borderColor: '#222' },
// // // // // // //   saveBtn: { backgroundColor: '#EAB308', padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
// // // // // // //   saveBtnText: { color: '#000', fontWeight: '800', marginLeft: 10 }
// // // // // // // });

// // // // // // import React, { useEffect, useState, useCallback } from 'react';
// // // // // // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions, Animated } from 'react-native';
// // // // // // import { YStack, XStack, Text, H2, H3, H4, Theme, Spinner, Button, Input, Card, Separator } from 'tamagui';
// // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // import { 
// // // // // //   User, Shield, Mail, Phone, Wallet, TrendingUp, 
// // // // // //   ChevronRight, ArrowLeft, Save, Edit2, Briefcase, Plus 
// // // // // // } from '@tamagui/lucide-icons';
// // // // // // import { useRouter } from 'expo-router';
// // // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // // // Service
// // // // // // import { UserService } from '../services/userService';

// // // // // // const { width } = Dimensions.get('window');

// // // // // // export default function ProfileScreen() {
// // // // // //   const router = useRouter();
  
// // // // // //   // --- STATE ---
// // // // // //   const [profile, setProfile] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     full_name: '',
// // // // // //     phone: '',
// // // // // //   });

// // // // // //   // --- DATA FETCHING ---
// // // // // //   const fetchProfileData = useCallback(async () => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const data = await UserService.getProfile();
// // // // // //       setProfile(data);
// // // // // //       setFormData({
// // // // // //         full_name: data.full_name || '',
// // // // // //         phone: data.phone || '',
// // // // // //       });
// // // // // //     } catch (error) {
// // // // // //       console.error("Profile Fetch Error:", error);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     fetchProfileData();
// // // // // //   }, [fetchProfileData]);

// // // // // //   // --- UPDATE LOGIC ---
// // // // // //   const handleUpdate = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       await UserService.updateProfile(formData);
// // // // // //       setIsEditing(false);
// // // // // //       await fetchProfileData();
// // // // // //     } catch (error) {
// // // // // //       console.error("Update Error:", error);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const formatCurrency = (amount) =>
// // // // // //     new Intl.NumberFormat('en-IN', { 
// // // // // //       style: 'currency', 
// // // // // //       currency: 'INR', 
// // // // // //       maximumFractionDigits: 0 
// // // // // //     }).format(amount || 0);

// // // // // //   if (loading && !profile) {
// // // // // //     return (
// // // // // //       <YStack f={1} bg="#000" jc="center" ai="center">
// // // // // //         <Spinner size="large" color="#EAB308" />
// // // // // //       </YStack>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <Theme name="dark">
// // // // // //       <LinearGradient colors={['#000000', '#0A0A0A']} style={{ flex: 1 }}>
// // // // // //         <SafeAreaView style={{ flex: 1 }}>
// // // // // //           <ScrollView 
// // // // // //             stickyHeaderIndices={[0]}
// // // // // //             showsVerticalScrollIndicator={false}
// // // // // //             refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchProfileData} tintColor="#EAB308" />}
// // // // // //           >
// // // // // //             {/* 1. GLASS HEADER */}
// // // // // //             <XStack p="$4" jc="space-between" ai="center" bg="rgba(0,0,0,0.8)">
// // // // // //               <TouchableOpacity onPress={() => router.back()}>
// // // // // //                 <ArrowLeft size={24} color="white" />
// // // // // //               </TouchableOpacity>
// // // // // //               <XStack ai="center" space="$2">
// // // // // //                 <Shield size={16} color="#EAB308" />
// // // // // //                 <Text color="#EAB308" fontSize={12} fontWeight="900" ls={2}>USER IDENTITY</Text>
// // // // // //               </XStack>
// // // // // //               <TouchableOpacity onPress={() => (isEditing ? handleUpdate() : setIsEditing(true))}>
// // // // // //                 {isEditing ? <Save size={24} color="#EAB308" /> : <Edit2 size={20} color="white" />}
// // // // // //               </TouchableOpacity>
// // // // // //             </XStack>

// // // // // //             <YStack p="$4" space="$5">
// // // // // //               {/* 2. AVATAR & BASIC INFO */}
// // // // // //               <YStack ai="center" mt="$2" space="$3">
// // // // // //                 <LinearGradient
// // // // // //                   colors={['#EAB308', '#CA8A04']}
// // // // // //                   style={{ width: 100, height: 100, borderRadius: 50, jc: 'center', ai: 'center', bw: 4, bc: 'rgba(234,179,8,0.2)' }}
// // // // // //                 >
// // // // // //                   <User size={50} color="black" />
// // // // // //                 </LinearGradient>
// // // // // //                 <YStack ai="center">
// // // // // //                   {isEditing ? (
// // // // // //                     <Input 
// // // // // //                       bw={0} bbw={1} bc="#EAB308" color="white" fontSize={24} fontWeight="900" textAlign="center"
// // // // // //                       value={formData.full_name} onChangeText={(t) => setFormData({...formData, full_name: t})}
// // // // // //                     />
// // // // // //                   ) : (
// // // // // //                     <H2 color="white" fontWeight="900">{profile?.full_name}</H2>
// // // // // //                   )}
// // // // // //                   <Text color="$gray11">{profile?.email}</Text>
// // // // // //                 </YStack>
// // // // // //               </YStack>

// // // // // //               {/* 3. CONTACT CARD */}
// // // // // //               <Card p="$4" bg="#111" br="$4" bw={1} bc="rgba(255,255,255,0.05)">
// // // // // //                 <YStack space="$4">
// // // // // //                   <XStack ai="center" space="$3">
// // // // // //                     <Phone size={18} color="#EAB308" />
// // // // // //                     <YStack>
// // // // // //                       <Text color="$gray10" fontSize={10}>MOBILE</Text>
// // // // // //                       {isEditing ? (
// // // // // //                         <Input 
// // // // // //                           h={30} p={0} bw={0} bbw={1} bc="#EAB308" color="white"
// // // // // //                           value={formData.phone} onChangeText={(t) => setFormData({...formData, phone: t})}
// // // // // //                         />
// // // // // //                       ) : (
// // // // // //                         <Text color="white" fontWeight="600">{profile?.phone || 'Not provided'}</Text>
// // // // // //                       )}
// // // // // //                     </YStack>
// // // // // //                   </XStack>
// // // // // //                 </YStack>
// // // // // //               </Card>

// // // // // //               {/* 4. INCOMES LIST (DEEP INTEGRATION) */}
// // // // // //               <YStack space="$3">
// // // // // //                 <XStack jc="space-between" ai="center">
// // // // // //                   <H4 color="#EAB308" fontSize={14} fontWeight="800" ls={2}>INCOME SOURCES</H4>
// // // // // //                   <Plus size={18} color="#EAB308" />
// // // // // //                 </XStack>
// // // // // //                 {profile?.incomes?.map((income, idx) => (
// // // // // //                   <XStack key={idx} bg="#111" p="$4" br="$4" jc="space-between" ai="center" bw={1} bc="rgba(255,255,255,0.05)">
// // // // // //                     <XStack ai="center" space="$3">
// // // // // //                       <Briefcase size={20} color="$gray11" />
// // // // // //                       <YStack>
// // // // // //                         <Text color="white" fontWeight="700">{income.name}</Text>
// // // // // //                         <Text color="$gray10" fontSize={12}>{income.rate_type?.toUpperCase()}</Text>
// // // // // //                       </YStack>
// // // // // //                     </XStack>
// // // // // //                     <Text color="#22c55e" fontWeight="800">{formatCurrency(income.estimated_monthly_amount)}</Text>
// // // // // //                   </XStack>
// // // // // //                 ))}
// // // // // //               </YStack>

// // // // // //               {/* 5. INVESTMENTS LIST (DEEP INTEGRATION) */}
// // // // // //               <YStack space="$3">
// // // // // //                 <XStack jc="space-between" ai="center">
// // // // // //                   <H4 color="#EAB308" fontSize={14} fontWeight="800" ls={2}>ASSET HOLDINGS</H4>
// // // // // //                   <TrendingUp size={18} color="#EAB308" />
// // // // // //                 </XStack>
// // // // // //                 {profile?.investments?.map((asset, idx) => (
// // // // // //                   <XStack key={idx} bg="#111" p="$4" br="$4" jc="space-between" ai="center" bw={1} bc="rgba(255,255,255,0.05)">
// // // // // //                     <YStack>
// // // // // //                       <Text color="white" fontWeight="700">{asset.identifier}</Text>
// // // // // //                       <Text color="$gray11" fontSize={12}>{asset.name}</Text>
// // // // // //                     </YStack>
// // // // // //                     <YStack ai="flex-end">
// // // // // //                       <Text color="#EAB308" fontWeight="800">{asset.asset_type?.toUpperCase()}</Text>
// // // // // //                       <Text color="$gray11" fontSize={10}>ID: {asset.id.slice(0,8)}</Text>
// // // // // //                     </YStack>
// // // // // //                   </XStack>
// // // // // //                 ))}
// // // // // //               </YStack>

// // // // // //             </YStack>
// // // // // //           </ScrollView>
// // // // // //         </SafeAreaView>
// // // // // //       </LinearGradient>
// // // // // //     </Theme>
// // // // // //   );
// // // // // // }


// // // // // import React, { useState, useRef } from 'react';
// // // // // import { ScrollView, Animated, TouchableOpacity } from 'react-native';
// // // // // import { YStack, XStack, Text, H2, H4, Theme, Input, Button, Card, Progress, Spinner } from 'tamagui';
// // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // import { Sparkles, ArrowRight, CheckCircle2, Shield, Wallet, Briefcase } from '@tamagui/lucide-icons';
// // // // // import { useRouter } from 'expo-router';
// // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // import { UserService } from '../services/userService';

// // // // // export default function OnboardingScreen() {
// // // // //   const router = useRouter();
// // // // //   const [step, setStep] = useState(1);
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   // --- FORM STATE MATCHING YOUR API SCHEMA ---
// // // // //   const [formData, setFormData] = useState({
// // // // //     profile: {
// // // // //       full_name: '',
// // // // //       phone: '',
// // // // //       currency: 'INR',
// // // // //       risk_profile: 'balanced'
// // // // //     },
// // // // //     incomes: [
// // // // //       { name: 'Primary Salary', yearly_amount: 0 }
// // // // //     ],
// // // // //     investments: [],
// // // // //     budget_preferences: {
// // // // //       daily_food_budget: 0,
// // // // //       monthly_discretionary_budget: 0,
// // // // //       exclude_from_food: []
// // // // //     }
// // // // //   });

// // // // //   const handleNext = () => setStep(step + 1);
// // // // //   const handleBack = () => setStep(step - 1);

// // // // //   const handleFinish = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       await UserService.onboarding(formData);
// // // // //       router.replace('/(drawer)/(tabs)'); 
// // // // //     } catch (error) {
// // // // //       console.error("Onboarding Error:", error);
// // // // //       alert("Failed to initialize profile. Check connection.");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <Theme name="dark">
// // // // //       <LinearGradient colors={['#000000', '#0A0A0A']} style={{ flex: 1 }}>
// // // // //         <SafeAreaView style={{ flex: 1 }}>
// // // // //           <YStack p="$4" space="$4">
// // // // //             {/* PROGRESS HEADER */}
// // // // //             <XStack jc="space-between" ai="center">
// // // // //               <H4 color="#EAB308" fontWeight="900" ls={2}>STEP 0{step}</H4>
// // // // //               <Progress value={(step / 3) * 100} w={150} h={6} bg="$gray5">
// // // // //                 <Progress.Indicator bg="#EAB308" animation="bouncy" />
// // // // //               </Progress>
// // // // //             </XStack>

// // // // //             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
              
// // // // //               {/* STEP 1: IDENTITY */}
// // // // //               {step === 1 && (
// // // // //                 <YStack space="$5" mt="$4">
// // // // //                   <YStack space="$2">
// // // // //                     <H2 color="white" fontWeight="900">Establish Identity</H2>
// // // // //                     <Text color="$gray11">This information is used for AI personalization.</Text>
// // // // //                   </YStack>

// // // // //                   <Card bg="#111" p="$4" br="$4" bw={1} bc="rgba(234,179,8,0.2)">
// // // // //                     <YStack space="$4">
// // // // //                       <YStack space="$2">
// // // // //                         <Text color="$gold10" fontSize={11} fontWeight="800">FULL NAME</Text>
// // // // //                         <Input 
// // // // //                           bg="#000" bc="#333" color="white" placeholder="Atharva Pardeshi"
// // // // //                           value={formData.profile.full_name}
// // // // //                           onChangeText={(t) => setFormData({...formData, profile: {...formData.profile, full_name: t}})}
// // // // //                         />
// // // // //                       </YStack>
// // // // //                       <YStack space="$2">
// // // // //                         <Text color="$gold10" fontSize={11} fontWeight="800">PHONE NUMBER</Text>
// // // // //                         <Input 
// // // // //                           bg="#000" bc="#333" color="white" keyboardType="phone-pad"
// // // // //                           value={formData.profile.phone}
// // // // //                           onChangeText={(t) => setFormData({...formData, profile: {...formData.profile, phone: t}})}
// // // // //                         />
// // // // //                       </YStack>
// // // // //                     </YStack>
// // // // //                   </Card>
// // // // //                   <Button bg="$gold10" color="black" iconAfter={ArrowRight} onPress={handleNext}>Continue</Button>
// // // // //                 </YStack>
// // // // //               )}

// // // // //               {/* STEP 2: FINANCIAL BASELINE */}
// // // // //               {step === 2 && (
// // // // //                 <YStack space="$5" mt="$4">
// // // // //                   <YStack space="$2">
// // // // //                     <H2 color="white" fontWeight="900">Monthly Baseline</H2>
// // // // //                     <Text color="$gray11">Tell us how much you earn to calibrate the AI.</Text>
// // // // //                   </YStack>

// // // // //                   <Card bg="#111" p="$4" br="$4" bw={1} bc="rgba(34,197,94,0.2)">
// // // // //                     <YStack space="$4">
// // // // //                       <YStack space="$2">
// // // // //                         <Text color="$green10" fontSize={11} fontWeight="800">YEARLY INCOME (INR)</Text>
// // // // //                         <Input 
// // // // //                           bg="#000" bc="#333" color="white" keyboardType="numeric"
// // // // //                           onChangeText={(t) => {
// // // // //                             let inc = [...formData.incomes];
// // // // //                             inc[0].yearly_amount = Number(t);
// // // // //                             setFormData({...formData, incomes: inc});
// // // // //                           }}
// // // // //                         />
// // // // //                       </YStack>
// // // // //                     </YStack>
// // // // //                   </Card>
// // // // //                   <XStack space="$2">
// // // // //                     <Button f={1} chromeless onPress={handleBack}>Back</Button>
// // // // //                     <Button f={2} bg="$gold10" color="black" onPress={handleNext}>Next Step</Button>
// // // // //                   </XStack>
// // // // //                 </YStack>
// // // // //               )}

// // // // //               {/* STEP 3: AI CONFIGURATION */}
// // // // //               {step === 3 && (
// // // // //                 <YStack space="$5" mt="$4">
// // // // //                   <YStack space="$2">
// // // // //                     <H2 color="white" fontWeight="900">AI Logic</H2>
// // // // //                     <Text color="$gray11">Finalize your risk profile and spending limits.</Text>
// // // // //                   </YStack>

// // // // //                   <Card bg="#111" p="$4" br="$4" bw={1} bc="rgba(234,179,8,0.2)">
// // // // //                     <YStack space="$4">
// // // // //                       <Text color="$gold10" fontSize={11} fontWeight="800">DAILY FOOD LIMIT</Text>
// // // // //                       <Input 
// // // // //                         bg="#000" bc="#333" color="white" keyboardType="numeric"
// // // // //                         onChangeText={(t) => setFormData({
// // // // //                           ...formData, 
// // // // //                           budget_preferences: {...formData.budget_preferences, daily_food_budget: Number(t)}
// // // // //                         })}
// // // // //                       />
                      
// // // // //                       <Text color="$gold10" fontSize={11} fontWeight="800">RISK APPETITE</Text>
// // // // //                       <XStack space="$2">
// // // // //                         {['Conservative', 'Balanced', 'Aggressive'].map((r) => (
// // // // //                           <Button 
// // // // //                             key={r} f={1} size="$3" br="$2"
// // // // //                             bg={formData.profile.risk_profile === r.toLowerCase() ? '$gold10' : '#1a1a1a'}
// // // // //                             color={formData.profile.risk_profile === r.toLowerCase() ? 'black' : 'white'}
// // // // //                             onPress={() => setFormData({...formData, profile: {...formData.profile, risk_profile: r.toLowerCase()}})}
// // // // //                           >
// // // // //                             {r[0]}
// // // // //                           </Button>
// // // // //                         ))}
// // // // //                       </XStack>
// // // // //                     </YStack>
// // // // //                   </Card>

// // // // //                   <Button 
// // // // //                     bg="$gold10" color="black" size="$5"
// // // // //                     icon={loading ? <Spinner color="black" /> : <CheckCircle2 />}
// // // // //                     onPress={handleFinish}
// // // // //                     disabled={loading}
// // // // //                   >
// // // // //                     Initialize Protocol
// // // // //                   </Button>
// // // // //                 </YStack>
// // // // //               )}

// // // // //             </ScrollView>
// // // // //           </YStack>
// // // // //         </SafeAreaView>
// // // // //       </LinearGradient>
// // // // //     </Theme>
// // // // //   );
// // // // // }



// // // // import React, { useEffect, useState, useCallback } from 'react';
// // // // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
// // // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Input, Card, Circle } from 'tamagui';
// // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // import { 
// // // //   User, Shield, Phone, Briefcase, TrendingUp, ArrowLeft, 
// // // //   Save, Edit2, Plus, Mail, CreditCard, ChevronRight 
// // // // } from '@tamagui/lucide-icons';
// // // // import { useRouter } from 'expo-router';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // Services
// // // // import  UserService  from '../services/userService';

// // // // const { width } = Dimensions.get('window');

// // // // export default function ProfileScreen() {
// // // //   const router = useRouter();
  
// // // //   // --- STATE ---
// // // //   const [profile, setProfile] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [isEditing, setIsEditing] = useState(false);
  
// // // //   // Form State for Updates
// // // //   const [formData, setFormData] = useState({
// // // //     full_name: '',
// // // //     phone: '',
// // // //   });

// // // //   // --- DATA FETCHING ---
// // // //   const fetchProfileData = useCallback(async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const data = await UserService.getProfile();
// // // //       setProfile(data);
// // // //       setFormData({
// // // //         full_name: data.full_name || '',
// // // //         phone: data.phone || '',
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Profile Fetch Error:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchProfileData();
// // // //   }, [fetchProfileData]);

// // // //   // --- ACTIONS ---
// // // //   const handleUpdate = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       await UserService.updateProfile(formData);
// // // //       setIsEditing(false);
// // // //       await fetchProfileData();
// // // //     } catch (error) {
// // // //       console.error("Update Error:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const formatCurrency = (amount) =>
// // // //     new Intl.NumberFormat('en-IN', { 
// // // //       style: 'currency', 
// // // //       currency: 'INR', 
// // // //       maximumFractionDigits: 0 
// // // //     }).format(amount || 0);

// // // //   if (loading && !profile) {
// // // //     return (
// // // //       <YStack f={1} bg="#000" jc="center" ai="center">
// // // //         <Spinner size="large" color="#EAB308" />
// // // //         <Text mt="$4" color="$gray10" letterSpacing={2}>SYNCING IDENTITY...</Text>
// // // //       </YStack>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <LinearGradient colors={['#000000', '#0A0A0A', '#111111']} style={{ flex: 1 }}>
// // // //         <SafeAreaView style={{ flex: 1 }}>
// // // //           <ScrollView 
// // // //             showsVerticalScrollIndicator={false}
// // // //             refreshControl={
// // // //               <RefreshControl refreshing={loading} onRefresh={fetchProfileData} tintColor="#EAB308" />
// // // //             }
// // // //           >
// // // //             {/* PROTOCOL NAVIGATION */}
// // // //             <XStack p="$4" jc="space-between" ai="center">
// // // //               <TouchableOpacity onPress={() => router.back()}>
// // // //                 <ArrowLeft size={24} color="white" />
// // // //               </TouchableOpacity>
// // // //               <XStack ai="center" space="$2">
// // // //                 <Shield size={16} color="#EAB308" />
// // // //                 <Text color="#EAB308" fontSize={11} fontWeight="900" ls={3}>IDENTITY PROTOCOL</Text>
// // // //               </XStack>
// // // //               <TouchableOpacity onPress={() => (isEditing ? handleUpdate() : setIsEditing(true))}>
// // // //                 <LinearGradient
// // // //                   colors={isEditing ? ['#22c55e', '#16a34a'] : ['#333', '#222']}
// // // //                   style={{ padding: 10, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
// // // //                 >
// // // //                   {isEditing ? <Save size={20} color="white" /> : <Edit2 size={20} color="white" />}
// // // //                 </LinearGradient>
// // // //               </TouchableOpacity>
// // // //             </XStack>

// // // //             <YStack p="$4" space="$6">
              
// // // //               {/* PROFILE HEADER CARD */}
// // // //               <YStack ai="center" space="$4">
// // // //                 <Circle size={110} bw={2} bc="$gold10" style={{ shadowColor: '#EAB308', shadowRadius: 15, shadowOpacity: 0.3 }}>
// // // //                   <LinearGradient
// // // //                     colors={['#EAB308', '#CA8A04']}
// // // //                     style={{ width: '100%', height: '100%', borderRadius: 55, jc: 'center', ai: 'center' }}
// // // //                   >
// // // //                     <User size={50} color="black" />
// // // //                   </LinearGradient>
// // // //                 </Circle>
                
// // // //                 <YStack ai="center" space="$1">
// // // //                   {isEditing ? (
// // // //                     <Input 
// // // //                       size="$5" bw={0} bbw={2} bc="$gold10" bg="transparent" color="white" 
// // // //                       fontSize={28} fontWeight="900" textAlign="center"
// // // //                       value={formData.full_name} 
// // // //                       onChangeText={(t) => setFormData({...formData, full_name: t})} 
// // // //                     />
// // // //                   ) : (
// // // //                     <H2 color="white" fontWeight="900" letterSpacing={-1}>{profile?.full_name}</H2>
// // // //                   )}
// // // //                   <Text color="$gray11" fontSize={14}>{profile?.email}</Text>
// // // //                 </YStack>
// // // //               </YStack>

// // // //               {/* CORE DETAILS CARD */}
// // // //               <Card bg="#080808" p="$5" br="$6" bw={1} bc="rgba(255,255,255,0.05)">
// // // //                 <YStack space="$5">
// // // //                   <XStack ai="center" space="$4">
// // // //                     <Circle bg="rgba(234,179,8,0.1)" size={40}>
// // // //                       <Phone size={18} color="#EAB308" />
// // // //                     </Circle>
// // // //                     <YStack f={1}>
// // // //                       <Text color="$gray10" fontSize={10} fontWeight="800" ls={1}>MOBILE SIGNAL</Text>
// // // //                       {isEditing ? (
// // // //                         <Input 
// // // //                           h={30} p={0} bw={0} bbw={1} bc="$gold10" color="white" fontSize={16}
// // // //                           value={formData.phone} 
// // // //                           onChangeText={(t) => setFormData({...formData, phone: t})} 
// // // //                         />
// // // //                       ) : (
// // // //                         <Text color="white" fontWeight="700" fontSize={16}>{profile?.phone || 'Not linked'}</Text>
// // // //                       )}
// // // //                     </YStack>
// // // //                   </XStack>

// // // //                   <XStack ai="center" space="$4">
// // // //                     <Circle bg="rgba(34,197,94,0.1)" size={40}>
// // // //                       <Briefcase size={18} color="#22c55e" />
// // // //                     </Circle>
// // // //                     <YStack f={1}>
// // // //                       <Text color="$gray10" fontSize={10} fontWeight="800" ls={1}>INCOME STREAMS</Text>
// // // //                       <Text color="white" fontWeight="700" fontSize={16}>{profile?.incomes?.length || 0} Registered</Text>
// // // //                     </YStack>
// // // //                   </XStack>
// // // //                 </YStack>
// // // //               </Card>

// // // //               {/* INCOME ANALYSIS LIST */}
// // // //               <YStack space="$4">
// // // //                 <XStack jc="space-between" ai="center">
// // // //                   <H4 color="#EAB308" fontSize={14} fontWeight="900" ls={2}>INCOME STREAMS</H4>
// // // //                   <TouchableOpacity><Plus size={20} color="#EAB308" /></TouchableOpacity>
// // // //                 </XStack>
                
// // // //                 {profile?.incomes?.map((income, idx) => (
// // // //                   <Card key={idx} bg="rgba(255,255,255,0.02)" p="$4" br="$4" bw={1} bc="rgba(255,255,255,0.05)">
// // // //                     <XStack jc="space-between" ai="center">
// // // //                       <YStack space="$1">
// // // //                         <Text color="white" fontWeight="800" fontSize={15}>{income.name}</Text>
// // // //                         <XStack ai="center" space="$2">
// // // //                           <Circle size={6} bg={income.rate_type === 'fixed' ? '$green10' : '$blue10'} />
// // // //                           <Text color="$gray11" fontSize={11}>{income.rate_type?.toUpperCase()}</Text>
// // // //                         </XStack>
// // // //                       </YStack>
// // // //                       <Text color="#22c55e" fontSize={18} fontWeight="900">{formatCurrency(income.estimated_monthly_amount)}</Text>
// // // //                     </XStack>
// // // //                   </Card>
// // // //                 ))}
// // // //               </YStack>

// // // //               {/* ASSET ARCHIVE */}
// // // //               <YStack space="$4">
// // // //                 <XStack jc="space-between" ai="center">
// // // //                   <H4 color="#EAB308" fontSize={14} fontWeight="900" ls={2}>ASSET ARCHIVE</H4>
// // // //                   <TrendingUp size={20} color="#EAB308" />
// // // //                 </XStack>
                
// // // //                 {profile?.investments?.map((asset, idx) => (
// // // //                   <Card key={idx} bg="rgba(255,255,255,0.02)" p="$4" br="$4" bw={1} bc="rgba(255,255,255,0.05)">
// // // //                     <XStack jc="space-between" ai="center">
// // // //                       <YStack space="$1">
// // // //                         <Text color="white" fontWeight="800" fontSize={15}>{asset.identifier}</Text>
// // // //                         <Text color="$gray11" fontSize={12}>{asset.name}</Text>
// // // //                       </YStack>
// // // //                       <YStack ai="flex-end">
// // // //                         <Text color="#EAB308" fontWeight="900">{asset.asset_type?.toUpperCase()}</Text>
// // // //                         <Text color="$gray10" fontSize={10}>UID: {asset.id.slice(0, 8)}</Text>
// // // //                       </YStack>
// // // //                     </XStack>
// // // //                   </Card>
// // // //                 ))}
// // // //               </YStack>

// // // //             </YStack>
// // // //           </ScrollView>
// // // //         </SafeAreaView>
// // // //       </LinearGradient>
// // // //     </Theme>
// // // //   );
// // // // }


// // // import React, { useEffect, useState, useCallback } from 'react';
// // // import { ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
// // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Input, Card } from 'tamagui';
// // // import { LinearGradient } from 'expo-linear-gradient';
// // // import { 
// // //   User, Shield, Phone, Briefcase, TrendingUp, ArrowLeft, Save, Edit2, Plus 
// // // } from '@tamagui/lucide-icons';
// // // import { useRouter } from 'expo-router';
// // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // ✅ IMPORT MUST MATCH THE EXPORT NAME
// // // import { UserService } from '../services/userService';

// // // export default function ProfileScreen() {
// // //   const router = useRouter();
  
// // //   // --- STATE ---
// // //   const [profile, setProfile] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [formData, setFormData] = useState({ full_name: '', phone: '' });

// // //   const fetchProfileData = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       // ✅ Now UserService is properly defined
// // //       const data = await UserService.getProfile();
// // //       setProfile(data);
// // //       setFormData({
// // //         full_name: data.full_name || '',
// // //         phone: data.phone || '',
// // //       });
// // //     } catch (error) {
// // //       console.error("Profile Fetch Error:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchProfileData();
// // //   }, [fetchProfileData]);

// // //   const handleUpdate = async () => {
// // //     try {
// // //       setLoading(true);
// // //       await UserService.updateProfile(formData);
// // //       setIsEditing(false);
// // //       fetchProfileData();
// // //     } catch (error) {
// // //       console.error("Update Error:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const formatCurrency = (amount) =>
// // //     new Intl.NumberFormat('en-IN', { 
// // //       style: 'currency', 
// // //       currency: 'INR', 
// // //       maximumFractionDigits: 0 
// // //     }).format(amount || 0);

// // //   if (loading && !profile) {
// // //     return (
// // //       <YStack f={1} bg="#000" jc="center" ai="center">
// // //         <Spinner size="large" color="#EAB308" />
// // //       </YStack>
// // //     );
// // //   }

// // //   return (
// // //     <Theme name="dark">
// // //       <LinearGradient colors={['#000000', '#0A0A0A']} style={{ flex: 1 }}>
// // //         <SafeAreaView style={{ flex: 1 }}>
// // //           <ScrollView 
// // //             refreshControl={
// // //               <RefreshControl refreshing={loading} onRefresh={fetchProfileData} tintColor="#EAB308" />
// // //             }
// // //           >
// // //             {/* PROTOCOL HEADER */}
// // //             <XStack p="$4" jc="space-between" ai="center">
// // //               <TouchableOpacity onPress={() => router.back()}>
// // //                 <ArrowLeft size={24} color="white" />
// // //               </TouchableOpacity>
// // //               <XStack ai="center" space="$2">
// // //                 <Shield size={16} color="#EAB308" />
// // //                 <Text color="#EAB308" fontSize={11} fontWeight="900" ls={3}>IDENTITY</Text>
// // //               </XStack>
// // //               <TouchableOpacity onPress={() => (isEditing ? handleUpdate() : setIsEditing(true))}>
// // //                 {isEditing ? <Save size={24} color="#EAB308" /> : <Edit2 size={20} color="white" />}
// // //               </TouchableOpacity>
// // //             </XStack>

// // //             <YStack p="$4" space="$6">
// // //               <YStack ai="center" space="$4">
// // //                 <YStack w={100} h={100} br={50} bg="$gold10" jc="center" ai="center">
// // //                   <User size={50} color="black" />
// // //                 </YStack>
// // //                 <YStack ai="center">
// // //                   {isEditing ? (
// // //                     <Input 
// // //                       bw={1} bc="$gold10" bg="#111" color="white" textAlign="center" 
// // //                       value={formData.full_name} 
// // //                       onChangeText={(t) => setFormData({...formData, full_name: t})} 
// // //                     />
// // //                   ) : (
// // //                     <H2 color="white" fontWeight="900">{profile?.full_name}</H2>
// // //                   )}
// // //                   <Text color="$gray11">{profile?.email}</Text>
// // //                 </YStack>
// // //               </YStack>

// // //               {/* INCOME DATA */}
// // //               <YStack space="$4">
// // //                 <H4 color="#EAB308" fontSize={14} fontWeight="900" ls={2}>INCOME STREAMS</H4>
// // //                 {profile?.incomes?.map((income, idx) => (
// // //                   <Card key={idx} bg="#111" p="$4" br="$4" bw={1} bc="rgba(255,255,255,0.05)">
// // //                     <XStack jc="space-between" ai="center">
// // //                       <XStack ai="center" space="$3">
// // //                         <Briefcase size={20} color="$gray11" />
// // //                         <Text color="white" fontWeight="700">{income.name}</Text>
// // //                       </XStack>
// // //                       <Text color="#22c55e" fontWeight="800">{formatCurrency(income.estimated_monthly_amount)}</Text>
// // //                     </XStack>
// // //                   </Card>
// // //                 ))}
// // //               </YStack>

// // //               {/* ASSET DATA */}
// // //               <YStack space="$4">
// // //                 <H4 color="#EAB308" fontSize={14} fontWeight="900" ls={2}>ASSET ARCHIVE</H4>
// // //                 {profile?.investments?.map((asset, idx) => (
// // //                   <Card key={idx} bg="#111" p="$4" br="$4" bw={1} bc="rgba(255,255,255,0.05)">
// // //                     <XStack jc="space-between" ai="center">
// // //                       <YStack>
// // //                         <Text color="white" fontWeight="700">{asset.identifier}</Text>
// // //                         <Text color="$gray11" fontSize={12}>{asset.name}</Text>
// // //                       </YStack>
// // //                       <Text color="#EAB308" fontWeight="900">{asset.asset_type?.toUpperCase()}</Text>
// // //                     </XStack>
// // //                   </Card>
// // //                 ))}
// // //               </YStack>
// // //             </YStack>
// // //           </ScrollView>
// // //         </SafeAreaView>
// // //       </LinearGradient>
// // //     </Theme>
// // //   );
// // // }




// // import React, { useEffect, useState, useCallback } from 'react';
// // import { ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
// // // Removed Circle to prevent 'undefined' component error
// // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Input, Card } from 'tamagui';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { 
// //   User, Shield, Phone, Briefcase, TrendingUp, ArrowLeft, Save, Edit2 
// // } from '@tamagui/lucide-icons';
// // import { useRouter } from 'expo-router';
// // import { SafeAreaView } from 'react-native-safe-area-context';

// // // ✅ Named import must match the export in userService.js
// // import { UserService } from '../services/userService';

// // export default function ProfileScreen() {
// //   const router = useRouter();
// //   const [profile, setProfile] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [formData, setFormData] = useState({ full_name: '', phone: '' });

// //   const fetchProfileData = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const data = await UserService.getProfile();
// //       setProfile(data);
// //       setFormData({
// //         full_name: data.full_name || '',
// //         phone: data.phone || '',
// //       });
// //     } catch (error) {
// //       console.error("Profile Fetch Error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchProfileData();
// //   }, [fetchProfileData]);

// //   const handleUpdate = async () => {
// //     try {
// //       setLoading(true);
// //       await UserService.updateProfile(formData);
// //       setIsEditing(false);
// //       fetchProfileData();
// //     } catch (error) {
// //       console.error("Update Error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading && !profile) {
// //     return (
// //       <YStack f={1} bg="#000" jc="center" ai="center">
// //         <Spinner size="large" color="#EAB308" />
// //       </YStack>
// //     );
// //   }

// //   return (
// //     <Theme name="dark">
// //       <LinearGradient colors={['#000000', '#111111']} style={{ flex: 1 }}>
// //         <SafeAreaView style={{ flex: 1 }}>
// //           <ScrollView 
// //             refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchProfileData} tintColor="#EAB308" />}
// //           >
// //             {/* PROTOCOL HEADER */}
// //             <XStack p="$4" jc="space-between" ai="center">
// //               <TouchableOpacity onPress={() => router.back()}>
// //                 <ArrowLeft size={24} color="white" />
// //               </TouchableOpacity>
// //               <XStack ai="center" space="$2">
// //                 <Shield size={16} color="#EAB308" />
// //                 <Text color="#EAB308" fontSize={11} fontWeight="900" ls={3}>IDENTITY</Text>
// //               </XStack>
// //               <TouchableOpacity onPress={() => (isEditing ? handleUpdate() : setIsEditing(true))}>
// //                 {isEditing ? <Save size={24} color="#EAB308" /> : <Edit2 size={20} color="white" />}
// //               </TouchableOpacity>
// //             </XStack>

// //             <YStack p="$4" space="$6">
// //               <YStack ai="center" space="$4">
// //                 {/* Replaced Circle with YStack to be safe */}
// //                 <YStack w={100} h={100} br={50} bg="$gold10" jc="center" ai="center">
// //                   <User size={50} color="black" />
// //                 </YStack>
                
// //                 <YStack ai="center">
// //                   {isEditing ? (
// //                     <Input 
// //                       bw={1} bc="$gold10" bg="#111" color="white" textAlign="center" 
// //                       value={formData.full_name} 
// //                       onChangeText={(t) => setFormData({...formData, full_name: t})} 
// //                     />
// //                   ) : (
// //                     <H2 color="white" fontWeight="900">{profile?.full_name}</H2>
// //                   )}
// //                   <Text color="$gray11">{profile?.email}</Text>
// //                 </YStack>
// //               </YStack>

// //               {/* INCOME SECTION */}
// //               <YStack space="$4">
// //                 <H4 color="#EAB308" fontSize={14} fontWeight="900">INCOME STREAMS</H4>
// //                 {profile?.incomes?.map((income, idx) => (
// //                   <Card key={idx} bg="#111" p="$4" br="$4" bw={1} bc="rgba(255,255,255,0.05)">
// //                     <XStack jc="space-between" ai="center">
// //                       <XStack ai="center" space="$3">
// //                         <Briefcase size={20} color="$gray11" />
// //                         <Text color="white" fontWeight="700">{income.name}</Text>
// //                       </XStack>
// //                       <Text color="#22c55e" fontWeight="800">₹{income.estimated_monthly_amount}</Text>
// //                     </XStack>
// //                   </Card>
// //                 ))}
// //               </YStack>

// //               {/* INVESTMENTS SECTION */}
// //               <YStack space="$4">
// //                 <H4 color="#EAB308" fontSize={14} fontWeight="900">ASSET ARCHIVE</H4>
// //                 {profile?.investments?.map((asset, idx) => (
// //                   <Card key={idx} bg="#111" p="$4" br="$4" bw={1} bc="rgba(255,255,255,0.05)">
// //                     <XStack jc="space-between" ai="center">
// //                       <YStack>
// //                         <Text color="white" fontWeight="700">{asset.identifier}</Text>
// //                         <Text color="$gray11" fontSize={12}>{asset.name}</Text>
// //                       </YStack>
// //                       <Text color="#EAB308" fontWeight="900">{asset.asset_type?.toUpperCase()}</Text>
// //                     </XStack>
// //                   </Card>
// //                 ))}
// //               </YStack>
// //             </YStack>
// //           </ScrollView>
// //         </SafeAreaView>
// //       </LinearGradient>
// //     </Theme>
// //   );
// // }



// import React, { useEffect, useState, useCallback } from 'react';
// import { ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
// // Standardized imports to prevent "undefined" component errors
// import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Input, Card } from 'tamagui';
// import { LinearGradient } from 'expo-linear-gradient';
// import { 
//   User, Shield, Phone, Briefcase, TrendingUp, ArrowLeft, Save, Edit2 
// } from '@tamagui/lucide-icons';
// import { useRouter } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';

// // ✅ Named import matching your service file
// import { UserService } from '../services/userService';

// export default function ProfileScreen() {
//   const router = useRouter();
  
//   // --- STATE ---
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ full_name: '', phone: '' });

//   // --- DATA FETCHING ---
//   const fetchProfileData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await UserService.getProfile();
//       setProfile(data);
//       // Sync form data with incoming profile
//       setFormData({
//         full_name: data.full_name || '',
//         phone: data.phone || '',
//       });
//     } catch (error) {
//       console.error("Profile Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProfileData();
//   }, [fetchProfileData]);

//   // --- UPDATE ACTION ---
//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       await UserService.updateProfile(formData);
//       setIsEditing(false);
//       await fetchProfileData(); // Refresh clean data
//     } catch (error) {
//       console.error("Update Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat('en-IN', { 
//       style: 'currency', 
//       currency: 'INR', 
//       maximumFractionDigits: 0 
//     }).format(amount || 0);

//   if (loading && !profile) {
//     return (
//       <YStack f={1} bg="#000" jc="center" ai="center">
//         <Spinner size="large" color="#EAB308" />
//         <Text mt="$2" color="$gray10" letterSpacing={1}>SYNCHRONIZING...</Text>
//       </YStack>
//     );
//   }

//   return (
//     <Theme name="dark">
//       <LinearGradient colors={['#000000', '#0A0A0A']} style={{ flex: 1 }}>
//         <SafeAreaView style={{ flex: 1 }}>
//           <ScrollView 
//             showsVerticalScrollIndicator={false}
//             refreshControl={
//               <RefreshControl refreshing={loading} onRefresh={fetchProfileData} tintColor="#EAB308" />
//             }
//           >
//             {/* PROTOCOL HEADER */}
//             <XStack p="$4" jc="space-between" ai="center">
//               <TouchableOpacity onPress={() => router.back()}>
//                 <ArrowLeft size={24} color="white" />
//               </TouchableOpacity>
//               <XStack ai="center" space="$2">
//                 <Shield size={16} color="#EAB308" />
//                 <Text color="#EAB308" fontSize={11} fontWeight="900" ls={3}>PROTOCOL IDENTITY</Text>
//               </XStack>
//               <TouchableOpacity onPress={() => (isEditing ? handleUpdate() : setIsEditing(true))}>
//                 {isEditing ? <Save size={24} color="#EAB308" /> : <Edit2 size={20} color="white" />}
//               </TouchableOpacity>
//             </XStack>

//             <YStack p="$4" space="$6">
              
//               {/* AVATAR & NAME */}
//               <YStack ai="center" space="$4">
//                 <YStack w={100} h={100} br={50} bg="$gold10" jc="center" ai="center" style={{ elevation: 10, shadowColor: '#EAB308', shadowOpacity: 0.3, shadowRadius: 20 }}>
//                   <User size={50} color="black" />
//                 </YStack>
//                 <YStack ai="center">
//                   {isEditing ? (
//                     <Input 
//                       bw={0} bbw={2} bc="$gold10" bg="transparent" color="white" fontSize={26} fontWeight="900" textAlign="center"
//                       value={formData.full_name} onChangeText={(t) => setFormData({...formData, full_name: t})}
//                     />
//                   ) : (
//                     <H2 color="white" fontWeight="900" letterSpacing={-1}>{profile?.full_name}</H2>
//                   )}
//                   <Text color="$gray11" fontSize={14}>{profile?.email}</Text>
//                 </YStack>
//               </YStack>

//               {/* CONTACT INFO */}
//               <Card bg="#111" p="$4" br="$4" bw={1} bc="rgba(255,255,255,0.05)">
//                 <XStack ai="center" space="$4">
//                   <YStack p="$2" br="$2" bg="rgba(234,179,8,0.1)">
//                     <Phone size={18} color="#EAB308" />
//                   </YStack>
//                   <YStack f={1}>
//                     <Text color="$gray10" fontSize={10} fontWeight="800">MOBILE SIGNAL</Text>
//                     {isEditing ? (
//                       <Input 
//                         h={30} p={0} bw={0} bbw={1} bc="$gold10" color="white" fontWeight="700"
//                         value={formData.phone} onChangeText={(t) => setFormData({...formData, phone: t})} 
//                       />
//                     ) : (
//                       <Text color="white" fontWeight="700" fontSize={16}>{profile?.phone || 'Not Linked'}</Text>
//                     )}
//                   </YStack>
//                 </XStack>
//               </Card>

//               {/* INCOME ANALYSIS (Deep Data) */}
//               <YStack space="$4">
//                 <H4 color="#EAB308" fontSize={13} fontWeight="900" ls={2}>INCOME ANALYSIS</H4>
//                 {profile?.incomes?.map((income, idx) => (
//                   <Card key={idx} bg="#111" p="$4" br="$4" bw={1} bc="rgba(255,255,255,0.05)">
//                     <XStack jc="space-between" ai="center">
//                       <XStack ai="center" space="$3">
//                         <Briefcase size={20} color="$gray11" />
//                         <YStack>
//                           <Text color="white" fontWeight="800" fontSize={15}>{income.name}</Text>
//                           <Text color="$gray10" fontSize={10}>{income.rate_type?.toUpperCase()}</Text>
//                         </YStack>
//                       </XStack>
//                       <Text color="#22c55e" fontWeight="900" fontSize={16}>{formatCurrency(income.estimated_monthly_amount)}</Text>
//                     </XStack>
//                   </Card>
//                 ))}
//               </YStack>

//               {/* ASSET ARCHIVE (Deep Data) */}
//               <YStack space="$4">
//                 <H4 color="#EAB308" fontSize={13} fontWeight="900" ls={2}>ASSET ARCHIVE</H4>
//                 {profile?.investments?.map((asset, idx) => (
//                   <Card key={idx} bg="#111" p="$4" br="$4" bw={1} bc="rgba(255,255,255,0.05)">
//                     <XStack jc="space-between" ai="center">
//                       <YStack space="$1">
//                         <Text color="white" fontWeight="800" fontSize={15}>{asset.identifier}</Text>
//                         <Text color="$gray11" fontSize={12}>{asset.name}</Text>
//                       </YStack>
//                       <YStack ai="flex-end">
//                         <Text color="#EAB308" fontWeight="900">{asset.asset_type?.toUpperCase()}</Text>
//                         <Text color="$gray10" fontSize={9}>UID: {asset.id.slice(0, 8)}</Text>
//                       </YStack>
//                     </XStack>
//                   </Card>
//                 ))}
//               </YStack>

//             </YStack>
//           </ScrollView>
//         </SafeAreaView>
//       </LinearGradient>
//     </Theme>
//   );
// }






import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import {
  YStack,
  XStack,
  Text,
  H2,
  H4,
  H6,
  Theme,
  Spinner,
  Button,
  Card,
  Input,
  TextArea,
  Switch,
  Select,
  Sheet,
  Separator
} from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {
  User,
  Settings,
  Edit3,
  Save,
  X,
  Trash2,
  Phone,
  Mail,
  Wallet,
  CreditCard,
  TrendingUp,
  Briefcase,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Plus,
  Percent,
  Calendar,
  PieChart,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Hash,
  ArrowLeft
} from '@tamagui/lucide-icons';

import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

// Services
import { ApiService } from '../services/apiService';
import { AuthService } from '../services/authService';

const { width } = Dimensions.get('window');

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [errors, setErrors] = useState({});
  
  // Modals
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // Forms
  const [newIncome, setNewIncome] = useState({
    name: '',
    estimated_monthly_amount: '',
    rate_type: 'MONTHLY'
  });
  
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    asset_type: 'EQUITY',
    identifier: '',
    current_value: '',
    expected_return_pct: '',
    pinned: false
  });

  // Fetch profile data
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ApiService.get('/user/profile');
      setProfile(response.data);
      setEditForm({
        full_name: response.data.full_name || '',
        phone: response.data.phone || '',
        preferences: response.data.preferences || {}
      });
    } catch (error) {
      console.error('Profile fetch error:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfile();
  }, [fetchProfile]);

  
  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      setErrors({});
      
      // Validation
      const newErrors = {};
      if (!editForm.full_name?.trim()) newErrors.full_name = 'Full name is required';
      if (editForm.phone && !/^\d{10}$/.test(editForm.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const response = await ApiService.patch('/user/profile', editForm);
      setProfile(response.data);
      setEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      if (error.response?.data?.detail) {
        Alert.alert('Validation Error', JSON.stringify(error.response.data.detail));
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    }
  };

  // Handle adding income
  const handleAddIncome = async () => {
    try {
      if (!newIncome.name || !newIncome.estimated_monthly_amount) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      // Create updated incomes array
      const updatedIncomes = [
        ...(profile.incomes || []),
        {
          ...newIncome,
          estimated_monthly_amount: parseFloat(newIncome.estimated_monthly_amount),
          id: `temp_${Date.now()}`
        }
      ];

      // Update profile via API
      const response = await ApiService.post('/user/profile', {
        ...editForm,
        incomes: updatedIncomes
      });

      setProfile(response.data);
      setNewIncome({
        name: '',
        estimated_monthly_amount: '',
        rate_type: 'MONTHLY'
      });
      setShowIncomeModal(false);
      Alert.alert('Success', 'Income source added successfully');
    } catch (error) {
      console.error('Add income error:', error);
      Alert.alert('Error', 'Failed to add income source');
    }
  };

  // Handle adding investment
  const handleAddInvestment = async () => {
    try {
      if (!newInvestment.name || !newInvestment.current_value) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      // Create updated investments array
      const updatedInvestments = [
        ...(profile.investments || []),
        {
          ...newInvestment,
          current_value: parseFloat(newInvestment.current_value),
          expected_return_pct: newInvestment.expected_return_pct 
            ? parseFloat(newInvestment.expected_return_pct) 
            : 0,
          id: `temp_${Date.now()}`,
          last_api_fetch: new Date().toISOString()
        }
      ];

      // Update profile via API
      const response = await ApiService.post('/user/profile', {
        ...editForm,
        investments: updatedInvestments
      });

      setProfile(response.data);
      setNewInvestment({
        name: '',
        asset_type: 'EQUITY',
        identifier: '',
        current_value: '',
        expected_return_pct: '',
        pinned: false
      });
      setShowInvestmentModal(false);
      Alert.alert('Success', 'Investment added successfully');
    } catch (error) {
      console.error('Add investment error:', error);
      Alert.alert('Error', 'Failed to add investment');
    }
  };

  // Handle deleting item
  const handleDeleteItem = async (type, id) => {
    try {
      if (type === 'income') {
        const updatedIncomes = profile.incomes.filter(income => income.id !== id);
        const response = await ApiService.post('/user/profile', {
          ...editForm,
          incomes: updatedIncomes
        });
        setProfile(response.data);
      } else if (type === 'investment') {
        const updatedInvestments = profile.investments.filter(inv => inv.id !== id);
        const response = await ApiService.post('/user/profile', {
          ...editForm,
          investments: updatedInvestments
        });
        setProfile(response.data);
      }
      
      setShowDeleteModal(false);
      setItemToDelete(null);
      Alert.alert('Success', 'Item deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await AuthService.logout();
            router.replace('/login');
          }
        }
      ]
    );
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: profile?.preferences?.currency || 'INR' 
    }).format(amount || 0);

  const getAssetTypeColor = (type) => {
    switch (type?.toUpperCase()) {
      case 'EQUITY': return '#3b82f6';
      case 'DEBT': return '#22c55e';
      case 'MUTUAL_FUND': return '#8b5cf6';
      case 'ETF': return '#ef4444';
      case 'CRYPTO': return '#f59e0b';
      case 'SAVINGS': return '#06b6d4';
      default: return '#64748b';
    }
  };

  const getRateTypeLabel = (type) => {
    switch (type) {
      case 'MONTHLY': return 'Monthly';
      case 'YEARLY': return 'Yearly';
      case 'HOURLY': return 'Hourly';
      case 'WEEKLY': return 'Weekly';
      default: return type;
    }
  };

  if (loading && !profile) {
    return (
      <Theme name="dark">
        <LinearGradient
          colors={['#000000', '#0A0A0A', '#111111']}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner size="large" color="#EAB308" />
            <Text color="white" mt="$4">Loading profile...</Text>
          </SafeAreaView>
        </LinearGradient>
      </Theme>
    );
  }

  return (
    <Theme name="dark">
      <LinearGradient
        colors={['#000000', '#0A0A0A', '#111111']}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
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
              paddingBottom: insets.bottom + 20,
            }}
          >
            {/* HEADER WITH BACK BUTTON */}
            <XStack ai="center" mb="$6">
              <TouchableOpacity 
                onPress={() => router.back()}
                style={{ marginRight: 16 }}
              >
                <LinearGradient
                  colors={['rgba(255, 191, 0, 0.2)', 'rgba(255, 191, 0, 0.2)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#EAB308',
                  }}
                >
                  <ArrowLeft size={20} color="#EAB308" />
                </LinearGradient>
              </TouchableOpacity>
              
              <YStack f={1}>
                <H2 color="white" fontWeight="900" fontSize={32}>
                  Profile
                </H2>

              </YStack>
              
              <TouchableOpacity onPress={handleLogout}>
                <LinearGradient
                  colors={['rgba(195, 63, 63, 0.2)', 'rgba(220, 38, 38, 0.1)']}
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: '#ef4444',
                  }}
                >
                  <LogOut size={18} color="#ef4444" />
                  <Text color="#ef4444" fontSize={12} fontWeight="700" ml="$2">
                    Logout
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </XStack>

            {/* ENHANCED PROFILE CARD - Fixed UI */}
<LinearGradient
  colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.08)']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{
    borderRadius: 24,
    padding: 30,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(234, 178, 8, 0.4)',
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
  }}
>
  {/* Profile Avatar Section */}
  <YStack ai="center" mb="$5">
    <LinearGradient
      colors={['rgba(255, 195, 13, 0.94)', 'rgba(255, 195, 13, 0.92)']}
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: 'rgba(88, 67, 6, 1)',
      }}
    >
      <Text color="BLACK" fontSize={32} fontWeight="800">
        {profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
      </Text>
    </LinearGradient>
    
    {/* Name */}
    <Text 
      color="white" 
      fontWeight="800" 
      fontSize={24} 
      textAlign="center"
      mb="$2"
    >
      {profile?.full_name || 'No Name Set'}
    </Text>
    
    {/* Email */}
    <XStack ai="center" space="$2" mb="$1">
      <Mail size={16} color="rgba(255, 255, 255, 0.7)" />
      <Text 
        color="rgba(255,255,255,0.7)" 
        fontSize={15}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {profile?.email || 'No email set'}
      </Text>
    </XStack>
    
    {/* Phone */}
    {profile?.phone && (
      <XStack ai="center" space="$2">
        <Phone size={16} color="rgba(255,255,255,0.7)" />
        <Text 
          color="rgba(255,255,255,0.7)" 
          fontSize={15}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {profile.phone}
        </Text>
      </XStack>
    )}
    
    {/* Edit Button */}
    <TouchableOpacity
      onPress={() => setEditing(!editing)}
      activeOpacity={0.8}
      style={{
        marginTop: 24,
        width: '100%',
        maxWidth: 200,
      }}
    >
      <LinearGradient
        colors={editing ? ['#22c55e', '#16a34a'] : ['rgba(59, 130, 246, 0.9)', 'rgba(37, 99, 235, 0.9)']}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: editing ? '#22c55e' : '#3b82f6',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 5,
        }}
      >
        {editing ? (
          <>
            <Save size={18} color="white" />
            <Text color="white" fontSize={14} fontWeight="700" ml="$2">
              Save Changes
            </Text>
          </>
        ) : (
          <>
            <Edit3 size={18} color="white" />
            <Text color="white" fontSize={14} fontWeight="700" ml="$2">
              Edit Profile
            </Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  </YStack>

  {/* Edit Form Section */}
  {editing && (
    <YStack 
      space="$4" 
      mt="$4" 
      pt="$4" 
      width="100%"
      borderTopWidth={1} 
      borderTopColor="rgba(255,255,255,0.1)"
    >
      <YStack>
        <Text color="rgba(255,255,255,0.8)" fontSize={14} fontWeight="600" mb="$2">
          Full Name
        </Text>
        <Input
          placeholder="Enter your full name"
          value={editForm.full_name}
          onChangeText={(text) => setEditForm({...editForm, full_name: text})}
          backgroundColor="rgba(0,0,0,0.3)"
          borderColor={errors.full_name ? '#ef4444' : 'rgba(255,255,255,0.2)'}
          color="white"
          placeholderTextColor="rgba(255,255,255,0.4)"
          fontSize={16}
          h={52}
          borderRadius={12}
        />
        {errors.full_name && (
          <Text color="#ef4444" fontSize={12} mt="$1">{errors.full_name}</Text>
        )}
      </YStack>
      
      <YStack>
        <Text color="rgba(255,255,255,0.8)" fontSize={14} fontWeight="600" mb="$2">
          Phone Number
        </Text>
        <Input
          placeholder="Enter phone number"
          value={editForm.phone}
          onChangeText={(text) => setEditForm({...editForm, phone: text})}
          backgroundColor="rgba(0,0,0,0.3)"
          borderColor={errors.phone ? '#ef4444' : 'rgba(255,255,255,0.2)'}
          color="white"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="phone-pad"
          fontSize={16}
          h={52}
          borderRadius={12}
          leftElement={<Phone size={18} color="rgba(255,255,255,0.5)" ml="$3" />}
        />
        {errors.phone && (
          <Text color="#ef4444" fontSize={12} mt="$1">{errors.phone}</Text>
        )}
      </YStack>
      
      <XStack space="$3" mt="$2">
        <TouchableOpacity
          onPress={handleUpdateProfile}
          activeOpacity={0.8}
          style={{ flex: 1 }}
        >
          <LinearGradient
            colors={['#22c55e', '#16a34a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              shadowColor: '#22c55e',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <Text color="white" fontSize={15} fontWeight="700">Update Profile</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => {
            setEditing(false);
            setErrors({});
          }}
          activeOpacity={0.8}
          style={{ flex: 1 }}
        >
          <LinearGradient
            colors={['rgba(40, 40, 40, 0.2)', 'rgba(20, 20, 20, 0.8)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.15)',
            }}
          >
            <Text color="rgba(255,255,255,0.9)" fontSize={15} fontWeight="700">Cancel</Text>
          </LinearGradient>
        </TouchableOpacity>
      </XStack>
    </YStack>
  )}
</LinearGradient>

        {/* INCOME SOURCES */}
        <YStack mb="$4" mt="20">
          <XStack jc="space-between" ai="center" mb="$4" >
            <H2 color="white" fontWeight="800" fontSize={24}>
              Income
            </H2>

            <TouchableOpacity
              onPress={() => router.push('/income')} // 🔁 redirect to income page
              activeOpacity={0.8}
            >
              <LinearGradient
                    colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text color="#EAB308" fontSize={12} fontWeight="700" ml="$2">
                      View all 
                    </Text>
                  </LinearGradient>
            </TouchableOpacity>
          </XStack>

          {profile?.incomes && profile.incomes.length > 0 ? (
            <YStack space="$3">
              {profile.incomes.slice(0, 5).map((income, index) => (
                <TouchableOpacity
                  key={income.id || index}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={[
                      'rgba(23, 23, 23, 0.97)',
                      'rgba(23, 23, 23, 0.97)',
                    ]}
                    style={{
                      padding: 16,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <XStack jc="space-between" ai="center">
                      <XStack ai="center" space="$3">
                        <LinearGradient
                          colors={['#22c55e', '#16a34a']}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Briefcase size={18} color="white" />
                        </LinearGradient>

                        <YStack>
                          <Text color="white" fontWeight="700" fontSize={16}>
                            {income.name}
                          </Text>
                          <Text color="rgba(255,255,255,0.6)" fontSize={12}>
                            {getRateTypeLabel(income.rate_type)} •{' '}
                            {formatCurrency(income.estimated_monthly_amount)}
                          </Text>
                        </YStack>
                      </XStack>

                      <TouchableOpacity
                        onPress={() => {
                          setItemToDelete({ type: 'income', id: income.id })
                          setShowDeleteModal(true)
                        }}
                      >
                        <Trash2 size={18} color="#ef4444" />
                      </TouchableOpacity>
                    </XStack>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </YStack>
          ) : (
            <Text color="rgba(255,255,255,0.6)" fontSize={13}>
              No income sources added yet
            </Text>
          )}
        </YStack>

{/* INVESTMENTS */}
<YStack mb="$6" mt="30">
  <XStack jc="space-between" ai="center" mb="$4">
    <H4 color="white" fontWeight="800" fontSize={24}>
      Investments
    </H4>

    <TouchableOpacity
      onPress={() => router.push('/portfolio')} // 🔁 redirect to investments page
      activeOpacity={0.8}
    >
      <LinearGradient
                    colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text color="#EAB308" fontSize={12} fontWeight="700" ml="$2">
                      View all 
                    </Text>
                  </LinearGradient>
    </TouchableOpacity>
  </XStack>

  {profile?.investments && profile.investments.length > 0 ? (
    <YStack space="$3">
      {profile.investments.slice(0, 5).map((investment, index) => (
        <TouchableOpacity
          key={investment.id || index}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[
              'rgba(23, 23, 23, 0.97)',
              'rgba(23, 23, 23, 0.97)',
            ]}
            style={{
              padding: 16,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <XStack jc="space-between" ai="center">
              <XStack ai="center" space="$3">
                <LinearGradient
                  colors={[
                    getAssetTypeColor(investment.asset_type),
                    getAssetTypeColor(investment.asset_type) + 'DD',
                  ]}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {investment.asset_type === 'EQUITY' && <TrendingUp size={18} color="white" />}
                  {investment.asset_type === 'DEBT' && <Shield size={18} color="white" />}
                  {investment.asset_type === 'MUTUAL_FUND' && <PieChart size={18} color="white" />}
                  {investment.asset_type === 'ETF' && <Hash size={18} color="white" />}
                  {investment.asset_type === 'CRYPTO' && <DollarSign size={18} color="white" />}
                  {!['EQUITY', 'DEBT', 'MUTUAL_FUND', 'ETF', 'CRYPTO'].includes(investment.asset_type) && (
                    <Wallet size={18} color="white" />
                  )}
                </LinearGradient>

                <YStack>
                  <Text color="white" fontWeight="700" fontSize={16}>
                    {investment.name}
                  </Text>
                  <XStack ai="center" space="$2">
                    <Text color="rgba(255,255,255,0.6)" fontSize={12}>
                      {investment.identifier || investment.asset_type}
                    </Text>
                    {investment.pinned && (
                      <CheckCircle size={12} color="#22c55e" />
                    )}
                  </XStack>
                </YStack>
              </XStack>

              {/* <YStack ai="flex-end">
                <Text color="white" fontWeight="700" fontSize={16}>
                  {formatCurrency(investment.current_value)}
                </Text>
                {investment.expected_return_pct > 0 && (
                  <XStack ai="center" space="$1">
                    <TrendingUp size={12} color="#22c55e" />
                    <Text color="#22c55e" fontSize={11} fontWeight="700">
                      +{investment.expected_return_pct}%
                    </Text>
                  </XStack>
                )}
              </YStack> */}
            </XStack>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </YStack>
  ) : (
    <Text color="rgba(255,255,255,0.6)" fontSize={13}>
      No investments added yet
    </Text>
  )}
</YStack>

            {/* SETTINGS & PREFERENCES */}
            <YStack mb="$6">
              <H4 color="white" fontWeight="800" fontSize={18} mb="$4">
                Settings
              </H4>
              
              <YStack space="$3">
                <TouchableOpacity activeOpacity={0.8}>
                  <LinearGradient
                    colors={['rgba(23, 23, 23, 0.97)', 'rgba(23, 23, 23, 0.97)']}
                    style={{
                      padding: 16,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <XStack jc="space-between" ai="center">
                      <XStack ai="center" space="$3">
                        <Settings size={20} color="#3b82f6" />
                        <Text color="white" fontWeight="600" fontSize={16}>
                          Preferences
                        </Text>
                      </XStack>
                      <ChevronRight size={18} color="rgba(255,255,255,0.5)" />
                    </XStack>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.8}>
                  <LinearGradient
                    colors={['rgba(23, 23, 23, 0.97)', 'rgba(23, 23, 23, 0.97)']}
                    style={{
                      padding: 16,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <XStack jc="space-between" ai="center">
                      <XStack ai="center" space="$3">
                        <Bell size={20} color="#f59e0b" />
                        <Text color="white" fontWeight="600" fontSize={16}>
                          Notifications
                        </Text>
                      </XStack>
                      <ChevronRight size={18} color="rgba(255,255,255,0.5)" />
                    </XStack>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.8}>
                  <LinearGradient
                    colors={['rgba(23, 23, 23, 0.97)', 'rgba(23, 23, 23, 0.97)']}
                    style={{
                      padding: 16,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <XStack jc="space-between" ai="center">
                      <XStack ai="center" space="$3">
                        <Shield size={20} color="#22c55e" />
                        <Text color="white" fontWeight="600" fontSize={16}>
                          Security
                        </Text>
                      </XStack>
                      <ChevronRight size={18} color="rgba(255,255,255,0.5)" />
                    </XStack>
                  </LinearGradient>
                </TouchableOpacity>
              </YStack>
            </YStack>

            {/* STATS SUMMARY */}
            <LinearGradient
              colors={['rgba(23, 23, 23, 0.97)', 'rgba(23, 23, 23, 0.97)']}
              style={{
                borderRadius: 20,
                padding: 20,
                borderWidth: 1.5,
                borderColor: 'rgba(255, 255, 255, 0.73)',
              }}
            >
              <Text color="white" fontWeight="700" fontSize={18} mb="$3">
                Financial Summary
              </Text>
              
              <YStack space="$3">
                <XStack jc="space-between" ai="center">
                  <Text color="rgba(255,255,255,0.7)" fontSize={14}>Total Income</Text>
                  <Text color="white" fontWeight="700" fontSize={16}>
                    {formatCurrency(
                      profile?.incomes?.reduce((sum, inc) => sum + (inc.estimated_monthly_amount || 0), 0) || 0
                    )}
                  </Text>
                </XStack>
                
                <XStack jc="space-between" ai="center">
                  <Text color="rgba(255,255,255,0.7)" fontSize={14}>Total Investments</Text>
                  <Text color="white" fontWeight="700" fontSize={16}>
                    {formatCurrency(
                      profile?.investments?.reduce((sum, inv) => sum + (inv.current_value || 0), 0) || 0
                    )}
                  </Text>
                </XStack>
                
                <XStack jc="space-between" ai="center">
                  <Text color="rgba(255,255,255,0.7)" fontSize={14}>Income Sources</Text>
                  <Text color="white" fontWeight="700" fontSize={16}>
                    {profile?.incomes?.length || 0}
                  </Text>
                </XStack>
                
                <XStack jc="space-between" ai="center">
                  <Text color="rgba(255,255,255,0.7)" fontSize={14}>Active Investments</Text>
                  <Text color="white" fontWeight="700" fontSize={16}>
                    {profile?.investments?.length || 0}
                  </Text>
                </XStack>
              </YStack>
            </LinearGradient>
          </ScrollView>
        </SafeAreaView>

        {/* DELETE CONFIRMATION MODAL */}
        <Modal
          visible={showDeleteModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowDeleteModal(false)}
        >
          <BlurView intensity={90} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <LinearGradient
              colors={['#1a1a1a', '#0a0a0a']}
              style={{
                borderRadius: 24,
                padding: 24,
                width: '100%',
                maxWidth: 400,
                borderWidth: 1,
                borderColor: 'rgba(239, 68, 68, 0.3)',
              }}
            >
              <XStack jc="center" mb="$4">
                <AlertCircle size={48} color="#ef4444" />
              </XStack>
              
              <Text color="white" fontWeight="700" fontSize={18} textAlign="center" mb="$2">
                Confirm Deletion
              </Text>
              
              <Text color="rgba(255,255,255,0.7)" fontSize={14} textAlign="center" mb="$6">
                Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
              </Text>
              
              <XStack space="$3">
                <Button
                  flex={1}
                  onPress={() => {
                    if (itemToDelete) {
                      handleDeleteItem(itemToDelete.type, itemToDelete.id);
                    }
                  }}
                  backgroundColor="#ef4444"
                  color="white"
                  fontWeight="700"
                >
                  Delete
                </Button>
                <Button
                  flex={1}
                  onPress={() => {
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                  }}
                  backgroundColor="rgba(255,255,255,0.1)"
                  color="white"
                  fontWeight="700"
                >
                  Cancel
                </Button>
              </XStack>
            </LinearGradient>
          </BlurView>
        </Modal>
      </LinearGradient>
    </Theme>
  );
}