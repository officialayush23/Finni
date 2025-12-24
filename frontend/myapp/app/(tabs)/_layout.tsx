// import { Tabs } from 'expo-router';
// import { LayoutDashboard, MessageSquare, Wallet, List, PieChart } from '@tamagui/lucide-icons';
// import { BlurView } from 'expo-blur';
// import { StyleSheet, Platform , View} from 'react-native';
// import { Theme } from 'tamagui';

// const CenterIcon = ({ children }: { children: React.ReactNode }) => (
//   <View style={styles.iconWrapper}>{children}</View>
// )

// export default function TabLayout() {
//   return (
//     <Theme name="dark">
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarShowLabel: false,

//           tabBarStyle: {
//             position: 'absolute',
//             bottom: Platform.OS === 'ios' ? 25 : 20,
//             left: 20,
//             right: 20,
//             height: 70,
//             borderRadius: 35,
//             backgroundColor: 'transparent',
//             borderTopWidth: 0,
//             elevation: 0,
//           },

//           tabBarBackground: () => (
//             <BlurView
//               tint="dark"
//               intensity={40}
//               style={[
//                 StyleSheet.absoluteFill,
//                 styles.blurBg,
//               ]}
//             />
//           ),
//         }}
//       >
//         <Tabs.Screen
//           name="index"
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <CenterIcon>
//                 <LayoutDashboard
//                   size={26}
//                   strokeWidth={2.3}
//                   color={focused ? '#EAB308' : '#A1A1AA'}
//                 />
//               </CenterIcon>
//             ),
//           }}
//         />

//         <Tabs.Screen
//           name="portfolio"
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <CenterIcon>
//                 <PieChart
//                   size={26}
//                   strokeWidth={2.3}
//                   color={focused ? '#EAB308' : '#A1A1AA'}
//                 />
//               </CenterIcon>
//             ),
//           }}
//         />

//         <Tabs.Screen
//           name="transactions"
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <CenterIcon>
//                 <List
//                   size={26}
//                   strokeWidth={2.3}
//                   color={focused ? '#EAB308' : '#A1A1AA'}
//                 />
//               </CenterIcon>
//             ),
//           }}
//         />

//         <Tabs.Screen
//           name="chat"
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <CenterIcon>
//                 <MessageSquare
//                   size={26}
//                   strokeWidth={2.3}
//                   color={focused ? '#EAB308' : '#A1A1AA'}
//                 />
//               </CenterIcon>
//             ),
//           }}
//         />
//       </Tabs>

//     </Theme>
//   );
// }


// const styles = StyleSheet.create({
//   blurBg: {
//     borderRadius: 35,
//     overflow: 'hidden',
//     backgroundColor: 'rgba(10,10,10,0.9)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.12)',
//   },
//   iconWrapper: {
//     width: '100%',
//     height: 70,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })

// import { Tabs } from 'expo-router';
// import { LayoutDashboard, MessageSquare, List, PieChart } from '@tamagui/lucide-icons';
// import { BlurView } from 'expo-blur';
// import { StyleSheet, Platform, View } from 'react-native';
// import { Theme } from 'tamagui';

// export default function TabLayout() {
//   return (
//     <Theme name="dark">
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarStyle: {
//             position: 'absolute',
//             bottom: Platform.OS === 'ios' ? 25 : 20,
//             left: 20,
//             right: 20,
//             height: 70,
//             borderRadius: 35,
//             backgroundColor: 'transparent',
//             borderTopWidth: 0,
//             elevation: 0,
//           },
//           tabBarBackground: () => (
//             <BlurView
//               tint="dark"
//               intensity={40}
//               style={[StyleSheet.absoluteFill, styles.blurBg]}
//             />
//           ),
//         }}
//       >
//         <Tabs.Screen
//           name="index"
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <LayoutDashboard size={26} color={focused ? '#EAB308' : '#A1A1AA'} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="portfolio"
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <PieChart size={26} color={focused ? '#EAB308' : '#A1A1AA'} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="transactions"
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <List size={26} color={focused ? '#EAB308' : '#A1A1AA'} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="chat"
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <MessageSquare size={26} color={focused ? '#EAB308' : '#A1A1AA'} />
//             ),
//           }}
//         />
//       </Tabs>
//     </Theme>
//   );
// }

// const styles = StyleSheet.create({
//   blurBg: {
//     borderRadius: 35,
//     overflow: 'hidden',
//     backgroundColor: 'rgba(10,10,10,0.9)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.12)',
//   },
// });