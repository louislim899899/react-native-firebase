import { ConfigPlugin, withInfoPlist } from 'expo/config-plugins';

type IosProps = {
  message?: string;
};

const withIosPlugin: ConfigPlugin<IosProps> = (config, options = {}) => {
  // Define the custom message
  // const message = 'Hello world, from Expo plugin!';
  const message = options.message || 'Hello world, from Expo plugin!';

  return withInfoPlist(config, config => {
    // Add the custom message to the Info.plist file
    config.modResults.HelloWorldMessage = message;
    return config;
  });
};

export default withIosPlugin;
