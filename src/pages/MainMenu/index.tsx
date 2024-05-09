import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { triangle, ellipse, square } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import Tab1 from "@pages/Tab1";
import Tab2 from "@pages/Tab2";
import Tab3 from "@pages/Tab3";

function MainMenu() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/mainmenu/tab1" render={() => <Tab1 />} />
        <Route path="/mainmenu/tab2" render={() => <Tab2 />} />
        <Route path="/mainmenu/tab3" render={() => <Tab3 />} />
        <Redirect exact path="/mainmenu" to="/mainmenu/tab1" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/mainmenu/tab1">
          <IonIcon aria-hidden="true" icon={triangle} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/mainmenu/tab2">
          <IonIcon aria-hidden="true" icon={ellipse} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/mainmenu/tab3">
          <IonIcon aria-hidden="true" icon={square} />
          <IonLabel>Tab 3</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default MainMenu;
