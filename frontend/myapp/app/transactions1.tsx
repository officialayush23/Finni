import React, { useState, useEffect, useCallback } from 'react';
import { 
  FlatList, Modal, Alert, RefreshControl, 
  KeyboardAvoidingView, Platform, TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { YStack, XStack, Text, Button, Input, H3, Theme, Card, Spinner, Separator } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Plus, ArrowLeft, ShoppingCart, Calendar, Tag, 
  FileText, CheckCircle, X, DollarSign 
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { FinanceService } from '../services/financeService';
import { BlurView } from 'expo-blur';

export default function TransactionsScreen() {
  const router = useRouter();
  
  // State
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(''); // Note: API needs UUID string

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await FinanceService.getTransactions();
      // Sort by date descending
      const sorted = data.sort((a, b) => new Date(b.occurred_at) - new Date(a.occurred_at));
      setTransactions(sorted);
    } catch (error) {
      console.log("Fetch Txns Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleCreate = async () => {
    if (!amount || !merchant) {
      Alert.alert("Error", "Amount and Merchant are required.");
      return;
    }

    setSubmitting(true);
    try {
      await FinanceService.createTransaction({
        amount: parseFloat(amount),
        currency: "INR",
        occurred_at: new Date().toISOString(),
        merchant_raw: merchant,
        description: description,
        source: "manual",
        category_id: categoryId || undefined // Only send if user provided one
      });
      
      setModalVisible(false);
      setAmount(''); setMerchant(''); setDescription(''); setCategoryId('');
      fetchTransactions();
      Alert.alert("Success", "Transaction recorded.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save transaction. Check if category ID is a valid UUID.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Theme name="dark">
      <LinearGradient colors={['#000', '#09090b']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          <YStack px={20} f={1}>
            
            {/* HEADER */}
            <XStack jc="space-between" ai="center" mb="$6" mt="$2">
              <XStack ai="center" space="$2">
                <Button size="$3" chromeless circular icon={<ArrowLeft size={24} color="$silver4"/>} onPress={() => router.back()} />
                <H3 color="white">Transactions</H3>
              </XStack>
              <Button size="$3" bg="$gold3" color="black" icon={<Plus size={18}/>} onPress={() => setModalVisible(true)}>
                Add
              </Button>
            </XStack>

            {/* LIST */}
            <FlatList
              data={transactions}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchTransactions} tintColor="#EAB308" />}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={!loading ? <Text color="$silver4" ta="center" mt="$4">No transactions found.</Text> : null}
              renderItem={({ item }) => (
                <Card bg="rgba(255,255,255,0.03)" p="$4" mb="$3" borderColor="$silver2" bw={1}>
                  <XStack jc="space-between" ai="center">
                    <XStack space="$3" ai="center">
                      <YStack w={40} h={40} bg="rgba(255,255,255,0.05)" br={10} jc="center" ai="center">
                        <ShoppingCart size={20} color="$silver4" />
                      </YStack>
                      <YStack>
                        <Text color="white" fontWeight="bold" fontSize={15} numberOfLines={1} w={150}>
                          {item.merchant_raw}
                        </Text>
                        <Text color="$silver4" fontSize={11}>
                          {new Date(item.occurred_at).toLocaleDateString()}
                        </Text>
                      </YStack>
                    </XStack>
                    <YStack ai="flex-end">
                      <Text color="#ef4444" fontWeight="bold" fontSize={16}>
                        -₹{item.amount.toLocaleString()}
                      </Text>
                      <Text color="$silver4" fontSize={10}>{item.source.toUpperCase()}</Text>
                    </YStack>
                  </XStack>
                </Card>
              )}
            />

            {/* ADD MODAL */}
            <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
              <BlurView intensity={60} tint="dark" style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <YStack bg="#18181b" borderTopLeftRadius={25} borderTopRightRadius={25} p="$5" pb={40} borderColor="$silver3" bw={1}>
                    <XStack jc="space-between" ai="center" mb="$4">
                      <H3 color="white">Log Spending</H3>
                      <Button size="$3" chromeless icon={<X size={24} color="$silver4"/>} onPress={() => setModalVisible(false)} />
                    </XStack>

                    <YStack space="$3">
                      <YStack>
                        <Text color="$silver4" fontSize={11} mb="$1">AMOUNT (INR)</Text>
                        <Input value={amount} onChangeText={setAmount} keyboardType="numeric" bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" h={50} placeholder="0.00" />
                      </YStack>

                      <YStack>
                        <Text color="$silver4" fontSize={11} mb="$1">MERCHANT</Text>
                        <Input value={merchant} onChangeText={setMerchant} bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" h={50} placeholder="Amazon, Starbucks..." />
                      </YStack>

                      <YStack>
                        <Text color="$silver4" fontSize={11} mb="$1">DESCRIPTION (OPTIONAL)</Text>
                        <Input value={description} onChangeText={setDescription} bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" h={50} placeholder="Weekly groceries..." />
                      </YStack>

                      <Button 
                        bg="$gold3" color="black" mt="$4" size="$5" fontWeight="bold"
                        onPress={handleCreate} disabled={submitting}
                        icon={submitting ? <Spinner color="black"/> : <CheckCircle size={18}/>}
                      >
                        Save Transaction
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