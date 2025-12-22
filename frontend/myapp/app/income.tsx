import React, { useState, useEffect } from 'react';
import { 
  FlatList, 
  Modal, 
  Alert, 
  RefreshControl, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
// 1. USE THE CORRECT SAFE AREA VIEW
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { YStack, XStack, Text, Button, Input, H3, Theme, Card, Spinner, Switch } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Briefcase, DollarSign, ArrowLeft, CheckCircle, X } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { FinanceService } from '../services/financeService';
import { Income } from '../types/api';
import { BlurView } from 'expo-blur';

// VALID DATABASE ENUMS
const INCOME_TYPES = ['salary', 'business', 'rental', 'dividend', 'interest', 'other'];

export default function IncomeScreen() {
  const router = useRouter();
  
  // State
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [sourceType, setSourceType] = useState('salary');

  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const data = await FinanceService.getIncomes();
      setIncomes(data);
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleAdd = async () => {
    if (!name || !amount) {
      Alert.alert("Missing Fields", "Please enter a name and amount.");
      return;
    }

    setSubmitting(true);
    try {
      const numericAmount = parseFloat(amount.replace(/,/g, '')); 
      
      const payload = {
        name: name,
        estimated_monthly_amount: numericAmount,
        source_type: sourceType,
        rate_type: 'fixed', 
      };

      await FinanceService.addIncome(payload);
      
      setModalVisible(false);
      setName('');
      setAmount('');
      fetchIncomes(); 
      Alert.alert("Success", "Income source added.");

    } catch (error: any) {
      console.error("Add Income Error:", error.response?.data || error);
      Alert.alert("Failed to Add", "Please check your inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      setIncomes(prev => prev.map(inc => inc.id === id ? { ...inc, is_active: !currentStatus } : inc));
      await FinanceService.updateIncome(id, { is_active: !currentStatus });
    } catch (error) {
      Alert.alert("Error", "Failed to update status.");
      fetchIncomes();
    }
  };

  return (
    <Theme name="dark">
      <LinearGradient colors={['#000', '#09090b']} style={{ flex: 1 }}>
        
        {/* SAFE AREA FROM CONTEXT (Correct Way) */}
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          <YStack px={20} pb={20} f={1}>
            
            {/* HEADER */}
            <XStack jc="space-between" ai="center" mb="$6" mt="$2">
              <XStack ai="center" space="$2">
                <Button size="$3" chromeless circular icon={<ArrowLeft size={24} color="$silver4"/>} onPress={() => router.back()} />
                <H3 color="white">Income Streams</H3>
              </XStack>
              <Button size="$3" bg="$gold3" color="black" icon={<Plus size={18}/>} onPress={() => setModalVisible(true)}>
                Add
              </Button>
            </XStack>

            {/* TOTAL SUMMARY */}
            <Card bg="rgba(34, 197, 94, 0.1)" borderColor="rgba(34, 197, 94, 0.3)" bw={1} p="$4" mb="$6">
              <Text color="$silver4" fontSize={11} letterSpacing={1} mb="$1">TOTAL MONTHLY INCOME</Text>
              <H3 color="#22c55e">
                ${incomes.filter(i => i.is_active).reduce((sum, item) => sum + item.estimated_monthly_amount, 0).toLocaleString()}
              </H3>
            </Card>

            {/* LIST */}
            <FlatList
              data={incomes}
              keyExtractor={item => item.id}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchIncomes} tintColor="#EAB308" />}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={!loading ? <Text color="$silver4" ta="center" mt="$4">No income sources added.</Text> : null}
              renderItem={({ item }) => (
                <Card bg="rgba(255,255,255,0.03)" p="$4" mb="$3" borderColor="$silver2" bw={1}>
                  <XStack jc="space-between" ai="center">
                    <XStack space="$3" ai="center">
                      <YStack w={40} h={40} bg="rgba(255,255,255,0.05)" br={10} jc="center" ai="center">
                        <Briefcase size={20} color={item.is_active ? "#EAB308" : "#52525B"} />
                      </YStack>
                      <YStack>
                        <Text color={item.is_active ? "white" : "$silver4"} fontWeight="bold" fontSize={16}>{item.name}</Text>
                        <Text color="$silver4" fontSize={11} textTransform="uppercase">{item.source_type}</Text>
                      </YStack>
                    </XStack>
                    
                    <YStack ai="flex-end">
                      <Text color={item.is_active ? "#22c55e" : "$silver4"} fontWeight="bold" fontSize={16}>
                        ${item.estimated_monthly_amount}
                      </Text>
                      <XStack ai="center" space="$2" mt="$1">
                        <Text fontSize={10} color="$silver4">{item.is_active ? "Active" : "Paused"}</Text>
                        <Switch size="$2" checked={item.is_active} onCheckedChange={() => toggleActive(item.id, item.is_active)}>
                          <Switch.Thumb animation="quicker" bg="white" />
                        </Switch>
                      </XStack>
                    </YStack>
                  </XStack>
                </Card>
              )}
            />

            {/* MODAL */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <BlurView intensity={40} tint="dark" style={{ flex: 1 }}>
                <KeyboardAvoidingView 
                  behavior={Platform.OS === "ios" ? "padding" : "height"} 
                  style={{ flex: 1, justifyContent: 'flex-end' }}
                >
                  <YStack 
                    bg="#18181b" 
                    borderTopLeftRadius={25} 
                    borderTopRightRadius={25} 
                    p="$5" 
                    pb={Platform.OS === 'ios' ? 50 : 30} 
                    borderColor="$silver3" bw={1}
                  >
                    <XStack jc="space-between" ai="center" mb="$4">
                      <H3 color="white">Add Income</H3>
                      <Button size="$3" chromeless icon={<X size={24} color="$silver4"/>} onPress={() => setModalVisible(false)} />
                    </XStack>
                    
                    <YStack space="$4">
                      <YStack>
                        <Text color="$silver4" fontSize={11} mb="$2">NAME</Text>
                        <Input 
                          value={name} onChangeText={setName} 
                          bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" h={50}
                          placeholder="e.g. Salary" placeholderTextColor="#555"
                        />
                      </YStack>

                      <YStack>
                        <Text color="$silver4" fontSize={11} mb="$2">AMOUNT</Text>
                        <Input 
                          value={amount} onChangeText={setAmount} keyboardType="numeric"
                          bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" h={50}
                          placeholder="0.00" placeholderTextColor="#555"
                        />
                      </YStack>

                      <Text color="$silver4" fontSize={11} mb="$1">SOURCE TYPE</Text>
                      <XStack space="$2" flexWrap="wrap"> 
                        {INCOME_TYPES.map((type) => (
                          <Button 
                            key={type} 
                            size="$3" 
                            bg={sourceType === type ? "$gold3" : "rgba(255,255,255,0.1)"}
                            color={sourceType === type ? "black" : "white"}
                            onPress={() => setSourceType(type)}
                            mb="$2" mr="$1"
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Button>
                        ))}
                      </XStack>

                      <Button 
                        bg="$gold3" color="black" mt="$4" size="$5" fontWeight="bold"
                        onPress={handleAdd} disabled={submitting}
                        icon={submitting ? <Spinner color="black"/> : <CheckCircle size={18}/>}
                      >
                        {submitting ? "Adding..." : "Save Income"}
                      </Button>
                    </YStack>
                  </YStack>
                </KeyboardAvoidingView>
              </BlurView>
            </Modal>

          </YStack>
        </SafeAreaView>
      </LinearGradient>
    </Theme>
  );
}