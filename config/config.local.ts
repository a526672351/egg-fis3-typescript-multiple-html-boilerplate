import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};

  config.development = {
    ignoreDirs: ['app/web', 'app/public', 'app/view'] // Specify the filtered directory (including subdirectories)
  };

  return config;
};
