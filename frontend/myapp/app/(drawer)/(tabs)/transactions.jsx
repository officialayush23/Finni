// // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // import { 
// // // // // // // // // // // //   FlatList, RefreshControl, Modal, TouchableOpacity, 
// // // // // // // // // // // //   StyleSheet, Platform, ActivityIndicator, Alert 
// // // // // // // // // // // // } from 'react-native';
// // // // // // // // // // // // import { YStack, XStack, Text, Button, Input, Theme, Card, Spinner, View, H4 } from 'tamagui';
// // // // // // // // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // // // // // // // import { 
// // // // // // // // // // // //   Plus, ArrowLeft, ArrowDownLeft, Zap, FileText, X, 
// // // // // // // // // // // //   CheckCircle, Mic, Image as ImageIcon, History 
// // // // // // // // // // // // } from '@tamagui/lucide-icons';
// // // // // // // // // // // // import { useRouter } from 'expo-router';
// // // // // // // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // // // // // // // // // import * as ImagePicker from 'expo-image-picker';
// // // // // // // // // // // // import { api } from '../../../services/api';

// // // // // // // // // // // // export default function TransactionsScreen() {
// // // // // // // // // // // //   const router = useRouter();
  
// // // // // // // // // // // //   const [transactions, setTransactions] = useState([]);
// // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // //   const [modalVisible, setModalVisible] = useState(false);
// // // // // // // // // // // //   const [submitting, setSubmitting] = useState(false);

// // // // // // // // // // // //   // Form State
// // // // // // // // // // // //   const [rawText, setRawText] = useState('');

// // // // // // // // // // // //   const fetchTransactions = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       setLoading(true);
// // // // // // // // // // // //       const response = await api.get('/api/v1/transactions/');
// // // // // // // // // // // //       const sorted = response.data.sort((a, b) => 
// // // // // // // // // // // //         new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime()
// // // // // // // // // // // //       );
// // // // // // // // // // // //       setTransactions(sorted);
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error("Fetch Error:", error);
// // // // // // // // // // // //     } finally {
// // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     fetchTransactions();
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   // --- 1. AI MANUAL INGEST ---
// // // // // // // // // // // //   const handleSmartIngest = async () => {
// // // // // // // // // // // //     if (!rawText.trim()) return;
// // // // // // // // // // // //     setSubmitting(true);
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       await api.post(`/api/v1/ingest/manual?raw_text=${encodeURIComponent(rawText)}`);
// // // // // // // // // // // //       Alert.alert("Success", "AI is processing your transaction.");
// // // // // // // // // // // //       setRawText('');
// // // // // // // // // // // //       setModalVisible(false);
// // // // // // // // // // // //       setTimeout(fetchTransactions, 2000); // Give AI time to process
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       Alert.alert("Error", "Manual ingestion failed.");
// // // // // // // // // // // //     } finally {
// // // // // // // // // // // //       setSubmitting(false);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // --- 2. OCR INGEST (Image) ---
// // // // // // // // // // // //   const handleOCR = async () => {
// // // // // // // // // // // //     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
// // // // // // // // // // // //     if (!permissionResult.granted) {
// // // // // // // // // // // //       Alert.alert("Permission Required", "Allow access to your photos to scan receipts.");
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const result = await ImagePicker.launchImageLibraryAsync({
// // // // // // // // // // // //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// // // // // // // // // // // //       allowsEditing: true,
// // // // // // // // // // // //       quality: 1,
// // // // // // // // // // // //     });

// // // // // // // // // // // //     if (!result.canceled) {
// // // // // // // // // // // //       setSubmitting(true);
// // // // // // // // // // // //       const localUri = result.assets[0].uri;
// // // // // // // // // // // //       const filename = localUri.split('/').pop();
// // // // // // // // // // // //       const match = /\.(\w+)$/.exec(filename);
// // // // // // // // // // // //       const type = match ? `image/${match[1]}` : `image`;

// // // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // // //       formData.append('file', { uri: localUri, name: filename, type });

// // // // // // // // // // // //       try {
// // // // // // // // // // // //         await api.post('/api/v1/ingest/ocr', formData, {
// // // // // // // // // // // //           headers: { 'Content-Type': 'multipart/form-data' },
// // // // // // // // // // // //         });
// // // // // // // // // // // //         Alert.alert("Scan Success", "Receipt sent for AI analysis.");
// // // // // // // // // // // //         setModalVisible(false);
// // // // // // // // // // // //         setTimeout(fetchTransactions, 3000);
// // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // //         console.error("OCR Error:", error);
// // // // // // // // // // // //         Alert.alert("OCR Failed", "Could not process image.");
// // // // // // // // // // // //       } finally {
// // // // // // // // // // // //         setSubmitting(false);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // --- 3. VOICE INGEST (Shortcut to Chat) ---
// // // // // // // // // // // //   const handleVoiceShortcut = () => {
// // // // // // // // // // // //     setModalVisible(false);
// // // // // // // // // // // //     router.push('/chat'); // Assuming your chat handles voice ingestion
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const formatCurrency = (amount) => 
// // // // // // // // // // // //     new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <Theme name="dark">
// // // // // // // // // // // //       <LinearGradient colors={['#000', '#0a0a0a']} style={{ flex: 1 }}>
// // // // // // // // // // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
// // // // // // // // // // // //           <YStack f={1} px={20}>
            
// // // // // // // // // // // //             {/* HEADER */}
// // // // // // // // // // // //             <XStack jc="space-between" ai="center" py="$4">
// // // // // // // // // // // //               <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
// // // // // // // // // // // //                 <ArrowLeft size={22} color="white" />
// // // // // // // // // // // //               </TouchableOpacity>
// // // // // // // // // // // //               <Text style={styles.headerTitle}>LEDGER HISTORY</Text>
// // // // // // // // // // // //               <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.iconBtn, {borderColor: '#EAB308'}]}>
// // // // // // // // // // // //                 <Plus size={22} color="#EAB308" />
// // // // // // // // // // // //               </TouchableOpacity>
// // // // // // // // // // // //             </XStack>

// // // // // // // // // // // //             <FlatList
// // // // // // // // // // // //               data={transactions}
// // // // // // // // // // // //               keyExtractor={(item) => item.id}
// // // // // // // // // // // //               showsVerticalScrollIndicator={false}
// // // // // // // // // // // //               refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchTransactions} tintColor="#EAB308" />}
// // // // // // // // // // // //               contentContainerStyle={{ paddingBottom: 100 }}
// // // // // // // // // // // //               renderItem={({ item }) => (
// // // // // // // // // // // //                 <Card bg="#050505" p="$4" mb="$3" bc="#111" bw={1} br="$4">
// // // // // // // // // // // //                   <XStack jc="space-between" ai="center">
// // // // // // // // // // // //                     <XStack space="$3" ai="center">
// // // // // // // // // // // //                       <View w={38} h={38} bg="#0A0A0A" br={10} jc="center" ai="center">
// // // // // // // // // // // //                         <ArrowDownLeft size={16} color={item.amount > 0 ? "#FF453A" : "#22C55E"} />
// // // // // // // // // // // //                       </View>
// // // // // // // // // // // //                       <YStack>
// // // // // // // // // // // //                         <Text color="white" fontWeight="800" fontSize={14}>{item.description || item.merchant_raw || "AI Entry"}</Text>
// // // // // // // // // // // //                         <Text color="#444" fontSize={10} fontWeight="700">{item.source.toUpperCase()}</Text>
// // // // // // // // // // // //                       </YStack>
// // // // // // // // // // // //                     </XStack>
// // // // // // // // // // // //                     <Text color="white" fontWeight="900" fontSize={15}>{formatCurrency(item.amount)}</Text>
// // // // // // // // // // // //                   </XStack>
// // // // // // // // // // // //                 </Card>
// // // // // // // // // // // //               )}
// // // // // // // // // // // //             />
// // // // // // // // // // // //           </YStack>
// // // // // // // // // // // //         </SafeAreaView>
// // // // // // // // // // // //       </LinearGradient>

// // // // // // // // // // // //       {/* --- MULTI-MODE INGESTION MODAL --- */}
// // // // // // // // // // // //       <Modal visible={modalVisible} animationType="slide" transparent>
// // // // // // // // // // // //         <View style={styles.modalOverlay}>
// // // // // // // // // // // //           <View style={styles.modalContent}>
// // // // // // // // // // // //             <XStack jc="space-between" ai="center" mb="$6">
// // // // // // // // // // // //               <H4 color="white" fontWeight="900">ADD TRANSACTION</H4>
// // // // // // // // // // // //               <TouchableOpacity onPress={() => setModalVisible(false)}><X size={24} color="#666" /></TouchableOpacity>
// // // // // // // // // // // //             </XStack>

// // // // // // // // // // // //             <YStack space="$5">
// // // // // // // // // // // //               {/* SMART TEXT INPUT */}
// // // // // // // // // // // //               <View>
// // // // // // // // // // // //                 <Text style={styles.label}>AI SMART ENTRY</Text>
// // // // // // // // // // // //                 <Input 
// // // // // // // // // // // //                   multiline h={80} textAlignVertical="top" p="$3"
// // // // // // // // // // // //                   value={rawText} onChangeText={setRawText}
// // // // // // // // // // // //                   placeholder="e.g. Paid 500 for Pizza" placeholderTextColor="#333" 
// // // // // // // // // // // //                   bg="#000" bc="#1A1A1A" bw={1} color="white"
// // // // // // // // // // // //                 />
// // // // // // // // // // // //               </View>

// // // // // // // // // // // //               {/* ACTION BUTTONS */}
// // // // // // // // // // // //               <XStack space="$3">
// // // // // // // // // // // //                 <TouchableOpacity onPress={handleOCR} style={[styles.actionBox, { flex: 1 }]}>
// // // // // // // // // // // //                   <ImageIcon size={20} color="#EAB308" />
// // // // // // // // // // // //                   <Text style={styles.actionText}>SCAN</Text>
// // // // // // // // // // // //                 </TouchableOpacity>

// // // // // // // // // // // //                 <TouchableOpacity onPress={handleVoiceShortcut} style={[styles.actionBox, { flex: 1 }]}>
// // // // // // // // // // // //                   <Mic size={20} color="#EAB308" />
// // // // // // // // // // // //                   <Text style={styles.actionText}>VOICE</Text>
// // // // // // // // // // // //                 </TouchableOpacity>
// // // // // // // // // // // //               </XStack>

// // // // // // // // // // // //               <Button 
// // // // // // // // // // // //                 bg="#EAB308" color="black" fontWeight="900" h={55}
// // // // // // // // // // // //                 onPress={handleSmartIngest} disabled={submitting || !rawText.trim()}
// // // // // // // // // // // //               >
// // // // // // // // // // // //                 {submitting ? <Spinner color="black" /> : "PROCESS ENTRY"}
// // // // // // // // // // // //               </Button>
// // // // // // // // // // // //             </YStack>
// // // // // // // // // // // //           </View>
// // // // // // // // // // // //         </View>
// // // // // // // // // // // //       </Modal>
// // // // // // // // // // // //     </Theme>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }

// // // // // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // // // // //   iconBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
// // // // // // // // // // // //   headerTitle: { color: 'white', fontWeight: '900', fontSize: 13, letterSpacing: 2 },
// // // // // // // // // // // //   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'flex-end' },
// // // // // // // // // // // //   modalContent: { backgroundColor: '#0A0A0A', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 60, borderTopWidth: 1, borderColor: '#1A1A1A' },
// // // // // // // // // // // //   label: { color: '#444', fontSize: 10, fontWeight: '800', marginBottom: 10, letterSpacing: 1 },
// // // // // // // // // // // //   actionBox: { height: 70, backgroundColor: '#111', borderRadius: 15, jc: 'center', ai: 'center', borderWidth: 1, borderColor: '#1A1A1A', gap: 8 },
// // // // // // // // // // // //   actionText: { color: 'white', fontSize: 10, fontWeight: '900', letterSpacing: 1 }
// // // // // // // // // // // // });


// // // // // // // // // // // import React, { useEffect, useState, useCallback } from 'react';
// // // // // // // // // // // import { ScrollView, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
// // // // // // // // // // // import { YStack, XStack, Text, H2, H4, Theme, Spinner, Button, Card, Separator, Progress } from 'tamagui';
// // // // // // // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // // // // // // import { 
// // // // // // // // // // //   ArrowLeft, Filter, Plus, Camera, AlertCircle, CheckCircle2, 
// // // // // // // // // // //   ShoppingBag, Coffee, Car, Home, Zap, MoreVertical, CreditCard, ArrowDownLeft, ArrowUpRight
// // // // // // // // // // // } from '@tamagui/lucide-icons';
// // // // // // // // // // // import { useRouter } from 'expo-router';
// // // // // // // // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // // // // // // // // // // --- SERVICES ---
// // // // // // // // // // // import { ApiService } from '../../../services/apiService';

// // // // // // // // // // // const { width } = Dimensions.get('window');

// // // // // // // // // // // export default function TransactionsScreen() {
// // // // // // // // // // //   const router = useRouter();
// // // // // // // // // // //   const insets = useSafeAreaInsets();
// // // // // // // // // // //   const [transactions, setTransactions] = useState([]);
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [refreshing, setRefreshing] = useState(false);

// // // // // // // // // // //   // --- FETCH DATA (The Verified Ledger) ---
// // // // // // // // // // //   const fetchTransactions = useCallback(async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       if (!refreshing) setLoading(true);
// // // // // // // // // // //       const res = await ApiService.getTransactions();
// // // // // // // // // // //       setTransactions(res.data || []);
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Ledger Sync Error:", error);
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //       setRefreshing(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [refreshing]);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     fetchTransactions();
// // // // // // // // // // //   }, [fetchTransactions]);

// // // // // // // // // // //   const onRefresh = () => {
// // // // // // // // // // //     setRefreshing(true);
// // // // // // // // // // //     fetchTransactions();
// // // // // // // // // // //   };

// // // // // // // // // // //   const formatCurrency = (amount) =>
// // // // // // // // // // //     new Intl.NumberFormat('en-IN', { 
// // // // // // // // // // //       style: 'currency', 
// // // // // // // // // // //       currency: 'INR', 
// // // // // // // // // // //       maximumFractionDigits: 0 
// // // // // // // // // // //     }).format(amount || 0);

// // // // // // // // // // //   return (
// // // // // // // // // // //     <Theme name="dark">
// // // // // // // // // // //       <LinearGradient colors={['#000000', '#0A0A0A', '#111111']} style={{ flex: 1 }}>
// // // // // // // // // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
// // // // // // // // // // //           {/* HEADER LAYER */}
// // // // // // // // // // //           <XStack p="$4" jc="space-between" ai="center" mt="$2">
// // // // // // // // // // //             <YStack>
// // // // // // // // // // //               <XStack ai="center" space="$2" mb="$1">
// // // // // // // // // // //                 <CreditCard size={14} color="#EAB308" />
// // // // // // // // // // //                 <Text color="#EAB308" fontSize={11} letterSpacing={3} fontWeight="800">LEDGER</Text>
// // // // // // // // // // //               </XStack>
// // // // // // // // // // //               <H2 color="white" fontWeight="900" fontSize={28}>Activity</H2>
// // // // // // // // // // //             </YStack>
            
// // // // // // // // // // //             <XStack space="$2">
// // // // // // // // // // //               <TouchableOpacity 
// // // // // // // // // // //                 onPress={() => router.push('/transactions/ocr')}
// // // // // // // // // // //                 style={{ padding: 10, borderRadius: 12, backgroundColor: '#111', borderWidth: 1, borderColor: '#333' }}
// // // // // // // // // // //               >
// // // // // // // // // // //                 <Camera size={20} color="white" />
// // // // // // // // // // //               </TouchableOpacity>
// // // // // // // // // // //               <TouchableOpacity 
// // // // // // // // // // //                 onPress={() => router.push('/transactions/add')}
// // // // // // // // // // //                 style={{ padding: 10, borderRadius: 12, backgroundColor: '#EAB308' }}
// // // // // // // // // // //               >
// // // // // // // // // // //                 <Plus size={20} color="black" />
// // // // // // // // // // //               </TouchableOpacity>
// // // // // // // // // // //             </XStack>
// // // // // // // // // // //           </XStack>

// // // // // // // // // // //           <ScrollView 
// // // // // // // // // // //             showsVerticalScrollIndicator={false}
// // // // // // // // // // //             refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#EAB308" />}
// // // // // // // // // // //             contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
// // // // // // // // // // //           >
            
// // // // // // // // // // //             {/* 1. INGEST NOTIFICATION (Placeholder for Flagged Items) */}
// // // // // // // // // // //             {/* This follows your doctrine: User attention is expensive. Only show if needed. */}
// // // // // // // // // // //             <Card p="$4" br="$4" bw={1} bc="rgba(234, 179, 8, 0.2)" bg="rgba(234, 179, 8, 0.05)" mb="$6">
// // // // // // // // // // //               <XStack space="$3" ai="center">
// // // // // // // // // // //                 <AlertCircle size={20} color="#EAB308" />
// // // // // // // // // // //                 <YStack f={1}>
// // // // // // // // // // //                   <Text color="white" fontWeight="800" fontSize={14}>Smart Ingest Active</Text>
// // // // // // // // // // //                   <Text color="$gray11" fontSize={12}>AI is automatically categorizing your SMS alerts.</Text>
// // // // // // // // // // //                 </YStack>
// // // // // // // // // // //                 <Button size="$2" chromeless color="#EAB308" fontWeight="800">VIEW ALL</Button>
// // // // // // // // // // //               </XStack>
// // // // // // // // // // //             </Card>

// // // // // // // // // // //             {/* 2. TRANSACTION LIST (Verified Truth) */}
// // // // // // // // // // //             <YStack space="$4">
// // // // // // // // // // //               <XStack jc="space-between" ai="center">
// // // // // // // // // // //                 <H4 color="#EAB308" fontSize={14} letterSpacing={2} fontWeight="800">VERIFIED HISTORY</H4>
// // // // // // // // // // //                 <Filter size={16} color="$gray10" />
// // // // // // // // // // //               </XStack>

// // // // // // // // // // //               {transactions.length > 0 ? (
// // // // // // // // // // //                 transactions.map((tx, i) => (
// // // // // // // // // // //                   <TouchableOpacity key={tx.id || i} activeOpacity={0.8}>
// // // // // // // // // // //                     <XStack 
// // // // // // // // // // //                       jc="space-between" 
// // // // // // // // // // //                       ai="center" 
// // // // // // // // // // //                       p="$4" 
// // // // // // // // // // //                       bg="rgba(255,255,255,0.02)" 
// // // // // // // // // // //                       br="$4" 
// // // // // // // // // // //                       bw={1} 
// // // // // // // // // // //                       bc="rgba(255,255,255,0.05)"
// // // // // // // // // // //                     >
// // // // // // // // // // //                       <XStack space="$4" ai="center">
// // // // // // // // // // //                         <YStack 
// // // // // // // // // // //                           p="$2.5" 
// // // // // // // // // // //                           br="$3" 
// // // // // // // // // // //                           bg={tx.type === 'income' ? 'rgba(34, 197, 94, 0.1)' : '#111'} 
// // // // // // // // // // //                           bc={tx.type === 'income' ? 'rgba(34, 197, 94, 0.2)' : '#222'} 
// // // // // // // // // // //                           bw={1}
// // // // // // // // // // //                         >
// // // // // // // // // // //                           {tx.type === 'income' ? (
// // // // // // // // // // //                             <ArrowDownLeft size={20} color="#22c55e" />
// // // // // // // // // // //                           ) : (
// // // // // // // // // // //                             getCategoryIcon(tx.category)
// // // // // // // // // // //                           )}
// // // // // // // // // // //                         </YStack>
// // // // // // // // // // //                         <YStack>
// // // // // // // // // // //                           <Text color="white" fontWeight="800" fontSize={16}>{tx.description || tx.merchant_name || 'Transaction'}</Text>
// // // // // // // // // // //                           <Text color="$gray11" fontSize={12}>{tx.category?.toUpperCase() || 'UNCATEGORIZED'}</Text>
// // // // // // // // // // //                         </YStack>
// // // // // // // // // // //                       </XStack>

// // // // // // // // // // //                       <YStack ai="flex-end">
// // // // // // // // // // //                         <Text 
// // // // // // // // // // //                           color={tx.type === 'income' ? '#22c55e' : 'white'} 
// // // // // // // // // // //                           fontWeight="900" 
// // // // // // // // // // //                           fontSize={16}
// // // // // // // // // // //                         >
// // // // // // // // // // //                           {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
// // // // // // // // // // //                         </Text>
// // // // // // // // // // //                         <Text color="$gray11" fontSize={10}>
// // // // // // // // // // //                           {new Date(tx.transaction_date || tx.created_at).toLocaleDateString()}
// // // // // // // // // // //                         </Text>
// // // // // // // // // // //                       </YStack>
// // // // // // // // // // //                     </XStack>
// // // // // // // // // // //                   </TouchableOpacity>
// // // // // // // // // // //                 ))
// // // // // // // // // // //               ) : (
// // // // // // // // // // //                 <YStack ai="center" py="$10" space="$4">
// // // // // // // // // // //                   <CheckCircle2 size={48} color="$gray8" />
// // // // // // // // // // //                   <YStack ai="center">
// // // // // // // // // // //                     <Text color="white" fontWeight="800">Clean Ledger</Text>
// // // // // // // // // // //                     <Text color="$gray11" textAlign="center">No transactions found for this period.</Text>
// // // // // // // // // // //                   </YStack>
// // // // // // // // // // //                   <Button bg="$gold10" color="black" onPress={() => router.push('/transactions/add')}>
// // // // // // // // // // //                     Manual Entry
// // // // // // // // // // //                   </Button>
// // // // // // // // // // //                 </YStack>
// // // // // // // // // // //               )}
// // // // // // // // // // //             </YStack>

// // // // // // // // // // //           </ScrollView>
// // // // // // // // // // //         </SafeAreaView>
// // // // // // // // // // //       </LinearGradient>
// // // // // // // // // // //     </Theme>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // // // --- CATEGORY ICON MAPPING ---
// // // // // // // // // // // function getCategoryIcon(category) {
// // // // // // // // // // //   const c = category?.toLowerCase() || '';
// // // // // // // // // // //   if (c.includes('food') || c.includes('dining')) return <Coffee size={20} color="#EAB308" />;
// // // // // // // // // // //   if (c.includes('shopping') || c.includes('spend')) return <ShoppingBag size={20} color="#3b82f6" />;
// // // // // // // // // // //   if (c.includes('home') || c.includes('rent')) return <Home size={20} color="#a855f7" />;
// // // // // // // // // // //   if (c.includes('car') || c.includes('travel')) return <Car size={20} color="#22c55e" />;
// // // // // // // // // // //   return <Zap size={20} color="$gray11" />;
// // // // // // // // // // // }



// // // // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // // // import {
// // // // // // // // // //   ScrollView,
// // // // // // // // // //   RefreshControl,
// // // // // // // // // //   TouchableOpacity,
// // // // // // // // // //   Alert,
// // // // // // // // // //   Modal,
// // // // // // // // // //   KeyboardAvoidingView,
// // // // // // // // // //   Platform,
// // // // // // // // // //   Dimensions
// // // // // // // // // // } from 'react-native';
// // // // // // // // // // import {
// // // // // // // // // //   YStack,
// // // // // // // // // //   XStack,
// // // // // // // // // //   Text,
// // // // // // // // // //   H2,
// // // // // // // // // //   H4,
// // // // // // // // // //   Theme,
// // // // // // // // // //   Spinner,
// // // // // // // // // //   Button,
// // // // // // // // // //   Card,
// // // // // // // // // //   Input,
// // // // // // // // // //   TextArea,
// // // // // // // // // //   Select,
// // // // // // // // // //   Separator
// // // // // // // // // // } from 'tamagui';
// // // // // // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // // // // // import { BlurView } from 'expo-blur';
// // // // // // // // // // import {
// // // // // // // // // //   X,
// // // // // // // // // //   Trash2,
// // // // // // // // // //   CreditCard,
// // // // // // // // // //   TrendingUp,
// // // // // // // // // //   Plus,
// // // // // // // // // //   Calendar,
// // // // // // // // // //   CheckCircle,
// // // // // // // // // //   AlertCircle,
// // // // // // // // // //   DollarSign,
// // // // // // // // // //   ArrowLeft,
// // // // // // // // // //   Filter,
// // // // // // // // // //   Search,
// // // // // // // // // //   ShoppingBag,
// // // // // // // // // //   Coffee,
// // // // // // // // // //   Car,
// // // // // // // // // //   Home,
// // // // // // // // // //   Zap,
// // // // // // // // // //   MoreVertical
// // // // // // // // // // } from '@tamagui/lucide-icons';

// // // // // // // // // // import { useRouter, useFocusEffect } from 'expo-router';
// // // // // // // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // // // // // // // import DateTimePicker from '@react-native-community/datetimepicker';

// // // // // // // // // // // Services
// // // // // // // // // // import { ApiService } from '../../../services/apiService';

// // // // // // // // // // const { width } = Dimensions.get('window');

// // // // // // // // // // export default function TransactionsLedger() {
// // // // // // // // // //   const router = useRouter();
// // // // // // // // // //   const insets = useSafeAreaInsets();

// // // // // // // // // //   // --- STATE ---
// // // // // // // // // //   const [transactions, setTransactions] = useState([]);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [refreshing, setRefreshing] = useState(false);
// // // // // // // // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // // // // // // // //   const [showDatePicker, setShowDatePicker] = useState(false);

// // // // // // // // // //   // --- FORM STATE (Matches POST /api/v1/transactions/ Schema) ---
// // // // // // // // // //   const [form, setForm] = useState({
// // // // // // // // // //     amount: '',
// // // // // // // // // //     currency: 'INR',
// // // // // // // // // //     occurred_at: new Date(),
// // // // // // // // // //     category_id: 'general', // You would typically fetch category IDs from a categories API
// // // // // // // // // //     merchant_raw: '',
// // // // // // // // // //     description: '',
// // // // // // // // // //     source: 'manual'
// // // // // // // // // //   });

// // // // // // // // // //   // --- DATA FETCHING ---
// // // // // // // // // //   const fetchTransactions = useCallback(async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       setLoading(true);
// // // // // // // // // //       const response = await ApiService.getTransactions();
// // // // // // // // // //       setTransactions(response.data || []);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Ledger fetch error:', error);
// // // // // // // // // //       // Fallback/Mock data if backend is empty
// // // // // // // // // //     } finally {
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //       setRefreshing(false);
// // // // // // // // // //     }
// // // // // // // // // //   }, []);

// // // // // // // // // //   useFocusEffect(
// // // // // // // // // //     useCallback(() => {
// // // // // // // // // //       fetchTransactions();
// // // // // // // // // //     }, [fetchTransactions])
// // // // // // // // // //   );

// // // // // // // // // //   const onRefresh = () => {
// // // // // // // // // //     setRefreshing(true);
// // // // // // // // // //     fetchTransactions();
// // // // // // // // // //   };

// // // // // // // // // //   // --- ACTIONS ---
// // // // // // // // // //   const handleCreateTransaction = async () => {
// // // // // // // // // //     if (!form.amount || !form.description) {
// // // // // // // // // //       Alert.alert('Missing Data', 'Please enter an amount and description.');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     try {
// // // // // // // // // //       setLoading(true);
// // // // // // // // // //       const payload = {
// // // // // // // // // //         ...form,
// // // // // // // // // //         amount: parseFloat(form.amount),
// // // // // // // // // //         occurred_at: form.occurred_at.toISOString(),
// // // // // // // // // //       };

// // // // // // // // // //       await ApiService.createTransaction(payload);
// // // // // // // // // //       setShowAddModal(false);
// // // // // // // // // //       setForm({ amount: '', currency: 'INR', occurred_at: new Date(), category_id: 'general', merchant_raw: '', description: '', source: 'manual' });
// // // // // // // // // //       fetchTransactions();
// // // // // // // // // //       Alert.alert('Success', 'Transaction recorded in ledger.');
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Create error:', error);
// // // // // // // // // //       Alert.alert('Error', 'Failed to save transaction.');
// // // // // // // // // //     } finally {
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const formatCurrency = (amount) =>
// // // // // // // // // //     new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);

// // // // // // // // // //   return (
// // // // // // // // // //     <Theme name="dark">
// // // // // // // // // //       <LinearGradient colors={['#000000', '#0A0A0A', '#111111']} style={{ flex: 1 }}>
// // // // // // // // // //         <SafeAreaView style={{ flex: 1 }}>
// // // // // // // // // //           <ScrollView
// // // // // // // // // //             stickyHeaderIndices={[0]}
// // // // // // // // // //             showsVerticalScrollIndicator={false}
// // // // // // // // // //             refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#EAB308" />}
// // // // // // // // // //           >
// // // // // // // // // //             {/* 1. HEADER LAYER */}
// // // // // // // // // //             <XStack p="$4" jc="space-between" ai="center" bg="rgba(0,0,0,0.8)">
// // // // // // // // // //               <TouchableOpacity onPress={() => router.back()}>
// // // // // // // // // //                 <ArrowLeft size={24} color="white" />
// // // // // // // // // //               </TouchableOpacity>
// // // // // // // // // //               <YStack ai="center">
// // // // // // // // // //                 <Text color="#EAB308" fontSize={10} fontWeight="900" ls={3}>LEDGER PROTOCOL</Text>
// // // // // // // // // //                 <H4 color="white" fontWeight="800">Verified Truth</H4>
// // // // // // // // // //               </YStack>
// // // // // // // // // //               <TouchableOpacity onPress={() => setShowAddModal(true)}>
// // // // // // // // // //                 <LinearGradient colors={['#EAB308', '#CA8A04']} style={{ padding: 10, borderRadius: 12 }}>
// // // // // // // // // //                   <Plus size={20} color="black" />
// // // // // // // // // //                 </LinearGradient>
// // // // // // // // // //               </TouchableOpacity>
// // // // // // // // // //             </XStack>

// // // // // // // // // //             <YStack p="$4" space="$5">
// // // // // // // // // //               {/* 2. SUMMARY CARD */}
// // // // // // // // // //               <Card p="$5" br="$6" bw={1} bc="rgba(255,255,255,0.05)" bg="rgba(255,255,255,0.02)">
// // // // // // // // // //                 <XStack jc="space-between" ai="center">
// // // // // // // // // //                   <YStack>
// // // // // // // // // //                     <Text color="$gray11" fontSize={12} fontWeight="700">TOTAL OUTFLOW (MONTH)</Text>
// // // // // // // // // //                     <H2 color="white" fontWeight="900" mt="$1">
// // // // // // // // // //                       {formatCurrency(transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0))}
// // // // // // // // // //                     </H2>
// // // // // // // // // //                   </YStack>
// // // // // // // // // //                   <YStack p="$3" br="$4" bg="rgba(239, 68, 68, 0.1)">
// // // // // // // // // //                     <TrendingUp size={24} color="#ef4444" rotate="180deg" />
// // // // // // // // // //                   </YStack>
// // // // // // // // // //                 </XStack>
// // // // // // // // // //               </Card>

// // // // // // // // // //               {/* 3. TRANSACTION LIST */}
// // // // // // // // // //               <YStack space="$3">
// // // // // // // // // //                 <XStack jc="space-between" ai="center" mb="$2">
// // // // // // // // // //                   <H4 color="white" fontWeight="800" fontSize={18}>History</H4>
// // // // // // // // // //                   <XStack space="$2">
// // // // // // // // // //                     <Filter size={18} color="$gray10" />
// // // // // // // // // //                     <Search size={18} color="$gray10" />
// // // // // // // // // //                   </XStack>
// // // // // // // // // //                 </XStack>

// // // // // // // // // //                 {loading && !refreshing ? (
// // // // // // // // // //                   <Spinner size="large" color="#EAB308" py="$10" />
// // // // // // // // // //                 ) : transactions.length > 0 ? (
// // // // // // // // // //                   transactions.map((item, index) => (
// // // // // // // // // //                     <Card key={item.id || index} p="$4" br="$4" bw={1} bc="rgba(255,255,255,0.05)" bg="#080808">
// // // // // // // // // //                       <XStack jc="space-between" ai="center">
// // // // // // // // // //                         <XStack space="$4" ai="center">
// // // // // // // // // //                           <YStack p="$2.5" br="$3" bg="#111" bc="#222" bw={1}>
// // // // // // // // // //                             {getCategoryIcon(item.category_id)}
// // // // // // // // // //                           </YStack>
// // // // // // // // // //                           <YStack>
// // // // // // // // // //                             <Text color="white" fontWeight="700" fontSize={16}>{item.description}</Text>
// // // // // // // // // //                             <Text color="$gray11" fontSize={12}>
// // // // // // // // // //                               {item.merchant_raw || 'Manual Entry'} • {new Date(item.occurred_at).toLocaleDateString()}
// // // // // // // // // //                             </Text>
// // // // // // // // // //                           </YStack>
// // // // // // // // // //                         </XStack>
// // // // // // // // // //                         <YStack ai="flex-end">
// // // // // // // // // //                           <Text color="white" fontWeight="800" fontSize={16}>
// // // // // // // // // //                             -{formatCurrency(item.amount)}
// // // // // // // // // //                           </Text>
// // // // // // // // // //                           <Text color={item.source === 'manual' ? '$blue10' : '$gold10'} fontSize={10} fontWeight="700">
// // // // // // // // // //                             {item.source.toUpperCase()}
// // // // // // // // // //                           </Text>
// // // // // // // // // //                         </YStack>
// // // // // // // // // //                       </XStack>
// // // // // // // // // //                     </Card>
// // // // // // // // // //                   ))
// // // // // // // // // //                 ) : (
// // // // // // // // // //                   <YStack ai="center" py="$10" space="$3">
// // // // // // // // // //                     <CheckCircle size={48} color="$gray5" />
// // // // // // // // // //                     <Text color="$gray10" textAlign="center">No verified transactions yet.{"\n"}Manual entries appear here instantly.</Text>
// // // // // // // // // //                   </YStack>
// // // // // // // // // //                 )}
// // // // // // // // // //               </YStack>
// // // // // // // // // //             </YStack>
// // // // // // // // // //           </ScrollView>

// // // // // // // // // //           {/* 4. ADD TRANSACTION MODAL */}
// // // // // // // // // //           <Modal visible={showAddModal} animationType="slide" transparent={true}>
// // // // // // // // // //             <BlurView intensity={100} tint="dark" style={{ flex: 1, justifyContent: 'flex-end' }}>
// // // // // // // // // //               <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
// // // // // // // // // //                 <YStack bg="#0A0A0A" p="$5" pt="$2" borderTopLeftRadius={24} borderTopRightRadius={24} bw={1} bc="#222">
// // // // // // // // // //                   <Separator w={40} h={4} br={2} alignSelf="center" bg="$gray8" m="$4" />
                  
// // // // // // // // // //                   <XStack jc="space-between" ai="center" mb="$6">
// // // // // // // // // //                     <H4 color="white" fontWeight="900">Record Transaction</H4>
// // // // // // // // // //                     <TouchableOpacity onPress={() => setShowAddModal(false)}>
// // // // // // // // // //                       <X size={24} color="$gray10" />
// // // // // // // // // //                     </TouchableOpacity>
// // // // // // // // // //                   </XStack>

// // // // // // // // // //                   <YStack space="$4" pb={insets.bottom + 20}>
// // // // // // // // // //                     <YStack>
// // // // // // // // // //                       <Text color="$gray11" fontSize={12} fontWeight="800" mb="$2">AMOUNT</Text>
// // // // // // // // // //                       <XStack ai="center" space="$2">
// // // // // // // // // //                         <H2 color="#EAB308">₹</H2>
// // // // // // // // // //                         <Input
// // // // // // // // // //                           f={1} h={60} fontSize={32} fontWeight="900" color="white" bw={0} bbw={2} bc="#333" focusStyle={{ bc: '#EAB308' }}
// // // // // // // // // //                           placeholder="0.00" keyboardType="decimal-pad" value={form.amount} onChangeText={(t) => setForm({...form, amount: t})}
// // // // // // // // // //                         />
// // // // // // // // // //                       </XStack>
// // // // // // // // // //                     </YStack>

// // // // // // // // // //                     <YStack>
// // // // // // // // // //                       <Text color="$gray11" fontSize={12} fontWeight="800" mb="$2">DESCRIPTION</Text>
// // // // // // // // // //                       <Input
// // // // // // // // // //                         bg="#111" bc="#222" color="white" h={50} placeholder="e.g. Dinner with Friends"
// // // // // // // // // //                         value={form.description} onChangeText={(t) => setForm({...form, description: t})}
// // // // // // // // // //                       />
// // // // // // // // // //                     </YStack>

// // // // // // // // // //                     <XStack space="$4">
// // // // // // // // // //                       <YStack f={1}>
// // // // // // // // // //                         <Text color="$gray11" fontSize={12} fontWeight="800" mb="$2">DATE</Text>
// // // // // // // // // //                         <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ backgroundColor: '#111', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#222' }}>
// // // // // // // // // //                           <XStack ai="center" space="$2">
// // // // // // // // // //                             <Calendar size={16} color="#EAB308" />
// // // // // // // // // //                             <Text color="white">{form.occurred_at.toLocaleDateString()}</Text>
// // // // // // // // // //                           </XStack>
// // // // // // // // // //                         </TouchableOpacity>
// // // // // // // // // //                       </YStack>
// // // // // // // // // //                     </XStack>

// // // // // // // // // //                     <Button 
// // // // // // // // // //                       bg="$gold10" color="black" fontWeight="800" h={55} br="$4" mt="$4"
// // // // // // // // // //                       onPress={handleCreateTransaction} icon={loading ? <Spinner color="black" /> : null}
// // // // // // // // // //                     >
// // // // // // // // // //                       COMMIT TO LEDGER
// // // // // // // // // //                     </Button>
// // // // // // // // // //                   </YStack>
// // // // // // // // // //                 </YStack>
// // // // // // // // // //               </KeyboardAvoidingView>
// // // // // // // // // //             </BlurView>
            
// // // // // // // // // //             {showDatePicker && (
// // // // // // // // // //               <DateTimePicker
// // // // // // // // // //                 value={form.occurred_at}
// // // // // // // // // //                 mode="date"
// // // // // // // // // //                 display="default"
// // // // // // // // // //                 onChange={(event, date) => {
// // // // // // // // // //                   setShowDatePicker(false);
// // // // // // // // // //                   if (date) setForm({...form, occurred_at: date});
// // // // // // // // // //                 }}
// // // // // // // // // //               />
// // // // // // // // // //             )}
// // // // // // // // // //           </Modal>
// // // // // // // // // //         </SafeAreaView>
// // // // // // // // // //       </LinearGradient>
// // // // // // // // // //     </Theme>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // // --- ICON HELPER ---
// // // // // // // // // // function getCategoryIcon(id) {
// // // // // // // // // //   const c = id?.toLowerCase() || '';
// // // // // // // // // //   if (c.includes('food')) return <Coffee size={20} color="#EAB308" />;
// // // // // // // // // //   if (c.includes('shop')) return <ShoppingBag size={20} color="#3b82f6" />;
// // // // // // // // // //   if (c.includes('rent')) return <Home size={20} color="#a855f7" />;
// // // // // // // // // //   if (c.includes('travel')) return <Car size={20} color="#22c55e" />;
// // // // // // // // // //   return <Zap size={20} color="$gray11" />;
// // // // // // // // // // }



// // // // // // // // // // app/(drawer)/(tabs)/transactions.jsx
// // // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // // import {
// // // // // // // // //   ScrollView,
// // // // // // // // //   TouchableOpacity,
// // // // // // // // //   Alert,
// // // // // // // // //   Modal,
// // // // // // // // //   FlatList,
// // // // // // // // //   View
// // // // // // // // // } from 'react-native';
// // // // // // // // // import {
// // // // // // // // //   YStack,
// // // // // // // // //   XStack,
// // // // // // // // //   Text,
// // // // // // // // //   H2,
// // // // // // // // //   H4,
// // // // // // // // //   Theme,
// // // // // // // // //   Spinner,
// // // // // // // // //   Input,
// // // // // // // // //   Button,
// // // // // // // // //   Card
// // // // // // // // // } from 'tamagui';
// // // // // // // // // import {
// // // // // // // // //   ArrowLeft,
// // // // // // // // //   Plus,
// // // // // // // // //   Filter,
// // // // // // // // //   Search,
// // // // // // // // //   Calendar,
// // // // // // // // //   Tag,
// // // // // // // // //   DollarSign,
// // // // // // // // //   Edit3,
// // // // // // // // //   Trash2,
// // // // // // // // //   X,
// // // // // // // // //   TrendingUp,
// // // // // // // // //   TrendingDown
// // // // // // // // // } from '@tamagui/lucide-icons';
// // // // // // // // // import { useRouter, useFocusEffect } from 'expo-router';
// // // // // // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // // // // // // import DateTimePicker from '@react-native-community/datetimepicker';

// // // // // // // // // // Services
// // // // // // // // // import { ApiService } from '../../../services/apiService';

// // // // // // // // // export default function Transactions() {
// // // // // // // // //   const router = useRouter();
// // // // // // // // //   const insets = useSafeAreaInsets();
  
// // // // // // // // //   // State
// // // // // // // // //   const [transactions, setTransactions] = useState([]);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // // // // // //   const [showAddModal, setShowAddModal] = useState(false);
  
// // // // // // // // //   // Form state
// // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // //     amount: '',
// // // // // // // // //     description: '',
// // // // // // // // //     category: '',
// // // // // // // // //     date: new Date(),
// // // // // // // // //     type: 'expense'
// // // // // // // // //   });

// // // // // // // // //   // Categories
// // // // // // // // //   const categories = [
// // // // // // // // //     'Food & Dining',
// // // // // // // // //     'Shopping',
// // // // // // // // //     'Transportation',
// // // // // // // // //     'Entertainment',
// // // // // // // // //     'Healthcare',
// // // // // // // // //     'Bills & Utilities',
// // // // // // // // //     'Education',
// // // // // // // // //     'Travel',
// // // // // // // // //     'Investments',
// // // // // // // // //     'Income',
// // // // // // // // //     'Other'
// // // // // // // // //   ];

// // // // // // // // //   // Fetch transactions
// // // // // // // // //   const fetchTransactions = useCallback(async () => {
// // // // // // // // //     try {
// // // // // // // // //       setLoading(true);
// // // // // // // // //       const response = await ApiService.getTransactions();
// // // // // // // // //       setTransactions(response.data || []);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Fetch transactions error:', error);
// // // // // // // // //       Alert.alert('Error', 'Failed to load transactions');
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   }, []);

// // // // // // // // //   useFocusEffect(
// // // // // // // // //     useCallback(() => {
// // // // // // // // //       fetchTransactions();
// // // // // // // // //     }, [fetchTransactions])
// // // // // // // // //   );

// // // // // // // // //   // Add transaction
// // // // // // // // //   const handleAddTransaction = async () => {
// // // // // // // // //     try {
// // // // // // // // //       if (!formData.amount || !formData.description || !formData.category) {
// // // // // // // // //         Alert.alert('Error', 'Please fill all required fields');
// // // // // // // // //         return;
// // // // // // // // //       }

// // // // // // // // //       const transactionData = {
// // // // // // // // //         amount: parseFloat(formData.amount),
// // // // // // // // //         description: formData.description.trim(),
// // // // // // // // //         category: formData.category,
// // // // // // // // //         date: formData.date.toISOString().split('T')[0],
// // // // // // // // //         type: formData.type
// // // // // // // // //       };

// // // // // // // // //       await ApiService.createTransaction(transactionData);
      
// // // // // // // // //       setShowAddModal(false);
// // // // // // // // //       resetForm();
// // // // // // // // //       fetchTransactions();
// // // // // // // // //       Alert.alert('Success', 'Transaction added successfully');
      
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Add transaction error:', error);
// // // // // // // // //       Alert.alert('Error', 'Failed to add transaction');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Delete transaction
// // // // // // // // //   const handleDeleteTransaction = async (id) => {
// // // // // // // // //     Alert.alert(
// // // // // // // // //       'Delete Transaction',
// // // // // // // // //       'Are you sure you want to delete this transaction?',
// // // // // // // // //       [
// // // // // // // // //         { text: 'Cancel', style: 'cancel' },
// // // // // // // // //         { 
// // // // // // // // //           text: 'Delete', 
// // // // // // // // //           style: 'destructive',
// // // // // // // // //           onPress: async () => {
// // // // // // // // //             try {
// // // // // // // // //               await ApiService.updateTransaction(id, { status: 'deleted' });
// // // // // // // // //               fetchTransactions();
// // // // // // // // //               Alert.alert('Success', 'Transaction deleted');
// // // // // // // // //             } catch (error) {
// // // // // // // // //               console.error('Delete error:', error);
// // // // // // // // //               Alert.alert('Error', 'Failed to delete transaction');
// // // // // // // // //             }
// // // // // // // // //           }
// // // // // // // // //         }
// // // // // // // // //       ]
// // // // // // // // //     );
// // // // // // // // //   };

// // // // // // // // //   // Reset form
// // // // // // // // //   const resetForm = () => {
// // // // // // // // //     setFormData({
// // // // // // // // //       amount: '',
// // // // // // // // //       description: '',
// // // // // // // // //       category: '',
// // // // // // // // //       date: new Date(),
// // // // // // // // //       type: 'expense'
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   // Filter transactions
// // // // // // // // //   const filteredTransactions = transactions.filter(txn => {
// // // // // // // // //     const matchesSearch = !searchQuery || 
// // // // // // // // //       txn.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // // // // // //       txn.category?.toLowerCase().includes(searchQuery.toLowerCase());
// // // // // // // // //     return matchesSearch;
// // // // // // // // //   });

// // // // // // // // //   const formatCurrency = (amount) =>
// // // // // // // // //     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount || 0);

// // // // // // // // //   const formatDate = (dateString) => {
// // // // // // // // //     if (!dateString) return 'N/A';
// // // // // // // // //     return new Date(dateString).toLocaleDateString('en-IN', {
// // // // // // // // //       day: 'numeric',
// // // // // // // // //       month: 'short',
// // // // // // // // //       year: 'numeric'
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   const getCategoryColor = (category) => {
// // // // // // // // //     const colors = {
// // // // // // // // //       'Food & Dining': '#EF4444',
// // // // // // // // //       'Shopping': '#8B5CF6',
// // // // // // // // //       'Transportation': '#3B82F6',
// // // // // // // // //       'Entertainment': '#EC4899',
// // // // // // // // //       'Healthcare': '#10B981',
// // // // // // // // //       'Bills & Utilities': '#F59E0B',
// // // // // // // // //       'Education': '#06B6D4',
// // // // // // // // //       'Travel': '#F97316',
// // // // // // // // //       'Investments': '#22C55E',
// // // // // // // // //       'Income': '#84CC16',
// // // // // // // // //       'Other': '#64748B'
// // // // // // // // //     };
// // // // // // // // //     return colors[category] || '#64748B';
// // // // // // // // //   };

// // // // // // // // //   if (loading && !transactions.length) {
// // // // // // // // //     return (
// // // // // // // // //       <Theme name="dark">
// // // // // // // // //         <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // // // // // // // //           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // // // // // // // //             <Spinner size="large" color="#EAB308" />
// // // // // // // // //             <Text color="white" mt={16}>Loading transactions...</Text>
// // // // // // // // //           </View>
// // // // // // // // //         </SafeAreaView>
// // // // // // // // //       </Theme>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <Theme name="dark">
// // // // // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // // // // // // // //         {/* HEADER */}
// // // // // // // // //         <XStack p={20} ai="center" space={16}>
// // // // // // // // //           <TouchableOpacity onPress={() => router.back()}>
// // // // // // // // //             <ArrowLeft size={24} color="#EAB308" />
// // // // // // // // //           </TouchableOpacity>
          
// // // // // // // // //           <YStack flex={1}>
// // // // // // // // //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
// // // // // // // // //               Transactions
// // // // // // // // //             </H2>
// // // // // // // // //             <Text color="#666666" fontSize={14}>
// // // // // // // // //               Verified money movements
// // // // // // // // //             </Text>
// // // // // // // // //           </YStack>
          
// // // // // // // // //           <TouchableOpacity 
// // // // // // // // //             onPress={() => setShowAddModal(true)}
// // // // // // // // //             style={{
// // // // // // // // //               width: 44,
// // // // // // // // //               height: 44,
// // // // // // // // //               borderRadius: 22,
// // // // // // // // //               backgroundColor: '#1A1A1A',
// // // // // // // // //               justifyContent: 'center',
// // // // // // // // //               alignItems: 'center',
// // // // // // // // //               borderWidth: 1,
// // // // // // // // //               borderColor: '#EAB308',
// // // // // // // // //             }}
// // // // // // // // //           >
// // // // // // // // //             <Plus size={20} color="#EAB308" />
// // // // // // // // //           </TouchableOpacity>
// // // // // // // // //         </XStack>

// // // // // // // // //         {/* SEARCH */}
// // // // // // // // //         <XStack p={20} pb={0}>
// // // // // // // // //           <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 12 }}>
// // // // // // // // //             <Search size={16} color="#666666" />
// // // // // // // // //             <Input
// // // // // // // // //               placeholder="Search transactions..."
// // // // // // // // //               value={searchQuery}
// // // // // // // // //               onChangeText={setSearchQuery}
// // // // // // // // //               backgroundColor="transparent"
// // // // // // // // //               borderWidth={0}
// // // // // // // // //               color="white"
// // // // // // // // //               placeholderTextColor="#666666"
// // // // // // // // //               fontSize={14}
// // // // // // // // //               flex={1}
// // // // // // // // //             />
// // // // // // // // //           </View>
// // // // // // // // //         </XStack>

// // // // // // // // //         {/* TRANSACTIONS LIST */}
// // // // // // // // //         <FlatList
// // // // // // // // //           data={filteredTransactions}
// // // // // // // // //           keyExtractor={(item, index) => item.id || index.toString()}
// // // // // // // // //           contentContainerStyle={{ padding: 20 }}
// // // // // // // // //           showsVerticalScrollIndicator={false}
// // // // // // // // //           ListEmptyComponent={
// // // // // // // // //             <YStack ai="center" py={48}>
// // // // // // // // //               <DollarSign size={64} color="#333333" />
// // // // // // // // //               <Text color="#666666" fontSize={16} mt={16}>
// // // // // // // // //                 No transactions yet
// // // // // // // // //               </Text>
// // // // // // // // //               <Text color="#444444" fontSize={14} mt={8}>
// // // // // // // // //                 Add your first transaction
// // // // // // // // //               </Text>
// // // // // // // // //             </YStack>
// // // // // // // // //           }
// // // // // // // // //           renderItem={({ item }) => (
// // // // // // // // //             <Card 
// // // // // // // // //               backgroundColor="#1A1A1A" 
// // // // // // // // //               mb={12} 
// // // // // // // // //               p={16} 
// // // // // // // // //               borderRadius={12}
// // // // // // // // //               borderLeftWidth={4}
// // // // // // // // //               borderLeftColor={getCategoryColor(item.category)}
// // // // // // // // //             >
// // // // // // // // //               <XStack jc="space-between" ai="center" mb={8}>
// // // // // // // // //                 <YStack flex={1}>
// // // // // // // // //                   <Text color="white" fontWeight="800" fontSize={16} numberOfLines={1}>
// // // // // // // // //                     {item.description}
// // // // // // // // //                   </Text>
// // // // // // // // //                   <XStack ai="center" space={8} mt={4}>
// // // // // // // // //                     <Text color="#666666" fontSize={12}>
// // // // // // // // //                       {formatDate(item.date)}
// // // // // // // // //                     </Text>
// // // // // // // // //                     <View style={{
// // // // // // // // //                       backgroundColor: getCategoryColor(item.category) + '20',
// // // // // // // // //                       paddingHorizontal: 8,
// // // // // // // // //                       paddingVertical: 2,
// // // // // // // // //                       borderRadius: 4,
// // // // // // // // //                     }}>
// // // // // // // // //                       <Text color={getCategoryColor(item.category)} fontSize={10} fontWeight="700">
// // // // // // // // //                         {item.category}
// // // // // // // // //                       </Text>
// // // // // // // // //                     </View>
// // // // // // // // //                   </XStack>
// // // // // // // // //                 </YStack>
                
// // // // // // // // //                 <XStack ai="center" space={12}>
// // // // // // // // //                   <Text 
// // // // // // // // //                     color={item.type === 'income' ? "#22C55E" : "#EF4444"} 
// // // // // // // // //                     fontWeight="800" 
// // // // // // // // //                     fontSize={16}
// // // // // // // // //                   >
// // // // // // // // //                     {item.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(item.amount))}
// // // // // // // // //                   </Text>
                  
// // // // // // // // //                   <XStack space={8}>
// // // // // // // // //                     <TouchableOpacity onPress={() => router.push(`/transactions/${item.id}/edit`)}>
// // // // // // // // //                       <Edit3 size={16} color="#666666" />
// // // // // // // // //                     </TouchableOpacity>
// // // // // // // // //                     <TouchableOpacity onPress={() => handleDeleteTransaction(item.id)}>
// // // // // // // // //                       <Trash2 size={16} color="#EF4444" />
// // // // // // // // //                     </TouchableOpacity>
// // // // // // // // //                   </XStack>
// // // // // // // // //                 </XStack>
// // // // // // // // //               </XStack>
// // // // // // // // //             </Card>
// // // // // // // // //           )}
// // // // // // // // //         />

// // // // // // // // //         {/* ADD TRANSACTION MODAL */}
// // // // // // // // //         <Modal
// // // // // // // // //           visible={showAddModal}
// // // // // // // // //           animationType="slide"
// // // // // // // // //           transparent={true}
// // // // // // // // //           onRequestClose={() => setShowAddModal(false)}
// // // // // // // // //         >
// // // // // // // // //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
// // // // // // // // //             <View style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 20 }}>
// // // // // // // // //               <XStack jc="space-between" ai="center" mb={24}>
// // // // // // // // //                 <H4 color="white" fontWeight="800" fontSize={20}>
// // // // // // // // //                   Add Transaction
// // // // // // // // //                 </H4>
// // // // // // // // //                 <TouchableOpacity onPress={() => setShowAddModal(false)}>
// // // // // // // // //                   <X size={24} color="#666666" />
// // // // // // // // //                 </TouchableOpacity>
// // // // // // // // //               </XStack>

// // // // // // // // //               <YStack space={16}>
// // // // // // // // //                 {/* Type Selection */}
// // // // // // // // //                 <XStack space={12}>
// // // // // // // // //                   <TouchableOpacity
// // // // // // // // //                     onPress={() => setFormData({...formData, type: 'income'})}
// // // // // // // // //                     style={{
// // // // // // // // //                       flex: 1,
// // // // // // // // //                       padding: 16,
// // // // // // // // //                       backgroundColor: formData.type === 'income' ? '#22C55E20' : '#333333',
// // // // // // // // //                       borderRadius: 12,
// // // // // // // // //                       alignItems: 'center',
// // // // // // // // //                       borderWidth: 1,
// // // // // // // // //                       borderColor: formData.type === 'income' ? '#22C55E' : '#444444',
// // // // // // // // //                     }}
// // // // // // // // //                   >
// // // // // // // // //                     <TrendingUp size={20} color={formData.type === 'income' ? '#22C55E' : '#666666'} />
// // // // // // // // //                     <Text color={formData.type === 'income' ? '#22C55E' : '#666666'} fontSize={14} fontWeight="700" mt={8}>
// // // // // // // // //                       Income
// // // // // // // // //                     </Text>
// // // // // // // // //                   </TouchableOpacity>
                  
// // // // // // // // //                   <TouchableOpacity
// // // // // // // // //                     onPress={() => setFormData({...formData, type: 'expense'})}
// // // // // // // // //                     style={{
// // // // // // // // //                       flex: 1,
// // // // // // // // //                       padding: 16,
// // // // // // // // //                       backgroundColor: formData.type === 'expense' ? '#EF444420' : '#333333',
// // // // // // // // //                       borderRadius: 12,
// // // // // // // // //                       alignItems: 'center',
// // // // // // // // //                       borderWidth: 1,
// // // // // // // // //                       borderColor: formData.type === 'expense' ? '#EF4444' : '#444444',
// // // // // // // // //                     }}
// // // // // // // // //                   >
// // // // // // // // //                     <TrendingDown size={20} color={formData.type === 'expense' ? '#EF4444' : '#666666'} />
// // // // // // // // //                     <Text color={formData.type === 'expense' ? '#EF4444' : '#666666'} fontSize={14} fontWeight="700" mt={8}>
// // // // // // // // //                       Expense
// // // // // // // // //                     </Text>
// // // // // // // // //                   </TouchableOpacity>
// // // // // // // // //                 </XStack>

// // // // // // // // //                 {/* Amount */}
// // // // // // // // //                 <YStack>
// // // // // // // // //                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // // // //                     Amount (₹)
// // // // // // // // //                   </Text>
// // // // // // // // //                   <Input
// // // // // // // // //                     placeholder="0.00"
// // // // // // // // //                     value={formData.amount}
// // // // // // // // //                     onChangeText={(text) => setFormData({...formData, amount: text})}
// // // // // // // // //                     backgroundColor="#333333"
// // // // // // // // //                     borderColor="#444444"
// // // // // // // // //                     color="white"
// // // // // // // // //                     placeholderTextColor="#666666"
// // // // // // // // //                     keyboardType="decimal-pad"
// // // // // // // // //                     fontSize={16}
// // // // // // // // //                   />
// // // // // // // // //                 </YStack>

// // // // // // // // //                 {/* Description */}
// // // // // // // // //                 <YStack>
// // // // // // // // //                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // // // //                     Description
// // // // // // // // //                   </Text>
// // // // // // // // //                   <Input
// // // // // // // // //                     placeholder="What was this for?"
// // // // // // // // //                     value={formData.description}
// // // // // // // // //                     onChangeText={(text) => setFormData({...formData, description: text})}
// // // // // // // // //                     backgroundColor="#333333"
// // // // // // // // //                     borderColor="#444444"
// // // // // // // // //                     color="white"
// // // // // // // // //                     placeholderTextColor="#666666"
// // // // // // // // //                     fontSize={16}
// // // // // // // // //                   />
// // // // // // // // //                 </YStack>

// // // // // // // // //                 {/* Category */}
// // // // // // // // //                 <YStack>
// // // // // // // // //                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // // // //                     Category
// // // // // // // // //                   </Text>
// // // // // // // // //                   <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
// // // // // // // // //                     {categories.slice(0, 6).map(category => (
// // // // // // // // //                       <TouchableOpacity
// // // // // // // // //                         key={category}
// // // // // // // // //                         onPress={() => setFormData({...formData, category})}
// // // // // // // // //                         style={{
// // // // // // // // //                           paddingHorizontal: 12,
// // // // // // // // //                           paddingVertical: 8,
// // // // // // // // //                           backgroundColor: formData.category === category ? getCategoryColor(category) + '20' : '#333333',
// // // // // // // // //                           borderRadius: 8,
// // // // // // // // //                           borderWidth: 1,
// // // // // // // // //                           borderColor: formData.category === category ? getCategoryColor(category) : '#444444',
// // // // // // // // //                         }}
// // // // // // // // //                       >
// // // // // // // // //                         <Text color={formData.category === category ? getCategoryColor(category) : '#666666'} fontSize={12} fontWeight="700">
// // // // // // // // //                           {category}
// // // // // // // // //                         </Text>
// // // // // // // // //                       </TouchableOpacity>
// // // // // // // // //                     ))}
// // // // // // // // //                   </View>
// // // // // // // // //                 </YStack>

// // // // // // // // //                 {/* Date */}
// // // // // // // // //                 <YStack>
// // // // // // // // //                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // // // //                     Date
// // // // // // // // //                   </Text>
// // // // // // // // //                   <TouchableOpacity
// // // // // // // // //                     onPress={() => {
// // // // // // // // //                       // Show date picker
// // // // // // // // //                     }}
// // // // // // // // //                     style={{
// // // // // // // // //                       padding: 16,
// // // // // // // // //                       backgroundColor: '#333333',
// // // // // // // // //                       borderRadius: 12,
// // // // // // // // //                       borderWidth: 1,
// // // // // // // // //                       borderColor: '#444444',
// // // // // // // // //                     }}
// // // // // // // // //                   >
// // // // // // // // //                     <Text color="white" fontSize={16}>
// // // // // // // // //                       {formData.date.toLocaleDateString('en-IN')}
// // // // // // // // //                     </Text>
// // // // // // // // //                   </TouchableOpacity>
// // // // // // // // //                 </YStack>

// // // // // // // // //                 {/* Submit Button */}
// // // // // // // // //                 <TouchableOpacity
// // // // // // // // //                   onPress={handleAddTransaction}
// // // // // // // // //                   style={{
// // // // // // // // //                     backgroundColor: '#EAB308',
// // // // // // // // //                     padding: 16,
// // // // // // // // //                     borderRadius: 12,
// // // // // // // // //                     alignItems: 'center',
// // // // // // // // //                     marginTop: 8,
// // // // // // // // //                   }}
// // // // // // // // //                 >
// // // // // // // // //                   <Text color="black" fontSize={16} fontWeight="800">
// // // // // // // // //                     Add Transaction
// // // // // // // // //                   </Text>
// // // // // // // // //                 </TouchableOpacity>
// // // // // // // // //               </YStack>
// // // // // // // // //             </View>
// // // // // // // // //           </View>
// // // // // // // // //         </Modal>
// // // // // // // // //       </SafeAreaView>
// // // // // // // // //     </Theme>
// // // // // // // // //   );
// // // // // // // // // }



// // // // // // // // // app/(drawer)/(tabs)/transactions.jsx
// // // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // // import {
// // // // // // // //   ScrollView,
// // // // // // // //   TouchableOpacity,
// // // // // // // //   Alert,
// // // // // // // //   Modal,
// // // // // // // //   FlatList,
// // // // // // // //   View
// // // // // // // // } from 'react-native';
// // // // // // // // import {
// // // // // // // //   YStack,
// // // // // // // //   XStack,
// // // // // // // //   Text,
// // // // // // // //   H2,
// // // // // // // //   H4,
// // // // // // // //   Theme,
// // // // // // // //   Spinner,
// // // // // // // //   Input,
// // // // // // // //   Button,
// // // // // // // //   Card
// // // // // // // // } from 'tamagui';
// // // // // // // // import {
// // // // // // // //   ArrowLeft,
// // // // // // // //   Plus,
// // // // // // // //   Filter,
// // // // // // // //   Search,
// // // // // // // //   Calendar,
// // // // // // // //   Tag,
// // // // // // // //   DollarSign,
// // // // // // // //   Edit3,
// // // // // // // //   Trash2,
// // // // // // // //   X,
// // // // // // // //   TrendingUp,
// // // // // // // //   TrendingDown,
// // // // // // // //   Mic,
// // // // // // // //   MessageSquare,
// // // // // // // //   FileText,
// // // // // // // //   Bell,
// // // // // // // //   Wallet,
// // // // // // // //   Database
// // // // // // // // } from '@tamagui/lucide-icons';
// // // // // // // // import { useRouter, useFocusEffect } from 'expo-router';
// // // // // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // // // // // // // Services
// // // // // // // // import { ApiService } from '../../../services/apiService';

// // // // // // // // export default function Transactions() {
// // // // // // // //   const router = useRouter();
// // // // // // // //   const insets = useSafeAreaInsets();
  
// // // // // // // //   // State
// // // // // // // //   const [transactions, setTransactions] = useState([]);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // // // // //   const [showAddModal, setShowAddModal] = useState(false);
  
// // // // // // // //   // Form state - MUST MATCH YOUR API SCHEMA
// // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // //     amount: '',
// // // // // // // //     description: '',
// // // // // // // //     category: '',
// // // // // // // //     date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
// // // // // // // //     source: 'manual', // From your enum: manual, voice, chatbot, csv, notification, wallet, blockchain
// // // // // // // //     type: 'expense', // expense or income
// // // // // // // //     metadata: {}
// // // // // // // //   });

// // // // // // // //   // Categories - Use standard categories that match your backend
// // // // // // // //   const categories = [
// // // // // // // //     'Food & Dining',
// // // // // // // //     'Shopping',
// // // // // // // //     'Transportation',
// // // // // // // //     'Entertainment',
// // // // // // // //     'Healthcare',
// // // // // // // //     'Bills & Utilities',
// // // // // // // //     'Education',
// // // // // // // //     'Travel',
// // // // // // // //     'Investments',
// // // // // // // //     'Income',
// // // // // // // //     'Savings',
// // // // // // // //     'Other'
// // // // // // // //   ];

// // // // // // // //   // Source options - MATCH YOUR ENUM EXACTLY
// // // // // // // //   const sourceTypes = [
// // // // // // // //     { value: 'manual', label: 'Manual Entry', icon: <Edit3 size={16} color="#666666" /> },
// // // // // // // //     { value: 'voice', label: 'Voice', icon: <Mic size={16} color="#666666" /> },
// // // // // // // //     { value: 'chatbot', label: 'Chatbot', icon: <MessageSquare size={16} color="#666666" /> },
// // // // // // // //     { value: 'csv', label: 'CSV Import', icon: <FileText size={16} color="#666666" /> },
// // // // // // // //     { value: 'notification', label: 'Notification', icon: <Bell size={16} color="#666666" /> },
// // // // // // // //     { value: 'wallet', label: 'Wallet', icon: <Wallet size={16} color="#666666" /> },
// // // // // // // //     { value: 'blockchain', label: 'Blockchain', icon: <Database size={16} color="#666666" /> }
// // // // // // // //   ];

// // // // // // // //   // Fetch transactions
// // // // // // // //   const fetchTransactions = useCallback(async () => {
// // // // // // // //     try {
// // // // // // // //       setLoading(true);
// // // // // // // //       const response = await ApiService.getTransactions();
// // // // // // // //       console.log('Transactions fetched:', response.data?.length || 0);
// // // // // // // //       setTransactions(response.data || []);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Fetch transactions error:', error.response?.data || error.message);
// // // // // // // //       Alert.alert('Error', 'Failed to load transactions');
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   }, []);

// // // // // // // //   useFocusEffect(
// // // // // // // //     useCallback(() => {
// // // // // // // //       fetchTransactions();
// // // // // // // //     }, [fetchTransactions])
// // // // // // // //   );

// // // // // // // //   // Validate form
// // // // // // // //   const validateForm = () => {
// // // // // // // //     if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
// // // // // // // //       Alert.alert('Error', 'Please enter a valid amount');
// // // // // // // //       return false;
// // // // // // // //     }
    
// // // // // // // //     if (!formData.description?.trim()) {
// // // // // // // //       Alert.alert('Error', 'Please enter a description');
// // // // // // // //       return false;
// // // // // // // //     }
    
// // // // // // // //     if (!formData.category) {
// // // // // // // //       Alert.alert('Error', 'Please select a category');
// // // // // // // //       return false;
// // // // // // // //     }
    
// // // // // // // //     if (!formData.date) {
// // // // // // // //       Alert.alert('Error', 'Please select a date');
// // // // // // // //       return false;
// // // // // // // //     }
    
// // // // // // // //     return true;
// // // // // // // //   };

// // // // // // // //   // Add transaction - FIXED FOR YOUR API
// // // // // // // //   const handleAddTransaction = async () => {
// // // // // // // //     try {
// // // // // // // //       if (!validateForm()) {
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       // Prepare data exactly as your API expects
// // // // // // // //       const transactionData = {
// // // // // // // //         amount: parseFloat(formData.amount),
// // // // // // // //         description: formData.description.trim(),
// // // // // // // //         category: formData.category,
// // // // // // // //         date: formData.date, // Already in YYYY-MM-DD format
// // // // // // // //         source: formData.source, // From enum
// // // // // // // //         type: formData.type, // expense or income
// // // // // // // //         metadata: {
// // // // // // // //           added_via: 'mobile_app',
// // // // // // // //           timestamp: new Date().toISOString()
// // // // // // // //         }
// // // // // // // //       };

// // // // // // // //       console.log('Creating transaction:', transactionData);

// // // // // // // //       const response = await ApiService.createTransaction(transactionData);
// // // // // // // //       console.log('Transaction created:', response.data);
      
// // // // // // // //       setShowAddModal(false);
// // // // // // // //       resetForm();
// // // // // // // //       fetchTransactions();
// // // // // // // //       Alert.alert('Success', 'Transaction added successfully');
      
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Add transaction error:', error.response?.data || error);
      
// // // // // // // //       // Show detailed validation errors
// // // // // // // //       if (error.response?.data?.detail) {
// // // // // // // //         const apiErrors = error.response.data.detail;
// // // // // // // //         const errorMessages = apiErrors.map(err => 
// // // // // // // //           `${err.loc?.join('.') || 'Error'}: ${err.msg}`
// // // // // // // //         ).join('\n');
// // // // // // // //         Alert.alert('Validation Error', errorMessages);
// // // // // // // //       } else {
// // // // // // // //         Alert.alert('Error', error.message || 'Failed to add transaction');
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Update transaction
// // // // // // // //   const handleUpdateTransaction = async (id, data) => {
// // // // // // // //     try {
// // // // // // // //       const response = await ApiService.updateTransaction(id, data);
// // // // // // // //       console.log('Transaction updated:', response.data);
// // // // // // // //       fetchTransactions();
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Update transaction error:', error);
// // // // // // // //       Alert.alert('Error', 'Failed to update transaction');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Delete transaction
// // // // // // // //   const handleDeleteTransaction = async (id) => {
// // // // // // // //     Alert.alert(
// // // // // // // //       'Delete Transaction',
// // // // // // // //       'Are you sure you want to delete this transaction?',
// // // // // // // //       [
// // // // // // // //         { text: 'Cancel', style: 'cancel' },
// // // // // // // //         { 
// // // // // // // //           text: 'Delete', 
// // // // // // // //           style: 'destructive',
// // // // // // // //           onPress: async () => {
// // // // // // // //             try {
// // // // // // // //               await ApiService.updateTransaction(id, { 
// // // // // // // //                 status: 'deleted',
// // // // // // // //                 metadata: { ...formData.metadata, deleted_at: new Date().toISOString() }
// // // // // // // //               });
// // // // // // // //               fetchTransactions();
// // // // // // // //               Alert.alert('Success', 'Transaction deleted');
// // // // // // // //             } catch (error) {
// // // // // // // //               console.error('Delete error:', error);
// // // // // // // //               Alert.alert('Error', 'Failed to delete transaction');
// // // // // // // //             }
// // // // // // // //           }
// // // // // // // //         }
// // // // // // // //       ]
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   // Reset form
// // // // // // // //   const resetForm = () => {
// // // // // // // //     setFormData({
// // // // // // // //       amount: '',
// // // // // // // //       description: '',
// // // // // // // //       category: '',
// // // // // // // //       date: new Date().toISOString().split('T')[0],
// // // // // // // //       source: 'manual',
// // // // // // // //       type: 'expense',
// // // // // // // //       metadata: {}
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   // Filter transactions
// // // // // // // //   const filteredTransactions = transactions.filter(txn => {
// // // // // // // //     if (!txn) return false;
// // // // // // // //     const matchesSearch = !searchQuery || 
// // // // // // // //       txn.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // // // // //       txn.category?.toLowerCase().includes(searchQuery.toLowerCase());
// // // // // // // //     return matchesSearch;
// // // // // // // //   });

// // // // // // // //   const formatCurrency = (amount) =>
// // // // // // // //     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount || 0);

// // // // // // // //   const formatDate = (dateString) => {
// // // // // // // //     if (!dateString) return 'N/A';
// // // // // // // //     return new Date(dateString).toLocaleDateString('en-IN', {
// // // // // // // //       day: 'numeric',
// // // // // // // //       month: 'short',
// // // // // // // //       year: 'numeric'
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   const getCategoryColor = (category) => {
// // // // // // // //     const colors = {
// // // // // // // //       'Food & Dining': '#EF4444',
// // // // // // // //       'Shopping': '#8B5CF6',
// // // // // // // //       'Transportation': '#3B82F6',
// // // // // // // //       'Entertainment': '#EC4899',
// // // // // // // //       'Healthcare': '#10B981',
// // // // // // // //       'Bills & Utilities': '#F59E0B',
// // // // // // // //       'Education': '#06B6D4',
// // // // // // // //       'Travel': '#F97316',
// // // // // // // //       'Investments': '#22C55E',
// // // // // // // //       'Income': '#84CC16',
// // // // // // // //       'Savings': '#22C55E',
// // // // // // // //       'Other': '#64748B'
// // // // // // // //     };
// // // // // // // //     return colors[category] || '#64748B';
// // // // // // // //   };

// // // // // // // //   const getSourceIcon = (source) => {
// // // // // // // //     const sourceInfo = sourceTypes.find(s => s.value === source);
// // // // // // // //     return sourceInfo?.icon || <Edit3 size={16} color="#666666" />;
// // // // // // // //   };

// // // // // // // //   if (loading && !transactions.length) {
// // // // // // // //     return (
// // // // // // // //       <Theme name="dark">
// // // // // // // //         <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // // // // // // //           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // // // // // // //             <Spinner size="large" color="#EAB308" />
// // // // // // // //             <Text color="white" mt={16}>Loading transactions...</Text>
// // // // // // // //           </View>
// // // // // // // //         </SafeAreaView>
// // // // // // // //       </Theme>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <Theme name="dark">
// // // // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // // // // // // //         {/* HEADER */}
// // // // // // // //         <XStack p={20} ai="center" space={16}>
// // // // // // // //           <TouchableOpacity onPress={() => router.back()}>
// // // // // // // //             <ArrowLeft size={24} color="#EAB308" />
// // // // // // // //           </TouchableOpacity>
          
// // // // // // // //           <YStack flex={1}>
// // // // // // // //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
// // // // // // // //               Transactions
// // // // // // // //             </H2>
// // // // // // // //             <Text color="#666666" fontSize={14}>
// // // // // // // //               {transactions.length} verified money movements
// // // // // // // //             </Text>
// // // // // // // //           </YStack>
          
// // // // // // // //           <TouchableOpacity 
// // // // // // // //             onPress={() => setShowAddModal(true)}
// // // // // // // //             style={{
// // // // // // // //               width: 44,
// // // // // // // //               height: 44,
// // // // // // // //               borderRadius: 22,
// // // // // // // //               backgroundColor: '#1A1A1A',
// // // // // // // //               justifyContent: 'center',
// // // // // // // //               alignItems: 'center',
// // // // // // // //               borderWidth: 1,
// // // // // // // //               borderColor: '#EAB308',
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             <Plus size={20} color="#EAB308" />
// // // // // // // //           </TouchableOpacity>
// // // // // // // //         </XStack>

// // // // // // // //         {/* SEARCH */}
// // // // // // // //         <XStack p={20} pb={0}>
// // // // // // // //           <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 12 }}>
// // // // // // // //             <Search size={16} color="#666666" />
// // // // // // // //             <Input
// // // // // // // //               placeholder="Search transactions..."
// // // // // // // //               value={searchQuery}
// // // // // // // //               onChangeText={setSearchQuery}
// // // // // // // //               backgroundColor="transparent"
// // // // // // // //               borderWidth={0}
// // // // // // // //               color="white"
// // // // // // // //               placeholderTextColor="#666666"
// // // // // // // //               fontSize={14}
// // // // // // // //               flex={1}
// // // // // // // //             />
// // // // // // // //           </View>
// // // // // // // //         </XStack>

// // // // // // // //         {/* TRANSACTIONS LIST */}
// // // // // // // //         <FlatList
// // // // // // // //           data={filteredTransactions}
// // // // // // // //           keyExtractor={(item, index) => item?.id || index.toString()}
// // // // // // // //           contentContainerStyle={{ padding: 20 }}
// // // // // // // //           showsVerticalScrollIndicator={false}
// // // // // // // //           ListEmptyComponent={
// // // // // // // //             <YStack ai="center" py={48}>
// // // // // // // //               <DollarSign size={64} color="#333333" />
// // // // // // // //               <Text color="#666666" fontSize={16} mt={16}>
// // // // // // // //                 No transactions yet
// // // // // // // //               </Text>
// // // // // // // //               <Text color="#444444" fontSize={14} mt={8}>
// // // // // // // //                 Add your first transaction
// // // // // // // //               </Text>
// // // // // // // //             </YStack>
// // // // // // // //           }
// // // // // // // //           renderItem={({ item }) => {
// // // // // // // //             if (!item) return null;
            
// // // // // // // //             return (
// // // // // // // //               <Card 
// // // // // // // //                 backgroundColor="#1A1A1A" 
// // // // // // // //                 mb={12} 
// // // // // // // //                 p={16} 
// // // // // // // //                 borderRadius={12}
// // // // // // // //                 borderLeftWidth={4}
// // // // // // // //                 borderLeftColor={getCategoryColor(item.category)}
// // // // // // // //               >
// // // // // // // //                 <XStack jc="space-between" ai="center" mb={8}>
// // // // // // // //                   <YStack flex={1}>
// // // // // // // //                     <XStack ai="center" space={8} mb={4}>
// // // // // // // //                       <View style={{ opacity: 0.6 }}>
// // // // // // // //                         {getSourceIcon(item.source)}
// // // // // // // //                       </View>
// // // // // // // //                       <Text color="white" fontWeight="800" fontSize={16} numberOfLines={1}>
// // // // // // // //                         {item.description || 'No description'}
// // // // // // // //                       </Text>
// // // // // // // //                     </XStack>
                    
// // // // // // // //                     <XStack ai="center" space={8} mt={4}>
// // // // // // // //                       <Text color="#666666" fontSize={12}>
// // // // // // // //                         {formatDate(item.date)}
// // // // // // // //                       </Text>
                      
// // // // // // // //                       {item.category && (
// // // // // // // //                         <View style={{
// // // // // // // //                           backgroundColor: getCategoryColor(item.category) + '20',
// // // // // // // //                           paddingHorizontal: 8,
// // // // // // // //                           paddingVertical: 2,
// // // // // // // //                           borderRadius: 4,
// // // // // // // //                         }}>
// // // // // // // //                           <Text color={getCategoryColor(item.category)} fontSize={10} fontWeight="700">
// // // // // // // //                             {item.category}
// // // // // // // //                           </Text>
// // // // // // // //                         </View>
// // // // // // // //                       )}
                      
// // // // // // // //                       {item.source && item.source !== 'manual' && (
// // // // // // // //                         <Text color="#444444" fontSize={10}>
// // // // // // // //                           via {item.source}
// // // // // // // //                         </Text>
// // // // // // // //                       )}
// // // // // // // //                     </XStack>
// // // // // // // //                   </YStack>
                  
// // // // // // // //                   <XStack ai="center" space={12}>
// // // // // // // //                     <Text 
// // // // // // // //                       color={item.type === 'income' ? "#22C55E" : "#EF4444"} 
// // // // // // // //                       fontWeight="800" 
// // // // // // // //                       fontSize={16}
// // // // // // // //                     >
// // // // // // // //                       {item.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(item.amount || 0))}
// // // // // // // //                     </Text>
                    
// // // // // // // //                     <XStack space={8}>
// // // // // // // //                       <TouchableOpacity 
// // // // // // // //                         onPress={() => {
// // // // // // // //                           // Pre-fill form for editing
// // // // // // // //                           setFormData({
// // // // // // // //                             amount: item.amount?.toString() || '',
// // // // // // // //                             description: item.description || '',
// // // // // // // //                             category: item.category || '',
// // // // // // // //                             date: item.date || new Date().toISOString().split('T')[0],
// // // // // // // //                             source: item.source || 'manual',
// // // // // // // //                             type: item.type || 'expense',
// // // // // // // //                             metadata: item.metadata || {}
// // // // // // // //                           });
// // // // // // // //                           setShowAddModal(true);
// // // // // // // //                         }}
// // // // // // // //                       >
// // // // // // // //                         <Edit3 size={16} color="#666666" />
// // // // // // // //                       </TouchableOpacity>
// // // // // // // //                       <TouchableOpacity onPress={() => handleDeleteTransaction(item.id)}>
// // // // // // // //                         <Trash2 size={16} color="#EF4444" />
// // // // // // // //                       </TouchableOpacity>
// // // // // // // //                     </XStack>
// // // // // // // //                   </XStack>
// // // // // // // //                 </XStack>
// // // // // // // //               </Card>
// // // // // // // //             );
// // // // // // // //           }}
// // // // // // // //         />

// // // // // // // //         {/* ADD TRANSACTION MODAL */}
// // // // // // // //         <Modal
// // // // // // // //           visible={showAddModal}
// // // // // // // //           animationType="slide"
// // // // // // // //           transparent={true}
// // // // // // // //           onRequestClose={() => {
// // // // // // // //             setShowAddModal(false);
// // // // // // // //             resetForm();
// // // // // // // //           }}
// // // // // // // //         >
// // // // // // // //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
// // // // // // // //             <ScrollView style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' }}>
// // // // // // // //               <View style={{ padding: 24, paddingBottom: insets.bottom + 20 }}>
// // // // // // // //                 <XStack jc="space-between" ai="center" mb={24}>
// // // // // // // //                   <H4 color="white" fontWeight="800" fontSize={20}>
// // // // // // // //                     Add Transaction
// // // // // // // //                   </H4>
// // // // // // // //                   <TouchableOpacity onPress={() => {
// // // // // // // //                     setShowAddModal(false);
// // // // // // // //                     resetForm();
// // // // // // // //                   }}>
// // // // // // // //                     <X size={24} color="#666666" />
// // // // // // // //                   </TouchableOpacity>
// // // // // // // //                 </XStack>

// // // // // // // //                 <YStack space={16}>
// // // // // // // //                   {/* Type Selection */}
// // // // // // // //                   <XStack space={12}>
// // // // // // // //                     <TouchableOpacity
// // // // // // // //                       onPress={() => setFormData({...formData, type: 'income'})}
// // // // // // // //                       style={{
// // // // // // // //                         flex: 1,
// // // // // // // //                         padding: 16,
// // // // // // // //                         backgroundColor: formData.type === 'income' ? '#22C55E20' : '#333333',
// // // // // // // //                         borderRadius: 12,
// // // // // // // //                         alignItems: 'center',
// // // // // // // //                         borderWidth: 1,
// // // // // // // //                         borderColor: formData.type === 'income' ? '#22C55E' : '#444444',
// // // // // // // //                       }}
// // // // // // // //                     >
// // // // // // // //                       <TrendingUp size={20} color={formData.type === 'income' ? '#22C55E' : '#666666'} />
// // // // // // // //                       <Text color={formData.type === 'income' ? '#22C55E' : '#666666'} fontSize={14} fontWeight="700" mt={8}>
// // // // // // // //                         Income
// // // // // // // //                       </Text>
// // // // // // // //                     </TouchableOpacity>
                    
// // // // // // // //                     <TouchableOpacity
// // // // // // // //                       onPress={() => setFormData({...formData, type: 'expense'})}
// // // // // // // //                       style={{
// // // // // // // //                         flex: 1,
// // // // // // // //                         padding: 16,
// // // // // // // //                         backgroundColor: formData.type === 'expense' ? '#EF444420' : '#333333',
// // // // // // // //                         borderRadius: 12,
// // // // // // // //                         alignItems: 'center',
// // // // // // // //                         borderWidth: 1,
// // // // // // // //                         borderColor: formData.type === 'expense' ? '#EF4444' : '#444444',
// // // // // // // //                       }}
// // // // // // // //                     >
// // // // // // // //                       <TrendingDown size={20} color={formData.type === 'expense' ? '#EF4444' : '#666666'} />
// // // // // // // //                       <Text color={formData.type === 'expense' ? '#EF4444' : '#666666'} fontSize={14} fontWeight="700" mt={8}>
// // // // // // // //                         Expense
// // // // // // // //                       </Text>
// // // // // // // //                     </TouchableOpacity>
// // // // // // // //                   </XStack>

// // // // // // // //                   {/* Amount */}
// // // // // // // //                   <YStack>
// // // // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // // //                       Amount (₹) *
// // // // // // // //                     </Text>
// // // // // // // //                     <Input
// // // // // // // //                       placeholder="0.00"
// // // // // // // //                       value={formData.amount}
// // // // // // // //                       onChangeText={(text) => setFormData({...formData, amount: text})}
// // // // // // // //                       backgroundColor="#333333"
// // // // // // // //                       borderColor="#444444"
// // // // // // // //                       color="white"
// // // // // // // //                       placeholderTextColor="#666666"
// // // // // // // //                       keyboardType="decimal-pad"
// // // // // // // //                       fontSize={16}
// // // // // // // //                     />
// // // // // // // //                   </YStack>

// // // // // // // //                   {/* Description */}
// // // // // // // //                   <YStack>
// // // // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // // //                       Description *
// // // // // // // //                     </Text>
// // // // // // // //                     <Input
// // // // // // // //                       placeholder="What was this for?"
// // // // // // // //                       value={formData.description}
// // // // // // // //                       onChangeText={(text) => setFormData({...formData, description: text})}
// // // // // // // //                       backgroundColor="#333333"
// // // // // // // //                       borderColor="#444444"
// // // // // // // //                       color="white"
// // // // // // // //                       placeholderTextColor="#666666"
// // // // // // // //                       fontSize={16}
// // // // // // // //                     />
// // // // // // // //                   </YStack>

// // // // // // // //                   {/* Category */}
// // // // // // // //                   <YStack>
// // // // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // // //                       Category *
// // // // // // // //                     </Text>
// // // // // // // //                     <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
// // // // // // // //                       {categories.map(category => (
// // // // // // // //                         <TouchableOpacity
// // // // // // // //                           key={category}
// // // // // // // //                           onPress={() => setFormData({...formData, category})}
// // // // // // // //                           style={{
// // // // // // // //                             paddingHorizontal: 12,
// // // // // // // //                             paddingVertical: 8,
// // // // // // // //                             backgroundColor: formData.category === category ? getCategoryColor(category) + '20' : '#333333',
// // // // // // // //                             borderRadius: 8,
// // // // // // // //                             borderWidth: 1,
// // // // // // // //                             borderColor: formData.category === category ? getCategoryColor(category) : '#444444',
// // // // // // // //                           }}
// // // // // // // //                         >
// // // // // // // //                           <Text color={formData.category === category ? getCategoryColor(category) : '#666666'} fontSize={12} fontWeight="700">
// // // // // // // //                             {category}
// // // // // // // //                           </Text>
// // // // // // // //                         </TouchableOpacity>
// // // // // // // //                       ))}
// // // // // // // //                     </View>
// // // // // // // //                   </YStack>

// // // // // // // //                   {/* Date */}
// // // // // // // //                   <YStack>
// // // // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // // //                       Date *
// // // // // // // //                     </Text>
// // // // // // // //                     <Input
// // // // // // // //                       placeholder="YYYY-MM-DD"
// // // // // // // //                       value={formData.date}
// // // // // // // //                       onChangeText={(text) => setFormData({...formData, date: text})}
// // // // // // // //                       backgroundColor="#333333"
// // // // // // // //                       borderColor="#444444"
// // // // // // // //                       color="white"
// // // // // // // //                       placeholderTextColor="#666666"
// // // // // // // //                       fontSize={16}
// // // // // // // //                     />
// // // // // // // //                     <Text color="#666666" fontSize={12} mt={4}>
// // // // // // // //                       Format: YYYY-MM-DD (e.g., 2024-01-15)
// // // // // // // //                     </Text>
// // // // // // // //                   </YStack>

// // // // // // // //                   {/* Source
// // // // // // // //                   <YStack>
// // // // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // // //                       Source
// // // // // // // //                     </Text>
// // // // // // // //                     <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
// // // // // // // //                       {sourceTypes.map(source => (
// // // // // // // //                         <TouchableOpacity
// // // // // // // //                           key={source.value}
// // // // // // // //                           onPress={() => setFormData({...formData, source: source.value})}
// // // // // // // //                           style={{
// // // // // // // //                             paddingHorizontal: 12,
// // // // // // // //                             paddingVertical: 8,
// // // // // // // //                             backgroundColor: formData.source === source.value ? '#EAB30820' : '#333333',
// // // // // // // //                             borderRadius: 8,
// // // // // // // //                             borderWidth: 1,
// // // // // // // //                             borderColor: formData.source === source.value ? '#EAB308' : '#444444',
// // // // // // // //                           }}
// // // // // // // //                         >
// // // // // // // //                           <XStack ai="center" space={6}>
// // // // // // // //                             {source.icon}
// // // // // // // //                             <Text color={formData.source === source.value ? '#EAB308' : '#666666'} fontSize={12} fontWeight="700">
// // // // // // // //                               {source.label}
// // // // // // // //                             </Text>
// // // // // // // //                           </XStack>
// // // // // // // //                         </TouchableOpacity>
// // // // // // // //                       ))}
// // // // // // // //                     </View>
// // // // // // // //                   </YStack> */}

// // // // // // // //                   {/* Submit Button */}
// // // // // // // //                   <TouchableOpacity
// // // // // // // //                     onPress={handleAddTransaction}
// // // // // // // //                     style={{
// // // // // // // //                       backgroundColor: '#EAB308',
// // // // // // // //                       padding: 16,
// // // // // // // //                       borderRadius: 12,
// // // // // // // //                       alignItems: 'center',
// // // // // // // //                       marginTop: 8,
// // // // // // // //                     }}
// // // // // // // //                   >
// // // // // // // //                     <Text color="black" fontSize={16} fontWeight="800">
// // // // // // // //                       Add Transaction
// // // // // // // //                     </Text>
// // // // // // // //                   </TouchableOpacity>
// // // // // // // //                 </YStack>
// // // // // // // //               </View>
// // // // // // // //             </ScrollView>
// // // // // // // //           </View>
// // // // // // // //         </Modal>
// // // // // // // //       </SafeAreaView>
// // // // // // // //     </Theme>
// // // // // // // //   );
// // // // // // // // }





// // // // // // // // app/(drawer)/(tabs)/transactions.jsx
// // // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // // import {
// // // // // // //   ScrollView,
// // // // // // //   TouchableOpacity,
// // // // // // //   Alert,
// // // // // // //   Modal,
// // // // // // //   FlatList,
// // // // // // //   View
// // // // // // // } from 'react-native';
// // // // // // // import {
// // // // // // //   YStack,
// // // // // // //   XStack,
// // // // // // //   Text,
// // // // // // //   H2,
// // // // // // //   H4,
// // // // // // //   Theme,
// // // // // // //   Spinner,
// // // // // // //   Input,
// // // // // // //   Card
// // // // // // // } from 'tamagui';
// // // // // // // import {
// // // // // // //   ArrowLeft,
// // // // // // //   Plus,
// // // // // // //   Search,
// // // // // // //   Calendar,
// // // // // // //   Tag,
// // // // // // //   DollarSign,
// // // // // // //   Edit3,
// // // // // // //   Trash2,
// // // // // // //   X,
// // // // // // //   TrendingUp,
// // // // // // //   TrendingDown,
// // // // // // //   CheckCircle
// // // // // // // } from '@tamagui/lucide-icons';
// // // // // // // import { useRouter, useFocusEffect } from 'expo-router';
// // // // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // // // // // // Services
// // // // // // // import { ApiService } from '../../../services/apiService';

// // // // // // // export default function Transactions() {
// // // // // // //   const router = useRouter();
// // // // // // //   const insets = useSafeAreaInsets();
  
// // // // // // //   // State
// // // // // // //   const [transactions, setTransactions] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [refreshing, setRefreshing] = useState(false);
// // // // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // // // // //   const [selectedTransaction, setSelectedTransaction] = useState(null);
  
// // // // // // //   // Form state - User manual entry only
// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     amount: '',
// // // // // // //     description: '',
// // // // // // //     category: '',
// // // // // // //     date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
// // // // // // //     type: 'expense' // expense or income
// // // // // // //   });

// // // // // // //   // Categories
// // // // // // //   const categories = [
// // // // // // //     'Food & Dining',
// // // // // // //     'Shopping',
// // // // // // //     'Transportation',
// // // // // // //     'Entertainment',
// // // // // // //     'Healthcare',
// // // // // // //     'Bills & Utilities',
// // // // // // //     'Education',
// // // // // // //     'Travel',
// // // // // // //     'Investments',
// // // // // // //     'Income',
// // // // // // //     'Savings',
// // // // // // //     'Other'
// // // // // // //   ];

// // // // // // //   // Error state
// // // // // // //   const [errors, setErrors] = useState({});

// // // // // // //   // Fetch transactions
// // // // // // //   const fetchTransactions = useCallback(async () => {
// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       const response = await ApiService.getTransactions();
// // // // // // //       console.log('Transactions fetched:', response.data?.length || 0);
// // // // // // //       setTransactions(response.data || []);
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Fetch transactions error:', error.response?.data || error.message);
// // // // // // //       Alert.alert('Error', 'Failed to load transactions');
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //       setRefreshing(false);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   useFocusEffect(
// // // // // // //     useCallback(() => {
// // // // // // //       fetchTransactions();
// // // // // // //     }, [fetchTransactions])
// // // // // // //   );

// // // // // // //   const onRefresh = useCallback(() => {
// // // // // // //     setRefreshing(true);
// // // // // // //     fetchTransactions();
// // // // // // //   }, [fetchTransactions]);

// // // // // // //   // Validate form
// // // // // // //   const validateForm = () => {
// // // // // // //     const newErrors = {};
    
// // // // // // //     if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
// // // // // // //       newErrors.amount = 'Please enter a valid amount';
// // // // // // //     }
    
// // // // // // //     if (!formData.description?.trim()) {
// // // // // // //       newErrors.description = 'Please enter a description';
// // // // // // //     }
    
// // // // // // //     if (!formData.category) {
// // // // // // //       newErrors.category = 'Please select a category';
// // // // // // //     }
    
// // // // // // //     if (!formData.date || !/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
// // // // // // //       newErrors.date = 'Please enter a valid date (YYYY-MM-DD)';
// // // // // // //     }
    
// // // // // // //     setErrors(newErrors);
// // // // // // //     return Object.keys(newErrors).length === 0;
// // // // // // //   };

// // // // // // //   // Reset form
// // // // // // //   const resetForm = () => {
// // // // // // //     setFormData({
// // // // // // //       amount: '',
// // // // // // //       description: '',
// // // // // // //       category: '',
// // // // // // //       date: new Date().toISOString().split('T')[0],
// // // // // // //       type: 'expense'
// // // // // // //     });
// // // // // // //     setErrors({});
// // // // // // //     setSelectedTransaction(null);
// // // // // // //   };

// // // // // // //   // Add transaction - USER MANUAL ENTRY ONLY
// // // // // // //   const handleAddTransaction = async () => {
// // // // // // //     try {
// // // // // // //       if (!validateForm()) {
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       // Prepare data - user manual entry only
// // // // // // //       const transactionData = {
// // // // // // //         amount: parseFloat(formData.amount),
// // // // // // //         description: formData.description.trim(),
// // // // // // //         category: formData.category,
// // // // // // //         date: formData.date,
// // // // // // //         source: 'manual', // Always manual for user entries
// // // // // // //         type: formData.type // expense or income
// // // // // // //       };

// // // // // // //       console.log('Creating manual transaction:', transactionData);

// // // // // // //       const response = await ApiService.createTransaction(transactionData);
// // // // // // //       console.log('Transaction created:', response.data);
      
// // // // // // //       setShowAddModal(false);
// // // // // // //       resetForm();
// // // // // // //       fetchTransactions();
// // // // // // //       Alert.alert('Success', 'Transaction added successfully');
      
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Add transaction error:', error.response?.data || error);
      
// // // // // // //       // Show detailed validation errors
// // // // // // //       if (error.response?.data?.detail) {
// // // // // // //         const apiErrors = error.response.data.detail;
// // // // // // //         const errorMessages = apiErrors.map(err => 
// // // // // // //           `${err.loc?.join('.') || 'Error'}: ${err.msg}`
// // // // // // //         ).join('\n');
// // // // // // //         Alert.alert('Validation Error', errorMessages);
// // // // // // //       } else {
// // // // // // //         Alert.alert('Error', error.message || 'Failed to add transaction');
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Update transaction
// // // // // // //   const handleUpdateTransaction = async () => {
// // // // // // //     try {
// // // // // // //       if (!selectedTransaction) return;
      
// // // // // // //       if (!validateForm()) {
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       const transactionData = {
// // // // // // //         amount: parseFloat(formData.amount),
// // // // // // //         description: formData.description.trim(),
// // // // // // //         category: formData.category,
// // // // // // //         date: formData.date,
// // // // // // //         type: formData.type
// // // // // // //         // Note: source remains 'manual' as it was created manually
// // // // // // //       };

// // // // // // //       console.log('Updating transaction:', selectedTransaction.id, transactionData);

// // // // // // //       await ApiService.updateTransaction(selectedTransaction.id, transactionData);
      
// // // // // // //       setShowAddModal(false);
// // // // // // //       resetForm();
// // // // // // //       fetchTransactions();
// // // // // // //       Alert.alert('Success', 'Transaction updated successfully');
      
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Update transaction error:', error.response?.data || error);
// // // // // // //       if (error.response?.data?.detail) {
// // // // // // //         const apiErrors = error.response.data.detail;
// // // // // // //         const errorMessages = apiErrors.map(err => err.msg).join('\n');
// // // // // // //         Alert.alert('Validation Error', errorMessages);
// // // // // // //       } else {
// // // // // // //         Alert.alert('Error', 'Failed to update transaction');
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Delete transaction
// // // // // // //   const handleDeleteTransaction = async () => {
// // // // // // //     if (!selectedTransaction) return;
    
// // // // // // //     Alert.alert(
// // // // // // //       'Delete Transaction',
// // // // // // //       'Are you sure you want to delete this transaction?',
// // // // // // //       [
// // // // // // //         { text: 'Cancel', style: 'cancel' },
// // // // // // //         { 
// // // // // // //           text: 'Delete', 
// // // // // // //           style: 'destructive',
// // // // // // //           onPress: async () => {
// // // // // // //             try {
// // // // // // //               await ApiService.updateTransaction(selectedTransaction.id, { 
// // // // // // //                 status: 'deleted',
// // // // // // //                 metadata: { deleted_at: new Date().toISOString() }
// // // // // // //               });
// // // // // // //               setSelectedTransaction(null);
// // // // // // //               fetchTransactions();
// // // // // // //               Alert.alert('Success', 'Transaction deleted');
// // // // // // //             } catch (error) {
// // // // // // //               console.error('Delete error:', error);
// // // // // // //               Alert.alert('Error', 'Failed to delete transaction');
// // // // // // //             }
// // // // // // //           }
// // // // // // //         }
// // // // // // //       ]
// // // // // // //     );
// // // // // // //   };

// // // // // // //   // Open edit modal
// // // // // // //   const openEditModal = (transaction) => {
// // // // // // //     setSelectedTransaction(transaction);
// // // // // // //     setFormData({
// // // // // // //       amount: transaction.amount?.toString() || '',
// // // // // // //       description: transaction.description || '',
// // // // // // //       category: transaction.category || '',
// // // // // // //       date: transaction.date || new Date().toISOString().split('T')[0],
// // // // // // //       type: transaction.type || 'expense'
// // // // // // //     });
// // // // // // //     setShowAddModal(true);
// // // // // // //   };

// // // // // // //   // Open delete confirmation
// // // // // // //   const openDeleteConfirm = (transaction) => {
// // // // // // //     setSelectedTransaction(transaction);
// // // // // // //     Alert.alert(
// // // // // // //       'Delete Transaction',
// // // // // // //       `Delete "${transaction.description}"?`,
// // // // // // //       [
// // // // // // //         { text: 'Cancel', style: 'cancel' },
// // // // // // //         { 
// // // // // // //           text: 'Delete', 
// // // // // // //           style: 'destructive',
// // // // // // //           onPress: () => handleDeleteTransaction()
// // // // // // //         }
// // // // // // //       ]
// // // // // // //     );
// // // // // // //   };

// // // // // // //   // Filter transactions - only show non-deleted
// // // // // // //   const filteredTransactions = transactions
// // // // // // //     .filter(txn => txn && txn.status !== 'deleted')
// // // // // // //     .filter(txn => {
// // // // // // //       const matchesSearch = !searchQuery || 
// // // // // // //         txn.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // // // //         txn.category?.toLowerCase().includes(searchQuery.toLowerCase());
// // // // // // //       return matchesSearch;
// // // // // // //     });

// // // // // // //   const formatCurrency = (amount) =>
// // // // // // //     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount || 0);

// // // // // // //   const formatDate = (dateString) => {
// // // // // // //     if (!dateString) return 'N/A';
// // // // // // //     return new Date(dateString).toLocaleDateString('en-IN', {
// // // // // // //       day: 'numeric',
// // // // // // //       month: 'short'
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const getCategoryColor = (category) => {
// // // // // // //     const colors = {
// // // // // // //       'Food & Dining': '#EF4444',
// // // // // // //       'Shopping': '#8B5CF6',
// // // // // // //       'Transportation': '#3B82F6',
// // // // // // //       'Entertainment': '#EC4899',
// // // // // // //       'Healthcare': '#10B981',
// // // // // // //       'Bills & Utilities': '#F59E0B',
// // // // // // //       'Education': '#06B6D4',
// // // // // // //       'Travel': '#F97316',
// // // // // // //       'Investments': '#22C55E',
// // // // // // //       'Income': '#84CC16',
// // // // // // //       'Savings': '#22C55E',
// // // // // // //       'Other': '#64748B'
// // // // // // //     };
// // // // // // //     return colors[category] || '#64748B';
// // // // // // //   };

// // // // // // //   if (loading && !transactions.length) {
// // // // // // //     return (
// // // // // // //       <Theme name="dark">
// // // // // // //         <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // // // // // //           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // // // // // //             <Spinner size="large" color="#EAB308" />
// // // // // // //             <Text color="white" mt={16}>Loading transactions...</Text>
// // // // // // //           </View>
// // // // // // //         </SafeAreaView>
// // // // // // //       </Theme>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <Theme name="dark">
// // // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // // // // // //         {/* HEADER */}
// // // // // // //         <XStack p={20} ai="center" space={16}>
// // // // // // //           <TouchableOpacity onPress={() => router.back()}>
// // // // // // //             <ArrowLeft size={24} color="#EAB308" />
// // // // // // //           </TouchableOpacity>
          
// // // // // // //           <YStack flex={1}>
// // // // // // //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
// // // // // // //               Transactions
// // // // // // //             </H2>
// // // // // // //             <Text color="#666666" fontSize={14}>
// // // // // // //               {filteredTransactions.length} verified entries
// // // // // // //             </Text>
// // // // // // //           </YStack>
          
// // // // // // //           <TouchableOpacity 
// // // // // // //             onPress={() => setShowAddModal(true)}
// // // // // // //             style={{
// // // // // // //               width: 44,
// // // // // // //               height: 44,
// // // // // // //               borderRadius: 22,
// // // // // // //               backgroundColor: '#1A1A1A',
// // // // // // //               justifyContent: 'center',
// // // // // // //               alignItems: 'center',
// // // // // // //               borderWidth: 1,
// // // // // // //               borderColor: '#EAB308',
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <Plus size={20} color="#EAB308" />
// // // // // // //           </TouchableOpacity>
// // // // // // //         </XStack>

// // // // // // //         {/* SEARCH */}
// // // // // // //         <XStack p={20} pb={12}>
// // // // // // //           <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 12 }}>
// // // // // // //             <Search size={16} color="#666666" />
// // // // // // //             <Input
// // // // // // //               placeholder="Search transactions..."
// // // // // // //               value={searchQuery}
// // // // // // //               onChangeText={setSearchQuery}
// // // // // // //               backgroundColor="transparent"
// // // // // // //               borderWidth={0}
// // // // // // //               color="white"
// // // // // // //               placeholderTextColor="#666666"
// // // // // // //               fontSize={14}
// // // // // // //               flex={1}
// // // // // // //             />
// // // // // // //           </View>
// // // // // // //         </XStack>

// // // // // // //         {/* TRANSACTIONS LIST */}
// // // // // // //         <FlatList
// // // // // // //           data={filteredTransactions}
// // // // // // //           keyExtractor={(item, index) => item?.id || index.toString()}
// // // // // // //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
// // // // // // //           showsVerticalScrollIndicator={false}
// // // // // // //           refreshing={refreshing}
// // // // // // //           onRefresh={onRefresh}
// // // // // // //           ListEmptyComponent={
// // // // // // //             <YStack ai="center" py={48}>
// // // // // // //               <DollarSign size={64} color="#333333" />
// // // // // // //               <Text color="#666666" fontSize={16} mt={16}>
// // // // // // //                 No transactions yet
// // // // // // //               </Text>
// // // // // // //               <Text color="#444444" fontSize={14} mt={8} mb={16}>
// // // // // // //                 Add your first transaction
// // // // // // //               </Text>
// // // // // // //               <TouchableOpacity 
// // // // // // //                 onPress={() => setShowAddModal(true)}
// // // // // // //                 style={{
// // // // // // //                   backgroundColor: '#EAB308',
// // // // // // //                   paddingHorizontal: 24,
// // // // // // //                   paddingVertical: 12,
// // // // // // //                   borderRadius: 12,
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <Text color="black" fontSize={14} fontWeight="700">Add Transaction</Text>
// // // // // // //               </TouchableOpacity>
// // // // // // //             </YStack>
// // // // // // //           }
// // // // // // //           renderItem={({ item }) => {
// // // // // // //             if (!item) return null;
            
// // // // // // //             const isManual = item.source === 'manual';
            
// // // // // // //             return (
// // // // // // //               <TouchableOpacity 
// // // // // // //                 onPress={() => openEditModal(item)}
// // // // // // //                 activeOpacity={0.8}
// // // // // // //               >
// // // // // // //                 <Card 
// // // // // // //                   backgroundColor="#1A1A1A" 
// // // // // // //                   mb={12} 
// // // // // // //                   p={16} 
// // // // // // //                   borderRadius={12}
// // // // // // //                   borderLeftWidth={4}
// // // // // // //                   borderLeftColor={getCategoryColor(item.category)}
// // // // // // //                 >
// // // // // // //                   <XStack jc="space-between" ai="center">
// // // // // // //                     <YStack flex={1}>
// // // // // // //                       <XStack ai="center" space={8} mb={4}>
// // // // // // //                         {isManual && (
// // // // // // //                           <CheckCircle size={14} color="#666666" />
// // // // // // //                         )}
// // // // // // //                         <Text color="white" fontWeight="800" fontSize={16} numberOfLines={1}>
// // // // // // //                           {item.description || 'No description'}
// // // // // // //                         </Text>
// // // // // // //                       </XStack>
                      
// // // // // // //                       <XStack ai="center" space={12} mt={4}>
// // // // // // //                         <Text color="#666666" fontSize={12}>
// // // // // // //                           {formatDate(item.date)}
// // // // // // //                         </Text>
                        
// // // // // // //                         {item.category && (
// // // // // // //                           <View style={{
// // // // // // //                             backgroundColor: getCategoryColor(item.category) + '20',
// // // // // // //                             paddingHorizontal: 8,
// // // // // // //                             paddingVertical: 2,
// // // // // // //                             borderRadius: 4,
// // // // // // //                           }}>
// // // // // // //                             <Text color={getCategoryColor(item.category)} fontSize={10} fontWeight="700">
// // // // // // //                               {item.category}
// // // // // // //                             </Text>
// // // // // // //                           </View>
// // // // // // //                         )}
// // // // // // //                       </XStack>
// // // // // // //                     </YStack>
                    
// // // // // // //                     <XStack ai="center" space={12}>
// // // // // // //                       <Text 
// // // // // // //                         color={item.type === 'income' ? "#22C55E" : "#EF4444"} 
// // // // // // //                         fontWeight="800" 
// // // // // // //                         fontSize={16}
// // // // // // //                       >
// // // // // // //                         {item.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(item.amount || 0))}
// // // // // // //                       </Text>
                      
// // // // // // //                       <TouchableOpacity 
// // // // // // //                         onPress={(e) => {
// // // // // // //                           e.stopPropagation();
// // // // // // //                           openDeleteConfirm(item);
// // // // // // //                         }}
// // // // // // //                         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
// // // // // // //                       >
// // // // // // //                         <Trash2 size={16} color="#EF4444" />
// // // // // // //                       </TouchableOpacity>
// // // // // // //                     </XStack>
// // // // // // //                   </XStack>
// // // // // // //                 </Card>
// // // // // // //               </TouchableOpacity>
// // // // // // //             );
// // // // // // //           }}
// // // // // // //         />

// // // // // // //         {/* ADD/EDIT TRANSACTION MODAL */}
// // // // // // //         <Modal
// // // // // // //           visible={showAddModal}
// // // // // // //           animationType="slide"
// // // // // // //           transparent={true}
// // // // // // //           onRequestClose={() => {
// // // // // // //             setShowAddModal(false);
// // // // // // //             resetForm();
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
// // // // // // //             <ScrollView 
// // // // // // //               style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' }}
// // // // // // //               showsVerticalScrollIndicator={false}
// // // // // // //             >
// // // // // // //               <View style={{ padding: 24, paddingBottom: insets.bottom + 20 }}>
// // // // // // //                 <XStack jc="space-between" ai="center" mb={24}>
// // // // // // //                   <H4 color="white" fontWeight="800" fontSize={20}>
// // // // // // //                     {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
// // // // // // //                   </H4>
// // // // // // //                   <TouchableOpacity onPress={() => {
// // // // // // //                     setShowAddModal(false);
// // // // // // //                     resetForm();
// // // // // // //                   }}>
// // // // // // //                     <X size={24} color="#666666" />
// // // // // // //                   </TouchableOpacity>
// // // // // // //                 </XStack>

// // // // // // //                 <YStack space={16}>
// // // // // // //                   {/* Type Selection */}
// // // // // // //                   <XStack space={12}>
// // // // // // //                     <TouchableOpacity
// // // // // // //                       onPress={() => setFormData({...formData, type: 'income'})}
// // // // // // //                       style={{
// // // // // // //                         flex: 1,
// // // // // // //                         padding: 16,
// // // // // // //                         backgroundColor: formData.type === 'income' ? '#22C55E20' : '#333333',
// // // // // // //                         borderRadius: 12,
// // // // // // //                         alignItems: 'center',
// // // // // // //                         borderWidth: 1,
// // // // // // //                         borderColor: formData.type === 'income' ? '#22C55E' : '#444444',
// // // // // // //                       }}
// // // // // // //                     >
// // // // // // //                       <TrendingUp size={20} color={formData.type === 'income' ? '#22C55E' : '#666666'} />
// // // // // // //                       <Text color={formData.type === 'income' ? '#22C55E' : '#666666'} fontSize={14} fontWeight="700" mt={8}>
// // // // // // //                         Income
// // // // // // //                       </Text>
// // // // // // //                     </TouchableOpacity>
                    
// // // // // // //                     <TouchableOpacity
// // // // // // //                       onPress={() => setFormData({...formData, type: 'expense'})}
// // // // // // //                       style={{
// // // // // // //                         flex: 1,
// // // // // // //                         padding: 16,
// // // // // // //                         backgroundColor: formData.type === 'expense' ? '#EF444420' : '#333333',
// // // // // // //                         borderRadius: 12,
// // // // // // //                         alignItems: 'center',
// // // // // // //                         borderWidth: 1,
// // // // // // //                         borderColor: formData.type === 'expense' ? '#EF4444' : '#444444',
// // // // // // //                       }}
// // // // // // //                     >
// // // // // // //                       <TrendingDown size={20} color={formData.type === 'expense' ? '#EF4444' : '#666666'} />
// // // // // // //                       <Text color={formData.type === 'expense' ? '#EF4444' : '#666666'} fontSize={14} fontWeight="700" mt={8}>
// // // // // // //                         Expense
// // // // // // //                       </Text>
// // // // // // //                     </TouchableOpacity>
// // // // // // //                   </XStack>

// // // // // // //                   {/* Amount */}
// // // // // // //                   <YStack>
// // // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // //                       Amount (₹) *
// // // // // // //                     </Text>
// // // // // // //                     <Input
// // // // // // //                       placeholder="0.00"
// // // // // // //                       value={formData.amount}
// // // // // // //                       onChangeText={(text) => setFormData({...formData, amount: text})}
// // // // // // //                       backgroundColor="#333333"
// // // // // // //                       borderColor={errors.amount ? '#EF4444' : '#444444'}
// // // // // // //                       color="white"
// // // // // // //                       placeholderTextColor="#666666"
// // // // // // //                       keyboardType="decimal-pad"
// // // // // // //                       fontSize={16}
// // // // // // //                     />
// // // // // // //                     {errors.amount && (
// // // // // // //                       <Text color="#EF4444" fontSize={12} mt={4}>{errors.amount}</Text>
// // // // // // //                     )}
// // // // // // //                   </YStack>

// // // // // // //                   {/* Description */}
// // // // // // //                   <YStack>
// // // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // //                       Description *
// // // // // // //                     </Text>
// // // // // // //                     <Input
// // // // // // //                       placeholder="What was this for?"
// // // // // // //                       value={formData.description}
// // // // // // //                       onChangeText={(text) => setFormData({...formData, description: text})}
// // // // // // //                       backgroundColor="#333333"
// // // // // // //                       borderColor={errors.description ? '#EF4444' : '#444444'}
// // // // // // //                       color="white"
// // // // // // //                       placeholderTextColor="#666666"
// // // // // // //                       fontSize={16}
// // // // // // //                     />
// // // // // // //                     {errors.description && (
// // // // // // //                       <Text color="#EF4444" fontSize={12} mt={4}>{errors.description}</Text>
// // // // // // //                     )}
// // // // // // //                   </YStack>

// // // // // // //                   {/* Category */}
// // // // // // //                   <YStack>
// // // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // //                       Category *
// // // // // // //                     </Text>
// // // // // // //                     {errors.category && (
// // // // // // //                       <Text color="#EF4444" fontSize={12} mb={4}>{errors.category}</Text>
// // // // // // //                     )}
// // // // // // //                     <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
// // // // // // //                       {categories.map(category => (
// // // // // // //                         <TouchableOpacity
// // // // // // //                           key={category}
// // // // // // //                           onPress={() => setFormData({...formData, category})}
// // // // // // //                           style={{
// // // // // // //                             paddingHorizontal: 12,
// // // // // // //                             paddingVertical: 8,
// // // // // // //                             backgroundColor: formData.category === category ? getCategoryColor(category) + '20' : '#333333',
// // // // // // //                             borderRadius: 8,
// // // // // // //                             borderWidth: 1,
// // // // // // //                             borderColor: formData.category === category ? getCategoryColor(category) : '#444444',
// // // // // // //                           }}
// // // // // // //                         >
// // // // // // //                           <Text color={formData.category === category ? getCategoryColor(category) : '#666666'} fontSize={12} fontWeight="700">
// // // // // // //                             {category}
// // // // // // //                           </Text>
// // // // // // //                         </TouchableOpacity>
// // // // // // //                       ))}
// // // // // // //                     </View>
// // // // // // //                   </YStack>

// // // // // // //                   {/* Date */}
// // // // // // //                   <YStack>
// // // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // // //                       Date (YYYY-MM-DD) *
// // // // // // //                     </Text>
// // // // // // //                     <Input
// // // // // // //                       placeholder="2024-01-15"
// // // // // // //                       value={formData.date}
// // // // // // //                       onChangeText={(text) => setFormData({...formData, date: text})}
// // // // // // //                       backgroundColor="#333333"
// // // // // // //                       borderColor={errors.date ? '#EF4444' : '#444444'}
// // // // // // //                       color="white"
// // // // // // //                       placeholderTextColor="#666666"
// // // // // // //                       fontSize={16}
// // // // // // //                     />
// // // // // // //                     {errors.date && (
// // // // // // //                       <Text color="#EF4444" fontSize={12} mt={4}>{errors.date}</Text>
// // // // // // //                     )}
// // // // // // //                     <Text color="#666666" fontSize={12} mt={4}>
// // // // // // //                       Format: YYYY-MM-DD
// // // // // // //                     </Text>
// // // // // // //                   </YStack>

// // // // // // //                   {/* Submit Button */}
// // // // // // //                   <TouchableOpacity
// // // // // // //                     onPress={selectedTransaction ? handleUpdateTransaction : handleAddTransaction}
// // // // // // //                     style={{
// // // // // // //                       backgroundColor: '#EAB308',
// // // // // // //                       padding: 16,
// // // // // // //                       borderRadius: 12,
// // // // // // //                       alignItems: 'center',
// // // // // // //                       marginTop: 8,
// // // // // // //                     }}
// // // // // // //                   >
// // // // // // //                     <Text color="black" fontSize={16} fontWeight="800">
// // // // // // //                       {selectedTransaction ? 'Update Transaction' : 'Add Transaction'}
// // // // // // //                     </Text>
// // // // // // //                   </TouchableOpacity>
// // // // // // //                 </YStack>
// // // // // // //               </View>
// // // // // // //             </ScrollView>
// // // // // // //           </View>
// // // // // // //         </Modal>
// // // // // // //       </SafeAreaView>
// // // // // // //     </Theme>
// // // // // // //   );
// // // // // // // }





// // // // // // // app/(drawer)/(tabs)/transactions.jsx
// // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // import {
// // // // // //   ScrollView,
// // // // // //   TouchableOpacity,
// // // // // //   Alert,
// // // // // //   Modal,
// // // // // //   FlatList,
// // // // // //   View
// // // // // // } from 'react-native';
// // // // // // import {
// // // // // //   YStack,
// // // // // //   XStack,
// // // // // //   Text,
// // // // // //   H2,
// // // // // //   H4,
// // // // // //   Theme,
// // // // // //   Spinner,
// // // // // //   Input,
// // // // // //   Card
// // // // // // } from 'tamagui';
// // // // // // import {
// // // // // //   ArrowLeft,
// // // // // //   Plus,
// // // // // //   Search,
// // // // // //   Calendar,
// // // // // //   Tag,
// // // // // //   DollarSign,
// // // // // //   Edit3,
// // // // // //   Trash2,
// // // // // //   X,
// // // // // //   TrendingUp,
// // // // // //   TrendingDown,
// // // // // //   CheckCircle,
// // // // // //   Store
// // // // // // } from '@tamagui/lucide-icons';
// // // // // // import { useRouter, useFocusEffect } from 'expo-router';
// // // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // // // import DateTimePicker from '@react-native-community/datetimepicker';

// // // // // // // Services
// // // // // // import { ApiService } from '../../../services/apiService';

// // // // // // export default function Transactions() {
// // // // // //   const router = useRouter();
// // // // // //   const insets = useSafeAreaInsets();
  
// // // // // //   // State
// // // // // //   const [transactions, setTransactions] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [refreshing, setRefreshing] = useState(false);
// // // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // // // //   const [showDatePicker, setShowDatePicker] = useState(false);
// // // // // //   const [selectedTransaction, setSelectedTransaction] = useState(null);
  
// // // // // //   // Form state - MATCH YOUR EXACT API SCHEMA
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     amount: '',
// // // // // //     currency: 'INR',
// // // // // //     occurred_at: new Date().toISOString(),
// // // // // //     category_id: '', // This should be a UUID from your categories
// // // // // //     merchant_raw: '',
// // // // // //     description: '',
// // // // // //     source: 'manual' // Always manual for user entries
// // // // // //   });

// // // // // //   // Error state
// // // // // //   const [errors, setErrors] = useState({});

// // // // // //   // NOTE: You need to fetch categories from your backend
// // // // // //   // For now, using placeholder categories
// // // // // //   const categories = [
// // // // // //     { id: 'food', name: 'Food & Dining' },
// // // // // //     { id: 'shopping', name: 'Shopping' },
// // // // // //     { id: 'transport', name: 'Transportation' },
// // // // // //     { id: 'entertainment', name: 'Entertainment' },
// // // // // //     { id: 'health', name: 'Healthcare' },
// // // // // //     { id: 'bills', name: 'Bills & Utilities' },
// // // // // //     { id: 'education', name: 'Education' },
// // // // // //     { id: 'travel', name: 'Travel' },
// // // // // //     { id: 'investment', name: 'Investments' },
// // // // // //     { id: 'income', name: 'Income' },
// // // // // //     { id: 'savings', name: 'Savings' },
// // // // // //     { id: 'other', name: 'Other' }
// // // // // //   ];

// // // // // //   // Fetch transactions
// // // // // //   const fetchTransactions = useCallback(async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const response = await ApiService.getTransactions();
// // // // // //       console.log('Transactions fetched:', response.data?.length || 0);
// // // // // //       setTransactions(response.data || []);
// // // // // //     } catch (error) {
// // // // // //       console.error('Fetch transactions error:', error.response?.data || error.message);
// // // // // //       Alert.alert('Error', 'Failed to load transactions');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //       setRefreshing(false);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   useFocusEffect(
// // // // // //     useCallback(() => {
// // // // // //       fetchTransactions();
// // // // // //     }, [fetchTransactions])
// // // // // //   );

// // // // // //   const onRefresh = useCallback(() => {
// // // // // //     setRefreshing(true);
// // // // // //     fetchTransactions();
// // // // // //   }, [fetchTransactions]);

// // // // // //   // Validate form
// // // // // //   const validateForm = () => {
// // // // // //     const newErrors = {};
    
// // // // // //     if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
// // // // // //       newErrors.amount = 'Please enter a valid amount';
// // // // // //     }
    
// // // // // //     if (!formData.description?.trim()) {
// // // // // //       newErrors.description = 'Please enter a description';
// // // // // //     }
    
// // // // // //     if (!formData.merchant_raw?.trim()) {
// // // // // //       newErrors.merchant_raw = 'Please enter merchant/store name';
// // // // // //     }
    
// // // // // //     if (!formData.category_id) {
// // // // // //       newErrors.category_id = 'Please select a category';
// // // // // //     }
    
// // // // // //     setErrors(newErrors);
// // // // // //     return Object.keys(newErrors).length === 0;
// // // // // //   };

// // // // // //   // Reset form
// // // // // //   const resetForm = () => {
// // // // // //     setFormData({
// // // // // //       amount: '',
// // // // // //       currency: 'INR',
// // // // // //       occurred_at: new Date().toISOString(),
// // // // // //       category_id: '',
// // // // // //       merchant_raw: '',
// // // // // //       description: '',
// // // // // //       source: 'manual'
// // // // // //     });
// // // // // //     setErrors({});
// // // // // //     setSelectedTransaction(null);
// // // // // //   };

// // // // // //   // Handle date change
// // // // // //   const handleDateChange = (event, selectedDate) => {
// // // // // //     setShowDatePicker(false);
// // // // // //     if (selectedDate) {
// // // // // //       setFormData({...formData, occurred_at: selectedDate.toISOString()});
// // // // // //     }
// // // // // //   };

// // // // // //   // Format date for display
// // // // // //   const formatDisplayDate = (dateString) => {
// // // // // //     if (!dateString) return '';
// // // // // //     const date = new Date(dateString);
// // // // // //     return date.toLocaleDateString('en-IN', {
// // // // // //       day: '2-digit',
// // // // // //       month: '2-digit',
// // // // // //       year: 'numeric',
// // // // // //       hour: '2-digit',
// // // // // //       minute: '2-digit'
// // // // // //     });
// // // // // //   };

// // // // // //   // Format date for API (YYYY-MM-DD)
// // // // // //   const formatDateForAPI = (dateString) => {
// // // // // //     if (!dateString) return '';
// // // // // //     const date = new Date(dateString);
// // // // // //     return date.toISOString().split('T')[0];
// // // // // //   };

// // // // // //   // Add transaction - MATCH YOUR EXACT API
// // // // // //   const handleAddTransaction = async () => {
// // // // // //     try {
// // // // // //       if (!validateForm()) {
// // // // // //         return;
// // // // // //       }

// // // // // //       // Prepare data exactly as your API expects
// // // // // //       const transactionData = {
// // // // // //         amount: parseFloat(formData.amount),
// // // // // //         currency: formData.currency,
// // // // // //         occurred_at: formData.occurred_at,
// // // // // //         category_id: formData.category_id,
// // // // // //         merchant_raw: formData.merchant_raw.trim(),
// // // // // //         description: formData.description.trim(),
// // // // // //         source: 'manual' // Always manual for user entries
// // // // // //       };

// // // // // //       console.log('Creating transaction:', transactionData);

// // // // // //       const response = await ApiService.createTransaction(transactionData);
// // // // // //       console.log('Transaction created:', response.data);
      
// // // // // //       setShowAddModal(false);
// // // // // //       resetForm();
// // // // // //       fetchTransactions();
// // // // // //       Alert.alert('Success', 'Transaction added successfully');
      
// // // // // //     } catch (error) {
// // // // // //       console.error('Add transaction error:', error.response?.data || error);
      
// // // // // //       // Show detailed validation errors
// // // // // //       if (error.response?.data?.detail) {
// // // // // //         const apiErrors = error.response.data.detail;
// // // // // //         const errorMessages = apiErrors.map(err => 
// // // // // //           `${err.loc?.join('.') || 'Error'}: ${err.msg}`
// // // // // //         ).join('\n');
// // // // // //         Alert.alert('Validation Error', errorMessages);
// // // // // //       } else {
// // // // // //         Alert.alert('Error', error.message || 'Failed to add transaction');
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   // Update transaction
// // // // // //   const handleUpdateTransaction = async () => {
// // // // // //     try {
// // // // // //       if (!selectedTransaction) return;
      
// // // // // //       if (!validateForm()) {
// // // // // //         return;
// // // // // //       }

// // // // // //       const transactionData = {
// // // // // //         amount: parseFloat(formData.amount),
// // // // // //         currency: formData.currency,
// // // // // //         occurred_at: formData.occurred_at,
// // // // // //         category_id: formData.category_id,
// // // // // //         merchant_raw: formData.merchant_raw.trim(),
// // // // // //         description: formData.description.trim(),
// // // // // //         source: 'manual' // Source remains manual
// // // // // //       };

// // // // // //       console.log('Updating transaction:', selectedTransaction.id, transactionData);

// // // // // //       await ApiService.updateTransaction(selectedTransaction.id, transactionData);
      
// // // // // //       setShowAddModal(false);
// // // // // //       resetForm();
// // // // // //       fetchTransactions();
// // // // // //       Alert.alert('Success', 'Transaction updated successfully');
      
// // // // // //     } catch (error) {
// // // // // //       console.error('Update transaction error:', error.response?.data || error);
// // // // // //       if (error.response?.data?.detail) {
// // // // // //         const apiErrors = error.response.data.detail;
// // // // // //         const errorMessages = apiErrors.map(err => err.msg).join('\n');
// // // // // //         Alert.alert('Validation Error', errorMessages);
// // // // // //       } else {
// // // // // //         Alert.alert('Error', 'Failed to update transaction');
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   // Delete transaction
// // // // // //   const handleDeleteTransaction = async (id) => {
// // // // // //     Alert.alert(
// // // // // //       'Delete Transaction',
// // // // // //       'Are you sure you want to delete this transaction?',
// // // // // //       [
// // // // // //         { text: 'Cancel', style: 'cancel' },
// // // // // //         { 
// // // // // //           text: 'Delete', 
// // // // // //           style: 'destructive',
// // // // // //           onPress: async () => {
// // // // // //             try {
// // // // // //               // You might need a delete endpoint or mark as deleted
// // // // // //               // For now, using update with deleted status
// // // // // //               await ApiService.updateTransaction(id, { 
// // // // // //                 status: 'deleted'
// // // // // //               });
// // // // // //               fetchTransactions();
// // // // // //               Alert.alert('Success', 'Transaction deleted');
// // // // // //             } catch (error) {
// // // // // //               console.error('Delete error:', error);
// // // // // //               Alert.alert('Error', 'Failed to delete transaction');
// // // // // //             }
// // // // // //           }
// // // // // //         }
// // // // // //       ]
// // // // // //     );
// // // // // //   };

// // // // // //   // Open edit modal
// // // // // //   const openEditModal = (transaction) => {
// // // // // //     setSelectedTransaction(transaction);
// // // // // //     setFormData({
// // // // // //       amount: transaction.amount?.toString() || '',
// // // // // //       currency: transaction.currency || 'INR',
// // // // // //       occurred_at: transaction.occurred_at || new Date().toISOString(),
// // // // // //       category_id: transaction.category_id || '',
// // // // // //       merchant_raw: transaction.merchant_raw || '',
// // // // // //       description: transaction.description || '',
// // // // // //       source: 'manual'
// // // // // //     });
// // // // // //     setShowAddModal(true);
// // // // // //   };

// // // // // //   // Filter transactions
// // // // // //   const filteredTransactions = transactions
// // // // // //     .filter(txn => txn && txn.source === 'manual') // Only show manual transactions
// // // // // //     .filter(txn => {
// // // // // //       const matchesSearch = !searchQuery || 
// // // // // //         txn.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // // //         txn.merchant_raw?.toLowerCase().includes(searchQuery.toLowerCase());
// // // // // //       return matchesSearch;
// // // // // //     });

// // // // // //   const formatCurrency = (amount, currency = 'INR') =>
// // // // // //     new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount || 0);

// // // // // //   const formatTransactionDate = (dateString) => {
// // // // // //     if (!dateString) return 'N/A';
// // // // // //     const date = new Date(dateString);
// // // // // //     return date.toLocaleDateString('en-IN', {
// // // // // //       day: 'numeric',
// // // // // //       month: 'short',
// // // // // //       hour: '2-digit',
// // // // // //       minute: '2-digit'
// // // // // //     });
// // // // // //   };

// // // // // //   const getCategoryName = (categoryId) => {
// // // // // //     const category = categories.find(cat => cat.id === categoryId);
// // // // // //     return category?.name || 'Unknown';
// // // // // //   };

// // // // // //   const getCategoryColor = (categoryId) => {
// // // // // //     const colors = {
// // // // // //       'food': '#EF4444',
// // // // // //       'shopping': '#8B5CF6',
// // // // // //       'transport': '#3B82F6',
// // // // // //       'entertainment': '#EC4899',
// // // // // //       'health': '#10B981',
// // // // // //       'bills': '#F59E0B',
// // // // // //       'education': '#06B6D4',
// // // // // //       'travel': '#F97316',
// // // // // //       'investment': '#22C55E',
// // // // // //       'income': '#84CC16',
// // // // // //       'savings': '#22C55E',
// // // // // //       'other': '#64748B'
// // // // // //     };
// // // // // //     return colors[categoryId] || '#64748B';
// // // // // //   };

// // // // // //   if (loading && !transactions.length) {
// // // // // //     return (
// // // // // //       <Theme name="dark">
// // // // // //         <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // // // // //           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // // // // //             <Spinner size="large" color="#EAB308" />
// // // // // //             <Text color="white" mt={16}>Loading transactions...</Text>
// // // // // //           </View>
// // // // // //         </SafeAreaView>
// // // // // //       </Theme>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <Theme name="dark">
// // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // // // // //         {/* HEADER */}
// // // // // //         <XStack p={20} ai="center" space={16}>
// // // // // //           <TouchableOpacity onPress={() => router.back()}>
// // // // // //             <ArrowLeft size={24} color="#EAB308" />
// // // // // //           </TouchableOpacity>
          
// // // // // //           <YStack flex={1}>
// // // // // //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
// // // // // //               Transactions
// // // // // //             </H2>
// // // // // //             <Text color="#666666" fontSize={14}>
// // // // // //               Manual entries only
// // // // // //             </Text>
// // // // // //           </YStack>
          
// // // // // //           <TouchableOpacity 
// // // // // //             onPress={() => setShowAddModal(true)}
// // // // // //             style={{
// // // // // //               width: 44,
// // // // // //               height: 44,
// // // // // //               borderRadius: 22,
// // // // // //               backgroundColor: '#1A1A1A',
// // // // // //               justifyContent: 'center',
// // // // // //               alignItems: 'center',
// // // // // //               borderWidth: 1,
// // // // // //               borderColor: '#EAB308',
// // // // // //             }}
// // // // // //           >
// // // // // //             <Plus size={20} color="#EAB308" />
// // // // // //           </TouchableOpacity>
// // // // // //         </XStack>

// // // // // //         {/* SEARCH */}
// // // // // //         <XStack p={20} pb={12}>
// // // // // //           <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 12 }}>
// // // // // //             <Search size={16} color="#666666" />
// // // // // //             <Input
// // // // // //               placeholder="Search transactions..."
// // // // // //               value={searchQuery}
// // // // // //               onChangeText={setSearchQuery}
// // // // // //               backgroundColor="transparent"
// // // // // //               borderWidth={0}
// // // // // //               color="white"
// // // // // //               placeholderTextColor="#666666"
// // // // // //               fontSize={14}
// // // // // //               flex={1}
// // // // // //             />
// // // // // //           </View>
// // // // // //         </XStack>

// // // // // //         {/* TRANSACTIONS LIST */}
// // // // // //         <FlatList
// // // // // //           data={filteredTransactions}
// // // // // //           keyExtractor={(item, index) => item?.id || index.toString()}
// // // // // //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
// // // // // //           showsVerticalScrollIndicator={false}
// // // // // //           refreshing={refreshing}
// // // // // //           onRefresh={onRefresh}
// // // // // //           ListEmptyComponent={
// // // // // //             <YStack ai="center" py={48}>
// // // // // //               <DollarSign size={64} color="#333333" />
// // // // // //               <Text color="#666666" fontSize={16} mt={16}>
// // // // // //                 No transactions yet
// // // // // //               </Text>
// // // // // //               <Text color="#444444" fontSize={14} mt={8} mb={16}>
// // // // // //                 Add your first manual transaction
// // // // // //               </Text>
// // // // // //               <TouchableOpacity 
// // // // // //                 onPress={() => setShowAddModal(true)}
// // // // // //                 style={{
// // // // // //                   backgroundColor: '#EAB308',
// // // // // //                   paddingHorizontal: 24,
// // // // // //                   paddingVertical: 12,
// // // // // //                   borderRadius: 12,
// // // // // //                 }}
// // // // // //               >
// // // // // //                 <Text color="black" fontSize={14} fontWeight="700">Add Transaction</Text>
// // // // // //               </TouchableOpacity>
// // // // // //             </YStack>
// // // // // //           }
// // // // // //           renderItem={({ item }) => {
// // // // // //             if (!item) return null;
            
// // // // // //             const isExpense = item.amount < 0;
            
// // // // // //             return (
// // // // // //               <TouchableOpacity 
// // // // // //                 onPress={() => openEditModal(item)}
// // // // // //                 activeOpacity={0.8}
// // // // // //               >
// // // // // //                 <Card 
// // // // // //                   backgroundColor="#1A1A1A" 
// // // // // //                   mb={12} 
// // // // // //                   p={16} 
// // // // // //                   borderRadius={12}
// // // // // //                   borderLeftWidth={4}
// // // // // //                   borderLeftColor={getCategoryColor(item.category_id)}
// // // // // //                 >
// // // // // //                   <XStack jc="space-between" ai="center">
// // // // // //                     <YStack flex={1}>
// // // // // //                       <XStack ai="center" space={8} mb={4}>
// // // // // //                         {item.source === 'manual' && (
// // // // // //                           <CheckCircle size={14} color="#666666" />
// // // // // //                         )}
// // // // // //                         <Text color="white" fontWeight="800" fontSize={16} numberOfLines={1}>
// // // // // //                           {item.description || item.merchant_raw || 'No description'}
// // // // // //                         </Text>
// // // // // //                       </XStack>
                      
// // // // // //                       <XStack ai="center" space={12} mt={4}>
// // // // // //                         <Text color="#666666" fontSize={12}>
// // // // // //                           {formatTransactionDate(item.occurred_at)}
// // // // // //                         </Text>
                        
// // // // // //                         {item.merchant_raw && (
// // // // // //                           <XStack ai="center" space={4}>
// // // // // //                             <Store size={12} color="#666666" />
// // // // // //                             <Text color="#666666" fontSize={12}>
// // // // // //                               {item.merchant_raw}
// // // // // //                             </Text>
// // // // // //                           </XStack>
// // // // // //                         )}
                        
// // // // // //                         {item.category_id && (
// // // // // //                           <View style={{
// // // // // //                             backgroundColor: getCategoryColor(item.category_id) + '20',
// // // // // //                             paddingHorizontal: 8,
// // // // // //                             paddingVertical: 2,
// // // // // //                             borderRadius: 4,
// // // // // //                           }}>
// // // // // //                             <Text color={getCategoryColor(item.category_id)} fontSize={10} fontWeight="700">
// // // // // //                               {getCategoryName(item.category_id)}
// // // // // //                             </Text>
// // // // // //                           </View>
// // // // // //                         )}
// // // // // //                       </XStack>
// // // // // //                     </YStack>
                    
// // // // // //                     <XStack ai="center" space={12}>
// // // // // //                       <Text 
// // // // // //                         color={isExpense ? "#EF4444" : "#22C55E"} 
// // // // // //                         fontWeight="800" 
// // // // // //                         fontSize={16}
// // // // // //                       >
// // // // // //                         {isExpense ? '-' : '+'}{formatCurrency(Math.abs(item.amount || 0), item.currency)}
// // // // // //                       </Text>
                      
// // // // // //                       <TouchableOpacity 
// // // // // //                         onPress={(e) => {
// // // // // //                           e.stopPropagation();
// // // // // //                           handleDeleteTransaction(item.id);
// // // // // //                         }}
// // // // // //                         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
// // // // // //                       >
// // // // // //                         <Trash2 size={16} color="#EF4444" />
// // // // // //                       </TouchableOpacity>
// // // // // //                     </XStack>
// // // // // //                   </XStack>
// // // // // //                 </Card>
// // // // // //               </TouchableOpacity>
// // // // // //             );
// // // // // //           }}
// // // // // //         />

// // // // // //         {/* ADD/EDIT TRANSACTION MODAL */}
// // // // // //         <Modal
// // // // // //           visible={showAddModal}
// // // // // //           animationType="slide"
// // // // // //           transparent={true}
// // // // // //           onRequestClose={() => {
// // // // // //             setShowAddModal(false);
// // // // // //             resetForm();
// // // // // //           }}
// // // // // //         >
// // // // // //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
// // // // // //             <ScrollView 
// // // // // //               style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' }}
// // // // // //               showsVerticalScrollIndicator={false}
// // // // // //             >
// // // // // //               <View style={{ padding: 24, paddingBottom: insets.bottom + 20 }}>
// // // // // //                 <XStack jc="space-between" ai="center" mb={24}>
// // // // // //                   <H4 color="white" fontWeight="800" fontSize={20}>
// // // // // //                     {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
// // // // // //                   </H4>
// // // // // //                   <TouchableOpacity onPress={() => {
// // // // // //                     setShowAddModal(false);
// // // // // //                     resetForm();
// // // // // //                   }}>
// // // // // //                     <X size={24} color="#666666" />
// // // // // //                   </TouchableOpacity>
// // // // // //                 </XStack>

// // // // // //                 <YStack space={16}>
// // // // // //                   {/* Amount */}
// // // // // //                   <YStack>
// // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // //                       Amount (₹) *
// // // // // //                     </Text>
// // // // // //                     <Input
// // // // // //                       placeholder="0.00"
// // // // // //                       value={formData.amount}
// // // // // //                       onChangeText={(text) => setFormData({...formData, amount: text})}
// // // // // //                       backgroundColor="#333333"
// // // // // //                       borderColor={errors.amount ? '#EF4444' : '#444444'}
// // // // // //                       color="white"
// // // // // //                       placeholderTextColor="#666666"
// // // // // //                       keyboardType="decimal-pad"
// // // // // //                       fontSize={16}
// // // // // //                     />
// // // // // //                     {errors.amount && (
// // // // // //                       <Text color="#EF4444" fontSize={12} mt={4}>{errors.amount}</Text>
// // // // // //                     )}
// // // // // //                   </YStack>

// // // // // //                   {/* Merchant/Store */}
// // // // // //                   <YStack>
// // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // //                       Merchant/Store *
// // // // // //                     </Text>
// // // // // //                     <Input
// // // // // //                       placeholder="Where did this happen?"
// // // // // //                       value={formData.merchant_raw}
// // // // // //                       onChangeText={(text) => setFormData({...formData, merchant_raw: text})}
// // // // // //                       backgroundColor="#333333"
// // // // // //                       borderColor={errors.merchant_raw ? '#EF4444' : '#444444'}
// // // // // //                       color="white"
// // // // // //                       placeholderTextColor="#666666"
// // // // // //                       fontSize={16}
// // // // // //                     />
// // // // // //                     {errors.merchant_raw && (
// // // // // //                       <Text color="#EF4444" fontSize={12} mt={4}>{errors.merchant_raw}</Text>
// // // // // //                     )}
// // // // // //                   </YStack>

// // // // // //                   {/* Description */}
// // // // // //                   <YStack>
// // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // //                       Description *
// // // // // //                     </Text>
// // // // // //                     <Input
// // // // // //                       placeholder="What was this for?"
// // // // // //                       value={formData.description}
// // // // // //                       onChangeText={(text) => setFormData({...formData, description: text})}
// // // // // //                       backgroundColor="#333333"
// // // // // //                       borderColor={errors.description ? '#EF4444' : '#444444'}
// // // // // //                       color="white"
// // // // // //                       placeholderTextColor="#666666"
// // // // // //                       fontSize={16}
// // // // // //                     />
// // // // // //                     {errors.description && (
// // // // // //                       <Text color="#EF4444" fontSize={12} mt={4}>{errors.description}</Text>
// // // // // //                     )}
// // // // // //                   </YStack>

// // // // // //                   {/* Category */}
// // // // // //                   <YStack>
// // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // //                       Category *
// // // // // //                     </Text>
// // // // // //                     {errors.category_id && (
// // // // // //                       <Text color="#EF4444" fontSize={12} mb={4}>{errors.category_id}</Text>
// // // // // //                     )}
// // // // // //                     <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
// // // // // //                       {categories.map(category => (
// // // // // //                         <TouchableOpacity
// // // // // //                           key={category.id}
// // // // // //                           onPress={() => setFormData({...formData, category_id: category.id})}
// // // // // //                           style={{
// // // // // //                             paddingHorizontal: 12,
// // // // // //                             paddingVertical: 8,
// // // // // //                             backgroundColor: formData.category_id === category.id ? getCategoryColor(category.id) + '20' : '#333333',
// // // // // //                             borderRadius: 8,
// // // // // //                             borderWidth: 1,
// // // // // //                             borderColor: formData.category_id === category.id ? getCategoryColor(category.id) : '#444444',
// // // // // //                           }}
// // // // // //                         >
// // // // // //                           <Text color={formData.category_id === category.id ? getCategoryColor(category.id) : '#666666'} fontSize={12} fontWeight="700">
// // // // // //                             {category.name}
// // // // // //                           </Text>
// // // // // //                         </TouchableOpacity>
// // // // // //                       ))}
// // // // // //                     </View>
// // // // // //                   </YStack>

// // // // // //                   {/* Date & Time */}
// // // // // //                   <YStack>
// // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // //                       Date & Time *
// // // // // //                     </Text>
// // // // // //                     <TouchableOpacity
// // // // // //                       onPress={() => setShowDatePicker(true)}
// // // // // //                       style={{
// // // // // //                         padding: 16,
// // // // // //                         backgroundColor: '#333333',
// // // // // //                         borderRadius: 12,
// // // // // //                         borderWidth: 1,
// // // // // //                         borderColor: '#444444',
// // // // // //                       }}
// // // // // //                     >
// // // // // //                       <Text color="white" fontSize={16}>
// // // // // //                         {formatDisplayDate(formData.occurred_at)}
// // // // // //                       </Text>
// // // // // //                     </TouchableOpacity>
                    
// // // // // //                     {showDatePicker && (
// // // // // //                       <DateTimePicker
// // // // // //                         value={new Date(formData.occurred_at)}
// // // // // //                         mode="datetime"
// // // // // //                         display="default"
// // // // // //                         onChange={handleDateChange}
// // // // // //                       />
// // // // // //                     )}
// // // // // //                   </YStack>

// // // // // //                   {/* Currency */}
// // // // // //                   <YStack>
// // // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // // //                       Currency
// // // // // //                     </Text>
// // // // // //                     <View style={{
// // // // // //                       padding: 16,
// // // // // //                       backgroundColor: '#333333',
// // // // // //                       borderRadius: 12,
// // // // // //                       borderWidth: 1,
// // // // // //                       borderColor: '#444444',
// // // // // //                     }}>
// // // // // //                       <Text color="white" fontSize={16}>
// // // // // //                         {formData.currency}
// // // // // //                       </Text>
// // // // // //                     </View>
// // // // // //                   </YStack>

// // // // // //                   {/* Source - Always manual for user entries */}
// // // // // //                   <XStack ai="center" space={8} p={12} backgroundColor="#222222" borderRadius={8}>
// // // // // //                     <CheckCircle size={16} color="#EAB308" />
// // // // // //                     <Text color="#EAB308" fontSize={12} fontWeight="700">
// // // // // //                       Manual Entry
// // // // // //                     </Text>
// // // // // //                   </XStack>

// // // // // //                   {/* Submit Button */}
// // // // // //                   <TouchableOpacity
// // // // // //                     onPress={selectedTransaction ? handleUpdateTransaction : handleAddTransaction}
// // // // // //                     style={{
// // // // // //                       backgroundColor: '#EAB308',
// // // // // //                       padding: 16,
// // // // // //                       borderRadius: 12,
// // // // // //                       alignItems: 'center',
// // // // // //                       marginTop: 8,
// // // // // //                     }}
// // // // // //                   >
// // // // // //                     <Text color="black" fontSize={16} fontWeight="800">
// // // // // //                       {selectedTransaction ? 'Update Transaction' : 'Add Transaction'}
// // // // // //                     </Text>
// // // // // //                   </TouchableOpacity>
// // // // // //                 </YStack>
// // // // // //               </View>
// // // // // //             </ScrollView>
// // // // // //           </View>
// // // // // //         </Modal>
// // // // // //       </SafeAreaView>
// // // // // //     </Theme>
// // // // // //   );
// // // // // // }




// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import {
// // // // //   ScrollView,
// // // // //   TouchableOpacity,
// // // // //   Alert,
// // // // //   Modal,
// // // // //   FlatList,
// // // // //   View
// // // // // } from 'react-native';
// // // // // import {
// // // // //   YStack,
// // // // //   XStack,
// // // // //   Text,
// // // // //   H2,
// // // // //   H4,
// // // // //   Theme,
// // // // //   Spinner,
// // // // //   Input,
// // // // //   Card,
// // // // //   Button
// // // // // } from 'tamagui';
// // // // // import {
// // // // //   ArrowLeft,
// // // // //   Plus,
// // // // //   Search,
// // // // //   Calendar,
// // // // //   Tag,
// // // // //   DollarSign,
// // // // //   Edit3,
// // // // //   Trash2,
// // // // //   X,
// // // // //   TrendingUp,
// // // // //   TrendingDown,
// // // // //   CheckCircle,
// // // // //   Store
// // // // // } from '@tamagui/lucide-icons';
// // // // // import { useRouter, useFocusEffect } from 'expo-router';
// // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // // import DateTimePicker from '@react-native-community/datetimepicker';

// // // // // // Services
// // // // // import { ApiService } from '../../../services/apiService';

// // // // // export default function Transactions() {
// // // // //   const router = useRouter();
// // // // //   const insets = useSafeAreaInsets();
  
// // // // //   // State
// // // // //   const [transactions, setTransactions] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [refreshing, setRefreshing] = useState(false);
// // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // // //   const [showDatePicker, setShowDatePicker] = useState(false);
// // // // //   const [selectedTransaction, setSelectedTransaction] = useState(null);
  
// // // // //   // Form state - MATCH YOUR EXACT API SCHEMA
// // // // //   const [formData, setFormData] = useState({
// // // // //     amount: '',
// // // // //     currency: 'INR',
// // // // //     occurred_at: new Date().toISOString(),
// // // // //     category_id: '', 
// // // // //     merchant_raw: '',
// // // // //     description: '',
// // // // //     source: 'manual' 
// // // // //   });

// // // // //   // Error state
// // // // //   const [errors, setErrors] = useState({});

// // // // //   // ✅ FIXED: Using valid UUID strings to satisfy backend uuid_parsing
// // // // //   const categories = [
// // // // //     { id: '00000000-0000-0000-0000-000000000001', name: 'Food & Dining', slug: 'food' },
// // // // //     { id: '00000000-0000-0000-0000-000000000002', name: 'Shopping', slug: 'shopping' },
// // // // //     { id: '00000000-0000-0000-0000-000000000003', name: 'Transportation', slug: 'transport' },
// // // // //     { id: '00000000-0000-0000-0000-000000000004', name: 'Entertainment', slug: 'entertainment' },
// // // // //     { id: '00000000-0000-0000-0000-000000000005', name: 'Healthcare', slug: 'health' },
// // // // //     { id: '00000000-0000-0000-0000-000000000006', name: 'Bills & Utilities', slug: 'bills' },
// // // // //     { id: '00000000-0000-0000-0000-000000000007', name: 'Education', slug: 'education' },
// // // // //     { id: '00000000-0000-0000-0000-000000000008', name: 'Travel', slug: 'travel' },
// // // // //     { id: '00000000-0000-0000-0000-000000000009', name: 'Investments', slug: 'investment' },
// // // // //     { id: '00000000-0000-0000-0000-000000000010', name: 'Income', slug: 'income' },
// // // // //     { id: '00000000-0000-0000-0000-000000000011', name: 'Savings', slug: 'savings' },
// // // // //     { id: '00000000-0000-0000-0000-000000000012', name: 'Other', slug: 'other' }
// // // // //   ];

// // // // //   // Fetch transactions
// // // // //   const fetchTransactions = useCallback(async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const response = await ApiService.getTransactions();
// // // // //       setTransactions(response.data || []);
// // // // //     } catch (error) {
// // // // //       console.error('Fetch transactions error:', error.message);
// // // // //       Alert.alert('Error', 'Failed to load transactions');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //       setRefreshing(false);
// // // // //     }
// // // // //   }, []);

// // // // //   useFocusEffect(
// // // // //     useCallback(() => {
// // // // //       fetchTransactions();
// // // // //     }, [fetchTransactions])
// // // // //   );

// // // // //   const onRefresh = useCallback(() => {
// // // // //     setRefreshing(true);
// // // // //     fetchTransactions();
// // // // //   }, [fetchTransactions]);

// // // // //   // Validate form
// // // // //   const validateForm = () => {
// // // // //     const newErrors = {};
// // // // //     if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
// // // // //       newErrors.amount = 'Please enter a valid amount';
// // // // //     }
// // // // //     if (!formData.description?.trim()) {
// // // // //       newErrors.description = 'Please enter a description';
// // // // //     }
// // // // //     if (!formData.merchant_raw?.trim()) {
// // // // //       newErrors.merchant_raw = 'Please enter merchant/store name';
// // // // //     }
// // // // //     if (!formData.category_id) {
// // // // //       newErrors.category_id = 'Please select a category';
// // // // //     }
// // // // //     setErrors(newErrors);
// // // // //     return Object.keys(newErrors).length === 0;
// // // // //   };

// // // // //   // Reset form
// // // // //   const resetForm = () => {
// // // // //     setFormData({
// // // // //       amount: '',
// // // // //       currency: 'INR',
// // // // //       occurred_at: new Date().toISOString(),
// // // // //       category_id: '',
// // // // //       merchant_raw: '',
// // // // //       description: '',
// // // // //       source: 'manual'
// // // // //     });
// // // // //     setErrors({});
// // // // //     setSelectedTransaction(null);
// // // // //   };

// // // // //   const handleDateChange = (event, selectedDate) => {
// // // // //     setShowDatePicker(false);
// // // // //     if (selectedDate) {
// // // // //       setFormData({...formData, occurred_at: selectedDate.toISOString()});
// // // // //     }
// // // // //   };

// // // // //   const formatDisplayDate = (dateString) => {
// // // // //     if (!dateString) return '';
// // // // //     const date = new Date(dateString);
// // // // //     return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
// // // // //   };

// // // // //   // Add transaction
// // // // //   const handleAddTransaction = async () => {
// // // // //     try {
// // // // //       if (!validateForm()) return;

// // // // //       const transactionData = {
// // // // //         amount: parseFloat(formData.amount),
// // // // //         currency: formData.currency,
// // // // //         occurred_at: formData.occurred_at,
// // // // //         category_id: formData.category_id, // Sent as UUID
// // // // //         merchant_raw: formData.merchant_raw.trim(),
// // // // //         description: formData.description.trim(),
// // // // //         source: 'manual' 
// // // // //       };

// // // // //       await ApiService.createTransaction(transactionData);
// // // // //       setShowAddModal(false);
// // // // //       resetForm();
// // // // //       fetchTransactions();
// // // // //       Alert.alert('Success', 'Transaction added successfully');
// // // // //     } catch (error) {
// // // // //       console.error('Add transaction error:', error.response?.data || error);
// // // // //       Alert.alert('Error', 'Failed to add transaction. Check console.');
// // // // //     }
// // // // //   };

// // // // //   // Update transaction
// // // // //   const handleUpdateTransaction = async () => {
// // // // //     try {
// // // // //       if (!selectedTransaction || !validateForm()) return;

// // // // //       const transactionData = {
// // // // //         amount: parseFloat(formData.amount),
// // // // //         currency: formData.currency,
// // // // //         occurred_at: formData.occurred_at,
// // // // //         category_id: formData.category_id,
// // // // //         merchant_raw: formData.merchant_raw.trim(),
// // // // //         description: formData.description.trim(),
// // // // //         source: 'manual'
// // // // //       };

// // // // //       await ApiService.updateTransaction(selectedTransaction.id, transactionData);
// // // // //       setShowAddModal(false);
// // // // //       resetForm();
// // // // //       fetchTransactions();
// // // // //       Alert.alert('Success', 'Transaction updated successfully');
// // // // //     } catch (error) {
// // // // //       console.error('Update transaction error:', error.response?.data || error);
// // // // //       Alert.alert('Error', 'Failed to update transaction');
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteTransaction = async (id) => {
// // // // //     Alert.alert('Delete Transaction', 'Are you sure?', [
// // // // //       { text: 'Cancel', style: 'cancel' },
// // // // //       { text: 'Delete', style: 'destructive', onPress: async () => {
// // // // //           try {
// // // // //             await ApiService.updateTransaction(id, { status: 'deleted' });
// // // // //             fetchTransactions();
// // // // //           } catch (e) { console.error(e); }
// // // // //         }}
// // // // //     ]);
// // // // //   };

// // // // //   const openEditModal = (transaction) => {
// // // // //     setSelectedTransaction(transaction);
// // // // //     setFormData({
// // // // //       amount: transaction.amount?.toString() || '',
// // // // //       currency: transaction.currency || 'INR',
// // // // //       occurred_at: transaction.occurred_at || new Date().toISOString(),
// // // // //       category_id: transaction.category_id || '',
// // // // //       merchant_raw: transaction.merchant_raw || '',
// // // // //       description: transaction.description || '',
// // // // //       source: 'manual'
// // // // //     });
// // // // //     setShowAddModal(true);
// // // // //   };

// // // // //   const filteredTransactions = transactions
// // // // //     .filter(txn => txn && txn.source === 'manual')
// // // // //     .filter(txn => {
// // // // //       const matchesSearch = !searchQuery || 
// // // // //         txn.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // //         txn.merchant_raw?.toLowerCase().includes(searchQuery.toLowerCase());
// // // // //       return matchesSearch;
// // // // //     });

// // // // //   const formatCurrency = (amount, currency = 'INR') =>
// // // // //     new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency }).format(amount || 0);

// // // // //   const getCategoryName = (categoryId) => categories.find(cat => cat.id === categoryId)?.name || 'Unknown';

// // // // //   const getCategoryColor = (categoryId) => {
// // // // //     const colors = {
// // // // //       '00000000-0000-0000-0000-000000000001': '#EF4444',
// // // // //       '00000000-0000-0000-0000-000000000002': '#8B5CF6',
// // // // //       '00000000-0000-0000-0000-000000000003': '#3B82F6',
// // // // //       '00000000-0000-0000-0000-000000000009': '#22C55E'
// // // // //     };
// // // // //     return colors[categoryId] || '#64748B';
// // // // //   };

// // // // //   if (loading && !transactions.length) {
// // // // //     return (
// // // // //       <Theme name="dark">
// // // // //         <SafeAreaView style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
// // // // //           <Spinner size="large" color="#EAB308" />
// // // // //         </SafeAreaView>
// // // // //       </Theme>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <Theme name="dark">
// // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // // //         <XStack p={20} ai="center" space={16}>
// // // // //           <TouchableOpacity onPress={() => router.back()}><ArrowLeft size={24} color="#EAB308" /></TouchableOpacity>
// // // // //           <YStack flex={1}>
// // // // //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>Ledger</H2>
// // // // //             <Text color="#666" fontSize={14}>Manual protocol entries</Text>
// // // // //           </YStack>
// // // // //           <TouchableOpacity onPress={() => setShowAddModal(true)} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#1A1A1A', jc: 'center', ai: 'center', bw: 1, bc: '#EAB308' }}>
// // // // //             <Plus size={20} color="#EAB308" />
// // // // //           </TouchableOpacity>
// // // // //         </XStack>

// // // // //         <XStack p={20} pb={12}>
// // // // //           <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 12 }}>
// // // // //             <Search size={16} color="#666" />
// // // // //             <Input placeholder="Filter entries..." value={searchQuery} onChangeText={setSearchQuery} backgroundColor="transparent" bw={0} color="white" flex={1} />
// // // // //           </View>
// // // // //         </XStack>

// // // // //         <FlatList
// // // // //           data={filteredTransactions}
// // // // //           keyExtractor={(item) => item.id}
// // // // //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
// // // // //           renderItem={({ item }) => (
// // // // //             <TouchableOpacity onPress={() => openEditModal(item)} activeOpacity={0.8}>
// // // // //               <Card bg="#1A1A1A" mb={12} p={16} br={12} blw={4} blc={getCategoryColor(item.category_id)}>
// // // // //                 <XStack jc="space-between" ai="center">
// // // // //                   <YStack flex={1}>
// // // // //                     <Text color="white" fontWeight="800" fontSize={16}>{item.description}</Text>
// // // // //                     <Text color="#666" fontSize={12}>{getCategoryName(item.category_id)} • {new Date(item.occurred_at).toLocaleDateString()}</Text>
// // // // //                   </YStack>
// // // // //                   <Text color={item.amount < 0 ? "#EF4444" : "#22C55E"} fontWeight="800" fontSize={16}>
// // // // //                     {formatCurrency(item.amount)}
// // // // //                   </Text>
// // // // //                 </XStack>
// // // // //               </Card>
// // // // //             </TouchableOpacity>
// // // // //           )}
// // // // //         />

// // // // //         <Modal visible={showAddModal} animationType="slide" transparent>
// // // // //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' }}>
// // // // //             <ScrollView style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%' }}>
// // // // //               <View style={{ padding: 24, paddingBottom: insets.bottom + 20 }}>
// // // // //                 <XStack jc="space-between" ai="center" mb={24}>
// // // // //                   <H4 color="white" fontWeight="800">{selectedTransaction ? 'Edit Entry' : 'New Protocol Entry'}</H4>
// // // // //                   <TouchableOpacity onPress={() => { setShowAddModal(false); resetForm(); }}><X size={24} color="#666" /></TouchableOpacity>
// // // // //                 </XStack>

// // // // //                 <YStack space={16}>
// // // // //                   <YStack>
// // // // //                     <Text color="#999" fontSize={13} mb={8}>AMOUNT (INR)</Text>
// // // // //                     <Input placeholder="0.00" value={formData.amount} onChangeText={(t) => setFormData({...formData, amount: t})} backgroundColor="#333" color="white" keyboardType="decimal-pad" />
// // // // //                   </YStack>

// // // // //                   <YStack>
// // // // //                     <Text color="#999" fontSize={13} mb={8}>MERCHANT</Text>
// // // // //                     <Input placeholder="Store name" value={formData.merchant_raw} onChangeText={(t) => setFormData({...formData, merchant_raw: t})} backgroundColor="#333" color="white" />
// // // // //                   </YStack>

// // // // //                   <YStack>
// // // // //                     <Text color="#999" fontSize={13} mb={8}>DESCRIPTION</Text>
// // // // //                     <Input placeholder="Details..." value={formData.description} onChangeText={(t) => setFormData({...formData, description: t})} backgroundColor="#333" color="white" />
// // // // //                   </YStack>

// // // // //                   <YStack>
// // // // //                     <Text color="#999" fontSize={13} mb={8}>CATEGORY</Text>
// // // // //                     <XStack fw="wrap" gap={8}>
// // // // //                       {categories.map(cat => (
// // // // //                         <TouchableOpacity key={cat.id} onPress={() => setFormData({...formData, category_id: cat.id})} style={{ paddingHorizontal: 12, paddingVertical: 8, bg: formData.category_id === cat.id ? '#EAB308' : '#333', br: 8 }}>
// // // // //                           <Text color={formData.category_id === cat.id ? 'black' : '#999'} fontWeight="700" fontSize={12}>{cat.name}</Text>
// // // // //                         </TouchableOpacity>
// // // // //                       ))}
// // // // //                     </XStack>
// // // // //                   </YStack>

// // // // //                   <YStack>
// // // // //                     <Text color="#999" fontSize={13} mb={8}>DATE</Text>
// // // // //                     <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ padding: 16, backgroundColor: '#333', br: 12 }}>
// // // // //                       <Text color="white">{formatDisplayDate(formData.occurred_at)}</Text>
// // // // //                     </TouchableOpacity>
// // // // //                   </YStack>

// // // // //                   <Button bg="#EAB308" color="black" fontWeight="800" mt={10} onPress={selectedTransaction ? handleUpdateTransaction : handleAddTransaction}>
// // // // //                     COMMIT TO LEDGER
// // // // //                   </Button>
// // // // //                 </YStack>
// // // // //               </View>
// // // // //             </ScrollView>
// // // // //           </View>
// // // // //           {showDatePicker && <DateTimePicker value={new Date(formData.occurred_at)} mode="datetime" onChange={handleDateChange} />}
// // // // //         </Modal>
// // // // //       </SafeAreaView>
// // // // //     </Theme>
// // // // //   );
// // // // // }



// // // // // app/(drawer)/(tabs)/transactions.jsx
// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import {
// // // //   ScrollView,
// // // //   TouchableOpacity,
// // // //   Alert,
// // // //   Modal,
// // // //   FlatList,
// // // //   View
// // // // } from 'react-native';
// // // // import {
// // // //   YStack,
// // // //   XStack,
// // // //   Text,
// // // //   H2,
// // // //   H4,
// // // //   Theme,
// // // //   Spinner,
// // // //   Input,
// // // //   Card
// // // // } from 'tamagui';
// // // // import {
// // // //   ArrowLeft,
// // // //   Plus,
// // // //   Search,
// // // //   Store,
// // // //   DollarSign,
// // // //   Edit3,
// // // //   Trash2,
// // // //   X
// // // // } from '@tamagui/lucide-icons';
// // // // import { useRouter, useFocusEffect } from 'expo-router';
// // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // // // // Services
// // // // import { ApiService } from '../../../services/apiService';

// // // // export default function Transactions() {
// // // //   const router = useRouter();
// // // //   const insets = useSafeAreaInsets();
  
// // // //   // State
// // // //   const [transactions, setTransactions] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [refreshing, setRefreshing] = useState(false);
// // // //   const [searchQuery, setSearchQuery] = useState('');
// // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // //   const [selectedTransaction, setSelectedTransaction] = useState(null);
  
// // // //   // SIMPLE Form state - User only enters these 3 fields
// // // //   const [formData, setFormData] = useState({
// // // //     amount: '',
// // // //     merchant_raw: '',
// // // //     description: ''
// // // //   });

// // // //   // Fetch transactions
// // // //   const fetchTransactions = useCallback(async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const response = await ApiService.getTransactions();
// // // //       console.log('Transactions fetched:', response.data?.length || 0);
// // // //       setTransactions(response.data || []);
// // // //     } catch (error) {
// // // //       console.error('Fetch transactions error:', error);
// // // //       Alert.alert('Error', 'Failed to load transactions');
// // // //     } finally {
// // // //       setLoading(false);
// // // //       setRefreshing(false);
// // // //     }
// // // //   }, []);

// // // //   useFocusEffect(
// // // //     useCallback(() => {
// // // //       fetchTransactions();
// // // //     }, [fetchTransactions])
// // // //   );

// // // //   const onRefresh = useCallback(() => {
// // // //     setRefreshing(true);
// // // //     fetchTransactions();
// // // //   }, [fetchTransactions]);

// // // //   // Reset form
// // // //   const resetForm = () => {
// // // //     setFormData({
// // // //       amount: '',
// // // //       merchant_raw: '',
// // // //       description: ''
// // // //     });
// // // //     setSelectedTransaction(null);
// // // //   };

// // // //   // Add transaction - SIMPLE: Only 3 fields from user
// // // //   const handleAddTransaction = async () => {
// // // //     try {
// // // //       // Basic validation
// // // //       if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
// // // //         Alert.alert('Error', 'Please enter a valid amount');
// // // //         return;
// // // //       }
      
// // // //       if (!formData.merchant_raw?.trim()) {
// // // //         Alert.alert('Error', 'Please enter merchant/store name');
// // // //         return;
// // // //       }
      
// // // //       if (!formData.description?.trim()) {
// // // //         Alert.alert('Error', 'Please enter a description');
// // // //         return;
// // // //       }

// // // //       // Backend will handle: occurred_at (current time), category_id (auto-detect), currency (INR), source (manual)
// // // //       const transactionData = {
// // // //         amount: parseFloat(formData.amount),
// // // //         merchant_raw: formData.merchant_raw.trim(),
// // // //         description: formData.description.trim()
// // // //         // Backend adds: occurred_at, category_id, currency, source
// // // //       };

// // // //       console.log('Creating transaction:', transactionData);

// // // //       const response = await ApiService.createTransaction(transactionData);
// // // //       console.log('Transaction created:', response.data);
      
// // // //       setShowAddModal(false);
// // // //       resetForm();
// // // //       fetchTransactions();
// // // //       Alert.alert('Success', 'Transaction added successfully');
      
// // // //     } catch (error) {
// // // //       console.error('Add transaction error:', error);
// // // //       Alert.alert('Error', error.message || 'Failed to add transaction');
// // // //     }
// // // //   };

// // // //   // Update transaction
// // // //   const handleUpdateTransaction = async () => {
// // // //     try {
// // // //       if (!selectedTransaction) return;
      
// // // //       // Same simple validation
// // // //       if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
// // // //         Alert.alert('Error', 'Please enter a valid amount');
// // // //         return;
// // // //       }
      
// // // //       if (!formData.merchant_raw?.trim()) {
// // // //         Alert.alert('Error', 'Please enter merchant/store name');
// // // //         return;
// // // //       }
      
// // // //       if (!formData.description?.trim()) {
// // // //         Alert.alert('Error', 'Please enter a description');
// // // //         return;
// // // //       }

// // // //       const transactionData = {
// // // //         amount: parseFloat(formData.amount),
// // // //         merchant_raw: formData.merchant_raw.trim(),
// // // //         description: formData.description.trim()
// // // //       };

// // // //       await ApiService.updateTransaction(selectedTransaction.id, transactionData);
      
// // // //       setShowAddModal(false);
// // // //       resetForm();
// // // //       fetchTransactions();
// // // //       Alert.alert('Success', 'Transaction updated successfully');
      
// // // //     } catch (error) {
// // // //       console.error('Update transaction error:', error);
// // // //       Alert.alert('Error', 'Failed to update transaction');
// // // //     }
// // // //   };

// // // //   // Delete transaction
// // // //   const handleDeleteTransaction = async (id) => {
// // // //     Alert.alert(
// // // //       'Delete Transaction',
// // // //       'Are you sure you want to delete this transaction?',
// // // //       [
// // // //         { text: 'Cancel', style: 'cancel' },
// // // //         { 
// // // //           text: 'Delete', 
// // // //           style: 'destructive',
// // // //           onPress: async () => {
// // // //             try {
// // // //               // Send empty update to mark as deleted (or your backend might have delete endpoint)
// // // //               await ApiService.updateTransaction(id, {});
// // // //               fetchTransactions();
// // // //               Alert.alert('Success', 'Transaction deleted');
// // // //             } catch (error) {
// // // //               console.error('Delete error:', error);
// // // //               Alert.alert('Error', 'Failed to delete transaction');
// // // //             }
// // // //           }
// // // //         }
// // // //       ]
// // // //     );
// // // //   };

// // // //   // Open edit modal
// // // //   const openEditModal = (transaction) => {
// // // //     setSelectedTransaction(transaction);
// // // //     setFormData({
// // // //       amount: Math.abs(transaction.amount)?.toString() || '',
// // // //       merchant_raw: transaction.merchant_raw || '',
// // // //       description: transaction.description || ''
// // // //     });
// // // //     setShowAddModal(true);
// // // //   };

// // // //   // Filter transactions - only show manual ones
// // // //   const filteredTransactions = transactions
// // // //     .filter(txn => txn && txn.source === 'manual')
// // // //     .filter(txn => {
// // // //       const matchesSearch = !searchQuery || 
// // // //         txn.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // //         txn.merchant_raw?.toLowerCase().includes(searchQuery.toLowerCase());
// // // //       return matchesSearch;
// // // //     });

// // // //   const formatCurrency = (amount, currency = 'INR') =>
// // // //     new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount || 0);

// // // //   const formatDate = (dateString) => {
// // // //     if (!dateString) return 'N/A';
// // // //     return new Date(dateString).toLocaleDateString('en-IN', {
// // // //       day: 'numeric',
// // // //       month: 'short'
// // // //     });
// // // //   };

// // // //   // Simple category display
// // // //   const getCategoryText = (categoryId) => {
// // // //     if (!categoryId) return 'Uncategorized';
// // // //     return 'Categorized'; // Your backend handles categories
// // // //   };

// // // //   if (loading && !transactions.length) {
// // // //     return (
// // // //       <Theme name="dark">
// // // //         <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // // //           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // // //             <Spinner size="large" color="#EAB308" />
// // // //             <Text color="white" mt={16}>Loading transactions...</Text>
// // // //           </View>
// // // //         </SafeAreaView>
// // // //       </Theme>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // // //         {/* HEADER */}
// // // //         <XStack p={20} ai="center" space={16}>
// // // //           <TouchableOpacity onPress={() => router.back()}>
// // // //             <ArrowLeft size={24} color="#EAB308" />
// // // //           </TouchableOpacity>
          
// // // //           <YStack flex={1}>
// // // //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
// // // //               Transactions
// // // //             </H2>
// // // //             <Text color="#666666" fontSize={14}>
// // // //               Manual entries
// // // //             </Text>
// // // //           </YStack>
          
// // // //           <TouchableOpacity 
// // // //             onPress={() => setShowAddModal(true)}
// // // //             style={{
// // // //               width: 44,
// // // //               height: 44,
// // // //               borderRadius: 22,
// // // //               backgroundColor: '#1A1A1A',
// // // //               justifyContent: 'center',
// // // //               alignItems: 'center',
// // // //               borderWidth: 1,
// // // //               borderColor: '#EAB308',
// // // //             }}
// // // //           >
// // // //             <Plus size={20} color="#EAB308" />
// // // //           </TouchableOpacity>
// // // //         </XStack>

// // // //         {/* SEARCH */}
// // // //         <XStack p={20} pb={12}>
// // // //           <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 12 }}>
// // // //             <Search size={16} color="#666666" />
// // // //             <Input
// // // //               placeholder="Search transactions..."
// // // //               value={searchQuery}
// // // //               onChangeText={setSearchQuery}
// // // //               backgroundColor="transparent"
// // // //               borderWidth={0}
// // // //               color="white"
// // // //               placeholderTextColor="#666666"
// // // //               fontSize={14}
// // // //               flex={1}
// // // //             />
// // // //           </View>
// // // //         </XStack>

// // // //         {/* TRANSACTIONS LIST */}
// // // //         <FlatList
// // // //           data={filteredTransactions}
// // // //           keyExtractor={(item, index) => item?.id || index.toString()}
// // // //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
// // // //           showsVerticalScrollIndicator={false}
// // // //           refreshing={refreshing}
// // // //           onRefresh={onRefresh}
// // // //           ListEmptyComponent={
// // // //             <YStack ai="center" py={48}>
// // // //               <DollarSign size={64} color="#333333" />
// // // //               <Text color="#666666" fontSize={16} mt={16}>
// // // //                 No transactions yet
// // // //               </Text>
// // // //               <Text color="#444444" fontSize={14} mt={8} mb={16}>
// // // //                 Add your first transaction
// // // //               </Text>
// // // //               <TouchableOpacity 
// // // //                 onPress={() => setShowAddModal(true)}
// // // //                 style={{
// // // //                   backgroundColor: '#EAB308',
// // // //                   paddingHorizontal: 24,
// // // //                   paddingVertical: 12,
// // // //                   borderRadius: 12,
// // // //                 }}
// // // //               >
// // // //                 <Text color="black" fontSize={14} fontWeight="700">Add Transaction</Text>
// // // //               </TouchableOpacity>
// // // //             </YStack>
// // // //           }
// // // //           renderItem={({ item }) => {
// // // //             if (!item) return null;
            
// // // //             const isExpense = item.amount < 0;
// // // //             const amount = Math.abs(item.amount || 0);
            
// // // //             return (
// // // //               <TouchableOpacity 
// // // //                 onPress={() => openEditModal(item)}
// // // //                 activeOpacity={0.8}
// // // //               >
// // // //                 <Card 
// // // //                   backgroundColor="#1A1A1A" 
// // // //                   mb={12} 
// // // //                   p={16} 
// // // //                   borderRadius={12}
// // // //                 >
// // // //                   <XStack jc="space-between" ai="center">
// // // //                     <YStack flex={1}>
// // // //                       <Text color="white" fontWeight="800" fontSize={16} numberOfLines={1}>
// // // //                         {item.description || 'No description'}
// // // //                       </Text>
                      
// // // //                       <XStack ai="center" space={12} mt={4}>
// // // //                         {item.merchant_raw && (
// // // //                           <XStack ai="center" space={4}>
// // // //                             <Store size={12} color="#666666" />
// // // //                             <Text color="#666666" fontSize={12}>
// // // //                               {item.merchant_raw}
// // // //                             </Text>
// // // //                           </XStack>
// // // //                         )}
                        
// // // //                         <Text color="#666666" fontSize={12}>
// // // //                           {formatDate(item.occurred_at)}
// // // //                         </Text>
// // // //                       </XStack>
// // // //                     </YStack>
                    
// // // //                     <XStack ai="center" space={12}>
// // // //                       <Text 
// // // //                         color={isExpense ? "#EF4444" : "#22C55E"} 
// // // //                         fontWeight="800" 
// // // //                         fontSize={16}
// // // //                       >
// // // //                         {isExpense ? '-' : '+'}{formatCurrency(amount, item.currency)}
// // // //                       </Text>
                      
// // // //                       <TouchableOpacity 
// // // //                         onPress={(e) => {
// // // //                           e.stopPropagation();
// // // //                           handleDeleteTransaction(item.id);
// // // //                         }}
// // // //                         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
// // // //                       >
// // // //                         <Trash2 size={16} color="#EF4444" />
// // // //                       </TouchableOpacity>
// // // //                     </XStack>
// // // //                   </XStack>
// // // //                 </Card>
// // // //               </TouchableOpacity>
// // // //             );
// // // //           }}
// // // //         />

// // // //         {/* ADD/EDIT TRANSACTION MODAL - SIMPLE 3 FIELDS */}
// // // //         <Modal
// // // //           visible={showAddModal}
// // // //           animationType="slide"
// // // //           transparent={true}
// // // //           onRequestClose={() => {
// // // //             setShowAddModal(false);
// // // //             resetForm();
// // // //           }}
// // // //         >
// // // //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
// // // //             <View style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 20 }}>
// // // //               <XStack jc="space-between" ai="center" mb={24}>
// // // //                 <H4 color="white" fontWeight="800" fontSize={20}>
// // // //                   {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
// // // //                 </H4>
// // // //                 <TouchableOpacity onPress={() => {
// // // //                   setShowAddModal(false);
// // // //                   resetForm();
// // // //                 }}>
// // // //                   <X size={24} color="#666666" />
// // // //                 </TouchableOpacity>
// // // //               </XStack>

// // // //               <YStack space={16}>
// // // //                 {/* Amount */}
// // // //                 <YStack>
// // // //                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // //                     Amount (₹)
// // // //                   </Text>
// // // //                   <Input
// // // //                     placeholder="0.00"
// // // //                     value={formData.amount}
// // // //                     onChangeText={(text) => setFormData({...formData, amount: text})}
// // // //                     backgroundColor="#333333"
// // // //                     borderColor="#444444"
// // // //                     color="white"
// // // //                     placeholderTextColor="#666666"
// // // //                     keyboardType="decimal-pad"
// // // //                     fontSize={16}
// // // //                   />
// // // //                 </YStack>

// // // //                 {/* Merchant/Store */}
// // // //                 <YStack>
// // // //                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // //                     Merchant/Store
// // // //                   </Text>
// // // //                   <Input
// // // //                     placeholder="Where did this happen?"
// // // //                     value={formData.merchant_raw}
// // // //                     onChangeText={(text) => setFormData({...formData, merchant_raw: text})}
// // // //                     backgroundColor="#333333"
// // // //                     borderColor="#444444"
// // // //                     color="white"
// // // //                     placeholderTextColor="#666666"
// // // //                     fontSize={16}
// // // //                   />
// // // //                 </YStack>

// // // //                 {/* Description */}
// // // //                 <YStack>
// // // //                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // //                     Description
// // // //                   </Text>
// // // //                   <Input
// // // //                     placeholder="What was this for?"
// // // //                     value={formData.description}
// // // //                     onChangeText={(text) => setFormData({...formData, description: text})}
// // // //                     backgroundColor="#333333"
// // // //                     borderColor="#444444"
// // // //                     color="white"
// // // //                     placeholderTextColor="#666666"
// // // //                     fontSize={16}
// // // //                   />
// // // //                 </YStack>

// // // //                 {/* Info Note */}
// // // //                 <View style={{ 
// // // //                   backgroundColor: '#222222', 
// // // //                   padding: 12, 
// // // //                   borderRadius: 8,
// // // //                   borderLeftWidth: 3,
// // // //                   borderLeftColor: '#EAB308'
// // // //                 }}>
// // // //                   <Text color="#EAB308" fontSize={12} fontWeight="700">
// // // //                     Backend will automatically:
// // // //                   </Text>
// // // //                   <Text color="#666666" fontSize={11} mt={4}>
// // // //                     • Set timestamp (now)
// // // //                   </Text>
// // // //                   <Text color="#666666" fontSize={11}>
// // // //                     • Auto-categorize
// // // //                   </Text>
// // // //                   <Text color="#666666" fontSize={11}>
// // // //                     • Set currency to INR
// // // //                   </Text>
// // // //                   <Text color="#666666" fontSize={11}>
// // // //                     • Mark as manual entry
// // // //                   </Text>
// // // //                 </View>

// // // //                 {/* Submit Button */}
// // // //                 <TouchableOpacity
// // // //                   onPress={selectedTransaction ? handleUpdateTransaction : handleAddTransaction}
// // // //                   style={{
// // // //                     backgroundColor: '#EAB308',
// // // //                     padding: 16,
// // // //                     borderRadius: 12,
// // // //                     alignItems: 'center',
// // // //                     marginTop: 8,
// // // //                   }}
// // // //                 >
// // // //                   <Text color="black" fontSize={16} fontWeight="800">
// // // //                     {selectedTransaction ? 'Update Transaction' : 'Add Transaction'}
// // // //                   </Text>
// // // //                 </TouchableOpacity>
// // // //               </YStack>
// // // //             </View>
// // // //           </View>
// // // //         </Modal>
// // // //       </SafeAreaView>
// // // //     </Theme>
// // // //   );
// // // // }




// // // // app/(drawer)/(tabs)/transactions.jsx
// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import {
// // //   ScrollView,
// // //   TouchableOpacity,
// // //   Alert,
// // //   Modal,
// // //   FlatList,
// // //   View
// // // } from 'react-native';
// // // import {
// // //   YStack,
// // //   XStack,
// // //   Text,
// // //   H2,
// // //   H4,
// // //   Theme,
// // //   Spinner,
// // //   Input,
// // //   Card,
// // //   Sheet
// // // } from 'tamagui';
// // // import {
// // //   ArrowLeft,
// // //   Plus,
// // //   Search,
// // //   Store,
// // //   DollarSign,
// // //   Edit3,
// // //   Trash2,
// // //   X,
// // //   Calendar,
// // //   Filter
// // // } from '@tamagui/lucide-icons';
// // // import { useRouter, useFocusEffect } from 'expo-router';
// // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // import DateTimePicker from '@react-native-community/datetimepicker';

// // // // Services
// // // import { ApiService } from '../../../services/apiService';

// // // export default function Transactions() {
// // //   const router = useRouter();
// // //   const insets = useSafeAreaInsets();
  
// // //   // State
// // //   const [transactions, setTransactions] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [refreshing, setRefreshing] = useState(false);
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const [showAddModal, setShowAddModal] = useState(false);
// // //   const [selectedTransaction, setSelectedTransaction] = useState(null);
// // //   const [showFilterSheet, setShowFilterSheet] = useState(false);
// // //   const [showDatePicker, setShowDatePicker] = useState(null);
  
// // //   // Filter states
// // //   const [startDate, setStartDate] = useState(null);
// // //   const [endDate, setEndDate] = useState(null);
  
// // //   // Form state
// // //   const [formData, setFormData] = useState({
// // //     amount: '',
// // //     merchant_raw: '',
// // //     description: '',
// // //     currency: 'INR',
// // //     occurred_at: new Date().toISOString(),
// // //     category_id: '',
// // //     source: 'manual'
// // //   });

// // //   // Fetch transactions with optional date filters
// // //   const fetchTransactions = useCallback(async (start = null, end = null) => {
// // //     try {
// // //       setLoading(true);
// // //       const params = {};
      
// // //       if (start) {
// // //         params.start_date = start.toISOString().split('T')[0];
// // //       }
// // //       if (end) {
// // //         params.end_date = end.toISOString().split('T')[0];
// // //       }
      
// // //       const response = await ApiService.getTransactions(params);
// // //       console.log('Transactions fetched:', response.data?.length || 0);
// // //       setTransactions(response.data || []);
// // //     } catch (error) {
// // //       console.error('Fetch transactions error:', error);
// // //       Alert.alert('Error', 'Failed to load transactions');
// // //     } finally {
// // //       setLoading(false);
// // //       setRefreshing(false);
// // //     }
// // //   }, []);

// // //   useFocusEffect(
// // //     useCallback(() => {
// // //       fetchTransactions(startDate, endDate);
// // //     }, [fetchTransactions, startDate, endDate])
// // //   );

// // //   const onRefresh = useCallback(() => {
// // //     setRefreshing(true);
// // //     fetchTransactions(startDate, endDate);
// // //   }, [fetchTransactions, startDate, endDate]);

// // //   // Reset form
// // //   const resetForm = () => {
// // //     setFormData({
// // //       amount: '',
// // //       merchant_raw: '',
// // //       description: '',
// // //       currency: 'INR',
// // //       occurred_at: new Date().toISOString(),
// // //       category_id: '',
// // //       source: 'manual'
// // //     });
// // //     setSelectedTransaction(null);
// // //   };

// // //   // Reset filters
// // //   const resetFilters = () => {
// // //     setStartDate(null);
// // //     setEndDate(null);
// // //     setSearchQuery('');
// // //   };

// // //   // Create transaction
// // //   const handleAddTransaction = async () => {
// // //     try {
// // //       // Basic validation
// // //       if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
// // //         Alert.alert('Error', 'Please enter a valid amount');
// // //         return;
// // //       }
      
// // //       if (!formData.merchant_raw?.trim()) {
// // //         Alert.alert('Error', 'Please enter merchant/store name');
// // //         return;
// // //       }
      
// // //       if (!formData.description?.trim()) {
// // //         Alert.alert('Error', 'Please enter a description');
// // //         return;
// // //       }

// // //       const transactionData = {
// // //         amount: parseFloat(formData.amount),
// // //         merchant_raw: formData.merchant_raw.trim(),
// // //         description: formData.description.trim(),
// // //         currency: formData.currency,
// // //         occurred_at: new Date().toISOString(), // Current time
// // //         source: 'manual'
// // //         // category_id will be auto-detected by backend or can be empty
// // //       };

// // //       console.log('Creating transaction:', transactionData);

// // //       const response = await ApiService.createTransaction(transactionData);
// // //       console.log('Transaction created:', response.data);
      
// // //       setShowAddModal(false);
// // //       resetForm();
// // //       fetchTransactions(startDate, endDate);
// // //       Alert.alert('Success', 'Transaction added successfully');
      
// // //     } catch (error) {
// // //       console.error('Add transaction error:', error);
// // //       Alert.alert('Error', error.response?.data?.detail?.[0]?.msg || error.message || 'Failed to add transaction');
// // //     }
// // //   };

// // //   // Update transaction
// // //   const handleUpdateTransaction = async () => {
// // //     try {
// // //       if (!selectedTransaction) return;
      
// // //       // Same simple validation
// // //       if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
// // //         Alert.alert('Error', 'Please enter a valid amount');
// // //         return;
// // //       }
      
// // //       if (!formData.merchant_raw?.trim()) {
// // //         Alert.alert('Error', 'Please enter merchant/store name');
// // //         return;
// // //       }
      
// // //       if (!formData.description?.trim()) {
// // //         Alert.alert('Error', 'Please enter a description');
// // //         return;
// // //       }

// // //       const transactionData = {
// // //         amount: parseFloat(formData.amount),
// // //         merchant_raw: formData.merchant_raw.trim(),
// // //         description: formData.description.trim(),
// // //         currency: formData.currency,
// // //         occurred_at: formData.occurred_at,
// // //         source: formData.source
// // //       };

// // //       await ApiService.updateTransaction(selectedTransaction.id, transactionData);
      
// // //       setShowAddModal(false);
// // //       resetForm();
// // //       fetchTransactions(startDate, endDate);
// // //       Alert.alert('Success', 'Transaction updated successfully');
      
// // //     } catch (error) {
// // //       console.error('Update transaction error:', error);
// // //       Alert.alert('Error', error.response?.data?.detail?.[0]?.msg || 'Failed to update transaction');
// // //     }
// // //   };

// // //   // Delete transaction - Since API only has PATCH, we'll update with empty data or specific delete field
// // //   const handleDeleteTransaction = async (id) => {
// // //     Alert.alert(
// // //       'Delete Transaction',
// // //       'Are you sure you want to delete this transaction?',
// // //       [
// // //         { text: 'Cancel', style: 'cancel' },
// // //         { 
// // //           text: 'Delete', 
// // //           style: 'destructive',
// // //           onPress: async () => {
// // //             try {
// // //               // Since we only have PATCH endpoint, we'll mark it as deleted by updating description
// // //               // You might want to add a 'deleted' field in your backend
// // //               await ApiService.updateTransaction(id, {
// // //                 description: '[DELETED]',
// // //                 source: 'deleted'
// // //               });
// // //               fetchTransactions(startDate, endDate);
// // //               Alert.alert('Success', 'Transaction marked as deleted');
// // //             } catch (error) {
// // //               console.error('Delete error:', error);
// // //               Alert.alert('Error', 'Failed to delete transaction');
// // //             }
// // //           }
// // //         }
// // //       ]
// // //     );
// // //   };

// // //   // Open edit modal
// // //   const openEditModal = (transaction) => {
// // //     setSelectedTransaction(transaction);
// // //     setFormData({
// // //       amount: Math.abs(transaction.amount)?.toString() || '',
// // //       merchant_raw: transaction.merchant_raw || '',
// // //       description: transaction.description || '',
// // //       currency: transaction.currency || 'INR',
// // //       occurred_at: transaction.occurred_at || new Date().toISOString(),
// // //       category_id: transaction.category_id || '',
// // //       source: transaction.source || 'manual'
// // //     });
// // //     setShowAddModal(true);
// // //   };

// // //   // Handle date picker change
// // //   const onDateChange = (event, selectedDate) => {
// // //     setShowDatePicker(null);
// // //     if (selectedDate) {
// // //       if (showDatePicker === 'start') {
// // //         setStartDate(selectedDate);
// // //       } else if (showDatePicker === 'end') {
// // //         setEndDate(selectedDate);
// // //       }
// // //     }
// // //   };

// // //   // Filter transactions based on search and date range
// // //   const filteredTransactions = transactions
// // //     .filter(txn => txn && (txn.source === 'manual' || txn.source === 'automatic')) // Include all sources or filter as needed
// // //     .filter(txn => {
// // //       // Search filter
// // //       const matchesSearch = !searchQuery || 
// // //         txn.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //         txn.merchant_raw?.toLowerCase().includes(searchQuery.toLowerCase());
      
// // //       // Date filter
// // //       const transactionDate = txn.occurred_at ? new Date(txn.occurred_at) : null;
// // //       const matchesStartDate = !startDate || (transactionDate && transactionDate >= startDate);
// // //       const matchesEndDate = !endDate || (transactionDate && transactionDate <= endDate);
      
// // //       return matchesSearch && matchesStartDate && matchesEndDate;
// // //     })
// // //     .sort((a, b) => new Date(b.occurred_at) - new Date(a.occurred_at)); // Sort by date, newest first

// // //   const formatCurrency = (amount, currency = 'INR') => {
// // //     try {
// // //       return new Intl.NumberFormat('en-IN', { 
// // //         style: 'currency', 
// // //         currency: currency,
// // //         minimumFractionDigits: 0,
// // //         maximumFractionDigits: 2
// // //       }).format(amount || 0);
// // //     } catch (e) {
// // //       return `${currency} ${amount || 0}`;
// // //     }
// // //   };

// // //   const formatDate = (dateString) => {
// // //     if (!dateString) return 'N/A';
// // //     return new Date(dateString).toLocaleDateString('en-IN', {
// // //       day: 'numeric',
// // //       month: 'short',
// // //       year: 'numeric'
// // //     });
// // //   };

// // //   const formatDateTime = (dateString) => {
// // //     if (!dateString) return 'N/A';
// // //     return new Date(dateString).toLocaleDateString('en-IN', {
// // //       day: 'numeric',
// // //       month: 'short',
// // //       year: 'numeric',
// // //       hour: '2-digit',
// // //       minute: '2-digit'
// // //     });
// // //   };

// // //   // Get filter summary text
// // //   const getFilterSummary = () => {
// // //     if (!startDate && !endDate) return 'All time';
// // //     if (startDate && endDate) {
// // //       return `${formatDate(startDate.toISOString())} - ${formatDate(endDate.toISOString())}`;
// // //     }
// // //     if (startDate) return `From ${formatDate(startDate.toISOString())}`;
// // //     if (endDate) return `Until ${formatDate(endDate.toISOString())}`;
// // //     return 'All time';
// // //   };

// // //   if (loading && !transactions.length) {
// // //     return (
// // //       <Theme name="dark">
// // //         <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // //           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // //             <Spinner size="large" color="#EAB308" />
// // //             <Text color="white" mt={16}>Loading transactions...</Text>
// // //           </View>
// // //         </SafeAreaView>
// // //       </Theme>
// // //     );
// // //   }

// // //   return (
// // //     <Theme name="dark">
// // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // //         {/* HEADER */}
// // //         <XStack p={20} ai="center" space={16}>
// // //           <TouchableOpacity onPress={() => router.back()}>
// // //             <ArrowLeft size={24} color="#EAB308" />
// // //           </TouchableOpacity>
          
// // //           <YStack flex={1}>
// // //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
// // //               Transactions
// // //             </H2>
// // //             <Text color="#666666" fontSize={14}>
// // //               {getFilterSummary()}
// // //             </Text>
// // //           </YStack>
          
// // //           <TouchableOpacity 
// // //             onPress={() => setShowFilterSheet(true)}
// // //             style={{
// // //               width: 44,
// // //               height: 44,
// // //               borderRadius: 22,
// // //               backgroundColor: '#1A1A1A',
// // //               justifyContent: 'center',
// // //               alignItems: 'center',
// // //               borderWidth: 1,
// // //               borderColor: '#444444',
// // //               marginRight: 12
// // //             }}
// // //           >
// // //             <Filter size={20} color="#EAB308" />
// // //           </TouchableOpacity>
          
// // //           <TouchableOpacity 
// // //             onPress={() => setShowAddModal(true)}
// // //             style={{
// // //               width: 44,
// // //               height: 44,
// // //               borderRadius: 22,
// // //               backgroundColor: '#1A1A1A',
// // //               justifyContent: 'center',
// // //               alignItems: 'center',
// // //               borderWidth: 1,
// // //               borderColor: '#EAB308',
// // //             }}
// // //           >
// // //             <Plus size={20} color="#EAB308" />
// // //           </TouchableOpacity>
// // //         </XStack>

// // //         {/* SEARCH */}
// // //         <XStack p={20} pb={12}>
// // //           <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 12 }}>
// // //             <Search size={16} color="#666666" />
// // //             <Input
// // //               placeholder="Search transactions..."
// // //               value={searchQuery}
// // //               onChangeText={setSearchQuery}
// // //               backgroundColor="transparent"
// // //               borderWidth={0}
// // //               color="white"
// // //               placeholderTextColor="#666666"
// // //               fontSize={14}
// // //               flex={1}
// // //             />
// // //           </View>
// // //         </XStack>

// // //         {/* TRANSACTIONS LIST */}
// // //         <FlatList
// // //           data={filteredTransactions}
// // //           keyExtractor={(item, index) => item?.id || index.toString()}
// // //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
// // //           showsVerticalScrollIndicator={false}
// // //           refreshing={refreshing}
// // //           onRefresh={onRefresh}
// // //           ListEmptyComponent={
// // //             <YStack ai="center" py={48}>
// // //               <DollarSign size={64} color="#333333" />
// // //               <Text color="#666666" fontSize={16} mt={16}>
// // //                 No transactions found
// // //               </Text>
// // //               <Text color="#444444" fontSize={14} mt={8} mb={16}>
// // //                 {startDate || endDate ? 'Try changing your filters' : 'Add your first transaction'}
// // //               </Text>
// // //               <TouchableOpacity 
// // //                 onPress={() => setShowAddModal(true)}
// // //                 style={{
// // //                   backgroundColor: '#EAB308',
// // //                   paddingHorizontal: 24,
// // //                   paddingVertical: 12,
// // //                   borderRadius: 12,
// // //                 }}
// // //               >
// // //                 <Text color="black" fontSize={14} fontWeight="700">Add Transaction</Text>
// // //               </TouchableOpacity>
// // //             </YStack>
// // //           }
// // //           renderItem={({ item }) => {
// // //             if (!item) return null;
            
// // //             const isExpense = item.amount < 0;
// // //             const amount = Math.abs(item.amount || 0);
            
// // //             return (
// // //               <TouchableOpacity 
// // //                 onPress={() => openEditModal(item)}
// // //                 activeOpacity={0.8}
// // //               >
// // //                 <Card 
// // //                   backgroundColor="#1A1A1A" 
// // //                   mb={12} 
// // //                   p={16} 
// // //                   borderRadius={12}
// // //                 >
// // //                   <XStack jc="space-between" ai="flex-start">
// // //                     <YStack flex={1}>
// // //                       <Text color="white" fontWeight="800" fontSize={16} numberOfLines={1}>
// // //                         {item.description || 'No description'}
// // //                       </Text>
                      
// // //                       <XStack ai="center" space={12} mt={4} flexWrap="wrap">
// // //                         {item.merchant_raw && (
// // //                           <XStack ai="center" space={4}>
// // //                             <Store size={12} color="#666666" />
// // //                             <Text color="#666666" fontSize={12}>
// // //                               {item.merchant_raw}
// // //                             </Text>
// // //                           </XStack>
// // //                         )}
                        
// // //                         <Text color="#666666" fontSize={11}>
// // //                           {formatDateTime(item.occurred_at)}
// // //                         </Text>
                        
// // //                         {item.source && (
// // //                           <Text color="#666666" fontSize={11}>
// // //                             • {item.source}
// // //                           </Text>
// // //                         )}
// // //                       </XStack>
// // //                     </YStack>
                    
// // //                     <XStack ai="center" space={12}>
// // //                       <Text 
// // //                         color={isExpense ? "#EF4444" : "#22C55E"} 
// // //                         fontWeight="800" 
// // //                         fontSize={16}
// // //                       >
// // //                         {isExpense ? '-' : '+'}{formatCurrency(amount, item.currency)}
// // //                       </Text>
                      
// // //                       <TouchableOpacity 
// // //                         onPress={(e) => {
// // //                           e.stopPropagation();
// // //                           handleDeleteTransaction(item.id);
// // //                         }}
// // //                         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
// // //                       >
// // //                         <Trash2 size={16} color="#EF4444" />
// // //                       </TouchableOpacity>
// // //                     </XStack>
// // //                   </XStack>
// // //                 </Card>
// // //               </TouchableOpacity>
// // //             );
// // //           }}
// // //         />

// // //         {/* ADD/EDIT TRANSACTION MODAL */}
// // //         <Modal
// // //           visible={showAddModal}
// // //           animationType="slide"
// // //           transparent={true}
// // //           onRequestClose={() => {
// // //             setShowAddModal(false);
// // //             resetForm();
// // //           }}
// // //         >
// // //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
// // //             <ScrollView style={{ maxHeight: '80%' }}>
// // //               <View style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 20 }}>
// // //                 <XStack jc="space-between" ai="center" mb={24}>
// // //                   <H4 color="white" fontWeight="800" fontSize={20}>
// // //                     {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
// // //                   </H4>
// // //                   <TouchableOpacity onPress={() => {
// // //                     setShowAddModal(false);
// // //                     resetForm();
// // //                   }}>
// // //                     <X size={24} color="#666666" />
// // //                   </TouchableOpacity>
// // //                 </XStack>

// // //                 <YStack space={16}>
// // //                   {/* Amount */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Amount
// // //                     </Text>
// // //                     <Input
// // //                       placeholder="0.00"
// // //                       value={formData.amount}
// // //                       onChangeText={(text) => setFormData({...formData, amount: text})}
// // //                       backgroundColor="#333333"
// // //                       borderColor="#444444"
// // //                       color="white"
// // //                       placeholderTextColor="#666666"
// // //                       keyboardType="decimal-pad"
// // //                       fontSize={16}
// // //                     />
// // //                   </YStack>

// // //                   {/* Currency */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Currency
// // //                     </Text>
// // //                     <Input
// // //                       placeholder="INR"
// // //                       value={formData.currency}
// // //                       onChangeText={(text) => setFormData({...formData, currency: text})}
// // //                       backgroundColor="#333333"
// // //                       borderColor="#444444"
// // //                       color="white"
// // //                       placeholderTextColor="#666666"
// // //                       fontSize={16}
// // //                     />
// // //                   </YStack>

// // //                   {/* Merchant/Store */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Merchant/Store
// // //                     </Text>
// // //                     <Input
// // //                       placeholder="Where did this happen?"
// // //                       value={formData.merchant_raw}
// // //                       onChangeText={(text) => setFormData({...formData, merchant_raw: text})}
// // //                       backgroundColor="#333333"
// // //                       borderColor="#444444"
// // //                       color="white"
// // //                       placeholderTextColor="#666666"
// // //                       fontSize={16}
// // //                     />
// // //                   </YStack>

// // //                   {/* Description */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Description
// // //                     </Text>
// // //                     <Input
// // //                       placeholder="What was this for?"
// // //                       value={formData.description}
// // //                       onChangeText={(text) => setFormData({...formData, description: text})}
// // //                       backgroundColor="#333333"
// // //                       borderColor="#444444"
// // //                       color="white"
// // //                       placeholderTextColor="#666666"
// // //                       fontSize={16}
// // //                       multiline
// // //                       minHeight={60}
// // //                     />
// // //                   </YStack>

// // //                   {/* Occurred At */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Date & Time
// // //                     </Text>
// // //                     <TouchableOpacity
// // //                       onPress={() => {
// // //                         // For React Native, you might want to show a DateTimePicker here
// // //                         Alert.alert('Info', 'Date will be set to current time for new transactions');
// // //                       }}
// // //                       style={{
// // //                         backgroundColor: '#333333',
// // //                         borderWidth: 1,
// // //                         borderColor: '#444444',
// // //                         borderRadius: 8,
// // //                         padding: 12
// // //                       }}
// // //                     >
// // //                       <Text color="white" fontSize={14}>
// // //                         {formatDateTime(formData.occurred_at)}
// // //                       </Text>
// // //                       <Text color="#666666" fontSize={12} mt={4}>
// // //                         Tap to change (currently showing current time)
// // //                       </Text>
// // //                     </TouchableOpacity>
// // //                   </YStack>

// // //                   {/* Source */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Source
// // //                     </Text>
// // //                     <Input
// // //                       placeholder="manual"
// // //                       value={formData.source}
// // //                       onChangeText={(text) => setFormData({...formData, source: text})}
// // //                       backgroundColor="#333333"
// // //                       borderColor="#444444"
// // //                       color="white"
// // //                       placeholderTextColor="#666666"
// // //                       fontSize={16}
// // //                     />
// // //                   </YStack>

// // //                   {/* Category ID (optional) */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Category ID (Optional)
// // //                     </Text>
// // //                     <Input
// // //                       placeholder="Leave empty for auto-categorization"
// // //                       value={formData.category_id}
// // //                       onChangeText={(text) => setFormData({...formData, category_id: text})}
// // //                       backgroundColor="#333333"
// // //                       borderColor="#444444"
// // //                       color="white"
// // //                       placeholderTextColor="#666666"
// // //                       fontSize={16}
// // //                     />
// // //                   </YStack>

// // //                   {/* Submit Button */}
// // //                   <TouchableOpacity
// // //                     onPress={selectedTransaction ? handleUpdateTransaction : handleAddTransaction}
// // //                     style={{
// // //                       backgroundColor: '#EAB308',
// // //                       padding: 16,
// // //                       borderRadius: 12,
// // //                       alignItems: 'center',
// // //                       marginTop: 24,
// // //                     }}
// // //                   >
// // //                     <Text color="black" fontSize={16} fontWeight="800">
// // //                       {selectedTransaction ? 'Update Transaction' : 'Add Transaction'}
// // //                     </Text>
// // //                   </TouchableOpacity>
// // //                 </YStack>
// // //               </View>
// // //             </ScrollView>
// // //           </View>
// // //         </Modal>

// // //         {/* FILTER SHEET */}
// // //         <Sheet
// // //           modal
// // //           open={showFilterSheet}
// // //           onOpenChange={setShowFilterSheet}
// // //           snapPoints={[40]}
// // //           dismissOnSnapToBottom
// // //           animation="medium"
// // //         >
// // //           <Sheet.Overlay />
// // //           <Sheet.Frame backgroundColor="#1A1A1A" borderTopLeftRadius={20} borderTopRightRadius={20}>
// // //             <Sheet.Handle backgroundColor="#444444" />
// // //             <YStack p={24}>
// // //               <H4 color="white" fontWeight="800" mb={24}>Filter Transactions</H4>
              
// // //               <YStack space={20}>
// // //                 {/* Start Date */}
// // //                 <YStack>
// // //                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                     Start Date
// // //                   </Text>
// // //                   <TouchableOpacity
// // //                     onPress={() => setShowDatePicker('start')}
// // //                     style={{
// // //                       backgroundColor: '#333333',
// // //                       borderWidth: 1,
// // //                       borderColor: '#444444',
// // //                       borderRadius: 8,
// // //                       padding: 12,
// // //                       flexDirection: 'row',
// // //                       alignItems: 'center',
// // //                       justifyContent: 'space-between'
// // //                     }}
// // //                   >
// // //                     <Text color="white" fontSize={14}>
// // //                       {startDate ? formatDate(startDate.toISOString()) : 'Select start date'}
// // //                     </Text>
// // //                     <Calendar size={16} color="#666666" />
// // //                   </TouchableOpacity>
// // //                 </YStack>

// // //                 {/* End Date */}
// // //                 <YStack>
// // //                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                     End Date
// // //                   </Text>
// // //                   <TouchableOpacity
// // //                     onPress={() => setShowDatePicker('end')}
// // //                     style={{
// // //                       backgroundColor: '#333333',
// // //                       borderWidth: 1,
// // //                       borderColor: '#444444',
// // //                       borderRadius: 8,
// // //                       padding: 12,
// // //                       flexDirection: 'row',
// // //                       alignItems: 'center',
// // //                       justifyContent: 'space-between'
// // //                     }}
// // //                   >
// // //                     <Text color="white" fontSize={14}>
// // //                       {endDate ? formatDate(endDate.toISOString()) : 'Select end date'}
// // //                     </Text>
// // //                     <Calendar size={16} color="#666666" />
// // //                   </TouchableOpacity>
// // //                 </YStack>

// // //                 <XStack space={12}>
// // //                   <TouchableOpacity
// // //                     onPress={resetFilters}
// // //                     style={{
// // //                       flex: 1,
// // //                       backgroundColor: '#333333',
// // //                       padding: 16,
// // //                       borderRadius: 12,
// // //                       alignItems: 'center',
// // //                       borderWidth: 1,
// // //                       borderColor: '#444444'
// // //                     }}
// // //                   >
// // //                     <Text color="white" fontSize={14} fontWeight="600">
// // //                       Reset
// // //                     </Text>
// // //                   </TouchableOpacity>

// // //                   <TouchableOpacity
// // //                     onPress={() => {
// // //                       setShowFilterSheet(false);
// // //                       fetchTransactions(startDate, endDate);
// // //                     }}
// // //                     style={{
// // //                       flex: 1,
// // //                       backgroundColor: '#EAB308',
// // //                       padding: 16,
// // //                       borderRadius: 12,
// // //                       alignItems: 'center'
// // //                     }}
// // //                   >
// // //                     <Text color="black" fontSize={14} fontWeight="600">
// // //                       Apply Filters
// // //                     </Text>
// // //                   </TouchableOpacity>
// // //                 </XStack>
// // //               </YStack>
// // //             </YStack>
// // //           </Sheet.Frame>
// // //         </Sheet>

// // //         {/* DATE PICKER */}
// // //         {showDatePicker && (
// // //           <DateTimePicker
// // //             value={showDatePicker === 'start' && startDate ? startDate : 
// // //                    showDatePicker === 'end' && endDate ? endDate : new Date()}
// // //             mode="date"
// // //             display="default"
// // //             onChange={onDateChange}
// // //             maximumDate={new Date()}
// // //           />
// // //         )}
// // //       </SafeAreaView>
// // //     </Theme>
// // //   );
// // // }




// // // app/(drawer)/(tabs)/transactions.jsx
// // import React, { useState, useEffect, useCallback } from 'react';
// // import {
// //   ScrollView,
// //   TouchableOpacity,
// //   Alert,
// //   Modal,
// //   FlatList,
// //   View
// // } from 'react-native';
// // import {
// //   YStack,
// //   XStack,
// //   Text,
// //   H2,
// //   H4,
// //   Theme,
// //   Spinner,
// //   Input,
// //   Card,
// //   Sheet,
// //   Select,
// //   Adapt,
// //   Label
// // } from 'tamagui';
// // import {
// //   ArrowLeft,
// //   Plus,
// //   Search,
// //   Store,
// //   DollarSign,
// //   Edit3,
// //   Trash2,
// //   X,
// //   Calendar,
// //   Filter,
// //   ChevronDown,
// //   Check
// // } from '@tamagui/lucide-icons';
// // import { useRouter, useFocusEffect } from 'expo-router';
// // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // import DateTimePicker from '@react-native-community/datetimepicker';

// // // Services
// // import { ApiService } from '../../../services/apiService';

// // // Currency options (common currencies)
// // const CURRENCY_OPTIONS = [
// //   { value: 'INR', label: 'Indian Rupee (₹)' },
// //   { value: 'USD', label: 'US Dollar ($)' },
// //   { value: 'EUR', label: 'Euro (€)' },
// //   { value: 'GBP', label: 'British Pound (£)' },
// //   { value: 'JPY', label: 'Japanese Yen (¥)' },
// //   { value: 'CAD', label: 'Canadian Dollar (C$)' },
// //   { value: 'AUD', label: 'Australian Dollar (A$)' },
// //   { value: 'SGD', label: 'Singapore Dollar (S$)' },
// //   { value: 'AED', label: 'UAE Dirham (د.إ)' },
// // ];

// // // Source options from txn_source_enum
// // const SOURCE_OPTIONS = [
// //   { value: 'manual', label: 'Manual Entry' },
// //   { value: 'voice', label: 'Voice Input' },
// //   { value: 'chatbot', label: 'Chatbot' },
// //   { value: 'csv', label: 'CSV Import' },
// //   { value: 'notification', label: 'Notification' },
// //   { value: 'wallet', label: 'Wallet Sync' },
// //   { value: 'blockchain', label: 'Blockchain' },
// // ];

// // export default function Transactions() {
// //   const router = useRouter();
// //   const insets = useSafeAreaInsets();
  
// //   // State
// //   const [transactions, setTransactions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [selectedTransaction, setSelectedTransaction] = useState(null);
// //   const [showFilterSheet, setShowFilterSheet] = useState(false);
// //   const [showDatePicker, setShowDatePicker] = useState(null);
  
// //   // Filter states
// //   const [startDate, setStartDate] = useState(null);
// //   const [endDate, setEndDate] = useState(null);
  
// //   // Form state with proper defaults based on enums
// //   const [formData, setFormData] = useState({
// //     amount: '',
// //     merchant_raw: '',
// //     description: '',
// //     currency: 'INR', // Default currency
// //     occurred_at: new Date().toISOString(),
// //     category_id: '',
// //     source: 'manual' // Default source from enum
// //   });

// //   // Fetch transactions with optional date filters
// //   const fetchTransactions = useCallback(async (start = null, end = null) => {
// //     try {
// //       setLoading(true);
// //       const params = {};
      
// //       if (start) {
// //         // Format as YYYY-MM-DD
// //         params.start_date = start.toISOString().split('T')[0];
// //       }
// //       if (end) {
// //         params.end_date = end.toISOString().split('T')[0];
// //       }
      
// //       console.log('Fetching transactions with params:', params);
// //       const response = await ApiService.getTransactions(params);
// //       console.log('Transactions fetched:', response.data?.length || 0);
// //       setTransactions(response.data || []);
// //     } catch (error) {
// //       console.error('Fetch transactions error:', error);
// //       Alert.alert('Error', 'Failed to load transactions');
// //     } finally {
// //       setLoading(false);
// //       setRefreshing(false);
// //     }
// //   }, []);

// //   useFocusEffect(
// //     useCallback(() => {
// //       fetchTransactions(startDate, endDate);
// //     }, [fetchTransactions, startDate, endDate])
// //   );

// //   const onRefresh = useCallback(() => {
// //     setRefreshing(true);
// //     fetchTransactions(startDate, endDate);
// //   }, [fetchTransactions, startDate, endDate]);

// //   // Reset form
// //   const resetForm = () => {
// //     setFormData({
// //       amount: '',
// //       merchant_raw: '',
// //       description: '',
// //       currency: 'INR',
// //       occurred_at: new Date().toISOString(),
// //       category_id: '',
// //       source: 'manual'
// //     });
// //     setSelectedTransaction(null);
// //   };

// //   // Reset filters
// //   const resetFilters = () => {
// //     setStartDate(null);
// //     setEndDate(null);
// //     setSearchQuery('');
// //   };

// //   // Create transaction
// //   const handleAddTransaction = async () => {
// //     try {
// //       // Basic validation
// //       if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
// //         Alert.alert('Error', 'Please enter a valid amount');
// //         return;
// //       }
      
// //       if (!formData.merchant_raw?.trim()) {
// //         Alert.alert('Error', 'Please enter merchant/store name');
// //         return;
// //       }
      
// //       if (!formData.description?.trim()) {
// //         Alert.alert('Error', 'Please enter a description');
// //         return;
// //       }

// //       // Validate currency
// //       if (!formData.currency || !CURRENCY_OPTIONS.some(c => c.value === formData.currency)) {
// //         Alert.alert('Error', 'Please select a valid currency');
// //         return;
// //       }

// //       // Validate source (must be from enum)
// //       if (!formData.source || !SOURCE_OPTIONS.some(s => s.value === formData.source)) {
// //         Alert.alert('Error', 'Please select a valid source');
// //         return;
// //       }

// //       const transactionData = {
// //         amount: parseFloat(formData.amount),
// //         merchant_raw: formData.merchant_raw.trim(),
// //         description: formData.description.trim(),
// //         currency: formData.currency,
// //         occurred_at: formData.occurred_at,
// //         source: formData.source
// //         // category_id is optional, backend will handle if empty
// //       };

// //       console.log('Creating transaction with data:', JSON.stringify(transactionData, null, 2));

// //       const response = await ApiService.createTransaction(transactionData);
// //       console.log('Transaction created:', response.data);
      
// //       setShowAddModal(false);
// //       resetForm();
// //       fetchTransactions(startDate, endDate);
// //       Alert.alert('Success', 'Transaction added successfully');
      
// //     } catch (error) {
// //       console.error('Add transaction error details:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message,
// //         config: error.config
// //       });
      
// //       // Show validation errors if available
// //       if (error.response?.status === 422 && error.response?.data?.detail) {
// //         const validationErrors = error.response.data.detail;
// //         const errorMessages = validationErrors.map(err => 
// //           `${err.loc?.join('.') || 'Field'}: ${err.msg}`
// //         ).join('\n\n');
        
// //         Alert.alert('Validation Error', errorMessages);
// //       } else {
// //         Alert.alert('Error', error.message || 'Failed to add transaction');
// //       }
// //     }
// //   };

// //   // Update transaction
// //   const handleUpdateTransaction = async () => {
// //     try {
// //       if (!selectedTransaction) return;
      
// //       // Same validation as add
// //       if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
// //         Alert.alert('Error', 'Please enter a valid amount');
// //         return;
// //       }
      
// //       if (!formData.merchant_raw?.trim()) {
// //         Alert.alert('Error', 'Please enter merchant/store name');
// //         return;
// //       }
      
// //       if (!formData.description?.trim()) {
// //         Alert.alert('Error', 'Please enter a description');
// //         return;
// //       }

// //       // Validate currency and source
// //       if (!formData.currency || !CURRENCY_OPTIONS.some(c => c.value === formData.currency)) {
// //         Alert.alert('Error', 'Please select a valid currency');
// //         return;
// //       }

// //       if (!formData.source || !SOURCE_OPTIONS.some(s => s.value === formData.source)) {
// //         Alert.alert('Error', 'Please select a valid source');
// //         return;
// //       }

// //       const transactionData = {
// //         amount: parseFloat(formData.amount),
// //         merchant_raw: formData.merchant_raw.trim(),
// //         description: formData.description.trim(),
// //         currency: formData.currency,
// //         occurred_at: formData.occurred_at,
// //         source: formData.source,
// //         category_id: formData.category_id || undefined
// //       };

// //       console.log('Updating transaction with data:', JSON.stringify(transactionData, null, 2));

// //       const response = await ApiService.updateTransaction(selectedTransaction.id, transactionData);
// //       console.log('Transaction updated:', response.data);
      
// //       setShowAddModal(false);
// //       resetForm();
// //       fetchTransactions(startDate, endDate);
// //       Alert.alert('Success', 'Transaction updated successfully');
      
// //     } catch (error) {
// //       console.error('Update transaction error:', {
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         message: error.message
// //       });
      
// //       if (error.response?.status === 422 && error.response?.data?.detail) {
// //         const validationErrors = error.response.data.detail;
// //         const errorMessages = validationErrors.map(err => 
// //           `${err.loc?.join('.') || 'Field'}: ${err.msg}`
// //         ).join('\n\n');
        
// //         Alert.alert('Validation Error', errorMessages);
// //       } else {
// //         Alert.alert('Error', error.message || 'Failed to update transaction');
// //       }
// //     }
// //   };

// //   // Delete transaction
// //   const handleDeleteTransaction = async (id) => {
// //     Alert.alert(
// //       'Delete Transaction',
// //       'Are you sure you want to delete this transaction?',
// //       [
// //         { text: 'Cancel', style: 'cancel' },
// //         { 
// //           text: 'Delete', 
// //           style: 'destructive',
// //           onPress: async () => {
// //             try {
// //               // Since we only have PATCH endpoint, we can update to mark as deleted
// //               await ApiService.updateTransaction(id, {
// //                 description: `[DELETED] ${formData.description || ''}`,
// //                 source: 'manual' // Keep as manual for deleted items
// //               });
// //               fetchTransactions(startDate, endDate);
// //               Alert.alert('Success', 'Transaction marked as deleted');
// //             } catch (error) {
// //               console.error('Delete error:', error);
// //               Alert.alert('Error', 'Failed to delete transaction');
// //             }
// //           }
// //         }
// //       ]
// //     );
// //   };

// //   // Open edit modal
// //   const openEditModal = (transaction) => {
// //     setSelectedTransaction(transaction);
// //     setFormData({
// //       amount: Math.abs(transaction.amount)?.toString() || '',
// //       merchant_raw: transaction.merchant_raw || '',
// //       description: transaction.description || '',
// //       currency: transaction.currency || 'INR',
// //       occurred_at: transaction.occurred_at || new Date().toISOString(),
// //       category_id: transaction.category_id || '',
// //       source: transaction.source || 'manual'
// //     });
// //     setShowAddModal(true);
// //   };

// //   // Handle date picker change
// //   const onDateChange = (event, selectedDate) => {
// //     setShowDatePicker(null);
// //     if (selectedDate) {
// //       if (showDatePicker === 'start') {
// //         setStartDate(selectedDate);
// //       } else if (showDatePicker === 'end') {
// //         setEndDate(selectedDate);
// //       }
// //     }
// //   };

// //   // Filter transactions based on search and date range
// //   const filteredTransactions = transactions
// //     .filter(txn => txn) // Remove null transactions
// //     .filter(txn => {
// //       // Search filter
// //       const matchesSearch = !searchQuery || 
// //         txn.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         txn.merchant_raw?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         txn.source?.toLowerCase().includes(searchQuery.toLowerCase());
      
// //       // Date filter
// //       const transactionDate = txn.occurred_at ? new Date(txn.occurred_at) : null;
// //       const matchesStartDate = !startDate || (transactionDate && transactionDate >= startDate);
// //       const matchesEndDate = !endDate || (transactionDate && transactionDate <= endDate);
      
// //       return matchesSearch && matchesStartDate && matchesEndDate;
// //     })
// //     .sort((a, b) => new Date(b.occurred_at) - new Date(a.occurred_at)); // Sort by date, newest first

// //   const formatCurrency = (amount, currency = 'INR') => {
// //     try {
// //       return new Intl.NumberFormat('en-IN', { 
// //         style: 'currency', 
// //         currency: currency,
// //         minimumFractionDigits: 0,
// //         maximumFractionDigits: 2
// //       }).format(amount || 0);
// //     } catch (e) {
// //       return `${currency} ${amount || 0}`;
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     return new Date(dateString).toLocaleDateString('en-IN', {
// //       day: 'numeric',
// //       month: 'short',
// //       year: 'numeric'
// //     });
// //   };

// //   const formatDateTime = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     return new Date(dateString).toLocaleDateString('en-IN', {
// //       day: 'numeric',
// //       month: 'short',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   // Get source display label
// //   const getSourceLabel = (sourceValue) => {
// //     const source = SOURCE_OPTIONS.find(s => s.value === sourceValue);
// //     return source ? source.label : sourceValue;
// //   };

// //   // Get filter summary text
// //   const getFilterSummary = () => {
// //     if (!startDate && !endDate) return 'All time';
// //     if (startDate && endDate) {
// //       return `${formatDate(startDate.toISOString())} - ${formatDate(endDate.toISOString())}`;
// //     }
// //     if (startDate) return `From ${formatDate(startDate.toISOString())}`;
// //     if (endDate) return `Until ${formatDate(endDate.toISOString())}`;
// //     return 'All time';
// //   };

// //   if (loading && !transactions.length) {
// //     return (
// //       <Theme name="dark">
// //         <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// //           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //             <Spinner size="large" color="#EAB308" />
// //             <Text color="white" mt={16}>Loading transactions...</Text>
// //           </View>
// //         </SafeAreaView>
// //       </Theme>
// //     );
// //   }

// //   return (
// //     <Theme name="dark">
// //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// //         {/* HEADER */}
// //         <XStack p={20} ai="center" space={16}>
// //           <TouchableOpacity onPress={() => router.back()}>
// //             <ArrowLeft size={24} color="#EAB308" />
// //           </TouchableOpacity>
          
// //           <YStack flex={1}>
// //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
// //               Transactions
// //             </H2>
// //             <Text color="#666666" fontSize={14}>
// //               {getFilterSummary()}
// //             </Text>
// //           </YStack>
          
// //           <TouchableOpacity 
// //             onPress={() => setShowFilterSheet(true)}
// //             style={{
// //               width: 44,
// //               height: 44,
// //               borderRadius: 22,
// //               backgroundColor: '#1A1A1A',
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //               borderWidth: 1,
// //               borderColor: '#444444',
// //               marginRight: 12
// //             }}
// //           >
// //             <Filter size={20} color="#EAB308" />
// //           </TouchableOpacity>
          
// //           <TouchableOpacity 
// //             onPress={() => setShowAddModal(true)}
// //             style={{
// //               width: 44,
// //               height: 44,
// //               borderRadius: 22,
// //               backgroundColor: '#1A1A1A',
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //               borderWidth: 1,
// //               borderColor: '#EAB308',
// //             }}
// //           >
// //             <Plus size={20} color="#EAB308" />
// //           </TouchableOpacity>
// //         </XStack>

// //         {/* SEARCH */}
// //         <XStack p={20} pb={12}>
// //           <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 12 }}>
// //             <Search size={16} color="#666666" />
// //             <Input
// //               placeholder="Search transactions..."
// //               value={searchQuery}
// //               onChangeText={setSearchQuery}
// //               backgroundColor="transparent"
// //               borderWidth={0}
// //               color="white"
// //               placeholderTextColor="#666666"
// //               fontSize={14}
// //               flex={1}
// //             />
// //           </View>
// //         </XStack>

// //         {/* TRANSACTIONS LIST */}
// //         <FlatList
// //           data={filteredTransactions}
// //           keyExtractor={(item, index) => item?.id || index.toString()}
// //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
// //           showsVerticalScrollIndicator={false}
// //           refreshing={refreshing}
// //           onRefresh={onRefresh}
// //           ListEmptyComponent={
// //             <YStack ai="center" py={48}>
// //               <DollarSign size={64} color="#333333" />
// //               <Text color="#666666" fontSize={16} mt={16}>
// //                 No transactions found
// //               </Text>
// //               <Text color="#444444" fontSize={14} mt={8} mb={16}>
// //                 {startDate || endDate ? 'Try changing your filters' : 'Add your first transaction'}
// //               </Text>
// //               <TouchableOpacity 
// //                 onPress={() => setShowAddModal(true)}
// //                 style={{
// //                   backgroundColor: '#EAB308',
// //                   paddingHorizontal: 24,
// //                   paddingVertical: 12,
// //                   borderRadius: 12,
// //                 }}
// //               >
// //                 <Text color="black" fontSize={14} fontWeight="700">Add Transaction</Text>
// //               </TouchableOpacity>
// //             </YStack>
// //           }
// //           renderItem={({ item }) => {
// //             if (!item) return null;
            
// //             const isExpense = item.amount < 0;
// //             const amount = Math.abs(item.amount || 0);
            
// //             return (
// //               <TouchableOpacity 
// //                 onPress={() => openEditModal(item)}
// //                 activeOpacity={0.8}
// //               >
// //                 <Card 
// //                   backgroundColor="#1A1A1A" 
// //                   mb={12} 
// //                   p={16} 
// //                   borderRadius={12}
// //                 >
// //                   <XStack jc="space-between" ai="flex-start">
// //                     <YStack flex={1}>
// //                       <Text color="white" fontWeight="800" fontSize={16} numberOfLines={1}>
// //                         {item.description || 'No description'}
// //                       </Text>
                      
// //                       <XStack ai="center" space={12} mt={4} flexWrap="wrap">
// //                         {item.merchant_raw && (
// //                           <XStack ai="center" space={4}>
// //                             <Store size={12} color="#666666" />
// //                             <Text color="#666666" fontSize={12}>
// //                               {item.merchant_raw}
// //                             </Text>
// //                           </XStack>
// //                         )}
                        
// //                         <Text color="#666666" fontSize={11}>
// //                           {formatDateTime(item.occurred_at)}
// //                         </Text>
                        
// //                         {item.source && (
// //                           <Text color="#666666" fontSize={11}>
// //                             • {getSourceLabel(item.source)}
// //                           </Text>
// //                         )}
// //                       </XStack>
// //                     </YStack>
                    
// //                     <XStack ai="center" space={12}>
// //                       <Text 
// //                         color={isExpense ? "#EF4444" : "#22C55E"} 
// //                         fontWeight="800" 
// //                         fontSize={16}
// //                       >
// //                         {isExpense ? '-' : '+'}{formatCurrency(amount, item.currency)}
// //                       </Text>
                      
// //                       <TouchableOpacity 
// //                         onPress={(e) => {
// //                           e.stopPropagation();
// //                           handleDeleteTransaction(item.id);
// //                         }}
// //                         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
// //                       >
// //                         <Trash2 size={16} color="#EF4444" />
// //                       </TouchableOpacity>
// //                     </XStack>
// //                   </XStack>
// //                 </Card>
// //               </TouchableOpacity>
// //             );
// //           }}
// //         />

// //         {/* ADD/EDIT TRANSACTION MODAL */}
// //         <Modal
// //           visible={showAddModal}
// //           animationType="slide"
// //           transparent={true}
// //           onRequestClose={() => {
// //             setShowAddModal(false);
// //             resetForm();
// //           }}
// //         >
// //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
// //             <ScrollView style={{ maxHeight: '80%' }}>
// //               <View style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 20 }}>
// //                 <XStack jc="space-between" ai="center" mb={24}>
// //                   <H4 color="white" fontWeight="800" fontSize={20}>
// //                     {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
// //                   </H4>
// //                   <TouchableOpacity onPress={() => {
// //                     setShowAddModal(false);
// //                     resetForm();
// //                   }}>
// //                     <X size={24} color="#666666" />
// //                   </TouchableOpacity>
// //                 </XStack>

// //                 <YStack space={16}>
// //                   {/* Amount */}
// //                   <YStack>
// //                     <Label htmlFor="amount" color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                       Amount
// //                     </Label>
// //                     <Input
// //                       id="amount"
// //                       placeholder="0.00"
// //                       value={formData.amount}
// //                       onChangeText={(text) => setFormData({...formData, amount: text})}
// //                       backgroundColor="#333333"
// //                       borderColor="#444444"
// //                       color="white"
// //                       placeholderTextColor="#666666"
// //                       keyboardType="decimal-pad"
// //                       fontSize={16}
// //                     />
// //                   </YStack>

// //                   {/* Currency Select */}
// //                   <YStack>
// //                     <Label htmlFor="currency" color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                       Currency
// //                     </Label>
// //                     <Select
// //                       id="currency"
// //                       value={formData.currency}
// //                       onValueChange={(value) => setFormData({...formData, currency: value})}
// //                     >
// //                       <Select.Trigger
// //                         backgroundColor="#333333"
// //                         borderColor="#444444"
// //                         iconAfter={ChevronDown}
// //                       >
// //                         <Select.Value placeholder="Select currency" color="white" />
// //                       </Select.Trigger>

// //                       <Adapt when="sm" platform="touch">
// //                         <Sheet modal dismissOnSnapToBottom>
// //                           <Sheet.Frame>
// //                             <Sheet.ScrollView>
// //                               <Adapt.Contents />
// //                             </Sheet.ScrollView>
// //                           </Sheet.Frame>
// //                           <Sheet.Overlay />
// //                         </Sheet>
// //                       </Adapt>

// //                       <Select.Content zIndex={200000}>
// //                         <Select.Viewport>
// //                           <Select.Group>
// //                             {CURRENCY_OPTIONS.map((currency, i) => (
// //                               <Select.Item 
// //                                 index={i} 
// //                                 key={currency.value} 
// //                                 value={currency.value}
// //                               >
// //                                 <Select.ItemText color="white">
// //                                   {currency.label}
// //                                 </Select.ItemText>
// //                                 <Select.ItemIndicator marginLeft="auto">
// //                                   <Check size={16} />
// //                                 </Select.ItemIndicator>
// //                               </Select.Item>
// //                             ))}
// //                           </Select.Group>
// //                         </Select.Viewport>
// //                       </Select.Content>
// //                     </Select>
// //                   </YStack>

// //                   {/* Merchant/Store */}
// //                   <YStack>
// //                     <Label htmlFor="merchant" color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                       Merchant/Store
// //                     </Label>
// //                     <Input
// //                       id="merchant"
// //                       placeholder="Where did this happen?"
// //                       value={formData.merchant_raw}
// //                       onChangeText={(text) => setFormData({...formData, merchant_raw: text})}
// //                       backgroundColor="#333333"
// //                       borderColor="#444444"
// //                       color="white"
// //                       placeholderTextColor="#666666"
// //                       fontSize={16}
// //                     />
// //                   </YStack>

// //                   {/* Description */}
// //                   <YStack>
// //                     <Label htmlFor="description" color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                       Description
// //                     </Label>
// //                     <Input
// //                       id="description"
// //                       placeholder="What was this for?"
// //                       value={formData.description}
// //                       onChangeText={(text) => setFormData({...formData, description: text})}
// //                       backgroundColor="#333333"
// //                       borderColor="#444444"
// //                       color="white"
// //                       placeholderTextColor="#666666"
// //                       fontSize={16}
// //                       multiline
// //                       minHeight={60}
// //                     />
// //                   </YStack>

// //                   {/* Source Select */}
// //                   <YStack>
// //                     <Label htmlFor="source" color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                       Source
// //                     </Label>
// //                     <Select
// //                       id="source"
// //                       value={formData.source}
// //                       onValueChange={(value) => setFormData({...formData, source: value})}
// //                     >
// //                       <Select.Trigger
// //                         backgroundColor="#333333"
// //                         borderColor="#444444"
// //                         iconAfter={ChevronDown}
// //                       >
// //                         <Select.Value placeholder="Select source" color="white" />
// //                       </Select.Trigger>

// //                       <Adapt when="sm" platform="touch">
// //                         <Sheet modal dismissOnSnapToBottom>
// //                           <Sheet.Frame>
// //                             <Sheet.ScrollView>
// //                               <Adapt.Contents />
// //                             </Sheet.ScrollView>
// //                           </Sheet.Frame>
// //                           <Sheet.Overlay />
// //                         </Sheet>
// //                       </Adapt>

// //                       <Select.Content zIndex={200000}>
// //                         <Select.Viewport>
// //                           <Select.Group>
// //                             {SOURCE_OPTIONS.map((source, i) => (
// //                               <Select.Item 
// //                                 index={i} 
// //                                 key={source.value} 
// //                                 value={source.value}
// //                               >
// //                                 <Select.ItemText color="white">
// //                                   {source.label}
// //                                 </Select.ItemText>
// //                                 <Select.ItemIndicator marginLeft="auto">
// //                                   <Check size={16} />
// //                                 </Select.ItemIndicator>
// //                               </Select.Item>
// //                             ))}
// //                           </Select.Group>
// //                         </Select.Viewport>
// //                       </Select.Content>
// //                     </Select>
// //                   </YStack>

// //                   {/* Category ID (optional) */}
// //                   <YStack>
// //                     <Label htmlFor="category" color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                       Category ID (Optional)
// //                     </Label>
// //                     <Input
// //                       id="category"
// //                       placeholder="Leave empty for auto-categorization"
// //                       value={formData.category_id}
// //                       onChangeText={(text) => setFormData({...formData, category_id: text})}
// //                       backgroundColor="#333333"
// //                       borderColor="#444444"
// //                       color="white"
// //                       placeholderTextColor="#666666"
// //                       fontSize={16}
// //                     />
// //                   </YStack>

// //                   {/* Submit Button */}
// //                   <TouchableOpacity
// //                     onPress={selectedTransaction ? handleUpdateTransaction : handleAddTransaction}
// //                     style={{
// //                       backgroundColor: '#EAB308',
// //                       padding: 16,
// //                       borderRadius: 12,
// //                       alignItems: 'center',
// //                       marginTop: 24,
// //                     }}
// //                   >
// //                     <Text color="black" fontSize={16} fontWeight="800">
// //                       {selectedTransaction ? 'Update Transaction' : 'Add Transaction'}
// //                     </Text>
// //                   </TouchableOpacity>
// //                 </YStack>
// //               </View>
// //             </ScrollView>
// //           </View>
// //         </Modal>

// //         {/* FILTER SHEET */}
// //         <Sheet
// //           modal
// //           open={showFilterSheet}
// //           onOpenChange={setShowFilterSheet}
// //           snapPoints={[40]}
// //           dismissOnSnapToBottom
// //           animation="medium"
// //         >
// //           <Sheet.Overlay />
// //           <Sheet.Frame backgroundColor="#1A1A1A" borderTopLeftRadius={20} borderTopRightRadius={20}>
// //             <Sheet.Handle backgroundColor="#444444" />
// //             <YStack p={24}>
// //               <H4 color="white" fontWeight="800" mb={24}>Filter Transactions</H4>
              
// //               <YStack space={20}>
// //                 {/* Start Date */}
// //                 <YStack>
// //                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                     Start Date
// //                   </Text>
// //                   <TouchableOpacity
// //                     onPress={() => setShowDatePicker('start')}
// //                     style={{
// //                       backgroundColor: '#333333',
// //                       borderWidth: 1,
// //                       borderColor: '#444444',
// //                       borderRadius: 8,
// //                       padding: 12,
// //                       flexDirection: 'row',
// //                       alignItems: 'center',
// //                       justifyContent: 'space-between'
// //                     }}
// //                   >
// //                     <Text color="white" fontSize={14}>
// //                       {startDate ? formatDate(startDate.toISOString()) : 'Select start date'}
// //                     </Text>
// //                     <Calendar size={16} color="#666666" />
// //                   </TouchableOpacity>
// //                 </YStack>

// //                 {/* End Date */}
// //                 <YStack>
// //                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                     End Date
// //                   </Text>
// //                   <TouchableOpacity
// //                     onPress={() => setShowDatePicker('end')}
// //                     style={{
// //                       backgroundColor: '#333333',
// //                       borderWidth: 1,
// //                       borderColor: '#444444',
// //                       borderRadius: 8,
// //                       padding: 12,
// //                       flexDirection: 'row',
// //                       alignItems: 'center',
// //                       justifyContent: 'space-between'
// //                     }}
// //                   >
// //                     <Text color="white" fontSize={14}>
// //                       {endDate ? formatDate(endDate.toISOString()) : 'Select end date'}
// //                     </Text>
// //                     <Calendar size={16} color="#666666" />
// //                   </TouchableOpacity>
// //                 </YStack>

// //                 <XStack space={12}>
// //                   <TouchableOpacity
// //                     onPress={resetFilters}
// //                     style={{
// //                       flex: 1,
// //                       backgroundColor: '#333333',
// //                       padding: 16,
// //                       borderRadius: 12,
// //                       alignItems: 'center',
// //                       borderWidth: 1,
// //                       borderColor: '#444444'
// //                     }}
// //                   >
// //                     <Text color="white" fontSize={14} fontWeight="600">
// //                       Reset
// //                     </Text>
// //                   </TouchableOpacity>

// //                   <TouchableOpacity
// //                     onPress={() => {
// //                       setShowFilterSheet(false);
// //                       fetchTransactions(startDate, endDate);
// //                     }}
// //                     style={{
// //                       flex: 1,
// //                       backgroundColor: '#EAB308',
// //                       padding: 16,
// //                       borderRadius: 12,
// //                       alignItems: 'center'
// //                     }}
// //                   >
// //                     <Text color="black" fontSize={14} fontWeight="600">
// //                       Apply Filters
// //                     </Text>
// //                   </TouchableOpacity>
// //                 </XStack>
// //               </YStack>
// //             </YStack>
// //           </Sheet.Frame>
// //         </Sheet>

// //         {/* DATE PICKER */}
// //         {showDatePicker && (
// //           <DateTimePicker
// //             value={showDatePicker === 'start' && startDate ? startDate : 
// //                    showDatePicker === 'end' && endDate ? endDate : new Date()}
// //             mode="date"
// //             display="default"
// //             onChange={onDateChange}
// //             maximumDate={new Date()}
// //           />
// //         )}
// //       </SafeAreaView>
// //     </Theme>
// //   );
// // }




// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   FlatList,
//   View
// } from 'react-native';
// import {
//   YStack,
//   XStack,
//   Text,
//   H2,
//   H4,
//   Theme,
//   Spinner,
//   Input,
//   Card,
//   Sheet,
//   Select,
//   Adapt,
//   Label
// } from 'tamagui';
// import {
//   ArrowLeft,
//   Plus,
//   Search,
//   Store,
//   DollarSign,
//   Edit3,
//   Trash2,
//   X,
//   Calendar,
//   Filter,
//   ChevronDown,
//   Check,
//   Tag,
//   AlertTriangle,
//   CheckCircle,
//   List,
//   Eye,
//   EyeOff,
//   ChevronRight
// } from '@tamagui/lucide-icons';
// import { useRouter, useFocusEffect } from 'expo-router';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import DateTimePicker from '@react-native-community/datetimepicker';

// // Services
// import { ApiService } from '../../../services/apiService';

// // Currency options (common currencies)
// const CURRENCY_OPTIONS = [
//   { value: 'INR', label: 'Indian Rupee (₹)' },
//   { value: 'USD', label: 'US Dollar ($)' },
//   { value: 'EUR', label: 'Euro (€)' },
//   { value: 'GBP', label: 'British Pound (£)' },
//   { value: 'JPY', label: 'Japanese Yen (¥)' },
//   { value: 'CAD', label: 'Canadian Dollar (C$)' },
//   { value: 'AUD', label: 'Australian Dollar (A$)' },
//   { value: 'SGD', label: 'Singapore Dollar (S$)' },
//   { value: 'AED', label: 'UAE Dirham (د.إ)' },
// ];

// // Source options from txn_source_enum
// const SOURCE_OPTIONS = [
//   { value: 'manual', label: 'Manual Entry' },
//   { value: 'voice', label: 'Voice Input' },
//   { value: 'chatbot', label: 'Chatbot' },
//   { value: 'csv', label: 'CSV Import' },
//   { value: 'notification', label: 'Notification' },
//   { value: 'wallet', label: 'Wallet Sync' },
//   { value: 'blockchain', label: 'Blockchain' },
// ];

// export default function Transactions() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
  
//   // State
//   const [transactions, setTransactions] = useState([]);
//   const [transactionsNeedingReview, setTransactionsNeedingReview] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [selectedReviewTransaction, setSelectedReviewTransaction] = useState(null);
//   const [showFilterSheet, setShowFilterSheet] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(null);
//   const [activeTab, setActiveTab] = useState('all'); // 'all', 'review'
//   const [reviewLoading, setReviewLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [manualCategoryId, setManualCategoryId] = useState('');
  
//   // Filter states
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
  
//   // Form state with proper defaults based on enums
//   const [formData, setFormData] = useState({
//     amount: '',
//     merchant_raw: '',
//     description: '',
//     currency: 'INR',
//     occurred_at: new Date().toISOString(),
//     category_id: '',
//     source: 'manual'
//   });

//   // Fetch categories
//   const fetchCategories = useCallback(async () => {
//     try {
//       const response = await ApiService.get('/categories');
//       setCategories(response.data || []);
//     } catch (error) {
//       console.log('Could not fetch categories:', error.message);
//       // Don't show error to user, just log it
//     }
//   }, []);

//   // Fetch transactions with optional date filters
//   const fetchTransactions = useCallback(async (start = null, end = null) => {
//     try {
//       setLoading(true);
//       const params = {};
      
//       if (start) {
//         params.start_date = start.toISOString().split('T')[0];
//       }
//       if (end) {
//         params.end_date = end.toISOString().split('T')[0];
//       }
      
//       const response = await ApiService.get('/transactions/', { params });
//       setTransactions(response.data || []);
      
//       // Also fetch transactions needing review
//       try {
//         const reviewResponse = await ApiService.get('/transactions/review');
//         setTransactionsNeedingReview(reviewResponse.data || []);
//       } catch (reviewError) {
//         console.log('Could not fetch review transactions:', reviewError.message);
//       }
//     } catch (error) {
//       console.error('Fetch transactions error:', error);
//       Alert.alert('Error', 'Failed to load transactions');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       fetchTransactions(startDate, endDate);
//       fetchCategories();
//     }, [fetchTransactions, fetchCategories, startDate, endDate])
//   );

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchTransactions(startDate, endDate);
//     fetchCategories();
//   }, [fetchTransactions, fetchCategories, startDate, endDate]);

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       amount: '',
//       merchant_raw: '',
//       description: '',
//       currency: 'INR',
//       occurred_at: new Date().toISOString(),
//       category_id: '',
//       source: 'manual'
//     });
//     setManualCategoryId('');
//     setSelectedTransaction(null);
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setSearchQuery('');
//   };

//   // Create transaction
//   const handleAddTransaction = async () => {
//     try {
//       // Basic validation
//       if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
//         Alert.alert('Error', 'Please enter a valid amount');
//         return;
//       }
      
//       if (!formData.merchant_raw?.trim()) {
//         Alert.alert('Error', 'Please enter merchant/store name');
//         return;
//       }
      
//       if (!formData.description?.trim()) {
//         Alert.alert('Error', 'Please enter a description');
//         return;
//       }

//       const transactionData = {
//         amount: parseFloat(formData.amount),
//         merchant_raw: formData.merchant_raw.trim(),
//         description: formData.description.trim(),
//         currency: formData.currency,
//         occurred_at: formData.occurred_at,
//         source: formData.source,
//         category_id: formData.category_id || undefined
//       };

//       const response = await ApiService.post('/transactions/', transactionData);
      
//       // Check if transaction needs review
//       if (response.data?.needs_category_review) {
//         // Show review modal immediately
//         setSelectedReviewTransaction(response.data);
//         setShowReviewModal(true);
//       }
      
//       setShowAddModal(false);
//       resetForm();
//       fetchTransactions(startDate, endDate);
      
//       if (!response.data?.needs_category_review) {
//         Alert.alert('Success', 'Transaction added successfully');
//       }
      
//     } catch (error) {
//       console.error('Add transaction error:', error);
      
//       if (error.response?.status === 422 && error.response?.data?.detail) {
//         const validationErrors = error.response.data.detail;
//         const errorMessages = validationErrors.map(err => 
//           `${err.loc?.join('.') || 'Field'}: ${err.msg}`
//         ).join('\n\n');
        
//         Alert.alert('Validation Error', errorMessages);
//       } else {
//         Alert.alert('Error', error.message || 'Failed to add transaction');
//       }
//     }
//   };

//   // Update transaction
//   const handleUpdateTransaction = async () => {
//     try {
//       if (!selectedTransaction) return;
      
//       // Same validation as add
//       if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
//         Alert.alert('Error', 'Please enter a valid amount');
//         return;
//       }
      
//       if (!formData.merchant_raw?.trim()) {
//         Alert.alert('Error', 'Please enter merchant/store name');
//         return;
//       }
      
//       if (!formData.description?.trim()) {
//         Alert.alert('Error', 'Please enter a description');
//         return;
//       }

//       const transactionData = {
//         amount: parseFloat(formData.amount),
//         merchant_raw: formData.merchant_raw.trim(),
//         description: formData.description.trim(),
//         currency: formData.currency,
//         occurred_at: formData.occurred_at,
//         source: formData.source,
//         category_id: formData.category_id || undefined
//       };

//       const response = await ApiService.patch(`/transactions/${selectedTransaction.id}`, transactionData);
      
//       setShowAddModal(false);
//       resetForm();
//       fetchTransactions(startDate, endDate);
//       Alert.alert('Success', 'Transaction updated successfully');
      
//     } catch (error) {
//       console.error('Update transaction error:', error);
      
//       if (error.response?.status === 422 && error.response?.data?.detail) {
//         const validationErrors = error.response.data.detail;
//         const errorMessages = validationErrors.map(err => 
//           `${err.loc?.join('.') || 'Field'}: ${err.msg}`
//         ).join('\n\n');
        
//         Alert.alert('Validation Error', errorMessages);
//       } else {
//         Alert.alert('Error', error.message || 'Failed to update transaction');
//       }
//     }
//   };

//   // Delete transaction
//   const handleDeleteTransaction = async (id) => {
//     Alert.alert(
//       'Delete Transaction',
//       'Are you sure you want to delete this transaction?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'Delete', 
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               // Since we only have PATCH endpoint, we can update to mark as deleted
//               await ApiService.patch(`transactions/${id}`, {
//                 description: `[DELETED] ${formData.description || ''}`,
//                 source: 'manual'
//               });
//               fetchTransactions(startDate, endDate);
//               Alert.alert('Success', 'Transaction marked as deleted');
//             } catch (error) {
//               console.error('Delete error:', error);
//               Alert.alert('Error', 'Failed to delete transaction');
//             }
//           }
//         }
//       ]
//     );
//   };

//   // Confirm transaction category
//   const handleConfirmCategory = async (txnId, categoryId) => {
//     try {
//       setReviewLoading(true);
      
//       if (!categoryId || !txnId) {
//         Alert.alert('Error', 'Category ID is required');
//         return;
//       }

//       const response = await ApiService.patch(`/transactions/${txnId}/category?category_id=${categoryId}`);
      
//       // Refresh both lists
//       fetchTransactions(startDate, endDate);
//       setShowReviewModal(false);
//       setSelectedReviewTransaction(null);
//       setManualCategoryId('');
      
//       Alert.alert('Success', 'Category confirmed successfully');
      
//     } catch (error) {
//       console.error('Confirm category error:', error);
//       Alert.alert('Error', 'Failed to confirm category');
//     } finally {
//       setReviewLoading(false);
//     }
//   };

//   // Confirm manual category input
//   const handleConfirmManualCategory = async () => {
//     if (!selectedReviewTransaction || !manualCategoryId.trim()) {
//       Alert.alert('Error', 'Please enter a valid category ID');
//       return;
//     }
    
//     await handleConfirmCategory(selectedReviewTransaction.id, manualCategoryId.trim());
//   };

//   // Open edit modal
//   const openEditModal = (transaction) => {
//     setSelectedTransaction(transaction);
//     setFormData({
//       amount: Math.abs(transaction.amount)?.toString() || '',
//       merchant_raw: transaction.merchant_raw || '',
//       description: transaction.description || '',
//       currency: transaction.currency || 'INR',
//       occurred_at: transaction.occurred_at || new Date().toISOString(),
//       category_id: transaction.category_id || '',
//       source: transaction.source || 'manual'
//     });
//     setShowAddModal(true);
//   };

//   // Open review modal
//   const openReviewModal = (transaction) => {
//     setSelectedReviewTransaction(transaction);
//     setManualCategoryId('');
//     setShowReviewModal(true);
//   };

//   // Handle date picker change
//   const onDateChange = (event, selectedDate) => {
//     setShowDatePicker(null);
//     if (selectedDate) {
//       if (showDatePicker === 'start') {
//         setStartDate(selectedDate);
//       } else if (showDatePicker === 'end') {
//         setEndDate(selectedDate);
//       }
//     }
//   };

//   // Filter transactions based on search and date range
//   const getFilteredTransactions = () => {
//     const transactionList = activeTab === 'review' ? transactionsNeedingReview : transactions;
    
//     return transactionList
//       .filter(txn => txn)
//       .filter(txn => {
//         const matchesSearch = !searchQuery || 
//           txn.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           txn.merchant_raw?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           txn.source?.toLowerCase().includes(searchQuery.toLowerCase());
        
//         const transactionDate = txn.occurred_at ? new Date(txn.occurred_at) : null;
//         const matchesStartDate = !startDate || (transactionDate && transactionDate >= startDate);
//         const matchesEndDate = !endDate || (transactionDate && transactionDate <= endDate);
        
//         return matchesSearch && matchesStartDate && matchesEndDate;
//       })
//       .sort((a, b) => new Date(b.occurred_at) - new Date(a.occurred_at));
//   };

//   const formatCurrency = (amount, currency = 'INR') => {
//     try {
//       return new Intl.NumberFormat('en-IN', { 
//         style: 'currency', 
//         currency: currency,
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 2
//       }).format(amount || 0);
//     } catch (e) {
//       return `${currency} ${amount || 0}`;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Get source display label
//   const getSourceLabel = (sourceValue) => {
//     const source = SOURCE_OPTIONS.find(s => s.value === sourceValue);
//     return source ? source.label : sourceValue;
//   };

//   // Get category name by ID
//   const getCategoryName = (categoryId) => {
//     if (!categoryId) return 'Uncategorized';
//     const category = categories.find(c => c.id === categoryId);
//     return category ? category.name : categoryId;
//   };

//   // Get filter summary text
//   const getFilterSummary = () => {
//     if (!startDate && !endDate) return 'All time';
//     if (startDate && endDate) {
//       return `${formatDate(startDate.toISOString())} - ${formatDate(endDate.toISOString())}`;
//     }
//     if (startDate) return `From ${formatDate(startDate.toISOString())}`;
//     if (endDate) return `Until ${formatDate(endDate.toISOString())}`;
//     return 'All time';
//   };

//   // Render transaction item
//   const renderTransactionItem = ({ item }) => {
//     if (!item) return null;
    
//     const isExpense = item.amount < 0;
//     const amount = Math.abs(item.amount || 0);
//     const needsReview = item.needs_category_review || activeTab === 'review';
    
//     return (
//       <TouchableOpacity 
//         onPress={() => needsReview ? openReviewModal(item) : openEditModal(item)}
//         activeOpacity={0.8}
//       >
//         <Card 
//           backgroundColor="#1A1A1A" 
//           mb={12} 
//           p={16} 
//           borderRadius={12}
//           borderLeftWidth={needsReview ? 4 : 0}
//           borderLeftColor={needsReview ? "#EF4444" : "transparent"}
//         >
//           <XStack jc="space-between" ai="flex-start">
//             <YStack flex={1}>
//               <XStack ai="center" space={8} mb={4}>
//                 <Text color="white" fontWeight="800" fontSize={16} numberOfLines={1} flex={1}>
//                   {item.description || 'No description'}
//                 </Text>
//                 {needsReview && (
//                   <AlertTriangle size={14} color="#EF4444" />
//                 )}
//               </XStack>
              
//               <XStack ai="center" space={12} mt={4} flexWrap="wrap">
//                 {item.merchant_raw && (
//                   <XStack ai="center" space={4}>
//                     <Store size={12} color="#666666" />
//                     <Text color="#666666" fontSize={12}>
//                       {item.merchant_raw}
//                     </Text>
//                   </XStack>
//                 )}
                
//                 <Text color="#666666" fontSize={11}>
//                   {formatDateTime(item.occurred_at)}
//                 </Text>
                
//                 {item.source && (
//                   <Text color="#666666" fontSize={11}>
//                     • {getSourceLabel(item.source)}
//                   </Text>
//                 )}
//               </XStack>
              
//               {item.category_id && (
//                 <XStack ai="center" space={4} mt={6}>
//                   <Tag size={12} color="#22C55E" />
//                   <Text color="#22C55E" fontSize={11} fontWeight="600">
//                     {getCategoryName(item.category_id)}
//                   </Text>
//                 </XStack>
//               )}
              
//               {needsReview && item.category_confidence !== undefined && (
//                 <XStack ai="center" space={4} mt={6}>
//                   <Tag size={12} color="#F59E0B" />
//                   <Text color="#F59E0B" fontSize={11} fontWeight="600">
//                     Confidence: {(item.category_confidence * 100).toFixed(0)}%
//                   </Text>
//                 </XStack>
//               )}
//             </YStack>
            
//             <XStack ai="center" space={12}>
//               <Text 
//                 color={isExpense ? "#EF4444" : "#22C55E"} 
//                 fontWeight="800" 
//                 fontSize={16}
//               >
//                 {isExpense ? '-' : '+'}{formatCurrency(amount, item.currency)}
//               </Text>
              
//               {activeTab === 'all' && (
//                 <TouchableOpacity 
//                   onPress={(e) => {
//                     e.stopPropagation();
//                     handleDeleteTransaction(item.id);
//                   }}
//                   hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                 >
//                   <Trash2 size={16} color="#EF4444" />
//                 </TouchableOpacity>
//               )}
//             </XStack>
//           </XStack>
//         </Card>
//       </TouchableOpacity>
//     );
//   };

//   if (loading && !transactions.length) {
//     return (
//       <Theme name="dark">
//         <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
//           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Spinner size="large" color="#EAB308" />
//             <Text color="white" mt={16}>Loading transactions...</Text>
//           </View>
//         </SafeAreaView>
//       </Theme>
//     );
//   }

//   return (
//     <Theme name="dark">
//       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
//         {/* HEADER */}
//         <XStack p={20} ai="center" space={16}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <ArrowLeft size={24} color="#EAB308" />
//           </TouchableOpacity>
          
//           <YStack flex={1}>
//             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
//               Transactions
//             </H2>
//             <Text color="#666666" fontSize={14}>
//               {getFilterSummary()}
//             </Text>
//           </YStack>
          
//           <TouchableOpacity 
//             onPress={() => setShowFilterSheet(true)}
//             style={{
//               width: 44,
//               height: 44,
//               borderRadius: 22,
//               backgroundColor: '#1A1A1A',
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderWidth: 1,
//               borderColor: '#444444',
//               marginRight: 12
//             }}
//           >
//             <Filter size={20} color="#EAB308" />
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             onPress={() => setShowAddModal(true)}
//             style={{
//               width: 44,
//               height: 44,
//               borderRadius: 22,
//               backgroundColor: '#1A1A1A',
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderWidth: 1,
//               borderColor: '#EAB308',
//             }}
//           >
//             <Plus size={20} color="#EAB308" />
//           </TouchableOpacity>
//         </XStack>

//         {/* TABS */}
//         <XStack p={20} pb={0} space={12}>
//           <TouchableOpacity
//             onPress={() => setActiveTab('all')}
//             style={{
//               flex: 1,
//               backgroundColor: activeTab === 'all' ? '#EAB30820' : '#1A1A1A',
//               paddingVertical: 10,
//               borderRadius: 12,
//               alignItems: 'center',
//               borderWidth: 1,
//               borderColor: activeTab === 'all' ? '#EAB308' : '#333333',
//             }}
//           >
//             <XStack ai="center" space={6}>
//               <List size={14} color={activeTab === 'all' ? '#EAB308' : '#666666'} />
//               <Text 
//                 color={activeTab === 'all' ? '#EAB308' : '#666666'} 
//                 fontSize={14} 
//                 fontWeight="700"
//               >
//                 All
//               </Text>
//               <View style={{
//                 backgroundColor: activeTab === 'all' ? '#EAB308' : '#333333',
//                 paddingHorizontal: 8,
//                 paddingVertical: 2,
//                 borderRadius: 10,
//                 marginLeft: 4,
//               }}>
//                 <Text color="white" fontSize={10} fontWeight="700">
//                   {transactions.length}
//                 </Text>
//               </View>
//             </XStack>
//           </TouchableOpacity>
          
//           <TouchableOpacity
//             onPress={() => setActiveTab('review')}
//             style={{
//               flex: 1,
//               backgroundColor: activeTab === 'review' ? '#EF444420' : '#1A1A1A',
//               paddingVertical: 10,
//               borderRadius: 12,
//               alignItems: 'center',
//               borderWidth: 1,
//               borderColor: activeTab === 'review' ? '#EF4444' : '#333333',
//             }}
//           >
//             <XStack ai="center" space={6}>
//               <AlertTriangle size={14} color={activeTab === 'review' ? '#EF4444' : '#666666'} />
//               <Text 
//                 color={activeTab === 'review' ? '#EF4444' : '#666666'} 
//                 fontSize={14} 
//                 fontWeight="700"
//               >
//                 Review
//               </Text>
//               <View style={{
//                 backgroundColor: activeTab === 'review' ? '#EF4444' : '#333333',
//                 paddingHorizontal: 8,
//                 paddingVertical: 2,
//                 borderRadius: 10,
//                 marginLeft: 4,
//               }}>
//                 <Text color="white" fontSize={10} fontWeight="700">
//                   {transactionsNeedingReview.length}
//                 </Text>
//               </View>
//             </XStack>
//           </TouchableOpacity>
//         </XStack>

//         {/* SEARCH */}
//         <XStack p={20} pb={12}>
//           <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 12 }}>
//             <Search size={16} color="#666666" />
//             <Input
//               placeholder={`Search ${activeTab === 'review' ? 'review' : ''} transactions...`}
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//               backgroundColor="transparent"
//               borderWidth={0}
//               color="white"
//               placeholderTextColor="#666666"
//               fontSize={14}
//               flex={1}
//             />
//           </View>
//         </XStack>

//         {/* TRANSACTIONS LIST */}
//         <FlatList
//           data={getFilteredTransactions()}
//           keyExtractor={(item, index) => item?.id || index.toString()}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
//           showsVerticalScrollIndicator={false}
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           ListEmptyComponent={
//             <YStack ai="center" py={48}>
//               {activeTab === 'review' ? (
//                 <>
//                   <CheckCircle size={64} color="#333333" />
//                   <Text color="#666666" fontSize={16} mt={16}>
//                     No transactions need review
//                   </Text>
//                   <Text color="#444444" fontSize={14} mt={8}>
//                     All transactions are categorized
//                   </Text>
//                 </>
//               ) : (
//                 <>
//                   <DollarSign size={64} color="#333333" />
//                   <Text color="#666666" fontSize={16} mt={16}>
//                     No transactions found
//                   </Text>
//                   <Text color="#444444" fontSize={14} mt={8} mb={16}>
//                     {startDate || endDate ? 'Try changing your filters' : 'Add your first transaction'}
//                   </Text>
//                   <TouchableOpacity 
//                     onPress={() => setShowAddModal(true)}
//                     style={{
//                       backgroundColor: '#EAB308',
//                       paddingHorizontal: 24,
//                       paddingVertical: 12,
//                       borderRadius: 12,
//                     }}
//                   >
//                     <Text color="black" fontSize={14} fontWeight="700">Add Transaction</Text>
//                   </TouchableOpacity>
//                 </>
//               )}
//             </YStack>
//           }
//           renderItem={renderTransactionItem}
//         />
// {/* ADD/EDIT TRANSACTION MODAL */}
// <Modal
//   visible={showAddModal}
//   animationType="slide"
//   transparent={true}
//   onRequestClose={() => {
//     setShowAddModal(false);
//     resetForm();
//   }}
// >
//   <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
//     <ScrollView style={{ maxHeight: '80%' }}>
//       <View style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 20 }}>
//         <XStack jc="space-between" ai="center" mb={24}>
//           <H4 color="white" fontWeight="800" fontSize={20}>
//             {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
//           </H4>
//           <TouchableOpacity onPress={() => {
//             setShowAddModal(false);
//             resetForm();
//           }}>
//             <X size={24} color="#666666" />
//           </TouchableOpacity>
//         </XStack>

//         <YStack space={16}>
//           {/* Amount */}
//           <YStack>
//             <Label htmlFor="amount" color="#999999" fontSize={14} fontWeight="600" mb={8}>
//               Amount
//             </Label>
//             <Input
//               id="amount"
//               placeholder="0.00"
//               value={formData.amount}
//               onChangeText={(text) => setFormData({...formData, amount: text})}
//               backgroundColor="#333333"
//               borderColor="#444444"
//               color="white"
//               placeholderTextColor="#666666"
//               keyboardType="decimal-pad"
//               fontSize={16}
//             />
//           </YStack>

//           {/* Merchant/Store */}
//           <YStack>
//             <Label htmlFor="merchant" color="#999999" fontSize={14} fontWeight="600" mb={8}>
//               Merchant/Store
//             </Label>
//             <Input
//               id="merchant"
//               placeholder="Where did this happen?"
//               value={formData.merchant_raw}
//               onChangeText={(text) => setFormData({...formData, merchant_raw: text})}
//               backgroundColor="#333333"
//               borderColor="#444444"
//               color="white"
//               placeholderTextColor="#666666"
//               fontSize={16}
//             />
//           </YStack>

//           {/* Description */}
//           <YStack>
//             <Label htmlFor="description" color="#999999" fontSize={14} fontWeight="600" mb={8}>
//               Description
//             </Label>
//             <Input
//               id="description"
//               placeholder="What was this for?"
//               value={formData.description}
//               onChangeText={(text) => setFormData({...formData, description: text})}
//               backgroundColor="#333333"
//               borderColor="#444444"
//               color="white"
//               placeholderTextColor="#666666"
//               fontSize={16}
//               multiline
//               minHeight={60}
//             />
//           </YStack>

//           {/* Date */}
//           <YStack>
//             <Label color="#999999" fontSize={14} fontWeight="600" mb={8}>
//               Date & Time
//             </Label>
//             <TouchableOpacity
//               onPress={() => setShowDatePicker('transaction')}
//               style={{
//                 backgroundColor: '#333333',
//                 borderWidth: 1,
//                 borderColor: '#444444',
//                 borderRadius: 8,
//                 padding: 12,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between'
//               }}
//             >
//               <Text color="white" fontSize={14}>
//                 {new Date(formData.occurred_at).toLocaleDateString('en-IN', {
//                   day: 'numeric',
//                   month: 'short',
//                   year: 'numeric',
//                   hour: '2-digit',
//                   minute: '2-digit'
//                 })}
//               </Text>
//               <Calendar size={16} color="#666666" />
//             </TouchableOpacity>
//           </YStack>

//           {/* CURRENCY SELECTION - CARD STYLE */}
//           <YStack>
//             <Label color="#999999" fontSize={14} fontWeight="600" mb={8}>
//               Currency
//             </Label>
//             <ScrollView 
//               horizontal 
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingRight: 16 }}
//             >
//               <XStack space={8}>
//                 {CURRENCY_OPTIONS.map((currency) => (
//                   <TouchableOpacity
//                     key={currency.value}
//                     onPress={() => setFormData({...formData, currency: currency.value})}
//                   >
//                     <Card
//                       backgroundColor={formData.currency === currency.value ? '#EAB30820' : '#333333'}
//                       p={12}
//                       br={8}
//                       minWidth={90}
//                       borderWidth={1}
//                       borderColor={formData.currency === currency.value ? '#EAB308' : '#444444'}
//                     >
//                       <YStack ai="center" space={4}>
//                         <Text 
//                           color={formData.currency === currency.value ? '#EAB308' : 'white'} 
//                           fontSize={12} 
//                           fontWeight="700"
//                         >
//                           {currency.value}
//                         </Text>
//                         <Text 
//                           color={formData.currency === currency.value ? 'rgba(234, 179, 8, 0.8)' : '#666666'} 
//                           fontSize={10}
//                           numberOfLines={1}
//                         >
//                           {currency.label.split('(')[0].trim()}
//                         </Text>
//                         {formData.currency === currency.value && (
//                           <View style={{ 
//                             position: 'absolute', 
//                             top: 4, 
//                             right: 4,
//                             backgroundColor: '#EAB308',
//                             width: 8,
//                             height: 8,
//                             borderRadius: 4 
//                           }} />
//                         )}
//                       </YStack>
//                     </Card>
//                   </TouchableOpacity>
//                 ))}
//               </XStack>
//             </ScrollView>
//           </YStack>

//           {/* SOURCE SELECTION - CARD STYLE */}
//           <YStack>
//             <Label color="#999999" fontSize={14} fontWeight="600" mb={8}>
//               Source
//             </Label>
//             <ScrollView 
//               horizontal 
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingRight: 16 }}
//             >
//               <XStack space={8}>
//                 {SOURCE_OPTIONS.map((source) => (
//                   <TouchableOpacity
//                     key={source.value}
//                     onPress={() => setFormData({...formData, source: source.value})}
//                   >
//                     <Card
//                       backgroundColor={formData.source === source.value ? '#3B82F620' : '#333333'}
//                       p={12}
//                       br={8}
//                       minWidth={100}
//                       borderWidth={1}
//                       borderColor={formData.source === source.value ? '#3B82F6' : '#444444'}
//                     >
//                       <YStack ai="center" space={4}>
//                         <Text 
//                           color={formData.source === source.value ? '#3B82F6' : 'white'} 
//                           fontSize={12} 
//                           fontWeight="700"
//                           textAlign="center"
//                         >
//                           {source.label}
//                         </Text>
//                         {formData.source === source.value && (
//                           <View style={{ 
//                             position: 'absolute', 
//                             top: 4, 
//                             right: 4,
//                             backgroundColor: '#3B82F6',
//                             width: 8,
//                             height: 8,
//                             borderRadius: 4 
//                           }} />
//                         )}
//                       </YStack>
//                     </Card>
//                   </TouchableOpacity>
//                 ))}
//               </XStack>
//             </ScrollView>
//           </YStack>

//           {/* Category Selection (if categories are available) */}
//           {categories.length > 0 && (
//             <YStack>
//               <Label color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                 Category (Optional)
//               </Label>
//               <ScrollView 
//                 horizontal 
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={{ paddingRight: 16 }}
//               >
//                 <XStack space={8}>
//                   {/* Uncategorized option */}
//                   <TouchableOpacity
//                     onPress={() => setFormData({...formData, category_id: ''})}
//                   >
//                     <Card
//                       backgroundColor={!formData.category_id ? '#22C55E20' : '#333333'}
//                       p={12}
//                       br={8}
//                       minWidth={100}
//                       borderWidth={1}
//                       borderColor={!formData.category_id ? '#22C55E' : '#444444'}
//                     >
//                       <YStack ai="center" space={4}>
//                         <Tag size={14} color={!formData.category_id ? '#22C55E' : '#666666'} />
//                         <Text 
//                           color={!formData.category_id ? '#22C55E' : 'white'} 
//                           fontSize={12} 
//                           fontWeight="700"
//                         >
//                           Auto-detect
//                         </Text>
//                         {!formData.category_id && (
//                           <View style={{ 
//                             position: 'absolute', 
//                             top: 4, 
//                             right: 4,
//                             backgroundColor: '#22C55E',
//                             width: 8,
//                             height: 8,
//                             borderRadius: 4 
//                           }} />
//                         )}
//                       </YStack>
//                     </Card>
//                   </TouchableOpacity>

//                   {/* Category cards */}
//                   {categories.slice(0, 5).map((category) => (
//                     <TouchableOpacity
//                       key={category.id}
//                       onPress={() => setFormData({...formData, category_id: category.id})}
//                     >
//                       <Card
//                         backgroundColor={formData.category_id === category.id ? '#8B5CF620' : '#333333'}
//                         p={12}
//                         br={8}
//                         minWidth={100}
//                         borderWidth={1}
//                         borderColor={formData.category_id === category.id ? '#8B5CF6' : '#444444'}
//                       >
//                         <YStack ai="center" space={4}>
//                           <Tag size={14} color={formData.category_id === category.id ? '#8B5CF6' : '#666666'} />
//                           <Text 
//                             color={formData.category_id === category.id ? '#8B5CF6' : 'white'} 
//                             fontSize={12} 
//                             fontWeight="700"
//                             numberOfLines={1}
//                           >
//                             {category.name}
//                           </Text>
//                           {formData.category_id === category.id && (
//                             <View style={{ 
//                               position: 'absolute', 
//                               top: 4, 
//                               right: 4,
//                               backgroundColor: '#8B5CF6',
//                               width: 8,
//                               height: 8,
//                               borderRadius: 4 
//                             }} />
//                           )}
//                         </YStack>
//                       </Card>
//                     </TouchableOpacity>
//                   ))}
//                 </XStack>
//               </ScrollView>
              
//               {/* View all categories button */}
//               {categories.length > 5 && (
//                 <TouchableOpacity
//                   onPress={() => {
//                     // Show all categories in a separate view or modal
//                     Alert.alert(
//                       'All Categories',
//                       categories.map(cat => `• ${cat.name}`).join('\n'),
//                       [{ text: 'OK' }]
//                     );
//                   }}
//                   style={{
//                     alignSelf: 'flex-start',
//                     marginTop: 8,
//                     paddingHorizontal: 12,
//                     paddingVertical: 6,
//                     backgroundColor: 'rgba(139, 92, 246, 0.1)',
//                     borderRadius: 6,
//                   }}
//                 >
//                   <Text color="#8B5CF6" fontSize={12} fontWeight="600">
//                     View all {categories.length} categories
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             </YStack>
//           )}

//           {/* Manual Category ID Input */}
//           <YStack>
//             <Label color="#999999" fontSize={14} fontWeight="600" mb={8}>
//               Category ID (Advanced)
//             </Label>
//             <Input
//               placeholder="Or enter category UUID manually"
//               value={formData.category_id}
//               onChangeText={(text) => setFormData({...formData, category_id: text})}
//               backgroundColor="#333333"
//               borderColor="#444444"
//               color="white"
//               placeholderTextColor="#666666"
//               fontSize={16}
//             />
//           </YStack>

//           {/* Submit Button */}
//           <TouchableOpacity
//             onPress={selectedTransaction ? handleUpdateTransaction : handleAddTransaction}
//             style={{
//               backgroundColor: '#EAB308',
//               padding: 16,
//               borderRadius: 12,
//               alignItems: 'center',
//               marginTop: 24,
//               shadowColor: '#EAB308',
//               shadowOffset: { width: 0, height: 4 },
//               shadowOpacity: 0.3,
//               shadowRadius: 8,
//               elevation: 4,
//             }}
//             disabled={reviewLoading}
//           >
//             {reviewLoading ? (
//               <Spinner size="small" color="black" />
//             ) : (
//               <XStack ai="center" space={8}>
//                 <Plus size={18} color="black" />
//                 <Text color="black" fontSize={16} fontWeight="800">
//                   {selectedTransaction ? 'Update Transaction' : 'Add Transaction'}
//                 </Text>
//               </XStack>
//             )}
//           </TouchableOpacity>
//         </YStack>
//       </View>
//     </ScrollView>
//   </View>
// </Modal>
//         {/* REVIEW TRANSACTION MODAL */}
//         <Modal
//           visible={showReviewModal}
//           animationType="slide"
//           transparent={true}
//           onRequestClose={() => {
//             setShowReviewModal(false);
//             setSelectedReviewTransaction(null);
//           }}
//         >
//           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
//             <View style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 20, maxHeight: '70%' }}>
//               <XStack jc="space-between" ai="center" mb={24}>
//                 <H4 color="white" fontWeight="800" fontSize={20}>
//                   Review Transaction
//                 </H4>
//                 <TouchableOpacity onPress={() => {
//                   setShowReviewModal(false);
//                   setSelectedReviewTransaction(null);
//                 }}>
//                   <X size={24} color="#666666" />
//                 </TouchableOpacity>
//               </XStack>

//               {selectedReviewTransaction && (
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                   <YStack space={20}>
//                     {/* Transaction Details */}
//                     <Card backgroundColor="#333333" p={16} br={12}>
//                       <YStack space={12}>
//                         <Text color="white" fontWeight="800" fontSize={16}>
//                           {selectedReviewTransaction.description || 'No description'}
//                         </Text>
                        
//                         <XStack jc="space-between">
//                           <YStack>
//                             <Text color="#666666" fontSize={12}>Amount</Text>
//                             <Text color="white" fontSize={16} fontWeight="700">
//                               {formatCurrency(Math.abs(selectedReviewTransaction.amount), selectedReviewTransaction.currency)}
//                             </Text>
//                           </YStack>
                          
//                           <YStack ai="flex-end">
//                             <Text color="#666666" fontSize={12}>Date</Text>
//                             <Text color="white" fontSize={14}>
//                               {formatDateTime(selectedReviewTransaction.occurred_at)}
//                             </Text>
//                           </YStack>
//                         </XStack>
                        
//                         <Text color="#666666" fontSize={12}>
//                           Merchant: {selectedReviewTransaction.merchant_raw || 'Unknown'}
//                         </Text>
                        
//                         {selectedReviewTransaction.category_confidence !== undefined && (
//                           <XStack ai="center" space={8}>
//                             <Tag size={16} color="#F59E0B" />
//                             <Text color="#F59E0B" fontSize={14} fontWeight="600">
//                               AI Confidence: {(selectedReviewTransaction.category_confidence * 100).toFixed(0)}%
//                             </Text>
//                           </XStack>
//                         )}
//                       </YStack>
//                     </Card>

//                     {/* Category Suggestions */}
//                     {selectedReviewTransaction.category_suggestions && 
//                      Array.isArray(selectedReviewTransaction.category_suggestions) &&
//                      selectedReviewTransaction.category_suggestions.length > 0 && (
//                       <YStack>
//                         <Text color="#999999" fontSize={14} fontWeight="600" mb={12}>
//                           Suggested Categories
//                         </Text>
                        
//                         <YStack space={8}>
//                           {selectedReviewTransaction.category_suggestions.map((suggestion, index) => {
//                             const category = suggestion.category || suggestion;
//                             const categoryId = category.id || category;
//                             const categoryName = getCategoryName(categoryId);
//                             const confidence = suggestion.confidence || suggestion.category_confidence || 0;
                            
//                             return (
//                               <TouchableOpacity
//                                 key={index}
//                                 onPress={() => handleConfirmCategory(selectedReviewTransaction.id, categoryId)}
//                                 style={{
//                                   backgroundColor: '#333333',
//                                   padding: 16,
//                                   borderRadius: 8,
//                                   flexDirection: 'row',
//                                   justifyContent: 'space-between',
//                                   alignItems: 'center',
//                                   borderWidth: 1,
//                                   borderColor: '#444444',
//                                 }}
//                                 disabled={reviewLoading}
//                               >
//                                 <YStack flex={1}>
//                                   <Text color="white" fontSize={14} fontWeight="600">
//                                     {categoryName}
//                                   </Text>
//                                   {confidence > 0 && (
//                                     <Text color="#F59E0B" fontSize={12} mt={2}>
//                                       {(confidence * 100).toFixed(0)}% confidence
//                                     </Text>
//                                   )}
//                                 </YStack>
//                                 <ChevronRight size={16} color="#666666" />
//                               </TouchableOpacity>
//                             );
//                           })}
//                         </YStack>
//                       </YStack>
//                     )}

//                     {/* Manual Category Input */}
//                     <YStack>
//                       <Label htmlFor="manualCategory" color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                         Or Enter Category ID
//                       </Label>
//                       <Input
//                         id="manualCategory"
//                         placeholder="Enter category UUID"
//                         value={manualCategoryId}
//                         onChangeText={setManualCategoryId}
//                         backgroundColor="#333333"
//                         borderColor="#444444"
//                         color="white"
//                         placeholderTextColor="#666666"
//                         fontSize={16}
//                       />
                      
//                       {manualCategoryId.trim() && (
//                         <TouchableOpacity
//                           onPress={handleConfirmManualCategory}
//                           style={{
//                             backgroundColor: '#22C55E',
//                             padding: 12,
//                             borderRadius: 8,
//                             alignItems: 'center',
//                             marginTop: 12,
//                           }}
//                           disabled={reviewLoading}
//                         >
//                           {reviewLoading ? (
//                             <Spinner size="small" color="white" />
//                           ) : (
//                             <Text color="white" fontSize={14} fontWeight="600">
//                               Confirm with this Category ID
//                             </Text>
//                           )}
//                         </TouchableOpacity>
//                       )}
//                     </YStack>

//                     {/* Info Message */}
//                     <Card backgroundColor="#1E3A8A" p={12} br={8}>
//                       <XStack ai="center" space={8}>
//                         <AlertTriangle size={16} color="#60A5FA" />
//                         <YStack flex={1}>
//                           <Text color="#60A5FA" fontSize={12} fontWeight="600">
//                             Why is this needed?
//                           </Text>
//                           <Text color="#93C5FD" fontSize={11} mt={2}>
//                             The AI isn't sure about the category. Your confirmation helps the system learn and get better next time.
//                           </Text>
//                         </YStack>
//                       </XStack>
//                     </Card>
//                   </YStack>
//                 </ScrollView>
//               )}
//             </View>
//           </View>
//         </Modal>

//         {/* FILTER SHEET */}
//         <Sheet
//           modal
//           open={showFilterSheet}
//           onOpenChange={setShowFilterSheet}
//           snapPoints={[40]}
//           dismissOnSnapToBottom
//           animation="medium"
//         >
//           <Sheet.Overlay />
//           <Sheet.Frame backgroundColor="#1A1A1A" borderTopLeftRadius={20} borderTopRightRadius={20}>
//             <Sheet.Handle backgroundColor="#444444" />
//             <YStack p={24}>
//               <H4 color="white" fontWeight="800" mb={24}>Filter Transactions</H4>
              
//               <YStack space={20}>
//                 {/* Start Date */}
//                 <YStack>
//                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                     Start Date
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() => setShowDatePicker('start')}
//                     style={{
//                       backgroundColor: '#333333',
//                       borderWidth: 1,
//                       borderColor: '#444444',
//                       borderRadius: 8,
//                       padding: 12,
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between'
//                     }}
//                   >
//                     <Text color="white" fontSize={14}>
//                       {startDate ? formatDate(startDate.toISOString()) : 'Select start date'}
//                     </Text>
//                     <Calendar size={16} color="#666666" />
//                   </TouchableOpacity>
//                 </YStack>

//                 {/* End Date */}
//                 <YStack>
//                   <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                     End Date
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() => setShowDatePicker('end')}
//                     style={{
//                       backgroundColor: '#333333',
//                       borderWidth: 1,
//                       borderColor: '#444444',
//                       borderRadius: 8,
//                       padding: 12,
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between'
//                     }}
//                   >
//                     <Text color="white" fontSize={14}>
//                       {endDate ? formatDate(endDate.toISOString()) : 'Select end date'}
//                     </Text>
//                     <Calendar size={16} color="#666666" />
//                   </TouchableOpacity>
//                 </YStack>

//                 <XStack space={12}>
//                   <TouchableOpacity
//                     onPress={resetFilters}
//                     style={{
//                       flex: 1,
//                       backgroundColor: '#333333',
//                       padding: 16,
//                       borderRadius: 12,
//                       alignItems: 'center',
//                       borderWidth: 1,
//                       borderColor: '#444444'
//                     }}
//                   >
//                     <Text color="white" fontSize={14} fontWeight="600">
//                       Reset
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => {
//                       setShowFilterSheet(false);
//                       fetchTransactions(startDate, endDate);
//                     }}
//                     style={{
//                       flex: 1,
//                       backgroundColor: '#EAB308',
//                       padding: 16,
//                       borderRadius: 12,
//                       alignItems: 'center'
//                     }}
//                   >
//                     <Text color="black" fontSize={14} fontWeight="600">
//                       Apply Filters
//                     </Text>
//                   </TouchableOpacity>
//                 </XStack>
//               </YStack>
//             </YStack>
//           </Sheet.Frame>
//         </Sheet>

//         {/* DATE PICKER */}
//         {showDatePicker && (
//           <DateTimePicker
//             value={showDatePicker === 'start' && startDate ? startDate : 
//                    showDatePicker === 'end' && endDate ? endDate : new Date()}
//             mode="date"
//             display="default"
//             onChange={onDateChange}
//             maximumDate={new Date()}
//           />
//         )}
//       </SafeAreaView>
//     </Theme>
//   );
// }



import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  View
} from 'react-native';
import {
  YStack,
  XStack,
  Text,
  H2,
  H4,
  Theme,
  Spinner,
  Input,
  Card,
  Sheet,
  Select,
  Adapt,
  Label
} from 'tamagui';
import {
  ArrowLeft,
  Plus,
  Search,
  Store,
  DollarSign,
  Edit3,
  Trash2,
  X,
  Calendar,
  Filter,
  ChevronDown,
  Check,
  Tag,
  AlertTriangle,
  CheckCircle,
  List,
  Eye,
  EyeOff,
  ChevronRight
} from '@tamagui/lucide-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

// Services
import { ApiService } from '../../../services/apiService';

// Currency options (common currencies)
const CURRENCY_OPTIONS = [
  { value: 'INR', label: 'Indian Rupee (₹)' },
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
  { value: 'JPY', label: 'Japanese Yen (¥)' },
  { value: 'CAD', label: 'Canadian Dollar (C$)' },
  { value: 'AUD', label: 'Australian Dollar (A$)' },
  { value: 'SGD', label: 'Singapore Dollar (S$)' },
  { value: 'AED', label: 'UAE Dirham (د.إ)' },
];

// Source options from txn_source_enum
const SOURCE_OPTIONS = [
  { value: 'manual', label: 'Manual Entry' },
  { value: 'voice', label: 'Voice Input' },
  { value: 'chatbot', label: 'Chatbot' },
  { value: 'csv', label: 'CSV Import' },
  { value: 'notification', label: 'Notification' },
  { value: 'wallet', label: 'Wallet Sync' },
  { value: 'blockchain', label: 'Blockchain' },
];

export default function Transactions() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State
  const [transactions, setTransactions] = useState([]);
  const [transactionsNeedingReview, setTransactionsNeedingReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedReviewTransaction, setSelectedReviewTransaction] = useState(null);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'review'
  const [reviewLoading, setReviewLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [manualCategoryId, setManualCategoryId] = useState('');
  const [showAllCategoriesModal, setShowAllCategoriesModal] = useState(false);
  
  // Filter states
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  // Form state with proper defaults based on enums
  const [formData, setFormData] = useState({
    amount: '',
    merchant_raw: '',
    description: '',
    currency: 'INR',
    occurred_at: new Date().toISOString(),
    category_id: '',
    source: 'manual'
  });

  // Fetch categories from API
  const fetchCategories = useCallback(async () => {
    try {
      const response = await ApiService.get('/categories/categories/');
      console.log('Categories fetched:', response.data);
      setCategories(response.data || []);
    } catch (error) {
      console.log('Could not fetch categories:', error.message);
      Alert.alert('Error', 'Failed to load categories');
    }
  }, []);

  // Fetch transactions with optional date filters
  const fetchTransactions = useCallback(async (start = null, end = null) => {
    try {
      setLoading(true);
      const params = {};
      
      if (start) {
        params.start_date = start.toISOString().split('T')[0];
      }
      if (end) {
        params.end_date = end.toISOString().split('T')[0];
      }
      
      const response = await ApiService.get('/transactions/', { params });
      setTransactions(response.data || []);
      
      // Also fetch transactions needing review
      try {
        const reviewResponse = await ApiService.get('/transactions/review');
        setTransactionsNeedingReview(reviewResponse.data || []);
      } catch (reviewError) {
        console.log('Could not fetch review transactions:', reviewError.message);
      }
    } catch (error) {
      console.error('Fetch transactions error:', error);
      Alert.alert('Error', 'Failed to load transactions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTransactions(startDate, endDate);
      fetchCategories();
    }, [fetchTransactions, fetchCategories, startDate, endDate])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTransactions(startDate, endDate);
    fetchCategories();
  }, [fetchTransactions, fetchCategories, startDate, endDate]);

  // Reset form
  const resetForm = () => {
    setFormData({
      amount: '',
      merchant_raw: '',
      description: '',
      currency: 'INR',
      occurred_at: new Date().toISOString(),
      category_id: '',
      source: 'manual'
    });
    setManualCategoryId('');
    setSelectedTransaction(null);
  };

  // Reset filters
  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchQuery('');
  };

  // Create transaction
  const handleAddTransaction = async () => {
    try {
      // Basic validation
      if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
        Alert.alert('Error', 'Please enter a valid amount');
        return;
      }
      
      if (!formData.merchant_raw?.trim()) {
        Alert.alert('Error', 'Please enter merchant/store name');
        return;
      }
      
      if (!formData.description?.trim()) {
        Alert.alert('Error', 'Please enter a description');
        return;
      }

      const transactionData = {
        amount: parseFloat(formData.amount),
        merchant_raw: formData.merchant_raw.trim(),
        description: formData.description.trim(),
        currency: formData.currency,
        occurred_at: formData.occurred_at,
        source: formData.source,
        category_id: formData.category_id || undefined
      };

      const response = await ApiService.post('/transactions/', transactionData);
      
      // Check if transaction needs review
      if (response.data?.needs_category_review) {
        // Show review modal immediately
        setSelectedReviewTransaction(response.data);
        setShowReviewModal(true);
      }
      
      setShowAddModal(false);
      resetForm();
      fetchTransactions(startDate, endDate);
      
      if (!response.data?.needs_category_review) {
        Alert.alert('Success', 'Transaction added successfully');
      }
      
    } catch (error) {
      console.error('Add transaction error:', error);
      
      if (error.response?.status === 422 && error.response?.data?.detail) {
        const validationErrors = error.response.data.detail;
        const errorMessages = validationErrors.map(err => 
          `${err.loc?.join('.') || 'Field'}: ${err.msg}`
        ).join('\n\n');
        
        Alert.alert('Validation Error', errorMessages);
      } else {
        Alert.alert('Error', error.message || 'Failed to add transaction');
      }
    }
  };

  // Update transaction
  const handleUpdateTransaction = async () => {
    try {
      if (!selectedTransaction) return;
      
      // Same validation as add
      if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
        Alert.alert('Error', 'Please enter a valid amount');
        return;
      }
      
      if (!formData.merchant_raw?.trim()) {
        Alert.alert('Error', 'Please enter merchant/store name');
        return;
      }
      
      if (!formData.description?.trim()) {
        Alert.alert('Error', 'Please enter a description');
        return;
      }

      const transactionData = {
        amount: parseFloat(formData.amount),
        merchant_raw: formData.merchant_raw.trim(),
        description: formData.description.trim(),
        currency: formData.currency,
        occurred_at: formData.occurred_at,
        source: formData.source,
        category_id: formData.category_id || undefined
      };

      const response = await ApiService.patch(`/transactions/${selectedTransaction.id}`, transactionData);
      
      setShowAddModal(false);
      resetForm();
      fetchTransactions(startDate, endDate);
      Alert.alert('Success', 'Transaction updated successfully');
      
    } catch (error) {
      console.error('Update transaction error:', error);
      
      if (error.response?.status === 422 && error.response?.data?.detail) {
        const validationErrors = error.response.data.detail;
        const errorMessages = validationErrors.map(err => 
          `${err.loc?.join('.') || 'Field'}: ${err.msg}`
        ).join('\n\n');
        
        Alert.alert('Validation Error', errorMessages);
      } else {
        Alert.alert('Error', error.message || 'Failed to update transaction');
      }
    }
  };

  // Delete transaction
  const handleDeleteTransaction = async (id) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              // Since we only have PATCH endpoint, we can update to mark as deleted
              await ApiService.patch(`/api/v1/transactions/${id}`, {
                description: `[DELETED] ${formData.description || ''}`,
                source: 'manual'
              });
              fetchTransactions(startDate, endDate);
              Alert.alert('Success', 'Transaction marked as deleted');
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Failed to delete transaction');
            }
          }
        }
      ]
    );
  };

  // Confirm transaction category
  const handleConfirmCategory = async (txnId, categoryId) => {
    try {
      setReviewLoading(true);
      
      if (!categoryId || !txnId) {
        Alert.alert('Error', 'Category ID is required');
        return;
      }

      const response = await ApiService.patch(`/transactions/${txnId}/category?category_id=${categoryId}`);
      
      // Refresh both lists
      fetchTransactions(startDate, endDate);
      setShowReviewModal(false);
      setSelectedReviewTransaction(null);
      setManualCategoryId('');
      
      Alert.alert('Success', 'Category confirmed successfully');
      
    } catch (error) {
      console.error('Confirm category error:', error);
      Alert.alert('Error', 'Failed to confirm category');
    } finally {
      setReviewLoading(false);
    }
  };

  // Confirm manual category input
  const handleConfirmManualCategory = async () => {
    if (!selectedReviewTransaction || !manualCategoryId.trim()) {
      Alert.alert('Error', 'Please enter a valid category ID');
      return;
    }
    
    await handleConfirmCategory(selectedReviewTransaction.id, manualCategoryId.trim());
  };

  // Open edit modal
  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setFormData({
      amount: Math.abs(transaction.amount)?.toString() || '',
      merchant_raw: transaction.merchant_raw || '',
      description: transaction.description || '',
      currency: transaction.currency || 'INR',
      occurred_at: transaction.occurred_at || new Date().toISOString(),
      category_id: transaction.category_id || '',
      source: transaction.source || 'manual'
    });
    setShowAddModal(true);
  };

  // Open review modal
  const openReviewModal = (transaction) => {
    setSelectedReviewTransaction(transaction);
    setManualCategoryId('');
    setShowReviewModal(true);
  };

  // Handle date picker change
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(null);
    if (selectedDate) {
      if (showDatePicker === 'start') {
        setStartDate(selectedDate);
      } else if (showDatePicker === 'end') {
        setEndDate(selectedDate);
      }
    }
  };

  // Filter transactions based on search and date range
  const getFilteredTransactions = () => {
    const transactionList = activeTab === 'review' ? transactionsNeedingReview : transactions;
    
    return transactionList
      .filter(txn => txn)
      .filter(txn => {
        const matchesSearch = !searchQuery || 
          txn.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          txn.merchant_raw?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          txn.source?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const transactionDate = txn.occurred_at ? new Date(txn.occurred_at) : null;
        const matchesStartDate = !startDate || (transactionDate && transactionDate >= startDate);
        const matchesEndDate = !endDate || (transactionDate && transactionDate <= endDate);
        
        return matchesSearch && matchesStartDate && matchesEndDate;
      })
      .sort((a, b) => new Date(b.occurred_at) - new Date(a.occurred_at));
  };

  const formatCurrency = (amount, currency = 'INR') => {
    try {
      return new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount || 0);
    } catch (e) {
      return `${currency} ${amount || 0}`;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get source display label
  const getSourceLabel = (sourceValue) => {
    const source = SOURCE_OPTIONS.find(s => s.value === sourceValue);
    return source ? source.label : sourceValue;
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    if (!categoryId) return 'Auto-detect';
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  // Get category color by ID
  const getCategoryColor = (categoryId) => {
    if (!categoryId) return '#6B7280'; // Gray for auto-detect
    const category = categories.find(c => c.id === categoryId);
    return category?.color || '#8B5CF6'; // Default purple
  };

  // Get filter summary text
  const getFilterSummary = () => {
    if (!startDate && !endDate) return 'All time';
    if (startDate && endDate) {
      return `${formatDate(startDate.toISOString())} - ${formatDate(endDate.toISOString())}`;
    }
    if (startDate) return `From ${formatDate(startDate.toISOString())}`;
    if (endDate) return `Until ${formatDate(endDate.toISOString())}`;
    return 'All time';
  };

  // Render category card
  const renderCategoryCard = (category) => {
    const isSelected = formData.category_id === category.id;
    const isSystemCategory = category.is_system;
    
    return (
      <TouchableOpacity
        key={category.id}
        onPress={() => setFormData({...formData, category_id: category.id})}
        style={{ marginRight: 8 }}
      >
        <Card
          backgroundColor={isSelected ? `${getCategoryColor(category.id)}20` : '#333333'}
          p={12}
          br={8}
          minWidth={100}
          borderWidth={1}
          borderColor={isSelected ? getCategoryColor(category.id) : '#444444'}
        >
          <YStack ai="center" space={4}>
            {category.icon ? (
              <Text color={isSelected ? getCategoryColor(category.id) : '#666666'} fontSize={14}>
                {category.icon}
              </Text>
            ) : (
              <Tag size={14} color={isSelected ? getCategoryColor(category.id) : '#666666'} />
            )}
            <Text 
              color={isSelected ? getCategoryColor(category.id) : 'white'} 
              fontSize={12} 
              fontWeight="700"
              numberOfLines={1}
              textAlign="center"
            >
              {category.name}
            </Text>
            {isSystemCategory && (
              <Text color={isSelected ? getCategoryColor(category.id) : '#666666'} fontSize={9}>
                System
              </Text>
            )}
            {isSelected && (
              <View style={{ 
                position: 'absolute', 
                top: 4, 
                right: 4,
                backgroundColor: getCategoryColor(category.id),
                width: 8,
                height: 8,
                borderRadius: 4 
              }} />
            )}
          </YStack>
        </Card>
      </TouchableOpacity>
    );
  };

  // Render all categories modal
  const renderAllCategoriesModal = () => (
    <Modal
      visible={showAllCategoriesModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowAllCategoriesModal(false)}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
        <View style={{ 
          backgroundColor: '#1A1A1A', 
          borderTopLeftRadius: 24, 
          borderTopRightRadius: 24, 
          padding: 24,
          maxHeight: '80%'
        }}>
          <XStack jc="space-between" ai="center" mb={24}>
            <H4 color="white" fontWeight="800" fontSize={20}>
              Select Category
            </H4>
            <TouchableOpacity onPress={() => setShowAllCategoriesModal(false)}>
              <X size={24} color="#666666" />
            </TouchableOpacity>
          </XStack>

          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setFormData({...formData, category_id: item.id});
                  setShowAllCategoriesModal(false);
                }}
              >
                <Card
                  backgroundColor={formData.category_id === item.id ? `${getCategoryColor(item.id)}20` : '#2A2A2A'}
                  mb={8}
                  p={16}
                  br={8}
                  borderWidth={1}
                  borderColor={formData.category_id === item.id ? getCategoryColor(item.id) : '#3A3A3A'}
                >
                  <XStack ai="center" space={12}>
                    {item.icon ? (
                      <View style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: `${getCategoryColor(item.id)}20`,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Text color={getCategoryColor(item.id)} fontSize={16}>
                          {item.icon}
                        </Text>
                      </View>
                    ) : (
                      <View style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: `${getCategoryColor(item.id)}20`,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Tag size={18} color={getCategoryColor(item.id)} />
                      </View>
                    )}
                    
                    <YStack flex={1}>
                      <Text color="white" fontSize={14} fontWeight="700">
                        {item.name}
                      </Text>
                      {item.parent_id && (
                        <Text color="#666666" fontSize={12}>
                          Parent: {getCategoryName(item.parent_id)}
                        </Text>
                      )}
                    </YStack>
                    
                    {formData.category_id === item.id && (
                      <Check size={20} color={getCategoryColor(item.id)} />
                    )}
                  </XStack>
                </Card>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <YStack ai="center" py={40}>
                <Tag size={48} color="#666666" />
                <Text color="#666666" fontSize={16} mt={16}>
                  No categories found
                </Text>
              </YStack>
            }
          />

          {/* Auto-detect option */}
          <TouchableOpacity
            onPress={() => {
              setFormData({...formData, category_id: ''});
              setShowAllCategoriesModal(false);
            }}
            style={{ marginTop: 16 }}
          >
            <Card
              backgroundColor={!formData.category_id ? '#22C55E20' : '#2A2A2A'}
              p={16}
              br={8}
              borderWidth={1}
              borderColor={!formData.category_id ? '#22C55E' : '#3A3A3A'}
            >
              <XStack ai="center" space={12}>
                <View style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#22C55E20',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Tag size={18} color="#22C55E" />
                </View>
                
                <YStack flex={1}>
                  <Text color={!formData.category_id ? '#22C55E' : 'white'} fontSize={14} fontWeight="700">
                    Auto-detect Category
                  </Text>
                  <Text color="#666666" fontSize={12}>
                    Let AI automatically categorize this transaction
                  </Text>
                </YStack>
                
                {!formData.category_id && (
                  <Check size={20} color="#22C55E" />
                )}
              </XStack>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Render transaction item
  const renderTransactionItem = ({ item }) => {
    if (!item) return null;
    
    const isExpense = item.amount < 0;
    const amount = Math.abs(item.amount || 0);
    const needsReview = item.needs_category_review || activeTab === 'review';
    const categoryColor = getCategoryColor(item.category_id);
    
    return (
      <TouchableOpacity 
        onPress={() => needsReview ? openReviewModal(item) : openEditModal(item)}
        activeOpacity={0.8}
      >
        <Card 
          backgroundColor="#1A1A1A" 
          mb={12} 
          p={16} 
          borderRadius={12}
          borderLeftWidth={needsReview ? 4 : 0}
          borderLeftColor={needsReview ? "#EF4444" : "transparent"}
        >
          <XStack jc="space-between" ai="flex-start">
            <YStack flex={1}>
              <XStack ai="center" space={8} mb={4}>
                <Text color="white" fontWeight="800" fontSize={16} numberOfLines={1} flex={1}>
                  {item.description || 'No description'}
                </Text>
                {needsReview && (
                  <AlertTriangle size={14} color="#EF4444" />
                )}
              </XStack>
              
              <XStack ai="center" space={12} mt={4} flexWrap="wrap">
                {item.merchant_raw && (
                  <XStack ai="center" space={4}>
                    <Store size={12} color="#666666" />
                    <Text color="#666666" fontSize={12}>
                      {item.merchant_raw}
                    </Text>
                  </XStack>
                )}
                
                <Text color="#666666" fontSize={11}>
                  {formatDateTime(item.occurred_at)}
                </Text>
                
                {item.source && (
                  <Text color="#666666" fontSize={11}>
                    • {getSourceLabel(item.source)}
                  </Text>
                )}
              </XStack>
              
              {item.category_id && (
                <XStack ai="center" space={4} mt={6}>
                  <View style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: categoryColor
                  }} />
                  <Text color={categoryColor} fontSize={11} fontWeight="600">
                    {getCategoryName(item.category_id)}
                  </Text>
                </XStack>
              )}
              
              {needsReview && item.category_confidence !== undefined && (
                <XStack ai="center" space={4} mt={6}>
                  <Tag size={12} color="#F59E0B" />
                  <Text color="#F59E0B" fontSize={11} fontWeight="600">
                    Confidence: {(item.category_confidence * 100).toFixed(0)}%
                  </Text>
                </XStack>
              )}
            </YStack>
            
            <XStack ai="center" space={12}>
              <Text 
                color={isExpense ? "#EF4444" : "#22C55E"} 
                fontWeight="800" 
                fontSize={16}
              >
                {isExpense ? '-' : '+'}{formatCurrency(amount, item.currency)}
              </Text>
              
              {activeTab === 'all' && (
                <TouchableOpacity 
                  onPress={(e) => {
                    e.stopPropagation();
                    handleDeleteTransaction(item.id);
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              )}
            </XStack>
          </XStack>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading && !transactions.length) {
    return (
      <Theme name="dark">
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner size="large" color="#EAB308" />
            <Text color="white" mt={16}>Loading transactions...</Text>
          </View>
        </SafeAreaView>
      </Theme>
    );
  }

  return (
    <Theme name="dark">
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        {/* HEADER */}
        <XStack p={20} ai="center" space={16}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#EAB308" />
          </TouchableOpacity>
          
          <YStack flex={1}>
            <H2 color="#EAB308" fontWeight="900" fontSize={28}>
              Transactions
            </H2>
            <Text color="#666666" fontSize={14}>
              {getFilterSummary()}
            </Text>
          </YStack>
          
          <TouchableOpacity 
            onPress={() => setShowFilterSheet(true)}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#1A1A1A',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#444444',
              marginRight: 12
            }}
          >
            <Filter size={20} color="#EAB308" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setShowAddModal(true)}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#1A1A1A',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#EAB308',
            }}
          >
            <Plus size={20} color="#EAB308" />
          </TouchableOpacity>
        </XStack>

        {/* TABS */}
        <XStack p={20} pb={0} space={12}>
          <TouchableOpacity
            onPress={() => setActiveTab('all')}
            style={{
              flex: 1,
              backgroundColor: activeTab === 'all' ? '#EAB30820' : '#1A1A1A',
              paddingVertical: 10,
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: activeTab === 'all' ? '#EAB308' : '#333333',
            }}
          >
            <XStack ai="center" space={6}>
              <List size={14} color={activeTab === 'all' ? '#EAB308' : '#666666'} />
              <Text 
                color={activeTab === 'all' ? '#EAB308' : '#666666'} 
                fontSize={14} 
                fontWeight="700"
              >
                All
              </Text>
              <View style={{
                backgroundColor: activeTab === 'all' ? '#EAB308' : '#333333',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
                marginLeft: 4,
              }}>
                <Text color="white" fontSize={10} fontWeight="700">
                  {transactions.length}
                </Text>
              </View>
            </XStack>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setActiveTab('review')}
            style={{
              flex: 1,
              backgroundColor: activeTab === 'review' ? '#EF444420' : '#1A1A1A',
              paddingVertical: 10,
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: activeTab === 'review' ? '#EF4444' : '#333333',
            }}
          >
            <XStack ai="center" space={6}>
              <AlertTriangle size={14} color={activeTab === 'review' ? '#EF4444' : '#666666'} />
              <Text 
                color={activeTab === 'review' ? '#EF4444' : '#666666'} 
                fontSize={14} 
                fontWeight="700"
              >
                Review
              </Text>
              <View style={{
                backgroundColor: activeTab === 'review' ? '#EF4444' : '#333333',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
                marginLeft: 4,
              }}>
                <Text color="white" fontSize={10} fontWeight="700">
                  {transactionsNeedingReview.length}
                </Text>
              </View>
            </XStack>
          </TouchableOpacity>
        </XStack>

        {/* SEARCH */}
        <XStack p={20} pb={12}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 12 }}>
            <Search size={16} color="#666666" />
            <Input
              placeholder={`Search ${activeTab === 'review' ? 'review' : ''} transactions...`}
              value={searchQuery}
              onChangeText={setSearchQuery}
              backgroundColor="transparent"
              borderWidth={0}
              color="white"
              placeholderTextColor="#666666"
              fontSize={14}
              flex={1}
            />
          </View>
        </XStack>

        {/* TRANSACTIONS LIST */}
        <FlatList
          data={getFilteredTransactions()}
          keyExtractor={(item, index) => item?.id || index.toString()}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <YStack ai="center" py={48}>
              {activeTab === 'review' ? (
                <>
                  <CheckCircle size={64} color="#333333" />
                  <Text color="#666666" fontSize={16} mt={16}>
                    No transactions need review
                  </Text>
                  <Text color="#444444" fontSize={14} mt={8}>
                    All transactions are categorized
                  </Text>
                </>
              ) : (
                <>
                  <DollarSign size={64} color="#333333" />
                  <Text color="#666666" fontSize={16} mt={16}>
                    No transactions found
                  </Text>
                  <Text color="#444444" fontSize={14} mt={8} mb={16}>
                    {startDate || endDate ? 'Try changing your filters' : 'Add your first transaction'}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setShowAddModal(true)}
                    style={{
                      backgroundColor: '#EAB308',
                      paddingHorizontal: 24,
                      paddingVertical: 12,
                      borderRadius: 12,
                    }}
                  >
                    <Text color="black" fontSize={14} fontWeight="700">Add Transaction</Text>
                  </TouchableOpacity>
                </>
              )}
            </YStack>
          }
          renderItem={renderTransactionItem}
        />

        {/* ADD/EDIT TRANSACTION MODAL */}
        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
            <ScrollView style={{ maxHeight: '80%' }}>
              <View style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 20 }}>
                <XStack jc="space-between" ai="center" mb={24}>
                  <H4 color="white" fontWeight="800" fontSize={20}>
                    {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
                  </H4>
                  <TouchableOpacity onPress={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}>
                    <X size={24} color="#666666" />
                  </TouchableOpacity>
                </XStack>

                <YStack space={16}>
                  {/* Amount */}
                  <YStack>
                    <Label color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Amount
                    </Label>
                    <Input
                      placeholder="0.00"
                      value={formData.amount}
                      onChangeText={(text) => setFormData({...formData, amount: text})}
                      backgroundColor="#333333"
                      borderColor="#444444"
                      color="white"
                      placeholderTextColor="#666666"
                      keyboardType="decimal-pad"
                      fontSize={16}
                    />
                  </YStack>

                  {/* Merchant/Store */}
                  <YStack>
                    <Label color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Merchant/Store
                    </Label>
                    <Input
                      placeholder="Where did this happen?"
                      value={formData.merchant_raw}
                      onChangeText={(text) => setFormData({...formData, merchant_raw: text})}
                      backgroundColor="#333333"
                      borderColor="#444444"
                      color="white"
                      placeholderTextColor="#666666"
                      fontSize={16}
                    />
                  </YStack>

                  {/* Description */}
                  <YStack>
                    <Label color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Description
                    </Label>
                    <Input
                      placeholder="What was this for?"
                      value={formData.description}
                      onChangeText={(text) => setFormData({...formData, description: text})}
                      backgroundColor="#333333"
                      borderColor="#444444"
                      color="white"
                      placeholderTextColor="#666666"
                      fontSize={16}
                      multiline
                      minHeight={60}
                    />
                  </YStack>

                  {/* Date */}
                  <YStack>
                    <Label color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Date & Time
                    </Label>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker('transaction')}
                      style={{
                        backgroundColor: '#333333',
                        borderWidth: 1,
                        borderColor: '#444444',
                        borderRadius: 8,
                        padding: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Text color="white" fontSize={14}>
                        {new Date(formData.occurred_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Text>
                      <Calendar size={16} color="#666666" />
                    </TouchableOpacity>
                  </YStack>

                  {/* CURRENCY SELECTION */}
                  <YStack>
                    <Label color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Currency
                    </Label>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ paddingRight: 16 }}
                    >
                      <XStack space={8}>
                        {CURRENCY_OPTIONS.map((currency) => (
                          <TouchableOpacity
                            key={currency.value}
                            onPress={() => setFormData({...formData, currency: currency.value})}
                          >
                            <Card
                              backgroundColor={formData.currency === currency.value ? '#EAB30820' : '#333333'}
                              p={12}
                              br={8}
                              minWidth={90}
                              borderWidth={1}
                              borderColor={formData.currency === currency.value ? '#EAB308' : '#444444'}
                            >
                              <YStack ai="center" space={4}>
                                <Text 
                                  color={formData.currency === currency.value ? '#EAB308' : 'white'} 
                                  fontSize={12} 
                                  fontWeight="700"
                                >
                                  {currency.value}
                                </Text>
                                <Text 
                                  color={formData.currency === currency.value ? 'rgba(234, 179, 8, 0.8)' : '#666666'} 
                                  fontSize={10}
                                  numberOfLines={1}
                                >
                                  {currency.label.split('(')[0].trim()}
                                </Text>
                                {formData.currency === currency.value && (
                                  <View style={{ 
                                    position: 'absolute', 
                                    top: 4, 
                                    right: 4,
                                    backgroundColor: '#EAB308',
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4 
                                  }} />
                                )}
                              </YStack>
                            </Card>
                          </TouchableOpacity>
                        ))}
                      </XStack>
                    </ScrollView>
                  </YStack>

                  {/* SOURCE SELECTION */}
                  <YStack>
                    <Label color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Source
                    </Label>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ paddingRight: 16 }}
                    >
                      <XStack space={8}>
                        {SOURCE_OPTIONS.map((source) => (
                          <TouchableOpacity
                            key={source.value}
                            onPress={() => setFormData({...formData, source: source.value})}
                          >
                            <Card
                              backgroundColor={formData.source === source.value ? '#3B82F620' : '#333333'}
                              p={12}
                              br={8}
                              minWidth={100}
                              borderWidth={1}
                              borderColor={formData.source === source.value ? '#3B82F6' : '#444444'}
                            >
                              <YStack ai="center" space={4}>
                                <Text 
                                  color={formData.source === source.value ? '#3B82F6' : 'white'} 
                                  fontSize={12} 
                                  fontWeight="700"
                                  textAlign="center"
                                >
                                  {source.label}
                                </Text>
                                {formData.source === source.value && (
                                  <View style={{ 
                                    position: 'absolute', 
                                    top: 4, 
                                    right: 4,
                                    backgroundColor: '#3B82F6',
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4 
                                  }} />
                                )}
                              </YStack>
                            </Card>
                          </TouchableOpacity>
                        ))}
                      </XStack>
                    </ScrollView>
                  </YStack>

                  {/* CATEGORY SELECTION */}
                  <YStack>
                    <Label color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Category
                    </Label>
                    
                    {/* Auto-detect option */}
                    <TouchableOpacity
                      onPress={() => setFormData({...formData, category_id: ''})}
                      style={{ marginBottom: 12 }}
                    >
                      <Card
                        backgroundColor={!formData.category_id ? '#22C55E20' : '#333333'}
                        p={12}
                        br={8}
                        borderWidth={1}
                        borderColor={!formData.category_id ? '#22C55E' : '#444444'}
                      >
                        <XStack ai="center" space={8}>
                          <Tag size={16} color={!formData.category_id ? '#22C55E' : '#666666'} />
                          <Text 
                            color={!formData.category_id ? '#22C55E' : 'white'} 
                            fontSize={14} 
                            fontWeight="600"
                          >
                            Auto-detect Category
                          </Text>
                          {!formData.category_id && (
                            <View style={{ marginLeft: 'auto' }}>
                              <Check size={16} color="#22C55E" />
                            </View>
                          )}
                        </XStack>
                        <Text color="#666666" fontSize={12} mt={4}>
                          Let AI automatically categorize this transaction
                        </Text>
                      </Card>
                    </TouchableOpacity>

                    {/* Popular Categories */}
                    {categories.length > 0 && (
                      <>
                        <Text color="#999999" fontSize={12} fontWeight="600" mb={8}>
                          Popular Categories
                        </Text>
                        <ScrollView 
                          horizontal 
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{ paddingRight: 16 }}
                        >
                          <XStack space={8}>
                            {categories.slice(0, 5).map(renderCategoryCard)}
                          </XStack>
                        </ScrollView>
                        
                        {/* View all categories button */}
                        {categories.length > 5 && (
                          <TouchableOpacity
                            onPress={() => setShowAllCategoriesModal(true)}
                            style={{
                              alignSelf: 'flex-start',
                              marginTop: 12,
                              paddingHorizontal: 16,
                              paddingVertical: 8,
                              backgroundColor: 'rgba(139, 92, 246, 0.1)',
                              borderRadius: 8,
                            }}
                          >
                            <XStack ai="center" space={6}>
                              <Tag size={14} color="#8B5CF6" />
                              <Text color="#8B5CF6" fontSize={13} fontWeight="600">
                                View all {categories.length} categories
                              </Text>
                            </XStack>
                          </TouchableOpacity>
                        )}
                      </>
                    )}

                    {/* Current selection info */}
                    {formData.category_id && (
                      <Card backgroundColor="#2A2A2A" p={12} mt={8} br={8}>
                        <XStack ai="center" space={8}>
                          <View style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: getCategoryColor(formData.category_id)
                          }} />
                          <Text color="white" fontSize={12} fontWeight="600">
                            Selected: {getCategoryName(formData.category_id)}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setFormData({...formData, category_id: ''})}
                            style={{ marginLeft: 'auto' }}
                          >
                            <X size={14} color="#666666" />
                          </TouchableOpacity>
                        </XStack>
                      </Card>
                    )}
                  </YStack>

                  {/* Submit Button */}
                  <TouchableOpacity
                    onPress={selectedTransaction ? handleUpdateTransaction : handleAddTransaction}
                    style={{
                      backgroundColor: '#EAB308',
                      padding: 16,
                      borderRadius: 12,
                      alignItems: 'center',
                      marginTop: 24,
                      shadowColor: '#EAB308',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 4,
                    }}
                    disabled={reviewLoading}
                  >
                    {reviewLoading ? (
                      <Spinner size="small" color="black" />
                    ) : (
                      <XStack ai="center" space={8}>
                        <Plus size={18} color="black" />
                        <Text color="black" fontSize={16} fontWeight="800">
                          {selectedTransaction ? 'Update Transaction' : 'Add Transaction'}
                        </Text>
                      </XStack>
                    )}
                  </TouchableOpacity>
                </YStack>
              </View>
            </ScrollView>
          </View>
        </Modal>

        {/* ALL CATEGORIES MODAL */}
        {renderAllCategoriesModal()}

        {/* REVIEW TRANSACTION MODAL */}
        <Modal
          visible={showReviewModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setShowReviewModal(false);
            setSelectedReviewTransaction(null);
          }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 20, maxHeight: '70%' }}>
              <XStack jc="space-between" ai="center" mb={24}>
                <H4 color="white" fontWeight="800" fontSize={20}>
                  Review Transaction
                </H4>
                <TouchableOpacity onPress={() => {
                  setShowReviewModal(false);
                  setSelectedReviewTransaction(null);
                }}>
                  <X size={24} color="#666666" />
                </TouchableOpacity>
              </XStack>

              {selectedReviewTransaction && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <YStack space={20}>
                    {/* Transaction Details */}
                    <Card backgroundColor="#333333" p={16} br={12}>
                      <YStack space={12}>
                        <Text color="white" fontWeight="800" fontSize={16}>
                          {selectedReviewTransaction.description || 'No description'}
                        </Text>
                        
                        <XStack jc="space-between">
                          <YStack>
                            <Text color="#666666" fontSize={12}>Amount</Text>
                            <Text color="white" fontSize={16} fontWeight="700">
                              {formatCurrency(Math.abs(selectedReviewTransaction.amount), selectedReviewTransaction.currency)}
                            </Text>
                          </YStack>
                          
                          <YStack ai="flex-end">
                            <Text color="#666666" fontSize={12}>Date</Text>
                            <Text color="white" fontSize={14}>
                              {formatDateTime(selectedReviewTransaction.occurred_at)}
                            </Text>
                          </YStack>
                        </XStack>
                        
                        <Text color="#666666" fontSize={12}>
                          Merchant: {selectedReviewTransaction.merchant_raw || 'Unknown'}
                        </Text>
                        
                        {selectedReviewTransaction.category_confidence !== undefined && (
                          <XStack ai="center" space={8}>
                            <Tag size={16} color="#F59E0B" />
                            <Text color="#F59E0B" fontSize={14} fontWeight="600">
                              AI Confidence: {(selectedReviewTransaction.category_confidence * 100).toFixed(0)}%
                            </Text>
                          </XStack>
                        )}
                      </YStack>
                    </Card>

                    {/* Category Suggestions */}
                    {selectedReviewTransaction.category_suggestions && 
                     Array.isArray(selectedReviewTransaction.category_suggestions) &&
                     selectedReviewTransaction.category_suggestions.length > 0 && (
                      <YStack>
                        <Text color="#999999" fontSize={14} fontWeight="600" mb={12}>
                          Suggested Categories
                        </Text>
                        
                        <YStack space={8}>
                          {selectedReviewTransaction.category_suggestions.map((suggestion, index) => {
                            const category = suggestion.category || suggestion;
                            const categoryId = category.id || category;
                            const categoryName = getCategoryName(categoryId);
                            const confidence = suggestion.confidence || suggestion.category_confidence || 0;
                            const categoryColor = getCategoryColor(categoryId);
                            
                            return (
                              <TouchableOpacity
                                key={index}
                                onPress={() => handleConfirmCategory(selectedReviewTransaction.id, categoryId)}
                                style={{
                                  backgroundColor: '#333333',
                                  padding: 16,
                                  borderRadius: 8,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  borderWidth: 1,
                                  borderColor: '#444444',
                                }}
                                disabled={reviewLoading}
                              >
                                <YStack flex={1}>
                                  <XStack ai="center" space={8}>
                                    <View style={{
                                      width: 10,
                                      height: 10,
                                      borderRadius: 5,
                                      backgroundColor: categoryColor
                                    }} />
                                    <Text color="white" fontSize={14} fontWeight="600">
                                      {categoryName}
                                    </Text>
                                  </XStack>
                                  {confidence > 0 && (
                                    <Text color="#F59E0B" fontSize={12} mt={2} ml={18}>
                                      {(confidence * 100).toFixed(0)}% confidence
                                    </Text>
                                  )}
                                </YStack>
                                <ChevronRight size={16} color="#666666" />
                              </TouchableOpacity>
                            );
                          })}
                        </YStack>
                      </YStack>
                    )}

                    {/* Manual Category Selection */}
                    <YStack>
                      <Label htmlFor="manualCategory" color="#999999" fontSize={14} fontWeight="600" mb={8}>
                        Or Select Category
                      </Label>
                      
                      <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 16 }}
                      >
                        <XStack space={8}>
                          {/* Auto-detect option for review */}
                          <TouchableOpacity
                            onPress={() => setManualCategoryId('')}
                          >
                            <Card
                              backgroundColor={manualCategoryId === '' ? '#22C55E20' : '#333333'}
                              p={12}
                              br={8}
                              minWidth={100}
                              borderWidth={1}
                              borderColor={manualCategoryId === '' ? '#22C55E' : '#444444'}
                            >
                              <YStack ai="center" space={4}>
                                <Tag size={14} color={manualCategoryId === '' ? '#22C55E' : '#666666'} />
                                <Text 
                                  color={manualCategoryId === '' ? '#22C55E' : 'white'} 
                                  fontSize={12} 
                                  fontWeight="700"
                                >
                                  Auto-detect
                                </Text>
                              </YStack>
                            </Card>
                          </TouchableOpacity>

                          {/* Popular categories for quick selection */}
                          {categories.slice(0, 4).map((category) => (
                            <TouchableOpacity
                              key={category.id}
                              onPress={() => setManualCategoryId(category.id)}
                            >
                              <Card
                                backgroundColor={manualCategoryId === category.id ? `${getCategoryColor(category.id)}20` : '#333333'}
                                p={12}
                                br={8}
                                minWidth={100}
                                borderWidth={1}
                                borderColor={manualCategoryId === category.id ? getCategoryColor(category.id) : '#444444'}
                              >
                                <YStack ai="center" space={4}>
                                  <View style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: getCategoryColor(category.id)
                                  }} />
                                  <Text 
                                    color={manualCategoryId === category.id ? getCategoryColor(category.id) : 'white'} 
                                    fontSize={12} 
                                    fontWeight="700"
                                    numberOfLines={1}
                                  >
                                    {category.name}
                                  </Text>
                                </YStack>
                              </Card>
                            </TouchableOpacity>
                          ))}
                        </XStack>
                      </ScrollView>
                      
                      {/* Manual input for other categories */}
                      <Input
                        id="manualCategory"
                        placeholder="Or enter category ID manually"
                        value={manualCategoryId}
                        onChangeText={setManualCategoryId}
                        backgroundColor="#333333"
                        borderColor="#444444"
                        color="white"
                        placeholderTextColor="#666666"
                        fontSize={16}
                        mt={12}
                      />
                      
                      {(manualCategoryId.trim() || manualCategoryId === '') && (
                        <TouchableOpacity
                          onPress={() => handleConfirmCategory(selectedReviewTransaction.id, manualCategoryId.trim() || undefined)}
                          style={{
                            backgroundColor: '#22C55E',
                            padding: 12,
                            borderRadius: 8,
                            alignItems: 'center',
                            marginTop: 12,
                          }}
                          disabled={reviewLoading}
                        >
                          {reviewLoading ? (
                            <Spinner size="small" color="white" />
                          ) : (
                            <Text color="white" fontSize={14} fontWeight="600">
                              {manualCategoryId === '' ? 'Keep Auto-detect' : `Confirm with ${manualCategoryId.trim() ? getCategoryName(manualCategoryId) : 'Auto-detect'}`}
                            </Text>
                          )}
                        </TouchableOpacity>
                      )}
                    </YStack>

                    {/* Info Message */}
                    <Card backgroundColor="#1E3A8A" p={12} br={8}>
                      <XStack ai="center" space={8}>
                        <AlertTriangle size={16} color="#60A5FA" />
                        <YStack flex={1}>
                          <Text color="#60A5FA" fontSize={12} fontWeight="600">
                            Why is this needed?
                          </Text>
                          <Text color="#93C5FD" fontSize={11} mt={2}>
                            The AI isn't sure about the category. Your confirmation helps the system learn and get better next time.
                          </Text>
                        </YStack>
                      </XStack>
                    </Card>
                  </YStack>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>

        {/* FILTER SHEET */}
        <Sheet
          modal
          open={showFilterSheet}
          onOpenChange={setShowFilterSheet}
          snapPoints={[40]}
          dismissOnSnapToBottom
          animation="medium"
        >
          <Sheet.Overlay />
          <Sheet.Frame backgroundColor="#1A1A1A" borderTopLeftRadius={20} borderTopRightRadius={20}>
            <Sheet.Handle backgroundColor="#444444" />
            <YStack p={24}>
              <H4 color="white" fontWeight="800" mb={24}>Filter Transactions</H4>
              
              <YStack space={20}>
                {/* Start Date */}
                <YStack>
                  <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                    Start Date
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker('start')}
                    style={{
                      backgroundColor: '#333333',
                      borderWidth: 1,
                      borderColor: '#444444',
                      borderRadius: 8,
                      padding: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text color="white" fontSize={14}>
                      {startDate ? formatDate(startDate.toISOString()) : 'Select start date'}
                    </Text>
                    <Calendar size={16} color="#666666" />
                  </TouchableOpacity>
                </YStack>

                {/* End Date */}
                <YStack>
                  <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                    End Date
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker('end')}
                    style={{
                      backgroundColor: '#333333',
                      borderWidth: 1,
                      borderColor: '#444444',
                      borderRadius: 8,
                      padding: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text color="white" fontSize={14}>
                      {endDate ? formatDate(endDate.toISOString()) : 'Select end date'}
                    </Text>
                    <Calendar size={16} color="#666666" />
                  </TouchableOpacity>
                </YStack>

                <XStack space={12}>
                  <TouchableOpacity
                    onPress={resetFilters}
                    style={{
                      flex: 1,
                      backgroundColor: '#333333',
                      padding: 16,
                      borderRadius: 12,
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#444444'
                    }}
                  >
                    <Text color="white" fontSize={14} fontWeight="600">
                      Reset
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setShowFilterSheet(false);
                      fetchTransactions(startDate, endDate);
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#EAB308',
                      padding: 16,
                      borderRadius: 12,
                      alignItems: 'center'
                    }}
                  >
                    <Text color="black" fontSize={14} fontWeight="600">
                      Apply Filters
                    </Text>
                  </TouchableOpacity>
                </XStack>
              </YStack>
            </YStack>
          </Sheet.Frame>
        </Sheet>

        {/* DATE PICKER */}
        {showDatePicker && (
          <DateTimePicker
            value={showDatePicker === 'start' && startDate ? startDate : 
                   showDatePicker === 'end' && endDate ? endDate : new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}
      </SafeAreaView>
    </Theme>
  );
}
