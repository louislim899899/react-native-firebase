// a combined plugin that applies both platform-specific plugins. This approach allows the maintenance of platform-specific code separately while providing a single entry point.

import { ConfigPlugin } from 'expo/config-plugins';
import withAndroidPlugin from './withAndroidPlugin';
import withIosPlugin from './withIosPlugin';

const withPlugin: ConfigPlugin<{message?: string}> = (config, options = {}) => {
  // Apply Android modifications first
  config = withAndroidPlugin(config, options);
  // Then apply iOS modifications and return
  return withIosPlugin(config, options);
};

export default withPlugin;
