// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   ScrollView,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // //   RefreshControl,
// // //   ActivityIndicator,
// // //   Modal,
// // //   TextInput,
// // //   Platform,
// // //   Alert,
// // //   StatusBar
// // // } from 'react-native';
// // // import { 
// // //   TrendingUp, 
// // //   ChevronLeft, 
// // //   Plus, 
// // //   X, 
// // //   CheckCircle,
// // //   Briefcase,
// // //   AlertTriangle,
// // //   Layers,
// // //   BarChart3
// // // } from 'lucide-react-native';
// // // import { useRouter } from 'expo-router';
// // // import { api } from '../../../services/api'; 

// // // export default function PortfolioScreen() {
// // //   const router = useRouter();
// // //   const [investments, setInvestments] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [refreshing, setRefreshing] = useState(false);
  
// // //   // Modal State for Adding Asset
// // //   const [isModalOpen, setModalOpen] = useState(false);
// // //   const [saving, setSaving] = useState(false);
// // //   const [newAsset, setNewAsset] = useState({
// // //     name: '',
// // //     asset_type: 'Stock', // Default
// // //     identifier: '',
// // //     quantity: '',
// // //     avg_buy_price: '',
// // //     expected_annual_return: '0',
// // //     risk_level: 'Low'
// // //   });

// // //   const fetchInvestments = async () => {
// // //     try {
// // //       const response = await api.get('/api/v1/investments/');
// // //       setInvestments(response.data);
// // //     } catch (error) {
// // //       console.error("Fetch Error:", error);
// // //     } finally {
// // //       setLoading(false);
// // //       setRefreshing(false);
// // //     }
// // //   };

// // //   const handleAddAsset = async () => {
// // //     if (!newAsset.name || !newAsset.identifier) {
// // //       Alert.alert("Required Fields", "Please provide a name and identifier (e.g., AAPL, BTC).");
// // //       return;
// // //     }

// // //     setSaving(true);
// // //     try {
// // //       await api.post('/api/v1/investments/', {
// // //         ...newAsset,
// // //         quantity: parseFloat(newAsset.quantity) || 0,
// // //         avg_buy_price: parseFloat(newAsset.avg_buy_price) || 0,
// // //         expected_annual_return: parseFloat(newAsset.expected_annual_return) || 0,
// // //       });
      
// // //       fetchInvestments();
// // //       setModalOpen(false);
// // //       setNewAsset({ name: '', asset_type: 'Stock', identifier: '', quantity: '', avg_buy_price: '', expected_annual_return: '0', risk_level: 'Low' });
// // //       Alert.alert("Success", "Asset added to secure vault.");
// // //     } catch (error) {
// // //       Alert.alert("Error", "Could not save investment.");
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchInvestments();
// // //   }, []);

// // //   const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

// // //   if (loading) {
// // //     return (
// // //       <View style={[styles.container, styles.center]}>
// // //         <ActivityIndicator size="large" color="#EAB308" />
// // //       </View>
// // //     );
// // //   }

// // //   return (
// // //     <View style={styles.container}>
// // //       <StatusBar barStyle="light-content" />
      
// // //       {/* HEADER */}
// // //       <View style={styles.navBar}>
// // //         <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
// // //           <ChevronLeft size={24} color="#FFF" />
// // //         </TouchableOpacity>
// // //         <Text style={styles.navTitle}>PORTFOLIO</Text>
// // //         <TouchableOpacity onPress={() => setModalOpen(true)} style={[styles.iconBtn, { borderColor: '#EAB308' }]}>
// // //           <Plus size={20} color="#EAB308" />
// // //         </TouchableOpacity>
// // //       </View>

// // //       <ScrollView 
// // //         contentContainerStyle={styles.scrollContent}
// // //         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchInvestments(); }} tintColor="#EAB308" />}
// // //       >
// // //         {/* SUMMARY CARD */}
// // //         <View style={styles.summaryCard}>
// // //           <Text style={styles.summaryLabel}>PORTFOLIO VALUE</Text>
// // //           <Text style={styles.summaryValue}>
// // //             {formatCurrency(investments.reduce((acc, curr) => acc + (curr.current_value ?? 0), 0))}
// // //           </Text>
// // //           <View style={styles.badge}>
// // //             <TrendingUp size={14} color="#22C55E" />
// // //             <Text style={styles.badgeText}>SECURE LEDGER ACTIVE</Text>
// // //           </View>
// // //         </View>

// // //         {/* LIST SECTION */}
// // //         <Text style={styles.sectionTitle}>ASSETS HOLDINGS</Text>
        
// // //         {investments.length > 0 ? (
// // //           investments.map((asset) => (
// // //             <View key={asset.id} style={styles.assetCard}>
// // //               <View style={styles.assetHeader}>
// // //                 <View style={styles.assetIconBox}>
// // //                   <Briefcase size={18} color="#EAB308" />
// // //                 </View>
// // //                 <View style={{ flex: 1 }}>
// // //                   <Text style={styles.assetName}>{asset.name}</Text>
// // //                   <Text style={styles.assetId}>{asset.identifier} • {asset.asset_type}</Text>
// // //                 </View>
// // //                 <View style={{ alignItems: 'flex-end' }}>
// // //                   <Text style={styles.assetPrice}>{formatCurrency(asset.current_value)}</Text>
// // //                   <Text style={styles.assetGrowth}>+{asset.expected_annual_return}% Est.</Text>
// // //                 </View>
// // //               </View>
// // //             </View>
// // //           ))
// // //         ) : (
// // //           <View style={styles.emptyState}>
// // //             <Layers size={40} color="#222" />
// // //             <Text style={styles.emptyText}>No assets linked. Tap '+' to begin.</Text>
// // //           </View>
// // //         )}
// // //       </ScrollView>

// // //       {/* --- ADD ASSET MODAL --- */}
// // //       <Modal visible={isModalOpen} animationType="slide" transparent>
// // //         <View style={styles.modalOverlay}>
// // //           <View style={styles.modalContent}>
// // //             <View style={styles.modalHeader}>
// // //               <Text style={styles.modalTitle}>NEW ASSET ENTRY</Text>
// // //               <TouchableOpacity onPress={() => setModalOpen(false)}><X size={24} color="#666" /></TouchableOpacity>
// // //             </View>

// // //             <ScrollView showsVerticalScrollIndicator={false}>
// // //               <Text style={styles.label}>ASSET NAME</Text>
// // //               <TextInput style={styles.input} placeholder="e.g. Bitcoin or Apple Inc" placeholderTextColor="#333" value={newAsset.name} onChangeText={(t) => setNewAsset({...newAsset, name: t})} />

// // //               <Text style={styles.label}>TICKER / IDENTIFIER</Text>
// // //               <TextInput style={styles.input} placeholder="e.g. BTC, AAPL" placeholderTextColor="#333" value={newAsset.identifier} onChangeText={(t) => setNewAsset({...newAsset, identifier: t})} />

// // //               <View style={{ flexDirection: 'row', gap: 15 }}>
// // //                 <View style={{ flex: 1 }}>
// // //                   <Text style={styles.label}>QUANTITY</Text>
// // //                   <TextInput style={styles.input} keyboardType="numeric" placeholder="0.00" placeholderTextColor="#333" value={newAsset.quantity} onChangeText={(t) => setNewAsset({...newAsset, quantity: t})} />
// // //                 </View>
// // //                 <View style={{ flex: 1 }}>
// // //                   <Text style={styles.label}>AVG PRICE</Text>
// // //                   <TextInput style={styles.input} keyboardType="numeric" placeholder="0.00" placeholderTextColor="#333" value={newAsset.avg_buy_price} onChangeText={(t) => setNewAsset({...newAsset, avg_buy_price: t})} />
// // //                 </View>
// // //               </View>

// // //               <TouchableOpacity style={styles.saveBtn} onPress={handleAddAsset} disabled={saving}>
// // //                 {saving ? <ActivityIndicator color="#000" /> : <><CheckCircle size={18} color="#000" /><Text style={styles.saveBtnText}>VAULT ASSET</Text></>}
// // //               </TouchableOpacity>
// // //             </ScrollView>
// // //           </View>
// // //         </View>
// // //       </Modal>
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, backgroundColor: '#000' },
// // //   center: { justifyContent: 'center', alignItems: 'center' },
// // //   navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingHorizontal: 20, paddingBottom: 15 },
// // //   iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
// // //   navTitle: { color: '#FFF', fontWeight: '800', letterSpacing: 2, fontSize: 13 },
// // //   scrollContent: { padding: 20, paddingBottom: 100 },
// // //   summaryCard: { backgroundColor: '#0A0A0A', padding: 25, borderRadius: 24, borderWidth: 1, borderColor: '#1A1A1A', marginBottom: 30, alignItems: 'center' },
// // //   summaryLabel: { color: '#666', fontSize: 10, letterSpacing: 2, fontWeight: '700', marginBottom: 8 },
// // //   summaryValue: { color: '#FFF', fontSize: 32, fontWeight: '900' },
// // //   badge: { flexDirection: 'row', alignItems: 'center', marginTop: 12, backgroundColor: 'rgba(34, 197, 94, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
// // //   badgeText: { color: '#22C55E', fontSize: 10, fontWeight: '800', marginLeft: 6 },
// // //   sectionTitle: { color: '#444', fontWeight: '800', fontSize: 12, letterSpacing: 1.5, marginBottom: 15 },
// // //   assetCard: { backgroundColor: '#050505', borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#111' },
// // //   assetHeader: { flexDirection: 'row', alignItems: 'center' },
// // //   assetIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(234, 179, 8, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
// // //   assetName: { color: '#FFF', fontWeight: '700', fontSize: 16 },
// // //   assetId: { color: '#444', fontSize: 11, marginTop: 2 },
// // //   assetPrice: { color: '#FFF', fontWeight: '800', fontSize: 16 },
// // //   assetGrowth: { color: '#22C55E', fontSize: 11, fontWeight: '700', marginTop: 2 },
// // //   emptyState: { alignItems: 'center', marginTop: 50 },
// // //   emptyText: { color: '#333', marginTop: 15, fontSize: 13 },
// // //   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' },
// // //   modalContent: { backgroundColor: '#0A0A0A', borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 25, borderTopWidth: 1, borderColor: '#1A1A1A', maxHeight: '80%' },
// // //   modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
// // //   modalTitle: { color: '#FFF', fontWeight: '900', fontSize: 18 },
// // //   label: { color: '#444', fontSize: 10, fontWeight: '800', marginBottom: 8, marginTop: 15 },
// // //   input: { backgroundColor: '#000', borderRadius: 12, padding: 15, color: '#FFF', borderWidth: 1, borderColor: '#1A1A1A' },
// // //   saveBtn: { backgroundColor: '#EAB308', padding: 18, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 },
// // //   saveBtnText: { color: '#000', fontWeight: '900', marginLeft: 10 }
// // // });



// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   StyleSheet,
// //   TouchableOpacity,
// //   RefreshControl,
// //   ActivityIndicator,
// //   Modal,
// //   TextInput,
// //   Platform,
// //   Alert,
// //   StatusBar
// // } from 'react-native';
// // import { 
// //   TrendingUp, ChevronLeft, Plus, X, CheckCircle, Briefcase, RefreshCw, Layers, ChevronDown 
// // } from 'lucide-react-native';
// // import { useRouter } from 'expo-router';
// // import { api } from '../../../services/investmentService'; 

// // // Enum values from your schema
// // const ASSET_TYPES = ['stock', 'crypto', 'bond', 'mutual_fund', 'gold', 'real_estate'];

// // export default function PortfolioScreen() {
// //   const router = useRouter();
// //   const [investments, setInvestments] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [actionLoadingId, setActionLoadingId] = useState(null);
  
// //   // Modal State
// //   const [isModalOpen, setModalOpen] = useState(false);
// //   const [saving, setSaving] = useState(false);
// //   const [showTypePicker, setShowTypePicker] = useState(false);
// //   const [newAsset, setNewAsset] = useState({
// //     name: '',
// //     asset_type: 'stock',
// //     identifier: '',
// //     quantity: '',
// //     avg_buy_price: '',
// //     expected_annual_return: '0',
// //     risk_level: 'low',
// //     is_pinned: false
// //   });

// //   const fetchInvestments = async () => {
// //     try {
// //       const response = await api.get('/api/v1/investments/');
// //       setInvestments(response.data);
// //     } catch (error) {
// //       console.error("Fetch Error:", error);
// //     } finally {
// //       setLoading(false);
// //       setRefreshing(false);
// //     }
// //   };

// //   const handleRefreshAsset = async (id) => {
// //     setActionLoadingId(id);
// //     try {
// //       await api.post(`/api/v1/investments/${id}/refresh`);
// //       await fetchInvestments();
// //     } catch (error) {
// //       Alert.alert("Sync Failed", "Could not refresh market data.");
// //     } finally {
// //       setActionLoadingId(null);
// //     }
// //   };

// //   const handleAddAsset = async () => {
// //     if (!newAsset.name || !newAsset.identifier || !newAsset.quantity) {
// //       Alert.alert("Required Fields", "Please provide Name, Identifier, and Quantity.");
// //       return;
// //     }

// //     setSaving(true);
// //     try {
// //       const payload = {
// //         ...newAsset,
// //         quantity: parseFloat(newAsset.quantity),
// //         avg_buy_price: parseFloat(newAsset.avg_buy_price) || 0,
// //         expected_annual_return: parseFloat(newAsset.expected_annual_return) || 0,
// //       };
      
// //       await api.post('/api/v1/investments/', payload);
// //       fetchInvestments();
// //       setModalOpen(false);
// //       setNewAsset({ name: '', asset_type: 'stock', identifier: '', quantity: '', avg_buy_price: '', expected_annual_return: '0', risk_level: 'low', is_pinned: false });
// //     } catch (error) {
// //       Alert.alert("Error", "Check your inputs. Ensure the asset type matches the system enums.");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchInvestments();
// //   }, []);

// //   // UI Helpers
// //   const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

// //   if (loading) {
// //     return (
// //       <View style={[styles.container, styles.center]}>
// //         <ActivityIndicator size="large" color="#EAB308" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar barStyle="light-content" />
      
// //       {/* HEADER */}
// //       <View style={styles.navBar}>
// //         <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
// //           <ChevronLeft size={24} color="#FFF" />
// //         </TouchableOpacity>
// //         <Text style={styles.navTitle}>PORTFOLIO</Text>
// //         <TouchableOpacity onPress={() => setModalOpen(true)} style={[styles.iconBtn, { borderColor: '#EAB308' }]}>
// //           <Plus size={20} color="#EAB308" />
// //         </TouchableOpacity>
// //       </View>

// //       <ScrollView 
// //         contentContainerStyle={styles.scrollContent}
// //         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchInvestments(); }} tintColor="#EAB308" />}
// //       >
// //         {/* SUMMARY CARD */}
// //         <View style={styles.summaryCard}>
// //           <Text style={styles.summaryLabel}>ESTIMATED PORTFOLIO VALUE</Text>
// //           <Text style={styles.summaryValue}>
// //             {/* Logic to handle null current_values from API response */}
// //             {formatCurrency(investments.reduce((acc, curr) => acc + (curr.current_value || (curr.quantity * curr.avg_buy_price)), 0))}
// //           </Text>
// //           <View style={styles.badge}>
// //             <TrendingUp size={12} color="#22C55E" />
// //             <Text style={styles.badgeText}>DATA SYNCED</Text>
// //           </View>
// //         </View>

// //         <Text style={styles.sectionTitle}>ASSETS </Text>
        
// //         {investments.length > 0 ? (
// //           investments.map((asset) => (
// //             <View key={asset.id} style={styles.assetCard}>
// //               <View style={styles.assetHeader}>
// //                 <View style={styles.assetIconBox}>
// //                   <Briefcase size={18} color="#EAB308" />
// //                 </View>
// //                 <View style={{ flex: 1 }}>
// //                   <Text style={styles.assetName}>{asset.name}</Text>
// //                   <Text style={styles.assetId}>{asset.identifier} • {asset.asset_type.toUpperCase()}</Text>
// //                 </View>
// //                 <View style={{ alignItems: 'flex-end' }}>
// //                   <Text style={styles.assetPrice}>
// //                     {formatCurrency(asset.current_value || (asset.quantity * asset.avg_buy_price))}
// //                   </Text>
// //                   <TouchableOpacity 
// //                     onPress={() => handleRefreshAsset(asset.id)}
// //                     style={styles.refreshBtn}
// //                     disabled={actionLoadingId === asset.id}
// //                   >
// //                     {actionLoadingId === asset.id ? (
// //                       <ActivityIndicator size="small" color="#EAB308" />
// //                     ) : (
// //                       <RefreshCw size={14} color="#666" />
// //                     )}
// //                   </TouchableOpacity>
// //                 </View>
// //               </View>
// //             </View>
// //           ))
// //         ) : (
// //           <View style={styles.emptyState}>
// //             <Layers size={40} color="#222" />
// //             <Text style={styles.emptyText}>Vault is empty. Add your first asset.</Text>
// //           </View>
// //         )}
// //       </ScrollView>

// //       {/* --- ADD ASSET MODAL --- */}
// //       <Modal visible={isModalOpen} animationType="slide" transparent>
// //         <View style={styles.modalOverlay}>
// //           <View style={styles.modalContent}>
// //             <View style={styles.modalHeader}>
// //               <Text style={styles.modalTitle}>REGISTER ASSET</Text>
// //               <TouchableOpacity onPress={() => setModalOpen(false)}><X size={24} color="#666" /></TouchableOpacity>
// //             </View>

// //             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 40}}>
// //               <Text style={styles.label}>ASSET TYPE</Text>
// //               <TouchableOpacity style={styles.input} onPress={() => setShowTypePicker(!showTypePicker)}>
// //                 <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
// //                   <Text style={{color: '#FFF'}}>{newAsset.asset_type.toUpperCase()}</Text>
// //                   <ChevronDown size={16} color="#EAB308" />
// //                 </View>
// //               </TouchableOpacity>
              
// //               {showTypePicker && (
// //                 <View style={styles.pickerContainer}>
// //                   {ASSET_TYPES.map(type => (
// //                     <TouchableOpacity key={type} style={styles.pickerItem} onPress={() => { setNewAsset({...newAsset, asset_type: type}); setShowTypePicker(false); }}>
// //                       <Text style={{color: '#FFF', fontSize: 12}}>{type.toUpperCase()}</Text>
// //                     </TouchableOpacity>
// //                   ))}
// //                 </View>
// //               )}

// //               <Text style={styles.label}>ASSET NAME</Text>
// //               <TextInput style={styles.input} placeholder="e.g. HDFC Bank" placeholderTextColor="#333" value={newAsset.name} onChangeText={(t) => setNewAsset({...newAsset, name: t})} />

// //               <Text style={styles.label}>TICKER / IDENTIFIER</Text>
// //               <TextInput style={styles.input} placeholder="e.g. HDFCBANK.NS" placeholderTextColor="#333" value={newAsset.identifier} onChangeText={(t) => setNewAsset({...newAsset, identifier: t})} />

// //               <View style={{ flexDirection: 'row', gap: 15 }}>
// //                 <View style={{ flex: 1 }}>
// //                   <Text style={styles.label}>QUANTITY</Text>
// //                   <TextInput style={styles.input} keyboardType="numeric" placeholder="0" placeholderTextColor="#333" value={newAsset.quantity} onChangeText={(t) => setNewAsset({...newAsset, quantity: t})} />
// //                 </View>
// //                 <View style={{ flex: 1 }}>
// //                   <Text style={styles.label}>AVG BUY PRICE</Text>
// //                   <TextInput style={styles.input} keyboardType="numeric" placeholder="0.00" placeholderTextColor="#333" value={newAsset.avg_buy_price} onChangeText={(t) => setNewAsset({...newAsset, avg_buy_price: t})} />
// //                 </View>
// //               </View>

// //               <TouchableOpacity style={styles.saveBtn} onPress={handleAddAsset} disabled={saving}>
// //                 {saving ? <ActivityIndicator color="#000" /> : <><CheckCircle size={18} color="#000" /><Text style={styles.saveBtnText}>Add to Portfolio</Text></>}
// //               </TouchableOpacity>
// //             </ScrollView>
// //           </View>
// //         </View>
// //       </Modal>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#000' },
// //   center: { justifyContent: 'center', alignItems: 'center' },
// //   navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingHorizontal: 20, paddingBottom: 15 },
// //   iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
// //   navTitle: { color: '#FFF', fontWeight: '800', letterSpacing: 2, fontSize: 13 },
// //   scrollContent: { padding: 20, paddingBottom: 100 },
// //   summaryCard: { backgroundColor: '#0A0A0A', padding: 25, borderRadius: 24, borderWidth: 1, borderColor: '#1A1A1A', marginBottom: 30, alignItems: 'center' },
// //   summaryLabel: { color: '#666', fontSize: 10, letterSpacing: 2, fontWeight: '700', marginBottom: 8 },
// //   summaryValue: { color: '#FFF', fontSize: 32, fontWeight: '900' },
// //   badge: { flexDirection: 'row', alignItems: 'center', marginTop: 12, backgroundColor: 'rgba(34, 197, 94, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
// //   badgeText: { color: '#22C55E', fontSize: 9, fontWeight: '800', marginLeft: 6 },
// //   sectionTitle: { color: '#444', fontWeight: '800', fontSize: 11, letterSpacing: 1.5, marginBottom: 15 },
// //   assetCard: { backgroundColor: '#050505', borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#111' },
// //   assetHeader: { flexDirection: 'row', alignItems: 'center' },
// //   assetIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(234, 179, 8, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
// //   assetName: { color: '#FFF', fontWeight: '700', fontSize: 16 },
// //   assetId: { color: '#444', fontSize: 11, marginTop: 2 },
// //   assetPrice: { color: '#FFF', fontWeight: '800', fontSize: 15 },
// //   refreshBtn: { marginTop: 8, padding: 4 },
// //   emptyState: { alignItems: 'center', marginTop: 50 },
// //   emptyText: { color: '#333', marginTop: 15, fontSize: 13 },
// //   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' },
// //   modalContent: { backgroundColor: '#0A0A0A', borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 25, borderTopWidth: 1, borderColor: '#1A1A1A', maxHeight: '85%' },
// //   modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
// //   modalTitle: { color: '#FFF', fontWeight: '900', fontSize: 18 },
// //   label: { color: '#444', fontSize: 10, fontWeight: '800', marginBottom: 8, marginTop: 15, letterSpacing: 1 },
// //   input: { backgroundColor: '#000', borderRadius: 12, padding: 15, color: '#FFF', borderWidth: 1, borderColor: '#1A1A1A' },
// //   pickerContainer: { backgroundColor: '#111', borderRadius: 12, marginTop: 5, padding: 10, borderWidth: 1, borderColor: '#222' },
// //   pickerItem: { paddingVertical: 12, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#222' },
// //   saveBtn: { backgroundColor: '#EAB308', padding: 18, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 },
// //   saveBtnText: { color: '#000', fontWeight: '900', marginLeft: 10 }
// // });


// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   ScrollView,
//   RefreshControl,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   Dimensions,
//   Animated
// } from 'react-native';
// import {
//   YStack,
//   XStack,
//   Text,
//   H2,
//   H4,
//   H6,
//   Theme,
//   Spinner,
//   Button,
//   Input,
//   Select,
//   Separator,
//   Progress
// } from 'tamagui';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import {
//   ArrowLeft,
//   Plus,
//   TrendingUp,
//   TrendingDown,
//   Wallet,
//   PieChart,
//   Shield,
//   DollarSign,
//   Hash,
//   BarChart3,
//   Calendar,
//   Percent,
//   Edit3,
//   Trash2,
//   X,
//   ChevronRight,
//   RefreshCw,
//   Filter,
//   Search,
//   Download,
//   AlertTriangle,
//   CheckCircle,
//   Clock
// } from '@tamagui/lucide-icons';
// import { useRouter, useFocusEffect } from 'expo-router';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // Services
// import { ApiService } from '../../../services/apiService';

// const { width } = Dimensions.get('window');

// export default function Portfolio() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
  
//   // State
//   const [investments, setInvestments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [totalValue, setTotalValue] = useState(0);
//   const [totalReturn, setTotalReturn] = useState(0);
//   const [totalReturnPct, setTotalReturnPct] = useState(0);
  
//   // Modals
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedInvestment, setSelectedInvestment] = useState(null);
  
//   // Filters
//   const [filterType, setFilterType] = useState('ALL');
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Form state
//   const [formData, setFormData] = useState({
//     name: '',
//     asset_type: 'EQUITY',
//     identifier: '',
//     current_value: '',
//     expected_return_pct: '',
//     purchase_price: '',
//     quantity: '',
//     purchase_date: new Date().toISOString().split('T')[0],
//     notes: '',
//     pinned: false
//   });

//   // Asset type options
//   const assetTypes = [
//     { value: 'EQUITY', label: 'Stocks', icon: <TrendingUp size={16} />, color: '#3b82f6' },
//     { value: 'MUTUAL_FUND', label: 'Mutual Funds', icon: <PieChart size={16} />, color: '#8b5cf6' },
//     { value: 'DEBT', label: 'Bonds/Debt', icon: <Shield size={16} />, color: '#22c55e' },
//     { value: 'ETF', label: 'ETF', icon: <Hash size={16} />, color: '#ef4444' },
//     { value: 'CRYPTO', label: 'Crypto', icon: <DollarSign size={16} />, color: '#f59e0b' },
//     { value: 'SAVINGS', label: 'Savings', icon: <Wallet size={16} />, color: '#06b6d4' },
//     { value: 'FD', label: 'Fixed Deposit', icon: <Calendar size={16} />, color: '#ec4899' },
//     { value: 'PPF', label: 'PPF', icon: <Shield size={16} />, color: '#84cc16' },
//     { value: 'REAL_ESTATE', label: 'Real Estate', icon: <BarChart3 size={16} />, color: '#f97316' },
//     { value: 'GOLD', label: 'Gold', icon: <DollarSign size={16} />, color: '#eab308' },
//     { value: 'OTHER', label: 'Other', icon: <Wallet size={16} />, color: '#64748b' }
//   ];

//   // Fetch investments
//   const fetchInvestments = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await ApiService.getInvestments();
//       const investmentsData = response.data || [];
      
//       // Calculate totals
//       const totalVal = investmentsData.reduce((sum, inv) => sum + (Number(inv.current_value) || 0), 0);
//       const totalRet = investmentsData.reduce((sum, inv) => {
//         const purchaseValue = Number(inv.purchase_price) || Number(inv.current_value);
//         const currentValue = Number(inv.current_value) || 0;
//         return sum + (currentValue - purchaseValue);
//       }, 0);
      
//       const totalRetPct = totalVal > 0 ? (totalRet / totalVal) * 100 : 0;
      
//       setInvestments(investmentsData);
//       setTotalValue(totalVal);
//       setTotalReturn(totalRet);
//       setTotalReturnPct(totalRetPct);
      
//     } catch (error) {
//       console.error('Fetch investments error:', error);
//       Alert.alert('Error', 'Failed to load investments');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       fetchInvestments();
//     }, [fetchInvestments])
//   );

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchInvestments();
//   }, [fetchInvestments]);

//   // Refresh single investment
//   const refreshInvestment = async (id) => {
//     try {
//       const response = await ApiService.refreshInvestment(id);
//       Alert.alert('Success', 'Investment data refreshed');
//       fetchInvestments();
//     } catch (error) {
//       console.error('Refresh error:', error);
//       Alert.alert('Error', 'Failed to refresh investment');
//     }
//   };

//   // Add investment
//   const handleAddInvestment = async () => {
//     try {
//       if (!formData.name || !formData.current_value) {
//         Alert.alert('Error', 'Name and current value are required');
//         return;
//       }

//       const investmentData = {
//         ...formData,
//         current_value: parseFloat(formData.current_value),
//         expected_return_pct: formData.expected_return_pct ? parseFloat(formData.expected_return_pct) : 0,
//         purchase_price: formData.purchase_price ? parseFloat(formData.purchase_price) : null,
//         quantity: formData.quantity ? parseFloat(formData.quantity) : null
//       };

//       await ApiService.createInvestment(investmentData);
      
//       setShowAddModal(false);
//       resetForm();
//       fetchInvestments();
//       Alert.alert('Success', 'Investment added successfully');
      
//     } catch (error) {
//       console.error('Add investment error:', error);
//       Alert.alert('Error', 'Failed to add investment');
//     }
//   };

//   // Update investment
//   const handleUpdateInvestment = async () => {
//     try {
//       if (!selectedInvestment) return;
      
//       const investmentData = {
//         ...formData,
//         current_value: parseFloat(formData.current_value),
//         expected_return_pct: formData.expected_return_pct ? parseFloat(formData.expected_return_pct) : 0,
//         purchase_price: formData.purchase_price ? parseFloat(formData.purchase_price) : null,
//         quantity: formData.quantity ? parseFloat(formData.quantity) : null
//       };

//       await ApiService.updateInvestment(selectedInvestment.id, investmentData);
      
//       setShowEditModal(false);
//       resetForm();
//       fetchInvestments();
//       Alert.alert('Success', 'Investment updated successfully');
      
//     } catch (error) {
//       console.error('Update investment error:', error);
//       Alert.alert('Error', 'Failed to update investment');
//     }
//   };

//   // Delete investment
//   const handleDeleteInvestment = async () => {
//     try {
//       if (!selectedInvestment) return;
      
//       // Note: Your API might use DELETE method
//       await ApiService.updateInvestment(selectedInvestment.id, { status: 'DELETED' });
      
//       setShowDeleteModal(false);
//       setSelectedInvestment(null);
//       fetchInvestments();
//       Alert.alert('Success', 'Investment deleted successfully');
      
//     } catch (error) {
//       console.error('Delete investment error:', error);
//       Alert.alert('Error', 'Failed to delete investment');
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       name: '',
//       asset_type: 'EQUITY',
//       identifier: '',
//       current_value: '',
//       expected_return_pct: '',
//       purchase_price: '',
//       quantity: '',
//       purchase_date: new Date().toISOString().split('T')[0],
//       notes: '',
//       pinned: false
//     });
//     setSelectedInvestment(null);
//   };

//   // Open edit modal
//   const openEditModal = (investment) => {
//     setSelectedInvestment(investment);
//     setFormData({
//       name: investment.name || '',
//       asset_type: investment.asset_type || 'EQUITY',
//       identifier: investment.identifier || '',
//       current_value: investment.current_value?.toString() || '',
//       expected_return_pct: investment.expected_return_pct?.toString() || '',
//       purchase_price: investment.purchase_price?.toString() || '',
//       quantity: investment.quantity?.toString() || '',
//       purchase_date: investment.purchase_date || new Date().toISOString().split('T')[0],
//       notes: investment.notes || '',
//       pinned: investment.pinned || false
//     });
//     setShowEditModal(true);
//   };

//   // Open delete modal
//   const openDeleteModal = (investment) => {
//     setSelectedInvestment(investment);
//     setShowDeleteModal(true);
//   };

//   // Filter investments
//   const filteredInvestments = investments.filter(inv => {
//     const matchesType = filterType === 'ALL' || inv.asset_type === filterType;
//     const matchesSearch = !searchQuery || 
//       inv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       inv.identifier?.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesType && matchesSearch;
//   });

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount || 0);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const getAssetTypeInfo = (type) => {
//     return assetTypes.find(t => t.value === type) || assetTypes.find(t => t.value === 'OTHER');
//   };

//   const getReturnColor = (returnPct) => {
//     if (!returnPct) return '#64748b';
//     return returnPct > 0 ? '#22c55e' : '#ef4444';
//   };

//   if (loading && !investments.length) {
//     return (
//       <Theme name="dark">
//         <LinearGradient
//           colors={['#000000', '#0A0A0A', '#111111']}
//           style={{ flex: 1 }}
//         >
//           <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Spinner size="large" color="#EAB308" />
//             <Text color="white" mt="$4">Loading portfolio...</Text>
//           </SafeAreaView>
//         </LinearGradient>
//       </Theme>
//     );
//   }

//   return (
//     <Theme name="dark">
//       <LinearGradient
//         colors={['#000000', '#0A0A0A', '#111111']}
//         style={{ flex: 1 }}
//       >
//         <SafeAreaView style={{ flex: 1 }}>
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
//               paddingBottom: insets.bottom + 20,
//             }}
//           >
//             {/* HEADER WITH BACK BUTTON */}
//             <XStack ai="center" mb="$6">
//               <TouchableOpacity 
//                 onPress={() => router.back()}
//                 style={{ marginRight: 16 }}
//               >
//                 <LinearGradient
//                   colors={['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={{
//                     width: 44,
//                     height: 44,
//                     borderRadius: 22,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     borderWidth: 1,
//                     borderColor: 'rgba(234, 179, 8, 0.3)',
//                   }}
//                 >
//                   <ArrowLeft size={20} color="#EAB308" />
//                 </LinearGradient>
//               </TouchableOpacity>
              
//               <YStack f={1}>
//                 <H2 color="white" fontWeight="900" fontSize={32}>
//                   Portfolio
//                 </H2>
//                 <Text color="rgba(255,255,255,0.6)" fontSize={14}>
//                   Track and manage your investments
//                 </Text>
//               </YStack>
              
//               <TouchableOpacity 
//                 onPress={() => setShowAddModal(true)}
//                 activeOpacity={0.8}
//               >
//                 <LinearGradient
//                   colors={['#EAB308', '#CA8A04']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={{
//                     width: 44,
//                     height: 44,
//                     borderRadius: 22,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     shadowColor: '#EAB308',
//                     shadowOffset: { width: 0, height: 4 },
//                     shadowOpacity: 0.3,
//                     shadowRadius: 8,
//                     elevation: 8,
//                   }}
//                 >
//                   <Plus size={22} color="white" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </XStack>

//             {/* PORTFOLIO SUMMARY */}
//             <LinearGradient
//               colors={['rgba(59, 130, 246, 0.15)', 'rgba(37, 99, 235, 0.05)']}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={{
//                 borderRadius: 24,
//                 padding: 24,
//                 marginBottom: 24,
//                 borderWidth: 1,
//                 borderColor: 'rgba(59, 130, 246, 0.3)',
//               }}
//             >
//               <Text color="rgba(255,255,255,0.7)" fontSize={14} fontWeight="600" mb="$2">
//                 TOTAL PORTFOLIO VALUE
//               </Text>
              
//               <H2 color="white" fontWeight="900" fontSize={38} mb="$1">
//                 {formatCurrency(totalValue)}
//               </H2>
              
//               <XStack ai="center" space="$3" mt="$2">
//                 <XStack 
//                   bg={getReturnColor(totalReturnPct)}
//                   px="$2.5" 
//                   py="$1" 
//                   br="$2"
//                   ai="center"
//                 >
//                   {totalReturnPct > 0 ? (
//                     <TrendingUp size={14} color="white" />
//                   ) : (
//                     <TrendingDown size={14} color="white" />
//                   )}
//                   <Text color="white" fontSize={12} fontWeight="700" ml="$1">
//                     {totalReturnPct > 0 ? '+' : ''}{totalReturnPct.toFixed(2)}%
//                   </Text>
//                 </XStack>
                
//                 <Text color="rgba(255,255,255,0.6)" fontSize={13}>
//                   {formatCurrency(totalReturn)} total returns
//                 </Text>
//               </XStack>
              
//               <XStack jc="space-between" mt="$4" pt="$4" borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)">
//                 <YStack ai="center">
//                   <Text color="rgba(255,255,255,0.7)" fontSize={12}>Investments</Text>
//                   <Text color="white" fontSize={18} fontWeight="800">{investments.length}</Text>
//                 </YStack>
                
//                 <YStack ai="center">
//                   <Text color="rgba(255,255,255,0.7)" fontSize={12}>Asset Types</Text>
//                   <Text color="white" fontSize={18} fontWeight="800">
//                     {new Set(investments.map(inv => inv.asset_type)).size}
//                   </Text>
//                 </YStack>
                
//                 <YStack ai="center">
//                   <Text color="rgba(255,255,255,0.7)" fontSize={12}>Avg. Return</Text>
//                   <Text color="white" fontSize={18} fontWeight="800">
//                     {investments.length > 0 
//                       ? (investments.reduce((sum, inv) => sum + (inv.expected_return_pct || 0), 0) / investments.length).toFixed(1)
//                       : 0}%
//                   </Text>
//                 </YStack>
//               </XStack>
//             </LinearGradient>

//             {/* FILTERS AND SEARCH */}
//             <XStack ai="center" mb="$4" space="$3">
//               <XStack f={1} bg="rgba(255,255,255,0.05)" br="$4" p="$2" ai="center">
//                 <Search size={16} color="rgba(255,255,255,0.5)" ml="$2" />
//                 <Input
//                   placeholder="Search investments..."
//                   value={searchQuery}
//                   onChangeText={setSearchQuery}
//                   backgroundColor="transparent"
//                   borderWidth={0}
//                   color="white"
//                   placeholderTextColor="rgba(255,255,255,0.4)"
//                   fontSize={14}
//                   flex={1}
//                 />
//               </XStack>
              
//               <Select
//                 value={filterType}
//                 onValueChange={setFilterType}
//                 backgroundColor="rgba(255,255,255,0.05)"
//                 borderColor="rgba(255,255,255,0.1)"
//                 color="white"
//                 width={120}
//               >
//                 <Select.Trigger>
//                   <Select.Value placeholder="Filter" />
//                 </Select.Trigger>
//                 <Select.Content>
//                   <Select.Item value="ALL" index={0}>
//                     <Select.ItemText>All Types</Select.ItemText>
//                   </Select.Item>
//                   {assetTypes.map((type, index) => (
//                     <Select.Item key={type.value} value={type.value} index={index + 1}>
//                       <Select.ItemText>{type.label}</Select.ItemText>
//                     </Select.Item>
//                   ))}
//                 </Select.Content>
//               </Select>
//             </XStack>

//             {/* INVESTMENTS LIST */}
//             <YStack space="$3">
//               {filteredInvestments.length > 0 ? (
//                 filteredInvestments.map((investment, index) => {
//                   const assetInfo = getAssetTypeInfo(investment.asset_type);
//                   const purchaseValue = Number(investment.purchase_price) || Number(investment.current_value);
//                   const currentValue = Number(investment.current_value) || 0;
//                   const returnAmount = currentValue - purchaseValue;
//                   const returnPercentage = purchaseValue > 0 ? (returnAmount / purchaseValue) * 100 : 0;
                  
//                   return (
//                     <TouchableOpacity 
//                       key={investment.id || index}
//                       activeOpacity={0.9}
//                       onPress={() => openEditModal(investment)}
//                     >
//                       <LinearGradient
//                         colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
//                         start={{ x: 0, y: 0 }}
//                         end={{ x: 1, y: 1 }}
//                         style={{
//                           padding: 16,
//                           borderRadius: 16,
//                           borderWidth: 1,
//                           borderColor: 'rgba(255, 255, 255, 0.1)',
//                         }}
//                       >
//                         <XStack jc="space-between" ai="center" mb="$3">
//                           <XStack ai="center" space="$3" f={1}>
//                             <LinearGradient
//                               colors={[assetInfo.color, assetInfo.color + 'DD']}
//                               style={{
//                                 width: 44,
//                                 height: 44,
//                                 borderRadius: 12,
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 shadowColor: assetInfo.color,
//                                 shadowOffset: { width: 0, height: 2 },
//                                 shadowOpacity: 0.3,
//                                 shadowRadius: 4,
//                                 elevation: 4,
//                               }}
//                             >
//                               {assetInfo.icon}
//                             </LinearGradient>
                            
//                             <YStack f={1}>
//                               <Text color="white" fontWeight="800" fontSize={16} numberOfLines={1}>
//                                 {investment.name}
//                               </Text>
//                               <XStack ai="center" space="$2">
//                                 <Text color="rgba(255,255,255,0.6)" fontSize={12}>
//                                   {investment.identifier || assetInfo.label}
//                                 </Text>
//                                 {investment.pinned && (
//                                   <CheckCircle size={12} color="#EAB308" />
//                                 )}
//                               </XStack>
//                             </YStack>
//                           </XStack>
                          
//                           <YStack ai="flex-end">
//                             <Text color="white" fontWeight="800" fontSize={16}>
//                               {formatCurrency(investment.current_value)}
//                             </Text>
//                             <XStack ai="center" space="$1">
//                               <Text color={getReturnColor(returnPercentage)} fontSize={11} fontWeight="700">
//                                 {returnPercentage > 0 ? '+' : ''}{returnPercentage.toFixed(1)}%
//                               </Text>
//                               <Text color="rgba(255,255,255,0.5)" fontSize={11}>
//                                 ({formatCurrency(returnAmount)})
//                               </Text>
//                             </XStack>
//                           </YStack>
//                         </XStack>
                        
//                         <XStack jc="space-between" ai="center">
//                           <XStack ai="center" space="$4">
//                             {investment.purchase_date && (
//                               <XStack ai="center" space="$1">
//                                 <Calendar size={12} color="rgba(255,255,255,0.5)" />
//                                 <Text color="rgba(255,255,255,0.5)" fontSize={11}>
//                                   {formatDate(investment.purchase_date)}
//                                 </Text>
//                               </XStack>
//                             )}
                            
//                             {investment.quantity && (
//                               <XStack ai="center" space="$1">
//                                 <Hash size={12} color="rgba(255,255,255,0.5)" />
//                                 <Text color="rgba(255,255,255,0.5)" fontSize={11}>
//                                   {investment.quantity} units
//                                 </Text>
//                               </XStack>
//                             )}
//                           </XStack>
                          
//                           <XStack ai="center" space="$2">
//                             <TouchableOpacity
//                               onPress={() => refreshInvestment(investment.id)}
//                               hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                             >
//                               <RefreshCw size={16} color="#3b82f6" />
//                             </TouchableOpacity>
                            
//                             <TouchableOpacity
//                               onPress={() => openDeleteModal(investment)}
//                               hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                             >
//                               <Trash2 size={16} color="#ef4444" />
//                             </TouchableOpacity>
//                           </XStack>
//                         </XStack>
//                       </LinearGradient>
//                     </TouchableOpacity>
//                   );
//                 })
//               ) : (
//                 <YStack ai="center" py="$8" space="$4">
//                   <Wallet size={64} color="rgba(234, 179, 8, 0.3)" />
//                   <Text color="rgba(255,255,255,0.6)" fontSize={16} textAlign="center">
//                     {searchQuery || filterType !== 'ALL' 
//                       ? 'No investments match your filters'
//                       : 'No investments yet'}
//                   </Text>
//                   <TouchableOpacity 
//                     onPress={() => setShowAddModal(true)}
//                     activeOpacity={0.8}
//                   >
//                     <LinearGradient
//                       colors={['#EAB308', '#CA8A04']}
//                       start={{ x: 0, y: 0 }}
//                       end={{ x: 1, y: 1 }}
//                       style={{
//                         paddingHorizontal: 24,
//                         paddingVertical: 12,
//                         borderRadius: 12,
//                       }}
//                     >
//                       <Text color="white" fontSize={14} fontWeight="700">Add First Investment</Text>
//                     </LinearGradient>
//                   </TouchableOpacity>
//                 </YStack>
//               )}
//             </YStack>

//             {/* ASSET ALLOCATION (If we have data) */}
//             {investments.length > 0 && (
//               <YStack mt="$6">
//                 <XStack jc="space-between" ai="center" mb="$4">
//                   <Text color="white" fontWeight="800" fontSize={18}>
//                     Asset Allocation
//                   </Text>
//                   <TouchableOpacity>
//                     <Text color="#EAB308" fontSize={12} fontWeight="700">VIEW DETAILS</Text>
//                   </TouchableOpacity>
//                 </XStack>
                
//                 <YStack space="$3">
//                   {Array.from(new Set(investments.map(inv => inv.asset_type))).slice(0, 5).map(type => {
//                     const typeInvestments = investments.filter(inv => inv.asset_type === type);
//                     const typeValue = typeInvestments.reduce((sum, inv) => sum + (Number(inv.current_value) || 0), 0);
//                     const percentage = totalValue > 0 ? (typeValue / totalValue) * 100 : 0;
//                     const assetInfo = getAssetTypeInfo(type);
                    
//                     return (
//                       <YStack key={type} space="$2">
//                         <XStack jc="space-between" ai="center">
//                           <XStack ai="center" space="$2">
//                             <LinearGradient
//                               colors={[assetInfo.color, assetInfo.color + 'DD']}
//                               style={{
//                                 width: 20,
//                                 height: 20,
//                                 borderRadius: 6,
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                               }}
//                             >
//                               {React.cloneElement(assetInfo.icon, { size: 12 })}
//                             </LinearGradient>
//                             <Text color="white" fontSize={14} fontWeight="600">
//                               {assetInfo.label}
//                             </Text>
//                           </XStack>
//                           <Text color="white" fontSize={14} fontWeight="600">
//                             {percentage.toFixed(1)}%
//                           </Text>
//                         </XStack>
//                         <Progress 
//                           value={percentage} 
//                           h={6} 
//                           bg="rgba(255,255,255,0.1)"
//                           br="$10"
//                         >
//                           <Progress.Indicator 
//                             bg={assetInfo.color}
//                             animation="bouncy"
//                             br="$10"
//                           />
//                         </Progress>
//                         <Text color="rgba(255,255,255,0.5)" fontSize={12}>
//                           {formatCurrency(typeValue)} • {typeInvestments.length} holding{typeInvestments.length !== 1 ? 's' : ''}
//                         </Text>
//                       </YStack>
//                     );
//                   })}
//                 </YStack>
//               </YStack>
//             )}

//             {/* BOTTOM PADDING */}
//             <YStack h={40} />
//           </ScrollView>
//         </SafeAreaView>

//         {/* ADD INVESTMENT MODAL */}
//         <Modal
//           visible={showAddModal}
//           animationType="slide"
//           transparent={true}
//           onRequestClose={() => setShowAddModal(false)}
//         >
//           <BlurView intensity={90} style={{ flex: 1, justifyContent: 'flex-end' }}>
//             <LinearGradient
//               colors={['#1a1a1a', '#0a0a0a']}
//               style={{
//                 borderTopLeftRadius: 24,
//                 borderTopRightRadius: 24,
//                 padding: 24,
//                 paddingBottom: insets.bottom + 20,
//                 maxHeight: '90%',
//               }}
//             >
//               <XStack jc="space-between" ai="center" mb="$6">
//                 <H4 color="white" fontWeight="800" fontSize={20}>
//                   Add Investment
//                 </H4>
//                 <TouchableOpacity onPress={() => setShowAddModal(false)}>
//                   <X size={24} color="rgba(255,255,255,0.5)" />
//                 </TouchableOpacity>
//               </XStack>

//               <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
//                 <YStack space="$4">
//                   <YStack>
//                     <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
//                       Investment Name *
//                     </Text>
//                     <Input
//                       placeholder="e.g., Apple Stocks, HDFC Mutual Fund"
//                       value={formData.name}
//                       onChangeText={(text) => setFormData({...formData, name: text})}
//                       backgroundColor="rgba(255,255,255,0.1)"
//                       borderColor="rgba(255,255,255,0.2)"
//                       color="white"
//                       placeholderTextColor="rgba(255,255,255,0.4)"
//                       fontSize={16}
//                       h={48}
//                     />
//                   </YStack>
                  
//                   <YStack>
//                     <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
//                       Asset Type
//                     </Text>
//                     <Select
//                       value={formData.asset_type}
//                       onValueChange={(value) => setFormData({...formData, asset_type: value})}
//                       backgroundColor="rgba(255,255,255,0.1)"
//                       borderColor="rgba(255,255,255,0.2)"
//                       color="white"
//                     >
//                       <Select.Trigger>
//                         <Select.Value placeholder="Select type" />
//                       </Select.Trigger>
//                       <Select.Content>
//                         {assetTypes.map((type, index) => (
//                           <Select.Item key={type.value} value={type.value} index={index}>
//                             <Select.ItemText>{type.label}</Select.ItemText>
//                           </Select.Item>
//                         ))}
//                       </Select.Content>
//                     </Select>
//                   </YStack>
                  
//                   <YStack>
//                     <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
//                       Identifier / Ticker (Optional)
//                     </Text>
//                     <Input
//                       placeholder="e.g., AAPL, INF174K01ZR2"
//                       value={formData.identifier}
//                       onChangeText={(text) => setFormData({...formData, identifier: text})}
//                       backgroundColor="rgba(255,255,255,0.1)"
//                       borderColor="rgba(255,255,255,0.2)"
//                       color="white"
//                       placeholderTextColor="rgba(255,255,255,0.4)"
//                       fontSize={16}
//                       h={48}
//                     />
//                   </YStack>
                  
//                   <YStack>
//                     <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
//                       Current Value (₹) *
//                     </Text>
//                     <Input
//                       placeholder="0.00"
//                       value={formData.current_value}
//                       onChangeText={(text) => setFormData({...formData, current_value: text})}
//                       backgroundColor="rgba(255,255,255,0.1)"
//                       borderColor="rgba(255,255,255,0.2)"
//                       color="white"
//                       placeholderTextColor="rgba(255,255,255,0.4)"
//                       keyboardType="decimal-pad"
//                       fontSize={16}
//                       h={48}
//                     />
//                   </YStack>
                  
//                   <XStack space="$4">
//                     <YStack f={1}>
//                       <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
//                         Expected Return %
//                       </Text>
//                       <Input
//                         placeholder="0.0"
//                         value={formData.expected_return_pct}
//                         onChangeText={(text) => setFormData({...formData, expected_return_pct: text})}
//                         backgroundColor="rgba(255,255,255,0.1)"
//                         borderColor="rgba(255,255,255,0.2)"
//                         color="white"
//                         placeholderTextColor="rgba(255,255,255,0.4)"
//                         keyboardType="decimal-pad"
//                         fontSize={16}
//                         h={48}
//                       />
//                     </YStack>
                    
//                     <YStack f={1}>
//                       <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
//                         Purchase Price (₹)
//                       </Text>
//                       <Input
//                         placeholder="0.00"
//                         value={formData.purchase_price}
//                         onChangeText={(text) => setFormData({...formData, purchase_price: text})}
//                         backgroundColor="rgba(255,255,255,0.1)"
//                         borderColor="rgba(255,255,255,0.2)"
//                         color="white"
//                         placeholderTextColor="rgba(255,255,255,0.4)"
//                         keyboardType="decimal-pad"
//                         fontSize={16}
//                         h={48}
//                       />
//                     </YStack>
//                   </XStack>
                  
//                   <XStack space="$4">
//                     <YStack f={1}>
//                       <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
//                         Quantity
//                       </Text>
//                       <Input
//                         placeholder="1"
//                         value={formData.quantity}
//                         onChangeText={(text) => setFormData({...formData, quantity: text})}
//                         backgroundColor="rgba(255,255,255,0.1)"
//                         borderColor="rgba(255,255,255,0.2)"
//                         color="white"
//                         placeholderTextColor="rgba(255,255,255,0.4)"
//                         keyboardType="decimal-pad"
//                         fontSize={16}
//                         h={48}
//                       />
//                     </YStack>
                    
//                     <YStack f={1}>
//                       <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
//                         Purchase Date
//                       </Text>
//                       <Input
//                         placeholder="YYYY-MM-DD"
//                         value={formData.purchase_date}
//                         onChangeText={(text) => setFormData({...formData, purchase_date: text})}
//                         backgroundColor="rgba(255,255,255,0.1)"
//                         borderColor="rgba(255,255,255,0.2)"
//                         color="white"
//                         placeholderTextColor="rgba(255,255,255,0.4)"
//                         fontSize={16}
//                         h={48}
//                       />
//                     </YStack>
//                   </XStack>
                  
//                   <XStack ai="center" jc="space-between" mt="$2">
//                     <Text color="white" fontSize={14}>Pin to Dashboard</Text>
//                     <TouchableOpacity
//                       onPress={() => setFormData({...formData, pinned: !formData.pinned})}
//                       style={{
//                         width: 40,
//                         height: 24,
//                         borderRadius: 12,
//                         backgroundColor: formData.pinned ? '#EAB308' : 'rgba(255,255,255,0.2)',
//                         justifyContent: 'center',
//                         paddingHorizontal: 2,
//                       }}
//                     >
//                       <XStack 
//                         style={{
//                           width: 20,
//                           height: 20,
//                           borderRadius: 10,
//                           backgroundColor: 'white',
//                           transform: [{ translateX: formData.pinned ? 16 : 0 }]
//                         }}
//                       />
//                     </TouchableOpacity>
//                   </XStack>
//                 </YStack>
//               </ScrollView>

//               <XStack space="$3" mt="$6">
//                 <TouchableOpacity
//                   onPress={handleAddInvestment}
//                   activeOpacity={0.8}
//                   style={{ flex: 1 }}
//                 >
//                   <LinearGradient
//                     colors={['#EAB308', '#CA8A04']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={{
//                       paddingVertical: 16,
//                       borderRadius: 12,
//                       alignItems: 'center',
//                       shadowColor: '#EAB308',
//                       shadowOffset: { width: 0, height: 2 },
//                       shadowOpacity: 0.3,
//                       shadowRadius: 4,
//                       elevation: 4,
//                     }}
//                   >
//                     <Text color="white" fontSize={16} fontWeight="700">Add Investment</Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
                
//                 <TouchableOpacity
//                   onPress={() => setShowAddModal(false)}
//                   activeOpacity={0.8}
//                   style={{ flex: 1 }}
//                 >
//                   <LinearGradient
//                     colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={{
//                       paddingVertical: 16,
//                       borderRadius: 12,
//                       alignItems: 'center',
//                       borderWidth: 1,
//                       borderColor: 'rgba(255,255,255,0.2)',
//                     }}
//                   >
//                     <Text color="white" fontSize={16} fontWeight="700">Cancel</Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
//               </XStack>
//             </LinearGradient>
//           </BlurView>
//         </Modal>

//         {/* EDIT MODAL (Similar to Add Modal, just change title and button) */}
//         <Modal
//           visible={showEditModal}
//           animationType="slide"
//           transparent={true}
//           onRequestClose={() => setShowEditModal(false)}
//         >
//           <BlurView intensity={90} style={{ flex: 1, justifyContent: 'flex-end' }}>
//             <LinearGradient
//               colors={['#1a1a1a', '#0a0a0a']}
//               style={{
//                 borderTopLeftRadius: 24,
//                 borderTopRightRadius: 24,
//                 padding: 24,
//                 paddingBottom: insets.bottom + 20,
//                 maxHeight: '90%',
//               }}
//             >
//               <XStack jc="space-between" ai="center" mb="$6">
//                 <H4 color="white" fontWeight="800" fontSize={20}>
//                   Edit Investment
//                 </H4>
//                 <TouchableOpacity onPress={() => setShowEditModal(false)}>
//                   <X size={24} color="rgba(255,255,255,0.5)" />
//                 </TouchableOpacity>
//               </XStack>

//               {/* Same form content as Add Modal, just different button */}
//               <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
//                 {/* Same form fields as Add Modal */}
//               </ScrollView>

//               <XStack space="$3" mt="$6">
//                 <TouchableOpacity
//                   onPress={handleUpdateInvestment}
//                   activeOpacity={0.8}
//                   style={{ flex: 1 }}
//                 >
//                   <LinearGradient
//                     colors={['#3b82f6', '#2563eb']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={{
//                       paddingVertical: 16,
//                       borderRadius: 12,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Text color="white" fontSize={16} fontWeight="700">Update</Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
                
//                 <TouchableOpacity
//                   onPress={() => setShowEditModal(false)}
//                   activeOpacity={0.8}
//                   style={{ flex: 1 }}
//                 >
//                   <LinearGradient
//                     colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
//                     style={{
//                       paddingVertical: 16,
//                       borderRadius: 12,
//                       alignItems: 'center',
//                       borderWidth: 1,
//                       borderColor: 'rgba(255,255,255,0.2)',
//                     }}
//                   >
//                     <Text color="white" fontSize={16} fontWeight="700">Cancel</Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
//               </XStack>
//             </LinearGradient>
//           </BlurView>
//         </Modal>

//         {/* DELETE CONFIRMATION MODAL */}
//         <Modal
//           visible={showDeleteModal}
//           animationType="fade"
//           transparent={true}
//           onRequestClose={() => setShowDeleteModal(false)}
//         >
//           <BlurView intensity={90} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
//             <LinearGradient
//               colors={['#1a1a1a', '#0a0a0a']}
//               style={{
//                 borderRadius: 24,
//                 padding: 24,
//                 width: '100%',
//                 maxWidth: 400,
//                 borderWidth: 1,
//                 borderColor: 'rgba(239, 68, 68, 0.3)',
//               }}
//             >
//               <XStack jc="center" mb="$4">
//                 <AlertTriangle size={48} color="#ef4444" />
//               </XStack>
              
//               <Text color="white" fontWeight="700" fontSize={18} textAlign="center" mb="$2">
//                 Delete Investment
//               </Text>
              
//               <Text color="rgba(255,255,255,0.7)" fontSize={14} textAlign="center" mb="$6">
//                 Are you sure you want to delete "{selectedInvestment?.name}"? This action cannot be undone.
//               </Text>
              
//               <XStack space="$3">
//                 <TouchableOpacity
//                   onPress={handleDeleteInvestment}
//                   activeOpacity={0.8}
//                   style={{ flex: 1 }}
//                 >
//                   <LinearGradient
//                     colors={['#ef4444', '#dc2626']}
//                     style={{
//                       paddingVertical: 14,
//                       borderRadius: 12,
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Text color="white" fontSize={14} fontWeight="700">Delete</Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
                
//                 <TouchableOpacity
//                   onPress={() => setShowDeleteModal(false)}
//                   activeOpacity={0.8}
//                   style={{ flex: 1 }}
//                 >
//                   <LinearGradient
//                     colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
//                     style={{
//                       paddingVertical: 14,
//                       borderRadius: 12,
//                       alignItems: 'center',
//                       borderWidth: 1,
//                       borderColor: 'rgba(255,255,255,0.2)',
//                     }}
//                   >
//                     <Text color="white" fontSize={14} fontWeight="700">Cancel</Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
//               </XStack>
//             </LinearGradient>
//           </BlurView>
//         </Modal>
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
  Dimensions,
  KeyboardAvoidingView,
  Platform
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
  Select,
  Progress,
  Switch
} from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {
  ArrowLeft,
  Plus,
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  Shield,
  DollarSign,
  Hash,
  BarChart3,
  Calendar,
  Percent,
  Edit3,
  Trash2,
  X,
  ChevronRight,
  RefreshCw,
  Filter,
  Search,
  CheckCircle,
  AlertTriangle,
  Clock,
  Layers,
  Database,
  Home,
  Gem,
  Coins,
  View
} from '@tamagui/lucide-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Services
import { ApiService } from '../../../services/apiService';

const { width } = Dimensions.get('window');

export default function Portfolio() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalReturn, setTotalReturn] = useState(0);
  const [totalReturnPct, setTotalReturnPct] = useState(0);
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  
  // Filters
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form state - MATCH EXACT API STRUCTURE
  const [formData, setFormData] = useState({
    asset_type: 'stock',
    identifier: '',
    name: '',
    quantity: '',
    avg_buy_price: '',
    expected_annual_return: '',
    risk_level: 'medium',
    is_pinned: false
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Asset type options - MATCH YOUR ACTUAL API VALUES
  const assetTypes = [
    { value: 'stock', label: 'Stocks', icon: <TrendingUp size={16} />, color: '#3b82f6' },
    { value: 'mutual_fund', label: 'Mutual Funds', icon: <PieChart size={16} />, color: '#8b5cf6' },
    { value: 'bond', label: 'Bonds', icon: <Shield size={16} />, color: '#22c55e' },
    { value: 'etf', label: 'ETF', icon: <Hash size={16} />, color: '#ef4444' },
    { value: 'crypto', label: 'Crypto', icon: <Coins size={16} />, color: '#f59e0b' },
    { value: 'fd', label: 'Fixed Deposit', icon: <Calendar size={16} />, color: '#06b6d4' },
    { value: 'ppf', label: 'PPF', icon: <Shield size={16} />, color: '#84cc16' },
    { value: 'real_estate', label: 'Real Estate', icon: <Home size={16} />, color: '#f97316' },
    { value: 'gold', label: 'Gold', icon: <Gem size={16} />, color: '#eab308' },
    { value: 'other', label: 'Other', icon: <Database size={16} />, color: '#64748b' }
  ];

  // Risk level options
  const riskLevels = [
    { value: 'low', label: 'Low Risk', color: '#22c55e' },
    { value: 'medium', label: 'Medium Risk', color: '#eab308' },
    { value: 'high', label: 'High Risk', color: '#ef4444' }
  ];

  // Fetch investments
  const fetchInvestments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ApiService.getInvestments();
      const investmentsData = response.data || [];
      
      console.log('Investments fetched:', investmentsData);
      
      // Calculate totals
      let totalInvestedAmount = 0;
      let totalCurrentValue = 0;
      
      investmentsData.forEach(inv => {
        const quantity = Number(inv.quantity) || 0;
        const avgPrice = Number(inv.avg_buy_price) || 0;
        const currentValue = Number(inv.current_value) || 0;
        
        totalInvestedAmount += quantity * avgPrice;
        totalCurrentValue += currentValue > 0 ? currentValue : quantity * avgPrice;
      });
      
      const totalReturnAmount = totalCurrentValue - totalInvestedAmount;
      const totalReturnPercentage = totalInvestedAmount > 0 ? (totalReturnAmount / totalInvestedAmount) * 100 : 0;
      
      setInvestments(investmentsData);
      setTotalInvested(totalInvestedAmount);
      setTotalValue(totalCurrentValue);
      setTotalReturn(totalReturnAmount);
      setTotalReturnPct(totalReturnPercentage);
      
    } catch (error) {
      console.error('Fetch investments error:', error);
      Alert.alert('Error', 'Failed to load investments');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchInvestments();
    }, [fetchInvestments])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchInvestments();
  }, [fetchInvestments]);

  // Refresh single investment
  const refreshInvestment = async (id) => {
    try {
      await ApiService.refreshInvestment(id);
      Alert.alert('Success', 'Investment data refreshed');
      fetchInvestments();
    } catch (error) {
      console.error('Refresh error:', error);
      Alert.alert('Error', 'Failed to refresh investment');
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Investment name is required';
    }
    
    if (!formData.quantity || isNaN(formData.quantity) || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Valid quantity is required';
    }
    
    if (!formData.avg_buy_price || isNaN(formData.avg_buy_price) || Number(formData.avg_buy_price) <= 0) {
      newErrors.avg_buy_price = 'Valid average buy price is required';
    }
    
    if (formData.expected_annual_return && 
        (isNaN(formData.expected_annual_return) || Number(formData.expected_annual_return) < 0)) {
      newErrors.expected_annual_return = 'Valid expected return percentage required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      asset_type: 'stock',
      identifier: '',
      name: '',
      quantity: '',
      avg_buy_price: '',
      expected_annual_return: '',
      risk_level: 'medium',
      is_pinned: false
    });
    setErrors({});
    setSelectedInvestment(null);
  };

  // Add investment - CORRECTED FOR YOUR API
  const handleAddInvestment = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      // Prepare data exactly as API expects
      const investmentData = {
        asset_type: formData.asset_type,
        identifier: formData.identifier?.trim() || '',
        name: formData.name.trim(),
        quantity: Number(formData.quantity),
        avg_buy_price: Number(formData.avg_buy_price),
        expected_annual_return: formData.expected_annual_return ? Number(formData.expected_annual_return) : null,
        risk_level: formData.risk_level,
        is_pinned: formData.is_pinned
      };

      console.log('Creating investment:', investmentData);

      const response = await ApiService.createInvestment(investmentData);
      console.log('Investment created successfully:', response.data);
      
      setShowAddModal(false);
      resetForm();
      fetchInvestments();
      Alert.alert('Success', 'Investment added successfully');
      
    } catch (error) {
      console.error('Add investment error:', error.response?.data || error);
      
      // Show validation errors if available
      if (error.response?.data?.detail) {
        const apiErrors = error.response.data.detail;
        const errorMessages = apiErrors.map(err => 
          `${err.loc?.join('.')}: ${err.msg}`
        ).join('\n');
        Alert.alert('Validation Error', errorMessages);
      } else {
        Alert.alert('Error', error.message || 'Failed to add investment');
      }
    }
  };

  // Update investment
  const handleUpdateInvestment = async () => {
    try {
      if (!selectedInvestment) return;
      
      if (!validateForm()) {
        return;
      }

      const investmentData = {
        quantity: Number(formData.quantity),
        avg_buy_price: Number(formData.avg_buy_price),
        expected_annual_return: formData.expected_annual_return ? Number(formData.expected_annual_return) : null,
        risk_level: formData.risk_level,
        is_pinned: formData.is_pinned
      };

      console.log('Updating investment:', selectedInvestment.id, investmentData);

      await ApiService.updateInvestment(selectedInvestment.id, investmentData);
      
      setShowAddModal(false);
      resetForm();
      fetchInvestments();
      Alert.alert('Success', 'Investment updated successfully');
      
    } catch (error) {
      console.error('Update investment error:', error.response?.data || error);
      if (error.response?.data?.detail) {
        const apiErrors = error.response.data.detail;
        const errorMessages = apiErrors.map(err => err.msg).join('\n');
        Alert.alert('Validation Error', errorMessages);
      } else {
        Alert.alert('Error', 'Failed to update investment');
      }
    }
  };

  // Delete investment
  const handleDeleteInvestment = async () => {
    try {
      if (!selectedInvestment) return;
      
      // Since PATCH is for updates, we'll mark as deleted
      await ApiService.updateInvestment(selectedInvestment.id, { 
        ...selectedInvestment,
        is_pinned: false,
        // Add a deleted flag if your backend supports it
      });
      
      setShowDeleteModal(false);
      setSelectedInvestment(null);
      fetchInvestments();
      Alert.alert('Success', 'Investment removed successfully');
      
    } catch (error) {
      console.error('Delete investment error:', error);
      Alert.alert('Error', 'Failed to delete investment');
    }
  };

  // Open edit modal
  const openEditModal = (investment) => {
    setSelectedInvestment(investment);
    setFormData({
      asset_type: investment.asset_type || 'stock',
      identifier: investment.identifier || '',
      name: investment.name || '',
      quantity: investment.quantity?.toString() || '',
      avg_buy_price: investment.avg_buy_price?.toString() || '',
      expected_annual_return: investment.expected_annual_return?.toString() || '',
      risk_level: investment.risk_level || 'medium',
      is_pinned: investment.is_pinned || false
    });
    setShowAddModal(true);
  };

  // Open delete modal
  const openDeleteModal = (investment) => {
    setSelectedInvestment(investment);
    setShowDeleteModal(true);
  };

  // Filter investments
  const filteredInvestments = investments.filter(inv => {
    const matchesType = filterType === 'ALL' || inv.asset_type === filterType;
    const matchesSearch = !searchQuery || 
      inv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.identifier?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount || 0);

  const formatNumber = (num) =>
    new Intl.NumberFormat('en-IN', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 2 
    }).format(num || 0);

  const getAssetTypeInfo = (type) => {
    return assetTypes.find(t => t.value === type) || assetTypes.find(t => t.value === 'other');
  };

  const getRiskColor = (risk) => {
    const riskInfo = riskLevels.find(r => r.value === risk);
    return riskInfo?.color || '#64748b';
  };

  const getReturnColor = (returnPct) => {
    if (!returnPct) return '#64748b';
    return returnPct > 0 ? '#22c55e' : '#ef4444';
  };

  // Calculate investment value and returns
  const calculateInvestmentMetrics = (investment) => {
    const quantity = Number(investment.quantity) || 0;
    const avgPrice = Number(investment.avg_buy_price) || 0;
    const currentValue = Number(investment.current_value) || 0;
    
    const investedAmount = quantity * avgPrice;
    const actualValue = currentValue > 0 ? currentValue : investedAmount;
    const returnAmount = actualValue - investedAmount;
    const returnPercentage = investedAmount > 0 ? (returnAmount / investedAmount) * 100 : 0;
    
    return {
      investedAmount,
      currentValue: actualValue,
      returnAmount,
      returnPercentage
    };
  };

  if (loading && !investments.length) {
    return (
      <Theme name="dark">
        <LinearGradient
          colors={['#000000', '#0A0A0A', '#111111']}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner size="large" color="#EAB308" />
            <Text color="white" mt="$4">Loading portfolio...</Text>
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
            {/* HEADER */}
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
                  Portfolio
                </H2>
                <Text color="rgba(255,255,255,0.6)" fontSize={14}>
                  {investments.length} investments • {formatCurrency(totalValue)}
                </Text>
              </YStack>
              
              <TouchableOpacity 
                onPress={() => setShowAddModal(true)}
              >
                <LinearGradient
                  colors={['rgba(255, 191, 0, 1)', 'rgba(255, 191, 0, 1)']}
                                    
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth : 1,
                    borderColor : '#000000ff',
                  }}
                >
                  <Plus size={30} color='#000000ff' />
                </LinearGradient>
              </TouchableOpacity>
            </XStack>

            {/* PORTFOLIO SUMMARY */}
<LinearGradient
  colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.08)']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(234, 178, 8, 0.4)',
  }}
>
  {/* Title with Return Badge inline */}
  <XStack ai="center" jc="space-between" mb="$4">
    <Text color="rgba(255,255,255,0.7)" fontSize={16} fontWeight="600">
      PORTFOLIO SUMMARY
    </Text>
    
    <XStack 
      bg={getReturnColor(totalReturnPct)}
      px="$2.5" 
      py="$1" 
      borderRadius={8}
      ai="center"
    >
      {totalReturnPct > 0 ? (
        <TrendingUp size={14} color="white" />
      ) : (
        <TrendingDown size={14} color="white" />
      )}
      <Text color="white" fontSize={12} fontWeight="700" ml="$1">
        {totalReturnPct > 0 ? '+' : ''}{totalReturnPct.toFixed(1)}%
      </Text>
    </XStack>
  </XStack>
  
  {/* Main Portfolio Value - Centered */}
  <YStack ai="center" mb="$4">
    <H2 color="white" fontWeight="900" fontSize={40} mb="$1">
      {formatCurrency(totalValue)}
    </H2>
    <Text color="rgba(255,255,255,0.6)" fontSize={13}>
      Total Portfolio Value
    </Text>
  </YStack>
  
  {/* Returns Information - Centered */}
  <XStack ai="center" jc="center" space="$3" mb="$4">
    <Text color="rgba(255,255,255,0.6)" fontSize={13}>
      Returns:
    </Text>
    <Text color="white" fontSize={13} fontWeight="600">
      {formatCurrency(totalReturn)}
    </Text>
    
    <Text color="rgba(255,255,255,0.6)" fontSize={13}>
      Invested:
    </Text>
    <Text color="white" fontSize={13} fontWeight="600">
      {formatCurrency(totalInvested)}
    </Text>
  </XStack>
  
  {/* Stats Row - Evenly Spaced */}
  <XStack jc="space-between" mt="$4" pt="$4" borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)">
    <YStack ai="center" f={1}>
      <Text color="rgba(255,255,255,0.7)" fontSize={12} fontWeight="600" mb="$2">
        INVESTED
      </Text>
      <Text color="white" fontSize={18} fontWeight="800">{formatCurrency(totalInvested)}</Text>
    </YStack>
    
    <YStack ai="center" f={1}>
      <Text color="rgba(255,255,255,0.7)" fontSize={12} fontWeight="600" mb="$2">
        HOLDINGS
      </Text>
      <Text color="white" fontSize={18} fontWeight="800">{investments.length}</Text>
    </YStack>
    
    <YStack ai="center" f={1}>
      <Text color="rgba(255,255,255,0.7)" fontSize={12} fontWeight="600" mb="$2">
        CURRENT VALUE
      </Text>
      <Text color="white" fontSize={18} fontWeight="800">{formatCurrency(totalValue)}</Text>
    </YStack>
  </XStack>
</LinearGradient>
  

            {/* INVESTMENTS LIST */}
            <YStack space="$3">
              {filteredInvestments.length > 0 ? (
                filteredInvestments.map((investment, index) => {
                  const metrics = calculateInvestmentMetrics(investment);
                  const assetInfo = getAssetTypeInfo(investment.asset_type);
                  
                  return (
                    <TouchableOpacity 
                      key={investment.id || index}
                      activeOpacity={0.9}
                      onPress={() => openEditModal(investment)}
                    >
                      <LinearGradient
                        colors={['rgba(40, 40, 40, 0.2)', 'rgba(20, 20, 20, 0.8)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                          padding: 16,
                          borderRadius: 16,
                          borderWidth: 1,
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <XStack jc="space-between" ai="center" mb="$3">
                          <XStack ai="center" space="$3" f={1}>
                            <LinearGradient
                              colors={[assetInfo.color, assetInfo.color + 'DD']}
                              style={{
                                width: 44,
                                height: 44,
                                borderRadius: 12,
                                justifyContent: 'center',
                                alignItems: 'center',
                                shadowColor: assetInfo.color,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                shadowRadius: 4,
                                elevation: 4,
                              }}
                            >
                              {assetInfo.icon}
                            </LinearGradient>
                            
                            <YStack f={1}>
                              <Text color="white" fontWeight="800" fontSize={16} numberOfLines={1}>
                                {investment.name}
                              </Text>
                              <XStack ai="center" space="$2">
                                <Text color="rgba(255,255,255,0.6)" fontSize={12}>
                                  {investment.identifier || assetInfo.label}
                                </Text>
                                {investment.is_pinned && (
                                  <CheckCircle size={12} color="#EAB308" />
                                )}
                              </XStack>
                            </YStack>
                          </XStack>
                          
                          <YStack ai="flex-end">
                            <Text color="white" fontWeight="800" fontSize={16}>
                              {formatCurrency(metrics.currentValue)}
                            </Text>
                            <XStack ai="center" space="$1">
                              <Text color={getReturnColor(metrics.returnPercentage)} fontSize={11} fontWeight="700">
                                {metrics.returnPercentage > 0 ? '+' : ''}{metrics.returnPercentage.toFixed(1)}%
                              </Text>
                            </XStack>
                          </YStack>
                        </XStack>
                        
                        <XStack jc="space-between" ai="center">
                          <XStack ai="center" space="$4">
                            <XStack ai="center" space="$1">
                              <Text color="rgba(255,255,255,0.5)" fontSize={11}>
                                {investment.quantity} units
                              </Text>
                            </XStack>
                            
                            <XStack ai="center" space="$1">
                              <Text color="rgba(255,255,255,0.5)" fontSize={11}>
                                ₹{formatNumber(investment.avg_buy_price)} avg
                              </Text>
                            </XStack>
                            
                            {investment.risk_level && (
                              <XStack 
                                bg={getRiskColor(investment.risk_level)}
                                px="$1.5" 
                                py="$0.5" 
                                br="$1"
                              >
                                <Text color="white" fontSize={10} fontWeight="700">
                                  {investment.risk_level.toUpperCase()}
                                </Text>
                              </XStack>
                            )}
                          </XStack>
                          
                          <XStack ai="center" space="$2">
                            <TouchableOpacity
                              onPress={(e) => {
                                e.stopPropagation();
                                refreshInvestment(investment.id);
                              }}
                              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                              <RefreshCw size={16} color="#3b82f6" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                              onPress={(e) => {
                                e.stopPropagation();
                                openDeleteModal(investment);
                              }}
                              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                              <Trash2 size={16} color="#ef4444" />
                            </TouchableOpacity>
                          </XStack>
                        </XStack>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <YStack ai="center" py="$8" space="$4">
                  <Wallet size={64} color="rgba(234, 179, 8, 0.3)" />
                  <Text color="rgba(255,255,255,0.6)" fontSize={16} textAlign="center">
                    {searchQuery || filterType !== 'ALL' 
                      ? 'No investments match your filters'
                      : 'No investments yet'}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setShowAddModal(true)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#EAB308', '#CA8A04']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        paddingHorizontal: 24,
                        paddingVertical: 12,
                        borderRadius: 12,
                      }}
                    >
                      <Text color="white" fontSize={14} fontWeight="700">Add First Investment</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </YStack>
              )}
            </YStack>

            {/* BOTTOM PADDING */}
            <YStack h={40} />
          </ScrollView>
        </SafeAreaView>

        {/* ADD/EDIT INVESTMENT MODAL */}
        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
        >
          <BlurView intensity={90} style={{ flex: 1, justifyContent: 'flex-end' }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1, justifyContent: 'flex-end' }}
            >
              <LinearGradient
                colors={['#1a1a1a', '#0a0a0a']}
                style={{
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  padding: 24,
                  paddingBottom: insets.bottom + 20,
                  maxHeight: '90%',
                }}
              >
                <XStack jc="space-between" ai="center" mb="$6">
                  <H4 color="white" fontWeight="800" fontSize={20}>
                    {selectedInvestment ? 'Edit Investment' : 'Add Investment'}
                  </H4>
                  <TouchableOpacity onPress={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}>
                    <X size={24} color="rgba(255,255,255,0.5)" />
                  </TouchableOpacity>
                </XStack>

                <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
                  <YStack space="$4">
                    {/* Asset Type */}
                    <YStack>
                      <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
                        Asset Type
                      </Text>
                      <Select
                        value={formData.asset_type}
                        onValueChange={(value) => setFormData({...formData, asset_type: value})}
                        backgroundColor="rgba(255,255,255,0.1)"
                        borderColor="rgba(255,255,255,0.2)"
                        color="white"
                      >
                        <Select.Trigger>
                          <Select.Value placeholder="Select type" />
                        </Select.Trigger>
                        <Select.Content>
                          {assetTypes.map((type, index) => (
                            <Select.Item key={type.value} value={type.value} index={index}>
                              <Select.ItemText>{type.label}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select>
                    </YStack>
                    
                    {/* Name */}
                    <YStack>
                      <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
                        Investment Name *
                      </Text>
                      <Input
                        placeholder="e.g., Apple Stocks, HDFC Mutual Fund"
                        value={formData.name}
                        onChangeText={(text) => setFormData({...formData, name: text})}
                        backgroundColor="rgba(255,255,255,0.1)"
                        borderColor={errors.name ? '#ef4444' : 'rgba(255,255,255,0.2)'}
                        color="white"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        fontSize={16}
                        h={48}
                        editable={!selectedInvestment}
                      />
                      {errors.name && (
                        <Text color="#ef4444" fontSize={12} mt="$1">{errors.name}</Text>
                      )}
                    </YStack>
                    
                    {/* Identifier */}
                    <YStack>
                      <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
                        Identifier / Ticker (Optional)
                      </Text>
                      <Input
                        placeholder="e.g., AAPL, INF174K01ZR2"
                        value={formData.identifier}
                        onChangeText={(text) => setFormData({...formData, identifier: text})}
                        backgroundColor="rgba(255,255,255,0.1)"
                        borderColor="rgba(255,255,255,0.2)"
                        color="white"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        fontSize={16}
                        h={48}
                      />
                    </YStack>
                    
                    {/* Quantity & Average Price */}
                    <XStack space="$4">
                      <YStack f={1}>
                        <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
                          Quantity *
                        </Text>
                        <Input
                          placeholder="e.g., 10"
                          value={formData.quantity}
                          onChangeText={(text) => setFormData({...formData, quantity: text})}
                          backgroundColor="rgba(255,255,255,0.1)"
                          borderColor={errors.quantity ? '#ef4444' : 'rgba(255,255,255,0.2)'}
                          color="white"
                          placeholderTextColor="rgba(255,255,255,0.4)"
                          keyboardType="decimal-pad"
                          fontSize={16}
                          h={48}
                        />
                        {errors.quantity && (
                          <Text color="#ef4444" fontSize={12} mt="$1">{errors.quantity}</Text>
                        )}
                      </YStack>
                      
                      <YStack f={1}>
                        <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
                          Avg. Buy Price (₹) *
                        </Text>
                        <Input
                          placeholder="e.g., 1500"
                          value={formData.avg_buy_price}
                          onChangeText={(text) => setFormData({...formData, avg_buy_price: text})}
                          backgroundColor="rgba(255,255,255,0.1)"
                          borderColor={errors.avg_buy_price ? '#ef4444' : 'rgba(255,255,255,0.2)'}
                          color="white"
                          placeholderTextColor="rgba(255,255,255,0.4)"
                          keyboardType="decimal-pad"
                          fontSize={16}
                          h={48}
                        />
                        {errors.avg_buy_price && (
                          <Text color="#ef4444" fontSize={12} mt="$1">{errors.avg_buy_price}</Text>
                        )}
                      </YStack>
                    </XStack>
                    
                    {/* Expected Return & Risk Level */}
                    <XStack space="$4">
                      <YStack f={1}>
                        <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
                          Expected Return %
                        </Text>
                        <Input
                          placeholder="e.g., 12"
                          value={formData.expected_annual_return}
                          onChangeText={(text) => setFormData({...formData, expected_annual_return: text})}
                          backgroundColor="rgba(255,255,255,0.1)"
                          borderColor={errors.expected_annual_return ? '#ef4444' : 'rgba(255,255,255,0.2)'}
                          color="white"
                          placeholderTextColor="rgba(255,255,255,0.4)"
                          keyboardType="decimal-pad"
                          fontSize={16}
                          h={48}
                        />
                        {errors.expected_annual_return && (
                          <Text color="#ef4444" fontSize={12} mt="$1">{errors.expected_annual_return}</Text>
                        )}
                      </YStack>
                      
                      <YStack f={1}>
                        <Text color="rgba(255,255,255,0.7)" fontSize={13} fontWeight="600" mb="$2">
                          Risk Level
                        </Text>
                        <Select
                          value={formData.risk_level}
                          onValueChange={(value) => setFormData({...formData, risk_level: value})}
                          backgroundColor="rgba(255,255,255,0.1)"
                          borderColor="rgba(255,255,255,0.2)"
                          color="white"
                        >
                          <Select.Trigger>
                            <Select.Value placeholder="Select risk" />
                          </Select.Trigger>
                          <Select.Content>
                            {riskLevels.map((risk, index) => (
                              <Select.Item key={risk.value} value={risk.value} index={index}>
                                <Select.ItemText>{risk.label}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select>
                      </YStack>
                    </XStack>
                    
                    {/* Pin to Dashboard */}
                    <XStack ai="center" jc="space-between" mt="$2" p="$3" bg="rgba(255,255,255,0.05)" br="$3">
                      <Text color="white" fontSize={14}>Pin to Dashboard</Text>
                      <Switch
                        checked={formData.is_pinned}
                        onCheckedChange={(checked) => setFormData({...formData, is_pinned: checked})}
                        backgroundColor={formData.is_pinned ? '#EAB308' : 'rgba(255,255,255,0.2)'}
                      >
                        <Switch.Thumb animation="quick" />
                      </Switch>
                    </XStack>
                  </YStack>
                </ScrollView>

                <XStack space="$3" mt="$6">
                  <TouchableOpacity
                    onPress={selectedInvestment ? handleUpdateInvestment : handleAddInvestment}
                    activeOpacity={0.8}
                    style={{ flex: 1 }}
                  >
                    <LinearGradient
                      colors={selectedInvestment ? ['#3b82f6', '#2563eb'] : ['#EAB308', '#CA8A04']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        paddingVertical: 16,
                        borderRadius: 12,
                        alignItems: 'center',
                        shadowColor: selectedInvestment ? '#3b82f6' : '#EAB308',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 4,
                      }}
                    >
                      <Text color="white" fontSize={16} fontWeight="700">
                        {selectedInvestment ? 'Update Investment' : 'Add Investment'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    activeOpacity={0.8}
                    style={{ flex: 1 }}
                  >
                    <LinearGradient
                      colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        paddingVertical: 16,
                        borderRadius: 12,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.2)',
                      }}
                    >
                      <Text color="white" fontSize={16} fontWeight="700">Cancel</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </XStack>
              </LinearGradient>
            </KeyboardAvoidingView>
          </BlurView>
        </Modal>

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
                <AlertTriangle size={48} color="#ef4444" />
              </XStack>
              
              <Text color="white" fontWeight="700" fontSize={18} textAlign="center" mb="$2">
                Remove Investment
              </Text>
              
              <Text color="rgba(255,255,255,0.7)" fontSize={14} textAlign="center" mb="$6">
                Are you sure you want to remove "{selectedInvestment?.name}" from your portfolio?
              </Text>
              
              <XStack space="$3">
                <TouchableOpacity
                  onPress={handleDeleteInvestment}
                  activeOpacity={0.8}
                  style={{ flex: 1 }}
                >
                  <LinearGradient
                    colors={['#ef4444', '#dc2626']}
                    style={{
                      paddingVertical: 14,
                      borderRadius: 12,
                      alignItems: 'center',
                    }}
                  >
                    <Text color="white" fontSize={14} fontWeight="700">Remove</Text>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => setShowDeleteModal(false)}
                  activeOpacity={0.8}
                  style={{ flex: 1 }}
                >
                  <LinearGradient
                    colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                    style={{
                      paddingVertical: 14,
                      borderRadius: 12,
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: 'rgba(255,255,255,0.2)',
                    }}
                  >
                    <Text color="white" fontSize={14} fontWeight="700">Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </XStack>
            </LinearGradient>
          </BlurView>
        </Modal>
      </LinearGradient>
    </Theme>
  );
}
