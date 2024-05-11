import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import '@pages/MainMenu/Tab1/tab1.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Hi,</IonTitle>
            <IonTitle size='large' className='name'>Dave Thio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Swiper>
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
