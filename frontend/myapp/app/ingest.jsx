// // // app/ingest.jsx
// // import React, { useState, useEffect, useCallback } from 'react';
// // import {
// //   ScrollView,
// //   TouchableOpacity,
// //   Alert,
// //   View,
// //   Platform,
// //   Linking,
// //   PermissionsAndroid
// // } from 'react-native';
// // import {
// //   YStack,
// //   XStack,
// //   Text,
// //   H2,
// //   H4,
// //   Theme,
// //   Spinner,
// //   Card,
// //   Progress,
// //   Button
// // } from 'tamagui';
// // import {
// //   ArrowLeft,
// //   Camera,
// //   FileText,
// //   MessageSquare,
// //   Upload,
// //   CheckCircle,
// //   AlertTriangle,
// //   Clock,
// //   Database,
// //   Bell,
// //   Wallet,
// //   RefreshCw,
// //   Smartphone,
// //   Shield,
// //   Zap
// // } from '@tamagui/lucide-icons';
// // import { useRouter, useFocusEffect } from 'expo-router';
// // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // import * as ImagePicker from 'expo-image-picker';
// // import * as DocumentPicker from 'expo-document-picker';
// // import * as SMS from 'expo-sms';

// // // Services
// // import { ApiService } from '../services/apiService';

// // export default function Ingest() {
// //   const router = useRouter();
// //   const insets = useSafeAreaInsets();
  
// //   // State
// //   const [loading, setLoading] = useState(false);
// //   const [processing, setProcessing] = useState(false);
// //   const [ingestStats, setIngestStats] = useState({
// //     total: 0,
// //     processed: 0,
// //     pending: 0,
// //     lastUpdated: null
// //   });
  
// //   // Ingest sources
// //   const ingestSources = [
// //     {
// //       id: 'sms',
// //       name: 'SMS Ingest',
// //       description: 'Automatically read bank SMS',
// //       icon: <MessageSquare size={24} color="#3B82F6" />,
// //       color: '#3B82F6',
// //       enabled: true,
// //       endpoint: '/ingest/sms',
// //       requiresPermission: true
// //     },
// //     {
// //       id: 'ocr',
// //       name: 'Receipt Scan',
// //       description: 'Scan receipts using camera',
// //       icon: <Camera size={24} color="#8B5CF6" />,
// //       color: '#8B5CF6',
// //       enabled: true,
// //       endpoint: '/ingest/ocr',
// //       requiresPermission: true
// //     },
// //     {
// //       id: 'csv',
// //       name: 'CSV Import',
// //       description: 'Upload bank statement CSV',
// //       icon: <FileText size={24} color="#22C55E" />,
// //       color: '#22C55E',
// //       enabled: true,
// //       endpoint: '/ingest/csv',
// //       requiresPermission: false
// //     },
// //     {
// //       id: 'notification',
// //       name: 'Notifications',
// //       description: 'Read UPI notifications',
// //       icon: <Bell size={24} color="#F59E0B" />,
// //       color: '#F59E0B',
// //       enabled: false,
// //       endpoint: '/ingest/notification',
// //       requiresPermission: true
// //     },
// //     {
// //       id: 'wallet',
// //       name: 'Wallet Apps',
// //       description: 'Connect payment apps',
// //       icon: <Wallet size={24} color="#06B6D4" />,
// //       color: '#06B6D4',
// //       enabled: false,
// //       endpoint: '/ingest/wallet',
// //       requiresPermission: false
// //     },
// //     {
// //       id: 'blockchain',
// //       name: 'Crypto Wallets',
// //       description: 'Blockchain transaction sync',
// //       icon: <Database size={24} color="#F97316" />,
// //       color: '#F97316',
// //       enabled: false,
// //       endpoint: '/ingest/blockchain',
// //       requiresPermission: false
// //     }
// //   ];

// //   // Fetch ingest stats
// //   const fetchIngestStats = useCallback(async () => {
// //     try {
// //       // You might have an endpoint for ingest stats
// //       // For now, using dummy data
// //       setIngestStats({
// //         total: 124,
// //         processed: 112,
// //         pending: 12,
// //         lastUpdated: new Date().toISOString()
// //       });
// //     } catch (error) {
// //       console.error('Fetch ingest stats error:', error);
// //     }
// //   }, []);

// //   useFocusEffect(
// //     useCallback(() => {
// //       fetchIngestStats();
// //     }, [fetchIngestStats])
// //   );

// //   // Request SMS permission (Android)
// //   const requestSMSPermission = async () => {
// //     if (Platform.OS === 'android') {
// //       try {
// //         const granted = await PermissionsAndroid.request(
// //           PermissionsAndroid.PERMISSIONS.READ_SMS,
// //           {
// //             title: 'SMS Permission',
// //             message: 'FINNI.AI needs access to your SMS to automatically read bank transactions',
// //             buttonNeutral: 'Ask Me Later',
// //             buttonNegative: 'Cancel',
// //             buttonPositive: 'OK',
// //           }
// //         );
// //         return granted === PermissionsAndroid.RESULTS.GRANTED;
// //       } catch (error) {
// //         console.error('SMS permission error:', error);
// //         return false;
// //       }
// //     }
// //     return true; // iOS handles this differently
// //   };

// //   // Request Camera permission
// //   const requestCameraPermission = async () => {
// //     const { status } = await ImagePicker.requestCameraPermissionsAsync();
// //     return status === 'granted';
// //   };

// //   // Handle SMS ingest
// //   const handleSMSIngest = async () => {
// //     try {
// //       setLoading(true);
      
// //       // Request permission
// //       const hasPermission = await requestSMSPermission();
// //       if (!hasPermission) {
// //         Alert.alert('Permission Required', 'Please grant SMS permission to automatically read bank transactions');
// //         setLoading(false);
// //         return;
// //       }

// //       Alert.alert(
// //         'SMS Ingest',
// //         'FINNI.AI will automatically read bank SMS in the background. You can also manually forward SMS to the app.',
// //         [
// //           { text: 'Cancel', style: 'cancel' },
// //           { 
// //             text: 'Enable', 
// //             onPress: async () => {
// //               try {
// //                 // For testing: simulate SMS ingest with sample data
// //                 const sampleSMS = "UPI: Rs 499 paid to ZOMATO*ORDER123. UPI Ref: 123456. Avl Bal: Rs 12,345.67";
                
// //                 const response = await ApiService.ingestEvent('sms', {
// //                   raw_text: sampleSMS,
// //                   sender: 'VK-BKICICI'
// //                 });
                
// //                 Alert.alert('Success', 'SMS ingestion enabled. Bank SMS will be automatically processed.');
// //                 fetchIngestStats();
// //               } catch (error) {
// //                 console.error('SMS ingest error:', error);
// //                 Alert.alert('Error', 'Failed to enable SMS ingestion');
// //               }
// //             }
// //           }
// //         ]
// //       );
      
// //     } catch (error) {
// //       console.error('SMS ingest error:', error);
// //       Alert.alert('Error', 'Failed to process SMS ingestion');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle OCR ingest (Receipt scan)
// //   const handleOCRIngest = async () => {
// //     try {
// //       setProcessing(true);
      
// //       // Request camera permission
// //       const hasPermission = await requestCameraPermission();
// //       if (!hasPermission) {
// //         Alert.alert('Permission Required', 'Please grant camera permission to scan receipts');
// //         setProcessing(false);
// //         return;
// //       }

// //       // Launch camera
// //       const result = await ImagePicker.launchCameraAsync({
// //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //         allowsEditing: true,
// //         quality: 0.8,
// //         base64: true,
// //       });

// //       if (!result.canceled && result.assets[0]) {
// //         const image = result.assets[0];
        
// //         // Create FormData for file upload
// //         const formData = new FormData();
// //         formData.append('file', {
// //           uri: image.uri,
// //           type: 'image/jpeg',
// //           name: 'receipt.jpg',
// //         });

// //         // Send to OCR endpoint
// //         const response = await ApiService.ingestOCR(formData);
        
// //         Alert.alert('Success', 'Receipt scanned and processed successfully');
// //         fetchIngestStats();
// //       }
      
// //     } catch (error) {
// //       console.error('OCR ingest error:', error);
// //       Alert.alert('Error', 'Failed to process receipt');
// //     } finally {
// //       setProcessing(false);
// //     }
// //   };

// //   // Handle CSV ingest
// //   const handleCSVIngest = async () => {
// //     try {
// //       setProcessing(true);
      
// //       // Launch document picker
// //       const result = await DocumentPicker.getDocumentAsync({
// //         type: 'text/csv',
// //         copyToCacheDirectory: true,
// //       });

// //       if (result.type === 'success') {
// //         Alert.alert(
// //           'CSV Import',
// //           `Import ${result.name}? This will process all transactions in the file.`,
// //           [
// //             { text: 'Cancel', style: 'cancel' },
// //             { 
// //               text: 'Import', 
// //               onPress: async () => {
// //                 try {
// //                   // For testing: simulate CSV upload
// //                   const sampleCSV = "Date,Description,Amount\n2024-01-15,ZOMATO ORDER,499.00\n2024-01-16,UBER RIDE,350.00";
                  
// //                   const response = await ApiService.ingestEvent('csv', {
// //                     raw_text: sampleCSV,
// //                     sender: 'bank_export'
// //                   });
                  
// //                   Alert.alert('Success', 'CSV file imported successfully. Transactions are being processed.');
// //                   fetchIngestStats();
// //                 } catch (error) {
// //                   console.error('CSV ingest error:', error);
// //                   Alert.alert('Error', 'Failed to import CSV file');
// //                 }
// //               }
// //             }
// //           ]
// //         );
// //       }
      
// //     } catch (error) {
// //       console.error('CSV ingest error:', error);
// //       Alert.alert('Error', 'Failed to import CSV file');
// //     } finally {
// //       setProcessing(false);
// //     }
// //   };

// //   // Handle source ingest
// //   const handleSourceIngest = async (source) => {
// //     switch (source.id) {
// //       case 'sms':
// //         await handleSMSIngest();
// //         break;
// //       case 'ocr':
// //         await handleOCRIngest();
// //         break;
// //       case 'csv':
// //         await handleCSVIngest();
// //         break;
// //       default:
// //         Alert.alert('Coming Soon', `${source.name} integration is coming soon!`);
// //         break;
// //     }
// //   };

// //   // Test ingest with sample data
// //   const handleTestIngest = async () => {
// //     try {
// //       setProcessing(true);
      
// //       const testData = [
// //         { source: 'sms', text: "UPI: Rs 1,200 credited from SALARY. Ref: SALJAN2024. Avl Bal: Rs 45,678.90" },
// //         { source: 'sms', text: "Debit Card: Rs 2,499 spent at AMAZON.IN. Card ending 1234. Avl Bal: Rs 43,179.90" },
// //         { source: 'sms', text: "NetBanking: Rs 5,000 transferred to ICICI 4567. Ref: TRF123456. Avl Bal: Rs 38,179.90" }
// //       ];

// //       for (const data of testData) {
// //         await ApiService.ingestEvent(data.source, {
// //           raw_text: data.text,
// //           sender: 'test_bank'
// //         });
// //       }

// //       Alert.alert('Success', 'Test data ingested successfully');
// //       fetchIngestStats();
      
// //     } catch (error) {
// //       console.error('Test ingest error:', error);
// //       Alert.alert('Error', 'Failed to ingest test data');
// //     } finally {
// //       setProcessing(false);
// //     }
// //   };

// //   // Format date
// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'Never';
// //     return new Date(dateString).toLocaleDateString('en-IN', {
// //       day: 'numeric',
// //       month: 'short',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   // Calculate processing percentage
// //   const processingPercentage = ingestStats.total > 0 
// //     ? (ingestStats.processed / ingestStats.total) * 100 
// //     : 0;

// //   return (
// //     <Theme name="dark">
// //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// //         {/* HEADER */}
// //         <XStack p={20} ai="center" space={16}>
// //           <TouchableOpacity onPress={() => router.back()}>
// //             <ArrowLeft size={24} color="#EAB308" />
// //           </TouchableOpacity>
          
// //           <YStack flex={1}>
// //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
// //               Data Ingest
// //             </H2>
// //             <Text color="#666666" fontSize={14}>
// //               Automatic financial data capture
// //             </Text>
// //           </YStack>
          
// //           <TouchableOpacity 
// //             onPress={handleTestIngest}
// //             disabled={processing}
// //             style={{
// //               paddingHorizontal: 16,
// //               paddingVertical: 8,
// //               backgroundColor: '#1A1A1A',
// //               borderRadius: 12,
// //               borderWidth: 1,
// //               borderColor: '#333333',
// //             }}
// //           >
// //             {processing ? (
// //               <Spinner size="small" color="#EAB308" />
// //             ) : (
// //               <Text color="#EAB308" fontSize={12} fontWeight="700">TEST</Text>
// //             )}
// //           </TouchableOpacity>
// //         </XStack>

// //         {/* PROCESSING STATS */}
// //         <Card m={20} mb={16} backgroundColor="#1A1A1A">
// //           <YStack p={20}>
// //             <XStack jc="space-between" ai="center" mb={16}>
// //               <Text color="#999999" fontSize={12} fontWeight="600">
// //                 INGEST PROCESSING
// //               </Text>
// //               <Text color="#666666" fontSize={11}>
// //                 {formatDate(ingestStats.lastUpdated)}
// //               </Text>
// //             </XStack>
            
// //             <Progress 
// //               value={processingPercentage} 
// //               height={8} 
// //               backgroundColor="#333333"
// //               borderRadius={4}
// //               mb={12}
// //             >
// //               <Progress.Indicator 
// //                 backgroundColor="#EAB308"
// //                 borderRadius={4}
// //               />
// //             </Progress>
            
// //             <XStack jc="space-between" ai="center">
// //               <YStack ai="center">
// //                 <Text color="#22C55E" fontSize={18} fontWeight="800">
// //                   {ingestStats.processed}
// //                 </Text>
// //                 <Text color="#666666" fontSize={11}>Processed</Text>
// //               </YStack>
              
// //               <YStack ai="center">
// //                 <Text color="#EF4444" fontSize={18} fontWeight="800">
// //                   {ingestStats.pending}
// //                 </Text>
// //                 <Text color="#666666" fontSize={11}>Pending</Text>
// //               </YStack>
              
// //               <YStack ai="center">
// //                 <Text color="white" fontSize={18} fontWeight="800">
// //                   {ingestStats.total}
// //                 </Text>
// //                 <Text color="#666666" fontSize={11}>Total</Text>
// //               </YStack>
// //             </XStack>
// //           </YStack>
// //         </Card>

// //         {/* INFO CARD */}
// //         <Card m={20} mb={16} backgroundColor="#1A1A1A" borderLeftWidth={4} borderLeftColor="#3B82F6">
// //           <XStack p={16} ai="center" space={12}>
// //             <Shield size={20} color="#3B82F6" />
// //             <YStack flex={1}>
// //               <Text color="white" fontSize={14} fontWeight="700">
// //                 Automatic Data Capture
// //               </Text>
// //               <Text color="#666666" fontSize={12} mt={2}>
// //                 Raw data → AI processing → Clean transactions
// //               </Text>
// //             </YStack>
// //           </XStack>
// //         </Card>

// //         {/* INGEST SOURCES */}
// //         <ScrollView 
// //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}
// //           showsVerticalScrollIndicator={false}
// //         >
// //           <Text color="#EAB308" fontSize={16} fontWeight="800" mb={12}>
// //             INGESTION SOURCES
// //           </Text>
          
// //           <YStack space={12}>
// //             {ingestSources.map((source) => (
// //               <TouchableOpacity
// //                 key={source.id}
// //                 onPress={() => handleSourceIngest(source)}
// //                 disabled={!source.enabled || loading || processing}
// //                 activeOpacity={source.enabled ? 0.8 : 1}
// //               >
// //                 <Card 
// //                   backgroundColor="#1A1A1A" 
// //                   p={16} 
// //                   borderRadius={12}
// //                   borderWidth={1}
// //                   borderColor={source.enabled ? '#333333' : '#222222'}
// //                   opacity={source.enabled ? 1 : 0.5}
// //                 >
// //                   <XStack ai="center" space={12}>
// //                     <View style={{
// //                       width: 44,
// //                       height: 44,
// //                       borderRadius: 12,
// //                       backgroundColor: source.color + '20',
// //                       justifyContent: 'center',
// //                       alignItems: 'center',
// //                     }}>
// //                       {source.icon}
// //                     </View>
                    
// //                     <YStack flex={1}>
// //                       <XStack ai="center" space={8}>
// //                         <Text color="white" fontWeight="800" fontSize={16}>
// //                           {source.name}
// //                         </Text>
// //                         {source.requiresPermission && (
// //                           <Shield size={12} color="#666666" />
// //                         )}
// //                         {!source.enabled && (
// //                           <Text color="#EF4444" fontSize={10} fontWeight="700">
// //                             COMING SOON
// //                           </Text>
// //                         )}
// //                       </XStack>
// //                       <Text color="#666666" fontSize={12} mt={2}>
// //                         {source.description}
// //                       </Text>
// //                     </YStack>
                    
// //                     {source.enabled && (
// //                       <TouchableOpacity 
// //                         onPress={() => handleSourceIngest(source)}
// //                         disabled={loading || processing}
// //                       >
// //                         <View style={{
// //                           width: 36,
// //                           height: 36,
// //                           borderRadius: 18,
// //                           backgroundColor: source.color + '20',
// //                           justifyContent: 'center',
// //                           alignItems: 'center',
// //                         }}>
// //                           <Zap size={16} color={source.color} />
// //                         </View>
// //                       </TouchableOpacity>
// //                     )}
// //                   </XStack>
// //                 </Card>
// //               </TouchableOpacity>
// //             ))}
// //           </YStack>

// //           {/* HOW IT WORKS */}
// //           <Text color="#EAB308" fontSize={16} fontWeight="800" mt={24} mb={12}>
// //             HOW INGESTION WORKS
// //           </Text>
          
// //           <Card backgroundColor="#1A1A1A" p={16} borderRadius={12}>
// //             <YStack space={12}>
// //               <XStack ai="center" space={12}>
// //                 <View style={{
// //                   width: 32,
// //                   height: 32,
// //                   borderRadius: 16,
// //                   backgroundColor: '#3B82F620',
// //                   justifyContent: 'center',
// //                   alignItems: 'center',
// //                 }}>
// //                   <Text color="#3B82F6" fontSize={12} fontWeight="800">1</Text>
// //                 </View>
// //                 <YStack flex={1}>
// //                   <Text color="white" fontSize={14} fontWeight="700">Capture</Text>
// //                   <Text color="#666666" fontSize={12}>System reads SMS, receipts, files</Text>
// //                 </YStack>
// //               </XStack>
              
// //               <XStack ai="center" space={12}>
// //                 <View style={{
// //                   width: 32,
// //                   height: 32,
// //                   borderRadius: 16,
// //                   backgroundColor: '#8B5CF620',
// //                   justifyContent: 'center',
// //                   alignItems: 'center',
// //                 }}>
// //                   <Text color="#8B5CF6" fontSize={12} fontWeight="800">2</Text>
// //                 </View>
// //                 <YStack flex={1}>
// //                   <Text color="white" fontSize={14} fontWeight="700">Process</Text>
// //                   <Text color="#666666" fontSize={12}>AI extracts amount, merchant, category</Text>
// //                 </YStack>
// //               </XStack>
              
// //               <XStack ai="center" space={12}>
// //                 <View style={{
// //                   width: 32,
// //                   height: 32,
// //                   borderRadius: 16,
// //                   backgroundColor: '#22C55E20',
// //                   justifyContent: 'center',
// //                   alignItems: 'center',
// //                 }}>
// //                   <Text color="#22C55E" fontSize={12} fontWeight="800">3</Text>
// //                 </View>
// //                 <YStack flex={1}>
// //                   <Text color="white" fontSize={14} fontWeight="700">Create</Text>
// //                   <Text color="#666666" fontSize={12}>Verified transaction appears in your list</Text>
// //                 </YStack>
// //               </XStack>
// //             </YStack>
            
// //             <View style={{
// //               backgroundColor: '#222222',
// //               padding: 12,
// //               borderRadius: 8,
// //               marginTop: 16,
// //               borderLeftWidth: 3,
// //               borderLeftColor: '#EAB308',
// //             }}>
// //               <Text color="#EAB308" fontSize={12} fontWeight="700">
// //                 IMPORTANT
// //               </Text>
// //               <Text color="#666666" fontSize={11} mt={4}>
// //                 • Ingest data is raw and unverified
// //               </Text>
// //               <Text color="#666666" fontSize={11}>
// //                 • Only converted to transactions after AI processing
// //               </Text>
// //               <Text color="#666666" fontSize={11}>
// //                 • You can edit/delete created transactions
// //               </Text>
// //             </View>
// //           </Card>

// //           {/* STATUS INFO */}
// //           <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mt={16}>
// //             <XStack ai="center" space={12}>
// //               {processing ? (
// //                 <>
// //                   <Spinner size="small" color="#EAB308" />
// //                   <Text color="#EAB308" fontSize={14} fontWeight="700">
// //                     Processing ingest...
// //                   </Text>
// //                 </>
// //               ) : (
// //                 <>
// //                   <CheckCircle size={20} color="#22C55E" />
// //                   <Text color="#22C55E" fontSize={14} fontWeight="700">
// //                     System Ready
// //                   </Text>
// //                 </>
// //               )}
// //             </XStack>
// //           </Card>
// //         </ScrollView>
// //       </SafeAreaView>
// //     </Theme>
// //   );
// // }




// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import {
// // // // //   ScrollView,
// // // // //   TouchableOpacity,
// // // // //   Alert,
// // // // //   View,
// // // // //   Platform,
// // // // //   Modal
// // // // // } from 'react-native';
// // // // // import {
// // // // //   YStack,
// // // // //   XStack,
// // // // //   Text,
// // // // //   H2,
// // // // //   H4,
// // // // //   Theme,
// // // // //   Spinner,
// // // // //   Card,
// // // // //   Input,
// // // // //   Button
// // // // // } from 'tamagui';
// // // // // import {
// // // // //   ArrowLeft,
// // // // //   Upload,
// // // // //   FileText,
// // // // //   DollarSign,
// // // // //   Calendar,
// // // // //   Tag,
// // // // //   Building,
// // // // //   Plus,
// // // // //   X,
// // // // //   CheckCircle,
// // // // //   AlertTriangle,
// // // // //   Clock,
// // // // //   RefreshCw,
// // // // //   Smartphone,
// // // // //   Shield,
// // // // //   Zap,
// // // // //   CreditCard,
// // // // //   Wallet,
// // // // //   TrendingUp,
// // // // //   Home,
// // // // //   Briefcase,
// // // // //   Percent,
// // // // //   Circle,
// // // // //   MessageSquare,
// // // // //   Bell,
// // // // //   Database
// // // // // } from '@tamagui/lucide-icons';
// // // // // import { useRouter, useFocusEffect } from 'expo-router';
// // // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // // import * as DocumentPicker from 'expo-document-picker';
// // // // // import DateTimePicker from '@react-native-community/datetimepicker';

// // // // // // Services
// // // // // import { ApiService } from '../services/apiService';

// // // // // export default function Ingest() {
// // // // //   const router = useRouter();
// // // // //   const insets = useSafeAreaInsets();
  
// // // // //   // State
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [showManualModal, setShowManualModal] = useState(false);
// // // // //   const [showDatePicker, setShowDatePicker] = useState(false);
// // // // //   const [processingFile, setProcessingFile] = useState(false);
  
// // // // //   // Manual transaction form state
// // // // //   const [formData, setFormData] = useState({
// // // // //     amount: '',
// // // // //     description: '',
// // // // //     category: '',
// // // // //     merchant: '',
// // // // //     date: new Date(),
// // // // //     source_type: 'manual',
// // // // //     transaction_type: 'expense'
// // // // //   });

// // // // //   // Transaction types
// // // // //   const transactionTypes = [
// // // // //     { value: 'expense', label: 'Expense', icon: <DollarSign size={16} />, color: '#EF4444' },
// // // // //     { value: 'income', label: 'Income', icon: <TrendingUp size={16} />, color: '#22C55E' },
// // // // //     { value: 'investment', label: 'Investment', icon: <Percent size={16} />, color: '#8B5CF6' }
// // // // //   ];

// // // // //   // Categories based on your budgets
// // // // //   const categories = [
// // // // //     'Eating out', 'Eating', 'Eat', 'Dining', 'Daily Food', 
// // // // //     'Shopping', 'Cycle', 'Hike', 'Groceries', 'Transportation',
// // // // //     'Entertainment', 'Healthcare', 'Housing', 'Utilities', 
// // // // //     'Education', 'Health & Fitness', 'Food & Drink', 'Other'
// // // // //   ];

// // // // //   // Source types from your enum
// // // // //   const sourceTypes = [
// // // // //     { value: 'manual', label: 'Manual Entry', icon: <Plus size={16} /> },
// // // // //     { value: 'csv', label: 'CSV Import', icon: <FileText size={16} /> },
// // // // //     { value: 'voice', label: 'Voice', icon: <Smartphone size={16} /> },
// // // // //     { value: 'chatbot', label: 'Chatbot', icon: <MessageSquare size={16} /> },
// // // // //     { value: 'notification', label: 'Notification', icon: <Bell size={16} /> },
// // // // //     { value: 'wallet', label: 'Wallet', icon: <Wallet size={16} /> },
// // // // //     { value: 'blockchain', label: 'Blockchain', icon: <Database size={16} /> }
// // // // //   ];

// // // // //   // Income types from your enum (for income transactions)
// // // // //   const incomeTypes = [
// // // // //     { value: 'salary', label: 'Salary', icon: <Briefcase size={16} /> },
// // // // //     { value: 'business', label: 'Business', icon: <Building size={16} /> },
// // // // //     { value: 'rental', label: 'Rental', icon: <Home size={16} /> },
// // // // //     { value: 'dividend', label: 'Dividend', icon: <TrendingUp size={16} /> },
// // // // //     { value: 'interest', label: 'Interest', icon: <Percent size={16} /> },
// // // // //     { value: 'other', label: 'Other', icon: <Circle size={16} /> }
// // // // //   ];

// // // // //   // Reset form
// // // // //   const resetForm = () => {
// // // // //     setFormData({
// // // // //       amount: '',
// // // // //       description: '',
// // // // //       category: '',
// // // // //       merchant: '',
// // // // //       date: new Date(),
// // // // //       source_type: 'manual',
// // // // //       transaction_type: 'expense'
// // // // //     });
// // // // //   };

// // // // //   // Handle manual transaction submission
// // // // //   const handleManualSubmit = async () => {
// // // // //     try {
// // // // //       if (!formData.amount || !formData.description) {
// // // // //         Alert.alert('Error', 'Please fill amount and description');
// // // // //         return;
// // // // //       }

// // // // //       setLoading(true);

// // // // //       const transactionData = {
// // // // //         amount: parseFloat(formData.amount),
// // // // //         description: formData.description.trim(),
// // // // //         category: formData.category || 'Other',
// // // // //         merchant: formData.merchant || '',
// // // // //         date: formData.date.toISOString(),
// // // // //         source_type: 'manual',
// // // // //         transaction_type: formData.transaction_type,
// // // // //         // Include income_type if it's an income transaction
// // // // //         ...(formData.transaction_type === 'income' && { income_type: 'other' }),
// // // // //         status: 'completed'
// // // // //       };

// // // // //       // Call your API endpoint for manual transactions
// // // // //       const response = await ApiService.post('/transactions/', transactionData);

// // // // //       Alert.alert('Success', 'Transaction added successfully');
// // // // //       setShowManualModal(false);
// // // // //       resetForm();
      
// // // // //     } catch (error) {
// // // // //       console.error('Manual transaction error:', error);
// // // // //       let errorMessage = 'Failed to add transaction';
      
// // // // //       if (error.response?.data?.detail) {
// // // // //         errorMessage = error.response.data.detail;
// // // // //       } else if (error.response?.status === 422) {
// // // // //         errorMessage = 'Invalid data. Please check the values.';
// // // // //       }
      
// // // // //       Alert.alert('Error', errorMessage);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // Handle CSV file upload
// // // // //   const handleCSVUpload = async () => {
// // // // //     try {
// // // // //       setProcessingFile(true);
      
// // // // //       // Launch document picker
// // // // //       const result = await DocumentPicker.getDocumentAsync({
// // // // //         type: ['text/csv', 'application/vnd.ms-excel'],
// // // // //         copyToCacheDirectory: true,
// // // // //       });

// // // // //       if (result.type === 'success') {
// // // // //         Alert.alert(
// // // // //           'Import CSV File',
// // // // //           `Process ${result.name}? This will import all transactions from the file.`,
// // // // //           [
// // // // //             { text: 'Cancel', style: 'cancel' },
// // // // //             { 
// // // // //               text: 'Import', 
// // // // //               onPress: async () => {
// // // // //                 try {
// // // // //                   // Create FormData for file upload
// // // // //                   const formData = new FormData();
// // // // //                   formData.append('file', {
// // // // //                     uri: result.uri,
// // // // //                     type: result.mimeType || 'text/csv',
// // // // //                     name: result.name,
// // // // //                   });

// // // // //                   // Send to CSV ingest endpoint
// // // // //                   const response = await ApiService.post('/ingest/csv/', formData, {
// // // // //                     headers: {
// // // // //                       'Content-Type': 'multipart/form-data',
// // // // //                     },
// // // // //                   });

// // // // //                   Alert.alert('Success', 'CSV file uploaded. Transactions are being processed.');
                  
// // // // //                 } catch (error) {
// // // // //                   console.error('CSV upload error:', error);
// // // // //                   let errorMessage = 'Failed to upload CSV file';
                  
// // // // //                   if (error.response?.data?.detail) {
// // // // //                     errorMessage = error.response.data.detail;
// // // // //                   }
                  
// // // // //                   Alert.alert('Error', errorMessage);
// // // // //                 }
// // // // //               }
// // // // //             }
// // // // //           ]
// // // // //         );
// // // // //       }
      
// // // // //     } catch (error) {
// // // // //       console.error('CSV picker error:', error);
// // // // //       Alert.alert('Error', 'Failed to pick CSV file');
// // // // //     } finally {
// // // // //       setProcessingFile(false);
// // // // //     }
// // // // //   };

// // // // //   // Handle date change
// // // // //   const onDateChange = (event, selectedDate) => {
// // // // //     setShowDatePicker(Platform.OS === 'ios');
// // // // //     if (selectedDate) {
// // // // //       setFormData(prev => ({ ...prev, date: selectedDate }));
// // // // //     }
// // // // //   };

// // // // //   const formatDate = (date) => {
// // // // //     return date.toLocaleDateString('en-IN', {
// // // // //       day: 'numeric',
// // // // //       month: 'short',
// // // // //       year: 'numeric'
// // // // //     });
// // // // //   };

// // // // //   const formatTime = (date) => {
// // // // //     return date.toLocaleTimeString('en-IN', {
// // // // //       hour: '2-digit',
// // // // //       minute: '2-digit'
// // // // //     });
// // // // //   };

// // // // //   return (
// // // // //     <Theme name="dark">
// // // // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // // // //         {/* HEADER */}
// // // // //         <XStack p={20} ai="center" space={16}>
// // // // //           <TouchableOpacity onPress={() => router.back()}>
// // // // //             <ArrowLeft size={24} color="#EAB308" />
// // // // //           </TouchableOpacity>
          
// // // // //           <YStack flex={1}>
// // // // //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
// // // // //               Add Transactions
// // // // //             </H2>
// // // // //             <Text color="#666666" fontSize={14}>
// // // // //               Manual entry or bulk import
// // // // //             </Text>
// // // // //           </YStack>
// // // // //         </XStack>

// // // // //         {/* MAIN ACTIONS */}
// // // // //         <ScrollView 
// // // // //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}
// // // // //           showsVerticalScrollIndicator={false}
// // // // //         >
// // // // //           {/* QUICK ACTIONS */}
// // // // //           <YStack space={16} mb={24}>
// // // // //             <Text color="#EAB308" fontSize={16} fontWeight="800">
// // // // //               QUICK ACTIONS
// // // // //             </Text>
            
// // // // //             {/* Manual Entry Card */}
// // // // //             <TouchableOpacity onPress={() => setShowManualModal(true)}>
// // // // //               <Card backgroundColor="#1A1A1A" p={20} borderRadius={12} borderWidth={1} borderColor="#333333">
// // // // //                 <XStack ai="center" space={16}>
// // // // //                   <View style={{
// // // // //                     width: 52,
// // // // //                     height: 52,
// // // // //                     borderRadius: 16,
// // // // //                     backgroundColor: '#EAB30820',
// // // // //                     justifyContent: 'center',
// // // // //                     alignItems: 'center',
// // // // //                   }}>
// // // // //                     <Plus size={24} color="#EAB308" />
// // // // //                   </View>
                  
// // // // //                   <YStack flex={1}>
// // // // //                     <Text color="white" fontWeight="800" fontSize={18}>
// // // // //                       Manual Entry
// // // // //                     </Text>
// // // // //                     <Text color="#666666" fontSize={13} mt={2}>
// // // // //                       Add single transaction with details
// // // // //                     </Text>
// // // // //                   </YStack>
                  
// // // // //                   <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
// // // // //                 </XStack>
// // // // //               </Card>
// // // // //             </TouchableOpacity>

// // // // //             {/* CSV Import Card */}
// // // // //             <TouchableOpacity onPress={handleCSVUpload} disabled={processingFile}>
// // // // //               <Card 
// // // // //                 backgroundColor="#1A1A1A" 
// // // // //                 p={20} 
// // // // //                 borderRadius={12} 
// // // // //                 borderWidth={1} 
// // // // //                 borderColor="#333333"
// // // // //                 opacity={processingFile ? 0.7 : 1}
// // // // //               >
// // // // //                 <XStack ai="center" space={16}>
// // // // //                   <View style={{
// // // // //                     width: 52,
// // // // //                     height: 52,
// // // // //                     borderRadius: 16,
// // // // //                     backgroundColor: '#22C55E20',
// // // // //                     justifyContent: 'center',
// // // // //                     alignItems: 'center',
// // // // //                   }}>
// // // // //                     {processingFile ? (
// // // // //                       <Spinner size={24} color="#22C55E" />
// // // // //                     ) : (
// // // // //                       <Upload size={24} color="#22C55E" />
// // // // //                     )}
// // // // //                   </View>
                  
// // // // //                   <YStack flex={1}>
// // // // //                     <Text color="white" fontWeight="800" fontSize={18}>
// // // // //                       CSV Import
// // // // //                     </Text>
// // // // //                     <Text color="#666666" fontSize={13} mt={2}>
// // // // //                       {processingFile ? 'Processing file...' : 'Upload bank statement CSV'}
// // // // //                     </Text>
// // // // //                   </YStack>
                  
// // // // //                   <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
// // // // //                 </XStack>
// // // // //               </Card>
// // // // //             </TouchableOpacity>
// // // // //           </YStack>

// // // // //           {/* INSTRUCTIONS */}
// // // // //           <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mb={24}>
// // // // //             <YStack space={12}>
// // // // //               <XStack ai="center" space={12}>
// // // // //                 <Shield size={20} color="#3B82F6" />
// // // // //                 <Text color="white" fontSize={14} fontWeight="700">
// // // // //                   How to add transactions
// // // // //                 </Text>
// // // // //               </XStack>
              
// // // // //               <YStack space={8}>
// // // // //                 <XStack ai="center" space={8}>
// // // // //                   <Circle size={6} bg="#22C55E" />
// // // // //                   <Text color="#666666" fontSize={12}>
// // // // //                     <Text color="white" fontWeight="600">Manual Entry:</Text> For single transactions
// // // // //                   </Text>
// // // // //                 </XStack>
                
// // // // //                 <XStack ai="center" space={8}>
// // // // //                   <Circle size={6} bg="#22C55E" />
// // // // //                   <Text color="#666666" fontSize={12}>
// // // // //                     <Text color="white" fontWeight="600">CSV Import:</Text> For bulk upload from bank statements
// // // // //                   </Text>
// // // // //                 </XStack>
                
// // // // //                 <XStack ai="center" space={8}>
// // // // //                   <Circle size={6} bg="#22C55E" />
// // // // //                   <Text color="#666666" fontSize={12}>
// // // // //                     <Text color="white" fontWeight="600">Auto-sync:</Text> Coming soon (SMS, notifications)
// // // // //                   </Text>
// // // // //                 </XStack>
// // // // //               </YStack>
// // // // //             </YStack>
// // // // //           </Card>

// // // // //           {/* CSV FORMAT GUIDE */}
// // // // //           <Card backgroundColor="#1A1A1A" p={16} borderRadius={12}>
// // // // //             <YStack space={12}>
// // // // //               <XStack ai="center" space={12}>
// // // // //                 <FileText size={20} color="#F59E0B" />
// // // // //                 <Text color="white" fontSize={14} fontWeight="700">
// // // // //                   CSV Format Guide
// // // // //                 </Text>
// // // // //               </XStack>
              
// // // // //               <Text color="#666666" fontSize={12}>
// // // // //                 Your CSV should include these columns:
// // // // //               </Text>
              
// // // // //               <View style={{ backgroundColor: '#222222', padding: 12, borderRadius: 8 }}>
// // // // //                 <Text color="#EAB308" fontSize={11} fontFamily="monospace">
// // // // //                   date,amount,description,category,merchant
// // // // //                 </Text>
// // // // //                 <Text color="#666666" fontSize={11} mt={4}>
// // // // //                   Example: 2024-01-15,125.50,Grocery Store,Groceries,Whole Foods
// // // // //                 </Text>
// // // // //               </View>
              
// // // // //               <Text color="#666666" fontSize={11}>
// // // // //                 • Date format: YYYY-MM-DD
// // // // //               </Text>
// // // // //               <Text color="#666666" fontSize={11}>
// // // // //                 • Amount: Positive for expenses, negative for income
// // // // //               </Text>
// // // // //               <Text color="#666666" fontSize={11}>
// // // // //                 • Category: Should match your budget categories
// // // // //               </Text>
// // // // //             </YStack>
// // // // //           </Card>
// // // // //         </ScrollView>

// // // // //         {/* MANUAL ENTRY MODAL */}
// // // // //         <Modal
// // // // //           visible={showManualModal}
// // // // //           animationType="slide"
// // // // //           transparent={true}
// // // // //           onRequestClose={() => {
// // // // //             setShowManualModal(false);
// // // // //             resetForm();
// // // // //           }}
// // // // //         >
// // // // //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
// // // // //             <View style={{ 
// // // // //               backgroundColor: '#1A1A1A', 
// // // // //               borderTopLeftRadius: 24, 
// // // // //               borderTopRightRadius: 24, 
// // // // //               padding: 24, 
// // // // //               paddingBottom: insets.bottom + 24,
// // // // //               maxHeight: '90%'
// // // // //             }}>
// // // // //               <XStack jc="space-between" ai="center" mb={24}>
// // // // //                 <H4 color="white" fontWeight="800" fontSize={20}>
// // // // //                   Add Manual Transaction
// // // // //                 </H4>
// // // // //                 <TouchableOpacity 
// // // // //                   onPress={() => {
// // // // //                     setShowManualModal(false);
// // // // //                     resetForm();
// // // // //                   }}
// // // // //                   style={{ padding: 8 }}
// // // // //                 >
// // // // //                   <X size={24} color="#666666" />
// // // // //                 </TouchableOpacity>
// // // // //               </XStack>

// // // // //               <ScrollView showsVerticalScrollIndicator={false}>
// // // // //                 <YStack space={20}>
// // // // //                   {/* Transaction Type */}
// // // // //                   <YStack>
// // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // //                       Type *
// // // // //                     </Text>
// // // // //                     <View style={{ flexDirection: 'row', gap: 8 }}>
// // // // //                       {transactionTypes.map(type => (
// // // // //                         <TouchableOpacity
// // // // //                           key={type.value}
// // // // //                           onPress={() => setFormData(prev => ({ ...prev, transaction_type: type.value }))}
// // // // //                           style={{
// // // // //                             flex: 1,
// // // // //                             flexDirection: 'row',
// // // // //                             alignItems: 'center',
// // // // //                             justifyContent: 'center',
// // // // //                             paddingHorizontal: 12,
// // // // //                             paddingVertical: 12,
// // // // //                             backgroundColor: formData.transaction_type === type.value ? type.color + '20' : '#333333',
// // // // //                             borderRadius: 8,
// // // // //                             borderWidth: 1,
// // // // //                             borderColor: formData.transaction_type === type.value ? type.color : '#444444',
// // // // //                           }}
// // // // //                         >
// // // // //                           {React.cloneElement(type.icon, { 
// // // // //                             size: 14,
// // // // //                             color: formData.transaction_type === type.value ? type.color : '#666666'
// // // // //                           })}
// // // // //                           <Text 
// // // // //                             color={formData.transaction_type === type.value ? type.color : '#666666'} 
// // // // //                             fontSize={12} 
// // // // //                             fontWeight="700"
// // // // //                             ml={6}
// // // // //                           >
// // // // //                             {type.label}
// // // // //                           </Text>
// // // // //                         </TouchableOpacity>
// // // // //                       ))}
// // // // //                     </View>
// // // // //                   </YStack>

// // // // //                   {/* Amount */}
// // // // //                   <YStack>
// // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // //                       Amount *
// // // // //                     </Text>
// // // // //                     <Input
// // // // //                       placeholder="0.00"
// // // // //                       value={formData.amount}
// // // // //                       onChangeText={(text) => setFormData(prev => ({ ...prev, amount: text }))}
// // // // //                       backgroundColor="#333333"
// // // // //                       borderColor="#444444"
// // // // //                       color="white"
// // // // //                       placeholderTextColor="#666666"
// // // // //                       keyboardType="decimal-pad"
// // // // //                       fontSize={16}
// // // // //                       br={8}
// // // // //                       prefix={<Text color="#666666" mr={8}>$</Text>}
// // // // //                     />
// // // // //                   </YStack>

// // // // //                   {/* Description */}
// // // // //                   <YStack>
// // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // //                       Description *
// // // // //                     </Text>
// // // // //                     <Input
// // // // //                       placeholder="e.g., Grocery shopping, Salary, Restaurant bill"
// // // // //                       value={formData.description}
// // // // //                       onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
// // // // //                       backgroundColor="#333333"
// // // // //                       borderColor="#444444"
// // // // //                       color="white"
// // // // //                       placeholderTextColor="#666666"
// // // // //                       fontSize={16}
// // // // //                       br={8}
// // // // //                     />
// // // // //                   </YStack>

// // // // //                   {/* Category */}
// // // // //                   <YStack>
// // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // //                       Category
// // // // //                     </Text>
// // // // //                     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
// // // // //                       <XStack space={8}>
// // // // //                         {categories.slice(0, 8).map(category => (
// // // // //                           <TouchableOpacity
// // // // //                             key={category}
// // // // //                             onPress={() => setFormData(prev => ({ ...prev, category }))}
// // // // //                             style={{
// // // // //                               paddingHorizontal: 12,
// // // // //                               paddingVertical: 8,
// // // // //                               backgroundColor: formData.category === category ? '#EAB30820' : '#333333',
// // // // //                               borderRadius: 20,
// // // // //                               borderWidth: 1,
// // // // //                               borderColor: formData.category === category ? '#EAB308' : '#444444',
// // // // //                             }}
// // // // //                           >
// // // // //                             <Text 
// // // // //                               color={formData.category === category ? '#EAB308' : '#666666'} 
// // // // //                               fontSize={12} 
// // // // //                               fontWeight="700"
// // // // //                             >
// // // // //                               {category}
// // // // //                             </Text>
// // // // //                           </TouchableOpacity>
// // // // //                         ))}
// // // // //                       </XStack>
// // // // //                     </ScrollView>
// // // // //                     <Input
// // // // //                       placeholder="Or enter custom category"
// // // // //                       value={formData.category}
// // // // //                       onChangeText={(text) => setFormData(prev => ({ ...prev, category: text }))}
// // // // //                       backgroundColor="#333333"
// // // // //                       borderColor="#444444"
// // // // //                       color="white"
// // // // //                       placeholderTextColor="#666666"
// // // // //                       fontSize={14}
// // // // //                       br={8}
// // // // //                       mt={8}
// // // // //                     />
// // // // //                   </YStack>

// // // // //                   {/* Merchant */}
// // // // //                   <YStack>
// // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // //                       Merchant
// // // // //                     </Text>
// // // // //                     <Input
// // // // //                       placeholder="e.g., Amazon, Walmart, Restaurant name"
// // // // //                       value={formData.merchant}
// // // // //                       onChangeText={(text) => setFormData(prev => ({ ...prev, merchant: text }))}
// // // // //                       backgroundColor="#333333"
// // // // //                       borderColor="#444444"
// // // // //                       color="white"
// // // // //                       placeholderTextColor="#666666"
// // // // //                       fontSize={16}
// // // // //                       br={8}
// // // // //                     />
// // // // //                   </YStack>

// // // // //                   {/* Date */}
// // // // //                   <YStack>
// // // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // //                       Date
// // // // //                     </Text>
// // // // //                     <TouchableOpacity
// // // // //                       onPress={() => setShowDatePicker(true)}
// // // // //                       style={{
// // // // //                         backgroundColor: '#333333',
// // // // //                         borderWidth: 1,
// // // // //                         borderColor: '#444444',
// // // // //                         borderRadius: 8,
// // // // //                         padding: 16,
// // // // //                       }}
// // // // //                     >
// // // // //                       <XStack ai="center" space={12}>
// // // // //                         <Calendar size={16} color="#666666" />
// // // // //                         <Text color="white" fontSize={16}>
// // // // //                           {formatDate(formData.date)} • {formatTime(formData.date)}
// // // // //                         </Text>
// // // // //                       </XStack>
// // // // //                     </TouchableOpacity>
// // // // //                   </YStack>

// // // // //                   {/* Income Type (if income transaction) */}
// // // // //                   {formData.transaction_type === 'income' && (
// // // // //                     <YStack>
// // // // //                       <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // // //                         Income Type
// // // // //                       </Text>
// // // // //                       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
// // // // //                         <XStack space={8}>
// // // // //                           {incomeTypes.map(incomeType => (
// // // // //                             <TouchableOpacity
// // // // //                               key={incomeType.value}
// // // // //                               onPress={() => setFormData(prev => ({ 
// // // // //                                 ...prev, 
// // // // //                                 income_type: incomeType.value 
// // // // //                               }))}
// // // // //                               style={{
// // // // //                                 paddingHorizontal: 12,
// // // // //                                 paddingVertical: 8,
// // // // //                                 backgroundColor: formData.income_type === incomeType.value ? '#22C55E20' : '#333333',
// // // // //                                 borderRadius: 8,
// // // // //                                 borderWidth: 1,
// // // // //                                 borderColor: formData.income_type === incomeType.value ? '#22C55E' : '#444444',
// // // // //                               }}
// // // // //                             >
// // // // //                               <XStack ai="center" space={6}>
// // // // //                                 {React.cloneElement(incomeType.icon, { 
// // // // //                                   size: 12,
// // // // //                                   color: formData.income_type === incomeType.value ? '#22C55E' : '#666666'
// // // // //                                 })}
// // // // //                                 <Text 
// // // // //                                   color={formData.income_type === incomeType.value ? '#22C55E' : '#666666'} 
// // // // //                                   fontSize={12} 
// // // // //                                   fontWeight="700"
// // // // //                                 >
// // // // //                                   {incomeType.label}
// // // // //                                 </Text>
// // // // //                               </XStack>
// // // // //                             </TouchableOpacity>
// // // // //                           ))}
// // // // //                         </XStack>
// // // // //                       </ScrollView>
// // // // //                     </YStack>
// // // // //                   )}

// // // // //                   {/* Submit Button */}
// // // // //                   <TouchableOpacity
// // // // //                     onPress={handleManualSubmit}
// // // // //                     disabled={loading || !formData.amount || !formData.description}
// // // // //                     style={{
// // // // //                       backgroundColor: '#EAB308',
// // // // //                       padding: 16,
// // // // //                       borderRadius: 12,
// // // // //                       alignItems: 'center',
// // // // //                       marginTop: 8,
// // // // //                       opacity: (loading || !formData.amount || !formData.description) ? 0.7 : 1,
// // // // //                     }}
// // // // //                   >
// // // // //                     {loading ? (
// // // // //                       <Spinner size="small" color="black" />
// // // // //                     ) : (
// // // // //                       <Text color="black" fontSize={16} fontWeight="800">
// // // // //                         Add Transaction
// // // // //                       </Text>
// // // // //                     )}
// // // // //                   </TouchableOpacity>
// // // // //                 </YStack>
// // // // //               </ScrollView>
// // // // //             </View>
// // // // //           </View>
// // // // //         </Modal>

// // // // //         {/* DATE PICKER */}
// // // // //         {showDatePicker && (
// // // // //           <DateTimePicker
// // // // //             value={formData.date}
// // // // //             mode="datetime"
// // // // //             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// // // // //             onChange={onDateChange}
// // // // //             maximumDate={new Date()}
// // // // //           />
// // // // //         )}
// // // // //       </SafeAreaView>
// // // // //     </Theme>
// // // // //   );
// // // // // }



// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import {
// // // //   ScrollView,
// // // //   TouchableOpacity,
// // // //   Alert,
// // // //   View,
// // // //   Platform,
// // // //   Modal,
// // // //   ActivityIndicator
// // // // } from 'react-native';
// // // // import {
// // // //   YStack,
// // // //   XStack,
// // // //   Text,
// // // //   H2,
// // // //   H4,
// // // //   Theme,
// // // //   Spinner,
// // // //   Card,
// // // //   Input,
// // // //   Button
// // // // } from 'tamagui';
// // // // import {
// // // //   ArrowLeft,
// // // //   Upload,
// // // //   FileText,
// // // //   DollarSign,
// // // //   Calendar,
// // // //   Tag,
// // // //   Building,
// // // //   Plus,
// // // //   X,
// // // //   CheckCircle,
// // // //   AlertTriangle,
// // // //   Clock,
// // // //   RefreshCw,
// // // //   Smartphone,
// // // //   Shield,
// // // //   Zap,
// // // //   CreditCard,
// // // //   Wallet,
// // // //   TrendingUp,
// // // //   Home,
// // // //   Briefcase,
// // // //   Percent,
// // // //   Circle,
// // // //   Check
// // // // } from '@tamagui/lucide-icons';
// // // // import { useRouter, useFocusEffect } from 'expo-router';
// // // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // // import * as DocumentPicker from 'expo-document-picker';
// // // // import * as FileSystem from 'expo-file-system';
// // // // import DateTimePicker from '@react-native-community/datetimepicker';

// // // // // Services
// // // // import { ApiService } from '../services/apiService';

// // // // export default function Ingest() {
// // // //   const router = useRouter();
// // // //   const insets = useSafeAreaInsets();
  
// // // //   // State
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [showManualModal, setShowManualModal] = useState(false);
// // // //   const [showDatePicker, setShowDatePicker] = useState(false);
// // // //   const [processingFile, setProcessingFile] = useState(false);
// // // //   const [selectedFile, setSelectedFile] = useState(null);
// // // //   const [uploadProgress, setUploadProgress] = useState(0);
// // // //   const [uploadComplete, setUploadComplete] = useState(false);
  
// // // //   // Manual transaction form state
// // // //   const [formData, setFormData] = useState({
// // // //     amount: '',
// // // //     description: '',
// // // //     category: '',
// // // //     merchant: '',
// // // //     date: new Date(),
// // // //     source_type: 'manual',
// // // //     transaction_type: 'expense'
// // // //   });

// // // //   // Transaction types
// // // //   const transactionTypes = [
// // // //     { value: 'expense', label: 'Expense', icon: <DollarSign size={16} />, color: '#EF4444' },
// // // //     { value: 'income', label: 'Income', icon: <TrendingUp size={16} />, color: '#22C55E' },
// // // //     { value: 'investment', label: 'Investment', icon: <Percent size={16} />, color: '#8B5CF6' }
// // // //   ];

// // // //   // Categories based on your budgets
// // // //   const categories = [
// // // //     'Eating out', 'Eating', 'Eat', 'Dining', 'Daily Food', 
// // // //     'Shopping', 'Cycle', 'Hike', 'Groceries', 'Transportation',
// // // //     'Entertainment', 'Healthcare', 'Housing', 'Utilities', 
// // // //     'Education', 'Health & Fitness', 'Food & Drink', 'Other'
// // // //   ];

// // // //   // Reset form
// // // //   const resetForm = () => {
// // // //     setFormData({
// // // //       amount: '',
// // // //       description: '',
// // // //       category: '',
// // // //       merchant: '',
// // // //       date: new Date(),
// // // //       source_type: 'manual',
// // // //       transaction_type: 'expense'
// // // //     });
// // // //   };

// // // //   // Reset CSV upload state
// // // //   const resetCSVState = () => {
// // // //     setSelectedFile(null);
// // // //     setUploadProgress(0);
// // // //     setUploadComplete(false);
// // // //   };

// // // //   // Handle CSV file selection
// // // //   const handleSelectCSV = async () => {
// // // //     try {
// // // //       // Reset state
// // // //       resetCSVState();
      
// // // //       const result = await DocumentPicker.getDocumentAsync({
// // // //         type: ['text/csv', 'application/vnd.ms-excel', 'text/comma-separated-values'],
// // // //         copyToCacheDirectory: true,
// // // //       });

// // // //       console.log('Document picker result:', result);

// // // //       if (result.type === 'success') {
// // // //         setSelectedFile({
// // // //           name: result.name,
// // // //           uri: result.uri,
// // // //           size: result.size,
// // // //           type: result.mimeType || 'text/csv'
// // // //         });
        
// // // //         // Show immediate feedback
// // // //         Alert.alert(
// // // //           'File Selected',
// // // //           `Selected: ${result.name}\n\nTap "Upload & Process" to import transactions.`,
// // // //           [
// // // //             { text: 'Cancel', style: 'cancel', onPress: resetCSVState },
// // // //             { 
// // // //               text: 'Upload & Process', 
// // // //               onPress: () => handleCSVUpload(result)
// // // //             }
// // // //           ]
// // // //         );
// // // //       } else if (result.type === 'cancel') {
// // // //         console.log('User cancelled file selection');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Document picker error:', error);
// // // //       Alert.alert('Error', 'Failed to select file. Please try again.');
// // // //     }
// // // //   };

// // // //   // Handle CSV file upload and processing
// // // //   const handleCSVUpload = async (fileResult) => {
// // // //     try {
// // // //       setProcessingFile(true);
// // // //       setUploadProgress(10);
      
// // // //       console.log('Starting CSV upload:', fileResult.name);
      
// // // //       // Check if file exists
// // // //       const fileInfo = await FileSystem.getInfoAsync(fileResult.uri);
// // // //       if (!fileInfo.exists) {
// // // //         throw new Error('File not found');
// // // //       }
      
// // // //       console.log('File size:', fileInfo.size);

// // // //       // Create FormData
// // // //       const formData = new FormData();
      
// // // //       // For React Native, we need to create a proper file object
// // // //       const file = {
// // // //         uri: fileResult.uri,
// // // //         type: fileResult.mimeType || 'text/csv',
// // // //         name: fileResult.name,
// // // //       };
      
// // // //       formData.append('file', file);
// // // //       setUploadProgress(30);

// // // //       // Optional: Preview first few lines of CSV
// // // //       try {
// // // //         const fileContent = await FileSystem.readAsStringAsync(fileResult.uri, {
// // // //           encoding: FileSystem.EncodingType.UTF8,
// // // //           length: 500 // Read first 500 chars for preview
// // // //         });
// // // //         console.log('CSV Preview:', fileContent.substring(0, 200));
// // // //       } catch (readError) {
// // // //         console.log('Could not preview file:', readError);
// // // //       }

// // // //       setUploadProgress(50);
      
// // // //       // Show uploading message
// // // //       Alert.alert('Uploading', 'Please wait while we upload and process your CSV file...', [], {
// // // //         cancelable: false
// // // //       });

// // // //       // Call your API endpoint for CSV upload
// // // //       const response = await ApiService.post('/ingest/csv/', formData, {
// // // //         headers: {
// // // //           'Content-Type': 'multipart/form-data',
// // // //         },
// // // //         timeout: 60000, // 60 second timeout for large files
// // // //         onUploadProgress: (progressEvent) => {
// // // //           const percentCompleted = Math.round(
// // // //             (progressEvent.loaded * 100) / progressEvent.total
// // // //           );
// // // //           setUploadProgress(50 + percentCompleted / 2); // Scale to 50-100%
// // // //         },
// // // //       });

// // // //       setUploadProgress(100);
// // // //       setUploadComplete(true);
      
// // // //       console.log('CSV upload response:', response.data);

// // // //       Alert.alert(
// // // //         'Success!',
// // // //         `CSV file processed successfully!\n\nTransactions are being imported. Check your transactions list in a few moments.`,
// // // //         [
// // // //           { 
// // // //             text: 'View Transactions', 
// // // //             onPress: () => router.push('/transactions')
// // // //           },
// // // //           { 
// // // //             text: 'OK', 
// // // //             style: 'default' 
// // // //           }
// // // //         ]
// // // //       );
      
// // // //       // Reset after success
// // // //       setTimeout(() => {
// // // //         resetCSVState();
// // // //       }, 3000);
      
// // // //     } catch (error) {
// // // //       console.error('CSV upload error:', error);
      
// // // //       let errorMessage = 'Failed to upload CSV file';
      
// // // //       if (error.response) {
// // // //         // Server responded with error
// // // //         console.log('Error response:', error.response.data);
// // // //         errorMessage = error.response.data?.detail || 
// // // //                       error.response.data?.message || 
// // // //                       `Server error: ${error.response.status}`;
// // // //       } else if (error.request) {
// // // //         // No response received
// // // //         errorMessage = 'No response from server. Check your connection.';
// // // //       } else if (error.message?.includes('timeout')) {
// // // //         errorMessage = 'Upload timed out. Please try with a smaller file.';
// // // //       } else if (error.message?.includes('Network Error')) {
// // // //         errorMessage = 'Network error. Please check your internet connection.';
// // // //       }
      
// // // //       Alert.alert(
// // // //         'Upload Failed',
// // // //         errorMessage,
// // // //         [
// // // //           { 
// // // //             text: 'Try Again', 
// // // //             onPress: () => handleSelectCSV() 
// // // //           },
// // // //           { 
// // // //             text: 'Cancel', 
// // // //             style: 'cancel',
// // // //             onPress: resetCSVState
// // // //           }
// // // //         ]
// // // //       );
// // // //     } finally {
// // // //       setProcessingFile(false);
// // // //     }
// // // //   };

// // // //   // Handle manual transaction submission
// // // //   const handleManualSubmit = async () => {
// // // //     try {
// // // //       if (!formData.amount || !formData.description) {
// // // //         Alert.alert('Error', 'Please fill amount and description');
// // // //         return;
// // // //       }

// // // //       setLoading(true);

// // // //       const transactionData = {
// // // //         amount: parseFloat(formData.amount),
// // // //         description: formData.description.trim(),
// // // //         category: formData.category || 'Other',
// // // //         merchant: formData.merchant || '',
// // // //         date: formData.date.toISOString(),
// // // //         source_type: 'manual',
// // // //         transaction_type: formData.transaction_type,
// // // //         status: 'completed'
// // // //       };

// // // //       // Call your API endpoint for manual transactions
// // // //       const response = await ApiService.post('/transactions/', transactionData);

// // // //       Alert.alert('Success', 'Transaction added successfully');
// // // //       setShowManualModal(false);
// // // //       resetForm();
      
// // // //     } catch (error) {
// // // //       console.error('Manual transaction error:', error);
// // // //       let errorMessage = 'Failed to add transaction';
      
// // // //       if (error.response?.data?.detail) {
// // // //         errorMessage = error.response.data.detail;
// // // //       } else if (error.response?.status === 422) {
// // // //         errorMessage = 'Invalid data. Please check the values.';
// // // //       }
      
// // // //       Alert.alert('Error', errorMessage);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Handle date change
// // // //   const onDateChange = (event, selectedDate) => {
// // // //     setShowDatePicker(Platform.OS === 'ios');
// // // //     if (selectedDate) {
// // // //       setFormData(prev => ({ ...prev, date: selectedDate }));
// // // //     }
// // // //   };

// // // //   const formatDate = (date) => {
// // // //     return date.toLocaleDateString('en-IN', {
// // // //       day: 'numeric',
// // // //       month: 'short',
// // // //       year: 'numeric'
// // // //     });
// // // //   };

// // // //   const formatTime = (date) => {
// // // //     return date.toLocaleTimeString('en-IN', {
// // // //       hour: '2-digit',
// // // //       minute: '2-digit'
// // // //     });
// // // //   };

// // // //   const formatFileSize = (bytes) => {
// // // //     if (bytes === 0) return '0 Bytes';
// // // //     const k = 1024;
// // // //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// // // //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// // // //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
// // // //               Add Transactions
// // // //             </H2>
// // // //             <Text color="#666666" fontSize={14}>
// // // //               Manual entry or bulk import
// // // //             </Text>
// // // //           </YStack>
// // // //         </XStack>

// // // //         {/* MAIN ACTIONS */}
// // // //         <ScrollView 
// // // //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}
// // // //           showsVerticalScrollIndicator={false}
// // // //         >
// // // //           {/* QUICK ACTIONS */}
// // // //           <YStack space={16} mb={24}>
// // // //             <Text color="#EAB308" fontSize={16} fontWeight="800">
// // // //               QUICK ACTIONS
// // // //             </Text>
            
// // // //             {/* Manual Entry Card */}
// // // //             <TouchableOpacity onPress={() => setShowManualModal(true)}>
// // // //               <Card backgroundColor="#1A1A1A" p={20} borderRadius={12} borderWidth={1} borderColor="#333333">
// // // //                 <XStack ai="center" space={16}>
// // // //                   <View style={{
// // // //                     width: 52,
// // // //                     height: 52,
// // // //                     borderRadius: 16,
// // // //                     backgroundColor: '#EAB30820',
// // // //                     justifyContent: 'center',
// // // //                     alignItems: 'center',
// // // //                   }}>
// // // //                     <Plus size={24} color="#EAB308" />
// // // //                   </View>
                  
// // // //                   <YStack flex={1}>
// // // //                     <Text color="white" fontWeight="800" fontSize={18}>
// // // //                       Manual Entry
// // // //                     </Text>
// // // //                     <Text color="#666666" fontSize={13} mt={2}>
// // // //                       Add single transaction with details
// // // //                     </Text>
// // // //                   </YStack>
                  
// // // //                   <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
// // // //                 </XStack>
// // // //               </Card>
// // // //             </TouchableOpacity>

// // // //             {/* CSV Import Card */}
// // // //             <TouchableOpacity onPress={handleSelectCSV} disabled={processingFile}>
// // // //               <Card 
// // // //                 backgroundColor="#1A1A1A" 
// // // //                 p={20} 
// // // //                 borderRadius={12} 
// // // //                 borderWidth={1} 
// // // //                 borderColor="#333333"
// // // //                 opacity={processingFile ? 0.7 : 1}
// // // //               >
// // // //                 <XStack ai="center" space={16}>
// // // //                   <View style={{
// // // //                     width: 52,
// // // //                     height: 52,
// // // //                     borderRadius: 16,
// // // //                     backgroundColor: '#22C55E20',
// // // //                     justifyContent: 'center',
// // // //                     alignItems: 'center',
// // // //                   }}>
// // // //                     {processingFile ? (
// // // //                       <Spinner size={24} color="#22C55E" />
// // // //                     ) : uploadComplete ? (
// // // //                       <Check size={24} color="#22C55E" />
// // // //                     ) : (
// // // //                       <Upload size={24} color="#22C55E" />
// // // //                     )}
// // // //                   </View>
                  
// // // //                   <YStack flex={1}>
// // // //                     <Text color="white" fontWeight="800" fontSize={18}>
// // // //                       CSV Import
// // // //                     </Text>
// // // //                     <Text color="#666666" fontSize={13} mt={2}>
// // // //                       {processingFile ? 'Processing...' : 
// // // //                        uploadComplete ? 'Upload Complete!' : 
// // // //                        selectedFile ? `Selected: ${selectedFile.name}` : 
// // // //                        'Upload bank statement CSV'}
// // // //                     </Text>
                    
// // // //                     {selectedFile && !processingFile && !uploadComplete && (
// // // //                       <Text color="#666666" fontSize={11} mt={4}>
// // // //                         Tap to upload and process
// // // //                       </Text>
// // // //                     )}
                    
// // // //                     {processingFile && (
// // // //                       <View style={{ marginTop: 8 }}>
// // // //                         <View style={{
// // // //                           height: 4,
// // // //                           backgroundColor: '#333333',
// // // //                           borderRadius: 2,
// // // //                           overflow: 'hidden',
// // // //                         }}>
// // // //                           <View style={{
// // // //                             width: `${uploadProgress}%`,
// // // //                             height: '100%',
// // // //                             backgroundColor: '#22C55E',
// // // //                             borderRadius: 2,
// // // //                           }} />
// // // //                         </View>
// // // //                         <Text color="#666666" fontSize={10} mt={4}>
// // // //                           {Math.round(uploadProgress)}% uploaded
// // // //                         </Text>
// // // //                       </View>
// // // //                     )}
// // // //                   </YStack>
                  
// // // //                   <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
// // // //                 </XStack>
// // // //               </Card>
// // // //             </TouchableOpacity>

// // // //             {/* Selected File Info */}
// // // //             {selectedFile && !processingFile && !uploadComplete && (
// // // //               <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} borderLeftWidth={4} borderLeftColor="#22C55E">
// // // //                 <YStack>
// // // //                   <XStack ai="center" space={12} mb={8}>
// // // //                     <FileText size={20} color="#22C55E" />
// // // //                     <YStack flex={1}>
// // // //                       <Text color="white" fontSize={14} fontWeight="700">
// // // //                         {selectedFile.name}
// // // //                       </Text>
// // // //                       <Text color="#666666" fontSize={12}>
// // // //                         {formatFileSize(selectedFile.size || 0)}
// // // //                       </Text>
// // // //                     </YStack>
// // // //                   </XStack>
                  
// // // //                   <Button
// // // //                     onPress={() => handleCSVUpload(selectedFile)}
// // // //                     backgroundColor="#22C55E"
// // // //                     color="white"
// // // //                     fontSize={14}
// // // //                     fontWeight="700"
// // // //                     height={40}
// // // //                     borderRadius={8}
// // // //                   >
// // // //                     <Upload size={16} color="white" mr={8} />
// // // //                     Upload & Process
// // // //                   </Button>
// // // //                 </YStack>
// // // //               </Card>
// // // //             )}
// // // //           </YStack>

// // // //           {/* INSTRUCTIONS */}
// // // //           <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mb={24}>
// // // //             <YStack space={12}>
// // // //               <XStack ai="center" space={12}>
// // // //                 <Shield size={20} color="#3B82F6" />
// // // //                 <Text color="white" fontSize={14} fontWeight="700">
// // // //                   How to add transactions
// // // //                 </Text>
// // // //               </XStack>
              
// // // //               <YStack space={8}>
// // // //                 <XStack ai="center" space={8}>
// // // //                   <Circle size={6} bg="#22C55E" />
// // // //                   <Text color="#666666" fontSize={12}>
// // // //                     <Text color="white" fontWeight="600">Manual Entry:</Text> For single transactions
// // // //                   </Text>
// // // //                 </XStack>
                
// // // //                 <XStack ai="center" space={8}>
// // // //                   <Circle size={6} bg="#22C55E" />
// // // //                   <Text color="#666666" fontSize={12}>
// // // //                     <Text color="white" fontWeight="600">CSV Import:</Text> For bulk upload from bank statements
// // // //                   </Text>
// // // //                 </XStack>
                
// // // //                 <XStack ai="center" space={8}>
// // // //                   <Circle size={6} bg="#22C55E" />
// // // //                   <Text color="#666666" fontSize={12}>
// // // //                     <Text color="white" fontWeight="600">Auto-sync:</Text> Coming soon (SMS, notifications)
// // // //                   </Text>
// // // //                 </XStack>
// // // //               </YStack>
// // // //             </YStack>
// // // //           </Card>

// // // //           {/* CSV FORMAT GUIDE */}
// // // //           <Card backgroundColor="#1A1A1A" p={16} borderRadius={12}>
// // // //             <YStack space={12}>
// // // //               <XStack ai="center" space={12}>
// // // //                 <FileText size={20} color="#F59E0B" />
// // // //                 <Text color="white" fontSize={14} fontWeight="700">
// // // //                   CSV Format Guide
// // // //                 </Text>
// // // //               </XStack>
              
// // // //               <Text color="#666666" fontSize={12}>
// // // //                 Your CSV should include these columns:
// // // //               </Text>
              
// // // //               <View style={{ backgroundColor: '#222222', padding: 12, borderRadius: 8 }}>
// // // //                 <Text color="#EAB308" fontSize={11} fontFamily="monospace">
// // // //                   date,amount,description,category,merchant
// // // //                 </Text>
// // // //                 <Text color="#666666" fontSize={11} mt={4}>
// // // //                   Example: 2024-01-15,125.50,Grocery Store,Groceries,Whole Foods
// // // //                 </Text>
// // // //               </View>
              
// // // //               <Text color="#666666" fontSize={11}>
// // // //                 • Date format: YYYY-MM-DD
// // // //               </Text>
// // // //               <Text color="#666666" fontSize={11}>
// // // //                 • Amount: Positive numbers (system detects income/expense)
// // // //               </Text>
// // // //               <Text color="#666666" fontSize={11}>
// // // //                 • Category: Should match your budget categories
// // // //               </Text>
// // // //               <Text color="#666666" fontSize={11}>
// // // //                 • Supported formats: .csv, .xls, .xlsx
// // // //               </Text>
// // // //             </YStack>
// // // //           </Card>
          
// // // //           {/* DEBUG INFO (optional - remove in production) */}
// // // //           {__DEV__ && selectedFile && (
// // // //             <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mt={16}>
// // // //               <Text color="#F59E0B" fontSize={12} fontWeight="700" mb={8}>
// // // //                 Debug Info
// // // //               </Text>
// // // //               <Text color="#666666" fontSize={10} fontFamily="monospace">
// // // //                 URI: {selectedFile.uri.substring(0, 50)}...
// // // //               </Text>
// // // //               <Text color="#666666" fontSize={10} fontFamily="monospace">
// // // //                 Type: {selectedFile.type}
// // // //               </Text>
// // // //             </Card>
// // // //           )}
// // // //         </ScrollView>

// // // //         {/* MANUAL ENTRY MODAL */}
// // // //         <Modal
// // // //           visible={showManualModal}
// // // //           animationType="slide"
// // // //           transparent={true}
// // // //           onRequestClose={() => {
// // // //             setShowManualModal(false);
// // // //             resetForm();
// // // //           }}
// // // //         >
// // // //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
// // // //             <View style={{ 
// // // //               backgroundColor: '#1A1A1A', 
// // // //               borderTopLeftRadius: 24, 
// // // //               borderTopRightRadius: 24, 
// // // //               padding: 24, 
// // // //               paddingBottom: insets.bottom + 24,
// // // //               maxHeight: '90%'
// // // //             }}>
// // // //               <XStack jc="space-between" ai="center" mb={24}>
// // // //                 <H4 color="white" fontWeight="800" fontSize={20}>
// // // //                   Add Manual Transaction
// // // //                 </H4>
// // // //                 <TouchableOpacity 
// // // //                   onPress={() => {
// // // //                     setShowManualModal(false);
// // // //                     resetForm();
// // // //                   }}
// // // //                   style={{ padding: 8 }}
// // // //                 >
// // // //                   <X size={24} color="#666666" />
// // // //                 </TouchableOpacity>
// // // //               </XStack>

// // // //               <ScrollView showsVerticalScrollIndicator={false}>
// // // //                 <YStack space={20}>
// // // //                   {/* Transaction Type */}
// // // //                   <YStack>
// // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // //                       Type *
// // // //                     </Text>
// // // //                     <View style={{ flexDirection: 'row', gap: 8 }}>
// // // //                       {transactionTypes.map(type => (
// // // //                         <TouchableOpacity
// // // //                           key={type.value}
// // // //                           onPress={() => setFormData(prev => ({ ...prev, transaction_type: type.value }))}
// // // //                           style={{
// // // //                             flex: 1,
// // // //                             flexDirection: 'row',
// // // //                             alignItems: 'center',
// // // //                             justifyContent: 'center',
// // // //                             paddingHorizontal: 12,
// // // //                             paddingVertical: 12,
// // // //                             backgroundColor: formData.transaction_type === type.value ? type.color + '20' : '#333333',
// // // //                             borderRadius: 8,
// // // //                             borderWidth: 1,
// // // //                             borderColor: formData.transaction_type === type.value ? type.color : '#444444',
// // // //                           }}
// // // //                         >
// // // //                           {React.cloneElement(type.icon, { 
// // // //                             size: 14,
// // // //                             color: formData.transaction_type === type.value ? type.color : '#666666'
// // // //                           })}
// // // //                           <Text 
// // // //                             color={formData.transaction_type === type.value ? type.color : '#666666'} 
// // // //                             fontSize={12} 
// // // //                             fontWeight="700"
// // // //                             ml={6}
// // // //                           >
// // // //                             {type.label}
// // // //                           </Text>
// // // //                         </TouchableOpacity>
// // // //                       ))}
// // // //                     </View>
// // // //                   </YStack>

// // // //                   {/* Amount */}
// // // //                   <YStack>
// // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // //                       Amount *
// // // //                     </Text>
// // // //                     <Input
// // // //                       placeholder="0.00"
// // // //                       value={formData.amount}
// // // //                       onChangeText={(text) => setFormData(prev => ({ ...prev, amount: text }))}
// // // //                       backgroundColor="#333333"
// // // //                       borderColor="#444444"
// // // //                       color="white"
// // // //                       placeholderTextColor="#666666"
// // // //                       keyboardType="decimal-pad"
// // // //                       fontSize={16}
// // // //                       br={8}
// // // //                       prefix={<Text color="#666666" mr={8}>$</Text>}
// // // //                     />
// // // //                   </YStack>

// // // //                   {/* Description */}
// // // //                   <YStack>
// // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // //                       Description *
// // // //                     </Text>
// // // //                     <Input
// // // //                       placeholder="e.g., Grocery shopping, Salary, Restaurant bill"
// // // //                       value={formData.description}
// // // //                       onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
// // // //                       backgroundColor="#333333"
// // // //                       borderColor="#444444"
// // // //                       color="white"
// // // //                       placeholderTextColor="#666666"
// // // //                       fontSize={16}
// // // //                       br={8}
// // // //                     />
// // // //                   </YStack>

// // // //                   {/* Category */}
// // // //                   <YStack>
// // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // //                       Category
// // // //                     </Text>
// // // //                     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
// // // //                       <XStack space={8}>
// // // //                         {categories.slice(0, 8).map(category => (
// // // //                           <TouchableOpacity
// // // //                             key={category}
// // // //                             onPress={() => setFormData(prev => ({ ...prev, category: category }))}
// // // //                             style={{
// // // //                               paddingHorizontal: 12,
// // // //                               paddingVertical: 8,
// // // //                               backgroundColor: formData.category === category ? '#EAB30820' : '#333333',
// // // //                               borderRadius: 20,
// // // //                               borderWidth: 1,
// // // //                               borderColor: formData.category === category ? '#EAB308' : '#444444',
// // // //                             }}
// // // //                           >
// // // //                             <Text 
// // // //                               color={formData.category === category ? '#EAB308' : '#666666'} 
// // // //                               fontSize={12} 
// // // //                               fontWeight="700"
// // // //                             >
// // // //                               {category}
// // // //                             </Text>
// // // //                           </TouchableOpacity>
// // // //                         ))}
// // // //                       </XStack>
// // // //                     </ScrollView>
// // // //                     <Input
// // // //                       placeholder="Or enter custom category"
// // // //                       value={formData.category}
// // // //                       onChangeText={(text) => setFormData(prev => ({ ...prev, category: text }))}
// // // //                       backgroundColor="#333333"
// // // //                       borderColor="#444444"
// // // //                       color="white"
// // // //                       placeholderTextColor="#666666"
// // // //                       fontSize={14}
// // // //                       br={8}
// // // //                       mt={8}
// // // //                     />
// // // //                   </YStack>

// // // //                   {/* Merchant */}
// // // //                   <YStack>
// // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // //                       Merchant
// // // //                     </Text>
// // // //                     <Input
// // // //                       placeholder="e.g., Amazon, Walmart, Restaurant name"
// // // //                       value={formData.merchant}
// // // //                       onChangeText={(text) => setFormData(prev => ({ ...prev, merchant: text }))}
// // // //                       backgroundColor="#333333"
// // // //                       borderColor="#444444"
// // // //                       color="white"
// // // //                       placeholderTextColor="#666666"
// // // //                       fontSize={16}
// // // //                       br={8}
// // // //                     />
// // // //                   </YStack>

// // // //                   {/* Date */}
// // // //                   <YStack>
// // // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // // //                       Date
// // // //                     </Text>
// // // //                     <TouchableOpacity
// // // //                       onPress={() => setShowDatePicker(true)}
// // // //                       style={{
// // // //                         backgroundColor: '#333333',
// // // //                         borderWidth: 1,
// // // //                         borderColor: '#444444',
// // // //                         borderRadius: 8,
// // // //                         padding: 16,
// // // //                       }}
// // // //                     >
// // // //                       <XStack ai="center" space={12}>
// // // //                         <Calendar size={16} color="#666666" />
// // // //                         <Text color="white" fontSize={16}>
// // // //                           {formatDate(formData.date)} • {formatTime(formData.date)}
// // // //                         </Text>
// // // //                       </XStack>
// // // //                     </TouchableOpacity>
// // // //                   </YStack>

// // // //                   {/* Submit Button */}
// // // //                   <TouchableOpacity
// // // //                     onPress={handleManualSubmit}
// // // //                     disabled={loading || !formData.amount || !formData.description}
// // // //                     style={{
// // // //                       backgroundColor: '#EAB308',
// // // //                       padding: 16,
// // // //                       borderRadius: 12,
// // // //                       alignItems: 'center',
// // // //                       marginTop: 8,
// // // //                       opacity: (loading || !formData.amount || !formData.description) ? 0.7 : 1,
// // // //                     }}
// // // //                   >
// // // //                     {loading ? (
// // // //                       <Spinner size="small" color="black" />
// // // //                     ) : (
// // // //                       <Text color="black" fontSize={16} fontWeight="800">
// // // //                         Add Transaction
// // // //                       </Text>
// // // //                     )}
// // // //                   </TouchableOpacity>
// // // //                 </YStack>
// // // //               </ScrollView>
// // // //             </View>
// // // //           </View>
// // // //         </Modal>

// // // //         {/* DATE PICKER */}
// // // //         {showDatePicker && (
// // // //           <DateTimePicker
// // // //             value={formData.date}
// // // //             mode="datetime"
// // // //             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// // // //             onChange={onDateChange}
// // // //             maximumDate={new Date()}
// // // //           />
// // // //         )}
// // // //       </SafeAreaView>
// // // //     </Theme>
// // // //   );
// // // // }




// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import {
// // //   ScrollView,
// // //   TouchableOpacity,
// // //   Alert,
// // //   View,
// // //   Platform,
// // //   Modal
// // // } from 'react-native';
// // // import {
// // //   YStack,
// // //   XStack,
// // //   Text,
// // //   H2,
// // //   H4,
// // //   Theme,
// // //   Spinner,
// // //   Card,
// // //   Input,
// // //   Button
// // // } from 'tamagui';
// // // import {
// // //   ArrowLeft,
// // //   Upload,
// // //   FileText,
// // //   DollarSign,
// // //   Calendar,
// // //   Tag,
// // //   Building,
// // //   Plus,
// // //   X,
// // //   CheckCircle,
// // //   AlertTriangle,
// // //   Clock,
// // //   RefreshCw,
// // //   Smartphone,
// // //   Shield,
// // //   Zap,
// // //   CreditCard,
// // //   Wallet,
// // //   TrendingUp,
// // //   Home,
// // //   Briefcase,
// // //   Percent,
// // //   Circle,
// // //   Check
// // // } from '@tamagui/lucide-icons';
// // // import { useRouter, useFocusEffect } from 'expo-router';
// // // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // // import * as DocumentPicker from 'expo-document-picker';
// // // import DateTimePicker from '@react-native-community/datetimepicker';

// // // // Services
// // // import { ApiService } from '../services/apiService';

// // // export default function Ingest() {
// // //   const router = useRouter();
// // //   const insets = useSafeAreaInsets();
  
// // //   // State
// // //   const [loading, setLoading] = useState(false);
// // //   const [showManualModal, setShowManualModal] = useState(false);
// // //   const [showDatePicker, setShowDatePicker] = useState(false);
// // //   const [processingFile, setProcessingFile] = useState(false);
// // //   const [selectedFile, setSelectedFile] = useState(null);
// // //   const [uploadProgress, setUploadProgress] = useState(0);
// // //   const [uploadComplete, setUploadComplete] = useState(false);
  
// // //   // Manual transaction form state
// // //   const [formData, setFormData] = useState({
// // //     amount: '',
// // //     description: '',
// // //     category: '',
// // //     merchant: '',
// // //     date: new Date(),
// // //     source_type: 'manual',
// // //     transaction_type: 'expense'
// // //   });

// // //   // Transaction types
// // //   const transactionTypes = [
// // //     { value: 'expense', label: 'Expense', icon: <DollarSign size={16} />, color: '#EF4444' },
// // //     { value: 'income', label: 'Income', icon: <TrendingUp size={16} />, color: '#22C55E' },
// // //     { value: 'investment', label: 'Investment', icon: <Percent size={16} />, color: '#8B5CF6' }
// // //   ];

// // //   // Categories based on your budgets
// // //   const categories = [
// // //     'Eating out', 'Eating', 'Eat', 'Dining', 'Daily Food', 
// // //     'Shopping', 'Cycle', 'Hike', 'Groceries', 'Transportation',
// // //     'Entertainment', 'Healthcare', 'Housing', 'Utilities', 
// // //     'Education', 'Health & Fitness', 'Food & Drink', 'Other'
// // //   ];

// // //   // Reset form
// // //   const resetForm = () => {
// // //     setFormData({
// // //       amount: '',
// // //       description: '',
// // //       category: '',
// // //       merchant: '',
// // //       date: new Date(),
// // //       source_type: 'manual',
// // //       transaction_type: 'expense'
// // //     });
// // //   };

// // //   // Reset CSV upload state
// // //   const resetCSVState = () => {
// // //     setSelectedFile(null);
// // //     setUploadProgress(0);
// // //     setUploadComplete(false);
// // //   };

// // //   // Handle CSV file selection
// // //   const handleSelectCSV = async () => {
// // //     try {
// // //       // Reset state
// // //       resetCSVState();
      
// // //       const result = await DocumentPicker.getDocumentAsync({
// // //         type: ['text/csv', 'application/vnd.ms-excel', 'text/comma-separated-values'],
// // //         copyToCacheDirectory: true,
// // //       });

// // //       console.log('Document picker result:', result);

// // //       if (result.assets && result.assets.length > 0) {
// // //         const file = result.assets[0];
// // //         setSelectedFile({
// // //           name: file.name,
// // //           uri: file.uri,
// // //           size: file.size,
// // //           type: file.mimeType || 'text/csv'
// // //         });
        
// // //         // Show immediate feedback
// // //         Alert.alert(
// // //           'File Selected',
// // //           `Selected: ${file.name}\n\nTap "Upload & Process" to import transactions.`,
// // //           [
// // //             { text: 'Cancel', style: 'cancel', onPress: resetCSVState },
// // //             { 
// // //               text: 'Upload & Process', 
// // //               onPress: () => handleCSVUpload(file)
// // //             }
// // //           ]
// // //         );
// // //       } else if (result.canceled) {
// // //         console.log('User cancelled file selection');
// // //       }
// // //     } catch (error) {
// // //       console.error('Document picker error:', error);
// // //       Alert.alert('Error', 'Failed to select file. Please try again.');
// // //     }
// // //   };

// // //   // Handle CSV file upload and processing
// // //   const handleCSVUpload = async (file) => {
// // //     try {
// // //       setProcessingFile(true);
// // //       setUploadProgress(10);
      
// // //       console.log('Starting CSV upload:', file.name);
// // //       console.log('File URI:', file.uri);
// // //       console.log('File size:', file.size);

// // //       // Create FormData
// // //       const formData = new FormData();
      
// // //       // For React Native, we need to create a proper file object
// // //       formData.append('file', {
// // //         uri: file.uri,
// // //         type: file.mimeType || 'text/csv',
// // //         name: file.name,
// // //       });
      
// // //       setUploadProgress(30);

// // //       console.log('FormData created, calling API...');

// // //       // Get auth token from your storage
// // //       const token = await getAuthToken(); // You need to implement this
      
// // //       // Call your API endpoint for CSV upload
// // //       const response = await fetch('http://127.0.0.1:8000/api/v1/ingest/csv/', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Accept': 'application/json',
// // //         },
// // //         body: formData,
// // //       });

// // //       setUploadProgress(70);

// // //       console.log('API Response status:', response.status);

// // //       if (!response.ok) {
// // //         const errorData = await response.json();
// // //         console.log('Error response:', errorData);
// // //         throw new Error(errorData.detail || `Upload failed with status ${response.status}`);
// // //       }

// // //       const responseData = await response.json();
// // //       setUploadProgress(100);
// // //       setUploadComplete(true);
      
// // //       console.log('CSV upload successful:', responseData);

// // //       Alert.alert(
// // //         'Success!',
// // //         `CSV file processed successfully!\n\nTransactions are being imported.`,
// // //         [
// // //           { 
// // //             text: 'View Transactions', 
// // //             onPress: () => router.push('/transactions')
// // //           },
// // //           { 
// // //             text: 'OK', 
// // //             style: 'default',
// // //             onPress: resetCSVState
// // //           }
// // //         ]
// // //       );
      
// // //     } catch (error) {
// // //       console.error('CSV upload error:', error);
// // //       console.error('Error details:', error.message);
      
// // //       let errorMessage = 'Failed to upload CSV file';
      
// // //       if (error.message.includes('Network request failed')) {
// // //         errorMessage = 'Network error. Please check your connection and server URL.';
// // //       } else if (error.message.includes('Failed to fetch')) {
// // //         errorMessage = 'Cannot connect to server. Make sure your backend is running at http://127.0.0.1:8000';
// // //       } else {
// // //         errorMessage = error.message;
// // //       }
      
// // //       Alert.alert(
// // //         'Upload Failed',
// // //         errorMessage,
// // //         [
// // //           { 
// // //             text: 'Try Again', 
// // //             onPress: () => handleSelectCSV() 
// // //           },
// // //           { 
// // //             text: 'Cancel', 
// // //             style: 'cancel',
// // //             onPress: resetCSVState
// // //           }
// // //         ]
// // //       );
// // //     } finally {
// // //       setProcessingFile(false);
// // //     }
// // //   };

// // //   // Helper function to get auth token (implement based on your auth system)
// // //   const getAuthToken = async () => {
// // //     // Replace with your actual token retrieval logic
// // //     // Example: return await AsyncStorage.getItem('auth_token');
// // //     return 'eyJhbGciOiJIUzI1NiIsImtpZCI6InQvOFY1MTFpcVVYTXhZNDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2l3b213eXNnZXJyc3F0Z3NmdnViLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJkMzZhNzAyYS0xZDkxLTRlYWMtYTEwNy0zMjg4ZGQxNDVjYWYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzY3ODkxNTIwLCJpYXQiOjE3Njc4ODc5MjAsImVtYWlsIjoiYXRoYXJ2YXBhcmRlc2hpNDkwNkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiYXRoYXJ2YXBhcmRlc2hpNDkwNkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiJkMzZhNzAyYS0xZDkxLTRlYWMtYTEwNy0zMjg4ZGQxNDVjYWYifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc2Nzg4NzkyMH1dLCJzZXNzaW9uX2lkIjoiZDZjMjJmOWQtZTI5OC00NzBkLTg4NWQtMGY4Njk5YmIwM2U0IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.PPDkfwoQsFd2r1ChkAtt6UNUt3mcCki-RhexH_QJjEs';
// // //   };

// // //   // Handle manual transaction submission
// // //   const handleManualSubmit = async () => {
// // //     try {
// // //       if (!formData.amount || !formData.description) {
// // //         Alert.alert('Error', 'Please fill amount and description');
// // //         return;
// // //       }

// // //       setLoading(true);

// // //       const transactionData = {
// // //         amount: parseFloat(formData.amount),
// // //         description: formData.description.trim(),
// // //         category: formData.category || 'Other',
// // //         merchant: formData.merchant || '',
// // //         date: formData.date.toISOString(),
// // //         source_type: 'manual',
// // //         transaction_type: formData.transaction_type,
// // //         status: 'completed'
// // //       };

// // //       // Call your API endpoint for manual transactions
// // //       const response = await ApiService.post('/transactions/', transactionData);

// // //       Alert.alert('Success', 'Transaction added successfully');
// // //       setShowManualModal(false);
// // //       resetForm();
      
// // //     } catch (error) {
// // //       console.error('Manual transaction error:', error);
// // //       let errorMessage = 'Failed to add transaction';
      
// // //       if (error.response?.data?.detail) {
// // //         errorMessage = error.response.data.detail;
// // //       } else if (error.response?.status === 422) {
// // //         errorMessage = 'Invalid data. Please check the values.';
// // //       }
      
// // //       Alert.alert('Error', errorMessage);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Handle date change
// // //   const onDateChange = (event, selectedDate) => {
// // //     setShowDatePicker(Platform.OS === 'ios');
// // //     if (selectedDate) {
// // //       setFormData(prev => ({ ...prev, date: selectedDate }));
// // //     }
// // //   };

// // //   const formatDate = (date) => {
// // //     return date.toLocaleDateString('en-IN', {
// // //       day: 'numeric',
// // //       month: 'short',
// // //       year: 'numeric'
// // //     });
// // //   };

// // //   const formatTime = (date) => {
// // //     return date.toLocaleTimeString('en-IN', {
// // //       hour: '2-digit',
// // //       minute: '2-digit'
// // //     });
// // //   };

// // //   const formatFileSize = (bytes) => {
// // //     if (!bytes) return 'Unknown size';
// // //     if (bytes === 0) return '0 Bytes';
// // //     const k = 1024;
// // //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// // //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// // //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// // //   };

// // //   return (
// // //     <Theme name="dark">
// // //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// // //         {/* HEADER */}
// // //         <XStack p={20} ai="center" space={16}>
// // //           <TouchableOpacity onPress={() => router.back()}>
// // //             <ArrowLeft size={24} color="#EAB308" />
// // //           </TouchableOpacity>
          
// // //           <YStack flex={1}>
// // //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
// // //               Add Transactions
// // //             </H2>
// // //             <Text color="#666666" fontSize={14}>
// // //               Manual entry or bulk import
// // //             </Text>
// // //           </YStack>
// // //         </XStack>

// // //         {/* MAIN ACTIONS */}
// // //         <ScrollView 
// // //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}
// // //           showsVerticalScrollIndicator={false}
// // //         >
// // //           {/* QUICK ACTIONS */}
// // //           <YStack space={16} mb={24}>
// // //             <Text color="#EAB308" fontSize={16} fontWeight="800">
// // //               QUICK ACTIONS
// // //             </Text>
            
// // //             {/* Manual Entry Card */}
// // //             <TouchableOpacity onPress={() => setShowManualModal(true)}>
// // //               <Card backgroundColor="#1A1A1A" p={20} borderRadius={12} borderWidth={1} borderColor="#333333">
// // //                 <XStack ai="center" space={16}>
// // //                   <View style={{
// // //                     width: 52,
// // //                     height: 52,
// // //                     borderRadius: 16,
// // //                     backgroundColor: '#EAB30820',
// // //                     justifyContent: 'center',
// // //                     alignItems: 'center',
// // //                   }}>
// // //                     <Plus size={24} color="#EAB308" />
// // //                   </View>
                  
// // //                   <YStack flex={1}>
// // //                     <Text color="white" fontWeight="800" fontSize={18}>
// // //                       Manual Entry
// // //                     </Text>
// // //                     <Text color="#666666" fontSize={13} mt={2}>
// // //                       Add single transaction with details
// // //                     </Text>
// // //                   </YStack>
                  
// // //                   <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
// // //                 </XStack>
// // //               </Card>
// // //             </TouchableOpacity>

// // //             {/* CSV Import Card */}
// // //             <TouchableOpacity onPress={handleSelectCSV} disabled={processingFile}>
// // //               <Card 
// // //                 backgroundColor="#1A1A1A" 
// // //                 p={20} 
// // //                 borderRadius={12} 
// // //                 borderWidth={1} 
// // //                 borderColor="#333333"
// // //                 opacity={processingFile ? 0.7 : 1}
// // //               >
// // //                 <XStack ai="center" space={16}>
// // //                   <View style={{
// // //                     width: 52,
// // //                     height: 52,
// // //                     borderRadius: 16,
// // //                     backgroundColor: '#22C55E20',
// // //                     justifyContent: 'center',
// // //                     alignItems: 'center',
// // //                   }}>
// // //                     {processingFile ? (
// // //                       <Spinner size={24} color="#22C55E" />
// // //                     ) : uploadComplete ? (
// // //                       <Check size={24} color="#22C55E" />
// // //                     ) : (
// // //                       <Upload size={24} color="#22C55E" />
// // //                     )}
// // //                   </View>
                  
// // //                   <YStack flex={1}>
// // //                     <Text color="white" fontWeight="800" fontSize={18}>
// // //                       CSV Import
// // //                     </Text>
// // //                     <Text color="#666666" fontSize={13} mt={2}>
// // //                       {processingFile ? `Uploading... ${uploadProgress}%` : 
// // //                        uploadComplete ? 'Upload Complete!' : 
// // //                        selectedFile ? `Selected: ${selectedFile.name}` : 
// // //                        'Upload bank statement CSV'}
// // //                     </Text>
                    
// // //                     {selectedFile && !processingFile && !uploadComplete && (
// // //                       <Text color="#666666" fontSize={11} mt={4}>
// // //                         Tap to upload and process
// // //                       </Text>
// // //                     )}
                    
// // //                     {processingFile && (
// // //                       <View style={{ marginTop: 8 }}>
// // //                         <View style={{
// // //                           height: 4,
// // //                           backgroundColor: '#333333',
// // //                           borderRadius: 2,
// // //                           overflow: 'hidden',
// // //                         }}>
// // //                           <View style={{
// // //                             width: `${uploadProgress}%`,
// // //                             height: '100%',
// // //                             backgroundColor: '#22C55E',
// // //                             borderRadius: 2,
// // //                           }} />
// // //                         </View>
// // //                       </View>
// // //                     )}
// // //                   </YStack>
                  
// // //                   <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
// // //                 </XStack>
// // //               </Card>
// // //             </TouchableOpacity>

// // //             {/* Selected File Info */}
// // //             {selectedFile && !processingFile && !uploadComplete && (
// // //               <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} borderLeftWidth={4} borderLeftColor="#22C55E">
// // //                 <YStack>
// // //                   <XStack ai="center" space={12} mb={12}>
// // //                     <FileText size={20} color="#22C55E" />
// // //                     <YStack flex={1}>
// // //                       <Text color="white" fontSize={14} fontWeight="700">
// // //                         {selectedFile.name}
// // //                       </Text>
// // //                       <Text color="#666666" fontSize={12}>
// // //                         {formatFileSize(selectedFile.size)}
// // //                       </Text>
// // //                     </YStack>
// // //                   </XStack>
                  
// // //                   <XStack space={8}>
// // //                     <TouchableOpacity
// // //                       onPress={() => handleCSVUpload(selectedFile)}
// // //                       style={{
// // //                         flex: 1,
// // //                         backgroundColor: '#22C55E',
// // //                         paddingVertical: 12,
// // //                         borderRadius: 8,
// // //                         alignItems: 'center',
// // //                         flexDirection: 'row',
// // //                         justifyContent: 'center',
// // //                       }}
// // //                     >
// // //                       <Upload size={16} color="white" mr={8} />
// // //                       <Text color="white" fontSize={14} fontWeight="700">
// // //                         Upload & Process
// // //                       </Text>
// // //                     </TouchableOpacity>
                    
// // //                     <TouchableOpacity
// // //                       onPress={resetCSVState}
// // //                       style={{
// // //                         padding: 12,
// // //                         backgroundColor: '#333333',
// // //                         borderRadius: 8,
// // //                         alignItems: 'center',
// // //                         justifyContent: 'center',
// // //                       }}
// // //                     >
// // //                       <X size={16} color="#666666" />
// // //                     </TouchableOpacity>
// // //                   </XStack>
// // //                 </YStack>
// // //               </Card>
// // //             )}
// // //           </YStack>

// // //           {/* INSTRUCTIONS */}
// // //           <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mb={24}>
// // //             <YStack space={12}>
// // //               <XStack ai="center" space={12}>
// // //                 <Shield size={20} color="#3B82F6" />
// // //                 <Text color="white" fontSize={14} fontWeight="700">
// // //                   How to add transactions
// // //                 </Text>
// // //               </XStack>
              
// // //               <YStack space={8}>
// // //                 <XStack ai="center" space={8}>
// // //                   <Circle size={6} bg="#22C55E" />
// // //                   <Text color="#666666" fontSize={12}>
// // //                     <Text color="white" fontWeight="600">Manual Entry:</Text> For single transactions
// // //                   </Text>
// // //                 </XStack>
                
// // //                 <XStack ai="center" space={8}>
// // //                   <Circle size={6} bg="#22C55E" />
// // //                   <Text color="#666666" fontSize={12}>
// // //                     <Text color="white" fontWeight="600">CSV Import:</Text> For bulk upload from bank statements
// // //                   </Text>
// // //                 </XStack>
                
// // //                 <XStack ai="center" space={8}>
// // //                   <Circle size={6} bg="#22C55E" />
// // //                   <Text color="#666666" fontSize={12}>
// // //                     <Text color="white" fontWeight="600">Auto-sync:</Text> Coming soon (SMS, notifications)
// // //                   </Text>
// // //                 </XStack>
// // //               </YStack>
// // //             </YStack>
// // //           </Card>

// // //           {/* CSV FORMAT GUIDE */}
// // //           <Card backgroundColor="#1A1A1A" p={16} borderRadius={12}>
// // //             <YStack space={12}>
// // //               <XStack ai="center" space={12}>
// // //                 <FileText size={20} color="#F59E0B" />
// // //                 <Text color="white" fontSize={14} fontWeight="700">
// // //                   CSV Format Guide
// // //                 </Text>
// // //               </XStack>
              
// // //               <Text color="#666666" fontSize={12}>
// // //                 Your CSV should include these columns:
// // //               </Text>
              
// // //               <View style={{ backgroundColor: '#222222', padding: 12, borderRadius: 8 }}>
// // //                 <Text color="#EAB308" fontSize={11} fontFamily="monospace">
// // //                   date,amount,description,category,merchant
// // //                 </Text>
// // //                 <Text color="#666666" fontSize={11} mt={4}>
// // //                   Example: 2024-01-15,125.50,Grocery Store,Groceries,Whole Foods
// // //                 </Text>
// // //               </View>
              
// // //               <Text color="#666666" fontSize={11}>
// // //                 • Date format: YYYY-MM-DD
// // //               </Text>
// // //               <Text color="#666666" fontSize={11}>
// // //                 • Amount: Positive numbers (system detects income/expense)
// // //               </Text>
// // //               <Text color="#666666" fontSize={11}>
// // //                 • Category: Should match your budget categories
// // //               </Text>
// // //               <Text color="#666666" fontSize={11}>
// // //                 • Supported formats: .csv, .xls, .xlsx
// // //               </Text>
// // //             </YStack>
// // //           </Card>
          
// // //           {/* DEBUG INFO (optional - remove in production) */}
// // //           {__DEV__ && selectedFile && (
// // //             <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mt={16}>
// // //               <Text color="#F59E0B" fontSize={12} fontWeight="700" mb={8}>
// // //                 Debug Info
// // //               </Text>
// // //               <Text color="#666666" fontSize={10} fontFamily="monospace">
// // //                 URI: {selectedFile.uri}
// // //               </Text>
// // //               <Text color="#666666" fontSize={10} fontFamily="monospace">
// // //                 Type: {selectedFile.type}
// // //               </Text>
// // //               <Text color="#666666" fontSize={10} fontFamily="monospace">
// // //                 Size: {selectedFile.size} bytes
// // //               </Text>
// // //             </Card>
// // //           )}
// // //         </ScrollView>

// // //         {/* MANUAL ENTRY MODAL */}
// // //         <Modal
// // //           visible={showManualModal}
// // //           animationType="slide"
// // //           transparent={true}
// // //           onRequestClose={() => {
// // //             setShowManualModal(false);
// // //             resetForm();
// // //           }}
// // //         >
// // //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
// // //             <View style={{ 
// // //               backgroundColor: '#1A1A1A', 
// // //               borderTopLeftRadius: 24, 
// // //               borderTopRightRadius: 24, 
// // //               padding: 24, 
// // //               paddingBottom: insets.bottom + 24,
// // //               maxHeight: '90%'
// // //             }}>
// // //               <XStack jc="space-between" ai="center" mb={24}>
// // //                 <H4 color="white" fontWeight="800" fontSize={20}>
// // //                   Add Manual Transaction
// // //                 </H4>
// // //                 <TouchableOpacity 
// // //                   onPress={() => {
// // //                     setShowManualModal(false);
// // //                     resetForm();
// // //                   }}
// // //                   style={{ padding: 8 }}
// // //                 >
// // //                   <X size={24} color="#666666" />
// // //                 </TouchableOpacity>
// // //               </XStack>

// // //               <ScrollView showsVerticalScrollIndicator={false}>
// // //                 <YStack space={20}>
// // //                   {/* Transaction Type */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Type *
// // //                     </Text>
// // //                     <View style={{ flexDirection: 'row', gap: 8 }}>
// // //                       {transactionTypes.map(type => (
// // //                         <TouchableOpacity
// // //                           key={type.value}
// // //                           onPress={() => setFormData(prev => ({ ...prev, transaction_type: type.value }))}
// // //                           style={{
// // //                             flex: 1,
// // //                             flexDirection: 'row',
// // //                             alignItems: 'center',
// // //                             justifyContent: 'center',
// // //                             paddingHorizontal: 12,
// // //                             paddingVertical: 12,
// // //                             backgroundColor: formData.transaction_type === type.value ? type.color + '20' : '#333333',
// // //                             borderRadius: 8,
// // //                             borderWidth: 1,
// // //                             borderColor: formData.transaction_type === type.value ? type.color : '#444444',
// // //                           }}
// // //                         >
// // //                           {React.cloneElement(type.icon, { 
// // //                             size: 14,
// // //                             color: formData.transaction_type === type.value ? type.color : '#666666'
// // //                           })}
// // //                           <Text 
// // //                             color={formData.transaction_type === type.value ? type.color : '#666666'} 
// // //                             fontSize={12} 
// // //                             fontWeight="700"
// // //                             ml={6}
// // //                           >
// // //                             {type.label}
// // //                           </Text>
// // //                         </TouchableOpacity>
// // //                       ))}
// // //                     </View>
// // //                   </YStack>

// // //                   {/* Amount */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Amount *
// // //                     </Text>
// // //                     <Input
// // //                       placeholder="0.00"
// // //                       value={formData.amount}
// // //                       onChangeText={(text) => setFormData(prev => ({ ...prev, amount: text }))}
// // //                       backgroundColor="#333333"
// // //                       borderColor="#444444"
// // //                       color="white"
// // //                       placeholderTextColor="#666666"
// // //                       keyboardType="decimal-pad"
// // //                       fontSize={16}
// // //                       br={8}
// // //                       prefix={<Text color="#666666" mr={8}>$</Text>}
// // //                     />
// // //                   </YStack>

// // //                   {/* Description */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Description *
// // //                     </Text>
// // //                     <Input
// // //                       placeholder="e.g., Grocery shopping, Salary, Restaurant bill"
// // //                       value={formData.description}
// // //                       onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
// // //                       backgroundColor="#333333"
// // //                       borderColor="#444444"
// // //                       color="white"
// // //                       placeholderTextColor="#666666"
// // //                       fontSize={16}
// // //                       br={8}
// // //                     />
// // //                   </YStack>

// // //                   {/* Category */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Category
// // //                     </Text>
// // //                     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
// // //                       <XStack space={8}>
// // //                         {categories.slice(0, 8).map(category => (
// // //                           <TouchableOpacity
// // //                             key={category}
// // //                             onPress={() => setFormData(prev => ({ ...prev, category: category }))}
// // //                             style={{
// // //                               paddingHorizontal: 12,
// // //                               paddingVertical: 8,
// // //                               backgroundColor: formData.category === category ? '#EAB30820' : '#333333',
// // //                               borderRadius: 20,
// // //                               borderWidth: 1,
// // //                               borderColor: formData.category === category ? '#EAB308' : '#444444',
// // //                             }}
// // //                           >
// // //                             <Text 
// // //                               color={formData.category === category ? '#EAB308' : '#666666'} 
// // //                               fontSize={12} 
// // //                               fontWeight="700"
// // //                             >
// // //                               {category}
// // //                             </Text>
// // //                           </TouchableOpacity>
// // //                         ))}
// // //                       </XStack>
// // //                     </ScrollView>
// // //                     <Input
// // //                       placeholder="Or enter custom category"
// // //                       value={formData.category}
// // //                       onChangeText={(text) => setFormData(prev => ({ ...prev, category: text }))}
// // //                       backgroundColor="#333333"
// // //                       borderColor="#444444"
// // //                       color="white"
// // //                       placeholderTextColor="#666666"
// // //                       fontSize={14}
// // //                       br={8}
// // //                       mt={8}
// // //                     />
// // //                   </YStack>

// // //                   {/* Merchant */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Merchant
// // //                     </Text>
// // //                     <Input
// // //                       placeholder="e.g., Amazon, Walmart, Restaurant name"
// // //                       value={formData.merchant}
// // //                       onChangeText={(text) => setFormData(prev => ({ ...prev, merchant: text }))}
// // //                       backgroundColor="#333333"
// // //                       borderColor="#444444"
// // //                       color="white"
// // //                       placeholderTextColor="#666666"
// // //                       fontSize={16}
// // //                       br={8}
// // //                     />
// // //                   </YStack>

// // //                   {/* Date */}
// // //                   <YStack>
// // //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// // //                       Date
// // //                     </Text>
// // //                     <TouchableOpacity
// // //                       onPress={() => setShowDatePicker(true)}
// // //                       style={{
// // //                         backgroundColor: '#333333',
// // //                         borderWidth: 1,
// // //                         borderColor: '#444444',
// // //                         borderRadius: 8,
// // //                         padding: 16,
// // //                       }}
// // //                     >
// // //                       <XStack ai="center" space={12}>
// // //                         <Calendar size={16} color="#666666" />
// // //                         <Text color="white" fontSize={16}>
// // //                           {formatDate(formData.date)} • {formatTime(formData.date)}
// // //                         </Text>
// // //                       </XStack>
// // //                     </TouchableOpacity>
// // //                   </YStack>

// // //                   {/* Submit Button */}
// // //                   <TouchableOpacity
// // //                     onPress={handleManualSubmit}
// // //                     disabled={loading || !formData.amount || !formData.description}
// // //                     style={{
// // //                       backgroundColor: '#EAB308',
// // //                       padding: 16,
// // //                       borderRadius: 12,
// // //                       alignItems: 'center',
// // //                       marginTop: 8,
// // //                       opacity: (loading || !formData.amount || !formData.description) ? 0.7 : 1,
// // //                     }}
// // //                   >
// // //                     {loading ? (
// // //                       <Spinner size="small" color="black" />
// // //                     ) : (
// // //                       <Text color="black" fontSize={16} fontWeight="800">
// // //                         Add Transaction
// // //                       </Text>
// // //                     )}
// // //                   </TouchableOpacity>
// // //                 </YStack>
// // //               </ScrollView>
// // //             </View>
// // //           </View>
// // //         </Modal>

// // //         {/* DATE PICKER */}
// // //         {showDatePicker && (
// // //           <DateTimePicker
// // //             value={formData.date}
// // //             mode="datetime"
// // //             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// // //             onChange={onDateChange}
// // //             maximumDate={new Date()}
// // //           />
// // //         )}
// // //       </SafeAreaView>
// // //     </Theme>
// // //   );
// // // }





// // import React, { useState, useEffect, useCallback } from 'react';
// // import {
// //   ScrollView,
// //   TouchableOpacity,
// //   Alert,
// //   View,
// //   Platform,
// //   Modal
// // } from 'react-native';
// // import {
// //   YStack,
// //   XStack,
// //   Text,
// //   H2,
// //   H4,
// //   Theme,
// //   Spinner,
// //   Card,
// //   Input,
// //   Button
// // } from 'tamagui';
// // import {
// //   ArrowLeft,
// //   Upload,
// //   FileText,
// //   DollarSign,
// //   Calendar,
// //   Tag,
// //   Building,
// //   Plus,
// //   X,
// //   CheckCircle,
// //   AlertTriangle,
// //   Clock,
// //   RefreshCw,
// //   Smartphone,
// //   Shield,
// //   Zap,
// //   CreditCard,
// //   Wallet,
// //   TrendingUp,
// //   Home,
// //   Briefcase,
// //   Percent,
// //   Circle,
// //   Check,
// //   Wifi,
// //   WifiOff
// // } from '@tamagui/lucide-icons';
// // import { useRouter, useFocusEffect } from 'expo-router';
// // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// // import * as DocumentPicker from 'expo-document-picker';
// // import * as Network from 'expo-network';
// // import DateTimePicker from '@react-native-community/datetimepicker';

// // // Services
// // import { ApiService } from '../services/apiService';

// // export default function Ingest() {
// //   const router = useRouter();
// //   const insets = useSafeAreaInsets();
  
// //   // State
// //   const [loading, setLoading] = useState(false);
// //   const [showManualModal, setShowManualModal] = useState(false);
// //   const [showDatePicker, setShowDatePicker] = useState(false);
// //   const [processingFile, setProcessingFile] = useState(false);
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [uploadProgress, setUploadProgress] = useState(0);
// //   const [uploadComplete, setUploadComplete] = useState(false);
// //   const [serverStatus, setServerStatus] = useState('checking');
// //   const [backendUrl, setBackendUrl] = useState('http://10.62.17.195:8000');
  
// //   // Manual transaction form state
// //   const [formData, setFormData] = useState({
// //     amount: '',
// //     description: '',
// //     category: '',
// //     merchant: '',
// //     date: new Date(),
// //     source_type: 'manual',
// //     transaction_type: 'expense'
// //   });

// //   // Transaction types
// //   const transactionTypes = [
// //     { value: 'expense', label: 'Expense', icon: <DollarSign size={16} />, color: '#EF4444' },
// //     { value: 'income', label: 'Income', icon: <TrendingUp size={16} />, color: '#22C55E' },
// //     { value: 'investment', label: 'Investment', icon: <Percent size={16} />, color: '#8B5CF6' }
// //   ];

// //   // Categories based on your budgets
// //   const categories = [
// //     'Eating out', 'Eating', 'Eat', 'Dining', 'Daily Food', 
// //     'Shopping', 'Cycle', 'Hike', 'Groceries', 'Transportation',
// //     'Entertainment', 'Healthcare', 'Housing', 'Utilities', 
// //     'Education', 'Health & Fitness', 'Food & Drink', 'Other'
// //   ];

// //   // Check server connection
// //   const checkServerConnection = useCallback(async () => {
// //     try {
// //       setServerStatus('checking');
      
// //       // Try to ping the server
// //       const response = await fetch(`${backendUrl}/api/v1/`, {
// //         method: 'GET',
// //         headers: {
// //           'Accept': 'application/json',
// //         },
// //         timeout: 5000,
// //       });
      
// //       if (response.ok) {
// //         setServerStatus('connected');
// //       } else {
// //         setServerStatus('error');
// //       }
// //     } catch (error) {
// //       console.log('Server check failed:', error.message);
// //       setServerStatus('error');
// //     }
// //   }, [backendUrl]);

// //   useEffect(() => {
// //     checkServerConnection();
// //   }, [checkServerConnection]);

// //   // Reset form
// //   const resetForm = () => {
// //     setFormData({
// //       amount: '',
// //       description: '',
// //       category: '',
// //       merchant: '',
// //       date: new Date(),
// //       source_type: 'manual',
// //       transaction_type: 'expense'
// //     });
// //   };

// //   // In your ingest.jsx, add these helper functions at the top of the component:

// // // Test server connection
// // const testServerConnection = async (url) => {
// //   try {
// //     console.log(`Testing connection to: ${url}`);
    
// //     // Try a simple GET request to check if server is reachable
// //     const response = await fetch(`${url}/api/v1/`, {
// //       method: 'GET',
// //       headers: {
// //         'Accept': 'application/json',
// //       },
// //     });
    
// //     console.log('Connection test response:', response.status);
// //     return response.ok;
// //   } catch (error) {
// //     console.log('Connection test failed:', error.message);
// //     return false;
// //   }
// // };

// // // Get suggested URLs based on platform
// // const getSuggestedURLs = () => {
// //   const suggestions = [];
  
// //   // Android emulator options
// //   suggestions.push({
// //     label: 'Android Emulator (10.0.2.2)',
// //     url: 'http://10.0.2.2:8000',
// //   });
  
// //   suggestions.push({
// //     label: 'Android Emulator (localhost via adb reverse)',
// //     url: 'http://localhost:8000',
// //   });
  
// //   // Try common local IPs
// //   suggestions.push({
// //     label: 'Local Network (192.168.x.x)',
// //     url: 'http://192.168.1.100:8000', // You'll need to find your actual IP
// //   });
  
// //   return suggestions;
// // };

// // // In your handleCSVUpload function, add this check:

// // // Add a function to show URL selector
// // const showURLSelector = () => {
// //   const suggestions = getSuggestedURLs();
  
// //   Alert.alert(
// //     'Select Server URL',
// //     'Choose the correct URL for your setup:',
// //     [
// //       ...suggestions.map((suggestion, index) => ({
// //         text: suggestion.label,
// //         onPress: () => {
// //           setBackendUrl(suggestion.url);
// //           // Save to AsyncStorage
// //           AsyncStorage.setItem('backend_url', suggestion.url);
// //           checkServerConnection();
// //         },
// //       })),
// //       {
// //         text: 'Custom URL',
// //         onPress: () => {
// //           Alert.prompt(
// //             'Enter Custom URL',
// //             'Enter your backend server URL (include http:// and port):',
// //             [
// //               { text: 'Cancel', style: 'cancel' },
// //               {
// //                 text: 'Save',
// //                 onPress: (url) => {
// //                   if (url) {
// //                     setBackendUrl(url);
// //                     AsyncStorage.setItem('backend_url', url);
// //                     checkServerConnection();
// //                   }
// //                 },
// //               },
// //             ],
// //             'plain-text',
// //             backendUrl
// //           );
// //         },
// //       },
// //       { text: 'Cancel', style: 'cancel' },
// //     ]
// //   );
// // };

// //   // Reset CSV upload state
// //   const resetCSVState = () => {
// //     setSelectedFile(null);
// //     setUploadProgress(0);
// //     setUploadComplete(false);
// //   };

// //   // Handle CSV file selection
// //   const handleSelectCSV = async () => {
// //     try {
// //       // Check server connection first
// //       if (serverStatus !== 'connected') {
// //         Alert.alert(
// //           'Server Connection Required',
// //           'Cannot connect to backend server. Please make sure your server is running.',
// //           [
// //             { 
// //               text: 'Check Connection', 
// //               onPress: checkServerConnection 
// //             },
// //             { 
// //               text: 'Change Server URL', 
// //               onPress: () => {
// //                 Alert.prompt(
// //                   'Change Server URL',
// //                   'Enter your backend server URL:',
// //                   [
// //                     { text: 'Cancel', style: 'cancel' },
// //                     { 
// //                       text: 'Save', 
// //                       onPress: (url) => {
// //                         if (url) {
// //                           setBackendUrl(url);
// //                           checkServerConnection();
// //                         }
// //                       }
// //                     }
// //                   ],
// //                   'plain-text',
// //                   backendUrl
// //                 );
// //               }
// //             }
// //           ]
// //         );
// //         return;
// //       }

// //       // Reset state
// //       resetCSVState();
      
// //       const result = await DocumentPicker.getDocumentAsync({
// //         type: ['text/csv', 'application/vnd.ms-excel', 'text/comma-separated-values'],
// //         copyToCacheDirectory: true,
// //       });

// //       console.log('Document picker result:', result);

// //       if (result.assets && result.assets.length > 0) {
// //         const file = result.assets[0];
// //         setSelectedFile({
// //           name: file.name,
// //           uri: file.uri,
// //           size: file.size,
// //           type: file.mimeType || 'text/csv'
// //         });
        
// //         // Show immediate feedback
// //         Alert.alert(
// //           'File Selected',
// //           `Selected: ${file.name}\n\nTap "Upload & Process" to import transactions.`,
// //           [
// //             { text: 'Cancel', style: 'cancel', onPress: resetCSVState },
// //             { 
// //               text: 'Upload & Process', 
// //               onPress: () => handleCSVUpload(file)
// //             }
// //           ]
// //         );
// //       } else if (result.canceled) {
// //         console.log('User cancelled file selection');
// //       }
// //     } catch (error) {
// //       console.error('Document picker error:', error);
// //       Alert.alert('Error', 'Failed to select file. Please try again.');
// //     }
// //   };

// //   // Handle CSV file upload and processing
// //   const handleCSVUpload = async (file) => {
// //     try {
// //       setProcessingFile(true);
// //       setUploadProgress(10);
      
// //       console.log('Starting CSV upload:', file.name);
// //       console.log('File URI:', file.uri);
// //       console.log('File size:', file.size);

// //       // Create FormData
// //       const formData = new FormData();
      
// //       // For React Native, we need to create a proper file object
// //       formData.append('file', {
// //         uri: file.uri,
// //         type: file.mimeType || 'text/csv',
// //         name: file.name,
// //       });
      
// //       setUploadProgress(30);

// //       console.log('FormData created, calling API...');

// //       // Get auth token from your storage
// //       const token = await getAuthToken();
      
// //       // IMPORTANT: For Android emulator/device, use 10.0.2.2 instead of 127.0.0.1
// //       // For iOS simulator, use localhost
// //       // For physical device, use your computer's IP address
// //       let apiUrl = `${backendUrl}/api/v1/ingest/csv/`;
      
// //       console.log('Uploading to:', apiUrl);

// //       // Call your API endpoint for CSV upload
// //       const response = await fetch(apiUrl, {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Accept': 'application/json',
// //           'Content-Type': 'multipart/form-data',
// //         },
// //         body: formData,
// //       });

// //       setUploadProgress(70);

// //       console.log('API Response status:', response.status);

// //       if (!response.ok) {
// //         const errorData = await response.text();
// //         console.log('Error response:', errorData);
// //         throw new Error(`Upload failed with status ${response.status}`);
// //       }

// //       const responseData = await response.json();
// //       setUploadProgress(100);
// //       setUploadComplete(true);
      
// //       console.log('CSV upload successful:', responseData);

// //       Alert.alert(
// //         'Success!',
// //         `CSV file processed successfully!\n\nTransactions are being imported.`,
// //         [
// //           { 
// //             text: 'View Transactions', 
// //             onPress: () => router.push('/transactions')
// //           },
// //           { 
// //             text: 'OK', 
// //             style: 'default',
// //             onPress: resetCSVState
// //           }
// //         ]
// //       );
      
// //     } catch (error) {
// //       console.error('CSV upload error:', error);
// //       console.error('Error details:', error.message);
      
// //       let errorMessage = 'Failed to upload CSV file';
// //       let showDebugInfo = false;
      
// //       if (error.message.includes('Network request failed')) {
// //         errorMessage = 'Network error. Cannot connect to server.';
// //         showDebugInfo = true;
// //       } else if (error.message.includes('timeout')) {
// //         errorMessage = 'Connection timeout. Server might be busy or offline.';
// //       } else if (error.message.includes('Failed to fetch')) {
// //         errorMessage = 'Cannot connect to backend server.';
// //         showDebugInfo = true;
// //       } else {
// //         errorMessage = error.message;
// //       }
      
// //       Alert.alert(
// //         'Upload Failed',
// //         errorMessage + (showDebugInfo ? '\n\nDebug info logged to console.' : ''),
// //         [
// //           { 
// //             text: 'Check Server Connection', 
// //             onPress: checkServerConnection 
// //           },
// //           { 
// //             text: 'Try Again', 
// //             onPress: () => handleCSVUpload(file) 
// //           },
// //           { 
// //             text: 'Cancel', 
// //             style: 'cancel',
// //             onPress: resetCSVState
// //           }
// //         ]
// //       );
// //     } finally {
// //       setProcessingFile(false);
// //     }
// //   };

// //   // Helper function to get auth token (implement based on your auth system)
// //   const getAuthToken = async () => {
// //     // Replace with your actual token retrieval logic
// //     // Example: return await AsyncStorage.getItem('auth_token');
// //     return 'eyJhbGciOiJIUzI1NiIsImtpZCI6InQvOFY1MTFpcVVYTXhZNDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2l3b213eXNnZXJyc3F0Z3NmdnViLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJkMzZhNzAyYS0xZDkxLTRlYWMtYTEwNy0zMjg4ZGQxNDVjYWYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzY3ODkxNTIwLCJpYXQiOjE3Njc4ODc5MjAsImVtYWlsIjoiYXRoYXJ2YXBhcmRlc2hpNDkwNkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiYXRoYXJ2YXBhcmRlc2hpNDkwNkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiJkMzZhNzAyYS0xZDkxLTRlYWMtYTEwNy0zMjg4ZGQxNDVjYWYifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc2Nzg4NzkyMH1dLCJzZXNzaW9uX2lkIjoiZDZjMjJmOWQtZTI5OC00NzBkLTg4NWQtMGY4Njk5YmIwM2U0IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.PPDkfwoQsFd2r1ChkAtt6UNUt3mcCki-RhexH_QJjEs';
// //   };

// //   // Handle manual transaction submission
// //   const handleManualSubmit = async () => {
// //     try {
// //       if (!formData.amount || !formData.description) {
// //         Alert.alert('Error', 'Please fill amount and description');
// //         return;
// //       }

// //       setLoading(true);

// //       const transactionData = {
// //         amount: parseFloat(formData.amount),
// //         description: formData.description.trim(),
// //         category: formData.category || 'Other',
// //         merchant: formData.merchant || '',
// //         date: formData.date.toISOString(),
// //         source_type: 'manual',
// //         transaction_type: formData.transaction_type,
// //         status: 'completed'
// //       };

// //       // Call your API endpoint for manual transactions
// //       const response = await ApiService.post('/transactions/', transactionData);

// //       Alert.alert('Success', 'Transaction added successfully');
// //       setShowManualModal(false);
// //       resetForm();
      
// //     } catch (error) {
// //       console.error('Manual transaction error:', error);
// //       let errorMessage = 'Failed to add transaction';
      
// //       if (error.response?.data?.detail) {
// //         errorMessage = error.response.data.detail;
// //       } else if (error.response?.status === 422) {
// //         errorMessage = 'Invalid data. Please check the values.';
// //       }
      
// //       Alert.alert('Error', errorMessage);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle date change
// //   const onDateChange = (event, selectedDate) => {
// //     setShowDatePicker(Platform.OS === 'ios');
// //     if (selectedDate) {
// //       setFormData(prev => ({ ...prev, date: selectedDate }));
// //     }
// //   };

// //   const formatDate = (date) => {
// //     return date.toLocaleDateString('en-IN', {
// //       day: 'numeric',
// //       month: 'short',
// //       year: 'numeric'
// //     });
// //   };

// //   const formatTime = (date) => {
// //     return date.toLocaleTimeString('en-IN', {
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   const formatFileSize = (bytes) => {
// //     if (!bytes) return 'Unknown size';
// //     if (bytes === 0) return '0 Bytes';
// //     const k = 1024;
// //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// //   };

// //   // Get server status icon and color
// //   const getServerStatusInfo = () => {
// //     switch (serverStatus) {
// //       case 'connected':
// //         return { icon: <Wifi size={16} color="#22C55E" />, color: '#22C55E', text: 'Server Connected' };
// //       case 'error':
// //         return { icon: <WifiOff size={16} color="#EF4444" />, color: '#EF4444', text: 'Server Offline' };
// //       default:
// //         return { icon: <Clock size={16} color="#F59E0B" />, color: '#F59E0B', text: 'Checking...' };
// //     }
// //   };

// //   const serverStatusInfo = getServerStatusInfo();

// //   return (
// //     <Theme name="dark">
// //       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
// //         {/* HEADER */}
// //         <XStack p={20} ai="center" space={16}>
// //           <TouchableOpacity onPress={() => router.back()}>
// //             <ArrowLeft size={24} color="#EAB308" />
// //           </TouchableOpacity>
          
// //           <YStack flex={1}>
// //             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
// //               Add Transactions
// //             </H2>
// //             <Text color="#666666" fontSize={14}>
// //               Manual entry or bulk import
// //             </Text>
// //           </YStack>
// //         </XStack>

// //         {/* SERVER STATUS */}
// //         <Card m={20} mb={16} backgroundColor="#1A1A1A" borderLeftWidth={4} borderLeftColor={serverStatusInfo.color}>
// //           <TouchableOpacity onPress={checkServerConnection}>
// //             <XStack p={16} ai="center" space={12}>
// //               {serverStatusInfo.icon}
// //               <YStack flex={1}>
// //                 <Text color={serverStatusInfo.color} fontSize={14} fontWeight="700">
// //                   {serverStatusInfo.text}
// //                 </Text>
// //                 <Text color="#666666" fontSize={12} mt={2}>
// //                   Backend: {backendUrl}
// //                 </Text>
// //               </YStack>
// //               <RefreshCw size={16} color="#666666" />
// //             </XStack>
// //           </TouchableOpacity>
// //         </Card>

// //         {/* MAIN ACTIONS */}
// //         <ScrollView 
// //           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}
// //           showsVerticalScrollIndicator={false}
// //         >
// //           {/* QUICK ACTIONS */}
// //           <YStack space={16} mb={24}>
// //             <Text color="#EAB308" fontSize={16} fontWeight="800">
// //               QUICK ACTIONS
// //             </Text>
            
// //             {/* Manual Entry Card */}
// //             <TouchableOpacity onPress={() => setShowManualModal(true)}>
// //               <Card backgroundColor="#1A1A1A" p={20} borderRadius={12} borderWidth={1} borderColor="#333333">
// //                 <XStack ai="center" space={16}>
// //                   <View style={{
// //                     width: 52,
// //                     height: 52,
// //                     borderRadius: 16,
// //                     backgroundColor: '#EAB30820',
// //                     justifyContent: 'center',
// //                     alignItems: 'center',
// //                   }}>
// //                     <Plus size={24} color="#EAB308" />
// //                   </View>
                  
// //                   <YStack flex={1}>
// //                     <Text color="white" fontWeight="800" fontSize={18}>
// //                       Manual Entry
// //                     </Text>
// //                     <Text color="#666666" fontSize={13} mt={2}>
// //                       Add single transaction with details
// //                     </Text>
// //                   </YStack>
                  
// //                   <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
// //                 </XStack>
// //               </Card>
// //             </TouchableOpacity>

// //             {/* CSV Import Card */}
// //             <TouchableOpacity onPress={handleSelectCSV} disabled={processingFile}>
// //               <Card 
// //                 backgroundColor="#1A1A1A" 
// //                 p={20} 
// //                 borderRadius={12} 
// //                 borderWidth={1} 
// //                 borderColor="#333333"
// //                 opacity={processingFile ? 0.7 : 1}
// //               >
// //                 <XStack ai="center" space={16}>
// //                   <View style={{
// //                     width: 52,
// //                     height: 52,
// //                     borderRadius: 16,
// //                     backgroundColor: '#22C55E20',
// //                     justifyContent: 'center',
// //                     alignItems: 'center',
// //                   }}>
// //                     {processingFile ? (
// //                       <Spinner size={24} color="#22C55E" />
// //                     ) : uploadComplete ? (
// //                       <Check size={24} color="#22C55E" />
// //                     ) : (
// //                       <Upload size={24} color="#22C55E" />
// //                     )}
// //                   </View>
                  
// //                   <YStack flex={1}>
// //                     <Text color="white" fontWeight="800" fontSize={18}>
// //                       CSV Import
// //                     </Text>
// //                     <Text color="#666666" fontSize={13} mt={2}>
// //                       {processingFile ? `Uploading... ${uploadProgress}%` : 
// //                        uploadComplete ? 'Upload Complete!' : 
// //                        selectedFile ? `Selected: ${selectedFile.name}` : 
// //                        'Upload bank statement CSV'}
// //                     </Text>
                    
// //                     {selectedFile && !processingFile && !uploadComplete && (
// //                       <Text color="#666666" fontSize={11} mt={4}>
// //                         Tap to upload and process
// //                       </Text>
// //                     )}
                    
// //                     {processingFile && (
// //                       <View style={{ marginTop: 8 }}>
// //                         <View style={{
// //                           height: 4,
// //                           backgroundColor: '#333333',
// //                           borderRadius: 2,
// //                           overflow: 'hidden',
// //                         }}>
// //                           <View style={{
// //                             width: `${uploadProgress}%`,
// //                             height: '100%',
// //                             backgroundColor: '#22C55E',
// //                             borderRadius: 2,
// //                           }} />
// //                         </View>
// //                       </View>
// //                     )}
// //                   </YStack>
                  
// //                   <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
// //                 </XStack>
// //               </Card>
// //             </TouchableOpacity>

// //             {/* Selected File Info */}
// //             {selectedFile && !processingFile && !uploadComplete && (
// //               <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} borderLeftWidth={4} borderLeftColor="#22C55E">
// //                 <YStack>
// //                   <XStack ai="center" space={12} mb={12}>
// //                     <FileText size={20} color="#22C55E" />
// //                     <YStack flex={1}>
// //                       <Text color="white" fontSize={14} fontWeight="700">
// //                         {selectedFile.name}
// //                       </Text>
// //                       <Text color="#666666" fontSize={12}>
// //                         {formatFileSize(selectedFile.size)}
// //                       </Text>
// //                     </YStack>
// //                   </XStack>
                  
// //                   <XStack space={8}>
// //                     <TouchableOpacity
// //                       onPress={() => handleCSVUpload(selectedFile)}
// //                       style={{
// //                         flex: 1,
// //                         backgroundColor: '#22C55E',
// //                         paddingVertical: 12,
// //                         borderRadius: 8,
// //                         alignItems: 'center',
// //                         flexDirection: 'row',
// //                         justifyContent: 'center',
// //                       }}
// //                     >
// //                       <Upload size={16} color="white" mr={8} />
// //                       <Text color="white" fontSize={14} fontWeight="700">
// //                         Upload & Process
// //                       </Text>
// //                     </TouchableOpacity>
                    
// //                     <TouchableOpacity
// //                       onPress={resetCSVState}
// //                       style={{
// //                         padding: 12,
// //                         backgroundColor: '#333333',
// //                         borderRadius: 8,
// //                         alignItems: 'center',
// //                         justifyContent: 'center',
// //                       }}
// //                     >
// //                       <X size={16} color="#666666" />
// //                     </TouchableOpacity>
// //                   </XStack>
// //                 </YStack>
// //               </Card>
// //             )}
// //           </YStack>

// //           {/* CONNECTION TROUBLESHOOTING */}
// //           {serverStatus === 'error' && (
// //             <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mb={24} borderLeftWidth={4} borderLeftColor="#EF4444">
// //               <YStack space={12}>
// //                 <XStack ai="center" space={12}>
// //                   <AlertTriangle size={20} color="#EF4444" />
// //                   <Text color="white" fontSize={14} fontWeight="700">
// //                     Connection Troubleshooting
// //                   </Text>
// //                 </XStack>
                
// //                 <Text color="#666666" fontSize={12}>
// //                   Cannot connect to backend server:
// //                 </Text>
                
// //                 <YStack space={6}>
// //                   <XStack ai="center" space={8}>
// //                     <Circle size={6} bg="#EF4444" />
// //                     <Text color="#666666" fontSize={11}>
// //                       Make sure your FastAPI server is running
// //                     </Text>
// //                   </XStack>
                  
// //                   <XStack ai="center" space={8}>
// //                     <Circle size={6} bg="#EF4444" />
// //                     <Text color="#666666" fontSize={11}>
// //                       For emulator, use: <Text color="#EAB308">http://10.0.2.2:8000</Text>
// //                     </Text>
// //                   </XStack>
                  
// //                   <XStack ai="center" space={8}>
// //                     <Circle size={6} bg="#EF4444" />
// //                     <Text color="#666666" fontSize={11}>
// //                       For physical device, use your computer's IP
// //                     </Text>
// //                   </XStack>
// //                 </YStack>
                
// //                 <TouchableOpacity
// //                   onPress={() => {
// //                     Alert.prompt(
// //                       'Change Server URL',
// //                       'Enter your backend server URL:',
// //                       [
// //                         { text: 'Cancel', style: 'cancel' },
// //                         { 
// //                           text: 'Save', 
// //                           onPress: (url) => {
// //                             if (url) {
// //                               setBackendUrl(url);
// //                               checkServerConnection();
// //                             }
// //                           }
// //                         }
// //                       ],
// //                       'plain-text',
// //                       backendUrl
// //                     );
// //                   }}
// //                   style={{
// //                     backgroundColor: '#333333',
// //                     padding: 12,
// //                     borderRadius: 8,
// //                     alignItems: 'center',
// //                   }}
// //                 >
// //                   <Text color="#EAB308" fontSize={14} fontWeight="700">
// //                     Change Server URL
// //                   </Text>
// //                 </TouchableOpacity>
// //               </YStack>
// //             </Card>
// //           )}

// //           {/* INSTRUCTIONS */}
// //           <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mb={24}>
// //             <YStack space={12}>
// //               <XStack ai="center" space={12}>
// //                 <Shield size={20} color="#3B82F6" />
// //                 <Text color="white" fontSize={14} fontWeight="700">
// //                   How to add transactions
// //                 </Text>
// //               </XStack>
              
// //               <YStack space={8}>
// //                 <XStack ai="center" space={8}>
// //                   <Circle size={6} bg="#22C55E" />
// //                   <Text color="#666666" fontSize={12}>
// //                     <Text color="white" fontWeight="600">Manual Entry:</Text> For single transactions
// //                   </Text>
// //                 </XStack>
                
// //                 <XStack ai="center" space={8}>
// //                   <Circle size={6} bg="#22C55E" />
// //                   <Text color="#666666" fontSize={12}>
// //                     <Text color="white" fontWeight="600">CSV Import:</Text> For bulk upload from bank statements
// //                   </Text>
// //                 </XStack>
                
// //                 <XStack ai="center" space={8}>
// //                   <Circle size={6} bg="#22C55E" />
// //                   <Text color="#666666" fontSize={12}>
// //                     <Text color="white" fontWeight="600">Auto-sync:</Text> Coming soon (SMS, notifications)
// //                   </Text>
// //                 </XStack>
// //               </YStack>
// //             </YStack>
// //           </Card>

// //           {/* CSV FORMAT GUIDE */}
// //           <Card backgroundColor="#1A1A1A" p={16} borderRadius={12}>
// //             <YStack space={12}>
// //               <XStack ai="center" space={12}>
// //                 <FileText size={20} color="#F59E0B" />
// //                 <Text color="white" fontSize={14} fontWeight="700">
// //                   CSV Format Guide
// //                 </Text>
// //               </XStack>
              
// //               <Text color="#666666" fontSize={12}>
// //                 Your CSV should include these columns:
// //               </Text>
              
// //               <View style={{ backgroundColor: '#222222', padding: 12, borderRadius: 8 }}>
// //                 <Text color="#EAB308" fontSize={11} fontFamily="monospace">
// //                   date,amount,description,category,merchant
// //                 </Text>
// //                 <Text color="#666666" fontSize={11} mt={4}>
// //                   Example: 2024-01-15,125.50,Grocery Store,Groceries,Whole Foods
// //                 </Text>
// //               </View>
              
// //               <Text color="#666666" fontSize={11}>
// //                 • Date format: YYYY-MM-DD
// //               </Text>
// //               <Text color="#666666" fontSize={11}>
// //                 • Amount: Positive numbers (system detects income/expense)
// //               </Text>
// //               <Text color="#666666" fontSize={11}>
// //                 • Category: Should match your budget categories
// //               </Text>
// //               <Text color="#666666" fontSize={11}>
// //                 • Supported formats: .csv, .xls, .xlsx
// //               </Text>
// //             </YStack>
// //           </Card>
          
// //           {/* DEBUG INFO */}
// //           {__DEV__ && (
// //             <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mt={16}>
// //               <Text color="#F59E0B" fontSize={12} fontWeight="700" mb={8}>
// //                 Debug Info
// //               </Text>
// //               <Text color="#666666" fontSize={10} fontFamily="monospace">
// //                 Platform: {Platform.OS}
// //               </Text>
// //               <Text color="#666666" fontSize={10} fontFamily="monospace">
// //                 Server URL: {backendUrl}
// //               </Text>
// //               <Text color="#666666" fontSize={10} fontFamily="monospace">
// //                 Status: {serverStatus}
// //               </Text>
// //             </Card>
// //           )}
// //         </ScrollView>

// //         {/* MANUAL ENTRY MODAL */}
// //         <Modal
// //           visible={showManualModal}
// //           animationType="slide"
// //           transparent={true}
// //           onRequestClose={() => {
// //             setShowManualModal(false);
// //             resetForm();
// //           }}
// //         >
// //           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
// //             <View style={{ 
// //               backgroundColor: '#1A1A1A', 
// //               borderTopLeftRadius: 24, 
// //               borderTopRightRadius: 24, 
// //               padding: 24, 
// //               paddingBottom: insets.bottom + 24,
// //               maxHeight: '90%'
// //             }}>
// //               <XStack jc="space-between" ai="center" mb={24}>
// //                 <H4 color="white" fontWeight="800" fontSize={20}>
// //                   Add Manual Transaction
// //                 </H4>
// //                 <TouchableOpacity 
// //                   onPress={() => {
// //                     setShowManualModal(false);
// //                     resetForm();
// //                   }}
// //                   style={{ padding: 8 }}
// //                 >
// //                   <X size={24} color="#666666" />
// //                 </TouchableOpacity>
// //               </XStack>

// //               <ScrollView showsVerticalScrollIndicator={false}>
// //                 <YStack space={20}>
// //                   {/* Transaction Type */}
// //                   <YStack>
// //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                       Type *
// //                     </Text>
// //                     <View style={{ flexDirection: 'row', gap: 8 }}>
// //                       {transactionTypes.map(type => (
// //                         <TouchableOpacity
// //                           key={type.value}
// //                           onPress={() => setFormData(prev => ({ ...prev, transaction_type: type.value }))}
// //                           style={{
// //                             flex: 1,
// //                             flexDirection: 'row',
// //                             alignItems: 'center',
// //                             justifyContent: 'center',
// //                             paddingHorizontal: 12,
// //                             paddingVertical: 12,
// //                             backgroundColor: formData.transaction_type === type.value ? type.color + '20' : '#333333',
// //                             borderRadius: 8,
// //                             borderWidth: 1,
// //                             borderColor: formData.transaction_type === type.value ? type.color : '#444444',
// //                           }}
// //                         >
// //                           {React.cloneElement(type.icon, { 
// //                             size: 14,
// //                             color: formData.transaction_type === type.value ? type.color : '#666666'
// //                           })}
// //                           <Text 
// //                             color={formData.transaction_type === type.value ? type.color : '#666666'} 
// //                             fontSize={12} 
// //                             fontWeight="700"
// //                             ml={6}
// //                           >
// //                             {type.label}
// //                           </Text>
// //                         </TouchableOpacity>
// //                       ))}
// //                     </View>
// //                   </YStack>

// //                   {/* Amount */}
// //                   <YStack>
// //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                       Amount *
// //                     </Text>
// //                     <Input
// //                       placeholder="0.00"
// //                       value={formData.amount}
// //                       onChangeText={(text) => setFormData(prev => ({ ...prev, amount: text }))}
// //                       backgroundColor="#333333"
// //                       borderColor="#444444"
// //                       color="white"
// //                       placeholderTextColor="#666666"
// //                       keyboardType="decimal-pad"
// //                       fontSize={16}
// //                       br={8}
// //                       prefix={<Text color="#666666" mr={8}>$</Text>}
// //                     />
// //                   </YStack>

// //                   {/* Description */}
// //                   <YStack>
// //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                       Description *
// //                     </Text>
// //                     <Input
// //                       placeholder="e.g., Grocery shopping, Salary, Restaurant bill"
// //                       value={formData.description}
// //                       onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
// //                       backgroundColor="#333333"
// //                       borderColor="#444444"
// //                       color="white"
// //                       placeholderTextColor="#666666"
// //                       fontSize={16}
// //                       br={8}
// //                     />
// //                   </YStack>

// //                   {/* Category */}
// //                   <YStack>
// //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                       Category
// //                     </Text>
// //                     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
// //                       <XStack space={8}>
// //                         {categories.slice(0, 8).map(category => (
// //                           <TouchableOpacity
// //                             key={category}
// //                             onPress={() => setFormData(prev => ({ ...prev, category: category }))}
// //                             style={{
// //                               paddingHorizontal: 12,
// //                               paddingVertical: 8,
// //                               backgroundColor: formData.category === category ? '#EAB30820' : '#333333',
// //                               borderRadius: 20,
// //                               borderWidth: 1,
// //                               borderColor: formData.category === category ? '#EAB308' : '#444444',
// //                             }}
// //                           >
// //                             <Text 
// //                               color={formData.category === category ? '#EAB308' : '#666666'} 
// //                               fontSize={12} 
// //                               fontWeight="700"
// //                             >
// //                               {category}
// //                             </Text>
// //                           </TouchableOpacity>
// //                         ))}
// //                       </XStack>
// //                     </ScrollView>
// //                     <Input
// //                       placeholder="Or enter custom category"
// //                       value={formData.category}
// //                       onChangeText={(text) => setFormData(prev => ({ ...prev, category: text }))}
// //                       backgroundColor="#333333"
// //                       borderColor="#444444"
// //                       color="white"
// //                       placeholderTextColor="#666666"
// //                       fontSize={14}
// //                       br={8}
// //                       mt={8}
// //                     />
// //                   </YStack>

// //                   {/* Merchant */}
// //                   <YStack>
// //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                       Merchant
// //                     </Text>
// //                     <Input
// //                       placeholder="e.g., Amazon, Walmart, Restaurant name"
// //                       value={formData.merchant}
// //                       onChangeText={(text) => setFormData(prev => ({ ...prev, merchant: text }))}
// //                       backgroundColor="#333333"
// //                       borderColor="#444444"
// //                       color="white"
// //                       placeholderTextColor="#666666"
// //                       fontSize={16}
// //                       br={8}
// //                     />
// //                   </YStack>

// //                   {/* Date */}
// //                   <YStack>
// //                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
// //                       Date
// //                     </Text>
// //                     <TouchableOpacity
// //                       onPress={() => setShowDatePicker(true)}
// //                       style={{
// //                         backgroundColor: '#333333',
// //                         borderWidth: 1,
// //                         borderColor: '#444444',
// //                         borderRadius: 8,
// //                         padding: 16,
// //                       }}
// //                     >
// //                       <XStack ai="center" space={12}>
// //                         <Calendar size={16} color="#666666" />
// //                         <Text color="white" fontSize={16}>
// //                           {formatDate(formData.date)} • {formatTime(formData.date)}
// //                         </Text>
// //                       </XStack>
// //                     </TouchableOpacity>
// //                   </YStack>

// //                   {/* Submit Button */}
// //                   <TouchableOpacity
// //                     onPress={handleManualSubmit}
// //                     disabled={loading || !formData.amount || !formData.description}
// //                     style={{
// //                       backgroundColor: '#EAB308',
// //                       padding: 16,
// //                       borderRadius: 12,
// //                       alignItems: 'center',
// //                       marginTop: 8,
// //                       opacity: (loading || !formData.amount || !formData.description) ? 0.7 : 1,
// //                     }}
// //                   >
// //                     {loading ? (
// //                       <Spinner size="small" color="black" />
// //                     ) : (
// //                       <Text color="black" fontSize={16} fontWeight="800">
// //                         Add Transaction
// //                       </Text>
// //                     )}
// //                   </TouchableOpacity>
// //                 </YStack>
// //               </ScrollView>
// //             </View>
// //           </View>
// //         </Modal>

// //         {/* DATE PICKER */}
// //         {showDatePicker && (
// //           <DateTimePicker
// //             value={formData.date}
// //             mode="datetime"
// //             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// //             onChange={onDateChange}
// //             maximumDate={new Date()}
// //           />
// //         )}
// //       </SafeAreaView>
// //     </Theme>
// //   );
// // }



// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   View,
//   Platform,
//   Modal
// } from 'react-native';
// import {
//   YStack,
//   XStack,
//   Text,
//   H2,
//   H4,
//   Theme,
//   Spinner,
//   Card,
//   Input,
//   Button
// } from 'tamagui';
// import {
//   ArrowLeft,
//   Upload,
//   FileText,
//   DollarSign,
//   Calendar,
//   Tag,
//   Building,
//   Plus,
//   X,
//   CheckCircle,
//   AlertTriangle,
//   Clock,
//   RefreshCw,
//   Smartphone,
//   Shield,
//   Zap,
//   CreditCard,
//   Wallet,
//   TrendingUp,
//   Home,
//   Briefcase,
//   Percent,
//   Circle,
//   Check,
//   Wifi,
//   WifiOff
// } from '@tamagui/lucide-icons';
// import { useRouter, useFocusEffect } from 'expo-router';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as DocumentPicker from 'expo-document-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

// // Services
// import { ApiService } from '../services/apiService';

// export default function Ingest() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
  
//   // State - Using YOUR IP address
//   const [loading, setLoading] = useState(false);
//   const [showManualModal, setShowManualModal] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [processingFile, setProcessingFile] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadComplete, setUploadComplete] = useState(false);
//   const [serverStatus, setServerStatus] = useState('checking');
  
//   // Use YOUR IP address here
//   const [backendUrl, setBackendUrl] = useState('http://10.62.17.195:8000');
  
//   // Manual transaction form state
//   const [formData, setFormData] = useState({
//     amount: '',
//     description: '',
//     category: '',
//     merchant: '',
//     date: new Date(),
//     source_type: 'manual',
//     transaction_type: 'expense'
//   });

//   // Transaction types
//   const transactionTypes = [
//     { value: 'expense', label: 'Expense', icon: <DollarSign size={16} />, color: '#EF4444' },
//     { value: 'income', label: 'Income', icon: <TrendingUp size={16} />, color: '#22C55E' },
//     { value: 'investment', label: 'Investment', icon: <Percent size={16} />, color: '#8B5CF6' }
//   ];

//   // Categories based on your budgets
//   const categories = [
//     'Eating out', 'Eating', 'Eat', 'Dining', 'Daily Food', 
//     'Shopping', 'Cycle', 'Hike', 'Groceries', 'Transportation',
//     'Entertainment', 'Healthcare', 'Housing', 'Utilities', 
//     'Education', 'Health & Fitness', 'Food & Drink', 'Other'
//   ];

//   // Check server connection
//   const checkServerConnection = useCallback(async () => {
//     try {
//       setServerStatus('checking');
//       console.log(`Checking connection to: ${backendUrl}`);
      
//       // First, try to load saved URL from storage
//       const savedUrl = await AsyncStorage.getItem('backend_url');
//       if (savedUrl && savedUrl !== backendUrl) {
//         console.log('Found saved URL:', savedUrl);
//         setBackendUrl(savedUrl);
//       }
      
//       // Test the connection
//       const response = await fetch(`${backendUrl}/api/v1/`, {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json',
//         },
//       });
      
//       console.log('Connection response:', response.status);
      
//       if (response.ok) {
//         setServerStatus('connected');
//         // Save successful URL
//         await AsyncStorage.setItem('backend_url', backendUrl);
//       } else {
//         setServerStatus('error');
//         console.log('Server responded but not OK:', response.status);
//       }
//     } catch (error) {
//       console.log('Server check failed:', error.message);
//       setServerStatus('error');
      
//       // Try alternative URLs if current one fails
//       if (backendUrl.includes('10.62.17.195')) {
//         console.log('Trying alternative URLs...');
        
//         const alternativeUrls = [
//           'http://10.0.2.2:8000', // Android emulator
//           'http://localhost:8000', // Localhost
//           'http://192.168.1.100:8000', // Common local IP
//         ];
        
//         for (const url of alternativeUrls) {
//           try {
//             console.log(`Trying ${url}...`);
//             const testResponse = await fetch(`${url}/api/v1/`, {
//               method: 'GET',
//               timeout: 3000,
//             });
            
//             if (testResponse.ok) {
//               console.log(`Found working URL: ${url}`);
//               setBackendUrl(url);
//               await AsyncStorage.setItem('backend_url', url);
//               setServerStatus('connected');
//               break;
//             }
//           } catch (e) {
//             console.log(`${url} failed:`, e.message);
//           }
//         }
//       }
//     }
//   }, [backendUrl]);

//   useEffect(() => {
//     checkServerConnection();
//   }, [checkServerConnection]);

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       amount: '',
//       description: '',
//       category: '',
//       merchant: '',
//       date: new Date(),
//       source_type: 'manual',
//       transaction_type: 'expense'
//     });
//   };

//   // Reset CSV upload state
//   const resetCSVState = () => {
//     setSelectedFile(null);
//     setUploadProgress(0);
//     setUploadComplete(false);
//   };

//   // Handle CSV file selection
//   const handleSelectCSV = async () => {
//     try {
//       // Check server connection first
//       if (serverStatus !== 'connected') {
//         Alert.alert(
//           'Server Connection Required',
//           `Cannot connect to ${backendUrl}\n\nPlease make sure:\n1. FastAPI server is running\n2. Server is accessible at ${backendUrl}\n3. Port 8000 is not blocked`,
//           [
//             { 
//               text: 'Check Connection', 
//               onPress: checkServerConnection 
//             },
//             { 
//               text: 'Change Server URL', 
//               onPress: showURLSelector
//             },
//             {
//               text: 'Use ADB Reverse',
//               onPress: () => {
//                 Alert.alert(
//                   'ADB Reverse Command',
//                   'Run this command in terminal:\n\nadb reverse tcp:8000 tcp:8000\n\nThen use: http://localhost:8000',
//                   [{ text: 'OK' }]
//                 );
//               }
//             }
//           ]
//         );
//         return;
//       }

//       // Reset state
//       resetCSVState();
      
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ['text/csv', 'application/vnd.ms-excel', 'text/comma-separated-values'],
//         copyToCacheDirectory: true,
//       });

//       console.log('Document picker result:', result);

//       if (result.assets && result.assets.length > 0) {
//         const file = result.assets[0];
//         setSelectedFile({
//           name: file.name,
//           uri: file.uri,
//           size: file.size,
//           type: file.mimeType || 'text/csv'
//         });
        
//         // Show immediate feedback
//         Alert.alert(
//           'File Selected',
//           `Selected: ${file.name}\n\nTap "Upload & Process" to import transactions.`,
//           [
//             { text: 'Cancel', style: 'cancel', onPress: resetCSVState },
//             { 
//               text: 'Upload & Process', 
//               onPress: () => handleCSVUpload(file)
//             }
//           ]
//         );
//       } else if (result.canceled) {
//         console.log('User cancelled file selection');
//       }
//     } catch (error) {
//       console.error('Document picker error:', error);
//       Alert.alert('Error', 'Failed to select file. Please try again.');
//     }
//   };

//   // Show URL selector
//   const showURLSelector = () => {
//     const suggestions = [
//       { label: 'Your IP (10.62.17.195)', url: 'http://10.62.17.195:8000' },
//       { label: 'Android Emulator (10.0.2.2)', url: 'http://10.0.2.2:8000' },
//       { label: 'Localhost (with ADB reverse)', url: 'http://localhost:8000' },
//       { label: 'Common Local IP', url: 'http://192.168.1.100:8000' },
//     ];
    
//     Alert.alert(
//       'Select Server URL',
//       'Choose the correct URL for your setup:',
//       [
//         ...suggestions.map((suggestion, index) => ({
//           text: suggestion.label,
//           onPress: async () => {
//             setBackendUrl(suggestion.url);
//             await AsyncStorage.setItem('backend_url', suggestion.url);
//             checkServerConnection();
//           },
//         })),
//         {
//           text: 'Custom URL',
//           onPress: () => {
//             Alert.prompt(
//               'Enter Custom URL',
//               'Enter your backend server URL:',
//               [
//                 { text: 'Cancel', style: 'cancel' },
//                 {
//                   text: 'Save',
//                   onPress: async (url) => {
//                     if (url) {
//                       if (!url.startsWith('http')) {
//                         url = 'http://' + url;
//                       }
//                       setBackendUrl(url);
//                       await AsyncStorage.setItem('backend_url', url);
//                       checkServerConnection();
//                     }
//                   }
//                 }
//               ],
//               'plain-text',
//               backendUrl
//             );
//           }
//         },
//         { text: 'Cancel', style: 'cancel' },
//       ]
//     );
//   };

//   // Handle CSV file upload and processing
//   const handleCSVUpload = async (file) => {
//     try {
//       setProcessingFile(true);
//       setUploadProgress(10);
      
//       console.log('Starting CSV upload to:', backendUrl);
//       console.log('File:', file.name);
//       console.log('File URI:', file.uri);

//       // Create FormData
//       const formData = new FormData();
      
//       // Add file to FormData
//       formData.append('file', {
//         uri: file.uri,
//         type: file.mimeType || 'text/csv',
//         name: file.name,
//       });
      
//       setUploadProgress(30);

//       console.log('FormData created, calling API...');

//       // Get token from AsyncStorage
//       let token;
//       try {
//         token = await AsyncStorage.getItem('auth_token');
//         console.log('Token available:', !!token);
//       } catch (tokenError) {
//         console.log('Token error:', tokenError);
//         token = null;
//       }

//       // Build the full URL
//       const apiUrl = `${backendUrl}/api/v1/ingest/csv/`;
//       console.log('API URL:', apiUrl);

//       // Create headers
//       const headers = {
//         'Accept': 'application/json',
//         'Content-Type': 'multipart/form-data',
//       };

//       // Add authorization if token exists
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }

//       // Call API using fetch
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: headers,
//         body: formData,
//       });

//       setUploadProgress(70);

//       console.log('API Response status:', response.status);
//       console.log('API Response headers:', response.headers);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.log('Error response:', errorText);
//         throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
//       }

//       const responseData = await response.json();
//       setUploadProgress(100);
//       setUploadComplete(true);
      
//       console.log('CSV upload successful:', responseData);

//       Alert.alert(
//         'Success!',
//         `CSV file processed successfully!\n\n${responseData.message || 'Transactions are being imported.'}`,
//         [
//           { 
//             text: 'View Transactions', 
//             onPress: () => router.push('/transactions')
//           },
//           { 
//             text: 'OK', 
//             style: 'default',
//             onPress: resetCSVState
//           }
//         ]
//       );
      
//     } catch (error) {
//       console.error('CSV upload error:', error);
//       console.error('Error stack:', error.stack);
      
//       let errorMessage = 'Failed to upload CSV file';
      
//       if (error.message.includes('Network request failed')) {
//         errorMessage = `Cannot connect to ${backendUrl}\n\nPlease check:\n1. Server is running\n2. URL is correct\n3. Port 8000 is open\n4. Firewall is not blocking`;
//       } else if (error.message.includes('Failed to fetch')) {
//         errorMessage = 'Network error. Check your connection and server.';
//       } else if (error.message.includes('timeout')) {
//         errorMessage = 'Connection timeout. Server might be busy.';
//       } else {
//         errorMessage = error.message;
//       }
      
//       Alert.alert(
//         'Upload Failed',
//         errorMessage,
//         [
//           { 
//             text: 'Check Connection', 
//             onPress: checkServerConnection 
//           },
//           { 
//             text: 'Try Again', 
//             onPress: () => handleCSVUpload(file) 
//           },
//           { 
//             text: 'Cancel', 
//             style: 'cancel',
//             onPress: resetCSVState
//           }
//         ]
//       );
//     } finally {
//       setProcessingFile(false);
//     }
//   };

//   // Handle manual transaction submission
//   const handleManualSubmit = async () => {
//     try {
//       if (!formData.amount || !formData.description) {
//         Alert.alert('Error', 'Please fill amount and description');
//         return;
//       }

//       setLoading(true);

//       const transactionData = {
//         amount: parseFloat(formData.amount),
//         description: formData.description.trim(),
//         category: formData.category || 'Other',
//         merchant: formData.merchant || '',
//         date: formData.date.toISOString(),
//         source_type: 'manual',
//         transaction_type: formData.transaction_type,
//         status: 'completed'
//       };

//       console.log('Sending manual transaction to:', backendUrl);
      
//       // Call your API endpoint for manual transactions
//       const response = await ApiService.post('/transactions/', transactionData);

//       Alert.alert('Success', 'Transaction added successfully');
//       setShowManualModal(false);
//       resetForm();
      
//     } catch (error) {
//       console.error('Manual transaction error:', error);
//       let errorMessage = 'Failed to add transaction';
      
//       if (error.response?.data?.detail) {
//         errorMessage = error.response.data.detail;
//       } else if (error.response?.status === 422) {
//         errorMessage = 'Invalid data. Please check the values.';
//       } else if (error.message?.includes('Network')) {
//         errorMessage = `Cannot connect to server at ${backendUrl}`;
//       }
      
//       Alert.alert('Error', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle date change
//   const onDateChange = (event, selectedDate) => {
//     setShowDatePicker(Platform.OS === 'ios');
//     if (selectedDate) {
//       setFormData(prev => ({ ...prev, date: selectedDate }));
//     }
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatFileSize = (bytes) => {
//     if (!bytes) return 'Unknown size';
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   // Get server status icon and color
//   const getServerStatusInfo = () => {
//     switch (serverStatus) {
//       case 'connected':
//         return { icon: <Wifi size={16} color="#22C55E" />, color: '#22C55E', text: 'Server Connected' };
//       case 'error':
//         return { icon: <WifiOff size={16} color="#EF4444" />, color: '#EF4444', text: 'Server Offline' };
//       default:
//         return { icon: <Clock size={16} color="#F59E0B" />, color: '#F59E0B', text: 'Checking...' };
//     }
//   };

//   const serverStatusInfo = getServerStatusInfo();

//   return (
//     <Theme name="dark">
//       <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
//         {/* HEADER */}
//         <XStack p={20} ai="center" space={16}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <ArrowLeft size={24} color="#EAB308" />
//           </TouchableOpacity>
          
//           <YStack flex={1}>
//             <H2 color="#EAB308" fontWeight="900" fontSize={28}>
//               Add Transactions
//             </H2>
//             <Text color="#666666" fontSize={14}>
//               Manual entry or bulk import
//             </Text>
//           </YStack>
//         </XStack>

//         {/* SERVER STATUS */}
//         <Card m={20} mb={16} backgroundColor="#1A1A1A" borderLeftWidth={4} borderLeftColor={serverStatusInfo.color}>
//           <TouchableOpacity onPress={showURLSelector}>
//             <XStack p={16} ai="center" space={12}>
//               {serverStatusInfo.icon}
//               <YStack flex={1}>
//                 <Text color={serverStatusInfo.color} fontSize={14} fontWeight="700">
//                   {serverStatusInfo.text}
//                 </Text>
//                 <Text color="#666666" fontSize={12} mt={2}>
//                   {backendUrl}
//                 </Text>
//                 <Text color="#666666" fontSize={10} mt={1}>
//                   Tap to change server URL
//                 </Text>
//               </YStack>
//               <RefreshCw size={16} color="#666666" />
//             </XStack>
//           </TouchableOpacity>
//         </Card>

//         {/* TROUBLESHOOTING FOR YOUR IP */}
//         {backendUrl.includes('10.62.17.195') && serverStatus === 'error' && (
//           <Card m={20} mb={16} backgroundColor="#1A1A1A" borderLeftWidth={4} borderLeftColor="#EF4444">
//             <YStack p={16} space={12}>
//               <XStack ai="center" space={12}>
//                 <AlertTriangle size={20} color="#EF4444" />
//                 <Text color="white" fontSize={14} fontWeight="700">
//                   Connection Troubleshooting
//                 </Text>
//               </XStack>
              
//               <Text color="#666666" fontSize={12}>
//                 For IP address 10.62.17.195 to work:
//               </Text>
              
//               <YStack space={6}>
//                 <XStack ai="center" space={8}>
//                   <Circle size={6} bg="#EF4444" />
//                   <Text color="#666666" fontSize={11}>
//                     Make sure both devices are on same Wi-Fi network
//                   </Text>
//                 </XStack>
                
//                 <XStack ai="center" space={8}>
//                   <Circle size={6} bg="#EF4444" />
//                   <Text color="#666666" fontSize={11}>
//                     Start FastAPI with: uvicorn main:app --host 0.0.0.0 --port 8000
//                   </Text>
//                 </XStack>
                
//                 <XStack ai="center" space={8}>
//                   <Circle size={6} bg="#EF4444" />
//                   <Text color="#666666" fontSize={11}>
//                     Check firewall allows port 8000
//                   </Text>
//                 </XStack>
//               </YStack>
              
//               <TouchableOpacity
//                 onPress={() => {
//                   Alert.alert(
//                     'ADB Reverse (Easier)',
//                     'Run this in terminal:\n\nadb reverse tcp:8000 tcp:8000\n\nThen use: http://localhost:8000',
//                     [{ text: 'OK' }]
//                   );
//                 }}
//                 style={{
//                   backgroundColor: '#333333',
//                   padding: 12,
//                   borderRadius: 8,
//                   alignItems: 'center',
//                 }}
//               >
//                 <Text color="#EAB308" fontSize={14} fontWeight="700">
//                   Try ADB Reverse Instead
//                 </Text>
//               </TouchableOpacity>
//             </YStack>
//           </Card>
//         )}

//         {/* MAIN ACTIONS */}
//         <ScrollView 
//           contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* QUICK ACTIONS */}
//           <YStack space={16} mb={24}>
//             <Text color="#EAB308" fontSize={16} fontWeight="800">
//               QUICK ACTIONS
//             </Text>
            
//             {/* Manual Entry Card */}
//             <TouchableOpacity onPress={() => setShowManualModal(true)}>
//               <Card backgroundColor="#1A1A1A" p={20} borderRadius={12} borderWidth={1} borderColor="#333333">
//                 <XStack ai="center" space={16}>
//                   <View style={{
//                     width: 52,
//                     height: 52,
//                     borderRadius: 16,
//                     backgroundColor: '#EAB30820',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                     <Plus size={24} color="#EAB308" />
//                   </View>
                  
//                   <YStack flex={1}>
//                     <Text color="white" fontWeight="800" fontSize={18}>
//                       Manual Entry
//                     </Text>
//                     <Text color="#666666" fontSize={13} mt={2}>
//                       Add single transaction with details
//                     </Text>
//                   </YStack>
                  
//                   <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
//                 </XStack>
//               </Card>
//             </TouchableOpacity>

//             {/* CSV Import Card */}
//             <TouchableOpacity onPress={handleSelectCSV} disabled={processingFile || serverStatus !== 'connected'}>
//               <Card 
//                 backgroundColor="#1A1A1A" 
//                 p={20} 
//                 borderRadius={12} 
//                 borderWidth={1} 
//                 borderColor="#333333"
//                 opacity={(processingFile || serverStatus !== 'connected') ? 0.7 : 1}
//               >
//                 <XStack ai="center" space={16}>
//                   <View style={{
//                     width: 52,
//                     height: 52,
//                     borderRadius: 16,
//                     backgroundColor: serverStatus === 'connected' ? '#22C55E20' : '#66666620',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                     {processingFile ? (
//                       <Spinner size={24} color="#22C55E" />
//                     ) : uploadComplete ? (
//                       <Check size={24} color="#22C55E" />
//                     ) : serverStatus === 'connected' ? (
//                       <Upload size={24} color="#22C55E" />
//                     ) : (
//                       <Upload size={24} color="#666666" />
//                     )}
//                   </View>
                  
//                   <YStack flex={1}>
//                     <Text color="white" fontWeight="800" fontSize={18}>
//                       CSV Import
//                     </Text>
//                     <Text color="#666666" fontSize={13} mt={2}>
//                       {processingFile ? `Uploading... ${uploadProgress}%` : 
//                        uploadComplete ? 'Upload Complete!' : 
//                        selectedFile ? `Selected: ${selectedFile.name}` : 
//                        serverStatus === 'connected' ? 'Upload bank statement CSV' : 
//                        'Connect to server first'}
//                     </Text>
                    
//                     {selectedFile && !processingFile && !uploadComplete && serverStatus === 'connected' && (
//                       <Text color="#666666" fontSize={11} mt={4}>
//                         Tap to upload and process
//                       </Text>
//                     )}
                    
//                     {processingFile && (
//                       <View style={{ marginTop: 8 }}>
//                         <View style={{
//                           height: 4,
//                           backgroundColor: '#333333',
//                           borderRadius: 2,
//                           overflow: 'hidden',
//                         }}>
//                           <View style={{
//                             width: `${uploadProgress}%`,
//                             height: '100%',
//                             backgroundColor: '#22C55E',
//                             borderRadius: 2,
//                           }} />
//                         </View>
//                       </View>
//                     )}
//                   </YStack>
                  
//                   <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
//                 </XStack>
//               </Card>
//             </TouchableOpacity>

//             {/* Selected File Info */}
//             {selectedFile && !processingFile && !uploadComplete && serverStatus === 'connected' && (
//               <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} borderLeftWidth={4} borderLeftColor="#22C55E">
//                 <YStack>
//                   <XStack ai="center" space={12} mb={12}>
//                     <FileText size={20} color="#22C55E" />
//                     <YStack flex={1}>
//                       <Text color="white" fontSize={14} fontWeight="700">
//                         {selectedFile.name}
//                       </Text>
//                       <Text color="#666666" fontSize={12}>
//                         {formatFileSize(selectedFile.size)}
//                       </Text>
//                     </YStack>
//                   </XStack>
                  
//                   <XStack space={8}>
//                     <TouchableOpacity
//                       onPress={() => handleCSVUpload(selectedFile)}
//                       style={{
//                         flex: 1,
//                         backgroundColor: '#22C55E',
//                         paddingVertical: 12,
//                         borderRadius: 8,
//                         alignItems: 'center',
//                         flexDirection: 'row',
//                         justifyContent: 'center',
//                       }}
//                     >
//                       <Upload size={16} color="white" mr={8} />
//                       <Text color="white" fontSize={14} fontWeight="700">
//                         Upload & Process
//                       </Text>
//                     </TouchableOpacity>
                    
//                     <TouchableOpacity
//                       onPress={resetCSVState}
//                       style={{
//                         padding: 12,
//                         backgroundColor: '#333333',
//                         borderRadius: 8,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                       }}
//                     >
//                       <X size={16} color="#666666" />
//                     </TouchableOpacity>
//                   </XStack>
//                 </YStack>
//               </Card>
//             )}
//           </YStack>

//           {/* IMPORTANT: Make sure your FastAPI server is running correctly */}
//           <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mb={24}>
//             <YStack space={12}>
//               <XStack ai="center" space={12}>
//                 <AlertTriangle size={20} color="#F59E0B" />
//                 <Text color="white" fontSize={14} fontWeight="700">
//                   IMPORTANT - For IP 10.62.17.195 to work:
//                 </Text>
//               </XStack>
              
//               <Text color="#666666" fontSize={12}>
//                 Run your FastAPI server with this command:
//               </Text>
              
//               <View style={{ backgroundColor: '#222222', padding: 12, borderRadius: 8 }}>
//                 <Text color="#EAB308" fontSize={11} fontFamily="monospace">
//                   uvicorn main:app --reload --host 0.0.0.0 --port 8000
//                 </Text>
//               </View>
              
//               <Text color="#666666" fontSize={11}>
//                 • --host 0.0.0.0 makes it accessible from other devices
//               </Text>
//               <Text color="#666666" fontSize={11}>
//                 • Both devices must be on same Wi-Fi network
//               </Text>
//               <Text color="#666666" fontSize={11}>
//                 • Check firewall allows port 8000
//               </Text>
              
//               <TouchableOpacity
//                 onPress={() => {
//                   Alert.alert(
//                     'Easier Alternative',
//                     'Use ADB reverse instead:\n\n1. Run: adb reverse tcp:8000 tcp:8000\n2. Change URL to: http://localhost:8000\n3. No network configuration needed',
//                     [{ text: 'OK' }]
//                   );
//                 }}
//                 style={{
//                   backgroundColor: '#333333',
//                   padding: 12,
//                   borderRadius: 8,
//                   alignItems: 'center',
//                   marginTop: 8,
//                 }}
//               >
//                 <Text color="#EAB308" fontSize={14} fontWeight="700">
//                   Use ADB Reverse (Recommended)
//                 </Text>
//               </TouchableOpacity>
//             </YStack>
//           </Card>

//           {/* CSV FORMAT GUIDE */}
//           <Card backgroundColor="#1A1A1A" p={16} borderRadius={12}>
//             <YStack space={12}>
//               <XStack ai="center" space={12}>
//                 <FileText size={20} color="#F59E0B" />
//                 <Text color="white" fontSize={14} fontWeight="700">
//                   CSV Format Guide
//                 </Text>
//               </XStack>
              
//               <Text color="#666666" fontSize={12}>
//                 Your CSV should include these columns:
//               </Text>
              
//               <View style={{ backgroundColor: '#222222', padding: 12, borderRadius: 8 }}>
//                 <Text color="#EAB308" fontSize={11} fontFamily="monospace">
//                   date,amount,description,category,merchant
//                 </Text>
//                 <Text color="#666666" fontSize={11} mt={4}>
//                   Example: 2024-01-15,125.50,Grocery Store,Groceries,Whole Foods
//                 </Text>
//               </View>
              
//               <Text color="#666666" fontSize={11}>
//                 • Date format: YYYY-MM-DD
//               </Text>
//               <Text color="#666666" fontSize={11}>
//                 • Amount: Positive numbers
//               </Text>
//               <Text color="#666666" fontSize={11}>
//                 • Category: Should match your budget categories
//               </Text>
//             </YStack>
//           </Card>
          
//           {/* DEBUG INFO */}
//           {__DEV__ && (
//             <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mt={16}>
//               <Text color="#F59E0B" fontSize={12} fontWeight="700" mb={8}>
//                 Debug Info
//               </Text>
//               <Text color="#666666" fontSize={10} fontFamily="monospace">
//                 Platform: {Platform.OS}
//               </Text>
//               <Text color="#666666" fontSize={10} fontFamily="monospace">
//                 Server URL: {backendUrl}
//               </Text>
//               <Text color="#666666" fontSize={10} fontFamily="monospace">
//                 Status: {serverStatus}
//               </Text>
//               <Text color="#666666" fontSize={10} fontFamily="monospace">
//                 Token: {AsyncStorage.getItem('auth_token') ? 'Available' : 'Missing'}
//               </Text>
//             </Card>
//           )}
//         </ScrollView>

//         {/* MANUAL ENTRY MODAL */}
//         <Modal
//           visible={showManualModal}
//           animationType="slide"
//           transparent={true}
//           onRequestClose={() => {
//             setShowManualModal(false);
//             resetForm();
//           }}
//         >
//           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
//             <View style={{ 
//               backgroundColor: '#1A1A1A', 
//               borderTopLeftRadius: 24, 
//               borderTopRightRadius: 24, 
//               padding: 24, 
//               paddingBottom: insets.bottom + 24,
//               maxHeight: '90%'
//             }}>
//               <XStack jc="space-between" ai="center" mb={24}>
//                 <H4 color="white" fontWeight="800" fontSize={20}>
//                   Add Manual Transaction
//                 </H4>
//                 <TouchableOpacity 
//                   onPress={() => {
//                     setShowManualModal(false);
//                     resetForm();
//                   }}
//                   style={{ padding: 8 }}
//                 >
//                   <X size={24} color="#666666" />
//                 </TouchableOpacity>
//               </XStack>

//               <ScrollView showsVerticalScrollIndicator={false}>
//                 <YStack space={20}>
//                   {/* Transaction Type */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Type *
//                     </Text>
//                     <View style={{ flexDirection: 'row', gap: 8 }}>
//                       {transactionTypes.map(type => (
//                         <TouchableOpacity
//                           key={type.value}
//                           onPress={() => setFormData(prev => ({ ...prev, transaction_type: type.value }))}
//                           style={{
//                             flex: 1,
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             paddingHorizontal: 12,
//                             paddingVertical: 12,
//                             backgroundColor: formData.transaction_type === type.value ? type.color + '20' : '#333333',
//                             borderRadius: 8,
//                             borderWidth: 1,
//                             borderColor: formData.transaction_type === type.value ? type.color : '#444444',
//                           }}
//                         >
//                           {React.cloneElement(type.icon, { 
//                             size: 14,
//                             color: formData.transaction_type === type.value ? type.color : '#666666'
//                           })}
//                           <Text 
//                             color={formData.transaction_type === type.value ? type.color : '#666666'} 
//                             fontSize={12} 
//                             fontWeight="700"
//                             ml={6}
//                           >
//                             {type.label}
//                           </Text>
//                         </TouchableOpacity>
//                       ))}
//                     </View>
//                   </YStack>

//                   {/* Amount */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Amount *
//                     </Text>
//                     <Input
//                       placeholder="0.00"
//                       value={formData.amount}
//                       onChangeText={(text) => setFormData(prev => ({ ...prev, amount: text }))}
//                       backgroundColor="#333333"
//                       borderColor="#444444"
//                       color="white"
//                       placeholderTextColor="#666666"
//                       keyboardType="decimal-pad"
//                       fontSize={16}
//                       br={8}
//                       prefix={<Text color="#666666" mr={8}>$</Text>}
//                     />
//                   </YStack>

//                   {/* Description */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Description *
//                     </Text>
//                     <Input
//                       placeholder="e.g., Grocery shopping, Salary, Restaurant bill"
//                       value={formData.description}
//                       onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
//                       backgroundColor="#333333"
//                       borderColor="#444444"
//                       color="white"
//                       placeholderTextColor="#666666"
//                       fontSize={16}
//                       br={8}
//                     />
//                   </YStack>

//                   {/* Category */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Category
//                     </Text>
//                     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                       <XStack space={8}>
//                         {categories.slice(0, 8).map(category => (
//                           <TouchableOpacity
//                             key={category}
//                             onPress={() => setFormData(prev => ({ ...prev, category: category }))}
//                             style={{
//                               paddingHorizontal: 12,
//                               paddingVertical: 8,
//                               backgroundColor: formData.category === category ? '#EAB30820' : '#333333',
//                               borderRadius: 20,
//                               borderWidth: 1,
//                               borderColor: formData.category === category ? '#EAB308' : '#444444',
//                             }}
//                           >
//                             <Text 
//                               color={formData.category === category ? '#EAB308' : '#666666'} 
//                               fontSize={12} 
//                               fontWeight="700"
//                             >
//                               {category}
//                             </Text>
//                           </TouchableOpacity>
//                         ))}
//                       </XStack>
//                     </ScrollView>
//                     <Input
//                       placeholder="Or enter custom category"
//                       value={formData.category}
//                       onChangeText={(text) => setFormData(prev => ({ ...prev, category: text }))}
//                       backgroundColor="#333333"
//                       borderColor="#444444"
//                       color="white"
//                       placeholderTextColor="#666666"
//                       fontSize={14}
//                       br={8}
//                       mt={8}
//                     />
//                   </YStack>

//                   {/* Merchant */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Merchant
//                     </Text>
//                     <Input
//                       placeholder="e.g., Amazon, Walmart, Restaurant name"
//                       value={formData.merchant}
//                       onChangeText={(text) => setFormData(prev => ({ ...prev, merchant: text }))}
//                       backgroundColor="#333333"
//                       borderColor="#444444"
//                       color="white"
//                       placeholderTextColor="#666666"
//                       fontSize={16}
//                       br={8}
//                     />
//                   </YStack>

//                   {/* Date */}
//                   <YStack>
//                     <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
//                       Date
//                     </Text>
//                     <TouchableOpacity
//                       onPress={() => setShowDatePicker(true)}
//                       style={{
//                         backgroundColor: '#333333',
//                         borderWidth: 1,
//                         borderColor: '#444444',
//                         borderRadius: 8,
//                         padding: 16,
//                       }}
//                     >
//                       <XStack ai="center" space={12}>
//                         <Calendar size={16} color="#666666" />
//                         <Text color="white" fontSize={16}>
//                           {formatDate(formData.date)} • {formatTime(formData.date)}
//                         </Text>
//                       </XStack>
//                     </TouchableOpacity>
//                   </YStack>

//                   {/* Submit Button */}
//                   <TouchableOpacity
//                     onPress={handleManualSubmit}
//                     disabled={loading || !formData.amount || !formData.description}
//                     style={{
//                       backgroundColor: '#EAB308',
//                       padding: 16,
//                       borderRadius: 12,
//                       alignItems: 'center',
//                       marginTop: 8,
//                       opacity: (loading || !formData.amount || !formData.description) ? 0.7 : 1,
//                     }}
//                   >
//                     {loading ? (
//                       <Spinner size="small" color="black" />
//                     ) : (
//                       <Text color="black" fontSize={16} fontWeight="800">
//                         Add Transaction
//                       </Text>
//                     )}
//                   </TouchableOpacity>
//                 </YStack>
//               </ScrollView>
//             </View>
//           </View>
//         </Modal>

//         {/* DATE PICKER */}
//         {showDatePicker && (
//           <DateTimePicker
//             value={formData.date}
//             mode="datetime"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={onDateChange}
//             maximumDate={new Date()}
//           />
//         )}
//       </SafeAreaView>
//     </Theme>
//   );
// }


import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  View,
  Platform,
  Modal,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import {
  YStack,
  XStack,
  Text,
  H2,
  H4,
  Theme,
  Spinner,
  Card,
  Input,
  Button,
  TextArea
} from 'tamagui';
import {
  ArrowLeft,
  Upload,
  FileText,
  DollarSign,
  Calendar,
  Tag,
  Building,
  Plus,
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  Smartphone,
  Shield,
  Zap,
  CreditCard,
  Wallet,
  TrendingUp,
  Home,
  Briefcase,
  Percent,
  Circle,
  Check,
  Wifi,
  WifiOff,
  MessageSquare,
  Mic,
  Camera,
  Type,
  Bot,
  Bell,
  Send,
  Scan
} from '@tamagui/lucide-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Audio } from 'expo-av';

// Services
import { ApiService } from '../services/apiService';

export default function Ingest() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State
  const [loading, setLoading] = useState(false);
  const [showIngestModal, setShowIngestModal] = useState(false);
  const [processingFile, setProcessingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  
  // Use YOUR IP address here
  const [backendUrl, setBackendUrl] = useState('http://10.62.17.195:8000');
  
  // Ingest form state
  const [formData, setFormData] = useState({
    raw_text: '',
    source: 'chatbot',
    sender: 'user'
  });

  // Source options matching your enum
  const sourceOptions = [
    { value: 'chatbot', label: 'AI Chat', icon: <Bot size={16} />, color: '#8B5CF6' },
    { value: 'manual', label: 'Manual', icon: <Type size={16} />, color: '#3B82F6' },
    { value: 'voice', label: 'Voice', icon: <Mic size={16} />, color: '#10B981' },
    { value: 'ocr', label: 'OCR/Image', icon: <Camera size={16} />, color: '#F59E0B' },
    { value: 'notification', label: 'Notification', icon: <Bell size={16} />, color: '#EF4444' },
    { value: 'csv', label: 'CSV', icon: <FileText size={16} />, color: '#22C55E' }
  ];

  // Check server connection
  const checkServerConnection = useCallback(async () => {
    try {
      setServerStatus('checking');
      console.log(`Checking connection to: ${backendUrl}`);
      
      // First, try to load saved URL from storage
      const savedUrl = await AsyncStorage.getItem('backend_url');
      if (savedUrl && savedUrl !== backendUrl) {
        console.log('Found saved URL:', savedUrl);
        setBackendUrl(savedUrl);
      }
      
      // Test the connection to ingest endpoint
      try {
        const response = await fetch(`${backendUrl}/api/v1/ingest/chatbot?raw_text=test`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        console.log('Connection response:', response.status);
        
        if (response.status < 500) {
          setServerStatus('connected');
          await AsyncStorage.setItem('backend_url', backendUrl);
          return;
        }
      } catch (e) {
        console.log('Ingest endpoint check failed:', e.message);
      }
      
      // Try root endpoint as fallback
      const response = await fetch(`${backendUrl}/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Root response:', response.status);
      
      if (response.ok) {
        setServerStatus('connected');
        await AsyncStorage.setItem('backend_url', backendUrl);
      } else {
        setServerStatus('error');
        console.log('Server responded but not OK:', response.status);
      }
    } catch (error) {
      console.log('Server check failed:', error.message);
      setServerStatus('error');
      
      // Try alternative URLs if current one fails
      if (backendUrl.includes('10.62.17.195')) {
        console.log('Trying alternative URLs...');
        
        const alternativeUrls = [
          'http://10.0.2.2:8000', // Android emulator
          'http://localhost:8000', // Localhost
          'http://192.168.1.100:8000', // Common local IP
        ];
        
        for (const url of alternativeUrls) {
          try {
            console.log(`Trying ${url}...`);
            const testResponse = await fetch(`${url}/`, {
              method: 'GET',
              timeout: 3000,
            });
            
            if (testResponse.ok) {
              console.log(`Found working URL: ${url}`);
              setBackendUrl(url);
              await AsyncStorage.setItem('backend_url', url);
              setServerStatus('connected');
              break;
            }
          } catch (e) {
            console.log(`${url} failed:`, e.message);
          }
        }
      }
    }
  }, [backendUrl]);

  useEffect(() => {
    checkServerConnection();
  }, [checkServerConnection]);

  // Reset form
  const resetForm = () => {
    setFormData({
      raw_text: '',
      source: 'chatbot',
      sender: 'user'
    });
    setSelectedFile(null);
    setSelectedImage(null);
  };

  // Reset upload state
  const resetUploadState = () => {
    setSelectedFile(null);
    setSelectedImage(null);
    setUploadProgress(0);
    setUploadComplete(false);
  };

  // Handle text ingestion
  const handleTextIngest = async () => {
    try {
      if (!formData.raw_text.trim()) {
        Alert.alert('Error', 'Please enter text to ingest');
        return;
      }

      setLoading(true);

      console.log('Sending text ingest to:', backendUrl);
      console.log('Data:', {
        source: formData.source,
        raw_text: formData.raw_text,
        sender: formData.sender
      });

      // Call ingest API with GET request
      const response = await ApiService.get(`/api/v1/ingest/${formData.source}`, {
        params: {
          raw_text: formData.raw_text,
          sender: formData.sender
        }
      });

      console.log('Ingest response:', response.data);

      Alert.alert(
        'Success!',
        `Text ingested successfully via ${formData.source}.\n\nResponse: ${response.data}`,
        [
          { 
            text: 'View Transactions', 
            onPress: () => router.push('/transactions')
          },
          { 
            text: 'OK', 
            style: 'default',
            onPress: () => {
              setShowIngestModal(false);
              resetForm();
            }
          }
        ]
      );
      
    } catch (error) {
      console.error('Text ingest error:', error);
      let errorMessage = 'Failed to ingest text';
      
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.status === 422) {
        errorMessage = 'Invalid data. Please check the values.';
      } else if (error.message?.includes('Network')) {
        errorMessage = `Cannot connect to server at ${backendUrl}`;
      } else if (error.response?.status === 404) {
        errorMessage = `Ingest endpoint /api/v1/ingest/${formData.source} not found`;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle image/OCR upload
  const handleImageUpload = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const image = result.assets[0];
        setSelectedImage(image);
        
        Alert.alert(
          'Image Selected',
          `Selected: ${image.fileName || 'image'}\n\nTap "Upload & Process" to extract text via OCR.`,
          [
            { text: 'Cancel', style: 'cancel', onPress: resetUploadState },
            { 
              text: 'Upload & Process', 
              onPress: () => handleOCRUpload(image)
            }
          ]
        );
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  // Handle OCR upload
  const handleOCRUpload = async (image) => {
    try {
      setProcessingFile(true);
      setUploadProgress(10);
      
      console.log('Starting OCR upload to:', backendUrl);
      console.log('Image:', image);

      // Create FormData
      const formData = new FormData();
      
      // Add image to FormData
      formData.append('file', {
        uri: image.uri,
        type: image.mimeType || 'image/jpeg',
        name: image.fileName || 'receipt.jpg',
      });
      
      setUploadProgress(30);

      // Get token from AsyncStorage
      let token;
      try {
        token = await AsyncStorage.getItem('auth_token');
        console.log('Token available:', !!token);
      } catch (tokenError) {
        console.log('Token error:', tokenError);
        token = null;
      }

      // Build the full URL
      const apiUrl = `${backendUrl}/api/v1/ingest/ocr`;
      console.log('API URL:', apiUrl);

      // Create headers
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      };

      // Add authorization if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Call API using fetch
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: formData,
      });

      setUploadProgress(70);

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
      }

      const responseData = await response.json();
      setUploadProgress(100);
      setUploadComplete(true);
      
      console.log('OCR upload successful:', responseData);

      Alert.alert(
        'Success!',
        `OCR processing successful!\n\n${responseData.message || 'Text extracted from image.'}`,
        [
          { 
            text: 'Use Extracted Text', 
            onPress: () => {
              if (responseData.extracted_text) {
                setFormData(prev => ({
                  ...prev,
                  raw_text: responseData.extracted_text,
                  source: 'ocr'
                }));
                setShowIngestModal(true);
              }
            }
          },
          { 
            text: 'OK', 
            style: 'default',
            onPress: resetUploadState
          }
        ]
      );
      
    } catch (error) {
      console.error('OCR upload error:', error);
      
      let errorMessage = 'Failed to process image';
      
      if (error.message.includes('Network request failed')) {
        errorMessage = `Cannot connect to ${backendUrl}\n\nPlease check server connection.`;
      } else {
        errorMessage = error.message;
      }
      
      Alert.alert('Upload Failed', errorMessage);
    } finally {
      setProcessingFile(false);
    }
  };

  // Handle CSV file selection
  const handleSelectCSV = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'application/vnd.ms-excel', 'text/comma-separated-values'],
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFile(file);
        
        Alert.alert(
          'CSV Selected',
          `Selected: ${file.name}\n\nWould you like to upload this CSV file?`,
          [
            { text: 'Cancel', style: 'cancel', onPress: resetUploadState },
            { 
              text: 'Upload CSV', 
              onPress: () => {
                // For CSV, we can treat it as text input
                Alert.alert(
                  'CSV Processing',
                  'CSV files can be processed as bulk text input. Would you like to open it in the text ingest form?',
                  [
                    { 
                      text: 'Yes, Open as Text', 
                      onPress: () => {
                        setFormData(prev => ({
                          ...prev,
                          raw_text: `CSV file: ${file.name}`,
                          source: 'csv'
                        }));
                        setShowIngestModal(true);
                      }
                    },
                    { text: 'No', style: 'cancel' }
                  ]
                );
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Document picker error:', error);
      Alert.alert('Error', 'Failed to select file');
    }
  };

  // Handle voice recording
  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant microphone permissions');
        return;
      }
      
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setIsRecording(false);
    
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    
    // For now, just show a message since we don't have voice processing endpoint
    Alert.alert(
      'Voice Recording',
      'Voice recording captured! For voice processing, use the text ingest form and select "voice" as source.',
      [
        {
          text: 'Open Text Form',
          onPress: () => {
            setFormData(prev => ({
              ...prev,
              raw_text: '[Voice recording placeholder]',
              source: 'voice'
            }));
            setShowIngestModal(true);
          }
        },
        { text: 'OK' }
      ]
    );
    
    setRecording(null);
  };

  // Show URL selector
  const showURLSelector = () => {
    const suggestions = [
      { label: 'Your IP (10.62.17.195)', url: 'http://10.62.17.195:8000' },
      { label: 'Android Emulator (10.0.2.2)', url: 'http://10.0.2.2:8000' },
      { label: 'Localhost (with ADB reverse)', url: 'http://localhost:8000' },
      { label: 'Common Local IP', url: 'http://192.168.1.100:8000' },
    ];
    
    Alert.alert(
      'Select Server URL',
      'Choose the correct URL for your setup:',
      [
        ...suggestions.map((suggestion, index) => ({
          text: suggestion.label,
          onPress: async () => {
            setBackendUrl(suggestion.url);
            await AsyncStorage.setItem('backend_url', suggestion.url);
            checkServerConnection();
          },
        })),
        {
          text: 'Custom URL',
          onPress: () => {
            Alert.prompt(
              'Enter Custom URL',
              'Enter your backend server URL:',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Save',
                  onPress: async (url) => {
                    if (url) {
                      if (!url.startsWith('http')) {
                        url = 'http://' + url;
                      }
                      setBackendUrl(url);
                      await AsyncStorage.setItem('backend_url', url);
                      checkServerConnection();
                    }
                  }
                }
              ],
              'plain-text',
              backendUrl
            );
          }
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get server status icon and color
  const getServerStatusInfo = () => {
    switch (serverStatus) {
      case 'connected':
        return { icon: <Wifi size={16} color="#22C55E" />, color: '#22C55E', text: 'Server Connected' };
      case 'error':
        return { icon: <WifiOff size={16} color="#EF4444" />, color: '#EF4444', text: 'Server Offline' };
      default:
        return { icon: <Clock size={16} color="#F59E0B" />, color: '#F59E0B', text: 'Checking...' };
    }
  };

  const serverStatusInfo = getServerStatusInfo();

  return (
    <Theme name="dark">
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        {/* HEADER */}
        <XStack p={20} ai="center" space={16}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#EAB308" />
          </TouchableOpacity>
          
          <YStack flex={1}>
            <H2 color="#EAB308" fontWeight="900" fontSize={28}>
              Smart Ingest
            </H2>
            <Text color="#666666" fontSize={14}>
              Multiple ways to add transactions
            </Text>
          </YStack>
        </XStack>

        {/* SERVER STATUS */}
        <Card m={20} mb={16} backgroundColor="#1A1A1A" borderLeftWidth={4} borderLeftColor={serverStatusInfo.color}>
          <TouchableOpacity onPress={showURLSelector}>
            <XStack p={16} ai="center" space={12}>
              {serverStatusInfo.icon}
              <YStack flex={1}>
                <Text color={serverStatusInfo.color} fontSize={14} fontWeight="700">
                  {serverStatusInfo.text}
                </Text>
                <Text color="#666666" fontSize={12} mt={2}>
                  {backendUrl}
                </Text>
                <Text color="#666666" fontSize={10} mt={1}>
                  Tap to change server URL
                </Text>
              </YStack>
              <RefreshCw size={16} color="#666666" />
            </XStack>
          </TouchableOpacity>
        </Card>

        {/* MAIN INGEST ACTIONS */}
        <ScrollView 
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* QUICK ACTIONS */}
          <YStack space={16} mb={24}>
            <Text color="#EAB308" fontSize={16} fontWeight="800">
              INGEST METHODS
            </Text>
            
            {/* Text Ingest Card */}
            <TouchableOpacity onPress={() => setShowIngestModal(true)}>
              <Card backgroundColor="#1A1A1A" p={20} borderRadius={12} borderWidth={1} borderColor="#333333">
                <XStack ai="center" space={16}>
                  <View style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    backgroundColor: '#8B5CF620',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <MessageSquare size={24} color="#8B5CF6" />
                  </View>
                  
                  <YStack flex={1}>
                    <Text color="white" fontWeight="800" fontSize={18}>
                      Text Ingest
                    </Text>
                    <Text color="#666666" fontSize={13} mt={2}>
                      Paste SMS, receipt text, or describe transaction
                    </Text>
                  </YStack>
                  
                  <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
                </XStack>
              </Card>
            </TouchableOpacity>

            {/* OCR/Image Card */}
            <TouchableOpacity onPress={handleImageUpload} disabled={processingFile}>
              <Card 
                backgroundColor="#1A1A1A" 
                p={20} 
                borderRadius={12} 
                borderWidth={1} 
                borderColor="#333333"
                opacity={processingFile ? 0.7 : 1}
              >
                <XStack ai="center" space={16}>
                  <View style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    backgroundColor: '#F59E0B20',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    {processingFile ? (
                      <Spinner size={24} color="#F59E0B" />
                    ) : uploadComplete ? (
                      <Check size={24} color="#F59E0B" />
                    ) : (
                      <Camera size={24} color="#F59E0B" />
                    )}
                  </View>
                  
                  <YStack flex={1}>
                    <Text color="white" fontWeight="800" fontSize={18}>
                      OCR/Image
                    </Text>
                    <Text color="#666666" fontSize={13} mt={2}>
                      {processingFile ? `Processing... ${uploadProgress}%` : 
                       uploadComplete ? 'Processing Complete!' : 
                       selectedImage ? `Selected: ${selectedImage.fileName}` : 
                       'Upload receipt or statement image'}
                    </Text>
                    
                    {processingFile && (
                      <View style={{ marginTop: 8 }}>
                        <View style={{
                          height: 4,
                          backgroundColor: '#333333',
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}>
                          <View style={{
                            width: `${uploadProgress}%`,
                            height: '100%',
                            backgroundColor: '#F59E0B',
                            borderRadius: 2,
                          }} />
                        </View>
                      </View>
                    )}
                  </YStack>
                  
                  <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
                </XStack>
              </Card>
            </TouchableOpacity>

            {/* Voice Card */}
            <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
              <Card backgroundColor="#1A1A1A" p={20} borderRadius={12} borderWidth={1} borderColor="#333333">
                <XStack ai="center" space={16}>
                  <View style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    backgroundColor: isRecording ? '#EF444420' : '#10B98120',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    {isRecording ? (
                      <View style={{
                        width: 20,
                        height: 20,
                        backgroundColor: '#EF4444',
                        borderRadius: 4,
                      }} />
                    ) : (
                      <Mic size={24} color="#10B981" />
                    )}
                  </View>
                  
                  <YStack flex={1}>
                    <Text color="white" fontWeight="800" fontSize={18}>
                      Voice Input
                    </Text>
                    <Text color="#666666" fontSize={13} mt={2}>
                      {isRecording ? 'Recording... Tap to stop' : 'Record voice transaction'}
                    </Text>
                  </YStack>
                  
                  <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
                </XStack>
              </Card>
            </TouchableOpacity>

            {/* CSV Card */}
            <TouchableOpacity onPress={handleSelectCSV}>
              <Card backgroundColor="#1A1A1A" p={20} borderRadius={12} borderWidth={1} borderColor="#333333">
                <XStack ai="center" space={16}>
                  <View style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    backgroundColor: '#22C55E20',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <FileText size={24} color="#22C55E" />
                  </View>
                  
                  <YStack flex={1}>
                    <Text color="white" fontWeight="800" fontSize={18}>
                      CSV Import
                    </Text>
                    <Text color="#666666" fontSize={13} mt={2}>
                      {selectedFile ? `Selected: ${selectedFile.name}` : 'Upload CSV bank statement'}
                    </Text>
                  </YStack>
                  
                  <ArrowLeft size={20} color="#666666" style={{ transform: [{ rotate: '180deg' }] }} />
                </XStack>
              </Card>
            </TouchableOpacity>
          </YStack>

          {/* INGESTION EXAMPLES */}
          <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mb={24}>
            <YStack space={12}>
              <XStack ai="center" space={12}>
                <MessageSquare size={20} color="#F59E0B" />
                <Text color="white" fontSize={14} fontWeight="700">
                  Ingestion Examples
                </Text>
              </XStack>
              
              <Text color="#666666" fontSize={12}>
                Try these formats:
              </Text>
              
              <View style={{ backgroundColor: '#222222', padding: 12, borderRadius: 8 }}>
                <Text color="#EAB308" fontSize={11} fontFamily="monospace">
                  • "Spent ₹500 at Starbucks" (Chat)
                </Text>
                <Text color="#666666" fontSize={11} mt={2}>
                  • "Received ₹75000 salary" (Manual)
                </Text>
                <Text color="#666666" fontSize={11} mt={2}>
                  • SMS: "You spent ₹1200 at BigBasket" (Notification)
                </Text>
                <Text color="#666666" fontSize={11} mt={2}>
                  • Receipt photo (OCR)
                </Text>
              </View>
            </YStack>
          </Card>

          {/* API INFORMATION */}
          <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mb={24}>
            <YStack space={12}>
              <XStack ai="center" space={12}>
                <Shield size={20} color="#8B5CF6" />
                <Text color="white" fontSize={14} fontWeight="700">
                  API Endpoints
                </Text>
              </XStack>
              
              <Text color="#666666" fontSize={12}>
                Available ingestion endpoints:
              </Text>
              
              <View style={{ backgroundColor: '#222222', padding: 12, borderRadius: 8 }}>
                <Text color="#EAB308" fontSize={11} fontFamily="monospace">
                  GET /api/v1/ingest/{source}
                </Text>
                <Text color="#666666" fontSize={11} mt={2}>
                  Parameters: raw_text, sender
                </Text>
                <Text color="#666666" fontSize={11} mt={4} fontFamily="monospace">
                  POST /api/v1/ingest/ocr
                </Text>
                <Text color="#666666" fontSize={11} mt={2}>
                  Multipart form: file (image)
                </Text>
              </View>
            </YStack>
          </Card>
          
          {/* DEBUG INFO */}
          {__DEV__ && (
            <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mt={16}>
              <Text color="#F59E0B" fontSize={12} fontWeight="700" mb={8}>
                Debug Info
              </Text>
              <Text color="#666666" fontSize={10} fontFamily="monospace">
                Platform: {Platform.OS}
              </Text>
              <Text color="#666666" fontSize={10} fontFamily="monospace">
                Server URL: {backendUrl}
              </Text>
              <Text color="#666666" fontSize={10} fontFamily="monospace">
                Status: {serverStatus}
              </Text>
              <Text color="#666666" fontSize={10} fontFamily="monospace">
                Current Source: {formData.source}
              </Text>
            </Card>
          )}
        </ScrollView>

        {/* TEXT INGEST MODAL */}
        <Modal
          visible={showIngestModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setShowIngestModal(false);
            resetForm();
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' }}>
              <View style={{ 
                backgroundColor: '#1A1A1A', 
                borderTopLeftRadius: 24, 
                borderTopRightRadius: 24, 
                padding: 24, 
                paddingBottom: insets.bottom + 24,
                maxHeight: '90%'
              }}>
                <XStack jc="space-between" ai="center" mb={24}>
                  <H4 color="white" fontWeight="800" fontSize={20}>
                    Text Ingest
                  </H4>
                  <TouchableOpacity 
                    onPress={() => {
                      setShowIngestModal(false);
                      resetForm();
                    }}
                    style={{ padding: 8 }}
                  >
                    <X size={24} color="#666666" />
                  </TouchableOpacity>
                </XStack>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <YStack space={20}>
                    {/* Source Selection */}
                    <YStack>
                      <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                        Source *
                      </Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <XStack space={8}>
                          {sourceOptions.map(option => (
                            <TouchableOpacity
                              key={option.value}
                              onPress={() => setFormData(prev => ({ ...prev, source: option.value }))}
                              style={{
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                backgroundColor: formData.source === option.value ? option.color + '20' : '#333333',
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: formData.source === option.value ? option.color : '#444444',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              {React.cloneElement(option.icon, { 
                                size: 14,
                                color: formData.source === option.value ? option.color : '#666666'
                              })}
                              <Text 
                                color={formData.source === option.value ? option.color : '#666666'} 
                                fontSize={12} 
                                fontWeight="700"
                                ml={6}
                              >
                                {option.label}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </XStack>
                      </ScrollView>
                    </YStack>

                    {/* Sender */}
                    <YStack>
                      <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                        Sender (Optional)
                      </Text>
                      <Input
                        placeholder="e.g., user, system, bank"
                        value={formData.sender}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, sender: text }))}
                        backgroundColor="#333333"
                        borderColor="#444444"
                        color="white"
                        placeholderTextColor="#666666"
                        fontSize={16}
                        br={8}
                      />
                    </YStack>

                    {/* Text Input */}
                    <YStack>
                      <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                        Text Content *
                      </Text>
                      <TextArea
                        placeholder="Paste SMS text, receipt content, or describe transaction..."
                        value={formData.raw_text}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, raw_text: text }))}
                        backgroundColor="#333333"
                        borderColor="#444444"
                        color="white"
                        placeholderTextColor="#666666"
                        fontSize={16}
                        br={8}
                        minHeight={120}
                        numberOfLines={6}
                        textAlignVertical="top"
                      />
                      <Text color="#666666" fontSize={11} mt={4}>
                        Examples: "Spent ₹500 at Starbucks", "Salary ₹75000", "Amazon purchase ₹2499"
                      </Text>
                    </YStack>

                    {/* Submit Button */}
                    <TouchableOpacity
                      onPress={handleTextIngest}
                      disabled={loading || !formData.raw_text.trim()}
                      style={{
                        backgroundColor: '#8B5CF6',
                        padding: 16,
                        borderRadius: 12,
                        alignItems: 'center',
                        marginTop: 8,
                        opacity: (loading || !formData.raw_text.trim()) ? 0.7 : 1,
                      }}
                    >
                      {loading ? (
                        <Spinner size="small" color="white" />
                      ) : (
                        <XStack ai="center" space={8}>
                          <Send size={16} color="white" />
                          <Text color="white" fontSize={16} fontWeight="800">
                            Ingest via {formData.source}
                          </Text>
                        </XStack>
                      )}
                    </TouchableOpacity>
                  </YStack>
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    </Theme>
  );
}
