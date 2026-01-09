import React, { useState } from 'react';
import { YStack, XStack, Text, Input, Button, Card, H2, Progress, AnimatePresence } from 'tamagui';
import { useRouter } from 'expo-router';
import { Sparkles, ArrowRight, CheckCircle2 } from '@tamagui/lucide-icons';
import { userService } from '../../services/userService';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    profile: { full_name: '', phone: '', currency: 'INR', risk_profile: 'balanced' },
    incomes: [{ name: 'Primary Salary', yearly_amount: 0 }],
    budget_preferences: { daily_food_budget: 500, monthly_discretionary_budget: 5000 }
  });

  const progress = (step / 3) * 100;

  const handleComplete = async () => {
    setLoading(true);
    try {
      await userService.onboarding(formData);
      router.replace('/(drawer)/(tabs)');
    } catch (e) {
      console.error("Setup failed:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <YStack f={1} bg="#000" p="$5" pt="$10" space="$6">
      <YStack space="$2">
        <XStack ai="center" space="$2">
          <Sparkles size={20} color="$gold10" />
          <Text color="$gold10" fontWeight="bold" ls={2}>FINNI.AI SETUP</Text>
        </XStack>
        <Progress value={progress} h={4} bc="$gray5">
          <Progress.Indicator animation="bouncy" bg="$gold10" />
        </Progress>
      </YStack>

      <AnimatePresence>
        {step === 1 && (
          <YStack space="$4" animation="lazy" enterStyle={{ opacity: 0, x: 20 }}>
            <H2 color="white">What's your name?</H2>
            <Input 
              size="$5" br="$4" bg="#111" color="white" bc="$gray4"
              placeholder="Full Name"
              value={formData.profile.full_name}
              onChangeText={(t) => setFormData({...formData, profile: {...formData.profile, full_name: t}})}
            />
            <Button iconAfter={ArrowRight} bg="$gold10" color="black" onPress={() => setStep(2)}>Continue</Button>
          </YStack>
        )}

        {step === 2 && (
          <YStack space="$4" animation="lazy" enterStyle={{ opacity: 0, x: 20 }}>
            <H2 color="white">Yearly Income</H2>
            <Text color="$gray11">This helps Finni calculate your Finance Score accurately.</Text>
            <Input 
              size="$5" br="$4" bg="#111" color="white" bc="$gray4" keyboardType="numeric"
              placeholder="e.g. 1200000"
              onChangeText={(t) => {
                const inc = [...formData.incomes];
                inc[0].yearly_amount = Number(t);
                setFormData({...formData, incomes: inc});
              }}
            />
            <Button iconAfter={ArrowRight} bg="$gold10" color="black" onPress={() => setStep(3)}>Almost there</Button>
          </YStack>
        )}

        {step === 3 && (
          <YStack space="$4" animation="lazy" enterStyle={{ opacity: 0, x: 20 }}>
            <H2 color="white">Risk Profile</H2>
            <XStack fw="wrap" gap="$2">
              {['Conservative', 'Balanced', 'Aggressive'].map((r) => (
                <Button 
                  key={r} f={1} bc={formData.profile.risk_profile === r.toLowerCase() ? '$gold10' : '$gray4'}
                  bw={1} bg={formData.profile.risk_profile === r.toLowerCase() ? 'rgba(234,179,8,0.1)' : '#111'}
                  onPress={() => setFormData({...formData, profile: {...formData.profile, risk_profile: r.toLowerCase()}})}
                >
                  <Text color="white">{r}</Text>
                </Button>
              ))}
            </XStack>
            <Button 
              icon={loading ? null : CheckCircle2} bg="$gold10" color="black" 
              onPress={handleComplete} disabled={loading}
            >
              {loading ? 'Initializing AI...' : 'Complete Setup'}
            </Button>
          </YStack>
        )}
      </AnimatePresence>
    </YStack>
  );
}