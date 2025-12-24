// // import '../tamagui-web.css'
// // import { useEffect } from 'react'
// // import { StatusBar } from 'expo-status-bar'
// // import { DarkTheme, ThemeProvider } from '@react-navigation/native'
// // import { useFonts } from 'expo-font'
// // import { SplashScreen, Stack } from 'expo-router'
// // import { Provider } from '../components/Provider'
// // import { useTheme } from 'tamagui'

// // export { ErrorBoundary } from 'expo-router'

// // export const unstable_settings = {
// //   // CORRECTED: Start at 'index' (Login Screen), not '(tabs)'
// //   initialRouteName: 'index',
// // }

// // SplashScreen.preventAutoHideAsync()

// // export default function RootLayout() {
// //   const [interLoaded, interError] = useFonts({
// //     Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
// //     InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
// //   })

// //   useEffect(() => {
// //     if (interLoaded || interError) {
// //       SplashScreen.hideAsync()
// //     }
// //   }, [interLoaded, interError])

// //   if (!interLoaded && !interError) return null

// //   return (
// //     <Providers>
// //       <RootLayoutNav />
// //     </Providers>
// //   )
// // }

// // const Providers = ({ children }: { children: React.ReactNode }) => {
// //   return <Provider>{children}</Provider>
// // }

// // function RootLayoutNav() {
// //   const theme = useTheme()
// //   return (
// //     <ThemeProvider value={DarkTheme}>
// //       <StatusBar style="light" />
// //       <Stack>
// //         {/* Login Screen (First Screen) */}
// //         <Stack.Screen 
// //           name="index" 
// //           options={{ headerShown: false, animation: 'fade' }} 
// //         />
        
// //         {/* Main App Tabs */}
// //         <Stack.Screen 
// //           name="(tabs)" 
// //           options={{ headerShown: false, animation: 'fade_from_bottom' }} 
// //         />

// //         <Stack.Screen 
// //           name="modal" 
// //           options={{
// //             presentation: 'modal',
// //             contentStyle: { backgroundColor: theme.background.val },
// //           }} 
// //         />
// //       </Stack>
// //     </ThemeProvider>
// //   )
// // }


// import '../tamagui-web.css'
// import { useEffect } from 'react'
// import { StatusBar } from 'expo-status-bar'
// import { DarkTheme, ThemeProvider } from '@react-navigation/native'
// import { useFonts } from 'expo-font'
// import { SplashScreen, Stack } from 'expo-router'
// import { Provider } from '../components/Provider'
// import { useTheme } from 'tamagui'

// export { ErrorBoundary } from 'expo-router'

// export const unstable_settings = {
//   initialRouteName: 'index',
// }

// SplashScreen.preventAutoHideAsync()

// export default function RootLayout() {
//   const [interLoaded, interError] = useFonts({
//     Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
//     InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
//   })

//   useEffect(() => {
//     if (interLoaded || interError) {
//       SplashScreen.hideAsync()
//     }
//   }, [interLoaded, interError])

//   if (!interLoaded && !interError) return null

//   return (
//     <Providers>
//       <RootLayoutNav />
//     </Providers>
//   )
// }

// const Providers = ({ children }: { children: React.ReactNode }) => {
//   return <Provider>{children}</Provider>
// }

// function RootLayoutNav() {
//   const theme = useTheme()
//   return (
//     <ThemeProvider value={DarkTheme}>
//       <StatusBar style="light" />
//       <Stack>
//         <Stack.Screen 
//           name="index" 
//           options={{ headerShown: false, animation: 'fade' }} 
//         />
//         <Stack.Screen 
//           name="(tabs)" 
//           options={{ headerShown: false, animation: 'fade_from_bottom' }} 
//         />
//         <Stack.Screen 
//           name="modal" 
//           options={{
//             presentation: 'modal',
//             contentStyle: { backgroundColor: theme.background.val },
//           }} 
//         />
//       </Stack>
//     </ThemeProvider>
//   )
// }


// import { useEffect } from 'react';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { TamaguiProvider, Theme } from 'tamagui';
// import { PortalProvider } from '@tamagui/portal'; // <--- 1. IMPORT THIS
// import config from '../tamagui.config';

// export default function RootLayout() {
//   const [loaded] = useFonts({
//     Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
//     InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       // Hide splash screen if you are managing it
//     }
//   }, [loaded]);

//   if (!loaded) return null;

//   return (
//     <TamaguiProvider config={config} defaultTheme="dark">
//       <Theme name="dark">
//         {/* 2. WRAP YOUR APP IN PORTAL PROVIDER */}
//         <PortalProvider shouldAddRootHost>
//           <Stack screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="(tabs)" />
//             <Stack.Screen name="index" />
//             <Stack.Screen name="profile" options={{ presentation: 'modal' }} />
//             <Stack.Screen name="income" options={{ presentation: 'modal' }} />
//           </Stack>
//         </PortalProvider>
//       </Theme>
//     </TamaguiProvider>
//   );
// }




import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { TamaguiProvider, Theme } from 'tamagui';
import { PortalProvider } from '@tamagui/portal'; // <--- 1. IMPORT THIS
import config from '../tamagui.config';

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      // Hide splash screen if you interact with it manually
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
  <TamaguiProvider config={config} defaultTheme="dark">
    {/* 🚀 Move Theme inside TamaguiProvider but outside PortalProvider */}
    <Theme name="dark">
      <PortalProvider shouldAddRootHost>
        <Stack screenOptions={{ headerShown: false }}>
           <Stack.Screen name="index" />
           <Stack.Screen name="(tabs)" />
           {/* ... rest of your screens ... */}
        </Stack>
      </PortalProvider>
    </Theme>
  </TamaguiProvider>
);

  // return (
  //   <TamaguiProvider config={config} defaultTheme="dark">
  //     <Theme name="dark">
        
  //       {/* 2. WRAP THE STACK IN PORTAL PROVIDER */}
  //       <PortalProvider shouldAddRootHost>
  //         <Stack screenOptions={{ headerShown: false }}>
  //           <Stack.Screen name="(tabs)" />
  //           <Stack.Screen name="index" />
  //           <Stack.Screen 
  //             name="income" 
  //             options={{ 
  //               presentation: 'card',
  //               animation: 'slide_from_right'
  //             }} 
  //           />
  //           <Stack.Screen 
  //             name="profile" 
  //             options={{ 
  //               presentation: 'modal',
  //               animation: 'slide_from_bottom' 
  //             }} 
  //           />
  //         </Stack>
  //       </PortalProvider>

  //     </Theme>
  //   </TamaguiProvider>
  // );
}