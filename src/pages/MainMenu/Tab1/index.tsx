import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import '@pages/MainMenu/Tab1/tab1.scss'
import { chevronBackCircleOutline, chevronForwardCircleOutline, chevronForwardOutline, lockClosedOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


const useCalendar = (daysInMonth: number, weeksInMonth: number) => {
  const [startDate, setStartDate] = React.useState(1);

  const goToNextWeek = () => {
    if (startDate + 7 <= daysInMonth) {
      setStartDate(startDate + 7);
    }
  };

  const goToPreviousWeek = () => {
    if (startDate - 7 >= 1) {
      setStartDate(startDate - 7);
    }
  };

  return { startDate, goToNextWeek, goToPreviousWeek };
};

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month - 1, 1).getDay();
};

const getWeeksInMonth = (month: number, year: number) => {
  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfMonth = getFirstDayOfMonth(month, year);
  const weeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7);
  return weeks;
};

const Tab1: React.FC = () => {
  const month = 5;
  const year = 2024;
  const daysInMonth = getDaysInMonth(month, year);
  const weeksInMonth = getWeeksInMonth(month, year);

  const { startDate, goToNextWeek, goToPreviousWeek } = useCalendar(daysInMonth, weeksInMonth);

  const renderCalendar = () => {
    const calendar = [];
    let currentDay = startDate;

    for (let i = 0; i < 7; i++) {
      calendar.push(
        <IonCol key={i}>
          {currentDay <= daysInMonth ? <div>{currentDay}</div> : null}
        </IonCol>
      );
      currentDay++;
    }

    return calendar;
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='content'>
          <IonGrid>
            <Swiper>
              <SwiperSlide>
                <div className='utama'>
                  <div>
                    <h1 className='header'>Hi,</h1>
                    <h1 className='name'>Dave,Thio</h1>
                  </div>
                  <IonRow>
                    <h3 className='sub-head'>Utama</h3>
                    <h3 className='sub-head2' style={{ border: 'none' }}>Analisa
                      <IonIcon className='lock' aria-hidden="true" icon={lockClosedOutline} />
                    </h3>
                  </IonRow>
                  <IonCard className='card'>
                    <IonCardContent>
                      <h1 className='card-subtitle'>Kalender</h1>
                      <h1 className='month'>Mei 2024</h1>
                      <IonGrid>
                        <IonRow>
                          <IonIcon icon={chevronBackCircleOutline} onClick={goToPreviousWeek} size='large' />
                          {renderCalendar()}
                          <IonIcon icon={chevronForwardCircleOutline} onClick={goToNextWeek} size='large' />
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='utama'>
                  <div>
                    <h1 className='header'>Hi,</h1>
                    <h1 className='name'>Dave,Thio</h1>
                  </div>
                  <IonRow>
                    <h3 className='sub-head' style={{ border: 'none' }}>Utama</h3>
                    <h3 className='sub-head2'>Analisa
                      <IonIcon className='lock' aria-hidden="true" icon={lockClosedOutline} />
                    </h3>
                  </IonRow>
                  <IonCard className='card-2'>
                    <IonCardContent>

                    </IonCardContent>
                  </IonCard>
                </div>
              </SwiperSlide>
            </Swiper>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
