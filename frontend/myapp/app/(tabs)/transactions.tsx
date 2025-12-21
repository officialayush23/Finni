import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, Modal } from 'react-native';
import { YStack, XStack, Text, Button, Input, Theme, Card, H3, Sheet, Spinner } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, DollarSign, Calendar, Tag, ArrowDownLeft } from '@tamagui/lucide-icons';
import { FinanceService } from '../../services/financeService';
import { Transaction } from '../../types/api';

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddSheet, setOpenAddSheet] = useState(false);

  // Form State
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [merchant, setMerchant] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // --- FETCH TRANSACTIONS ---
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await FinanceService.getTransactions();
      // Sort by date (newest first)
      const sorted = data.sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime());
      setTransactions(sorted);
    } catch (error) {
      console.log("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // --- ADD TRANSACTION HANDLER ---
  const handleAddTransaction = async () => {
    if (!amount || !description) return;
    setSubmitting(true);
    try {
      await FinanceService.createTransaction({
        amount: parseFloat(amount),
        currency: 'INR', // Defaulting to INR based on your API spec
        description,
        merchant_raw: merchant,
        source: 'manual',
        occurred_at: new Date().toISOString()
      });
      setOpenAddSheet(false);
      setAmount('');
      setDescription('');
      setMerchant('');
      fetchTransactions(); // Refresh list
    } catch (error) {
      alert("Failed to add transaction");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Theme name="dark">
      <LinearGradient colors={['#000', '#0a0a0a']} style={{ flex: 1 }}>
        <YStack f={1} pt={60} px={20}>
          
          {/* HEADER */}
          <XStack jc="space-between" ai="center" mb="$4">
            <H3 color="$white" fontWeight="900" letterSpacing={1}>HISTORY</H3>
            <Button size="$3" bg="$gold3" color="black" icon={<Plus size={18}/>} onPress={() => setOpenAddSheet(true)}>
              New
            </Button>
          </XStack>

          {/* LIST */}
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchTransactions} tintColor="#EAB308" />}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={
              !loading ? <Text color="$silver4" ta="center" mt="$10">No recent activity.</Text> : null
            }
            renderItem={({ item }) => (
              <Card bg="rgba(255,255,255,0.03)" p="$4" mb="$3" borderColor="rgba(255,255,255,0.05)" bw={1}>
                <XStack jc="space-between" ai="center">
                  <XStack space="$3" ai="center">
                    <YStack w={40} h={40} bg="rgba(255,255,255,0.05)" br={20} jc="center" ai="center">
                      <ArrowDownLeft size={20} color="#silver4" />
                    </YStack>
                    <YStack>
                      <Text color="white" fontWeight="bold">{item.description}</Text>
                      <Text color="$silver4" fontSize={11}>{formatDate(item.occurred_at)}</Text>
                      {item.merchant_raw && <Text color="$gold3" fontSize={10}>{item.merchant_raw}</Text>}
                    </YStack>
                  </XStack>
                  <Text color="white" fontWeight="bold" fontSize={16}>
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: item.currency }).format(item.amount)}
                  </Text>
                </XStack>
              </Card>
            )}
          />

          {/* --- ADD TRANSACTION SHEET --- */}
          <Sheet
            modal
            open={openAddSheet}
            onOpenChange={setOpenAddSheet}
            snapPoints={[50]}
            dismissOnSnapToBottom
          >
            <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
            <Sheet.Frame padding="$4" bg="$silver1">
              <Sheet.Handle bg="$silver3" />
              <H3 mb="$4" color="white">Add Transaction</H3>
              
              <YStack space="$4">
                <Input 
                  placeholder="Amount" 
                  keyboardType="numeric" 
                  value={amount} onChangeText={setAmount}
                  bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3"
                  icon={<DollarSign size={16}/>}
                />
                <Input 
                  placeholder="Description (e.g. Lunch, Uber)" 
                  value={description} onChangeText={setDescription}
                  bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3"
                  icon={<Tag size={16}/>}
                />
                <Input 
                  placeholder="Merchant (Optional)" 
                  value={merchant} onChangeText={setMerchant}
                  bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3"
                />

                <Button 
                  bg="$gold3" color="black" mt="$4" size="$5" fontWeight="bold"
                  onPress={handleAddTransaction}
                  disabled={submitting}
                  icon={submitting ? <Spinner color="black"/> : undefined}
                >
                  {submitting ? "Processing..." : "Save Transaction"}
                </Button>
              </YStack>
            </Sheet.Frame>
          </Sheet>

        </YStack>
      </LinearGradient>
    </Theme>
  );
}