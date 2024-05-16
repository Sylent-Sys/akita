// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  indexedDBLocalPersistence,
  initializeAuth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
} from "firebase/auth";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { getAnalytics } from "firebase/analytics";
import { Capacitor } from "@capacitor/core";
import { Dialog } from "@capacitor/dialog";
import { UseIonLoadingResult, UseIonRouterResult } from "@ionic/react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//  declare global
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const getAuthFirebase = () => {
  if (Capacitor.isNativePlatform()) {
    return initializeAuth(app, {
      persistence: indexedDBLocalPersistence,
    });
  } else {
    return getAuth(app);
  }
};
export const appFirebase = app;
export const authFirebase = getAuthFirebase();
export const signInWithGoogle = async () => {
  // 1. Create credentials on the native layer
  const result = await FirebaseAuthentication.signInWithGoogle();
  // 2. Sign in on the web layer using the id token
  const credential = GoogleAuthProvider.credential(result.credential?.idToken);
  const auth = getAuthFirebase();
  return await signInWithCredential(auth, credential);
};

export const signInWithPhoneNumber = (
  phoneNumber: string,
  router: UseIonRouterResult,
  loading: UseIonLoadingResult
) => {
  const [present, dismiss] = loading;
  return new Promise<void>(async (resolve) => {
    await FirebaseAuthentication.addListener("phoneCodeSent", async (event) => {
      // 2. Let the user enter the SMS code
      const { value, cancelled } = await Dialog.prompt({
        title: "Enter Verification Code",
        message: `Please enter the verification code that was sent to your mobile device.`,
      });
      if (cancelled) {
        return;
      }
      // 3. Sign in on the web layer using the verification ID and verification code.
      const credential = PhoneAuthProvider.credential(
        event.verificationId,
        value ?? ""
      );
      const auth = getAuthFirebase();
      const result = await signInWithCredential(auth, credential);
      dismiss();
      if (result) {
        router.push("/auth/personalization", "forward", "replace");
      }
      resolve();
    });
    present({
      message: "Sending OTP...",
    });
    // 1. Start phone number verification
    return await FirebaseAuthentication.signInWithPhoneNumber({
      phoneNumber: phoneNumber,
      timeout: 0, // Disable SMS auto-retrieval
      recaptchaVerifier: Capacitor.isNativePlatform()
        ? undefined
        : window.recaptchaVerifier,
    });
  });
};
