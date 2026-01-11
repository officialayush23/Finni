// // import React, { useState, useEffect, useCallback } from 'react';
// // import { 
// //   FlatList, Modal, Alert, RefreshControl, KeyboardAvoidingView, 
// //   Platform, TouchableOpacity, StyleSheet, View, ScrollView 
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { YStack, XStack, Text, Button, Input, Theme, Card, Spinner, H3, Separator } from 'tamagui';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { ArrowLeft, Plus, Target, X, CheckCircle, Flag, Calendar, Zap, ChevronRight } from '@tamagui/lucide-icons';
// // import { useRouter } from 'expo-router';
// // import { api } from '../../../services/api'; 

// // export default function GoalsScreen() {
// //   const router = useRouter();
  
// //   // Data State
// //   const [goals, setGoals] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // UI State
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [allocModalVisible, setAllocModalVisible] = useState(false);
// //   const [submitting, setSubmitting] = useState(false);

// //   // Form State (Create)
// //   const [name, setName] = useState('');
// //   const [targetAmount, setTargetAmount] = useState('');
// //   const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

// //   // Allocation State
// //   const [selectedGoal, setSelectedGoal] = useState(null);
// //   const [allocAmount, setAllocAmount] = useState('');

// //   const fetchGoals = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       const response = await api.get('/api/v1/goals/');
// //       setGoals(response.data);
// //     } catch (error) {
// //       console.error("Fetch Goals Error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchGoals();
// //   }, [fetchGoals]);

// //   const handleCreate = async () => {
// //     if (!name || !targetAmount) return;
// //     setSubmitting(true);
// //     try {
// //       await api.post('/api/v1/goals/', {
// //         name,
// //         target_amount: parseFloat(targetAmount),
// //         target_date: targetDate
// //       });
// //       setModalVisible(false);
// //       setName(''); setTargetAmount('');
// //       fetchGoals();
// //     } catch (error) {
// //       Alert.alert("Error", "Could not sync goal.");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // --- ALLOCATION LOGIC ---
// //   const handleAllocate = async () => {
// //     if (!allocAmount || !selectedGoal) return;
// //     setSubmitting(true);
// //     try {
// //       // API: POST /api/v1/goals/{goal_id}/allocate
// //       await api.post(`/api/v1/goals/${selectedGoal.id}/allocate`, {
// //         allocation_fixed_amount: parseFloat(allocAmount),
// //         allocation_percentage: 0, // Defaulting to fixed amount
// //       });
      
// //       Alert.alert("Success", "Funds allocated to objective.");
// //       setAllocModalVisible(false);
// //       setAllocAmount('');
// //       fetchGoals();
// //     } catch (error) {
// //       Alert.alert("Error", "Allocation failed. Check your balance.");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const formatCurrency = (val) => 
// //     new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

// //   return (
// //     <Theme name="dark">
// //       <View style={styles.container}>
// //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
// //           <YStack px={20} f={1}>

// //             {/* HEADER */}
// //             <XStack jc="space-between" ai="center" py="$4">
// //               <TouchableOpacity onPress={() => router.back()} style={styles.navBtn}>
// //                 <ArrowLeft size={22} color="white" />
// //               </TouchableOpacity>
// //               <Text style={styles.headerTitle}>GOAL VAULT</Text>
// //               <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addBtn}>
// //                 <Plus size={22} color="black" />
// //               </TouchableOpacity>
// //             </XStack>

// //             <FlatList
// //               data={goals}
// //               keyExtractor={item => item.id}
// //               showsVerticalScrollIndicator={false}
// //               refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchGoals} tintColor="#EAB308" />}
// //               renderItem={({ item }) => {
// //                 const progress = (item.current_amount / item.target_amount) * 100 || 0;
// //                 return (
// //                   <Card bg="#0A0A0A" p="$5" mb="$4" bc="#1A1A1A" bw={1} br="$5">
// //                     <YStack space="$3">
// //                       <XStack jc="space-between" ai="center">
// //                         <Text color="white" fontWeight="900" fontSize={18}>{item.name}</Text>
// //                         <TouchableOpacity 
// //                           onPress={() => { setSelectedGoal(item); setAllocModalVisible(true); }}
// //                           style={styles.allocBtn}
// //                         >
// //                           <Zap size={14} color="black" />
// //                           <Text color="black" fontWeight="800" fontSize={10} ml="$1">FUEL</Text>
// //                         </TouchableOpacity>
// //                       </XStack>

// //                       <XStack jc="space-between">
// //                          <Text color="#444" fontSize={10} fontWeight="800">PROGRESS</Text>
// //                          <Text color="white" fontSize={10} fontWeight="800">{progress.toFixed(1)}%</Text>
// //                       </XStack>

// //                       <View style={styles.progressTrack}>
// //                         <View style={[styles.progressBar, { width: `${Math.min(progress, 100)}%` }]} />
// //                       </View>

// //                       <XStack jc="space-between" ai="center" mt="$1">
// //                         <Text color="#22C55E" fontWeight="900" fontSize={14}>{formatCurrency(item.current_amount)}</Text>
// //                         <Text color="#555" fontWeight="700" fontSize={12}>Target: {formatCurrency(item.target_amount)}</Text>
// //                       </XStack>
// //                     </YStack>
// //                   </Card>
// //                 );
// //               }}
// //             />
// //           </YStack>
// //         </SafeAreaView>

// //         {/* --- ALLOCATION MODAL --- */}
// //         <Modal visible={allocModalVisible} animationType="fade" transparent>
// //           <View style={styles.modalOverlay}>
// //             <View style={styles.modalContent}>
// //               <XStack jc="space-between" ai="center" mb="$5">
// //                 <Text style={styles.modalTitle}>ALLOCATE FUNDS</Text>
// //                 <TouchableOpacity onPress={() => setAllocModalVisible(false)}><X size={24} color="#666" /></TouchableOpacity>
// //               </XStack>
              
// //               <Text color="$silver4" fontSize={12} mb="$4">
// //                 Fuelling Goal: <Text color="white" fontWeight="bold">{selectedGoal?.name}</Text>
// //               </Text>

// //               <YStack space="$4">
// //                 <View>
// //                    <Text style={styles.label}>AMOUNT TO ALLOCATE (INR)</Text>
// //                    <Input 
// //                       value={allocAmount} onChangeText={setAllocAmount}
// //                       keyboardType="numeric" bg="black" color="white" h={55} bc="#222"
// //                       placeholder="e.g. 5000"
// //                    />
// //                 </View>

// //                 <Button bg="#EAB308" color="black" h={55} fontWeight="900" onPress={handleAllocate} disabled={submitting}>
// //                    {submitting ? <Spinner color="black" /> : "CONFIRM ALLOCATION"}
// //                 </Button>
// //               </YStack>
// //             </View>
// //           </View>
// //         </Modal>

// //         {/* --- CREATE MODAL (Previous implementation) --- */}
// //         <Modal visible={modalVisible} animationType="slide" transparent>
// //           <View style={styles.modalOverlay}>
// //             <View style={styles.modalContent}>
// //                 <XStack jc="space-between" ai="center" mb="$6">
// //                     <Text style={styles.modalTitle}>NEW GOAL</Text>
// //                     <TouchableOpacity onPress={() => setModalVisible(false)}><X size={24} color="#666" /></TouchableOpacity>
// //                 </XStack>
// //                 <YStack space="$5">
// //                     <View>
// //                         <Text style={styles.label}>GOAL NAME</Text>
// //                         <Input value={name} onChangeText={setName} bg="black" color="white" h={55} bc="#222" placeholder="e.g. Vacation" />
// //                     </View>
// //                     <View>
// //                         <Text style={styles.label}>TARGET AMOUNT</Text>
// //                         <Input value={targetAmount} onChangeText={setTargetAmount} keyboardType="numeric" bg="black" color="white" h={55} bc="#222" />
// //                     </View>
// //                     <Button bg="#EAB308" color="black" h={60} fontWeight="900" onPress={handleCreate} disabled={submitting}>
// //                         DEPLOY
// //                     </Button>
// //                 </YStack>
// //             </View>
// //           </View>
// //         </Modal>
// //       </View>
// //     </Theme>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#000' },
// //   headerTitle: { color: 'white', fontWeight: '900', fontSize: 13, letterSpacing: 2 },
// //   navBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
// //   addBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EAB308', justifyContent: 'center', alignItems: 'center' },
// //   allocBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EAB308', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
// //   progressTrack: { height: 6, backgroundColor: '#111', borderRadius: 3, marginTop: 5, overflow: 'hidden' },
// //   progressBar: { height: '100%', backgroundColor: '#22C55E', borderRadius: 3 },
// //   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' },
// //   modalContent: { backgroundColor: '#0A0A0A', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 60, borderTopWidth: 1, borderColor: '#1A1A1A' },
// //   modalTitle: { color: 'white', fontWeight: '900', fontSize: 16 },
// //   label: { color: '#444', fontSize: 10, fontWeight: '800', marginBottom: 8 },
// // });




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
//   Button
// } from 'tamagui';
// import {
//   ArrowLeft,
//   Plus,
//   Target,
//   Calendar,
//   DollarSign,
//   TrendingUp,
//   PieChart,
//   Edit3,
//   Trash2,
//   X,
//   CheckCircle,
//   Circle,
//   Zap,
//   Clock,
//   BarChart3,
//   Percent,
//   Wallet,
//   Sparkles,
//   AlertTriangle
// } from '@tamagui/lucide-icons';
// import { useRouter, useFocusEffect } from 'expo-router';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import DateTimePicker from '@react-native-community/datetimepicker';

// // Services
// import { ApiService } from '../../../services/apiService';

// export default function Goals() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
  
//   // State
//   const [goals, setGoals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showAllocateModal, setShowAllocateModal] = useState(false);
//   const [showFeasibilityModal, setShowFeasibilityModal] = useState(false);
//   const [selectedGoal, setSelectedGoal] = useState(null);
//   const [processing, setProcessing] = useState(false);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     name: '',
//     target_amount: '',
//     target_date: new Date(),
//   });

//   // Allocation form state
//   const [allocationData, setAllocationData] = useState({
//     income_source_id: '',
//     portfolio_holding_id: '',
//     allocation_percentage: '',
//     allocation_fixed_amount: '',
//     allocation_type: 'capital'
//   });

//   // Date picker state
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   // Allocation types
//   const allocationTypes = [
//     { value: 'capital', label: 'Capital', icon: <DollarSign size={14} /> },
//     { value: 'percentage', label: 'Percentage', icon: <Percent size={14} /> },
//     { value: 'recurring', label: 'Recurring', icon: <Calendar size={14} /> }
//   ];

//   // Fetch goals
//   const fetchGoals = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await ApiService.get('/goals/');
//       setGoals(response.data || []);
//     } catch (error) {
//       console.error('Fetch goals error:', error);
//       Alert.alert('Error', 'Failed to load goals');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       fetchGoals();
//     }, [fetchGoals])
//   );

//   // Calculate totals
//   const totalTarget = goals.reduce((total, goal) => total + (Number(goal.target_amount) || 0), 0);
//   const totalCurrent = goals.reduce((total, goal) => total + (Number(goal.current_amount) || 0), 0);
//   const totalProgress = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

//   // Calculate days remaining
//   const calculateDaysRemaining = (targetDate) => {
//     if (!targetDate) return 0;
//     const target = new Date(targetDate);
//     const today = new Date();
//     const diffTime = target - today;
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   };

//   // Calculate monthly saving needed
//   const calculateMonthlySaving = (goal) => {
//     if (!goal.target_date) return 0;
    
//     const daysRemaining = calculateDaysRemaining(goal.target_date);
//     const monthsRemaining = Math.max(daysRemaining / 30, 1);
//     const remainingAmount = Math.max(goal.target_amount - goal.current_amount, 0);
    
//     return remainingAmount / monthsRemaining;
//   };

//   // Calculate progress percentage
//   const calculateProgress = (goal) => {
//     if (!goal.target_amount || goal.target_amount === 0) return 0;
//     return Math.min((goal.current_amount / goal.target_amount) * 100, 100);
//   };

//   // Get progress color
//   const getProgressColor = (percentage) => {
//     if (percentage >= 100) return '#22C55E'; // Green for completed
//     if (percentage >= 75) return '#3B82F6'; // Blue for good progress
//     if (percentage >= 50) return '#F59E0B'; // Orange for moderate
//     if (percentage >= 25) return '#EF4444'; // Red for low
//     return '#6B7280'; // Gray for very low
//   };

//   // Get status text
//   const getStatusText = (goal) => {
//     const progress = calculateProgress(goal);
//     const daysRemaining = calculateDaysRemaining(goal.target_date);
    
//     if (progress >= 100) return 'Completed';
//     if (daysRemaining < 0) return 'Overdue';
//     if (daysRemaining < 30) return 'Urgent';
//     if (daysRemaining < 90) return 'Approaching';
//     return 'On Track';
//   };

//   // Get status color
//   const getStatusColor = (goal) => {
//     const status = getStatusText(goal);
//     switch (status) {
//       case 'Completed': return '#22C55E';
//       case 'Overdue': return '#EF4444';
//       case 'Urgent': return '#F59E0B';
//       case 'Approaching': return '#3B82F6';
//       default: return '#6B7280';
//     }
//   };

//   // Add goal
//   const handleAddGoal = async () => {
//     try {
//       if (!formData.name || !formData.target_amount) {
//         Alert.alert('Error', 'Please fill all required fields');
//         return;
//       }

//       const goalData = {
//         name: formData.name.trim(),
//         target_amount: parseFloat(formData.target_amount),
//         target_date: formData.target_date.toISOString().split('T')[0], // Format as YYYY-MM-DD
//       };

//       await ApiService.post('/goals/', goalData);
      
//       setShowAddModal(false);
//       resetForm();
//       fetchGoals();
//       Alert.alert('Success', 'Goal created successfully');
      
//     } catch (error) {
//       console.error('Add goal error:', error);
//       Alert.alert('Error', 'Failed to create goal');
//     }
//   };

//   // Allocate to goal
//   const handleAllocateGoal = async () => {
//     try {
//       if (!allocationData.allocation_percentage && !allocationData.allocation_fixed_amount) {
//         Alert.alert('Error', 'Please enter either percentage or fixed amount');
//         return;
//       }

//       setProcessing(true);

//       const allocateData = {
//         allocation_type: allocationData.allocation_type,
//         ...(allocationData.allocation_percentage && { 
//           allocation_percentage: parseFloat(allocationData.allocation_percentage) 
//         }),
//         ...(allocationData.allocation_fixed_amount && { 
//           allocation_fixed_amount: parseFloat(allocationData.allocation_fixed_amount) 
//         }),
//         ...(allocationData.income_source_id && { 
//           income_source_id: allocationData.income_source_id 
//         }),
//         ...(allocationData.portfolio_holding_id && { 
//           portfolio_holding_id: allocationData.portfolio_holding_id 
//         }),
//       };

//       await ApiService.post(`/goals/${selectedGoal.id}/allocate`, allocateData);
      
//       setShowAllocateModal(false);
//       resetAllocationForm();
//       fetchGoals();
//       Alert.alert('Success', 'Allocation added successfully');
      
//     } catch (error) {
//       console.error('Allocate goal error:', error);
//       Alert.alert('Error', 'Failed to allocate to goal');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   // Check feasibility
//   const handleCheckFeasibility = async (goal) => {
//     try {
//       setProcessing(true);
//       setSelectedGoal(goal);
      
//       const response = await ApiService.get(`/goals/${goal.id}/feasibility`);
      
//       setShowFeasibilityModal(true);
      
//     } catch (error) {
//       console.error('Feasibility check error:', error);
//       Alert.alert('Error', 'Failed to check goal feasibility');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   // Optimize goal
//   const handleOptimizeGoal = async (goal) => {
//     try {
//       setProcessing(true);
      
//       const response = await ApiService.get(`/goals/${goal.id}/optimize`);
      
//       Alert.alert(
//         'Optimization Complete',
//         response.data || 'Goal optimization suggestions generated.',
//         [
//           { text: 'OK' },
//           { 
//             text: 'View Details', 
//             onPress: () => {
//               // You could navigate to a detailed optimization view
//               console.log('Optimization details:', response.data);
//             }
//           }
//         ]
//       );
      
//       fetchGoals();
      
//     } catch (error) {
//       console.error('Optimize goal error:', error);
//       Alert.alert('Error', 'Failed to optimize goal');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   // Delete goal
//   const handleDeleteGoal = async (goal) => {
//     Alert.alert(
//       'Delete Goal',
//       `Are you sure you want to delete "${goal.name}"?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'Delete', 
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               // Assuming you have a delete endpoint
//               // If not, you might need to implement soft delete
//               await ApiService.delete(`/goals/${goal.id}`);
//               fetchGoals();
//               Alert.alert('Success', 'Goal deleted');
//             } catch (error) {
//               console.error('Delete error:', error);
//               Alert.alert('Error', 'Failed to delete goal');
//             }
//           }
//         }
//       ]
//     );
//   };

//   // Reset forms
//   const resetForm = () => {
//     setFormData({
//       name: '',
//       target_amount: '',
//       target_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Default to 1 year from now
//     });
//     setSelectedGoal(null);
//   };

//   const resetAllocationForm = () => {
//     setAllocationData({
//       income_source_id: '',
//       portfolio_holding_id: '',
//       allocation_percentage: '',
//       allocation_fixed_amount: '',
//       allocation_type: 'capital'
//     });
//   };

//   // Open allocate modal
//   const openAllocateModal = (goal) => {
//     setSelectedGoal(goal);
//     setShowAllocateModal(true);
//   };

//   // Format currency
//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat('en-US', { 
//       style: 'currency', 
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount || 0);

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'No date';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   // Handle date change
//   const onDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setFormData(prev => ({ ...prev, target_date: selectedDate }));
//     }
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
//               Financial Goals
//             </H2>
//             <Text color="#666666" fontSize={14}>
//               Track and achieve your targets
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

//         {/* TOTAL PROGRESS */}
//         <Card m={20} mb={16} backgroundColor="#1A1A1A" br={16}>
//           <YStack p={20}>
//             <Text color="#999999" fontSize={12} fontWeight="600" mb={8} ls={1}>
//               TOTAL GOALS PROGRESS
//             </Text>
            
//             <XStack jc="space-between" ai="center" mb={12}>
//               <YStack>
//                 <Text color="#22C55E" fontSize={24} fontWeight="900">
//                   {formatCurrency(totalCurrent)}
//                 </Text>
//                 <Text color="#666666" fontSize={12}>
//                   Saved of {formatCurrency(totalTarget)}
//                 </Text>
//               </YStack>
//               <Text color="#EAB308" fontSize={18} fontWeight="900">
//                 {totalProgress.toFixed(1)}%
//               </Text>
//             </XStack>
            
//             <Progress 
//               value={totalProgress} 
//               height={6} 
//               backgroundColor="#333333"
//               borderRadius={3}
//             >
//               <Progress.Indicator 
//                 backgroundColor="#EAB308"
//                 borderRadius={3}
//               />
//             </Progress>
            
//             <XStack jc="space-between" ai="center" mt={12}>
//               <Text color="#666666" fontSize={12}>
//                 {goals.length} goal{goals.length !== 1 ? 's' : ''}
//               </Text>
//               <Text color="#666666" fontSize={12}>
//                 {goals.filter(g => calculateProgress(g) >= 100).length} completed
//               </Text>
//             </XStack>
//           </YStack>
//         </Card>

//         {/* GOALS LIST */}
//         <ScrollView 
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 100 }}
//           showsVerticalScrollIndicator={false}
//         >
//           {loading ? (
//             <YStack py={48} ai="center">
//               <Spinner size="large" color="#EAB308" />
//               <Text color="#666666" fontSize={14} mt={16}>
//                 Loading goals...
//               </Text>
//             </YStack>
//           ) : goals.length > 0 ? (
//             <YStack space={16}>
//               {goals.map((goal, index) => {
//                 const progress = calculateProgress(goal);
//                 const daysRemaining = calculateDaysRemaining(goal.target_date);
//                 const monthlySaving = calculateMonthlySaving(goal);
//                 const statusText = getStatusText(goal);
//                 const statusColor = getStatusColor(goal);
//                 const progressColor = getProgressColor(progress);
                
//                 return (
//                   <Card 
//                     key={goal.id || index} 
//                     backgroundColor="#1A1A1A" 
//                     p={16} 
//                     br={12}
//                     bw={1}
//                     bc="#333333"
//                   >
//                     <YStack space={12}>
//                       {/* Header */}
//                       <XStack jc="space-between" ai="center">
//                         <XStack ai="center" space={12}>
//                           <View style={{
//                             width: 40,
//                             height: 40,
//                             borderRadius: 20,
//                             backgroundColor: `${progressColor}20`,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}>
//                             <Target size={20} color={progressColor} />
//                           </View>
                          
//                           <YStack>
//                             <Text color="white" fontWeight="800" fontSize={16}>
//                               {goal.name}
//                             </Text>
//                             <XStack ai="center" space={6} mt={2}>
//                               <Circle size={6} bg={statusColor} />
//                               <Text color={statusColor} fontSize={12} fontWeight="600">
//                                 {statusText}
//                               </Text>
//                             </XStack>
//                           </YStack>
//                         </XStack>
                        
//                         <XStack space={12}>
//                           <TouchableOpacity 
//                             onPress={() => openAllocateModal(goal)}
//                             style={{ padding: 6 }}
//                           >
//                             <Plus size={16} color="#666666" />
//                           </TouchableOpacity>
//                           <TouchableOpacity 
//                             onPress={() => handleDeleteGoal(goal)}
//                             style={{ padding: 6 }}
//                           >
//                             <Trash2 size={16} color="#EF4444" />
//                           </TouchableOpacity>
//                         </XStack>
//                       </XStack>

//                       {/* Progress Bar */}
//                       <YStack>
//                         <XStack jc="space-between" ai="center" mb={4}>
//                           <Text color="#999999" fontSize={12} fontWeight="600">
//                             Progress
//                           </Text>
//                           <Text color={progressColor} fontSize={12} fontWeight="700">
//                             {progress.toFixed(1)}%
//                           </Text>
//                         </XStack>
//                         <View style={{
//                           height: 6,
//                           backgroundColor: '#333333',
//                           borderRadius: 3,
//                           overflow: 'hidden',
//                         }}>
//                           <View style={{
//                             width: `${Math.min(progress, 100)}%`,
//                             height: '100%',
//                             backgroundColor: progressColor,
//                             borderRadius: 3,
//                           }} />
//                         </View>
//                       </YStack>

//                       {/* Amounts */}
//                       <XStack jc="space-between" ai="center">
//                         <YStack>
//                           <Text color="#999999" fontSize={11} fontWeight="600">
//                             CURRENT
//                           </Text>
//                           <Text color="white" fontSize={14} fontWeight="700" mt={2}>
//                             {formatCurrency(goal.current_amount)}
//                           </Text>
//                         </YStack>
                        
//                         <YStack ai="center">
//                           <Text color="#999999" fontSize={11} fontWeight="600">
//                             TARGET
//                           </Text>
//                           <Text color="#EAB308" fontSize={14} fontWeight="700" mt={2}>
//                             {formatCurrency(goal.target_amount)}
//                           </Text>
//                         </YStack>
                        
//                         <YStack ai="flex-end">
//                           <Text color="#999999" fontSize={11} fontWeight="600">
//                             REMAINING
//                           </Text>
//                           <Text color="#22C55E" fontSize={14} fontWeight="700" mt={2}>
//                             {formatCurrency(Math.max(goal.target_amount - goal.current_amount, 0))}
//                           </Text>
//                         </YStack>
//                       </XStack>

//                       {/* Timeline */}
//                       <XStack jc="space-between" ai="center">
//                         <XStack ai="center" space={6}>
//                           <Calendar size={12} color="#666666" />
//                           <Text color="#666666" fontSize={11}>
//                             {formatDate(goal.target_date)}
//                           </Text>
//                         </XStack>
                        
//                         <XStack ai="center" space={6}>
//                           <Clock size={12} color="#666666" />
//                           <Text color="#666666" fontSize={11}>
//                             {daysRemaining > 0 ? `${daysRemaining} days left` : 'Past due'}
//                           </Text>
//                         </XStack>
//                       </XStack>

//                       {/* Monthly Saving */}
//                       {daysRemaining > 0 && progress < 100 && (
//                         <XStack jc="space-between" ai="center" p={8} bg="#222222" br={8}>
//                           <XStack ai="center" space={6}>
//                             <TrendingUp size={12} color="#F59E0B" />
//                             <Text color="#F59E0B" fontSize={11} fontWeight="600">
//                               Monthly needed:
//                             </Text>
//                           </XStack>
//                           <Text color="white" fontSize={12} fontWeight="700">
//                             {formatCurrency(monthlySaving)}
//                           </Text>
//                         </XStack>
//                       )}

//                       {/* Action Buttons */}
//                       <XStack space={8} mt={4}>
//                         <TouchableOpacity
//                           onPress={() => handleCheckFeasibility(goal)}
//                           style={{
//                             flex: 1,
//                             backgroundColor: '#333333',
//                             paddingVertical: 8,
//                             borderRadius: 6,
//                             alignItems: 'center',
//                           }}
//                         >
//                           <Text color="#3B82F6" fontSize={12} fontWeight="700">
//                             Check Feasibility
//                           </Text>
//                         </TouchableOpacity>
                        
//                         <TouchableOpacity
//                           onPress={() => handleOptimizeGoal(goal)}
//                           style={{
//                             flex: 1,
//                             backgroundColor: '#333333',
//                             paddingVertical: 8,
//                             borderRadius: 6,
//                             alignItems: 'center',
//                           }}
//                         >
//                           <Text color="#EAB308" fontSize={12} fontWeight="700">
//                             Optimize
//                           </Text>
//                         </TouchableOpacity>
//                       </XStack>
//                     </YStack>
//                   </Card>
//                 );
//               })}
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
//                 <Target size={32} color="#666666" />
//               </View>
//               <Text color="#666666" fontSize={18} fontWeight="600" mt={16}>
//                 No goals yet
//               </Text>
//               <Text color="#444444" fontSize={14} mt={8} textAlign="center">
//                 Create your first financial goal
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
//                   Create Goal
//                 </Text>
//               </TouchableOpacity>
//             </YStack>
//           )}
//         </ScrollView>

//         {/* ADD GOAL MODAL */}
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
//                   Create New Goal
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
//                       Goal Name *
//                     </Text>
//                     <Input
//                       placeholder="e.g., Buy a Car, Down Payment, Vacation"
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

//                   {/* Target Amount */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Target Amount *
//                     </Text>
//                     <Input
//                       placeholder="0"
//                       value={formData.target_amount}
//                       onChangeText={(text) => setFormData({...formData, target_amount: text})}
//                       backgroundColor="#333333"
//                       borderColor="#444444"
//                       color="white"
//                       placeholderTextColor="#666666"
//                       keyboardType="decimal-pad"
//                       fontSize={16}
//                       br={8}
//                       prefix={<Text color="#666666" mr={8}>$</Text>}
//                     />
//                   </YStack>

//                   {/* Target Date */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Target Date
//                     </Text>
//                     <TouchableOpacity
//                       onPress={() => setShowDatePicker(true)}
//                       style={{
//                         backgroundColor: '#333333',
//                         borderWidth: 1,
//                         borderColor: '#444444',
//                         borderRadius: 8,
//                         padding: 16,
//                       }}
//                     >
//                       <XStack ai="center" space={12}>
//                         <Calendar size={16} color="#666666" />
//                         <Text color="white" fontSize={16}>
//                           {formatDate(formData.target_date)}
//                         </Text>
//                       </XStack>
//                     </TouchableOpacity>
//                   </YStack>

//                   {/* Submit Button */}
//                   <TouchableOpacity
//                     onPress={handleAddGoal}
//                     disabled={!formData.name || !formData.target_amount}
//                     style={{
//                       backgroundColor: '#EAB308',
//                       padding: 16,
//                       borderRadius: 12,
//                       alignItems: 'center',
//                       marginTop: 8,
//                       opacity: (!formData.name || !formData.target_amount) ? 0.7 : 1,
//                     }}
//                   >
//                     <Text color="black" fontSize={16} fontWeight="800">
//                       Create Goal
//                     </Text>
//                   </TouchableOpacity>
//                 </YStack>
//               </ScrollView>
//             </View>
//           </View>
//         </Modal>

//         {/* ALLOCATE MODAL */}
//         <Modal
//           visible={showAllocateModal}
//           animationType="slide"
//           transparent={true}
//           onRequestClose={() => {
//             setShowAllocateModal(false);
//             resetAllocationForm();
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
//                   Allocate to {selectedGoal?.name}
//                 </H4>
//                 <TouchableOpacity 
//                   onPress={() => {
//                     setShowAllocateModal(false);
//                     resetAllocationForm();
//                   }}
//                   style={{ padding: 8 }}
//                 >
//                   <X size={24} color="#666666" />
//                 </TouchableOpacity>
//               </XStack>

//               <ScrollView showsVerticalScrollIndicator={false}>
//                 <YStack space={20}>
//                   {/* Allocation Type */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Allocation Type
//                     </Text>
//                     <View style={{ flexDirection: 'row', gap: 8 }}>
//                       {allocationTypes.map(type => (
//                         <TouchableOpacity
//                           key={type.value}
//                           onPress={() => setAllocationData(prev => ({ ...prev, allocation_type: type.value }))}
//                           style={{
//                             flex: 1,
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             paddingHorizontal: 12,
//                             paddingVertical: 10,
//                             backgroundColor: allocationData.allocation_type === type.value ? '#EAB30820' : '#333333',
//                             borderRadius: 8,
//                             borderWidth: 1,
//                             borderColor: allocationData.allocation_type === type.value ? '#EAB308' : '#444444',
//                           }}
//                         >
//                           {React.cloneElement(type.icon, { 
//                             size: 14,
//                             color: allocationData.allocation_type === type.value ? '#EAB308' : '#666666'
//                           })}
//                           <Text 
//                             color={allocationData.allocation_type === type.value ? '#EAB308' : '#666666'} 
//                             fontSize={12} 
//                             fontWeight="700"
//                             ml={6}
//                           >
//                             {type.label}
//                           </Text>
//                         </TouchableOpacity>
//                       ))}
//                     </View>
//                   </YStack>

//                   {/* Percentage Allocation */}
//                   {allocationData.allocation_type === 'percentage' && (
//                     <YStack>
//                       <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                         Allocation Percentage
//                       </Text>
//                       <Input
//                         placeholder="0"
//                         value={allocationData.allocation_percentage}
//                         onChangeText={(text) => setAllocationData({...allocationData, allocation_percentage: text})}
//                         backgroundColor="#333333"
//                         borderColor="#444444"
//                         color="white"
//                         placeholderTextColor="#666666"
//                         keyboardType="decimal-pad"
//                         fontSize={16}
//                         br={8}
//                         suffix={<Text color="#666666" ml={8}>%</Text>}
//                       />
//                     </YStack>
//                   )}

//                   {/* Fixed Amount Allocation */}
//                   {(allocationData.allocation_type === 'capital' || allocationData.allocation_type === 'recurring') && (
//                     <YStack>
//                       <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                         Fixed Amount
//                       </Text>
//                       <Input
//                         placeholder="0"
//                         value={allocationData.allocation_fixed_amount}
//                         onChangeText={(text) => setAllocationData({...allocationData, allocation_fixed_amount: text})}
//                         backgroundColor="#333333"
//                         borderColor="#444444"
//                         color="white"
//                         placeholderTextColor="#666666"
//                         keyboardType="decimal-pad"
//                         fontSize={16}
//                         br={8}
//                         prefix={<Text color="#666666" mr={8}>$</Text>}
//                       />
//                     </YStack>
//                   )}

//                   {/* Submit Button */}
//                   <TouchableOpacity
//                     onPress={handleAllocateGoal}
//                     disabled={processing || (!allocationData.allocation_percentage && !allocationData.allocation_fixed_amount)}
//                     style={{
//                       backgroundColor: '#EAB308',
//                       padding: 16,
//                       borderRadius: 12,
//                       alignItems: 'center',
//                       marginTop: 8,
//                       opacity: (processing || (!allocationData.allocation_percentage && !allocationData.allocation_fixed_amount)) ? 0.7 : 1,
//                     }}
//                   >
//                     {processing ? (
//                       <Spinner size="small" color="black" />
//                     ) : (
//                       <Text color="black" fontSize={16} fontWeight="800">
//                         Allocate Funds
//                       </Text>
//                     )}
//                   </TouchableOpacity>
//                 </YStack>
//               </ScrollView>
//             </View>
//           </View>
//         </Modal>

//         {/* FEASIBILITY MODAL */}
//         <Modal
//           visible={showFeasibilityModal}
//           animationType="slide"
//           transparent={true}
//           onRequestClose={() => setShowFeasibilityModal(false)}
//         >
//           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', padding: 20 }}>
//             <Card backgroundColor="#1A1A1A" p={24} br={16}>
//               <YStack space={16}>
//                 <XStack jc="space-between" ai="center">
//                   <H4 color="white" fontWeight="800" fontSize={20}>
//                     Goal Feasibility
//                   </H4>
//                   <TouchableOpacity onPress={() => setShowFeasibilityModal(false)}>
//                     <X size={24} color="#666666" />
//                   </TouchableOpacity>
//                 </XStack>
                
//                 <YStack ai="center" py={20}>
//                   <Sparkles size={40} color="#EAB308" />
//                   <Text color="#EAB308" fontSize={16} fontWeight="700" mt={12} textAlign="center">
//                     {selectedGoal?.name}
//                   </Text>
//                   <Text color="#666666" fontSize={14} mt={8} textAlign="center">
//                     Feasibility analysis would appear here
//                   </Text>
//                 </YStack>
                
//                 <TouchableOpacity
//                   onPress={() => setShowFeasibilityModal(false)}
//                   style={{
//                     backgroundColor: '#333333',
//                     padding: 16,
//                     borderRadius: 8,
//                     alignItems: 'center',
//                   }}
//                 >
//                   <Text color="white" fontSize={14} fontWeight="700">
//                     Close
//                   </Text>
//                 </TouchableOpacity>
//               </YStack>
//             </Card>
//           </View>
//         </Modal>

//         {/* DATE PICKER */}
//         {showDatePicker && (
//           <DateTimePicker
//             value={formData.target_date}
//             mode="date"
//             display="default"
//             onChange={onDateChange}
//             minimumDate={new Date()}
//           />
//         )}
//       </SafeAreaView>
//     </Theme>
//   );
// }


// // import React, { useState, useEffect, useCallback } from 'react';
// // import {
// //   ScrollView,
// //   TouchableOpacity,
// //   Alert,
// //   View,
// //   Platform,
// //   Modal,
// //   RefreshControl,
// //   Dimensions,
// //   KeyboardAvoidingView
// // } from 'react-native';
// // import {
// //   YStack,
// //   XStack,
// //   Text,
// //   H2,
// //   H4,
// //   Theme,
// //   Spinner,
// //   Card,
// //   Input,
// //   Button,
// //   Progress,
// //   Select,
// //   Adapt,
// //   Sheet,
// //   Circle
// // } from 'tamagui';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import {
// //   ArrowLeft,
// //   Target,
// //   Plus,
// //   DollarSign,
// //   Calendar,
// //   TrendingUp,
// //   PieChart,
// //   ArrowUpRight,
// //   Check,
// //   X,
// //   Clock,
// //   AlertTriangle,
// //   Users,
// //   Wallet,
// //   Briefcase,
// //   Home,
// //   Car,
// //   Plane,
// //   GraduationCap,
// //   Heart,
// //   Sparkles,
// //   Zap,
// //   ChevronDown,
// //   ChevronUp,
// //   BarChart3,
// //   Award,
// //   Shield,
// //   RefreshCw,
// //   Edit,
// //   Trash2,
// //   ExternalLink,
// //   Percent,
// //   Divide,
// //   Calculator
// // } from '@tamagui/lucide-icons';
// // import { useRouter, useFocusEffect } from 'expo-router';
// // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // import DateTimePicker from '@react-native-community/datetimepicker';

// // // Services
// // import { ApiService } from '../../../services/apiService';

// // const { width } = Dimensions.get('window');

// // export default function Goals() {
// //   const router = useRouter();
// //   const insets = useSafeAreaInsets();
  
// //   // State
// //   const [goals, setGoals] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [showCreateModal, setShowCreateModal] = useState(false);
// //   const [showAllocateModal, setShowAllocateModal] = useState(false);
// //   const [showFeasibilityModal, setShowFeasibilityModal] = useState(false);
// //   const [showOptimizeModal, setShowOptimizeModal] = useState(false);
// //   const [showDatePicker, setShowDatePicker] = useState(false);
  
// //   // Data states
// //   const [incomes, setIncomes] = useState([]);
// //   const [investments, setInvestments] = useState([]);
// //   const [selectedGoal, setSelectedGoal] = useState(null);
// //   const [feasibilityData, setFeasibilityData] = useState(null);
// //   const [optimizeData, setOptimizeData] = useState(null);
  
// //   // Form states
// //   const [createForm, setCreateForm] = useState({
// //     name: '',
// //     target_amount: '',
// //     target_date: new Date()
// //   });
  
// //   const [allocateForm, setAllocateForm] = useState({
// //     income_source_id: '',
// //     portfolio_holding_id: '',
// //     allocation_percentage: '',
// //     allocation_fixed_amount: '',
// //     allocation_type: 'capital'
// //   });
  
// //   const [activeTab, setActiveTab] = useState('all'); // all, active, completed

// //   // Format currency
// //   const formatCurrency = (amount) => {
// //     if (amount === null || amount === undefined) return '₹0';
// //     return new Intl.NumberFormat('en-IN', {
// //       style: 'currency',
// //       currency: 'INR',
// //       minimumFractionDigits: 0,
// //       maximumFractionDigits: 0
// //     }).format(amount || 0);
// //   };

// //   // Format date
// //   const formatDate = (dateString) => {
// //     if (!dateString) return '';
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-IN', {
// //       day: 'numeric',
// //       month: 'short',
// //       year: 'numeric'
// //     });
// //   };

// //   // Calculate days remaining
// //   const calculateDaysRemaining = (targetDate) => {
// //     if (!targetDate) return 0;
// //     const today = new Date();
// //     const target = new Date(targetDate);
// //     const diffTime = target - today;
// //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
// //     return diffDays > 0 ? diffDays : 0;
// //   };

// //   // Calculate progress percentage
// //   const calculateProgress = (goal) => {
// //     if (!goal || !goal.target_amount || goal.target_amount === 0) return 0;
// //     return Math.min(((goal.current_amount || 0) / goal.target_amount) * 100, 100);
// //   };

// //   // Fetch all data
// //   const fetchAllData = useCallback(async () => {
// //     try {
// //       setLoading(true);
      
// //       // Fetch goals, incomes, and investments
// //       const goalsRes = await ApiService.get('/api/v1/goals/');
// //       const incomesRes = await ApiService.get('/api/v1/income/');
// //       const investmentsRes = await ApiService.get('/api/v1/investments/');
      
// //       console.log('Goals response:', goalsRes.data);
// //       console.log('Incomes response:', incomesRes.data);
// //       console.log('Investments response:', investmentsRes.data);
      
// //       setGoals(goalsRes.data || []);
// //       setIncomes(incomesRes.data || []);
// //       setInvestments(investmentsRes.data || []);
      
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //       console.error('Error details:', error.response?.data);
// //       Alert.alert('Error', 'Failed to load data. Please check your connection and try again.');
// //     } finally {
// //       setLoading(false);
// //       setRefreshing(false);
// //     }
// //   }, []);


// //   // Create goal
// //   const handleCreateGoal = async () => {
// //     try {
// //       if (!createForm.name.trim() || !createForm.target_amount || !createForm.target_date) {
// //         Alert.alert('Error', 'Please fill all required fields');
// //         return;
// //       }

// //       const goalData = {
// //         name: createForm.name.trim(),
// //         target_amount: parseFloat(createForm.target_amount),
// //         target_date: createForm.target_date.toISOString().split('T')[0]
// //       };

// //       const response = await ApiService.post('/api/v1/goals/', goalData);
      
// //       Alert.alert('Success', 'Goal created successfully!');
// //       setShowCreateModal(false);
// //       setCreateForm({ name: '', target_amount: '', target_date: new Date() });
// //       fetchAllData();
      
// //     } catch (error) {
// //       console.error('Create goal error:', error);
// //       Alert.alert('Error', error.response?.data?.detail || 'Failed to create goal');
// //     }
// //   };

// //   // Get feasibility for a goal
// //   const handleGetFeasibility = async (goalId) => {
// //     try {
// //       const response = await ApiService.get(`/api/v1/goals/${goalId}/feasibility`);
// //       setFeasibilityData(response.data);
// //       setSelectedGoal(goals.find(g => g.id === goalId));
// //       setShowFeasibilityModal(true);
// //     } catch (error) {
// //       console.error('Feasibility error:', error);
// //       Alert.alert('Error', 'Failed to get feasibility analysis');
// //     }
// //   };

// //   // Get optimization for a goal
// //   const handleGetOptimization = async (goalId) => {
// //     try {
// //       const response = await ApiService.get(`/api/v1/goals/${goalId}/optimize`);
// //       setOptimizeData(response.data);
// //       setSelectedGoal(goals.find(g => g.id === goalId));
// //       setShowOptimizeModal(true);
// //     } catch (error) {
// //       console.error('Optimization error:', error);
// //       Alert.alert('Error', 'Failed to get optimization plan');
// //     }
// //   };

// //   // Handle allocation
// //   const handleAllocateGoal = async () => {
// //     try {
// //       if (!selectedGoal) return;
      
// //       if (!allocateForm.income_source_id && !allocateForm.portfolio_holding_id) {
// //         Alert.alert('Error', 'Please select either income source or investment');
// //         return;
// //       }

// //       const allocationData = {
// //         allocation_type: allocateForm.allocation_type
// //       };

// //       if (allocateForm.income_source_id) {
// //         allocationData.income_source_id = allocateForm.income_source_id;
// //       }
// //       if (allocateForm.portfolio_holding_id) {
// //         allocationData.portfolio_holding_id = allocateForm.portfolio_holding_id;
// //       }
// //       if (allocateForm.allocation_percentage) {
// //         allocationData.allocation_percentage = parseFloat(allocateForm.allocation_percentage);
// //       }
// //       if (allocateForm.allocation_fixed_amount) {
// //         allocationData.allocation_fixed_amount = parseFloat(allocateForm.allocation_fixed_amount);
// //       }

// //       const response = await ApiService.post(
// //         `/api/v1/goals/${selectedGoal.id}/allocate`,
// //         allocationData
// //       );

// //       Alert.alert('Success', 'Goal allocated successfully!');
// //       setShowAllocateModal(false);
// //       setAllocateForm({
// //         income_source_id: '',
// //         portfolio_holding_id: '',
// //         allocation_percentage: '',
// //         allocation_fixed_amount: '',
// //         allocation_type: 'capital'
// //       });
// //       fetchAllData();
      
// //     } catch (error) {
// //       console.error('Allocation error:', error);
// //       Alert.alert('Error', error.response?.data?.detail || 'Failed to allocate goal');
// //     }
// //   };

// //   // Reset forms
// //   const resetCreateForm = () => {
// //     setCreateForm({ name: '', target_amount: '', target_date: new Date() });
// //   };

// //   const resetAllocateForm = () => {
// //     setAllocateForm({
// //       income_source_id: '',
// //       portfolio_holding_id: '',
// //       allocation_percentage: '',
// //       allocation_fixed_amount: '',
// //       allocation_type: 'capital'
// //     });
// //   };

// //   // Filter goals based on tab
// //   const filteredGoals = goals.filter(goal => {
// //     if (activeTab === 'all') return true;
// //     if (activeTab === 'active') return goal.status === 'active';
// //     if (activeTab === 'completed') return goal.status === 'completed';
// //     return true;
// //   });

// //   // Goal icon based on name
// //   const getGoalIcon = (goalName) => {
// //     if (!goalName) return <Target size={20} />;
// //     const name = goalName.toLowerCase();
// //     if (name.includes('car') || name.includes('vehicle')) return <Car size={20} />;
// //     if (name.includes('house') || name.includes('home') || name.includes('property')) return <Home size={20} />;
// //     if (name.includes('vacation') || name.includes('travel') || name.includes('trip')) return <Plane size={20} />;
// //     if (name.includes('education') || name.includes('study')) return <GraduationCap size={20} />;
// //     if (name.includes('health') || name.includes('medical')) return <Heart size={20} />;
// //     if (name.includes('retirement')) return <Users size={20} />;
// //     if (name.includes('business') || name.includes('startup')) return <Briefcase size={20} />;
// //     if (name.includes('investment') || name.includes('portfolio')) return <TrendingUp size={20} />;
// //     return <Target size={20} />;
// //   };

// //   // Goal color based on progress
// //   const getGoalColor = (progress) => {
// //     if (progress >= 100) return '#10B981'; // Green for completed
// //     if (progress >= 70) return '#F59E0B'; // Orange for near completion
// //     if (progress >= 30) return '#3B82F6'; // Blue for good progress
// //     return '#8B5CF6'; // Purple for early stage
// //   };

// //   // Render create goal modal
// //   const renderCreateModal = () => (
// //     <Modal
// //       visible={showCreateModal}
// //       animationType="slide"
// //       transparent={true}
// //       onRequestClose={() => {
// //         setShowCreateModal(false);
// //         resetCreateForm();
// //       }}
// //     >
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //         style={{ flex: 1 }}
// //       >
// //         <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
// //           <View style={{ 
// //             backgroundColor: '#0F172A', 
// //             borderTopLeftRadius: 24, 
// //             borderTopRightRadius: 24, 
// //             padding: 24, 
// //             paddingBottom: insets.bottom + 24
// //           }}>
// //             <XStack jc="space-between" ai="center" mb="$4">
// //               <H4 color="white">Create New Goal</H4>
// //               <TouchableOpacity 
// //                 onPress={() => {
// //                   setShowCreateModal(false);
// //                   resetCreateForm();
// //                 }}
// //                 style={{ padding: 8 }}
// //               >
// //                 <X size={24} color="#64748B" />
// //               </TouchableOpacity>
// //             </XStack>

// //             <YStack space="$4">
// //               <YStack>
// //                 <Text color="#CBD5E1" fontSize={14} fontWeight="600" mb="$2">
// //                   Goal Name
// //                 </Text>
// //                 <Input
// //                   placeholder="e.g., New Car, Vacation, House Down Payment"
// //                   value={createForm.name}
// //                   onChangeText={(text) => setCreateForm(prev => ({ ...prev, name: text }))}
// //                   bg="#1E293B"
// //                   borderColor="#334155"
// //                   color="white"
// //                   placeholderTextColor="#64748B"
// //                   br="$3"
// //                 />
// //               </YStack>

// //               <YStack>
// //                 <Text color="#CBD5E1" fontSize={14} fontWeight="600" mb="$2">
// //                   Target Amount (₹)
// //                 </Text>
// //                 <Input
// //                   placeholder="100000"
// //                   value={createForm.target_amount}
// //                   onChangeText={(text) => setCreateForm(prev => ({ ...prev, target_amount: text.replace(/[^0-9]/g, '') }))}
// //                   keyboardType="numeric"
// //                   bg="#1E293B"
// //                   borderColor="#334155"
// //                   color="white"
// //                   placeholderTextColor="#64748B"
// //                   br="$3"
// //                 />
// //               </YStack>

// //               <YStack>
// //                 <Text color="#CBD5E1" fontSize={14} fontWeight="600" mb="$2">
// //                   Target Date
// //                 </Text>
// //                 <TouchableOpacity
// //                   onPress={() => setShowDatePicker(true)}
// //                   style={{
// //                     backgroundColor: '#1E293B',
// //                     borderWidth: 1,
// //                     borderColor: '#334155',
// //                     borderRadius: 8,
// //                     padding: 12,
// //                     flexDirection: 'row',
// //                     justifyContent: 'space-between',
// //                     alignItems: 'center'
// //                   }}
// //                 >
// //                   <Text color="white">
// //                     {createForm.target_date.toLocaleDateString('en-IN', {
// //                       day: 'numeric',
// //                       month: 'long',
// //                       year: 'numeric'
// //                     })}
// //                   </Text>
// //                   <Calendar size={20} color="#64748B" />
// //                 </TouchableOpacity>
// //               </YStack>

// //               {showDatePicker && (
// //                 <DateTimePicker
// //                   value={createForm.target_date}
// //                   mode="date"
// //                   display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// //                   onChange={(event, date) => {
// //                     setShowDatePicker(false);
// //                     if (date) {
// //                       setCreateForm(prev => ({ ...prev, target_date: date }));
// //                     }
// //                   }}
// //                   minimumDate={new Date()}
// //                 />
// //               )}

// //               <TouchableOpacity
// //                 onPress={handleCreateGoal}
// //                 disabled={!createForm.name.trim() || !createForm.target_amount}
// //                 style={{
// //                   backgroundColor: '#3B82F6',
// //                   padding: 16,
// //                   borderRadius: 12,
// //                   alignItems: 'center',
// //                   marginTop: 8,
// //                   opacity: (!createForm.name.trim() || !createForm.target_amount) ? 0.5 : 1
// //                 }}
// //               >
// //                 <Text color="white" fontSize={16} fontWeight="800">
// //                   Create Goal
// //                 </Text>
// //               </TouchableOpacity>
// //             </YStack>
// //           </View>
// //         </View>
// //       </KeyboardAvoidingView>
// //     </Modal>
// //   );

// //   // Render allocation modal
// //   const renderAllocateModal = () => {
// //     const selectedIncome = incomes.find(i => i.id === allocateForm.income_source_id);
// //     const selectedInvestment = investments.find(i => i.id === allocateForm.portfolio_holding_id);

// //     return (
// //       <Modal
// //         visible={showAllocateModal}
// //         animationType="slide"
// //         transparent={true}
// //         onRequestClose={() => {
// //           setShowAllocateModal(false);
// //           resetAllocateForm();
// //           setSelectedGoal(null);
// //         }}
// //       >
// //         <KeyboardAvoidingView
// //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //           style={{ flex: 1 }}
// //         >
// //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
// //             <View style={{ 
// //               backgroundColor: '#0F172A', 
// //               borderTopLeftRadius: 24, 
// //               borderTopRightRadius: 24, 
// //               padding: 24, 
// //               paddingBottom: insets.bottom + 24,
// //               maxHeight: '90%'
// //             }}>
// //               <XStack jc="space-between" ai="center" mb="$4">
// //                 <YStack>
// //                   <Text color="white" fontWeight="800" fontSize={20}>
// //                     Allocate to Goal
// //                   </Text>
// //                   {selectedGoal && (
// //                     <Text color="#94A3B8" fontSize={14}>
// //                       {selectedGoal.name} • {formatCurrency(selectedGoal.target_amount)}
// //                     </Text>
// //                   )}
// //                 </YStack>
// //                 <TouchableOpacity 
// //                   onPress={() => {
// //                     setShowAllocateModal(false);
// //                     resetAllocateForm();
// //                     setSelectedGoal(null);
// //                   }}
// //                   style={{ padding: 8 }}
// //                 >
// //                   <X size={24} color="#64748B" />
// //                 </TouchableOpacity>
// //               </XStack>

// //               <ScrollView showsVerticalScrollIndicator={false}>
// //                 <YStack space="$4">
// //                   {/* Allocation Type */}
// //                   <YStack>
// //                     <Text color="#CBD5E1" fontSize={14} fontWeight="600" mb="$2">
// //                       Allocation Type
// //                     </Text>
// //                     <XStack space="$2">
// //                       <TouchableOpacity
// //                         onPress={() => setAllocateForm(prev => ({ ...prev, allocation_type: 'capital' }))}
// //                         style={{
// //                           flex: 1,
// //                           backgroundColor: allocateForm.allocation_type === 'capital' ? '#3B82F620' : '#1E293B',
// //                           padding: 12,
// //                           borderRadius: 8,
// //                           borderWidth: 1,
// //                           borderColor: allocateForm.allocation_type === 'capital' ? '#3B82F6' : '#334155',
// //                           alignItems: 'center'
// //                         }}
// //                       >
// //                         <Text color={allocateForm.allocation_type === 'capital' ? '#3B82F6' : '#94A3B8'} 
// //                               fontWeight="600">
// //                           Capital
// //                         </Text>
// //                       </TouchableOpacity>
// //                       <TouchableOpacity
// //                         onPress={() => setAllocateForm(prev => ({ ...prev, allocation_type: 'expected_return' }))}
// //                         style={{
// //                           flex: 1,
// //                           backgroundColor: allocateForm.allocation_type === 'expected_return' ? '#8B5CF620' : '#1E293B',
// //                           padding: 12,
// //                           borderRadius: 8,
// //                           borderWidth: 1,
// //                           borderColor: allocateForm.allocation_type === 'expected_return' ? '#8B5CF6' : '#334155',
// //                           alignItems: 'center'
// //                         }}
// //                       >
// //                         <Text color={allocateForm.allocation_type === 'expected_return' ? '#8B5CF6' : '#94A3B8'} 
// //                               fontWeight="600">
// //                           Expected Return
// //                         </Text>
// //                       </TouchableOpacity>
// //                     </XStack>
// //                   </YStack>

// //                   {/* Income Source Selection */}
// //                   <YStack>
// //                     <Text color="#CBD5E1" fontSize={14} fontWeight="600" mb="$2">
// //                       Select Income Source
// //                     </Text>
// //                     <ScrollView 
// //                       horizontal 
// //                       showsHorizontalScrollIndicator={false}
// //                       style={{ marginBottom: 8 }}
// //                     >
// //                       <XStack space="$2">
// //                         {incomes.map(income => (
// //                           <TouchableOpacity
// //                             key={income.id}
// //                             onPress={() => setAllocateForm(prev => ({ 
// //                               ...prev, 
// //                               income_source_id: income.id,
// //                               portfolio_holding_id: ''
// //                             }))}
// //                             style={{
// //                               paddingHorizontal: 12,
// //                               paddingVertical: 8,
// //                               backgroundColor: allocateForm.income_source_id === income.id ? '#10B98120' : '#1E293B',
// //                               borderRadius: 20,
// //                               borderWidth: 1,
// //                               borderColor: allocateForm.income_source_id === income.id ? '#10B981' : '#334155'
// //                             }}
// //                           >
// //                             <Text 
// //                               color={allocateForm.income_source_id === income.id ? '#10B981' : '#94A3B8'} 
// //                               fontSize={12}
// //                               fontWeight="600"
// //                             >
// //                               {income.name} ({formatCurrency(income.estimated_monthly_amount)}/mo)
// //                             </Text>
// //                           </TouchableOpacity>
// //                         ))}
// //                       </XStack>
// //                     </ScrollView>
// //                   </YStack>

// //                   {/* Investment Selection */}
// //                   <YStack>
// //                     <Text color="#CBD5E1" fontSize={14} fontWeight="600" mb="$2">
// //                       Select Investment
// //                     </Text>
// //                     <ScrollView 
// //                       horizontal 
// //                       showsHorizontalScrollIndicator={false}
// //                       style={{ marginBottom: 8 }}
// //                     >
// //                       <XStack space="$2">
// //                         {investments.map(investment => (
// //                           <TouchableOpacity
// //                             key={investment.id}
// //                             onPress={() => setAllocateForm(prev => ({ 
// //                               ...prev, 
// //                               portfolio_holding_id: investment.id,
// //                               income_source_id: ''
// //                             }))}
// //                             style={{
// //                               paddingHorizontal: 12,
// //                               paddingVertical: 8,
// //                               backgroundColor: allocateForm.portfolio_holding_id === investment.id ? '#F59E0B20' : '#1E293B',
// //                               borderRadius: 20,
// //                               borderWidth: 1,
// //                               borderColor: allocateForm.portfolio_holding_id === investment.id ? '#F59E0B' : '#334155'
// //                             }}
// //                           >
// //                             <Text 
// //                               color={allocateForm.portfolio_holding_id === investment.id ? '#F59E0B' : '#94A3B8'} 
// //                               fontSize={12}
// //                               fontWeight="600"
// //                             >
// //                               {investment.name} ({investment.asset_type})
// //                             </Text>
// //                           </TouchableOpacity>
// //                         ))}
// //                       </XStack>
// //                     </ScrollView>
// //                   </YStack>

// //                   {/* Allocation Amount */}
// //                   <YStack>
// //                     <Text color="#CBD5E1" fontSize={14} fontWeight="600" mb="$2">
// //                       Allocation Amount
// //                     </Text>
// //                     <XStack space="$2">
// //                       <Input
// //                         flex={1}
// //                         placeholder="Percentage %"
// //                         value={allocateForm.allocation_percentage}
// //                         onChangeText={(text) => setAllocateForm(prev => ({ 
// //                           ...prev, 
// //                           allocation_percentage: text.replace(/[^0-9]/g, ''),
// //                           allocation_fixed_amount: ''
// //                         }))}
// //                         keyboardType="numeric"
// //                         bg="#1E293B"
// //                         borderColor="#334155"
// //                         color="white"
// //                         placeholderTextColor="#64748B"
// //                         br="$3"
// //                       />
// //                       <Text color="#94A3B8" fontSize={16} fontWeight="600" mx="$2">
// //                         OR
// //                       </Text>
// //                       <Input
// //                         flex={1}
// //                         placeholder="Fixed Amount"
// //                         value={allocateForm.allocation_fixed_amount}
// //                         onChangeText={(text) => setAllocateForm(prev => ({ 
// //                           ...prev, 
// //                           allocation_fixed_amount: text.replace(/[^0-9]/g, ''),
// //                           allocation_percentage: ''
// //                         }))}
// //                         keyboardType="numeric"
// //                         bg="#1E293B"
// //                         borderColor="#334155"
// //                         color="white"
// //                         placeholderTextColor="#64748B"
// //                         br="$3"
// //                       />
// //                     </XStack>
// //                   </YStack>

// //                   {/* Selected Source Info */}
// //                   {(selectedIncome || selectedInvestment) && (
// //                     <Card bg="#1E293B" p="$3" br="$3">
// //                       <Text color="#CBD5E1" fontSize={14} fontWeight="600" mb="$2">
// //                         Selected Source:
// //                       </Text>
// //                       {selectedIncome && (
// //                         <XStack ai="center" space="$2">
// //                           <Briefcase size={16} color="#10B981" />
// //                           <YStack flex={1}>
// //                             <Text color="white" fontSize={14} fontWeight="600">
// //                               {selectedIncome.name}
// //                             </Text>
// //                             <Text color="#94A3B8" fontSize={12}>
// //                               {selectedIncome.source_type} • {formatCurrency(selectedIncome.estimated_monthly_amount)}/month
// //                             </Text>
// //                           </YStack>
// //                         </XStack>
// //                       )}
// //                       {selectedInvestment && (
// //                         <XStack ai="center" space="$2">
// //                           <TrendingUp size={16} color="#F59E0B" />
// //                           <YStack flex={1}>
// //                             <Text color="white" fontSize={14} fontWeight="600">
// //                               {selectedInvestment.name}
// //                             </Text>
// //                             <Text color="#94A3B8" fontSize={12}>
// //                               {investment.asset_type} • {investment.identifier}
// //                             </Text>
// //                           </YStack>
// //                         </XStack>
// //                       )}
// //                     </Card>
// //                   )}

// //                   {/* Submit Button */}
// //                   <TouchableOpacity
// //                     onPress={handleAllocateGoal}
// //                     disabled={(!allocateForm.income_source_id && !allocateForm.portfolio_holding_id) || 
// //                              (!allocateForm.allocation_percentage && !allocateForm.allocation_fixed_amount)}
// //                     style={{
// //                       backgroundColor: '#10B981',
// //                       padding: 16,
// //                       borderRadius: 12,
// //                       alignItems: 'center',
// //                       marginTop: 8,
// //                       opacity: ((!allocateForm.income_source_id && !allocateForm.portfolio_holding_id) || 
// //                                (!allocateForm.allocation_percentage && !allocateForm.allocation_fixed_amount)) ? 0.5 : 1
// //                     }}
// //                   >
// //                     <Text color="white" fontSize={16} fontWeight="800">
// //                       Allocate to Goal
// //                     </Text>
// //                   </TouchableOpacity>
// //                 </YStack>
// //               </ScrollView>
// //             </View>
// //           </View>
// //         </KeyboardAvoidingView>
// //       </Modal>
// //     );
// //   };

// //   // Render feasibility modal
// //   const renderFeasibilityModal = () => {
// //     if (!feasibilityData || !selectedGoal) return null;

// //     return (
// //       <Modal
// //         visible={showFeasibilityModal}
// //         animationType="slide"
// //         transparent={true}
// //         onRequestClose={() => {
// //           setShowFeasibilityModal(false);
// //           setFeasibilityData(null);
// //           setSelectedGoal(null);
// //         }}
// //       >
// //         <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
// //           <View style={{ 
// //             backgroundColor: '#0F172A', 
// //             borderTopLeftRadius: 24, 
// //             borderTopRightRadius: 24, 
// //             padding: 24, 
// //             paddingBottom: insets.bottom + 24,
// //             maxHeight: '80%'
// //           }}>
// //             <XStack jc="space-between" ai="center" mb="$4">
// //               <YStack>
// //                 <Text color="white" fontWeight="800" fontSize={20}>
// //                   Goal Feasibility
// //                 </Text>
// //                 <Text color="#94A3B8" fontSize={14}>
// //                   {selectedGoal.name}
// //                 </Text>
// //               </YStack>
// //               <TouchableOpacity 
// //                 onPress={() => {
// //                   setShowFeasibilityModal(false);
// //                   setFeasibilityData(null);
// //                   setSelectedGoal(null);
// //                 }}
// //                 style={{ padding: 8 }}
// //               >
// //                 <X size={24} color="#64748B" />
// //               </TouchableOpacity>
// //             </XStack>

// //             <ScrollView showsVerticalScrollIndicator={false}>
// //               <YStack space="$4">
// //                 <Card bg="#1E293B" p="$4" br="$3">
// //                   <YStack space="$3">
// //                     <Text color="#CBD5E1" fontSize={16} fontWeight="600">
// //                       Feasibility Analysis
// //                     </Text>
                    
// //                     <XStack jc="space-between" ai="center">
// //                       <YStack>
// //                         <Text color="#94A3B8" fontSize={14}>Guaranteed Amount</Text>
// //                         <Text color="#10B981" fontSize={20} fontWeight="800">
// //                           {formatCurrency(feasibilityData.guaranteed)}
// //                         </Text>
// //                       </YStack>
                      
// //                       <YStack ai="flex-end">
// //                         <Text color="#94A3B8" fontSize={14}>Advisory Amount</Text>
// //                         <Text color="#3B82F6" fontSize={20} fontWeight="800">
// //                           {formatCurrency(feasibilityData.advisory)}
// //                         </Text>
// //                       </YStack>
// //                     </XStack>
                    
// //                     <Progress 
// //                       value={(feasibilityData.guaranteed / selectedGoal.target_amount) * 100} 
// //                       size="$2"
// //                       bg="#334155"
// //                       br="$10"
// //                       mt="$2"
// //                     >
// //                       <Progress.Indicator 
// //                         bg="#10B981"
// //                         animation="bouncy"
// //                         br="$10"
// //                       />
// //                     </Progress>
                    
// //                     <Text color="#94A3B8" fontSize={12} mt="$2">
// //                       {((feasibilityData.guaranteed / selectedGoal.target_amount) * 100).toFixed(1)}% of goal amount is guaranteed
// //                     </Text>
// //                   </YStack>
// //                 </Card>
                
// //                 <Card bg="#1E293B" p="$4" br="$3">
// //                   <Text color="#CBD5E1" fontSize={16} fontWeight="600" mb="$3">
// //                     Recommendation
// //                   </Text>
                  
// //                   {feasibilityData.guaranteed >= selectedGoal.target_amount ? (
// //                     <YStack space="$2">
// //                       <XStack ai="center" space="$2">
// //                         <Check size={16} color="#10B981" />
// //                         <Text color="#10B981" fontSize={14} fontWeight="600">
// //                           Goal is fully feasible!
// //                         </Text>
// //                       </XStack>
// //                       <Text color="#94A3B8" fontSize={13}>
// //                         You have enough guaranteed funds to achieve this goal.
// //                       </Text>
// //                     </YStack>
// //                   ) : (
// //                     <YStack space="$2">
// //                       <XStack ai="center" space="$2">
// //                         <AlertTriangle size={16} color="#F59E0B" />
// //                         <Text color="#F59E0B" fontSize={14} fontWeight="600">
// //                           Additional planning needed
// //                         </Text>
// //                       </XStack>
// //                       <Text color="#94A3B8" fontSize={13}>
// //                         Consider allocating more resources or extending the timeline.
// //                       </Text>
// //                     </YStack>
// //                   )}
// //                 </Card>
// //               </YStack>
// //             </ScrollView>
// //           </View>
// //         </View>
// //       </Modal>
// //     );
// //   };

// //   // Render optimize modal
// //   const renderOptimizeModal = () => {
// //     if (!optimizeData || !selectedGoal) return null;

// //     return (
// //       <Modal
// //         visible={showOptimizeModal}
// //         animationType="slide"
// //         transparent={true}
// //         onRequestClose={() => {
// //           setShowOptimizeModal(false);
// //           setOptimizeData(null);
// //           setSelectedGoal(null);
// //         }}
// //       >
// //         <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
// //           <View style={{ 
// //             backgroundColor: '#0F172A', 
// //             borderTopLeftRadius: 24, 
// //             borderTopRightRadius: 24, 
// //             padding: 24, 
// //             paddingBottom: insets.bottom + 24,
// //             maxHeight: '90%'
// //           }}>
// //             <XStack jc="space-between" ai="center" mb="$4">
// //               <YStack>
// //                 <Text color="white" fontWeight="800" fontSize={20}>
// //                   Optimization Plan
// //                 </Text>
// //                 <Text color="#94A3B8" fontSize={14}>
// //                   {selectedGoal.name} • Feasibility Score: {(optimizeData.feasibility_score * 100).toFixed(0)}%
// //                 </Text>
// //               </YStack>
// //               <TouchableOpacity 
// //                 onPress={() => {
// //                   setShowOptimizeModal(false);
// //                   setOptimizeData(null);
// //                   setSelectedGoal(null);
// //                 }}
// //                 style={{ padding: 8 }}
// //               >
// //                 <X size={24} color="#64748B" />
// //               </TouchableOpacity>
// //             </XStack>

// //             <ScrollView showsVerticalScrollIndicator={false}>
// //               <YStack space="$4">
// //                 {/* Recommended Plan */}
// //                 {optimizeData.recommended_plan && (
// //                   <Card bg="#1E293B" p="$4" br="$3" borderLeftWidth={4} borderLeftColor="#10B981">
// //                     <YStack space="$3">
// //                       <XStack ai="center" space="$2">
// //                         <Zap size={16} color="#10B981" />
// //                         <Text color="#10B981" fontSize={16} fontWeight="600">
// //                           Recommended Plan
// //                         </Text>
// //                       </XStack>
                      
// //                       <YStack space="$2">
// //                         <XStack jc="space-between">
// //                           <Text color="#CBD5E1" fontSize={14}>Source</Text>
// //                           <Text color="white" fontSize={14} fontWeight="600">
// //                             {optimizeData.recommended_plan.source === 'income' ? 'Income' : 'Investment'}
// //                           </Text>
// //                         </XStack>
                        
// //                         <XStack jc="space-between">
// //                           <Text color="#CBD5E1" fontSize={14}>Allocation</Text>
// //                           <Text color="white" fontSize={14} fontWeight="600">
// //                             {optimizeData.recommended_plan.allocation_percentage}%
// //                           </Text>
// //                         </XStack>
                        
// //                         <XStack jc="space-between">
// //                           <Text color="#CBD5E1" fontSize={14}>Monthly Contribution</Text>
// //                           <Text color="white" fontSize={14} fontWeight="600">
// //                             {formatCurrency(optimizeData.recommended_plan.monthly_contribution)}
// //                           </Text>
// //                         </XStack>
                        
// //                         <XStack jc="space-between">
// //                           <Text color="#CBD5E1" fontSize={14}>Time to Goal</Text>
// //                           <Text color="white" fontSize={14} fontWeight="600">
// //                             {optimizeData.recommended_plan.months_to_goal} months
// //                           </Text>
// //                         </XStack>
                        
// //                         <XStack jc="space-between">
// //                           <Text color="#CBD5E1" fontSize={14}>Confidence</Text>
// //                           <Text color="white" fontSize={14} fontWeight="600">
// //                             {(optimizeData.recommended_plan.confidence * 100).toFixed(0)}%
// //                           </Text>
// //                         </XStack>
// //                       </YStack>
// //                     </YStack>
// //                   </Card>
// //                 )}

// //                 {/* Alternative Plans */}
// //                 {optimizeData.alternatives && optimizeData.alternatives.length > 0 && (
// //                   <Card bg="#1E293B" p="$4" br="$3">
// //                     <Text color="#CBD5E1" fontSize={16} fontWeight="600" mb="$3">
// //                       Alternative Plans
// //                     </Text>
                    
// //                     <YStack space="$3">
// //                       {optimizeData.alternatives.slice(0, 3).map((alt, index) => (
// //                         <YStack key={index} space="$2" p="$3" bg="#0F172A" br="$2">
// //                           <XStack jc="space-between">
// //                             <Text color="#94A3B8" fontSize={13}>{alt.source}</Text>
// //                             <Text color="white" fontSize={13} fontWeight="600">
// //                               {alt.allocation_percentage}% allocation
// //                             </Text>
// //                           </XStack>
// //                           <XStack jc="space-between">
// //                             <Text color="#94A3B8" fontSize={12}>
// //                               {formatCurrency(alt.monthly_contribution)}/month
// //                             </Text>
// //                             <Text color="#94A3B8" fontSize={12}>
// //                               {alt.months_to_goal} months
// //                             </Text>
// //                           </XStack>
// //                         </YStack>
// //                       ))}
// //                     </YStack>
// //                   </Card>
// //                 )}

// //                 {/* Risks */}
// //                 {optimizeData.risks && optimizeData.risks.length > 0 && (
// //                   <Card bg="#1E293B" p="$4" br="$3" borderLeftWidth={4} borderLeftColor="#EF4444">
// //                     <YStack space="$2">
// //                       <XStack ai="center" space="$2">
// //                         <AlertTriangle size={16} color="#EF4444" />
// //                         <Text color="#EF4444" fontSize={16} fontWeight="600">
// //                           Risks to Consider
// //                         </Text>
// //                       </XStack>
                      
// //                       <YStack space="$1">
// //                         {optimizeData.risks.map((risk, index) => (
// //                           <XStack key={index} space="$2">
// //                             <Circle size={4} bg="#EF4444" mt="$2" />
// //                             <Text color="#94A3B8" fontSize={13} flex={1}>
// //                               {risk}
// //                             </Text>
// //                           </XStack>
// //                         ))}
// //                       </YStack>
// //                     </YStack>
// //                   </Card>
// //                 )}

// //                 {/* Constraints */}
// //                 {optimizeData.constraints_checked && optimizeData.constraints_checked.length > 0 && (
// //                   <Card bg="#1E293B" p="$4" br="$3" borderLeftWidth={4} borderLeftColor="#3B82F6">
// //                     <YStack space="$2">
// //                       <XStack ai="center" space="$2">
// //                         <Shield size={16} color="#3B82F6" />
// //                         <Text color="#3B82F6" fontSize={16} fontWeight="600">
// //                           Constraints Checked
// //                         </Text>
// //                       </XStack>
                      
// //                       <YStack space="$1">
// //                         {optimizeData.constraints_checked.map((constraint, index) => (
// //                           <XStack key={index} space="$2">
// //                             <Check size={12} color="#10B981" mt="$1" />
// //                             <Text color="#94A3B8" fontSize={13} flex={1}>
// //                               {constraint}
// //                             </Text>
// //                           </XStack>
// //                         ))}
// //                       </YStack>
// //                     </YStack>
// //                   </Card>
// //                 )}

// //                 {/* Action Button */}
// //                 <TouchableOpacity
// //                   onPress={() => {
// //                     if (optimizeData.recommended_plan && selectedGoal) {
// //                       setAllocateForm({
// //                         income_source_id: optimizeData.recommended_plan.source_id || '',
// //                         portfolio_holding_id: '',
// //                         allocation_percentage: optimizeData.recommended_plan.allocation_percentage?.toString() || '',
// //                         allocation_fixed_amount: '',
// //                         allocation_type: 'capital'
// //                       });
// //                       setShowOptimizeModal(false);
// //                       setShowAllocateModal(true);
// //                     }
// //                   }}
// //                   style={{
// //                     backgroundColor: '#3B82F6',
// //                     padding: 16,
// //                     borderRadius: 12,
// //                     alignItems: 'center',
// //                     marginTop: 8
// //                   }}
// //                 >
// //                   <Text color="white" fontSize={16} fontWeight="800">
// //                     Apply Recommended Plan
// //                   </Text>
// //                 </TouchableOpacity>
// //               </YStack>
// //             </ScrollView>
// //           </View>
// //         </View>
// //       </Modal>
// //     );
// //   };

// //   // Render goal card
// //   const renderGoalCard = (goal) => {
// //     const progress = calculateProgress(goal);
// //     const daysRemaining = calculateDaysRemaining(goal.target_date);
// //     const goalColor = getGoalColor(progress);
// //     const Icon = getGoalIcon(goal.name);

// //     return (
// //       <TouchableOpacity
// //         key={goal.id}
// //         onPress={() => {
// //           setSelectedGoal(goal);
// //           setShowAllocateModal(true);
// //         }}
// //         activeOpacity={0.9}
// //         style={{ marginBottom: 16 }}
// //       >
// //         <Card
// //           bg="#1E293B"
// //           p="$4"
// //           br="$4"
// //           bw={1}
// //           bc={goalColor + '40'}
// //         >
// //           <YStack space="$3">
// //             <XStack jc="space-between" ai="center">
// //               <XStack ai="center" space="$2">
// //                 <View style={{
// //                   width: 40,
// //                   height: 40,
// //                   borderRadius: 12,
// //                   backgroundColor: goalColor + '20',
// //                   justifyContent: 'center',
// //                   alignItems: 'center'
// //                 }}>
// //                   {React.cloneElement(Icon, { size: 20, color: goalColor })}
// //                 </View>
// //                 <YStack>
// //                   <Text color="white" fontWeight="800" fontSize={16}>
// //                     {goal.name}
// //                   </Text>
// //                   <Text color="#94A3B8" fontSize={12}>
// //                     Target: {formatDate(goal.target_date)} • {daysRemaining} days left
// //                   </Text>
// //                 </YStack>
// //               </XStack>
              
// //               <Text color={goalColor} fontWeight="800" fontSize={18}>
// //                 {progress.toFixed(0)}%
// //               </Text>
// //             </XStack>

// //             <YStack space="$2">
// //               <XStack jc="space-between">
// //                 <Text color="#CBD5E1" fontSize={13}>
// //                   {formatCurrency(goal.current_amount)} of {formatCurrency(goal.target_amount)}
// //                 </Text>
// //                 <Text color="#CBD5E1" fontSize={13}>
// //                   {formatCurrency(goal.target_amount - (goal.current_amount || 0))} to go
// //                 </Text>
// //               </XStack>
              
// //               <Progress 
// //                 value={progress} 
// //                 size="$2"
// //                 bg="#334155"
// //                 br="$10"
// //               >
// //                 <Progress.Indicator 
// //                   bg={goalColor}
// //                   animation="bouncy"
// //                   br="$10"
// //                 />
// //               </Progress>
// //             </YStack>

// //             <XStack space="$2" mt="$2">
// //               <TouchableOpacity
// //                 onPress={(e) => {
// //                   e.stopPropagation();
// //                   handleGetFeasibility(goal.id);
// //                 }}
// //                 style={{
// //                   flex: 1,
// //                   backgroundColor: '#3B82F620',
// //                   paddingVertical: 8,
// //                   paddingHorizontal: 12,
// //                   borderRadius: 20,
// //                   alignItems: 'center'
// //                 }}
// //               >
// //                 <Text color="#3B82F6" fontSize={12} fontWeight="600">
// //                   Feasibility
// //                 </Text>
// //               </TouchableOpacity>
              
// //               <TouchableOpacity
// //                 onPress={(e) => {
// //                   e.stopPropagation();
// //                   handleGetOptimization(goal.id);
// //                 }}
// //                 style={{
// //                   flex: 1,
// //                   backgroundColor: '#8B5CF620',
// //                   paddingVertical: 8,
// //                   paddingHorizontal: 12,
// //                   borderRadius: 20,
// //                   alignItems: 'center'
// //                 }}
// //               >
// //                 <Text color="#8B5CF6" fontSize={12} fontWeight="600">
// //                   Optimize
// //                 </Text>
// //               </TouchableOpacity>
              
// //               <TouchableOpacity
// //                 onPress={(e) => {
// //                   e.stopPropagation();
// //                   setSelectedGoal(goal);
// //                   setShowAllocateModal(true);
// //                 }}
// //                 style={{
// //                   flex: 1,
// //                   backgroundColor: '#10B98120',
// //                   paddingVertical: 8,
// //                   paddingHorizontal: 12,
// //                   borderRadius: 20,
// //                   alignItems: 'center'
// //                 }}
// //               >
// //                 <Text color="#10B981" fontSize={12} fontWeight="600">
// //                   Allocate
// //                 </Text>
// //               </TouchableOpacity>
// //             </XStack>
// //           </YStack>
// //         </Card>
// //       </TouchableOpacity>
// //     );
// //   };

// //   // Calculate total goals stats
// //   const calculateStats = () => {
// //     const totalGoals = goals.length;
// //     const totalTarget = goals.reduce((sum, goal) => sum + (goal.target_amount || 0), 0);
// //     const totalCurrent = goals.reduce((sum, goal) => sum + (goal.current_amount || 0), 0);
// //     const activeGoals = goals.filter(goal => goal.status === 'active').length;
    
// //     return { totalGoals, totalTarget, totalCurrent, activeGoals };
// //   };

// //   const stats = calculateStats();

// //   return (
// //     <Theme name="dark">
// //       <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
// //         <LinearGradient
// //           colors={['#0F172A', '#1E293B']}
// //           style={{ flex: 1 }}
// //         >
// //           {/* Header */}
// //           <View style={{ 
// //             paddingTop: insets.top + 16, 
// //             paddingHorizontal: 20, 
// //             paddingBottom: 20 
// //           }}>
// //             <XStack jc="space-between" ai="center">
// //               <TouchableOpacity
// //                 onPress={() => router.back()}
// //                 style={{ padding: 8, marginLeft: -8 }}
// //               >
// //                 <ArrowLeft size={24} color="#CBD5E1" />
// //               </TouchableOpacity>
              
// //               <H2 color="white" fontWeight="800">Financial Goals</H2>
              
// //               <TouchableOpacity
// //                 onPress={() => setShowCreateModal(true)}
// //                 style={{
// //                   width: 40,
// //                   height: 40,
// //                   borderRadius: 20,
// //                   backgroundColor: '#3B82F6',
// //                   justifyContent: 'center',
// //                   alignItems: 'center'
// //                 }}
// //               >
// //                 <Plus size={20} color="white" />
// //               </TouchableOpacity>
// //             </XStack>

// //             {/* Stats Cards */}
// //             <ScrollView 
// //               horizontal 
// //               showsHorizontalScrollIndicator={false}
// //               style={{ marginTop: 20 }}
// //             >
// //               <XStack space="$3">
// //                 <Card bg="#1E293B" p="$4" br="$3" minWidth={150}>
// //                   <YStack space="$2">
// //                     <Text color="#94A3B8" fontSize={12}>Total Goals</Text>
// //                     <Text color="white" fontSize={24} fontWeight="800">{stats.totalGoals}</Text>
// //                     <XStack ai="center" space="$1">
// //                       <Target size={12} color="#3B82F6" />
// //                       <Text color="#94A3B8" fontSize={11}>{stats.activeGoals} active</Text>
// //                     </XStack>
// //                   </YStack>
// //                 </Card>

// //                 <Card bg="#1E293B" p="$4" br="$3" minWidth={150}>
// //                   <YStack space="$2">
// //                     <Text color="#94A3B8" fontSize={12}>Total Target</Text>
// //                     <Text color="white" fontSize={24} fontWeight="800">
// //                       {formatCurrency(stats.totalTarget)}
// //                     </Text>
// //                     <XStack ai="center" space="$1">
// //                       <DollarSign size={12} color="#10B981" />
// //                       <Text color="#94A3B8" fontSize={11}>
// //                         {formatCurrency(stats.totalCurrent)} saved
// //                       </Text>
// //                     </XStack>
// //                   </YStack>
// //                 </Card>

// //                 <Card bg="#1E293B" p="$4" br="$3" minWidth={150}>
// //                   <YStack space="$2">
// //                     <Text color="#94A3B8" fontSize={12}>Average Progress</Text>
// //                     <Text color="white" fontSize={24} fontWeight="800">
// //                       {stats.totalGoals > 0 
// //                         ? (goals.reduce((sum, goal) => sum + calculateProgress(goal), 0) / stats.totalGoals).toFixed(0) + '%'
// //                         : '0%'
// //                       }
// //                     </Text>
// //                     <XStack ai="center" space="$1">
// //                       <TrendingUp size={12} color="#F59E0B" />
// //                       <Text color="#94A3B8" fontSize={11}>Overall progress</Text>
// //                     </XStack>
// //                   </YStack>
// //                 </Card>
// //               </XStack>
// //             </ScrollView>
// //           </View>

// //           {/* Tabs */}
// //           <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
// //             <XStack space="$2">
// //               <TouchableOpacity
// //                 onPress={() => setActiveTab('all')}
// //                 style={{
// //                   flex: 1,
// //                   backgroundColor: activeTab === 'all' ? '#3B82F6' : '#1E293B',
// //                   paddingVertical: 10,
// //                   paddingHorizontal: 16,
// //                   borderRadius: 20,
// //                   alignItems: 'center',
// //                   borderWidth: 1,
// //                   borderColor: activeTab === 'all' ? '#3B82F6' : '#334155'
// //                 }}
// //               >
// //                 <Text 
// //                   color={activeTab === 'all' ? 'white' : '#94A3B8'} 
// //                   fontSize={14}
// //                   fontWeight="600"
// //                 >
// //                   All Goals
// //                 </Text>
// //               </TouchableOpacity>
              
// //               <TouchableOpacity
// //                 onPress={() => setActiveTab('active')}
// //                 style={{
// //                   flex: 1,
// //                   backgroundColor: activeTab === 'active' ? '#10B981' : '#1E293B',
// //                   paddingVertical: 10,
// //                   paddingHorizontal: 16,
// //                   borderRadius: 20,
// //                   alignItems: 'center',
// //                   borderWidth: 1,
// //                   borderColor: activeTab === 'active' ? '#10B981' : '#334155'
// //                 }}
// //               >
// //                 <Text 
// //                   color={activeTab === 'active' ? 'white' : '#94A3B8'} 
// //                   fontSize={14}
// //                   fontWeight="600"
// //                 >
// //                   Active
// //                 </Text>
// //               </TouchableOpacity>
              
// //               <TouchableOpacity
// //                 onPress={() => setActiveTab('completed')}
// //                 style={{
// //                   flex: 1,
// //                   backgroundColor: activeTab === 'completed' ? '#8B5CF6' : '#1E293B',
// //                   paddingVertical: 10,
// //                   paddingHorizontal: 16,
// //                   borderRadius: 20,
// //                   alignItems: 'center',
// //                   borderWidth: 1,
// //                   borderColor: activeTab === 'completed' ? '#8B5CF6' : '#334155'
// //                 }}
// //               >
// //                 <Text 
// //                   color={activeTab === 'completed' ? 'white' : '#94A3B8'} 
// //                   fontSize={14}
// //                   fontWeight="600"
// //                 >
// //                   Completed
// //                 </Text>
// //               </TouchableOpacity>
// //             </XStack>
// //           </View>

// //           {/* Goals List */}
// //           <View style={{ flex: 1, paddingHorizontal: 20 }}>
// //             {loading ? (
// //               <YStack flex={1} jc="center" ai="center">
// //                 <Spinner size="large" color="#3B82F6" />
// //                 <Text color="#94A3B8" mt="$3">Loading goals...</Text>
// //               </YStack>
// //             ) : filteredGoals.length === 0 ? (
// //               <YStack flex={1} jc="center" ai="center" space="$4">
// //                 <Target size={64} color="#334155" />
// //                 <Text color="#64748B" fontSize={16} fontWeight="600">
// //                   No goals found
// //                 </Text>
// //                 <Text color="#64748B" fontSize={14} textAlign="center" px="$8">
// //                   {activeTab === 'all' 
// //                     ? "You haven't created any goals yet. Start by creating your first financial goal!"
// //                     : `No ${activeTab} goals found.`
// //                   }
// //                 </Text>
// //                 {activeTab === 'all' && (
// //                   <TouchableOpacity
// //                     onPress={() => setShowCreateModal(true)}
// //                     style={{
// //                       backgroundColor: '#3B82F6',
// //                       paddingHorizontal: 24,
// //                       paddingVertical: 12,
// //                       borderRadius: 20,
// //                       marginTop: 16
// //                     }}
// //                   >
// //                     <Text color="white" fontSize={14} fontWeight="600">
// //                       Create First Goal
// //                     </Text>
// //                   </TouchableOpacity>
// //                 )}
// //               </YStack>
// //             ) : (
// //               <ScrollView 
// //                 showsVerticalScrollIndicator={false}
// //                 refreshControl={
// //                   <RefreshControl
// //                     refreshing={refreshing}
// //                     onRefresh={onRefresh}
// //                     tintColor="#3B82F6"
// //                     colors={['#3B82F6']}
// //                   />
// //                 }
// //               >
// //                 <YStack pb={insets.bottom + 20}>
// //                   {filteredGoals.map(renderGoalCard)}
// //                 </YStack>
// //               </ScrollView>
// //             )}
// //           </View>
// //         </LinearGradient>

// //         {/* Modals */}
// //         {renderCreateModal()}
// //         {renderAllocateModal()}
// //         {renderFeasibilityModal()}
// //         {renderOptimizeModal()}
// //       </SafeAreaView>
// //     </Theme>
// //   );
// // }





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
  Button
} from 'tamagui';
import {
  ArrowLeft,
  Plus,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  PieChart,
  Edit3,
  Trash2,
  X,
  CheckCircle,
  Circle,
  Zap,
  Clock,
  BarChart3,
  Percent,
  Wallet,
  Sparkles,
  AlertTriangle,
  Briefcase,
  Building
} from '@tamagui/lucide-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

// Services
import { ApiService } from '../../../services/apiService';

export default function Goals() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State
  const [goals, setGoals] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [showFeasibilityModal, setShowFeasibilityModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [feasibilityData, setFeasibilityData] = useState(null);
  const [optimizeData, setOptimizeData] = useState(null);
  const [showOptimizeModal, setShowOptimizeModal] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    target_amount: '',
    target_date: new Date(),
  });

  // Allocation form state
  const [allocationData, setAllocationData] = useState({
    income_source_id: '',
    portfolio_holding_id: '',
    allocation_percentage: '',
    allocation_fixed_amount: '',
    allocation_type: 'capital'
  });

  // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Fetch all data
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch goals, incomes, and investments
      const [goalsRes, incomesRes, investmentsRes] = await Promise.all([
        ApiService.get('/goals/'),
        ApiService.get('/income/'),
        ApiService.get('/investments/')
      ]);
      
      setGoals(goalsRes.data || []);
      setIncomes(incomesRes.data || []);
      setInvestments(investmentsRes.data || []);
      
    } catch (error) {
      console.error('Fetch data error:', error);
      Alert.alert('Error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAllData();
    }, [fetchAllData])
  );

  // Calculate totals
  const totalTarget = goals.reduce((total, goal) => total + (Number(goal.target_amount) || 0), 0);
  const totalCurrent = goals.reduce((total, goal) => total + (Number(goal.current_amount) || 0), 0);
  const totalProgress = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

  // Calculate days remaining
  const calculateDaysRemaining = (targetDate) => {
    if (!targetDate) return 0;
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Calculate monthly saving needed
  const calculateMonthlySaving = (goal) => {
    if (!goal.target_date) return 0;
    
    const daysRemaining = calculateDaysRemaining(goal.target_date);
    const monthsRemaining = Math.max(daysRemaining / 30, 1);
    const remainingAmount = Math.max(goal.target_amount - goal.current_amount, 0);
    
    return remainingAmount / monthsRemaining;
  };

  // Calculate progress percentage
  const calculateProgress = (goal) => {
    if (!goal.target_amount || goal.target_amount === 0) return 0;
    return Math.min((goal.current_amount / goal.target_amount) * 100, 100);
  };

  // Get progress color
  const getProgressColor = (percentage) => {
    if (percentage >= 100) return '#22C55E'; // Green for completed
    if (percentage >= 75) return '#3B82F6'; // Blue for good progress
    if (percentage >= 50) return '#F59E0B'; // Orange for moderate
    if (percentage >= 25) return '#EF4444'; // Red for low
    return '#6B7280'; // Gray for very low
  };

  // Get status text
  const getStatusText = (goal) => {
    const progress = calculateProgress(goal);
    const daysRemaining = calculateDaysRemaining(goal.target_date);
    
    if (progress >= 100) return 'Completed';
    if (daysRemaining < 0) return 'Overdue';
    if (daysRemaining < 30) return 'Urgent';
    if (daysRemaining < 90) return 'Approaching';
    return 'On Track';
  };

  // Get status color
  const getStatusColor = (goal) => {
    const status = getStatusText(goal);
    switch (status) {
      case 'Completed': return '#22C55E';
      case 'Overdue': return '#EF4444';
      case 'Urgent': return '#F59E0B';
      case 'Approaching': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  // Format currency for India (INR)
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Add goal
  const handleAddGoal = async () => {
    try {
      if (!formData.name || !formData.target_amount) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      const goalData = {
        name: formData.name.trim(),
        target_amount: parseFloat(formData.target_amount),
        target_date: formData.target_date.toISOString().split('T')[0],
      };

      await ApiService.post('/goals/', goalData);
      
      setShowAddModal(false);
      resetForm();
      fetchAllData();
      Alert.alert('Success', 'Goal created successfully');
      
    } catch (error) {
      console.error('Add goal error:', error);
      Alert.alert('Error', error.response?.data?.detail || 'Failed to create goal');
    }
  };

  // Allocate to goal
  const handleAllocateGoal = async () => {
    try {
      // According to API: Need either income_source_id OR portfolio_holding_id
      if (!allocationData.income_source_id && !allocationData.portfolio_holding_id) {
        Alert.alert('Error', 'Please select either income source or investment');
        return;
      }

      // According to API: Need either allocation_percentage OR allocation_fixed_amount
      if (!allocationData.allocation_percentage && !allocationData.allocation_fixed_amount) {
        Alert.alert('Error', 'Please enter either percentage or fixed amount');
        return;
      }

      setProcessing(true);

      const allocateData = {
        allocation_type: allocationData.allocation_type, // 'capital' as per API example
        ...(allocationData.allocation_percentage && { 
          allocation_percentage: parseFloat(allocationData.allocation_percentage) 
        }),
        ...(allocationData.allocation_fixed_amount && { 
          allocation_fixed_amount: parseFloat(allocationData.allocation_fixed_amount) 
        }),
        ...(allocationData.income_source_id && { 
          income_source_id: allocationData.income_source_id 
        }),
        ...(allocationData.portfolio_holding_id && { 
          portfolio_holding_id: allocationData.portfolio_holding_id 
        }),
      };

      await ApiService.post(`/goals/${selectedGoal.id}/allocate`, allocateData);
      
      setShowAllocateModal(false);
      resetAllocationForm();
      fetchAllData();
      Alert.alert('Success', 'Allocation added successfully');
      
    } catch (error) {
      console.error('Allocate goal error:', error);
      Alert.alert('Error', error.response?.data?.detail || 'Failed to allocate to goal');
    } finally {
      setProcessing(false);
    }
  };

  // Check feasibility
  const handleCheckFeasibility = async (goal) => {
    try {
      setProcessing(true);
      setSelectedGoal(goal);
      
      const response = await ApiService.get(`/goals/${goal.id}/feasibility`);
      setFeasibilityData(response.data);
      setShowFeasibilityModal(true);
      
    } catch (error) {
      console.error('Feasibility check error:', error);
      Alert.alert('Error', 'Failed to check goal feasibility');
    } finally {
      setProcessing(false);
    }
  };

    // Optimize goal
  const handleOptimizeGoal = async (goal) => {
    try {
      setProcessing(true);
      setSelectedGoal(goal);
      
      const response = await ApiService.get(`/goals/${goal.id}/optimize`);
      setOptimizeData(response.data);
      setShowOptimizeModal(true);
      
    } catch (error) {
      console.error('Optimize goal error:', error);
      Alert.alert('Error', 'Failed to optimize goal');
    } finally {
      setProcessing(false);
    }
  };
    // Delete goal
    const handleDeleteGoal = async (goal) => {
      Alert.alert(
        'Delete Goal',
        `Are you sure you want to delete "${goal.name}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive',
            onPress: async () => {
              try {
                // Note: There's no delete endpoint shown in the API docs
                // You might need to implement this or use a PATCH to change status
                Alert.alert('Info', 'Delete endpoint not implemented in API');
              } catch (error) {
                console.error('Delete error:', error);
                Alert.alert('Error', 'Failed to delete goal');
              }
            }
          }
        ]
      );
    };

  // Reset forms
  const resetForm = () => {
    setFormData({
      name: '',
      target_amount: '',
      target_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    });
    setSelectedGoal(null);
  };

  const resetAllocationForm = () => {
    setAllocationData({
      income_source_id: '',
      portfolio_holding_id: '',
      allocation_percentage: '',
      allocation_fixed_amount: '',
      allocation_type: 'capital'
    });
  };

  // Open allocate modal
  const openAllocateModal = (goal) => {
    setSelectedGoal(goal);
    setShowAllocateModal(true);
  };

  // Handle date change
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, target_date: selectedDate }));
    }
  };

  // Get selected income source name
  const getSelectedIncomeName = () => {
    if (!allocationData.income_source_id) return '';
    const income = incomes.find(i => i.id === allocationData.income_source_id);
    return income ? income.name : '';
  };

  // Get selected investment name
  const getSelectedInvestmentName = () => {
    if (!allocationData.portfolio_holding_id) return '';
    const investment = investments.find(i => i.id === allocationData.portfolio_holding_id);
    return investment ? investment.name : '';
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
              Financial Goals
            </H2>
            <Text color="#666666" fontSize={14}>
              Track and achieve your targets
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

        {/* TOTAL PROGRESS */}
        <Card m={20} mb={16} backgroundColor="#1A1A1A" br={16}>
          <YStack p={20}>
            <Text color="#999999" fontSize={12} fontWeight="600" mb={8} ls={1}>
              TOTAL GOALS PROGRESS
            </Text>
            
            <XStack jc="space-between" ai="center" mb={12}>
              <YStack>
                <Text color="#22C55E" fontSize={24} fontWeight="900">
                  {formatCurrency(totalCurrent)}
                </Text>
                <Text color="#666666" fontSize={12}>
                  Saved of {formatCurrency(totalTarget)}
                </Text>
              </YStack>
              <Text color="#EAB308" fontSize={18} fontWeight="900">
                {totalProgress.toFixed(1)}%
              </Text>
            </XStack>
            
            <Progress 
              value={totalProgress} 
              height={6} 
              backgroundColor="#333333"
              borderRadius={3}
            >
              <Progress.Indicator 
                backgroundColor="#EAB308"
                borderRadius={3}
              />
            </Progress>
            
            <XStack jc="space-between" ai="center" mt={12}>
              <Text color="#666666" fontSize={12}>
                {goals.length} goal{goals.length !== 1 ? 's' : ''}
              </Text>
              <Text color="#666666" fontSize={12}>
                {goals.filter(g => calculateProgress(g) >= 100).length} completed
              </Text>
            </XStack>
          </YStack>
        </Card>

        {/* GOALS LIST */}
        <ScrollView 
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <YStack py={48} ai="center">
              <Spinner size="large" color="#EAB308" />
              <Text color="#666666" fontSize={14} mt={16}>
                Loading goals...
              </Text>
            </YStack>
          ) : goals.length > 0 ? (
            <YStack space={16}>
              {goals.map((goal, index) => {
                const progress = calculateProgress(goal);
                const daysRemaining = calculateDaysRemaining(goal.target_date);
                const monthlySaving = calculateMonthlySaving(goal);
                const statusText = getStatusText(goal);
                const statusColor = getStatusColor(goal);
                const progressColor = getProgressColor(progress);
                
                return (
                  <Card 
                    key={goal.id || index} 
                    backgroundColor="#1A1A1A" 
                    p={16} 
                    br={12}
                    bw={1}
                    bc="#333333"
                  >
                    <YStack space={12}>
                      {/* Header */}
                      <XStack jc="space-between" ai="center">
                        <XStack ai="center" space={12}>
                          <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: `${progressColor}20`,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                            <Target size={20} color={progressColor} />
                          </View>
                          
                          <YStack>
                            <Text color="white" fontWeight="800" fontSize={16}>
                              {goal.name}
                            </Text>
                            <XStack ai="center" space={6} mt={2}>
                              <Circle size={6} bg={statusColor} />
                              <Text color={statusColor} fontSize={12} fontWeight="600">
                                {statusText}
                              </Text>
                            </XStack>
                          </YStack>
                        </XStack>
                        
                        <XStack space={12}>
                          <TouchableOpacity 
                            onPress={() => openAllocateModal(goal)}
                            style={{ padding: 6 }}
                          >
                            <Plus size={16} color="#666666" />
                          </TouchableOpacity>
                          <TouchableOpacity 
                            onPress={() => handleDeleteGoal(goal)}
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
                          <Text color={progressColor} fontSize={12} fontWeight="700">
                            {progress.toFixed(1)}%
                          </Text>
                        </XStack>
                        <View style={{
                          height: 6,
                          backgroundColor: '#333333',
                          borderRadius: 3,
                          overflow: 'hidden',
                        }}>
                          <View style={{
                            width: `${Math.min(progress, 100)}%`,
                            height: '100%',
                            backgroundColor: progressColor,
                            borderRadius: 3,
                          }} />
                        </View>
                      </YStack>

                      {/* Amounts */}
                      <XStack jc="space-between" ai="center">
                        <YStack>
                          <Text color="#999999" fontSize={11} fontWeight="600">
                            CURRENT
                          </Text>
                          <Text color="white" fontSize={14} fontWeight="700" mt={2}>
                            {formatCurrency(goal.current_amount)}
                          </Text>
                        </YStack>
                        
                        <YStack ai="center">
                          <Text color="#999999" fontSize={11} fontWeight="600">
                            TARGET
                          </Text>
                          <Text color="#EAB308" fontSize={14} fontWeight="700" mt={2}>
                            {formatCurrency(goal.target_amount)}
                          </Text>
                        </YStack>
                        
                        <YStack ai="flex-end">
                          <Text color="#999999" fontSize={11} fontWeight="600">
                            REMAINING
                          </Text>
                          <Text color="#22C55E" fontSize={14} fontWeight="700" mt={2}>
                            {formatCurrency(Math.max(goal.target_amount - goal.current_amount, 0))}
                          </Text>
                        </YStack>
                      </XStack>

                      {/* Timeline */}
                      <XStack jc="space-between" ai="center">
                        <XStack ai="center" space={6}>
                          <Calendar size={12} color="#666666" />
                          <Text color="#666666" fontSize={11}>
                            {formatDate(goal.target_date)}
                          </Text>
                        </XStack>
                        
                        <XStack ai="center" space={6}>
                          <Clock size={12} color="#666666" />
                          <Text color="#666666" fontSize={11}>
                            {daysRemaining > 0 ? `${daysRemaining} days left` : 'Past due'}
                          </Text>
                        </XStack>
                      </XStack>

                      {/* Monthly Saving */}
                      {daysRemaining > 0 && progress < 100 && (
                        <XStack jc="space-between" ai="center" p={8} bg="#222222" br={8}>
                          <XStack ai="center" space={6}>
                            <TrendingUp size={12} color="#F59E0B" />
                            <Text color="#F59E0B" fontSize={11} fontWeight="600">
                              Monthly needed:
                            </Text>
                          </XStack>
                          <Text color="white" fontSize={12} fontWeight="700">
                            {formatCurrency(monthlySaving)}
                          </Text>
                        </XStack>
                      )}

                      {/* Action Buttons */}
                      <XStack space={8} mt={4}>
                        <TouchableOpacity
                          onPress={() => handleCheckFeasibility(goal)}
                          style={{
                            flex: 1,
                            backgroundColor: '#333333',
                            paddingVertical: 8,
                            borderRadius: 6,
                            alignItems: 'center',
                          }}
                        >
                          <Text color="#3B82F6" fontSize={12} fontWeight="700">
                            Check Feasibility
                          </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                          onPress={() => handleOptimizeGoal(goal)}
                          style={{
                            flex: 1,
                            backgroundColor: '#333333',
                            paddingVertical: 8,
                            borderRadius: 6,
                            alignItems: 'center',
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => handleOptimizeGoal(goal)}
                            style={{
                              flex: 1,
                              backgroundColor: '#333333',
                              paddingVertical: 8,
                              borderRadius: 6,
                              alignItems: 'center',
                            }}
                          >
                            <Text color="#EAB308" fontSize={12} fontWeight="700">
                              Optimize
                            </Text>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      </XStack>
                    </YStack>
                  </Card>
                );
              })}
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
                <Target size={32} color="#666666" />
              </View>
              <Text color="#666666" fontSize={18} fontWeight="600" mt={16}>
                No goals yet
              </Text>
              <Text color="#444444" fontSize={14} mt={8} textAlign="center">
                Create your first financial goal
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
                  Create Goal
                </Text>
              </TouchableOpacity>
            </YStack>
          )}
        </ScrollView>

        {/* ADD GOAL MODAL */}
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
                  Create New Goal
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
                      Goal Name *
                    </Text>
                    <Input
                      placeholder="e.g., Buy a Car, Down Payment, Vacation"
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

                  {/* Target Amount */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Target Amount *
                    </Text>
                    <Input
                      placeholder="0"
                      value={formData.target_amount}
                      onChangeText={(text) => setFormData({...formData, target_amount: text})}
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

                  {/* Target Date */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Target Date
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      style={{
                        backgroundColor: '#333333',
                        borderWidth: 1,
                        borderColor: '#444444',
                        borderRadius: 8,
                        padding: 16,
                      }}
                    >
                      <XStack ai="center" space={12}>
                        <Calendar size={16} color="#666666" />
                        <Text color="white" fontSize={16}>
                          {formatDate(formData.target_date)}
                        </Text>
                      </XStack>
                    </TouchableOpacity>
                  </YStack>

                  {/* Submit Button */}
                  <TouchableOpacity
                    onPress={handleAddGoal}
                    disabled={!formData.name || !formData.target_amount}
                    style={{
                      backgroundColor: '#EAB308',
                      padding: 16,
                      borderRadius: 12,
                      alignItems: 'center',
                      marginTop: 8,
                      opacity: (!formData.name || !formData.target_amount) ? 0.7 : 1,
                    }}
                  >
                    <Text color="black" fontSize={16} fontWeight="800">
                      Create Goal
                    </Text>
                  </TouchableOpacity>
                </YStack>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* ALLOCATE MODAL */}
        <Modal
          visible={showAllocateModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setShowAllocateModal(false);
            resetAllocationForm();
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
                  Allocate to {selectedGoal?.name}
                </H4>
                <TouchableOpacity 
                  onPress={() => {
                    setShowAllocateModal(false);
                    resetAllocationForm();
                  }}
                  style={{ padding: 8 }}
                >
                  <X size={24} color="#666666" />
                </TouchableOpacity>
              </XStack>

              <ScrollView showsVerticalScrollIndicator={false}>
                <YStack space={20}>
                  {/* Allocation Type */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Allocation Type *
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      <TouchableOpacity
                        onPress={() => setAllocationData(prev => ({ ...prev, allocation_type: 'capital' }))}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                          backgroundColor: allocationData.allocation_type === 'capital' ? '#EAB30820' : '#333333',
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: allocationData.allocation_type === 'capital' ? '#EAB308' : '#444444',
                        }}
                      >
                        <DollarSign size={14} color={allocationData.allocation_type === 'capital' ? '#EAB308' : '#666666'} />
                        <Text 
                          color={allocationData.allocation_type === 'capital' ? '#EAB308' : '#666666'} 
                          fontSize={12} 
                          fontWeight="700"
                          ml={6}
                        >
                          Capital
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text color="#666666" fontSize={11} mt={4}>
                      Note: Only 'capital' allocation type is supported
                    </Text>
                  </YStack>

                  {/* Income Source Selection */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Select Income Source (Optional)
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <XStack space={8}>
                        <TouchableOpacity
                          onPress={() => setAllocationData(prev => ({ 
                            ...prev, 
                            income_source_id: '',
                            portfolio_holding_id: '' 
                          }))}
                          style={{
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                            backgroundColor: !allocationData.income_source_id && !allocationData.portfolio_holding_id ? '#3B82F620' : '#333333',
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: !allocationData.income_source_id && !allocationData.portfolio_holding_id ? '#3B82F6' : '#444444',
                          }}
                        >
                          <Text 
                            color={!allocationData.income_source_id && !allocationData.portfolio_holding_id ? '#3B82F6' : '#666666'} 
                            fontSize={12}
                            fontWeight="600"
                          >
                            None
                          </Text>
                        </TouchableOpacity>
                        {incomes.map(income => (
                          <TouchableOpacity
                            key={income.id}
                            onPress={() => setAllocationData(prev => ({ 
                              ...prev, 
                              income_source_id: income.id,
                              portfolio_holding_id: '' 
                            }))}
                            style={{
                              paddingHorizontal: 12,
                              paddingVertical: 8,
                              backgroundColor: allocationData.income_source_id === income.id ? '#10B98120' : '#333333',
                              borderRadius: 20,
                              borderWidth: 1,
                              borderColor: allocationData.income_source_id === income.id ? '#10B981' : '#444444',
                            }}
                          >
                            <Text 
                              color={allocationData.income_source_id === income.id ? '#10B981' : '#666666'} 
                              fontSize={12}
                              fontWeight="600"
                            >
                              {income.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </XStack>
                    </ScrollView>
                  </YStack>

                  {/* Investment Selection */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Select Investment (Optional)
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <XStack space={8}>
                        {investments.map(investment => (
                          <TouchableOpacity
                            key={investment.id}
                            onPress={() => setAllocationData(prev => ({ 
                              ...prev, 
                              portfolio_holding_id: investment.id,
                              income_source_id: '' 
                            }))}
                            style={{
                              paddingHorizontal: 12,
                              paddingVertical: 8,
                              backgroundColor: allocationData.portfolio_holding_id === investment.id ? '#F59E0B20' : '#333333',
                              borderRadius: 20,
                              borderWidth: 1,
                              borderColor: allocationData.portfolio_holding_id === investment.id ? '#F59E0B' : '#444444',
                            }}
                          >
                            <Text 
                              color={allocationData.portfolio_holding_id === investment.id ? '#F59E0B' : '#666666'} 
                              fontSize={12}
                              fontWeight="600"
                            >
                              {investment.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </XStack>
                    </ScrollView>
                    <Text color="#666666" fontSize={11} mt={4}>
                      Note: Select either Income Source OR Investment (not both)
                    </Text>
                  </YStack>

                  {/* Percentage Allocation */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Allocation Percentage (Optional)
                    </Text>
                    <Input
                      placeholder="0"
                      value={allocationData.allocation_percentage}
                      onChangeText={(text) => setAllocationData(prev => ({ 
                        ...prev, 
                        allocation_percentage: text.replace(/[^0-9]/g, ''),
                        allocation_fixed_amount: '' 
                      }))}
                      backgroundColor="#333333"
                      borderColor="#444444"
                      color="white"
                      placeholderTextColor="#666666"
                      keyboardType="numeric"
                      fontSize={16}
                      br={8}
                      suffix={<Text color="#666666" ml={8}>%</Text>}
                    />
                  </YStack>

                  {/* Fixed Amount Allocation */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Fixed Amount (Optional)
                    </Text>
                    <Input
                      placeholder="0"
                      value={allocationData.allocation_fixed_amount}
                      onChangeText={(text) => setAllocationData(prev => ({ 
                        ...prev, 
                        allocation_fixed_amount: text.replace(/[^0-9]/g, ''),
                        allocation_percentage: '' 
                      }))}
                      backgroundColor="#333333"
                      borderColor="#444444"
                      color="white"
                      placeholderTextColor="#666666"
                      keyboardType="numeric"
                      fontSize={16}
                      br={8}
                      prefix={<Text color="#666666" mr={8}>₹</Text>}
                    />
                  </YStack>
                  <Text color="#666666" fontSize={11} mt={-8}>
                    Note: Enter either Percentage OR Fixed Amount (not both)
                  </Text>

                  {/* Selected Source Info */}
                  {(allocationData.income_source_id || allocationData.portfolio_holding_id) && (
                    <Card backgroundColor="#333333" p={12} br={8}>
                      <Text color="#999999" fontSize={12} fontWeight="600" mb={4}>
                        Selected Source:
                      </Text>
                      {allocationData.income_source_id && (
                        <XStack ai="center" space={8}>
                          <Briefcase size={12} color="#10B981" />
                          <Text color="white" fontSize={12} fontWeight="600">
                            {getSelectedIncomeName()}
                          </Text>
                        </XStack>
                      )}
                      {allocationData.portfolio_holding_id && (
                        <XStack ai="center" space={8}>
                          <Building size={12} color="#F59E0B" />
                          <Text color="white" fontSize={12} fontWeight="600">
                            {getSelectedInvestmentName()}
                          </Text>
                        </XStack>
                      )}
                    </Card>
                  )}

                  {/* Submit Button */}
                  <TouchableOpacity
                    onPress={handleAllocateGoal}
                    disabled={processing || 
                      (!allocationData.income_source_id && !allocationData.portfolio_holding_id) ||
                      (!allocationData.allocation_percentage && !allocationData.allocation_fixed_amount)}
                    style={{
                      backgroundColor: '#EAB308',
                      padding: 16,
                      borderRadius: 12,
                      alignItems: 'center',
                      marginTop: 8,
                      opacity: (processing || 
                        (!allocationData.income_source_id && !allocationData.portfolio_holding_id) ||
                        (!allocationData.allocation_percentage && !allocationData.allocation_fixed_amount)) ? 0.7 : 1,
                    }}
                  >
                    {processing ? (
                      <Spinner size="small" color="black" />
                    ) : (
                      <Text color="black" fontSize={16} fontWeight="800">
                        Allocate Funds
                      </Text>
                    )}
                  </TouchableOpacity>
                </YStack>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* FEASIBILITY MODAL */}
        <Modal
          visible={showFeasibilityModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setShowFeasibilityModal(false);
            setFeasibilityData(null);
          }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', padding: 20 }}>
            <Card backgroundColor="#1A1A1A" p={24} br={16}>
              <YStack space={16}>
                <XStack jc="space-between" ai="center">
                  <H4 color="white" fontWeight="800" fontSize={20}>
                    Goal Feasibility
                  </H4>
                  <TouchableOpacity onPress={() => {
                    setShowFeasibilityModal(false);
                    setFeasibilityData(null);
                  }}>
                    <X size={24} color="#666666" />
                  </TouchableOpacity>
                </XStack>
                
                {selectedGoal && (
                  <YStack space={12}>
                    <Text color="#EAB308" fontSize={16} fontWeight="700">
                      {selectedGoal.name}
                    </Text>
                    <Text color="#666666" fontSize={14}>
                      Target: {formatCurrency(selectedGoal.target_amount)}
                    </Text>
                    
                    {feasibilityData && (
                      <Card backgroundColor="#333333" p={16} br={8}>
                        <YStack space={12}>
                          <XStack jc="space-between" ai="center">
                            <YStack>
                              <Text color="#999999" fontSize={12}>Guaranteed Amount</Text>
                              <Text color="#10B981" fontSize={18} fontWeight="700">
                                {formatCurrency(feasibilityData.guaranteed)}
                              </Text>
                            </YStack>
                            <YStack ai="flex-end">
                              <Text color="#999999" fontSize={12}>Advisory Amount</Text>
                              <Text color="#3B82F6" fontSize={18} fontWeight="700">
                                {formatCurrency(feasibilityData.advisory)}
                              </Text>
                            </YStack>
                          </XStack>
                          
                          <Progress 
                            value={(feasibilityData.guaranteed / selectedGoal.target_amount) * 100} 
                            height={6} 
                            backgroundColor="#222222"
                            borderRadius={3}
                          >
                            <Progress.Indicator 
                              backgroundColor="#10B981"
                              borderRadius={3}
                            />
                          </Progress>
                          
                          <Text color="#666666" fontSize={11} textAlign="center">
                            {((feasibilityData.guaranteed / selectedGoal.target_amount) * 100).toFixed(1)}% of target is guaranteed
                          </Text>
                        </YStack>
                      </Card>
                    )}
                  </YStack>
                )}
                
                <TouchableOpacity
                  onPress={() => {
                    setShowFeasibilityModal(false);
                    setFeasibilityData(null);
                  }}
                  style={{
                    backgroundColor: '#333333',
                    padding: 16,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginTop: 8,
                  }}
                >
                  <Text color="white" fontSize={14} fontWeight="700">
                    Close
                  </Text>
                </TouchableOpacity>
              </YStack>
            </Card>
          </View>
        </Modal>

        {/* DATE PICKER */}
        {showDatePicker && (
          <DateTimePicker
            value={formData.target_date}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}
      </SafeAreaView>

      <Modal
  visible={showOptimizeModal}
  animationType="slide"
  transparent={true}
  onRequestClose={() => {
    setShowOptimizeModal(false);
    setOptimizeData(null);
  }}
>
  <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', padding: 20 }}>
    <Card backgroundColor="#1A1A1A" p={24} br={16}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
        <YStack space={16}>
          <XStack jc="space-between" ai="center">
            <H4 color="white" fontWeight="800" fontSize={20}>
              Optimization Plan
            </H4>
            <TouchableOpacity onPress={() => {
              setShowOptimizeModal(false);
              setOptimizeData(null);
            }}>
              <X size={24} color="#666666" />
            </TouchableOpacity>
          </XStack>
          
          {selectedGoal && optimizeData && (
            <YStack space={16}>
              {/* Goal Info */}
              <Card backgroundColor="#333333" p={16} br={8}>
                <YStack space={8}>
                  <Text color="#EAB308" fontSize={16} fontWeight="700">
                    {selectedGoal.name}
                  </Text>
                  <XStack jc="space-between">
                    <Text color="#999999" fontSize={12}>Target Amount</Text>
                    <Text color="white" fontSize={12} fontWeight="600">
                      {formatCurrency(selectedGoal.target_amount)}
                    </Text>
                  </XStack>
                  <XStack jc="space-between">
                    <Text color="#999999" fontSize={12}>Feasibility Score</Text>
                    <Text color="#10B981" fontSize={12} fontWeight="600">
                      {(optimizeData.feasibility_score * 100).toFixed(0)}%
                    </Text>
                  </XStack>
                  <XStack jc="space-between">
                    <Text color="#999999" fontSize={12}>Time to Goal</Text>
                    <Text color="#3B82F6" fontSize={12} fontWeight="600">
                      {optimizeData.time_to_goal_months} months
                    </Text>
                  </XStack>
                </YStack>
              </Card>

              {/* Recommended Plan */}
              {optimizeData.recommended_plan && (
                <Card backgroundColor="#333333" p={16} br={8} borderLeftWidth={4} borderLeftColor="#10B981">
                  <YStack space={12}>
                    <XStack ai="center" space={8}>
                      <Zap size={16} color="#10B981" />
                      <Text color="#10B981" fontSize={16} fontWeight="700">
                        Recommended Plan
                      </Text>
                    </XStack>
                    
                    <YStack space={6}>
                      <XStack jc="space-between">
                        <Text color="#999999" fontSize={12}>Source Type</Text>
                        <Text color="white" fontSize={12} fontWeight="600">
                          {optimizeData.recommended_plan.source === 'income' ? 'Income' : 'Investment'}
                        </Text>
                      </XStack>
                      <XStack jc="space-between">
                        <Text color="#999999" fontSize={12}>Allocation</Text>
                        <Text color="white" fontSize={12} fontWeight="600">
                          {optimizeData.recommended_plan.allocation_percentage}%
                        </Text>
                      </XStack>
                      <XStack jc="space-between">
                        <Text color="#999999" fontSize={12}>Monthly Contribution</Text>
                        <Text color="white" fontSize={12} fontWeight="600">
                          {formatCurrency(optimizeData.recommended_plan.monthly_contribution)}
                        </Text>
                      </XStack>
                      <XStack jc="space-between">
                        <Text color="#999999" fontSize={12}>Months to Goal</Text>
                        <Text color="white" fontSize={12} fontWeight="600">
                          {optimizeData.recommended_plan.months_to_goal}
                        </Text>
                      </XStack>
                      <XStack jc="space-between">
                        <Text color="#999999" fontSize={12}>Confidence</Text>
                        <Text color="white" fontSize={12} fontWeight="600">
                          {(optimizeData.recommended_plan.confidence * 100).toFixed(0)}%
                        </Text>
                      </XStack>
                    </YStack>
                    
                    <TouchableOpacity
                      onPress={() => {
                        // Auto-fill allocation form with recommended plan
                        if (optimizeData.recommended_plan.source === 'income') {
                          setAllocationData({
                            income_source_id: optimizeData.recommended_plan.source_id || '',
                            portfolio_holding_id: '',
                            allocation_percentage: optimizeData.recommended_plan.allocation_percentage?.toString() || '',
                            allocation_fixed_amount: '',
                            allocation_type: 'capital'
                          });
                          setShowOptimizeModal(false);
                          setShowAllocateModal(true);
                        }
                      }}
                      style={{
                        backgroundColor: '#10B98120',
                        padding: 8,
                        borderRadius: 6,
                        alignItems: 'center',
                        marginTop: 8,
                        borderWidth: 1,
                        borderColor: '#10B981',
                      }}
                    >
                      <Text color="#10B981" fontSize={12} fontWeight="600">
                        Apply This Plan
                      </Text>
                    </TouchableOpacity>
                  </YStack>
                </Card>
              )}

              {/* Alternative Plans */}
              {optimizeData.alternatives && optimizeData.alternatives.length > 0 && (
                <Card backgroundColor="#333333" p={16} br={8}>
                  <YStack space={12}>
                    <Text color="#EAB308" fontSize={14} fontWeight="700">
                      Alternative Plans ({optimizeData.alternatives.length})
                    </Text>
                    
                    <YStack space={8}>
                      {optimizeData.alternatives.slice(0, 3).map((alt, index) => (
                        <Card key={index} backgroundColor="#222222" p={12} br={6}>
                          <YStack space={4}>
                            <XStack jc="space-between">
                              <Text color="#999999" fontSize={10}>Source</Text>
                              <Text color="white" fontSize={10} fontWeight="600">
                                {alt.source === 'income' ? 'Income' : 'Investment'}
                              </Text>
                            </XStack>
                            <XStack jc="space-between">
                              <Text color="#999999" fontSize={10}>Allocation</Text>
                              <Text color="white" fontSize={10} fontWeight="600">
                                {alt.allocation_percentage}%
                              </Text>
                            </XStack>
                            <XStack jc="space-between">
                              <Text color="#999999" fontSize={10}>Monthly</Text>
                              <Text color="white" fontSize={10} fontWeight="600">
                                {formatCurrency(alt.monthly_contribution)}
                              </Text>
                            </XStack>
                            <XStack jc="space-between">
                              <Text color="#999999" fontSize={10}>Months</Text>
                              <Text color="white" fontSize={10} fontWeight="600">
                                {alt.months_to_goal}
                              </Text>
                            </XStack>
                          </YStack>
                        </Card>
                      ))}
                    </YStack>
                    
                    {optimizeData.alternatives.length > 3 && (
                      <Text color="#666666" fontSize={10} textAlign="center">
                        + {optimizeData.alternatives.length - 3} more alternatives
                      </Text>
                    )}
                  </YStack>
                </Card>
              )}

              {/* Constraints Checked */}
              {optimizeData.constraints_checked && optimizeData.constraints_checked.length > 0 && (
                <Card backgroundColor="#333333" p={16} br={8}>
                  <YStack space={8}>
                    <Text color="#3B82F6" fontSize={14} fontWeight="700">
                      Constraints Checked
                    </Text>
                    <YStack space={4}>
                      {optimizeData.constraints_checked.map((constraint, index) => (
                        <XStack key={index} space={8} ai="center">
                          <CheckCircle size={12} color="#10B981" />
                          <Text color="#999999" fontSize={11} flex={1}>
                            {constraint}
                          </Text>
                        </XStack>
                      ))}
                    </YStack>
                  </YStack>
                </Card>
              )}

              {/* Risks */}
              {optimizeData.risks && optimizeData.risks.length > 0 && (
                <Card backgroundColor="#333333" p={16} br={8} borderLeftWidth={4} borderLeftColor="#EF4444">
                  <YStack space={8}>
                    <XStack ai="center" space={8}>
                      <AlertTriangle size={16} color="#EF4444" />
                      <Text color="#EF4444" fontSize={14} fontWeight="700">
                        Risks to Consider
                      </Text>
                    </XStack>
                    <YStack space={4}>
                      {optimizeData.risks.map((risk, index) => (
                        <XStack key={index} space={8} ai="flex-start">
                          <Circle size={6} color="#EF4444" mt={4} />
                          <Text color="#999999" fontSize={11} flex={1}>
                            {risk}
                          </Text>
                        </XStack>
                      ))}
                    </YStack>
                  </YStack>
                </Card>
              )}

              {/* Apply Recommended Plan Button */}
              {optimizeData.recommended_plan && (
                <TouchableOpacity
                  onPress={() => {
                    if (optimizeData.recommended_plan.source === 'income') {
                      setAllocationData({
                        income_source_id: optimizeData.recommended_plan.source_id || '',
                        portfolio_holding_id: '',
                        allocation_percentage: optimizeData.recommended_plan.allocation_percentage?.toString() || '',
                        allocation_fixed_amount: '',
                        allocation_type: 'capital'
                      });
                      setShowOptimizeModal(false);
                      setShowAllocateModal(true);
                    }
                  }}
                  style={{
                    backgroundColor: '#EAB308',
                    padding: 16,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text color="black" fontSize={14} fontWeight="700">
                    Apply Recommended Plan
                  </Text>
                </TouchableOpacity>
              )}
            </YStack>
          )}

          <TouchableOpacity
            onPress={() => {
              setShowOptimizeModal(false);
              setOptimizeData(null);
            }}
            style={{
              backgroundColor: '#333333',
              padding: 16,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 8,
            }}
          >
            <Text color="white" fontSize={14} fontWeight="700">
              Close
            </Text>
          </TouchableOpacity>
        </YStack>
      </ScrollView>
    </Card>
  </View>
</Modal>
    </Theme>
  );
}
