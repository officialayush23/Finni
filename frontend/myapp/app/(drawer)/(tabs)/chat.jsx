// // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
// // // // // // import { YStack, XStack, Text, Input, Button, Spinner, Theme, Circle, Card } from 'tamagui';
// // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // import { 
// // // // // //   Send, Cpu, User, Sparkles, ShieldCheck, ChevronLeft, 
// // // // // //   DollarSign, TrendingUp, Wallet, PieChart, Check, X, Terminal
// // // // // // } from '@tamagui/lucide-icons';
// // // // // // import { useRouter } from 'expo-router';
// // // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // // // import { ApiService } from '../../../services/apiService';

// // // // // // export default function ChatProtocol() {
// // // // // //   const router = useRouter();
// // // // // //   const insets = useSafeAreaInsets();
// // // // // //   const scrollViewRef = useRef(null);
// // // // // //   const inputRef = useRef(null);
// // // // // //   const [messages, setMessages] = useState([{
// // // // // //     id: 'sys-1', role: 'ai', 
// // // // // //     content: 'FINNI Protocol 2.0 Active. I am synced with your Ledger and Portfolios. State your command.',
// // // // // //     timestamp: new Date().toISOString()
// // // // // //   }]);
// // // // // //   const [inputText, setInputText] = useState('');
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   // --- 1. THE BRAIN: Sending & Intercepting Actions ---
// // // // // // // --- 1. FIXED HANDLE SEND ---
// // // // // // const handleSend = async (manualText) => {
// // // // // //   const textToProcess = (typeof manualText === 'string') ? manualText : inputText;

// // // // // //   if (!textToProcess || typeof textToProcess !== 'string' || !textToProcess.trim() || loading) {
// // // // // //     return;
// // // // // //   }

// // // // // //   const cleanText = textToProcess.trim();
// // // // // //   const userMsg = { 
// // // // // //     id: `user-${Date.now()}`, // Added prefix for safety
// // // // // //     role: 'user', 
// // // // // //     content: cleanText, 
// // // // // //     timestamp: new Date().toISOString() 
// // // // // //   };

// // // // // //   setMessages(prev => [...prev, userMsg]);
// // // // // //   setInputText('');
// // // // // //   setLoading(true);

// // // // // //   try {
// // // // // //     const res = await ApiService.post('/chat/', { 
// // // // // //       message: cleanText, 
// // // // // //       session_id: "protocol_session" 
// // // // // //     });
    
// // // // // //     const aiResponse = {
// // // // // //       id: `ai-${Date.now()}`, // Use timestamp for unique key
// // // // // //       role: 'ai',
// // // // // //       content: res.data.response,
// // // // // //       timestamp: new Date().toISOString(),
// // // // // //       actionMetadata: res.data.action_metadata 
// // // // // //     };

// // // // // //     setMessages(prev => [...prev, aiResponse]);
// // // // // //   } catch (error) {
// // // // // //     // ✅ FIXED: Using unique ID for error messages instead of static 'err'
// // // // // //     setMessages(prev => [...prev, { 
// // // // // //       id: `error-${Date.now()}`, // Unique key prevents the crash
// // // // // //       role: 'ai', 
// // // // // //       content: 'Connection lost. Protocol link severed.', 
// // // // // //       timestamp: new Date().toISOString() 
// // // // // //     }]);
// // // // // //   } finally {
// // // // // //     setLoading(false);
// // // // // //   }
// // // // // // } 

// // // // // //   // --- 2. THE EXECUTOR: Mapping Action to your specific APIs ---
// // // // // //   const executeProtocol = async (action, msgId) => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       let success = false;
      
// // // // // //       // ROUTING LOGIC based on your provided API list
// // // // // //       if (action.action === "create_income") {
// // // // // //         await ApiService.post('/income/', { 
// // // // // //           name: action.name || "New Source", 
// // // // // //           estimated_monthly_amount: action.amount || action.limit_amount,
// // // // // //           rate_type: 'MONTHLY'
// // // // // //         });
// // // // // //         success = true;
// // // // // //       } 
// // // // // //       else if (action.action === "create_budget") {
// // // // // //         await ApiService.post('/budgets/', {
// // // // // //           name: action.name,
// // // // // //           limit_amount: action.limit_amount,
// // // // // //           period: action.period || 'monthly'
// // // // // //         });
// // // // // //         success = true;
// // // // // //       }
// // // // // //       else if (action.action === "create_transaction") {
// // // // // //         await ApiService.post('/transactions/', {
// // // // // //           amount: action.amount,
// // // // // //           merchant_raw: action.merchant_raw,
// // // // // //           description: action.description || action.reasoning,
// // // // // //           category_id: "00000000-0000-0000-0000-000000000012", // Default "Other" UUID
// // // // // //           source: 'manual'
// // // // // //         });
// // // // // //         success = true;
// // // // // //       }

// // // // // //       if (success) {
// // // // // //         // Mark the message as "Processed"
// // // // // //         setMessages(prev => prev.map(m => m.id === msgId ? { ...m, protocolStatus: 'executed' } : m));
// // // // // //         setMessages(prev => [...prev, {
// // // // // //           id: `conf-${Date.now()}`, role: 'ai',
// // // // // //           content: `✅ Protocol Executed: ${action.action.replace('_', ' ').toUpperCase()} verified and committed to database.`,
// // // // // //           timestamp: new Date().toISOString()
// // // // // //         }]);
// // // // // //       }
// // // // // //     } catch (e) {
// // // // // //       Alert.alert("API REJECTION", "The protocol parameters were invalid for the ledger.");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <Theme name="dark">
// // // // // //       <LinearGradient colors={['#000', '#0A0A0A']} style={{ flex: 1 }}>
// // // // // //         <SafeAreaView style={{ flex: 1 }}>
          
// // // // // //           {/* TERMINAL HEADER */}
// // // // // //           <XStack p="$4" jc="space-between" ai="center" bbw={1} bc="rgba(255,255,255,0.05)">
// // // // // //             <TouchableOpacity onPress={() => router.back()}><ChevronLeft size={24} color="white" /></TouchableOpacity>
// // // // // //             <XStack ai="center" space="$2">
// // // // // //               <Terminal size={18} color="#EAB308" />
// // // // // //               <Text color="white" fontWeight="900" ls={1}>FINNI COMMAND BRIDGE</Text>
// // // // // //             </XStack>
// // // // // //             <ShieldCheck size={20} color="#EAB308" />
// // // // // //           </XStack>

// // // // // //           <ScrollView 
// // // // // //             ref={scrollViewRef}
// // // // // //             contentContainerStyle={{ padding: 20, paddingBottom: 250 }}
// // // // // //             onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
// // // // // //           >
// // // // // //             {messages.map((msg) => (
// // // // // //               <YStack key={msg.id} mb="$4">
// // // // // //                 <XStack space="$3" fd={msg.role === 'user' ? 'row-reverse' : 'row'}>
// // // // // //                   <Circle size={30} bg={msg.role === 'user' ? '#333' : '#EAB308'}>
// // // // // //                     {msg.role === 'user' ? <User size={14} color="white" /> : <Cpu size={14} color="black" />}
// // // // // //                   </Circle>
// // // // // //                   <Card p="$3" br="$4" f={1} maxW="85%" bg={msg.role === 'user' ? '#070707' : '#0b0b0b'} bc={msg.role === 'user' ? '#1c1c1c' : 'rgba(255, 191, 0, 0.3)'} bw={1}>
// // // // // //                     <Text color="white" fontSize={14} lineHeight={20}>{msg.content}</Text>
// // // // // //                   </Card>
// // // // // //                 </XStack>

// // // // // //                 {/* PROTOCOL DRAFT CARD */}
// // // // // //                 {msg.actionMetadata && msg.actionMetadata.action !== 'none' && !msg.protocolStatus && (
// // // // // //                   <YStack mt="$3" ml={msg.role === 'ai' ? 40 : 0} mr={msg.role === 'user' ? 40 : 0}>
// // // // // //                     <LinearGradient colors={['#111', '#050505']} style={{ borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#EAB308' }}>
// // // // // //                       <XStack ai="center" space="$2" mb="$2">
// // // // // //                         <Sparkles size={14} color="#EAB308" />
// // // // // //                         <Text color="#EAB308" fontWeight="900" fontSize={10} ls={2}>INBOUND PROTOCOL DRAFT</Text>
// // // // // //                       </XStack>
                      
// // // // // //                       <Text color="white" fontWeight="800" fontSize={18} mb="$1">{msg.actionMetadata.action.toUpperCase().replace('_', ' ')}</Text>
// // // // // //                       <Text color="$gray11" fontSize={12} mb="$4">{msg.actionMetadata.reasoning}</Text>
                      
// // // // // //                       <XStack space="$3">
// // // // // //                         <Button f={1} bg="#EAB308" color="black" fontWeight="900" onPress={() => executeProtocol(msg.actionMetadata, msg.id)}>Verify & Execute</Button>
// // // // // //                         <Button f={1} chromeless bc="#333" bw={1} onPress={() => setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, protocolStatus: 'declined' } : m))}>Abort</Button>
// // // // // //                       </XStack>
// // // // // //                     </LinearGradient>
// // // // // //                   </YStack>
// // // // // //                 )}
// // // // // //               </YStack>
// // // // // //             ))}
// // // // // //           </ScrollView>

// // // // // //           {/* INPUT AREA - Your kept version */}
// // // // // //           <KeyboardAvoidingView 
// // // // // //             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // // // //             keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
// // // // // //             style={{
// // // // // //               position: 'absolute',
// // // // // //               bottom: 0,
// // // // // //               left: 0,
// // // // // //               right: 0,
// // // // // //               backgroundColor: '#1a1a1aec',
// // // // // //               borderTopWidth: 1,
// // // // // //               borderTopColor: 'rgba(144, 108, 0, 0.73)',
// // // // // //               paddingTop: 12,
// // // // // //               paddingBottom: Platform.OS === 'ios' ? 30 : 120,
// // // // // //               paddingHorizontal: 16,
// // // // // //             }}
// // // // // //           >
// // // // // //             <LinearGradient
// // // // // //               colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)']}
// // // // // //               style={{
// // // // // //                 borderRadius: 15,
// // // // // //                 borderWidth: 1,
// // // // // //                 borderColor: 'rgba(255, 191, 0, 0.38)',
// // // // // //                 flexDirection: 'row',
// // // // // //                 alignItems: 'center',
// // // // // //                 paddingHorizontal: 12,
// // // // // //                 paddingVertical: 4,
// // // // // //               }}
// // // // // //             >
// // // // // //               <Input 
// // // // // //                 ref={inputRef}
// // // // // //                 f={1}
// // // // // //                 placeholder="Query financial ledger..."
// // // // // //                 placeholderTextColor="rgba(255, 253, 253, 0.29)"
// // // // // //                 color="white"
// // // // // //                 bw={0}
// // // // // //                 bg="transparent"
// // // // // //                 fontSize={15}
// // // // // //                 value={inputText}
// // // // // //                 onChangeText={setInputText}
// // // // // //                 multiline
// // // // // //                 maxLength={500}
// // // // // //                 numberOfLines={1}
// // // // // //                 style={{ minHeight: 50 }}
// // // // // //                 onSubmitEditing={handleSend}
// // // // // //                 returnKeyType="send"
// // // // // //               />
              
// // // // // //               <TouchableOpacity 
// // // // // //   onPress={() => handleSend()} // ✅ Call as arrow function to avoid passing the event object
// // // // // //   disabled={!inputText.trim() || loading}
// // // // // // >
// // // // // //   <LinearGradient colors={['#EAB308', '#D4AC0D']} style={{ width: 42, height: 42, br: 21, jc: 'center', ai: 'center' }}>
// // // // // //     <Send size={18} color="black" />
// // // // // //   </LinearGradient>
// // // // // // </TouchableOpacity>
// // // // // //             </LinearGradient>
            
// // // // // //             {/* Input status indicator */}
// // // // // //             <XStack jc="space-between" ai="center" mt="$2" px="$2">
// // // // // //               <Text color="rgba(234, 178, 8, 0.71)" fontSize={10}>
// // // // // //                 {inputText.length > 0 ? 'Press return to send' : 'Ask about finances...'}
// // // // // //               </Text>
// // // // // //               <Text color="rgba(234, 178, 8, 0.71)" fontSize={10}>
// // // // // //                 {inputText.length}/500
// // // // // //               </Text>
// // // // // //             </XStack>
// // // // // //           </KeyboardAvoidingView>

// // // // // //         </SafeAreaView>
// // // // // //       </LinearGradient>
// // // // // //     </Theme>
// // // // // //   );
// // // // // // }


// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
// // // import { YStack, XStack, Text, Input, Button, Spinner, Theme, Circle, Card } from 'tamagui';
// // // import { LinearGradient } from 'expo-linear-gradient';
// // // import { 
// // //   Send, Cpu, User, Sparkles, ShieldCheck, ChevronLeft, 
// // //   DollarSign, TrendingUp, Wallet, PieChart, Check, X, Terminal, Target
// // // } from '@tamagui/lucide-icons';
// // // import { useRouter } from 'expo-router';
// // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // import { ApiService } from '../../../services/apiService';

// // // export default function ChatCommandBridge() {
// // //   const router = useRouter();
// // //   const insets = useSafeAreaInsets();
// // //   const scrollViewRef = useRef(null);
// // //   const inputRef = useRef(null);

// // //   const [messages, setMessages] = useState([{
// // //     id: 'sys-1', role: 'ai', 
// // //     content: 'Hello, How can I help ?',
// // //     timestamp: new Date().toISOString()
// // //   }]);
// // //   const [inputText, setInputText] = useState('');
// // //   const [loading, setLoading] = useState(false);

// // //   // --- ACTION EXECUTION LOGIC (MATCHING YOUR API LIST) ---
// // //   const executeAiAction = async (actionData, messageId) => {
// // //     setLoading(true);
// // //     try {
// // //       let endpoint = '';
// // //       let payload = {};

// // //       // ROUTING BASED ON INTENT
// // //       switch (actionData.action) {
// // //         case 'create_income':
// // //           endpoint = '/income/';
// // //           payload = {
// // //             name: actionData.name || "New Income Source",
// // //             source_type: "salary", // Defaulting based on common prompt
// // //             rate_type: actionData.period || "MONTHLY",
// // //             estimated_monthly_amount: actionData.amount || actionData.limit_amount,
// // //             api_source_identifier: "ai_chat"
// // //           };
// // //           break;

// // //         case 'create_budget':
// // //           endpoint = '/budgets/';
// // //           payload = {
// // //             name: actionData.name,
// // //             limit_amount: actionData.limit_amount,
// // //             period: actionData.period || "monthly",
// // //             included_category_ids: [actionData.category_id || "general"],
// // //             alert_threshold: 80
// // //           };
// // //           break;

// // //         case 'create_transaction':
// // //           endpoint = '/transactions/';
// // //           payload = {
// // //             amount: actionData.amount,
// // //             currency: "INR",
// // //             occurred_at: actionData.occurred_at || new Date().toISOString(),
// // //             category_id: actionData.category_id || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// // //             merchant_raw: actionData.merchant_raw || "Unknown Merchant",
// // //             description: actionData.description || "Added via AI Chat",
// // //             source: "manual"
// // //           };
// // //           break;

// // //         case 'create_goal':
// // //           endpoint = '/goals/';
// // //           payload = {
// // //             name: actionData.name,
// // //             target_amount: actionData.target_amount,
// // //             target_date: actionData.target_date || new Date().toISOString().split('T')[0]
// // //           };
// // //           break;
// // //       }

// // //       // EXECUTE TO BACKEND
// // //       await ApiService.post(endpoint, payload);

// // //       // UI SUCCESS STATE
// // //       setMessages(prev => prev.map(m => m.id === messageId ? { ...m, protocolStatus: 'executed' } : m));
// // //       setMessages(prev => [...prev, {
// // //         id: `success-${Date.now()}`,
// // //         role: 'ai',
// // //         content: ` Protocol executed. I have successfully created the ${actionData.action.replace('_', ' ')} in your system.`,
// // //         timestamp: new Date().toISOString()
// // //       }]);

// // //     } catch (error) {
// // //       console.error("Execution Error:", error.response?.data);
// // //       Alert.alert("Protocol Rejection", "The AI suggested parameters that the ledger rejected. Please try again with more detail.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSend = async (manualText) => {
// // //     const text = typeof manualText === 'string' ? manualText : inputText;
// // //     if (!text.trim() || loading) return;

// // //     const userMsg = { id: `u-${Date.now()}`, role: 'user', content: text, timestamp: new Date().toISOString() };
// // //     setMessages(prev => [...prev, userMsg]);
// // //     setInputText('');
// // //     setLoading(true);

// // //     try {
// // //       // POST /api/v1/chat/
// // //       const res = await ApiService.post('/chat/', { message: text, session_id: "finni_bridge" });
      
// // //       const aiResponse = {
// // //         id: `ai-${Date.now()}`,
// // //         role: 'ai',
// // //         content: res.data.response,
// // //         timestamp: new Date().toISOString(),
// // //         action: res.data.action_metadata // Assuming backend now returns the Pydantic model here
// // //       };

// // //       setMessages(prev => [...prev, aiResponse]);
// // //     } catch (e) {
// // //       setMessages(prev => [...prev, { id: 'err', role: 'ai', content: 'Connection failure. Check backend sync.', timestamp: new Date().toISOString() }]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <Theme name="dark">
// // //       <LinearGradient colors={['#000', '#0A0A0A']} style={{ flex: 1 }}>
// // //         <SafeAreaView style={{ flex: 1 }}>
          
// // //           {/* HEADER */}
// // //           <XStack p="$4" jc="space-between" ai="center" bbw={1} bc="rgba(255,255,255,0.05)">
// // //             <TouchableOpacity onPress={() => router.back()}><ChevronLeft size={24} color="white" /></TouchableOpacity>
// // //             <XStack ai="center" space="$2">
// // //               <Text color="white" fontWeight="900">CHAT</Text>
// // //             </XStack>
// // //             <ShieldCheck size={20} color="#EAB308" />
// // //           </XStack>

// // //           <ScrollView 
// // //             ref={scrollViewRef} 
// // //             contentContainerStyle={{ padding: 20, paddingBottom: 250 }}
// // //             onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
// // //           >
// // //             {messages.map((msg) => (
// // //               <YStack key={msg.id} mb="$4">
// // //                 <XStack space="$3" fd={msg.role === 'user' ? 'row-reverse' : 'row'}>
// // //                   <Circle size={30} bg={msg.role === 'user' ? '#333' : '#EAB308'}>
// // //                     {msg.role === 'user' ? <User size={14} color="white" /> : <Cpu size={14} color="black" />}
// // //                   </Circle>
// // //                   <Card p="$3" br="$4" f={1} maxW="85%" bg={msg.role === 'user' ? '#070707' : '#0b0b0b'} bc={msg.role === 'user' ? '#1c1c1c' : 'rgba(234, 179, 8, 0.4)'} bw={1}>
// // //                     <Text color="white" fontSize={14}>{msg.content}</Text>
// // //                   </Card>
// // //                 </XStack>

// // //                 {/* ACTION CARD (IF INTENT DETECTED) */}
// // //                 {msg.action && msg.action.action !== 'none' && !msg.protocolStatus && (
// // //                   <YStack mt="$3" ml={40}>
// // //                     <Card p="$4" bg="#111" bw={1} bc="#EAB308" br="$4">
// // //                       <XStack ai="center" space="$2" mb="$2">
// // //                         <Sparkles size={14} color="#EAB308" />
// // //                         <Text color="#EAB308" fontWeight="900" fontSize={10} ls={2}>SYSTEM DRAFT</Text>
// // //                       </XStack>
// // //                       <Text color="white" fontWeight="800" fontSize={16} mb="$1">
// // //                         {msg.action.action.toUpperCase().replace('_', ' ')}
// // //                       </Text>
// // //                       <Text color="$gray11" fontSize={12} mb="$4">{msg.action.reasoning || "Ready to commit to protocol."}</Text>
// // //                       <XStack space="$3">
// // //                         <Button f={1} bg="#EAB308" color="black" fontWeight="900" onPress={() => executeAiAction(msg.action, msg.id)}>Verify & Commit</Button>
// // //                         <Button f={1} chromeless bc="#333" bw={1} onPress={() => setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, protocolStatus: 'declined' } : m))}>Dismiss</Button>
// // //                       </XStack>
// // //                     </Card>
// // //                   </YStack>
// // //                 )}
// // //               </YStack>
// // //             ))}
// // //           </ScrollView>

// // //         {/* INPUT AREA - Your kept version */}
// // //            <KeyboardAvoidingView 
// // //              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // //              keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
// // //              style={{
// // //                position: 'absolute',
// // //                bottom: 0,
// // //                left: 0,
// // //                right: 0,
// // //                backgroundColor: '#1a1a1aec',
// // //                borderTopWidth: 1,
// // //                borderTopColor: 'rgba(144, 108, 0, 0.73)',
// // //                paddingTop: 12,
// // //                paddingBottom: Platform.OS === 'ios' ? 30 : 120,
// // //                paddingHorizontal: 16,
// // //              }}
// // //            >
// // //              <LinearGradient
// // //                colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)']}
// // //                style={{
// // //                  borderRadius: 15,
// // //                  borderWidth: 1,
// // //                  borderColor: 'rgba(255, 191, 0, 0.38)',
// // //                  flexDirection: 'row',
// // //                  alignItems: 'center',
// // //                  paddingHorizontal: 12,
// // //                  paddingVertical: 4,
// // //                }}
// // //              >
// // //                <Input 
// // //                  ref={inputRef}
// // //                  f={1}
// // //                  placeholder="Query financial ledger..."
// // //                  placeholderTextColor="rgba(255, 253, 253, 0.29)"
// // //                  color="white"
// // //                  bw={0}
// // //                  bg="transparent"
// // //                  fontSize={15}
// // //                  value={inputText}
// // //                  onChangeText={setInputText}
// // //                  multiline
// // //                  maxLength={500}
// // //                  numberOfLines={1}
// // //                  style={{ minHeight: 50 }}
// // //                  onSubmitEditing={handleSend}
// // //                  returnKeyType="send"
// // //                />
              
// // //                <TouchableOpacity 
// // //    onPress={() => handleSend()} // ✅ Call as arrow function to avoid passing the event object
// // //    disabled={!inputText.trim() || loading}
// // //  >
// // // <LinearGradient
// // //   colors={['#EAB308', '#D4AC0D']}
// // //   style={{
// // //     width: 42,
// // //     height: 42,
// // //     borderRadius: 21,   
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   }}
// // // >
// // //   <Send size={25} color="black" />
// // // </LinearGradient>

// // //  </TouchableOpacity>
// // //              </LinearGradient>
            
// // //              {/* Input status indicator */}
// // //              <XStack jc="space-between" ai="center" mt="$2" px="$2">
// // //                <Text color="rgba(234, 178, 8, 0.71)" fontSize={10}>
// // //                  {inputText.length > 0 ? 'Press return to send' : 'Ask about finances...'}
// // //                </Text>
// // //                <Text color="rgba(234, 178, 8, 0.71)" fontSize={10}>
// // //                  {inputText.length}/500
// // //                </Text>
// // //              </XStack>
// // //            </KeyboardAvoidingView>


// // //         </SafeAreaView>
// // //       </LinearGradient>
// // //     </Theme>
// // //   );
// // // }


// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
// // // // import { YStack, XStack, Text, Input, Button, H2 , Spinner, Theme, Circle, Card } from 'tamagui';
// // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // import { 
// // // //   Send, Cpu, User, Sparkles, ShieldCheck, ChevronLeft, 
// // // //   Terminal, Check, X, Zap 
// // // // } from '@tamagui/lucide-icons';
// // // // import { useRouter } from 'expo-router';
// // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // import { ApiService } from '../../../services/apiService';

// // // // export default function ChatCommandBridge() {
// // // //   const router = useRouter();
// // // //   const insets = useSafeAreaInsets();
// // // //   const scrollViewRef = useRef(null);
// // // //   const inputRef = useRef(null);
  
// // // //   const [messages, setMessages] = useState([{
// // // //     id: 'sys-1', role: 'ai', 
// // // //     content: 'FINNI AI Bridge Active. I can execute ledger entries, set budgets, and update income sources directly. What is your command?',
// // // //     timestamp: new Date().toISOString()
// // // //   }]);
// // // //   const [inputText, setInputText] = useState('');
// // // //   const [loading, setLoading] = useState(false);

// // // //   // --- THE EXECUTOR: This maps AI Intent to your REAL APIs ---
// // // //   const handleExecuteProtocol = async (actionData, messageId) => {
// // // //     setLoading(true);
// // // //     try {
// // // //       let response;
// // // //       const { action } = actionData;

// // // //       // 1. ROUTE TO CORRECT API BASED ON INTENT
// // // //       if (action === 'create_income') {
// // // //         response = await ApiService.post('/income/', {
// // // //           name: actionData.name || "New Income",
// // // //           source_type: "salary", 
// // // //           rate_type: "MONTHLY",
// // // //           estimated_monthly_amount: actionData.amount || actionData.limit_amount,
// // // //           api_source_identifier: "ai_advisor"
// // // //         });
// // // //       } 
// // // //       else if (action === 'create_budget') {
// // // //         response = await ApiService.post('/budgets/', {
// // // //           name: actionData.name,
// // // //           limit_amount: actionData.limit_amount,
// // // //           period: actionData.period || "monthly",
// // // //           included_category_ids: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"], // Assume default
// // // //           alert_threshold: 80
// // // //         });
// // // //       }
// // // //       else if (action === 'create_transaction') {
// // // //         response = await ApiService.post('/transactions/', {
// // // //           amount: actionData.amount,
// // // //           currency: "INR",
// // // //           occurred_at: new Date().toISOString(),
// // // //           category_id: actionData.category_id || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// // // //           merchant_raw: actionData.merchant_raw || "AI Entry",
// // // //           description: actionData.description || "Added via Chat",
// // // //           source: "manual"
// // // //         });
// // // //       }

// // // //       // 2. UPDATE UI ON SUCCESS
// // // //       setMessages(prev => prev.map(m => m.id === messageId ? { ...m, status: 'executed' } : m));
// // // //       setMessages(prev => [...prev, {
// // // //         id: `conf-${Date.now()}`,
// // // //         role: 'ai',
// // // //         content: `✅ Protocol executed successfully. The ${action.replace('_', ' ')} is now live in your database.`,
// // // //         timestamp: new Date().toISOString()
// // // //       }]);

// // // //     } catch (error) {
// // // //       console.error("Execution Error:", error.response?.data);
// // // //       Alert.alert("Protocol Error", "The backend rejected the AI-generated parameters.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleSend = async () => {
// // // //     if (!inputText.trim() || loading) return;

// // // //     const userMsg = { id: `u-${Date.now()}`, role: 'user', content: inputText.trim(), timestamp: new Date().toISOString() };
// // // //     setMessages(prev => [...prev, userMsg]);
// // // //     setInputText('');
// // // //     setLoading(true);

// // // //     try {
// // // //       // Send to your /api/v1/chat/ endpoint
// // // //       const res = await ApiService.post('/chat/', { message: userMsg.content, session_id: "finni_v2" });
      
// // // //       const aiResponse = {
// // // //         id: `ai-${Date.now()}`,
// // // //         role: 'ai',
// // // //         content: res.data.response,
// // // //         timestamp: new Date().toISOString(),
// // // //         // IMPORTANT: Your backend must return the 'action_metadata' from your detect_budget_action service
// // // //         actionMetadata: res.data.action_metadata 
// // // //       };

// // // //       setMessages(prev => [...prev, aiResponse]);
// // // //     } catch (e) {
// // // //       setMessages(prev => [...prev, { id: 'err', role: 'ai', content: 'Connection failure.', timestamp: new Date().toISOString() }]);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <LinearGradient colors={['#000', '#0A0A0A']} style={{ flex: 1 }}>
// // // //         <SafeAreaView style={{ flex: 1 }}>
          
// // // //           {/* HEADER */}
// // // //           <XStack p="$4" jc="space-between" ai="center" bbw={1} bc="rgba(255,255,255,0.05)">
// // // //             <TouchableOpacity onPress={() => router.back()}><ChevronLeft size={24} color="white" /></TouchableOpacity>
// // // //             <H2 color="white" fontWeight="900" fontSize={22}>AI COMMAND</H2>
// // // //             <ShieldCheck size={20} color="#EAB308" />
// // // //           </XStack>

// // // //           <ScrollView 
// // // //             ref={scrollViewRef} 
// // // //             contentContainerStyle={{ padding: 20, paddingBottom: 250 }}
// // // //             onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
// // // //           >
// // // //             {messages.map((msg) => (
// // // //               <YStack key={msg.id} mb="$4">
// // // //                 <XStack space="$3" fd={msg.role === 'user' ? 'row-reverse' : 'row'}>
// // // //                   <Circle size={30} bg={msg.role === 'user' ? '#333' : '#EAB308'}>
// // // //                     {msg.role === 'user' ? <User size={14} color="white" /> : <Cpu size={14} color="black" />}
// // // //                   </Circle>
// // // //                   <Card p="$3" br="$4" f={1} maxW="85%" bg={msg.role === 'user' ? '#070707' : '#0b0b0b'} bc={msg.role === 'user' ? '#1c1c1c' : 'rgba(255, 191, 0, 0.3)'} bw={1}>
// // // //                     <Text color="white" fontSize={14}>{msg.content}</Text>
// // // //                   </Card>
// // // //                 </XStack>

// // // //                 {/* --- THE ACTION DRAFT CARD --- */}
// // // //                 {msg.actionMetadata && msg.actionMetadata.action !== 'none' && !msg.status && (
// // // //                   <YStack mt="$3" ml={40}>
// // // //                     <Card p="$4" bg="#111" bw={1} bc="#EAB308" br="$5">
// // // //                       <XStack ai="center" space="$2" mb="$2">
// // // //                         <Zap size={14} color="#EAB308" />
// // // //                         <Text color="#EAB308" fontWeight="900" fontSize={10} ls={2}>PENDING EXECUTION</Text>
// // // //                       </XStack>
// // // //                       <Text color="white" fontWeight="800" fontSize={16} mb="$1">
// // // //                         {msg.actionMetadata.action.toUpperCase().replace('_', ' ')}
// // // //                       </Text>
// // // //                       <Text color="$gray11" fontSize={12} mb="$4">{msg.actionMetadata.reasoning || "Confirm parameters to update ledger."}</Text>
                      
// // // //                       <XStack space="$3">
// // // //                         <Button f={1} bg="#EAB308" color="black" fontWeight="900" onPress={() => handleExecuteProtocol(msg.actionMetadata, msg.id)}>Execute</Button>
// // // //                         <Button f={1} chromeless bc="#333" bw={1} onPress={() => setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'declined' } : m))}>Dismiss</Button>
// // // //                       </XStack>
// // // //                     </Card>
// // // //                   </YStack>
// // // //                 )}
// // // //               </YStack>
// // // //             ))}
// // // //           </ScrollView>

// // // //           {/* INPUT AREA (Absolute Bottom) */}
// // // //           <KeyboardAvoidingView 
// // // //             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // //             keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
// // // //             style={{ position: 'absolute', bottom: 0, left: 0, right: 0, bg: '#000', p: 16, pb: insets.bottom + 20 }}
// // // //           >
// // // //             <XStack ai="center" bg="#111" br="$10" px="$4" py="$1" bw={1} bc="#333">
// // // //               <Input 
// // // //                 ref={inputRef} f={1} placeholder="Command advisor..." color="white" bw={0} bg="transparent"
// // // //                 value={inputText} onChangeText={setInputText} multiline
// // // //               />
// // // //               <TouchableOpacity onPress={handleSend}>
// // // //                 <Circle size={40} bg="#EAB308"><Send size={18} color="black" /></Circle>
// // // //               </TouchableOpacity>
// // // //             </XStack>
// // // //           </KeyboardAvoidingView>

// // // //         </SafeAreaView>
// // // //       </LinearGradient>
// // // //     </Theme>
// // // //   );
// // // // }



// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
// // // // import { YStack, XStack, Text, Input, Button, Spinner, Theme, Circle, Card } from 'tamagui';
// // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // import { 
// // // //   Send, Cpu, User, Sparkles, ShieldCheck, ChevronLeft, 
// // // //   DollarSign, TrendingUp, Wallet, PieChart, Terminal, Zap, Check, X 
// // // // } from '@tamagui/lucide-icons';
// // // // import { useRouter } from 'expo-router';
// // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // import { ApiService } from '../../../services/apiService';

// // // // export default function ChatProtocolBridge() {
// // // //   const router = useRouter();
// // // //   const insets = useSafeAreaInsets();
// // // //   const scrollViewRef = useRef(null);
// // // //   const inputRef = useRef(null);
  
// // // //   // --- STATE ---
// // // //   const [messages, setMessages] = useState([{
// // // //     id: 'sys-1', role: 'ai', 
// // // //     content: 'FINNI Protocol 2.0 Active. I can view your portfolio, add income sources, or manage budgets. State your command.',
// // // //     timestamp: new Date().toISOString()
// // // //   }]);
// // // //   const [inputText, setInputText] = useState('');
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [sessionId, setSessionId] = useState(null);

// // // //   // --- 1. ACTION EXECUTION (THE "DO" PART) ---
// // // //   const executeProtocolAction = async (actionData, messageId) => {
// // // //     setLoading(true);
// // // //     try {
// // // //       let endpoint = '';
// // // //       let payload = {};

// // // //       // Mapping AI Intent to your specific CRUD APIs
// // // //       switch (actionData.action) {
// // // //         case 'create_income':
// // // //           endpoint = '/income/';
// // // //           payload = {
// // // //             name: actionData.name || "New Income",
// // // //             source_type: actionData.income_type || "salary", // Matches income_type_enum
// // // //             rate_type: actionData.rate_type || "fixed",      // Matches rate_type_enum
// // // //             estimated_monthly_amount: actionData.amount || actionData.limit_amount,
// // // //             api_source_identifier: "chatbot"
// // // //           };
// // // //           break;

// // // //         case 'create_investment':
// // // //           endpoint = '/investments/';
// // // //           payload = {
// // // //             asset_type: actionData.asset_type || "stock", // Matches asset_type_enum
// // // //             identifier: actionData.identifier || actionData.name?.toUpperCase(),
// // // //             name: actionData.name,
// // // //             quantity: 1, // Assumed if not provided
// // // //             avg_buy_price: actionData.amount,
// // // //             is_pinned: true
// // // //           };
// // // //           break;

// // // //         case 'create_budget':
// // // //           endpoint = '/budgets/';
// // // //           payload = {
// // // //             name: actionData.name,
// // // //             limit_amount: actionData.limit_amount,
// // // //             period: actionData.period || "monthly",
// // // //             included_category_ids: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"], // General default
// // // //             alert_threshold: 80
// // // //           };
// // // //           break;

// // // //         case 'create_transaction':
// // // //           endpoint = '/transactions/';
// // // //           payload = {
// // // //             amount: actionData.amount,
// // // //             currency: "INR",
// // // //             occurred_at: new Date().toISOString(),
// // // //             category_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// // // //             merchant_raw: actionData.merchant_raw || "AI Entry",
// // // //             description: actionData.description || actionData.reasoning,
// // // //             source: "chatbot" // Matches txn_source_enum
// // // //           };
// // // //           break;
// // // //       }

// // // //       // Hit the real backend CRUD endpoint
// // // //       await ApiService.post(endpoint, payload);

// // // //       // Update UI state
// // // //       setMessages(prev => prev.map(m => m.id === messageId ? { ...m, protocolStatus: 'executed' } : m));
// // // //       setMessages(prev => [...prev, {
// // // //         id: `conf-${Date.now()}`, role: 'ai',
// // // //         content: `✅ Protocol executed. I have updated your ${actionData.action.split('_')[1]} records.`,
// // // //         timestamp: new Date().toISOString()
// // // //       }]);

// // // //     } catch (error) {
// // // //       console.error("CRUD Error:", error.response?.data);
// // // //       Alert.alert("Execution Failed", "The database rejected the AI parameters. Please try with more specific details.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // --- 2. SEND COMMAND ---
// // // //   const handleSend = async () => {
// // // //     if (!inputText.trim() || loading) return;

// // // //     const userMsg = { id: `u-${Date.now()}`, role: 'user', content: inputText.trim(), timestamp: new Date().toISOString() };
// // // //     setMessages(prev => [...prev, userMsg]);
// // // //     const currentInput = inputText;
// // // //     setInputText('');
// // // //     setLoading(true);

// // // //     try {
// // // //       const res = await ApiService.post('/chat/', { 
// // // //         message: currentInput, 
// // // //         session_id: sessionId 
// // // //       });
      
// // // //       const aiResponse = {
// // // //         id: `ai-${Date.now()}`,
// // // //         role: 'ai',
// // // //         content: res.data.response,
// // // //         timestamp: new Date().toISOString(),
// // // //         // This is where we catch the intent from Gemini
// // // //         actionMetadata: res.data.action_metadata 
// // // //       };

// // // //       if (res.data.session_id) setSessionId(res.data.session_id);
// // // //       setMessages(prev => [...prev, aiResponse]);

// // // //     } catch (e) {
// // // //       setMessages(prev => [...prev, { id: `err-${Date.now()}`, role: 'ai', content: 'Connection severed.', timestamp: new Date().toISOString() }]);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <LinearGradient colors={['#000', '#0A0A0A']} style={{ flex: 1 }}>
// // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
// // // //           {/* HEADER */}
// // // //           <XStack p="$4" jc="space-between" ai="center" bbw={1} bc="rgba(255,255,255,0.05)">
// // // //             <TouchableOpacity onPress={() => router.back()}><ChevronLeft size={24} color="white" /></TouchableOpacity>
// // // //             <XStack ai="center" space="$2">
// // // //               <Terminal size={18} color="#EAB308" />
// // // //               <Text color="white" fontWeight="900" ls={1}>COMMAND BRIDGE</Text>
// // // //             </XStack>
// // // //             <ShieldCheck size={20} color="#EAB308" />
// // // //           </XStack>

// // // //           {/* CHAT TERMINAL */}
// // // //           <ScrollView 
// // // //             ref={scrollViewRef} 
// // // //             contentContainerStyle={{ padding: 20, paddingBottom: 250 }}
// // // //             onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
// // // //           >
// // // //             {messages.map((msg) => (
// // // //               <YStack key={msg.id} mb="$4">
// // // //                 <XStack space="$3" fd={msg.role === 'user' ? 'row-reverse' : 'row'}>
// // // //                   <Circle size={32} bg={msg.role === 'user' ? '#222' : '#EAB308'} bw={1} bc="rgba(255,255,255,0.1)">
// // // //                     {msg.role === 'user' ? <User size={14} color="white" /> : <Cpu size={14} color="black" />}
// // // //                   </Circle>
// // // //                   <Card p="$3" br="$4" f={1} maxW="85%" bg={msg.role === 'user' ? '#070707' : '#0b0b0b'} bc={msg.role === 'user' ? '#1c1c1c' : 'rgba(234, 179, 8, 0.4)'} bw={1}>
// // // //                     <Text color="white" fontSize={14} lineHeight={20}>{msg.content}</Text>
// // // //                   </Card>
// // // //                 </XStack>

// // // //                 {/* --- PROTOCOL DRAFT CARD (The CRUD Trigger) --- */}
// // // //                 {msg.actionMetadata && msg.actionMetadata.action !== 'none' && !msg.protocolStatus && (
// // // //                   <YStack mt="$3" ml={40}>
// // // //                     <Card p="$4" bg="#111" bw={1} bc="#EAB308" br="$5">
// // // //                       <XStack ai="center" space="$2" mb="$2">
// // // //                         <Zap size={14} color="#EAB308" />
// // // //                         <Text color="#EAB308" fontWeight="900" fontSize={10} ls={2}>PENDING EXECUTION</Text>
// // // //                       </XStack>
// // // //                       <Text color="white" fontWeight="800" fontSize={18} mb="$1">
// // // //                         {msg.actionMetadata.action.toUpperCase().replace('_', ' ')}
// // // //                       </Text>
// // // //                       <YStack my="$2" space="$1">
// // // //                         {msg.actionMetadata.amount && <Text color="$gray11" fontSize={12}>Value: ₹{msg.actionMetadata.amount}</Text>}
// // // //                         {msg.actionMetadata.name && <Text color="$gray11" fontSize={12}>Label: {msg.actionMetadata.name}</Text>}
// // // //                       </YStack>
// // // //                       <XStack space="$3" mt="$2">
// // // //                         <Button f={1} bg="#EAB308" color="black" fontWeight="900" onPress={() => executeProtocolAction(msg.actionMetadata, msg.id)}>Execute</Button>
// // // //                         <Button f={1} chromeless bc="#333" bw={1} onPress={() => setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, protocolStatus: 'aborted' } : m))}>Abort</Button>
// // // //                       </XStack>
// // // //                     </Card>
// // // //                   </YStack>
// // // //                 )}
// // // //               </YStack>
// // // //             ))}
// // // //             {loading && <Spinner color="#EAB308" m="$4" />}
// // // //           </ScrollView>

// // // //           {/* INPUT AREA */}
// // // //           <KeyboardAvoidingView 
// // // //             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // //             keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
// // // //             style={{ position: 'absolute', bottom: 0, left: 0, right: 0, bg: '#000', p: 16, pb: insets.bottom + 20 }}
// // // //           >
// // // //             <XStack ai="center" bg="#111" br="$10" px="$4" py="$1" bw={1} bc="#333">
// // // //               <Input 
// // // //                 ref={inputRef} f={1} placeholder="Command protocol..." color="white" bw={0} bg="transparent"
// // // //                 value={inputText} onChangeText={setInputText} multiline
// // // //               />
// // // //               <TouchableOpacity onPress={handleSend} disabled={loading || !inputText.trim()}>
// // // //                 <Circle size={70} bg={inputText.trim() ? "#EAB308" : "#222"}>
// // // //                   <Send size={60} color={inputText.trim() ? "black" : "#444"} />
// // // //                 </Circle>
// // // //               </TouchableOpacity>
// // // //             </XStack>
// // // //           </KeyboardAvoidingView>

// // // //         </SafeAreaView>
// // // //       </LinearGradient>
// // // //     </Theme>
// // // //   );
// // // // }


// // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // import { 
// // // // // // // //   KeyboardAvoidingView, 
// // // // // // // //   Platform, 
// // // // // // // //   ScrollView, 
// // // // // // // //   TouchableOpacity, 
// // // // // // // //   Alert,
// // // // // // // //   Dimensions 
// // // // // // // // } from 'react-native';
// // // // // // // // import { 
// // // // // // // //   YStack, 
// // // // // // // //   XStack, 
// // // // // // // //   Text, 
// // // // // // // //   Input, 
// // // // // // // //   Button, 
// // // // // // // //   Spinner, 
// // // // // // // //   Theme, 
// // // // // // // //   Circle, 
// // // // // // // //   Card,
// // // // // // // //   View 
// // // // // // // // } from 'tamagui';
// // // // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // // // import { 
// // // // // // // //   Send, 
// // // // // // // //   Cpu, 
// // // // // // // //   User, 
// // // // // // // //   Sparkles, 
// // // // // // // //   ShieldCheck, 
// // // // // // // //   ChevronLeft,
// // // // // // // //   DollarSign, 
// // // // // // // //   TrendingUp, 
// // // // // // // //   Wallet, 
// // // // // // // //   PieChart, 
// // // // // // // //   Target,
// // // // // // // //   Trash2,
// // // // // // // //   Check,
// // // // // // // //   X,
// // // // // // // //   AlertCircle,
// // // // // // // //   Calendar,
// // // // // // // //   Clock,
// // // // // // // //   BarChart3,
// // // // // // // //   CreditCard,
// // // // // // // //   Home,
// // // // // // // //   ShoppingBag,
// // // // // // // //   Coffee,
// // // // // // // //   Car,
// // // // // // // //   Plane,
// // // // // // // //   GraduationCap,
// // // // // // // //   Heart
// // // // // // // // } from '@tamagui/lucide-icons';
// // // // // // // // import { useRouter } from 'expo-router';
// // // // // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // // // // // import { ApiService } from '../../../services/apiService';

// // // // // // // // const { width } = Dimensions.get('window');

// // // // // // // // // Category icons mapping
// // // // // // // // const CATEGORY_ICONS = {
// // // // // // // //   'food': Coffee,
// // // // // // // //   'groceries': ShoppingBag,
// // // // // // // //   'rent': Home,
// // // // // // // //   'shopping': ShoppingBag,
// // // // // // // //   'transport': Car,
// // // // // // // //   'travel': Plane,
// // // // // // // //   'education': GraduationCap,
// // // // // // // //   'health': Heart,
// // // // // // // //   'entertainment': Sparkles,
// // // // // // // //   'general': CreditCard
// // // // // // // // };

// // // // // // // // export default function FinancialChat() {
// // // // // // // //   const router = useRouter();
// // // // // // // //   const insets = useSafeAreaInsets();
// // // // // // // //   const scrollViewRef = useRef(null);
// // // // // // // //   const inputRef = useRef(null);
  
// // // // // // // //   // --- STATE ---
// // // // // // // //   const [messages, setMessages] = useState([{
// // // // // // // //     id: 'welcome-1', 
// // // // // // // //     role: 'ai', 
// // // // // // // //     content: 'Hello! I\'m your financial assistant. I can help you:\n\n• Create budgets\n• Record transactions\n• Set financial goals\n• Allocate goals\n• Add income sources\n• Track investments\n• Delete entries\n\nWhat would you like to do?',
// // // // // // // //     timestamp: new Date().toISOString()
// // // // // // // //   }]);
  
// // // // // // // //   const [inputText, setInputText] = useState('');
// // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // //   const [sessionId, setSessionId] = useState(null);
// // // // // // // //   const [previewData, setPreviewData] = useState(null);
// // // // // // // //   const [confirmAction, setConfirmAction] = useState(null);

// // // // // // // //   // --- AUTO-SCROLL ---
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (scrollViewRef.current) {
// // // // // // // //       scrollViewRef.current.scrollToEnd({ animated: true });
// // // // // // // //     }
// // // // // // // //   }, [messages, previewData]);

// // // // // // // //   // --- 1. ACTION EXECUTION ---
// // // // // // // //   const executeAction = async (actionData, messageId) => {
// // // // // // // //     setLoading(true);
// // // // // // // //     try {
// // // // // // // //       let endpoint = '';
// // // // // // // //       let payload = {};
// // // // // // // //       let successMessage = '';

// // // // // // // //       switch (actionData.action) {
// // // // // // // //         case 'create_budget':
// // // // // // // //           endpoint = '/budgets/';
// // // // // // // //           payload = {
// // // // // // // //             name: actionData.name || 'General Budget',
// // // // // // // //             limit_amount: actionData.limit_amount,
// // // // // // // //             period: actionData.period || 'monthly',
// // // // // // // //             included_category_ids: [],
// // // // // // // //             alert_threshold: 80
// // // // // // // //           };
// // // // // // // //           successMessage = `Budget "${actionData.name}" created with limit of ₹${actionData.limit_amount}`;
// // // // // // // //           break;

// // // // // // // //         case 'create_transaction':
// // // // // // // //           endpoint = '/transactions/';
// // // // // // // //           payload = {
// // // // // // // //             amount: actionData.amount,
// // // // // // // //             currency: "INR",
// // // // // // // //             occurred_at: new Date().toISOString(),
// // // // // // // //             category_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // General category
// // // // // // // //             merchant_raw: actionData.merchant_raw || 'Unknown',
// // // // // // // //             description: actionData.description || '',
// // // // // // // //             source: "chat"
// // // // // // // //           };
// // // // // // // //           successMessage = `Transaction of ₹${actionData.amount} recorded`;
// // // // // // // //           break;

// // // // // // // //         case 'create_goal':
// // // // // // // //           endpoint = '/goals/';
// // // // // // // //           payload = {
// // // // // // // //             name: actionData.name,
// // // // // // // //             target_amount: actionData.target_amount,
// // // // // // // //             target_date: actionData.target_date
// // // // // // // //           };
// // // // // // // //           successMessage = `Goal "${actionData.name}" created - ₹${actionData.target_amount} by ${actionData.target_date}`;
// // // // // // // //           break;

// // // // // // // //         case 'allocate_goal':
// // // // // // // //           endpoint = `/goals/${actionData.goal_id}/allocate`;
// // // // // // // //           payload = {
// // // // // // // //             allocation_percentage: actionData.allocation_percentage,
// // // // // // // //             allocation_fixed_amount: actionData.allocation_fixed_amount,
// // // // // // // //             allocation_type: "expected_return"
// // // // // // // //           };
// // // // // // // //           successMessage = `Allocated to goal successfully`;
// // // // // // // //           break;

// // // // // // // //         case 'create_income':
// // // // // // // //           endpoint = '/income/';
// // // // // // // //           payload = {
// // // // // // // //             name: actionData.name || "Income Source",
// // // // // // // //             source_type: actionData.income_type || "salary",
// // // // // // // //             rate_type: actionData.rate_type || "fixed",
// // // // // // // //             estimated_monthly_amount: actionData.estimated_monthly_amount || actionData.amount
// // // // // // // //           };
// // // // // // // //           successMessage = `Income source "${actionData.name}" added - ₹${payload.estimated_monthly_amount}/month`;
// // // // // // // //           break;

// // // // // // // //         case 'create_investment':
// // // // // // // //           endpoint = '/investments/';
// // // // // // // //           payload = {
// // // // // // // //             asset_type: actionData.asset_type || "stock",
// // // // // // // //             identifier: actionData.identifier || "GENERAL",
// // // // // // // //             name: actionData.name || "Investment",
// // // // // // // //             quantity: actionData.quantity || 1,
// // // // // // // //             avg_buy_price: actionData.avg_buy_price || actionData.amount,
// // // // // // // //             is_pinned: true
// // // // // // // //           };
// // // // // // // //           successMessage = `Investment "${actionData.name}" added`;
// // // // // // // //           break;

// // // // // // // //         case 'delete_entry':
// // // // // // // //           // This would need entity_id which we might not have
// // // // // // // //           Alert.alert('Delete Action', 'Please specify what exactly you want to delete.');
// // // // // // // //           setLoading(false);
// // // // // // // //           return;
// // // // // // // //       }

// // // // // // // //       const response = await ApiService.post(endpoint, payload);
      
// // // // // // // //       // Update message status
// // // // // // // //       setMessages(prev => prev.map(m => 
// // // // // // // //         m.id === messageId ? { ...m, status: 'executed', resultId: response.data.id } : m
// // // // // // // //       ));

// // // // // // // //       // Add success message
// // // // // // // //       setMessages(prev => [...prev, {
// // // // // // // //         id: `success-${Date.now()}`,
// // // // // // // //         role: 'ai',
// // // // // // // //         content: `✅ ${successMessage}`,
// // // // // // // //         timestamp: new Date().toISOString(),
// // // // // // // //         isSuccess: true
// // // // // // // //       }]);

// // // // // // // //       // Clear preview
// // // // // // // //       setPreviewData(null);
// // // // // // // //       setConfirmAction(null);

// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Action execution error:', error);
// // // // // // // //       Alert.alert(
// // // // // // // //         'Action Failed',
// // // // // // // //         error.response?.data?.detail || 'Something went wrong. Please try again.'
// // // // // // // //       );
      
// // // // // // // //       setMessages(prev => [...prev, {
// // // // // // // //         id: `error-${Date.now()}`,
// // // // // // // //         role: 'ai',
// // // // // // // //         content: '❌ Failed to execute. Please check your details and try again.',
// // // // // // // //         timestamp: new Date().toISOString()
// // // // // // // //       }]);
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // --- 2. SEND MESSAGE ---
// // // // // // // //   const handleSend = async () => {
// // // // // // // //     if (!inputText.trim() || loading) return;

// // // // // // // //     const userMessage = {
// // // // // // // //       id: `user-${Date.now()}`,
// // // // // // // //       role: 'user',
// // // // // // // //       content: inputText.trim(),
// // // // // // // //       timestamp: new Date().toISOString()
// // // // // // // //     };
    
// // // // // // // //     setMessages(prev => [...prev, userMessage]);
// // // // // // // //     const currentText = inputText;
// // // // // // // //     setInputText('');
// // // // // // // //     setLoading(true);

// // // // // // // //     try {
// // // // // // // //       // First, try to get preview
// // // // // // // //       const previewRes = await ApiService.post('/chat/preview-transaction', {
// // // // // // // //         message: currentText
// // // // // // // //       });

// // // // // // // //       if (previewRes.data.preview) {
// // // // // // // //         setPreviewData(previewRes.data.preview);
// // // // // // // //         setMessages(prev => [...prev, {
// // // // // // // //           id: `preview-${Date.now()}`,
// // // // // // // //           role: 'ai',
// // // // // // // //           content: 'I detected a transaction. Please confirm:',
// // // // // // // //           timestamp: new Date().toISOString(),
// // // // // // // //           hasPreview: true
// // // // // // // //         }]);
// // // // // // // //         setLoading(false);
// // // // // // // //         return;
// // // // // // // //       }
// // // // // // // //     } catch (previewError) {
// // // // // // // //       // Preview not available or not a transaction
// // // // // // // //       console.log('No preview available, proceeding to chat');
// // // // // // // //     }

// // // // // // // //     // Regular chat
// // // // // // // //     try {
// // // // // // // //       const chatRes = await ApiService.post('/chat/', {
// // // // // // // //         message: currentText,
// // // // // // // //         session_id: sessionId
// // // // // // // //       });

// // // // // // // //       const aiResponse = {
// // // // // // // //         id: `ai-${Date.now()}`,
// // // // // // // //         role: 'ai',
// // // // // // // //         content: chatRes.data.response,
// // // // // // // //         timestamp: new Date().toISOString(),
// // // // // // // //         sessionId: chatRes.data.session_id
// // // // // // // //       };

// // // // // // // //       if (chatRes.data.session_id) {
// // // // // // // //         setSessionId(chatRes.data.session_id);
// // // // // // // //       }

// // // // // // // //       // Check if response contains action confirmation request
// // // // // // // //       if (chatRes.data.response && chatRes.data.response.toLowerCase().includes('confirm')) {
// // // // // // // //         setConfirmAction({
// // // // // // // //           messageId: aiResponse.id,
// // // // // // // //           requiresConfirmation: true
// // // // // // // //         });
// // // // // // // //       }

// // // // // // // //       setMessages(prev => [...prev, aiResponse]);

// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Chat error:', error);
// // // // // // // //       setMessages(prev => [...prev, {
// // // // // // // //         id: `error-${Date.now()}`,
// // // // // // // //         role: 'ai',
// // // // // // // //         content: 'Sorry, I encountered an error. Please try again.',
// // // // // // // //         timestamp: new Date().toISOString()
// // // // // // // //       }]);
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // --- 3. QUICK ACTION BUTTONS ---
// // // // // // // //   const quickActions = [
// // // // // // // //     { 
// // // // // // // //       icon: Wallet, 
// // // // // // // //       label: 'Add Transaction', 
// // // // // // // //       prompt: 'Spent 500 at Starbucks for coffee',
// // // // // // // //       color: '#10B981' 
// // // // // // // //     },
// // // // // // // //     { 
// // // // // // // //       icon: BarChart3, 
// // // // // // // //       label: 'Create Budget', 
// // // // // // // //       prompt: 'Create a 5000 monthly food budget',
// // // // // // // //       color: '#3B82F6' 
// // // // // // // //     },
// // // // // // // //     { 
// // // // // // // //       icon: Target, 
// // // // // // // //       label: 'Set Goal', 
// // // // // // // //       prompt: 'Save 1 lakh for vacation by December',
// // // // // // // //       color: '#8B5CF6' 
// // // // // // // //     },
// // // // // // // //     { 
// // // // // // // //       icon: DollarSign, 
// // // // // // // //       label: 'Add Income', 
// // // // // // // //       prompt: 'Monthly salary of 75000 from Google',
// // // // // // // //       color: '#F59E0B' 
// // // // // // // //     },
// // // // // // // //   ];

// // // // // // // //   const handleQuickAction = (prompt) => {
// // // // // // // //     setInputText(prompt);
// // // // // // // //     inputRef.current?.focus();
// // // // // // // //   };

// // // // // // // //   // --- 4. CONFIRM TRANSACTION PREVIEW ---
// // // // // // // //   const confirmPreview = async () => {
// // // // // // // //     if (!previewData) return;
    
// // // // // // // //     setLoading(true);
// // // // // // // //     try {
// // // // // // // //       // Create transaction from preview
// // // // // // // //       const response = await ApiService.post('/transactions/', {
// // // // // // // //         amount: previewData.amount,
// // // // // // // //         currency: "INR",
// // // // // // // //         occurred_at: new Date().toISOString(),
// // // // // // // //         category_id: previewData.category_id || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// // // // // // // //         merchant_raw: previewData.merchant,
// // // // // // // //         description: previewData.description || '',
// // // // // // // //         source: "chat"
// // // // // // // //       });

// // // // // // // //       setMessages(prev => [...prev, {
// // // // // // // //         id: `confirmed-${Date.now()}`,
// // // // // // // //         role: 'ai',
// // // // // // // //         content: `✅ Transaction confirmed: ₹${previewData.amount} at ${previewData.merchant}`,
// // // // // // // //         timestamp: new Date().toISOString(),
// // // // // // // //         isSuccess: true
// // // // // // // //       }]);

// // // // // // // //       setPreviewData(null);
// // // // // // // //     } catch (error) {
// // // // // // // //       Alert.alert('Error', 'Failed to save transaction');
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // --- 5. RENDER MESSAGE ---
// // // // // // // //   const renderMessage = (msg) => {
// // // // // // // //     const Icon = msg.role === 'user' ? User : Cpu;
// // // // // // // //     const bgColor = msg.role === 'user' ? '#1E40AF' : '#1F2937';
// // // // // // // //     const textColor = msg.role === 'user' ? 'white' : '#E5E7EB';

// // // // // // // //     return (
// // // // // // // //       <YStack key={msg.id} mb="$3">
// // // // // // // //         <XStack 
// // // // // // // //           space="$3" 
// // // // // // // //           fd={msg.role === 'user' ? 'row-reverse' : 'row'}
// // // // // // // //           ai="flex-start"
// // // // // // // //         >
// // // // // // // //           <Circle 
// // // // // // // //             size={36} 
// // // // // // // //             bg={msg.role === 'user' ? '#3B82F6' : '#8B5CF6'}
// // // // // // // //             bw={1} 
// // // // // // // //             bc="rgba(255,255,255,0.1)"
// // // // // // // //           >
// // // // // // // //             <Icon size={16} color="white" />
// // // // // // // //           </Circle>
          
// // // // // // // //           <Card 
// // // // // // // //             p="$3" 
// // // // // // // //             br="$4" 
// // // // // // // //             maxWidth={width * 0.75}
// // // // // // // //             bg={bgColor}
// // // // // // // //             bc={msg.isSuccess ? '#10B981' : 'transparent'}
// // // // // // // //             bw={msg.isSuccess ? 2 : 0}
// // // // // // // //           >
// // // // // // // //             <Text 
// // // // // // // //               color={textColor} 
// // // // // // // //               fontSize={15} 
// // // // // // // //               lineHeight={22}
// // // // // // // //               selectable
// // // // // // // //             >
// // // // // // // //               {msg.content}
// // // // // // // //             </Text>
            
// // // // // // // //             {msg.timestamp && (
// // // // // // // //               <Text 
// // // // // // // //                 color={msg.role === 'user' ? '#93C5FD' : '#9CA3AF'} 
// // // // // // // //                 fontSize={10} 
// // // // // // // //                 mt="$1"
// // // // // // // //               >
// // // // // // // //                 {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// // // // // // // //               </Text>
// // // // // // // //             )}
// // // // // // // //           </Card>
// // // // // // // //         </XStack>
// // // // // // // //       </YStack>
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <Theme name="dark">
// // // // // // // //       <LinearGradient 
// // // // // // // //         colors={['#0F172A', '#1E293B']} 
// // // // // // // //         style={{ flex: 1 }}
// // // // // // // //       >
// // // // // // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
// // // // // // // //           {/* HEADER */}
// // // // // // // //           <XStack 
// // // // // // // //             p="$4" 
// // // // // // // //             jc="space-between" 
// // // // // // // //             ai="center" 
// // // // // // // //             bbw={1} 
// // // // // // // //             bc="rgba(255,255,255,0.05)"
// // // // // // // //             bg="rgba(15, 23, 42, 0.95)"
// // // // // // // //           >
// // // // // // // //             <TouchableOpacity onPress={() => router.back()}>
// // // // // // // //               <ChevronLeft size={24} color="#CBD5E1" />
// // // // // // // //             </TouchableOpacity>
            
// // // // // // // //             <XStack ai="center" space="$2">
// // // // // // // //               <Sparkles size={18} color="#8B5CF6" />
// // // // // // // //               <Text color="white" fontWeight="bold" fontSize={18}>
// // // // // // // //                 Financial Assistant
// // // // // // // //               </Text>
// // // // // // // //             </XStack>
            
// // // // // // // //             <ShieldCheck size={20} color="#10B981" />
// // // // // // // //           </XStack>

// // // // // // // //           {/* CHAT MESSAGES */}
// // // // // // // //           <ScrollView 
// // // // // // // //             ref={scrollViewRef}
// // // // // // // //             contentContainerStyle={{ 
// // // // // // // //               padding: 16,
// // // // // // // //               paddingBottom: 180 
// // // // // // // //             }}
// // // // // // // //             showsVerticalScrollIndicator={false}
// // // // // // // //           >
// // // // // // // //             {messages.map(renderMessage)}
            
// // // // // // // //             {/* TRANSACTION PREVIEW */}
// // // // // // // //             {previewData && (
// // // // // // // //               <YStack mt="$3" animation="quick" enterStyle={{ opacity: 0, y: 20 }}>
// // // // // // // //                 <Card p="$4" bg="#1E293B" br="$5" bw={1} bc="#3B82F6">
// // // // // // // //                   <XStack ai="center" space="$2" mb="$3">
// // // // // // // //                     <AlertCircle size={16} color="#3B82F6" />
// // // // // // // //                     <Text color="#3B82F6" fontWeight="bold" fontSize={14}>
// // // // // // // //                       TRANSACTION PREVIEW
// // // // // // // //                     </Text>
// // // // // // // //                   </XStack>
                  
// // // // // // // //                   <YStack space="$2" mb="$4">
// // // // // // // //                     <XStack jc="space-between">
// // // // // // // //                       <Text color="#CBD5E1">Amount:</Text>
// // // // // // // //                       <Text color="white" fontWeight="bold">
// // // // // // // //                         ₹{previewData.amount}
// // // // // // // //                       </Text>
// // // // // // // //                     </XStack>
                    
// // // // // // // //                     {previewData.merchant && (
// // // // // // // //                       <XStack jc="space-between">
// // // // // // // //                         <Text color="#CBD5E1">Merchant:</Text>
// // // // // // // //                         <Text color="white">{previewData.merchant}</Text>
// // // // // // // //                       </XStack>
// // // // // // // //                     )}
                    
// // // // // // // //                     {previewData.category && (
// // // // // // // //                       <XStack jc="space-between">
// // // // // // // //                         <Text color="#CBD5E1">Category:</Text>
// // // // // // // //                         <Text color="white">{previewData.category}</Text>
// // // // // // // //                       </XStack>
// // // // // // // //                     )}
                    
// // // // // // // //                     {previewData.description && (
// // // // // // // //                       <XStack jc="space-between">
// // // // // // // //                         <Text color="#CBD5E1">Description:</Text>
// // // // // // // //                         <Text color="white">{previewData.description}</Text>
// // // // // // // //                       </XStack>
// // // // // // // //                     )}
// // // // // // // //                   </YStack>
                  
// // // // // // // //                   <XStack space="$3">
// // // // // // // //                     <Button 
// // // // // // // //                       f={1} 
// // // // // // // //                       bg="#10B981" 
// // // // // // // //                       color="white" 
// // // // // // // //                       fontWeight="bold"
// // // // // // // //                       onPress={confirmPreview}
// // // // // // // //                       disabled={loading}
// // // // // // // //                     >
// // // // // // // //                       <Check size={16} />
// // // // // // // //                       <Text ml="$2">Confirm</Text>
// // // // // // // //                     </Button>
                    
// // // // // // // //                     <Button 
// // // // // // // //                       f={1} 
// // // // // // // //                       chromeless 
// // // // // // // //                       bc="#475569" 
// // // // // // // //                       bw={1}
// // // // // // // //                       onPress={() => setPreviewData(null)}
// // // // // // // //                     >
// // // // // // // //                       <X size={16} color="#CBD5E1" />
// // // // // // // //                       <Text ml="$2" color="#CBD5E1">Cancel</Text>
// // // // // // // //                     </Button>
// // // // // // // //                   </XStack>
// // // // // // // //                 </Card>
// // // // // // // //               </YStack>
// // // // // // // //             )}
            
// // // // // // // //             {/* CONFIRMATION REQUEST */}
// // // // // // // //             {confirmAction && (
// // // // // // // //               <YStack mt="$3" animation="quick">
// // // // // // // //                 <Card p="$3" bg="#1E293B" br="$5" bw={1} bc="#F59E0B">
// // // // // // // //                   <XStack ai="center" space="$2" mb="$2">
// // // // // // // //                     <AlertCircle size={14} color="#F59E0B" />
// // // // // // // //                     <Text color="#F59E0B" fontWeight="bold" fontSize={12}>
// // // // // // // //                       CONFIRMATION REQUIRED
// // // // // // // //                     </Text>
// // // // // // // //                   </XStack>
                  
// // // // // // // //                   <Text color="white" fontSize={14} mb="$3">
// // // // // // // //                     The AI needs your confirmation to proceed. Reply with "confirm" or "yes".
// // // // // // // //                   </Text>
                  
// // // // // // // //                   <Button 
// // // // // // // //                     bg="#F59E0B" 
// // // // // // // //                     color="black" 
// // // // // // // //                     fontWeight="bold"
// // // // // // // //                     onPress={() => {
// // // // // // // //                       setInputText('confirm');
// // // // // // // //                       handleSend();
// // // // // // // //                       setConfirmAction(null);
// // // // // // // //                     }}
// // // // // // // //                   >
// // // // // // // //                     <Check size={14} />
// // // // // // // //                     <Text ml="$2">Send "confirm"</Text>
// // // // // // // //                   </Button>
// // // // // // // //                 </Card>
// // // // // // // //               </YStack>
// // // // // // // //             )}
            
// // // // // // // //             {loading && (
// // // // // // // //               <XStack jc="center" mt="$4">
// // // // // // // //                 <Spinner color="#8B5CF6" size="large" />
// // // // // // // //               </XStack>
// // // // // // // //             )}
// // // // // // // //           </ScrollView>

// // // // // // // //           {/* QUICK ACTIONS */}
// // // // // // // //           <ScrollView 
// // // // // // // //             horizontal 
// // // // // // // //             showsHorizontalScrollIndicator={false}
// // // // // // // //             style={{
// // // // // // // //               position: 'absolute',
// // // // // // // //               bottom: 100,
// // // // // // // //               left: 0,
// // // // // // // //               right: 0,
// // // // // // // //               paddingHorizontal: 16
// // // // // // // //             }}
// // // // // // // //             contentContainerStyle={{ paddingRight: 16 }}
// // // // // // // //           >
// // // // // // // //             <XStack space="$3">
// // // // // // // //               {quickActions.map((action, index) => {
// // // // // // // //                 const ActionIcon = action.icon;
// // // // // // // //                 return (
// // // // // // // //                   <TouchableOpacity
// // // // // // // //                     key={index}
// // // // // // // //                     onPress={() => handleQuickAction(action.prompt)}
// // // // // // // //                   >
// // // // // // // //                     <Card 
// // // // // // // //                       p="$3" 
// // // // // // // //                       br="$4" 
// // // // // // // //                       bg="#1E293B" 
// // // // // // // //                       bc={action.color} 
// // // // // // // //                       bw={1}
// // // // // // // //                     >
// // // // // // // //                       <YStack ai="center" space="$1">
// // // // // // // //                         <ActionIcon size={18} color={action.color} />
// // // // // // // //                         <Text 
// // // // // // // //                           color="white" 
// // // // // // // //                           fontSize={12} 
// // // // // // // //                           fontWeight="medium"
// // // // // // // //                           textAlign="center"
// // // // // // // //                           maxWidth={80}
// // // // // // // //                         >
// // // // // // // //                           {action.label}
// // // // // // // //                         </Text>
// // // // // // // //                       </YStack>
// // // // // // // //                     </Card>
// // // // // // // //                   </TouchableOpacity>
// // // // // // // //                 );
// // // // // // // //               })}
// // // // // // // //             </XStack>
// // // // // // // //           </ScrollView>

// // // // // // // //           {/* INPUT AREA */}
// // // // // // // //           <KeyboardAvoidingView 
// // // // // // // //             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // // // // // //             keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
// // // // // // // //             style={{
// // // // // // // //               position: 'absolute',
// // // // // // // //               bottom: 0,
// // // // // // // //               left: 0,
// // // // // // // //               right: 0,
// // // // // // // //               backgroundColor: '#0F172A',
// // // // // // // //               padding: 16,
// // // // // // // //               paddingBottom: insets.bottom + 16,
// // // // // // // //               borderTopWidth: 1,
// // // // // // // //               borderTopColor: 'rgba(255,255,255,0.05)'
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             <XStack ai="flex-end" space="$3">
// // // // // // // //               <Input 
// // // // // // // //                 ref={inputRef}
// // // // // // // //                 flex={1}
// // // // // // // //                 placeholder="Type your financial command..."
// // // // // // // //                 color="white"
// // // // // // // //                 placeholderTextColor="#94A3B8"
// // // // // // // //                 fontSize={16}
// // // // // // // //                 minHeight={44}
// // // // // // // //                 maxHeight={120}
// // // // // // // //                 multiline
// // // // // // // //                 numberOfLines={3}
// // // // // // // //                 value={inputText}
// // // // // // // //                 onChangeText={setInputText}
// // // // // // // //                 onSubmitEditing={handleSend}
// // // // // // // //                 returnKeyType="send"
// // // // // // // //                 blurOnSubmit={false}
// // // // // // // //                 borderWidth={1}
// // // // // // // //                 borderColor="#334155"
// // // // // // // //                 bg="#1E293B"
// // // // // // // //                 br="$4"
// // // // // // // //               />
              
// // // // // // // //               <TouchableOpacity 
// // // // // // // //                 onPress={handleSend}
// // // // // // // //                 disabled={!inputText.trim() || loading}
// // // // // // // //               >
// // // // // // // //                 <Circle 
// // // // // // // //                   size={52} 
// // // // // // // //                   bg={inputText.trim() ? "#8B5CF6" : "#334155"}
// // // // // // // //                 >
// // // // // // // //                   {loading ? (
// // // // // // // //                     <Spinner color="white" size="small" />
// // // // // // // //                   ) : (
// // // // // // // //                     <Send size={20} color="white" />
// // // // // // // //                   )}
// // // // // // // //                 </Circle>
// // // // // // // //               </TouchableOpacity>
// // // // // // // //             </XStack>
            
// // // // // // // //             <Text 
// // // // // // // //               color="#64748B" 
// // // // // // // //               fontSize={12} 
// // // // // // // //               textAlign="center" 
// // // // // // // //               mt="$2"
// // // // // // // //             >
// // // // // // // //               Try: "Spent 500 at Starbucks" or "Create 5000 food budget"
// // // // // // // //             </Text>
// // // // // // // //           </KeyboardAvoidingView>

// // // // // // // //         </SafeAreaView>
// // // // // // // //       </LinearGradient>
// // // // // // // //     </Theme>
// // // // // // // //   );
// // // // // // // // }




// // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // import { 
// // // // // // //   KeyboardAvoidingView, 
// // // // // // //   Platform, 
// // // // // // //   ScrollView, 
// // // // // // //   TouchableOpacity, 
// // // // // // //   Alert,
// // // // // // //   Dimensions 
// // // // // // // } from 'react-native';
// // // // // // // import { 
// // // // // // //   YStack, 
// // // // // // //   XStack, 
// // // // // // //   Text, 
// // // // // // //   Input, 
// // // // // // //   Button, 
// // // // // // //   Spinner, 
// // // // // // //   Theme, 
// // // // // // //   Circle, 
// // // // // // //   Card,
// // // // // // //   View 
// // // // // // // } from 'tamagui';
// // // // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // // // import { 
// // // // // // //   Send, 
// // // // // // //   Cpu, 
// // // // // // //   User, 
// // // // // // //   Sparkles, 
// // // // // // //   ShieldCheck, 
// // // // // // //   ChevronLeft,
// // // // // // //   DollarSign, 
// // // // // // //   TrendingUp, 
// // // // // // //   Wallet, 
// // // // // // //   PieChart, 
// // // // // // //   Target,
// // // // // // //   Trash2,
// // // // // // //   Check,
// // // // // // //   X,
// // // // // // //   AlertCircle,
// // // // // // //   Calendar,
// // // // // // //   Clock,
// // // // // // //   BarChart3,
// // // // // // //   CreditCard,
// // // // // // //   Home,
// // // // // // //   ShoppingBag,
// // // // // // //   Coffee,
// // // // // // //   Car,
// // // // // // //   Plane,
// // // // // // //   GraduationCap,
// // // // // // //   Heart
// // // // // // // } from '@tamagui/lucide-icons';
// // // // // // // import { useRouter } from 'expo-router';
// // // // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // // // // import { ApiService } from '../../../services/apiService';

// // // // // // // const { width } = Dimensions.get('window');

// // // // // // // // Helper function to extract action from chat response
// // // // // // // const extractActionFromResponse = (response) => {
// // // // // // //   // Look for patterns in the AI response
// // // // // // //   const lowerResponse = response.toLowerCase();
  
// // // // // // //   if (lowerResponse.includes('budget') && lowerResponse.includes('created')) {
// // // // // // //     return 'budget_created';
// // // // // // //   }
// // // // // // //   if (lowerResponse.includes('transaction') && lowerResponse.includes('recorded')) {
// // // // // // //     return 'transaction_created';
// // // // // // //   }
// // // // // // //   if (lowerResponse.includes('goal') && lowerResponse.includes('created')) {
// // // // // // //     return 'goal_created';
// // // // // // //   }
// // // // // // //   if (lowerResponse.includes('income') && lowerResponse.includes('added')) {
// // // // // // //     return 'income_created';
// // // // // // //   }
// // // // // // //   if (lowerResponse.includes('investment') && lowerResponse.includes('added')) {
// // // // // // //     return 'investment_created';
// // // // // // //   }
// // // // // // //   if (lowerResponse.includes('allocated')) {
// // // // // // //     return 'goal_allocated';
// // // // // // //   }
  
// // // // // // //   return null;
// // // // // // // };

// // // // // // // // Parse amount from message
// // // // // // // const parseAmount = (text) => {
// // // // // // //   const amountMatch = text.match(/₹\s*(\d+(?:\.\d{1,2})?)/) || text.match(/(\d+(?:\.\d{1,2})?)\s*(?:rs|rupees|inr)/i);
// // // // // // //   return amountMatch ? parseFloat(amountMatch[1]) : null;
// // // // // // // };

// // // // // // // // Parse merchant from message
// // // // // // // const parseMerchant = (text) => {
// // // // // // //   const merchantKeywords = ['at', 'from', 'in', 'via'];
// // // // // // //   for (const keyword of merchantKeywords) {
// // // // // // //     const parts = text.toLowerCase().split(keyword);
// // // // // // //     if (parts.length > 1) {
// // // // // // //       return parts[1].trim().split(' ')[0];
// // // // // // //     }
// // // // // // //   }
// // // // // // //   return null;
// // // // // // // };

// // // // // // // export default function FinancialChat() {
// // // // // // //   const router = useRouter();
// // // // // // //   const insets = useSafeAreaInsets();
// // // // // // //   const scrollViewRef = useRef(null);
// // // // // // //   const inputRef = useRef(null);
  
// // // // // // //   // --- STATE ---
// // // // // // //   const [messages, setMessages] = useState([{
// // // // // // //     id: 'welcome-1', 
// // // // // // //     role: 'ai', 
// // // // // // //     content: 'Hello! I\'m your financial assistant. I can help you:\n\n• Create budgets\n• Record transactions\n• Set financial goals\n• Allocate goals\n• Add income sources\n• Track investments\n\nWhat would you like to do?',
// // // // // // //     timestamp: new Date().toISOString()
// // // // // // //   }]);
  
// // // // // // //   const [inputText, setInputText] = useState('');
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [sessionId, setSessionId] = useState(null);
// // // // // // //   const [pendingAction, setPendingAction] = useState(null);

// // // // // // //   // --- AUTO-SCROLL ---
// // // // // // //   useEffect(() => {
// // // // // // //     if (scrollViewRef.current) {
// // // // // // //       scrollViewRef.current.scrollToEnd({ animated: true });
// // // // // // //     }
// // // // // // //   }, [messages, pendingAction]);

// // // // // // //   // --- 1. MANUAL ACTION EXECUTION (when AI says to confirm) ---
// // // // // // //   const executeManualAction = async (userMessage, actionType) => {
// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       let endpoint = '';
// // // // // // //       let payload = {};
      
// // // // // // //       const amount = parseAmount(userMessage);
// // // // // // //       const merchant = parseMerchant(userMessage);

// // // // // // //       switch (actionType) {
// // // // // // //         case 'create_transaction':
// // // // // // //           endpoint = '/api/v1/transactions/';
// // // // // // //           payload = {
// // // // // // //             amount: amount || 0,
// // // // // // //             currency: "INR",
// // // // // // //             occurred_at: new Date().toISOString(),
// // // // // // //             category_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// // // // // // //             merchant_raw: merchant || 'Unknown',
// // // // // // //             description: userMessage,
// // // // // // //             source: "chat"
// // // // // // //           };
// // // // // // //           break;

// // // // // // //         case 'create_budget':
// // // // // // //           endpoint = '/api/v1/budgets/';
// // // // // // //           // Try to extract budget name
// // // // // // //           let budgetName = 'General Budget';
// // // // // // //           if (userMessage.includes('food') || userMessage.includes('groceries')) budgetName = 'Food Budget';
// // // // // // //           if (userMessage.includes('entertainment')) budgetName = 'Entertainment Budget';
// // // // // // //           if (userMessage.includes('transport')) budgetName = 'Transport Budget';
          
// // // // // // //           payload = {
// // // // // // //             name: budgetName,
// // // // // // //             limit_amount: amount || 0,
// // // // // // //             period: userMessage.includes('daily') ? 'daily' : 
// // // // // // //                     userMessage.includes('weekly') ? 'weekly' : 'monthly',
// // // // // // //             included_category_ids: [],
// // // // // // //             alert_threshold: 80
// // // // // // //           };
// // // // // // //           break;

// // // // // // //         case 'create_income':
// // // // // // //           endpoint = '/api/v1/income/';
// // // // // // //           payload = {
// // // // // // //             name: 'Salary',
// // // // // // //             source_type: 'salary',
// // // // // // //             rate_type: 'fixed',
// // // // // // //             estimated_monthly_amount: amount || 0,
// // // // // // //             api_source_identifier: "chat"
// // // // // // //           };
// // // // // // //           break;

// // // // // // //         case 'create_investment':
// // // // // // //           endpoint = '/api/v1/investments/';
// // // // // // //           // Try to extract investment type
// // // // // // //           let assetType = 'stock';
// // // // // // //           if (userMessage.includes('crypto') || userMessage.includes('bitcoin')) assetType = 'crypto';
// // // // // // //           if (userMessage.includes('mutual')) assetType = 'mutual_fund';
// // // // // // //           if (userMessage.includes('gold')) assetType = 'gold';
          
// // // // // // //           payload = {
// // // // // // //             asset_type: assetType,
// // // // // // //             identifier: 'GENERAL',
// // // // // // //             name: 'Investment',
// // // // // // //             quantity: 1,
// // // // // // //             avg_buy_price: amount || 0,
// // // // // // //             is_pinned: true
// // // // // // //           };
// // // // // // //           break;
// // // // // // //       }

// // // // // // //       if (endpoint) {
// // // // // // //         const response = await ApiService.post(endpoint, payload);
        
// // // // // // //         setMessages(prev => [...prev, {
// // // // // // //           id: `success-${Date.now()}`,
// // // // // // //           role: 'ai',
// // // // // // //           content: `✅ Successfully created ${actionType.replace('_', ' ')}`,
// // // // // // //           timestamp: new Date().toISOString(),
// // // // // // //           isSuccess: true
// // // // // // //         }]);
// // // // // // //       }

// // // // // // //     } catch (error) {
// // // // // // //       console.error('Action execution error:', error);
// // // // // // //       Alert.alert(
// // // // // // //         'Action Failed',
// // // // // // //         error.response?.data?.detail || 'Something went wrong. Please try again.'
// // // // // // //       );
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //       setPendingAction(null);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // --- 2. SEND MESSAGE ---
// // // // // // //   const handleSend = async () => {
// // // // // // //     if (!inputText.trim() || loading) return;

// // // // // // //     const userMessage = {
// // // // // // //       id: `user-${Date.now()}`,
// // // // // // //       role: 'user',
// // // // // // //       content: inputText.trim(),
// // // // // // //       timestamp: new Date().toISOString()
// // // // // // //     };
    
// // // // // // //     setMessages(prev => [...prev, userMessage]);
// // // // // // //     const currentText = inputText;
// // // // // // //     setInputText('');
// // // // // // //     setLoading(true);

// // // // // // //     try {
// // // // // // //       const chatRes = await ApiService.post('/api/v1/chat/', {
// // // // // // //         message: currentText,
// // // // // // //         session_id: sessionId
// // // // // // //       });

// // // // // // //       const aiResponse = {
// // // // // // //         id: `ai-${Date.now()}`,
// // // // // // //         role: 'ai',
// // // // // // //         content: chatRes.data.response,
// // // // // // //         timestamp: new Date().toISOString(),
// // // // // // //         sessionId: chatRes.data.session_id
// // // // // // //       };

// // // // // // //       if (chatRes.data.session_id) {
// // // // // // //         setSessionId(chatRes.data.session_id);
// // // // // // //       }

// // // // // // //       // Check if response contains action confirmation request
// // // // // // //       if (chatRes.data.response && 
// // // // // // //           (chatRes.data.response.toLowerCase().includes('confirm') || 
// // // // // // //            chatRes.data.response.toLowerCase().includes('do you want'))) {
        
// // // // // // //         // Try to detect what action is being confirmed
// // // // // // //         const detectedAction = extractActionFromResponse(chatRes.data.response);
// // // // // // //         if (detectedAction) {
// // // // // // //           setPendingAction({
// // // // // // //             messageId: aiResponse.id,
// // // // // // //             actionType: detectedAction,
// // // // // // //             userMessage: currentText
// // // // // // //           });
// // // // // // //         }
// // // // // // //       }

// // // // // // //       setMessages(prev => [...prev, aiResponse]);

// // // // // // //     } catch (error) {
// // // // // // //       console.error('Chat error:', error);
// // // // // // //       setMessages(prev => [...prev, {
// // // // // // //         id: `error-${Date.now()}`,
// // // // // // //         role: 'ai',
// // // // // // //         content: 'Sorry, I encountered an error. Please try again.',
// // // // // // //         timestamp: new Date().toISOString()
// // // // // // //       }]);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // --- 3. QUICK ACTION BUTTONS ---
// // // // // // //   const quickActions = [
// // // // // // //     { 
// // // // // // //       icon: Wallet, 
// // // // // // //       label: 'Add Transaction', 
// // // // // // //       prompt: 'Spent 500 at Starbucks',
// // // // // // //       color: '#10B981',
// // // // // // //       action: 'create_transaction'
// // // // // // //     },
// // // // // // //     { 
// // // // // // //       icon: BarChart3, 
// // // // // // //       label: 'Create Budget', 
// // // // // // //       prompt: 'Create 5000 monthly food budget',
// // // // // // //       color: '#3B82F6',
// // // // // // //       action: 'create_budget'
// // // // // // //     },
// // // // // // //     { 
// // // // // // //       icon: Target, 
// // // // // // //       label: 'Set Goal', 
// // // // // // //       prompt: 'Save 1 lakh for vacation',
// // // // // // //       color: '#8B5CF6',
// // // // // // //       action: 'create_goal'
// // // // // // //     },
// // // // // // //     { 
// // // // // // //       icon: DollarSign, 
// // // // // // //       label: 'Add Income', 
// // // // // // //       prompt: 'Monthly salary of 75000',
// // // // // // //       color: '#F59E0B',
// // // // // // //       action: 'create_income'
// // // // // // //     },
// // // // // // //   ];

// // // // // // //   const handleQuickAction = async (prompt, action) => {
// // // // // // //     setInputText(prompt);
// // // // // // //     // Auto-send quick actions
// // // // // // //     const userMessage = {
// // // // // // //       id: `user-${Date.now()}`,
// // // // // // //       role: 'user',
// // // // // // //       content: prompt,
// // // // // // //       timestamp: new Date().toISOString()
// // // // // // //     };
    
// // // // // // //     setMessages(prev => [...prev, userMessage]);
// // // // // // //     setLoading(true);

// // // // // // //     try {
// // // // // // //       const chatRes = await ApiService.post('/api/v1/chat/', {
// // // // // // //         message: prompt,
// // // // // // //         session_id: sessionId
// // // // // // //       });

// // // // // // //       const aiResponse = {
// // // // // // //         id: `ai-${Date.now()}`,
// // // // // // //         role: 'ai',
// // // // // // //         content: chatRes.data.response,
// // // // // // //         timestamp: new Date().toISOString()
// // // // // // //       };

// // // // // // //       setMessages(prev => [...prev, aiResponse]);

// // // // // // //     } catch (error) {
// // // // // // //       console.error('Chat error:', error);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //       setInputText('');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // --- 4. RENDER MESSAGE ---
// // // // // // //   const renderMessage = (msg) => {
// // // // // // //     const Icon = msg.role === 'user' ? User : Cpu;
// // // // // // //     const bgColor = msg.role === 'user' ? '#1E40AF' : '#1F2937';
// // // // // // //     const textColor = msg.role === 'user' ? 'white' : '#E5E7EB';

// // // // // // //     return (
// // // // // // //       <YStack key={msg.id} mb="$3">
// // // // // // //         <XStack 
// // // // // // //           space="$3" 
// // // // // // //           fd={msg.role === 'user' ? 'row-reverse' : 'row'}
// // // // // // //           ai="flex-start"
// // // // // // //         >
// // // // // // //           <Circle 
// // // // // // //             size={36} 
// // // // // // //             bg={msg.role === 'user' ? '#3B82F6' : '#8B5CF6'}
// // // // // // //             bw={1} 
// // // // // // //             bc="rgba(255,255,255,0.1)"
// // // // // // //           >
// // // // // // //             <Icon size={16} color="white" />
// // // // // // //           </Circle>
          
// // // // // // //           <Card 
// // // // // // //             p="$3" 
// // // // // // //             br="$4" 
// // // // // // //             maxWidth={width * 0.75}
// // // // // // //             bg={bgColor}
// // // // // // //             bc={msg.isSuccess ? '#10B981' : 'transparent'}
// // // // // // //             bw={msg.isSuccess ? 2 : 0}
// // // // // // //           >
// // // // // // //             <Text 
// // // // // // //               color={textColor} 
// // // // // // //               fontSize={15} 
// // // // // // //               lineHeight={22}
// // // // // // //               selectable
// // // // // // //             >
// // // // // // //               {msg.content}
// // // // // // //             </Text>
            
// // // // // // //             {msg.timestamp && (
// // // // // // //               <Text 
// // // // // // //                 color={msg.role === 'user' ? '#93C5FD' : '#9CA3AF'} 
// // // // // // //                 fontSize={10} 
// // // // // // //                 mt="$1"
// // // // // // //               >
// // // // // // //                 {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// // // // // // //               </Text>
// // // // // // //             )}
// // // // // // //           </Card>
// // // // // // //         </XStack>
// // // // // // //       </YStack>
// // // // // // //     );
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Theme name="dark">
// // // // // // //       <LinearGradient 
// // // // // // //         colors={['#0F172A', '#1E293B']} 
// // // // // // //         style={{ flex: 1 }}
// // // // // // //       >
// // // // // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
// // // // // // //           {/* HEADER */}
// // // // // // //           <XStack 
// // // // // // //             p="$4" 
// // // // // // //             jc="space-between" 
// // // // // // //             ai="center" 
// // // // // // //             bbw={1} 
// // // // // // //             bc="rgba(255,255,255,0.05)"
// // // // // // //             bg="rgba(15, 23, 42, 0.95)"
// // // // // // //           >
// // // // // // //             <TouchableOpacity onPress={() => router.back()}>
// // // // // // //               <ChevronLeft size={24} color="#CBD5E1" />
// // // // // // //             </TouchableOpacity>
            
// // // // // // //             <XStack ai="center" space="$2">
// // // // // // //               <Sparkles size={18} color="#8B5CF6" />
// // // // // // //               <Text color="white" fontWeight="bold" fontSize={18}>
// // // // // // //                 Financial Assistant
// // // // // // //               </Text>
// // // // // // //             </XStack>
            
// // // // // // //             <ShieldCheck size={20} color="#10B981" />
// // // // // // //           </XStack>

// // // // // // //           {/* CHAT MESSAGES */}
// // // // // // //           <ScrollView 
// // // // // // //             ref={scrollViewRef}
// // // // // // //             contentContainerStyle={{ 
// // // // // // //               padding: 16,
// // // // // // //               paddingBottom: 180 
// // // // // // //             }}
// // // // // // //             showsVerticalScrollIndicator={false}
// // // // // // //           >
// // // // // // //             {messages.map(renderMessage)}
            
// // // // // // //             {/* PENDING ACTION CONFIRMATION */}
// // // // // // //             {pendingAction && (
// // // // // // //               <YStack mt="$3" animation="quick" enterStyle={{ opacity: 0, y: 20 }}>
// // // // // // //                 <Card p="$4" bg="#1E293B" br="$5" bw={1} bc="#F59E0B">
// // // // // // //                   <XStack ai="center" space="$2" mb="$3">
// // // // // // //                     <AlertCircle size={16} color="#F59E0B" />
// // // // // // //                     <Text color="#F59E0B" fontWeight="bold" fontSize={14}>
// // // // // // //                       ACTION REQUIRED
// // // // // // //                     </Text>
// // // // // // //                   </XStack>
                  
// // // // // // //                   <Text color="white" fontSize={14} mb="$4">
// // // // // // //                     The AI wants to {pendingAction.actionType.replace('_', ' ')}. Would you like to proceed?
// // // // // // //                   </Text>
                  
// // // // // // //                   <XStack space="$3">
// // // // // // //                     <Button 
// // // // // // //                       f={1} 
// // // // // // //                       bg="#10B981" 
// // // // // // //                       color="white" 
// // // // // // //                       fontWeight="bold"
// // // // // // //                       onPress={() => executeManualAction(pendingAction.userMessage, pendingAction.actionType)}
// // // // // // //                       disabled={loading}
// // // // // // //                     >
// // // // // // //                       <Check size={16} />
// // // // // // //                       <Text ml="$2">Yes, proceed</Text>
// // // // // // //                     </Button>
                    
// // // // // // //                     <Button 
// // // // // // //                       f={1} 
// // // // // // //                       chromeless 
// // // // // // //                       bc="#475569" 
// // // // // // //                       bw={1}
// // // // // // //                       onPress={() => setPendingAction(null)}
// // // // // // //                     >
// // // // // // //                       <X size={16} color="#CBD5E1" />
// // // // // // //                       <Text ml="$2" color="#CBD5E1">Cancel</Text>
// // // // // // //                     </Button>
// // // // // // //                   </XStack>
// // // // // // //                 </Card>
// // // // // // //               </YStack>
// // // // // // //             )}
            
// // // // // // //             {loading && (
// // // // // // //               <XStack jc="center" mt="$4">
// // // // // // //                 <Spinner color="#8B5CF6" size="large" />
// // // // // // //               </XStack>
// // // // // // //             )}
// // // // // // //           </ScrollView>

// // // // // // //           {/* QUICK ACTIONS */}
// // // // // // //           <ScrollView 
// // // // // // //             horizontal 
// // // // // // //             showsHorizontalScrollIndicator={false}
// // // // // // //             style={{
// // // // // // //               position: 'absolute',
// // // // // // //               bottom: 100,
// // // // // // //               left: 0,
// // // // // // //               right: 0,
// // // // // // //               paddingHorizontal: 16
// // // // // // //             }}
// // // // // // //             contentContainerStyle={{ paddingRight: 16 }}
// // // // // // //           >
// // // // // // //             <XStack space="$3">
// // // // // // //               {quickActions.map((action, index) => {
// // // // // // //                 const ActionIcon = action.icon;
// // // // // // //                 return (
// // // // // // //                   <TouchableOpacity
// // // // // // //                     key={index}
// // // // // // //                     onPress={() => handleQuickAction(action.prompt, action.action)}
// // // // // // //                     disabled={loading}
// // // // // // //                   >
// // // // // // //                     <Card 
// // // // // // //                       p="$3" 
// // // // // // //                       br="$4" 
// // // // // // //                       bg="#1E293B" 
// // // // // // //                       bc={action.color} 
// // // // // // //                       bw={1}
// // // // // // //                     >
// // // // // // //                       <YStack ai="center" space="$1">
// // // // // // //                         <ActionIcon size={18} color={action.color} />
// // // // // // //                         <Text 
// // // // // // //                           color="white" 
// // // // // // //                           fontSize={12} 
// // // // // // //                           fontWeight="medium"
// // // // // // //                           textAlign="center"
// // // // // // //                           maxWidth={80}
// // // // // // //                         >
// // // // // // //                           {action.label}
// // // // // // //                         </Text>
// // // // // // //                       </YStack>
// // // // // // //                     </Card>
// // // // // // //                   </TouchableOpacity>
// // // // // // //                 );
// // // // // // //               })}
// // // // // // //             </XStack>
// // // // // // //           </ScrollView>

// // // // // // //           {/* INPUT AREA */}
// // // // // // //           <KeyboardAvoidingView 
// // // // // // //             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // // // // //             keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
// // // // // // //             style={{
// // // // // // //               position: 'absolute',
// // // // // // //               bottom: 0,
// // // // // // //               left: 0,
// // // // // // //               right: 0,
// // // // // // //               backgroundColor: '#0F172A',
// // // // // // //               padding: 16,
// // // // // // //               paddingBottom: insets.bottom + 16,
// // // // // // //               borderTopWidth: 1,
// // // // // // //               borderTopColor: 'rgba(255,255,255,0.05)'
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <XStack ai="flex-end" space="$3">
// // // // // // //               <Input 
// // // // // // //                 ref={inputRef}
// // // // // // //                 flex={1}
// // // // // // //                 placeholder="Type your financial command..."
// // // // // // //                 color="white"
// // // // // // //                 placeholderTextColor="#94A3B8"
// // // // // // //                 fontSize={16}
// // // // // // //                 minHeight={44}
// // // // // // //                 maxHeight={120}
// // // // // // //                 multiline
// // // // // // //                 numberOfLines={3}
// // // // // // //                 value={inputText}
// // // // // // //                 onChangeText={setInputText}
// // // // // // //                 onSubmitEditing={handleSend}
// // // // // // //                 returnKeyType="send"
// // // // // // //                 blurOnSubmit={false}
// // // // // // //                 borderWidth={1}
// // // // // // //                 borderColor="#334155"
// // // // // // //                 bg="#1E293B"
// // // // // // //                 br="$4"
// // // // // // //               />
              
// // // // // // //               <TouchableOpacity 
// // // // // // //                 onPress={handleSend}
// // // // // // //                 disabled={!inputText.trim() || loading}
// // // // // // //               >
// // // // // // //                 <Circle 
// // // // // // //                   size={52} 
// // // // // // //                   bg={inputText.trim() ? "#8B5CF6" : "#334155"}
// // // // // // //                 >
// // // // // // //                   {loading ? (
// // // // // // //                     <Spinner color="white" size="small" />
// // // // // // //                   ) : (
// // // // // // //                     <Send size={20} color="white" />
// // // // // // //                   )}
// // // // // // //                 </Circle>
// // // // // // //               </TouchableOpacity>
// // // // // // //             </XStack>
            
// // // // // // //             <Text 
// // // // // // //               color="#64748B" 
// // // // // // //               fontSize={12} 
// // // // // // //               textAlign="center" 
// // // // // // //               mt="$2"
// // // // // // //             >
// // // // // // //               Try: "Spent 500 at Starbucks" or "Create 5000 food budget"
// // // // // // //             </Text>
// // // // // // //           </KeyboardAvoidingView>

// // // // // // //         </SafeAreaView>
// // // // // // //       </LinearGradient>
// // // // // // //     </Theme>
// // // // // // //   );
// // // // // // // }




// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { 
// // // //   KeyboardAvoidingView, 
// // // //   Platform, 
// // // //   ScrollView, 
// // // //   TouchableOpacity, 
// // // //   Alert,
// // // //   Dimensions 
// // // // } from 'react-native';
// // // // import { 
// // // //   YStack, 
// // // //   XStack, 
// // // //   Text, 
// // // //   Input, 
// // // //   Button, 
// // // //   Spinner, 
// // // //   Theme, 
// // // //   Circle, 
// // // //   Card,
// // // //   View 
// // // // } from 'tamagui';
// // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // import { 
// // // //   Send, 
// // // //   Cpu, 
// // // //   User, 
// // // //   Sparkles, 
// // // //   ShieldCheck, 
// // // //   ChevronLeft,
// // // //   DollarSign, 
// // // //   TrendingUp, 
// // // //   Wallet, 
// // // //   PieChart, 
// // // //   Target,
// // // //   Trash2,
// // // //   Check,
// // // //   X,
// // // //   AlertCircle,
// // // //   Calendar,
// // // //   Clock,
// // // //   BarChart3,
// // // //   CreditCard,
// // // //   Home,
// // // //   ShoppingBag,
// // // //   Coffee,
// // // //   Car,
// // // //   Plane,
// // // //   GraduationCap,
// // // //   Heart,
// // // //   MessageSquare
// // // // } from '@tamagui/lucide-icons';
// // // // import { useRouter } from 'expo-router';
// // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // import { ApiService } from '../../../services/apiService';

// // // // const { width } = Dimensions.get('window');

// // // // export default function FinancialChat() {
// // // //   const router = useRouter();
// // // //   const insets = useSafeAreaInsets();
// // // //   const scrollViewRef = useRef(null);
// // // //   const inputRef = useRef(null);
  
// // // //   // --- STATE ---
// // // //   const [messages, setMessages] = useState([{
// // // //     id: 'welcome-1', 
// // // //     role: 'ai', 
// // // //     content: 'Hello! I\'m your financial assistant. You can:\n\n• Say "Spent 500 at Starbucks" to record transactions\n• Say "Create 5000 monthly food budget"\n• Say "Save 1 lakh for vacation by Dec 2025"\n• Say "Monthly salary of 75000"\n• Say "I have 10 Bitcoin worth 50 lakhs"\n\nWhat would you like to do?',
// // // //     timestamp: new Date().toISOString()
// // // //   }]);
  
// // // //   const [inputText, setInputText] = useState('');
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [sessionId, setSessionId] = useState(null);
// // // //   const [isOnline, setIsOnline] = useState(true);

// // // //   // Test API connection on mount
// // // //   useEffect(() => {
// // // //     checkApiConnection();
// // // //   }, []);

// // // //   const checkApiConnection = async () => {
// // // //     try {
// // // //       // Test a simple endpoint to check if API is accessible
// // // //       const response = await ApiService.get('/user/profile');
// // // //       setIsOnline(true);
// // // //     } catch (error) {
// // // //       console.log('API connection test failed:', error.message);
// // // //       setIsOnline(false);
// // // //       Alert.alert(
// // // //         'Connection Issue',
// // // //         'Unable to connect to the server. Please check your internet connection.',
// // // //         [{ text: 'OK' }]
// // // //       );
// // // //     }
// // // //   };

// // // //   // --- AUTO-SCROLL ---
// // // //   useEffect(() => {
// // // //     if (scrollViewRef.current) {
// // // //       setTimeout(() => {
// // // //         scrollViewRef.current?.scrollToEnd({ animated: true });
// // // //       }, 100);
// // // //     }
// // // //   }, [messages]);

// // // //   // --- 1. EXTRACT ACTION FROM USER MESSAGE ---
// // // //   const detectActionFromMessage = (message) => {
// // // //     const lowerMsg = message.toLowerCase();
    
// // // //     // Transaction detection
// // // //     if (lowerMsg.includes('spent') || 
// // // //         lowerMsg.includes('paid') || 
// // // //         lowerMsg.includes('bought') ||
// // // //         (lowerMsg.includes('₹') && lowerMsg.includes('at'))) {
// // // //       return 'transaction';
// // // //     }
    
// // // //     // Budget detection
// // // //     if (lowerMsg.includes('budget') || 
// // // //         lowerMsg.includes('limit') ||
// // // //         (lowerMsg.includes('₹') && lowerMsg.includes('monthly'))) {
// // // //       return 'budget';
// // // //     }
    
// // // //     // Goal detection
// // // //     if (lowerMsg.includes('save') || 
// // // //         lowerMsg.includes('goal') || 
// // // //         lowerMsg.includes('target') ||
// // // //         lowerMsg.includes('vacation') ||
// // // //         lowerMsg.includes('car') ||
// // // //         lowerMsg.includes('house')) {
// // // //       return 'goal';
// // // //     }
    
// // // //     // Income detection
// // // //     if (lowerMsg.includes('salary') || 
// // // //         lowerMsg.includes('income') || 
// // // //         lowerMsg.includes('earn') ||
// // // //         lowerMsg.includes('monthly income')) {
// // // //       return 'income';
// // // //     }
    
// // // //     // Investment detection
// // // //     if (lowerMsg.includes('investment') || 
// // // //         lowerMsg.includes('stock') || 
// // // //         lowerMsg.includes('crypto') ||
// // // //         lowerMsg.includes('bitcoin') ||
// // // //         lowerMsg.includes('mutual fund')) {
// // // //       return 'investment';
// // // //     }
    
// // // //     return 'chat';
// // // //   };

// // // //   // --- 2. PARSE AMOUNT FROM MESSAGE ---
// // // //   const parseAmount = (text) => {
// // // //     // Try ₹ symbol
// // // //     const rupeeMatch = text.match(/₹\s*(\d+(?:,\d{3})*(?:\.\d{1,2})?)/);
// // // //     if (rupeeMatch) {
// // // //       return parseFloat(rupeeMatch[1].replace(/,/g, ''));
// // // //     }
    
// // // //     // Try numbers with k/lakh/crore
// // // //     const numberMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d{1,2})?)\s*(k|thousand|lakh|crore)?/i);
// // // //     if (numberMatch) {
// // // //       let amount = parseFloat(numberMatch[1].replace(/,/g, ''));
// // // //       if (numberMatch[2]) {
// // // //         const multiplier = numberMatch[2].toLowerCase();
// // // //         if (multiplier === 'k' || multiplier === 'thousand') amount *= 1000;
// // // //         if (multiplier === 'lakh') amount *= 100000;
// // // //         if (multiplier === 'crore') amount *= 10000000;
// // // //       }
// // // //       return amount;
// // // //     }
    
// // // //     return null;
// // // //   };

// // // //   // --- 3. CREATE TRANSACTION DIRECTLY ---
// // // //   const createTransactionDirectly = async (message) => {
// // // //     const amount = parseAmount(message);
// // // //     if (!amount) {
// // // //       throw new Error('Could not detect amount in your message');
// // // //     }

// // // //     // Extract merchant name
// // // //     let merchant = 'Unknown';
// // // //     const merchantKeywords = ['at ', 'from ', 'in ', 'via ', 'for '];
// // // //     for (const keyword of merchantKeywords) {
// // // //       const idx = message.toLowerCase().indexOf(keyword);
// // // //       if (idx !== -1) {
// // // //         merchant = message.substring(idx + keyword.length).split(/[.,\s]/)[0];
// // // //         break;
// // // //       }
// // // //     }

// // // //     const payload = {
// // // //       amount: amount,
// // // //       currency: "INR",
// // // //       occurred_at: new Date().toISOString(),
// // // //       category_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // General category
// // // //       merchant_raw: merchant,
// // // //       description: message,
// // // //       source: "chat"
// // // //     };

// // // //     const response = await ApiService.post('/api/v1/transactions/', payload);
// // // //     return response.data;
// // // //   };

// // // //   // --- 4. CREATE BUDGET DIRECTLY ---
// // // //   const createBudgetDirectly = async (message) => {
// // // //     const amount = parseAmount(message);
// // // //     if (!amount) {
// // // //       throw new Error('Could not detect amount in your message');
// // // //     }

// // // //     // Determine budget name
// // // //     let budgetName = 'General Budget';
// // // //     if (message.toLowerCase().includes('food')) budgetName = 'Food Budget';
// // // //     if (message.toLowerCase().includes('entertainment')) budgetName = 'Entertainment Budget';
// // // //     if (message.toLowerCase().includes('transport')) budgetName = 'Transport Budget';
// // // //     if (message.toLowerCase().includes('shopping')) budgetName = 'Shopping Budget';

// // // //     // Determine period
// // // //     let period = 'monthly';
// // // //     if (message.toLowerCase().includes('daily')) period = 'daily';
// // // //     if (message.toLowerCase().includes('weekly')) period = 'weekly';

// // // //     const payload = {
// // // //       name: budgetName,
// // // //       limit_amount: amount,
// // // //       period: period,
// // // //       included_category_ids: [],
// // // //       excluded_category_ids: [],
// // // //       excluded_merchants: [],
// // // //       alert_threshold: 80
// // // //     };

// // // //     const response = await ApiService.post('/api/v1/budgets/', payload);
// // // //     return response.data;
// // // //   };

// // // //   // --- 5. CREATE INCOME DIRECTLY ---
// // // //   const createIncomeDirectly = async (message) => {
// // // //     const amount = parseAmount(message);
// // // //     if (!amount) {
// // // //       throw new Error('Could not detect amount in your message');
// // // //     }

// // // //     const payload = {
// // // //       name: "Salary",
// // // //       source_type: "salary",
// // // //       rate_type: "fixed",
// // // //       estimated_monthly_amount: amount,
// // // //       api_source_identifier: "chat"
// // // //     };

// // // //     const response = await ApiService.post('/api/v1/income/', payload);
// // // //     return response.data;
// // // //   };

// // // //   // --- 6. SEND MESSAGE ---
// // // //   const handleSend = async () => {
// // // //     if (!inputText.trim() || loading) return;

// // // //     const userMessage = {
// // // //       id: `user-${Date.now()}`,
// // // //       role: 'user',
// // // //       content: inputText.trim(),
// // // //       timestamp: new Date().toISOString()
// // // //     };
    
// // // //     setMessages(prev => [...prev, userMessage]);
// // // //     const currentText = inputText;
// // // //     setInputText('');
// // // //     setLoading(true);

// // // //     try {
// // // //       // First, detect what type of action
// // // //       const actionType = detectActionFromMessage(currentText);
      
// // // //       let result = null;
// // // //       let successMessage = '';

// // // //       switch (actionType) {
// // // //         case 'transaction':
// // // //           result = await createTransactionDirectly(currentText);
// // // //           successMessage = `✅ Transaction recorded: ₹${result.amount} at ${result.merchant_raw || 'Unknown'}`;
// // // //           break;
          
// // // //         case 'budget':
// // // //           result = await createBudgetDirectly(currentText);
// // // //           successMessage = `✅ Budget created: ${result.name} (₹${result.limit_amount} ${result.period})`;
// // // //           break;
          
// // // //         case 'income':
// // // //           result = await createIncomeDirectly(currentText);
// // // //           successMessage = `✅ Income added: ₹${result.estimated_monthly_amount}/month`;
// // // //           break;
          
// // // //         default:
// // // //           // For other messages, use chat API
// // // //           try {
// // // //             const chatRes = await ApiService.post('/api/v1/chat/', {
// // // //               message: currentText,
// // // //               session_id: sessionId
// // // //             });

// // // //             if (chatRes.data.session_id) {
// // // //               setSessionId(chatRes.data.session_id);
// // // //             }

// // // //             setMessages(prev => [...prev, {
// // // //               id: `ai-${Date.now()}`,
// // // //               role: 'ai',
// // // //               content: chatRes.data.response,
// // // //               timestamp: new Date().toISOString()
// // // //             }]);
            
// // // //             setLoading(false);
// // // //             return; // Exit early for chat responses
            
// // // //           } catch (chatError) {
// // // //             console.log('Chat API failed, showing fallback response');
// // // //             // Fallback response if chat API fails
// // // //             const fallbackResponse = "I understood your message. For now, I can help you create transactions, budgets, and income sources directly. Try saying:\n\n• 'Spent 500 at Starbucks'\n• 'Create 5000 monthly food budget'\n• 'Monthly salary of 75000'";
            
// // // //             setMessages(prev => [...prev, {
// // // //               id: `ai-${Date.now()}`,
// // // //               role: 'ai',
// // // //               content: fallbackResponse,
// // // //               timestamp: new Date().toISOString()
// // // //             }]);
            
// // // //             setLoading(false);
// // // //             return;
// // // //           }
// // // //       }

// // // //       // For direct actions, add success message
// // // //       setMessages(prev => [...prev, {
// // // //         id: `success-${Date.now()}`,
// // // //         role: 'ai',
// // // //         content: successMessage,
// // // //         timestamp: new Date().toISOString(),
// // // //         isSuccess: true
// // // //       }]);

// // // //     } catch (error) {
// // // //       console.error('Action error:', error);
      
// // // //       let errorMessage = 'Sorry, something went wrong. ';
      
// // // //       if (error.response) {
// // // //         // Server responded with error
// // // //         if (error.response.status === 401) {
// // // //           errorMessage = 'Please login again. ';
// // // //         } else if (error.response.status === 404) {
// // // //           errorMessage = 'Service temporarily unavailable. ';
// // // //         }
// // // //         errorMessage += error.response.data?.detail || error.message;
// // // //       } else if (error.request) {
// // // //         // No response received
// // // //         errorMessage = 'Network error. Please check your connection.';
// // // //       } else {
// // // //         // Other errors
// // // //         errorMessage += error.message;
// // // //       }

// // // //       setMessages(prev => [...prev, {
// // // //         id: `error-${Date.now()}`,
// // // //         role: 'ai',
// // // //         content: `❌ ${errorMessage}`,
// // // //         timestamp: new Date().toISOString()
// // // //       }]);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // --- 7. QUICK ACTION BUTTONS ---
// // // //   const quickActions = [
// // // //     { 
// // // //       icon: Wallet, 
// // // //       label: 'Spent 500', 
// // // //       prompt: 'Spent 500 at Starbucks',
// // // //       color: '#10B981'
// // // //     },
// // // //     { 
// // // //       icon: BarChart3, 
// // // //       label: 'Food Budget', 
// // // //       prompt: 'Create 5000 monthly food budget',
// // // //       color: '#3B82F6'
// // // //     },
// // // //     { 
// // // //       icon: DollarSign, 
// // // //       label: 'Salary', 
// // // //       prompt: 'Monthly salary of 75000',
// // // //       color: '#F59E0B'
// // // //     },
// // // //     { 
// // // //       icon: Target, 
// // // //       label: 'Save Goal', 
// // // //       prompt: 'Save 1 lakh for vacation',
// // // //       color: '#8B5CF6'
// // // //     },
// // // //   ];

// // // //   const handleQuickAction = (prompt) => {
// // // //     setInputText(prompt);
// // // //     inputRef.current?.focus();
// // // //   };

// // // //   // --- 8. RENDER MESSAGE ---
// // // //   const renderMessage = (msg) => {
// // // //     const Icon = msg.role === 'user' ? User : Cpu;
// // // //     const bgColor = msg.role === 'user' ? '#1E40AF' : '#1F2937';
// // // //     const borderColor = msg.isSuccess ? '#10B981' : 'transparent';

// // // //     return (
// // // //       <YStack key={msg.id} mb="$3">
// // // //         <XStack 
// // // //           space="$3" 
// // // //           fd={msg.role === 'user' ? 'row-reverse' : 'row'}
// // // //           ai="flex-start"
// // // //         >
// // // //           <Circle 
// // // //             size={36} 
// // // //             bg={msg.role === 'user' ? '#3B82F6' : '#8B5CF6'}
// // // //             bw={1} 
// // // //             bc="rgba(255,255,255,0.1)"
// // // //           >
// // // //             <Icon size={16} color="white" />
// // // //           </Circle>
          
// // // //           <Card 
// // // //             p="$3" 
// // // //             br="$4" 
// // // //             maxWidth={width * 0.75}
// // // //             bg={bgColor}
// // // //             bc={borderColor}
// // // //             bw={msg.isSuccess ? 2 : 0}
// // // //           >
// // // //             <Text 
// // // //               color="white" 
// // // //               fontSize={15} 
// // // //               lineHeight={22}
// // // //               selectable
// // // //             >
// // // //               {msg.content}
// // // //             </Text>
            
// // // //             {msg.timestamp && (
// // // //               <Text 
// // // //                 color="#94A3B8" 
// // // //                 fontSize={10} 
// // // //                 mt="$1"
// // // //               >
// // // //                 {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// // // //               </Text>
// // // //             )}
// // // //           </Card>
// // // //         </XStack>
// // // //       </YStack>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <LinearGradient 
// // // //         colors={['#0F172A', '#1E293B']} 
// // // //         style={{ flex: 1 }}
// // // //       >
// // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
// // // //           {/* HEADER */}
// // // //           <XStack 
// // // //             p="$4" 
// // // //             jc="space-between" 
// // // //             ai="center" 
// // // //             bbw={1} 
// // // //             bc="rgba(255,255,255,0.05)"
// // // //             bg="rgba(15, 23, 42, 0.95)"
// // // //           >
// // // //             <TouchableOpacity onPress={() => router.back()}>
// // // //               <ChevronLeft size={24} color="#CBD5E1" />
// // // //             </TouchableOpacity>
            
// // // //             <XStack ai="center" space="$2">
// // // //               <MessageSquare size={18} color="#8B5CF6" />
// // // //               <Text color="white" fontWeight="bold" fontSize={18}>
// // // //                 Financial Chat
// // // //               </Text>
// // // //               {!isOnline && (
// // // //                 <Circle size={8} bg="#EF4444" ml="$1" />
// // // //               )}
// // // //             </XStack>
            
// // // //             <TouchableOpacity onPress={checkApiConnection}>
// // // //               <ShieldCheck size={20} color={isOnline ? "#10B981" : "#EF4444"} />
// // // //             </TouchableOpacity>
// // // //           </XStack>

// // // //           {/* CHAT MESSAGES */}
// // // //           <ScrollView 
// // // //             ref={scrollViewRef}
// // // //             contentContainerStyle={{ 
// // // //               padding: 16,
// // // //               paddingBottom: 180 
// // // //             }}
// // // //             showsVerticalScrollIndicator={false}
// // // //           >
// // // //             {messages.map(renderMessage)}
            
// // // //             {loading && (
// // // //               <XStack jc="center" mt="$4">
// // // //                 <Spinner color="#8B5CF6" size="large" />
// // // //               </XStack>
// // // //             )}
// // // //           </ScrollView>

// // // //           {/* QUICK ACTIONS */}
// // // //           <ScrollView 
// // // //             horizontal 
// // // //             showsHorizontalScrollIndicator={false}
// // // //             style={{
// // // //               position: 'absolute',
// // // //               bottom: 100,
// // // //               left: 0,
// // // //               right: 0,
// // // //               paddingHorizontal: 16
// // // //             }}
// // // //             contentContainerStyle={{ paddingRight: 16 }}
// // // //           >
// // // //             <XStack space="$3">
// // // //               {quickActions.map((action, index) => {
// // // //                 const ActionIcon = action.icon;
// // // //                 return (
// // // //                   <TouchableOpacity
// // // //                     key={index}
// // // //                     onPress={() => handleQuickAction(action.prompt)}
// // // //                     disabled={loading}
// // // //                   >
// // // //                     <Card 
// // // //                       p="$3" 
// // // //                       br="$4" 
// // // //                       bg="#1E293B" 
// // // //                       bc={action.color} 
// // // //                       bw={1}
// // // //                     >
// // // //                       <YStack ai="center" space="$1">
// // // //                         <ActionIcon size={18} color={action.color} />
// // // //                         <Text 
// // // //                           color="white" 
// // // //                           fontSize={12} 
// // // //                           fontWeight="medium"
// // // //                           textAlign="center"
// // // //                           maxWidth={80}
// // // //                         >
// // // //                           {action.label}
// // // //                         </Text>
// // // //                       </YStack>
// // // //                     </Card>
// // // //                   </TouchableOpacity>
// // // //                 );
// // // //               })}
// // // //             </XStack>
// // // //           </ScrollView>

// // // //           {/* INPUT AREA */}
// // // //           <KeyboardAvoidingView 
// // // //             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // //             keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
// // // //             style={{
// // // //               position: 'absolute',
// // // //               bottom: 0,
// // // //               left: 0,
// // // //               right: 0,
// // // //               backgroundColor: '#0F172A',
// // // //               padding: 16,
// // // //               paddingBottom: insets.bottom + 16,
// // // //               borderTopWidth: 1,
// // // //               borderTopColor: 'rgba(255,255,255,0.05)'
// // // //             }}
// // // //           >
// // // //             {!isOnline && (
// // // //               <Card bg="#EF4444" p="$2" br="$3" mb="$2">
// // // //                 <XStack ai="center" space="$2" jc="center">
// // // //                   <AlertCircle size={14} color="white" />
// // // //                   <Text color="white" fontSize={12}>Offline - Actions will be saved locally</Text>
// // // //                 </XStack>
// // // //               </Card>
// // // //             )}
            
// // // //             <XStack ai="flex-end" space="$3">
// // // //               <Input 
// // // //                 ref={inputRef}
// // // //                 flex={1}
// // // //                 placeholder="Type your financial command..."
// // // //                 color="white"
// // // //                 placeholderTextColor="#94A3B8"
// // // //                 fontSize={16}
// // // //                 minHeight={44}
// // // //                 maxHeight={120}
// // // //                 multiline
// // // //                 numberOfLines={3}
// // // //                 value={inputText}
// // // //                 onChangeText={setInputText}
// // // //                 onSubmitEditing={handleSend}
// // // //                 returnKeyType="send"
// // // //                 blurOnSubmit={false}
// // // //                 borderWidth={1}
// // // //                 borderColor="#334155"
// // // //                 bg="#1E293B"
// // // //                 br="$4"
// // // //               />
              
// // // //               <TouchableOpacity 
// // // //                 onPress={handleSend}
// // // //                 disabled={!inputText.trim() || loading}
// // // //               >
// // // //                 <Circle 
// // // //                   size={52} 
// // // //                   bg={inputText.trim() ? "#8B5CF6" : "#334155"}
// // // //                   style={{ opacity: (!inputText.trim() || loading) ? 0.5 : 1 }}
// // // //                 >
// // // //                   {loading ? (
// // // //                     <Spinner color="white" size="small" />
// // // //                   ) : (
// // // //                     <Send size={20} color="white" />
// // // //                   )}
// // // //                 </Circle>
// // // //               </TouchableOpacity>
// // // //             </XStack>
            
// // // //             <Text 
// // // //               color="#64748B" 
// // // //               fontSize={12} 
// // // //               textAlign="center" 
// // // //               mt="$2"
// // // //             >
// // // //               Examples: "Spent 500 at Starbucks" • "Create 5000 food budget" • "Monthly salary 75000"
// // // //             </Text>
// // // //           </KeyboardAvoidingView>

// // // //         </SafeAreaView>
// // // //       </LinearGradient>
// // // //     </Theme>
// // // //   );
// // // // }



// // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // import { 
// // // // //   KeyboardAvoidingView, 
// // // // //   Platform, 
// // // // //   ScrollView, 
// // // // //   TouchableOpacity, 
// // // // //   Alert,
// // // // //   Dimensions 
// // // // // } from 'react-native';
// // // // // import { 
// // // // //   YStack, 
// // // // //   XStack, 
// // // // //   Text, 
// // // // //   Input, 
// // // // //   Button, 
// // // // //   Spinner, 
// // // // //   Theme, 
// // // // //   Circle, 
// // // // //   Card,
// // // // //   View 
// // // // // } from 'tamagui';
// // // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // // import { 
// // // // //   Send, 
// // // // //   Cpu, 
// // // // //   User, 
// // // // //   Sparkles, 
// // // // //   ShieldCheck, 
// // // // //   ChevronLeft,
// // // // //   DollarSign, 
// // // // //   TrendingUp, 
// // // // //   Wallet, 
// // // // //   PieChart, 
// // // // //   Target,
// // // // //   Trash2,
// // // // //   Check,
// // // // //   X,
// // // // //   AlertCircle,
// // // // //   Calendar,
// // // // //   Clock,
// // // // //   BarChart3,
// // // // //   CreditCard,
// // // // //   Home,
// // // // //   ShoppingBag,
// // // // //   Coffee,
// // // // //   Car,
// // // // //   Plane,
// // // // //   GraduationCap,
// // // // //   Heart,
// // // // //   MessageSquare,
// // // // //   Wifi,
// // // // //   WifiOff
// // // // // } from '@tamagui/lucide-icons';
// // // // // import { useRouter } from 'expo-router';
// // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // // import { ApiService } from '../../../services/apiService';

// // // // // const { width } = Dimensions.get('window');

// // // // // export default function FinancialChat() {
// // // // //   const router = useRouter();
// // // // //   const insets = useSafeAreaInsets();
// // // // //   const scrollViewRef = useRef(null);
// // // // //   const inputRef = useRef(null);
  
// // // // //   // --- STATE ---
// // // // //   const [messages, setMessages] = useState([{
// // // // //     id: 'welcome-1', 
// // // // //     role: 'ai', 
// // // // //     content: 'Hello! I\'m your financial assistant. You can:\n\n• Say "Spent 500 at Starbucks" to record transactions\n• Say "Create 5000 monthly food budget"\n• Say "Save 1 lakh for vacation by Dec 2025"\n• Say "Monthly salary of 75000"\n• Say "I have 10 Bitcoin worth 50 lakhs"\n\nWhat would you like to do?',
// // // // //     timestamp: new Date().toISOString()
// // // // //   }]);
  
// // // // //   const [inputText, setInputText] = useState('');
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [sessionId, setSessionId] = useState(null);
// // // // //   const [apiStatus, setApiStatus] = useState('checking'); // checking, online, offline
// // // // //   const [authError, setAuthError] = useState(false);

// // // // //   // Check API status on mount
// // // // //   useEffect(() => {
// // // // //     checkApiStatus();
// // // // //   }, []);

// // // // //   const checkApiStatus = async () => {
// // // // //     try {
// // // // //       // First, try a public endpoint or simple health check
// // // // //       // Since we don't know your exact endpoints, try a few approaches:
      
// // // // //       // Approach 1: Try to access root endpoint
// // // // //       try {
// // // // //         const response = await fetch('http://127.0.0.1:8000/', { 
// // // // //           method: 'GET',
// // // // //           headers: {
// // // // //             'Accept': 'application/json',
// // // // //           }
// // // // //         });
// // // // //         if (response.ok) {
// // // // //           setApiStatus('online');
// // // // //           return;
// // // // //         }
// // // // //       } catch (e) {
// // // // //         console.log('Root endpoint check failed:', e.message);
// // // // //       }

// // // // //       // Approach 2: Try chat endpoint with minimal data
// // // // //       try {
// // // // //         // Use fetch directly to avoid auth issues
// // // // //         const response = await fetch('http://127.0.0.1:8000/api/v1/chat/', {
// // // // //           method: 'POST',
// // // // //           headers: {
// // // // //             'Content-Type': 'application/json',
// // // // //             'Accept': 'application/json',
// // // // //           },
// // // // //           body: JSON.stringify({
// // // // //             message: 'test',
// // // // //             session_id: null
// // // // //           })
// // // // //         });
        
// // // // //         // Even if we get 401/403, the API is online
// // // // //         if (response.status < 500) {
// // // // //           setApiStatus('online');
// // // // //           setAuthError(response.status === 401 || response.status === 403);
// // // // //           return;
// // // // //         }
// // // // //       } catch (e) {
// // // // //         console.log('Chat endpoint check failed:', e.message);
// // // // //       }

// // // // //       // If all checks fail, assume offline
// // // // //       setApiStatus('offline');
      
// // // // //     } catch (error) {
// // // // //       console.log('API status check error:', error);
// // // // //       setApiStatus('offline');
// // // // //     }
// // // // //   };

// // // // //   // --- AUTO-SCROLL ---
// // // // //   useEffect(() => {
// // // // //     if (scrollViewRef.current) {
// // // // //       setTimeout(() => {
// // // // //         scrollViewRef.current?.scrollToEnd({ animated: true });
// // // // //       }, 100);
// // // // //     }
// // // // //   }, [messages]);

// // // // //   // --- 1. DETECT ACTION TYPE ---
// // // // //   const detectActionFromMessage = (message) => {
// // // // //     const lowerMsg = message.toLowerCase();
    
// // // // //     // Transaction detection
// // // // //     if (lowerMsg.includes('spent') || 
// // // // //         lowerMsg.includes('paid') || 
// // // // //         lowerMsg.includes('bought') ||
// // // // //         lowerMsg.includes('expense') ||
// // // // //         (/\d+.*(?:at|from|for)/.test(lowerMsg))) {
// // // // //       return 'transaction';
// // // // //     }
    
// // // // //     // Budget detection
// // // // //     if (lowerMsg.includes('budget') || 
// // // // //         lowerMsg.includes('limit') ||
// // // // //         lowerMsg.includes('monthly spend') ||
// // // // //         (/\d+.*monthly.*(?:food|entertainment|shopping)/.test(lowerMsg))) {
// // // // //       return 'budget';
// // // // //     }
    
// // // // //     // Goal detection
// // // // //     if (lowerMsg.includes('save') || 
// // // // //         lowerMsg.includes('goal') || 
// // // // //         lowerMsg.includes('target') ||
// // // // //         lowerMsg.includes('vacation') ||
// // // // //         lowerMsg.includes('car') ||
// // // // //         lowerMsg.includes('house') ||
// // // // //         lowerMsg.includes('retirement')) {
// // // // //       return 'goal';
// // // // //     }
    
// // // // //     // Income detection
// // // // //     if (lowerMsg.includes('salary') || 
// // // // //         lowerMsg.includes('income') || 
// // // // //         lowerMsg.includes('earn') ||
// // // // //         lowerMsg.includes('monthly income') ||
// // // // //         lowerMsg.includes('revenue')) {
// // // // //       return 'income';
// // // // //     }
    
// // // // //     // Investment detection
// // // // //     if (lowerMsg.includes('investment') || 
// // // // //         lowerMsg.includes('stock') || 
// // // // //         lowerMsg.includes('crypto') ||
// // // // //         lowerMsg.includes('bitcoin') ||
// // // // //         lowerMsg.includes('mutual fund') ||
// // // // //         lowerMsg.includes('portfolio')) {
// // // // //       return 'investment';
// // // // //     }
    
// // // // //     return 'chat';
// // // // //   };

// // // // //   // --- 2. PARSE AMOUNT ---
// // // // //   const parseAmount = (text) => {
// // // // //     // Try ₹ symbol
// // // // //     const rupeeMatch = text.match(/₹\s*(\d+(?:,\d{3})*(?:\.\d{1,2})?)/);
// // // // //     if (rupeeMatch) {
// // // // //       return parseFloat(rupeeMatch[1].replace(/,/g, ''));
// // // // //     }
    
// // // // //     // Try "rs" or "rupees"
// // // // //     const rsMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d{1,2})?)\s*(?:rs|rupees|inr)/i);
// // // // //     if (rsMatch) {
// // // // //       return parseFloat(rsMatch[1].replace(/,/g, ''));
// // // // //     }
    
// // // // //     // Try plain numbers (most common)
// // // // //     const numberMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d{1,2})?)/);
// // // // //     if (numberMatch) {
// // // // //       return parseFloat(numberMatch[1].replace(/,/g, ''));
// // // // //     }
    
// // // // //     return null;
// // // // //   };

// // // // //   // --- 3. EXTRACT MERCHANT ---
// // // // //   const extractMerchant = (text) => {
// // // // //     const merchantKeywords = ['at ', 'from ', 'in ', 'via ', 'for ', '@'];
// // // // //     for (const keyword of merchantKeywords) {
// // // // //       const idx = text.toLowerCase().indexOf(keyword);
// // // // //       if (idx !== -1) {
// // // // //         // Extract the word after the keyword
// // // // //         const afterKeyword = text.substring(idx + keyword.length);
// // // // //         const firstWord = afterKeyword.split(/[.,\s]/)[0];
// // // // //         if (firstWord && firstWord.length > 1) {
// // // // //           return firstWord;
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //     return 'Unknown';
// // // // //   };

// // // // //   // --- 4. CREATE TRANSACTION ---
// // // // //   const createTransaction = async (message) => {
// // // // //     try {
// // // // //       const amount = parseAmount(message);
// // // // //       if (!amount) {
// // // // //         throw new Error('Please specify an amount (e.g., "₹500" or "500")');
// // // // //       }

// // // // //       const merchant = extractMerchant(message);
      
// // // // //       const payload = {
// // // // //         amount: amount,
// // // // //         currency: "INR",
// // // // //         occurred_at: new Date().toISOString(),
// // // // //         category_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// // // // //         merchant_raw: merchant,
// // // // //         description: message,
// // // // //         source: "chat"
// // // // //       };

// // // // //       console.log('Creating transaction:', payload);
// // // // //       const response = await ApiService.post('/api/v1/transactions/', payload);
// // // // //       return response.data;
// // // // //     } catch (error) {
// // // // //       console.error('Transaction creation failed:', error);
// // // // //       if (error.response?.status === 401 || error.response?.status === 403) {
// // // // //         throw new Error('Please login to record transactions');
// // // // //       }
// // // // //       throw error;
// // // // //     }
// // // // //   };

// // // // //   // --- 5. CREATE BUDGET ---
// // // // //   const createBudget = async (message) => {
// // // // //     try {
// // // // //       const amount = parseAmount(message);
// // // // //       if (!amount) {
// // // // //         throw new Error('Please specify a budget amount');
// // // // //       }

// // // // //       // Determine budget name
// // // // //       let budgetName = 'General Budget';
// // // // //       const lowerMsg = message.toLowerCase();
// // // // //       if (lowerMsg.includes('food') || lowerMsg.includes('groceries')) budgetName = 'Food Budget';
// // // // //       if (lowerMsg.includes('entertainment')) budgetName = 'Entertainment Budget';
// // // // //       if (lowerMsg.includes('transport') || lowerMsg.includes('travel')) budgetName = 'Transport Budget';
// // // // //       if (lowerMsg.includes('shopping')) budgetName = 'Shopping Budget';
// // // // //       if (lowerMsg.includes('rent')) budgetName = 'Rent Budget';
// // // // //       if (lowerMsg.includes('utilities')) budgetName = 'Utilities Budget';

// // // // //       // Determine period
// // // // //       let period = 'monthly';
// // // // //       if (lowerMsg.includes('daily')) period = 'daily';
// // // // //       if (lowerMsg.includes('weekly')) period = 'weekly';

// // // // //       const payload = {
// // // // //         name: budgetName,
// // // // //         limit_amount: amount,
// // // // //         period: period,
// // // // //         included_category_ids: [],
// // // // //         excluded_category_ids: [],
// // // // //         excluded_merchants: [],
// // // // //         alert_threshold: 80
// // // // //       };

// // // // //       console.log('Creating budget:', payload);
// // // // //       const response = await ApiService.post('/api/v1/budgets/', payload);
// // // // //       return response.data;
// // // // //     } catch (error) {
// // // // //       console.error('Budget creation failed:', error);
// // // // //       if (error.response?.status === 401 || error.response?.status === 403) {
// // // // //         throw new Error('Please login to create budgets');
// // // // //       }
// // // // //       throw error;
// // // // //     }
// // // // //   };

// // // // //   // --- 6. CREATE INCOME ---
// // // // //   const createIncome = async (message) => {
// // // // //     try {
// // // // //       const amount = parseAmount(message);
// // // // //       if (!amount) {
// // // // //         throw new Error('Please specify an income amount');
// // // // //       }

// // // // //       // Determine income type
// // // // //       let sourceType = 'salary';
// // // // //       let incomeName = 'Salary';
// // // // //       const lowerMsg = message.toLowerCase();
// // // // //       if (lowerMsg.includes('business') || lowerMsg.includes('freelance')) {
// // // // //         sourceType = 'business';
// // // // //         incomeName = 'Business Income';
// // // // //       }
// // // // //       if (lowerMsg.includes('rental')) {
// // // // //         sourceType = 'rental';
// // // // //         incomeName = 'Rental Income';
// // // // //       }
// // // // //       if (lowerMsg.includes('dividend')) {
// // // // //         sourceType = 'dividend';
// // // // //         incomeName = 'Dividend Income';
// // // // //       }
// // // // //       if (lowerMsg.includes('interest')) {
// // // // //         sourceType = 'interest';
// // // // //         incomeName = 'Interest Income';
// // // // //       }

// // // // //       const payload = {
// // // // //         name: incomeName,
// // // // //         source_type: sourceType,
// // // // //         rate_type: "fixed",
// // // // //         estimated_monthly_amount: amount,
// // // // //         api_source_identifier: "chat"
// // // // //       };

// // // // //       console.log('Creating income:', payload);
// // // // //       const response = await ApiService.post('/api/v1/income/', payload);
// // // // //       return response.data;
// // // // //     } catch (error) {
// // // // //       console.error('Income creation failed:', error);
// // // // //       if (error.response?.status === 401 || error.response?.status === 403) {
// // // // //         throw new Error('Please login to add income sources');
// // // // //       }
// // // // //       throw error;
// // // // //     }
// // // // //   };

// // // // //   // --- 7. HANDLE SEND MESSAGE ---
// // // // //   const handleSend = async () => {
// // // // //     if (!inputText.trim() || loading) return;

// // // // //     const userMessage = {
// // // // //       id: `user-${Date.now()}`,
// // // // //       role: 'user',
// // // // //       content: inputText.trim(),
// // // // //       timestamp: new Date().toISOString()
// // // // //     };
    
// // // // //     setMessages(prev => [...prev, userMessage]);
// // // // //     const currentText = inputText;
// // // // //     setInputText('');
// // // // //     setLoading(true);

// // // // //     try {
// // // // //       // Check if we're offline
// // // // //       if (apiStatus === 'offline') {
// // // // //         throw new Error('You are offline. Please check your internet connection.');
// // // // //       }

// // // // //       // Detect action type
// // // // //       const actionType = detectActionFromMessage(currentText);
      
// // // // //       let result = null;
// // // // //       let successMessage = '';

// // // // //       switch (actionType) {
// // // // //         case 'transaction':
// // // // //           result = await createTransaction(currentText);
// // // // //           successMessage = `✅ Transaction recorded!\nAmount: ₹${result.amount}\nMerchant: ${result.merchant_raw || 'Unknown'}`;
// // // // //           break;
          
// // // // //         case 'budget':
// // // // //           result = await createBudget(currentText);
// // // // //           successMessage = `✅ Budget created!\nName: ${result.name}\nLimit: ₹${result.limit_amount} (${result.period})`;
// // // // //           break;
          
// // // // //         case 'income':
// // // // //           result = await createIncome(currentText);
// // // // //           successMessage = `✅ Income source added!\nName: ${result.name}\nMonthly: ₹${result.estimated_monthly_amount}`;
// // // // //           break;
          
// // // // //         default:
// // // // //           // For chat messages or other actions
// // // // //           try {
// // // // //             const chatRes = await ApiService.post('/api/v1/chat/', {
// // // // //               message: currentText,
// // // // //               session_id: sessionId
// // // // //             });

// // // // //             if (chatRes.data.session_id) {
// // // // //               setSessionId(chatRes.data.session_id);
// // // // //             }

// // // // //             setMessages(prev => [...prev, {
// // // // //               id: `ai-${Date.now()}`,
// // // // //               role: 'ai',
// // // // //               content: chatRes.data.response,
// // // // //               timestamp: new Date().toISOString()
// // // // //             }]);
            
// // // // //             setLoading(false);
// // // // //             return;
            
// // // // //           } catch (chatError) {
// // // // //             console.log('Chat API failed:', chatError);
            
// // // // //             // If chat API fails but we're online, give helpful message
// // // // //             if (apiStatus === 'online') {
// // // // //               const helpMessage = "I can help you with:\n\n" +
// // // // //                 "• **Record expenses**: 'Spent 500 at Starbucks'\n" +
// // // // //                 "• **Create budgets**: '5000 monthly food budget'\n" +
// // // // //                 "• **Add income**: 'Monthly salary of 75000'\n" +
// // // // //                 "• **Set goals**: 'Save 1 lakh for vacation'\n\n" +
// // // // //                 "Try one of these commands!";
              
// // // // //               setMessages(prev => [...prev, {
// // // // //                 id: `ai-${Date.now()}`,
// // // // //                 role: 'ai',
// // // // //                 content: helpMessage,
// // // // //                 timestamp: new Date().toISOString()
// // // // //               }]);
// // // // //              } else {
// // // // //               // Offline mode
// // // // //               const offlineMessage = "⚠️ You appear to be offline.\n\n" +
// // // // //                 "When you're back online, I can help you:\n" +
// // // // //                 "• Record transactions\n" +
// // // // //                 "• Create budgets\n" +
// // // // //                 "• Add income sources\n" +
// // // // //                 "• And much more!";
              
// // // // //               setMessages(prev => [...prev, {
// // // // //                 id: `ai-${Date.now()}`,
// // // // //                 role: 'ai',
// // // // //                 content: offlineMessage,
// // // // //                 timestamp: new Date().toISOString()
// // // // //               }]);
// // // // //             }
            
// // // // //             setLoading(false);
// // // // //             return;
// // // // //           }
// // // // //       }

// // // // //       // Show success message for direct actions
// // // // //       setMessages(prev => [...prev, {
// // // // //         id: `success-${Date.now()}`,
// // // // //         role: 'ai',
// // // // //         content: successMessage,
// // // // //         timestamp: new Date().toISOString(),
// // // // //         isSuccess: true
// // // // //       }]);

// // // // //     } catch (error) {
// // // // //       console.error('Action error:', error);
      
// // // // //       let errorMessage = 'Sorry, something went wrong. ';
      
// // // // //       if (error.message.includes('login')) {
// // // // //         errorMessage = '🔐 Authentication required. ';
// // // // //         setAuthError(true);
// // // // //       } else if (error.message.includes('offline')) {
// // // // //         errorMessage = '📶 Connection issue. ';
// // // // //         setApiStatus('offline');
// // // // //       } else if (error.response) {
// // // // //         // Server error
// // // // //         const status = error.response.status;
// // // // //         if (status === 401 || status === 403) {
// // // // //           errorMessage = '🔐 Please login again. ';
// // // // //           setAuthError(true);
// // // // //         } else if (status === 404) {
// // // // //           errorMessage = '🔧 Service temporarily unavailable. ';
// // // // //         } else if (status === 422) {
// // // // //           errorMessage = '📝 Please check your input. ';
// // // // //         } else if (status >= 500) {
// // // // //           errorMessage = '⚙️ Server error. Please try again later. ';
// // // // //         }
// // // // //         errorMessage += error.response.data?.detail || `Error ${status}`;
// // // // //       } else if (error.request) {
// // // // //         // Network error
// // // // //         errorMessage = '📶 Network error. Please check your connection.';
// // // // //         setApiStatus('offline');
// // // // //       } else {
// // // // //         // Other errors
// // // // //         errorMessage += error.message;
// // // // //       }

// // // // //       setMessages(prev => [...prev, {
// // // // //         id: `error-${Date.now()}`,
// // // // //         role: 'ai',
// // // // //         content: errorMessage,
// // // // //         timestamp: new Date().toISOString()
// // // // //       }]);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // --- 8. QUICK ACTIONS ---
// // // // //   const quickActions = [
// // // // //     { 
// // // // //       icon: Wallet, 
// // // // //       label: 'Add Expense', 
// // // // //       prompt: 'Spent 500 at Starbucks',
// // // // //       color: '#10B981'
// // // // //     },
// // // // //     { 
// // // // //       icon: BarChart3, 
// // // // //       label: 'Set Budget', 
// // // // //       prompt: '5000 monthly food budget',
// // // // //       color: '#3B82F6'
// // // // //     },
// // // // //     { 
// // // // //       icon: DollarSign, 
// // // // //       label: 'Add Income', 
// // // // //       prompt: 'Monthly salary 75000',
// // // // //       color: '#F59E0B'
// // // // //     },
// // // // //     { 
// // // // //       icon: Target, 
// // // // //       label: 'Set Goal', 
// // // // //       prompt: 'Save 1 lakh for vacation',
// // // // //       color: '#8B5CF6'
// // // // //     },
// // // // //   ];

// // // // //   const handleQuickAction = (prompt) => {
// // // // //     setInputText(prompt);
// // // // //     inputRef.current?.focus();
// // // // //   };

// // // // //   // --- 9. RENDER MESSAGE ---
// // // // //   const renderMessage = (msg) => {
// // // // //     const Icon = msg.role === 'user' ? User : Cpu;
// // // // //     const bgColor = msg.role === 'user' ? '#1E40AF' : '#1F2937';
// // // // //     const borderColor = msg.isSuccess ? '#10B981' : 'transparent';

// // // // //     return (
// // // // //       <YStack key={msg.id} mb="$3">
// // // // //         <XStack 
// // // // //           space="$3" 
// // // // //           fd={msg.role === 'user' ? 'row-reverse' : 'row'}
// // // // //           ai="flex-start"
// // // // //         >
// // // // //           <Circle 
// // // // //             size={36} 
// // // // //             bg={msg.role === 'user' ? '#3B82F6' : '#8B5CF6'}
// // // // //             bw={1} 
// // // // //             bc="rgba(255,255,255,0.1)"
// // // // //           >
// // // // //             <Icon size={16} color="white" />
// // // // //           </Circle>
          
// // // // //           <Card 
// // // // //             p="$3" 
// // // // //             br="$4" 
// // // // //             maxWidth={width * 0.75}
// // // // //             bg={bgColor}
// // // // //             bc={borderColor}
// // // // //             bw={msg.isSuccess ? 2 : 0}
// // // // //           >
// // // // //             <Text 
// // // // //               color="white" 
// // // // //               fontSize={15} 
// // // // //               lineHeight={22}
// // // // //               selectable
// // // // //             >
// // // // //               {msg.content}
// // // // //             </Text>
            
// // // // //             {msg.timestamp && (
// // // // //               <Text 
// // // // //                 color="#94A3B8" 
// // // // //                 fontSize={10} 
// // // // //                 mt="$1"
// // // // //               >
// // // // //                 {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// // // // //               </Text>
// // // // //             )}
// // // // //           </Card>
// // // // //         </XStack>
// // // // //       </YStack>
// // // // //     );
// // // // //   };

// // // // //   // --- 10. RENDER STATUS INDICATOR ---
// // // // //   const renderStatusIndicator = () => {
// // // // //     if (apiStatus === 'checking') {
// // // // //       return (
// // // // //         <XStack ai="center" space="$1">
// // // // //           <Spinner size="small" color="#F59E0B" />
// // // // //           <Text color="#F59E0B" fontSize={11}>Checking...</Text>
// // // // //         </XStack>
// // // // //       );
// // // // //     }
    
// // // // //     if (apiStatus === 'offline') {
// // // // //       return (
// // // // //         <XStack ai="center" space="$1">
// // // // //           <WifiOff size={12} color="#EF4444" />
// // // // //           <Text color="#EF4444" fontSize={11}>Offline</Text>
// // // // //         </XStack>
// // // // //       );
// // // // //     }
    
// // // // //     if (authError) {
// // // // //       return (
// // // // //         <XStack ai="center" space="$1">
// // // // //           <ShieldCheck size={12} color="#EF4444" />
// // // // //           <Text color="#EF4444" fontSize={11}>Login Required</Text>
// // // // //         </XStack>
// // // // //       );
// // // // //     }
    
// // // // //     return (
// // // // //       <XStack ai="center" space="$1">
// // // // //         <Wifi size={12} color="#10B981" />
// // // // //         <Text color="#10B981" fontSize={11}>Online</Text>
// // // // //       </XStack>
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <Theme name="dark">
// // // // //       <LinearGradient 
// // // // //         colors={['#0F172A', '#1E293B']} 
// // // // //         style={{ flex: 1 }}
// // // // //       >
// // // // //         <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          
// // // // //           {/* HEADER */}
// // // // //           <XStack 
// // // // //             p="$4" 
// // // // //             jc="space-between" 
// // // // //             ai="center" 
// // // // //             bbw={1} 
// // // // //             bc="rgba(255,255,255,0.05)"
// // // // //             bg="rgba(15, 23, 42, 0.95)"
// // // // //           >
// // // // //             <TouchableOpacity onPress={() => router.back()}>
// // // // //               <ChevronLeft size={24} color="#CBD5E1" />
// // // // //             </TouchableOpacity>
            
// // // // //             <XStack ai="center" space="$2">
// // // // //               <MessageSquare size={18} color="#8B5CF6" />
// // // // //               <Text color="white" fontWeight="bold" fontSize={18}>
// // // // //                 Financial Chat
// // // // //               </Text>
// // // // //               {renderStatusIndicator()}
// // // // //             </XStack>
            
// // // // //             <TouchableOpacity onPress={checkApiStatus}>
// // // // //               <Sparkles size={20} color="#8B5CF6" />
// // // // //             </TouchableOpacity>
// // // // //           </XStack>

// // // // //           {/* AUTH ERROR BANNER */}
// // // // //           {authError && (
// // // // //             <Card bg="#EF4444" p="$3" mx="$4" my="$2" br="$3">
// // // // //               <XStack ai="center" jc="space-between">
// // // // //                 <XStack ai="center" space="$2" f={1}>
// // // // //                   <AlertCircle size={16} color="white" />
// // // // //                   <Text color="white" fontSize={14}>
// // // // //                     Authentication required
// // // // //                   </Text>
// // // // //                 </XStack>
// // // // //                 <Button 
// // // // //                   size="$2" 
// // // // //                   bg="white" 
// // // // //                   color="#EF4444"
// // // // //                   onPress={() => {
// // // // //                     // Navigate to login or refresh token
// // // // //                     router.push('/login');
// // // // //                   }}
// // // // //                 >
// // // // //                   Login
// // // // //                 </Button>
// // // // //               </XStack>
// // // // //             </Card>
// // // // //           )}

// // // // //           {/* CHAT MESSAGES */}
// // // // //           <ScrollView 
// // // // //             ref={scrollViewRef}
// // // // //             contentContainerStyle={{ 
// // // // //               padding: 16,
// // // // //               paddingBottom: 180 
// // // // //             }}
// // // // //             showsVerticalScrollIndicator={false}
// // // // //           >
// // // // //             {messages.map(renderMessage)}
            
// // // // //             {loading && (
// // // // //               <XStack jc="center" mt="$4">
// // // // //                 <Spinner color="#8B5CF6" size="large" />
// // // // //               </XStack>
// // // // //             )}
// // // // //           </ScrollView>

// // // // //           {/* QUICK ACTIONS */}
// // // // //           {apiStatus === 'online' && !authError && (
// // // // //             <ScrollView 
// // // // //               horizontal 
// // // // //               showsHorizontalScrollIndicator={false}
// // // // //               style={{
// // // // //                 position: 'absolute',
// // // // //                 bottom: 100,
// // // // //                 left: 0,
// // // // //                 right: 0,
// // // // //                 paddingHorizontal: 16
// // // // //               }}
// // // // //               contentContainerStyle={{ paddingRight: 16 }}
// // // // //             >
// // // // //               <XStack space="$3">
// // // // //                 {quickActions.map((action, index) => {
// // // // //                   const ActionIcon = action.icon;
// // // // //                   return (
// // // // //                     <TouchableOpacity
// // // // //                       key={index}
// // // // //                       onPress={() => handleQuickAction(action.prompt)}
// // // // //                       disabled={loading}
// // // // //                     >
// // // // //                       <Card 
// // // // //                         p="$3" 
// // // // //                         br="$4" 
// // // // //                         bg="#1E293B" 
// // // // //                         bc={action.color} 
// // // // //                         bw={1}
// // // // //                       >
// // // // //                         <YStack ai="center" space="$1">
// // // // //                           <ActionIcon size={18} color={action.color} />
// // // // //                           <Text 
// // // // //                             color="white" 
// // // // //                             fontSize={12} 
// // // // //                             fontWeight="medium"
// // // // //                             textAlign="center"
// // // // //                             maxWidth={80}
// // // // //                           >
// // // // //                             {action.label}
// // // // //                           </Text>
// // // // //                         </YStack>
// // // // //                       </Card>
// // // // //                     </TouchableOpacity>
// // // // //                   );
// // // // //                 })}
// // // // //               </XStack>
// // // // //             </ScrollView>
// // // // //           )}

// // // // //           {/* INPUT AREA */}
// // // // //           <KeyboardAvoidingView 
// // // // //             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // // //             keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
// // // // //             style={{
// // // // //               position: 'absolute',
// // // // //               bottom: 0,
// // // // //               left: 0,
// // // // //               right: 0,
// // // // //               backgroundColor: '#0F172A',
// // // // //               padding: 16,
// // // // //               paddingBottom: insets.bottom + 16,
// // // // //               borderTopWidth: 1,
// // // // //               borderTopColor: 'rgba(255,255,255,0.05)'
// // // // //             }}
// // // // //           >
// // // // //             <XStack ai="flex-end" space="$3">
// // // // //               <Input 
// // // // //                 ref={inputRef}
// // // // //                 flex={1}
// // // // //                 placeholder={
// // // // //                   authError 
// // // // //                     ? "Please login to use chat..." 
// // // // //                     : apiStatus === 'offline'
// // // // //                     ? "You're offline. Will connect when back online..."
// // // // //                     : "Type your financial command..."
// // // // //                 }
// // // // //                 color="white"
// // // // //                 placeholderTextColor="#94A3B8"
// // // // //                 fontSize={16}
// // // // //                 minHeight={44}
// // // // //                 maxHeight={120}
// // // // //                 multiline
// // // // //                 numberOfLines={3}
// // // // //                 value={inputText}
// // // // //                 onChangeText={setInputText}
// // // // //                 onSubmitEditing={handleSend}
// // // // //                 returnKeyType="send"
// // // // //                 blurOnSubmit={false}
// // // // //                 borderWidth={1}
// // // // //                 borderColor="#334155"
// // // // //                 bg="#1E293B"
// // // // //                 br="$4"
// // // // //                 editable={!authError && apiStatus !== 'offline'}
// // // // //               />
              
// // // // //               <TouchableOpacity 
// // // // //                 onPress={handleSend}
// // // // //                 disabled={!inputText.trim() || loading || authError || apiStatus === 'offline'}
// // // // //               >
// // // // //                 <Circle 
// // // // //                   size={52} 
// // // // //                   bg={
// // // // //                     authError ? "#EF4444" :
// // // // //                     apiStatus === 'offline' ? "#6B7280" :
// // // // //                     inputText.trim() ? "#8B5CF6" : "#334155"
// // // // //                   }
// // // // //                   style={{ opacity: (!inputText.trim() || loading || authError || apiStatus === 'offline') ? 0.5 : 1 }}
// // // // //                 >
// // // // //                   {loading ? (
// // // // //                     <Spinner color="white" size="small" />
// // // // //                   ) : authError ? (
// // // // //                     <AlertCircle size={20} color="white" />
// // // // //                   ) : apiStatus === 'offline' ? (
// // // // //                     <WifiOff size={20} color="white" />
// // // // //                   ) : (
// // // // //                     <Send size={20} color="white" />
// // // // //                   )}
// // // // //                 </Circle>
// // // // //               </TouchableOpacity>
// // // // //             </XStack>
            
// // // // //             <Text 
// // // // //               color="#64748B" 
// // // // //               fontSize={12} 
// // // // //               textAlign="center" 
// // // // //               mt="$2"
// // // // //             >
// // // // //               {authError 
// // // // //                 ? "Please login to access financial features"
// // // // //                 : apiStatus === 'offline'
// // // // //                 ? "Connect to the internet to use chat features"
// // // // //                 : "Examples: 'Spent 500 at Starbucks' • '5000 food budget' • 'Salary 75000'"}
// // // // //             </Text>
// // // // //           </KeyboardAvoidingView>

// // // // //         </SafeAreaView>
// // // // //       </LinearGradient>
// // // // //     </Theme>
// // // // //   );
// // // // // }


// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { 
// // // //   KeyboardAvoidingView, 
// // // //   Platform, 
// // // //   ScrollView, 
// // // //   TouchableOpacity, 
// // // //   Alert,
// // // //   Dimensions,
// // // //   View,
// // // //   Modal
// // // // } from 'react-native';
// // // // import { 
// // // //   YStack, 
// // // //   XStack, 
// // // //   Text, 
// // // //   Input, 
// // // //   Button, 
// // // //   Spinner, 
// // // //   Theme, 
// // // //   Circle, 
// // // //   Card,
// // // //   H2,
// // // //   H4
// // // // } from 'tamagui';
// // // // import { LinearGradient } from 'expo-linear-gradient';
// // // // import { 
// // // //   Send, 
// // // //   Bot,
// // // //   User, 
// // // //   Sparkles, 
// // // //   ShieldCheck, 
// // // //   ArrowLeft,
// // // //   DollarSign, 
// // // //   TrendingUp, 
// // // //   Wallet, 
// // // //   PieChart, 
// // // //   Target,
// // // //   CheckCircle,
// // // //   X,
// // // //   AlertTriangle,
// // // //   Calendar,
// // // //   Clock,
// // // //   BarChart3,
// // // //   CreditCard,
// // // //   Home,
// // // //   ShoppingBag,
// // // //   Coffee,
// // // //   Car,
// // // //   Plane,
// // // //   GraduationCap,
// // // //   Heart,
// // // //   MessageSquare,
// // // //   Wifi,
// // // //   WifiOff,
// // // //   Plus,
// // // //   RefreshCw,
// // // //   Zap,
// // // //   Briefcase,
// // // //   Building,
// // // //   Bell
// // // // } from '@tamagui/lucide-icons';
// // // // import { useRouter } from 'expo-router';
// // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // import { ApiService } from '../../../services/apiService';

// // // // const { width } = Dimensions.get('window');

// // // // export default function FinancialChat() {
// // // //   const router = useRouter();
// // // //   const insets = useSafeAreaInsets();
// // // //   const scrollViewRef = useRef(null);
// // // //   const inputRef = useRef(null);
  
// // // //   // --- STATE ---
// // // //   const [messages, setMessages] = useState([{
// // // //     id: 'welcome-1', 
// // // //     role: 'ai', 
// // // //     content: 'Hello! I\'m your financial assistant. You can:\n\n• Say "Spent ₹500 at Starbucks" to record transactions\n• Say "Create ₹5000 monthly food budget"\n• Say "Save ₹1 lakh for vacation by Dec 2025"\n• Say "Monthly salary of ₹75000"\n• Say "I have 10 Bitcoin worth ₹50 lakhs"\n\nWhat would you like to do?',
// // // //     timestamp: new Date().toISOString()
// // // //   }]);
  
// // // //   const [inputText, setInputText] = useState('');
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [sessionId, setSessionId] = useState(null);
// // // //   const [apiStatus, setApiStatus] = useState('checking');
// // // //   const [authError, setAuthError] = useState(false);
// // // //   const [showExamples, setShowExamples] = useState(false);

// // // //   // Check API status on mount
// // // //   useEffect(() => {
// // // //     checkApiStatus();
// // // //   }, []);

// // // //   const checkApiStatus = async () => {
// // // //     try {
// // // //       setApiStatus('checking');
      
// // // //       // Try chat endpoint
// // // //       try {
// // // //         const response = await ApiService.get('/goals/'); // Using goals endpoint as health check
// // // //         if (response.status < 500) {
// // // //           setApiStatus('online');
// // // //           return;
// // // //         }
// // // //       } catch (e) {
// // // //         console.log('Health check failed:', e.message);
// // // //       }

// // // //       setApiStatus('offline');
      
// // // //     } catch (error) {
// // // //       console.log('API status check error:', error);
// // // //       setApiStatus('offline');
// // // //     }
// // // //   };

// // // //   // Auto-scroll
// // // //   useEffect(() => {
// // // //     if (scrollViewRef.current) {
// // // //       setTimeout(() => {
// // // //         scrollViewRef.current?.scrollToEnd({ animated: true });
// // // //       }, 100);
// // // //     }
// // // //   }, [messages]);

// // // //   // Handle send message
// // // //   const handleSend = async () => {
// // // //     if (!inputText.trim() || loading) return;

// // // //     const userMessage = {
// // // //       id: `user-${Date.now()}`,
// // // //       role: 'user',
// // // //       content: inputText.trim(),
// // // //       timestamp: new Date().toISOString()
// // // //     };
    
// // // //     setMessages(prev => [...prev, userMessage]);
// // // //     const currentText = inputText;
// // // //     setInputText('');
// // // //     setLoading(true);

// // // //     try {
// // // //       // Check if we're offline
// // // //       if (apiStatus === 'offline') {
// // // //         throw new Error('You are offline. Please check your internet connection.');
// // // //       }

// // // //       // Call chat API
// // // //       const response = await ApiService.post('/api/v1/chat/', {
// // // //         message: currentText,
// // // //         session_id: sessionId
// // // //       });

// // // //       console.log('Chat response:', response.data);

// // // //       if (response.data.session_id) {
// // // //         setSessionId(response.data.session_id);
// // // //       }

// // // //       setMessages(prev => [...prev, {
// // // //         id: `ai-${Date.now()}`,
// // // //         role: 'ai',
// // // //         content: response.data.message,
// // // //         timestamp: new Date().toISOString(),
// // // //         action: response.data.action,
// // // //         data: response.data.data
// // // //       }]);
      
// // // //     } catch (error) {
// // // //       console.error('Chat error:', error);
      
// // // //       let errorMessage = 'Sorry, something went wrong. ';
      
// // // //       if (error.message.includes('offline')) {
// // // //         errorMessage = '📶 You are offline. Please check your connection.';
// // // //         setApiStatus('offline');
// // // //       } else if (error.response) {
// // // //         const status = error.response.status;
// // // //         if (status === 401 || status === 403) {
// // // //           errorMessage = '🔐 Please login to use the chat.';
// // // //           setAuthError(true);
// // // //         } else if (status === 422) {
// // // //           errorMessage = '📝 Please check your input.';
// // // //         } else if (status >= 500) {
// // // //           errorMessage = '⚙️ Server error. Please try again later.';
// // // //         }
// // // //         errorMessage += error.response.data?.detail || '';
// // // //       } else if (error.request) {
// // // //         errorMessage = '📶 Network error. Please check your connection.';
// // // //         setApiStatus('offline');
// // // //       } else {
// // // //         errorMessage += error.message;
// // // //       }

// // // //       setMessages(prev => [...prev, {
// // // //         id: `error-${Date.now()}`,
// // // //         role: 'ai',
// // // //         content: errorMessage,
// // // //         timestamp: new Date().toISOString()
// // // //       }]);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Quick actions
// // // //   const quickActions = [
// // // //     { 
// // // //       icon: Wallet, 
// // // //       label: 'Add Expense', 
// // // //       prompt: 'Spent ₹500 at Starbucks',
// // // //       color: '#10B981'
// // // //     },
// // // //     { 
// // // //       icon: BarChart3, 
// // // //       label: 'Set Budget', 
// // // //       prompt: '₹5000 monthly food budget',
// // // //       color: '#3B82F6'
// // // //     },
// // // //     { 
// // // //       icon: DollarSign, 
// // // //       label: 'Add Income', 
// // // //       prompt: 'Monthly salary ₹75000',
// // // //       color: '#F59E0B'
// // // //     },
// // // //     { 
// // // //       icon: Target, 
// // // //       label: 'Set Goal', 
// // // //       prompt: 'Save ₹1 lakh for vacation',
// // // //       color: '#8B5CF6'
// // // //     },
// // // //   ];

// // // //   const handleQuickAction = (prompt) => {
// // // //     setInputText(prompt);
// // // //     inputRef.current?.focus();
// // // //   };

// // // //   // Render message
// // // //   const renderMessage = (msg) => {
// // // //     const Icon = msg.role === 'user' ? User : Bot;
// // // //     const bgColor = msg.role === 'user' ? '#3B82F6' : '#1E293B';
// // // //     const borderColor = msg.action ? '#10B981' : 'transparent';

// // // //     return (
// // // //       <YStack key={msg.id} mb="$4">
// // // //         <XStack 
// // // //           space="$3" 
// // // //           fd={msg.role === 'user' ? 'row-reverse' : 'row'}
// // // //           ai="flex-start"
// // // //         >
// // // //           <View style={{
// // // //             width: 40,
// // // //             height: 40,
// // // //             borderRadius: 12,
// // // //             backgroundColor: msg.role === 'user' ? '#3B82F620' : '#8B5CF620',
// // // //             justifyContent: 'center',
// // // //             alignItems: 'center',
// // // //           }}>
// // // //             <Icon size={20} color={msg.role === 'user' ? '#3B82F6' : '#8B5CF6'} />
// // // //           </View>
          
// // // //           <Card 
// // // //             p="$4" 
// // // //             br="$4" 
// // // //             maxWidth={width * 0.75}
// // // //             bg={bgColor}
// // // //             bc={borderColor}
// // // //             bw={msg.action ? 2 : 0}
// // // //           >
// // // //             <Text 
// // // //               color="white" 
// // // //               fontSize={15} 
// // // //               lineHeight={22}
// // // //               selectable
// // // //             >
// // // //               {msg.content}
// // // //             </Text>
            
// // // //             {msg.timestamp && (
// // // //               <XStack jc="space-between" ai="center" mt="$2">
// // // //                 <Text color="#94A3B8" fontSize={11}>
// // // //                   {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// // // //                 </Text>
// // // //                 {msg.action && (
// // // //                   <XStack ai="center" space="$1">
// // // //                     <CheckCircle size={12} color="#10B981" />
// // // //                     <Text color="#10B981" fontSize={11}>
// // // //                       {msg.action}
// // // //                     </Text>
// // // //                   </XStack>
// // // //                 )}
// // // //               </XStack>
// // // //             )}
// // // //           </Card>
// // // //         </XStack>
// // // //       </YStack>
// // // //     );
// // // //   };

// // // //   // Render status indicator
// // // //   const renderStatusIndicator = () => {
// // // //     if (apiStatus === 'checking') {
// // // //       return (
// // // //         <XStack ai="center" space="$2" bg="#F59E0B20" px="$2" py="$1" br="$3">
// // // //           <Spinner size="small" color="#F59E0B" />
// // // //           <Text color="#F59E0B" fontSize={12} fontWeight="600">
// // // //             Connecting...
// // // //           </Text>
// // // //         </XStack>
// // // //       );
// // // //     }
    
// // // //     if (apiStatus === 'offline') {
// // // //       return (
// // // //         <XStack ai="center" space="$2" bg="#EF444420" px="$2" py="$1" br="$3">
// // // //           <WifiOff size={14} color="#EF4444" />
// // // //           <Text color="#EF4444" fontSize={12} fontWeight="600">
// // // //             Offline
// // // //           </Text>
// // // //         </XStack>
// // // //       );
// // // //     }
    
// // // //     if (authError) {
// // // //       return (
// // // //         <XStack ai="center" space="$2" bg="#EF444420" px="$2" py="$1" br="$3">
// // // //           <ShieldCheck size={14} color="#EF4444" />
// // // //           <Text color="#EF4444" fontSize={12} fontWeight="600">
// // // //             Login Required
// // // //           </Text>
// // // //         </XStack>
// // // //       );
// // // //     }
    
// // // //     return (
// // // //       <XStack ai="center" space="$2" bg="#10B98120" px="$2" py="$1" br="$3">
// // // //         <Wifi size={14} color="#10B981" />
// // // //         <Text color="#10B981" fontSize={12} fontWeight="600">
// // // //           Online
// // // //         </Text>
// // // //       </XStack>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <Theme name="dark">
// // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // // //         {/* HEADER */}
// // // //         <XStack p={20} ai="center" space={16}>
// // // //           <TouchableOpacity onPress={() => router.back()}>
// // // //             <ArrowLeft size={24} color="#EAB308" />
// // // //           </TouchableOpacity>
          
// // // //           <YStack flex={1}>
// // // //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
// // // //               AI Financial Advisor
// // // //             </H2>
// // // //             <Text color="#666666" fontSize={14}>
// // // //               Chat with your AI financial assistant
// // // //             </Text>
// // // //           </YStack>
          
// // // //           <TouchableOpacity 
// // // //             onPress={checkApiStatus}
// // // //             style={{
// // // //               width: 44,
// // // //               height: 44,
// // // //               borderRadius: 22,
// // // //               backgroundColor: '#1A1A1A',
// // // //               justifyContent: 'center',
// // // //               alignItems: 'center',
// // // //               borderWidth: 1,
// // // //               borderColor: '#EAB308',
// // // //             }}
// // // //           >
// // // //             <RefreshCw size={20} color="#EAB308" />
// // // //           </TouchableOpacity>
// // // //         </XStack>

// // // //         {/* STATUS CARD */}
// // // //         <Card m={20} mb={16} backgroundColor="#1A1A1A" br={16} borderLeftWidth={4} borderLeftColor={
// // // //           apiStatus === 'online' ? '#10B981' : 
// // // //           apiStatus === 'offline' ? '#EF4444' : '#F59E0B'
// // // //         }>
// // // //           <XStack p={16} ai="center" space={12}>
// // // //             {renderStatusIndicator()}
// // // //             <Text color="#666666" fontSize={12} flex={1}>
// // // //               {apiStatus === 'online' 
// // // //                 ? 'Connected to financial advisor'
// // // //                 : apiStatus === 'offline'
// // // //                 ? 'Cannot connect to server'
// // // //                 : 'Checking connection...'}
// // // //             </Text>
// // // //           </XStack>
// // // //         </Card>

// // // //         {/* QUICK ACTIONS */}
// // // //         {apiStatus === 'online' && !authError && (
// // // //           <ScrollView 
// // // //             horizontal 
// // // //             showsHorizontalScrollIndicator={false}
// // // //             style={{ paddingHorizontal: 20, marginBottom: 16 }}
// // // //             contentContainerStyle={{ paddingRight: 20 }}
// // // //           >
// // // //             <XStack space={12}>
// // // //               {quickActions.map((action, index) => {
// // // //                 const ActionIcon = action.icon;
// // // //                 return (
// // // //                   <TouchableOpacity
// // // //                     key={index}
// // // //                     onPress={() => handleQuickAction(action.prompt)}
// // // //                     disabled={loading}
// // // //                   >
// // // //                     <Card 
// // // //                       p={16} 
// // // //                       br={12} 
// // // //                       backgroundColor="#1A1A1A"
// // // //                       borderWidth={1}
// // // //                       borderColor={action.color + '40'}
// // // //                       minWidth={120}
// // // //                     >
// // // //                       <YStack ai="center" space={8}>
// // // //                         <View style={{
// // // //                           width: 40,
// // // //                           height: 40,
// // // //                           borderRadius: 20,
// // // //                           backgroundColor: action.color + '20',
// // // //                           justifyContent: 'center',
// // // //                           alignItems: 'center',
// // // //                         }}>
// // // //                           <ActionIcon size={20} color={action.color} />
// // // //                         </View>
// // // //                         <Text color="white" fontSize={14} fontWeight="700" textAlign="center">
// // // //                           {action.label}
// // // //                         </Text>
// // // //                       </YStack>
// // // //                     </Card>
// // // //                   </TouchableOpacity>
// // // //                 );
// // // //               })}
// // // //             </XStack>
// // // //           </ScrollView>
// // // //         )}

// // // //         {/* CHAT MESSAGES */}
// // // //         <ScrollView 
// // // //           ref={scrollViewRef}
// // // //           contentContainerStyle={{ 
// // // //             paddingHorizontal: 20,
// // // //             paddingBottom: insets.bottom + 180 
// // // //           }}
// // // //           showsVerticalScrollIndicator={false}
// // // //         >
// // // //           {messages.map(renderMessage)}
          
// // // //           {loading && (
// // // //             <XStack jc="center" mt={20}>
// // // //               <YStack ai="center" space={12}>
// // // //                 <Spinner color="#EAB308" size="large" />
// // // //                 <Text color="#666666" fontSize={14}>
// // // //                   AI is thinking...
// // // //                 </Text>
// // // //               </YStack>
// // // //             </XStack>
// // // //           )}

// // // //           {/* EXAMPLES CARD */}
// // // //           {messages.length <= 2 && (
// // // //             <Card backgroundColor="#1A1A1A" p={16} br={12} mt={16}>
// // // //               <YStack space={12}>
// // // //                 <XStack ai="center" space={8}>
// // // //                   <Sparkles size={18} color="#EAB308" />
// // // //                   <Text color="#EAB308" fontSize={16} fontWeight="700">
// // // //                     Try These Examples
// // // //                   </Text>
// // // //                 </XStack>
                
// // // //                 <YStack space={8}>
// // // //                   <TouchableOpacity
// // // //                     onPress={() => handleQuickAction('Spent ₹500 at Starbucks')}
// // // //                     style={{
// // // //                       backgroundColor: '#333333',
// // // //                       padding: 12,
// // // //                       borderRadius: 8,
// // // //                     }}
// // // //                   >
// // // //                     <Text color="white" fontSize={14}>
// // // //                       • Spent ₹500 at Starbucks
// // // //                     </Text>
// // // //                   </TouchableOpacity>
                  
// // // //                   <TouchableOpacity
// // // //                     onPress={() => handleQuickAction('Monthly salary ₹75000')}
// // // //                     style={{
// // // //                       backgroundColor: '#333333',
// // // //                       padding: 12,
// // // //                       borderRadius: 8,
// // // //                     }}
// // // //                   >
// // // //                     <Text color="white" fontSize={14}>
// // // //                       • Monthly salary ₹75000
// // // //                     </Text>
// // // //                   </TouchableOpacity>
                  
// // // //                   <TouchableOpacity
// // // //                     onPress={() => handleQuickAction('Save ₹1 lakh for vacation by Dec 2025')}
// // // //                     style={{
// // // //                       backgroundColor: '#333333',
// // // //                       padding: 12,
// // // //                       borderRadius: 8,
// // // //                     }}
// // // //                   >
// // // //                     <Text color="white" fontSize={14}>
// // // //                       • Save ₹1 lakh for vacation
// // // //                     </Text>
// // // //                   </TouchableOpacity>
                  
// // // //                   <TouchableOpacity
// // // //                     onPress={() => handleQuickAction('₹5000 monthly food budget')}
// // // //                     style={{
// // // //                       backgroundColor: '#333333',
// // // //                       padding: 12,
// // // //                       borderRadius: 8,
// // // //                     }}
// // // //                   >
// // // //                     <Text color="white" fontSize={14}>
// // // //                       • ₹5000 monthly food budget
// // // //                     </Text>
// // // //                   </TouchableOpacity>
// // // //                 </YStack>
// // // //               </YStack>
// // // //             </Card>
// // // //           )}
// // // //         </ScrollView>

// // // //         {/* INPUT AREA */}
// // // //         <KeyboardAvoidingView 
// // // //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // // //           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
// // // //           style={{
// // // //             position: 'absolute',
// // // //             bottom: 0,
// // // //             left: 0,
// // // //             right: 0,
// // // //             backgroundColor: '#000000',
// // // //             padding: 16,
// // // //             paddingBottom: insets.bottom + 16,
// // // //             borderTopWidth: 1,
// // // //             borderTopColor: '#333333'
// // // //           }}
// // // //         >
// // // //           <YStack space={12}>
// // // //             {/* AUTH ERROR BANNER */}
// // // //             {authError && (
// // // //               <Card bg="#EF444420" p={12} br={8} borderWidth={1} borderColor="#EF4444">
// // // //                 <XStack ai="center" jc="space-between">
// // // //                   <XStack ai="center" space={8} f={1}>
// // // //                     <AlertTriangle size={16} color="#EF4444" />
// // // //                     <Text color="#EF4444" fontSize={13} fontWeight="600">
// // // //                       Authentication required to use AI chat
// // // //                     </Text>
// // // //                   </XStack>
// // // //                   <TouchableOpacity
// // // //                     onPress={() => router.push('/login')}
// // // //                     style={{
// // // //                       backgroundColor: '#EF4444',
// // // //                       paddingHorizontal: 12,
// // // //                       paddingVertical: 6,
// // // //                       borderRadius: 6,
// // // //                     }}
// // // //                   >
// // // //                     <Text color="white" fontSize={12} fontWeight="700">
// // // //                       Login
// // // //                     </Text>
// // // //                   </TouchableOpacity>
// // // //                 </XStack>
// // // //               </Card>
// // // //             )}

// // // //             <XStack ai="flex-end" space={12}>
// // // //               <Input 
// // // //                 ref={inputRef}
// // // //                 flex={1}
// // // //                 placeholder={
// // // //                   authError 
// // // //                     ? "Please login to use AI chat..." 
// // // //                     : apiStatus === 'offline'
// // // //                     ? "You're offline. Will connect when back online..."
// // // //                     : "Type your financial question or command..."
// // // //                 }
// // // //                 color="white"
// // // //                 placeholderTextColor="#666666"
// // // //                 fontSize={16}
// // // //                 minHeight={48}
// // // //                 maxHeight={100}
// // // //                 multiline
// // // //                 numberOfLines={3}
// // // //                 value={inputText}
// // // //                 onChangeText={setInputText}
// // // //                 onSubmitEditing={handleSend}
// // // //                 returnKeyType="send"
// // // //                 blurOnSubmit={false}
// // // //                 borderWidth={1}
// // // //                 borderColor="#333333"
// // // //                 bg="#1A1A1A"
// // // //                 br={12}
// // // //                 editable={!authError && apiStatus !== 'offline'}
// // // //               />
              
// // // //               <TouchableOpacity 
// // // //                 onPress={handleSend}
// // // //                 disabled={!inputText.trim() || loading || authError || apiStatus === 'offline'}
// // // //                 style={{
// // // //                   width: 52,
// // // //                   height: 52,
// // // //                   borderRadius: 26,
// // // //                   backgroundColor: authError ? "#EF4444" :
// // // //                     apiStatus === 'offline' ? "#666666" :
// // // //                     inputText.trim() ? "#EAB308" : "#333333",
// // // //                   justifyContent: 'center',
// // // //                   alignItems: 'center',
// // // //                   opacity: (!inputText.trim() || loading || authError || apiStatus === 'offline') ? 0.5 : 1,
// // // //                 }}
// // // //               >
// // // //                 {loading ? (
// // // //                   <Spinner size="small" color="white" />
// // // //                 ) : (
// // // //                   <Send size={20} color="white" />
// // // //                 )}
// // // //               </TouchableOpacity>
// // // //             </XStack>
            
// // // //             <Text color="#666666" fontSize={12} textAlign="center">
// // // //               Press Enter to send • Use examples above to get started
// // // //             </Text>
// // // //           </YStack>
// // // //         </KeyboardAvoidingView>

// // // //       </SafeAreaView>
// // // //     </Theme>
// // // //   );
// // // // }


// // import React, { useState, useEffect, useRef } from 'react';
// // import { 
// //   KeyboardAvoidingView, 
// //   Platform, 
// //   ScrollView, 
// //   TouchableOpacity, 
// //   Alert,
// //   View,
// //   StyleSheet 
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
// //   Separator 
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
// //   PieChart, 
// //   Check, 
// //   X, 
// //   Terminal, 
// //   Target,
// //   Plus,
// //   Clock,
// //   Calendar,
// //   BarChart3,
// //   TrendingDown,
// //   ArrowUpRight,
// //   ArrowDownRight,
// //   Zap,
// //   AlertCircle
// // } from '@tamagui/lucide-icons';
// // import { useRouter } from 'expo-router';
// // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // import { ApiService } from '../../../services/apiService';

// // // Table Component for structured data
// // const DataTable = ({ data, title }) => {
// //   if (!data || typeof data !== 'object') return null;

// //   const renderValue = (value) => {
// //     if (typeof value === 'number') {
// //       return new Intl.NumberFormat('en-IN', {
// //         style: 'currency',
// //         currency: 'INR',
// //         minimumFractionDigits: 0,
// //         maximumFractionDigits: 0
// //       }).format(value);
// //     }
// //     if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
// //       return new Date(value).toLocaleDateString('en-IN', {
// //         day: 'numeric',
// //         month: 'short',
// //         year: 'numeric'
// //       });
// //     }
// //     return String(value);
// //   };

// //   const rows = Object.entries(data);

// //   return (
// //     <Card p="$4" bg="#111" bw={1} bc="rgba(234, 179, 8, 0.3)" br="$4" mt="$2">
// //       {title && (
// //         <XStack ai="center" space="$2" mb="$3">
// //           <BarChart3 size={14} color="#EAB308" />
// //           <Text color="#EAB308" fontWeight="900" fontSize={11} ls={1}>
// //             {title.toUpperCase()}
// //           </Text>
// //         </XStack>
// //       )}
      
// //       {rows.map(([key, value], index) => (
// //         <React.Fragment key={key}>
// //           <XStack jc="space-between" ai="center" py="$2">
// //             <XStack ai="center" space="$2" f={1}>
// //               <Text color="$gray11" fontSize={12} fontWeight="600">
// //                 {key.replace(/_/g, ' ').toUpperCase()}
// //               </Text>
// //             </XStack>
// //             <Text 
// //               color="white" 
// //               fontSize={13} 
// //               fontWeight="700"
// //               numberOfLines={2}
// //               ellipsizeMode="tail"
// //               maxWidth="60%"
// //             >
// //               {renderValue(value)}
// //             </Text>
// //           </XStack>
// //           {index < rows.length - 1 && (
// //             <Separator bc="rgba(255,255,255,0.1)" />
// //           )}
// //         </React.Fragment>
// //       ))}
// //     </Card>
// //   );
// // };

// // // Quick Actions Component
// // const QuickActions = ({ onActionPress }) => {
// //   const actions = [
// //     {
// //       id: 'create_income',
// //       title: 'Add Income',
// //       icon: DollarSign,
// //       color: '#10B981',
// //       description: 'Record new income source'
// //     },
// //     {
// //       id: 'create_budget',
// //       title: 'Set Budget',
// //       icon: PieChart,
// //       color: '#8B5CF6',
// //       description: 'Create spending limit'
// //     },
// //     {
// //       id: 'create_goal',
// //       title: 'New Goal',
// //       icon: Target,
// //       color: '#F59E0B',
// //       description: 'Save for future'
// //     },
// //     {
// //       id: 'analyze',
// //       title: 'Analyze',
// //       icon: TrendingUp,
// //       color: '#3B82F6',
// //       description: 'Review finances'
// //     }
// //   ];

// //   return (
// //     <YStack mb="$4">
// //       <XStack ai="center" space="$2" mb="$2">
// //         <Zap size={14} color="#EAB308" />
// //         <Text color="#EAB308" fontWeight="900" fontSize={10} ls={1}>
// //           QUICK ACTIONS
// //         </Text>
// //       </XStack>
      
// //       <ScrollView 
// //         horizontal 
// //         showsHorizontalScrollIndicator={false}
// //         contentContainerStyle={{ paddingRight: 16 }}
// //       >
// //         <XStack space="$3">
// //           {actions.map((action) => {
// //             const Icon = action.icon;
// //             return (
// //               <TouchableOpacity
// //                 key={action.id}
// //                 onPress={() => onActionPress(action.id)}
// //               >
// //                 <Card 
// //                   p="$3" 
// //                   bg="#0A0A0A" 
// //                   bw={1} 
// //                   bc={action.color + '40'} 
// //                   br="$4"
// //                   width={120}
// //                   height={100}
// //                 >
// //                   <YStack ai="center" jc="center" flex={1}>
// //                     <Circle size={36} bg={action.color + '20'} mb="$1">
// //                       <Icon size={18} color={action.color} />
// //                     </Circle>
// //                     <Text color="white" fontWeight="800" fontSize={12} textAlign="center">
// //                       {action.title}
// //                     </Text>
// //                     <Text 
// //                       color="$gray11" 
// //                       fontSize={9} 
// //                       textAlign="center"
// //                       mt="$1"
// //                       numberOfLines={2}
// //                     >
// //                       {action.description}
// //                     </Text>
// //                   </YStack>
// //                 </Card>
// //               </TouchableOpacity>
// //             );
// //           })}
// //         </XStack>
// //       </ScrollView>
// //     </YStack>
// //   );
// // };

// // // Parsing function for AI response
// // const parseAIResponse = (response) => {
// //   try {
// //     // Check if response is already JSON
// //     if (typeof response === 'object') {
// //       return {
// //         text: response.message || response.response || '',
// //         data: response.data || null,
// //         action: response.action || null,
// //         mode: response.mode || 'chat'
// //       };
// //     }
    
// //     // Try to parse JSON from text response
// //     const jsonMatch = response.match(/\{.*\}/s);
// //     if (jsonMatch) {
// //       const parsed = JSON.parse(jsonMatch[0]);
// //       return {
// //         text: parsed.message || parsed.response || response.replace(jsonMatch[0], '').trim(),
// //         data: parsed.data || parsed,
// //         action: parsed.action || null,
// //         mode: parsed.mode || 'chat'
// //       };
// //     }
    
// //     // Return as plain text
// //     return {
// //       text: response,
// //       data: null,
// //       action: null,
// //       mode: 'chat'
// //     };
// //   } catch (error) {
// //     // Return as plain text on parse error
// //     return {
// //       text: response,
// //       data: null,
// //       action: null,
// //       mode: 'chat'
// //     };
// //   }
// // };

// // // Format text with proper spacing
// // const formatTextResponse = (text) => {
// //   if (!text) return '';
  
// //   // Add bullet points for lists
// //   const lines = text.split('\n').map(line => {
// //     if (line.trim().startsWith('-') || line.trim().match(/^\d+\./)) {
// //       return `• ${line.replace(/^[-•\d\.\s]+/, '')}`;
// //     }
// //     return line;
// //   });
  
// //   return lines.join('\n');
// // };

// // export default function ChatCommandBridge() {
// //   const router = useRouter();
// //   const insets = useSafeAreaInsets();
// //   const scrollViewRef = useRef(null);
// //   const inputRef = useRef(null);

// //   const [messages, setMessages] = useState([{
// //     id: 'sys-1', 
// //     role: 'ai', 
// //     content: 'Hello! I\'m your financial advisor. How can I help with your finances today?',
// //     timestamp: new Date().toISOString(),
// //     data: null,
// //     mode: 'chat'
// //   }]);
  
// //   const [inputText, setInputText] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [showQuickActions, setShowQuickActions] = useState(true);

// //   // Handle quick action selection
// //   const handleQuickAction = (actionId) => {
// //     const actionPrompts = {
// //       create_income: 'Add a new income source',
// //       create_budget: 'Create a budget for my expenses',
// //       create_goal: 'Set a financial goal to save for',
// //       analyze: 'Analyze my current financial situation'
// //     };
    
// //     setInputText(actionPrompts[actionId] || '');
// //     inputRef.current?.focus();
// //     setShowQuickActions(false);
// //   };

// //   // Execute AI action (matching your backend functions)
// //   const executeAiAction = async (actionData, messageId) => {
// //     setLoading(true);
// //     try {
// //       let endpoint = '';
// //       let payload = {};

// //       // Routing based on intent
// //       switch (actionData.action) {
// //         case 'create_income':
// //           endpoint = '/income/';
// //           payload = {
// //             name: actionData.name || "New Income Source",
// //             source_type: actionData.source_type || "salary",
// //             rate_type: actionData.period || "MONTHLY",
// //             estimated_monthly_amount: actionData.amount || actionData.limit_amount,
// //             api_source_identifier: "ai_chat"
// //           };
// //           break;

// //         case 'create_budget':
// //           endpoint = '/budgets/';
// //           payload = {
// //             name: actionData.name,
// //             limit_amount: actionData.limit_amount,
// //             period: actionData.period || "monthly",
// //             included_category_ids: [actionData.category_id || "general"],
// //             alert_threshold: 80
// //           };
// //           break;

// //         case 'create_transaction':
// //           endpoint = '/transactions/';
// //           payload = {
// //             amount: actionData.amount,
// //             currency: "INR",
// //             occurred_at: actionData.occurred_at || new Date().toISOString(),
// //             category_id: actionData.category_id || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// //             merchant_raw: actionData.merchant_raw || "Unknown Merchant",
// //             description: actionData.description || "Added via AI Chat",
// //             source: "manual"
// //           };
// //           break;

// //         case 'create_goal':
// //           endpoint = '/goals/';
// //           payload = {
// //             name: actionData.name,
// //             target_amount: actionData.target_amount,
// //             target_date: actionData.target_date || new Date().toISOString().split('T')[0]
// //           };
// //           break;
// //       }

// //       // Execute to backend
// //       await ApiService.post(endpoint, payload);

// //       // UI success state
// //       setMessages(prev => prev.map(m => m.id === messageId ? { ...m, protocolStatus: 'executed' } : m));
      
// //       // Add success message
// //       const successMsg = {
// //         id: `success-${Date.now()}`,
// //         role: 'ai',
// //         content: `✅ Success! I have created the ${actionData.action.replace(/_/g, ' ')} in your financial system.`,
// //         timestamp: new Date().toISOString(),
// //         data: null,
// //         mode: 'chat'
// //       };
      
// //       setMessages(prev => [...prev, successMsg]);

// //     } catch (error) {
// //       console.error("Execution Error:", error.response?.data);
      
// //       const errorMsg = {
// //         id: `error-${Date.now()}`,
// //         role: 'ai',
// //         content: `❌ Failed to execute. ${error.response?.data?.detail || 'Please try again with more details.'}`,
// //         timestamp: new Date().toISOString(),
// //         data: null,
// //         mode: 'chat'
// //       };
      
// //       setMessages(prev => [...prev, errorMsg]);
      
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSend = async (manualText) => {
// //     const text = typeof manualText === 'string' ? manualText : inputText;
// //     if (!text.trim() || loading) return;

// //     // Add user message
// //     const userMsg = { 
// //       id: `u-${Date.now()}`, 
// //       role: 'user', 
// //       content: text, 
// //       timestamp: new Date().toISOString(),
// //       data: null,
// //       mode: 'chat'
// //     };
    
// //     setMessages(prev => [...prev, userMsg]);
// //     setInputText('');
// //     setLoading(true);
// //     setShowQuickActions(false);

// //     try {
// //       // POST to /api/v1/chat/
// //       const res = await ApiService.post('/chat/', { 
// //         message: text, 
// //         session_id: "finni_bridge" 
// //       });

// //       // Parse the response
// //       const parsedResponse = parseAIResponse(res.data);
      
// //       const aiResponse = {
// //         id: `ai-${Date.now()}`,
// //         role: 'ai',
// //         content: parsedResponse.text,
// //         timestamp: new Date().toISOString(),
// //         data: parsedResponse.data,
// //         action: parsedResponse.action,
// //         mode: parsedResponse.mode
// //       };

// //       setMessages(prev => [...prev, aiResponse]);
      
// //     } catch (error) {
// //       console.error("API Error:", error);
      
// //       const errorMsg = {
// //         id: `err-${Date.now()}`,
// //         role: 'ai',
// //         content: '⚠️ Connection issue. Please check your network and try again.',
// //         timestamp: new Date().toISOString(),
// //         data: null,
// //         mode: 'chat'
// //       };
      
// //       setMessages(prev => [...prev, errorMsg]);
      
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Render message content based on type
// //   const renderMessageContent = (msg) => {
// //     const formattedText = formatTextResponse(msg.content);
    
// //     return (
// //       <YStack>
// //         {/* Text content */}
// //         {formattedText && (
// //           <Text color="white" fontSize={14} lineHeight={20}>
// //             {formattedText}
// //           </Text>
// //         )}
        
// //         {/* Data table if available */}
// //         {msg.data && msg.mode === 'planning' && (
// //           <YStack mt="$3">
// //             <DataTable 
// //               data={msg.data.calculation || msg.data} 
// //               title={msg.data.goal?.name || "Financial Plan"}
// //             />
            
// //             {msg.data.recommended_budgets && (
// //               <DataTable 
// //                 data={msg.data.recommended_budgets.reduce((acc, budget, idx) => ({
// //                   ...acc,
// //                   [budget.name]: `₹${budget.limit_amount?.toLocaleString() || '0'}`
// //                 }), {})}
// //                 title="Recommended Budgets"
// //               />
// //             )}
            
// //             {msg.data.risks && Array.isArray(msg.data.risks) && (
// //               <Card p="$3" bg="#111" bw={1} bc="rgba(239, 68, 68, 0.3)" br="$4" mt="$2">
// //                 <XStack ai="center" space="$2" mb="$2">
// //                   <AlertCircle size={12} color="#EF4444" />
// //                   <Text color="#EF4444" fontWeight="900" fontSize={10}>
// //                     RISKS TO CONSIDER
// //                   </Text>
// //                 </XStack>
// //                 {msg.data.risks.map((risk, idx) => (
// //                   <XStack key={idx} ai="flex-start" space="$2" mb="$1">
// //                     <Text color="#EF4444" fontSize={12}>•</Text>
// //                     <Text color="$gray11" fontSize={12} flex={1}>
// //                       {risk}
// //                     </Text>
// //                   </XStack>
// //                 ))}
// //               </Card>
// //             )}
// //           </YStack>
// //         )}
        
// //         {/* Action buttons for executable actions */}
// //         {msg.action && msg.action.action !== 'none' && !msg.protocolStatus && (
// //           <YStack mt="$3">
// //             <Card p="$4" bg="#111" bw={1} bc="#EAB308" br="$4">
// //               <XStack ai="center" space="$2" mb="$2">
// //                 <Sparkles size={14} color="#EAB308" />
// //                 <Text color="#EAB308" fontWeight="900" fontSize={10} ls={2}>
// //                   ACTION DETECTED
// //                 </Text>
// //               </XStack>
// //               <Text color="white" fontWeight="800" fontSize={16} mb="$1">
// //                 {msg.action.action?.toUpperCase().replace(/_/g, ' ') || 'EXECUTE ACTION'}
// //               </Text>
// //               <Text color="$gray11" fontSize={12} mb="$4">
// //                 {msg.action.reasoning || "Ready to execute this action in your financial system."}
// //               </Text>
              
// //               {msg.action.data && (
// //                 <DataTable data={msg.action.data} title="ACTION DETAILS" />
// //               )}
              
// //               <XStack space="$3" mt="$3">
// //                 <Button 
// //                   f={1} 
// //                   bg="#EAB308" 
// //                   color="black" 
// //                   fontWeight="900"
// //                   icon={Check}
// //                   onPress={() => executeAiAction(msg.action, msg.id)}
// //                 >
// //                   Execute
// //                 </Button>
// //                 <Button 
// //                   f={1} 
// //                   chromeless 
// //                   bc="#333" 
// //                   bw={1}
// //                   icon={X}
// //                   onPress={() => setMessages(prev => prev.map(m => 
// //                     m.id === msg.id ? { ...m, protocolStatus: 'declined' } : m
// //                   ))}
// //                 >
// //                   Dismiss
// //                 </Button>
// //               </XStack>
// //             </Card>
// //           </YStack>
// //         )}
        
// //         {/* Status indicators */}
// //         {msg.protocolStatus === 'executed' && (
// //           <XStack ai="center" space="$2" mt="$2" ml="$2">
// //             <Circle size={16} bg="#10B981">
// //               <Check size={10} color="white" />
// //             </Circle>
// //             <Text color="#10B981" fontSize={12} fontWeight="600">
// //               Executed successfully
// //             </Text>
// //           </XStack>
// //         )}
        
// //         {msg.protocolStatus === 'declined' && (
// //           <XStack ai="center" space="$2" mt="$2" ml="$2">
// //             <Circle size={16} bg="#EF4444">
// //               <X size={10} color="white" />
// //             </Circle>
// //             <Text color="#EF4444" fontSize={12} fontWeight="600">
// //               Action declined
// //             </Text>
// //           </XStack>
// //         )}
// //       </YStack>
// //     );
// //   };

// //   return (
// //     <Theme name="dark">
// //       <LinearGradient colors={['#000', '#0A0A0A']} style={{ flex: 1 }}>
// //         <SafeAreaView style={{ flex: 1 }}>
          
// //           {/* HEADER */}
// //           <XStack p="$4" jc="space-between" ai="center" bbw={1} bc="rgba(255,255,255,0.05)">
// //             <TouchableOpacity onPress={() => router.back()}>
// //               <ChevronLeft size={24} color="white" />
// //             </TouchableOpacity>
            
// //             <XStack ai="center" space="$2">
// //               <Terminal size={18} color="#EAB308" />
// //               <Text color="white" fontWeight="900">FINANCIAL ADVISOR</Text>
// //             </XStack>
            
// //             <ShieldCheck size={20} color="#EAB308" />
// //           </XStack>

// //           {/* QUICK ACTIONS BAR */}
// //           {showQuickActions && (
// //             <YStack px="$4" pt="$3" pb="$2" bg="rgba(0,0,0,0.5)">
// //               <QuickActions onActionPress={handleQuickAction} />
// //             </YStack>
// //           )}

// //           {/* MESSAGES */}
// //           <ScrollView 
// //             ref={scrollViewRef} 
// //             contentContainerStyle={{ padding: 20, paddingBottom: 250 }}
// //             onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
// //           >
// //             {messages.map((msg) => (
// //               <YStack key={msg.id} mb="$4">
// //                 <XStack space="$3" fd={msg.role === 'user' ? 'row-reverse' : 'row'}>
// //                   <Circle size={30} bg={msg.role === 'user' ? '#333' : '#EAB308'}>
// //                     {msg.role === 'user' ? 
// //                       <User size={14} color="white" /> : 
// //                       <Cpu size={14} color="black" />
// //                     }
// //                   </Circle>
                  
// //                   <Card 
// //                     p="$3" 
// //                     br="$4" 
// //                     f={1} 
// //                     maxW="85%" 
// //                     bg={msg.role === 'user' ? '#070707' : '#0b0b0b'} 
// //                     bc={msg.role === 'user' ? '#1c1c1c' : 'rgba(234, 179, 8, 0.4)'} 
// //                     bw={1}
// //                   >
// //                     {renderMessageContent(msg)}
                    
// //                     {/* Timestamp */}
// //                     <XStack jc="flex-end" mt="$2">
// //                       <Text color="$gray10" fontSize={10}>
// //                         {new Date(msg.timestamp).toLocaleTimeString([], { 
// //                           hour: '2-digit', 
// //                           minute: '2-digit' 
// //                         })}
// //                       </Text>
// //                     </XStack>
// //                   </Card>
// //                 </XStack>
// //               </YStack>
// //             ))}
            
// //             {/* Loading indicator */}
// //             {loading && (
// //               <XStack space="$3" mb="$4">
// //                 <Circle size={30} bg="#EAB308">
// //                   <Cpu size={14} color="black" />
// //                 </Circle>
// //                 <Card p="$3" br="$4" f={1} maxW="85%" bg="#0b0b0b" bc="rgba(234, 179, 8, 0.4)" bw={1}>
// //                   <XStack ai="center" space="$2">
// //                     <Spinner size="small" color="#EAB308" />
// //                     <Text color="white" fontSize={14}>Analyzing your request...</Text>
// //                   </XStack>
// //                 </Card>
// //               </XStack>
// //             )}
// //           </ScrollView>

// //           {/* INPUT AREA */}
// //           <KeyboardAvoidingView 
// //             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //             keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
// //             style={{
// //               position: 'absolute',
// //               bottom: 0,
// //               left: 0,
// //               right: 0,
// //               backgroundColor: '#1a1a1aec',
// //               borderTopWidth: 1,
// //               borderTopColor: 'rgba(144, 108, 0, 0.73)',
// //               paddingTop: 12,
// //               paddingBottom: Platform.OS === 'ios' ? 30 : 120,
// //               paddingHorizontal: 16,
// //             }}
// //           >
// //             <LinearGradient
// //               colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)']}
// //               style={{
// //                 borderRadius: 15,
// //                 borderWidth: 1,
// //                 borderColor: 'rgba(255, 191, 0, 0.38)',
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //                 paddingHorizontal: 12,
// //                 paddingVertical: 4,
// //               }}
// //             >
// //               <Input 
// //                 ref={inputRef}
// //                 f={1}
// //                 placeholder="Ask about finances, create goals, or analyze spending..."
// //                 placeholderTextColor="rgba(255, 253, 253, 0.29)"
// //                 color="white"
// //                 bw={0}
// //                 bg="transparent"
// //                 fontSize={15}
// //                 value={inputText}
// //                 onChangeText={(text) => {
// //                   setInputText(text);
// //                   if (text.length > 0 && !showQuickActions) {
// //                     setShowQuickActions(false);
// //                   }
// //                 }}
// //                 onFocus={() => setShowQuickActions(false)}
// //                 multiline
// //                 maxLength={500}
// //                 numberOfLines={1}
// //                 style={{ minHeight: 50 }}
// //                 onSubmitEditing={() => handleSend()}
// //                 returnKeyType="send"
// //               />
              
// //               <TouchableOpacity 
// //                 onPress={() => handleSend()}
// //                 disabled={!inputText.trim() || loading}
// //                 style={{ opacity: !inputText.trim() || loading ? 0.5 : 1 }}
// //               >
// //                 <LinearGradient
// //                   colors={['#EAB308', '#D4AC0D']}
// //                   style={{
// //                     width: 42,
// //                     height: 42,
// //                     borderRadius: 21,
// //                     justifyContent: 'center',
// //                     alignItems: 'center',
// //                   }}
// //                 >
// //                   <Send size={25} color="black" />
// //                 </LinearGradient>
// //               </TouchableOpacity>
// //             </LinearGradient>
            
// //             {/* Input status indicator */}
// //             <XStack jc="space-between" ai="center" mt="$2" px="$2">
// //               <Text color="rgba(234, 178, 8, 0.71)" fontSize={10}>
// //                 {inputText.length > 0 ? 'Press return to send' : 'Ask about finances...'}
// //               </Text>
// //               <Text color="rgba(234, 178, 8, 0.71)" fontSize={10}>
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
//   Alert,
//   View,
//   StyleSheet 
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
//   Separator 
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
//   Check, 
//   X, 
//   Terminal, 
//   Target,
//   Plus,
//   Clock,
//   Calendar,
//   BarChart3,
//   TrendingDown,
//   ArrowUpRight,
//   ArrowDownRight,
//   Zap,
//   AlertCircle
// } from '@tamagui/lucide-icons';
// import { useRouter } from 'expo-router';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { ApiService } from '../../../services/apiService';

// // Table Component for structured data
// const DataTable = ({ data, title }) => {
//   if (!data || typeof data !== 'object') return null;

//   const renderValue = (value) => {
//     if (typeof value === 'number') {
//       return new Intl.NumberFormat('en-IN', {
//         style: 'currency',
//         currency: 'INR',
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0
//       }).format(value);
//     }
//     if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
//       return new Date(value).toLocaleDateString('en-IN', {
//         day: 'numeric',
//         month: 'short',
//         year: 'numeric'
//       });
//     }
//     return String(value);
//   };

//   const rows = Object.entries(data);

//   return (
//     <Card p="$4" bg="#111" bw={1} bc="rgba(234, 179, 8, 0.3)" br="$4" mt="$2">
//       {title && (
//         <XStack ai="center" space="$2" mb="$3">
//           <BarChart3 size={14} color="#EAB308" />
//           <Text color="#EAB308" fontWeight="900" fontSize={11} ls={1}>
//             {title.toUpperCase()}
//           </Text>
//         </XStack>
//       )}
      
//       {rows.map(([key, value], index) => (
//         <React.Fragment key={key}>
//           <XStack jc="space-between" ai="center" py="$2">
//             <XStack ai="center" space="$2" f={1}>
//               <Text color="$gray11" fontSize={12} fontWeight="600">
//                 {key.replace(/_/g, ' ').toUpperCase()}
//               </Text>
//             </XStack>
//             <Text 
//               color="white" 
//               fontSize={13} 
//               fontWeight="700"
//               numberOfLines={2}
//               ellipsizeMode="tail"
//               maxWidth="60%"
//             >
//               {renderValue(value)}
//             </Text>
//           </XStack>
//           {index < rows.length - 1 && (
//             <Separator bc="rgba(255,255,255,0.1)" />
//           )}
//         </React.Fragment>
//       ))}
//     </Card>
//   );
// };

// // Quick Actions Component - IMPROVED
// const QuickActions = ({ onActionPress }) => {
//   const actions = [
//     {
//       id: 'create_income',
//       title: 'Add Income',
//       icon: DollarSign,
//       color: '#10B981',
//       description: 'Record new income source'
//     },
//     {
//       id: 'create_budget',
//       title: 'Set Budget',
//       icon: PieChart,
//       color: '#8B5CF6',
//       description: 'Create spending limit'
//     },
//     {
//       id: 'create_goal',
//       title: 'New Goal',
//       icon: Target,
//       color: '#F59E0B',
//       description: 'Save for future'
//     },
//     {
//       id: 'analyze',
//       title: 'Analyze',
//       icon: TrendingUp,
//       color: '#3B82F6',
//       description: 'Review finances'
//     },
//     {
//       id: 'view_dashboard',
//       title: 'Dashboard',
//       icon: BarChart3,
//       color: '#EAB308',
//       description: 'View overview'
//     },
//     {
//       id: 'add_transaction',
//       title: 'Add Expense',
//       icon: TrendingDown,
//       color: '#EF4444',
//       description: 'Record spending'
//     }
//   ];

//   return (
//     <YStack mb="$3" mt="$2">
//       <XStack ai="center" space="$2" mb="$3" ml="$1">
//         <Zap size={14} color="#EAB308" />
//         <Text color="#EAB308" fontWeight="900" fontSize={11} ls={1}>
//           QUICK ACTIONS
//         </Text>
//       </XStack>
      
//       <ScrollView 
//         horizontal 
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 4, paddingRight: 16 }}
//       >
//         <XStack space="$3">
//           {actions.map((action) => {
//             const Icon = action.icon;
//             return (
//               <TouchableOpacity
//                 key={action.id}
//                 onPress={() => onActionPress(action.id)}
//                 activeOpacity={0.7}
//                 style={{
//                   shadowColor: action.color,
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.3,
//                   shadowRadius: 4,
//                   elevation: 3,
//                 }}
//               >
//                 <LinearGradient
//                   colors={[action.color + '20', action.color + '10']}
//                   style={{
//                     borderRadius: 12,
//                     padding: 12,
//                     width: 110,
//                     height: 90,
//                     borderWidth: 1,
//                     borderColor: action.color + '30',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Circle size={32} bg={action.color + '20'} mb="$1">
//                     <Icon size={16} color={action.color} />
//                   </Circle>
//                   <Text color="white" fontWeight="800" fontSize={11} textAlign="center" mt="$1">
//                     {action.title}
//                   </Text>
//                   <Text 
//                     color="$gray11" 
//                     fontSize={9} 
//                     textAlign="center"
//                     numberOfLines={1}
//                     mt="$0.5"
//                   >
//                     {action.description}
//                   </Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             );
//           })}
//         </XStack>
//       </ScrollView>
//     </YStack>
//   );
// };

// // Parsing function for AI response
// const parseAIResponse = (response) => {
//   try {
//     // Check if response is already JSON
//     if (typeof response === 'object') {
//       return {
//         text: response.message || response.response || '',
//         data: response.data || null,
//         action: response.action || null,
//         mode: response.mode || 'chat'
//       };
//     }
    
//     // Try to parse JSON from text response
//     const jsonMatch = response.match(/\{.*\}/s);
//     if (jsonMatch) {
//       const parsed = JSON.parse(jsonMatch[0]);
//       return {
//         text: parsed.message || parsed.response || response.replace(jsonMatch[0], '').trim(),
//         data: parsed.data || parsed,
//         action: parsed.action || null,
//         mode: parsed.mode || 'chat'
//       };
//     }
    
//     // Return as plain text
//     return {
//       text: response,
//       data: null,
//       action: null,
//       mode: 'chat'
//     };
//   } catch (error) {
//     // Return as plain text on parse error
//     return {
//       text: response,
//       data: null,
//       action: null,
//       mode: 'chat'
//     };
//   }
// };

// // Format text with proper spacing
// const formatTextResponse = (text) => {
//   if (!text) return '';
  
//   // Add bullet points for lists
//   const lines = text.split('\n').map(line => {
//     if (line.trim().startsWith('-') || line.trim().match(/^\d+\./)) {
//       return `• ${line.replace(/^[-•\d\.\s]+/, '')}`;
//     }
//     return line;
//   });
  
//   return lines.join('\n');
// };

// export default function ChatCommandBridge() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
//   const scrollViewRef = useRef(null);
//   const inputRef = useRef(null);

//   const [messages, setMessages] = useState([{
//     id: 'sys-1', 
//     role: 'ai', 
//     content: 'Hello! I\'m your financial advisor. How can I help with your finances today?',
//     timestamp: new Date().toISOString(),
//     data: null,
//     mode: 'chat'
//   }]);
  
//   const [inputText, setInputText] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showQuickActions, setShowQuickActions] = useState(true);

//   // Handle quick action selection
//   const handleQuickAction = (actionId) => {
//     const actionPrompts = {
//       create_income: 'Add a new income source to my finances',
//       create_budget: 'Create a budget for my monthly expenses',
//       create_goal: 'Set a financial goal to save for',
//       analyze: 'Analyze my current financial situation and give recommendations',
//       view_dashboard: 'Show me my financial dashboard summary',
//       add_transaction: 'Add a new expense transaction'
//     };
    
//     const prompt = actionPrompts[actionId];
//     if (prompt) {
//       setInputText(prompt);
//       inputRef.current?.focus();
//       // Don't hide quick actions immediately
//       setTimeout(() => {
//         setShowQuickActions(false);
//       }, 100);
//     }
//   };

//   // Execute AI action (matching your backend functions)
//   const executeAiAction = async (actionData, messageId) => {
//     setLoading(true);
//     try {
//       let endpoint = '';
//       let payload = {};

//       // Routing based on intent
//       switch (actionData.action) {
//         case 'create_income':
//           endpoint = '/income/';
//           payload = {
//             name: actionData.name || "New Income Source",
//             source_type: actionData.source_type || "salary",
//             rate_type: actionData.period || "MONTHLY",
//             estimated_monthly_amount: actionData.amount || actionData.limit_amount,
//             api_source_identifier: "ai_chat"
//           };
//           break;

//         case 'create_budget':
//           endpoint = '/budgets/';
//           payload = {
//             name: actionData.name,
//             limit_amount: actionData.limit_amount,
//             period: actionData.period || "monthly",
//             included_category_ids: [actionData.category_id || "general"],
//             alert_threshold: 80
//           };
//           break;

//         case 'create_transaction':
//           endpoint = '/transactions/';
//           payload = {
//             amount: actionData.amount,
//             currency: "INR",
//             occurred_at: actionData.occurred_at || new Date().toISOString(),
//             category_id: actionData.category_id || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//             merchant_raw: actionData.merchant_raw || "Unknown Merchant",
//             description: actionData.description || "Added via AI Chat",
//             source: "manual"
//           };
//           break;

//         case 'create_goal':
//           endpoint = '/goals/';
//           payload = {
//             name: actionData.name,
//             target_amount: actionData.target_amount,
//             target_date: actionData.target_date || new Date().toISOString().split('T')[0]
//           };
//           break;
//       }

//       // Execute to backend
//       await ApiService.post(endpoint, payload);

//       // UI success state
//       setMessages(prev => prev.map(m => m.id === messageId ? { ...m, protocolStatus: 'executed' } : m));
      
//       // Add success message
//       const successMsg = {
//         id: `success-${Date.now()}`,
//         role: 'ai',
//         content: `✅ Success! I have created the ${actionData.action.replace(/_/g, ' ')} in your financial system.`,
//         timestamp: new Date().toISOString(),
//         data: null,
//         mode: 'chat'
//       };
      
//       setMessages(prev => [...prev, successMsg]);

//     } catch (error) {
//       console.error("Execution Error:", error.response?.data);
      
//       const errorMsg = {
//         id: `error-${Date.now()}`,
//         role: 'ai',
//         content: `❌ Failed to execute. ${error.response?.data?.detail || 'Please try again with more details.'}`,
//         timestamp: new Date().toISOString(),
//         data: null,
//         mode: 'chat'
//       };
      
//       setMessages(prev => [...prev, errorMsg]);
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSend = async (manualText) => {
//     const text = typeof manualText === 'string' ? manualText : inputText;
//     if (!text.trim() || loading) return;

//     // Add user message
//     const userMsg = { 
//       id: `u-${Date.now()}`, 
//       role: 'user', 
//       content: text, 
//       timestamp: new Date().toISOString(),
//       data: null,
//       mode: 'chat'
//     };
    
//     setMessages(prev => [...prev, userMsg]);
//     setInputText('');
//     setLoading(true);
//     // Hide quick actions when sending
//     setShowQuickActions(false);

//     try {
//       // POST to /api/v1/chat/
//       const res = await ApiService.post('/chat/', { 
//         message: text, 
//         session_id: "finni_bridge" 
//       });

//       // Parse the response
//       const parsedResponse = parseAIResponse(res.data);
      
//       const aiResponse = {
//         id: `ai-${Date.now()}`,
//         role: 'ai',
//         content: parsedResponse.text,
//         timestamp: new Date().toISOString(),
//         data: parsedResponse.data,
//         action: parsedResponse.action,
//         mode: parsedResponse.mode
//       };

//       setMessages(prev => [...prev, aiResponse]);
      
//       // Show quick actions again after response (if input is empty)
//       if (!inputText.trim()) {
//         setShowQuickActions(true);
//       }
      
//     } catch (error) {
//       console.error("API Error:", error);
      
//       const errorMsg = {
//         id: `err-${Date.now()}`,
//         role: 'ai',
//         content: '⚠️ Connection issue. Please check your network and try again.',
//         timestamp: new Date().toISOString(),
//         data: null,
//         mode: 'chat'
//       };
      
//       setMessages(prev => [...prev, errorMsg]);
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show quick actions when input is cleared
//   useEffect(() => {
//     if (!inputText.trim() && messages.length > 1) {
//       setShowQuickActions(true);
//     }
//   }, [inputText]);

//   // Render message content based on type
//   const renderMessageContent = (msg) => {
//     const formattedText = formatTextResponse(msg.content);
    
//     return (
//       <YStack>
//         {/* Text content */}
//         {formattedText && (
//           <Text color="white" fontSize={14} lineHeight={20}>
//             {formattedText}
//           </Text>
//         )}
        
//         {/* Data table if available */}
//         {msg.data && msg.mode === 'planning' && (
//           <YStack mt="$3">
//             <DataTable 
//               data={msg.data.calculation || msg.data} 
//               title={msg.data.goal?.name || "Financial Plan"}
//             />
            
//             {msg.data.recommended_budgets && (
//               <DataTable 
//                 data={msg.data.recommended_budgets.reduce((acc, budget, idx) => ({
//                   ...acc,
//                   [budget.name]: `₹${budget.limit_amount?.toLocaleString() || '0'}`
//                 }), {})}
//                 title="Recommended Budgets"
//               />
//             )}
            
//             {msg.data.risks && Array.isArray(msg.data.risks) && (
//               <Card p="$3" bg="#111" bw={1} bc="rgba(239, 68, 68, 0.3)" br="$4" mt="$2">
//                 <XStack ai="center" space="$2" mb="$2">
//                   <AlertCircle size={12} color="#EF4444" />
//                   <Text color="#EF4444" fontWeight="900" fontSize={10}>
//                     RISKS TO CONSIDER
//                   </Text>
//                 </XStack>
//                 {msg.data.risks.map((risk, idx) => (
//                   <XStack key={idx} ai="flex-start" space="$2" mb="$1">
//                     <Text color="#EF4444" fontSize={12}>•</Text>
//                     <Text color="$gray11" fontSize={12} flex={1}>
//                       {risk}
//                     </Text>
//                   </XStack>
//                 ))}
//               </Card>
//             )}
//           </YStack>
//         )}
        
//         {/* Action buttons for executable actions */}
//         {msg.action && msg.action.action !== 'none' && !msg.protocolStatus && (
//           <YStack mt="$3">
//             <Card p="$4" bg="#111" bw={1} bc="#EAB308" br="$4">
//               <XStack ai="center" space="$2" mb="$2">
//                 <Sparkles size={14} color="#EAB308" />
//                 <Text color="#EAB308" fontWeight="900" fontSize={10} ls={2}>
//                   ACTION DETECTED
//                 </Text>
//               </XStack>
//               <Text color="white" fontWeight="800" fontSize={16} mb="$1">
//                 {msg.action.action?.toUpperCase().replace(/_/g, ' ') || 'EXECUTE ACTION'}
//               </Text>
//               <Text color="$gray11" fontSize={12} mb="$4">
//                 {msg.action.reasoning || "Ready to execute this action in your financial system."}
//               </Text>
              
//               {msg.action.data && (
//                 <DataTable data={msg.action.data} title="ACTION DETAILS" />
//               )}
              
//               <XStack space="$3" mt="$3">
//                 <Button 
//                   f={1} 
//                   bg="#EAB308" 
//                   color="black" 
//                   fontWeight="900"
//                   icon={Check}
//                   onPress={() => executeAiAction(msg.action, msg.id)}
//                 >
//                   Execute
//                 </Button>
//                 <Button 
//                   f={1} 
//                   chromeless 
//                   bc="#333" 
//                   bw={1}
//                   icon={X}
//                   onPress={() => setMessages(prev => prev.map(m => 
//                     m.id === msg.id ? { ...m, protocolStatus: 'declined' } : m
//                   ))}
//                 >
//                   Dismiss
//                 </Button>
//               </XStack>
//             </Card>
//           </YStack>
//         )}
        
//         {/* Status indicators */}
//         {msg.protocolStatus === 'executed' && (
//           <XStack ai="center" space="$2" mt="$2" ml="$2">
//             <Circle size={16} bg="#10B981">
//               <Check size={10} color="white" />
//             </Circle>
//             <Text color="#10B981" fontSize={12} fontWeight="600">
//               Executed successfully
//             </Text>
//           </XStack>
//         )}
        
//         {msg.protocolStatus === 'declined' && (
//           <XStack ai="center" space="$2" mt="$2" ml="$2">
//             <Circle size={16} bg="#EF4444">
//               <X size={10} color="white" />
//             </Circle>
//             <Text color="#EF4444" fontSize={12} fontWeight="600">
//               Action declined
//             </Text>
//           </XStack>
//         )}
//       </YStack>
//     );
//   };

//   return (
//     <Theme name="dark">
//       <LinearGradient colors={['#000', '#0A0A0A']} style={{ flex: 1 }}>
//         <SafeAreaView style={{ flex: 1 }}>
          
//           {/* HEADER */}
//           <XStack p="$4" jc="space-between" ai="center" bbw={1} bc="rgba(255,255,255,0.05)">
//             <TouchableOpacity onPress={() => router.back()}>
//               <ChevronLeft size={24} color="white" />
//             </TouchableOpacity>
            
//             <XStack ai="center" space="$2">
//               <Terminal size={18} color="#EAB308" />
//               <Text color="white" fontWeight="900">FINANCIAL ADVISOR</Text>
//             </XStack>
            
//             <ShieldCheck size={20} color="#EAB308" />
//           </XStack>

//           {/* MESSAGES AREA - FIXED HEIGHT WITH SCROLL */}
//           <View style={{ flex: 1 }}>
//             {/* QUICK ACTIONS BAR - Always visible when showQuickActions is true */}
//             {showQuickActions && (
//               <YStack 
//                 px="$4" 
//                 pt="$3" 
//                 pb="$2" 
//                 bg="rgba(0,0,0,0.7)"
//                 borderBottomWidth={1}
//                 borderBottomColor="rgba(234, 179, 8, 0.1)"
//               >
//                 <QuickActions onActionPress={handleQuickAction} />
//               </YStack>
//             )}
            
//             <ScrollView 
//               ref={scrollViewRef} 
//               contentContainerStyle={{ 
//                 padding: 20, 
//                 paddingBottom: showQuickActions ? 180 : 250 
//               }}
//               onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
//               showsVerticalScrollIndicator={false}
//             >
//               {messages.map((msg) => (
//                 <YStack key={msg.id} mb="$4">
//                   <XStack space="$3" fd={msg.role === 'user' ? 'row-reverse' : 'row'}>
//                     <Circle size={30} bg={msg.role === 'user' ? '#333' : '#EAB308'}>
//                       {msg.role === 'user' ? 
//                         <User size={14} color="white" /> : 
//                         <Cpu size={14} color="black" />
//                       }
//                     </Circle>
                    
//                     <Card 
//                       p="$3" 
//                       br="$4" 
//                       f={1} 
//                       maxW="85%" 
//                       bg={msg.role === 'user' ? '#070707' : '#0b0b0b'} 
//                       bc={msg.role === 'user' ? '#1c1c1c' : 'rgba(234, 179, 8, 0.4)'} 
//                       bw={1}
//                     >
//                       {renderMessageContent(msg)}
                      
//                       {/* Timestamp */}
//                       <XStack jc="flex-end" mt="$2">
//                         <Text color="$gray10" fontSize={10}>
//                           {new Date(msg.timestamp).toLocaleTimeString([], { 
//                             hour: '2-digit', 
//                             minute: '2-digit' 
//                           })}
//                         </Text>
//                       </XStack>
//                     </Card>
//                   </XStack>
//                 </YStack>
//               ))}
              
//               {/* Loading indicator */}
//               {loading && (
//                 <XStack space="$3" mb="$4">
//                   <Circle size={30} bg="#EAB308">
//                     <Cpu size={14} color="black" />
//                   </Circle>
//                   <Card p="$3" br="$4" f={1} maxW="85%" bg="#0b0b0b" bc="rgba(234, 179, 8, 0.4)" bw={1}>
//                     <XStack ai="center" space="$2">
//                       <Spinner size="small" color="#EAB308" />
//                       <Text color="white" fontSize={14}>Analyzing your request...</Text>
//                     </XStack>
//                   </Card>
//                 </XStack>
//               )}
//             </ScrollView>
//           </View>

//           {/* FIXED INPUT AREA - Positioned correctly */}
//           <KeyboardAvoidingView 
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             keyboardVerticalOffset={Platform.OS === 'ios' ? (showQuickActions ? 160 : 90) : (showQuickActions ? 180 : 120)}
//             style={{
//               position: 'absolute',
//               bottom: 0,
//               left: 0,
//               right: 0,
//               backgroundColor: '#1a1a1aec',
//               borderTopWidth: 1,
//               borderTopColor: 'rgba(144, 108, 0, 0.73)',
//               paddingTop: 12,
//               paddingBottom: Platform.OS === 'ios' ? (showQuickActions ? 100 : 30) : (showQuickActions ? 140 : 120),
//               paddingHorizontal: 16,
//             }}
//           >
//             <LinearGradient
//               colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)']}
//               style={{
//                 borderRadius: 15,
//                 borderWidth: 1,
//                 borderColor: 'rgba(255, 191, 0, 0.38)',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 paddingHorizontal: 12,
//                 paddingVertical: 4,
//               }}
//             >
//               <Input 
//                 ref={inputRef}
//                 f={1}
//                 placeholder="Ask about finances, create goals, or analyze spending..."
//                 placeholderTextColor="rgba(255, 253, 253, 0.29)"
//                 color="white"
//                 bw={0}
//                 bg="transparent"
//                 fontSize={15}
//                 value={inputText}
//                 onChangeText={(text) => {
//                   setInputText(text);
//                   // Show quick actions only when input is empty
//                   setShowQuickActions(text.length === 0);
//                 }}
//                 onFocus={() => {
//                   // Hide quick actions when focusing on input
//                   setShowQuickActions(false);
//                 }}
//                 multiline
//                 maxLength={500}
//                 numberOfLines={1}
//                 style={{ minHeight: 50 }}
//                 onSubmitEditing={() => handleSend()}
//                 returnKeyType="send"
//               />
              
//               <TouchableOpacity 
//                 onPress={() => handleSend()}
//                 disabled={!inputText.trim() || loading}
//                 style={{ 
//                   opacity: !inputText.trim() || loading ? 0.5 : 1,
//                   marginLeft: 8
//                 }}
//               >
//                 <LinearGradient
//                   colors={['#EAB308', '#D4AC0D']}
//                   style={{
//                     width: 44,
//                     height: 44,
//                     borderRadius: 22,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     shadowColor: '#EAB308',
//                     shadowOffset: { width: 0, height: 2 },
//                     shadowOpacity: 0.5,
//                     shadowRadius: 4,
//                     elevation: 4,
//                   }}
//                 >
//                   <Send size={22} color="black" />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </LinearGradient>
            
//             {/* Input status indicator */}
//             <XStack jc="space-between" ai="center" mt="$2" px="$2">
//               <Text color="rgba(234, 178, 8, 0.71)" fontSize={10}>
//                 {inputText.length > 0 ? 'Press return to send' : 'Type or tap quick actions...'}
//               </Text>
//               <Text color="rgba(234, 178, 8, 0.71)" fontSize={10}>
//                 {inputText.length}/500
//               </Text>
//             </XStack>
//           </KeyboardAvoidingView>
//         </SafeAreaView>
//       </LinearGradient>
//     </Theme>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  TouchableOpacity,
  View 
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
  Separator 
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
  PieChart, 
  Target,
  BarChart3,
  TrendingDown,
  Zap,
  AlertCircle
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiService } from '../../../services/apiService';

// Table Component for structured data
const DataTable = ({ data, title }) => {
  if (!data || typeof data !== 'object') return null;

  const renderValue = (value) => {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }
    if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return new Date(value).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
    return String(value);
  };

  const rows = Object.entries(data);

  return (
    <Card p="$4" bg="#111" bw={1} bc="rgba(234, 179, 8, 0.3)" br="$4" mt="$2">
      {title && (
        <XStack ai="center" space="$2" mb="$3">
          <BarChart3 size={14} color="#EAB308" />
          <Text color="#EAB308" fontWeight="900" fontSize={11} ls={1}>
            {title.toUpperCase()}
          </Text>
        </XStack>
      )}
      
      {rows.map(([key, value], index) => (
        <React.Fragment key={key}>
          <XStack jc="space-between" ai="center" py="$2">
            <XStack ai="center" space="$2" f={1}>
              <Text color="$gray11" fontSize={12} fontWeight="600">
                {key.replace(/_/g, ' ').toUpperCase()}
              </Text>
            </XStack>
            <Text 
              color="white" 
              fontSize={13} 
              fontWeight="700"
              numberOfLines={2}
              ellipsizeMode="tail"
              maxWidth="60%"
            >
              {renderValue(value)}
            </Text>
          </XStack>
          {index < rows.length - 1 && (
            <Separator bc="rgba(255,255,255,0.1)" />
          )}
        </React.Fragment>
      ))}
    </Card>
  );
};

// Quick Actions Component
const QuickActions = ({ onActionPress }) => {
  const actions = [
    {
      id: 'create_income',
      title: 'Add Income',
      icon: DollarSign,
      color: '#10B981',
      description: 'Record new income source'
    },
    {
      id: 'create_budget',
      title: 'Set Budget',
      icon: PieChart,
      color: '#8B5CF6',
      description: 'Create spending limit'
    },
    {
      id: 'create_goal',
      title: 'New Goal',
      icon: Target,
      color: '#F59E0B',
      description: 'Save for future'
    },
    {
      id: 'analyze',
      title: 'Analyze',
      icon: TrendingUp,
      color: '#3B82F6',
      description: 'Review finances'
    },
    {
      id: 'view_dashboard',
      title: 'Dashboard',
      icon: BarChart3,
      color: '#EAB308',
      description: 'View overview'
    },
    {
      id: 'add_transaction',
      title: 'Add Expense',
      icon: TrendingDown,
      color: '#EF4444',
      description: 'Record spending'
    }
  ];

  return (
    <YStack mb="$3" mt="$2">
      <XStack ai="center" space="$2" mb="$3" ml="$1">
        <Zap size={14} color="#EAB308" />
        <Text color="#EAB308" fontWeight="900" fontSize={11} ls={1}>
          QUICK ACTIONS
        </Text>
      </XStack>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4, paddingRight: 16 }}
      >
        <XStack space="$3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                onPress={() => onActionPress(action.id)}
                activeOpacity={0.7}
                style={{
                  shadowColor: action.color,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <LinearGradient
                  colors={[action.color + '20', action.color + '10']}
                  style={{
                    borderRadius: 12,
                    padding: 12,
                    width: 110,
                    height: 90,
                    borderWidth: 1,
                    borderColor: action.color + '30',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Circle size={32} bg={action.color + '20'} mb="$1">
                    <Icon size={16} color={action.color} />
                  </Circle>
                  <Text color="white" fontWeight="800" fontSize={11} textAlign="center" mt="$1">
                    {action.title}
                  </Text>
                  <Text 
                    color="$gray11" 
                    fontSize={9} 
                    textAlign="center"
                    numberOfLines={1}
                    mt="$0.5"
                  >
                    {action.description}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </XStack>
      </ScrollView>
    </YStack>
  );
};

// Parsing function for AI response
const parseAIResponse = (response) => {
  try {
    // Check if response is already JSON
    if (typeof response === 'object') {
      return {
        text: response.message || response.response || '',
        data: response.data || null,
        mode: response.mode || 'chat'
      };
    }
    
    // Try to parse JSON from text response
    const jsonMatch = response.match(/\{.*\}/s);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        text: parsed.message || parsed.response || response.replace(jsonMatch[0], '').trim(),
        data: parsed.data || parsed,
        mode: parsed.mode || 'chat'
      };
    }
    
    // Return as plain text
    return {
      text: response,
      data: null,
      mode: 'chat'
    };
  } catch (error) {
    // Return as plain text on parse error
    return {
      text: response,
      data: null,
      mode: 'chat'
    };
  }
};

// Format text with proper spacing
const formatTextResponse = (text) => {
  if (!text) return '';
  
  // Add bullet points for lists
  const lines = text.split('\n').map(line => {
    if (line.trim().startsWith('-') || line.trim().match(/^\d+\./)) {
      return `• ${line.replace(/^[-•\d\.\s]+/, '')}`;
    }
    return line;
  });
  
  return lines.join('\n');
};

export default function ChatCommandBridge() {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([{
    id: 'sys-1', 
    role: 'ai', 
    content: 'Hello! I\'m your financial advisor. How can I help with your finances today?',
    timestamp: new Date().toISOString(),
    data: null,
    mode: 'chat'
  }]);
  
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [inputHeight, setInputHeight] = useState(50);

  // Handle quick action selection
  const handleQuickAction = (actionId) => {
    const actionPrompts = {
      create_income: 'Add a new income source to my finances',
      create_budget: 'Create a budget for my monthly expenses',
      create_goal: 'Set a financial goal to save for',
      analyze: 'Analyze my current financial situation and give recommendations',
      view_dashboard: 'Show me my financial dashboard summary',
      add_transaction: 'Add a new expense transaction'
    };
    
    const prompt = actionPrompts[actionId];
    if (prompt) {
      setInputText(prompt);
      inputRef.current?.focus();
      setTimeout(() => {
        setShowQuickActions(false);
      }, 100);
    }
  };

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || loading) return;

    // Add user message
    const userMsg = { 
      id: `u-${Date.now()}`, 
      role: 'user', 
      content: text, 
      timestamp: new Date().toISOString(),
      data: null,
      mode: 'chat'
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setInputHeight(50); // Reset input height
    setLoading(true);
    setShowQuickActions(false);

    try {
      // POST to /api/v1/chat/ (your existing endpoint)
      const res = await ApiService.post('/chat/', { 
        message: text, 
        session_id: "finni_bridge" 
      });

      // Parse the response
      const parsedResponse = parseAIResponse(res.data);
      
      const aiResponse = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: parsedResponse.text,
        timestamp: new Date().toISOString(),
        data: parsedResponse.data,
        mode: parsedResponse.mode
      };

      setMessages(prev => [...prev, aiResponse]);
      
      // Show quick actions again after response (if input is empty)
      if (!inputText.trim()) {
        setShowQuickActions(true);
      }
      
    } catch (error) {
      console.error("API Error:", error);
      
      const errorMsg = {
        id: `err-${Date.now()}`,
        role: 'ai',
        content: '⚠️ Connection issue. Please check your network and try again.',
        timestamp: new Date().toISOString(),
        data: null,
        mode: 'chat'
      };
      
      setMessages(prev => [...prev, errorMsg]);
      
    } finally {
      setLoading(false);
    }
  };

  // Show quick actions when input is cleared
  useEffect(() => {
    if (!inputText.trim() && messages.length > 1) {
      setShowQuickActions(true);
    }
  }, [inputText]);

  // Render message content based on type
  const renderMessageContent = (msg) => {
    const formattedText = formatTextResponse(msg.content);
    
    return (
      <YStack>
        {/* Text content */}
        {formattedText && (
          <Text color="white" fontSize={14} lineHeight={20}>
            {formattedText}
          </Text>
        )}
        
        {/* Data table if available */}
        {msg.data && msg.mode === 'planning' && (
          <YStack mt="$3">
            <DataTable 
              data={msg.data.calculation || msg.data} 
              title={msg.data.goal?.name || "Financial Plan"}
            />
            
            {msg.data.recommended_budgets && (
              <DataTable 
                data={msg.data.recommended_budgets.reduce((acc, budget, idx) => ({
                  ...acc,
                  [budget.name]: `₹${budget.limit_amount?.toLocaleString() || '0'}`
                }), {})}
                title="Recommended Budgets"
              />
            )}
            
            {msg.data.risks && Array.isArray(msg.data.risks) && (
              <Card p="$3" bg="#111" bw={1} bc="rgba(239, 68, 68, 0.3)" br="$4" mt="$2">
                <XStack ai="center" space="$2" mb="$2">
                  <AlertCircle size={12} color="#EF4444" />
                  <Text color="#EF4444" fontWeight="900" fontSize={10}>
                    RISKS TO CONSIDER
                  </Text>
                </XStack>
                {msg.data.risks.map((risk, idx) => (
                  <XStack key={idx} ai="flex-start" space="$2" mb="$1">
                    <Text color="#EF4444" fontSize={12}>•</Text>
                    <Text color="$gray11" fontSize={12} flex={1}>
                      {risk}
                    </Text>
                  </XStack>
                ))}
              </Card>
            )}
          </YStack>
        )}
      </YStack>
    );
  };

  return (
    <Theme name="dark">
      <LinearGradient colors={['#000', '#0A0A0A']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          
          {/* HEADER */}
          <XStack p="$4" jc="space-between" ai="center" bbw={1} bc="rgba(255,255,255,0.05)">
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            
            <XStack ai="center" space="$2">
              <Sparkles size={18} color="#EAB308" />
              <Text color="white" fontWeight="900">FINANCIAL ADVISOR</Text>
            </XStack>
            
            <ShieldCheck size={20} color="#EAB308" />
          </XStack>

          {/* MESSAGES AREA */}
          <View style={{ flex: 1 }}>
            {/* QUICK ACTIONS BAR */}
            {showQuickActions && (
              <YStack 
                px="$4" 
                pt="$3" 
                pb="$2" 
                bg="rgba(0,0,0,0.7)"
                borderBottomWidth={1}
                borderBottomColor="rgba(234, 179, 8, 0.1)"
              >
                <QuickActions onActionPress={handleQuickAction} />
              </YStack>
            )}
            
            <ScrollView 
              ref={scrollViewRef} 
              contentContainerStyle={{ 
                padding: 20, 
                paddingBottom: 180 
              }}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
              showsVerticalScrollIndicator={false}
            >
              {messages.map((msg) => (
                <YStack key={msg.id} mb="$4">
                  <XStack space="$3" fd={msg.role === 'user' ? 'row-reverse' : 'row'}>
                    <Circle size={30} bg={msg.role === 'user' ? '#333' : '#EAB308'}>
                      {msg.role === 'user' ? 
                        <User size={14} color="white" /> : 
                        <Cpu size={14} color="black" />
                      }
                    </Circle>
                    
                    <Card 
                      p="$3" 
                      br="$4" 
                      f={1} 
                      maxW="85%" 
                      bg={msg.role === 'user' ? '#070707' : '#0b0b0b'} 
                      bc={msg.role === 'user' ? '#1c1c1c' : 'rgba(234, 179, 8, 0.4)'} 
                      bw={1}
                    >
                      {renderMessageContent(msg)}
                      
                      {/* Timestamp */}
                      <XStack jc="flex-end" mt="$2">
                        <Text color="$gray10" fontSize={10}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </Text>
                      </XStack>
                    </Card>
                  </XStack>
                </YStack>
              ))}
              
              {/* Loading indicator */}
              {loading && (
                <XStack space="$3" mb="$4">
                  <Circle size={30} bg="#EAB308">
                    <Cpu size={14} color="black" />
                  </Circle>
                  <Card p="$3" br="$4" f={1} maxW="85%" bg="#0b0b0b" bc="rgba(234, 179, 8, 0.4)" bw={1}>
                    <XStack ai="center" space="$2">
                      <Spinner size="small" color="#EAB308" />
                      <Text color="white" fontSize={14}>Analyzing your request...</Text>
                    </XStack>
                  </Card>
                </XStack>
              )}
            </ScrollView>
          </View>

          {/* DYNAMIC INPUT AREA */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? (showQuickActions ? 160 : 90) : (showQuickActions ? 180 : 120)}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#1a1a1aec',
              borderTopWidth: 1,
              borderTopColor: 'rgba(144, 108, 0, 0.73)',
              paddingTop: 12,
              paddingBottom: Platform.OS === 'ios' ? (showQuickActions ? 100 : 30) : (showQuickActions ? 140 : 120),
              paddingHorizontal: 16,
            }}
          >
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)']}
              style={{
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'rgba(255, 191, 0, 0.38)',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
                minHeight: 50,
              }}
            >
              <Input 
                ref={inputRef}
                f={1}
                placeholder="Ask about finances, create goals, or analyze spending..."
                placeholderTextColor="rgba(255, 253, 253, 0.29)"
                color="white"
                bw={0}
                bg="transparent"
                fontSize={15}
                value={inputText}
                onChangeText={(text) => {
                  setInputText(text);
                  setShowQuickActions(text.length === 0);
                }}
                onContentSizeChange={(e) => {
                  // Dynamic height adjustment
                  const newHeight = Math.min(Math.max(50, e.nativeEvent.contentSize.height + 20), 150);
                  setInputHeight(newHeight);
                }}
                onFocus={() => {
                  setShowQuickActions(false);
                }}
                multiline
                maxLength={500}
                style={{ 
                  minHeight: 50,
                  height: inputHeight,
                  maxHeight: 150,
                  textAlignVertical: 'center',
                  paddingVertical: 10,
                }}
                onSubmitEditing={() => handleSend()}
                returnKeyType="send"
              />
              
              <TouchableOpacity 
                onPress={() => handleSend()}
                disabled={!inputText.trim() || loading}
                style={{ 
                  opacity: !inputText.trim() || loading ? 0.5 : 1,
                  marginLeft: 8
                }}
              >
                <LinearGradient
                  colors={['#EAB308', '#D4AC0D']}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#EAB308',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 4,
                  }}
                >
                  <Send size={22} color="black" />
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
            
            {/* Input status indicator */}
            <XStack jc="space-between" ai="center" mt="$2" px="$2">
              <Text color="rgba(234, 178, 8, 0.71)" fontSize={10}>
                {inputText.length > 0 ? 'Press return to send' : 'Type or tap quick actions...'}
              </Text>
              <Text color="rgba(234, 178, 8, 0.71)" fontSize={10}>
                {inputText.length}/500
              </Text>
            </XStack>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </Theme>
  );
}
