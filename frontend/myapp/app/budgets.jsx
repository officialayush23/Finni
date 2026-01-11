// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import { 
// // // //   FlatList, Modal, Alert, RefreshControl, KeyboardAvoidingView, 
// // // //   Platform, TouchableOpacity, StyleSheet, ScrollView 
// // // // } from 'react-native';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // import { YStack, XStack, Text, Button, Input, Theme, Card, Spinner, View, Switch } from 'tamagui';
// // // // import { Plus, ArrowLeft, Target, X, CheckCircle } from '@tamagui/lucide-icons';
// // // // import { useRouter } from 'expo-router';
// // // // import { api } from '../services/api'; 

// // // // const PERIODS = ['weekly', 'monthly', 'yearly'];

// // // // export default function BudgetScreen() {
// // // //   const router = useRouter();
  
// // // //   // Data State
// // // //   const [budgets, setBudgets] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
  
// // // //   // UI State
// // // //   const [modalVisible, setModalVisible] = useState(false);
// // // //   const [submitting, setSubmitting] = useState(false);

// // // //   // Form State
// // // //   const [editingId, setEditingId] = useState(null); 
// // // //   const [name, setName] = useState('');
// // // //   const [limit, setLimit] = useState('');
// // // //   const [period, setPeriod] = useState('monthly');

// // // //   // --- 1. FETCH BUDGETS (GET) ---
// // // //   const fetchBudgets = useCallback(async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const response = await api.get('/api/v1/budgets/');
// // // //       setBudgets(response.data);
// // // //     } catch (error) {
// // // //       console.error("Fetch Error:", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchBudgets();
// // // //   }, [fetchBudgets]);

// // // //   // --- 2. TOGGLE STATUS (PATCH) ---
// // // //   const toggleActive = async (id, currentStatus) => {
// // // //     const newStatus = !currentStatus;
// // // //     // Optimistic UI
// // // //     setBudgets(prev => prev.map(b => b.id === id ? { ...b, is_active: newStatus } : b));
    
// // // //     try {
// // // //       await api.patch(`/api/v1/budgets/${id}`, { is_active: newStatus });
// // // //     } catch (e) {
// // // //       Alert.alert("Sync Error", "Failed to update status.");
// // // //       fetchBudgets(); // Revert
// // // //     }
// // // //   };

// // // //   // --- 3. OPEN MODAL (CREATE OR EDIT) ---
// // // //   const openModal = (budget = null) => {
// // // //     if (budget) {
// // // //       setEditingId(budget.id);
// // // //       setName(budget.name);
// // // //       setLimit(budget.limit_amount.toString());
// // // //       setPeriod(budget.period);
// // // //     } else {
// // // //       setEditingId(null);
// // // //       setName('');
// // // //       setLimit('');
// // // //       setPeriod('monthly');
// // // //     }
// // // //     setModalVisible(true);
// // // //   };

// // // //   // --- 4. SAVE (POST OR PATCH) ---
// // // //   const handleSave = async () => {
// // // //     if (!name || !limit) {
// // // //       Alert.alert("Error", "Please fill all fields");
// // // //       return;
// // // //     }

// // // //     setSubmitting(true);
// // // //     const payload = {
// // // //       name: name,
// // // //       limit_amount: parseFloat(limit),
// // // //       period: period,
// // // //       alert_threshold: 80,
// // // //     };

// // // //     try {
// // // //       if (editingId) {
// // // //         // UPDATE
// // // //         await api.patch(`/api/v1/budgets/${editingId}`, payload);
// // // //       } else {
// // // //         // CREATE
// // // //         await api.post('/api/v1/budgets/', { ...payload, included_category_ids: [] });
// // // //       }
// // // //       setModalVisible(false);
// // // //       fetchBudgets();
// // // //     } catch (error) {
// // // //       Alert.alert("Error", "Could not save budget.");
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   const formatCurrency = (val) => 
// // // //     new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <View style={styles.container}>
// // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
// // // //           <YStack px={20} f={1} space="$4">

// // // //             {/* HEADER */}
// // // //             <XStack jc="space-between" ai="center" py="$4">
// // // //               <TouchableOpacity onPress={() => router.back()} style={styles.navBtn}>
// // // //                 <ArrowLeft size={22} color="white" />
// // // //               </TouchableOpacity>
// // // //               <Text style={styles.headerTitle}>BUDGETS</Text>
// // // //               <TouchableOpacity onPress={() => openModal()} style={styles.addBtn}>
// // // //                 <Plus size={22} color="black" />
// // // //               </TouchableOpacity>
// // // //             </XStack>

// // // //             {/* LIST */}
// // // //             <FlatList
// // // //               data={budgets}
// // // //               keyExtractor={item => item.id}
// // // //               showsVerticalScrollIndicator={false}
// // // //               refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchBudgets} tintColor="#EAB308" />}
// // // //               contentContainerStyle={{ paddingBottom: 100 }}
// // // //               renderItem={({ item }) => (
// // // //                 <View style={[styles.budgetCard, !item.is_active && { opacity: 0.5 }]}>
// // // //                   <XStack jc="space-between" ai="center" mb="$4">
// // // //                     <TouchableOpacity onPress={() => openModal(item)} style={{ flex: 1 }}>
// // // //                       <XStack space="$3" ai="center">
// // // //                         <View style={styles.iconBox}>
// // // //                            <Target size={18} color="#EAB308" />
// // // //                         </View>
// // // //                         <YStack>
// // // //                           <Text color="white" fontWeight="800" fontSize={16}>{item.name}</Text>
// // // //                           <Text color="#555" fontSize={10} fontWeight="700">{item.period.toUpperCase()}</Text>
// // // //                         </YStack>
// // // //                       </XStack>
// // // //                     </TouchableOpacity>
                    
// // // //                     {/* ACTIVE TOGGLE */}
// // // //                     <Switch 
// // // //                       size="$1" 
// // // //                       checked={item.is_active} 
// // // //                       onCheckedChange={() => toggleActive(item.id, item.is_active)}
// // // //                     >
// // // //                       <Switch.Thumb animation="quick" bg="white" />
// // // //                     </Switch>
// // // //                   </XStack>

// // // //                   <XStack jc="space-between" mb="$2">
// // // //                      <Text color="#666" fontSize={11}>SPENT: <Text color="white">{formatCurrency(item.spent)}</Text></Text>
// // // //                      <Text color="#666" fontSize={11}>LIMIT: <Text color="white">{formatCurrency(item.limit_amount)}</Text></Text>
// // // //                   </XStack>

// // // //                   {/* PROGRESS BAR */}
// // // //                   <View style={styles.progressTrack}>
// // // //                     <View style={[styles.progressBar, { width: `${Math.min(item.percentage_used || 0, 100)}%` }]} />
// // // //                   </View>
// // // //                 </View>
// // // //               )}
// // // //             />
// // // //           </YStack>
// // // //         </SafeAreaView>

// // // //         {/* MODAL */}
// // // //         <Modal visible={modalVisible} animationType="slide" transparent>
// // // //           <View style={styles.modalOverlay}>
// // // //             <View style={styles.modalContent}>
// // // //                 <XStack jc="space-between" ai="center" mb="$6">
// // // //                     <Text style={styles.modalTitle}>{editingId ? 'EDIT BUDGET' : 'NEW BUDGET'}</Text>
// // // //                     <TouchableOpacity onPress={() => setModalVisible(false)}><X size={24} color="#666" /></TouchableOpacity>
// // // //                 </XStack>

// // // //                 <YStack space="$5">
// // // //                     <View>
// // // //                         <Text style={styles.label}>NAME</Text>
// // // //                         <Input value={name} onChangeText={setName} bg="black" color="white" borderColor="#222" h={50} />
// // // //                     </View>
// // // //                     <View>
// // // //                         <Text style={styles.label}>LIMIT (INR)</Text>
// // // //                         <Input value={limit} onChangeText={setLimit} keyboardType="numeric" bg="black" color="white" borderColor="#222" h={50} />
// // // //                     </View>
// // // //                     <YStack>
// // // //                         <Text style={styles.label}>PERIOD</Text>
// // // //                         <XStack gap="$2">
// // // //                             {PERIODS.map(p => (
// // // //                                 <TouchableOpacity 
// // // //                                   key={p} 
// // // //                                   onPress={() => setPeriod(p)} 
// // // //                                   style={[styles.chip, period === p && styles.activeChip]}
// // // //                                 >
// // // //                                     <Text style={[styles.chipText, period === p && {color: 'black'}]}>{p.toUpperCase()}</Text>
// // // //                                 </TouchableOpacity>
// // // //                             ))}
// // // //                         </XStack>
// // // //                     </YStack>

// // // //                     <Button bg="#EAB308" color="black" h={55} fontWeight="900" mt="$4" onPress={handleSave} disabled={submitting}>
// // // //                         {submitting ? <Spinner color="black" /> : editingId ? "UPDATE" : "CREATE"}
// // // //                     </Button>
// // // //                 </YStack>
// // // //             </View>
// // // //           </View>
// // // //         </Modal>
// // // //       </View>
// // // //     </Theme>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1, backgroundColor: '#000' },
// // // //   headerTitle: { color: 'white', fontWeight: '900', fontSize: 13, letterSpacing: 2 },
// // // //   navBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
// // // //   addBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EAB308', justifyContent: 'center', alignItems: 'center' },
// // // //   budgetCard: { backgroundColor: '#0A0A0A', borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#1A1A1A' },
// // // //   iconBox: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
// // // //   progressTrack: { height: 6, backgroundColor: '#111', borderRadius: 3, marginTop: 10, overflow: 'hidden' },
// // // //   progressBar: { height: '100%', backgroundColor: '#EAB308', borderRadius: 3 },
// // // //   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
// // // //   modalContent: { backgroundColor: '#0A0A0A', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 50, borderTopWidth: 1, borderColor: '#1A1A1A' },
// // // //   modalTitle: { color: 'white', fontWeight: '900', fontSize: 16 },
// // // //   label: { color: '#444', fontSize: 10, fontWeight: '800', marginBottom: 8 },
// // // //   chip: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: '#111', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
// // // //   activeChip: { backgroundColor: '#EAB308', borderColor: '#EAB308' },
// // // //   chipText: { color: '#666', fontSize: 10, fontWeight: '800' }
// // // // });


// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import {
// // //   ScrollView,
// // //   TouchableOpacity,
// // //   Alert,
// // //   Modal,
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
// // //   Progress,
// // //   Sheet
// // // } from 'tamagui';
// // // import {
// // //   ArrowLeft,
// // //   Plus,
// // //   PieChart,
// // //   DollarSign,
// // //   Calendar,
// // //   Edit3,
// // //   Trash2,
// // //   X,
// // //   AlertTriangle,
// // //   CheckCircle,
// // //   Circle,
// // //   Target,
// // //   ShoppingBag,
// // //   Utensils,
// // //   Car,
// // //   Home,
// // //   Heart,
// // //   BookOpen,
// // //   Zap
// // // } from '@tamagui/lucide-icons';
// // // import { useRouter, useFocusEffect } from 'expo-router';
// // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // import { ApiService } from '../services/apiService';

// // // export default function Budgets() {
// // //   const router = useRouter();
// // //   const insets = useSafeAreaInsets();
  
// // //   // State
// // //   const [budgets, setBudgets] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [showAddModal, setShowAddModal] = useState(false);
// // //   const [selectedBudget, setSelectedBudget] = useState(null);
// // //   const [updating, setUpdating] = useState(false);
  
// // //   // Form state
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     limit_amount: '',
// // //     period: 'monthly',
// // //     alert_threshold: 80,
// // //     included_category_ids: [],
// // //     excluded_category_ids: [],
// // //     excluded_merchants: []
// // //   });

// // //   // Period options
// // //   const periodOptions = [
// // //     { value: 'daily', label: 'Daily', icon: <Zap size={14} /> },
// // //     { value: 'weekly', label: 'Weekly', icon: <Calendar size={14} /> },
// // //     { value: 'monthly', label: 'Monthly', icon: <Calendar size={14} /> },
// // //     { value: 'yearly', label: 'Yearly', icon: <Target size={14} /> }
// // //   ];

// // //   // Category icons mapping
// // //   const categoryIcons = {
// // //     'Eating out': <Utensils size={20} />,
// // //     'Eat': <Utensils size={20} />,
// // //     'Dining': <Utensils size={20} />,
// // //     'Daily Food': <Utensils size={20} />,
// // //     'Shopping': <ShoppingBag size={20} />,
// // //     'Cycle': <Car size={20} />,
// // //     'Hike': <Heart size={20} />,
// // //     'default': <PieChart size={20} />
// // //   };

// // //   // Fetch budgets
// // //   const fetchBudgets = useCallback(async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await ApiService.get('/budgets/');
// // //       setBudgets(response.data || []);
// // //     } catch (error) {
// // //       console.error('Fetch budgets error:', error);
// // //       Alert.alert('Error', 'Failed to load budgets');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useFocusEffect(
// // //     useCallback(() => {
// // //       fetchBudgets();
// // //     }, [fetchBudgets])
// // //   );

// // //   // Calculate totals
// // //   const totalBudgetLimit = budgets.reduce((total, budget) => {
// // //     if (budget.is_active) {
// // //       return total + (Number(budget.limit_amount) || 0);
// // //     }
// // //     return total;
// // //   }, 0);

// // //   const totalSpent = budgets.reduce((total, budget) => {
// // //     if (budget.is_active) {
// // //       return total + (Number(budget.spent) || 0);
// // //     }
// // //     return total;
// // //   }, 0);

// // //   const totalRemaining = budgets.reduce((total, budget) => {
// // //     if (budget.is_active) {
// // //       return total + (Number(budget.remaining) || 0);
// // //     }
// // //     return total;
// // //   }, 0);

// // //   const activeBudgets = budgets.filter(budget => budget.is_active).length;

// // //   // Add budget
// // //   const handleAddBudget = async () => {
// // //     try {
// // //       if (!formData.name || !formData.limit_amount) {
// // //         Alert.alert('Error', 'Please fill all required fields');
// // //         return;
// // //       }

// // //       const budgetData = {
// // //         name: formData.name.trim(),
// // //         limit_amount: parseFloat(formData.limit_amount),
// // //         period: formData.period,
// // //         alert_threshold: formData.alert_threshold,
// // //         included_category_ids: formData.included_category_ids,
// // //         excluded_category_ids: formData.excluded_category_ids,
// // //         excluded_merchants: formData.excluded_merchants
// // //       };

// // //       await ApiService.post('/budgets/', budgetData);
      
// // //       setShowAddModal(false);
// // //       resetForm();
// // //       fetchBudgets();
// // //       Alert.alert('Success', 'Budget added successfully');
      
// // //     } catch (error) {
// // //       console.error('Add budget error:', error);
// // //       Alert.alert('Error', 'Failed to add budget');
// // //     }
// // //   };

// // //   // Update budget
// // //   const handleUpdateBudget = async (id) => {
// // //     try {
// // //       setUpdating(true);
      
// // //       const updateData = {
// // //         name: formData.name.trim(),
// // //         limit_amount: parseFloat(formData.limit_amount),
// // //         period: formData.period,
// // //         alert_threshold: formData.alert_threshold,
// // //         included_category_ids: formData.included_category_ids,
// // //         excluded_category_ids: formData.excluded_category_ids,
// // //         excluded_merchants: formData.excluded_merchants
// // //       };

// // //       await ApiService.patch(`/budgets/${id}`, updateData);
      
// // //       setShowAddModal(false);
// // //       setSelectedBudget(null);
// // //       resetForm();
// // //       fetchBudgets();
// // //       Alert.alert('Success', 'Budget updated successfully');
      
// // //     } catch (error) {
// // //       console.error('Update budget error:', error);
// // //       Alert.alert('Error', 'Failed to update budget');
// // //     } finally {
// // //       setUpdating(false);
// // //     }
// // //   };

// // //   // Toggle budget active status
// // //   const handleToggleActive = async (budget) => {
// // //     try {
// // //       const newStatus = !budget.is_active;
      
// // //       await ApiService.patch(`/budgets/${budget.id}`, {
// // //         is_active: newStatus
// // //       });
      
// // //       fetchBudgets();
// // //       Alert.alert('Success', `Budget ${newStatus ? 'activated' : 'deactivated'}`);
      
// // //     } catch (error) {
// // //       console.error('Toggle active error:', error);
// // //       Alert.alert('Error', 'Failed to update budget status');
// // //     }
// // //   };

// // //   // Delete budget
// // //   const handleDeleteBudget = async (budget) => {
// // //     Alert.alert(
// // //       'Delete Budget',
// // //       'Are you sure you want to delete this budget?',
// // //       [
// // //         { text: 'Cancel', style: 'cancel' },
// // //         { 
// // //           text: 'Delete', 
// // //           style: 'destructive',
// // //           onPress: async () => {
// // //             try {
// // //               await ApiService.patch(`/budgets/${budget.id}`, {
// // //                 is_active: false
// // //               });
              
// // //               fetchBudgets();
// // //               Alert.alert('Success', 'Budget deleted');
// // //             } catch (error) {
// // //               console.error('Delete error:', error);
// // //               Alert.alert('Error', 'Failed to delete budget');
// // //             }
// // //           }
// // //         }
// // //       ]
// // //     );
// // //   };

// // //   // Reset form
// // //   const resetForm = () => {
// // //     setFormData({
// // //       name: '',
// // //       limit_amount: '',
// // //       period: 'monthly',
// // //       alert_threshold: 80,
// // //       included_category_ids: [],
// // //       excluded_category_ids: [],
// // //       excluded_merchants: []
// // //     });
// // //     setSelectedBudget(null);
// // //     setUpdating(false);
// // //   };

// // //   // Open edit modal
// // //   const openEditModal = (budget) => {
// // //     setSelectedBudget(budget);
// // //     setFormData({
// // //       name: budget.name || '',
// // //       limit_amount: budget.limit_amount?.toString() || '',
// // //       period: budget.period || 'monthly',
// // //       alert_threshold: budget.alert_threshold || 80,
// // //       included_category_ids: budget.included_category_ids || [],
// // //       excluded_category_ids: budget.excluded_category_ids || [],
// // //       excluded_merchants: budget.excluded_merchants || []
// // //     });
// // //     setShowAddModal(true);
// // //   };

// // //   // Format currency
// // //   const formatCurrency = (amount) =>
// // //     new Intl.NumberFormat('en-US', { 
// // //       style: 'currency', 
// // //       currency: 'USD',
// // //       minimumFractionDigits: 0,
// // //       maximumFractionDigits: 0
// // //     }).format(amount || 0);

// // //   // Get period label
// // //   const getPeriodLabel = (period) => {
// // //     const option = periodOptions.find(p => p.value === period);
// // //     return option?.label || period;
// // //   };

// // //   // Get period icon
// // //   const getPeriodIcon = (period) => {
// // //     const option = periodOptions.find(p => p.value === period);
// // //     return option?.icon || <Calendar size={16} />;
// // //   };

// // //   // Get category icon
// // //   const getCategoryIcon = (name) => {
// // //     return categoryIcons[name] || categoryIcons.default;
// // //   };

// // //   // Get progress color based on usage
// // //   const getProgressColor = (percentage) => {
// // //     if (percentage >= 100) return '#EF4444'; // Red for exceeded
// // //     if (percentage >= 80) return '#F59E0B'; // Orange for warning
// // //     return '#22C55E'; // Green for good
// // //   };

// // //   // Get alert status
// // //   const getAlertStatus = (budget) => {
// // //     if (budget.percentage_used >= 100) return { text: 'Exceeded', color: '#EF4444' };
// // //     if (budget.percentage_used >= budget.alert_threshold) return { text: 'Near Limit', color: '#F59E0B' };
// // //     return { text: 'On Track', color: '#22C55E' };
// // //   };

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
// // //               Budgets
// // //             </H2>
// // //             <Text color="#666666" fontSize={14}>
// // //               Manage your spending limits
// // //             </Text>
// // //           </YStack>
          
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

// // //         {/* SUMMARY CARDS */}
// // //         <ScrollView 
// // //           horizontal 
// // //           showsHorizontalScrollIndicator={false}
// // //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
// // //         >
// // //           <XStack space={12}>
// // //             {/* Total Limit */}
// // //             <Card backgroundColor="#1A1A1A" p={16} br={12} minWidth={160}>
// // //               <YStack>
// // //                 <Text color="#999999" fontSize={12} fontWeight="600" mb={8}>
// // //                   TOTAL LIMIT
// // //                 </Text>
// // //                 <Text color="#22C55E" fontSize={24} fontWeight="900" mb={4}>
// // //                   {formatCurrency(totalBudgetLimit)}
// // //                 </Text>
// // //                 <Text color="#666666" fontSize={12}>
// // //                   {activeBudgets} active budget{activeBudgets !== 1 ? 's' : ''}
// // //                 </Text>
// // //               </YStack>
// // //             </Card>

// // //             {/* Total Spent */}
// // //             <Card backgroundColor="#1A1A1A" p={16} br={12} minWidth={160}>
// // //               <YStack>
// // //                 <Text color="#999999" fontSize={12} fontWeight="600" mb={8}>
// // //                   TOTAL SPENT
// // //                 </Text>
// // //                 <Text color="#F59E0B" fontSize={24} fontWeight="900" mb={4}>
// // //                   {formatCurrency(totalSpent)}
// // //                 </Text>
// // //                 <Text color="#666666" fontSize={12}>
// // //                   {(totalSpent / totalBudgetLimit * 100 || 0).toFixed(1)}% used
// // //                 </Text>
// // //               </YStack>
// // //             </Card>

// // //             {/* Total Remaining */}
// // //             <Card backgroundColor="#1A1A1A" p={16} br={12} minWidth={160}>
// // //               <YStack>
// // //                 <Text color="#999999" fontSize={12} fontWeight="600" mb={8}>
// // //                   REMAINING
// // //                 </Text>
// // //                 <Text color="#8B5CF6" fontSize={24} fontWeight="900" mb={4}>
// // //                   {formatCurrency(totalRemaining)}
// // //                 </Text>
// // //                 <Text color="#666666" fontSize={12}>
// // //                   Available to spend
// // //                 </Text>
// // //               </YStack>
// // //             </Card>
// // //           </XStack>
// // //         </ScrollView>

// // //         {/* BUDGETS LIST */}
// // //         <ScrollView 
// // //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 100 }}
// // //           showsVerticalScrollIndicator={false}
// // //         >
// // //           {loading ? (
// // //             <YStack py={48} ai="center">
// // //               <Spinner size="large" color="#EAB308" />
// // //               <Text color="#666666" fontSize={14} mt={16}>
// // //                 Loading budgets...
// // //               </Text>
// // //             </YStack>
// // //           ) : budgets.length > 0 ? (
// // //             <YStack space={16}>
// // //               {budgets.map((budget, index) => (
// // //                 <Card 
// // //                   key={budget.id || index} 
// // //                   backgroundColor={budget.is_active ? '#1A1A1A' : '#111111'}
// // //                   p={16} 
// // //                   br={12}
// // //                   bw={1}
// // //                   bc={budget.is_active ? '#333333' : '#444444'}
// // //                 >
// // //                   <YStack space={12}>
// // //                     {/* Header */}
// // //                     <XStack jc="space-between" ai="center">
// // //                       <XStack ai="center" space={12}>
// // //                         <View style={{
// // //                           width: 40,
// // //                           height: 40,
// // //                           borderRadius: 20,
// // //                           backgroundColor: budget.is_active ? '#22C55E20' : '#444444',
// // //                           justifyContent: 'center',
// // //                           alignItems: 'center',
// // //                         }}>
// // //                           {getCategoryIcon(budget.name)}
// // //                         </View>
                        
// // //                         <YStack>
// // //                           <XStack ai="center" space={8}>
// // //                             <Text color="white" fontWeight="800" fontSize={16}>
// // //                               {budget.name}
// // //                             </Text>
// // //                             <Circle size={6} bg={budget.is_active ? '#22C55E' : '#EF4444'} />
// // //                           </XStack>
// // //                           <XStack ai="center" space={8} mt={2}>
// // //                             {React.cloneElement(getPeriodIcon(budget.period), { size: 12, color: '#666666' })}
// // //                             <Text color="#666666" fontSize={12}>
// // //                               {getPeriodLabel(budget.period)}
// // //                             </Text>
// // //                           </XStack>
// // //                         </YStack>
// // //                       </XStack>
                      
// // //                       <XStack space={12}>
// // //                         <TouchableOpacity 
// // //                           onPress={() => handleToggleActive(budget)}
// // //                           style={{
// // //                             padding: 6,
// // //                             borderRadius: 6,
// // //                             backgroundColor: budget.is_active ? '#22C55E20' : '#444444',
// // //                           }}
// // //                         >
// // //                           {budget.is_active ? 
// // //                             <CheckCircle size={16} color="#22C55E" /> : 
// // //                             <Circle size={16} color="#EF4444" />
// // //                           }
// // //                         </TouchableOpacity>
// // //                         <TouchableOpacity 
// // //                           onPress={() => openEditModal(budget)}
// // //                           style={{ padding: 6 }}
// // //                         >
// // //                           <Edit3 size={16} color="#666666" />
// // //                         </TouchableOpacity>
// // //                         <TouchableOpacity 
// // //                           onPress={() => handleDeleteBudget(budget)}
// // //                           style={{ padding: 6 }}
// // //                         >
// // //                           <Trash2 size={16} color="#EF4444" />
// // //                         </TouchableOpacity>
// // //                       </XStack>
// // //                     </XStack>

// // //                     {/* Progress Bar */}
// // //                     <YStack>
// // //                       <XStack jc="space-between" ai="center" mb={4}>
// // //                         <Text color="#999999" fontSize={12} fontWeight="600">
// // //                           Progress
// // //                         </Text>
// // //                         <Text color={getProgressColor(budget.percentage_used)} fontSize={12} fontWeight="700">
// // //                           {budget.percentage_used}%
// // //                         </Text>
// // //                       </XStack>
// // //                       <View style={{
// // //                         height: 6,
// // //                         backgroundColor: '#333333',
// // //                         borderRadius: 3,
// // //                         overflow: 'hidden',
// // //                       }}>
// // //                         <View style={{
// // //                           width: `${Math.min(budget.percentage_used, 100)}%`,
// // //                           height: '100%',
// // //                           backgroundColor: getProgressColor(budget.percentage_used),
// // //                           borderRadius: 3,
// // //                         }} />
// // //                       </View>
// // //                     </YStack>

// // //                     {/* Budget Details */}
// // //                     <XStack jc="space-between" ai="center">
// // //                       <YStack>
// // //                         <Text color="#999999" fontSize={11} fontWeight="600">
// // //                           LIMIT
// // //                         </Text>
// // //                         <Text color="white" fontSize={14} fontWeight="700" mt={2}>
// // //                           {formatCurrency(budget.limit_amount)}
// // //                         </Text>
// // //                       </YStack>
                      
// // //                       <YStack ai="center">
// // //                         <Text color="#999999" fontSize={11} fontWeight="600">
// // //                           SPENT
// // //                         </Text>
// // //                         <Text color="#F59E0B" fontSize={14} fontWeight="700" mt={2}>
// // //                           {formatCurrency(budget.spent)}
// // //                         </Text>
// // //                       </YStack>
                      
// // //                       <YStack ai="flex-end">
// // //                         <Text color="#999999" fontSize={11} fontWeight="600">
// // //                           REMAINING
// // //                         </Text>
// // //                         <Text color="#22C55E" fontSize={14} fontWeight="700" mt={2}>
// // //                           {formatCurrency(budget.remaining)}
// // //                         </Text>
// // //                       </YStack>
// // //                     </XStack>

// // //                     {/* Alert Status */}
// // //                     <XStack jc="space-between" ai="center" mt={4}>
// // //                       <XStack ai="center" space={4}>
// // //                         <AlertTriangle size={12} color={getAlertStatus(budget).color} />
// // //                         <Text color={getAlertStatus(budget).color} fontSize={11} fontWeight="600">
// // //                           {getAlertStatus(budget).text}
// // //                         </Text>
// // //                       </XStack>
// // //                       <Text color="#666666" fontSize={11}>
// // //                         Alert at {budget.alert_threshold}%
// // //                       </Text>
// // //                     </XStack>
// // //                   </YStack>
// // //                 </Card>
// // //               ))}
// // //             </YStack>
// // //           ) : (
// // //             <YStack ai="center" py={48}>
// // //               <View style={{
// // //                 width: 80,
// // //                 height: 80,
// // //                 borderRadius: 40,
// // //                 backgroundColor: '#1A1A1A',
// // //                 justifyContent: 'center',
// // //                 alignItems: 'center',
// // //                 marginBottom: 16,
// // //               }}>
// // //                 <PieChart size={32} color="#666666" />
// // //               </View>
// // //               <Text color="#666666" fontSize={18} fontWeight="600" mt={16}>
// // //                 No budgets yet
// // //               </Text>
// // //               <Text color="#444444" fontSize={14} mt={8} textAlign="center">
// // //                 Create your first budget to track spending
// // //               </Text>
// // //               <TouchableOpacity
// // //                 onPress={() => setShowAddModal(true)}
// // //                 style={{
// // //                   backgroundColor: '#EAB308',
// // //                   paddingHorizontal: 24,
// // //                   paddingVertical: 12,
// // //                   borderRadius: 8,
// // //                   marginTop: 20,
// // //                 }}
// // //               >
// // //                 <Text color="black" fontSize={14} fontWeight="700">
// // //                   Create Budget
// // //                 </Text>
// // //               </TouchableOpacity>
// // //             </YStack>
// // //           )}
// // //         </ScrollView>

// // //         {/* ADD/EDIT BUDGET MODAL */}
// // //         <Modal
// // //           visible={showAddModal}
// // //           animationType="slide"
// // //           transparent={true}
// // //           onRequestClose={() => {
// // //             setShowAddModal(false);
// // //             resetForm();
// // //           }}
// // //         >
// // //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
// // //             <View style={{ 
// // //               backgroundColor: '#1A1A1A', 
// // //               borderTopLeftRadius: 24, 
// // //               borderTopRightRadius: 24, 
// // //               padding: 24, 
// // //               paddingBottom: insets.bottom + 24,
// // //               maxHeight: '80%'
// // //             }}>
// // //               <XStack jc="space-between" ai="center" mb={24}>
// // //                 <H4 color="white" fontWeight="800" fontSize={20}>
// // //                   {selectedBudget ? 'Edit Budget' : 'Create Budget'}
// // //                 </H4>
// // //                 <TouchableOpacity 
// // //                   onPress={() => {
// // //                     setShowAddModal(false);
// // //                     resetForm();
// // //                   }}
// // //                   style={{ padding: 8 }}
// // //                 >
// // //                   <X size={24} color="#666666" />
// // //                 </TouchableOpacity>
// // //               </XStack>

// // //               <ScrollView showsVerticalScrollIndicator={false}>
// // //                 <YStack space={20}>
// // //                   {/* Name */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Budget Name *
// // //                     </Text>
// // //                     <Input
// // //                       placeholder="e.g., Groceries, Dining Out, Entertainment"
// // //                       value={formData.name}
// // //                       onChangeText={(text) => setFormData({...formData, name: text})}
// // //                       backgroundColor="#333333"
// // //                       borderColor="#444444"
// // //                       color="white"
// // //                       placeholderTextColor="#666666"
// // //                       fontSize={16}
// // //                       br={8}
// // //                     />
// // //                   </YStack>

// // //                   {/* Limit Amount */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Limit Amount *
// // //                     </Text>
// // //                     <Input
// // //                       placeholder="0"
// // //                       value={formData.limit_amount}
// // //                       onChangeText={(text) => setFormData({...formData, limit_amount: text})}
// // //                       backgroundColor="#333333"
// // //                       borderColor="#444444"
// // //                       color="white"
// // //                       placeholderTextColor="#666666"
// // //                       keyboardType="decimal-pad"
// // //                       fontSize={16}
// // //                       br={8}
// // //                       prefix={<Text color="#666666" mr={8}>$</Text>}
// // //                     />
// // //                   </YStack>

// // //                   {/* Period */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Period *
// // //                     </Text>
// // //                     <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
// // //                       {periodOptions.map(period => (
// // //                         <TouchableOpacity
// // //                           key={period.value}
// // //                           onPress={() => setFormData({...formData, period: period.value})}
// // //                           style={{
// // //                             flexDirection: 'row',
// // //                             alignItems: 'center',
// // //                             paddingHorizontal: 12,
// // //                             paddingVertical: 10,
// // //                             backgroundColor: formData.period === period.value ? '#EAB30820' : '#333333',
// // //                             borderRadius: 8,
// // //                             borderWidth: 1,
// // //                             borderColor: formData.period === period.value ? '#EAB308' : '#444444',
// // //                           }}
// // //                         >
// // //                           {React.cloneElement(period.icon, { 
// // //                             size: 14,
// // //                             color: formData.period === period.value ? '#EAB308' : '#666666'
// // //                           })}
// // //                           <Text 
// // //                             color={formData.period === period.value ? '#EAB308' : '#666666'} 
// // //                             fontSize={12} 
// // //                             fontWeight="700"
// // //                             ml={6}
// // //                           >
// // //                             {period.label}
// // //                           </Text>
// // //                         </TouchableOpacity>
// // //                       ))}
// // //                     </View>
// // //                   </YStack>

// // //                   {/* Alert Threshold */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Alert Threshold ({formData.alert_threshold}%)
// // //                     </Text>
// // //                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
// // //                       <View style={{ flex: 1 }}>
// // //                         <View style={{
// // //                           height: 6,
// // //                           backgroundColor: '#333333',
// // //                           borderRadius: 3,
// // //                           overflow: 'hidden',
// // //                         }}>
// // //                           <View style={{
// // //                             width: `${formData.alert_threshold}%`,
// // //                             height: '100%',
// // //                             backgroundColor: '#EAB308',
// // //                             borderRadius: 3,
// // //                           }} />
// // //                         </View>
// // //                       </View>
// // //                       <Text color="#EAB308" fontSize={12} fontWeight="700" minWidth={30}>
// // //                         {formData.alert_threshold}%
// // //                       </Text>
// // //                     </View>
// // //                     <Text color="#666666" fontSize={11} mt={4}>
// // //                       Get alerted when you reach this percentage of your budget
// // //                     </Text>
// // //                   </YStack>

// // //                   {/* Submit Button */}
// // //                   <TouchableOpacity
// // //                     onPress={selectedBudget ? () => handleUpdateBudget(selectedBudget.id) : handleAddBudget}
// // //                     disabled={updating}
// // //                     style={{
// // //                       backgroundColor: '#EAB308',
// // //                       padding: 16,
// // //                       borderRadius: 12,
// // //                       alignItems: 'center',
// // //                       marginTop: 8,
// // //                       opacity: updating ? 0.7 : 1,
// // //                     }}
// // //                   >
// // //                     {updating ? (
// // //                       <Spinner size="small" color="black" />
// // //                     ) : (
// // //                       <Text color="black" fontSize={16} fontWeight="800">
// // //                         {selectedBudget ? 'Update Budget' : 'Create Budget'}
// // //                       </Text>
// // //                     )}
// // //                   </TouchableOpacity>
// // //                 </YStack>
// // //               </ScrollView>
// // //             </View>
// // //           </View>
// // //         </Modal>
// // //       </SafeAreaView>
// // //     </Theme>
// // //   );
// // // }

import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
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
  Progress,
  Sheet
} from 'tamagui';
import {
  ArrowLeft,
  Plus,
  PieChart,
  DollarSign,
  Calendar,
  Edit3,
  Trash2,
  X,
  AlertTriangle,
  CheckCircle,
  Circle,
  Target,
  ShoppingBag,
  Utensils,
  Car,
  Home,
  Heart,
  BookOpen,
  Zap
} from '@tamagui/lucide-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ApiService } from '../services/apiService';

export default function Budgets() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [updating, setUpdating] = useState(false);
  
  // Form state - FIXED: Proper structure for API
  const [formData, setFormData] = useState({
    name: '',
    limit_amount: '',
    period: 'monthly',
    alert_threshold: 80,
    metadata: {
      included_category_ids: [],
      excluded_category_ids: [],
      excluded_merchants: []
    }
  });

  // Period options
  const periodOptions = [
    { value: 'daily', label: 'Daily', icon: <Zap size={14} /> },
    { value: 'weekly', label: 'Weekly', icon: <Calendar size={14} /> },
    { value: 'monthly', label: 'Monthly', icon: <Calendar size={14} /> },
    { value: 'yearly', label: 'Yearly', icon: <Target size={14} /> }
  ];

  // Category icons mapping
  const categoryIcons = {
    'Eating out': <Utensils size={20} />,
    'Eat': <Utensils size={20} />,
    'Dining': <Utensils size={20} />,
    'Daily Food': <Utensils size={20} />,
    'Shopping': <ShoppingBag size={20} />,
    'Cycle': <Car size={20} />,
    'Hike': <Heart size={20} />,
    'default': <PieChart size={20} />
  };

  // Fetch budgets
  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ApiService.get('/budgets/');
      setBudgets(response.data || []);
    } catch (error) {
      console.error('Fetch budgets error:', error);
      Alert.alert('Error', 'Failed to load budgets');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchBudgets();
    }, [fetchBudgets])
  );

  // Calculate totals
  const totalBudgetLimit = budgets.reduce((total, budget) => {
    if (budget.is_active) {
      return total + (Number(budget.limit_amount) || 0);
    }
    return total;
  }, 0);

  const totalSpent = budgets.reduce((total, budget) => {
    if (budget.is_active) {
      return total + (Number(budget.spent) || 0);
    }
    return total;
  }, 0);

  const totalRemaining = budgets.reduce((total, budget) => {
    if (budget.is_active) {
      return total + (Number(budget.remaining) || 0);
    }
    return total;
  }, 0);

  const activeBudgets = budgets.filter(budget => budget.is_active).length;

  // FIXED: Add budget with proper API structure
  const handleAddBudget = async () => {
    try {
      // Basic validation
      if (!formData.name || !formData.limit_amount) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      // Prepare data according to API structure
      const budgetData = {
        name: formData.name.trim(),
        limit_amount: parseFloat(formData.limit_amount),
        period: formData.period,
        alert_threshold: formData.alert_threshold,
        metadata: {
          included_category_ids: formData.metadata.included_category_ids,
          excluded_category_ids: formData.metadata.excluded_category_ids,
          excluded_merchants: formData.metadata.excluded_merchants
        }
      };

      console.log('Sending budget data:', budgetData);
      
      const response = await ApiService.post('/budgets/', budgetData);
      console.log('Budget created:', response.data);
      
      setShowAddModal(false);
      resetForm();
      fetchBudgets();
      
      Alert.alert('Success', 'Budget added successfully');
      
    } catch (error) {
      console.error('Add budget error:', error);
      
      // Show detailed error messages
      if (error.response?.status === 422 && error.response?.data?.detail) {
        const validationErrors = error.response.data.detail;
        const errorMessages = validationErrors.map(err => 
          `${err.loc?.join('.') || 'Field'}: ${err.msg}`
        ).join('\n\n');
        
        Alert.alert('Validation Error', errorMessages);
      } else if (error.response?.data?.detail) {
        Alert.alert('Error', JSON.stringify(error.response.data.detail));
      } else {
        Alert.alert('Error', error.message || 'Failed to add budget');
      }
    }
  };

  // FIXED: Update budget with proper API structure
  const handleUpdateBudget = async (id) => {
    try {
      setUpdating(true);
      
      // For PATCH, send direct properties (not nested in metadata)
      const updateData = {
        name: formData.name.trim(),
        limit_amount: parseFloat(formData.limit_amount),
        period: formData.period,
        alert_threshold: formData.alert_threshold,
        included_category_ids: formData.metadata.included_category_ids,
        excluded_category_ids: formData.metadata.excluded_category_ids,
        excluded_merchants: formData.metadata.excluded_merchants
      };

      console.log('Updating budget:', id, updateData);
      
      const response = await ApiService.patch(`/budgets/${id}`, updateData);
      console.log('Budget updated:', response.data);
      
      setShowAddModal(false);
      setSelectedBudget(null);
      resetForm();
      fetchBudgets();
      
      Alert.alert('Success', 'Budget updated successfully');
      
    } catch (error) {
      console.error('Update budget error:', error);
      
      if (error.response?.status === 422 && error.response?.data?.detail) {
        const validationErrors = error.response.data.detail;
        const errorMessages = validationErrors.map(err => 
          `${err.loc?.join('.') || 'Field'}: ${err.msg}`
        ).join('\n\n');
        
        Alert.alert('Validation Error', errorMessages);
      } else if (error.response?.data?.detail) {
        Alert.alert('Error', JSON.stringify(error.response.data.detail));
      } else {
        Alert.alert('Error', error.message || 'Failed to update budget');
      }
    } finally {
      setUpdating(false);
    }
  };

  // Toggle budget active status
  const handleToggleActive = async (budget) => {
    try {
      const newStatus = !budget.is_active;
      
      await ApiService.patch(`/budgets/${budget.id}`, {
        is_active: newStatus
      });
      
      fetchBudgets();
      Alert.alert('Success', `Budget ${newStatus ? 'activated' : 'deactivated'}`);
      
    } catch (error) {
      console.error('Toggle active error:', error);
      Alert.alert('Error', 'Failed to update budget status');
    }
  };

  // Delete budget
  const handleDeleteBudget = async (budget) => {
    Alert.alert(
      'Delete Budget',
      'Are you sure you want to delete this budget?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await ApiService.patch(`/budgets/${budget.id}`, {
                is_active: false
              });
              
              fetchBudgets();
              Alert.alert('Success', 'Budget deleted');
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Failed to delete budget');
            }
          }
        }
      ]
    );
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      limit_amount: '',
      period: 'monthly',
      alert_threshold: 80,
      metadata: {
        included_category_ids: [],
        excluded_category_ids: [],
        excluded_merchants: []
      }
    });
    setSelectedBudget(null);
    setUpdating(false);
  };

  // Open edit modal - FIXED: Properly handle metadata
  const openEditModal = (budget) => {
    setSelectedBudget(budget);
    setFormData({
      name: budget.name || '',
      limit_amount: budget.limit_amount?.toString() || '',
      period: budget.period || 'monthly',
      alert_threshold: budget.alert_threshold || 80,
      metadata: {
        included_category_ids: budget.metadata?.included_category_ids || [],
        excluded_category_ids: budget.metadata?.excluded_category_ids || [],
        excluded_merchants: budget.metadata?.excluded_merchants || []
      }
    });
    setShowAddModal(true);
  };

  // Format currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);

  // Get period label
  const getPeriodLabel = (period) => {
    const option = periodOptions.find(p => p.value === period);
    return option?.label || period;
  };

  // Get period icon
  const getPeriodIcon = (period) => {
    const option = periodOptions.find(p => p.value === period);
    return option?.icon || <Calendar size={16} />;
  };

  // Get category icon
  const getCategoryIcon = (name) => {
    return categoryIcons[name] || categoryIcons.default;
  };

  // Get progress color based on usage
  const getProgressColor = (percentage) => {
    if (percentage >= 100) return '#EF4444'; // Red for exceeded
    if (percentage >= 80) return '#F59E0B'; // Orange for warning
    return '#22C55E'; // Green for good
  };

  // Get alert status
  const getAlertStatus = (budget) => {
    if (budget.percentage_used >= 100) return { text: 'Exceeded', color: '#EF4444' };
    if (budget.percentage_used >= budget.alert_threshold) return { text: 'Near Limit', color: '#F59E0B' };
    return { text: 'On Track', color: '#22C55E' };
  };

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
              Budgets
            </H2>
            <Text color="#666666" fontSize={14}>
              Manage your spending limits
            </Text>
          </YStack>
          
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

        {/* SUMMARY CARDS */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
        >
          <XStack space={12}>
            {/* Total Limit */}
            <Card backgroundColor="#1A1A1A" p={16} br={12} minWidth={160}>
              <YStack>
                <Text color="#999999" fontSize={12} fontWeight="600" mb={8}>
                  TOTAL LIMIT
                </Text>
                <Text color="#22C55E" fontSize={24} fontWeight="900" mb={4}>
                  {formatCurrency(totalBudgetLimit)}
                </Text>
                <Text color="#666666" fontSize={12}>
                  {activeBudgets} active budget{activeBudgets !== 1 ? 's' : ''}
                </Text>
              </YStack>
            </Card>

            {/* Total Spent */}
            <Card backgroundColor="#1A1A1A" p={16} br={12} minWidth={160}>
              <YStack>
                <Text color="#999999" fontSize={12} fontWeight="600" mb={8}>
                  TOTAL SPENT
                </Text>
                <Text color="#F59E0B" fontSize={24} fontWeight="900" mb={4}>
                  {formatCurrency(totalSpent)}
                </Text>
                <Text color="#666666" fontSize={12}>
                  {(totalSpent / totalBudgetLimit * 100 || 0).toFixed(1)}% used
                </Text>
              </YStack>
            </Card>

            {/* Total Remaining */}
            <Card backgroundColor="#1A1A1A" p={16} br={12} minWidth={160}>
              <YStack>
                <Text color="#999999" fontSize={12} fontWeight="600" mb={8}>
                  REMAINING
                </Text>
                <Text color="#8B5CF6" fontSize={24} fontWeight="900" mb={4}>
                  {formatCurrency(totalRemaining)}
                </Text>
                <Text color="#666666" fontSize={12}>
                  Available to spend
                </Text>
              </YStack>
            </Card>
          </XStack>
        </ScrollView>

        {/* BUDGETS LIST */}
        <ScrollView 
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <YStack py={48} ai="center">
              <Spinner size="large" color="#EAB308" />
              <Text color="#666666" fontSize={14} mt={16}>
                Loading budgets...
              </Text>
            </YStack>
          ) : budgets.length > 0 ? (
            <YStack space={16}>
              {budgets.map((budget, index) => (
                <Card 
                  key={budget.id || index} 
                  backgroundColor={budget.is_active ? '#1A1A1A' : '#111111'}
                  p={16} 
                  br={12}
                  bw={1}
                  bc={budget.is_active ? '#333333' : '#444444'}
                >
                  <YStack space={12}>
                    {/* Header */}
                    <XStack jc="space-between" ai="center">
                      <XStack ai="center" space={12}>
                        <View style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: budget.is_active ? '#22C55E20' : '#444444',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          {getCategoryIcon(budget.name)}
                        </View>
                        
                        <YStack>
                          <XStack ai="center" space={8}>
                            <Text color="white" fontWeight="800" fontSize={16}>
                              {budget.name}
                            </Text>
                            <Circle size={6} bg={budget.is_active ? '#22C55E' : '#EF4444'} />
                          </XStack>
                          <XStack ai="center" space={8} mt={2}>
                            {React.cloneElement(getPeriodIcon(budget.period), { size: 12, color: '#666666' })}
                            <Text color="#666666" fontSize={12}>
                              {getPeriodLabel(budget.period)}
                            </Text>
                          </XStack>
                        </YStack>
                      </XStack>
                      
                      <XStack space={12}>
                        <TouchableOpacity 
                          onPress={() => handleToggleActive(budget)}
                          style={{
                            padding: 6,
                            borderRadius: 6,
                            backgroundColor: budget.is_active ? '#22C55E20' : '#444444',
                          }}
                        >
                          {budget.is_active ? 
                            <CheckCircle size={16} color="#22C55E" /> : 
                            <Circle size={16} color="#EF4444" />
                          }
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => openEditModal(budget)}
                          style={{ padding: 6 }}
                        >
                          <Edit3 size={16} color="#666666" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => handleDeleteBudget(budget)}
                          style={{ padding: 6 }}
                        >
                          <Trash2 size={16} color="#EF4444" />
                        </TouchableOpacity>
                      </XStack>
                    </XStack>

                    {/* Progress Bar */}
                    <YStack>
                      <XStack jc="space-between" ai="center" mb={4}>
                        <Text color="#999999" fontSize={12} fontWeight="600">
                          Progress
                        </Text>
                        <Text color={getProgressColor(budget.percentage_used)} fontSize={12} fontWeight="700">
                          {budget.percentage_used}%
                        </Text>
                      </XStack>
                      <View style={{
                        height: 6,
                        backgroundColor: '#333333',
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}>
                        <View style={{
                          width: `${Math.min(budget.percentage_used, 100)}%`,
                          height: '100%',
                          backgroundColor: getProgressColor(budget.percentage_used),
                          borderRadius: 3,
                        }} />
                      </View>
                    </YStack>

                    {/* Budget Details */}
                    <XStack jc="space-between" ai="center">
                      <YStack>
                        <Text color="#999999" fontSize={11} fontWeight="600">
                          LIMIT
                        </Text>
                        <Text color="white" fontSize={14} fontWeight="700" mt={2}>
                          {formatCurrency(budget.limit_amount)}
                        </Text>
                      </YStack>
                      
                      <YStack ai="center">
                        <Text color="#999999" fontSize={11} fontWeight="600">
                          SPENT
                        </Text>
                        <Text color="#F59E0B" fontSize={14} fontWeight="700" mt={2}>
                          {formatCurrency(budget.spent)}
                        </Text>
                      </YStack>
                      
                      <YStack ai="flex-end">
                        <Text color="#999999" fontSize={11} fontWeight="600">
                          REMAINING
                        </Text>
                        <Text color="#22C55E" fontSize={14} fontWeight="700" mt={2}>
                          {formatCurrency(budget.remaining)}
                        </Text>
                      </YStack>
                    </XStack>

                    {/* Alert Status */}
                    <XStack jc="space-between" ai="center" mt={4}>
                      <XStack ai="center" space={4}>
                        <AlertTriangle size={12} color={getAlertStatus(budget).color} />
                        <Text color={getAlertStatus(budget).color} fontSize={11} fontWeight="600">
                          {getAlertStatus(budget).text}
                        </Text>
                      </XStack>
                      <Text color="#666666" fontSize={11}>
                        Alert at {budget.alert_threshold}%
                      </Text>
                    </XStack>
                  </YStack>
                </Card>
              ))}
            </YStack>
          ) : (
            <YStack ai="center" py={48}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#1A1A1A',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16,
              }}>
                <PieChart size={32} color="#666666" />
              </View>
              <Text color="#666666" fontSize={18} fontWeight="600" mt={16}>
                No budgets yet
              </Text>
              <Text color="#444444" fontSize={14} mt={8} textAlign="center">
                Create your first budget to track spending
              </Text>
              <TouchableOpacity
                onPress={() => setShowAddModal(true)}
                style={{
                  backgroundColor: '#EAB308',
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 8,
                  marginTop: 20,
                }}
              >
                <Text color="black" fontSize={14} fontWeight="700">
                  Create Budget
                </Text>
              </TouchableOpacity>
            </YStack>
          )}
        </ScrollView>

        {/* ADD/EDIT BUDGET MODAL */}
        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
            <View style={{ 
              backgroundColor: '#1A1A1A', 
              borderTopLeftRadius: 24, 
              borderTopRightRadius: 24, 
              padding: 24, 
              paddingBottom: insets.bottom + 24,
              maxHeight: '80%'
            }}>
              <XStack jc="space-between" ai="center" mb={24}>
                <H4 color="white" fontWeight="800" fontSize={20}>
                  {selectedBudget ? 'Edit Budget' : 'Create Budget'}
                </H4>
                <TouchableOpacity 
                  onPress={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  style={{ padding: 8 }}
                >
                  <X size={24} color="#666666" />
                </TouchableOpacity>
              </XStack>

              <ScrollView showsVerticalScrollIndicator={false}>
                <YStack space={20}>
                  {/* Name */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Budget Name *
                    </Text>
                    <Input
                      placeholder="e.g., Groceries, Dining Out, Entertainment"
                      value={formData.name}
                      onChangeText={(text) => setFormData({...formData, name: text})}
                      backgroundColor="#333333"
                      borderColor="#444444"
                      color="white"
                      placeholderTextColor="#666666"
                      fontSize={16}
                      br={8}
                    />
                  </YStack>

                  {/* Limit Amount */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Limit Amount *
                    </Text>
                    <Input
                      placeholder="0"
                      value={formData.limit_amount}
                      onChangeText={(text) => setFormData({...formData, limit_amount: text})}
                      backgroundColor="#333333"
                      borderColor="#444444"
                      color="white"
                      placeholderTextColor="#666666"
                      keyboardType="decimal-pad"
                      fontSize={16}
                      br={8}
                      prefix={<Text color="#666666" mr={8}>₹</Text>}
                    />
                  </YStack>

                  {/* Period */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Period *
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                      {periodOptions.map(period => (
                        <TouchableOpacity
                          key={period.value}
                          onPress={() => setFormData({...formData, period: period.value})}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                            backgroundColor: formData.period === period.value ? '#EAB30820' : '#333333',
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: formData.period === period.value ? '#EAB308' : '#444444',
                          }}
                        >
                          {React.cloneElement(period.icon, { 
                            size: 14,
                            color: formData.period === period.value ? '#EAB308' : '#666666'
                          })}
                          <Text 
                            color={formData.period === period.value ? '#EAB308' : '#666666'} 
                            fontSize={12} 
                            fontWeight="700"
                            ml={6}
                          >
                            {period.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </YStack>

                  {/* Alert Threshold */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Alert Threshold ({formData.alert_threshold}%)
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                      <View style={{ flex: 1 }}>
                        <View style={{
                          height: 6,
                          backgroundColor: '#333333',
                          borderRadius: 3,
                          overflow: 'hidden',
                        }}>
                          <View style={{
                            width: `${formData.alert_threshold}%`,
                            height: '100%',
                            backgroundColor: '#EAB308',
                            borderRadius: 3,
                          }} />
                        </View>
                      </View>
                      <Text color="#EAB308" fontSize={12} fontWeight="700" minWidth={30}>
                        {formData.alert_threshold}%
                      </Text>
                    </View>
                    <Text color="#666666" fontSize={11} mt={4}>
                      Get alerted when you reach this percentage of your budget
                    </Text>
                  </YStack>

                  {/* Submit Button */}
                  <TouchableOpacity
                    onPress={selectedBudget ? () => handleUpdateBudget(selectedBudget.id) : handleAddBudget}
                    disabled={updating}
                    style={{
                      backgroundColor: '#EAB308',
                      padding: 16,
                      borderRadius: 12,
                      alignItems: 'center',
                      marginTop: 8,
                      opacity: updating ? 0.7 : 1,
                    }}
                  >
                    {updating ? (
                      <Spinner size="small" color="black" />
                    ) : (
                      <Text color="black" fontSize={16} fontWeight="800">
                        {selectedBudget ? 'Update Budget' : 'Create Budget'}
                      </Text>
                    )}
                  </TouchableOpacity>
                </YStack>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </Theme>
  );
}





// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Modal,
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
//   Progress,
//   Sheet
// } from 'tamagui';
// import {
//   ArrowLeft,
//   Plus,
//   PieChart,
//   DollarSign,
//   Calendar,
//   Edit3,
//   Trash2,
//   X,
//   AlertTriangle,
//   CheckCircle,
//   Circle,
//   Target,
//   ShoppingBag,
//   Utensils,
//   Car,
//   Home,
//   Heart,
//   BookOpen,
//   Zap
// } from '@tamagui/lucide-icons';
// import { useRouter, useFocusEffect } from 'expo-router';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { ApiService } from '../services/apiService';

// export default function Budgets() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
  
//   // State
//   const [budgets, setBudgets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [selectedBudget, setSelectedBudget] = useState(null);
//   const [updating, setUpdating] = useState(false);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     name: '',
//     limit_amount: '',
//     period: 'monthly',
//     alert_threshold: 80,
//     metadata: {
//       included_category_ids: [],
//       excluded_category_ids: [],
//       excluded_merchants: []
//     }
//   });

//   // Period options
//   const periodOptions = [
//     { value: 'daily', label: 'Daily', icon: <Zap size={14} /> },
//     { value: 'weekly', label: 'Weekly', icon: <Calendar size={14} /> },
//     { value: 'monthly', label: 'Monthly', icon: <Calendar size={14} /> },
//     { value: 'yearly', label: 'Yearly', icon: <Target size={14} /> }
//   ];

//   // Category icons mapping
//   const categoryIcons = {
//     'Eating out': <Utensils size={20} />,
//     'Eat': <Utensils size={20} />,
//     'Dining': <Utensils size={20} />,
//     'Daily Food': <Utensils size={20} />,
//     'Shopping': <ShoppingBag size={20} />,
//     'Cycle': <Car size={20} />,
//     'Hike': <Heart size={20} />,
//     'default': <PieChart size={20} />
//   };

//   // Fetch budgets
//   const fetchBudgets = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await ApiService.get('/budgets/');
//       setBudgets(response.data || []);
//     } catch (error) {
//       console.error('Fetch budgets error:', error);
//       Alert.alert('Error', 'Failed to load budgets');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       fetchBudgets();
//     }, [fetchBudgets])
//   );

//   // Calculate totals
//   const totalBudgetLimit = budgets.reduce((total, budget) => {
//     if (budget.is_active) {
//       return total + (Number(budget.limit_amount) || 0);
//     }
//     return total;
//   }, 0);

//   const totalSpent = budgets.reduce((total, budget) => {
//     if (budget.is_active) {
//       return total + (Number(budget.spent) || 0);
//     }
//     return total;
//   }, 0);

//   const totalRemaining = budgets.reduce((total, budget) => {
//     if (budget.is_active) {
//       return total + (Number(budget.remaining) || 0);
//     }
//     return total;
//   }, 0);

//   const activeBudgets = budgets.filter(budget => budget.is_active).length;

//   // Add budget
//   const handleAddBudget = async () => {
//     try {
//       if (!formData.name || !formData.limit_amount) {
//         Alert.alert('Error', 'Please fill all required fields');
//         return;
//       }

//       const budgetData = {
//         name: formData.name.trim(),
//         limit_amount: parseFloat(formData.limit_amount),
//         period: formData.period,
//         alert_threshold: formData.alert_threshold,
//         metadata: {
//           included_category_ids: formData.metadata.included_category_ids,
//           excluded_category_ids: formData.metadata.excluded_category_ids,
//           excluded_merchants: formData.metadata.excluded_merchants
//         }
//       };

//       const response = await ApiService.post('/budgets/', budgetData);
      
//       setShowAddModal(false);
//       resetForm();
//       fetchBudgets();
//       Alert.alert('Success', 'Budget added successfully');
      
//     } catch (error) {
//       console.error('Add budget error:', error);
      
//       if (error.response?.status === 422 && error.response?.data?.detail) {
//         const validationErrors = error.response.data.detail;
//         const errorMessages = validationErrors.map(err => 
//           `${err.loc?.join('.') || 'Field'}: ${err.msg}`
//         ).join('\n\n');
        
//         Alert.alert('Validation Error', errorMessages);
//       } else if (error.response?.data?.detail) {
//         Alert.alert('Error', JSON.stringify(error.response.data.detail));
//       } else {
//         Alert.alert('Error', error.message || 'Failed to add budget');
//       }
//     }
//   };

//   // Update budget
//   const handleUpdateBudget = async (id) => {
//     try {
//       setUpdating(true);
      
//       const updateData = {
//         name: formData.name.trim(),
//         limit_amount: parseFloat(formData.limit_amount),
//         period: formData.period,
//         alert_threshold: formData.alert_threshold,
//         included_category_ids: formData.metadata.included_category_ids,
//         excluded_category_ids: formData.metadata.excluded_category_ids,
//         excluded_merchants: formData.metadata.excluded_merchants
//       };

//       const response = await ApiService.patch(`/budgets/${id}`, updateData);
      
//       setShowAddModal(false);
//       setSelectedBudget(null);
//       resetForm();
//       fetchBudgets();
//       Alert.alert('Success', 'Budget updated successfully');
      
//     } catch (error) {
//       console.error('Update budget error:', error);
      
//       if (error.response?.status === 422 && error.response?.data?.detail) {
//         const validationErrors = error.response.data.detail;
//         const errorMessages = validationErrors.map(err => 
//           `${err.loc?.join('.') || 'Field'}: ${err.msg}`
//         ).join('\n\n');
        
//         Alert.alert('Validation Error', errorMessages);
//       } else if (error.response?.data?.detail) {
//         Alert.alert('Error', JSON.stringify(error.response.data.detail));
//       } else {
//         Alert.alert('Error', error.message || 'Failed to update budget');
//       }
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // Toggle budget active status
//   const handleToggleActive = async (budget) => {
//     try {
//       const newStatus = !budget.is_active;
      
//       await ApiService.patch(`/budgets/${budget.id}`, {
//         is_active: newStatus
//       });
      
//       fetchBudgets();
//       Alert.alert('Success', `Budget ${newStatus ? 'activated' : 'deactivated'}`);
      
//     } catch (error) {
//       console.error('Toggle active error:', error);
//       Alert.alert('Error', 'Failed to update budget status');
//     }
//   };

//   // Delete budget
//   const handleDeleteBudget = async (budget) => {
//     Alert.alert(
//       'Delete Budget',
//       'Are you sure you want to delete this budget?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'Delete', 
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await ApiService.patch(`/budgets/${budget.id}`, {
//                 is_active: false
//               });
              
//               fetchBudgets();
//               Alert.alert('Success', 'Budget deleted');
//             } catch (error) {
//               console.error('Delete error:', error);
//               Alert.alert('Error', 'Failed to delete budget');
//             }
//           }
//         }
//       ]
//     );
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       name: '',
//       limit_amount: '',
//       period: 'monthly',
//       alert_threshold: 80,
//       metadata: {
//         included_category_ids: [],
//         excluded_category_ids: [],
//         excluded_merchants: []
//       }
//     });
//     setSelectedBudget(null);
//     setUpdating(false);
//   };

//   // Open edit modal
//   const openEditModal = (budget) => {
//     setSelectedBudget(budget);
//     setFormData({
//       name: budget.name || '',
//       limit_amount: budget.limit_amount?.toString() || '',
//       period: budget.period || 'monthly',
//       alert_threshold: budget.alert_threshold || 80,
//       metadata: {
//         included_category_ids: budget.metadata?.included_category_ids || [],
//         excluded_category_ids: budget.metadata?.excluded_category_ids || [],
//         excluded_merchants: budget.metadata?.excluded_merchants || []
//       }
//     });
//     setShowAddModal(true);
//   };

//   // Format currency
//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat('en-IN', { 
//       style: 'currency', 
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount || 0);

//   // Get period label
//   const getPeriodLabel = (period) => {
//     const option = periodOptions.find(p => p.value === period);
//     return option?.label || period;
//   };

//   // Get period icon
//   const getPeriodIcon = (period) => {
//     const option = periodOptions.find(p => p.value === period);
//     return option?.icon || <Calendar size={16} />;
//   };

//   // Get category icon
//   const getCategoryIcon = (name) => {
//     return categoryIcons[name] || categoryIcons.default;
//   };

//   // FIXED: Get progress color based on actual usage calculation
//   const getProgressColor = (budget) => {
//     const actualPercentage = (budget.spent / budget.limit_amount) * 100;
    
//     if (actualPercentage >= 100) return '#EF4444';
//     if (actualPercentage >= budget.alert_threshold) return '#F59E0B';
//     return '#22C55E';
//   };

//   // FIXED: Get alert status based on actual calculation
//   const getAlertStatus = (budget) => {
//     // If spent is 0, it can't be exceeded
//     if (budget.spent <= 0) {
//       return { text: 'On Track', color: '#22C55E' };
//     }
    
//     // Calculate actual percentage used
//     const actualPercentage = (budget.spent / budget.limit_amount) * 100;
    
//     if (actualPercentage >= 100) {
//       return { text: 'Exceeded', color: '#EF4444' };
//     }
    
//     if (actualPercentage >= budget.alert_threshold) {
//       return { text: 'Near Limit', color: '#F59E0B' };
//     }
    
//     return { text: 'On Track', color: '#22C55E' };
//   };

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
//               Budgets
//             </H2>
//             <Text color="#666666" fontSize={14}>
//               Manage your spending limits
//             </Text>
//           </YStack>
          
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

//         {/* SUMMARY CARDS */}
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
//         >
//           <XStack space={12}>
//             {/* Total Limit */}
//             <Card backgroundColor="#1A1A1A" p={16} br={12} minWidth={160}>
//               <YStack>
//                 <Text color="#999999" fontSize={12} fontWeight="600" mb={8}>
//                   TOTAL LIMIT
//                 </Text>
//                 <Text color="#22C55E" fontSize={24} fontWeight="900" mb={4}>
//                   {formatCurrency(totalBudgetLimit)}
//                 </Text>
//                 <Text color="#666666" fontSize={12}>
//                   {activeBudgets} active budget{activeBudgets !== 1 ? 's' : ''}
//                 </Text>
//               </YStack>
//             </Card>

//             {/* Total Spent */}
//             <Card backgroundColor="#1A1A1A" p={16} br={12} minWidth={160}>
//               <YStack>
//                 <Text color="#999999" fontSize={12} fontWeight="600" mb={8}>
//                   TOTAL SPENT
//                 </Text>
//                 <Text color="#F59E0B" fontSize={24} fontWeight="900" mb={4}>
//                   {formatCurrency(totalSpent)}
//                 </Text>
//                 <Text color="#666666" fontSize={12}>
//                   {(totalSpent / totalBudgetLimit * 100 || 0).toFixed(1)}% used
//                 </Text>
//               </YStack>
//             </Card>

//             {/* Total Remaining */}
//             <Card backgroundColor="#1A1A1A" p={16} br={12} minWidth={160}>
//               <YStack>
//                 <Text color="#999999" fontSize={12} fontWeight="600" mb={8}>
//                   REMAINING
//                 </Text>
//                 <Text color="#8B5CF6" fontSize={24} fontWeight="900" mb={4}>
//                   {formatCurrency(totalRemaining)}
//                 </Text>
//                 <Text color="#666666" fontSize={12}>
//                   Available to spend
//                 </Text>
//               </YStack>
//             </Card>
//           </XStack>
//         </ScrollView>

//         {/* BUDGETS LIST */}
//         <ScrollView 
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 100 }}
//           showsVerticalScrollIndicator={false}
//         >
//           {loading ? (
//             <YStack py={48} ai="center">
//               <Spinner size="large" color="#EAB308" />
//               <Text color="#666666" fontSize={14} mt={16}>
//                 Loading budgets...
//               </Text>
//             </YStack>
//           ) : budgets.length > 0 ? (
//             <YStack space={16}>
//               {budgets.map((budget, index) => (
//                 <Card 
//                   key={budget.id || index} 
//                   backgroundColor={budget.is_active ? '#1A1A1A' : '#111111'}
//                   p={16} 
//                   br={12}
//                   bw={1}
//                   bc={budget.is_active ? '#333333' : '#444444'}
//                 >
//                   <YStack space={12}>
//                     {/* Header */}
//                     <XStack jc="space-between" ai="center">
//                       <XStack ai="center" space={12}>
//                         <View style={{
//                           width: 40,
//                           height: 40,
//                           borderRadius: 20,
//                           backgroundColor: budget.is_active ? '#22C55E20' : '#444444',
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}>
//                           {getCategoryIcon(budget.name)}
//                         </View>
                        
//                         <YStack>
//                           <XStack ai="center" space={8}>
//                             <Text color="white" fontWeight="800" fontSize={16}>
//                               {budget.name}
//                             </Text>
//                             <Circle size={6} bg={budget.is_active ? '#22C55E' : '#EF4444'} />
//                           </XStack>
//                           <XStack ai="center" space={8} mt={2}>
//                             {React.cloneElement(getPeriodIcon(budget.period), { size: 12, color: '#666666' })}
//                             <Text color="#666666" fontSize={12}>
//                               {getPeriodLabel(budget.period)}
//                             </Text>
//                           </XStack>
//                         </YStack>
//                       </XStack>
                      
//                       <XStack space={12}>
//                         <TouchableOpacity 
//                           onPress={() => handleToggleActive(budget)}
//                           style={{
//                             padding: 6,
//                             borderRadius: 6,
//                             backgroundColor: budget.is_active ? '#22C55E20' : '#444444',
//                           }}
//                         >
//                           {budget.is_active ? 
//                             <CheckCircle size={16} color="#22C55E" /> : 
//                             <Circle size={16} color="#EF4444" />
//                           }
//                         </TouchableOpacity>
//                         <TouchableOpacity 
//                           onPress={() => openEditModal(budget)}
//                           style={{ padding: 6 }}
//                         >
//                           <Edit3 size={16} color="#666666" />
//                         </TouchableOpacity>
//                         <TouchableOpacity 
//                           onPress={() => handleDeleteBudget(budget)}
//                           style={{ padding: 6 }}
//                         >
//                           <Trash2 size={16} color="#EF4444" />
//                         </TouchableOpacity>
//                       </XStack>
//                     </XStack>

//                     {/* Progress Bar - FIXED: Use actual calculation */}
//                     <YStack>
//                       <XStack jc="space-between" ai="center" mb={4}>
//                         <Text color="#999999" fontSize={12} fontWeight="600">
//                           Progress
//                         </Text>
//                         <Text color={getProgressColor(budget)} fontSize={12} fontWeight="700">
//                           {((budget.spent / budget.limit_amount) * 100 || 0).toFixed(1)}%
//                         </Text>
//                       </XStack>
//                       <View style={{
//                         height: 6,
//                         backgroundColor: '#333333',
//                         borderRadius: 3,
//                         overflow: 'hidden',
//                       }}>
//                         <View style={{
//                           width: `${Math.min((budget.spent / budget.limit_amount) * 100, 100)}%`,
//                           height: '100%',
//                           backgroundColor: getProgressColor(budget),
//                           borderRadius: 3,
//                         }} />
//                       </View>
//                     </YStack>

//                     {/* Budget Details */}
//                     <XStack jc="space-between" ai="center">
//                       <YStack>
//                         <Text color="#999999" fontSize={11} fontWeight="600">
//                           LIMIT
//                         </Text>
//                         <Text color="white" fontSize={14} fontWeight="700" mt={2}>
//                           {formatCurrency(budget.limit_amount)}
//                         </Text>
//                       </YStack>
                      
//                       <YStack ai="center">
//                         <Text color="#999999" fontSize={11} fontWeight="600">
//                           SPENT
//                         </Text>
//                         <Text color="#F59E0B" fontSize={14} fontWeight="700" mt={2}>
//                           {formatCurrency(budget.spent)}
//                         </Text>
//                       </YStack>
                      
//                       <YStack ai="flex-end">
//                         <Text color="#999999" fontSize={11} fontWeight="600">
//                           REMAINING
//                         </Text>
//                         <Text color="#22C55E" fontSize={14} fontWeight="700" mt={2}>
//                           {formatCurrency(budget.remaining)}
//                         </Text>
//                       </YStack>
//                     </XStack>

//                     {/* Alert Status - FIXED */}
//                     <XStack jc="space-between" ai="center" mt={4}>
//                       <XStack ai="center" space={4}>
//                         <AlertTriangle size={12} color={getAlertStatus(budget).color} />
//                         <Text color={getAlertStatus(budget).color} fontSize={11} fontWeight="600">
//                           {getAlertStatus(budget).text}
//                         </Text>
//                       </XStack>
//                       <Text color="#666666" fontSize={11}>
//                         Alert at {budget.alert_threshold}%
//                       </Text>
//                     </XStack>
//                   </YStack>
//                 </Card>
//               ))}
//             </YStack>
//           ) : (
//             <YStack ai="center" py={48}>
//               <View style={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: 40,
//                 backgroundColor: '#1A1A1A',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginBottom: 16,
//               }}>
//                 <PieChart size={32} color="#666666" />
//               </View>
//               <Text color="#666666" fontSize={18} fontWeight="600" mt={16}>
//                 No budgets yet
//               </Text>
//               <Text color="#444444" fontSize={14} mt={8} textAlign="center">
//                 Create your first budget to track spending
//               </Text>
//               <TouchableOpacity
//                 onPress={() => setShowAddModal(true)}
//                 style={{
//                   backgroundColor: '#EAB308',
//                   paddingHorizontal: 24,
//                   paddingVertical: 12,
//                   borderRadius: 8,
//                   marginTop: 20,
//                 }}
//               >
//                 <Text color="black" fontSize={14} fontWeight="700">
//                   Create Budget
//                 </Text>
//               </TouchableOpacity>
//             </YStack>
//           )}
//         </ScrollView>

//         {/* ADD/EDIT BUDGET MODAL */}
//         <Modal
//           visible={showAddModal}
//           animationType="slide"
//           transparent={true}
//           onRequestClose={() => {
//             setShowAddModal(false);
//             resetForm();
//           }}
//         >
//           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
//             <View style={{ 
//               backgroundColor: '#1A1A1A', 
//               borderTopLeftRadius: 24, 
//               borderTopRightRadius: 24, 
//               padding: 24, 
//               paddingBottom: insets.bottom + 24,
//               maxHeight: '80%'
//             }}>
//               <XStack jc="space-between" ai="center" mb={24}>
//                 <H4 color="white" fontWeight="800" fontSize={20}>
//                   {selectedBudget ? 'Edit Budget' : 'Create Budget'}
//                 </H4>
//                 <TouchableOpacity 
//                   onPress={() => {
//                     setShowAddModal(false);
//                     resetForm();
//                   }}
//                   style={{ padding: 8 }}
//                 >
//                   <X size={24} color="#666666" />
//                 </TouchableOpacity>
//               </XStack>

//               <ScrollView showsVerticalScrollIndicator={false}>
//                 <YStack space={20}>
//                   {/* Name */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Budget Name *
//                     </Text>
//                     <Input
//                       placeholder="e.g., Groceries, Dining Out, Entertainment"
//                       value={formData.name}
//                       onChangeText={(text) => setFormData({...formData, name: text})}
//                       backgroundColor="#333333"
//                       borderColor="#444444"
//                       color="white"
//                       placeholderTextColor="#666666"
//                       fontSize={16}
//                       br={8}
//                     />
//                   </YStack>

//                   {/* Limit Amount */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Limit Amount *
//                     </Text>
//                     <Input
//                       placeholder="0"
//                       value={formData.limit_amount}
//                       onChangeText={(text) => setFormData({...formData, limit_amount: text})}
//                       backgroundColor="#333333"
//                       borderColor="#444444"
//                       color="white"
//                       placeholderTextColor="#666666"
//                       keyboardType="decimal-pad"
//                       fontSize={16}
//                       br={8}
//                       prefix={<Text color="#666666" mr={8}>₹</Text>}
//                     />
//                   </YStack>

//                   {/* Period */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Period *
//                     </Text>
//                     <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
//                       {periodOptions.map(period => (
//                         <TouchableOpacity
//                           key={period.value}
//                           onPress={() => setFormData({...formData, period: period.value})}
//                           style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             paddingHorizontal: 12,
//                             paddingVertical: 10,
//                             backgroundColor: formData.period === period.value ? '#EAB30820' : '#333333',
//                             borderRadius: 8,
//                             borderWidth: 1,
//                             borderColor: formData.period === period.value ? '#EAB308' : '#444444',
//                           }}
//                         >
//                           {React.cloneElement(period.icon, { 
//                             size: 14,
//                             color: formData.period === period.value ? '#EAB308' : '#666666'
//                           })}
//                           <Text 
//                             color={formData.period === period.value ? '#EAB308' : '#666666'} 
//                             fontSize={12} 
//                             fontWeight="700"
//                             ml={6}
//                           >
//                             {period.label}
//                           </Text>
//                         </TouchableOpacity>
//                       ))}
//                     </View>
//                   </YStack>

//                   {/* Alert Threshold */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Alert Threshold ({formData.alert_threshold}%)
//                     </Text>
//                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
//                       <View style={{ flex: 1 }}>
//                         <View style={{
//                           height: 6,
//                           backgroundColor: '#333333',
//                           borderRadius: 3,
//                           overflow: 'hidden',
//                         }}>
//                           <View style={{
//                             width: `${formData.alert_threshold}%`,
//                             height: '100%',
//                             backgroundColor: '#EAB308',
//                             borderRadius: 3,
//                           }} />
//                         </View>
//                       </View>
//                       <Text color="#EAB308" fontSize={12} fontWeight="700" minWidth={30}>
//                         {formData.alert_threshold}%
//                       </Text>
//                     </View>
//                     <Text color="#666666" fontSize={11} mt={4}>
//                       Get alerted when you reach this percentage of your budget
//                     </Text>
//                   </YStack>

//                   {/* Submit Button */}
//                   <TouchableOpacity
//                     onPress={selectedBudget ? () => handleUpdateBudget(selectedBudget.id) : handleAddBudget}
//                     disabled={updating}
//                     style={{
//                       backgroundColor: '#EAB308',
//                       padding: 16,
//                       borderRadius: 12,
//                       alignItems: 'center',
//                       marginTop: 8,
//                       opacity: updating ? 0.7 : 1,
//                     }}
//                   >
//                     {updating ? (
//                       <Spinner size="small" color="black" />
//                     ) : (
//                       <Text color="black" fontSize={16} fontWeight="800">
//                         {selectedBudget ? 'Update Budget' : 'Create Budget'}
//                       </Text>
//                     )}
//                   </TouchableOpacity>
//                 </YStack>
//               </ScrollView>
//             </View>
//           </View>
//         </Modal>
//       </SafeAreaView>
//     </Theme>
//   );
// }
