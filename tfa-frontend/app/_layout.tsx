import { TamaguiProvider, Theme } from 'tamagui'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import config from '../tamagui.config'

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) return null

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <Stack screenOptions={{ headerShown: false }} />
      </Theme>
    </TamaguiProvider>
  )
}