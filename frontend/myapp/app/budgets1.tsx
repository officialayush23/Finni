import React, { useState, useEffect, useCallback } from 'react';
import { 
  FlatList, 
  Modal, 
  Alert, 
  RefreshControl, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { YStack, XStack, Text, Button, Input, H3, H2, Theme, Card, Spinner, Progress, Switch } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Plus, ArrowLeft, Target, AlertTriangle, CheckCircle, X 
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { FinanceService } from '../services/financeService';
import { Budget, BudgetPeriod } from '../types/api';
import { BlurView } from 'expo-blur';

const PERIODS: BudgetPeriod[] = ['monthly', 'weekly', 'yearly'];

export default function BudgetScreen() {
  const router = useRouter();
  
  // State
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');
  const [period, setPeriod] = useState<BudgetPeriod>('monthly');
  const [alertThreshold, setAlertThreshold] = useState('80');

  // --- FETCH DATA ---
  const fetchBudgets = useCallback(async () => {
    setLoading(true);
    try {
      const data = await FinanceService.getBudgets();
      setBudgets(data);
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  // --- CREATE BUDGET ---
  const handleCreate = async () => {
    if (!name || !limit) {
      Alert.alert("Missing Fields", "Please enter name and limit.");
      return;
    }

    setSubmitting(true);
    try {
      await FinanceService.createBudget({
        name,
        limit_amount: parseFloat(limit),
        period: period,
        alert_threshold: parseFloat(alertThreshold),
        included_category_ids: [], // Sending empty array for now
        excluded_category_ids: [],
        excluded_merchants: []
      });
      
      setModalVisible(false);
      resetForm();
      fetchBudgets();
      Alert.alert("Success", "Budget created.");
    } catch (error: any) {
      console.error("Create Budget Error:", error);
      Alert.alert("Error", "Could not create budget.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setName(''); setLimit(''); setPeriod('monthly'); setAlertThreshold('80');
  };

  // --- TOGGLE ACTIVE (Optional, good for UX) ---
  const toggleActive = async (id: string, currentStatus: boolean) => {
     // Optimistic update
     setBudgets(prev => prev.map(b => b.id === id ? { ...b, is_active: !currentStatus } : b));
     try {
       await FinanceService.updateBudget(id, { is_active: !currentStatus });
     } catch(e) {
       fetchBudgets(); // Revert on fail
     }
  };

  return (
    <Theme name="dark">
      <LinearGradient colors={['#000', '#09090b', '#111']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          <YStack px={20} pb={20} f={1}>

            {/* HEADER */}
            <XStack jc="space-between" ai="center" mb="$6" mt="$2">
              <XStack ai="center" space="$2">
                <Button size="$3" chromeless circular icon={<ArrowLeft size={24} color="$silver4"/>} onPress={() => router.back()} />
                <H3 color="white">Budgets</H3>
              </XStack>
              <Button size="$3" bg="$gold3" color="black" icon={<Plus size={18}/>} onPress={() => setModalVisible(true)}>
                New Budget
              </Button>
            </XStack>

            {/* LIST */}
            <FlatList
              data={budgets}
              keyExtractor={item => item.id}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchBudgets} tintColor="#EAB308" />}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={!loading ? <Text color="$silver4" ta="center" mt="$4">No active budgets.</Text> : null}
              renderItem={({ item }) => {
                const percent = Math.min(item.percentage_used || 0, 100);
                const isOver = percent >= 100;
                const isWarning = percent >= item.alert_threshold;
                const progressColor = isOver ? "#ef4444" : isWarning ? "#EAB308" : "#22c55e";

                return (
                  <Card bg="rgba(255,255,255,0.03)" p="$4" mb="$3" borderColor="$silver2" bw={1}>
                    
                    {/* Top Row: Name & Status */}
                    <XStack jc="space-between" ai="center" mb="$3">
                      <XStack space="$3" ai="center">
                        <YStack w={36} h={36} bg="rgba(255,255,255,0.05)" br={10} jc="center" ai="center">
                           <Target size={18} color={progressColor} />
                        </YStack>
                        <YStack>
                          <Text color={item.is_active ? "white" : "$silver4"} fontWeight="bold" fontSize={16}>{item.name}</Text>
                          <Text color="$silver4" fontSize={10} textTransform="uppercase">{item.period}</Text>
                        </YStack>
                      </XStack>
                      <Switch size="$2" checked={item.is_active} onCheckedChange={() => toggleActive(item.id, item.is_active)}>
                         <Switch.Thumb animation="quicker" bg="white" />
                      </Switch>
                    </XStack>

                    {/* Middle: Amount Stats */}
                    <XStack jc="space-between" mb="$2">
                      <Text color="$silver4" fontSize={12}>Spent: <Text color="white" fontWeight="bold">${item.spent}</Text></Text>
                      <Text color="$silver4" fontSize={12}>Limit: <Text color="white" fontWeight="bold">${item.limit_amount}</Text></Text>
                    </XStack>

                    {/* Progress Bar */}
                    <YStack h={8} bg="rgba(255,255,255,0.1)" br={4} overflow="hidden" mb="$2">
                      <YStack h="100%" w={`${percent}%`} bg={progressColor} br={4} />
                    </YStack>

                    {/* Footer: Remaining / Alert */}
                    <XStack jc="space-between" ai="center">
                      <Text color={isOver ? "#ef4444" : "$silver4"} fontSize={11}>
                        {isOver ? "Over Budget!" : `${100 - percent}% Remaining`}
                      </Text>
                      {isWarning && !isOver && (
                        <XStack ai="center" space="$1">
                          <AlertTriangle size={12} color="#EAB308" />
                          <Text color="#EAB308" fontSize={10}>Nearing Limit</Text>
                        </XStack>
                      )}
                    </XStack>

                  </Card>
                );
              }}
            />

            {/* --- CREATE MODAL --- */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
              <BlurView intensity={40} tint="dark" style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <YStack bg="#18181b" borderTopLeftRadius={25} borderTopRightRadius={25} p="$5" pb={Platform.OS === 'ios' ? 40 : 20} borderColor="$silver3" bw={1}>
                    
                    <XStack jc="space-between" ai="center" mb="$4">
                      <H3 color="white">New Budget</H3>
                      <Button size="$3" chromeless icon={<X size={24} color="$silver4"/>} onPress={() => setModalVisible(false)} />
                    </XStack>

                    <YStack space="$3">
                      
                      {/* Name */}
                      <YStack>
                        <Text color="$silver4" fontSize={11} mb="$1">NAME (e.g. Groceries)</Text>
                        <Input value={name} onChangeText={setName} bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" placeholder="Eating Out" placeholderTextColor="#555" />
                      </YStack>

                      {/* Limit & Threshold */}
                      <XStack space="$2">
                        <YStack f={2}>
                          <Text color="$silver4" fontSize={11} mb="$1">LIMIT ($)</Text>
                          <Input value={limit} onChangeText={setLimit} keyboardType="numeric" bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" placeholder="500" placeholderTextColor="#555" />
                        </YStack>
                        <YStack f={1}>
                          <Text color="$silver4" fontSize={11} mb="$1">ALERT %</Text>
                          <Input value={alertThreshold} onChangeText={setAlertThreshold} keyboardType="numeric" bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" />
                        </YStack>
                      </XStack>

                      {/* Period Selector */}
                      <Text color="$silver4" fontSize={11} mt="$2" mb="$1">RESET PERIOD</Text>
                      <XStack space="$2">
                        {PERIODS.map((p) => (
                          <Button 
                            key={p} size="$3" f={1}
                            bg={period === p ? "$gold3" : "rgba(255,255,255,0.1)"} 
                            color={period === p ? "black" : "white"} 
                            onPress={() => setPeriod(p)}
                          >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </Button>
                        ))}
                      </XStack>

                      <Button 
                        bg="$gold3" color="black" mt="$4" size="$5" fontWeight="bold"
                        onPress={handleCreate} disabled={submitting}
                        icon={submitting ? <Spinner color="black"/> : <CheckCircle size={18}/>}
                      >
                        {submitting ? "Saving..." : "Create Budget"}
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
