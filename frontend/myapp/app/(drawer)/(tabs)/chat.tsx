// // // // // // // // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // // // // // // // import { FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
// // // // // // // // // // // import { YStack, XStack, Input, Button, Text, Theme, Spinner, Avatar, H4 } from 'tamagui';
// // // // // // // // // // // import { Send, Bot, User, Sparkles } from '@tamagui/lucide-icons';
// // // // // // // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // // // // // // import { AiService } from '../../../services/aiService';

// // // // // // // // // // // interface Message {
// // // // // // // // // // //   id: string;
// // // // // // // // // // //   role: 'user' | 'ai';
// // // // // // // // // // //   text: string;
// // // // // // // // // // // }

// // // // // // // // // // // export default function ChatScreen() {
// // // // // // // // // // //   const [messages, setMessages] = useState<Message[]>([
// // // // // // // // // // //     { id: '1', role: 'ai', text: "Hello. I am Finni, your autonomous financial intelligence. How can I assist with your wealth today?" }
// // // // // // // // // // //   ]);
// // // // // // // // // // //   const [input, setInput] = useState('');
// // // // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // // // //   const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  
// // // // // // // // // // //   const flatListRef = useRef<FlatList>(null);

// // // // // // // // // // //   const sendMessage = async () => {
// // // // // // // // // // //     if (!input.trim()) return;

// // // // // // // // // // //     const userText = input;
// // // // // // // // // // //     setInput(''); // Clear input immediately
// // // // // // // // // // //     Keyboard.dismiss();

// // // // // // // // // // //     // 1. Add User Message
// // // // // // // // // // //     const userMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };
// // // // // // // // // // //     setMessages(prev => [...prev, userMsg]);
// // // // // // // // // // //     setLoading(true);

// // // // // // // // // // //     try {
// // // // // // // // // // //       // 2. Call Backend API
// // // // // // // // // // //       const data = await AiService.sendMessage(userText, sessionId);
      
// // // // // // // // // // //       // 3. Save Session ID for context (if backend returns it)
// // // // // // // // // // //       if (data.session_id) setSessionId(data.session_id);

// // // // // // // // // // //       // 4. Add AI Response
// // // // // // // // // // //       const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: data.response };
// // // // // // // // // // //       setMessages(prev => [...prev, aiMsg]);

// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       const errorMsg: Message = { id: Date.now().toString(), role: 'ai', text: "⚠️ Connection lost. My neural core is unreachable." };
// // // // // // // // // // //       setMessages(prev => [...prev, errorMsg]);
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Auto-scroll to bottom when messages change
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
// // // // // // // // // // //   }, [messages, loading]);

// // // // // // // // // // //   return (
// // // // // // // // // // //     <Theme name="dark">
// // // // // // // // // // //       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
// // // // // // // // // // //         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          
// // // // // // // // // // //           {/* --- HEADER --- */}
// // // // // // // // // // //           <YStack pt={60} pb={20} px={20} borderBottomColor="rgba(255,255,255,0.05)" borderBottomWidth={1} bg="rgba(0,0,0,0.8)">
// // // // // // // // // // //             <XStack ai="center" space="$3">
// // // // // // // // // // //               <YStack w={40} h={40} br={20} bg="$gold3" jc="center" ai="center" shadowColor="$gold3" shadowRadius={10}>
// // // // // // // // // // //                 <Bot size={24} color="black" />
// // // // // // // // // // //               </YStack>
// // // // // // // // // // //               <YStack>
// // // // // // // // // // //                 <H4 color="$white" fontSize={16} letterSpacing={1}>FINNI ADVISOR</H4>
// // // // // // // // // // //                 <XStack ai="center" space="$1">
// // // // // // // // // // //                   <Sparkles size={10} color="#22c55e" />
// // // // // // // // // // //                   <Text color="$silver4" fontSize={10}>Online // GPT-4 Turbo</Text>
// // // // // // // // // // //                 </XStack>
// // // // // // // // // // //               </YStack>
// // // // // // // // // // //             </XStack>
// // // // // // // // // // //           </YStack>

// // // // // // // // // // //           {/* --- CHAT AREA --- */}
// // // // // // // // // // //           <FlatList
// // // // // // // // // // //             ref={flatListRef}
// // // // // // // // // // //             data={messages}
// // // // // // // // // // //             keyExtractor={item => item.id}
// // // // // // // // // // //             contentContainerStyle={{ padding: 20, paddingBottom: 20 }}
// // // // // // // // // // //             renderItem={({ item }) => (
// // // // // // // // // // //               <XStack jc={item.role === 'user' ? 'flex-end' : 'flex-start'} mb="$4" ai="flex-end">
                
// // // // // // // // // // //                 {/* AI Avatar */}
// // // // // // // // // // //                 {item.role === 'ai' && (
// // // // // // // // // // //                   <YStack w={28} h={28} br={14} bg="rgba(234, 179, 8, 0.2)" jc="center" ai="center" mr="$2" mb="$1">
// // // // // // // // // // //                     <Bot size={14} color="#EAB308" />
// // // // // // // // // // //                   </YStack>
// // // // // // // // // // //                 )}

// // // // // // // // // // //                 {/* Message Bubble */}
// // // // // // // // // // //                 <YStack 
// // // // // // // // // // //                   bg={item.role === 'user' ? '$silver2' : 'rgba(255,255,255,0.05)'} 
// // // // // // // // // // //                   p="$3" 
// // // // // // // // // // //                   br="$4" 
// // // // // // // // // // //                   borderTopLeftRadius={item.role === 'ai' ? 4 : 16}
// // // // // // // // // // //                   borderBottomRightRadius={item.role === 'user' ? 4 : 16}
// // // // // // // // // // //                   maxWidth="80%"
// // // // // // // // // // //                   borderColor={item.role === 'ai' ? 'rgba(234, 179, 8, 0.3)' : 'transparent'}
// // // // // // // // // // //                   borderWidth={item.role === 'ai' ? 1 : 0}
// // // // // // // // // // //                 >
// // // // // // // // // // //                   <Text color="$white" fontSize={15} lineHeight={22}>
// // // // // // // // // // //                     {item.text}
// // // // // // // // // // //                   </Text>
// // // // // // // // // // //                 </YStack>
// // // // // // // // // // //               </XStack>
// // // // // // // // // // //             )}
// // // // // // // // // // //             ListFooterComponent={
// // // // // // // // // // //               loading ? (
// // // // // // // // // // //                 <XStack ml="$5" mb="$4" ai="center" space="$2">
// // // // // // // // // // //                    <Spinner size="small" color="$gold3" />
// // // // // // // // // // //                    <Text color="$silver4" fontSize={12} fontStyle="italic">Thinking...</Text>
// // // // // // // // // // //                 </XStack>
// // // // // // // // // // //               ) : null
// // // // // // // // // // //             }
// // // // // // // // // // //           />

// // // // // // // // // // //           {/* --- INPUT AREA --- */}
// // // // // // // // // // //           <XStack p="$4" bg="rgba(0,0,0,0.9)" ai="center" space="$2" borderTopColor="rgba(255,255,255,0.1)" borderTopWidth={1}>
// // // // // // // // // // //             <Input 
// // // // // // // // // // //               flex={1} 
// // // // // // // // // // //               value={input} 
// // // // // // // // // // //               onChangeText={setInput} 
// // // // // // // // // // //               placeholder="Ask about your finances..." 
// // // // // // // // // // //               placeholderTextColor="$silver4"
// // // // // // // // // // //               bg="rgba(255,255,255,0.05)" 
// // // // // // // // // // //               color="white"
// // // // // // // // // // //               borderColor="transparent"
// // // // // // // // // // //               borderRadius="$4"
// // // // // // // // // // //               h={50}
// // // // // // // // // // //               mb={120}
// // // // // // // // // // //               mt={120}
// // // // // // // // // // //               onSubmitEditing={sendMessage}
// // // // // // // // // // //             />
// // // // // // // // // // //             <Button 
// // // // // // // // // // //               size="$4" 
// // // // // // // // // // //               bg="$gold3" 
// // // // // // // // // // //               color="black"
// // // // // // // // // // //               onPress={sendMessage} 
// // // // // // // // // // //               disabled={loading || !input.trim()}
// // // // // // // // // // //               icon={<Send size={18} color="black" />}
// // // // // // // // // // //               borderRadius="$4"
// // // // // // // // // // //             />
// // // // // // // // // // //           </XStack>

// // // // // // // // // // //         </KeyboardAvoidingView>
// // // // // // // // // // //       </LinearGradient>
// // // // // // // // // // //     </Theme>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // // // // // // import { FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
// // // // // // // // // // import { YStack, XStack, Input, Button, Text, Theme, Spinner, H4, View } from 'tamagui';
// // // // // // // // // // import { Send, Bot, Sparkles } from '@tamagui/lucide-icons';
// // // // // // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // // // // // import { AiService } from '../../../services/aiService';
// // // // // // // // // // import { useLocalSearchParams } from 'expo-router';

// // // // // // // // // // export default function ChatScreen() {
// // // // // // // // // //   const [messages, setMessages] = useState([
// // // // // // // // // //     { id: 'initial-ai', role: 'ai', text: "Hello. I am Finni, your autonomous financial intelligence. How can I assist with your wealth today?" }
// // // // // // // // // //   ]);
// // // // // // // // // //   const [input, setInput] = useState('');
// // // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // // //   const [sessionId, setSessionId] = useState(undefined);

// // // // // // // // // //   const { voiceInput } = useLocalSearchParams();
  
// // // // // // // // // //   const params = useLocalSearchParams();

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (params.voiceInput) {
// // // // // // // // // //       setInput(params.voiceInput);
// // // // // // // // // //       // 🚀 Automatically trigger send
// // // // // // // // // //       setTimeout(() => sendMessage(), 500);
// // // // // // // // // //     }
// // // // // // // // // //   }, [params.voiceInput, params.timestamp]);

// // // // // // // // // //   const flatListRef = useRef(null);

// // // // // // // // // //   const sendMessage = async () => {
// // // // // // // // // //     if (!input.trim() || loading) return;

// // // // // // // // // //     const userText = input;
// // // // // // // // // //     setInput(''); 
// // // // // // // // // //     Keyboard.dismiss();

// // // // // // // // // //     // 🚀 FIX 1: Unique Keys (Added 'user-' prefix)
// // // // // // // // // //     const userMsg = { id: `user-${Date.now()}`, role: 'user', text: userText };
// // // // // // // // // //     setMessages(prev => [...prev, userMsg]);
// // // // // // // // // //     setLoading(true);

// // // // // // // // // //     try {
// // // // // // // // // //       const data = await AiService.sendMessage(userText, sessionId);
// // // // // // // // // //       if (data.session_id) setSessionId(data.session_id);

// // // // // // // // // //       // 🚀 FIX 2: Unique Keys (Added 'ai-' prefix)
// // // // // // // // // //       const aiMsg = { id: `ai-${Date.now()}`, role: 'ai', text: data.response };
// // // // // // // // // //       setMessages(prev => [...prev, aiMsg]);

// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       const errorMsg = { id: `error-${Date.now()}`, role: 'ai', text: "⚠️ Neural core unreachable. Check connection." };
// // // // // // // // // //       setMessages(prev => [...prev, errorMsg]);
// // // // // // // // // //     } finally {
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
// // // // // // // // // //   }, [messages, loading]);

// // // // // // // // // //   return (
// // // // // // // // // //     <Theme name="dark">
// // // // // // // // // //       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
// // // // // // // // // //         <KeyboardAvoidingView 
// // // // // // // // // //           behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
// // // // // // // // // //           style={{ flex: 1 }}
// // // // // // // // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // // // // // // // // //         >
          
// // // // // // // // // //           {/* --- HEADER --- */}
// // // // // // // // // //           <YStack pt={60} pb={20} px={20} borderBottomColor="rgba(255,255,255,0.05)" borderBottomWidth={1} bg="rgba(0,0,0,0.8)">
// // // // // // // // // //             <XStack ai="center" space="$3">
// // // // // // // // // //               <View w={40} h={40} br={20} bg="$gold3" jc="center" ai="center">
// // // // // // // // // //                 <Bot size={24} color="black" />
// // // // // // // // // //               </View>
// // // // // // // // // //               <YStack>
// // // // // // // // // //                 <H4 color="$white" fontSize={16} letterSpacing={1}>FINNI ADVISOR</H4>
// // // // // // // // // //                 <XStack ai="center" space="$1">
// // // // // // // // // //                   <Sparkles size={10} color="#22c55e" />
// // // // // // // // // //                   <Text color="$silver4" fontSize={10}>Online // Neural Engine</Text>
// // // // // // // // // //                 </XStack>
// // // // // // // // // //               </YStack>
// // // // // // // // // //             </XStack>
// // // // // // // // // //           </YStack>

// // // // // // // // // //           {/* --- CHAT AREA --- */}
// // // // // // // // // //           <FlatList
// // // // // // // // // //             ref={flatListRef}
// // // // // // // // // //             data={messages}
// // // // // // // // // //             keyExtractor={item => item.id}
// // // // // // // // // //             contentContainerStyle={{ 
// // // // // // // // // //                 padding: 20, 
// // // // // // // // // //                 paddingBottom: 100 // 🚀 Space so messages aren't hidden by the input bar
// // // // // // // // // //             }}
// // // // // // // // // //             renderItem={({ item }) => (
// // // // // // // // // //               <XStack jc={item.role === 'user' ? 'flex-end' : 'flex-start'} mb="$4" ai="flex-end">
// // // // // // // // // //                 {item.role === 'ai' && (
// // // // // // // // // //                   <View w={28} h={28} br={14} bg="rgba(234, 179, 8, 0.2)" jc="center" ai="center" mr="$2" mb="$1">
// // // // // // // // // //                     <Bot size={14} color="#EAB308" />
// // // // // // // // // //                   </View>
// // // // // // // // // //                 )}
// // // // // // // // // //                 <YStack 
// // // // // // // // // //                   bg={item.role === 'user' ? '$silver2' : 'rgba(255,255,255,0.07)'} 
// // // // // // // // // //                   p="$3" 
// // // // // // // // // //                   br="$4" 
// // // // // // // // // //                   borderTopLeftRadius={item.role === 'ai' ? 4 : 16}
// // // // // // // // // //                   borderBottomRightRadius={item.role === 'user' ? 4 : 16}
// // // // // // // // // //                   maxWidth="80%"
// // // // // // // // // //                   bw={item.role === 'ai' ? 1 : 0}
// // // // // // // // // //                   bc="rgba(234, 179, 8, 0.3)"
// // // // // // // // // //                 >
// // // // // // // // // //                   <Text color="$white" fontSize={15} lineHeight={22}>{item.text}</Text>
// // // // // // // // // //                 </YStack>
// // // // // // // // // //               </XStack>
// // // // // // // // // //             )}
// // // // // // // // // //             ListFooterComponent={loading ? (
// // // // // // // // // //               <XStack ml="$5" mb="$4" ai="center" space="$2">
// // // // // // // // // //                 <Spinner size="small" color="$gold3" />
// // // // // // // // // //                 <Text color="$silver4" fontSize={12} fontStyle="italic">Processing...</Text>
// // // // // // // // // //               </XStack>
// // // // // // // // // //             ) : null}
// // // // // // // // // //           />

// // // // // // // // // //           {/* --- INPUT AREA --- */}
// // // // // // // // // //           <YStack 
// // // // // // // // // //             bg="rgba(0,0,0,0.9)" 
// // // // // // // // // //             borderTopColor="rgba(255,255,255,0.1)" 
// // // // // // // // // //             borderTopWidth={1}
// // // // // // // // // //             px="$4"
// // // // // // // // // //             pt="$4"
// // // // // // // // // //             pb={Platform.OS === 'ios' ? 110 : 125} // 🚀 THIS ALIGNS IT ABOVE THE NAV BAR
// // // // // // // // // //           >
// // // // // // // // // //             <XStack ai="center" space="$2">
// // // // // // // // // //               <Input 
// // // // // // // // // //                 flex={1} 
// // // // // // // // // //                 value={input} 
// // // // // // // // // //                 onChangeText={setInput} 
// // // // // // // // // //                 placeholder="Ask Finni..." 
// // // // // // // // // //                 placeholderTextColor="$silver4"
// // // // // // // // // //                 bg="rgba(255,255,255,0.05)" 
// // // // // // // // // //                 color="white"
// // // // // // // // // //                 borderColor="transparent"
// // // // // // // // // //                 borderRadius="$4"
// // // // // // // // // //                 h={50}
// // // // // // // // // //                 onSubmitEditing={sendMessage}
// // // // // // // // // //               />
// // // // // // // // // //               <Button 
// // // // // // // // // //                 size="$4" 
// // // // // // // // // //                 bg="$gold3" 
// // // // // // // // // //                 onPress={sendMessage} 
// // // // // // // // // //                 disabled={loading || !input.trim()}
// // // // // // // // // //                 icon={<Send size={18} color="black" />}
// // // // // // // // // //                 borderRadius="$4"
// // // // // // // // // //               />
// // // // // // // // // //             </XStack>
// // // // // // // // // //           </YStack>

// // // // // // // // // //         </KeyboardAvoidingView>
// // // // // // // // // //       </LinearGradient>
// // // // // // // // // //     </Theme>
// // // // // // // // // //   );
// // // // // // // // // // }




// // // // // // // // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // // // // // // // import { FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
// // // // // // // // // import { YStack, XStack, Input, Button, Text, Theme, Spinner, H4, View } from 'tamagui';
// // // // // // // // // import { Send, Bot, Sparkles } from '@tamagui/lucide-icons';
// // // // // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // // // // import { AiService } from '../../../services/aiService';
// // // // // // // // // import { useLocalSearchParams, useRouter } from 'expo-router';

// // // // // // // // // export default function ChatScreen() {
// // // // // // // // //   const router = useRouter();
// // // // // // // // //   const params = useLocalSearchParams();
  
// // // // // // // // //   const [messages, setMessages] = useState([
// // // // // // // // //     { id: 'initial-ai', role: 'ai', text: "Hello. I am Finni, your autonomous financial intelligence. How can I assist with your wealth today?" }
// // // // // // // // //   ]);
// // // // // // // // //   const [input, setInput] = useState('');
// // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // //   const [sessionId, setSessionId] = useState(undefined);
// // // // // // // // //   const flatListRef = useRef(null);

// // // // // // // // //   // --- SEND MESSAGE LOGIC ---
// // // // // // // // //   // Wrapped in useCallback so it can be called safely inside useEffect
// // // // // // // // //   const sendMessage = useCallback(async (overrideText?: string) => {
// // // // // // // // //     const textToSend = overrideText || input;
// // // // // // // // //     if (!textToSend.trim() || loading) return;

// // // // // // // // //     setInput(''); 
// // // // // // // // //     Keyboard.dismiss();

// // // // // // // // //     const userMsg = { id: `user-${Date.now()}`, role: 'user', text: textToSend };
// // // // // // // // //     setMessages(prev => [...prev, userMsg]);
// // // // // // // // //     setLoading(true);

// // // // // // // // //     try {
// // // // // // // // //       const data = await AiService.sendMessage(textToSend, sessionId);
// // // // // // // // //       if (data.session_id) setSessionId(data.session_id);

// // // // // // // // //       const aiMsg = { id: `ai-${Date.now()}`, role: 'ai', text: data.response };
// // // // // // // // //       setMessages(prev => [...prev, aiMsg]);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       const errorMsg = { id: `error-${Date.now()}`, role: 'ai', text: "⚠️ Neural core unreachable. Check connection." };
// // // // // // // // //       setMessages(prev => [...prev, errorMsg]);
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   }, [input, loading, sessionId]);

// // // // // // // // //   // --- VOICE INPUT LISTENER ---
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (params.voiceInput) {
// // // // // // // // //       const speechText = params.voiceInput as string;
// // // // // // // // //       // 1. Set the input field visually
// // // // // // // // //       setInput(speechText);
      
// // // // // // // // //       // 2. Trigger the send after a short delay for UX
// // // // // // // // //       const timer = setTimeout(() => {
// // // // // // // // //         sendMessage(speechText);
// // // // // // // // //         // 3. 🚀 CRITICAL: Clear the search params so it doesn't re-send on reload
// // // // // // // // //         router.setParams({ voiceInput: '' });
// // // // // // // // //       }, 600);

// // // // // // // // //       return () => clearTimeout(timer);
// // // // // // // // //     }
// // // // // // // // //   }, [params.voiceInput, params.timestamp]);

// // // // // // // // //   // --- AUTO SCROLL ---
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
// // // // // // // // //   }, [messages, loading]);

// // // // // // // // //   return (
// // // // // // // // //     <Theme name="dark">
// // // // // // // // //       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
// // // // // // // // //         <KeyboardAvoidingView 
// // // // // // // // //           behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
// // // // // // // // //           style={{ flex: 1 }}
// // // // // // // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // // // // // // // //         >
          
// // // // // // // // //           {/* --- HEADER --- */}
// // // // // // // // //           <YStack pt={60} pb={20} px={20} borderBottomColor="rgba(255,255,255,0.05)" borderBottomWidth={1} bg="rgba(0,0,0,0.8)">
// // // // // // // // //             <XStack ai="center" space="$3">
// // // // // // // // //               <View w={40} h={40} br={20} bg="$gold3" jc="center" ai="center">
// // // // // // // // //                 <Bot size={24} color="black" />
// // // // // // // // //               </View>
// // // // // // // // //               <YStack>
// // // // // // // // //                 <H4 color="$white" fontSize={16} letterSpacing={1}>FINNI ADVISOR</H4>
// // // // // // // // //                 <XStack ai="center" space="$1">
// // // // // // // // //                   <Sparkles size={10} color="#22c55e" />
// // // // // // // // //                   <Text color="$silver4" fontSize={10}>Online // Neural Engine</Text>
// // // // // // // // //                 </XStack>
// // // // // // // // //               </YStack>
// // // // // // // // //             </XStack>
// // // // // // // // //           </YStack>

// // // // // // // // //           {/* --- CHAT AREA --- */}
// // // // // // // // //           <FlatList
// // // // // // // // //             ref={flatListRef}
// // // // // // // // //             data={messages}
// // // // // // // // //             keyExtractor={item => item.id}
// // // // // // // // //             contentContainerStyle={{ 
// // // // // // // // //                 padding: 20, 
// // // // // // // // //                 paddingBottom: 40 
// // // // // // // // //             }}
// // // // // // // // //             renderItem={({ item }) => (
// // // // // // // // //               <XStack jc={item.role === 'user' ? 'flex-end' : 'flex-start'} mb="$4" ai="flex-end">
// // // // // // // // //                 {item.role === 'ai' && (
// // // // // // // // //                   <View w={28} h={28} br={14} bg="rgba(234, 179, 8, 0.2)" jc="center" ai="center" mr="$2" mb="$1">
// // // // // // // // //                     <Bot size={14} color="#EAB308" />
// // // // // // // // //                   </View>
// // // // // // // // //                 )}
// // // // // // // // //                 <YStack 
// // // // // // // // //                   bg={item.role === 'user' ? '$silver2' : 'rgba(255,255,255,0.07)'} 
// // // // // // // // //                   p="$3" 
// // // // // // // // //                   br="$4" 
// // // // // // // // //                   borderTopLeftRadius={item.role === 'ai' ? 4 : 16}
// // // // // // // // //                   borderBottomRightRadius={item.role === 'user' ? 4 : 16}
// // // // // // // // //                   maxWidth="80%"
// // // // // // // // //                   bw={item.role === 'ai' ? 1 : 0}
// // // // // // // // //                   bc="rgba(234, 179, 8, 0.3)"
// // // // // // // // //                 >
// // // // // // // // //                   <Text color="$white" fontSize={15} lineHeight={22}>{item.text}</Text>
// // // // // // // // //                 </YStack>
// // // // // // // // //               </XStack>
// // // // // // // // //             )}
// // // // // // // // //             ListFooterComponent={loading ? (
// // // // // // // // //               <XStack ml="$10" mb="$4" ai="center" space="$2">
// // // // // // // // //                 <Spinner size="small" color="$gold3" />
// // // // // // // // //                 <Text color="$silver4" fontSize={12} fontStyle="italic">Analyzing...</Text>
// // // // // // // // //               </XStack>
// // // // // // // // //             ) : <View h={20} />}
// // // // // // // // //           />

// // // // // // // // //           {/* --- INPUT AREA --- */}
// // // // // // // // //           <YStack 
// // // // // // // // //             bg="rgba(0,0,0,0.95)" 
// // // // // // // // //             borderTopColor="rgba(255,255,255,0.1)" 
// // // // // // // // //             borderTopWidth={1}
// // // // // // // // //             px="$4"
// // // // // // // // //             pt="$4"
// // // // // // // // //             pb={Platform.OS === 'ios' ? 110 : 130} // Space for Floating Navbar
// // // // // // // // //           >
// // // // // // // // //             <XStack ai="center" space="$2">
// // // // // // // // //               <Input 
// // // // // // // // //                 flex={1} 
// // // // // // // // //                 value={input} 
// // // // // // // // //                 onChangeText={setInput} 
// // // // // // // // //                 placeholder="Ask Finni..." 
// // // // // // // // //                 placeholderTextColor="$silver4"
// // // // // // // // //                 bg="rgba(255,255,255,0.05)" 
// // // // // // // // //                 color="white"
// // // // // // // // //                 borderColor="transparent"
// // // // // // // // //                 borderRadius="$4"
// // // // // // // // //                 h={50}
// // // // // // // // //                 onSubmitEditing={() => sendMessage()}
// // // // // // // // //               />
// // // // // // // // //               <Button 
// // // // // // // // //                 size="$4" 
// // // // // // // // //                 bg="$gold3" 
// // // // // // // // //                 onPress={() => sendMessage()} 
// // // // // // // // //                 disabled={loading || !input.trim()}
// // // // // // // // //                 icon={loading ? <Spinner color="black" /> : <Send size={18} color="black" />}
// // // // // // // // //                 borderRadius="$4"
// // // // // // // // //               />
// // // // // // // // //             </XStack>
// // // // // // // // //           </YStack>

// // // // // // // // //         </KeyboardAvoidingView>
// // // // // // // // //       </LinearGradient>
// // // // // // // // //     </Theme>
// // // // // // // // //   );
// // // // // // // // // }




// // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // // // // // // // import { YStack, XStack, Text, Input, Button, Theme, Spinner, Circle } from 'tamagui';
// // // // // // // // import { Mic, Send, Square, User, Bot } from '@tamagui/lucide-icons';
// // // // // // // // import { Audio } from 'expo-av';
// // // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // // // // export default function ChatScreen() {
// // // // // // // //   const [messages, setMessages] = useState([
// // // // // // // //     { role: 'assistant', content: 'System initialized. How can I assist with your finances today?' }
// // // // // // // //   ]);
// // // // // // // //   const [inputText, setInputText] = useState('');
// // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // //   // --- 🎙️ MICROPHONE STATE ---
// // // // // // // //   const [recording, setRecording] = useState(null);
// // // // // // // //   const [isRecording, setIsRecording] = useState(false);
// // // // // // // //   const [permissionResponse, requestPermission] = Audio.usePermissions();

// // // // // // // //   // Initialize Audio Session on mount
// // // // // // // //   useEffect(() => {
// // // // // // // //     async function initAudio() {
// // // // // // // //       await Audio.setAudioModeAsync({
// // // // // // // //         allowsRecordingIOS: true,
// // // // // // // //         playsInSilentModeIOS: true,
// // // // // // // //       });
// // // // // // // //     }
// // // // // // // //     initAudio();
// // // // // // // //   }, []);

// // // // // // // //   // --- 🎙️ START RECORDING ---
// // // // // // // //   const startRecording = async () => {
// // // // // // // //     try {
// // // // // // // //       if (permissionResponse.status !== 'granted') {
// // // // // // // //         console.log('Requesting mic permissions...');
// // // // // // // //         await requestPermission();
// // // // // // // //       }

// // // // // // // //       // Ensure mode is recording-ready
// // // // // // // //       await Audio.setAudioModeAsync({
// // // // // // // //         allowsRecordingIOS: true,
// // // // // // // //         playsInSilentModeIOS: true,
// // // // // // // //       });

// // // // // // // //       console.log('Starting Recording...');
// // // // // // // //       const { recording } = await Audio.Recording.createAsync(
// // // // // // // //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// // // // // // // //       );
      
// // // // // // // //       setRecording(recording);
// // // // // // // //       setIsRecording(true);
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Failed to start recording', err);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // --- 🎙️ STOP & SEND RECORDING ---
// // // // // // // //   const stopRecording = async () => {
// // // // // // // //     console.log('Stopping recording...');
// // // // // // // //     setIsRecording(false);
    
// // // // // // // //     try {
// // // // // // // //       await recording.stopAndUnloadAsync();
// // // // // // // //       const uri = recording.getURI();
// // // // // // // //       console.log('Recording URI:', uri);
      
// // // // // // // //       setRecording(null);
// // // // // // // //       // Here you would call your backend: await uploadVoice(uri);
      
// // // // // // // //       // For now, let's simulate a voice-to-text placeholder
// // // // // // // //       handleSend("Voice command processed (Audio file saved).");
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Failed to stop recording', err);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSend = async (text) => {
// // // // // // // //     const messageToSend = text || inputText;
// // // // // // // //     if (!messageToSend.trim()) return;

// // // // // // // //     const newMsg = { role: 'user', content: messageToSend };
// // // // // // // //     setMessages(prev => [...prev, newMsg]);
// // // // // // // //     setInputText('');
// // // // // // // //     setLoading(true);

// // // // // // // //     // Simulate AI response
// // // // // // // //     setTimeout(() => {
// // // // // // // //       setMessages(prev => [...prev, { role: 'assistant', content: 'Analyzing your portfolio data...' }]);
// // // // // // // //       setLoading(false);
// // // // // // // //     }, 1000);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <Theme name="dark">
// // // // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // // // // // //         <KeyboardAvoidingView 
// // // // // // // //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
// // // // // // // //           style={{ flex: 1 }}
// // // // // // // //           keyboardVerticalOffset={100}
// // // // // // // //         >
// // // // // // // //           {/* MESSAGES LIST */}
// // // // // // // //           <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
// // // // // // // //             <YStack space="$4">
// // // // // // // //               {messages.map((msg, i) => (
// // // // // // // //                 <XStack key={i} space="$3" jc={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// // // // // // // //                   {msg.role === 'assistant' && <Circle size={32} bg="$gold3" ai="center" jc="center"><Bot size={18} color="black"/></Circle>}
// // // // // // // //                   <YStack 
// // // // // // // //                     p="$3" 
// // // // // // // //                     br="$4" 
// // // // // // // //                     maxW="80%" 
// // // // // // // //                     bg={msg.role === 'user' ? '#EAB308' : 'rgba(255,255,255,0.05)'}
// // // // // // // //                     bc={msg.role === 'user' ? 'transparent' : 'rgba(255,255,255,0.1)'}
// // // // // // // //                     bw={1}
// // // // // // // //                   >
// // // // // // // //                     <Text color={msg.role === 'user' ? 'black' : 'white'} fontSize={14}>
// // // // // // // //                       {msg.content}
// // // // // // // //                     </Text>
// // // // // // // //                   </YStack>
// // // // // // // //                   {msg.role === 'user' && <Circle size={32} bg="$gray10" ai="center" jc="center"><User size={18} color="white"/></Circle>}
// // // // // // // //                 </XStack>
// // // // // // // //               ))}
// // // // // // // //               {loading && <Spinner size="small" color="$gold3" />}
// // // // // // // //             </YStack>
// // // // // // // //           </ScrollView>

// // // // // // // //           {/* INPUT AREA */}
// // // // // // // //           <XStack p="$4" space="$2" ai="center" bc="rgba(255,255,255,0.05)" bt={1} bg="#080808" >
// // // // // // // //             <Button
// // // // // // // //               size="$4"
// // // // // // // //               br="$10"
// // // // // // // //               bg={isRecording ? '$red9' : 'rgba(255,255,255,0.05)'}
// // // // // // // //               onPress={isRecording ? stopRecording : startRecording}
// // // // // // // //             >
// // // // // // // //               {isRecording ? <Square size={20} color="white" /> : <Mic size={20} color={isRecording ? 'white' : '#EAB308'} />}
// // // // // // // //             </Button>
            
// // // // // // // //             <Input
// // // // // // // //               f={1}
// // // // // // // //               h={45}
// // // // // // // //               br="$10"
// // // // // // // //               bg="rgba(255,255,255,0.03)"
// // // // // // // //               color="white"
// // // // // // // //               placeholder="Ask Finni AI..."
// // // // // // // //               value={inputText}
// // // // // // // //               onChangeText={setInputText}
// // // // // // // //               disabled={isRecording}
// // // // // // // //             />

// // // // // // // //             <Button size="$4" br="$10" bg="#EAB308" onPress={() => handleSend()}>
// // // // // // // //               <Send size={20} color="black" />
// // // // // // // //             </Button>
// // // // // // // //           </XStack>
// // // // // // // //         </KeyboardAvoidingView>
// // // // // // // //       </SafeAreaView>
// // // // // // // //     </Theme>
// // // // // // // //   );
// // // // // // // // }




// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // // // // // // import { YStack, XStack, Text, Input, Button, Theme, Spinner, Circle } from 'tamagui';
// // // // // // // import { Send, User, Bot, Mic, Square } from '@tamagui/lucide-icons';
// // // // // // // import { Audio } from 'expo-av';
// // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // // // export default function ChatScreen() {
// // // // // // //   const [messages, setMessages] = useState([
// // // // // // //     { role: 'assistant', content: 'Protocol Active. How can I assist with your financial strategy?' }
// // // // // // //   ]);
// // // // // // //   const [inputText, setInputText] = useState('');
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   // --- 🎙️ MICROPHONE LOGIC ---
// // // // // // //   const [recording, setRecording] = useState(null);
// // // // // // //   const [isRecording, setIsRecording] = useState(false);
// // // // // // //   const [permissionResponse, requestPermission] = Audio.usePermissions();

// // // // // // //   useEffect(() => {
// // // // // // //     // Initialize audio session for the app
// // // // // // //     Audio.setAudioModeAsync({
// // // // // // //       allowsRecordingIOS: true,
// // // // // // //       playsInSilentModeIOS: true,
// // // // // // //     });
// // // // // // //   }, []);

// // // // // // //   const startRecording = async () => {
// // // // // // //     try {
// // // // // // //       if (permissionResponse.status !== 'granted') {
// // // // // // //         await requestPermission();
// // // // // // //       }
// // // // // // //       await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      
// // // // // // //       const { recording } = await Audio.Recording.createAsync(
// // // // // // //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// // // // // // //       );
// // // // // // //       setRecording(recording);
// // // // // // //       setIsRecording(true);
// // // // // // //     } catch (err) {
// // // // // // //       console.error('Failed to start recording', err);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const stopRecording = async () => {
// // // // // // //     setIsRecording(false);
// // // // // // //     try {
// // // // // // //       await recording.stopAndUnloadAsync();
// // // // // // //       const uri = recording.getURI();
// // // // // // //       setRecording(null);
// // // // // // //       // Logic to send 'uri' to your FastAPI backend would go here
// // // // // // //       handleSend("Voice data captured.");
// // // // // // //     } catch (err) {
// // // // // // //       console.error('Failed to stop recording', err);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSend = (text) => {
// // // // // // //     const content = text || inputText;
// // // // // // //     if (!content.trim()) return;

// // // // // // //     setMessages([...messages, { role: 'user', content }]);
// // // // // // //     setInputText('');
// // // // // // //     setLoading(true);

// // // // // // //     // Simulate Backend AI Response
// // // // // // //     setTimeout(() => {
// // // // // // //       setMessages(prev => [...prev, { role: 'assistant', content: 'Processing financial request...' }]);
// // // // // // //       setLoading(false);
// // // // // // //     }, 1200);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Theme name="dark">
// // // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // // // // //         <KeyboardAvoidingView 
// // // // // // //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
// // // // // // //           style={{ flex: 1 }}
// // // // // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // // // // // //         >
// // // // // // //           {/* MESSAGE LIST */}
// // // // // // //           <ScrollView 
// // // // // // //             contentContainerStyle={{ 
// // // // // // //               padding: 20, 
// // // // // // //               paddingBottom: 120 // Space for the floating navbar
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <YStack space="$4">
// // // // // // //               {messages.map((msg, i) => (
// // // // // // //                 <XStack key={i} space="$3" jc={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// // // // // // //                   {msg.role === 'assistant' && (
// // // // // // //                     <Circle size={32} bg="$gold3" ai="center" jc="center">
// // // // // // //                       <Bot size={16} color="black" />
// // // // // // //                     </Circle>
// // // // // // //                   )}
// // // // // // //                   <YStack 
// // // // // // //                     p="$3" 
// // // // // // //                     br="$4" 
// // // // // // //                     maxW="80%" 
// // // // // // //                     bg={msg.role === 'user' ? '#EAB308' : 'rgba(255,255,255,0.05)'}
// // // // // // //                     bc={msg.role === 'user' ? 'transparent' : 'rgba(255,255,255,0.1)'}
// // // // // // //                     bw={1}
// // // // // // //                   >
// // // // // // //                     <Text color={msg.role === 'user' ? 'black' : 'white'} fontSize={14}>
// // // // // // //                       {msg.content}
// // // // // // //                     </Text>
// // // // // // //                   </YStack>
// // // // // // //                   {msg.role === 'user' && (
// // // // // // //                     <Circle size={32} bg="$gray8" ai="center" jc="center">
// // // // // // //                       <User size={16} color="white" />
// // // // // // //                     </Circle>
// // // // // // //                   )}
// // // // // // //                 </XStack>
// // // // // // //               ))}
// // // // // // //               {loading && <Spinner size="small" color="$gold3" mt="$2" />}
// // // // // // //             </YStack>
// // // // // // //           </ScrollView>

// // // // // // //           {/* INPUT AREA (Above the Navbar) */}
// // // // // // //           <XStack 
// // // // // // //             p="$4" 
// // // // // // //             space="$2" 
// // // // // // //             ai="center" 
// // // // // // //             bg="#000" 
// // // // // // //             bc="rgba(255,255,255,0.05)" 
// // // // // // //             bt={1}
// // // // // // //             pb={Platform.OS === 'ios' ? 20 : 10}

// // // // // // //           >
// // // // // // //             <Button
// // // // // // //               size="$4"
// // // // // // //               br="$10"
// // // // // // //               bg={isRecording ? '$red9' : 'rgba(255,255,255,0.05)'}
// // // // // // //               mt={150}
// // // // // // //               onPress={isRecording ? stopRecording : startRecording}
// // // // // // //             >
// // // // // // //               {isRecording ? <Square size={18} color="white" /> : <Mic size={18} color="#EAB308" />}
// // // // // // //             </Button>
            
// // // // // // //             <Input
// // // // // // //               f={1}
// // // // // // //               h={45}
// // // // // // //               br="$10"
// // // // // // //               bg="rgba(255,255,255,0.03)"
// // // // // // //               color="white"
// // // // // // //               placeholder="Message Finni..."
// // // // // // //               value={inputText}
// // // // // // //               onChangeText={setInputText}
// // // // // // //               disabled={isRecording}
// // // // // // //             />

// // // // // // //             <Button size="$4" br="$10" bg="#EAB308" onPress={() => handleSend()}>
// // // // // // //               <Send size={18} color="black" />
// // // // // // //             </Button>
// // // // // // //           </XStack>
// // // // // // //         </KeyboardAvoidingView>
// // // // // // //       </SafeAreaView>
// // // // // // //     </Theme>
// // // // // // //   );
// // // // // // // }




// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // // // // // import { YStack, XStack, Text, Input, Button, Theme, Spinner, Circle } from 'tamagui';
// // // // // // import { Send, User, Bot, Mic, Square } from '@tamagui/lucide-icons';
// // // // // // import { Audio } from 'expo-av';
// // // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // // export default function ChatScreen() {
// // // // // //   const [messages, setMessages] = useState([
// // // // // //     { role: 'assistant', content: 'Protocol Active. How can I assist with your financial strategy?' }
// // // // // //   ]);
// // // // // //   const [inputText, setInputText] = useState('');
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   // --- 🎙️ MICROPHONE STATE ---
// // // // // //   const [recording, setRecording] = useState(null);
// // // // // //   const [isRecording, setIsRecording] = useState(false);
// // // // // //   const [permissionResponse, requestPermission] = Audio.usePermissions();

// // // // // //   // 1. Initialize Audio Mode and Cleanup on Unmount
// // // // // //   useEffect(() => {
// // // // // //     async function setup() {
// // // // // //       await Audio.setAudioModeAsync({
// // // // // //         allowsRecordingIOS: true,
// // // // // //         playsInSilentModeIOS: true,
// // // // // //       });
// // // // // //     }
// // // // // //     setup();

// // // // // //     return () => {
// // // // // //       // Emergency cleanup if user leaves screen while recording
// // // // // //       if (recording) {
// // // // // //         recording.unloadAsync();
// // // // // //       }
// // // // // //     };
// // // // // //   }, []);

// // // // // //   // --- 🎙️ START RECORDING ---
// // // // // //   const startRecording = async () => {
// // // // // //     try {
// // // // // //       // PRE-START CLEANUP: Prevent "Only one Recording object" error
// // // // // //       if (recording) {
// // // // // //         await recording.unloadAsync();
// // // // // //         setRecording(null);
// // // // // //       }

// // // // // //       if (permissionResponse.status !== 'granted') {
// // // // // //         const permission = await requestPermission();
// // // // // //         if (permission.status !== 'granted') return;
// // // // // //       }

// // // // // //       await Audio.setAudioModeAsync({
// // // // // //         allowsRecordingIOS: true,
// // // // // //         playsInSilentModeIOS: true,
// // // // // //       });

// // // // // //       console.log('Starting Recording...');
// // // // // //       const { recording: newRecording } = await Audio.Recording.createAsync(
// // // // // //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// // // // // //       );
      
// // // // // //       setRecording(newRecording);
// // // // // //       setIsRecording(true);
// // // // // //     } catch (err) {
// // // // // //       console.error('Failed to start recording', err);
// // // // // //       setRecording(null);
// // // // // //       setIsRecording(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // --- 🎙️ STOP RECORDING ---
// // // // // //   const stopRecording = async () => {
// // // // // //     if (!recording) return;

// // // // // //     setIsRecording(false);
// // // // // //     try {
// // // // // //       console.log('Stopping and Unloading...');
// // // // // //       await recording.stopAndUnloadAsync();
// // // // // //       const uri = recording.getURI();
      
// // // // // //       // RESET: Allow the next recording to start fresh
// // // // // //       setRecording(null);
      
// // // // // //       console.log('Voice file saved at:', uri);
// // // // // //       // Here: Send the URI to your FastAPI backend
// // // // // //       handleSend("Voice command captured.");
// // // // // //     } catch (err) {
// // // // // //       console.error('Failed to stop recording', err);
// // // // // //       setRecording(null);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSend = (text) => {
// // // // // //     const content = text || inputText;
// // // // // //     if (!content.trim()) return;

// // // // // //     setMessages(prev => [...prev, { role: 'user', content }]);
// // // // // //     setInputText('');
// // // // // //     setLoading(true);

// // // // // //     // Simulate Backend Response
// // // // // //     setTimeout(() => {
// // // // // //       setMessages(prev => [...prev, { role: 'assistant', content: 'Analyzing your request...' }]);
// // // // // //       setLoading(false);
// // // // // //     }, 1200);
// // // // // //   };

// // // // // //   return (
// // // // // //     <Theme name="dark">
// // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // // // //         <KeyboardAvoidingView 
// // // // // //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
// // // // // //           style={{ flex: 1 }}
// // // // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // // // // //         >
// // // // // //           {/* MESSAGES VIEW */}
// // // // // //           <ScrollView 
// // // // // //             contentContainerStyle={{ 
// // // // // //               padding: 20, 
// // // // // //               paddingBottom: 130 // Ensures messages aren't hidden by the floating navbar
// // // // // //             }}
// // // // // //           >
// // // // // //             <YStack space="$4">
// // // // // //               {messages.map((msg, i) => (
// // // // // //                 <XStack key={i} space="$3" jc={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// // // // // //                   {msg.role === 'assistant' && (
// // // // // //                     <Circle size={32} bg="$gold3" ai="center" jc="center">
// // // // // //                       <Bot size={16} color="black" />
// // // // // //                     </Circle>
// // // // // //                   )}
// // // // // //                   <YStack 
// // // // // //                     p="$3" 
// // // // // //                     br="$4" 
// // // // // //                     maxW="80%" 
// // // // // //                     bg={msg.role === 'user' ? '#EAB308' : 'rgba(255,255,255,0.05)'}
// // // // // //                     bc={msg.role === 'user' ? 'transparent' : 'rgba(255,255,255,0.1)'}
// // // // // //                     bw={1}
// // // // // //                   >
// // // // // //                     <Text color={msg.role === 'user' ? 'black' : 'white'} fontSize={14}>
// // // // // //                       {msg.content}
// // // // // //                     </Text>
// // // // // //                   </YStack>
// // // // // //                   {msg.role === 'user' && (
// // // // // //                     <Circle size={32} bg="$gray8" ai="center" jc="center">
// // // // // //                       <User size={16} color="white" />
// // // // // //                     </Circle>
// // // // // //                   )}
// // // // // //                 </XStack>
// // // // // //               ))}
// // // // // //               {loading && <Spinner size="small" color="$gold3" mt="$2" />}
// // // // // //             </YStack>
// // // // // //           </ScrollView>

// // // // // //           {/* CHAT INPUT AREA */}
// // // // // //           <XStack 
// // // // // //             p="$4" 
// // // // // //             space="$2" 
// // // // // //             ai="center" 
// // // // // //             bg="#000" 
// // // // // //             bc="rgba(255,255,255,0.05)" 
// // // // // //             bt={1}
// // // // // //             pb={Platform.OS === 'ios' ? 20 : 10}
// // // // // //           >
// // // // // //             <Button
// // // // // //               size="$4"
// // // // // //               br="$10"
// // // // // //               bg={isRecording ? '$red9' : 'rgba(255,255,255,0.05)'}
// // // // // //               onPress={isRecording ? stopRecording : startRecording}
// // // // // //             >
// // // // // //               {isRecording ? <Square size={18} color="white" /> : <Mic size={18} color="#EAB308" />}
// // // // // //             </Button>
            
// // // // // //             <Input
// // // // // //               f={1}
// // // // // //               h={45}
// // // // // //               br="$10"
// // // // // //               bg="rgba(255,255,255,0.03)"
// // // // // //               color="white"
// // // // // //               placeholder="Message Finni..."
// // // // // //               value={inputText}
// // // // // //               onChangeText={setInputText}
// // // // // //               disabled={isRecording}
// // // // // //             />

// // // // // //             <Button size="$4" br="$10" bg="#EAB308" onPress={() => handleSend()}>
// // // // // //               <Send size={18} color="black" />
// // // // // //             </Button>
// // // // // //           </XStack>
// // // // // //         </KeyboardAvoidingView>
// // // // // //       </SafeAreaView>
// // // // // //     </Theme>
// // // // // //   );
// // // // // // }


// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // // // // import { YStack, XStack, Text, Input, Button, Theme, Spinner, Circle } from 'tamagui';
// // // // // import { Send, User, Bot, Mic, MicOff } from '@tamagui/lucide-icons';
// // // // // import Voice from '@react-native-voice/voice'; // Native Voice Engine
// // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // export default function ChatScreen() {
// // // // //   const [messages, setMessages] = useState([{ role: 'assistant', content: 'Protocol Active. Tap the mic to speak.' }]);
// // // // //   const [inputText, setInputText] = useState('');
// // // // //   const [isListening, setIsListening] = useState(false);
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   useEffect(() => {
// // // // //     // Set up listeners for the Native Voice engine
// // // // //     Voice.onSpeechStart = () => setIsListening(true);
// // // // //     Voice.onSpeechEnd = () => setIsListening(false);
// // // // //     Voice.onSpeechResults = (e) => {
// // // // //       // e.value is an array of what the phone thinks you said
// // // // //       if (e.value && e.value[0]) {
// // // // //         setInputText(e.value[0]); 
// // // // //       }
// // // // //     };

// // // // //     return () => {
// // // // //       // Cleanup when you leave the screen
// // // // //       Voice.destroy().then(Voice.removeAllListeners);
// // // // //     };
// // // // //   }, []);

// // // // //   const toggleListening = async () => {
// // // // //     try {
// // // // //       if (isListening) {
// // // // //         await Voice.stop();
// // // // //         setIsListening(false);
// // // // //       } else {
// // // // //         setInputText(''); // Clear input for new speech
// // // // //         await Voice.start('en-US'); // Start listening in English
// // // // //       }
// // // // //     } catch (e) {
// // // // //       console.error("Voice Error:", e);
// // // // //     }
// // // // //   };

// // // // //   const handleSend = () => {
// // // // //     if (!inputText.trim()) return;
// // // // //     setMessages([...messages, { role: 'user', content: inputText }]);
// // // // //     setInputText('');
// // // // //     setLoading(true);
// // // // //     // Call your AI text-only API here
// // // // //     setTimeout(() => setLoading(false), 1000);
// // // // //   };

// // // // //   return (
// // // // //     <Theme name="dark">
// // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // // //         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          
// // // // //           <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 130 }}>
// // // // //             <YStack space="$4">
// // // // //               {messages.map((msg, i) => (
// // // // //                 <XStack key={i} space="$3" jc={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// // // // //                   {msg.role === 'assistant' && <Circle size={32} bg="$gold3" ai="center" jc="center"><Bot size={16} color="black" /></Circle>}
// // // // //                   <YStack p="$3" br="$4" maxW="80%" bg={msg.role === 'user' ? '#EAB308' : 'rgba(255,255,255,0.05)'} bc="rgba(255,255,255,0.1)" bw={1}>
// // // // //                     <Text color={msg.role === 'user' ? 'black' : 'white'} fontSize={14}>{msg.content}</Text>
// // // // //                   </YStack>
// // // // //                 </XStack>
// // // // //               ))}
// // // // //               {loading && <Spinner color="$gold3" />}
// // // // //             </YStack>
// // // // //           </ScrollView>

// // // // //           {/* INPUT BAR */}
// // // // //           <XStack p="$4" space="$2" ai="center" bg="#000" bc="rgba(255,255,255,0.05)" bt={1}>
// // // // //             <Button
// // // // //               size="$4" br="$10"
// // // // //               bg={isListening ? '$red9' : 'rgba(255,255,255,0.1)'}
// // // // //               onPress={toggleListening}
// // // // //             >
// // // // //               {isListening ? <MicOff size={20} color="white" /> : <Mic size={20} color="#EAB308" />}
// // // // //             </Button>
            
// // // // //             <Input
// // // // //               f={1} h={45} br="$10" bg="rgba(255,255,255,0.03)" color="white"
// // // // //               placeholder={isListening ? "Listening..." : "Message Finni..."}
// // // // //               value={inputText}
// // // // //               onChangeText={setInputText}
// // // // //             />

// // // // //             <Button size="$4" br="$10" bg="#EAB308" onPress={handleSend}>
// // // // //               <Send size={18} color="black" />
// // // // //             </Button>
// // // // //           </XStack>
// // // // //         </KeyboardAvoidingView>
// // // // //       </SafeAreaView>
// // // // //     </Theme>
// // // // //   );
// // // // // }


// // // // import React, { useState } from 'react';
// // // // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // // // import { YStack, XStack, Text, Input, Button, Theme, Circle } from 'tamagui';
// // // // import { Send, User, Bot, Mic } from '@tamagui/lucide-icons';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // export default function ChatScreen() {
// // // //   const [messages, setMessages] = useState([
// // // //     { role: 'assistant', content: 'Protocol Active. Tap the mic icon on your keyboard or the button below to dictate.' }
// // // //   ]);
// // // //   const [inputText, setInputText] = useState('');
// // // //   const [loading, setLoading] = useState(false);

// // // //   const handleSend = () => {
// // // //     if (!inputText.trim()) return;

// // // //     const newMsg = { role: 'user', content: inputText };
// // // //     setMessages(prev => [...prev, newMsg]);
// // // //     setInputText('');
// // // //     setLoading(true);

// // // //     // Send only the TEXT to your FastAPI backend
// // // //     // No audio files needed!
// // // //     setTimeout(() => {
// // // //       setMessages(prev => [...prev, { role: 'assistant', content: 'Strategy analyzed based on your input.' }]);
// // // //       setLoading(false);
// // // //     }, 1000);
// // // //   };

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // //         <KeyboardAvoidingView 
// // // //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
// // // //           style={{ flex: 1 }}
// // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // // //         >
// // // //           {/* MESSAGES */}
// // // //           <ScrollView 
// // // //             contentContainerStyle={{ padding: 20, paddingBottom: 130 }}
// // // //             showsVerticalScrollIndicator={false}
// // // //           >
// // // //             <YStack space="$4">
// // // //               {messages.map((msg, i) => (
// // // //                 <XStack key={i} space="$3" jc={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// // // //                   {msg.role === 'assistant' && (
// // // //                     <Circle size={32} bg="$gold3" ai="center" jc="center">
// // // //                       <Bot size={16} color="black" />
// // // //                     </Circle>
// // // //                   )}
// // // //                   <YStack 
// // // //                     p="$3" br="$4" maxW="80%" 
// // // //                     bg={msg.role === 'user' ? '#EAB308' : 'rgba(255,255,255,0.05)'}
// // // //                     bc={msg.role === 'user' ? 'transparent' : 'rgba(255,255,255,0.1)'}
// // // //                     bw={1}
// // // //                   >
// // // //                     <Text color={msg.role === 'user' ? 'black' : 'white'} fontSize={14}>
// // // //                       {msg.content}
// // // //                     </Text>
// // // //                   </YStack>
// // // //                   {msg.role === 'user' && (
// // // //                     <Circle size={32} bg="$gray8" ai="center" jc="center">
// // // //                       <User size={16} color="white" />
// // // //                     </Circle>
// // // //                   )}
// // // //                 </XStack>
// // // //               ))}
// // // //             </YStack>
// // // //           </ScrollView>

// // // //           {/* NATIVE STYLE INPUT AREA */}
// // // //           <XStack 
// // // //             p="$4" space="$2" ai="center" bg="#000" 
// // // //             bc="rgba(255,255,255,0.05)" bt={1}
// // // //             pb={Platform.OS === 'ios' ? 20 : 10}
// // // //           >
// // // //             {/* In Native Dictation, we don't need a separate recording state. 
// // // //                The user simply taps the input, and the keyboard's own 
// // // //                microphone handles the conversion for free.
// // // //             */}
// // // //             <Input
// // // //               f={1} h={48} br="$10"
// // // //               bg="rgba(255,255,255,0.03)"
// // // //               color="white"
// // // //               placeholder="Tap to type or use keyboard mic..."
// // // //               value={inputText}
// // // //               onChangeText={setInputText}
// // // //               // This triggers the native "Dictation" button on most keyboards
// // // //               returnKeyType="send"
// // // //               onSubmitEditing={handleSend}
// // // //             />

// // // //             <Button 
// // // //               size="$4" br="$10" bg="#EAB308" 
// // // //               onPress={handleSend}
// // // //               disabled={!inputText.trim()}
// // // //               opacity={!inputText.trim() ? 0.5 : 1}
// // // //             >
// // // //               <Send size={18} color="black" />
// // // //             </Button>
// // // //           </XStack>
// // // //         </KeyboardAvoidingView>
// // // //       </SafeAreaView>
// // // //     </Theme>
// // // //   );
// // // // }



// // // import React, { useState } from 'react';
// // // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // // import { YStack, XStack, Text, Input, Button, Theme, Circle } from 'tamagui';
// // // import { Send, User, Bot, Mic } from '@tamagui/lucide-icons';
// // // import * as SpeechRecognition from 'expo-speech-recognition'; // The Expo-safe way
// // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // export default function ChatScreen() {
// // //   const [messages, setMessages] = useState([
// // //     { role: 'assistant', content: 'Protocol Active. Tap the Mic button to dictate your strategy.' }
// // //   ]);
// // //   const [inputText, setInputText] = useState('');
// // //   const [loading, setLoading] = useState(false);

// // //   // --- 🎙️ NATIVE VOICE BUTTON LOGIC ---
// // //   const startNativeDictation = async () => {
// // //     try {
// // //       // 1. Request Permission
// // //       const result = await SpeechRecognition.requestPermissionsAsync();
// // //       if (!result.granted) return;

// // //       // 2. Start System UI (This is what 'Other Apps' do)
// // //       // This opens the native listening card at the bottom of the screen
// // //       const speech = await SpeechRecognition.startAsync({
// // //         lang: 'en-US',
// // //         interimResults: true, // Show text as you speak
// // //       });

// // //       // 3. Handle the result
// // //       if (speech.results && speech.results[0]) {
// // //         setInputText(speech.results[0].transcript);
// // //       }
// // //     } catch (error) {
// // //       console.error("Native Voice Error:", error);
// // //     }
// // //   };

// // //   const handleSend = () => {
// // //     if (!inputText.trim()) return;
// // //     setMessages(prev => [...prev, { role: 'user', content: inputText }]);
// // //     setInputText('');
// // //     setLoading(true);
// // //     // AI fetch logic here...
// // //     setTimeout(() => setLoading(false), 1000);
// // //   };

// // //   return (
// // //     <Theme name="dark">
// // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // //         <KeyboardAvoidingView 
// // //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
// // //           style={{ flex: 1 }}
// // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // //         >
// // //           {/* CHAT MESSAGES */}
// // //           <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 130 }}>
// // //             <YStack space="$4">
// // //               {messages.map((msg, i) => (
// // //                 <XStack key={i} space="$3" jc={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// // //                   {msg.role === 'assistant' && (
// // //                     <Circle size={32} bg="$gold3" ai="center" jc="center"><Bot size={16} color="black" /></Circle>
// // //                   )}
// // //                   <YStack p="$3" br="$4" maxW="80%" bg={msg.role === 'user' ? '#EAB308' : '#222'} bc="rgba(255,255,255,0.1)" bw={1}>
// // //                     <Text color={msg.role === 'user' ? 'black' : 'white'} fontSize={14}>{msg.content}</Text>
// // //                   </YStack>
// // //                   {msg.role === 'user' && (
// // //                     <Circle size={32} bg="$gray8" ai="center" jc="center"><User size={16} color="white" /></Circle>
// // //                   )}
// // //                 </XStack>
// // //               ))}
// // //             </YStack>
// // //           </ScrollView>

// // //           {/* INPUT AREA WITH DEDICATED MIC BUTTON */}
// // //           <XStack p="$4" space="$2" ai="center" bg="#000" bc="rgba(255,255,255,0.05)" bt={1} pb={Platform.OS === 'ios' ? 20 : 10}>
            
// // //             {/* THIS IS THE BUTTON YOU WANTED */}
// // //             <Button
// // //               size="$4"
// // //               br="$10"
// // //               bg="rgba(254, 179, 8, 0.15)"
// // //               onPress={startNativeDictation}
// // //               borderColor="$gold8"
// // //               bw={1}
// // //             >
// // //               <Mic size={20} color="#EAB308" />
// // //             </Button>
            
// // //             <Input
// // //               f={1} h={48} br="$10" bg="rgba(255,255,255,0.03)" color="white"
// // //               placeholder="Message Finni..."
// // //               value={inputText}
// // //               onChangeText={setInputText}
// // //             />

// // //             <Button size="$4" br="$10" bg="#EAB308" onPress={handleSend}>
// // //               <Send size={18} color="black" />
// // //             </Button>
// // //           </XStack>
// // //         </KeyboardAvoidingView>
// // //       </SafeAreaView>
// // //     </Theme>
// // //   );
// // // }


// // import React, { useState, useEffect } from 'react';
// // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // import { YStack, XStack, Text, Input, Button, Theme, Circle } from 'tamagui';
// // import { Send, Mic, MicOff, Bot, User } from '@tamagui/lucide-icons';
// // import Voice from '@react-native-voice/voice';
// // import { SafeAreaView } from 'react-native-safe-area-context';

// // export default function ChatScreen() {
// //   const [inputText, setInputText] = useState('');
// //   const [isListening, setIsListening] = useState(false);
// //   const [messages, setMessages] = useState([{ role: 'assistant', content: 'Native Dictation Active.' }]);

// //   useEffect(() => {
// //     // Bind native events
// //     Voice.onSpeechStart = () => setIsListening(true);
// //     Voice.onSpeechEnd = () => setIsListening(false);
// //     Voice.onSpeechResults = (e) => {
// //       if (e.value && e.value[0]) {
// //         setInputText(e.value[0]); // Text appears in input instantly
// //       }
// //     };
// //     Voice.onSpeechError = (e) => {
// //       console.error("Native Voice Error:", e);
// //       setIsListening(false);
// //     };

// //     return () => {
// //       Voice.destroy().then(Voice.removeAllListeners);
// //     };
// //   }, []);

// //   const startDictation = async () => {
// //     try {
// //       setInputText('');
// //       await Voice.start('en-US');
// //     } catch (e) {
// //       console.error(e);
// //     }
// //   };

// //   const stopDictation = async () => {
// //     try {
// //       await Voice.stop();
// //       setIsListening(false);
// //     } catch (e) {
// //       console.error(e);
// //     }
// //   };

// //   const handleSend = () => {
// //     if (!inputText.trim()) return;
// //     setMessages([...messages, { role: 'user', content: inputText }]);
// //     setInputText('');
// //   };

// //   return (
// //     <Theme name="dark">
// //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// //         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
// //           <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 150 }}>
// //             {messages.map((m, i) => (
// //               <XStack key={i} jc={m.role === 'user' ? 'flex-end' : 'flex-start'} mb="$4">
// //                 <Text p="$3" br="$4" bg={m.role === 'user' ? '#EAB308' : '#222'} color={m.role === 'user' ? '#000' : '#fff'}>
// //                   {m.content}
// //                 </Text>
// //               </XStack>
// //             ))}
// //           </ScrollView>

// //           <XStack p="$4" space="$2" ai="center" bg="#080808" bc="#222" bt={1} pb={40}>
// //             <Button 
// //               circular size="$5" 
// //               bg={isListening ? '$red9' : 'rgba(234, 179, 8, 0.1)'} 
// //               onPress={isListening ? stopDictation : startDictation}
// //               borderColor="$gold8" bw={1}
// //             >
// //               {isListening ? <MicOff size={20} color="white" /> : <Mic size={20} color="#EAB308" />}
// //             </Button>
            
// //             <Input 
// //               f={1} h={50} br="$10" bg="#111" color="white"
// //               placeholder={isListening ? "Listening..." : "Message Finni..."}
// //               value={inputText}
// //               onChangeText={setInputText}
// //             />

// //             <Button circular bg="$gold10" onPress={handleSend}>
// //               <Send size={18} color="black" />
// //             </Button>
// //           </XStack>
// //         </KeyboardAvoidingView>
// //       </SafeAreaView>
// //     </Theme>
// //   );
// // }





// import React, { useState, useEffect } from 'react';
// import { KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
// import { YStack, XStack, Text, Input, Button, Theme, Circle } from 'tamagui';
// import { Send, Mic, MicOff, Bot, User } from '@tamagui/lucide-icons';
// import Voice from '@react-native-voice/voice';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function ChatScreen() {
//   const [inputText, setInputText] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [messages, setMessages] = useState([
//     { role: 'assistant', content: 'Native Dictation Protocol Online. How can I help with your finances?' }
//   ]);

//   useEffect(() => {
//     // 1. Setup Native Voice Listeners
//     Voice.onSpeechStart = () => setIsListening(true);
//     Voice.onSpeechEnd = () => setIsListening(false);
    
//     Voice.onSpeechResults = (e) => {
//       // This is called as the phone recognizes words
//       if (e.value && e.value[0]) {
//         setInputText(e.value[0]);
//       }
//     };

//     Voice.onSpeechError = (e) => {
//       console.error("Native Voice Error:", e);
//       setIsListening(false);
//       // Handle common errors like "No match"
//       if (e.error?.message?.includes("No match")) {
//          console.log("No speech detected.");
//       }
//     };

//     return () => {
//       // 2. Important Cleanup
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   // --- 🎙️ TRIGGER NATIVE DICTATION ---
//   const startListening = async () => {
//     try {
//       setInputText(''); // Clear box for new dictation
//       await Voice.start('en-US'); // Start the system listener
//     } catch (e) {
//       console.error(e);
//       Alert.alert("Error", "Could not start voice recognition.");
//     }
//   };

//   const stopListening = async () => {
//     try {
//       await Voice.stop();
//       setIsListening(false);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handleSend = () => {
//     if (!inputText.trim()) return;

//     // Add user message to UI
//     const userMsg = { role: 'user', content: inputText };
//     setMessages(prev => [...prev, userMsg]);
    
//     const textToProcess = inputText;
//     setInputText('');

//     // --- 🐍 CALL YOUR BACKEND ---
//     // Since we now have TEXT, we just send a simple JSON request
//     // No more multipart/form-data or audio files!
//     processChat(textToProcess);
//   };

//   const processChat = async (text) => {
//     try {
//       // Placeholder for your FastAPI call:
//       // const res = await axios.post('/api/v1/chat', { message: text });
//       // setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
      
//       console.log("Sending to Backend:", text);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Theme name="dark">
//       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
//         <KeyboardAvoidingView 
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
//           style={{ flex: 1 }}
//           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
//         >
//           {/* MESSAGES LIST */}
//           <ScrollView 
//             contentContainerStyle={{ padding: 20, paddingBottom: 150 }}
//             showsVerticalScrollIndicator={false}
//           >
//             <YStack space="$4">
//               {messages.map((msg, i) => (
//                 <XStack key={i} space="$3" jc={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
//                   {msg.role === 'assistant' && (
//                     <Circle size={32} bg="$gold3" ai="center" jc="center">
//                       <Bot size={16} color="black" />
//                     </Circle>
//                   )}
//                   <YStack 
//                     p="$3" br="$4" maxW="80%" 
//                     bg={msg.role === 'user' ? '#EAB308' : 'rgba(255,255,255,0.05)'}
//                     bc={msg.role === 'user' ? 'transparent' : 'rgba(255,255,255,0.1)'}
//                     bw={1}
//                   >
//                     <Text color={msg.role === 'user' ? 'black' : 'white'} fontSize={14}>
//                       {msg.content}
//                     </Text>
//                   </YStack>
//                   {msg.role === 'user' && (
//                     <Circle size={32} bg="$gray8" ai="center" jc="center">
//                       <User size={16} color="white" />
//                     </Circle>
//                   )}
//                 </XStack>
//               ))}
//             </YStack>
//           </ScrollView>

//           {/* INPUT AREA WITH NATIVE MIC BUTTON */}
//           <XStack 
//             p="$4" space="$2" ai="center" bg="#000" 
//             bc="rgba(255,255,255,0.05)" bt={1}
//             pb={Platform.OS === 'ios' ? 20 : 10}
//           >
//             <Button
//               size="$4"
//               br="$10"
//               bg={isListening ? '$red9' : 'rgba(234, 179, 8, 0.15)'}
//               onPress={isListening ? stopListening : startListening}
//               borderColor={isListening ? '$red10' : '$gold8'}
//               bw={1}
//             >
//               {isListening ? <MicOff size={20} color="white" /> : <Mic size={20} color="#EAB308" />}
//             </Button>
            
//             <Input
//               f={1} h={48} br="$10"
//               bg="rgba(255,255,255,0.03)"
//               color="white"
//               placeholder={isListening ? "Listening..." : "Ask Finni AI..."}
//               value={inputText}
//               onChangeText={setInputText}
//             />

//             <Button 
//               size="$4" br="$10" bg="#EAB308" 
//               onPress={handleSend}
//               disabled={!inputText.trim()}
//             >
//               <Send size={18} color="black" />
//             </Button>
//           </XStack>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </Theme>
//   );
// }


import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { YStack, XStack, Text, Input, Button, Theme, Circle } from 'tamagui';
import { Send, Mic, MicOff, Bot, User } from '@tamagui/lucide-icons';
import Voice from '@react-native-voice/voice';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Chat System Ready.' }]);

  useEffect(() => {
    // Setup listeners
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value[0]) setInputText(e.value[0]);
    };
    Voice.onSpeechError = (e) => {
      console.error("Speech Error:", e);
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    // SAFETY CHECK: This prevents the 'startSpeech of null' crash
    if (!Voice || typeof Voice.start !== 'function') {
      Alert.alert(
        "Native Module Missing", 
        "The voice driver is not installed. You must run 'npx expo run:android' successfully once."
      );
      return;
    }

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) { console.error(e); }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: inputText }]);
    setInputText('');
  };

  return (
    <Theme name="dark">
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 150 }}>
            {messages.map((m, i) => (
              <XStack key={i} jc={m.role === 'user' ? 'flex-end' : 'flex-start'} mb="$4">
                <Text p="$3" br="$4" bg={m.role === 'user' ? '#EAB308' : '#222'} color={m.role === 'user' ? '#000' : '#fff'}>
                  {m.content}
                </Text>
              </XStack>
            ))}
          </ScrollView>

          <XStack p="$4" space="$2" ai="center" bg="#080808" bc="#222" bt={1} pb={40}>
            <Button 
              circular size="$5" 
              bg={isListening ? '$red9' : 'rgba(234, 179, 8, 0.1)'} 
              onPress={isListening ? stopListening : startListening}
              borderColor="$gold8" bw={1}
            >
              {isListening ? <MicOff size={20} color="white" /> : <Mic size={20} color="#EAB308" />}
            </Button>
            
            <Input 
              f={1} h={50} br="$10" bg="#111" color="white"
              placeholder={isListening ? "Listening..." : "Message Finni..."}
              value={inputText}
              onChangeText={setInputText}
            />

            <Button circular bg="$gold10" onPress={handleSend}>
              <Send size={18} color="black" />
            </Button>
          </XStack>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Theme>
  );
}