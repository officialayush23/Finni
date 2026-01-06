// // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // import { View, StyleSheet, Pressable, Platform } from 'react-native';
// // // // // // // // // import { BlurView } from 'expo-blur';
// // // // // // // // // import { XStack, YStack, Text, Theme } from 'tamagui';
// // // // // // // // // import { LayoutDashboard, MessageSquare, Mic, User, PieChart } from '@tamagui/lucide-icons';
// // // // // // // // // import Animated, { useAnimatedStyle, withSpring, withRepeat, withTiming } from 'react-native-reanimated';

// // // // // // // // // export default function FloatingNavbar({ state, navigation }) {
// // // // // // // // //   const [isHolding, setIsHolding] = useState(false);

// // // // // // // // //   // Pulsing animation for Mic holding
// // // // // // // // //   const pulseStyle = useAnimatedStyle(() => ({
// // // // // // // // //     transform: [{ 
// // // // // // // // //       scale: isHolding ? withRepeat(withTiming(1.3, { duration: 600 }), -1, true) : withSpring(0) 
// // // // // // // // //     }],
// // // // // // // // //     opacity: isHolding ? 0.6 : 0,
// // // // // // // // //   }));

// // // // // // // // //   const handlePress = (routeName, index) => {
// // // // // // // // //     const event = navigation.emit({
// // // // // // // // //       type: 'tabPress',
// // // // // // // // //       target: state.routes[index].key,
// // // // // // // // //       canPreventDefault: true,
// // // // // // // // //     });

// // // // // // // // //     if (!event.defaultPrevented) {
// // // // // // // // //       navigation.navigate(routeName);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <Theme name="dark">
// // // // // // // // //       <View style={styles.container}>
// // // // // // // // //         <BlurView intensity={Platform.OS === 'ios' ? 80 : 100} tint="dark" style={styles.blur}>
// // // // // // // // //           <XStack jc="space-around" ai="center" h={70} px="$2">
            
// // // // // // // // //             {/* 1. LOGO - Open Sidebar */}
// // // // // // // // //             <Pressable onPress={() => navigation.openDrawer()}>
// // // // // // // // //               <YStack w={40} h={40} br={20} bw={1.5} bc="$gold3" jc="center" ai="center">
// // // // // // // // //                 <Text fontWeight="900" color="$gold3" fontSize={18}>F</Text>
// // // // // // // // //               </YStack>
// // // // // // // // //             </Pressable>

// // // // // // // // //             {/* 2. DASHBOARD */}
// // // // // // // // //             <Pressable onPress={() => handlePress('index', 0)}>
// // // // // // // // //               <LayoutDashboard color={state.index === 0 ? '#EAB308' : '#A1A1AA'} size={24} />
// // // // // // // // //             </Pressable>

// // // // // // // // //             {/* 3. CENTER MIC / CHAT */}
// // // // // // // // //             <YStack ai="center" jc="center" w={60} mt={30} >
// // // // // // // // //               <Animated.View style={[styles.pulse, pulseStyle]} />
// // // // // // // // //               <Pressable
// // // // // // // // //                 onPress={() => handlePress('chat', 2)}
// // // // // // // // //                 onPressIn={() => setIsHolding(true)}
// // // // // // // // //                 onPressOut={() => setIsHolding(false)}
// // // // // // // // //                 style={({ pressed }) => [
// // // // // // // // //                   styles.micButton,
// // // // // // // // //                   { transform: [{ scale: pressed ? 0.9 : 1 }] }
// // // // // // // // //                 ]}
// // // // // // // // //               >
// // // // // // // // //                 {isHolding ? <Mic size={28} color="black" /> : <MessageSquare size={28} color="black" />}
// // // // // // // // //               </Pressable>
// // // // // // // // //             </YStack>

// // // // // // // // //             {/* 4. TRANSACTIONS */}
// // // // // // // // //             <Pressable onPress={() => handlePress('transactions', 3)}>
// // // // // // // // //               <PieChart color={state.index === 3 ? '#EAB308' : '#A1A1AA'} size={24} />
// // // // // // // // //             </Pressable>

// // // // // // // // //             {/* 5. PROFILE */}
// // // // // // // // //             <Pressable onPress={() => handlePress('profile', 4)}>
// // // // // // // // //               <User color={state.index === 4 ? '#EAB308' : '#A1A1AA'} size={24} />
// // // // // // // // //             </Pressable>

// // // // // // // // //           </XStack>
// // // // // // // // //         </BlurView>
// // // // // // // // //       </View>
// // // // // // // // //     </Theme>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // //   container: {
// // // // // // // // //     position: 'absolute',
// // // // // // // // //     bottom: Platform.OS === 'ios' ? 35 : 20,
// // // // // // // // //     left: 15,
// // // // // // // // //     right: 15,
// // // // // // // // //     height: 75,
// // // // // // // // //     zIndex: 1000,
// // // // // // // // //     elevation: 10,
// // // // // // // // //   },
// // // // // // // // //   blur: {
// // // // // // // // //     flex: 1,
// // // // // // // // //     borderRadius: 40,
// // // // // // // // //     overflow: 'hidden',
// // // // // // // // //     borderWidth: 1,
// // // // // // // // //     borderColor: 'rgba(255,255,255,0.1)',
// // // // // // // // //     backgroundColor: Platform.OS === 'android' ? '#0A0A0A' : 'transparent',
// // // // // // // // //   },
// // // // // // // // //   micButton: {
// // // // // // // // //     width: 58,
// // // // // // // // //     height: 58,
// // // // // // // // //     borderRadius: 29,
// // // // // // // // //     backgroundColor: '#EAB308',
// // // // // // // // //     justifyContent: 'center',
// // // // // // // // //     alignItems: 'center',
// // // // // // // // //     marginTop: -25, // Pops it up slightly
// // // // // // // // //     shadowColor: '#EAB308',
// // // // // // // // //     shadowOffset: { width: 0, height: 4 },
// // // // // // // // //     shadowOpacity: 0.3,
// // // // // // // // //     shadowRadius: 8,
// // // // // // // // //     elevation: 5,
// // // // // // // // //   },
// // // // // // // // //   pulse: {
// // // // // // // // //     position: 'absolute',
// // // // // // // // //     width: 60,
// // // // // // // // //     height: 60,
// // // // // // // // //     borderRadius: 30,
// // // // // // // // //     backgroundColor: '#EAB308',
// // // // // // // // //     top: -25,
// // // // // // // // //   }
// // // // // // // // // });


// // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // import { View, StyleSheet, Pressable, Platform } from 'react-native';
// // // // // // // // // import { BlurView } from 'expo-blur';
// // // // // // // // // import { XStack, YStack, Text, Theme } from 'tamagui';
// // // // // // // // // import { LayoutDashboard, MessageSquare, Mic, User, PieChart } from '@tamagui/lucide-icons';
// // // // // // // // // import Animated, { useAnimatedStyle, withSpring, withRepeat, withTiming } from 'react-native-reanimated';
// // // // // // // // // import { VoiceService } from '../services/voiceService'; // 🚀 Import Voice Service

// // // // // // // // // export default function FloatingNavbar({ state, navigation }) {
// // // // // // // // //   const [isHolding, setIsHolding] = useState(false);
// // // // // // // // //   const [spokenText, setSpokenText] = useState("");

// // // // // // // // //   const pulseStyle = useAnimatedStyle(() => ({
// // // // // // // // //     transform: [{ 
// // // // // // // // //       scale: isHolding ? withRepeat(withTiming(1.5, { duration: 500 }), -1, true) : withSpring(0) 
// // // // // // // // //     }],
// // // // // // // // //     opacity: isHolding ? 0.5 : 0,
// // // // // // // // //   }));

// // // // // // // // //   // 🎙️ START RECORDING
// // // // // // // // //   const handleHoldStart = async () => {
// // // // // // // // //     const hasPermission = await VoiceService.requestPermissions();
// // // // // // // // //     if (hasPermission) {
// // // // // // // // //       setIsHolding(true);
// // // // // // // // //       setSpokenText(""); // Clear previous
// // // // // // // // //       VoiceService.startListening(
// // // // // // // // //         (text) => setSpokenText(text), 
// // // // // // // // //         (err) => console.log("Voice Error:", err)
// // // // // // // // //       );
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // 🎙️ STOP RECORDING & SEND TO CHAT
// // // // // // // // //   const handleHoldEnd = async () => {
// // // // // // // // //     setIsHolding(false);
// // // // // // // // //     await VoiceService.stopListening();
    
// // // // // // // // //     // If user spoke something, send them to chat with that text
// // // // // // // // //     if (spokenText.trim().length > 0) {
// // // // // // // // //       navigation.navigate('chat', { voiceInput: spokenText });
// // // // // // // // //     } else {
// // // // // // // // //       navigation.navigate('chat'); // Just open chat if silent
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <Theme name="dark">
// // // // // // // // //       <View style={styles.container}>
// // // // // // // // //         <BlurView intensity={80} tint="dark" style={styles.blur}>
// // // // // // // // //           <XStack jc="space-around" ai="center" h={70}>
            
// // // // // // // // //             {/* ... Other icons (Dashboard, etc) ... */}

// // // // // // // // //             {/* 🎙️ THE MIC BUTTON */}
// // // // // // // // //             <YStack ai="center" jc="center" w={60}>
// // // // // // // // //               <Animated.View style={[styles.pulse, pulseStyle]} />
// // // // // // // // //               <Pressable
// // // // // // // // //                 onPressIn={handleHoldStart}
// // // // // // // // //                 onPressOut={handleHoldEnd}
// // // // // // // // //                 style={styles.micButton}
// // // // // // // // //               >
// // // // // // // // //                 {isHolding ? <Mic size={28} color="black" /> : <MessageSquare size={28} color="black" />}
// // // // // // // // //               </Pressable>
// // // // // // // // //               {isHolding && (
// // // // // // // // //                 <View style={styles.tooltip}>
// // // // // // // // //                   <Text color="white" fontSize={10}>Listening...</Text>
// // // // // // // // //                 </View>
// // // // // // // // //               )}
// // // // // // // // //             </YStack>

// // // // // // // // //             {/* ... Other icons (Profile, etc) ... */}

// // // // // // // // //           </XStack>
// // // // // // // // //         </BlurView>
// // // // // // // // //       </View>
// // // // // // // // //     </Theme>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // //   container: { position: 'absolute', bottom: 25, left: 20, right: 20, height: 70, zIndex: 1000 },
// // // // // // // // //   blur: { flex: 1, borderRadius: 35, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
// // // // // // // // //   micButton: { 
// // // // // // // // //     width: 60, 
// // // // // // // // //     height: 60, 
// // // // // // // // //     borderRadius: 30, 
// // // // // // // // //     backgroundColor: '#EAB308', 
// // // // // // // // //     justifyContent: 'center', 
// // // // // // // // //     alignItems: 'center', 
// // // // // // // // //     marginTop: -30, 
// // // // // // // // //     elevation: 5 
// // // // // // // // //   },
// // // // // // // // //   pulse: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', top: -30 },
// // // // // // // // //   tooltip: { position: 'absolute', top: -60, backgroundColor: 'rgba(0,0,0,0.8)', padding: 5, borderRadius: 5 }
// // // // // // // // // });


// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import { View, StyleSheet, Pressable, Platform } from 'react-native';
// // // // // // // // import { BlurView } from 'expo-blur';
// // // // // // // // import { XStack, YStack, Text, Theme } from 'tamagui';
// // // // // // // // import { LayoutDashboard, MessageSquare, Mic, User, PieChart } from '@tamagui/lucide-icons';
// // // // // // // // import Animated, { useAnimatedStyle, withSpring, withRepeat, withTiming } from 'react-native-reanimated';
// // // // // // // // import * as Haptics from 'expo-haptics'; // 🚀 Added for vibration
// // // // // // // // import { VoiceService } from '../services/voiceService'; 

// // // // // // // // export default function FloatingNavbar({ state, navigation }) {
// // // // // // // //   const [isHolding, setIsHolding] = useState(false);
// // // // // // // //   const [spokenText, setSpokenText] = useState("");

// // // // // // // //   // Initialize Voice Listeners
// // // // // // // //   useEffect(() => {
// // // // // // // //     VoiceService.init(
// // // // // // // //       (text) => {
// // // // // // // //         console.log("Captured:", text);
// // // // // // // //         setSpokenText(text);
// // // // // // // //       },
// // // // // // // //       (err) => {
// // // // // // // //         console.log("Voice Error:", err);
// // // // // // // //         setIsHolding(false);
// // // // // // // //       }
// // // // // // // //     );
// // // // // // // //   }, []);

// // // // // // // //   const pulseStyle = useAnimatedStyle(() => ({
// // // // // // // //     transform: [{ 
// // // // // // // //       scale: isHolding ? withRepeat(withTiming(1.6, { duration: 500 }), -1, true) : withSpring(0) 
// // // // // // // //     }],
// // // // // // // //     opacity: isHolding ? 0.4 : 0,
// // // // // // // //   }));

// // // // // // // //   // 🎙️ START RECORDING (Hold In)
// // // // // // // //   const handleHoldStart = async () => {
// // // // // // // //     // 1. Vibrate phone
// // // // // // // //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
// // // // // // // //     setIsHolding(true);
// // // // // // // //     setSpokenText(""); 
    
// // // // // // // //     // 2. Start Mic
// // // // // // // //     await VoiceService.startListening();
// // // // // // // //   };

// // // // // // // //   // 🎙️ STOP RECORDING (Release)
// // // // // // // //   const handleHoldEnd = async () => {
// // // // // // // //     setIsHolding(false);
// // // // // // // //     await VoiceService.stopListening();
    
// // // // // // // //     // 3. Small vibration on release
// // // // // // // //     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

// // // // // // // //     // 4. Navigate to Chat with the text
// // // // // // // //     // We use a slight delay to ensure the last word is processed
// // // // // // // //     setTimeout(() => {
// // // // // // // //       navigation.navigate('chat', { 
// // // // // // // //         voiceInput: spokenText,
// // // // // // // //         timestamp: Date.now() // Force update
// // // // // // // //       });
// // // // // // // //     }, 400);
// // // // // // // //   };

// // // // // // // //   const handlePress = (routeName, index) => {
// // // // // // // //     navigation.navigate(routeName);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <Theme name="dark">
// // // // // // // //       <View style={styles.container}>
// // // // // // // //         <BlurView intensity={Platform.OS === 'ios' ? 80 : 100} tint="dark" style={styles.blur}>
// // // // // // // //           <XStack jc="space-around" ai="center" h={70} px="$2">
            
// // // // // // // //             {/* LOGO/DRAWER */}
// // // // // // // //             <Pressable onPress={() => navigation.openDrawer()}>
// // // // // // // //               <YStack w={38} h={38} br={19} bw={1.5} bc="$gold3" jc="center" ai="center">
// // // // // // // //                 <Text fontWeight="900" color="$gold3" fontSize={16}>F</Text>
// // // // // // // //               </YStack>
// // // // // // // //             </Pressable>

// // // // // // // //             {/* DASHBOARD */}
// // // // // // // //             <Pressable onPress={() => handlePress('index', 0)}>
// // // // // // // //               <LayoutDashboard color={state.index === 0 ? '#EAB308' : '#A1A1AA'} size={22} />
// // // // // // // //             </Pressable>

// // // // // // // //             {/* 🎙️ THE CENTER MIC BUTTON */}
// // // // // // // //             <YStack ai="center" jc="center" w={70} mt={32}>
// // // // // // // //               <Animated.View style={[styles.pulse, pulseStyle]} />
// // // // // // // //               <Pressable
// // // // // // // //                 onPressIn={handleHoldStart}
// // // // // // // //                 onPressOut={handleHoldEnd}
// // // // // // // //                 style={({ pressed }) => [
// // // // // // // //                   styles.micButton,
// // // // // // // //                   { transform: [{ scale: pressed ? 0.92 : 1 }] }
// // // // // // // //                 ]}
// // // // // // // //               >
// // // // // // // //                 {isHolding ? (
// // // // // // // //                   <Mic size={28} color="black" />
// // // // // // // //                 ) : (
// // // // // // // //                   <MessageSquare size={26} color="black" />
// // // // // // // //                 )}
// // // // // // // //               </Pressable>
              
// // // // // // // //               {isHolding && (
// // // // // // // //                 <View style={styles.tooltip}>
// // // // // // // //                   <Text color="white" fontSize={10} fontWeight="bold">LISTENING...</Text>
// // // // // // // //                 </View>
// // // // // // // //               )}
// // // // // // // //             </YStack>

// // // // // // // //             {/* ANALYSIS */}
// // // // // // // //             <Pressable onPress={() => handlePress('transactions', 3)}>
// // // // // // // //               <PieChart color={state.index === 3 ? '#EAB308' : '#A1A1AA'} size={22} />
// // // // // // // //             </Pressable>

// // // // // // // //             {/* PROFILE */}
// // // // // // // //             <Pressable onPress={() => handlePress('profile', 4)}>
// // // // // // // //               <User color={state.index === 4 ? '#EAB308' : '#A1A1AA'} size={22} />
// // // // // // // //             </Pressable>

// // // // // // // //           </XStack>
// // // // // // // //         </BlurView>
// // // // // // // //       </View>
// // // // // // // //     </Theme>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // const styles = StyleSheet.create({
// // // // // // // //   container: { 
// // // // // // // //     position: 'absolute', 
// // // // // // // //     bottom: Platform.OS === 'ios' ? 35 : 25, 
// // // // // // // //     left: 20, 
// // // // // // // //     right: 20, 
// // // // // // // //     height: 70, 
// // // // // // // //     zIndex: 1000 
// // // // // // // //   },
// // // // // // // //   blur: { 
// // // // // // // //     flex: 1, 
// // // // // // // //     borderRadius: 35, 
// // // // // // // //     overflow: 'hidden', 
// // // // // // // //     borderWidth: 1, 
// // // // // // // //     borderColor: 'rgba(255,255,255,0.1)',
// // // // // // // //     backgroundColor: Platform.OS === 'android' ? 'rgba(10,10,10,0.95)' : 'transparent'
// // // // // // // //   },
// // // // // // // //   micButton: { 
// // // // // // // //     width: 60, 
// // // // // // // //     height: 60, 
// // // // // // // //     borderRadius: 30, 
// // // // // // // //     backgroundColor: '#EAB308', 
// // // // // // // //     justifyContent: 'center', 
// // // // // // // //     alignItems: 'center', 
// // // // // // // //     marginTop: -35, 
// // // // // // // //     elevation: 8,
// // // // // // // //     shadowColor: '#EAB308',
// // // // // // // //     shadowOffset: { width: 0, height: 4 },
// // // // // // // //     shadowOpacity: 0.4,
// // // // // // // //     shadowRadius: 10,
// // // // // // // //   },
// // // // // // // //   pulse: { 
// // // // // // // //     position: 'absolute', 
// // // // // // // //     width: 60, 
// // // // // // // //     height: 60, 
// // // // // // // //     borderRadius: 30, 
// // // // // // // //     backgroundColor: '#EAB308', 
// // // // // // // //     top: -35 
// // // // // // // //   },
// // // // // // // //   tooltip: { 
// // // // // // // //     position: 'absolute', 
// // // // // // // //     top: -85, 
// // // // // // // //     backgroundColor: 'rgba(234, 179, 8, 0.9)', 
// // // // // // // //     paddingHorizontal: 10, 
// // // // // // // //     paddingVertical: 4, 
// // // // // // // //     borderRadius: 12 
// // // // // // // //   }
// // // // // // // // });


// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import { View, StyleSheet, Pressable, Platform } from 'react-native';
// // // // // // // import { BlurView } from 'expo-blur';
// // // // // // // import { XStack, YStack, Text, Theme } from 'tamagui';
// // // // // // // import { LayoutDashboard, MessageSquare, Mic, User, PieChart } from '@tamagui/lucide-icons';
// // // // // // // import Animated, { useAnimatedStyle, withSpring, withRepeat, withTiming } from 'react-native-reanimated';
// // // // // // // import * as Haptics from 'expo-haptics';
// // // // // // // import { VoiceService } from '../services/voiceService';

// // // // // // // export default function FloatingNavbar({ state, navigation }) {
// // // // // // //   const [isHolding, setIsHolding] = useState(false);
// // // // // // //   const [spokenText, setSpokenText] = useState("");

// // // // // // //   // Initialize standard listeners
// // // // // // //   useEffect(() => {
// // // // // // //     VoiceService.setup(
// // // // // // //       (text) => setSpokenText(text),
// // // // // // //       () => setIsHolding(false)
// // // // // // //     );

// // // // // // //     return () => {
// // // // // // //       VoiceService.destroy();
// // // // // // //     };
// // // // // // //   }, []);

// // // // // // //   const pulseStyle = useAnimatedStyle(() => ({
// // // // // // //     transform: [{ 
// // // // // // //       scale: isHolding ? withRepeat(withTiming(1.6, { duration: 500 }), -1, true) : withSpring(0) 
// // // // // // //     }],
// // // // // // //     opacity: isHolding ? 0.4 : 0,
// // // // // // //   }));

// // // // // // //   const handleHoldStart = async () => {
// // // // // // //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
// // // // // // //     setIsHolding(true);
// // // // // // //     setSpokenText(""); 
// // // // // // //     await VoiceService.start();
// // // // // // //   };

// // // // // // //   const handleHoldEnd = async () => {
// // // // // // //     setIsHolding(false);
// // // // // // //     await VoiceService.stop();
    
// // // // // // //     // Give the engine 300ms to finalize the text
// // // // // // //     setTimeout(() => {
// // // // // // //       if (spokenText && spokenText.trim().length > 0) {
// // // // // // //         navigation.navigate('chat', { voiceInput: spokenText });
// // // // // // //       } else {
// // // // // // //         // If no text, just go to chat
// // // // // // //         navigation.navigate('chat');
// // // // // // //       }
// // // // // // //     }, 300);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Theme name="dark">
// // // // // // //       <View style={styles.container}>
// // // // // // //         <BlurView intensity={90} tint="dark" style={styles.blur}>
// // // // // // //           <XStack jc="space-around" ai="center" h={70} px="$2">
            
// // // // // // //             {/* Logo */}
// // // // // // //             <Pressable onPress={() => navigation.openDrawer()}>
// // // // // // //               <YStack w={35} h={35} br={18} bw={1} bc="$gold3" jc="center" ai="center">
// // // // // // //                 <Text fontWeight="bold" color="$gold3">F</Text>
// // // // // // //               </YStack>
// // // // // // //             </Pressable>

// // // // // // //             {/* Dashboard */}
// // // // // // //             <Pressable onPress={() => navigation.navigate('index')}>
// // // // // // //               <LayoutDashboard color={state.index === 0 ? '#EAB308' : '#666'} size={24} />
// // // // // // //             </Pressable>

// // // // // // //             {/* 🎙️ THE STANDARD MIC BUTTON */}
// // // // // // //             <YStack ai="center" jc="center" w={70} mt={32}>
// // // // // // //               <Animated.View style={[styles.pulse, pulseStyle]} />
// // // // // // //               <Pressable
// // // // // // //                 onPressIn={handleHoldStart}
// // // // // // //                 onPressOut={handleHoldEnd}
// // // // // // //                 style={styles.micButton}
// // // // // // //               >
// // // // // // //                 {isHolding ? <Mic size={28} color="black" /> : <MessageSquare size={26} color="black" />}
// // // // // // //               </Pressable>
// // // // // // //             </YStack>

// // // // // // //             {/* Transactions */}
// // // // // // //             <Pressable onPress={() => navigation.navigate('transactions')}>
// // // // // // //               <PieChart color={state.index === 3 ? '#EAB308' : '#666'} size={24} />
// // // // // // //             </Pressable>

// // // // // // //             {/* Profile */}
// // // // // // //             <Pressable onPress={() => navigation.navigate('profile')}>
// // // // // // //               <User color={state.index === 4 ? '#EAB308' : '#666'} size={24} />
// // // // // // //             </Pressable>

// // // // // // //           </XStack>
// // // // // // //         </BlurView>
// // // // // // //       </View>
// // // // // // //     </Theme>
// // // // // // //   );
// // // // // // // }

// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: { position: 'absolute', bottom: 30, left: 20, right: 20, height: 70, zIndex: 1000 },
// // // // // // //   blur: { flex: 1, borderRadius: 35, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
// // // // // // //   micButton: { 
// // // // // // //     width: 60, 
// // // // // // //     height: 60, 
// // // // // // //     borderRadius: 30, 
// // // // // // //     backgroundColor: '#EAB308', 
// // // // // // //     justifyContent: 'center', 
// // // // // // //     alignItems: 'center', 
// // // // // // //     marginTop: -35,
// // // // // // //     elevation: 5 
// // // // // // //   },
// // // // // // //   pulse: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', top: -35 }
// // // // // // // });


// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { View, StyleSheet, Pressable, Platform } from 'react-native';
// // // // // // import { BlurView } from 'expo-blur';
// // // // // // import { XStack, YStack, Text, Theme } from 'tamagui';
// // // // // // import { LayoutDashboard, MessageSquare, Mic, User, PieChart } from '@tamagui/lucide-icons';
// // // // // // import Animated, { useAnimatedStyle, withSpring, withRepeat, withTiming } from 'react-native-reanimated';
// // // // // // import * as Haptics from 'expo-haptics';
// // // // // // import { VoiceService } from '../services/voiceService';

// // // // // // export default function FloatingNavbar({ state, navigation }) {
// // // // // //   const [isHolding, setIsHolding] = useState(false);
// // // // // //   const [spokenText, setSpokenText] = useState("");

// // // // // //   useEffect(() => {
// // // // // //     VoiceService.setup(
// // // // // //       (text) => setSpokenText(text),
// // // // // //       () => setIsHolding(false)
// // // // // //     );
// // // // // //     return () => VoiceService.destroy();
// // // // // //   }, []);

// // // // // //   const pulseStyle = useAnimatedStyle(() => ({
// // // // // //     transform: [{ 
// // // // // //       scale: isHolding ? withRepeat(withTiming(1.7, { duration: 500 }), -1, true) : withSpring(0) 
// // // // // //     }],
// // // // // //     opacity: isHolding ? 0.5 : 0,
// // // // // //   }));

// // // // // //   const handleHoldStart = async () => {
// // // // // //     // Vibration feedback
// // // // // //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
// // // // // //     setIsHolding(true);
// // // // // //     setSpokenText(""); 
// // // // // //     await VoiceService.start();
// // // // // //   };

// // // // // //   const handleHoldEnd = async () => {
// // // // // //     setIsHolding(false);
// // // // // //     await VoiceService.stop();
    
// // // // // //     // Slight delay to catch final speech result
// // // // // //     setTimeout(() => {
// // // // // //       if (spokenText && spokenText.trim().length > 0) {
// // // // // //         navigation.navigate('chat', { voiceInput: spokenText });
// // // // // //       } else {
// // // // // //         navigation.navigate('chat');
// // // // // //       }
// // // // // //     }, 400);
// // // // // //   };

// // // // // //   return (
// // // // // //     <Theme name="dark">
// // // // // //       <View style={styles.container}>
// // // // // //         <BlurView intensity={100} tint="dark" style={styles.blur}>
// // // // // //           <XStack jc="space-around" ai="center" h={70} px="$2">
            
// // // // // //             <Pressable onPress={() => navigation.openDrawer()}>
// // // // // //               <YStack w={35} h={35} br={18} bw={1} bc="$gold3" jc="center" ai="center">
// // // // // //                 <Text fontWeight="bold" color="$gold3">F</Text>
// // // // // //               </YStack>
// // // // // //             </Pressable>

// // // // // //             <Pressable onPress={() => navigation.navigate('index')}>
// // // // // //               <LayoutDashboard color={state.index === 0 ? '#EAB308' : '#666'} size={22} />
// // // // // //             </Pressable>

// // // // // //             {/* 🎙️ THE CENTER MIC BUTTON */}
// // // // // //             <YStack ai="center" jc="center" w={70}>
// // // // // //               <Animated.View style={[styles.pulse, pulseStyle]} />
// // // // // //               <Pressable
// // // // // //                 onPressIn={handleHoldStart}
// // // // // //                 onPressOut={handleHoldEnd}
// // // // // //                 style={styles.micButton}
// // // // // //               >
// // // // // //                 {isHolding ? <Mic size={28} color="black" /> : <MessageSquare size={26} color="black" />}
// // // // // //               </Pressable>
// // // // // //               {isHolding && (
// // // // // //                  <View style={styles.tooltip}><Text color="black" fontSize={10} fontWeight="bold">LISTENING</Text></View>
// // // // // //               )}
// // // // // //             </YStack>

// // // // // //             <Pressable onPress={() => navigation.navigate('transactions')}>
// // // // // //               <PieChart color={state.index === 3 ? '#EAB308' : '#666'} size={22} />
// // // // // //             </Pressable>

// // // // // //             <Pressable onPress={() => navigation.navigate('profile')}>
// // // // // //               <User color={state.index === 4 ? '#EAB308' : '#666'} size={22} />
// // // // // //             </Pressable>

// // // // // //           </XStack>
// // // // // //         </BlurView>
// // // // // //       </View>
// // // // // //     </Theme>
// // // // // //   );
// // // // // // }

// // // // // // const styles = StyleSheet.create({
// // // // // //   container: { position: 'absolute', bottom: 30, left: 20, right: 20, height: 70, zIndex: 1000 },
// // // // // //   blur: { flex: 1, borderRadius: 35, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'black' },
// // // // // //   micButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', justifyContent: 'center', alignItems: 'center', marginTop: -35, elevation: 5 },
// // // // // //   pulse: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', top: -35 },
// // // // // //   tooltip: { position: 'absolute', top: -75, backgroundColor: '#EAB308', paddingHorizontal: 8, borderRadius: 10 }
// // // // // // });


// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { View, StyleSheet, Pressable } from 'react-native';
// // // // // import { BlurView } from 'expo-blur';
// // // // // import { XStack, YStack, Text, Theme } from 'tamagui';
// // // // // import { MessageSquare, Mic } from '@tamagui/lucide-icons';
// // // // // import Animated, { useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
// // // // // import { VoiceService } from '../services/voiceService';

// // // // // export default function FloatingNavbar({ state, navigation }) {
// // // // //   const [isHolding, setIsHolding] = useState(false);

// // // // //   useEffect(() => {
// // // // //     VoiceService.setup();
// // // // //   }, []);

// // // // //   const pulseStyle = useAnimatedStyle(() => ({
// // // // //     transform: [{ scale: isHolding ? withRepeat(withTiming(1.5, { duration: 500 }), -1, true) : 1 }],
// // // // //     opacity: isHolding ? 0.5 : 0,
// // // // //   }));

// // // // //   const handleHoldStart = async () => {
// // // // //     setIsHolding(true);
// // // // //     await VoiceService.start();
// // // // //   };

// // // // //   const handleHoldEnd = async () => {
// // // // //     setIsHolding(false);
// // // // //     const audioUri = await VoiceService.stop();
    
// // // // //     // Send the audio file path to the chat
// // // // //     if (audioUri) {
// // // // //       navigation.navigate('chat', { audioUri });
// // // // //     } else {
// // // // //       navigation.navigate('chat');
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <Theme name="dark">
// // // // //       <View style={styles.container}>
// // // // //         <BlurView intensity={100} tint="dark" style={styles.blur}>
// // // // //           <XStack jc="center" ai="center" h={70}>
// // // // //             <YStack ai="center">
// // // // //               <Animated.View style={[styles.pulse, pulseStyle]} />
// // // // //               <Pressable
// // // // //                 onPressIn={handleHoldStart}
// // // // //                 onPressOut={handleHoldEnd}
// // // // //                 style={styles.micButton}
// // // // //               >
// // // // //                 {isHolding ? <Mic size={28} color="black" /> : <MessageSquare size={26} color="black" />}
// // // // //               </Pressable>
// // // // //             </YStack>
// // // // //           </XStack>
// // // // //         </BlurView>
// // // // //       </View>
// // // // //     </Theme>
// // // // //   );
// // // // // }

// // // // // const styles = StyleSheet.create({
// // // // //   container: { position: 'absolute', bottom: 30, left: 20, right: 20, height: 70, zIndex: 1000 },
// // // // //   blur: { flex: 1, borderRadius: 35, overflow: 'hidden', backgroundColor: 'black' },
// // // // //   micButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', justifyContent: 'center', alignItems: 'center', marginTop: -35 },
// // // // //   pulse: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', top: -35 }
// // // // // });



// // // // import React, { useState, useEffect } from 'react';
// // // // import { View, StyleSheet, Pressable } from 'react-native';
// // // // import { BlurView } from 'expo-blur';
// // // // import { XStack, YStack, Text, Theme } from 'tamagui';
// // // // import { MessageSquare, Mic } from '@tamagui/lucide-icons';
// // // // import Animated, { useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
// // // // import { VoiceService } from '../services/voiceService';

// // // // export default function FloatingNavbar({ navigation }) {
// // // //   const [isHolding, setIsHolding] = useState(false);

// // // //   useEffect(() => {
// // // //     VoiceService.setup();
// // // //   }, []);

// // // //   const pulseStyle = useAnimatedStyle(() => ({
// // // //     transform: [{ scale: isHolding ? withRepeat(withTiming(1.5, { duration: 500 }), -1, true) : 1 }],
// // // //     opacity: isHolding ? 0.6 : 0,
// // // //   }));

// // // //   const handleHoldStart = async () => {
// // // //     setIsHolding(true);
// // // //     await VoiceService.start();
// // // //   };

// // // //   const handleHoldEnd = async () => {
// // // //     // Add a tiny delay so the recording has at least 100ms of data
// // // //     setTimeout(async () => {
// // // //       setIsHolding(false);
// // // //       const audioUri = await VoiceService.stop();
// // // //       if (audioUri) {
// // // //         navigation.navigate('chat', { audioUri });
// // // //       }
// // // //     }, 200);
// // // //   };

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <View style={styles.container}>
// // // //         <BlurView intensity={100} tint="dark" style={styles.blur}>
// // // //           <XStack jc="center" ai="center" h={70}>
// // // //             <YStack ai="center">
// // // //               <Animated.View style={[styles.pulse, pulseStyle]} />
// // // //               <Pressable
// // // //                 onPressIn={handleHoldStart}
// // // //                 onPressOut={handleHoldEnd}
// // // //                 style={styles.micButton}
// // // //               >
// // // //                 {isHolding ? <Mic size={28} color="black" /> : <MessageSquare size={26} color="black" />}
// // // //               </Pressable>
// // // //             </YStack>
// // // //           </XStack>
// // // //         </BlurView>
// // // //       </View>
// // // //     </Theme>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: { position: 'absolute', bottom: 30, left: 20, right: 20, height: 70, zIndex: 1000 },
// // // //   blur: { flex: 1, borderRadius: 35, overflow: 'hidden', backgroundColor: 'black' },
// // // //   micButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', justifyContent: 'center', alignItems: 'center', marginTop: -35 },
// // // //   pulse: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', top: -35 }
// // // // });


// // // import React, { useState, useEffect } from 'react';
// // // import { View, StyleSheet, Pressable, Platform } from 'react-native';
// // // import { BlurView } from 'expo-blur';
// // // import { XStack, YStack, Text, Theme } from 'tamagui';
// // // import { MessageSquare, Mic } from '@tamagui/lucide-icons';
// // // import Animated, { useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
// // // import { SpeechRecognition } from 'expo-speech-recognition'; // 🚀 The library you want

// // // export default function FloatingNavbar({ navigation, state }) {
// // //   const [isHolding, setIsHolding] = useState(false);
// // //   const [spokenText, setSpokenText] = useState("");

// // //   const pulseStyle = useAnimatedStyle(() => ({
// // //     transform: [{ scale: isHolding ? withRepeat(withTiming(1.6, { duration: 500 }), -1, true) : 1 }],
// // //     opacity: isHolding ? 0.5 : 0,
// // //   }));

// // //   const handleHoldStart = async () => {
// // //     // 1. Request Permissions
// // //     const result = await SpeechRecognition.requestPermissionsAsync();
// // //     if (!result.granted) return;

// // //     setIsHolding(true);
// // //     setSpokenText(""); // Reset text

// // //     // 2. Start Listening
// // //     SpeechRecognition.startListeningAsync({
// // //       lang: 'en-US',
// // //       interimResults: true, // This updates the text AS you speak
// // //     });

// // //     // 3. Listen for Results
// // //     SpeechRecognition.addSpeechRecognitionListener((event) => {
// // //       if (event.type === 'result') {
// // //         const transcript = event.results[0].transcript;
// // //         setSpokenText(transcript);
// // //         console.log("🗣️ You said:", transcript);
// // //       }
// // //     });
// // //   };

// // //   const handleHoldEnd = async () => {
// // //     setIsHolding(false);
// // //     await SpeechRecognition.stopListeningAsync();

// // //     // 4. Navigate to Chat and pass the text
// // //     if (spokenText.trim().length > 0) {
// // //       navigation.navigate('chat', { 
// // //         voiceInput: spokenText,
// // //         timestamp: Date.now() 
// // //       });
// // //     } else {
// // //       navigation.navigate('chat');
// // //     }
// // //   };

// // //   return (
// // //     <Theme name="dark">
// // //       <View style={styles.container}>
// // //         <BlurView intensity={100} tint="dark" style={styles.blur}>
// // //           <XStack jc="center" ai="center" h={70}>
// // //             <YStack ai="center">
// // //               <Animated.View style={[styles.pulse, pulseStyle]} />
// // //               <Pressable
// // //                 onPressIn={handleHoldStart}
// // //                 onPressOut={handleHoldEnd}
// // //                 style={styles.micButton}
// // //               >
// // //                 {isHolding ? <Mic size={28} color="black" /> : <MessageSquare size={26} color="black" />}
// // //               </Pressable>
// // //               {isHolding && (
// // //                 <View style={styles.tooltip}>
// // //                   <Text color="black" fontWeight="bold" fontSize={10}>
// // //                     {spokenText ? "RECORDING..." : "LISTENING..."}
// // //                   </Text>
// // //                 </View>
// // //               )}
// // //             </YStack>
// // //           </XStack>
// // //         </BlurView>
// // //       </View>
// // //     </Theme>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: { position: 'absolute', bottom: 30, left: 20, right: 20, height: 70, zIndex: 1000 },
// // //   blur: { flex: 1, borderRadius: 35, overflow: 'hidden', backgroundColor: 'black' },
// // //   micButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', justifyContent: 'center', alignItems: 'center', marginTop: -35 },
// // //   pulse: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', top: -35 },
// // //   tooltip: { position: 'absolute', top: -75, backgroundColor: '#EAB308', paddingHorizontal: 10, borderRadius: 10 }
// // // });








// // import React, { useState } from 'react';
// // import { View, StyleSheet, Pressable } from 'react-native';
// // import { BlurView } from 'expo-blur';
// // import { XStack, YStack, Text, Theme } from 'tamagui';
// // import { LayoutDashboard, MessageSquare, Mic, User, PieChart } from '@tamagui/lucide-icons';
// // import Animated, { useAnimatedStyle, withSpring, withRepeat, withTiming } from 'react-native-reanimated';
// // import * as Haptics from 'expo-haptics';
// // import { VoiceService } from '../services/voiceService';

// // export default function FloatingNavbar({ state, navigation }) {
// //   const [isHolding, setIsHolding] = useState(false);
// //   const [currentTranscript, setCurrentTranscript] = useState("");

// //   const pulseStyle = useAnimatedStyle(() => ({
// //     transform: [{ scale: isHolding ? withRepeat(withTiming(1.6, { duration: 500 }), -1, true) : withSpring(0) }],
// //     opacity: isHolding ? 0.4 : 0,
// //   }));

// //   const handleHoldStart = async () => {
// //     const hasPerm = await VoiceService.init();
// //     if (!hasPerm) return;

// //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
// //     setIsHolding(true);
// //     setCurrentTranscript(""); 

// //     await VoiceService.start(
// //       (text) => setCurrentTranscript(text),
// //       (err) => { setIsHolding(false); console.log("Mic Error:", err); }
// //     );
// //   };

// //   const handleHoldEnd = async () => {
// //     setIsHolding(false);
// //     await VoiceService.stop();
// //     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

// //     // Navigate and pass the final transcript
// //     setTimeout(() => {
// //       navigation.navigate('chat', { 
// //         voiceInput: currentTranscript,
// //         timestamp: Date.now() 
// //       });
// //     }, 400);
// //   };

// //   return (
// //     <Theme name="dark">
// //       <View style={styles.container}>
// //         <BlurView intensity={90} tint="dark" style={styles.blur}>
// //           <XStack jc="space-around" ai="center" h={70} px="$2">

// //             <Pressable onPress={() => navigation.navigate('profile')}>
// //               <User color={state?.index === 4 ? '#EAB308' : '#666'} size={24} />
// //             </Pressable>

// //             <Pressable onPress={() => navigation.navigate('index')}>
// //               <LayoutDashboard color={state?.index === 0 ? '#EAB308' : '#666'} size={24} />
// //             </Pressable>

// //             <YStack ai="center" jc="center" w={70} mt={30}>
// //               <Animated.View style={[styles.pulse, pulseStyle]} />
// //               <Pressable onPressIn={handleHoldStart} onPressOut={handleHoldEnd} style={styles.micButton}>
// //                 {isHolding ? <Mic size={28} color="black" /> : <MessageSquare size={26} color="black" />}
// //               </Pressable>
// //             </YStack>

// //             <Pressable onPress={() => navigation.navigate('profile')}>
// //               <User color={state?.index === 4 ? '#EAB308' : '#666'} size={24} />
// //             </Pressable>

// //             <Pressable onPress={() => navigation.navigate('profile')}>
// //               <User color={state?.index === 4 ? '#EAB308' : '#666'} size={24} />
// //             </Pressable>

// //           </XStack>
// //         </BlurView>
// //       </View>
// //     </Theme>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { position: 'absolute', bottom: 30, left: 20, right: 20, height: 70, zIndex: 1000 },
// //   blur: { flex: 1, borderRadius: 35, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
// //   micButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', justifyContent: 'center', alignItems: 'center', marginTop: -35, elevation: 5 },
// //   pulse: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', top: -35 }
// // });





// import React, { useState } from 'react';
// import { View, StyleSheet, Pressable } from 'react-native';
// import { BlurView } from 'expo-blur';
// import { XStack, YStack, Text, Theme } from 'tamagui';
// import { LayoutDashboard, MessageSquare, Mic, User, PieChart, History } from '@tamagui/lucide-icons';
// import Animated, { useAnimatedStyle, withSpring, withRepeat, withTiming } from 'react-native-reanimated';
// import * as Haptics from 'expo-haptics';
// import { VoiceService } from '../services/voiceService';

// export default function FloatingNavbar({ state, navigation }) {
//   const [isHolding, setIsHolding] = useState(false);
//   const [transcript, setTranscript] = useState("");

//   const pulseStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: isHolding ? withRepeat(withTiming(1.6, { duration: 500 }), -1, true) : withSpring(0) }],
//     opacity: isHolding ? 0.4 : 0,
//   }));

//   const handleHoldStart = async () => {
//     const isReady = await VoiceService.init();
//     if (!isReady) return;

//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//     setIsHolding(true);
//     setTranscript("");

//     await VoiceService.start(
//       (text) => setTranscript(text),
//       (err) => { setIsHolding(false); console.log("Mic error:", err); }
//     );
//   };

//   const handleHoldEnd = async () => {
//     setIsHolding(false);
//     await VoiceService.stop();
//     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

//     if (transcript.trim()) {
//       navigation.navigate('chat', { voiceInput: transcript, timestamp: Date.now() });
//     } else {
//       navigation.navigate('chat');
//     }
//   };

//   return (
//     <Theme name="dark">
//       <View style={styles.container}>
//         <BlurView intensity={90} tint="dark" style={styles.blur}>
//           <XStack jc="space-around" ai="center" h={70} px="$2">
            
//             {/* 1. Dashboard */}
//             <Pressable onPress={() => navigation.navigate('index')}>
//               <LayoutDashboard color={state?.index === 0 ? '#EAB308' : '#666'} size={24} />
//             </Pressable>

//             {/* 2. Transactions/History */}
//             <Pressable onPress={() => navigation.navigate('transactions')}>
//               <History color={state?.index === 1 ? '#EAB308' : '#666'} size={24} />
//             </Pressable>

//             {/* 3. CENTER MIC / CHAT */}
//             <YStack ai="center" jc="center" w={70} mt={32}>
//               <Animated.View style={[styles.pulse, pulseStyle]} />
//               <Pressable 
//                 onPressIn={handleHoldStart} 
//                 onPressOut={handleHoldEnd} 
//                 onPress={() => !isHolding && navigation.navigate('chat')}
//                 style={styles.micButton}
//               >
//                 {isHolding ? <Mic size={28} color="black" /> : <MessageSquare size={26} color="black" />}
//               </Pressable>
//             </YStack>

//             {/* 4. Stats/Charts */}
//             <Pressable onPress={() => navigation.navigate('stats')}>
//               <PieChart color={state?.index === 3 ? '#EAB308' : '#666'} size={24} />
//             </Pressable>

//             {/* 5. Profile */}
//             <Pressable onPress={() => navigation.navigate('profile')}>
//               <User color={state?.index === 4 ? '#EAB308' : '#666'} size={24} />
//             </Pressable>

//           </XStack>
//         </BlurView>
//       </View>
//     </Theme>
//   );
// }

// const styles = StyleSheet.create({
//   container: { position: 'absolute', bottom: 30, left: 20, right: 20, height: 70, zIndex: 1000 },
//   blur: { flex: 1, borderRadius: 35, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
//   micButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', justifyContent: 'center', alignItems: 'center', marginTop: -35, elevation: 5 },
//   pulse: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', top: -35 }
// });




import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { XStack, YStack, Theme } from 'tamagui';
import { LayoutDashboard, MessageSquare, Mic, User, PieChart, History } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

export default function FloatingNavbar({ state, navigation }) {
  const router = useRouter();
  const [isHolding, setIsHolding] = useState(false);

  // Helper to handle the logic for the User button
  const handleUserPress = () => {
    // If you have a profile at the root (app/profile.jsx), use router.push
    // If you are using the 'two.tsx' tab, use navigation.navigate('two')
    router.push('/profile'); 
  };

  return (
    <Theme name="dark">
      <View style={styles.container}>
        <BlurView intensity={90} tint="dark" style={styles.blur}>
          <XStack jc="space-around" ai="center" h={70} px="$2">
            
            {/* Index 0: index.tsx */}
            <Pressable onPress={() => navigation.navigate('index')}>
              <LayoutDashboard color={state?.index === 0 ? '#EAB308' : '#666'} size={24} />
            </Pressable>

            {/* Index 1: portfolio.tsx */}
            <Pressable onPress={() => navigation.navigate('portfolio')}>
              <PieChart color={state?.index === 1 ? '#EAB308' : '#666'} size={24} />
            </Pressable>

            {/* Index 2: chat.tsx (Center) */}
            <YStack ai="center" jc="center" w={70} mt={32}>
              <Pressable 
                onPress={() => navigation.navigate('chat')}
                style={styles.micButton}
              >
                {state?.index === 2 ? <Mic size={28} color="black" /> : <MessageSquare size={26} color="black" />}
              </Pressable>
            </YStack>

            {/* Index 3: transactions.tsx */}
            <Pressable onPress={() => navigation.navigate('transactions')}>
              <History color={state?.index === 3 ? '#EAB308' : '#666'} size={24} />
            </Pressable>

            {/* Index 4: User/Profile */}
            <Pressable onPress={handleUserPress}>
              <User color={state?.index === 4 ? '#EAB308' : '#666'} size={24} />
            </Pressable>

          </XStack>
        </BlurView>
      </View>
    </Theme>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', bottom: 30, left: 20, right: 20, height: 70, zIndex: 1000 },
  blur: { flex: 1, borderRadius: 35, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  micButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EAB308', justifyContent: 'center', alignItems: 'center', marginTop: -35, elevation: 5 },
});