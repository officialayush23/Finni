// import React, { useState } from 'react';
// import { ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { YStack, XStack, Text, Button, Input, H3, H2, Theme, Card, Spinner, Separator } from 'tamagui';
// import { LinearGradient } from 'expo-linear-gradient';
// import { 
//   Search, ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, Newspaper, Activity 
// } from '@tamagui/lucide-icons';
// import { useRouter } from 'expo-router';
// import { AiService } from '../services/aiService';
// import { AnalysisResponse } from '../types/api';

// const { width } = Dimensions.get('window');

// export default function AnalysisScreen() {
//   const router = useRouter();
  
//   // State
//   const [symbol, setSymbol] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<AnalysisResponse | null>(null);
//   const [error, setError] = useState('');

//   // --- ANALYZE FUNCTION ---
//   const handleAnalyze = async () => {
//     if (!symbol) return;
    
//     setLoading(true);
//     setError('');
//     setData(null);

//     try {
//       // Defaulting to 'stock' for now, can add a selector later
//       const result = await AiService.analyzeAsset(symbol.toUpperCase(), 'stock');
//       setData(result);
//     } catch (err: any) {
//       console.log("Analysis Error:", err);
//       setError("Could not analyze symbol. It might be invalid or the AI service is busy.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Theme name="dark">
//       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
//         <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          
//           {/* HEADER */}
//           <XStack px={20} py={10} ai="center" space="$3">
//             <Button size="$3" chromeless circular icon={<ArrowLeft size={24} color="$silver4"/>} onPress={() => router.back()} />
//             <H3 color="white">AI Market Analysis</H3>
//           </XStack>

//           <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
            
//             {/* SEARCH SECTION */}
//             <Card bg="rgba(255,255,255,0.03)" p="$4" mb="$6" borderColor="$silver2" bw={1}>
//               <Text color="$silver4" fontSize={11} mb="$2">ENTER SYMBOL (e.g. AAPL, TSLA)</Text>
//               <XStack space="$2">
//                 <Input 
//                   f={1} 
//                   value={symbol} 
//                   onChangeText={setSymbol} 
//                   bg="rgba(0,0,0,0.3)" 
//                   color="white" 
//                   borderColor="$silver3" 
//                   placeholder="Symbol..." 
//                   placeholderTextColor="#555"
//                   autoCapitalize="characters"
//                 />
//                 <Button 
//                   bg="$gold3" color="black" 
//                   icon={loading ? <Spinner color="black"/> : <Search size={18}/>}
//                   onPress={handleAnalyze}
//                   disabled={loading}
//                 >
//                   Analyze
//                 </Button>
//               </XStack>
//               {error ? <Text color="#ef4444" fontSize={11} mt="$2">{error}</Text> : null}
//             </Card>

//             {/* --- RESULTS SECTION --- */}
//             {data && (
//               <YStack space="$4" animation="lazy" enterStyle={{ opacity: 0, y: 10 }}>
                
//                 {/* 1. METRICS HEADER */}
//                 <XStack jc="space-between" ai="center">
//                    <YStack>
//                      <H2 color="white" fontWeight="900">{data.symbol}</H2>
//                      <Text color="$silver4">Current Price</Text>
//                      <H3 color="white">${data.metrics.current_price.toLocaleString()}</H3>
//                    </YStack>
                   
//                    {/* Risk Badge */}
//                    <YStack ai="center" bg="rgba(255,255,255,0.05)" p="$2" br="$4">
//                       <Text color="$silver4" fontSize={10} mb={2}>RISK SCORE</Text>
//                       <XStack ai="center" space="$1">
//                         <Activity size={16} color={data.metrics.risk_score > 70 ? "#ef4444" : data.metrics.risk_score > 40 ? "#EAB308" : "#22c55e"} />
//                         <Text color="white" fontWeight="bold">{data.metrics.risk_score}/100</Text>
//                       </XStack>
//                    </YStack>
//                 </XStack>

//                 <Separator borderColor="$silver2" opacity={0.2} />

//                 {/* 2. PREDICTION CARD */}
//                 <Card bg="rgba(59, 130, 246, 0.1)" borderColor="rgba(59, 130, 246, 0.3)" bw={1} p="$4">
//                   <XStack jc="space-between" ai="center" mb="$2">
//                     <Text color="#3b82f6" fontWeight="bold" letterSpacing={1} fontSize={11}>AI PREDICTION (30 DAYS)</Text>
//                     <TrendingUp size={16} color="#3b82f6" />
//                   </XStack>
                  
//                   <XStack ai="flex-end" space="$3">
//                     <H2 color="white">${data.metrics.predicted_price_30d.toLocaleString()}</H2>
//                     <YStack pb="$1">
//                       <Text 
//                         color={data.metrics.growth_percentage >= 0 ? "#22c55e" : "#ef4444"} 
//                         fontWeight="bold"
//                       >
//                         {data.metrics.growth_percentage >= 0 ? "+" : ""}
//                         {data.metrics.growth_percentage}%
//                       </Text>
//                     </YStack>
//                   </XStack>
//                   <Text color="$silver4" fontSize={11} mt="$2">
//                     Forecast based on Prophet algorithm & historical trends.
//                   </Text>
//                 </Card>

//                 {/* 3. NEWS SENTIMENT */}
//                 <H3 color="white" mt="$4" mb="$2">Market Sentiment</H3>
//                 <YStack space="$3">
//                   {data.news.length > 0 ? (
//                     data.news.map((item, index) => (
//                       <Card key={index} bg="rgba(255,255,255,0.03)" p="$3" borderColor="$silver2" bw={1}>
//                         <XStack jc="space-between" mb="$2">
//                           <Text color="$silver4" fontSize={10} textTransform="uppercase">{item.source}</Text>
//                           <YStack 
//                             bg={item.sentiment === 'positive' ? "rgba(34, 197, 94, 0.2)" : item.sentiment === 'negative' ? "rgba(239, 68, 68, 0.2)" : "rgba(255,255,255,0.1)"} 
//                             px="$2" py="$1" br="$2"
//                           >
//                             <Text 
//                               fontSize={10} 
//                               fontWeight="bold"
//                               color={item.sentiment === 'positive' ? "#22c55e" : item.sentiment === 'negative' ? "#ef4444" : "$silver4"} 
//                             >
//                               {item.sentiment.toUpperCase()}
//                             </Text>
//                           </YStack>
//                         </XStack>
//                         <Text color="white" numberOfLines={2} fontWeight="bold" fontSize={14}>{item.title}</Text>
//                       </Card>
//                     ))
//                   ) : (
//                     <Text color="$silver4" fontStyle="italic">No recent news analyzed.</Text>
//                   )}
//                 </YStack>

//               </YStack>
//             )}

//           </ScrollView>
//         </SafeAreaView>
//       </LinearGradient>
//     </Theme>
//   );
// }




import React, { useState } from 'react';
import { 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Dimensions,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  YStack, 
  XStack, 
  Text, 
  Button, 
  Input, 
  H3, 
  H2, 
  Theme, 
  Card, 
  Spinner, 
  Separator,
  Progress
} from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search, 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Newspaper, 
  Activity,
  BarChart3,
  Target,
  DollarSign,
  ShieldAlert,
  LineChart,
  Zap
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { ApiService } from '../services/apiService';

const { width } = Dimensions.get('window');

export default function AnalysisScreen() {
  const router = useRouter();
  
  // State
  const [symbol, setSymbol] = useState('');
  const [assetType, setAssetType] = useState('stock');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  // Asset type options
  const assetTypes = [
    { id: 'stock', label: 'Stock', icon: TrendingUp, color: '#3B82F6' },
    { id: 'crypto', label: 'Crypto', icon: Zap, color: '#F59E0B' },
    { id: 'etf', label: 'ETF', icon: BarChart3, color: '#10B981' },
    { id: 'mutual_fund', label: 'Mutual Fund', icon: Target, color: '#8B5CF6' }
  ];

  // Handle asset type selection
  const handleAssetTypeSelect = (type) => {
    setAssetType(type);
  };

  // --- ANALYZE FUNCTION ---
  const handleAnalyze = async () => {
    if (!symbol.trim()) {
      Alert.alert('Error', 'Please enter a symbol');
      return;
    }
    
    setLoading(true);
    setError('');
    setData(null);

    try {
      // Call the API with symbol and asset_type
      const result = await ApiService.get(`/analysis/${symbol.toUpperCase()}`, {
        params: { asset_type: assetType }
      });
      
      setData(result.data);
      
    } catch (err) {
      console.log("Analysis Error:", err);
      
      // Check for specific error types
      if (err.response?.status === 404) {
        setError("Symbol not found. Please check the symbol and try again.");
      } else if (err.response?.status === 422) {
        setError("Invalid asset type or symbol format.");
      } else if (err.message?.includes('Network Error')) {
        setError("Network error. Please check your connection.");
      } else {
        setError("Could not analyze symbol. Please try again.");
      }
      
      Alert.alert('Analysis Failed', error || 'Unknown error occurred');
      
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount || 0);
  };

  // Get risk level color and text
  const getRiskLevel = (riskScore) => {
    if (riskScore <= 3) return { color: '#22C55E', level: 'Low', bg: 'rgba(34, 197, 94, 0.2)' };
    if (riskScore <= 7) return { color: '#EAB308', level: 'Medium', bg: 'rgba(234, 179, 8, 0.2)' };
    return { color: '#EF4444', level: 'High', bg: 'rgba(239, 68, 68, 0.2)' };
  };

  // Get sentiment color
  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return '#22C55E';
      case 'negative': return '#EF4444';
      case 'neutral': return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <Theme name="dark">
      <LinearGradient colors={['#000000', '#0A0A0A', '#111111']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          
          {/* HEADER */}
          <XStack px="$4" py="$3" ai="center" space="$3" backgroundColor="#000000">
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="#EAB308" />
            </TouchableOpacity>
            
            <YStack flex={1}>
              <H3 color="#EAB308" fontWeight="900">AI FINANCIAL ANALYSIS</H3>
              <Text color="rgba(234, 179, 8, 0.7)" fontSize={11}>
                Powered by machine learning
              </Text>
            </YStack>
            
            <Activity size={20} color="#EAB308" />
          </XStack>

          <ScrollView 
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            
            {/* SEARCH SECTION */}
            <Card 
              bg="#1A1A1A" 
              p="$4" 
              mb="$6" 
              borderWidth={1}
              borderColor="rgba(234, 179, 8, 0.3)"
              style={{
                shadowColor: '#EAB308',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <YStack space="$3">
                {/* Asset Type Selection */}
                <YStack>
                  <Text color="#EAB308" fontSize={12} fontWeight="700" mb="$2">
                    ASSET TYPE
                  </Text>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 16 }}
                  >
                    <XStack space="$2">
                      {assetTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = assetType === type.id;
                        return (
                          <TouchableOpacity
                            key={type.id}
                            onPress={() => handleAssetTypeSelect(type.id)}
                          >
                            <Card
                              backgroundColor={isSelected ? `${type.color}20` : '#333333'}
                              p="$3"
                              br="$3"
                              minWidth={90}
                              borderWidth={1}
                              borderColor={isSelected ? type.color : '#444444'}
                            >
                              <YStack ai="center" space="$2">
                                <Icon size={18} color={isSelected ? type.color : '#666666'} />
                                <Text 
                                  color={isSelected ? type.color : '#666666'} 
                                  fontSize={12} 
                                  fontWeight="700"
                                >
                                  {type.label}
                                </Text>
                              </YStack>
                            </Card>
                          </TouchableOpacity>
                        );
                      })}
                    </XStack>
                  </ScrollView>
                </YStack>

                {/* Symbol Input */}
                <YStack>
                  <Text color="#EAB308" fontSize={12} fontWeight="700" mb="$2">
                    SYMBOL (e.g., AAPL, TSLA, BTC)
                  </Text>
                  <XStack space="$2">
                    <Input
                      flex={1}
                      value={symbol}
                      onChangeText={setSymbol}
                      backgroundColor="#333333"
                      borderColor="#444444"
                      color="white"
                      placeholder="Enter symbol..."
                      placeholderTextColor="#666666"
                      fontSize={14}
                      autoCapitalize="characters"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      onPress={handleAnalyze}
                      disabled={loading || !symbol.trim()}
                      style={{
                        backgroundColor: '#EAB308',
                        width: 50,
                        height: 50,
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: loading || !symbol.trim() ? 0.6 : 1,
                      }}
                    >
                      {loading ? (
                        <Spinner size="small" color="black" />
                      ) : (
                        <Search size={20} color="black" />
                      )}
                    </TouchableOpacity>
                  </XStack>
                </YStack>
                
                {error ? (
                  <Card backgroundColor="rgba(239, 68, 68, 0.1)" p="$3" borderColor="#EF4444" borderWidth={1}>
                    <XStack ai="center" space="$2">
                      <AlertTriangle size={14} color="#EF4444" />
                      <Text color="#EF4444" fontSize={12} flex={1}>
                        {error}
                      </Text>
                    </XStack>
                  </Card>
                ) : null}
              </YStack>
            </Card>

            {/* --- RESULTS SECTION --- */}
            {data && (
              <YStack space="$4">
                
                {/* SYMBOL HEADER */}
                <Card 
                  bg="rgba(59, 130, 246, 0.1)" 
                  p="$4" 
                  borderColor="#3B82F6" 
                  borderWidth={1}
                  br="$4"
                >
                  <XStack jc="space-between" ai="center" mb="$3">
                    <YStack>
                      <Text color="#3B82F6" fontSize={12} fontWeight="700" letterSpacing={1}>
                        SYMBOL ANALYSIS
                      </Text>
                      <H2 color="white" fontWeight="900" mt="$1">{data.symbol}</H2>
                    </YStack>
                    
                    {/* Risk Score */}
                    <YStack ai="center">
                      <Text color="rgba(255,255,255,0.6)" fontSize={10} mb={2}>
                        RISK SCORE
                      </Text>
                      <View style={{ 
                        backgroundColor: getRiskLevel(data.metrics?.risk_score || 5).bg,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 20,
                      }}>
                        <XStack ai="center" space="$1">
                          <ShieldAlert size={14} color={getRiskLevel(data.metrics?.risk_score || 5).color} />
                          <Text color="white" fontSize={14} fontWeight="800">
                            {data.metrics?.risk_score || 'N/A'}/10
                          </Text>
                        </XStack>
                      </View>
                      <Text color={getRiskLevel(data.metrics?.risk_score || 5).color} fontSize={10} fontWeight="700" mt="$1">
                        {getRiskLevel(data.metrics?.risk_score || 5).level} RISK
                      </Text>
                    </YStack>
                  </XStack>

                  {/* Current Price */}
                  <YStack ai="center" mt="$3">
                    <Text color="rgba(255,255,255,0.6)" fontSize={12}>
                      CURRENT PRICE
                    </Text>
                    <H2 color="white" fontWeight="900" fontSize={32}>
                      {formatCurrency(data.metrics?.current_price || 0)}
                    </H2>
                  </YStack>
                </Card>

                {/* PRICE PREDICTION */}
                <Card bg="#1A1A1A" p="$4" borderColor="#EAB308" borderWidth={1} br="$4">
                  <XStack jc="space-between" ai="center" mb="$3">
                    <YStack>
                      <Text color="#EAB308" fontSize={12} fontWeight="700" letterSpacing={1}>
                        30-DAY FORECAST
                      </Text>
                      <Text color="rgba(255,255,255,0.6)" fontSize={11}>
                        AI-powered prediction
                      </Text>
                    </YStack>
                    <LineChart size={20} color="#EAB308" />
                  </XStack>
                  
                  <YStack space="$3">
                    <XStack jc="space-between" ai="flex-end">
                      <YStack>
                        <Text color="rgba(255,255,255,0.6)" fontSize={12}>
                          Predicted Price
                        </Text>
                        <H2 color="white" fontWeight="900">
                          {formatCurrency(data.metrics?.predicted_price_30d || 0)}
                        </H2>
                      </YStack>
                      
                      <YStack ai="flex-end">
                        <Text color="rgba(255,255,255,0.6)" fontSize={12}>
                          Expected Growth
                        </Text>
                        <XStack ai="center" space="$1">
                          {data.metrics?.growth_percentage >= 0 ? (
                            <TrendingUp size={16} color="#22C55E" />
                          ) : (
                            <TrendingDown size={16} color="#EF4444" />
                          )}
                          <Text 
                            color={data.metrics?.growth_percentage >= 0 ? "#22C55E" : "#EF4444"} 
                            fontSize={20} 
                            fontWeight="900"
                          >
                            {data.metrics?.growth_percentage >= 0 ? '+' : ''}
                            {(data.metrics?.growth_percentage || 0).toFixed(1)}%
                          </Text>
                        </XStack>
                      </YStack>
                    </XStack>
                    
                    {/* Forecast Progress */}
                    <YStack space="$2" mt="$2">
                      <XStack jc="space-between">
                        <Text color="rgba(255,255,255,0.6)" fontSize={10}>
                          Current: {formatCurrency(data.metrics?.current_price || 0)}
                        </Text>
                        <Text color="rgba(255,255,255,0.6)" fontSize={10}>
                          Target: {formatCurrency(data.metrics?.predicted_price_30d || 0)}
                        </Text>
                      </XStack>
                      <Progress 
                        value={Math.min(100, Math.max(0, 
                          ((data.metrics?.current_price || 0) / (data.metrics?.predicted_price_30d || 1)) * 100
                        ))} 
                        h={6}
                        bg="#333333"
                        br="$10"
                      >
                        <Progress.Indicator 
                          bg="#EAB308" 
                          animation="bouncy"
                          br="$10"
                        />
                      </Progress>
                    </YStack>
                  </YStack>
                </Card>

                {/* MARKET SENTIMENT */}
                <YStack>
                  <XStack ai="center" space="$2" mb="$3">
                    <Newspaper size={18} color="#8B5CF6" />
                    <Text color="#8B5CF6" fontSize={14} fontWeight="700">
                      MARKET SENTIMENT
                    </Text>
                    <Text color="rgba(139, 92, 246, 0.7)" fontSize={11} ml="auto">
                      {data.news?.length || 0} news analyzed
                    </Text>
                  </XStack>
                  
                  {data.news && data.news.length > 0 ? (
                    <YStack space="$3">
                      {data.news.slice(0, 5).map((item, index) => (
                        <Card 
                          key={index} 
                          bg="#1A1A1A" 
                          p="$3" 
                          borderWidth={1}
                          borderColor={getSentimentColor(item.sentiment) + '40'}
                          br="$3"
                        >
                          <YStack space="$2">
                            <XStack jc="space-between" ai="center">
                              <Text color="rgba(255,255,255,0.6)" fontSize={10}>
                                {item.source}
                              </Text>
                              <View style={{
                                backgroundColor: getSentimentColor(item.sentiment) + '20',
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 12,
                              }}>
                                <Text 
                                  color={getSentimentColor(item.sentiment)} 
                                  fontSize={10} 
                                  fontWeight="700"
                                >
                                  {item.sentiment?.toUpperCase() || 'NEUTRAL'}
                                </Text>
                              </View>
                            </XStack>
                            
                            <Text color="white" fontSize={13} fontWeight="600" lineHeight={18}>
                              {item.title}
                            </Text>
                            
                            {item.score !== undefined && (
                              <XStack ai="center" space="$2" mt="$2">
                                <Progress 
                                  value={item.score * 100} 
                                  h={4}
                                  bg="#333333"
                                  br="$10"
                                  flex={1}
                                >
                                  <Progress.Indicator 
                                    bg={getSentimentColor(item.sentiment)} 
                                    br="$10"
                                  />
                                </Progress>
                                <Text color="rgba(255,255,255,0.6)" fontSize={10}>
                                  {(item.score * 100).toFixed(0)}%
                                </Text>
                              </XStack>
                            )}
                          </YStack>
                        </Card>
                      ))}
                    </YStack>
                  ) : (
                    <Card bg="#1A1A1A" p="$4" ai="center" br="$4">
                      <Newspaper size={32} color="#666666" />
                      <Text color="#666666" fontSize={13} mt="$2">
                        No recent news analyzed
                      </Text>
                    </Card>
                  )}
                </YStack>

                {/* FORECAST DATA INFO */}
                {data.graph_data && data.graph_data.length > 0 && (
                  <Card bg="#1A1A1A" p="$4" borderColor="#10B981" borderWidth={1} br="$4">
                    <XStack ai="center" space="$2" mb="$3">
                      <BarChart3 size={18} color="#10B981" />
                      <Text color="#10B981" fontSize={14} fontWeight="700">
                        FORECAST DATA
                      </Text>
                      <Text color="rgba(16, 185, 129, 0.7)" fontSize={11} ml="auto">
                        {data.graph_data.length} data points
                      </Text>
                    </XStack>
                    
                    <YStack space="$2">
                      <Text color="rgba(255,255,255,0.7)" fontSize={12}>
                        Forecast period: {data.graph_data[0]?.date || 'N/A'} to {data.graph_data[data.graph_data.length - 1]?.date || 'N/A'}
                      </Text>
                      <Text color="rgba(255,255,255,0.5)" fontSize={11}>
                        AI-generated price forecast using historical data analysis
                      </Text>
                    </YStack>
                  </Card>
                )}

                {/* ANALYSIS NOTES */}
                <Card bg="rgba(0,0,0,0.3)" p="$4" br="$4">
                  <Text color="rgba(255,255,255,0.6)" fontSize={11} fontStyle="italic">
                    ⚠️ This analysis is generated by AI and should not be considered financial advice. 
                    Past performance is not indicative of future results. 
                    Always conduct your own research before making investment decisions.
                  </Text>
                </Card>
              </YStack>
            )}

            {/* NO DATA STATE */}
            {!data && !loading && (
              <YStack ai="center" py="$10" space="$4">
                <LineChart size={64} color="#333333" />
                <Text color="#666666" fontSize={16} fontWeight="600">
                  Analyze Financial Assets
                </Text>
                <Text color="#444444" fontSize={13} textAlign="center" px="$8">
                  Enter a stock symbol (like AAPL, TSLA) or crypto symbol to get AI-powered analysis, predictions, and market sentiment.
                </Text>
              </YStack>
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </Theme>
  );
}
