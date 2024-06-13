import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import "@/theme/variables.css";

/* Tailwind CSS */
import "@/theme/tailwind.css";
import { Redirect, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "@pages/Loading";
const RecipeDetail = lazy(() => import("@pages/Recipe/Detail"));
const SplashScreen = lazy(() => import("@pages/SplashScreen"));
const AuthLogin = lazy(() => import("@pages/Auth/Login"));
const AuthPersonalization = lazy(() => import("@pages/Auth/Personalization"));
const MainMenu = lazy(() => import("@pages/MainMenu"));
setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Suspense fallback={<Loading />}>
            <Route path="/splashscreen" render={() => <SplashScreen />} />
            <Route path="/auth/login" render={() => <AuthLogin />} />
            <Route
              path="/auth/personalization"
              render={() => <AuthPersonalization />}
            />
            <Route path="/recipe/detail/:id" render={() => <RecipeDetail />} />
            <Route path="/mainmenu" render={() => <MainMenu />} />
            <Route
              path="/"
              exact
              render={() => <Redirect to="/splashscreen" />}
            />
          </Suspense>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
