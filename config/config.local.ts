import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};

  config.development = {
    ignoreDirs: ['app/web', 'app/public', 'app/view'], // Specify the filtered directory (including subdirectories)
  };
  config.assets = {
    devServer: {
      command: 'npm run build',
      port: 7001,
      debug: true,
    },
  };

  return config;
};
