// import { config as configBase } from '@tamagui/config/v3'
// import { createTamagui, createTokens } from 'tamagui'

// // 1. Define the "Dark AI" Palette
// const darkAiTokens = createTokens({
//   ...configBase.tokens,
//   color: {
//     ...configBase.tokens.color,
    
//     // --- GOLD ACCENTS ---
//     gold1: '#422006', // Deepest Gold (Backgrounds)
//     gold2: '#A16207', // Muted Gold
//     gold3: '#EAB308', // Primary Brand Gold
//     gold4: '#FACC15', // Bright Gold (Text/Icons)
//     gold5: '#FEF08A', // Pale Gold (Highlights)

//     // --- SILVER / CHROME ---
//     silver1: '#18181B', // Very Dark Silver
//     silver2: '#27272A', // Dark UI Elements
//     silver3: '#52525B', // Borders
//     silver4: '#A1A1AA', // Secondary Text
//     silver5: '#E4E4E7', // Bright Silver / White

//     // --- BASE ---
//     black: '#000000',     // True Black
//     blackCard: '#09090b', // Slightly off-black for cards
//     white: '#FFFFFF',
//   }
// })

// // 2. Create the Configuration
// export const config = createTamagui({
//   ...configBase,
//   tokens: darkAiTokens,
//   themes: {
//     ...configBase.themes,
//     dark: {
//       ...configBase.themes.dark,
//       background: darkAiTokens.color.black,
//       backgroundHover: darkAiTokens.color.silver1,
//       backgroundPress: darkAiTokens.color.silver2,
//       backgroundStrong: darkAiTokens.color.blackCard,
      
//       borderColor: darkAiTokens.color.silver2,
//       borderColorHover: darkAiTokens.color.gold3, // Gold border on hover
      
//       color: darkAiTokens.color.silver5,
//       colorHover: darkAiTokens.color.white,
      
//       // Primary Buttons = Gold
//       primary: darkAiTokens.color.gold3,
//       primaryHover: darkAiTokens.color.gold4,
//     },
//     light: {
//       // Fallback (mapped to silver for a "Cyber" look if switched)
//       background: darkAiTokens.color.silver5,
//       color: darkAiTokens.color.black,
//     }
//   }
// })

// export default config

// export type Conf = typeof config

// declare module 'tamagui' {
//   interface TamaguiCustomConfig extends Conf {}
// }


import { config as configBase } from '@tamagui/config/v3'
import { createTamagui, createTokens } from 'tamagui'

const darkAiTokens = createTokens({
  ...configBase.tokens,
  color: {
    ...configBase.tokens.color,
    
    // Gold Scale
    gold1: '#422006',
    gold2: '#A16207',
    gold3: '#EAB308', // Primary
    gold4: '#FACC15',
    gold5: '#FEF08A',

    // Silver Scale
    silver1: '#18181B',
    silver2: '#27272A',
    silver3: '#52525B',
    silver4: '#A1A1AA',
    
    // Base
    black: '#000000',
    white: '#FFFFFF',
  }
})

export const config = createTamagui({
  ...configBase,
  disableExtraction: true,
  tokens: darkAiTokens,
  themes: {
    ...configBase.themes,
    dark: {
      ...configBase.themes.dark,
      background: darkAiTokens.color.black,
      color: darkAiTokens.color.white,
      primary: darkAiTokens.color.gold3,
      borderColor: darkAiTokens.color.silver2,
    }
  }
})

export default config
export type Conf = typeof config
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}