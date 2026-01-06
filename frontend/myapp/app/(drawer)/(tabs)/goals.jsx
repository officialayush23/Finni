import React, { useState, useEffect, useCallback } from 'react';
import { 
  FlatList, Modal, Alert, RefreshControl, KeyboardAvoidingView, 
  Platform, TouchableOpacity, StyleSheet, View, ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { YStack, XStack, Text, Button, Input, Theme, Card, Spinner, H3, Separator } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Plus, Target, X, CheckCircle, Flag, Calendar, Zap, ChevronRight } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { api } from '../../../services/api'; 

export default function GoalsScreen() {
  const router = useRouter();
  
  // Data State
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // UI State
  const [modalVisible, setModalVisible] = useState(false);
  const [allocModalVisible, setAllocModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State (Create)
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  // Allocation State
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [allocAmount, setAllocAmount] = useState('');

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/goals/');
      setGoals(response.data);
    } catch (error) {
      console.error("Fetch Goals Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleCreate = async () => {
    if (!name || !targetAmount) return;
    setSubmitting(true);
    try {
      await api.post('/api/v1/goals/', {
        name,
        target_amount: parseFloat(targetAmount),
        target_date: targetDate
      });
      setModalVisible(false);
      setName(''); setTargetAmount('');
      fetchGoals();
    } catch (error) {
      Alert.alert("Error", "Could not sync goal.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- ALLOCATION LOGIC ---
  const handleAllocate = async () => {
    if (!allocAmount || !selectedGoal) return;
    setSubmitting(true);
    try {
      // API: POST /api/v1/goals/{goal_id}/allocate
      await api.post(`/api/v1/goals/${selectedGoal.id}/allocate`, {
        allocation_fixed_amount: parseFloat(allocAmount),
        allocation_percentage: 0, // Defaulting to fixed amount
      });
      
      Alert.alert("Success", "Funds allocated to objective.");
      setAllocModalVisible(false);
      setAllocAmount('');
      fetchGoals();
    } catch (error) {
      Alert.alert("Error", "Allocation failed. Check your balance.");
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
          <YStack px={20} f={1}>

            {/* HEADER */}
            <XStack jc="space-between" ai="center" py="$4">
              <TouchableOpacity onPress={() => router.back()} style={styles.navBtn}>
                <ArrowLeft size={22} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>GOAL VAULT</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addBtn}>
                <Plus size={22} color="black" />
              </TouchableOpacity>
            </XStack>

            <FlatList
              data={goals}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchGoals} tintColor="#EAB308" />}
              renderItem={({ item }) => {
                const progress = (item.current_amount / item.target_amount) * 100 || 0;
                return (
                  <Card bg="#0A0A0A" p="$5" mb="$4" bc="#1A1A1A" bw={1} br="$5">
                    <YStack space="$3">
                      <XStack jc="space-between" ai="center">
                        <Text color="white" fontWeight="900" fontSize={18}>{item.name}</Text>
                        <TouchableOpacity 
                          onPress={() => { setSelectedGoal(item); setAllocModalVisible(true); }}
                          style={styles.allocBtn}
                        >
                          <Zap size={14} color="black" />
                          <Text color="black" fontWeight="800" fontSize={10} ml="$1">FUEL</Text>
                        </TouchableOpacity>
                      </XStack>

                      <XStack jc="space-between">
                         <Text color="#444" fontSize={10} fontWeight="800">PROGRESS</Text>
                         <Text color="white" fontSize={10} fontWeight="800">{progress.toFixed(1)}%</Text>
                      </XStack>

                      <View style={styles.progressTrack}>
                        <View style={[styles.progressBar, { width: `${Math.min(progress, 100)}%` }]} />
                      </View>

                      <XStack jc="space-between" ai="center" mt="$1">
                        <Text color="#22C55E" fontWeight="900" fontSize={14}>{formatCurrency(item.current_amount)}</Text>
                        <Text color="#555" fontWeight="700" fontSize={12}>Target: {formatCurrency(item.target_amount)}</Text>
                      </XStack>
                    </YStack>
                  </Card>
                );
              }}
            />
          </YStack>
        </SafeAreaView>

        {/* --- ALLOCATION MODAL --- */}
        <Modal visible={allocModalVisible} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <XStack jc="space-between" ai="center" mb="$5">
                <Text style={styles.modalTitle}>ALLOCATE FUNDS</Text>
                <TouchableOpacity onPress={() => setAllocModalVisible(false)}><X size={24} color="#666" /></TouchableOpacity>
              </XStack>
              
              <Text color="$silver4" fontSize={12} mb="$4">
                Fuelling Goal: <Text color="white" fontWeight="bold">{selectedGoal?.name}</Text>
              </Text>

              <YStack space="$4">
                <View>
                   <Text style={styles.label}>AMOUNT TO ALLOCATE (INR)</Text>
                   <Input 
                      value={allocAmount} onChangeText={setAllocAmount}
                      keyboardType="numeric" bg="black" color="white" h={55} bc="#222"
                      placeholder="e.g. 5000"
                   />
                </View>

                <Button bg="#EAB308" color="black" h={55} fontWeight="900" onPress={handleAllocate} disabled={submitting}>
                   {submitting ? <Spinner color="black" /> : "CONFIRM ALLOCATION"}
                </Button>
              </YStack>
            </View>
          </View>
        </Modal>

        {/* --- CREATE MODAL (Previous implementation) --- */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <XStack jc="space-between" ai="center" mb="$6">
                    <Text style={styles.modalTitle}>NEW GOAL</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}><X size={24} color="#666" /></TouchableOpacity>
                </XStack>
                <YStack space="$5">
                    <View>
                        <Text style={styles.label}>GOAL NAME</Text>
                        <Input value={name} onChangeText={setName} bg="black" color="white" h={55} bc="#222" placeholder="e.g. Vacation" />
                    </View>
                    <View>
                        <Text style={styles.label}>TARGET AMOUNT</Text>
                        <Input value={targetAmount} onChangeText={setTargetAmount} keyboardType="numeric" bg="black" color="white" h={55} bc="#222" />
                    </View>
                    <Button bg="#EAB308" color="black" h={60} fontWeight="900" onPress={handleCreate} disabled={submitting}>
                        DEPLOY
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
  allocBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EAB308', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  progressTrack: { height: 6, backgroundColor: '#111', borderRadius: 3, marginTop: 5, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#22C55E', borderRadius: 3 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#0A0A0A', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 60, borderTopWidth: 1, borderColor: '#1A1A1A' },
  modalTitle: { color: 'white', fontWeight: '900', fontSize: 16 },
  label: { color: '#444', fontSize: 10, fontWeight: '800', marginBottom: 8 },
});
