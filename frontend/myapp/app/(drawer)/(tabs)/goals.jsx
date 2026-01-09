// import React, { useState, useEffect, useCallback } from 'react';
// import { 
//   FlatList, Modal, Alert, RefreshControl, KeyboardAvoidingView, 
//   Platform, TouchableOpacity, StyleSheet, View, ScrollView 
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { YStack, XStack, Text, Button, Input, Theme, Card, Spinner, H3, Separator } from 'tamagui';
// import { LinearGradient } from 'expo-linear-gradient';
// import { ArrowLeft, Plus, Target, X, CheckCircle, Flag, Calendar, Zap, ChevronRight } from '@tamagui/lucide-icons';
// import { useRouter } from 'expo-router';
// import { api } from '../../../services/api'; 

// export default function GoalsScreen() {
//   const router = useRouter();
  
//   // Data State
//   const [goals, setGoals] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // UI State
//   const [modalVisible, setModalVisible] = useState(false);
//   const [allocModalVisible, setAllocModalVisible] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // Form State (Create)
//   const [name, setName] = useState('');
//   const [targetAmount, setTargetAmount] = useState('');
//   const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

//   // Allocation State
//   const [selectedGoal, setSelectedGoal] = useState(null);
//   const [allocAmount, setAllocAmount] = useState('');

//   const fetchGoals = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/api/v1/goals/');
//       setGoals(response.data);
//     } catch (error) {
//       console.error("Fetch Goals Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchGoals();
//   }, [fetchGoals]);

//   const handleCreate = async () => {
//     if (!name || !targetAmount) return;
//     setSubmitting(true);
//     try {
//       await api.post('/api/v1/goals/', {
//         name,
//         target_amount: parseFloat(targetAmount),
//         target_date: targetDate
//       });
//       setModalVisible(false);
//       setName(''); setTargetAmount('');
//       fetchGoals();
//     } catch (error) {
//       Alert.alert("Error", "Could not sync goal.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // --- ALLOCATION LOGIC ---
//   const handleAllocate = async () => {
//     if (!allocAmount || !selectedGoal) return;
//     setSubmitting(true);
//     try {
//       // API: POST /api/v1/goals/{goal_id}/allocate
//       await api.post(`/api/v1/goals/${selectedGoal.id}/allocate`, {
//         allocation_fixed_amount: parseFloat(allocAmount),
//         allocation_percentage: 0, // Defaulting to fixed amount
//       });
      
//       Alert.alert("Success", "Funds allocated to objective.");
//       setAllocModalVisible(false);
//       setAllocAmount('');
//       fetchGoals();
//     } catch (error) {
//       Alert.alert("Error", "Allocation failed. Check your balance.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formatCurrency = (val) => 
//     new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

//   return (
//     <Theme name="dark">
//       <View style={styles.container}>
//         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
//           <YStack px={20} f={1}>

//             {/* HEADER */}
//             <XStack jc="space-between" ai="center" py="$4">
//               <TouchableOpacity onPress={() => router.back()} style={styles.navBtn}>
//                 <ArrowLeft size={22} color="white" />
//               </TouchableOpacity>
//               <Text style={styles.headerTitle}>GOAL VAULT</Text>
//               <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addBtn}>
//                 <Plus size={22} color="black" />
//               </TouchableOpacity>
//             </XStack>

//             <FlatList
//               data={goals}
//               keyExtractor={item => item.id}
//               showsVerticalScrollIndicator={false}
//               refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchGoals} tintColor="#EAB308" />}
//               renderItem={({ item }) => {
//                 const progress = (item.current_amount / item.target_amount) * 100 || 0;
//                 return (
//                   <Card bg="#0A0A0A" p="$5" mb="$4" bc="#1A1A1A" bw={1} br="$5">
//                     <YStack space="$3">
//                       <XStack jc="space-between" ai="center">
//                         <Text color="white" fontWeight="900" fontSize={18}>{item.name}</Text>
//                         <TouchableOpacity 
//                           onPress={() => { setSelectedGoal(item); setAllocModalVisible(true); }}
//                           style={styles.allocBtn}
//                         >
//                           <Zap size={14} color="black" />
//                           <Text color="black" fontWeight="800" fontSize={10} ml="$1">FUEL</Text>
//                         </TouchableOpacity>
//                       </XStack>

//                       <XStack jc="space-between">
//                          <Text color="#444" fontSize={10} fontWeight="800">PROGRESS</Text>
//                          <Text color="white" fontSize={10} fontWeight="800">{progress.toFixed(1)}%</Text>
//                       </XStack>

//                       <View style={styles.progressTrack}>
//                         <View style={[styles.progressBar, { width: `${Math.min(progress, 100)}%` }]} />
//                       </View>

//                       <XStack jc="space-between" ai="center" mt="$1">
//                         <Text color="#22C55E" fontWeight="900" fontSize={14}>{formatCurrency(item.current_amount)}</Text>
//                         <Text color="#555" fontWeight="700" fontSize={12}>Target: {formatCurrency(item.target_amount)}</Text>
//                       </XStack>
//                     </YStack>
//                   </Card>
//                 );
//               }}
//             />
//           </YStack>
//         </SafeAreaView>

//         {/* --- ALLOCATION MODAL --- */}
//         <Modal visible={allocModalVisible} animationType="fade" transparent>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <XStack jc="space-between" ai="center" mb="$5">
//                 <Text style={styles.modalTitle}>ALLOCATE FUNDS</Text>
//                 <TouchableOpacity onPress={() => setAllocModalVisible(false)}><X size={24} color="#666" /></TouchableOpacity>
//               </XStack>
              
//               <Text color="$silver4" fontSize={12} mb="$4">
//                 Fuelling Goal: <Text color="white" fontWeight="bold">{selectedGoal?.name}</Text>
//               </Text>

//               <YStack space="$4">
//                 <View>
//                    <Text style={styles.label}>AMOUNT TO ALLOCATE (INR)</Text>
//                    <Input 
//                       value={allocAmount} onChangeText={setAllocAmount}
//                       keyboardType="numeric" bg="black" color="white" h={55} bc="#222"
//                       placeholder="e.g. 5000"
//                    />
//                 </View>

//                 <Button bg="#EAB308" color="black" h={55} fontWeight="900" onPress={handleAllocate} disabled={submitting}>
//                    {submitting ? <Spinner color="black" /> : "CONFIRM ALLOCATION"}
//                 </Button>
//               </YStack>
//             </View>
//           </View>
//         </Modal>

//         {/* --- CREATE MODAL (Previous implementation) --- */}
//         <Modal visible={modalVisible} animationType="slide" transparent>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//                 <XStack jc="space-between" ai="center" mb="$6">
//                     <Text style={styles.modalTitle}>NEW GOAL</Text>
//                     <TouchableOpacity onPress={() => setModalVisible(false)}><X size={24} color="#666" /></TouchableOpacity>
//                 </XStack>
//                 <YStack space="$5">
//                     <View>
//                         <Text style={styles.label}>GOAL NAME</Text>
//                         <Input value={name} onChangeText={setName} bg="black" color="white" h={55} bc="#222" placeholder="e.g. Vacation" />
//                     </View>
//                     <View>
//                         <Text style={styles.label}>TARGET AMOUNT</Text>
//                         <Input value={targetAmount} onChangeText={setTargetAmount} keyboardType="numeric" bg="black" color="white" h={55} bc="#222" />
//                     </View>
//                     <Button bg="#EAB308" color="black" h={60} fontWeight="900" onPress={handleCreate} disabled={submitting}>
//                         DEPLOY
//                     </Button>
//                 </YStack>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </Theme>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   headerTitle: { color: 'white', fontWeight: '900', fontSize: 13, letterSpacing: 2 },
//   navBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
//   addBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EAB308', justifyContent: 'center', alignItems: 'center' },
//   allocBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EAB308', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
//   progressTrack: { height: 6, backgroundColor: '#111', borderRadius: 3, marginTop: 5, overflow: 'hidden' },
//   progressBar: { height: '100%', backgroundColor: '#22C55E', borderRadius: 3 },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' },
//   modalContent: { backgroundColor: '#0A0A0A', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 60, borderTopWidth: 1, borderColor: '#1A1A1A' },
//   modalTitle: { color: 'white', fontWeight: '900', fontSize: 16 },
//   label: { color: '#444', fontSize: 10, fontWeight: '800', marginBottom: 8 },
// });




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
  AlertTriangle
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
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [showFeasibilityModal, setShowFeasibilityModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [processing, setProcessing] = useState(false);
  
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

  // Allocation types
  const allocationTypes = [
    { value: 'capital', label: 'Capital', icon: <DollarSign size={14} /> },
    { value: 'percentage', label: 'Percentage', icon: <Percent size={14} /> },
    { value: 'recurring', label: 'Recurring', icon: <Calendar size={14} /> }
  ];

  // Fetch goals
  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ApiService.get('/goals/');
      setGoals(response.data || []);
    } catch (error) {
      console.error('Fetch goals error:', error);
      Alert.alert('Error', 'Failed to load goals');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchGoals();
    }, [fetchGoals])
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
        target_date: formData.target_date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      };

      await ApiService.post('/goals/', goalData);
      
      setShowAddModal(false);
      resetForm();
      fetchGoals();
      Alert.alert('Success', 'Goal created successfully');
      
    } catch (error) {
      console.error('Add goal error:', error);
      Alert.alert('Error', 'Failed to create goal');
    }
  };

  // Allocate to goal
  const handleAllocateGoal = async () => {
    try {
      if (!allocationData.allocation_percentage && !allocationData.allocation_fixed_amount) {
        Alert.alert('Error', 'Please enter either percentage or fixed amount');
        return;
      }

      setProcessing(true);

      const allocateData = {
        allocation_type: allocationData.allocation_type,
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
      fetchGoals();
      Alert.alert('Success', 'Allocation added successfully');
      
    } catch (error) {
      console.error('Allocate goal error:', error);
      Alert.alert('Error', 'Failed to allocate to goal');
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
      
      const response = await ApiService.get(`/goals/${goal.id}/optimize`);
      
      Alert.alert(
        'Optimization Complete',
        response.data || 'Goal optimization suggestions generated.',
        [
          { text: 'OK' },
          { 
            text: 'View Details', 
            onPress: () => {
              // You could navigate to a detailed optimization view
              console.log('Optimization details:', response.data);
            }
          }
        ]
      );
      
      fetchGoals();
      
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
              // Assuming you have a delete endpoint
              // If not, you might need to implement soft delete
              await ApiService.delete(`/goals/${goal.id}`);
              fetchGoals();
              Alert.alert('Success', 'Goal deleted');
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
      target_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Default to 1 year from now
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

  // Format currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Handle date change
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, target_date: selectedDate }));
    }
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
                          <Text color="#EAB308" fontSize={12} fontWeight="700">
                            Optimize
                          </Text>
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
                      prefix={<Text color="#666666" mr={8}>$</Text>}
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
                      Allocation Type
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      {allocationTypes.map(type => (
                        <TouchableOpacity
                          key={type.value}
                          onPress={() => setAllocationData(prev => ({ ...prev, allocation_type: type.value }))}
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                            backgroundColor: allocationData.allocation_type === type.value ? '#EAB30820' : '#333333',
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: allocationData.allocation_type === type.value ? '#EAB308' : '#444444',
                          }}
                        >
                          {React.cloneElement(type.icon, { 
                            size: 14,
                            color: allocationData.allocation_type === type.value ? '#EAB308' : '#666666'
                          })}
                          <Text 
                            color={allocationData.allocation_type === type.value ? '#EAB308' : '#666666'} 
                            fontSize={12} 
                            fontWeight="700"
                            ml={6}
                          >
                            {type.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </YStack>

                  {/* Percentage Allocation */}
                  {allocationData.allocation_type === 'percentage' && (
                    <YStack>
                      <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                        Allocation Percentage
                      </Text>
                      <Input
                        placeholder="0"
                        value={allocationData.allocation_percentage}
                        onChangeText={(text) => setAllocationData({...allocationData, allocation_percentage: text})}
                        backgroundColor="#333333"
                        borderColor="#444444"
                        color="white"
                        placeholderTextColor="#666666"
                        keyboardType="decimal-pad"
                        fontSize={16}
                        br={8}
                        suffix={<Text color="#666666" ml={8}>%</Text>}
                      />
                    </YStack>
                  )}

                  {/* Fixed Amount Allocation */}
                  {(allocationData.allocation_type === 'capital' || allocationData.allocation_type === 'recurring') && (
                    <YStack>
                      <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                        Fixed Amount
                      </Text>
                      <Input
                        placeholder="0"
                        value={allocationData.allocation_fixed_amount}
                        onChangeText={(text) => setAllocationData({...allocationData, allocation_fixed_amount: text})}
                        backgroundColor="#333333"
                        borderColor="#444444"
                        color="white"
                        placeholderTextColor="#666666"
                        keyboardType="decimal-pad"
                        fontSize={16}
                        br={8}
                        prefix={<Text color="#666666" mr={8}>$</Text>}
                      />
                    </YStack>
                  )}

                  {/* Submit Button */}
                  <TouchableOpacity
                    onPress={handleAllocateGoal}
                    disabled={processing || (!allocationData.allocation_percentage && !allocationData.allocation_fixed_amount)}
                    style={{
                      backgroundColor: '#EAB308',
                      padding: 16,
                      borderRadius: 12,
                      alignItems: 'center',
                      marginTop: 8,
                      opacity: (processing || (!allocationData.allocation_percentage && !allocationData.allocation_fixed_amount)) ? 0.7 : 1,
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
          onRequestClose={() => setShowFeasibilityModal(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', padding: 20 }}>
            <Card backgroundColor="#1A1A1A" p={24} br={16}>
              <YStack space={16}>
                <XStack jc="space-between" ai="center">
                  <H4 color="white" fontWeight="800" fontSize={20}>
                    Goal Feasibility
                  </H4>
                  <TouchableOpacity onPress={() => setShowFeasibilityModal(false)}>
                    <X size={24} color="#666666" />
                  </TouchableOpacity>
                </XStack>
                
                <YStack ai="center" py={20}>
                  <Sparkles size={40} color="#EAB308" />
                  <Text color="#EAB308" fontSize={16} fontWeight="700" mt={12} textAlign="center">
                    {selectedGoal?.name}
                  </Text>
                  <Text color="#666666" fontSize={14} mt={8} textAlign="center">
                    Feasibility analysis would appear here
                  </Text>
                </YStack>
                
                <TouchableOpacity
                  onPress={() => setShowFeasibilityModal(false)}
                  style={{
                    backgroundColor: '#333333',
                    padding: 16,
                    borderRadius: 8,
                    alignItems: 'center',
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
    </Theme>
  );
}

