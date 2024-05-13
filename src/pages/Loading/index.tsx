import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import "@resources/scss/Loading.scss";
function Loading() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="loading-page">
          <IonSpinner name="dots" />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Loading;
