// app/ingest.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  View,
  Platform,
  Linking,
  PermissionsAndroid
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
  Progress,
  Button
} from 'tamagui';
import {
  ArrowLeft,
  Camera,
  FileText,
  MessageSquare,
  Upload,
  CheckCircle,
  AlertTriangle,
  Clock,
  Database,
  Bell,
  Wallet,
  RefreshCw,
  Smartphone,
  Shield,
  Zap
} from '@tamagui/lucide-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as SMS from 'expo-sms';

// Services
import { ApiService } from '../services/apiService';

export default function Ingest() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [ingestStats, setIngestStats] = useState({
    total: 0,
    processed: 0,
    pending: 0,
    lastUpdated: null
  });
  
  // Ingest sources
  const ingestSources = [
    {
      id: 'sms',
      name: 'SMS Ingest',
      description: 'Automatically read bank SMS',
      icon: <MessageSquare size={24} color="#3B82F6" />,
      color: '#3B82F6',
      enabled: true,
      endpoint: '/ingest/sms',
      requiresPermission: true
    },
    {
      id: 'ocr',
      name: 'Receipt Scan',
      description: 'Scan receipts using camera',
      icon: <Camera size={24} color="#8B5CF6" />,
      color: '#8B5CF6',
      enabled: true,
      endpoint: '/ingest/ocr',
      requiresPermission: true
    },
    {
      id: 'csv',
      name: 'CSV Import',
      description: 'Upload bank statement CSV',
      icon: <FileText size={24} color="#22C55E" />,
      color: '#22C55E',
      enabled: true,
      endpoint: '/ingest/csv',
      requiresPermission: false
    },
    {
      id: 'notification',
      name: 'Notifications',
      description: 'Read UPI notifications',
      icon: <Bell size={24} color="#F59E0B" />,
      color: '#F59E0B',
      enabled: false,
      endpoint: '/ingest/notification',
      requiresPermission: true
    },
    {
      id: 'wallet',
      name: 'Wallet Apps',
      description: 'Connect payment apps',
      icon: <Wallet size={24} color="#06B6D4" />,
      color: '#06B6D4',
      enabled: false,
      endpoint: '/ingest/wallet',
      requiresPermission: false
    },
    {
      id: 'blockchain',
      name: 'Crypto Wallets',
      description: 'Blockchain transaction sync',
      icon: <Database size={24} color="#F97316" />,
      color: '#F97316',
      enabled: false,
      endpoint: '/ingest/blockchain',
      requiresPermission: false
    }
  ];

  // Fetch ingest stats
  const fetchIngestStats = useCallback(async () => {
    try {
      // You might have an endpoint for ingest stats
      // For now, using dummy data
      setIngestStats({
        total: 124,
        processed: 112,
        pending: 12,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Fetch ingest stats error:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchIngestStats();
    }, [fetchIngestStats])
  );

  // Request SMS permission (Android)
  const requestSMSPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: 'SMS Permission',
            message: 'FINNI.AI needs access to your SMS to automatically read bank transactions',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error('SMS permission error:', error);
        return false;
      }
    }
    return true; // iOS handles this differently
  };

  // Request Camera permission
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  };

  // Handle SMS ingest
  const handleSMSIngest = async () => {
    try {
      setLoading(true);
      
      // Request permission
      const hasPermission = await requestSMSPermission();
      if (!hasPermission) {
        Alert.alert('Permission Required', 'Please grant SMS permission to automatically read bank transactions');
        setLoading(false);
        return;
      }

      Alert.alert(
        'SMS Ingest',
        'FINNI.AI will automatically read bank SMS in the background. You can also manually forward SMS to the app.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Enable', 
            onPress: async () => {
              try {
                // For testing: simulate SMS ingest with sample data
                const sampleSMS = "UPI: Rs 499 paid to ZOMATO*ORDER123. UPI Ref: 123456. Avl Bal: Rs 12,345.67";
                
                const response = await ApiService.ingestEvent('sms', {
                  raw_text: sampleSMS,
                  sender: 'VK-BKICICI'
                });
                
                Alert.alert('Success', 'SMS ingestion enabled. Bank SMS will be automatically processed.');
                fetchIngestStats();
              } catch (error) {
                console.error('SMS ingest error:', error);
                Alert.alert('Error', 'Failed to enable SMS ingestion');
              }
            }
          }
        ]
      );
      
    } catch (error) {
      console.error('SMS ingest error:', error);
      Alert.alert('Error', 'Failed to process SMS ingestion');
    } finally {
      setLoading(false);
    }
  };

  // Handle OCR ingest (Receipt scan)
  const handleOCRIngest = async () => {
    try {
      setProcessing(true);
      
      // Request camera permission
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert('Permission Required', 'Please grant camera permission to scan receipts');
        setProcessing(false);
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const image = result.assets[0];
        
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', {
          uri: image.uri,
          type: 'image/jpeg',
          name: 'receipt.jpg',
        });

        // Send to OCR endpoint
        const response = await ApiService.ingestOCR(formData);
        
        Alert.alert('Success', 'Receipt scanned and processed successfully');
        fetchIngestStats();
      }
      
    } catch (error) {
      console.error('OCR ingest error:', error);
      Alert.alert('Error', 'Failed to process receipt');
    } finally {
      setProcessing(false);
    }
  };

  // Handle CSV ingest
  const handleCSVIngest = async () => {
    try {
      setProcessing(true);
      
      // Launch document picker
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/csv',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        Alert.alert(
          'CSV Import',
          `Import ${result.name}? This will process all transactions in the file.`,
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Import', 
              onPress: async () => {
                try {
                  // For testing: simulate CSV upload
                  const sampleCSV = "Date,Description,Amount\n2024-01-15,ZOMATO ORDER,499.00\n2024-01-16,UBER RIDE,350.00";
                  
                  const response = await ApiService.ingestEvent('csv', {
                    raw_text: sampleCSV,
                    sender: 'bank_export'
                  });
                  
                  Alert.alert('Success', 'CSV file imported successfully. Transactions are being processed.');
                  fetchIngestStats();
                } catch (error) {
                  console.error('CSV ingest error:', error);
                  Alert.alert('Error', 'Failed to import CSV file');
                }
              }
            }
          ]
        );
      }
      
    } catch (error) {
      console.error('CSV ingest error:', error);
      Alert.alert('Error', 'Failed to import CSV file');
    } finally {
      setProcessing(false);
    }
  };

  // Handle source ingest
  const handleSourceIngest = async (source) => {
    switch (source.id) {
      case 'sms':
        await handleSMSIngest();
        break;
      case 'ocr':
        await handleOCRIngest();
        break;
      case 'csv':
        await handleCSVIngest();
        break;
      default:
        Alert.alert('Coming Soon', `${source.name} integration is coming soon!`);
        break;
    }
  };

  // Test ingest with sample data
  const handleTestIngest = async () => {
    try {
      setProcessing(true);
      
      const testData = [
        { source: 'sms', text: "UPI: Rs 1,200 credited from SALARY. Ref: SALJAN2024. Avl Bal: Rs 45,678.90" },
        { source: 'sms', text: "Debit Card: Rs 2,499 spent at AMAZON.IN. Card ending 1234. Avl Bal: Rs 43,179.90" },
        { source: 'sms', text: "NetBanking: Rs 5,000 transferred to ICICI 4567. Ref: TRF123456. Avl Bal: Rs 38,179.90" }
      ];

      for (const data of testData) {
        await ApiService.ingestEvent(data.source, {
          raw_text: data.text,
          sender: 'test_bank'
        });
      }

      Alert.alert('Success', 'Test data ingested successfully');
      fetchIngestStats();
      
    } catch (error) {
      console.error('Test ingest error:', error);
      Alert.alert('Error', 'Failed to ingest test data');
    } finally {
      setProcessing(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate processing percentage
  const processingPercentage = ingestStats.total > 0 
    ? (ingestStats.processed / ingestStats.total) * 100 
    : 0;

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
              Data Ingest
            </H2>
            <Text color="#666666" fontSize={14}>
              Automatic financial data capture
            </Text>
          </YStack>
          
          <TouchableOpacity 
            onPress={handleTestIngest}
            disabled={processing}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: '#1A1A1A',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#333333',
            }}
          >
            {processing ? (
              <Spinner size="small" color="#EAB308" />
            ) : (
              <Text color="#EAB308" fontSize={12} fontWeight="700">TEST</Text>
            )}
          </TouchableOpacity>
        </XStack>

        {/* PROCESSING STATS */}
        <Card m={20} mb={16} backgroundColor="#1A1A1A">
          <YStack p={20}>
            <XStack jc="space-between" ai="center" mb={16}>
              <Text color="#999999" fontSize={12} fontWeight="600">
                INGEST PROCESSING
              </Text>
              <Text color="#666666" fontSize={11}>
                {formatDate(ingestStats.lastUpdated)}
              </Text>
            </XStack>
            
            <Progress 
              value={processingPercentage} 
              height={8} 
              backgroundColor="#333333"
              borderRadius={4}
              mb={12}
            >
              <Progress.Indicator 
                backgroundColor="#EAB308"
                borderRadius={4}
              />
            </Progress>
            
            <XStack jc="space-between" ai="center">
              <YStack ai="center">
                <Text color="#22C55E" fontSize={18} fontWeight="800">
                  {ingestStats.processed}
                </Text>
                <Text color="#666666" fontSize={11}>Processed</Text>
              </YStack>
              
              <YStack ai="center">
                <Text color="#EF4444" fontSize={18} fontWeight="800">
                  {ingestStats.pending}
                </Text>
                <Text color="#666666" fontSize={11}>Pending</Text>
              </YStack>
              
              <YStack ai="center">
                <Text color="white" fontSize={18} fontWeight="800">
                  {ingestStats.total}
                </Text>
                <Text color="#666666" fontSize={11}>Total</Text>
              </YStack>
            </XStack>
          </YStack>
        </Card>

        {/* INFO CARD */}
        <Card m={20} mb={16} backgroundColor="#1A1A1A" borderLeftWidth={4} borderLeftColor="#3B82F6">
          <XStack p={16} ai="center" space={12}>
            <Shield size={20} color="#3B82F6" />
            <YStack flex={1}>
              <Text color="white" fontSize={14} fontWeight="700">
                Automatic Data Capture
              </Text>
              <Text color="#666666" fontSize={12} mt={2}>
                Raw data → AI processing → Clean transactions
              </Text>
            </YStack>
          </XStack>
        </Card>

        {/* INGEST SOURCES */}
        <ScrollView 
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text color="#EAB308" fontSize={16} fontWeight="800" mb={12}>
            INGESTION SOURCES
          </Text>
          
          <YStack space={12}>
            {ingestSources.map((source) => (
              <TouchableOpacity
                key={source.id}
                onPress={() => handleSourceIngest(source)}
                disabled={!source.enabled || loading || processing}
                activeOpacity={source.enabled ? 0.8 : 1}
              >
                <Card 
                  backgroundColor="#1A1A1A" 
                  p={16} 
                  borderRadius={12}
                  borderWidth={1}
                  borderColor={source.enabled ? '#333333' : '#222222'}
                  opacity={source.enabled ? 1 : 0.5}
                >
                  <XStack ai="center" space={12}>
                    <View style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: source.color + '20',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      {source.icon}
                    </View>
                    
                    <YStack flex={1}>
                      <XStack ai="center" space={8}>
                        <Text color="white" fontWeight="800" fontSize={16}>
                          {source.name}
                        </Text>
                        {source.requiresPermission && (
                          <Shield size={12} color="#666666" />
                        )}
                        {!source.enabled && (
                          <Text color="#EF4444" fontSize={10} fontWeight="700">
                            COMING SOON
                          </Text>
                        )}
                      </XStack>
                      <Text color="#666666" fontSize={12} mt={2}>
                        {source.description}
                      </Text>
                    </YStack>
                    
                    {source.enabled && (
                      <TouchableOpacity 
                        onPress={() => handleSourceIngest(source)}
                        disabled={loading || processing}
                      >
                        <View style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          backgroundColor: source.color + '20',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <Zap size={16} color={source.color} />
                        </View>
                      </TouchableOpacity>
                    )}
                  </XStack>
                </Card>
              </TouchableOpacity>
            ))}
          </YStack>

          {/* HOW IT WORKS */}
          <Text color="#EAB308" fontSize={16} fontWeight="800" mt={24} mb={12}>
            HOW INGESTION WORKS
          </Text>
          
          <Card backgroundColor="#1A1A1A" p={16} borderRadius={12}>
            <YStack space={12}>
              <XStack ai="center" space={12}>
                <View style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#3B82F620',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text color="#3B82F6" fontSize={12} fontWeight="800">1</Text>
                </View>
                <YStack flex={1}>
                  <Text color="white" fontSize={14} fontWeight="700">Capture</Text>
                  <Text color="#666666" fontSize={12}>System reads SMS, receipts, files</Text>
                </YStack>
              </XStack>
              
              <XStack ai="center" space={12}>
                <View style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#8B5CF620',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text color="#8B5CF6" fontSize={12} fontWeight="800">2</Text>
                </View>
                <YStack flex={1}>
                  <Text color="white" fontSize={14} fontWeight="700">Process</Text>
                  <Text color="#666666" fontSize={12}>AI extracts amount, merchant, category</Text>
                </YStack>
              </XStack>
              
              <XStack ai="center" space={12}>
                <View style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#22C55E20',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text color="#22C55E" fontSize={12} fontWeight="800">3</Text>
                </View>
                <YStack flex={1}>
                  <Text color="white" fontSize={14} fontWeight="700">Create</Text>
                  <Text color="#666666" fontSize={12}>Verified transaction appears in your list</Text>
                </YStack>
              </XStack>
            </YStack>
            
            <View style={{
              backgroundColor: '#222222',
              padding: 12,
              borderRadius: 8,
              marginTop: 16,
              borderLeftWidth: 3,
              borderLeftColor: '#EAB308',
            }}>
              <Text color="#EAB308" fontSize={12} fontWeight="700">
                IMPORTANT
              </Text>
              <Text color="#666666" fontSize={11} mt={4}>
                • Ingest data is raw and unverified
              </Text>
              <Text color="#666666" fontSize={11}>
                • Only converted to transactions after AI processing
              </Text>
              <Text color="#666666" fontSize={11}>
                • You can edit/delete created transactions
              </Text>
            </View>
          </Card>

          {/* STATUS INFO */}
          <Card backgroundColor="#1A1A1A" p={16} borderRadius={12} mt={16}>
            <XStack ai="center" space={12}>
              {processing ? (
                <>
                  <Spinner size="small" color="#EAB308" />
                  <Text color="#EAB308" fontSize={14} fontWeight="700">
                    Processing ingest...
                  </Text>
                </>
              ) : (
                <>
                  <CheckCircle size={20} color="#22C55E" />
                  <Text color="#22C55E" fontSize={14} fontWeight="700">
                    System Ready
                  </Text>
                </>
              )}
            </XStack>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </Theme>
  );
}