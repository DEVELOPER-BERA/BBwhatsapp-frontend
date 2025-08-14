const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  config.resolve.alias['react-native$'] = 'react-native-web';
  config.resolve.extensions.push('.web.js', '.web.ts', '.web.tsx');
  
  return config;
};
