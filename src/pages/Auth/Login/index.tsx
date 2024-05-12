import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { ID } from "country-flag-icons/react/3x2";
import LogoAkitaGambarGepeng from "@resources/img/logo_akita_gambar_gepeng.png";
import LogoAkitaText from "@resources/img/logo_akita_text.png";
import "@resources/scss/AuthLogin.scss";
import { logoGoogle, personOutline } from "ionicons/icons";
function AuthLogin() {
  const router = useIonRouter();
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
              aria-label="Phone Number"
              labelPlacement="stacked"
              placeholder="Phone Number"
              class="otp"
              fill="outline"
            >
              <div slot="start">
                <div className="container-start">
                  <ID className="flag-country" aria-hidden="true" />
                  <p>+62 |</p>
                </div>
              </div>
            </IonInput>
            <IonButton>Kirim OTP</IonButton>
          </div>
          <div className="container-or">
            <div className="garis-1"></div>
            <p>OR</p>
            <div className="garis-2"></div>
          </div>
          <div className="container-login-by">
            <div className="google">
              <IonButton>
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
