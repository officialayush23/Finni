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


module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          // 🚀 THIS IS THE FIX: Disable extraction for production to stop the Render crash.
          // In development (on your laptop), it stays 'false' so you get fast reloads.
          disableExtraction: process.env.NODE_ENV === 'production', 
        },
      ],
      'react-native-reanimated/plugin', // Keep this as the last plugin
    ],
  };
};