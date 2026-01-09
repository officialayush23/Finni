import React, { useState, useRef } from 'react';
import { ScrollView, Animated, TouchableOpacity } from 'react-native';
import { YStack, XStack, Text, H2, H4, Theme, Input, Button, Card, Progress, Spinner } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, ArrowRight, CheckCircle2, Shield, Wallet, Briefcase } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UserService } from '../services/userService';

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // --- FORM STATE MATCHING YOUR API SCHEMA ---
  const [formData, setFormData] = useState({
    profile: {
      full_name: '',
      phone: '',
      currency: 'INR',
      risk_profile: 'balanced'
    },
    incomes: [
      { name: 'Primary Salary', yearly_amount: 0 }
    ],
    investments: [],
    budget_preferences: {
      daily_food_budget: 0,
      monthly_discretionary_budget: 0,
      exclude_from_food: []
    }
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleFinish = async () => {
    setLoading(true);
    try {
      await UserService.onboarding(formData);
      router.replace('/(drawer)/(tabs)'); 
    } catch (error) {
      console.error("Onboarding Error:", error);
      alert("Failed to initialize profile. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Theme name="dark">
      <LinearGradient colors={['#000000', '#0A0A0A']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <YStack p="$4" space="$4">
            {/* PROGRESS HEADER */}
            <XStack jc="space-between" ai="center">
              <H4 color="#EAB308" fontWeight="900" ls={2}>STEP 0{step}</H4>
              <Progress value={(step / 3) * 100} w={150} h={6} bg="$gray5">
                <Progress.Indicator bg="#EAB308" animation="bouncy" />
              </Progress>
            </XStack>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
              
              {/* STEP 1: IDENTITY */}
              {step === 1 && (
                <YStack space="$5" mt="$4">
                  <YStack space="$2">
                    <H2 color="white" fontWeight="900">Establish Identity</H2>
                    <Text color="$gray11">This information is used for AI personalization.</Text>
                  </YStack>

                  <Card bg="#111" p="$4" br="$4" bw={1} bc="rgba(234,179,8,0.2)">
                    <YStack space="$4">
                      <YStack space="$2">
                        <Text color="$gold10" fontSize={11} fontWeight="800">FULL NAME</Text>
                        <Input 
                          bg="#000" bc="#333" color="white" placeholder="Atharva Pardeshi"
                          value={formData.profile.full_name}
                          onChangeText={(t) => setFormData({...formData, profile: {...formData.profile, full_name: t}})}
                        />
                      </YStack>
                      <YStack space="$2">
                        <Text color="$gold10" fontSize={11} fontWeight="800">PHONE NUMBER</Text>
                        <Input 
                          bg="#000" bc="#333" color="white" keyboardType="phone-pad"
                          value={formData.profile.phone}
                          onChangeText={(t) => setFormData({...formData, profile: {...formData.profile, phone: t}})}
                        />
                      </YStack>
                    </YStack>
                  </Card>
                  <Button bg="$gold10" color="black" iconAfter={ArrowRight} onPress={handleNext}>Continue</Button>
                </YStack>
              )}

              {/* STEP 2: FINANCIAL BASELINE */}
              {step === 2 && (
                <YStack space="$5" mt="$4">
                  <YStack space="$2">
                    <H2 color="white" fontWeight="900">Monthly Baseline</H2>
                    <Text color="$gray11">Tell us how much you earn to calibrate the AI.</Text>
                  </YStack>

                  <Card bg="#111" p="$4" br="$4" bw={1} bc="rgba(34,197,94,0.2)">
                    <YStack space="$4">
                      <YStack space="$2">
                        <Text color="$green10" fontSize={11} fontWeight="800">YEARLY INCOME (INR)</Text>
                        <Input 
                          bg="#000" bc="#333" color="white" keyboardType="numeric"
                          onChangeText={(t) => {
                            let inc = [...formData.incomes];
                            inc[0].yearly_amount = Number(t);
                            setFormData({...formData, incomes: inc});
                          }}
                        />
                      </YStack>
                    </YStack>
                  </Card>
                  <XStack space="$2">
                    <Button f={1} chromeless onPress={handleBack}>Back</Button>
                    <Button f={2} bg="$gold10" color="black" onPress={handleNext}>Next Step</Button>
                  </XStack>
                </YStack>
              )}

              {/* STEP 3: AI CONFIGURATION */}
              {step === 3 && (
                <YStack space="$5" mt="$4">
                  <YStack space="$2">
                    <H2 color="white" fontWeight="900">AI Logic</H2>
                    <Text color="$gray11">Finalize your risk profile and spending limits.</Text>
                  </YStack>

                  <Card bg="#111" p="$4" br="$4" bw={1} bc="rgba(234,179,8,0.2)">
                    <YStack space="$4">
                      <Text color="$gold10" fontSize={11} fontWeight="800">DAILY FOOD LIMIT</Text>
                      <Input 
                        bg="#000" bc="#333" color="white" keyboardType="numeric"
                        onChangeText={(t) => setFormData({
                          ...formData, 
                          budget_preferences: {...formData.budget_preferences, daily_food_budget: Number(t)}
                        })}
                      />
                      
                      <Text color="$gold10" fontSize={11} fontWeight="800">RISK APPETITE</Text>
                      <XStack space="$2">
                        {['Conservative', 'Balanced', 'Aggressive'].map((r) => (
                          <Button 
                            key={r} f={1} size="$3" br="$2"
                            bg={formData.profile.risk_profile === r.toLowerCase() ? '$gold10' : '#1a1a1a'}
                            color={formData.profile.risk_profile === r.toLowerCase() ? 'black' : 'white'}
                            onPress={() => setFormData({...formData, profile: {...formData.profile, risk_profile: r.toLowerCase()}})}
                          >
                            {r[0]}
                          </Button>
                        ))}
                      </XStack>
                    </YStack>
                  </Card>

                  <Button 
                    bg="$gold10" color="black" size="$5"
                    icon={loading ? <Spinner color="black" /> : <CheckCircle2 />}
                    onPress={handleFinish}
                    disabled={loading}
                  >
                    Initialize Protocol
                  </Button>
                </YStack>
              )}

            </ScrollView>
          </YStack>
        </SafeAreaView>
      </LinearGradient>
    </Theme>
  );
}