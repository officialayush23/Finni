import { Tabs } from 'expo-router';
import { LayoutDashboard, MessageSquare, Wallet, List, PieChart } from '@tamagui/lucide-icons';
import { BlurView } from 'expo-blur';
import { StyleSheet, Platform } from 'react-native';
import { Theme } from 'tamagui';

export default function TabLayout() {
  return (
    <Theme name="dark">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          // FIX: This creates the "Floating Glass" effect
          tabBarStyle: {
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 25 : 20,
            left: 20,
            right: 20,
            height: 70,
            borderRadius: 35,
            borderTopWidth: 0,
            elevation: 0, // Remove Android shadow
            backgroundColor: 'transparent', // Crucial for BlurView to work
          },
          // FIX: Add the Blur Background
          tabBarBackground: () => (
            <BlurView 
              tint="dark" 
              intensity={40} 
              style={[
                StyleSheet.absoluteFill, 
                { 
                  borderRadius: 35, 
                  overflow: 'hidden', 
                  backgroundColor: 'rgba(10,10,10,0.85)', 
                  borderWidth: 1, 
                  borderColor: 'rgba(255,255,255,0.1)' 
                } 
              ]} 
            />
          ),
          tabBarActiveTintColor: '#EAB308', // Gold
          tabBarInactiveTintColor: '#71717A', // Silver
        }}
      >
        {/* 1. DASHBOARD */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <LayoutDashboard color={color} size={24} />,
          }}
        />

        {/* 2. PORTFOLIO (Investments & Analysis) */}
        <Tabs.Screen
          name="portfolio"
          options={{
            title: "Portfolio",
            tabBarIcon: ({ color }) => <PieChart color={color} size={24} />,
          }}
        />

        {/* 3. TRANSACTIONS (History) */}
        <Tabs.Screen
          name="transactions"
          options={{
            title: "History",
            tabBarIcon: ({ color }) => <List color={color} size={24} />,
          }}
        />

        {/* 4. CHAT (AI Advisor) */}
        <Tabs.Screen
          name="chat"
          options={{
            title: "Advisor",
            tabBarIcon: ({ color }) => <MessageSquare color={color} size={24} />,
          }}
        />
      </Tabs>
    </Theme>
  );
}