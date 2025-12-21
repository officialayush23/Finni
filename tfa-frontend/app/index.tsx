import React from 'react';
import { YStack, XStack, Text, Button, Card, ScrollView, Circle } from 'tamagui';
import LottieView from 'lottie-react-native';
import { Mic, Camera, Plus, Wallet, BellRing } from '@tamagui/lucide-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Dashboard() {
  return (
    // Replaced 'f', 'bg', 'pt', 'px' with full names to satisfy TypeScript
    <YStack flex={1} backgroundColor="$aiBlack" paddingTop="$8" paddingHorizontal="$4">
      
      {/* 1. Header: Simple, High Contrast */}
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$6">
        <YStack>
          <Text color="$aiDimSilver" fontSize="$3">TFA SYSTEM ONLINE</Text>
          <Text color="$aiSilver" fontSize="$8" fontWeight="bold">Hello, User</Text>
        </YStack>
        <Circle size="$5" backgroundColor="$aiDarkGray" borderWidth={1} borderColor="$aiGoldDim">
          <BellRing size={20} color="#D4AF37" />
        </Circle>
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 2. Hero Section: Net Worth with "Living" Background */}
        <Card height={220} borderRadius="$6" marginBottom="$6" overflow="hidden" bordered borderColor="$aiGoldDim">
           <LinearGradient
            colors={['#121212', '#000000']}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          />
          {/* Lottie: Abstract Tech/Data Flow (Simulates AI Processing) */}
          <LottieView
            source={require('../assets/lottie/ai-wave.json')} // Ensure this file exists in your assets!
            autoPlay
            loop
            style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.4 }}
          />
          
          <YStack flex={1} justifyContent="center" alignItems="center" zIndex={10}>
            <Text color="$aiDimSilver" fontSize="$3" letterSpacing={4} marginBottom="$2">NET WORTH</Text>
            <Text color="$aiSilver" fontSize={52} fontWeight="900" 
                  textShadowColor="rgba(212, 175, 55, 0.6)" textShadowRadius={15}>
              $24,500
            </Text>
            <XStack backgroundColor="rgba(212, 175, 55, 0.15)" paddingHorizontal="$3" paddingVertical="$1.5" borderRadius="$10" marginTop="$4" borderColor="$aiGoldDim" borderWidth={1}>
              <Text color="$aiGold" fontSize="$3" fontWeight="bold">▲ 12% vs last month</Text>
            </XStack>
          </YStack>
        </Card>

        {/* 3. Action Deck: The "Control Panel" */}
        <Text color="$aiSilver" marginBottom="$4" fontSize="$5" fontWeight="600">Directives</Text>
        <XStack gap="$3" marginBottom="$8">
            <ActionCard icon={Camera} label="Scan" />
            <ActionCard icon={Mic} label="Voice" />
            <ActionCard icon={Plus} label="Manual" />
        </XStack>

        {/* 4. AI Insight Stream */}
        <YStack marginBottom="$6">
           <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
              <Text color="$aiSilver" fontSize="$5" fontWeight="600">AI Analysis</Text>
              <Text color="$aiGold" fontSize="$3">View All</Text>
           </XStack>
           
           <Card backgroundColor="$aiDarkGray" padding="$4" borderRadius="$4" bordered borderColor="$aiGoldDim">
             <XStack gap="$4" alignItems="center">
                <LottieView
                  source={require('../assets/lottie/loading-ring.json')} // Ensure this file exists!
                  autoPlay
                  loop
                  style={{ width: 40, height: 40 }}
                />
                <YStack flex={1}>
                  <Text color="$aiGold" fontSize="$4" fontWeight="bold" marginBottom="$1">Anomaly Detected</Text>
                  <Text color="$aiDimSilver" fontSize="$3" lineHeight={20}>
                    Unusual spending detected at "Starbucks" (3x normal frequency).
                  </Text>
                </YStack>
             </XStack>
           </Card>
        </YStack>

      </ScrollView>
    </YStack>
  );
}

// Reusable Action Card Component
const ActionCard = ({ icon: Icon, label }: any) => (
  <YStack 
    flex={1} 
    height={100}
    backgroundColor="$aiDarkGray" 
    justifyContent="center" 
    alignItems="center" 
    borderRadius="$4"
    borderWidth={1}
    borderColor="$aiGoldDim"
    pressStyle={{ backgroundColor: '#1A1A1A', borderColor: '$aiGold' }}
    animation="bouncy"
  >
    <Icon size={28} color="#D4AF37" />
    <Text color="$aiSilver" marginTop="$3" fontSize="$3" fontWeight="600">{label}</Text>
  </YStack>
);