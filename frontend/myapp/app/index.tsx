import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { YStack, XStack, Text, Button, Input, H1, Spinner, Theme, Paragraph } from 'tamagui'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay, withRepeat, withTiming, Easing } from 'react-native-reanimated'
import { ArrowRight, UserPlus, Eye, EyeOff, BrainCircuit, User } from '@tamagui/lucide-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { StyleSheet, Dimensions, StatusBar as RNStatusBar, Alert } from 'react-native'
import { AuthService } from '../services/auth' // Import our new modular service

const { width } = Dimensions.get('window')
const AnimatedYStack = Animated.createAnimatedComponent(YStack)

export default function AuthScreen() {
  const router = useRouter()
  
  // --- STATE ---
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('') // New Field for your API
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  
  // --- ANIMATIONS ---
  const entranceOpacity = useSharedValue(0)
  const entranceTranslate = useSharedValue(30)
  const glowOpacity = useSharedValue(0.5)

  useEffect(() => {
    entranceOpacity.value = withDelay(300, withSpring(1))
    entranceTranslate.value = withDelay(300, withSpring(0))
    glowOpacity.value = withRepeat(
      withTiming(0.8, { duration: 3000, easing: Easing.inOut(Easing.ease) }), -1, true
    )
  }, [])

  const animatedFormStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [{ translateY: entranceTranslate.value }],
  }))

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }))

  // --- HANDLER ---
  const handleAuth = async () => {
    if (!email || !password) return Alert.alert("Error", "Please fill in email and password")
    if (isRegistering && !fullName) return Alert.alert("Error", "Name is required for Profile API")

    setLoading(true)
    try {
      if (isRegistering) {
        // Calls our Modular Register Service
        await AuthService.register(email, password, fullName)
        Alert.alert("Success", "Protocol Created! Please check email.")
        setIsRegistering(false)
      } else {
        // Calls our Modular Login Service
        await AuthService.login(email, password)
        router.replace('/(tabs)')
      }
    } catch (error: any) {
      Alert.alert("Access Denied", error.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Theme name="dark">
      <RNStatusBar barStyle="light-content" />
      <LinearGradient colors={['#050505', '#000000', '#0a0a0a']} style={StyleSheet.absoluteFillObject} />

      {/* Background Glow */}
      <AnimatedYStack 
        pos="absolute" top="-10%" left="-20%" 
        w={width * 1.5} h={width * 1.5} 
        bg={isRegistering ? "$silver4" : "$gold3"} 
        br={width} blurRadius={100} 
        style={[{ opacity: 0.15 }, animatedGlowStyle]} 
      />

      <YStack f={1} ai="center" jc="center" px="$4" space="$6" zIndex={10}>
        
        {/* LOGO */}
        <YStack ai="center" space="$2" mt="$-6">
          <YStack w={140} h={140} jc="center" ai="center" bg="rgba(255,255,255,0.02)" br={90} borderColor="$gold3" bw={1} shadowColor="$gold3" shadowRadius={30} shadowOpacity={0.2}>
            <BrainCircuit size={70} color="#EAB308" opacity={0.9} />
          </YStack>
          <H1 color="$white" letterSpacing={6} size="$9" fontWeight="900">FINNI<Text color="$gold3">.AI</Text></H1>
        </YStack>

        {/* GLASS FORM CARD */}
        <AnimatedYStack style={[{ width: '100%', maxWidth: 380 }, animatedFormStyle]}>
          <BlurView intensity={40} tint="dark" style={styles.glassCard}>
            <YStack p="$5" space="$4">
              
              <XStack jc="space-between" ai="center">
                <Text color="$silver3" fontSize={10} fontFamily="$mono">
                  {isRegistering ? "NEW PROTOCOL UPLINK" : "SECURE GATEWAY"}
                </Text>
                <YStack w={6} h={6} bg="$gold3" br={3} shadowColor="$gold3" shadowRadius={5} />
              </XStack>

              {/* INPUT: FULL NAME (Register Only - needed for /api/v1/user/profile) */}
              {isRegistering && (
                <Input 
                  value={fullName} onChangeText={setFullName}
                  placeholder="FULL DESIGNATION" placeholderTextColor="$silver3"
                  bg="rgba(0,0,0,0.3)" borderColor="rgba(255,255,255,0.1)" bw={1}
                  color="$white" h={50} px="$4" br="$4"
                />
              )}

              {/* INPUT: EMAIL */}
              <Input 
                value={email} onChangeText={setEmail}
                placeholder="IDENTITY / EMAIL" placeholderTextColor="$silver3"
                bg="rgba(0,0,0,0.3)" borderColor="rgba(255,255,255,0.1)" bw={1}
                color="$white" h={50} px="$4" br="$4"
                autoCapitalize="none"
              />

              {/* INPUT: PASSWORD */}
              <XStack ai="center" bg="rgba(0,0,0,0.3)" borderColor="rgba(255,255,255,0.1)" bw={1} br="$4" h={50} px="$4">
                <Input 
                  f={1} value={password} onChangeText={setPassword}
                  placeholder="ACCESS KEY" placeholderTextColor="$silver3"
                  unstyled color="$white" secureTextEntry={!showPass}
                />
                <Button size="$2" chromeless circular icon={showPass ? <EyeOff size={18} color="$silver4"/> : <Eye size={18} color="$silver4"/>} onPress={() => setShowPass(!showPass)} />
              </XStack>

              {/* ACTION BUTTON */}
              <Button h={55} mt="$2" br="$4" overflow="hidden" onPress={handleAuth} disabled={loading} opacity={loading ? 0.7 : 1} p={0}>
                <LinearGradient
                  colors={isRegistering ? ['#3f3f46', '#52525b'] : ['#B45309', '#F59E0B']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                >
                  {loading ? <Spinner color="black" /> : (
                    <>
                      <Text color={isRegistering ? "#fff" : "#000"} fontWeight="800" fontSize={15} letterSpacing={1}>
                        {isRegistering ? "ESTABLISH LINK" : "INITIALIZE"}
                      </Text>
                      {isRegistering ? <UserPlus size={20} color="#fff" /> : <ArrowRight size={20} color="#000" />}
                    </>
                  )}
                </LinearGradient>
              </Button>

              {/* TOGGLE */}
              <Button chromeless onPress={() => setIsRegistering(!isRegistering)}>
                <Text color="$silver4" fontSize={12} ta="center" mt="$2">
                  {isRegistering ? "Return to Login Sequence" : "New User? Create Protocol ID"}
                </Text>
              </Button>

            </YStack>
          </BlurView>
        </AnimatedYStack>

      </YStack>
    </Theme>
  )
}

const styles = StyleSheet.create({
  glassCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' }
})