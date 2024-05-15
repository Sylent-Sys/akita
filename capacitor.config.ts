/// <reference types="@capacitor/splash-screen" />
/// <reference types="@capacitor-firebase/authentication" />

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sylentsys.akita',
  appName: 'akita',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      backgroundColor: "#FCF4EE"
    },
    FirebaseAuthentication: {
      providers: [
        "google.com",
        "phone"
      ]
    }
  }
};

export default config;
