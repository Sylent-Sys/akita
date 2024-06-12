import { IonButton, IonContent, IonPage, useIonRouter } from "@ionic/react";
import AnjingTuru from "@resources/img/anjing_turu.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SkipText from "@components/SplashScreen/SkipText";
import "swiper/css/bundle";
import "@ionic/react/css/ionic-swiper.css";
import "@resources/scss/SplashScreen.scss";
import { useEffect } from "react";
import { Preferences } from "@capacitor/preferences";
import { authFirebase } from "@/plugins/Firebase";
import { FirebaseAuthentication, User } from "@capacitor-firebase/authentication";

function SplashScreen() {
  const router = useIonRouter();
  const checkAlreadyVisitSplashScreen = async () => {
    const isAlreadyVisitSplashScreen = await Preferences.get({
      key: "isAlreadyVisitSplashScreen",
    });
    if (isAlreadyVisitSplashScreen.value) {
      router.push("/auth/login", "forward", "replace");
    }
  };
  useEffect(() => {
    authFirebase;
    FirebaseAuthentication.addListener("authStateChange", async (event) => {
      const user = event.user as User;
      if (user) {
        router.push("/mainmenu", "forward", "replace");
      }
    });
    checkAlreadyVisitSplashScreen();
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen={true} className="splash-screen-page">
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide>
            <div className="ion-padding page one">
              <SkipText />
              <div className="welcome-container">
                <img src={AnjingTuru} alt="Anjing Turu" />
                <p className="welcome-title">
                  Aplikasi untuk menemani kamu sebagai anak kos, ditemani oleh{" "}
                  <span>Shiba Inu yang imut dan lucu~</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="ion-padding page two">
              <SkipText />
              <div className="welcome-container">
                <img src={AnjingTuru} alt="Anjing Turu" />
                <p className="welcome-title">
                  Bingung mau makan apa? Akita bakal rutin memberikan kamu resep{" "}
                  <span>setiap hari!</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="ion-padding page three">
              <SkipText />
              <div className="welcome-container">
                <img src={AnjingTuru} alt="Anjing Turu" />
                <p className="welcome-title">
                  Akita juga bakal bantu kamu <span>financial planning</span>{" "}
                  sebagai anak kos.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="ion-padding page four">
              <SkipText invisible />
              <div className="welcome-container">
                <img src={AnjingTuru} alt="Anjing Turu" />
                <p className="welcome-title">
                  Kamu sudah <span>siap</span> untuk mulai?
                </p>
                <IonButton
                  shape="round"
                  size="large"
                  onClick={async (e) => {
                    e.preventDefault();
                    router.push("/auth/login", "forward", "replace");
                    await Preferences.set({
                      key: "isAlreadyVisitSplashScreen",
                      value: "1",
                    });
                  }}
                >
                  Siap!
                </IonButton>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
}

export default SplashScreen;
