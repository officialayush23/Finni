// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Drawer } from 'expo-router/drawer';
// import { Theme, YStack, H2, Text, Separator, XStack, Button } from 'tamagui';
// import { LogOut, Settings, ShieldCheck, Zap, User } from '@tamagui/lucide-icons';
// import { StyleSheet } from 'react-native';

// /**
//  * CUSTOM SIDEBAR UI
//  * This is what users see when they click the Logo.
//  */
// function CustomDrawerContent() {
//   return (
//     <Theme name="dark">
//       <YStack f={1} bg="#050505" p="$5" pt="$10" space="$4">
        
//         {/* Profile Section */}
//         <XStack ai="center" space="$4" mb="$6">
//           <YStack w={60} h={60} br={30} bg="$gold3" jc="center" ai="center">
//             <User size={30} color="black" />
//           </YStack>
//           <YStack>
//             <H2 fontSize={20} color="white">Finni Pro</H2>
//             <Text color="$silver4" fontSize={12}>Premium Member</Text>
//           </YStack>
//         </XStack>

//         <Separator bc="rgba(255,255,255,0.1)" />

//         {/* Menu Items */}
//         <YStack space="$2" mt="$4">
//           <SidebarItem Icon={ShieldCheck} label="Security" />
//           <SidebarItem Icon={Zap} label="Neural Settings" />
//           <SidebarItem Icon={Settings} label="App Preferences" />
//         </YStack>

//         {/* Bottom Section */}
//         <YStack f={1} jc="flex-end" pb="$8">
//           <Button 
//             icon={<LogOut size={20} />} 
//             bg="rgba(255, 50, 50, 0.1)" 
//             color="#ff4444"
//             br="$4"
//             borderWidth={1}
//             borderColor="rgba(255, 50, 50, 0.2)"
//           >
//             Logout Session
//           </Button>
//         </YStack>

//       </YStack>
//     </Theme>
//   );
// }

// // Helper component for cleaner menu items
// function SidebarItem({ Icon, label }) {
//   return (
//     <XStack ai="center" space="$4" p="$4" br="$4" hoverStyle={{ bg: 'rgba(255,255,255,0.05)' }}>
//       <Icon size={22} color="#EAB308" />
//       <Text color="white" fontSize={16} fontWeight="500">{label}</Text>
//     </XStack>
//   );
// }

// /**
//  * MAIN DRAWER LAYOUT
//  * This wraps the (tabs) group.
//  */
// export default function DrawerLayout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer
//         drawerContent={() => <CustomDrawerContent />}
//         screenOptions={{
//           headerShown: false, // We use our custom navbar instead
//           drawerType: 'front', // 🚀 This creates the "Overlay" effect
//           drawerStyle: {
//             width: '85%', // Covers almost the whole screen
//             backgroundColor: '#050505',
//           },
//           overlayColor: 'rgba(0,0,0,0.7)', // Darkens the background when open
//         }}
//       >
//         {/* This points to your (tabs) folder */}
//         <Drawer.Screen
//           name="(tabs)"
//           options={{
//             drawerLabel: 'Home',
//           }}
//         />
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }

import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Theme, YStack, H3, Text, Separator, Button } from 'tamagui';
import { User, Shield, Zap, Settings, LogOut } from '@tamagui/lucide-icons';

function SidebarContent() {
  return (
    <Theme name="dark">
      <YStack f={1} bg="#050505" p="$5" pt="$12" space="$4">
        <YStack ai="center" space="$2" mb="$6">
          
          <H3 color="white">ABOUT PAGE</H3>
          <H3 color="white">Finni Intelligence</H3>
          <Text color="$silver4">Techfiesta</Text>
        </YStack>

        <Separator bc="rgba(255,255,255,0.1)" />

        <YStack space="$2" mt="$4">
          <Button chromeless color="white" jc="flex-start">This is settings page </Button>
          <Button chromeless color="white" jc="flex-start"></Button>
          <Button  chromeless color="white" jc="flex-start"></Button>
        </YStack>

        <YStack f={1} jc="flex-end" pb="$8">
          <Button themeInverse bg="$red10" color="white" icon={<LogOut size={18}/>}>Sign Out</Button>
        </YStack>
      </YStack>
    </Theme>
  );
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={() => <SidebarContent />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front', // 🚀 This creates the Sidebar Overlay
          drawerStyle: {
            width: '80%',
            backgroundColor: '#050505',
          },
          overlayColor: 'rgba(0,0,0,0.8)',
        }}
      />
    </GestureHandlerRootView>
  );
}