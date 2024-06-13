import {
  IonContent,
  IonIcon,
  IonPage,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import BgJumbotronMainmenuTab4 from "@/resources/img/bg_jumbotron_mainmenu_tab4.png";
import { authFirebase } from "@/plugins/Firebase";
import {
  FirebaseAuthentication,
  User,
} from "@capacitor-firebase/authentication";
import { useEffect, useState } from "react";
import {
  settingsOutline,
  languageOutline,
  logOutOutline,
} from "ionicons/icons";
import { signOut } from "firebase/auth";

const Tab4: React.FC = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const [user, setUser] = useState<User | null>();
  const [key, setKey] = useState<number>(0);
  useEffect(() => {
    authFirebase;
    FirebaseAuthentication.getCurrentUser().then((res) => {
      setUser(res.user);
      setKey(key + 1);
    });
    FirebaseAuthentication.addListener("authStateChange", async (event) => {
      dismiss();
      const user = event.user;
      if (!user) {
        router.push("/auth/login", "forward", "replace");
      }
    });
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <img
            src={BgJumbotronMainmenuTab4}
            alt="Bg Jumbotron"
            className="rounded-b-2xl shadow-2xl w-full bg-cover"
          />
          <div className="relative -mt-[calc(100vw/3/2)]">
            <img
              src={user?.photoUrl || "https://placehold.co/90"}
              alt="User PP"
              className="w-[calc(100vw/3)] h-[calc(100vw/3)] bg-cover mx-auto bg-[#F3B660] rounded-full border-4 border-white shadow-md"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="text-xl font-semibold text-[#774C2A]">
              {user?.displayName || user?.phoneNumber}
            </h2>
            <p className="text-[#8E8E8E]">Provinsi, Negara</p>
          </div>
        </div>
        <div className="ion-padding" key={key}>
          <div>
            <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md py-4">
              <div className="flex items-center mx-2 p-4">
                <IonIcon
                  icon={settingsOutline}
                  className="w-8 h-8 text-blue-400"
                />
                <span className="ml-4 text-[#774C2A] text-lg font-semibold">
                  Pengaturan Profil
                </span>
              </div>
              <hr className="border-t-2 border-[#F3B660] my-2" />
              <div className="flex items-center mx-2 p-4">
                <IonIcon
                  icon={languageOutline}
                  className="w-8 h-8 text-green-400"
                />
                <span className="ml-4 text-[#774C2A] text-lg font-semibold">
                  Bahasa
                </span>
              </div>
              <hr className="border-t-2 border-[#F3B660] my-2" />
              <div
                className="flex items-center mx-2 p-4"
                onClick={async () => {
                  await present({
                    message: "Keluar Akun...",
                  });
                  await FirebaseAuthentication.signOut();
                  const auth = authFirebase;
                  await signOut(auth);
                }}
              >
                <IonIcon
                  icon={logOutOutline}
                  className="w-8 h-8 text-red-400"
                />
                <span className="ml-4 text-[#774C2A] text-lg font-semibold">
                  Keluar Akun
                </span>
              </div>
            </div>
          </div>
          <p className="text-[#774C2A] font-semibold text-center mt-6 px-5">
            Terima kasih sudah menggunakan aplikasi kami. ~
            {String.fromCharCode(parseInt("0x03B1", 16))} ❤️
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
