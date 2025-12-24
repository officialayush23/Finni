// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'expo-router'
// import {
//   YStack,
//   XStack,
//   Text,
//   Button,
//   Input,
//   H1,
//   Spinner,
//   Theme,
// } from 'tamagui'
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   withDelay,
//   withRepeat,
//   withTiming,
//   Easing,
// } from 'react-native-reanimated'
// import {
//   ArrowRight,
//   UserPlus,
//   Eye,
//   EyeOff,
//   BrainCircuit,
// } from '@tamagui/lucide-icons'
// import { LinearGradient } from 'expo-linear-gradient'
// import { BlurView } from 'expo-blur'
// import {
//   StyleSheet,
//   Dimensions,
//   StatusBar as RNStatusBar,
//   Alert,
//   Platform,
// } from 'react-native'
// import { AuthService } from '../services/auth'

// const { width } = Dimensions.get('window')
// // const AnimatedYStack = Animated.createAnimatedComponent(YStack)
// const AnimatedView = Animated.View;

// export default function AuthScreen() {
//   const router = useRouter()

//   const [isRegistering, setIsRegistering] = useState(false)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [fullName, setFullName] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [showPass, setShowPass] = useState(false)

//   const entranceOpacity = useSharedValue(0)
//   const entranceTranslate = useSharedValue(30)
//   const glowOpacity = useSharedValue(0.5)

//   useEffect(() => {
//     entranceOpacity.value = withDelay(300, withSpring(1))
//     entranceTranslate.value = withDelay(300, withSpring(0))
//     glowOpacity.value = withRepeat(
//       withTiming(0.8, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
//       -1,
//       true
//     )
//   }, [])

//   const animatedFormStyle = useAnimatedStyle(() => ({
//     opacity: entranceOpacity.value,
//     transform: [{ translateY: entranceTranslate.value }],
//   }))

//   const animatedGlowStyle = useAnimatedStyle(() => ({
//     opacity: glowOpacity.value,
//   }))

//   const handleAuth = async () => {
//     if (!email || !password)
//       return Alert.alert('Error', 'Please fill in email and password')
//     if (isRegistering && !fullName)
//       return Alert.alert('Error', 'Name is required')

//     setLoading(true)
//     try {
//       if (isRegistering) {
//         await AuthService.register(email, password, fullName)
//         Alert.alert('Success', 'Account created. Verify email.')
//         setIsRegistering(false)
//       } else {
//         await AuthService.login(email, password)
//         router.replace('/(tabs)')
//       }
//     } catch (error: any) {
//       Alert.alert('Access Denied', error.message || 'Unknown error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Theme name="dark">
//       <RNStatusBar barStyle="light-content" />

//       <LinearGradient
//         colors={['#050505', '#000000', '#0a0a0a']}
//         style={StyleSheet.absoluteFillObject}
//       />

//       <AnimatedYStack
//         pos="absolute"
//         top="-10%"
//         left="-20%"
//         w={width * 1.5}
//         h={width * 1.5}
//         bg={isRegistering ? '$silver4' : '$gold3'}
//         br={width}
//         blurRadius={100}
//         style={[{ opacity: 0.15 }, animatedGlowStyle]}
//       />

//       <YStack f={1} ai="center" jc="center" px="$4" space="$6" zIndex={10}>

//         {/* LOGO */}
//         <YStack ai="center" space="$3" mt="$-6">
//           <YStack
//             w={140}
//             h={140}
//             jc="center"
//             ai="center"
//             bg="rgba(255,255,255,0.02)"
//             br={90}
//             borderColor="$gold3"
//             bw={1}
//             shadowColor="$gold3"
//             shadowRadius={30}
//             shadowOpacity={0.2}
//           >
//             <BrainCircuit size={70} color="#EAB308" opacity={0.9} />
//           </YStack>

//           <H1 color="$white" letterSpacing={4} size="$9" fontWeight="800">
//             FINNI<Text color="$gold3">.AI</Text>
//           </H1>
//         </YStack>

//         {/* FORM */}
//         <AnimatedYStack style={[{ width: '100%', maxWidth: 380 }, animatedFormStyle]}>
//           <BlurView intensity={40} tint="dark" style={styles.glassCard}>
//             <YStack p="$6" space="$4">

//               <Text color="$silver3" fontSize={11} fontFamily="$mono">
//                 {isRegistering ? 'CREATE ACCOUNT' : 'SECURE SIGN IN'}
//               </Text>

//               {isRegistering && (
//                 <Input
//                   {...inputBase}
//                   value={fullName}
//                   onChangeText={setFullName}
//                   placeholder="FULL NAME"
//                   placeholderTextColor="$silver3"
//                   autoComplete="off"
//                   importantForAutofill="no"
//                 />
//               )}

//               <Input
//                 {...inputBase}
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="EMAIL"
//                 placeholderTextColor="$silver3"
//                 autoCapitalize="none"
//                 keyboardType="email-address"
//                 autoComplete="off"
//                 importantForAutofill="no"
//                 textContentType="none"
//               />

//               <XStack {...inputWrapper}>
//                 <Input
//                   f={1}
//                   value={password}
//                   onChangeText={setPassword}
//                   placeholder="PASSWORD"
//                   placeholderTextColor="$silver3"
//                   secureTextEntry={!showPass}
//                   unstyled
//                   color="$white"
//                   autoComplete="off"
//                   importantForAutofill="no"
//                   textContentType="none"
//                 />
//                 <Button
//                   size="$2"
//                   chromeless
//                   circular
//                   icon={
//                     showPass ? (
//                       <EyeOff size={18} color="$silver4" />
//                     ) : (
//                       <Eye size={18} color="$silver4" />
//                     )
//                   }
//                   onPress={() => setShowPass(!showPass)}
//                 />
//               </XStack>

//               <Button
//                 h={55}
//                 mt="$2"
//                 br="$4"
//                 overflow="hidden"
//                 onPress={handleAuth}
//                 disabled={loading}
//                 opacity={loading ? 0.7 : 1}
//                 p={0}
//               >
//                 <LinearGradient
//                   colors={
//                     isRegistering
//                       ? ['#3f3f46', '#52525b']
//                       : ['#B45309', '#F59E0B']
//                   }
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.actionGradient}
//                 >
//                   {loading ? (
//                     <Spinner color="black" />
//                   ) : (
//                     <>
//                       <Text
//                         color={isRegistering ? '#fff' : '#000'}
//                         fontWeight="800"
//                         fontSize={14}
//                         letterSpacing={0.5}
//                       >
//                         {isRegistering ? 'CREATE ACCOUNT' : 'SIGN IN'}
//                       </Text>
//                       {isRegistering ? (
//                         <UserPlus size={20} color="#fff" />
//                       ) : (
//                         <ArrowRight size={20} color="#000" />
//                       )}
//                     </>
//                   )}
//                 </LinearGradient>
//               </Button>

//               <Button chromeless onPress={() => setIsRegistering(!isRegistering)}>
//                 <Text color="$silver4" fontSize={12}>
//                   {isRegistering
//                     ? 'Already have an account? Sign in'
//                     : 'New here? Create an account'}
//                 </Text>
//               </Button>

//             </YStack>
//           </BlurView>
//         </AnimatedYStack>
//       </YStack>
//     </Theme>
//   )
// }

// /* ========================= INPUT FIX (NO YELLOW) ========================= */

// const inputBase = {
//   bg: 'rgba(0,0,0,0.3)',
//   borderColor: 'rgba(255,255,255,0.1)',
//   bw: 1,
//   color: '$white',
//   h: 50,
//   px: '$4',
//   br: '$4',

//   // 🔑 THESE REMOVE YELLOW
//   selectionColor: 'rgba(255,255,255,0.25)',
//   cursorColor: '$white',
// }

// const inputWrapper = {
//   ai: 'center',
//   bg: 'rgba(0,0,0,0.3)',
//   borderColor: 'rgba(255,255,255,0.1)',
//   bw: 1,
//   br: '$4',
//   h: 50,
//   px: '$4',
// }

// const styles = StyleSheet.create({
//   glassCard: {
//     borderRadius: 24,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   actionGradient: {
//     width: '100%',
//     height: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 10,
//   },
// })


import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { YStack, XStack, Text, Button, Input, H1, Spinner, Theme } from 'tamagui'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { ArrowRight, UserPlus, Eye, EyeOff, BrainCircuit } from '@tamagui/lucide-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { StyleSheet, Dimensions, StatusBar as RNStatusBar, Alert } from 'react-native'
import { AuthService } from '../services/auth'

const { width } = Dimensions.get('window')

export default function AuthScreen() {
  const router = useRouter()
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const entranceOpacity = useSharedValue(0)
  const entranceTranslate = useSharedValue(30)
  const glowOpacity = useSharedValue(0.5)

  useEffect(() => {
    entranceOpacity.value = withDelay(300, withSpring(1))
    entranceTranslate.value = withDelay(300, withSpring(0))
    glowOpacity.value = withRepeat(
      withTiming(0.8, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [{ translateY: entranceTranslate.value }],
  }))

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }))

  const handleAuth = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please fill in email and password')
    if (isRegistering && !fullName) return Alert.alert('Error', 'Name is required')

    setLoading(true)
    try {
      if (isRegistering) {
        await AuthService.register(email, password, fullName)
        Alert.alert('Success', 'Account created. Verify email.')
        setIsRegistering(false)
      } else {
        await AuthService.login(email, password)
        // 🚀 This is where the transition happens
        router.replace('/(tabs)')
      }
    } catch (error: any) {
      Alert.alert('Access Denied', error.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Theme name="dark">
      <RNStatusBar barStyle="light-content" />
      <LinearGradient colors={['#050505', '#000000', '#0a0a0a']} style={StyleSheet.absoluteFillObject} />

      {/* 🚀 GLOW BACKGROUND (Fixed to use Animated.View) */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: '-10%',
            left: '-20%',
            width: width * 1.5,
            height: width * 1.5,
            borderRadius: width,
            backgroundColor: isRegistering ? '#A1A1AA' : '#EAB308',
            opacity: 0.15,
          },
          animatedGlowStyle
        ]}
      />

      <YStack f={1} ai="center" jc="center" px="$4" space="$6" zIndex={10}>
        <YStack ai="center" space="$3" mt="$-6">
          <YStack w={140} h={140} jc="center" ai="center" bg="rgba(255,255,255,0.02)" br={90} borderColor="$gold3" bw={1}>
            <BrainCircuit size={70} color="#EAB308" opacity={0.9} />
          </YStack>
          <H1 color="$white" letterSpacing={4} size="$9" fontWeight="800">
            FINNI<Text color="$gold3">.AI</Text>
          </H1>
        </YStack>

        {/* 🚀 FORM WRAPPER (Fixed to use Animated.View) */}
        <Animated.View style={[{ width: '100%', maxWidth: 380 }, animatedStyle]}>
          <BlurView intensity={40} tint="dark" style={styles.glassCard}>
            <YStack p="$6" space="$4">
              <Text color="$silver3" fontSize={11}>
                {isRegistering ? 'CREATE ACCOUNT' : 'SECURE SIGN IN'}
              </Text>

              {isRegistering && (
                <Input {...inputBase} value={fullName} onChangeText={setFullName} placeholder="FULL NAME" />
              )}

              <Input {...inputBase} value={email} onChangeText={setEmail} placeholder="EMAIL" />

              <XStack {...inputWrapper}>
                <Input
                  f={1}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="PASSWORD"
                  secureTextEntry={!showPass}
                  unstyled
                  color="$white"
                />
                <Button
                  size="$2"
                  chromeless
                  circular
                  icon={showPass ? <EyeOff size={18} color="$silver4" /> : <Eye size={18} color="$silver4" />}
                  onPress={() => setShowPass(!showPass)}
                />
              </XStack>

              <Button h={55} mt="$2" br="$4" overflow="hidden" onPress={handleAuth} disabled={loading} p={0}>
                <LinearGradient
                  colors={isRegistering ? ['#3f3f46', '#52525b'] : ['#B45309', '#F59E0B']}
                  style={styles.actionGradient}
                >
                  {loading ? <Spinner color="black" /> : (
                    <>
                      <Text color={isRegistering ? '#fff' : '#000'} fontWeight="800">
                        {isRegistering ? 'CREATE ACCOUNT' : 'SIGN IN'}
                      </Text>
                      {isRegistering ? <UserPlus size={20} color="#fff" /> : <ArrowRight size={20} color="#000" />}
                    </>
                  )}
                </LinearGradient>
              </Button>

              <Button chromeless onPress={() => setIsRegistering(!isRegistering)}>
                <Text color="$silver4" fontSize={12}>
                  {isRegistering ? 'Already have an account? Sign in' : 'New here? Create an account'}
                </Text>
              </Button>
            </YStack>
          </BlurView>
        </Animated.View>
      </YStack>
    </Theme>
  )
}

const inputBase = {
  bg: 'rgba(0,0,0,0.3)',
  borderColor: 'rgba(255,255,255,0.1)',
  bw: 1,
  color: '$white',
  h: 50,
  px: '$4',
  br: '$4',
}

const inputWrapper = {
  ai: 'center',
  bg: 'rgba(0,0,0,0.3)',
  borderColor: 'rgba(255,255,255,0.1)',
  bw: 1,
  br: '$4',
  h: 50,
  px: '$4',
}

const styles = StyleSheet.create({
  glassCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  actionGradient: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
})