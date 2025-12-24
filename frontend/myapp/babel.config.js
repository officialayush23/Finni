// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       // Required for Tamagui
//       [
//         '@tamagui/babel-plugin',
//         {
//           components: ['tamagui'],
//           config: './tamagui.config.ts',
//           logTimings: true,
//           disableExtraction: true,
//         },
//       ],
//       // Required for Reanimated (MUST BE LAST)
//       'react-native-reanimated/plugin',
//     ],
//   };
// };


// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       [
//         '@tamagui/babel-plugin',
//         {
//           components: ['tamagui'],
//           config: './tamagui.config.ts',
//           logTimings: true,
//           disableExtraction: true, 
//         },
//       ],
//       'react-native-reanimated/plugin', // Keep this as the last plugin
//     ],
//   };
// };


module.exports = function (api) {
  api.cache(true);
  
  const isWebProd = process.env.NODE_ENV === 'production';

  // Base plugins
  const plugins = ['react-native-reanimated/plugin'];

  // 🚀 ONLY add the Tamagui plugin if we ARE NOT in web production
  if (!isWebProd) {
    plugins.unshift([
      '@tamagui/babel-plugin',
      {
        components: ['tamagui'],
        config: './tamagui.config.ts',
      },
    ]);
  }

  return {
    presets: ['babel-preset-expo'],
    plugins: plugins,
  };
};