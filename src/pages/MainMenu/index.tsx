import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
} from "@ionic/react";
import { home, book, cash, personCircle } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import Tab1 from "@pages/MainMenu/Tab1";
import Tab2 from "@pages/MainMenu/Tab2";
import Tab3 from "@pages/MainMenu/Tab3";
import Tab4 from "@pages/MainMenu/Tab4";
import { useEffect } from "react";
import {
  FirebaseAuthentication,
  User,
} from "@capacitor-firebase/authentication";
import { authFirebase } from "@/plugins/Firebase";

function MainMenu() {
  const router = useIonRouter();
  useEffect(() => {
    authFirebase
    FirebaseAuthentication.addListener("authStateChange", async (event) => {
      const user = event.user as User;
      if (!user) {
        router.push("/auth/login", "forward", "replace");
      }
    });
  }, []);
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/mainmenu/tab1" render={() => <Tab1 />} />
        <Route path="/mainmenu/tab2" render={() => <Tab2 />} />
        <Route path="/mainmenu/tab3" render={() => <Tab3 />} />
        <Route path="/mainmenu/tab4" render={() => <Tab4 />} />
        <Redirect exact path="/mainmenu" to="/mainmenu/tab1" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className="border-t-2 border-t-[#BABABA]">
        <IonTabButton tab="tab1" href="/mainmenu/tab1">
          <IonIcon aria-hidden="true" icon={home} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/mainmenu/tab2">
          <IonIcon aria-hidden="true" icon={book} />
          <IonLabel>Resep</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/mainmenu/tab3">
          <IonIcon aria-hidden="true" icon={cash} />
          <IonLabel>Keuangan</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/mainmenu/tab4">
          <IonIcon aria-hidden="true" icon={personCircle} />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default MainMenu;
