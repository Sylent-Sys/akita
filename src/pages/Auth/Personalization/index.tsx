import { IonContent, IonPage } from "@ionic/react";
import "swiper/css/bundle";
import "@ionic/react/css/ionic-swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "@resources/scss/AuthPersonalization.scss";
function AuthPersonalization() {
  return (
    <IonPage>
      <IonContent
        fullscreen={true}
        className="ion-padding auth-personalization"
      >
        <Swiper>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
}

export default AuthPersonalization;
