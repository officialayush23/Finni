import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { YStack, XStack, Text, Button, Input, H3, H2, Theme, Card, Spinner, Separator } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search, ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, Newspaper, Activity 
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { AiService } from '../services/aiService';
import { AnalysisResponse } from '../types/api';

const { width } = Dimensions.get('window');

export default function AnalysisScreen() {
  const router = useRouter();
  
  // State
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState('');

  // --- ANALYZE FUNCTION ---
  const handleAnalyze = async () => {
    if (!symbol) return;
    
    setLoading(true);
    setError('');
    setData(null);

    try {
      // Defaulting to 'stock' for now, can add a selector later
      const result = await AiService.analyzeAsset(symbol.toUpperCase(), 'stock');
      setData(result);
    } catch (err: any) {
      console.log("Analysis Error:", err);
      setError("Could not analyze symbol. It might be invalid or the AI service is busy.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Theme name="dark">
      <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          
          {/* HEADER */}
          <XStack px={20} py={10} ai="center" space="$3">
            <Button size="$3" chromeless circular icon={<ArrowLeft size={24} color="$silver4"/>} onPress={() => router.back()} />
            <H3 color="white">AI Market Analysis</H3>
          </XStack>

          <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
            
            {/* SEARCH SECTION */}
            <Card bg="rgba(255,255,255,0.03)" p="$4" mb="$6" borderColor="$silver2" bw={1}>
              <Text color="$silver4" fontSize={11} mb="$2">ENTER SYMBOL (e.g. AAPL, TSLA)</Text>
              <XStack space="$2">
                <Input 
                  f={1} 
                  value={symbol} 
                  onChangeText={setSymbol} 
                  bg="rgba(0,0,0,0.3)" 
                  color="white" 
                  borderColor="$silver3" 
                  placeholder="Symbol..." 
                  placeholderTextColor="#555"
                  autoCapitalize="characters"
                />
                <Button 
                  bg="$gold3" color="black" 
                  icon={loading ? <Spinner color="black"/> : <Search size={18}/>}
                  onPress={handleAnalyze}
                  disabled={loading}
                >
                  Analyze
                </Button>
              </XStack>
              {error ? <Text color="#ef4444" fontSize={11} mt="$2">{error}</Text> : null}
            </Card>

            {/* --- RESULTS SECTION --- */}
            {data && (
              <YStack space="$4" animation="lazy" enterStyle={{ opacity: 0, y: 10 }}>
                
                {/* 1. METRICS HEADER */}
                <XStack jc="space-between" ai="center">
                   <YStack>
                     <H2 color="white" fontWeight="900">{data.symbol}</H2>
                     <Text color="$silver4">Current Price</Text>
                     <H3 color="white">${data.metrics.current_price.toLocaleString()}</H3>
                   </YStack>
                   
                   {/* Risk Badge */}
                   <YStack ai="center" bg="rgba(255,255,255,0.05)" p="$2" br="$4">
                      <Text color="$silver4" fontSize={10} mb={2}>RISK SCORE</Text>
                      <XStack ai="center" space="$1">
                        <Activity size={16} color={data.metrics.risk_score > 70 ? "#ef4444" : data.metrics.risk_score > 40 ? "#EAB308" : "#22c55e"} />
                        <Text color="white" fontWeight="bold">{data.metrics.risk_score}/100</Text>
                      </XStack>
                   </YStack>
                </XStack>

                <Separator borderColor="$silver2" opacity={0.2} />

                {/* 2. PREDICTION CARD */}
                <Card bg="rgba(59, 130, 246, 0.1)" borderColor="rgba(59, 130, 246, 0.3)" bw={1} p="$4">
                  <XStack jc="space-between" ai="center" mb="$2">
                    <Text color="#3b82f6" fontWeight="bold" letterSpacing={1} fontSize={11}>AI PREDICTION (30 DAYS)</Text>
                    <TrendingUp size={16} color="#3b82f6" />
                  </XStack>
                  
                  <XStack ai="flex-end" space="$3">
                    <H2 color="white">${data.metrics.predicted_price_30d.toLocaleString()}</H2>
                    <YStack pb="$1">
                      <Text 
                        color={data.metrics.growth_percentage >= 0 ? "#22c55e" : "#ef4444"} 
                        fontWeight="bold"
                      >
                        {data.metrics.growth_percentage >= 0 ? "+" : ""}
                        {data.metrics.growth_percentage}%
                      </Text>
                    </YStack>
                  </XStack>
                  <Text color="$silver4" fontSize={11} mt="$2">
                    Forecast based on Prophet algorithm & historical trends.
                  </Text>
                </Card>

                {/* 3. NEWS SENTIMENT */}
                <H3 color="white" mt="$4" mb="$2">Market Sentiment</H3>
                <YStack space="$3">
                  {data.news.length > 0 ? (
                    data.news.map((item, index) => (
                      <Card key={index} bg="rgba(255,255,255,0.03)" p="$3" borderColor="$silver2" bw={1}>
                        <XStack jc="space-between" mb="$2">
                          <Text color="$silver4" fontSize={10} textTransform="uppercase">{item.source}</Text>
                          <YStack 
                            bg={item.sentiment === 'positive' ? "rgba(34, 197, 94, 0.2)" : item.sentiment === 'negative' ? "rgba(239, 68, 68, 0.2)" : "rgba(255,255,255,0.1)"} 
                            px="$2" py="$1" br="$2"
                          >
                            <Text 
                              fontSize={10} 
                              fontWeight="bold"
                              color={item.sentiment === 'positive' ? "#22c55e" : item.sentiment === 'negative' ? "#ef4444" : "$silver4"} 
                            >
                              {item.sentiment.toUpperCase()}
                            </Text>
                          </YStack>
                        </XStack>
                        <Text color="white" numberOfLines={2} fontWeight="bold" fontSize={14}>{item.title}</Text>
                      </Card>
                    ))
                  ) : (
                    <Text color="$silver4" fontStyle="italic">No recent news analyzed.</Text>
                  )}
                </YStack>

              </YStack>
            )}

          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </Theme>
  );
}