/// <reference types="@capacitor-firebase/authentication" />

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sylentsys.akita',
  appName: 'akita',
  webDir: 'dist',
  plugins: {
    FirebaseAuthentication: {
      providers: [
        "google.com",
        "phone"
      ]
    }
  }
};

export default config;
