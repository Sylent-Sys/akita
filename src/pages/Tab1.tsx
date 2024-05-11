import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <h3 style={{ fontWeight: 'bold' }}>Hi,</h3>
          <h3 style={{ fontWeight: 'bold', color: '#F3B660' }}>Dave Thio</h3>
          <IonToolbar>
          </IonToolbar>
        </IonHeader>
        <IonRow>
          <p style={{ fontWeight: 'bold', marginLeft: '19vw', color: '#774C2A' }}>Utama</p>
          <p style={{ fontWeight: 'bold', marginLeft: '29vw', color: '#774C2A' }}>Analisa</p>


        </IonRow>
        {/* <ExploreContainer name="Tab 1 page" /> */}
        {/* <IonCard>
          <IonCardHeader>
            <IonCardTitle>Card Title</IonCardTitle>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
        </IonCard> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
