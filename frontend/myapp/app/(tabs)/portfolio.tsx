// // import React, { useState, useEffect } from 'react';
// // import { ScrollView, RefreshControl, Alert } from 'react-native';
// // import { YStack, XStack, Text, Button, Input, H3, Card, Theme, Spinner, Separator, Dialog, Sheet } from 'tamagui';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { TrendingUp, TrendingDown, Plus, Search, BarChart2 } from '@tamagui/lucide-icons';
// // import { FinanceService } from '../../services/financeService';
// // import { AiService } from '../../services/aiService';
// // import { Investment, AnalysisResponse } from '../../types/api';

// // export default function PortfolioScreen() {
// //   // --- STATE ---
// //   const [investments, setInvestments] = useState<Investment[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [symbolToAnalyze, setSymbolToAnalyze] = useState('');
// //   const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
// //   const [analyzing, setAnalyzing] = useState(false);

// //   // --- FETCH DATA ---
// //   const fetchInvestments = async () => {
// //     setLoading(true);
// //     try {
// //       const data = await FinanceService.getInvestments();
// //       setInvestments(data);
// //     } catch (error) {
// //       console.log("Error fetching portfolio:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchInvestments();
// //   }, []);

// //   // --- ACTIONS ---
// //   const handleAnalyze = async () => {
// //     if (!symbolToAnalyze) return;
// //     setAnalyzing(true);
// //     setAnalysis(null); // Reset previous result
// //     try {
// //       // Defaulting to 'stock' for now, you can add a dropdown later
// //       const result = await AiService.analyzeAsset(symbolToAnalyze, 'stock');
// //       setAnalysis(result);
// //     } catch (error) {
// //       Alert.alert("Analysis Failed", "Could not fetch AI predictions. Check backend logs.");
// //     } finally {
// //       setAnalyzing(false);
// //     }
// //   };

// //   const formatCurrency = (val: number) => 
// //     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

// //   return (
// //     <Theme name="dark">
// //       <LinearGradient colors={['#000', '#0a0a0a']} style={{ flex: 1 }}>
// //         <ScrollView 
// //           contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 100 }}
// //           refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchInvestments} tintColor="#EAB308" />}
// //         >
          
// //           <XStack jc="space-between" ai="center" mb="$6">
// //             <H3 color="$white" fontWeight="900" letterSpacing={1}>ASSETS</H3>
// //             <Button size="$3" bg="$gold3" color="black" icon={<Plus size={18}/>} onPress={() => Alert.alert("Coming Soon", "Add Asset Modal")}>
// //               Add
// //             </Button>
// //           </XStack>

// //           {/* --- INVESTMENT LIST --- */}
// //           <YStack space="$3" mb="$8">
// //             {investments.length === 0 && !loading ? (
// //               <Text color="$silver4" ta="center" mt="$4">No investments found.</Text>
// //             ) : (
// //               investments.map((inv) => (
// //                 <Card key={inv.id} bg="rgba(255,255,255,0.03)" borderColor="rgba(255,255,255,0.1)" bw={1} p="$4">
// //                   <XStack jc="space-between" ai="center">
// //                     <XStack space="$3" ai="center">
// //                       <YStack w={40} h={40} bg="rgba(0,0,0,0.5)" jc="center" ai="center" br="$4">
// //                         <BarChart2 size={20} color="#EAB308" />
// //                       </YStack>
// //                       <YStack>
// //                         <Text color="white" fontWeight="bold" fontSize={16}>{inv.identifier}</Text>
// //                         <Text color="$silver4" fontSize={11}>{inv.name}</Text>
// //                       </YStack>
// //                     </XStack>
// //                     <YStack ai="flex-end">
// //                       <Text color="white" fontWeight="bold" fontSize={16}>{formatCurrency(inv.current_value)}</Text>
// //                       <Text color="#22c55e" fontSize={11}>
// //                         {inv.quantity} units @ ${inv.avg_buy_price}
// //                       </Text>
// //                     </YStack>
// //                   </XStack>
// //                 </Card>
// //               ))
// //             )}
// //           </YStack>

// //           <Separator borderColor="$silver2" mb="$6" opacity={0.3} />

// //           {/* --- AI PREDICTION LAB --- */}
// //           <YStack space="$4">
// //             <H3 color="$gold3" fontSize={20} letterSpacing={1}>AI MARKET LAB</H3>
// //             <Text color="$silver4" fontSize={12}>
// //               Powered by Prophet (Time-Series) & FinBERT (Sentiment)
// //             </Text>

// //             <XStack space="$2">
// //               <Input 
// //                 f={1} 
// //                 placeholder="Symbol (e.g. AAPL, BTC)" 
// //                 value={symbolToAnalyze}
// //                 onChangeText={setSymbolToAnalyze}
// //                 bg="rgba(255,255,255,0.05)" 
// //                 color="white"
// //                 borderColor="$silver2"
// //                 autoCapitalize="characters"
// //               />
// //               <Button 
// //                 bg="$gold3" 
// //                 color="black" 
// //                 icon={analyzing ? <Spinner color="black"/> : <Search size={18}/>}
// //                 onPress={handleAnalyze}
// //                 disabled={analyzing}
// //               >
// //                 {analyzing ? "Scanning..." : "Analyze"}
// //               </Button>
// //             </XStack>

// //             {/* --- ANALYSIS RESULTS --- */}
// //             {analysis && (
// //               <YStack space="$4" mt="$4" animation="lazy">
                
// //                 {/* 1. Price Metrics */}
// //                 <XStack space="$3">
// //                   <Card f={1} p="$3" bg="rgba(34, 197, 94, 0.1)" borderColor="rgba(34, 197, 94, 0.3)" bw={1}>
// //                     <Text color="$silver4" fontSize={10} mb="$1">30D FORECAST</Text>
// //                     <Text color="#22c55e" fontWeight="bold" fontSize={18}>
// //                       ${analysis.metrics.predicted_price_30d.toFixed(2)}
// //                     </Text>
// //                   </Card>
// //                   <Card f={1} p="$3" bg="rgba(239, 68, 68, 0.1)" borderColor="rgba(239, 68, 68, 0.3)" bw={1}>
// //                     <Text color="$silver4" fontSize={10} mb="$1">RISK SCORE</Text>
// //                     <Text color="#ef4444" fontWeight="bold" fontSize={18}>
// //                       {analysis.metrics.risk_score}/10
// //                     </Text>
// //                   </Card>
// //                 </XStack>

// //                 {/* 2. News Sentiment */}
// //                 <Text color="$white" fontWeight="bold" mt="$2">LATEST INTELLIGENCE</Text>
// //                 {analysis.news.map((news, i) => (
// //                   <YStack key={i} bg="rgba(255,255,255,0.03)" p="$3" br="$3" space="$1">
// //                     <Text color="white" numberOfLines={2} fontSize={13}>{news.title}</Text>
// //                     <XStack jc="space-between" mt="$1">
// //                       <Text color="$silver4" fontSize={10}>{news.source}</Text>
// //                       <Text 
// //                         color={news.sentiment === 'positive' ? '#22c55e' : news.sentiment === 'negative' ? '#ef4444' : '$gold3'} 
// //                         fontSize={10} 
// //                         fontWeight="bold"
// //                         tt="uppercase"
// //                       >
// //                         {news.sentiment} ({(news.score * 100).toFixed(0)}%)
// //                       </Text>
// //                     </XStack>
// //                   </YStack>
// //                 ))}
// //               </YStack>
// //             )}

// //           </YStack>
// //         </ScrollView>
// //       </LinearGradient>
// //     </Theme>
// //   );
// // }


// import React, { useState, useEffect, useCallback } from 'react';
// import { 
//   FlatList, 
//   Modal, 
//   Alert, 
//   RefreshControl, 
//   KeyboardAvoidingView, 
//   Platform,
//   TouchableOpacity
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { YStack, XStack, Text, Button, Input, H3, H2, Theme, Card, Spinner, Switch } from 'tamagui';
// import { LinearGradient } from 'expo-linear-gradient';
// import { 
//   Plus, TrendingUp, TrendingDown, RefreshCw, Layers, DollarSign, Activity, X 
// } from '@tamagui/lucide-icons';
// import { useRouter } from 'expo-router';
// import { FinanceService } from '../../services/financeService';
// import { Investment, AssetType } from '../../types/api';
// import { BlurView } from 'expo-blur';

// // ENUMS matching your Database
// const ASSET_TYPES: AssetType[] = ['stock', 'crypto', 'bond', 'mutual_fund', 'gold', 'real_estate'];
// const RISK_LEVELS = ['low', 'medium', 'high'];

// export default function PortfolioScreen() {
//   const router = useRouter();
  
//   // State
//   const [assets, setAssets] = useState<Investment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshingId, setRefreshingId] = useState<string | null>(null);
  
//   // Modal State
//   const [modalVisible, setModalVisible] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // Form Fields
//   const [identifier, setIdentifier] = useState(''); // e.g. AAPL
//   const [name, setName] = useState('');           // e.g. Apple Inc.
//   const [type, setType] = useState<AssetType>('stock');
//   const [qty, setQty] = useState('');
//   const [price, setPrice] = useState('');
//   const [risk, setRisk] = useState('medium');

//   // --- FETCH DATA ---
//   const fetchAssets = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await FinanceService.getInvestments();
//       setAssets(data);
//     } catch (error) {
//       console.log("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAssets();
//   }, [fetchAssets]);

//   // --- ADD ASSET ---
//   const handleAdd = async () => {
//     if (!identifier || !name || !qty || !price) {
//       Alert.alert("Missing Fields", "Please fill all fields.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       await FinanceService.addInvestment({
//         asset_type: type,
//         identifier: identifier.toUpperCase(),
//         name: name,
//         quantity: parseFloat(qty),
//         avg_buy_price: parseFloat(price),
//         risk_level: risk,
//         expected_annual_return: 0, // Default
//         is_pinned: false
//       });
      
//       setModalVisible(false);
//       resetForm();
//       fetchAssets();
//       Alert.alert("Success", "Asset added to portfolio.");
//     } catch (error: any) {
//       console.error("Add Asset Error:", error);
//       Alert.alert("Error", "Could not add asset. Check inputs.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // --- REFRESH PRICE ---
//   const handleRefreshPrice = async (id: string) => {
//     setRefreshingId(id);
//     try {
//       await FinanceService.refreshInvestment(id);
//       fetchAssets(); // Reload to see new price
//     } catch (error) {
//       Alert.alert("Update Failed", "Could not refresh price.");
//     } finally {
//       setRefreshingId(null);
//     }
//   };

//   const resetForm = () => {
//     setIdentifier(''); setName(''); setQty(''); setPrice(''); setType('stock');
//   };

//   // Helper to calculate totals
//   const totalValue = assets.reduce((sum, a) => sum + (a.current_value || (a.quantity * a.avg_buy_price)), 0);

//   return (
//     <Theme name="dark">
//       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
//         <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
//           <YStack px={20} pb={20} f={1}>

//             {/* HEADER */}
//             <XStack jc="space-between" ai="center" mb="$6" mt="$2">
//               <H2 color="white" fontWeight="900">Portfolio</H2>
//               <Button size="$3" bg="$gold3" color="black" icon={<Plus size={18}/>} onPress={() => setModalVisible(true)}>
//                 Add Asset
//               </Button>
//             </XStack>

//             {/* TOTAL WEALTH CARD */}
//             <YStack mb="$6">
//               <Text color="$silver4" fontSize={12} letterSpacing={2} mb="$1">NET WORTH</Text>
//               <H2 color="white" fontWeight="900" fontSize={36}>
//                 ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//               </H2>
//             </YStack>

//             {/* ASSET LIST */}
//             <FlatList
//               data={assets}
//               keyExtractor={item => item.id}
//               refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchAssets} tintColor="#EAB308" />}
//               contentContainerStyle={{ paddingBottom: 100 }}
//               ListEmptyComponent={!loading ? <Text color="$silver4" ta="center" mt="$4">No assets found.</Text> : null}
//               renderItem={({ item }) => {
//                 const isProfit = item.current_value >= (item.quantity * item.avg_buy_price);
//                 return (
//                   <Card bg="rgba(255,255,255,0.03)" p="$4" mb="$3" borderColor="$silver2" bw={1}>
//                     <XStack jc="space-between" ai="center">
                      
//                       {/* Left: Icon & Name */}
//                       <XStack space="$3" ai="center">
//                         <YStack w={40} h={40} bg="rgba(255,255,255,0.05)" br={10} jc="center" ai="center">
//                            <Layers size={20} color={isProfit ? "#22c55e" : "#ef4444"} />
//                         </YStack>
//                         <YStack>
//                           <Text color="white" fontWeight="bold" fontSize={16}>{item.identifier}</Text>
//                           <Text color="$silver4" fontSize={11}>{item.name}</Text>
//                         </YStack>
//                       </XStack>
                      
//                       {/* Right: Value & Actions */}
//                       <YStack ai="flex-end">
//                         <Text color="white" fontWeight="bold" fontSize={16}>
//                           ${item.current_value ? item.current_value.toLocaleString() : "0.00"}
//                         </Text>
                        
//                         <XStack ai="center" space="$3" mt="$1">
//                           <Text fontSize={11} color={isProfit ? "#22c55e" : "#ef4444"}>
//                             {item.quantity} units @ ${item.avg_buy_price}
//                           </Text>
                          
//                           {/* Refresh Button */}
//                           <TouchableOpacity onPress={() => handleRefreshPrice(item.id)} disabled={refreshingId === item.id}>
//                             {refreshingId === item.id ? (
//                               <Spinner size="small" color="$gold3" />
//                             ) : (
//                               <RefreshCw size={14} color="$silver4" />
//                             )}
//                           </TouchableOpacity>
//                         </XStack>
//                       </YStack>

//                     </XStack>
//                   </Card>
//                 );
//               }}
//             />

//             {/* --- ADD ASSET MODAL --- */}
//             <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
//               <BlurView intensity={40} tint="dark" style={{ flex: 1 }}>
//                 <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, justifyContent: 'flex-end' }}>
//                   <YStack bg="#18181b" borderTopLeftRadius={25} borderTopRightRadius={25} p="$5" pb={40} borderColor="$silver3" bw={1}>
                    
//                     <XStack jc="space-between" ai="center" mb="$4">
//                       <H3 color="white">Add Asset</H3>
//                       <Button size="$3" chromeless icon={<X size={24} color="$silver4"/>} onPress={() => setModalVisible(false)} />
//                     </XStack>

//                     <YStack space="$3">
                      
//                       <XStack space="$2">
//                         <YStack f={1}>
//                           <Text color="$silver4" fontSize={11} mb="$1">SYMBOL (e.g. BTC)</Text>
//                           <Input value={identifier} onChangeText={setIdentifier} bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" autoCapitalize="characters" />
//                         </YStack>
//                         <YStack f={2}>
//                           <Text color="$silver4" fontSize={11} mb="$1">NAME</Text>
//                           <Input value={name} onChangeText={setName} bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" />
//                         </YStack>
//                       </XStack>

//                       <XStack space="$2">
//                         <YStack f={1}>
//                           <Text color="$silver4" fontSize={11} mb="$1">QUANTITY</Text>
//                           <Input value={qty} onChangeText={setQty} keyboardType="numeric" bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" />
//                         </YStack>
//                         <YStack f={1}>
//                           <Text color="$silver4" fontSize={11} mb="$1">BUY PRICE ($)</Text>
//                           <Input value={price} onChangeText={setPrice} keyboardType="numeric" bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" />
//                         </YStack>
//                       </XStack>

//                       {/* ASSET TYPE SELECTOR */}
//                       <Text color="$silver4" fontSize={11} mt="$2">ASSET TYPE</Text>
//                       <XStack space="$2" flexWrap="wrap">
//                         {ASSET_TYPES.map((t) => (
//                           <Button 
//                             key={t} size="$2" 
//                             bg={type === t ? "$gold3" : "rgba(255,255,255,0.1)"} 
//                             color={type === t ? "black" : "white"} 
//                             onPress={() => setType(t)} mb="$1"
//                           >
//                             {t.toUpperCase()}
//                           </Button>
//                         ))}
//                       </XStack>

//                       <Button 
//                         bg="$gold3" color="black" mt="$4" size="$5" fontWeight="bold"
//                         onPress={handleAdd} disabled={submitting}
//                         icon={submitting ? <Spinner color="black"/> : <Activity size={18}/>}
//                       >
//                         {submitting ? "Saving..." : "Add to Portfolio"}
//                       </Button>

//                     </YStack>
//                   </YStack>
//                 </KeyboardAvoidingView>
//               </BlurView>
//             </Modal>

//           </YStack>
//         </SafeAreaView>
//       </LinearGradient>
//     </Theme>
//   );
// }


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
import { YStack, XStack, Text, Button, Input, H3, H2, Theme, Card, Spinner } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Plus, Layers, RefreshCw, X, Activity, TrendingUp 
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { FinanceService } from '../../services/financeService';
import { Investment, AssetType } from '../../types/api';
import { BlurView } from 'expo-blur';

// EXACT MATCH WITH DATABASE ENUMS
const ASSET_TYPES: AssetType[] = ['stock', 'crypto', 'bond', 'mutual_fund', 'gold', 'real_estate'];

export default function PortfolioScreen() {
  const router = useRouter();
  
  // State
  const [assets, setAssets] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshingId, setRefreshingId] = useState<string | null>(null);
  
  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [identifier, setIdentifier] = useState(''); // e.g. AAPL
  const [name, setName] = useState('');           // e.g. Apple Inc.
  const [type, setType] = useState<AssetType>('stock');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');

  // --- FETCH ASSETS ---
  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const data = await FinanceService.getInvestments();
      setAssets(data);
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  // --- ADD ASSET ---
  const handleAdd = async () => {
    if (!identifier || !name || !qty || !price) {
      Alert.alert("Missing Fields", "Please fill all fields.");
      return;
    }

    setSubmitting(true);
    try {
      await FinanceService.addInvestment({
        asset_type: type,
        identifier: identifier.toUpperCase(),
        name: name,
        quantity: parseFloat(qty),
        avg_buy_price: parseFloat(price),
        risk_level: 'medium', // Default
        expected_annual_return: 0, 
        is_pinned: false
      });
      
      setModalVisible(false);
      resetForm();
      fetchAssets();
      Alert.alert("Success", "Asset added successfully.");
    } catch (error: any) {
      console.error("Add Asset Error:", error);
      Alert.alert("Error", "Could not add asset.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- REFRESH SINGLE ASSET PRICE ---
  const handleRefreshPrice = async (id: string) => {
    setRefreshingId(id);
    try {
      await FinanceService.refreshInvestment(id);
      fetchAssets(); // Reload list to show new price
    } catch (error) {
      Alert.alert("Failed", "Could not refresh price.");
    } finally {
      setRefreshingId(null);
    }
  };

  const resetForm = () => {
    setIdentifier(''); setName(''); setQty(''); setPrice(''); setType('stock');
  };

  // Calculate Total Net Worth
  const totalValue = assets.reduce((sum, a) => sum + (a.current_value || (a.quantity * a.avg_buy_price)), 0);

  return (
    <Theme name="dark">
      <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
        
        {/* Safe Area Context handles notches/bottom bars correctly */}
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          <YStack px={20} pb={20} f={1}>

            {/* HEADER */}
            <XStack jc="space-between" ai="center" mb="$6" mt="$2">
              <H2 color="white" fontWeight="900">Portfolio</H2>
              <Button size="$3" bg="$gold3" color="black" icon={<Plus size={18}/>} onPress={() => setModalVisible(true)}>
                Add Asset
              </Button>
            </XStack>

            {/* TOTAL WEALTH CARD */}
            <YStack mb="$6">
              <Text color="$silver4" fontSize={12} letterSpacing={2} mb="$1">NET WORTH</Text>
              <H2 color="white" fontWeight="900" fontSize={36}>
                ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </H2>
              <XStack ai="center" space="$2" mt="$1">
                 <TrendingUp size={16} color="#22c55e" />
                 <Text color="#22c55e" fontSize={12} fontWeight="bold">Real-time valuation</Text>
              </XStack>
            </YStack>

            {/* ASSET LIST */}
            <FlatList
              data={assets}
              keyExtractor={item => item.id}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchAssets} tintColor="#EAB308" />}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={!loading ? <Text color="$silver4" ta="center" mt="$4">No assets found. Add one!</Text> : null}
              renderItem={({ item }) => {
                // Calculate if currently in profit
                const costBasis = item.quantity * item.avg_buy_price;
                const currentValue = item.current_value || costBasis;
                const isProfit = currentValue >= costBasis;

                return (
                  <Card bg="rgba(255,255,255,0.03)" p="$4" mb="$3" borderColor="$silver2" bw={1}>
                    <XStack jc="space-between" ai="center">
                      
                      {/* Left: Icon & Name */}
                      <XStack space="$3" ai="center">
                        <YStack w={40} h={40} bg="rgba(255,255,255,0.05)" br={10} jc="center" ai="center">
                           <Layers size={20} color={isProfit ? "#22c55e" : "#ef4444"} />
                        </YStack>
                        <YStack>
                          <Text color="white" fontWeight="bold" fontSize={16}>{item.identifier}</Text>
                          <Text color="$silver4" fontSize={11}>{item.name}</Text>
                        </YStack>
                      </XStack>
                      
                      {/* Right: Value & Actions */}
                      <YStack ai="flex-end">
                        <Text color="white" fontWeight="bold" fontSize={16}>
                          ${currentValue.toLocaleString()}
                        </Text>
                        
                        <XStack ai="center" space="$3" mt="$1">
                          <Text fontSize={11} color={isProfit ? "#22c55e" : "#ef4444"}>
                            {item.quantity} @ ${item.avg_buy_price}
                          </Text>
                          
                          {/* Refresh Button */}
                          <TouchableOpacity onPress={() => handleRefreshPrice(item.id)} disabled={refreshingId === item.id}>
                            {refreshingId === item.id ? (
                              <Spinner size="small" color="$gold3" />
                            ) : (
                              <RefreshCw size={14} color="$silver4" />
                            )}
                          </TouchableOpacity>
                        </XStack>
                      </YStack>

                    </XStack>
                  </Card>
                );
              }}
            />

            {/* --- ADD ASSET MODAL --- */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
              <BlurView intensity={40} tint="dark" style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <YStack bg="#18181b" borderTopLeftRadius={25} borderTopRightRadius={25} p="$5" pb={Platform.OS === 'ios' ? 40 : 20} borderColor="$silver3" bw={1}>
                    
                    <XStack jc="space-between" ai="center" mb="$4">
                      <H3 color="white">Add Asset</H3>
                      <Button size="$3" chromeless icon={<X size={24} color="$silver4"/>} onPress={() => setModalVisible(false)} />
                    </XStack>

                    <YStack space="$3">
                      
                      {/* Row 1: Symbol & Name */}
                      <XStack space="$2">
                        <YStack f={1}>
                          <Text color="$silver4" fontSize={11} mb="$1">SYMBOL (e.g. BTC)</Text>
                          <Input 
                            value={identifier} onChangeText={setIdentifier} 
                            bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" 
                            autoCapitalize="characters" placeholder="AAPL" placeholderTextColor="#555"
                          />
                        </YStack>
                        <YStack f={2}>
                          <Text color="$silver4" fontSize={11} mb="$1">NAME</Text>
                          <Input 
                            value={name} onChangeText={setName} 
                            bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" 
                            placeholder="Apple Inc." placeholderTextColor="#555"
                          />
                        </YStack>
                      </XStack>

                      {/* Row 2: Quantity & Price */}
                      <XStack space="$2">
                        <YStack f={1}>
                          <Text color="$silver4" fontSize={11} mb="$1">QUANTITY</Text>
                          <Input 
                            value={qty} onChangeText={setQty} keyboardType="numeric" 
                            bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" 
                            placeholder="10" placeholderTextColor="#555"
                          />
                        </YStack>
                        <YStack f={1}>
                          <Text color="$silver4" fontSize={11} mb="$1">BUY PRICE ($)</Text>
                          <Input 
                            value={price} onChangeText={setPrice} keyboardType="numeric" 
                            bg="rgba(0,0,0,0.3)" color="white" borderColor="$silver3" 
                            placeholder="150.00" placeholderTextColor="#555"
                          />
                        </YStack>
                      </XStack>

                      {/* ASSET TYPE SELECTOR */}
                      <Text color="$silver4" fontSize={11} mt="$2" mb="$1">ASSET TYPE</Text>
                      <XStack space="$2" flexWrap="wrap">
                        {ASSET_TYPES.map((t) => (
                          <Button 
                            key={t} size="$2" 
                            bg={type === t ? "$gold3" : "rgba(255,255,255,0.1)"} 
                            color={type === t ? "black" : "white"} 
                            onPress={() => setType(t)} mb="$2" mr="$1"
                          >
                            {t.toUpperCase().replace('_', ' ')}
                          </Button>
                        ))}
                      </XStack>

                      <Button 
                        bg="$gold3" color="black" mt="$4" size="$5" fontWeight="bold"
                        onPress={handleAdd} disabled={submitting}
                        icon={submitting ? <Spinner color="black"/> : <Activity size={18}/>}
                      >
                        {submitting ? "Saving..." : "Add to Portfolio"}
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