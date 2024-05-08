/// <reference types="@capacitor/splash-screen" />

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sylentsys.akita',
  appName: 'akita',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      backgroundColor: "#FCF4EE"
    }
  }
};

export default config;
