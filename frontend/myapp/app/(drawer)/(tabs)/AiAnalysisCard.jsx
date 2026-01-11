import React, { useState, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Alert, 
  Clipboard,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { YStack, XStack, Text, Spinner, Card } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { Cpu, X, Copy, RefreshCw, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AiAnalysisCard({ 
  explanation, 
  onClose, 
  onRefresh, 
  loading = false
}) {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  
  const getText = () => {
    if (!explanation) return '';
    if (typeof explanation === 'object') {
      return explanation.summary || explanation.message || JSON.stringify(explanation, null, 2);
    }
    return explanation;
  };
  
  const handleCopy = () => {
    const text = getText();
    Clipboard.setString(text);
    Alert.alert('Copied!', 'Analysis copied to clipboard');
  };
  
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };
  
  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0 && height !== contentHeight) {
      setContentHeight(height);
    }
  };
  
  const text = getText();
  const estimatedLines = text.length / 50; // Rough estimate of lines
  const isLongText = estimatedLines > 10; // More than 10 lines
  
  return (
    <Card 
      bg="#1A1A1A" 
      p="$4" 
      br="$4" 
      mb="$6"
      borderWidth={1}
      borderColor="#3B82F6"
      style={{
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <YStack space="$3">
        {/* Header */}
        <XStack ai="center" space="$3" jc="space-between">
          <XStack ai="center" space="$3" f={1}>
            <LinearGradient
              colors={['#3B82F6', '#2563EB']}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Cpu size={18} color="white" />
            </LinearGradient>
            <YStack flex={1}>
              <Text color="#3B82F6" fontSize={14} fontWeight="800">
                AI FINANCIAL ANALYSIS
              </Text>
              <Text color="rgba(59, 130, 246, 0.7)" fontSize={11}>
                {isLongText ? (expanded ? 'Expanded' : 'Collapsed') : 'Complete analysis'}
              </Text>
            </YStack>
          </XStack>
          
          <XStack space="$2">
            {isLongText && (
              <TouchableOpacity
                onPress={toggleExpand}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                }}
              >
                {expanded ? (
                  <ChevronUp size={16} color="#3B82F6" />
                ) : (
                  <ChevronDown size={16} color="#3B82F6" />
                )}
              </TouchableOpacity>
            )}
            
            {onClose && (
              <TouchableOpacity
                onPress={onClose}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                }}
              >
                <X size={16} color="#EF4444" />
              </TouchableOpacity>
            )}
          </XStack>
        </XStack>
        
        {/* Divider */}
        <View style={{
          height: 1,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          marginVertical: 8,
        }} />
        
        {/* Content - Auto-expanding */}
        <View 
          onLayout={handleLayout}
          style={{
            overflow: 'hidden',
            maxHeight: isLongText ? (expanded ? undefined : 120) : undefined,
          }}
        >
          <Text 
            color="white" 
            fontSize={13} 
            lineHeight={22}
            selectable={true}
            userSelect="auto"
            style={{
              flexShrink: 1,
            }}
          >
            {text}
          </Text>
        </View>
        
        {/* Expand/Collapse indicator for long text */}
        {isLongText && (
          <TouchableOpacity
            onPress={toggleExpand}
            style={{
              paddingVertical: 6,
              alignItems: 'center',
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              borderRadius: 6,
              marginTop: 8,
            }}
          >
            <XStack ai="center" space="$1">
              <Text color="#3B82F6" fontSize={12} fontWeight="700">
                {expanded ? 'Show Less' : 'Show More'}
              </Text>
              {expanded ? (
                <ChevronUp size={12} color="#3B82F6" />
              ) : (
                <ChevronDown size={12} color="#3B82F6" />
              )}
            </XStack>
          </TouchableOpacity>
        )}
        
        {/* Footer */}
        <XStack jc="space-between" ai="center" mt="$3" pt="$3" borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)">
          <Text color="rgba(255,255,255,0.5)" fontSize={10}>
            Generated just now
          </Text>
          <XStack space="$2">
            <TouchableOpacity
              onPress={handleCopy}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Copy size={12} color="#3B82F6" />
              <Text color="#3B82F6" fontSize={10} fontWeight="700" ml="$1">
                COPY
              </Text>
            </TouchableOpacity>
            
            {onRefresh && (
              <TouchableOpacity
                onPress={onRefresh}
                disabled={loading}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  backgroundColor: 'rgba(234, 179, 8, 0.2)',
                  borderRadius: 6,
                  opacity: loading ? 0.7 : 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {loading ? (
                  <Spinner size="small" color="#EAB308" />
                ) : (
                  <>
                    <RefreshCw size={12} color="#EAB308" />
                    <Text color="#EAB308" fontSize={10} fontWeight="700" ml="$1">
                      REFRESH
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </XStack>
        </XStack>
      </YStack>
    </Card>
  );
}