import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { construct } from "ionicons/icons";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
          <p className="text-2xl font-bold">
            Under Construction{" "}
            <span className="text-[#F3B660]">
              <IonIcon className="text-sm" icon={construct} />
            </span>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
