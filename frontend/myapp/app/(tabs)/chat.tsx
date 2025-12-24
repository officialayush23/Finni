// import React, { useState, useRef, useEffect } from 'react';
// import { FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
// import { YStack, XStack, Input, Button, Text, Theme, Spinner, Avatar, H4 } from 'tamagui';
// import { Send, Bot, User, Sparkles } from '@tamagui/lucide-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { AiService } from '../../services/aiService';

// interface Message {
//   id: string;
//   role: 'user' | 'ai';
//   text: string;
// }

// export default function ChatScreen() {
//   const [messages, setMessages] = useState<Message[]>([
//     { id: '1', role: 'ai', text: "Hello. I am Finni, your autonomous financial intelligence. How can I assist with your wealth today?" }
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  
//   const flatListRef = useRef<FlatList>(null);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userText = input;
//     setInput(''); // Clear input immediately
//     Keyboard.dismiss();

//     // 1. Add User Message
//     const userMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };
//     setMessages(prev => [...prev, userMsg]);
//     setLoading(true);

//     try {
//       // 2. Call Backend API
//       const data = await AiService.sendMessage(userText, sessionId);
      
//       // 3. Save Session ID for context (if backend returns it)
//       if (data.session_id) setSessionId(data.session_id);

//       // 4. Add AI Response
//       const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: data.response };
//       setMessages(prev => [...prev, aiMsg]);

//     } catch (error) {
//       const errorMsg: Message = { id: Date.now().toString(), role: 'ai', text: "⚠️ Connection lost. My neural core is unreachable." };
//       setMessages(prev => [...prev, errorMsg]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
//   }, [messages, loading]);

//   return (
//     <Theme name="dark">
//       <LinearGradient colors={['#000', '#080808', '#111']} style={{ flex: 1 }}>
//         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          
//           {/* --- HEADER --- */}
//           <YStack pt={60} pb={20} px={20} borderBottomColor="rgba(255,255,255,0.05)" borderBottomWidth={1} bg="rgba(0,0,0,0.8)">
//             <XStack ai="center" space="$3">
//               <YStack w={40} h={40} br={20} bg="$gold3" jc="center" ai="center" shadowColor="$gold3" shadowRadius={10}>
//                 <Bot size={24} color="black" />
//               </YStack>
//               <YStack>
//                 <H4 color="$white" fontSize={16} letterSpacing={1}>FINNI ADVISOR</H4>
//                 <XStack ai="center" space="$1">
//                   <Sparkles size={10} color="#22c55e" />
//                   <Text color="$silver4" fontSize={10}>Online // GPT-4 Turbo</Text>
//                 </XStack>
//               </YStack>
//             </XStack>
//           </YStack>

//           {/* --- CHAT AREA --- */}
//           <FlatList
//             ref={flatListRef}
//             data={messages}
//             keyExtractor={item => item.id}
//             contentContainerStyle={{ padding: 20, paddingBottom: 20 }}
//             renderItem={({ item }) => (
//               <XStack jc={item.role === 'user' ? 'flex-end' : 'flex-start'} mb="$4" ai="flex-end">
                
//                 {/* AI Avatar */}
//                 {item.role === 'ai' && (
//                   <YStack w={28} h={28} br={14} bg="rgba(234, 179, 8, 0.2)" jc="center" ai="center" mr="$2" mb="$1">
//                     <Bot size={14} color="#EAB308" />
//                   </YStack>
//                 )}

//                 {/* Message Bubble */}
//                 <YStack 
//                   bg={item.role === 'user' ? '$silver2' : 'rgba(255,255,255,0.05)'} 
//                   p="$3" 
//                   br="$4" 
//                   borderTopLeftRadius={item.role === 'ai' ? 4 : 16}
//                   borderBottomRightRadius={item.role === 'user' ? 4 : 16}
//                   maxWidth="80%"
//                   borderColor={item.role === 'ai' ? 'rgba(234, 179, 8, 0.3)' : 'transparent'}
//                   borderWidth={item.role === 'ai' ? 1 : 0}
//                 >
//                   <Text color="$white" fontSize={15} lineHeight={22}>
//                     {item.text}
//                   </Text>
//                 </YStack>
//               </XStack>
//             )}
//             ListFooterComponent={
//               loading ? (
//                 <XStack ml="$5" mb="$4" ai="center" space="$2">
//                    <Spinner size="small" color="$gold3" />
//                    <Text color="$silver4" fontSize={12} fontStyle="italic">Thinking...</Text>
//                 </XStack>
//               ) : null
//             }
//           />

//           {/* --- INPUT AREA --- */}
//           <XStack p="$4" bg="rgba(0,0,0,0.9)" ai="center" space="$2" borderTopColor="rgba(255,255,255,0.1)" borderTopWidth={1}>
//             <Input 
//               flex={1} 
//               value={input} 
//               onChangeText={setInput} 
//               placeholder="Ask about your finances..." 
//               placeholderTextColor="$silver4"
//               bg="rgba(255,255,255,0.05)" 
//               color="white"
//               borderColor="transparent"
//               borderRadius="$4"
//               h={50}
//               onSubmitEditing={sendMessage}
//             />
//             <Button 
//               size="$4" 
//               bg="$gold3" 
//               color="black"
//               onPress={sendMessage} 
//               disabled={loading || !input.trim()}
//               icon={<Send size={18} color="black" />}
//               borderRadius="$4"
//             />
//           </XStack>

//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </Theme>
//   );
// }