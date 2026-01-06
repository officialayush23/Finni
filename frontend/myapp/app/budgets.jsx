import React, { useState, useEffect, useCallback } from 'react';
import { 
  FlatList, Modal, Alert, RefreshControl, KeyboardAvoidingView, 
  Platform, TouchableOpacity, StyleSheet, ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { YStack, XStack, Text, Button, Input, Theme, Card, Spinner, View, Switch } from 'tamagui';
import { Plus, ArrowLeft, Target, X, CheckCircle } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { api } from '../services/api'; 

const PERIODS = ['weekly', 'monthly', 'yearly'];

export default function BudgetScreen() {
  const router = useRouter();
  
  // Data State
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // UI State
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState(null); 
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');
  const [period, setPeriod] = useState('monthly');

  // --- 1. FETCH BUDGETS (GET) ---
  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/budgets/');
      setBudgets(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  // --- 2. TOGGLE STATUS (PATCH) ---
  const toggleActive = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    // Optimistic UI
    setBudgets(prev => prev.map(b => b.id === id ? { ...b, is_active: newStatus } : b));
    
    try {
      await api.patch(`/api/v1/budgets/${id}`, { is_active: newStatus });
    } catch (e) {
      Alert.alert("Sync Error", "Failed to update status.");
      fetchBudgets(); // Revert
    }
  };

  // --- 3. OPEN MODAL (CREATE OR EDIT) ---
  const openModal = (budget = null) => {
    if (budget) {
      setEditingId(budget.id);
      setName(budget.name);
      setLimit(budget.limit_amount.toString());
      setPeriod(budget.period);
    } else {
      setEditingId(null);
      setName('');
      setLimit('');
      setPeriod('monthly');
    }
    setModalVisible(true);
  };

  // --- 4. SAVE (POST OR PATCH) ---
  const handleSave = async () => {
    if (!name || !limit) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setSubmitting(true);
    const payload = {
      name: name,
      limit_amount: parseFloat(limit),
      period: period,
      alert_threshold: 80,
    };

    try {
      if (editingId) {
        // UPDATE
        await api.patch(`/api/v1/budgets/${editingId}`, payload);
      } else {
        // CREATE
        await api.post('/api/v1/budgets/', { ...payload, included_category_ids: [] });
      }
      setModalVisible(false);
      fetchBudgets();
    } catch (error) {
      Alert.alert("Error", "Could not save budget.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (val) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);

  return (
    <Theme name="dark">
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <YStack px={20} f={1} space="$4">

            {/* HEADER */}
            <XStack jc="space-between" ai="center" py="$4">
              <TouchableOpacity onPress={() => router.back()} style={styles.navBtn}>
                <ArrowLeft size={22} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>BUDGETS</Text>
              <TouchableOpacity onPress={() => openModal()} style={styles.addBtn}>
                <Plus size={22} color="black" />
              </TouchableOpacity>
            </XStack>

            {/* LIST */}
            <FlatList
              data={budgets}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchBudgets} tintColor="#EAB308" />}
              contentContainerStyle={{ paddingBottom: 100 }}
              renderItem={({ item }) => (
                <View style={[styles.budgetCard, !item.is_active && { opacity: 0.5 }]}>
                  <XStack jc="space-between" ai="center" mb="$4">
                    <TouchableOpacity onPress={() => openModal(item)} style={{ flex: 1 }}>
                      <XStack space="$3" ai="center">
                        <View style={styles.iconBox}>
                           <Target size={18} color="#EAB308" />
                        </View>
                        <YStack>
                          <Text color="white" fontWeight="800" fontSize={16}>{item.name}</Text>
                          <Text color="#555" fontSize={10} fontWeight="700">{item.period.toUpperCase()}</Text>
                        </YStack>
                      </XStack>
                    </TouchableOpacity>
                    
                    {/* ACTIVE TOGGLE */}
                    <Switch 
                      size="$1" 
                      checked={item.is_active} 
                      onCheckedChange={() => toggleActive(item.id, item.is_active)}
                    >
                      <Switch.Thumb animation="quick" bg="white" />
                    </Switch>
                  </XStack>

                  <XStack jc="space-between" mb="$2">
                     <Text color="#666" fontSize={11}>SPENT: <Text color="white">{formatCurrency(item.spent)}</Text></Text>
                     <Text color="#666" fontSize={11}>LIMIT: <Text color="white">{formatCurrency(item.limit_amount)}</Text></Text>
                  </XStack>

                  {/* PROGRESS BAR */}
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressBar, { width: `${Math.min(item.percentage_used || 0, 100)}%` }]} />
                  </View>
                </View>
              )}
            />
          </YStack>
        </SafeAreaView>

        {/* MODAL */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <XStack jc="space-between" ai="center" mb="$6">
                    <Text style={styles.modalTitle}>{editingId ? 'EDIT BUDGET' : 'NEW BUDGET'}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}><X size={24} color="#666" /></TouchableOpacity>
                </XStack>

                <YStack space="$5">
                    <View>
                        <Text style={styles.label}>NAME</Text>
                        <Input value={name} onChangeText={setName} bg="black" color="white" borderColor="#222" h={50} />
                    </View>
                    <View>
                        <Text style={styles.label}>LIMIT (INR)</Text>
                        <Input value={limit} onChangeText={setLimit} keyboardType="numeric" bg="black" color="white" borderColor="#222" h={50} />
                    </View>
                    <YStack>
                        <Text style={styles.label}>PERIOD</Text>
                        <XStack gap="$2">
                            {PERIODS.map(p => (
                                <TouchableOpacity 
                                  key={p} 
                                  onPress={() => setPeriod(p)} 
                                  style={[styles.chip, period === p && styles.activeChip]}
                                >
                                    <Text style={[styles.chipText, period === p && {color: 'black'}]}>{p.toUpperCase()}</Text>
                                </TouchableOpacity>
                            ))}
                        </XStack>
                    </YStack>

                    <Button bg="#EAB308" color="black" h={55} fontWeight="900" mt="$4" onPress={handleSave} disabled={submitting}>
                        {submitting ? <Spinner color="black" /> : editingId ? "UPDATE" : "CREATE"}
                    </Button>
                </YStack>
            </View>
          </View>
        </Modal>
      </View>
    </Theme>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  headerTitle: { color: 'white', fontWeight: '900', fontSize: 13, letterSpacing: 2 },
  navBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
  addBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EAB308', justifyContent: 'center', alignItems: 'center' },
  budgetCard: { backgroundColor: '#0A0A0A', borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#1A1A1A' },
  iconBox: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  progressTrack: { height: 6, backgroundColor: '#111', borderRadius: 3, marginTop: 10, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#EAB308', borderRadius: 3 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#0A0A0A', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 50, borderTopWidth: 1, borderColor: '#1A1A1A' },
  modalTitle: { color: 'white', fontWeight: '900', fontSize: 16 },
  label: { color: '#444', fontSize: 10, fontWeight: '800', marginBottom: 8 },
  chip: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: '#111', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  activeChip: { backgroundColor: '#EAB308', borderColor: '#EAB308' },
  chipText: { color: '#666', fontSize: 10, fontWeight: '800' }
});