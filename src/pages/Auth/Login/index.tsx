import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { ID } from "country-flag-icons/react/3x2";
import LogoAkitaGambarGepeng from "@resources/img/logo_akita_gambar_gepeng.png";
import LogoAkitaText from "@resources/img/logo_akita_text.png";
import "@resources/scss/AuthLogin.scss";
import { logoGoogle, personOutline } from "ionicons/icons";
import {
  authFirebase,
  signInWithGoogle,
  signInWithPhoneNumber,
} from "@plugins/Firebase";
import { useEffect, useState } from "react";
import { MaskitoOptions, maskitoTransform } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { RecaptchaVerifier } from "firebase/auth";
import { Capacitor } from "@capacitor/core";

function AuthLogin() {
  const router = useIonRouter();
  const phoneMaskOptions: MaskitoOptions = {
    mask: [
      "(",
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
      ")",
      " ",
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
      "-",
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
      "-",
      /[0-9]/,
    ],
  };
  const phoneMask = useMaskito({ options: phoneMaskOptions });
  const [phoneNumber, setPhoneNumber] = useState(
    maskitoTransform("", phoneMaskOptions)
  );
  const loading = useIonLoading();
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      const element = document.querySelector(
        ".container-otp > .recaptcha-container"
      ) as HTMLElement;
      if (element) {
        authFirebase.useDeviceLanguage();
        window.recaptchaVerifier = new RecaptchaVerifier(
          authFirebase,
          element,
          {
            size: "normal",
            callback: (_response: any) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              const unmaskedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");
              signInWithPhoneNumber(
                `+62${unmaskedPhoneNumber}`,
                router,
                loading
              );
            },
          }
        );
      } else {
        console.error("Element not found");
      }
    }
  }),
    [];
  return (
    <IonPage>
      <IonContent fullscreen={true} className="auth-page">
        <div className="ion-padding container-content">
          <img
            src={LogoAkitaGambarGepeng}
            alt="Logo Akita Gambar Gepeng"
            className="img-anjing"
          />
          <p className="welcome-title">Selamat Datang di</p>
          <div className="container-img-logo-text">
            <img
              src={LogoAkitaText}
              alt="Logo Akita Text"
              className="img-logo-text"
            />
          </div>
          <div className="container-otp">
            <IonInput
              aria-label="(xxx) xxxx-xxxx-x"
              labelPlacement="stacked"
              placeholder="(xxx) xxxx-xxxx-x"
              class="otp"
              fill="outline"
              onIonInput={(e) => {
                setPhoneNumber(e.detail.value || "");
              }}
              value={phoneNumber}
              ref={async (input) => {
                if (input) {
                  const inputElement = await input.getInputElement();
                  phoneMask(inputElement);
                }
              }}
            >
              <div slot="start">
                <div className="container-start">
                  <ID className="flag-country" aria-hidden="true" />
                  <p>+62 |</p>
                </div>
              </div>
            </IonInput>
            <div className="recaptcha-container"></div>
            <IonButton
              onClick={() => {
                if (Capacitor.isNativePlatform()) {
                  const unmaskedPhoneNumber = phoneNumber.replace(
                    /[^0-9]/g,
                    ""
                  );
                  signInWithPhoneNumber(
                    `+62${unmaskedPhoneNumber}`,
                    router,
                    loading
                  );
                } else {
                  window.recaptchaVerifier?.render();
                }
              }}
            >
              Kirim OTP
            </IonButton>
          </div>
          <div className="container-or">
            <div className="garis-1"></div>
            <p>OR</p>
            <div className="garis-2"></div>
          </div>
          <div className="container-login-by">
            <div className="google">
              <IonButton
                onClick={async (e) => {
                  e.preventDefault();
                  const result = await signInWithGoogle();
                  if (result) {
                    router.push("/auth/personalization", "forward", "replace");
                  }
                }}
              >
                <IonIcon slot="icon-only" icon={logoGoogle}></IonIcon>
                Lanjut dengan Google
              </IonButton>
            </div>
            <div className="guest">
              <IonButton
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/auth/personalization", "forward", "replace");
                }}
              >
                <IonIcon slot="icon-only" icon={personOutline}></IonIcon>
                Lanjut sebagai Tamu
              </IonButton>
            </div>
          </div>
          <div className="spacer">

          </div>
          <div className="container-terms-privacy">
            <p className="paragraf-1">Dengan melanjutkan, Anda menyetujui</p>
            <p className="paragraf-2">
              Syarat dan Ketentuan · Kebijakan Pribadi · Content Policy
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default AuthLogin;
