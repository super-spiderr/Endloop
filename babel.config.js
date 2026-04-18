module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@assets': './src/assets',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
