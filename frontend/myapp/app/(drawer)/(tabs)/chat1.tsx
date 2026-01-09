// // // // // // // // // // // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // // // // // // // // // // import { FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
// // // // // // // // // // // // // // import { YStack, XStack, Input, Button, Text, Theme, Spinner, Avatar, H4 } from 'tamagui';
// // // // // // // // // // // // // // import { Send, Bot, User, Sparkles } from '@tamagui/lucide-icons';
// // // // // // // // // // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // // // // // // // // // import { AiService } from '../../../services/aiService';

// // // // // // // // // // // // // // interface Message {
// // // // // // // // // // // // // //   id: string;
// // // // // // // // // // // // // //   role: 'user' | 'ai';
// // // // // // // // // // // // // //   text: string;
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // export default function ChatScreen() {
// // // // // // // // // // // // // //   const [messages, setMessages] = useState<Message[]>([
// // // // // // // // // // // // // //     { id: '1', role: 'ai', text: "Hello. I am Finni, your autonomous financial intelligence. How can I assist with your wealth today?" }
// // // // // // // // // // // // // //   ]);
// // // // // // // // // // // // // //   const [input, setInput] = useState('');
// // // // // // // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // // // // // // //   const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  
// // // // // // // // // // // // // //   const flatListRef = useRef<FlatList>(null);

// // // // // // // // // // // // // //   const sendMessage = async () => {
// // // // // // // // // // // // // //     if (!input.trim()) return;

// // // // // // // // // // // // // //     const userText = input;
// // // // // // // // // // // // // //     setInput(''); // Clear input immediately
// // // // // // // // // // // // // //     Keyboard.dismiss();

// // // // // // // // // // // // // //     // 1. Add User Message
// // // // // // // // // // // // // //     const userMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };
// // // // // // // // // // // // // //     setMessages(prev => [...prev, userMsg]);
// // // // // // // // // // // // // //     setLoading(true);

// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       // 2. Call Backend API
// // // // // // // // // // // // // //       const data = await AiService.sendMessage(userText, sessionId);
      
// // // // // // // // // // // // // //       // 3. Save Session ID for context (if backend returns it)
// // // // // // // // // // // // // //       if (data.session_id) setSessionId(data.session_id);

// // // // // // // // // // // // // //       // 4. Add AI Response
// // // // // // // // // // // // // //       const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: data.response };
// // // // // // // // // // // // // //       setMessages(prev => [...prev, aiMsg]);

// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       const errorMsg: Message = { id: Date.now().toString(), role: 'ai', text: "⚠️ Connection lost. My neural core is unreachable." };
// // // // // // // // // // // // // //       setMessages(prev => [...prev, errorMsg]);
// // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // Auto-scroll to bottom when messages change
// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
// // // // // // // // // // // // // //   }, [messages, loading]);

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <Theme name="dark">
// // // // // // // // // // // // // //       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
// // // // // // // // // // // // // //         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          
// // // // // // // // // // // // // //           {/* --- HEADER --- */}
// // // // // // // // // // // // // //           <YStack pt={60} pb={20} px={20} borderBottomColor="rgba(255,255,255,0.05)" borderBottomWidth={1} bg="rgba(0,0,0,0.8)">
// // // // // // // // // // // // // //             <XStack ai="center" space="$3">
// // // // // // // // // // // // // //               <YStack w={40} h={40} br={20} bg="$gold3" jc="center" ai="center" shadowColor="$gold3" shadowRadius={10}>
// // // // // // // // // // // // // //                 <Bot size={24} color="black" />
// // // // // // // // // // // // // //               </YStack>
// // // // // // // // // // // // // //               <YStack>
// // // // // // // // // // // // // //                 <H4 color="$white" fontSize={16} letterSpacing={1}>FINNI ADVISOR</H4>
// // // // // // // // // // // // // //                 <XStack ai="center" space="$1">
// // // // // // // // // // // // // //                   <Sparkles size={10} color="#22c55e" />
// // // // // // // // // // // // // //                   <Text color="$silver4" fontSize={10}>Online // GPT-4 Turbo</Text>
// // // // // // // // // // // // // //                 </XStack>
// // // // // // // // // // // // // //               </YStack>
// // // // // // // // // // // // // //             </XStack>
// // // // // // // // // // // // // //           </YStack>

// // // // // // // // // // // // // //           {/* --- CHAT AREA --- */}
// // // // // // // // // // // // // //           <FlatList
// // // // // // // // // // // // // //             ref={flatListRef}
// // // // // // // // // // // // // //             data={messages}
// // // // // // // // // // // // // //             keyExtractor={item => item.id}
// // // // // // // // // // // // // //             contentContainerStyle={{ padding: 20, paddingBottom: 20 }}
// // // // // // // // // // // // // //             renderItem={({ item }) => (
// // // // // // // // // // // // // //               <XStack jc={item.role === 'user' ? 'flex-end' : 'flex-start'} mb="$4" ai="flex-end">
                
// // // // // // // // // // // // // //                 {/* AI Avatar */}
// // // // // // // // // // // // // //                 {item.role === 'ai' && (
// // // // // // // // // // // // // //                   <YStack w={28} h={28} br={14} bg="rgba(234, 179, 8, 0.2)" jc="center" ai="center" mr="$2" mb="$1">
// // // // // // // // // // // // // //                     <Bot size={14} color="#EAB308" />
// // // // // // // // // // // // // //                   </YStack>
// // // // // // // // // // // // // //                 )}

// // // // // // // // // // // // // //                 {/* Message Bubble */}
// // // // // // // // // // // // // //                 <YStack 
// // // // // // // // // // // // // //                   bg={item.role === 'user' ? '$silver2' : 'rgba(255,255,255,0.05)'} 
// // // // // // // // // // // // // //                   p="$3" 
// // // // // // // // // // // // // //                   br="$4" 
// // // // // // // // // // // // // //                   borderTopLeftRadius={item.role === 'ai' ? 4 : 16}
// // // // // // // // // // // // // //                   borderBottomRightRadius={item.role === 'user' ? 4 : 16}
// // // // // // // // // // // // // //                   maxWidth="80%"
// // // // // // // // // // // // // //                   borderColor={item.role === 'ai' ? 'rgba(234, 179, 8, 0.3)' : 'transparent'}
// // // // // // // // // // // // // //                   borderWidth={item.role === 'ai' ? 1 : 0}
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                   <Text color="$white" fontSize={15} lineHeight={22}>
// // // // // // // // // // // // // //                     {item.text}
// // // // // // // // // // // // // //                   </Text>
// // // // // // // // // // // // // //                 </YStack>
// // // // // // // // // // // // // //               </XStack>
// // // // // // // // // // // // // //             )}
// // // // // // // // // // // // // //             ListFooterComponent={
// // // // // // // // // // // // // //               loading ? (
// // // // // // // // // // // // // //                 <XStack ml="$5" mb="$4" ai="center" space="$2">
// // // // // // // // // // // // // //                    <Spinner size="small" color="$gold3" />
// // // // // // // // // // // // // //                    <Text color="$silver4" fontSize={12} fontStyle="italic">Thinking...</Text>
// // // // // // // // // // // // // //                 </XStack>
// // // // // // // // // // // // // //               ) : null
// // // // // // // // // // // // // //             }
// // // // // // // // // // // // // //           />

// // // // // // // // // // // // // //           {/* --- INPUT AREA --- */}
// // // // // // // // // // // // // //           <XStack p="$4" bg="rgba(0,0,0,0.9)" ai="center" space="$2" borderTopColor="rgba(255,255,255,0.1)" borderTopWidth={1}>
// // // // // // // // // // // // // //             <Input 
// // // // // // // // // // // // // //               flex={1} 
// // // // // // // // // // // // // //               value={input} 
// // // // // // // // // // // // // //               onChangeText={setInput} 
// // // // // // // // // // // // // //               placeholder="Ask about your finances..." 
// // // // // // // // // // // // // //               placeholderTextColor="$silver4"
// // // // // // // // // // // // // //               bg="rgba(255,255,255,0.05)" 
// // // // // // // // // // // // // //               color="white"
// // // // // // // // // // // // // //               borderColor="transparent"
// // // // // // // // // // // // // //               borderRadius="$4"
// // // // // // // // // // // // // //               h={50}
// // // // // // // // // // // // // //               mb={120}
// // // // // // // // // // // // // //               mt={120}
// // // // // // // // // // // // // //               onSubmitEditing={sendMessage}
// // // // // // // // // // // // // //             />
// // // // // // // // // // // // // //             <Button 
// // // // // // // // // // // // // //               size="$4" 
// // // // // // // // // // // // // //               bg="$gold3" 
// // // // // // // // // // // // // //               color="black"
// // // // // // // // // // // // // //               onPress={sendMessage} 
// // // // // // // // // // // // // //               disabled={loading || !input.trim()}
// // // // // // // // // // // // // //               icon={<Send size={18} color="black" />}
// // // // // // // // // // // // // //               borderRadius="$4"
// // // // // // // // // // // // // //             />
// // // // // // // // // // // // // //           </XStack>

// // // // // // // // // // // // // //         </KeyboardAvoidingView>
// // // // // // // // // // // // // //       </LinearGradient>
// // // // // // // // // // // // // //     </Theme>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // // // // // // // // // import { FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
// // // // // // // // // // // // // import { YStack, XStack, Input, Button, Text, Theme, Spinner, H4, View } from 'tamagui';
// // // // // // // // // // // // // import { Send, Bot, Sparkles } from '@tamagui/lucide-icons';
// // // // // // // // // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // // // // // // // // import { AiService } from '../../../services/aiService';
// // // // // // // // // // // // // import { useLocalSearchParams } from 'expo-router';

// // // // // // // // // // // // // export default function ChatScreen() {
// // // // // // // // // // // // //   const [messages, setMessages] = useState([
// // // // // // // // // // // // //     { id: 'initial-ai', role: 'ai', text: "Hello. I am Finni, your autonomous financial intelligence. How can I assist with your wealth today?" }
// // // // // // // // // // // // //   ]);
// // // // // // // // // // // // //   const [input, setInput] = useState('');
// // // // // // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // // // // // //   const [sessionId, setSessionId] = useState(undefined);

// // // // // // // // // // // // //   const { voiceInput } = useLocalSearchParams();
  
// // // // // // // // // // // // //   const params = useLocalSearchParams();

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     if (params.voiceInput) {
// // // // // // // // // // // // //       setInput(params.voiceInput);
// // // // // // // // // // // // //       // 🚀 Automatically trigger send
// // // // // // // // // // // // //       setTimeout(() => sendMessage(), 500);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   }, [params.voiceInput, params.timestamp]);

// // // // // // // // // // // // //   const flatListRef = useRef(null);

// // // // // // // // // // // // //   const sendMessage = async () => {
// // // // // // // // // // // // //     if (!input.trim() || loading) return;

// // // // // // // // // // // // //     const userText = input;
// // // // // // // // // // // // //     setInput(''); 
// // // // // // // // // // // // //     Keyboard.dismiss();

// // // // // // // // // // // // //     // 🚀 FIX 1: Unique Keys (Added 'user-' prefix)
// // // // // // // // // // // // //     const userMsg = { id: `user-${Date.now()}`, role: 'user', text: userText };
// // // // // // // // // // // // //     setMessages(prev => [...prev, userMsg]);
// // // // // // // // // // // // //     setLoading(true);

// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const data = await AiService.sendMessage(userText, sessionId);
// // // // // // // // // // // // //       if (data.session_id) setSessionId(data.session_id);

// // // // // // // // // // // // //       // 🚀 FIX 2: Unique Keys (Added 'ai-' prefix)
// // // // // // // // // // // // //       const aiMsg = { id: `ai-${Date.now()}`, role: 'ai', text: data.response };
// // // // // // // // // // // // //       setMessages(prev => [...prev, aiMsg]);

// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       const errorMsg = { id: `error-${Date.now()}`, role: 'ai', text: "⚠️ Neural core unreachable. Check connection." };
// // // // // // // // // // // // //       setMessages(prev => [...prev, errorMsg]);
// // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
// // // // // // // // // // // // //   }, [messages, loading]);

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <Theme name="dark">
// // // // // // // // // // // // //       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
// // // // // // // // // // // // //         <KeyboardAvoidingView 
// // // // // // // // // // // // //           behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
// // // // // // // // // // // // //           style={{ flex: 1 }}
// // // // // // // // // // // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // // // // // // // // // // // //         >
          
// // // // // // // // // // // // //           {/* --- HEADER --- */}
// // // // // // // // // // // // //           <YStack pt={60} pb={20} px={20} borderBottomColor="rgba(255,255,255,0.05)" borderBottomWidth={1} bg="rgba(0,0,0,0.8)">
// // // // // // // // // // // // //             <XStack ai="center" space="$3">
// // // // // // // // // // // // //               <View w={40} h={40} br={20} bg="$gold3" jc="center" ai="center">
// // // // // // // // // // // // //                 <Bot size={24} color="black" />
// // // // // // // // // // // // //               </View>
// // // // // // // // // // // // //               <YStack>
// // // // // // // // // // // // //                 <H4 color="$white" fontSize={16} letterSpacing={1}>FINNI ADVISOR</H4>
// // // // // // // // // // // // //                 <XStack ai="center" space="$1">
// // // // // // // // // // // // //                   <Sparkles size={10} color="#22c55e" />
// // // // // // // // // // // // //                   <Text color="$silver4" fontSize={10}>Online // Neural Engine</Text>
// // // // // // // // // // // // //                 </XStack>
// // // // // // // // // // // // //               </YStack>
// // // // // // // // // // // // //             </XStack>
// // // // // // // // // // // // //           </YStack>

// // // // // // // // // // // // //           {/* --- CHAT AREA --- */}
// // // // // // // // // // // // //           <FlatList
// // // // // // // // // // // // //             ref={flatListRef}
// // // // // // // // // // // // //             data={messages}
// // // // // // // // // // // // //             keyExtractor={item => item.id}
// // // // // // // // // // // // //             contentContainerStyle={{ 
// // // // // // // // // // // // //                 padding: 20, 
// // // // // // // // // // // // //                 paddingBottom: 100 // 🚀 Space so messages aren't hidden by the input bar
// // // // // // // // // // // // //             }}
// // // // // // // // // // // // //             renderItem={({ item }) => (
// // // // // // // // // // // // //               <XStack jc={item.role === 'user' ? 'flex-end' : 'flex-start'} mb="$4" ai="flex-end">
// // // // // // // // // // // // //                 {item.role === 'ai' && (
// // // // // // // // // // // // //                   <View w={28} h={28} br={14} bg="rgba(234, 179, 8, 0.2)" jc="center" ai="center" mr="$2" mb="$1">
// // // // // // // // // // // // //                     <Bot size={14} color="#EAB308" />
// // // // // // // // // // // // //                   </View>
// // // // // // // // // // // // //                 )}
// // // // // // // // // // // // //                 <YStack 
// // // // // // // // // // // // //                   bg={item.role === 'user' ? '$silver2' : 'rgba(255,255,255,0.07)'} 
// // // // // // // // // // // // //                   p="$3" 
// // // // // // // // // // // // //                   br="$4" 
// // // // // // // // // // // // //                   borderTopLeftRadius={item.role === 'ai' ? 4 : 16}
// // // // // // // // // // // // //                   borderBottomRightRadius={item.role === 'user' ? 4 : 16}
// // // // // // // // // // // // //                   maxWidth="80%"
// // // // // // // // // // // // //                   bw={item.role === 'ai' ? 1 : 0}
// // // // // // // // // // // // //                   bc="rgba(234, 179, 8, 0.3)"
// // // // // // // // // // // // //                 >
// // // // // // // // // // // // //                   <Text color="$white" fontSize={15} lineHeight={22}>{item.text}</Text>
// // // // // // // // // // // // //                 </YStack>
// // // // // // // // // // // // //               </XStack>
// // // // // // // // // // // // //             )}
// // // // // // // // // // // // //             ListFooterComponent={loading ? (
// // // // // // // // // // // // //               <XStack ml="$5" mb="$4" ai="center" space="$2">
// // // // // // // // // // // // //                 <Spinner size="small" color="$gold3" />
// // // // // // // // // // // // //                 <Text color="$silver4" fontSize={12} fontStyle="italic">Processing...</Text>
// // // // // // // // // // // // //               </XStack>
// // // // // // // // // // // // //             ) : null}
// // // // // // // // // // // // //           />

// // // // // // // // // // // // //           {/* --- INPUT AREA --- */}
// // // // // // // // // // // // //           <YStack 
// // // // // // // // // // // // //             bg="rgba(0,0,0,0.9)" 
// // // // // // // // // // // // //             borderTopColor="rgba(255,255,255,0.1)" 
// // // // // // // // // // // // //             borderTopWidth={1}
// // // // // // // // // // // // //             px="$4"
// // // // // // // // // // // // //             pt="$4"
// // // // // // // // // // // // //             pb={Platform.OS === 'ios' ? 110 : 125} // 🚀 THIS ALIGNS IT ABOVE THE NAV BAR
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             <XStack ai="center" space="$2">
// // // // // // // // // // // // //               <Input 
// // // // // // // // // // // // //                 flex={1} 
// // // // // // // // // // // // //                 value={input} 
// // // // // // // // // // // // //                 onChangeText={setInput} 
// // // // // // // // // // // // //                 placeholder="Ask Finni..." 
// // // // // // // // // // // // //                 placeholderTextColor="$silver4"
// // // // // // // // // // // // //                 bg="rgba(255,255,255,0.05)" 
// // // // // // // // // // // // //                 color="white"
// // // // // // // // // // // // //                 borderColor="transparent"
// // // // // // // // // // // // //                 borderRadius="$4"
// // // // // // // // // // // // //                 h={50}
// // // // // // // // // // // // //                 onSubmitEditing={sendMessage}
// // // // // // // // // // // // //               />
// // // // // // // // // // // // //               <Button 
// // // // // // // // // // // // //                 size="$4" 
// // // // // // // // // // // // //                 bg="$gold3" 
// // // // // // // // // // // // //                 onPress={sendMessage} 
// // // // // // // // // // // // //                 disabled={loading || !input.trim()}
// // // // // // // // // // // // //                 icon={<Send size={18} color="black" />}
// // // // // // // // // // // // //                 borderRadius="$4"
// // // // // // // // // // // // //               />
// // // // // // // // // // // // //             </XStack>
// // // // // // // // // // // // //           </YStack>

// // // // // // // // // // // // //         </KeyboardAvoidingView>
// // // // // // // // // // // // //       </LinearGradient>
// // // // // // // // // // // // //     </Theme>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // }




// // // // // // // // // // // // import React, { useState, useRef, useEffect, useCallback } from 'react';
// // // // // // // // // // // // import { FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
// // // // // // // // // // // // import { YStack, XStack, Input, Button, Text, Theme, Spinner, H4, View } from 'tamagui';
// // // // // // // // // // // // import { Send, Bot, Sparkles } from '@tamagui/lucide-icons';
// // // // // // // // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // // // // // // // import { AiService } from '../../../services/aiService';
// // // // // // // // // // // // import { useLocalSearchParams, useRouter } from 'expo-router';

// // // // // // // // // // // // export default function ChatScreen() {
// // // // // // // // // // // //   const router = useRouter();
// // // // // // // // // // // //   const params = useLocalSearchParams();
  
// // // // // // // // // // // //   const [messages, setMessages] = useState([
// // // // // // // // // // // //     { id: 'initial-ai', role: 'ai', text: "Hello. I am Finni, your autonomous financial intelligence. How can I assist with your wealth today?" }
// // // // // // // // // // // //   ]);
// // // // // // // // // // // //   const [input, setInput] = useState('');
// // // // // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // // // // //   const [sessionId, setSessionId] = useState(undefined);
// // // // // // // // // // // //   const flatListRef = useRef(null);

// // // // // // // // // // // //   // --- SEND MESSAGE LOGIC ---
// // // // // // // // // // // //   // Wrapped in useCallback so it can be called safely inside useEffect
// // // // // // // // // // // //   const sendMessage = useCallback(async (overrideText?: string) => {
// // // // // // // // // // // //     const textToSend = overrideText || input;
// // // // // // // // // // // //     if (!textToSend.trim() || loading) return;

// // // // // // // // // // // //     setInput(''); 
// // // // // // // // // // // //     Keyboard.dismiss();

// // // // // // // // // // // //     const userMsg = { id: `user-${Date.now()}`, role: 'user', text: textToSend };
// // // // // // // // // // // //     setMessages(prev => [...prev, userMsg]);
// // // // // // // // // // // //     setLoading(true);

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const data = await AiService.sendMessage(textToSend, sessionId);
// // // // // // // // // // // //       if (data.session_id) setSessionId(data.session_id);

// // // // // // // // // // // //       const aiMsg = { id: `ai-${Date.now()}`, role: 'ai', text: data.response };
// // // // // // // // // // // //       setMessages(prev => [...prev, aiMsg]);
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       const errorMsg = { id: `error-${Date.now()}`, role: 'ai', text: "⚠️ Neural core unreachable. Check connection." };
// // // // // // // // // // // //       setMessages(prev => [...prev, errorMsg]);
// // // // // // // // // // // //     } finally {
// // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }, [input, loading, sessionId]);

// // // // // // // // // // // //   // --- VOICE INPUT LISTENER ---
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (params.voiceInput) {
// // // // // // // // // // // //       const speechText = params.voiceInput as string;
// // // // // // // // // // // //       // 1. Set the input field visually
// // // // // // // // // // // //       setInput(speechText);
      
// // // // // // // // // // // //       // 2. Trigger the send after a short delay for UX
// // // // // // // // // // // //       const timer = setTimeout(() => {
// // // // // // // // // // // //         sendMessage(speechText);
// // // // // // // // // // // //         // 3. 🚀 CRITICAL: Clear the search params so it doesn't re-send on reload
// // // // // // // // // // // //         router.setParams({ voiceInput: '' });
// // // // // // // // // // // //       }, 600);

// // // // // // // // // // // //       return () => clearTimeout(timer);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }, [params.voiceInput, params.timestamp]);

// // // // // // // // // // // //   // --- AUTO SCROLL ---
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
// // // // // // // // // // // //   }, [messages, loading]);

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <Theme name="dark">
// // // // // // // // // // // //       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
// // // // // // // // // // // //         <KeyboardAvoidingView 
// // // // // // // // // // // //           behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
// // // // // // // // // // // //           style={{ flex: 1 }}
// // // // // // // // // // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // // // // // // // // // // //         >
          
// // // // // // // // // // // //           {/* --- HEADER --- */}
// // // // // // // // // // // //           <YStack pt={60} pb={20} px={20} borderBottomColor="rgba(255,255,255,0.05)" borderBottomWidth={1} bg="rgba(0,0,0,0.8)">
// // // // // // // // // // // //             <XStack ai="center" space="$3">
// // // // // // // // // // // //               <View w={40} h={40} br={20} bg="$gold3" jc="center" ai="center">
// // // // // // // // // // // //                 <Bot size={24} color="black" />
// // // // // // // // // // // //               </View>
// // // // // // // // // // // //               <YStack>
// // // // // // // // // // // //                 <H4 color="$white" fontSize={16} letterSpacing={1}>FINNI ADVISOR</H4>
// // // // // // // // // // // //                 <XStack ai="center" space="$1">
// // // // // // // // // // // //                   <Sparkles size={10} color="#22c55e" />
// // // // // // // // // // // //                   <Text color="$silver4" fontSize={10}>Online // Neural Engine</Text>
// // // // // // // // // // // //                 </XStack>
// // // // // // // // // // // //               </YStack>
// // // // // // // // // // // //             </XStack>
// // // // // // // // // // // //           </YStack>

// // // // // // // // // // // //           {/* --- CHAT AREA --- */}
// // // // // // // // // // // //           <FlatList
// // // // // // // // // // // //             ref={flatListRef}
// // // // // // // // // // // //             data={messages}
// // // // // // // // // // // //             keyExtractor={item => item.id}
// // // // // // // // // // // //             contentContainerStyle={{ 
// // // // // // // // // // // //                 padding: 20, 
// // // // // // // // // // // //                 paddingBottom: 40 
// // // // // // // // // // // //             }}
// // // // // // // // // // // //             renderItem={({ item }) => (
// // // // // // // // // // // //               <XStack jc={item.role === 'user' ? 'flex-end' : 'flex-start'} mb="$4" ai="flex-end">
// // // // // // // // // // // //                 {item.role === 'ai' && (
// // // // // // // // // // // //                   <View w={28} h={28} br={14} bg="rgba(234, 179, 8, 0.2)" jc="center" ai="center" mr="$2" mb="$1">
// // // // // // // // // // // //                     <Bot size={14} color="#EAB308" />
// // // // // // // // // // // //                   </View>
// // // // // // // // // // // //                 )}
// // // // // // // // // // // //                 <YStack 
// // // // // // // // // // // //                   bg={item.role === 'user' ? '$silver2' : 'rgba(255,255,255,0.07)'} 
// // // // // // // // // // // //                   p="$3" 
// // // // // // // // // // // //                   br="$4" 
// // // // // // // // // // // //                   borderTopLeftRadius={item.role === 'ai' ? 4 : 16}
// // // // // // // // // // // //                   borderBottomRightRadius={item.role === 'user' ? 4 : 16}
// // // // // // // // // // // //                   maxWidth="80%"
// // // // // // // // // // // //                   bw={item.role === 'ai' ? 1 : 0}
// // // // // // // // // // // //                   bc="rgba(234, 179, 8, 0.3)"
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                   <Text color="$white" fontSize={15} lineHeight={22}>{item.text}</Text>
// // // // // // // // // // // //                 </YStack>
// // // // // // // // // // // //               </XStack>
// // // // // // // // // // // //             )}
// // // // // // // // // // // //             ListFooterComponent={loading ? (
// // // // // // // // // // // //               <XStack ml="$10" mb="$4" ai="center" space="$2">
// // // // // // // // // // // //                 <Spinner size="small" color="$gold3" />
// // // // // // // // // // // //                 <Text color="$silver4" fontSize={12} fontStyle="italic">Analyzing...</Text>
// // // // // // // // // // // //               </XStack>
// // // // // // // // // // // //             ) : <View h={20} />}
// // // // // // // // // // // //           />

// // // // // // // // // // // //           {/* --- INPUT AREA --- */}
// // // // // // // // // // // //           <YStack 
// // // // // // // // // // // //             bg="rgba(0,0,0,0.95)" 
// // // // // // // // // // // //             borderTopColor="rgba(255,255,255,0.1)" 
// // // // // // // // // // // //             borderTopWidth={1}
// // // // // // // // // // // //             px="$4"
// // // // // // // // // // // //             pt="$4"
// // // // // // // // // // // //             pb={Platform.OS === 'ios' ? 110 : 130} // Space for Floating Navbar
// // // // // // // // // // // //           >
// // // // // // // // // // // //             <XStack ai="center" space="$2">
// // // // // // // // // // // //               <Input 
// // // // // // // // // // // //                 flex={1} 
// // // // // // // // // // // //                 value={input} 
// // // // // // // // // // // //                 onChangeText={setInput} 
// // // // // // // // // // // //                 placeholder="Ask Finni..." 
// // // // // // // // // // // //                 placeholderTextColor="$silver4"
// // // // // // // // // // // //                 bg="rgba(255,255,255,0.05)" 
// // // // // // // // // // // //                 color="white"
// // // // // // // // // // // //                 borderColor="transparent"
// // // // // // // // // // // //                 borderRadius="$4"
// // // // // // // // // // // //                 h={50}
// // // // // // // // // // // //                 onSubmitEditing={() => sendMessage()}
// // // // // // // // // // // //               />
// // // // // // // // // // // //               <Button 
// // // // // // // // // // // //                 size="$4" 
// // // // // // // // // // // //                 bg="$gold3" 
// // // // // // // // // // // //                 onPress={() => sendMessage()} 
// // // // // // // // // // // //                 disabled={loading || !input.trim()}
// // // // // // // // // // // //                 icon={loading ? <Spinner color="black" /> : <Send size={18} color="black" />}
// // // // // // // // // // // //                 borderRadius="$4"
// // // // // // // // // // // //               />
// // // // // // // // // // // //             </XStack>
// // // // // // // // // // // //           </YStack>

// // // // // // // // // // // //         </KeyboardAvoidingView>
// // // // // // // // // // // //       </LinearGradient>
// // // // // // // // // // // //     </Theme>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }




// // // // // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // // // // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // // // // // // // // // // import { YStack, XStack, Text, Input, Button, Theme, Spinner, Circle } from 'tamagui';
// // // // // // // // // // // import { Mic, Send, Square, User, Bot } from '@tamagui/lucide-icons';
// // // // // // // // // // // import { Audio } from 'expo-av';
// // // // // // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // // // // // // // export default function ChatScreen() {
// // // // // // // // // // //   const [messages, setMessages] = useState([
// // // // // // // // // // //     { role: 'assistant', content: 'System initialized. How can I assist with your finances today?' }
// // // // // // // // // // //   ]);
// // // // // // // // // // //   const [inputText, setInputText] = useState('');
// // // // // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // // // // //   // --- 🎙️ MICROPHONE STATE ---
// // // // // // // // // // //   const [recording, setRecording] = useState(null);
// // // // // // // // // // //   const [isRecording, setIsRecording] = useState(false);
// // // // // // // // // // //   const [permissionResponse, requestPermission] = Audio.usePermissions();

// // // // // // // // // // //   // Initialize Audio Session on mount
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     async function initAudio() {
// // // // // // // // // // //       await Audio.setAudioModeAsync({
// // // // // // // // // // //         allowsRecordingIOS: true,
// // // // // // // // // // //         playsInSilentModeIOS: true,
// // // // // // // // // // //       });
// // // // // // // // // // //     }
// // // // // // // // // // //     initAudio();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // --- 🎙️ START RECORDING ---
// // // // // // // // // // //   const startRecording = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       if (permissionResponse.status !== 'granted') {
// // // // // // // // // // //         console.log('Requesting mic permissions...');
// // // // // // // // // // //         await requestPermission();
// // // // // // // // // // //       }

// // // // // // // // // // //       // Ensure mode is recording-ready
// // // // // // // // // // //       await Audio.setAudioModeAsync({
// // // // // // // // // // //         allowsRecordingIOS: true,
// // // // // // // // // // //         playsInSilentModeIOS: true,
// // // // // // // // // // //       });

// // // // // // // // // // //       console.log('Starting Recording...');
// // // // // // // // // // //       const { recording } = await Audio.Recording.createAsync(
// // // // // // // // // // //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// // // // // // // // // // //       );
      
// // // // // // // // // // //       setRecording(recording);
// // // // // // // // // // //       setIsRecording(true);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Failed to start recording', err);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // --- 🎙️ STOP & SEND RECORDING ---
// // // // // // // // // // //   const stopRecording = async () => {
// // // // // // // // // // //     console.log('Stopping recording...');
// // // // // // // // // // //     setIsRecording(false);
    
// // // // // // // // // // //     try {
// // // // // // // // // // //       await recording.stopAndUnloadAsync();
// // // // // // // // // // //       const uri = recording.getURI();
// // // // // // // // // // //       console.log('Recording URI:', uri);
      
// // // // // // // // // // //       setRecording(null);
// // // // // // // // // // //       // Here you would call your backend: await uploadVoice(uri);
      
// // // // // // // // // // //       // For now, let's simulate a voice-to-text placeholder
// // // // // // // // // // //       handleSend("Voice command processed (Audio file saved).");
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error('Failed to stop recording', err);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleSend = async (text) => {
// // // // // // // // // // //     const messageToSend = text || inputText;
// // // // // // // // // // //     if (!messageToSend.trim()) return;

// // // // // // // // // // //     const newMsg = { role: 'user', content: messageToSend };
// // // // // // // // // // //     setMessages(prev => [...prev, newMsg]);
// // // // // // // // // // //     setInputText('');
// // // // // // // // // // //     setLoading(true);

// // // // // // // // // // //     // Simulate AI response
// // // // // // // // // // //     setTimeout(() => {
// // // // // // // // // // //       setMessages(prev => [...prev, { role: 'assistant', content: 'Analyzing your portfolio data...' }]);
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //     }, 1000);
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <Theme name="dark">
// // // // // // // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // // // // // // // // //         <KeyboardAvoidingView 
// // // // // // // // // // //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
// // // // // // // // // // //           style={{ flex: 1 }}
// // // // // // // // // // //           keyboardVerticalOffset={100}
// // // // // // // // // // //         >
// // // // // // // // // // //           {/* MESSAGES LIST */}
// // // // // // // // // // //           <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
// // // // // // // // // // //             <YStack space="$4">
// // // // // // // // // // //               {messages.map((msg, i) => (
// // // // // // // // // // //                 <XStack key={i} space="$3" jc={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// // // // // // // // // // //                   {msg.role === 'assistant' && <Circle size={32} bg="$gold3" ai="center" jc="center"><Bot size={18} color="black"/></Circle>}
// // // // // // // // // // //                   <YStack 
// // // // // // // // // // //                     p="$3" 
// // // // // // // // // // //                     br="$4" 
// // // // // // // // // // //                     maxW="80%" 
// // // // // // // // // // //                     bg={msg.role === 'user' ? '#EAB308' : 'rgba(255,255,255,0.05)'}
// // // // // // // // // // //                     bc={msg.role === 'user' ? 'transparent' : 'rgba(255,255,255,0.1)'}
// // // // // // // // // // //                     bw={1}
// // // // // // // // // // //                   >
// // // // // // // // // // //                     <Text color={msg.role === 'user' ? 'black' : 'white'} fontSize={14}>
// // // // // // // // // // //                       {msg.content}
// // // // // // // // // // //                     </Text>
// // // // // // // // // // //                   </YStack>
// // // // // // // // // // //                   {msg.role === 'user' && <Circle size={32} bg="$gray10" ai="center" jc="center"><User size={18} color="white"/></Circle>}
// // // // // // // // // // //                 </XStack>
// // // // // // // // // // //               ))}
// // // // // // // // // // //               {loading && <Spinner size="small" color="$gold3" />}
// // // // // // // // // // //             </YStack>
// // // // // // // // // // //           </ScrollView>

// // // // // // // // // // //           {/* INPUT AREA */}
// // // // // // // // // // //           <XStack p="$4" space="$2" ai="center" bc="rgba(255,255,255,0.05)" bt={1} bg="#080808" >
// // // // // // // // // // //             <Button
// // // // // // // // // // //               size="$4"
// // // // // // // // // // //               br="$10"
// // // // // // // // // // //               bg={isRecording ? '$red9' : 'rgba(255,255,255,0.05)'}
// // // // // // // // // // //               onPress={isRecording ? stopRecording : startRecording}
// // // // // // // // // // //             >
// // // // // // // // // // //               {isRecording ? <Square size={20} color="white" /> : <Mic size={20} color={isRecording ? 'white' : '#EAB308'} />}
// // // // // // // // // // //             </Button>
            
// // // // // // // // // // //             <Input
// // // // // // // // // // //               f={1}
// // // // // // // // // // //               h={45}
// // // // // // // // // // //               br="$10"
// // // // // // // // // // //               bg="rgba(255,255,255,0.03)"
// // // // // // // // // // //               color="white"
// // // // // // // // // // //               placeholder="Ask Finni AI..."
// // // // // // // // // // //               value={inputText}
// // // // // // // // // // //               onChangeText={setInputText}
// // // // // // // // // // //               disabled={isRecording}
// // // // // // // // // // //             />

// // // // // // // // // // //             <Button size="$4" br="$10" bg="#EAB308" onPress={() => handleSend()}>
// // // // // // // // // // //               <Send size={20} color="black" />
// // // // // // // // // // //             </Button>
// // // // // // // // // // //           </XStack>
// // // // // // // // // // //         </KeyboardAvoidingView>
// // // // // // // // // // //       </SafeAreaView>
// // // // // // // // // // //     </Theme>
// // // // // // // // // // //   );
// // // // // // // // // // // }




// // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // // // // // // // // // import { YStack, XStack, Text, Input, Button, Theme, Spinner, Circle } from 'tamagui';
// // // // // // // // // // import { Send, User, Bot, Mic, Square } from '@tamagui/lucide-icons';
// // // // // // // // // // import { Audio } from 'expo-av';
// // // // // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // // // // // // export default function ChatScreen() {
// // // // // // // // // //   const [messages, setMessages] = useState([
// // // // // // // // // //     { role: 'assistant', content: 'Protocol Active. How can I assist with your financial strategy?' }
// // // // // // // // // //   ]);
// // // // // // // // // //   const [inputText, setInputText] = useState('');
// // // // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // // // //   // --- 🎙️ MICROPHONE LOGIC ---
// // // // // // // // // //   const [recording, setRecording] = useState(null);
// // // // // // // // // //   const [isRecording, setIsRecording] = useState(false);
// // // // // // // // // //   const [permissionResponse, requestPermission] = Audio.usePermissions();

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     // Initialize audio session for the app
// // // // // // // // // //     Audio.setAudioModeAsync({
// // // // // // // // // //       allowsRecordingIOS: true,
// // // // // // // // // //       playsInSilentModeIOS: true,
// // // // // // // // // //     });
// // // // // // // // // //   }, []);

// // // // // // // // // //   const startRecording = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       if (permissionResponse.status !== 'granted') {
// // // // // // // // // //         await requestPermission();
// // // // // // // // // //       }
// // // // // // // // // //       await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      
// // // // // // // // // //       const { recording } = await Audio.Recording.createAsync(
// // // // // // // // // //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// // // // // // // // // //       );
// // // // // // // // // //       setRecording(recording);
// // // // // // // // // //       setIsRecording(true);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Failed to start recording', err);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const stopRecording = async () => {
// // // // // // // // // //     setIsRecording(false);
// // // // // // // // // //     try {
// // // // // // // // // //       await recording.stopAndUnloadAsync();
// // // // // // // // // //       const uri = recording.getURI();
// // // // // // // // // //       setRecording(null);
// // // // // // // // // //       // Logic to send 'uri' to your FastAPI backend would go here
// // // // // // // // // //       handleSend("Voice data captured.");
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('Failed to stop recording', err);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleSend = (text) => {
// // // // // // // // // //     const content = text || inputText;
// // // // // // // // // //     if (!content.trim()) return;

// // // // // // // // // //     setMessages([...messages, { role: 'user', content }]);
// // // // // // // // // //     setInputText('');
// // // // // // // // // //     setLoading(true);

// // // // // // // // // //     // Simulate Backend AI Response
// // // // // // // // // //     setTimeout(() => {
// // // // // // // // // //       setMessages(prev => [...prev, { role: 'assistant', content: 'Processing financial request...' }]);
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //     }, 1200);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <Theme name="dark">
// // // // // // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // // // // // // // //         <KeyboardAvoidingView 
// // // // // // // // // //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
// // // // // // // // // //           style={{ flex: 1 }}
// // // // // // // // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // // // // // // // // //         >
// // // // // // // // // //           {/* MESSAGE LIST */}
// // // // // // // // // //           <ScrollView 
// // // // // // // // // //             contentContainerStyle={{ 
// // // // // // // // // //               padding: 20, 
// // // // // // // // // //               paddingBottom: 120 // Space for the floating navbar
// // // // // // // // // //             }}
// // // // // // // // // //           >
// // // // // // // // // //             <YStack space="$4">
// // // // // // // // // //               {messages.map((msg, i) => (
// // // // // // // // // //                 <XStack key={i} space="$3" jc={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// // // // // // // // // //                   {msg.role === 'assistant' && (
// // // // // // // // // //                     <Circle size={32} bg="$gold3" ai="center" jc="center">
// // // // // // // // // //                       <Bot size={16} color="black" />
// // // // // // // // // //                     </Circle>
// // // // // // // // // //                   )}
// // // // // // // // // //                   <YStack 
// // // // // // // // // //                     p="$3" 
// // // // // // // // // //                     br="$4" 
// // // // // // // // // //                     maxW="80%" 
// // // // // // // // // //                     bg={msg.role === 'user' ? '#EAB308' : 'rgba(255,255,255,0.05)'}
// // // // // // // // // //                     bc={msg.role === 'user' ? 'transparent' : 'rgba(255,255,255,0.1)'}
// // // // // // // // // //                     bw={1}
// // // // // // // // // //                   >
// // // // // // // // // //                     <Text color={msg.role === 'user' ? 'black' : 'white'} fontSize={14}>
// // // // // // // // // //                       {msg.content}
// // // // // // // // // //                     </Text>
// // // // // // // // // //                   </YStack>
// // // // // // // // // //                   {msg.role === 'user' && (
// // // // // // // // // //                     <Circle size={32} bg="$gray8" ai="center" jc="center">
// // // // // // // // // //                       <User size={16} color="white" />
// // // // // // // // // //                     </Circle>
// // // // // // // // // //                   )}
// // // // // // // // // //                 </XStack>
// // // // // // // // // //               ))}
// // // // // // // // // //               {loading && <Spinner size="small" color="$gold3" mt="$2" />}
// // // // // // // // // //             </YStack>
// // // // // // // // // //           </ScrollView>

// // // // // // // // // //           {/* INPUT AREA (Above the Navbar) */}
// // // // // // // // // //           <XStack 
// // // // // // // // // //             p="$4" 
// // // // // // // // // //             space="$2" 
// // // // // // // // // //             ai="center" 
// // // // // // // // // //             bg="#000" 
// // // // // // // // // //             bc="rgba(255,255,255,0.05)" 
// // // // // // // // // //             bt={1}
// // // // // // // // // //             pb={Platform.OS === 'ios' ? 20 : 10}

// // // // // // // // // //           >
// // // // // // // // // //             <Button
// // // // // // // // // //               size="$4"
// // // // // // // // // //               br="$10"
// // // // // // // // // //               bg={isRecording ? '$red9' : 'rgba(255,255,255,0.05)'}
// // // // // // // // // //               mt={150}
// // // // // // // // // //               onPress={isRecording ? stopRecording : startRecording}
// // // // // // // // // //             >
// // // // // // // // // //               {isRecording ? <Square size={18} color="white" /> : <Mic size={18} color="#EAB308" />}
// // // // // // // // // //             </Button>
            
// // // // // // // // // //             <Input
// // // // // // // // // //               f={1}
// // // // // // // // // //               h={45}
// // // // // // // // // //               br="$10"
// // // // // // // // // //               bg="rgba(255,255,255,0.03)"
// // // // // // // // // //               color="white"
// // // // // // // // // //               placeholder="Message Finni..."
// // // // // // // // // //               value={inputText}
// // // // // // // // // //               onChangeText={setInputText}
// // // // // // // // // //               disabled={isRecording}
// // // // // // // // // //             />

// // // // // // // // // //             <Button size="$4" br="$10" bg="#EAB308" onPress={() => handleSend()}>
// // // // // // // // // //               <Send size={18} color="black" />
// // // // // // // // // //             </Button>
// // // // // // // // // //           </XStack>
// // // // // // // // // //         </KeyboardAvoidingView>
// // // // // // // // // //       </SafeAreaView>
// // // // // // // // // //     </Theme>
// // // // // // // // // //   );
// // // // // // // // // // }




// // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // // // // // // // // import { YStack, XStack, Text, Input, Button, Theme, Spinner, Circle } from 'tamagui';
// // // // // // // // // import { Send, User, Bot, Mic, Square } from '@tamagui/lucide-icons';
// // // // // // // // // import { Audio } from 'expo-av';
// // // // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // // // // // export default function ChatScreen() {
// // // // // // // // //   const [messages, setMessages] = useState([
// // // // // // // // //     { role: 'assistant', content: 'Protocol Active. How can I assist with your financial strategy?' }
// // // // // // // // //   ]);
// // // // // // // // //   const [inputText, setInputText] = useState('');
// // // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // // //   // --- 🎙️ MICROPHONE STATE ---
// // // // // // // // //   const [recording, setRecording] = useState(null);
// // // // // // // // //   const [isRecording, setIsRecording] = useState(false);
// // // // // // // // //   const [permissionResponse, requestPermission] = Audio.usePermissions();

// // // // // // // // //   // 1. Initialize Audio Mode and Cleanup on Unmount
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     async function setup() {
// // // // // // // // //       await Audio.setAudioModeAsync({
// // // // // // // // //         allowsRecordingIOS: true,
// // // // // // // // //         playsInSilentModeIOS: true,
// // // // // // // // //       });
// // // // // // // // //     }
// // // // // // // // //     setup();

// // // // // // // // //     return () => {
// // // // // // // // //       // Emergency cleanup if user leaves screen while recording
// // // // // // // // //       if (recording) {
// // // // // // // // //         recording.unloadAsync();
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //   }, []);

// // // // // // // // //   // --- 🎙️ START RECORDING ---
// // // // // // // // //   const startRecording = async () => {
// // // // // // // // //     try {
// // // // // // // // //       // PRE-START CLEANUP: Prevent "Only one Recording object" error
// // // // // // // // //       if (recording) {
// // // // // // // // //         await recording.unloadAsync();
// // // // // // // // //         setRecording(null);
// // // // // // // // //       }

// // // // // // // // //       if (permissionResponse.status !== 'granted') {
// // // // // // // // //         const permission = await requestPermission();
// // // // // // // // //         if (permission.status !== 'granted') return;
// // // // // // // // //       }

// // // // // // // // //       await Audio.setAudioModeAsync({
// // // // // // // // //         allowsRecordingIOS: true,
// // // // // // // // //         playsInSilentModeIOS: true,
// // // // // // // // //       });

// // // // // // // // //       console.log('Starting Recording...');
// // // // // // // // //       const { recording: newRecording } = await Audio.Recording.createAsync(
// // // // // // // // //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// // // // // // // // //       );
      
// // // // // // // // //       setRecording(newRecording);
// // // // // // // // //       setIsRecording(true);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error('Failed to start recording', err);
// // // // // // // // //       setRecording(null);
// // // // // // // // //       setIsRecording(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // --- 🎙️ STOP RECORDING ---
// // // // // // // // //   const stopRecording = async () => {
// // // // // // // // //     if (!recording) return;

// // // // // // // // //     setIsRecording(false);
// // // // // // // // //     try {
// // // // // // // // //       console.log('Stopping and Unloading...');
// // // // // // // // //       await recording.stopAndUnloadAsync();
// // // // // // // // //       const uri = recording.getURI();
      
// // // // // // // // //       // RESET: Allow the next recording to start fresh
// // // // // // // // //       setRecording(null);
      
// // // // // // // // //       console.log('Voice file saved at:', uri);
// // // // // // // // //       // Here: Send the URI to your FastAPI backend
// // // // // // // // //       handleSend("Voice command captured.");
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error('Failed to stop recording', err);
// // // // // // // // //       setRecording(null);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleSend = (text) => {
// // // // // // // // //     const content = text || inputText;
// // // // // // // // //     if (!content.trim()) return;

// // // // // // // // //     setMessages(prev => [...prev, { role: 'user', content }]);
// // // // // // // // //     setInputText('');
// // // // // // // // //     setLoading(true);

// // // // // // // // //     // Simulate Backend Response
// // // // // // // // //     setTimeout(() => {
// // // // // // // // //       setMessages(prev => [...prev, { role: 'assistant', content: 'Analyzing your request...' }]);
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }, 1200);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <Theme name="dark">
// // // // // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // // // // // // //         <KeyboardAvoidingView 
// // // // // // // // //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
// // // // // // // // //           style={{ flex: 1 }}
// // // // // // // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // // // // // // // //         >
// // // // // // // // //           {/* MESSAGES VIEW */}
// // // // // // // // //           <ScrollView 
// // // // // // // // //             contentContainerStyle={{ 
// // // // // // // // //               padding: 20, 
// // // // // // // // //               paddingBottom: 130 // Ensures messages aren't hidden by the floating navbar
// // // // // // // // //             }}
// // // // // // // // //           >
// // // // // // // // //             <YStack space="$4">
// // // // // // // // //               {messages.map((msg, i) => (
// // // // // // // // //                 <XStack key={i} space="$3" jc={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// // // // // // // // //                   {msg.role === 'assistant' && (
// // // // // // // // //                     <Circle size={32} bg="$gold3" ai="center" jc="center">
// // // // // // // // //                       <Bot size={16} color="black" />
// // // // // // // // //                     </Circle>
// // // // // // // // //                   )}
// // // // // // // // //                   <YStack 
// // // // // // // // //                     p="$3" 
// // // // // // // // //                     br="$4" 
// // // // // // // // //                     maxW="80%" 
// // // // // // // // //                     bg={msg.role === 'user' ? '#EAB308' : 'rgba(255,255,255,0.05)'}
// // // // // // // // //                     bc={msg.role === 'user' ? 'transparent' : 'rgba(255,255,255,0.1)'}
// // // // // // // // //                     bw={1}
// // // // // // // // //                   >
// // // // // // // // //                     <Text color={msg.role === 'user' ? 'black' : 'white'} fontSize={14}>
// // // // // // // // //                       {msg.content}
// // // // // // // // //                     </Text>
// // // // // // // // //                   </YStack>
// // // // // // // // //                   {msg.role === 'user' && (
// // // // // // // // //                     <Circle size={32} bg="$gray8" ai="center" jc="center">
// // // // // // // // //                       <User size={16} color="white" />
// // // // // // // // //                     </Circle>
// // // // // // // // //                   )}
// // // // // // // // //                 </XStack>
// // // // // // // // //               ))}
// // // // // // // // //               {loading && <Spinner size="small" color="$gold3" mt="$2" />}
// // // // // // // // //             </YStack>
// // // // // // // // //           </ScrollView>

// // // // // // // // //           {/* CHAT INPUT AREA */}
// // // // // // // // //           <XStack 
// // // // // // // // //             p="$4" 
// // // // // // // // //             space="$2" 
// // // // // // // // //             ai="center" 
// // // // // // // // //             bg="#000" 
// // // // // // // // //             bc="rgba(255,255,255,0.05)" 
// // // // // // // // //             bt={1}
// // // // // // // // //             pb={Platform.OS === 'ios' ? 20 : 10}
// // // // // // // // //           >
// // // // // // // // //             <Button
// // // // // // // // //               size="$4"
// // // // // // // // //               br="$10"
// // // // // // // // //               bg={isRecording ? '$red9' : 'rgba(255,255,255,0.05)'}
// // // // // // // // //               onPress={isRecording ? stopRecording : startRecording}
// // // // // // // // //             >
// // // // // // // // //               {isRecording ? <Square size={18} color="white" /> : <Mic size={18} color="#EAB308" />}
// // // // // // // // //             </Button>
            
// // // // // // // // //             <Input
// // // // // // // // //               f={1}
// // // // // // // // //               h={45}
// // // // // // // // //               br="$10"
// // // // // // // // //               bg="rgba(255,255,255,0.03)"
// // // // // // // // //               color="white"
// // // // // // // // //               placeholder="Message Finni..."
// // // // // // // // //               value={inputText}
// // // // // // // // //               onChangeText={setInputText}
// // // // // // // // //               disabled={isRecording}
// // // // // // // // //             />

// // // // // // // // //             <Button size="$4" br="$10" bg="#EAB308" onPress={() => handleSend()}>
// // // // // // // // //               <Send size={18} color="black" />
// // // // // // // // //             </Button>
// // // // // // // // //           </XStack>
// // // // // // // // //         </KeyboardAvoidingView>
// // // // // // // // //       </SafeAreaView>
// // // // // // // // //     </Theme>
// // // // // // // // //   );
// // // // // // // // // }


// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // // // // // // // import { YStack, XStack, Text, Input, Button, Theme, Spinner, Circle } from 'tamagui';
// // // // // // // // import { Send, User, Bot, Mic, MicOff } from '@tamagui/lucide-icons';
// // // // // // // // import Voice from '@react-native-voice/voice'; // Native Voice Engine
// // // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // // // // export default function ChatScreen() {
// // // // // // // //   const [messages, setMessages] = useState([{ role: 'assistant', content: 'Protocol Active. Tap the mic to speak.' }]);
// // // // // // // //   const [inputText, setInputText] = useState('');
// // // // // // // //   const [isListening, setIsListening] = useState(false);
// // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // //   useEffect(() => {
// // // // // // // //     // Set up listeners for the Native Voice engine
// // // // // // // //     Voice.onSpeechStart = () => setIsListening(true);
// // // // // // // //     Voice.onSpeechEnd = () => setIsListening(false);
// // // // // // // //     Voice.onSpeechResults = (e) => {
// // // // // // // //       // e.value is an array of what the phone thinks you said
// // // // // // // //       if (e.value && e.value[0]) {
// // // // // // // //         setInputText(e.value[0]); 
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     return () => {
// // // // // // // //       // Cleanup when you leave the screen
// // // // // // // //       Voice.destroy().then(Voice.removeAllListeners);
// // // // // // // //     };
// // // // // // // //   }, []);

// // // // // // // //   const toggleListening = async () => {
// // // // // // // //     try {
// // // // // // // //       if (isListening) {
// // // // // // // //         await Voice.stop();
// // // // // // // //         setIsListening(false);
// // // // // // // //       } else {
// // // // // // // //         setInputText(''); // Clear input for new speech
// // // // // // // //         await Voice.start('en-US'); // Start listening in English
// // // // // // // //       }
// // // // // // // //     } catch (e) {
// // // // // // // //       console.error("Voice Error:", e);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSend = () => {
// // // // // // // //     if (!inputText.trim()) return;
// // // // // // // //     setMessages([...messages, { role: 'user', content: inputText }]);
// // // // // // // //     setInputText('');
// // // // // // // //     setLoading(true);
// // // // // // // //     // Call your AI text-only API here
// // // // // // // //     setTimeout(() => setLoading(false), 1000);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <Theme name="dark">
// // // // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // // // // // //         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          
// // // // // // // //           <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 130 }}>
// // // // // // // //             <YStack space="$4">
// // // // // // // //               {messages.map((msg, i) => (
// // // // // // // //                 <XStack key={i} space="$3" jc={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// // // // // // // //                   {msg.role === 'assistant' && <Circle size={32} bg="$gold3" ai="center" jc="center"><Bot size={16} color="black" /></Circle>}
// // // // // // // //                   <YStack p="$3" br="$4" maxW="80%" bg={msg.role === 'user' ? '#EAB308' : 'rgba(255,255,255,0.05)'} bc="rgba(255,255,255,0.1)" bw={1}>
// // // // // // // //                     <Text color={msg.role === 'user' ? 'black' : 'white'} fontSize={14}>{msg.content}</Text>
// // // // // // // //                   </YStack>
// // // // // // // //                 </XStack>
// // // // // // // //               ))}
// // // // // // // //               {loading && <Spinner color="$gold3" />}
// // // // // // // //             </YStack>
// // // // // // // //           </ScrollView>

// // // // // // // //           {/* INPUT BAR */}
// // // // // // // //           <XStack p="$4" space="$2" ai="center" bg="#000" bc="rgba(255,255,255,0.05)" bt={1}>
// // // // // // // //             <Button
// // // // // // // //               size="$4" br="$10"
// // // // // // // //               bg={isListening ? '$red9' : 'rgba(255,255,255,0.1)'}
// // // // // // // //               onPress={toggleListening}
// // // // // // // //             >
// // // // // // // //               {isListening ? <MicOff size={20} color="white" /> : <Mic size={20} color="#EAB308" />}
// // // // // // // //             </Button>
            
// // // // // // // //             <Input
// // // // // // // //               f={1} h={45} br="$10" bg="rgba(255,255,255,0.03)" color="white"
// // // // // // // //               placeholder={isListening ? "Listening..." : "Message Finni..."}
// // // // // // // //               value={inputText}
// // // // // // // //               onChangeText={setInputText}
// // // // // // // //             />

// // // // // // // //             <Button size="$4" br="$10" bg="#EAB308" onPress={handleSend}>
// // // // // // // //               <Send size={18} color="black" />
// // // // // // // //             </Button>
// // // // // // // //           </XStack>
// // // // // // // //         </KeyboardAvoidingView>
// // // // // // // //       </SafeAreaView>
// // // // // // // //     </Theme>
// // // // // // // //   );
// // // // // // // // }


// // // // // // // import React, { useState } from 'react';
// // // // // // // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // // // // // // import { YStack, XStack, Text, Input, Button, Theme, Circle } from 'tamagui';
// // // // // // // import { Send, User, Bot, Mic } from '@tamagui/lucide-icons';
// // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // // // export default function ChatScreen() {
// // // // // // //   const [messages, setMessages] = useState([
// // // // // // //     { role: 'assistant', content: 'Protocol Active. Tap the mic icon on your keyboard or the button below to dictate.' }
// // // // // // //   ]);
// // // // // // //   const [inputText, setInputText] = useState('');
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   const handleSend = () => {
// // // // // // //     if (!inputText.trim()) return;

// // // // // // //     const newMsg = { role: 'user', content: inputText };
// // // // // // //     setMessages(prev => [...prev, newMsg]);
// // // // // // //     setInputText('');
// // // // // // //     setLoading(true);

// // // // // // //     // Send only the TEXT to your FastAPI backend
// // // // // // //     // No audio files needed!
// // // // // // //     setTimeout(() => {
// // // // // // //       setMessages(prev => [...prev, { role: 'assistant', content: 'Strategy analyzed based on your input.' }]);
// // // // // // //       setLoading(false);
// // // // // // //     }, 1000);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Theme name="dark">
// // // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // // // // //         <KeyboardAvoidingView 
// // // // // // //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
// // // // // // //           style={{ flex: 1 }}
// // // // // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // // // // // //         >
// // // // // // //           {/* MESSAGES */}
// // // // // // //           <ScrollView 
// // // // // // //             contentContainerStyle={{ padding: 20, paddingBottom: 130 }}
// // // // // // //             showsVerticalScrollIndicator={false}
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
// // // // // // //                     p="$3" br="$4" maxW="80%" 
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
// // // // // // //             </YStack>
// // // // // // //           </ScrollView>

// // // // // // //           {/* NATIVE STYLE INPUT AREA */}
// // // // // // //           <XStack 
// // // // // // //             p="$4" space="$2" ai="center" bg="#000" 
// // // // // // //             bc="rgba(255,255,255,0.05)" bt={1}
// // // // // // //             pb={Platform.OS === 'ios' ? 20 : 10}
// // // // // // //           >
// // // // // // //             {/* In Native Dictation, we don't need a separate recording state. 
// // // // // // //                The user simply taps the input, and the keyboard's own 
// // // // // // //                microphone handles the conversion for free.
// // // // // // //             */}
// // // // // // //             <Input
// // // // // // //               f={1} h={48} br="$10"
// // // // // // //               bg="rgba(255,255,255,0.03)"
// // // // // // //               color="white"
// // // // // // //               placeholder="Tap to type or use keyboard mic..."
// // // // // // //               value={inputText}
// // // // // // //               onChangeText={setInputText}
// // // // // // //               // This triggers the native "Dictation" button on most keyboards
// // // // // // //               returnKeyType="send"
// // // // // // //               onSubmitEditing={handleSend}
// // // // // // //             />

// // // // // // //             <Button 
// // // // // // //               size="$4" br="$10" bg="#EAB308" 
// // // // // // //               onPress={handleSend}
// // // // // // //               disabled={!inputText.trim()}
// // // // // // //               opacity={!inputText.trim() ? 0.5 : 1}
// // // // // // //             >
// // // // // // //               <Send size={18} color="black" />
// // // // // // //             </Button>
// // // // // // //           </XStack>
// // // // // // //         </KeyboardAvoidingView>
// // // // // // //       </SafeAreaView>
// // // // // // //     </Theme>
// // // // // // //   );
// // // // // // // }



// // // // // // import React, { useState } from 'react';
// // // // // // import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // // // // // import { YStack, XStack, Text, Input, Button, Theme, Circle } from 'tamagui';
// // // // // // import { Send, User, Bot, Mic } from '@tamagui/lucide-icons';
// // // // // // import * as SpeechRecognition from 'expo-speech-recognition'; // The Expo-safe way
// // // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // // export default function ChatScreen() {
// // // // // //   const [messages, setMessages] = useState([
// // // // // //     { role: 'assistant', content: 'Protocol Active. Tap the Mic button to dictate your strategy.' }
// // // // // //   ]);
// // // // // //   const [inputText, setInputText] = useState('');
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   // --- 🎙️ NATIVE VOICE BUTTON LOGIC ---
// // // // // //   const startNativeDictation = async () => {
// // // // // //     try {
// // // // // //       // 1. Request Permission
// // // // // //       const result = await SpeechRecognition.requestPermissionsAsync();
// // // // // //       if (!result.granted) return;

// // // // // //       // 2. Start System UI (This is what 'Other Apps' do)
// // // // // //       // This opens the native listening card at the bottom of the screen
// // // // // //       const speech = await SpeechRecognition.startAsync({
// // // // // //         lang: 'en-US',
// // // // // //         interimResults: true, // Show text as you speak
// // // // // //       });

// // // // // //       // 3. Handle the result
// // // // // //       if (speech.results && speech.results[0]) {
// // // // // //         setInputText(speech.results[0].transcript);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Native Voice Error:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSend = () => {
// // // // // //     if (!inputText.trim()) return;
// // // // // //     setMessages(prev => [...prev, { role: 'user', content: inputText }]);
// // // // // //     setInputText('');
// // // // // //     setLoading(true);
// // // // // //     // AI fetch logic here...
// // // // // //     setTimeout(() => setLoading(false), 1000);
// // // // // //   };

// // // // // //   return (
// // // // // //     <Theme name="dark">
// // // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // // // //         <KeyboardAvoidingView 
// // // // // //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
// // // // // //           style={{ flex: 1 }}
// // // // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // // // // //         >
// // // // // //           {/* CHAT MESSAGES */}
// // // // // //           <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 130 }}>
// // // // // //             <YStack space="$4">
// // // // // //               {messages.map((msg, i) => (
// // // // // //                 <XStack key={i} space="$3" jc={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// // // // // //                   {msg.role === 'assistant' && (
// // // // // //                     <Circle size={32} bg="$gold3" ai="center" jc="center"><Bot size={16} color="black" /></Circle>
// // // // // //                   )}
// // // // // //                   <YStack p="$3" br="$4" maxW="80%" bg={msg.role === 'user' ? '#EAB308' : '#222'} bc="rgba(255,255,255,0.1)" bw={1}>
// // // // // //                     <Text color={msg.role === 'user' ? 'black' : 'white'} fontSize={14}>{msg.content}</Text>
// // // // // //                   </YStack>
// // // // // //                   {msg.role === 'user' && (
// // // // // //                     <Circle size={32} bg="$gray8" ai="center" jc="center"><User size={16} color="white" /></Circle>
// // // // // //                   )}
// // // // // //                 </XStack>
// // // // // //               ))}
// // // // // //             </YStack>
// // // // // //           </ScrollView>

// // // // // //           {/* INPUT AREA WITH DEDICATED MIC BUTTON */}
// // // // // //           <XStack p="$4" space="$2" ai="center" bg="#000" bc="rgba(255,255,255,0.05)" bt={1} pb={Platform.OS === 'ios' ? 20 : 10}>
            
// // // // // //             {/* THIS IS THE BUTTON YOU WANTED */}
// // // // // //             <Button
// // // // // //               size="$4"
// // // // // //               br="$10"
// // // // // //               bg="rgba(254, 179, 8, 0.15)"
// // // // // //               onPress={startNativeDictation}
// // // // // //               borderColor="$gold8"
// // // // // //               bw={1}
// // // // // //             >
// // // // // //               <Mic size={20} color="#EAB308" />
// // // // // //             </Button>
            
// // // // // //             <Input
// // // // // //               f={1} h={48} br="$10" bg="rgba(255,255,255,0.03)" color="white"
// // // // // //               placeholder="Message Finni..."
// // // // // //               value={inputText}
// // // // // //               onChangeText={setInputText}
// // // // // //             />

// // // // // //             <Button size="$4" br="$10" bg="#EAB308" onPress={handleSend}>
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
// // // // // import { YStack, XStack, Text, Input, Button, Theme, Circle } from 'tamagui';
// // // // // import { Send, Mic, MicOff, Bot, User } from '@tamagui/lucide-icons';
// // // // // import Voice from '@react-native-voice/voice';
// // // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // // export default function ChatScreen() {
// // // // //   const [inputText, setInputText] = useState('');
// // // // //   const [isListening, setIsListening] = useState(false);
// // // // //   const [messages, setMessages] = useState([{ role: 'assistant', content: 'Native Dictation Active.' }]);

// // // // //   useEffect(() => {
// // // // //     // Bind native events
// // // // //     Voice.onSpeechStart = () => setIsListening(true);
// // // // //     Voice.onSpeechEnd = () => setIsListening(false);
// // // // //     Voice.onSpeechResults = (e) => {
// // // // //       if (e.value && e.value[0]) {
// // // // //         setInputText(e.value[0]); // Text appears in input instantly
// // // // //       }
// // // // //     };
// // // // //     Voice.onSpeechError = (e) => {
// // // // //       console.error("Native Voice Error:", e);
// // // // //       setIsListening(false);
// // // // //     };

// // // // //     return () => {
// // // // //       Voice.destroy().then(Voice.removeAllListeners);
// // // // //     };
// // // // //   }, []);

// // // // //   const startDictation = async () => {
// // // // //     try {
// // // // //       setInputText('');
// // // // //       await Voice.start('en-US');
// // // // //     } catch (e) {
// // // // //       console.error(e);
// // // // //     }
// // // // //   };

// // // // //   const stopDictation = async () => {
// // // // //     try {
// // // // //       await Voice.stop();
// // // // //       setIsListening(false);
// // // // //     } catch (e) {
// // // // //       console.error(e);
// // // // //     }
// // // // //   };

// // // // //   const handleSend = () => {
// // // // //     if (!inputText.trim()) return;
// // // // //     setMessages([...messages, { role: 'user', content: inputText }]);
// // // // //     setInputText('');
// // // // //   };

// // // // //   return (
// // // // //     <Theme name="dark">
// // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // // //         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
// // // // //           <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 150 }}>
// // // // //             {messages.map((m, i) => (
// // // // //               <XStack key={i} jc={m.role === 'user' ? 'flex-end' : 'flex-start'} mb="$4">
// // // // //                 <Text p="$3" br="$4" bg={m.role === 'user' ? '#EAB308' : '#222'} color={m.role === 'user' ? '#000' : '#fff'}>
// // // // //                   {m.content}
// // // // //                 </Text>
// // // // //               </XStack>
// // // // //             ))}
// // // // //           </ScrollView>

// // // // //           <XStack p="$4" space="$2" ai="center" bg="#080808" bc="#222" bt={1} pb={40}>
// // // // //             <Button 
// // // // //               circular size="$5" 
// // // // //               bg={isListening ? '$red9' : 'rgba(234, 179, 8, 0.1)'} 
// // // // //               onPress={isListening ? stopDictation : startDictation}
// // // // //               borderColor="$gold8" bw={1}
// // // // //             >
// // // // //               {isListening ? <MicOff size={20} color="white" /> : <Mic size={20} color="#EAB308" />}
// // // // //             </Button>
            
// // // // //             <Input 
// // // // //               f={1} h={50} br="$10" bg="#111" color="white"
// // // // //               placeholder={isListening ? "Listening..." : "Message Finni..."}
// // // // //               value={inputText}
// // // // //               onChangeText={setInputText}
// // // // //             />

// // // // //             <Button circular bg="$gold10" onPress={handleSend}>
// // // // //               <Send size={18} color="black" />
// // // // //             </Button>
// // // // //           </XStack>
// // // // //         </KeyboardAvoidingView>
// // // // //       </SafeAreaView>
// // // // //     </Theme>
// // // // //   );
// // // // // }





// // // // import React, { useState, useEffect } from 'react';
// // // // import { KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
// // // // import { YStack, XStack, Text, Input, Button, Theme, Circle } from 'tamagui';
// // // // import { Send, Mic, MicOff, Bot, User } from '@tamagui/lucide-icons';
// // // // import Voice from '@react-native-voice/voice';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // export default function ChatScreen() {
// // // //   const [inputText, setInputText] = useState('');
// // // //   const [isListening, setIsListening] = useState(false);
// // // //   const [messages, setMessages] = useState([
// // // //     { role: 'assistant', content: 'Native Dictation Protocol Online. How can I help with your finances?' }
// // // //   ]);

// // // //   useEffect(() => {
// // // //     // 1. Setup Native Voice Listeners
// // // //     Voice.onSpeechStart = () => setIsListening(true);
// // // //     Voice.onSpeechEnd = () => setIsListening(false);
    
// // // //     Voice.onSpeechResults = (e) => {
// // // //       // This is called as the phone recognizes words
// // // //       if (e.value && e.value[0]) {
// // // //         setInputText(e.value[0]);
// // // //       }
// // // //     };

// // // //     Voice.onSpeechError = (e) => {
// // // //       console.error("Native Voice Error:", e);
// // // //       setIsListening(false);
// // // //       // Handle common errors like "No match"
// // // //       if (e.error?.message?.includes("No match")) {
// // // //          console.log("No speech detected.");
// // // //       }
// // // //     };

// // // //     return () => {
// // // //       // 2. Important Cleanup
// // // //       Voice.destroy().then(Voice.removeAllListeners);
// // // //     };
// // // //   }, []);

// // // //   // --- 🎙️ TRIGGER NATIVE DICTATION ---
// // // //   const startListening = async () => {
// // // //     try {
// // // //       setInputText(''); // Clear box for new dictation
// // // //       await Voice.start('en-US'); // Start the system listener
// // // //     } catch (e) {
// // // //       console.error(e);
// // // //       Alert.alert("Error", "Could not start voice recognition.");
// // // //     }
// // // //   };

// // // //   const stopListening = async () => {
// // // //     try {
// // // //       await Voice.stop();
// // // //       setIsListening(false);
// // // //     } catch (e) {
// // // //       console.error(e);
// // // //     }
// // // //   };

// // // //   const handleSend = () => {
// // // //     if (!inputText.trim()) return;

// // // //     // Add user message to UI
// // // //     const userMsg = { role: 'user', content: inputText };
// // // //     setMessages(prev => [...prev, userMsg]);
    
// // // //     const textToProcess = inputText;
// // // //     setInputText('');

// // // //     // --- 🐍 CALL YOUR BACKEND ---
// // // //     // Since we now have TEXT, we just send a simple JSON request
// // // //     // No more multipart/form-data or audio files!
// // // //     processChat(textToProcess);
// // // //   };

// // // //   const processChat = async (text) => {
// // // //     try {
// // // //       // Placeholder for your FastAPI call:
// // // //       // const res = await axios.post('/api/v1/chat', { message: text });
// // // //       // setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
      
// // // //       console.log("Sending to Backend:", text);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // // //         <KeyboardAvoidingView 
// // // //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
// // // //           style={{ flex: 1 }}
// // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
// // // //         >
// // // //           {/* MESSAGES LIST */}
// // // //           <ScrollView 
// // // //             contentContainerStyle={{ padding: 20, paddingBottom: 150 }}
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

// // // //           {/* INPUT AREA WITH NATIVE MIC BUTTON */}
// // // //           <XStack 
// // // //             p="$4" space="$2" ai="center" bg="#000" 
// // // //             bc="rgba(255,255,255,0.05)" bt={1}
// // // //             pb={Platform.OS === 'ios' ? 20 : 10}
// // // //           >
// // // //             <Button
// // // //               size="$4"
// // // //               br="$10"
// // // //               bg={isListening ? '$red9' : 'rgba(234, 179, 8, 0.15)'}
// // // //               onPress={isListening ? stopListening : startListening}
// // // //               borderColor={isListening ? '$red10' : '$gold8'}
// // // //               bw={1}
// // // //             >
// // // //               {isListening ? <MicOff size={20} color="white" /> : <Mic size={20} color="#EAB308" />}
// // // //             </Button>
            
// // // //             <Input
// // // //               f={1} h={48} br="$10"
// // // //               bg="rgba(255,255,255,0.03)"
// // // //               color="white"
// // // //               placeholder={isListening ? "Listening..." : "Ask Finni AI..."}
// // // //               value={inputText}
// // // //               onChangeText={setInputText}
// // // //             />

// // // //             <Button 
// // // //               size="$4" br="$10" bg="#EAB308" 
// // // //               onPress={handleSend}
// // // //               disabled={!inputText.trim()}
// // // //             >
// // // //               <Send size={18} color="black" />
// // // //             </Button>
// // // //           </XStack>
// // // //         </KeyboardAvoidingView>
// // // //       </SafeAreaView>
// // // //     </Theme>
// // // //   );
// // // // }


// // // import React, { useState, useEffect } from 'react';
// // // import { KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
// // // import { YStack, XStack, Text, Input, Button, Theme, Circle } from 'tamagui';
// // // import { Send, Mic, MicOff, Bot, User } from '@tamagui/lucide-icons';
// // // import Voice from '@react-native-voice/voice';
// // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // export default function ChatScreen() {
// // //   const [inputText, setInputText] = useState('');
// // //   const [isListening, setIsListening] = useState(false);
// // //   const [messages, setMessages] = useState([{ role: 'assistant', content: 'Chat System Ready.' }]);

// // //   useEffect(() => {
// // //     // Setup listeners
// // //     Voice.onSpeechStart = () => setIsListening(true);
// // //     Voice.onSpeechEnd = () => setIsListening(false);
// // //     Voice.onSpeechResults = (e) => {
// // //       if (e.value && e.value[0]) setInputText(e.value[0]);
// // //     };
// // //     Voice.onSpeechError = (e) => {
// // //       console.error("Speech Error:", e);
// // //       setIsListening(false);
// // //     };

// // //     return () => {
// // //       Voice.destroy().then(Voice.removeAllListeners);
// // //     };
// // //   }, []);

// // //   const startListening = async () => {
// // //     // SAFETY CHECK: This prevents the 'startSpeech of null' crash
// // //     if (!Voice || typeof Voice.start !== 'function') {
// // //       Alert.alert(
// // //         "Native Module Missing", 
// // //         "The voice driver is not installed. You must run 'npx expo run:android' successfully once."
// // //       );
// // //       return;
// // //     }

// // //     try {
// // //       await Voice.start('en-US');
// // //     } catch (e) {
// // //       console.error(e);
// // //     }
// // //   };

// // //   const stopListening = async () => {
// // //     try {
// // //       await Voice.stop();
// // //       setIsListening(false);
// // //     } catch (e) { console.error(e); }
// // //   };

// // //   const handleSend = () => {
// // //     if (!inputText.trim()) return;
// // //     setMessages(prev => [...prev, { role: 'user', content: inputText }]);
// // //     setInputText('');
// // //   };

// // //   return (
// // //     <Theme name="dark">
// // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
// // //         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
// // //           <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 150 }}>
// // //             {messages.map((m, i) => (
// // //               <XStack key={i} jc={m.role === 'user' ? 'flex-end' : 'flex-start'} mb="$4">
// // //                 <Text p="$3" br="$4" bg={m.role === 'user' ? '#EAB308' : '#222'} color={m.role === 'user' ? '#000' : '#fff'}>
// // //                   {m.content}
// // //                 </Text>
// // //               </XStack>
// // //             ))}
// // //           </ScrollView>

// // //           <XStack p="$4" space="$2" ai="center" bg="#080808" bc="#222" bt={1} pb={40}>
// // //             <Button 
// // //               circular size="$5" 
// // //               bg={isListening ? '$red9' : 'rgba(234, 179, 8, 0.1)'} 
// // //               onPress={isListening ? stopListening : startListening}
// // //               borderColor="$gold8" bw={1}
// // //             >
// // //               {isListening ? <MicOff size={20} color="white" /> : <Mic size={20} color="#EAB308" />}
// // //             </Button>
            
// // //             <Input 
// // //               f={1} h={50} br="$10" bg="#111" color="white"
// // //               placeholder={isListening ? "Listening..." : "Message Finni..."}
// // //               value={inputText}
// // //               onChangeText={setInputText}
// // //             />

// // //             <Button circular bg="$gold10" onPress={handleSend}>
// // //               <Send size={18} color="black" />
// // //             </Button>
// // //           </XStack>
// // //         </KeyboardAvoidingView>
// // //       </SafeAreaView>
// // //     </Theme>
// // //   );
// // // }



// // // import React, { useState, useEffect, useRef } from 'react';
// // // import {
// // //   KeyboardAvoidingView,
// // //   Platform,
// // //   ScrollView,
// // //   TouchableOpacity,
// // //   Dimensions,
// // // } from 'react-native';
// // // import {
// // //   YStack,
// // //   XStack,
// // //   Text,
// // //   Input,
// // //   Button,
// // //   Spinner,
// // //   Theme,
// // //   Circle,
// // //   Card,
// // // } from 'tamagui';
// // // import { LinearGradient } from 'expo-linear-gradient';
// // // import { 
// // //   Send, 
// // //   Cpu, 
// // //   User, 
// // //   Sparkles, 
// // //   ShieldCheck,
// // //   ChevronLeft 
// // // } from '@tamagui/lucide-icons';
// // // import { useRouter } from 'expo-router';
// // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // Services
// // // import { ApiService } from '../../../services/apiService';

// // // const { width } = Dimensions.get('window');

// // // export default function ChatWithAdvisor() {
// // //   const router = useRouter();
// // //   const scrollViewRef = useRef(null);
  
// // //   // --- STATE ---
// // //   const [messages, setMessages] = useState([
// // //     {
// // //       id: 'system-1',
// // //       role: 'ai',
// // //       content: 'FINNI AI Core online. Accessing verified ledger and investment signals. How can I assist your financial strategy today?',
// // //       timestamp: new Date().toISOString(),
// // //     }
// // //   ]);
// // //   const [inputText, setInputText] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [sessionId, setSessionId] = useState('string'); // Matches your API default

// // //   // --- ACTIONS ---
// // //   const handleSend = async () => {
// // //     if (!inputText.trim() || loading) return;

// // //     const userMessage = {
// // //       id: Date.now().toString(),
// // //       role: 'user',
// // //       content: inputText.trim(),
// // //       timestamp: new Date().toISOString(),
// // //     };

// // //     setMessages((prev) => [...prev, userMessage]);
// // //     setInputText('');
// // //     setLoading(true);

// // //     try {
// // //       // POST /api/v1/chat/
// // //       const res = await ApiService.post('/chat/', {
// // //         message: userMessage.content,
// // //         session_id: sessionId
// // //       });

// // //       const aiResponse = {
// // //         id: (Date.now() + 1).toString(),
// // //         role: 'ai',
// // //         content: res.data.response, // Extracts "response" key from your JSON
// // //         timestamp: new Date().toISOString(),
// // //       };

// // //       if (res.data.session_id) setSessionId(res.data.session_id);
// // //       setMessages((prev) => [...prev, aiResponse]);
      
// // //     } catch (error) {
// // //       console.error("Chat Error:", error);
// // //       setMessages((prev) => [...prev, {
// // //         id: 'error',
// // //         role: 'ai',
// // //         content: 'Connection to Financial Core interrupted. Please verify system status.',
// // //         timestamp: new Date().toISOString(),
// // //       }]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Auto-scroll to bottom
// // //   useEffect(() => {
// // //     setTimeout(() => {
// // //       scrollViewRef.current?.scrollToEnd({ animated: true });
// // //     }, 100);
// // //   }, [messages, loading]);

// // //   return (
// // //     <Theme name="dark">
// // //       <LinearGradient colors={['#000000', '#0A0A0A']} style={{ flex: 1 }}>
// // //         <SafeAreaView style={{ flex: 1 }}>
          
// // //           {/* HEADER: PROTOCOL STATUS */}
// // //           <XStack p="$4" jc="space-between" ai="center" borderBottomWidth={1} bc="rgba(255,255,255,0.05)">
// // //             <TouchableOpacity onPress={() => router.back()}>
// // //               <ChevronLeft size={24} color="white" />
// // //             </TouchableOpacity>
// // //             <XStack ai="center" space="$2">
// // //               <Cpu size={18} color="#EAB308" />
// // //               <YStack>
// // //                 <Text color="white" fontWeight="900" fontSize={14}>ADVISOR CORE v1.0</Text>
// // //                 <XStack ai="center" space="$1">
// // //                   <Circle size={6} bg="$green10" />
// // //                   <Text color="$green10" fontSize={10} fontWeight="800" ls={1}>ENCRYPTED CHANNEL</Text>
// // //                 </XStack>
// // //               </YStack>
// // //             </XStack>
// // //             <ShieldCheck size={20} color="#EAB308" />
// // //           </XStack>

// // //           {/* CHAT TERMINAL */}
// // //           <ScrollView 
// // //             ref={scrollViewRef}
// // //             contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
// // //             showsVerticalScrollIndicator={false}
// // //           >
// // //             {messages.map((msg) => (
// // //               <XStack 
// // //                 key={msg.id} 
// // //                 space="$3" 
// // //                 mb="$5" 
// // //                 ai="flex-start" 
// // //                 fd={msg.role === 'user' ? 'row-reverse' : 'row'}
// // //               >
// // //                 {/* Avatar */}
// // //                 <YStack w={32} h={32} br={16} bg={msg.role === 'user' ? '#333' : '#EAB308'} jc="center" ai="center">
// // //                   {msg.role === 'user' ? <User size={16} color="white" /> : <Cpu size={16} color="black" />}
// // //                 </YStack>

// // //                 {/* Message Bubble */}
// // //                 <YStack f={1} maxW="85%" ai={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// // //                   <Card 
// // //                     p="$3" 
// // //                     br="$4" 
// // //                     bg={msg.role === 'user' ? '#1A1A1A' : 'rgba(255,255,255,0.03)'}
// // //                     bw={1}
// // //                     bc={msg.role === 'user' ? '#333' : 'rgba(234,179,8,0.1)'}
// // //                   >
// // //                     <Text color="white" fontSize={15} lineHeight={22}>
// // //                       {msg.content}
// // //                     </Text>
// // //                   </Card>
// // //                   <Text color="$gray9" fontSize={10} mt="$1" ls={1}>
// // //                     {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// // //                   </Text>
// // //                 </YStack>
// // //               </XStack>
// // //             ))}

// // //             {loading && (
// // //               <XStack space="$3" ai="center">
// // //                 <Spinner size="small" color="#EAB308" />
// // //                 <Text color="#EAB308" fontSize={12} fontWeight="700" ls={2}>CORE ANALYZING LEDGER...</Text>
// // //               </XStack>
// // //             )}
// // //           </ScrollView>

// // //           {/* INPUT AREA */}
// // //           <KeyboardAvoidingView 
// // //             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // //             keyboardVerticalOffset={100}
// // //           >
// // //             <YStack p="$4" bg="#000" borderTopWidth={1} bc="rgba(255,255,255,0.05)">
// // //               <XStack ai="center" bg="#111" br="$6" px="$4" py="$2" bw={1} bc="#222" >
// // //                 <Input 
// // //                   f={1}
// // //                   placeholder="Ask about income, budgets, or strategy..."
// // //                   placeholderTextColor="#555"
// // //                   color="white"
// // //                   bw={0}
// // //                   bg="transparent"
// // //                   fontSize={15}
// // //                   value={inputText}
// // //                   onChangeText={setInputText}
// // //                   multiline
// // //                 />
// // //                 <TouchableOpacity onPress={handleSend} disabled={loading}>
// // //                   <Circle size={40} bg={inputText.trim() ? "#EAB308" : "#222"}>
// // //                     <Send size={18} color={inputText.trim() ? "black" : "#555"} />
// // //                   </Circle>
// // //                 </TouchableOpacity>
// // //               </XStack>
// // //             </YStack>
// // //           </KeyboardAvoidingView>

// // //         </SafeAreaView>
// // //       </LinearGradient>
// // //     </Theme>
// // //   );
// // // }



// // import React, { useState, useEffect, useRef } from 'react';
// // import {
// //   KeyboardAvoidingView,
// //   Platform,
// //   ScrollView,
// //   TouchableOpacity,
// //   Dimensions,
// // } from 'react-native';
// // import {
// //   YStack,
// //   XStack,
// //   Text,
// //   Input,
// //   Button,
// //   Spinner,
// //   Theme,
// //   Circle,
// //   Card,
// // } from 'tamagui';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { 
// //   Send, 
// //   Cpu, 
// //   User, 
// //   Sparkles, 
// //   ShieldCheck,
// //   ChevronLeft,
// //   DollarSign,
// //   TrendingUp,
// //   Wallet,
// //   PieChart
// // } from '@tamagui/lucide-icons';
// // import { useRouter } from 'expo-router';
// // import { SafeAreaView } from 'react-native-safe-area-context';

// // // Services
// // import { ApiService } from '../../../services/apiService';

// // const { width, height } = Dimensions.get('window');

// // export default function ChatWithAdvisor() {
// //   const router = useRouter();
// //   const scrollViewRef = useRef(null);
// //   const inputRef = useRef(null);
  
// //   // --- STATE ---
// //   const [messages, setMessages] = useState([
// //     {
// //       id: 'system-1',
// //       role: 'ai',
// //       content: 'FINNI AI Core online. Accessing verified ledger and investment signals. How can I assist your financial strategy today?',
// //       timestamp: new Date().toISOString(),
// //     }
// //   ]);
// //   const [inputText, setInputText] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [sessionId, setSessionId] = useState('string');
// //   const [isTyping, setIsTyping] = useState(false);

// //   // Quick suggestions
// //   const quickSuggestions = [
// //     { id: '1', text: 'Income sources', icon: <DollarSign size={14} color="#EAB308" /> },
// //     { id: '2', text: 'Budget planning', icon: <PieChart size={14} color="#EAB308" /> },
// //     { id: '3', text: 'Investments', icon: <TrendingUp size={14} color="#EAB308" /> },
// //     { id: '4', text: 'Spending review', icon: <Wallet size={14} color="#EAB308" /> },
// //   ];

// //   // --- ACTIONS ---
// //   const handleSend = async () => {
// //     if (!inputText.trim() || loading) return;

// //     const userMessage = {
// //       id: Date.now().toString(),
// //       role: 'user',
// //       content: inputText.trim(),
// //       timestamp: new Date().toISOString(),
// //     };

// //     setMessages((prev) => [...prev, userMessage]);
// //     setInputText('');
// //     setLoading(true);
// //     setIsTyping(false);

// //     try {
// //       // POST /api/v1/chat/
// //       const res = await ApiService.post('/chat/', {
// //         message: userMessage.content,
// //         session_id: sessionId
// //       });

// //       const aiResponse = {
// //         id: (Date.now() + 1).toString(),
// //         role: 'ai',
// //         content: res.data.response,
// //         timestamp: new Date().toISOString(),
// //       };

// //       if (res.data.session_id) setSessionId(res.data.session_id);
// //       setMessages((prev) => [...prev, aiResponse]);
      
// //     } catch (error) {
// //       console.error("Chat Error:", error);
// //       setMessages((prev) => [...prev, {
// //         id: 'error',
// //         role: 'ai',
// //         content: '🔒 Connection to Financial Core interrupted. Please verify system status and try again.',
// //         timestamp: new Date().toISOString(),
// //       }]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleQuickSuggestion = (text) => {
// //     setInputText(text);
// //     inputRef.current?.focus();
// //   };

// //   const formatMessage = (text) => {
// //     if (!text) return text;
    
// //     const lines = text.split('\n');
// //     return lines.map((line, index) => {
// //       if (line.startsWith('### ')) {
// //         return (
// //           <Text key={index} fontWeight="900" fontSize={16} color="#EAB308" mt="$3" mb="$2" ls={1}>
// //             {line.replace('### ', '')}
// //           </Text>
// //         );
// //       }
// //       if (line.includes('**')) {
// //         const parts = line.split('**');
// //         return (
// //           <Text key={index} fontWeight="800" mt="$2" mb="$1">
// //             {parts.map((part, i) => 
// //               i % 2 === 1 ? (
// //                 <Text key={i} fontWeight="900" color="#EAB308">{part}</Text>
// //               ) : (
// //                 <Text key={i}>{part}</Text>
// //               )
// //             )}
// //           </Text>
// //         );
// //       }
// //       if (line.startsWith('* ') || line.startsWith('- ')) {
// //         return (
// //           <XStack key={index} mb="$1" ml="$3" ai="center">
// //             <Circle size={4} bg="#EAB308" mr="$2" />
// //             <Text flex={1} fontSize={14} opacity={0.9}>
// //               {line.replace(/^[\*\-\s]+/, '')}
// //             </Text>
// //           </XStack>
// //         );
// //       }
// //       if (/^\d+\./.test(line.trim())) {
// //         const match = line.match(/^(\d+)\.\s*(.*)/);
// //         return (
// //           <XStack key={index} mb="$2" ml="$3" ai="flex-start">
// //             <Circle size={20} bg="rgba(234,179,8,0.1)" br={10} mr="$2" jc="center" ai="center">
// //               <Text fontSize={10} fontWeight="900" color="#EAB308">{match[1]}</Text>
// //             </Circle>
// //             <Text flex={1} fontSize={14} opacity={0.9}>{match[2]}</Text>
// //           </XStack>
// //         );
// //       }
// //       if (line.trim() === '') {
// //         return <Text key={index} h="$2" />;
// //       }
// //       return (
// //         <Text key={index} mb="$1" fontSize={14} opacity={0.9}>
// //           {line}
// //         </Text>
// //       );
// //     });
// //   };

// //   // Auto-scroll to bottom
// //   useEffect(() => {
// //     setTimeout(() => {
// //       scrollViewRef.current?.scrollToEnd({ animated: true });
// //     }, 100);
// //   }, [messages, loading]);

// //   return (
// //     <Theme name="dark">
// //       <LinearGradient colors={['#000000', '#0A0A0A', '#111111']} style={{ flex: 1 }}>
// //         <SafeAreaView style={{ flex: 1 }}>
          
// //           {/* ENHANCED HEADER */}
// //           <LinearGradient 
// //             colors={['rgba(0,0,0,0.9)', 'rgba(20,20,20,0.8)']}
// //             style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(234,179,8,0.2)' }}
// //           >
// //             <XStack p="$4" jc="space-between" ai="center">
// //               <TouchableOpacity 
// //                 onPress={() => router.back()}
// //                 style={{
// //                   padding: 8,
// //                   backgroundColor: 'rgba(234,179,8,0.1)',
// //                   borderRadius: 12,
// //                 }}
// //               >
// //                 <ChevronLeft size={20} color="#EAB308" />
// //               </TouchableOpacity>
              
// //               <YStack ai="center">
// //                 <XStack ai="center" space="$2">
// //                   <Text color="white" fontWeight="900" fontSize={16} ls={1}>
// //                     FINNI ADVISOR
// //                   </Text>
// //                 </XStack>
// //               </YStack>
              
// //               <ShieldCheck size={22} color="#EAB308" />
// //             </XStack>
// //           </LinearGradient>

// //           {/* CHAT TERMINAL */}
// //           <ScrollView 
// //             ref={scrollViewRef}
// //             contentContainerStyle={{ 
// //               padding: 20, 
// //               paddingBottom: 180, // Increased for better spacing
// //               paddingTop: 10 
// //             }}
// //             showsVerticalScrollIndicator={false}
// //             keyboardShouldPersistTaps="handled"
// //           >
// //             {messages.map((msg) => (
// //               <XStack 
// //                 key={msg.id} 
// //                 space="$3" 
// //                 mb="$4" 
// //                 ai="flex-start" 
// //                 fd={msg.role === 'user' ? 'row-reverse' : 'row'}
// //               >
// //                 {/* Enhanced Avatar */}
// //                 <LinearGradient
// //                   colors={msg.role === 'user' 
// //                     ? ['#333', '#1A1A1A'] 
// //                     : ['#EAB308', '#D4AC0D']}
// //                   style={{
// //                     width: 36,
// //                     height: 36,
// //                     borderRadius: 18,
// //                     justifyContent: 'center',
// //                     alignItems: 'center',
// //                     borderWidth: 1,
// //                     borderColor: msg.role === 'user' ? '#444' : 'rgba(234,179,8,0.3)',
// //                   }}
// //                 >
// //                   {msg.role === 'user' ? 
// //                     <User size={16} color="white" /> : 
// //                     <Cpu size={16} color="black" />
// //                   }
// //                 </LinearGradient>

// //                 {/* Message Bubble */}
// //                 <YStack f={1} maxW="82%" ai={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
// //                   <LinearGradient
// //                     colors={msg.role === 'user' 
// //                       ? ['rgba(234,179,8,0.15)', 'rgba(234,179,8,0.05)'] 
// //                       : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
// //                     style={{
// //                       borderRadius: 18,
// //                       borderWidth: 1,
// //                       borderColor: msg.role === 'user' 
// //                         ? 'rgba(234,179,8,0.2)' 
// //                         : 'rgba(255,255,255,0.1)',
// //                       padding: 16,
// //                       marginBottom: 4,
// //                     }}
// //                   >
// //                     <Text color="white" fontSize={14.5} lineHeight={22}>
// //                       {formatMessage(msg.content)}
// //                     </Text>
// //                   </LinearGradient>
// //                   <Text color="$gray8" fontSize={10} ls={1} mt="$1">
// //                     {new Date(msg.timestamp).toLocaleTimeString([], { 
// //                       hour: '2-digit', 
// //                       minute: '2-digit' 
// //                     })}
// //                   </Text>
// //                 </YStack>
// //               </XStack>
// //             ))}

// //             {/* Enhanced Loading Indicator */}
// //             {loading && (
// //               <XStack space="$3" ai="center" jc="flex-start" mt="$2">
// //                 <Spinner size="small" color="#EAB308" />
// //                 <YStack>
// //                   <Text color="#EAB308" fontSize={12} fontWeight="700" ls={1}>
// //                     ANALYZING FINANCIAL DATA
// //                   </Text>
// //                   <Text color="$gray9" fontSize={10} mt="$1">
// //                     Accessing investment signals...
// //                   </Text>
// //                 </YStack>
// //               </XStack>
// //             )}
// //           </ScrollView>

// //           {/* QUICK SUGGESTIONS */}
// //           <ScrollView 
// //             horizontal 
// //             showsHorizontalScrollIndicator={false}
// //             style={{ 
// //               position: 'absolute',
// //               bottom: 220, // Positioned above input area
// //               left: 0,
// //               right: 0,
// //               height: 50,
// //             }}
// //             contentContainerStyle={{ 
// //               paddingHorizontal: 20,
// //               alignItems: 'center',
// //             }}
// //           >
// //             <XStack space="$2">
// //               {quickSuggestions.map((suggestion) => (
// //                 <TouchableOpacity
// //                   key={suggestion.id}
// //                   onPress={() => handleQuickSuggestion(suggestion.text)}
// //                   disabled={loading}
// //                   style={{
// //                     flexDirection: 'row',
// //                     alignItems: 'center',
// //                     backgroundColor: 'rgba(234,179,8,0.1)',
// //                     borderWidth: 1,
// //                     borderColor: 'rgba(234,179,8,0.2)',
// //                     borderRadius: 20,
// //                     paddingHorizontal: 12,
// //                     paddingVertical: 8,
// //                     marginRight: 8,
// //                   }}
// //                 >
// //                   {suggestion.icon}
// //                   <Text 
// //                     fontSize={12} 
// //                     fontWeight="600" 
// //                     color="#EAB308" 
// //                     ml="$1.5"
// //                     numberOfLines={1}
// //                   >
// //                     {suggestion.text}
// //                   </Text>
// //                 </TouchableOpacity>
// //               ))}
// //             </XStack>
// //           </ScrollView>

// //           {/* ENHANCED INPUT AREA - MOVED UP */}
// //           <KeyboardAvoidingView 
// //             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //             keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
// //             style={{
// //               position: 'absolute',
// //               bottom: 0,
// //               left: 0,
// //               right: 0,
// //               backgroundColor: '#000000ff',
// //               borderTopWidth: 1,
// //               borderTopColor: 'rgba(190, 144, 7, 0.96)1)',
// //               paddingTop: 12,
// //               paddingBottom: Platform.OS === 'ios' ? 30 : 120,
// //               paddingHorizontal: 16,
            
// //             }}
// //           >
// //             <LinearGradient
// //               colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)']}
// //               style={{
// //                 borderRadius: 25,
// //                 borderWidth: 1,
// //                 borderColor: 'rgba(234,179,8,0.2)',
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //                 paddingHorizontal: 16,
// //                 paddingVertical: 8,
// //               }}
// //             >
// //               <Input 
// //                 ref={inputRef}
// //                 f={1}
// //                 placeholder="Query financial ledger..."
// //                 placeholderTextColor="rgba(255,255,255,0.4)"
// //                 color="white"
// //                 bw={0}
// //                 bg="transparent"
// //                 fontSize={15}
// //                 value={inputText}
// //                 onChangeText={(text) => {
// //                   setInputText(text);
// //                   setIsTyping(text.length > 0);
// //                 }}
// //                 multiline
// //                 maxLength={500}
// //                 numberOfLines={1}
// //                 style={{ minHeight: 40 }}
// //                 onSubmitEditing={handleSend}
// //                 returnKeyType="send"
// //               />
              
// //               <TouchableOpacity 
// //                 onPress={handleSend} 
// //                 disabled={!inputText.trim() || loading}
// //                 style={{
// //                   opacity: inputText.trim() && !loading ? 1 : 0.5,
// //                   marginLeft: 8,
// //                 }}
// //               >
// //                 <LinearGradient
// //                   colors={inputText.trim() 
// //                     ? ['#EAB308', '#D4AC0D'] 
// //                     : ['#333', '#222']}
// //                   style={{
// //                     width: 42,
// //                     height: 42,
// //                     borderRadius: 21,
// //                     justifyContent: 'center',
// //                     alignItems: 'center',
// //                     borderWidth: 1,
// //                     borderColor: inputText.trim() 
// //                       ? 'rgba(234,179,8,0.3)' 
// //                       : 'rgba(255,255,255,0.1)',
// //                   }}
// //                 >
// //                   {loading ? (
// //                     <Spinner size="small" color="black" />
// //                   ) : (
// //                     <Send size={18} color={inputText.trim() ? "black" : "#666"} />
// //                   )}
// //                 </LinearGradient>
// //               </TouchableOpacity>
// //             </LinearGradient>
            
// //             {/* Input status indicator */}
// //             <XStack jc="space-between" ai="center" mt="$2" px="$2">
// //               <Text color="$gray8" fontSize={10} ls={1}>
// //                 {isTyping ? '↩ Press return to send' : '💭 Ask about finances...'}
// //               </Text>
// //               <Text color="$gray8" fontSize={10} ls={1}>
// //                 {inputText.length}/500
// //               </Text>
// //             </XStack>
// //           </KeyboardAvoidingView>

// //         </SafeAreaView>
// //       </LinearGradient>
// //     </Theme>
// //   );
// // }



// import React, { useState, useEffect, useRef } from 'react';
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Animated,
// } from 'react-native';
// import {
//   YStack,
//   XStack,
//   Text,
//   Input,
//   Button,
//   Spinner,
//   Theme,
//   Circle,
//   Card,
// } from 'tamagui';
// import { LinearGradient } from 'expo-linear-gradient';
// import { 
//   Send, 
//   Cpu, 
//   User, 
//   Sparkles, 
//   ShieldCheck,
//   ChevronLeft,
//   DollarSign,
//   TrendingUp,
//   Wallet,
//   PieChart,
//   Target,
//   BarChart3,
//   Zap,
//   Brain,
//   Clock
// } from '@tamagui/lucide-icons';
// import { useRouter } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ApiService } from '../../../services/apiService';

// const { width, height } = Dimensions.get('window');

// export default function ChatWithAdvisor() {
//   const router = useRouter();
//   const scrollViewRef = useRef(null);
//   const inputRef = useRef(null);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
  
//   // --- STATE ---
//   const [messages, setMessages] = useState([
//     {
//       id: 'system-1',
//       role: 'ai',
//       content: '**FINANCE AI ACTIVE**\n\nAuthenticated. Accessing your financial dashboard.\nReady to analyze income streams, optimize investments, and build wealth strategies.\n\nHow can I advance your financial goals today?',
//       timestamp: new Date().toISOString(),
//       showTyping: false,
//     }
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [sessionId, setSessionId] = useState(`session-${Date.now()}`);
//   const [isTyping, setIsTyping] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(true);

//   // Enhanced quick suggestions
//   const quickSuggestions = [
//     { 
//       id: '1', 
//       text: 'Income Analysis', 
//       icon: <DollarSign size={16} color="#EAB308" />,
//       subtext: 'Review & optimize'
//     },
//     { 
//       id: '2', 
//       text: 'Budget Plan', 
//       icon: <PieChart size={16} color="#EAB308" />,
//       subtext: 'Smart allocation'
//     },
//     { 
//       id: '3', 
//       text: 'Investments', 
//       icon: <TrendingUp size={16} color="#EAB308" />,
//       subtext: 'Growth strategies'
//     },
//     { 
//       id: '4', 
//       text: 'Spending Audit', 
//       icon: <Wallet size={16} color="#EAB308" />,
//       subtext: 'Cut costs'
//     },
//     { 
//       id: '5', 
//       text: 'Goals Review', 
//       icon: <Target size={16} color="#EAB308" />,
//       subtext: 'Track progress'
//     },
//   ];

//   // Animate in
//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   // --- ACTIONS ---
//   const handleSend = async () => {
//     if (!inputText.trim() || loading) return;

//     const userMessage = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: inputText.trim(),
//       timestamp: new Date().toISOString(),
//       showTyping: false,
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputText('');
//     setLoading(true);
//     setIsTyping(false);
//     setShowSuggestions(false);

//     // Add typing indicator
//     const typingMessage = {
//       id: 'typing',
//       role: 'ai',
//       content: '',
//       timestamp: new Date().toISOString(),
//       showTyping: true,
//     };

//     try {
//       // POST /api/v1/chat/
//       const res = await ApiService.post('/chat/', {
//         message: userMessage.content,
//         session_id: sessionId
//       });

//       // Remove typing indicator
//       setMessages(prev => prev.filter(msg => msg.id !== 'typing'));

//       const aiResponse = {
//         id: (Date.now() + 1).toString(),
//         role: 'ai',
//         content: res.data.response,
//         timestamp: new Date().toISOString(),
//         showTyping: false,
//       };

//       if (res.data.session_id) setSessionId(res.data.session_id);
//       setMessages((prev) => [...prev, aiResponse]);
      
//     } catch (error) {
//       console.error("Chat Error:", error);
//       // Remove typing indicator
//       setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
//       setMessages((prev) => [...prev, {
//         id: 'error',
//         role: 'ai',
//         content: '⚠️ **Connection Issue**\n\nUnable to reach financial servers. Please:\n1. Check your internet connection\n2. Verify server status\n3. Try again in a moment\n\n*Your data remains secure and encrypted.*',
//         timestamp: new Date().toISOString(),
//         showTyping: false,
//       }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuickSuggestion = (text) => {
//     setInputText(text);
//     inputRef.current?.focus();
//   };

//   const formatMessage = (text) => {
//     if (!text) return null;
    
//     const lines = text.split('\n');
//     let elements = [];
    
//     lines.forEach((line, index) => {
//       if (line.startsWith('### ')) {
//         elements.push(
//           <XStack key={`h3-${index}`} ai="center" mt="$3" mb="$2">
//             <Zap size={14} color="#EAB308" mr="$2" />
//             <Text fontWeight="900" fontSize={16} color="#EAB308" ls={1}>
//               {line.replace('### ', '')}
//             </Text>
//           </XStack>
//         );
//       } else if (line.includes('**')) {
//         const parts = line.split('**');
//         elements.push(
//           <Text key={`bold-${index}`} fontWeight="800" mt="$2" mb="$1" fontSize={15}>
//             {parts.map((part, i) => 
//               i % 2 === 1 ? (
//                 <Text key={`bold-part-${i}`} fontWeight="900" color="#EAB308">
//                   {part}
//                 </Text>
//               ) : (
//                 <Text key={`bold-part-${i}`}>{part}</Text>
//               )
//             )}
//           </Text>
//         );
//       } else if (line.startsWith('* ') || line.startsWith('- ')) {
//         elements.push(
//           <XStack key={`bullet-${index}`} mb="$2" ml="$2" ai="flex-start">
//             <Circle size={6} bg="#EAB308" mr="$2" mt="$1" />
//             <Text flex={1} fontSize={14} opacity={0.9} lineHeight={20}>
//               {line.replace(/^[\*\-\s]+/, '')}
//             </Text>
//           </XStack>
//         );
//       } else if (/^\d+\./.test(line.trim())) {
//         const match = line.match(/^(\d+)\.\s*(.*)/);
//         elements.push(
//           <XStack key={`num-${index}`} mb="$3" ai="flex-start">
//             <LinearGradient
//               colors={['#EAB308', '#D4AC0D']}
//               style={{
//                 width: 24,
//                 height: 24,
//                 borderRadius: 12,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginRight: 12,
//               }}
//             >
//               <Text fontSize={12} fontWeight="900" color="black">
//                 {match[1]}
//               </Text>
//             </LinearGradient>
//             <Text flex={1} fontSize={14} opacity={0.9} lineHeight={20}>
//               {match[2]}
//             </Text>
//           </XStack>
//         );
//       } else if (line.trim() === '') {
//         elements.push(<Text key={`space-${index}`} h="$3" />);
//       } else if (line.includes('***')) {
//         elements.push(
//           <XStack key={`divider-${index}`} my="$3" ai="center">
//             <YStack f={1} h={1} bg="rgba(234,179,8,0.1)" />
//             <Text px="$3" color="$gray8" fontSize={10} ls={2}>•••</Text>
//             <YStack f={1} h={1} bg="rgba(234,179,8,0.1)" />
//           </XStack>
//         );
//       } else {
//         elements.push(
//           <Text key={`text-${index}`} mb="$2" fontSize={14} opacity={0.9} lineHeight={20}>
//             {line}
//           </Text>
//         );
//       }
//     });
    
//     return elements;
//   };

//   // Auto-scroll to bottom
//   useEffect(() => {
//     setTimeout(() => {
//       scrollViewRef.current?.scrollToEnd({ animated: true });
//     }, 100);
//   }, [messages, loading]);

//   const TypingIndicator = () => (
//     <XStack space="$3" ai="center" jc="flex-start" mt="$2">
//       <Spinner size="small" color="#EAB308" />
//       <YStack>
//         <Text color="#EAB308" fontSize={12} fontWeight="700" ls={1}>
//           ANALYZING FINANCIAL DATA
//         </Text>
//         <XStack ai="center" space="$1">
//           <Brain size={10} color="$gray9" />
//           <Text color="$gray9" fontSize={10}>
//             Processing market signals & portfolio metrics...
//           </Text>
//         </XStack>
//       </YStack>
//     </XStack>
//   );

//   return (
//     <Theme name="dark">
//       <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
//         <LinearGradient 
//           colors={['#000000', '#0A0A0A', '#111111']} 
//           style={{ flex: 1 }}
//         >
//           <SafeAreaView style={{ flex: 1 }}>
            
//             {/* ENHANCED HEADER WITH STATS */}
//             <LinearGradient 
//               colors={['rgba(0,0,0,0.95)', 'rgba(20,20,20,0.9)']}
//               style={{ 
//                 borderBottomWidth: 1, 
//                 borderBottomColor: 'rgba(234,179,8,0.15)',
//                 shadowColor: '#EAB308',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 10,
//                 elevation: 5,
//               }}
//             >
//               <XStack p="$4" jc="space-between" ai="center">
//                 <TouchableOpacity 
//                   onPress={() => router.back()}
//                   style={{
//                     padding: 10,
//                     backgroundColor: 'rgba(234,179,8,0.1)',
//                     borderRadius: 12,
//                     borderWidth: 1,
//                     borderColor: 'rgba(234,179,8,0.2)',
//                   }}
//                 >
//                   <ChevronLeft size={20} color="#EAB308" />
//                 </TouchableOpacity>
                
//                 <YStack ai="center">
//                   <XStack ai="center" space="$2">
//                     <LinearGradient
//                       colors={['#EAB308', '#D4AC0D']}
//                       style={{
//                         width: 36,
//                         height: 36,
//                         borderRadius: 18,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}
//                     >
//                       <Brain size={18} color="black" />
//                     </LinearGradient>
//                     <YStack>
//                       <Text color="white" fontWeight="900" fontSize={18} ls={1}>
//                         FINNI ADVISOR
//                       </Text>
//                       <XStack ai="center" space="$1" mt="$1">
//                         <Circle size={6} bg="$green10" />
//                         <Text color="$green10" fontSize={10} fontWeight="800" ls={2}>
//                           LIVE • SECURE • REAL-TIME
//                         </Text>
//                       </XStack>
//                     </YStack>
//                   </XStack>
//                 </YStack>
                
//                 <XStack ai="center" space="$2">
//                   <Clock size={16} color="$gray9" />
//                   <Text color="$gray9" fontSize={11} fontWeight="600">
//                     {new Date().toLocaleTimeString([], { 
//                       hour: '2-digit', 
//                       minute: '2-digit' 
//                     })}
//                   </Text>
//                 </XStack>
//               </XStack>
              
//               {/* Mini Stats Bar */}
//               <XStack 
//                 p="$3" 
//                 mx="$4" 
//                 mb="$2" 
//                 bg="rgba(234,179,8,0.05)" 
//                 br="$4"
//                 bw={1}
//                 bc="rgba(234,179,8,0.1)"
//                 jc="space-around"
//               >
//                 <YStack ai="center">
//                   <Text color="$gray9" fontSize={10} ls={2}>SESSION</Text>
//                   <Text color="#EAB308" fontSize={12} fontWeight="900" mt="$1">
//                     #{sessionId.slice(-6)}
//                   </Text>
//                 </YStack>
//                 <YStack ai="center">
//                   <Text color="$gray9" fontSize={10} ls={2}>MESSAGES</Text>
//                   <Text color="white" fontSize={12} fontWeight="900" mt="$1">
//                     {messages.length}
//                   </Text>
//                 </YStack>
//                 <YStack ai="center">
//                   <Text color="$gray9" fontSize={10} ls={2}>STATUS</Text>
//                   <XStack ai="center" space="$1" mt="$1">
//                     <Circle size={6} bg="$green10" />
//                     <Text color="$green10" fontSize={12} fontWeight="900">
//                       ACTIVE
//                     </Text>
//                   </XStack>
//                 </YStack>
//               </XStack>
//             </LinearGradient>

//             {/* CHAT TERMINAL */}
//             <ScrollView 
//               ref={scrollViewRef}
//               contentContainerStyle={{ 
//                 padding: 20, 
//                 paddingBottom: 220,
//                 paddingTop: 10 
//               }}
//               showsVerticalScrollIndicator={false}
//               keyboardShouldPersistTaps="handled"
//             >
//               {messages.map((msg) => (
//                 <Animated.View
//                   key={msg.id}
//                   style={{
//                     opacity: fadeAnim,
//                     transform: [
//                       {
//                         translateY: fadeAnim.interpolate({
//                           inputRange: [0, 1],
//                           outputRange: [20, 0],
//                         }),
//                       },
//                     ],
//                   }}
//                 >
//                   <XStack 
//                     space="$3" 
//                     mb="$4" 
//                     ai="flex-start" 
//                     fd={msg.role === 'user' ? 'row-reverse' : 'row'}
//                   >
//                     {/* Enhanced Avatar with Status */}
//                     <YStack>
//                       <LinearGradient
//                         colors={msg.role === 'user' 
//                           ? ['#333', '#1A1A1A'] 
//                           : ['#EAB308', '#D4AC0D']}
//                         style={{
//                           width: 40,
//                           height: 40,
//                           borderRadius: 20,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           borderWidth: 2,
//                           borderColor: msg.role === 'user' 
//                             ? '#444' 
//                             : 'rgba(234,179,8,0.4)',
//                         }}
//                       >
//                         {msg.role === 'user' ? 
//                           <User size={18} color="white" /> : 
//                           <Cpu size={18} color="black" />
//                         }
//                       </LinearGradient>
//                       {msg.role === 'ai' && (
//                         <Circle 
//                           size={10} 
//                           bg="$green10" 
//                           position="absolute" 
//                           bottom={-2} 
//                           right={-2}
//                           bw={2}
//                           bc="#000"
//                         />
//                       )}
//                     </YStack>

//                     {/* Message Bubble */}
//                     <YStack f={1} maxW="80%" ai={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
//                       {msg.showTyping ? (
//                         <TypingIndicator />
//                       ) : (
//                         <>
//                           <LinearGradient
//                             colors={msg.role === 'user' 
//                               ? ['rgba(234,179,8,0.2)', 'rgba(234,179,8,0.08)'] 
//                               : ['rgba(30,30,30,0.8)', 'rgba(20,20,20,0.9)']}
//                             style={{
//                               borderRadius: 20,
//                               borderWidth: 1,
//                               borderColor: msg.role === 'user' 
//                                 ? 'rgba(234,179,8,0.3)' 
//                                 : 'rgba(255,255,255,0.08)',
//                               padding: 18,
//                               marginBottom: 4,
//                               shadowColor: '#000',
//                               shadowOffset: { width: 0, height: 4 },
//                               shadowOpacity: 0.3,
//                               shadowRadius: 8,
//                               elevation: 3,
//                             }}
//                           >
//                             {formatMessage(msg.content)}
//                           </LinearGradient>
//                           <XStack ai="center" space="$2" mt="$1">
//                             <Text color="$gray8" fontSize={10} ls={1}>
//                               {new Date(msg.timestamp).toLocaleTimeString([], { 
//                                 hour: '2-digit', 
//                                 minute: '2-digit' 
//                               })}
//                             </Text>
//                             {msg.role === 'ai' && (
//                               <ShieldCheck size={10} color="$gray8" />
//                             )}
//                           </XStack>
//                         </>
//                       )}
//                     </YStack>
//                   </XStack>
//                 </Animated.View>
//               ))}

//               {/* Enhanced Loading Indicator */}
//               {loading && !messages.some(msg => msg.id === 'typing') && (
//                 <TypingIndicator />
//               )}
//             </ScrollView>

//             {/* ENHANCED QUICK SUGGESTIONS */}
//             {showSuggestions && messages.length <= 2 && (
//               <Animated.View
//                 style={{
//                   position: 'absolute',
//                   bottom: 180,
//                   left: 0,
//                   right: 0,
//                   opacity: fadeAnim,
//                   transform: [
//                     {
//                       translateY: fadeAnim.interpolate({
//                         inputRange: [0, 1],
//                         outputRange: [20, 0],
//                       }),
//                     },
//                   ],
//                 }}
//               >
//                 <YStack px="$4" mb="$2">
//                   <XStack ai="center" space="$2" mb="$3">
//                     <Zap size={14} color="#EAB308" />
//                     <Text color="$gray9" fontSize={12} fontWeight="600" ls={1}>
//                       QUICK ACTIONS
//                     </Text>
//                   </XStack>
//                   <ScrollView 
//                     horizontal 
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={{ paddingRight: 20 }}
//                   >
//                     <XStack space="$3">
//                       {quickSuggestions.map((suggestion) => (
//                         <TouchableOpacity
//                           key={suggestion.id}
//                           onPress={() => handleQuickSuggestion(suggestion.text)}
//                           disabled={loading}
//                           activeOpacity={0.7}
//                         >
//                           <LinearGradient
//                             colors={['rgba(234,179,8,0.1)', 'rgba(234,179,8,0.05)']}
//                             style={{
//                               flexDirection: 'column',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               borderWidth: 1,
//                               borderColor: 'rgba(234,179,8,0.2)',
//                               borderRadius: 16,
//                               paddingHorizontal: 16,
//                               paddingVertical: 12,
//                               minWidth: 100,
//                               height: 80,
//                             }}
//                           >
//                             <XStack ai="center" space="$2" mb="$1">
//                               {suggestion.icon}
//                               <Text 
//                                 fontSize={13} 
//                                 fontWeight="700" 
//                                 color="#EAB308"
//                                 numberOfLines={1}
//                               >
//                                 {suggestion.text}
//                               </Text>
//                             </XStack>
//                             <Text 
//                               fontSize={10} 
//                               color="$gray9" 
//                               fontWeight="600"
//                               numberOfLines={1}
//                             >
//                               {suggestion.subtext}
//                             </Text>
//                           </LinearGradient>
//                         </TouchableOpacity>
//                       ))}
//                     </XStack>
//                   </ScrollView>
//                 </YStack>
//               </Animated.View>
//             )}

//             {/* ENHANCED INPUT AREA */}
//             <KeyboardAvoidingView 
//               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//               keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
//               style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 backgroundColor: 'rgba(0,0,0,0.95)',
//                 borderTopWidth: 1,
//                 borderTopColor: 'rgba(234,179,8,0.1)',
//                 paddingTop: 16,
//                 paddingBottom: Platform.OS === 'ios' ? 30 : 20,
//                 paddingHorizontal: 20,
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: -5 },
//                 shadowOpacity: 0.5,
//                 shadowRadius: 10,
//                 elevation: 10,
//               }}
//             >
//               <LinearGradient
//                 colors={['rgba(30,30,30,0.9)', 'rgba(20,20,20,0.95)']}
//                 style={{
//                   borderRadius: 25,
//                   borderWidth: 1,
//                   borderColor: 'rgba(234,179,8,0.2)',
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   paddingHorizontal: 18,
//                   paddingVertical: 10,
//                   shadowColor: '#EAB308',
//                   shadowOffset: { width: 0, height: 0 },
//                   shadowOpacity: 0.1,
//                   shadowRadius: 10,
//                   elevation: 3,
//                 }}
//               >
//                 <Input 
//                   ref={inputRef}
//                   f={1}
//                   placeholder="Query financial ledger or ask for analysis..."
//                   placeholderTextColor="rgba(255,255,255,0.4)"
//                   color="white"
//                   bw={0}
//                   bg="transparent"
//                   fontSize={15}
//                   value={inputText}
//                   onChangeText={(text) => {
//                     setInputText(text);
//                     setIsTyping(text.length > 0);
//                   }}
//                   multiline
//                   maxLength={500}
//                   numberOfLines={1}
//                   style={{ 
//                     minHeight: 40,
//                     paddingVertical: 8,
//                   }}
//                   onSubmitEditing={handleSend}
//                   returnKeyType="send"
//                 />
                
//                 <TouchableOpacity 
//                   onPress={handleSend} 
//                   disabled={!inputText.trim() || loading}
//                   activeOpacity={0.8}
//                   style={{
//                     opacity: inputText.trim() && !loading ? 1 : 0.5,
//                     marginLeft: 12,
//                   }}
//                 >
//                   <LinearGradient
//                     colors={inputText.trim() 
//                       ? ['#EAB308', '#D4AC0D'] 
//                       : ['rgba(60,60,60,0.8)', 'rgba(40,40,40,0.9)']}
//                     style={{
//                       width: 46,
//                       height: 46,
//                       borderRadius: 23,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       borderWidth: 1,
//                       borderColor: inputText.trim() 
//                         ? 'rgba(234,179,8,0.4)' 
//                         : 'rgba(255,255,255,0.1)',
//                     }}
//                   >
//                     {loading ? (
//                       <Spinner size="small" color="black" />
//                     ) : (
//                       <Send size={20} color={inputText.trim() ? "black" : "#666"} />
//                     )}
//                   </LinearGradient>
//                 </TouchableOpacity>
//               </LinearGradient>
              
//               {/* Input status indicator */}
//               <XStack jc="space-between" ai="center" mt="$3" px="$2">
//                 <XStack ai="center" space="$2">
//                   {isTyping ? (
//                     <>
//                       <Circle size={8} bg="#EAB308" />
//                       <Text color="#EAB308" fontSize={11} fontWeight="700" ls={1}>
//                         READY TO ANALYZE
//                       </Text>
//                     </>
//                   ) : (
//                     <>
//                       <Sparkles size={12} color="$gray9" />
//                       <Text color="$gray9" fontSize={11} fontWeight="600" ls={1}>
//                         Ask about finances, budgets, or investments
//                       </Text>
//                     </>
//                   )}
//                 </XStack>
//                 <Text color="$gray8" fontSize={10} ls={1}>
//                   {inputText.length}/500
//                 </Text>
//               </XStack>
//             </KeyboardAvoidingView>

//           </SafeAreaView>
//         </LinearGradient>
//       </Animated.View>
//     </Theme>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  YStack,
  XStack,
  Text,
  Input,
  Button,
  Spinner,
  Theme,
  Circle,
  Card,
} from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Send, 
  Cpu, 
  User, 
  Sparkles, 
  ShieldCheck,
  ChevronLeft,
  DollarSign,
  TrendingUp,
  Wallet,
  PieChart
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiService } from '../../../services/apiService';

const { width, height } = Dimensions.get('window');

export default function ChatWithAdvisor() {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const inputRef = useRef(null);
  
  // --- STATE ---
  const [messages, setMessages] = useState([
    {
      id: 'system-1',
      role: 'ai',
      content: 'FINNI AI Core online. How can I assist your financial strategy today?',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('string');

  // Quick suggestions
  const quickSuggestions = [
    { id: '1', text: 'Income sources', icon: <DollarSign size={14} color="#EAB308" /> },
    { id: '2', text: 'Budget planning', icon: <PieChart size={14} color="#EAB308" /> },
    { id: '3', text: 'Investments', icon: <TrendingUp size={14} color="#EAB308" /> },
    { id: '4', text: 'Spending review', icon: <Wallet size={14} color="#EAB308" /> },
  ];

  // --- ACTIONS ---
  const handleSend = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      // POST /api/v1/chat/
      const res = await ApiService.post('/chat/', {
        message: userMessage.content,
        session_id: sessionId
      });

      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: res.data.response,
        timestamp: new Date().toISOString(),
      };

      if (res.data.session_id) setSessionId(res.data.session_id);
      setMessages((prev) => [...prev, aiResponse]);
      
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, {
        id: 'error',
        role: 'ai',
        content: 'Connection issue. Please try again.',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSuggestion = (text) => {
    setInputText(text);
    inputRef.current?.focus();
  };

  // Auto-scroll to bottom
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, loading]);

  return (
    <Theme name="dark">
      <LinearGradient colors={['#000000', '#0A0A0A']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          
          {/* HEADER */}
          <XStack p="$4" jc="space-between" ai="center" borderBottomWidth={1} bc="rgba(255,255,255,0.05)">
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <XStack ai="center" space="$2">
              <Text color="white" fontWeight="900" fontSize={14}>FINNI ADVISOR</Text>
            </XStack>
            <ShieldCheck size={20} color="#EAB308" />
          </XStack>

          {/* CHAT TERMINAL */}
          <ScrollView 
            ref={scrollViewRef}
            contentContainerStyle={{ padding: 20, paddingBottom: 180 }}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg) => (
              <XStack 
                key={msg.id} 
                space="$3" 
                mb="$4" 
                ai="flex-start" 
                fd={msg.role === 'user' ? 'row-reverse' : 'row'}
              >
                {/* Avatar */}
                <YStack w={32} h={32} br={16} bg={msg.role === 'user' ? '#333' : '#EAB308'} jc="center" ai="center">
                  {msg.role === 'user' ? <User size={16} color="white" /> : <Cpu size={16} color="black" />}
                </YStack>

                {/* Message Bubble */}
                <YStack f={1} maxW="85%" ai={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
                  <Card 
                    p="$3" 
                    br="$4" 
                    bg={msg.role === 'user' ? '#1A1A1A' : '#222'}
                    bw={1}
                    bc={msg.role === 'user' ? '#333' : 'rgba(234,179,8,0.2)'}
                  >
                    <Text color="white" fontSize={15} lineHeight={22}>
                      {msg.content}
                    </Text>
                  </Card>
                  <Text color="$gray9" fontSize={10} mt="$1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </YStack>
              </XStack>
            ))}

            {loading && (
              <XStack space="$3" ai="center">
                <Spinner size="small" color="#EAB308" />
                <Text color="#EAB308" fontSize={12}>Analyzing...</Text>
              </XStack>
            )}
          </ScrollView>

          {/* QUICK SUGGESTIONS */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ 
              position: 'absolute',
              bottom: 140,
              left: 0,
              right: 0,
              height: 50,
            }}
            contentContainerStyle={{ 
              paddingHorizontal: 20,
              alignItems: 'center',
            }}
          >
            <XStack space="$2">
              {quickSuggestions.map((suggestion) => (
                <TouchableOpacity
                  key={suggestion.id}
                  onPress={() => handleQuickSuggestion(suggestion.text)}
                  disabled={loading}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(234,179,8,0.1)',
                    borderWidth: 1,
                    borderColor: 'rgba(234,179,8,0.2)',
                    borderRadius: 20,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    marginRight: 8,
                  }}
                >
                  {suggestion.icon}
                  <Text 
                    fontSize={12} 
                    fontWeight="600" 
                    color="#EAB308" 
                    ml="$1.5"
                    numberOfLines={1}
                  >
                    {suggestion.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </XStack>
          </ScrollView>

          {/* INPUT AREA - Your kept version */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#000000',
              borderTopWidth: 1,
              borderTopColor: 'rgba(190, 144, 7, 0.96)',
              paddingTop: 12,
              paddingBottom: Platform.OS === 'ios' ? 30 : 120,
              paddingHorizontal: 16,
            }}
          >
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)']}
              style={{
                borderRadius: 25,
                borderWidth: 1,
                borderColor: 'rgba(234,179,8,0.2)',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <Input 
                ref={inputRef}
                f={1}
                placeholder="Query financial ledger..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                color="white"
                bw={0}
                bg="transparent"
                fontSize={15}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
                numberOfLines={1}
                style={{ minHeight: 40 }}
                onSubmitEditing={handleSend}
                returnKeyType="send"
              />
              
              <TouchableOpacity 
                onPress={handleSend} 
                disabled={!inputText.trim() || loading}
                style={{
                  opacity: inputText.trim() && !loading ? 1 : 0.5,
                  marginLeft: 8,
                }}
              >
                <LinearGradient
                  colors={inputText.trim() 
                    ? ['#EAB308', '#D4AC0D'] 
                    : ['#333', '#222']}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: inputText.trim() 
                      ? 'rgba(234,179,8,0.3)' 
                      : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {loading ? (
                    <Spinner size="small" color="black" />
                  ) : (
                    <Send size={18} color={inputText.trim() ? "black" : "#666"} />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
            
            {/* Input status indicator */}
            <XStack jc="space-between" ai="center" mt="$2" px="$2">
              <Text color="$gray8" fontSize={10}>
                {inputText.length > 0 ? 'Press return to send' : 'Ask about finances...'}
              </Text>
              <Text color="$gray8" fontSize={10}>
                {inputText.length}/500
              </Text>
            </XStack>
          </KeyboardAvoidingView>

        </SafeAreaView>
      </LinearGradient>
    </Theme>
  );
}