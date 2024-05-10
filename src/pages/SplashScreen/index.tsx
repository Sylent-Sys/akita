import { IonButton, IonContent, IonPage } from "@ionic/react";
import AnjingTuru from "@resources/img/anjing_turu.png";
import "swiper/css";
import "@ionic/react/css/ionic-swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SkipText from "@components/SplashScreen/SkipText";
import "swiper/css/bundle";
import "@ionic/react/css/ionic-swiper.css";
import "@resources/scss/SplashScreen.scss";

function SplashScreen() {
  return (
    <IonPage>
      <IonContent fullscreen={true}>
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
                  routerLink="/mainmenu"
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
