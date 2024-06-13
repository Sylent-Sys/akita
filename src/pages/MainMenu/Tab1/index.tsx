import { IDishDaily } from "@/interfaces/IDishDaily";
import { IonContent, IonIcon, IonPage, IonSpinner } from "@ionic/react";
import { useEffect, useState } from "react";
import AnjingMelet from "@resources/img/anjing_melet.png";
import {
  chevronBackCircleOutline,
  chevronForwardCircleOutline,
  lockClosed,
} from "ionicons/icons";
import { getDaysInMonth, useCalender } from "@/plugins/Calender";
import DishCard from "@/components/MainMenu/DishCard";
import Http from "@/plugins/Http";
const Tab1: React.FC = () => {
  const [dishDaily, setDishDaily] = useState<IDishDaily | null>();
  const [premium, setPremium] = useState<boolean>(false);
  const daysInMonth = getDaysInMonth(
    new Date().getMonth() + 1,
    new Date().getFullYear()
  );
  const { startDate, goToNextWeek, goToPreviousWeek } =
    useCalender(daysInMonth);
  const renderCalender = () => {
    const calendar: JSX.Element[] = [];
    let currentDay = startDate;
    const today = new Date().getDate();
    for (let i = 0; i < 7; i++) {
      calendar.push(
        <div key={i} className="w-full">
          {currentDay + i <= daysInMonth ? (
            <div className="font-bold text-center">
              <p className="text-[#7E818C]">
                {new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  currentDay + i
                ).toLocaleString("id-ID", { weekday: "short" })}
              </p>
              <p
                className={`${
                  currentDay + i === today
                    ? "bg-[#9FBF1F] text-white rounded-full"
                    : ""
                }`}
              >
                {currentDay + i}
              </p>
            </div>
          ) : (
            <p className="font-bold text-black text-center">-</p>
          )}
        </div>
      );
    }
    return calendar;
  };
  useEffect(() => {
    if (dishDaily == null) {
      new Http("/dish/daily").request().then((res) => {
        const result: IDishDaily = res.data;
        const sortedResult: IDishDaily = {};
        Object.keys(result)
          .sort()
          .forEach((key) => {
            sortedResult[key] = result[key];
          });
        setDishDaily(sortedResult);
      });
    }
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="ion-padding">
          <div className="flex flex-row items-center">
            <p className="text-4xl font-bold w-full h-min ">
              Hi, <br />
              <span className="text-[#F3B660]">Friend !</span>
            </p>
            <img src={AnjingMelet} alt="Anjing Melet" />
          </div>
          <div className="flex flex-row justify-evenly">
            <p className="w-1/3 text-center font-bold py-3 border-b-[#F3B660] border-b-2">
              Utama
            </p>
            {premium ? (
              <p className="w-1/3 text-center font-bold py-3">Analisa</p>
            ) : (
              <p className="w-1/3 font-bold py-3 flex flex-row items-center justify-center text-[#9E9E9E]">
                Analisa
                <IonIcon icon={lockClosed} />
              </p>
            )}
          </div>
          <div className="mt-3">
            <div className="flex justify-center">
              <p className="rounded-full bg-[#774C2A] text-white font-bold px-2 py-1">
                Kalender
              </p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center">
                <IonIcon
                  icon={chevronBackCircleOutline}
                  onClick={goToPreviousWeek}
                  size="large"
                />
              </div>
              {renderCalender()}
              <div className="flex flex-row items-center">
                <IonIcon
                  icon={chevronForwardCircleOutline}
                  onClick={goToNextWeek}
                  size="large"
                />
              </div>
            </div>
          </div>
          <div className="mt-3">
            {dishDaily == null && (
              <div className="flex flex-row items-center justify-center w-full">
                <IonSpinner name="dots" />
              </div>
            )}
            {dishDaily &&
              Object.keys(dishDaily).map((key) => {
                return (
                  <DishCard
                    key={key}
                    id={dishDaily[key].id}
                    name={dishDaily[key].name}
                    nation={dishDaily[key].nation}
                    groceries={dishDaily[key].groceries}
                    type={dishDaily[key].type}
                    recipe={dishDaily[key].recipe}
                  />
                );
              })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
