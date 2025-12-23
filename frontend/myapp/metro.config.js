// // Learn more https://docs.expo.io/guides/customizing-metro
// /**
//  * @type {import('expo/metro-config').MetroConfig}
//  */
// const { getDefaultConfig } = require('expo/metro-config')
// const { withTamagui } = require('@tamagui/metro-plugin')

// const config = getDefaultConfig(__dirname, {
//   // [Web-only]: Enables CSS support in Metro.
//   isCSSEnabled: true,
// })

// config.resolver.sourceExts.push('mjs')

// module.exports = withTamagui(config, {
//   components: ['tamagui'],
//   config: './tamagui.config.ts',
//   outputCSS: './tamagui-web.css',
//   cssInterop: true,
// })


// // Learn more https://docs.expo.io/guides/customizing-metro
// /**
//  * @type {import('expo/metro-config').MetroConfig}
//  */
// const { getDefaultConfig } = require('expo/metro-config')
// const { withTamagui } = require('@tamagui/metro-plugin')

// const isProd = process.env.NODE_ENV === 'production';

// const config = getDefaultConfig(__dirname, {
//   // 🚀 FIX 1: Disable CSS extraction in production to stop the "Missing CSS" crash
//   isCSSEnabled:  false ,
// })

// config.resolver.sourceExts.push('mjs')

// // 🚀 FIX 2: Conditional Tamagui setup
// module.exports = withTamagui(config, {
//   components: ['tamagui'],
//   config: './tamagui.config.ts',
//   // Stop generating the physical CSS file during the Render build
//   outputCSS: isProd ? null : './tamagui-web.css',
//   cssInterop: true,
// })


const { getDefaultConfig } = require('expo/metro-config');
const { withTamagui } = require('@tamagui/metro-plugin');

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: false, // 🚀 FORCE DISABLE CSS
});

config.resolver.sourceExts.push('mjs');

// 🚀 THE NUCLEAR OPTION:
// If we are on Render (production), we return the PLAIN config.
// We DO NOT wrap it with withTamagui. This stops all CSS generation.
module.exports = process.env.NODE_ENV === 'production' 
  ? config 
  : withTamagui(config, {
      components: ['tamagui'],
      config: './tamagui.config.ts',
      outputCSS: './tamagui-web.css',
    });