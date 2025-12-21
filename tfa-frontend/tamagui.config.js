// tamagui.config.js
const { createTamagui, createTokens } = require('tamagui');
const { config } = require('@tamagui/config/v3');

// Define your Dark AI Tokens
const darkAiTokens = createTokens({
  ...config.tokens,
  color: {
    ...config.tokens.color,
    // The Palette
    aiBlack: '#050505',      // Deepest background
    aiDarkGray: '#121212',   // Card backgrounds
    aiSilver: '#E0E0E0',     // Primary Text
    aiDimSilver: '#A0A0A0',  // Secondary Text
    aiGold: '#D4AF37',       // Primary Accent (Metallic Gold)
    aiGoldDim: '#8A7120',    // Muted Gold for borders
    aiSuccess: '#4CAF50',    // Green for positive growth
    aiError: '#CF6679',      // Red for alerts
  },
});

const appConfig = createTamagui({
  ...config,
  tokens: darkAiTokens,
  themes: {
    dark: {
      background: darkAiTokens.color.aiBlack,
      color: darkAiTokens.color.aiSilver,
      borderColor: darkAiTokens.color.aiGoldDim,
      cardBackground: darkAiTokens.color.aiDarkGray,
      primary: darkAiTokens.color.aiGold,
    },
    light: {
      background: '#FFFFFF',
      color: '#000000',
    }
  },
});

module.exports = appConfig;
// This line helps if something expects a default export
module.exports.default = appConfig;