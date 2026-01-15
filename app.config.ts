import "tsx/cjs";

import { ExpoConfig } from "expo/config";


module.exports = ({ config }: { config: ExpoConfig }) => {
  [
        "./plugins/withPlugin.ts",
      { message: "Custom message from app.config.ts" },
    ]
};


