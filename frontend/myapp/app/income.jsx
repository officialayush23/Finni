// import React, { useState, useEffect } from 'react';
// import { 
//   FlatList, Modal, Alert, RefreshControl, KeyboardAvoidingView, 
//   Platform, TouchableOpacity, StyleSheet 
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context'; 
// import { YStack, XStack, Text, Button, Input, H3, Theme, Card, Spinner, Switch, View, Separator } from 'tamagui';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Plus, Briefcase, ArrowLeft, CheckCircle, X, DollarSign } from '@tamagui/lucide-icons';
// import { useRouter } from 'expo-router';
// import { api } from '../services/api'; 
// import { ScrollView } from 'react-native';

// const INCOME_TYPES = ['salary', 'business', 'rental', 'dividend', 'interest', 'other'];

// export default function IncomeScreen() {
//   const router = useRouter();
  
//   const [incomes, setIncomes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // Form State
//   const [name, setName] = useState('');
//   const [amount, setAmount] = useState('');
//   const [sourceType, setSourceType] = useState('salary');

//   const fetchIncomes = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/api/v1/income/');
//       setIncomes(response.data);
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIncomes();
//   }, []);

//   const handleAdd = async () => {
//     if (!name || !amount) {
//       Alert.alert("Missing Fields", "Please enter a name and amount.");
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const payload = {
//         name: name,
//         source_type: sourceType,
//         rate_type: 'fixed', 
//         estimated_monthly_amount: parseFloat(amount),
//         api_source_identifier: "manual" 
//       };
//       await api.post('/api/v1/income/', payload);
//       setModalVisible(false);
//       setName(''); setAmount('');
//       fetchIncomes();
//     } catch (error) {
//       Alert.alert("Error", "Could not save income stream.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const toggleActive = async (id, currentStatus) => {
//     try {
//       setIncomes(prev => prev.map(inc => inc.id === id ? { ...inc, is_active: !currentStatus } : inc));
//       await api.patch(`/api/v1/income/${id}`, { is_active: !currentStatus });
//     } catch (error) {
//       fetchIncomes();
//     }
//   };

//   const totalMonthly = incomes
//     .filter(i => i.is_active)
//     .reduce((sum, item) => sum + (item.estimated_monthly_amount || 0), 0);

//   return (
//     <Theme name="dark">
//       <View style={styles.container}>
//         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
//           <YStack px={20} f={1} space="$4">
            
//             {/* HEADER */}
//             <XStack jc="space-between" ai="center" py="$4">
//               <TouchableOpacity onPress={() => router.back()} style={styles.navAction}>
//                 <ArrowLeft size={22} color="white" />
//               </TouchableOpacity>
//               <Text style={styles.headerTitle}>INCOME LEDGER</Text>
//               <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.navAction}>
//                 <Plus size={22} color="#EAB308" />
//               </TouchableOpacity>
//             </XStack>

//             {/* SUMMARY CARD */}
//             <Card bg="#0A0A0A" bw={1} bc="#1A1A1A" p="$5" br="$6">
//               <YStack space="$1">
//                 <Text color="#666" fontSize={10} fontWeight="800" letterSpacing={1.5}>TOTAL MONTHLY YIELD</Text>
//                 <H3 color="#22C55E" fontWeight="900" fontSize={32}>
//                   ₹{totalMonthly.toLocaleString()}
//                 </H3>
//               </YStack>
//             </Card>

//             {/* INCOME LIST */}
//             <FlatList
//               data={incomes}
//               keyExtractor={item => item.id}
//               showsVerticalScrollIndicator={false}
//               refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchIncomes} tintColor="#EAB308" />}
//               contentContainerStyle={{ paddingBottom: 100 }}
//               renderItem={({ item }) => (
//                 <View style={[styles.incomeCard, !item.is_active && { opacity: 0.6 }]}>
//                   <XStack jc="space-between" ai="center">
//                     <XStack space="$3" ai="center">
//                       <View style={styles.iconContainer}>
//                         <Briefcase size={18} color={item.is_active ? "#EAB308" : "#444"} />
//                       </View>
//                       <YStack>
//                         <Text color="white" fontWeight="700" fontSize={16}>{item.name}</Text>
//                         <Text color="#555" fontSize={10} fontWeight="700">{item.source_type.toUpperCase()}</Text>
//                       </YStack>
//                     </XStack>
//                     <YStack ai="flex-end" space="$2">
//                       <Text color="white" fontWeight="800" fontSize={16}>
//                         ₹{(item.estimated_monthly_amount || 0).toLocaleString()}
//                       </Text>
//                       {/* CLEARLY VISIBLE TOGGLE */}
//                       <XStack ai="center" space="$2">
//                          <Text color="#444" fontSize={9} fontWeight="800">{item.is_active ? "ACTIVE" : "PAUSED"}</Text>
//                          <Switch 
//                            size="$1" 
//                            checked={item.is_active} 
//                            onCheckedChange={() => toggleActive(item.id, item.is_active)}
//                            bg={item.is_active ? "#22C55E" : "#333"}
//                          >
//                            <Switch.Thumb animation="quick" bg="white" />
//                          </Switch>
//                       </XStack>
//                     </YStack>
//                   </XStack>
//                 </View>
//               )}
//             />

//             {/* REGISTER MODAL */}
//             <Modal visible={modalVisible} animationType="slide" transparent>
//               <View style={styles.modalOverlay}>
//                 <View style={styles.modalContent}>
//                   <XStack jc="space-between" ai="center" mb="$6">
//                     <Text style={styles.modalTitle}>NEW REVENUE SOURCE</Text>
//                     <TouchableOpacity onPress={() => setModalVisible(false)}>
//                       <X size={24} color="#666" />
//                     </TouchableOpacity>
//                   </XStack>

//                   <ScrollView showsVerticalScrollIndicator={false}>
//                     <YStack space="$5">
//                       <View>
//                         <Text style={styles.label}>NAME</Text>
//                         <Input 
//                           value={name} onChangeText={setName} 
//                           placeholder="e.g. Freelance Gigs" 
//                           placeholderTextColor="#333" style={styles.input}
//                         />
//                       </View>

//                       <View>
//                         <Text style={styles.label}>ESTIMATED MONTHLY AMOUNT</Text>
//                         <Input 
//                           value={amount} onChangeText={setAmount} 
//                           keyboardType="numeric" placeholder="0.00" 
//                           placeholderTextColor="#333" style={styles.input}
//                         />
//                       </View>

//                       <YStack>
//                         <Text style={styles.label}>CATEGORY</Text>
//                         <XStack flexWrap="wrap" gap="$2">
//                           {INCOME_TYPES.map(type => (
//                             <TouchableOpacity 
//                               key={type} 
//                               onPress={() => setSourceType(type)}
//                               style={[styles.typeChip, sourceType === type && styles.activeChip]}
//                             >
//                               <Text style={[styles.chipText, sourceType === type && { color: 'black' }]}>
//                                 {type.toUpperCase()}
//                               </Text>
//                             </TouchableOpacity>
//                           ))}
//                         </XStack>
//                       </YStack>

//                       <Button 
//                         bg="#EAB308" color="black" fontWeight="900" mt="$4" h={55}
//                         onPress={handleAdd} disabled={submitting}
//                         icon={submitting ? <Spinner color="black" /> : <CheckCircle size={18} />}
//                       >
//                         SAVE TO LEDGER
//                       </Button>
//                     </YStack>
//                   </ScrollView>
//                 </View>
//               </View>
//             </Modal>

//           </YStack>
//         </SafeAreaView>
//       </View>
//     </Theme>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   headerTitle: { color: 'white', fontWeight: '900', fontSize: 13, letterSpacing: 2 },
//   navAction: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 12, backgroundColor: '#0A0A0A', borderWidth: 1, borderColor: '#1A1A1A' },
//   incomeCard: { backgroundColor: '#050505', borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#111' },
//   iconContainer: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' },
//   modalContent: { backgroundColor: '#0A0A0A', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, borderTopWidth: 1, borderColor: '#1A1A1A', maxHeight: '80%' },
//   modalTitle: { color: 'white', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
//   label: { color: '#444', fontSize: 10, fontWeight: '800', marginBottom: 8, letterSpacing: 1 },
//   input: { backgroundColor: '#000', borderWidth: 1, borderColor: '#1A1A1A', color: 'white', height: 50 },
//   typeChip: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, backgroundColor: '#111', borderWidth: 1, borderColor: '#1A1A1A' },
//   activeChip: { backgroundColor: '#EAB308', borderColor: '#EAB308' },
//   chipText: { color: '#666', fontSize: 10, fontWeight: '800' }
// });



// app/income.jsx
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
  Select,
  Card
} from 'tamagui';
import {
  ArrowLeft,
  Plus,
  Briefcase,
  DollarSign,
  Calendar,
  Edit3,
  Trash2,
  X,
  Clock,
  TrendingUp
} from '@tamagui/lucide-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Services
import { ApiService } from '../services/apiService';

export default function Income() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    estimated_monthly_amount: '',
    rate_type: 'MONTHLY'
  });

  // Rate types
  const rateTypes = [
    { value: 'MONTHLY', label: 'Monthly' },
    { value: 'YEARLY', label: 'Yearly' },
    { value: 'WEEKLY', label: 'Weekly' },
    { value: 'HOURLY', label: 'Hourly' }
  ];

  // Fetch incomes
  const fetchIncomes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ApiService.getIncomes();
      setIncomes(response.data || []);
    } catch (error) {
      console.error('Fetch incomes error:', error);
      Alert.alert('Error', 'Failed to load income sources');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchIncomes();
    }, [fetchIncomes])
  );

  // Calculate total monthly income
  const totalMonthlyIncome = incomes.reduce((total, income) => {
    let monthlyAmount = Number(income.estimated_monthly_amount) || 0;
    
    // Convert to monthly if needed
    if (income.rate_type === 'YEARLY') {
      monthlyAmount = monthlyAmount / 12;
    } else if (income.rate_type === 'WEEKLY') {
      monthlyAmount = monthlyAmount * 4.33;
    } else if (income.rate_type === 'HOURLY') {
      monthlyAmount = monthlyAmount * 160; // Approx monthly hours
    }
    
    return total + monthlyAmount;
  }, 0);

  // Add income
  const handleAddIncome = async () => {
    try {
      if (!formData.name || !formData.estimated_monthly_amount) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      const incomeData = {
        name: formData.name.trim(),
        estimated_monthly_amount: parseFloat(formData.estimated_monthly_amount),
        rate_type: formData.rate_type
      };

      await ApiService.createIncome(incomeData);
      
      setShowAddModal(false);
      resetForm();
      fetchIncomes();
      Alert.alert('Success', 'Income source added successfully');
      
    } catch (error) {
      console.error('Add income error:', error);
      Alert.alert('Error', 'Failed to add income source');
    }
  };

  // Update income
  const handleUpdateIncome = async (id) => {
    try {
      if (!formData.name || !formData.estimated_monthly_amount) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      const incomeData = {
        name: formData.name.trim(),
        estimated_monthly_amount: parseFloat(formData.estimated_monthly_amount),
        rate_type: formData.rate_type
      };

      await ApiService.updateIncome(id, incomeData);
      
      setShowAddModal(false);
      setSelectedIncome(null);
      resetForm();
      fetchIncomes();
      Alert.alert('Success', 'Income source updated successfully');
      
    } catch (error) {
      console.error('Update income error:', error);
      Alert.alert('Error', 'Failed to update income source');
    }
  };

  // Delete income
  const handleDeleteIncome = async (id) => {
    Alert.alert(
      'Delete Income Source',
      'Are you sure you want to delete this income source?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await ApiService.updateIncome(id, { status: 'deleted' });
              fetchIncomes();
              Alert.alert('Success', 'Income source deleted');
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Failed to delete income source');
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
      estimated_monthly_amount: '',
      rate_type: 'MONTHLY'
    });
    setSelectedIncome(null);
  };

  // Open edit modal
  const openEditModal = (income) => {
    setSelectedIncome(income);
    setFormData({
      name: income.name || '',
      estimated_monthly_amount: income.estimated_monthly_amount?.toString() || '',
      rate_type: income.rate_type || 'MONTHLY'
    });
    setShowAddModal(true);
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount || 0);

  const getRateLabel = (rateType) => {
    const rate = rateTypes.find(r => r.value === rateType);
    return rate?.label || rateType;
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
              Income
            </H2>
            <Text color="#666666" fontSize={14}>
              Track your cash inflows
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

        {/* TOTAL INCOME */}
        <Card m={20} mb={16} backgroundColor="#1A1A1A">
          <YStack p={20}>
            <Text color="#999999" fontSize={12} fontWeight="600" mb={8}>
              TOTAL MONTHLY INCOME
            </Text>
            
            <H2 color="#22C55E" fontWeight="900" fontSize={36} mb={8}>
              {formatCurrency(totalMonthlyIncome)}
            </H2>
            
            <Text color="#666666" fontSize={14}>
              {incomes.length} income source{incomes.length !== 1 ? 's' : ''}
            </Text>
          </YStack>
        </Card>

        {/* INCOME SOURCES LIST */}
        <ScrollView 
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}
          showsVerticalScrollIndicator={false}
        >
          {incomes.length > 0 ? (
            <YStack space={12}>
              {incomes.map((income, index) => (
                <Card key={income.id || index} backgroundColor="#1A1A1A" p={16} borderRadius={12}>
                  <XStack jc="space-between" ai="center">
                    <XStack ai="center" space={12}>
                      <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#22C55E20',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <Briefcase size={20} color="#22C55E" />
                      </View>
                      
                      <YStack>
                        <Text color="white" fontWeight="800" fontSize={16}>
                          {income.name}
                        </Text>
                        <Text color="#666666" fontSize={12}>
                          {getRateLabel(income.rate_type)} • {formatCurrency(income.estimated_monthly_amount)}
                        </Text>
                      </YStack>
                    </XStack>
                    
                    <XStack space={12}>
                      <TouchableOpacity onPress={() => openEditModal(income)}>
                        <Edit3 size={18} color="#666666" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDeleteIncome(income.id)}>
                        <Trash2 size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </XStack>
                  </XStack>
                </Card>
              ))}
            </YStack>
          ) : (
            <YStack ai="center" py={48}>
              <Briefcase size={64} color="#333333" />
              <Text color="#666666" fontSize={16} mt={16}>
                No income sources yet
              </Text>
              <Text color="#444444" fontSize={14} mt={8}>
                Add your first income source
              </Text>
            </YStack>
          )}
        </ScrollView>

        {/* ADD/EDIT INCOME MODAL */}
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
            <View style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 20 }}>
              <XStack jc="space-between" ai="center" mb={24}>
                <H4 color="white" fontWeight="800" fontSize={20}>
                  {selectedIncome ? 'Edit Income Source' : 'Add Income Source'}
                </H4>
                <TouchableOpacity onPress={() => {
                  setShowAddModal(false);
                  resetForm();
                }}>
                  <X size={24} color="#666666" />
                </TouchableOpacity>
              </XStack>

              <YStack space={16}>
                {/* Name */}
                <YStack>
                  <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                    Source Name *
                  </Text>
                  <Input
                    placeholder="e.g., Salary, Freelance, Rent"
                    value={formData.name}
                    onChangeText={(text) => setFormData({...formData, name: text})}
                    backgroundColor="#333333"
                    borderColor="#444444"
                    color="white"
                    placeholderTextColor="#666666"
                    fontSize={16}
                  />
                </YStack>

                {/* Amount */}
                <YStack>
                  <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                    Amount *
                  </Text>
                  <Input
                    placeholder="0.00"
                    value={formData.estimated_monthly_amount}
                    onChangeText={(text) => setFormData({...formData, estimated_monthly_amount: text})}
                    backgroundColor="#333333"
                    borderColor="#444444"
                    color="white"
                    placeholderTextColor="#666666"
                    keyboardType="decimal-pad"
                    fontSize={16}
                  />
                </YStack>

                {/* Rate Type */}
                <YStack>
                  <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                    Frequency
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {rateTypes.map(rate => (
                      <TouchableOpacity
                        key={rate.value}
                        onPress={() => setFormData({...formData, rate_type: rate.value})}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          backgroundColor: formData.rate_type === rate.value ? '#EAB30820' : '#333333',
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: formData.rate_type === rate.value ? '#EAB308' : '#444444',
                        }}
                      >
                        <Text color={formData.rate_type === rate.value ? '#EAB308' : '#666666'} fontSize={12} fontWeight="700">
                          {rate.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </YStack>

                {/* Submit Button */}
                <TouchableOpacity
                  onPress={selectedIncome ? () => handleUpdateIncome(selectedIncome.id) : handleAddIncome}
                  style={{
                    backgroundColor: '#EAB308',
                    padding: 16,
                    borderRadius: 12,
                    alignItems: 'center',
                    marginTop: 8,
                  }}
                >
                  <Text color="black" fontSize={16} fontWeight="800">
                    {selectedIncome ? 'Update Income' : 'Add Income'}
                  </Text>
                </TouchableOpacity>
              </YStack>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </Theme>
  );
}
