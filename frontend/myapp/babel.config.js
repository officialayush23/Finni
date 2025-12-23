module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for Tamagui
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: true,
        },
      ],
      // Required for Reanimated (MUST BE LAST)
      'react-native-reanimated/plugin',
    ],
  };
};